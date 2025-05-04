import React from 'react';
import styles from './Newsletter.module.css';

const Newsletter = () => {
  return (
    <section className={styles.printoNewsletter}>
      <div className={styles.printoNewsletterContainer}>
        <h2 className={styles.printoNewsletterTitle}>Subscribe to Our Newsletter</h2>
        <p className={styles.printoNewsletterText}>Get updates on new arrivals, special offers and more</p>
        <form className={styles.printoNewsletterForm}>
          <input type="email" placeholder="Enter your email address" />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;