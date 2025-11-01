'use client';

import Link from 'next/link';
import styles from './page.module.css';

const cards = [
  {
    id: 1,
    title: 'Cambridge History of Warfare',
    href: '/chowmcqs',
    gradient: 'linear-gradient(135deg, rgba(255, 0, 128, 0.15) 0%, rgba(255, 140, 0, 0.15) 100%)',
    borderColor: 'rgba(255, 0, 128, 0.3)',
    delay: 0
  },
  {
    id: 2,
    title: 'Makers of Modern Strategy',
    href: '/makers-of-modern-strategy',
    gradient: 'linear-gradient(135deg, rgba(0, 212, 255, 0.15) 0%, rgba(255, 215, 0, 0.15) 100%)',
    borderColor: 'rgba(0, 212, 255, 0.3)',
    delay: 0.1
  },
  {
    id: 3,
    title: 'Sling & Stone',
    href: '/sling-stone',
    gradient: 'linear-gradient(135deg, rgba(255, 69, 0, 0.15) 0%, rgba(220, 20, 60, 0.15) 100%)',
    borderColor: 'rgba(255, 69, 0, 0.3)',
    delay: 0.2
  },
  {
    id: 4,
    title: '1965',
    href: '/1965',
    gradient: 'linear-gradient(135deg, rgba(138, 43, 226, 0.15) 0%, rgba(30, 144, 255, 0.15) 100%)',
    borderColor: 'rgba(138, 43, 226, 0.3)',
    delay: 0.3
  },
  {
    id: 5,
    title: '1971',
    href: '/1971',
    gradient: 'linear-gradient(135deg, rgba(34, 139, 34, 0.15) 0%, rgba(0, 191, 255, 0.15) 100%)',
    borderColor: 'rgba(34, 139, 34, 0.3)',
    delay: 0.4
  },
  {
    id: 6,
    title: '1948',
    href: '/1948',
    gradient: 'linear-gradient(135deg, rgba(255, 20, 147, 0.15) 0%, rgba(255, 165, 0, 0.15) 100%)',
    borderColor: 'rgba(255, 20, 147, 0.3)',
    delay: 0.5
  }
];

export default function Home() {
  return (
    <main className={styles.landingMain}>
      <div className={styles.cardsGrid}>
        {cards.map((card) => (
          <Link 
            key={card.id} 
            href={card.href} 
            className={styles.quizCard}
            style={{
              '--card-gradient': card.gradient,
              '--card-border': card.borderColor,
              '--animation-delay': `${card.delay}s`
            } as React.CSSProperties}
          >
            <h2 className={styles.cardTitle}>{card.title}</h2>
          </Link>
        ))}
      </div>
    </main>
  );
}
