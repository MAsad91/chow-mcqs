'use client';

import Link from 'next/link';
import styles from './page.module.css';

export default function ComingSoon() {
  return (
    <main className={styles.comingSoonMain}>
      <div className={styles.comingSoonContainer}>
        <h1 className={styles.comingSoonTitle}>Sling & Stone</h1>
        <div className={styles.comingSoonContent}>
          <div className={styles.comingSoonIcon}>🚧</div>
          <h2 className={styles.comingSoonHeading}>Coming Soon</h2>
          <p className={styles.comingSoonDescription}>
            This quiz section is under development. Check back soon!
          </p>
        </div>
        <Link href="/" className={styles.backButton}>
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}

