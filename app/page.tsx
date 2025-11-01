'use client';

import { useState } from 'react';
import MCQQuestion from '@/components/MCQQuestion';
import { questions } from '@/data/questions';
import styles from './page.module.css';

export default function Home() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());

  const handleAnswerSelect = (questionId: number, isCorrect: boolean) => {
    if (!answeredQuestions.has(questionId)) {
      if (isCorrect) {
        setScore(score + 1);
      }
      setTotalAnswered(totalAnswered + 1);
      setAnsweredQuestions(new Set([...answeredQuestions, questionId]));
    }
  };

  const handleNextQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    // Check if current question has been answered
    if (!answeredQuestions.has(currentQuestion.id)) {
      return; // Don't allow moving forward if not answered
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz completed - reset or show results
      alert(`Quiz completed! Your score: ${score}/${questions.length}`);
      setCurrentQuestionIndex(0);
      setScore(0);
      setTotalAnswered(0);
      setAnsweredQuestions(new Set());
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isQuestionAnswered = answeredQuestions.has(currentQuestion.id);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>CHOW MCQS</h1>
      
      <div className={styles.contentContainer}>
        <div className={styles.scoreCard}>
          <h2 className={styles.scoreCardTitle}>Score</h2>
          <div className={styles.scoreValue}>
            {score}/{totalAnswered || 0}
          </div>
        </div>

        <div className={styles.questionsContainer}>
          {questions.map((question, index) => {
            if (index === currentQuestionIndex) {
              return (
                <MCQQuestion
                  key={question.id}
                  question={question}
                  currentIndex={index}
                  totalQuestions={questions.length}
                  onAnswerSelect={(isCorrect) => handleAnswerSelect(question.id, isCorrect)}
                />
              );
            }
            return null;
          })}
        </div>
      </div>

      <div className={styles.navigation}>
        <button
          className={styles.navButton}
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        <button
          className={styles.navButton}
          onClick={handleNextQuestion}
          disabled={currentQuestionIndex === questions.length - 1 || !isQuestionAnswered}
        >
          Next
        </button>
      </div>
    </main>
  );
}

