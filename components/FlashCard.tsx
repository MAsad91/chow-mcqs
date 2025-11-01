'use client';

import { useState, useEffect } from 'react';
import styles from './FlashCard.module.css';

interface FlashCardProps {
  front: string;
  back: string;
  index: number;
  currentIndex: number;
  totalCards: number;
}

export default function FlashCard({ front, back, index, currentIndex, totalCards }: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Reset flip state when card changes (index changes)
  useEffect(() => {
    setIsFlipped(false);
  }, [index]);

  return (
    <div 
      className={`${styles.flashCard} ${isFlipped ? styles.flipped : ''}`}
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ '--animation-delay': `0s` } as React.CSSProperties}
    >
      <div className={styles.cardInner}>
        <div className={styles.cardFront}>
          <div className={styles.cardContent}>
            <div className={styles.cardNumber}>{currentIndex + 1}/{totalCards}</div>
            <div className={styles.cardText}>{front}</div>
            <div className={styles.flipHint}>Click to flip</div>
          </div>
        </div>
        <div className={styles.cardBack}>
          <div className={styles.cardContent}>
            <div className={styles.cardLabel}>Answer</div>
            <div className={styles.cardText} style={{ whiteSpace: 'pre-line' }}>{back}</div>
            <div className={styles.flipHint}>Click to flip back</div>
          </div>
        </div>
      </div>
    </div>
  );
}

