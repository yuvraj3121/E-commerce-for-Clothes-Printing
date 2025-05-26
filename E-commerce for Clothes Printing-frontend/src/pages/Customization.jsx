import React, { useState, useRef, useContext, useEffect } from "react";
import { toPng } from "html-to-image";
import html2canvas from "html2canvas";
import {
  DndContext,
  useDraggable,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import "./Customization.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const DraggableDiv = ({
  id,
  position,
  setPosition,
  content,
  type,
  zoom,
  fontStyle,
  color,
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const handleStyle = {
    position: "absolute",
    top: position.y,
    left: position.x,
    cursor: "grab",
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  if (type === "frontImage" && content) {
    return (
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={{
          ...handleStyle,
          width: `${zoom}px`,
          height: `${zoom}px`,
          backgroundImage: `url(${content})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />
    );
  }

  if (type === "backImage" && content) {
    return (
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={{
          ...handleStyle,
          width: `${zoom}px`,
          height: `${zoom}px`,
          backgroundImage: `url(${content})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />
    );
  }

  if (type === "frontText" && content) {
    return (
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={{
          ...handleStyle,
          fontSize: `${zoom}px`,
          fontWeight: "bold",
          color: color,
          fontFamily: fontStyle,
        }}
      >
        {content}
      </div>
    );
  }

  if (type === "backText" && content) {
    return (
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={{
          ...handleStyle,
          fontSize: `${zoom}px`,
          fontWeight: "bold",
          color: color,
          fontFamily: fontStyle,
        }}
      >
        {content}
      </div>
    );
  }

  return null;
};

const Customization = () => {
  const [user, setUser] = useState(null);
  const { selectedProduct } = useSelector((state) => state.product);
  let productData = selectedProduct;

  const navigate = useNavigate();
  const [frontImagePosition, setFrontImagePosition] = useState({
    x: 100,
    y: 100,
  });
  const [frontTextPosition, setFrontTextPosition] = useState({
    x: 150,
    y: 200,
  });
  const [backImagePosition, setBackImagePosition] = useState({
    x: 100,
    y: 100,
  });
  const [backTextPosition, setBackTextPosition] = useState({
    x: 150,
    y: 200,
  });
  const [frontDesign, setFrontDesign] = useState(null);
  const [backDesign, setBackDesign] = useState(null);
  const [frontText, setFrontText] = useState("");
  const [backText, setBackText] = useState("");
  const [frontImageZoom, setFrontImageZoom] = useState(100);
  const [backImageZoom, setBackImageZoom] = useState(100);
  const [frontTextZoom, setFrontTextZoom] = useState(20);
  const [backTextZoom, setBackTextZoom] = useState(20);
  const [frontFontStyle, setFrontFontStyle] = useState("Arial");
  const [backFontStyle, setBackFontStyle] = useState("Arial");
  const [frontTextColor, setFrontTextColor] = useState("#000000");
  const [backTextColor, setBackTextColor] = useState("#000000");
  const [frontDesignFile, setFrontDesignFile] = useState(null);
  const [backDesignFile, setBackDesignFile] = useState(null);
  const [sizes, setSize] = useState([
    { size: "S", quantity: 0 },
    { size: "M", quantity: 0 },
    { size: "L", quantity: 0 },
    { size: "XL", quantity: 0 },
  ]);
  const [side, setSide] = useState("front");
  const [color, setColor] = useState("");
  const frontCanvasRef = useRef(null);
  const backCanvasRef = useRef(null);
  const [frontFile, setFrontFile] = useState(null);
  const [backFile, setBackFile] = useState(null);

  const handleFrontDesignUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFrontDesignFile(file);
      setFrontDesign(URL.createObjectURL(file));
    } else {
      console.log("No file selected");
    }
  };

  const handleBackDesignUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackDesignFile(file);
      setBackDesign(URL.createObjectURL(file));
    } else {
      console.log("No file selected");
    }
  };

  const handleSizeChange = (index, value) => {
    const newSizes = [...sizes];
    newSizes[index].quantity = value;
    setSize(newSizes);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 2 },
    })
  );

  const handleDragEnd = (event) => {
    const { active, delta } = event;

    if (active.id === "frontImage") {
      setFrontImagePosition((prev) => ({
        x: Math.max(0, Math.min(410, prev.x + delta.x)),
        y: Math.max(0, Math.min(550, prev.y + delta.y)),
      }));
    }

    if (active.id === "frontText") {
      setFrontTextPosition((prev) => ({
        x: Math.max(0, Math.min(410, prev.x + delta.x)),
        y: Math.max(0, Math.min(570, prev.y + delta.y)),
      }));
    }

    if (active.id === "backImage") {
      setBackImagePosition((prev) => ({
        x: Math.max(0, Math.min(410, prev.x + delta.x)),
        y: Math.max(0, Math.min(550, prev.y + delta.y)),
      }));
    }

    if (active.id === "backText") {
      setBackTextPosition((prev) => ({
        x: Math.max(0, Math.min(410, prev.x + delta.x)),
        y: Math.max(0, Math.min(570, prev.y + delta.y)),
      }));
    }
  };

  const hanldeFrontSave = async () => {
    if (frontDesignFile || frontText != "") {
      const previewFront = document.getElementById("mainFrontImg");
      const frontCanvas = await html2canvas(previewFront, { useCORS: true });
      const frontDataUrl = frontCanvas.toDataURL("front-customized-Img/png");
      const frontBlob = await (await fetch(frontDataUrl)).blob();
      const frontFile = new File([frontBlob], "front-custom-tshirt", {
        type: "front-customized-Img/png",
      });
      setFrontFile(frontFile);
    }
    console.log(frontFile);
  };

  const handleBackSave = async () => {
    if (backDesignFile || backText != "") {
      const previewBack = document.getElementById("mainBackImg");
      const backCanvas = await html2canvas(previewBack, { useCORS: true });
      const backDataUrl = backCanvas.toDataURL("back-customized-Img/png");
      const backBlob = await (await fetch(backDataUrl)).blob();
      const backFile = new File([backBlob], "back-custom-tshirt", {
        type: "front-customized-Img/png",
      });
      setBackFile(backFile);
    }
    console.log(backFile);
  };

  const frontFileInputRef = useRef(null);
  const backFileInputRef = useRef(null);

  const handleAddToCart = async () => {
    if (!color) {
      alert("Please select a color");
      return;
    }

    if (sizes.every((item) => item.quantity === 0)) {
      alert("Please select at least one size");
      return;
    }

    const totalQuantity = sizes.reduce((acc, item) => acc + item.quantity, 0);

    const formData = new FormData();
    formData.append("productName", productData.productName);
    formData.append("category", productData.category);
    formData.append("price", selectedProduct.price * totalQuantity);
    formData.append("frontDesignText", frontText);
    formData.append("backDesignText", backText);
    formData.append("color", color);
    formData.append("quantity", productData.quantity);
    formData.append("printLocation", JSON.stringify(["front", "back"]));
    formData.append("sizes", JSON.stringify(sizes));
    formData.append("quantity", totalQuantity);
    formData.append("productImage", JSON.stringify(productData.productImage));
    if (frontDesignFile) {
      formData.append("frontDesignImage", frontDesignFile);
    }
    if (backDesignFile) {
      formData.append("backDesignImage", backDesignFile);
    }
    if (frontFile) {
      formData.append("customizedFrontImage", frontFile);
    }
    if (backFile) {
      formData.append("customizedBackImage", backFile);
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/api/userProduct/createUserProduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const createdProduct = res.data.product;

      await axios.post("http://localhost:8000/api/cart/addToCart", {
        userId: user._id,
        productId: createdProduct._id,
      });

      alert("Added to cart!");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Error adding to cart or creating product.");
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const res = await axios.get(
            "http://localhost:8000/api/user/profile",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setUser(res.data.user);
        }
      } catch (err) {
        localStorage.removeItem("token");
      }
    };
    checkAuth();
  }, []);

  return (
    <div className="cus-container">
      <div className="cus-leftDiv">
        <button onClick={() => navigate("/product")}>{"< "}Back</button>
        <div className="frontImg" onClick={() => setSide("front")}>
          <img src={selectedProduct.productImage[0].url} alt="T-shirt"></img>
        </div>
        <div className="backImg" onClick={() => setSide("back")}>
          <img src={selectedProduct.productImage[1].url} alt="T-shirt"></img>
        </div>
      </div>
      <div className="cus-rightDiv">
        <div
          className="preview-tools-wrapper"
          style={{ display: side === "front" ? "flex" : "none" }}
        >
          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <div ref={frontCanvasRef} id="mainFrontImg" className="mainImgDiv">
              <img
                src={selectedProduct.productImage[0].url}
                alt="T-shirt"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 0,
                }}
              />

              <DraggableDiv
                id="frontImage"
                position={frontImagePosition}
                setPosition={setFrontImagePosition}
                content={frontDesign}
                type="frontImage"
                zoom={frontImageZoom}
              />
              <DraggableDiv
                id="frontText"
                position={frontTextPosition}
                setPosition={setFrontTextPosition}
                content={frontText}
                type="frontText"
                zoom={frontTextZoom}
                fontStyle={frontFontStyle}
                color={frontTextColor}
              />
            </div>
            <button
              onClick={hanldeFrontSave}
              className="absolute top-[570px] left-[870px] p-2"
            >
              Save
            </button>
          </DndContext>
          <div className="toolsDiv">
            <h3>Tools</h3>
            <div className="tools">
              <div>
                <label>Upload Design: </label>
                <input
                  ref={frontFileInputRef}
                  className="designInput"
                  type="file"
                  accept="image/*"
                  onChange={handleFrontDesignUpload}
                />
                {frontDesign && (
                  <button
                    onClick={() => {
                      setFrontDesign(null);
                      setFrontImagePosition({ x: 0, y: 0 });
                      if (frontFileInputRef.current) {
                        frontFileInputRef.current.value = "";
                      }
                    }}
                  >
                    Remove Design
                  </button>
                )}
                <label>Zoom: </label>
                <input
                  type="range"
                  min="50"
                  max="300"
                  value={frontImageZoom}
                  onChange={(e) => setFrontImageZoom(Number(e.target.value))}
                />
              </div>
              <div>
                <label>Text: </label>
                <input
                  type="text"
                  placeholder="Enter text"
                  className="textInput"
                  value={frontText}
                  onChange={(e) => setFrontText(e.target.value)}
                />
                {frontText && (
                  <button onClick={() => setFrontText("")}>Remove Text</button>
                )}
                <label>Font Size: </label>
                <input
                  type="range"
                  min="10"
                  max="60"
                  value={frontTextZoom}
                  onChange={(e) => setFrontTextZoom(Number(e.target.value))}
                />
                <label>Font Style: </label>
                <select
                  value={frontFontStyle}
                  onChange={(e) => setFrontFontStyle(e.target.value)}
                >
                  <option value="Arial">Arial</option>
                  <option value="Courier New">Courier New</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Verdana">Verdana</option>
                </select>
                <label>Text Color: </label>
                <input
                  className="colorInput"
                  type="color"
                  value={frontTextColor}
                  onChange={(e) => setFrontTextColor(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className="preview-tools-wrapper"
          style={{ display: side === "back" ? "flex" : "none" }}
        >
          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <div ref={backCanvasRef} id="mainBackImg" className="mainImgDiv">
              <img
                src={selectedProduct.productImage[1].url}
                alt="T-shirt"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 0,
                }}
              />
              <DraggableDiv
                id="backImage"
                position={backImagePosition}
                setPosition={setBackImagePosition}
                content={backDesign}
                type="backImage"
                zoom={backImageZoom}
              />
              <DraggableDiv
                id="backText"
                position={backTextPosition}
                setPosition={setBackTextPosition}
                content={backText}
                type="backText"
                zoom={backTextZoom}
                fontStyle={backFontStyle}
                color={backTextColor}
              />
            </div>
            <button
              onClick={handleBackSave}
              className="absolute top-[570px] left-[870px] p-2"
            >
              Save
            </button>
          </DndContext>
          <div className="toolsDiv">
            <h3>Tools</h3>
            <div className="tools">
              <div>
                <label>Upload Design: </label>
                <input
                  ref={backFileInputRef}
                  className="designInput"
                  type="file"
                  accept="image/*"
                  onChange={handleBackDesignUpload}
                />
                {backDesign && (
                  <button
                    onClick={() => {
                      setBackDesign(null);
                      setBackImagePosition({ x: 0, y: 0 });
                      if (backFileInputRef.current) {
                        backFileInputRef.current.value = "";
                      }
                    }}
                  >
                    Remove Design
                  </button>
                )}
                <label>Zoom: </label>
                <input
                  type="range"
                  min="50"
                  max="300"
                  value={backImageZoom}
                  onChange={(e) => setBackImageZoom(Number(e.target.value))}
                />
              </div>
              <div>
                <label>Text: </label>
                <input
                  type="text"
                  placeholder="Enter text"
                  className="textInput"
                  value={backText}
                  onChange={(e) => setBackText(e.target.value)}
                />
                {backText && (
                  <button onClick={() => setBackText("")}>Remove Text</button>
                )}
                <label>Font Size: </label>
                <input
                  type="range"
                  min="10"
                  max="60"
                  value={backTextZoom}
                  onChange={(e) => setBackTextZoom(Number(e.target.value))}
                />
                <label>Font Style: </label>
                <select
                  value={backFontStyle}
                  onChange={(e) => setBackFontStyle(e.target.value)}
                >
                  <option value="Arial">Arial</option>
                  <option value="Courier New">Courier New</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Verdana">Verdana</option>
                </select>
                <label>Text Color: </label>
                <input
                  className="colorInput"
                  type="color"
                  value={backTextColor}
                  onChange={(e) => setBackTextColor(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="centerDiv ">
        <div style={{ marginBottom: "10px" }}>
          <label>Color: </label>
          <select value={color} onChange={(e) => setColor(e.target.value)}>
            <option value="">Select</option>
            <option value="white">White</option>
            <option value="black">Black</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
          </select>
        </div>
        <div
          className="productSizes flex gap-2"
          style={{ marginBottom: "33px" }}
        >
          {sizes.map((item, index) => (
            <label key={item.size}>
              {item.size} :{" "}
              <input
                className="w-[50px] bg-gray-200"
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  handleSizeChange(index, parseInt(e.target.value) || 0)
                }
              />
            </label>
          ))}
        </div>
        <button className="bg-blue-300 p-1" onClick={handleAddToCart}>
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Customization;
