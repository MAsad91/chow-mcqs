'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import FlashCard from '@/components/FlashCard';
import styles from './page.module.css';

const STORAGE_KEY = 'kashmir-1948-flashcard-progress';

const flashCards = [
  {
    id: 1,
    front: 'What separates Kashmir from Russia across the Pamir Plateau?',
    back: 'A 30 Mile wide salient of Afghan Territory of Wakhan separates it from Russia across the Pamir Plateau.'
  },
  {
    id: 2,
    front: 'What gave India an excuse to claim contiguity with Kashmir?',
    back: 'At the extreme South Eastern end, a narrow strip of land forms a common border with India. It was this strip of a few miles that gave India an excuse to claim contiguity with the state.'
  },
  {
    id: 3,
    front: 'Which rivers form the boundaries and principal arteries of Kashmir state?',
    back: 'On the whole, the state is enclosed within the arms formed by Indus and Ravi, but principal arteries inside the state are Jhelum and Chenab.'
  },
  {
    id: 4,
    front: 'What are the 4 storeys (elevation levels) in Kashmir valley?',
    back: '1. Bagh to Udhampur (8000ft)\n2. Pirpanjal (where Kashmir valley lies)\n3. Himalaya\n4. Karakoram'
  },
  {
    id: 5,
    front: 'What characterizes the climate variations in Kashmir state?',
    back: 'The vast divergence of Terrains in various parts of the state distinctively characterizes the climate in one part from the other.'
  },
  {
    id: 6,
    front: 'What are the historical periods of Kashmir?',
    back: 'The long history is divided into four periods:\n1. Pre-Islamic Period\n2. Early Muslim\n3. Mughal\n4. Afghan'
  }
];

interface FlashCardProgress {
  currentCardIndex: number;
}

export default function Kashmir1948() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem(STORAGE_KEY);
    if (savedProgress) {
      try {
        const progress: FlashCardProgress = JSON.parse(savedProgress);
        setCurrentCardIndex(progress.currentCardIndex || 0);
      } catch (error) {
        console.error('Error loading progress:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save progress to localStorage whenever currentCardIndex changes
  useEffect(() => {
    if (!isLoaded) return; // Don't save before initial load

    const progress: FlashCardProgress = {
      currentCardIndex
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [currentCardIndex, isLoaded]);

  const handleNext = () => {
    if (currentCardIndex < flashCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      // Completed all cards - reset or show completion message
      alert('You have completed all flash cards!');
      setCurrentCardIndex(0);
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setCurrentCardIndex(0);
  };

  const currentCard = flashCards[currentCardIndex];

  if (!isLoaded) {
    return (
      <main className={styles.main}>
        <div className={styles.loaderContainer}>
          <div className={styles.loader}></div>
          <p className={styles.loaderText}>Loading your progress...</p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.headerContainer}>
        <Link href="/" className={styles.backButton}>
          ← Home
        </Link>
        <h1 className={styles.title}>Kashmir Campaign - 1948</h1>
      </div>

      <div className={styles.flashCardWrapper}>
        <FlashCard
          key={currentCard.id}
          front={currentCard.front}
          back={currentCard.back}
          index={currentCardIndex}
          currentIndex={currentCardIndex}
          totalCards={flashCards.length}
        />
      </div>

      <div className={styles.navigation}>
        <button
          className={styles.resetButton}
          onClick={handleReset}
        >
          Reset
        </button>
        <button
          className={styles.navButton}
          onClick={handlePrevious}
          disabled={currentCardIndex === 0}
        >
          Previous
        </button>
        <button
          className={styles.navButton}
          onClick={handleNext}
          disabled={currentCardIndex === flashCards.length - 1}
        >
          Next
        </button>
      </div>
    </main>
  );
}

