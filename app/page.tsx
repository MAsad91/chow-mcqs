'use client';

import { useState, useEffect } from 'react';
import MCQQuestion from '@/components/MCQQuestion';
import { questions } from '@/data/questions';
import styles from './page.module.css';

const STORAGE_KEY = 'chow-mcqs-progress';

interface QuizProgress {
  currentQuestionIndex: number;
  score: number;
  totalAnswered: number;
  answeredQuestions: number[];
  selectedAnswers: Record<number, number>; // questionId -> selectedOptionIndex
}

export default function Home() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem(STORAGE_KEY);
    if (savedProgress) {
      try {
        const progress: QuizProgress = JSON.parse(savedProgress);
        setCurrentQuestionIndex(progress.currentQuestionIndex || 0);
        setScore(progress.score || 0);
        setTotalAnswered(progress.totalAnswered || 0);
        setAnsweredQuestions(new Set(progress.answeredQuestions || []));
        setSelectedAnswers(progress.selectedAnswers || {});
      } catch (error) {
        console.error('Error loading progress:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save progress to localStorage whenever state changes
  useEffect(() => {
    if (!isLoaded) return; // Don't save before initial load
    
    const progress: QuizProgress = {
      currentQuestionIndex,
      score,
      totalAnswered,
      answeredQuestions: Array.from(answeredQuestions),
      selectedAnswers
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [currentQuestionIndex, score, totalAnswered, answeredQuestions, selectedAnswers, isLoaded]);

  const handleAnswerSelect = (questionId: number, selectedOptionIndex: number, isCorrect: boolean) => {
    if (!answeredQuestions.has(questionId)) {
      if (isCorrect) {
        setScore(score + 1);
      }
      setTotalAnswered(totalAnswered + 1);
      setAnsweredQuestions(new Set([...answeredQuestions, questionId]));
      setSelectedAnswers({ ...selectedAnswers, [questionId]: selectedOptionIndex });
    }
  };

  const handleResetQuiz = () => {
    localStorage.removeItem(STORAGE_KEY);
    setCurrentQuestionIndex(0);
    setScore(0);
    setTotalAnswered(0);
    setAnsweredQuestions(new Set());
    setSelectedAnswers({});
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
      handleResetQuiz();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isQuestionAnswered = answeredQuestions.has(currentQuestion.id);

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
                  score={score}
                  totalAnswered={totalAnswered}
                  initialSelectedAnswer={selectedAnswers[question.id]}
                  isAnswered={answeredQuestions.has(question.id)}
                  onAnswerSelect={(selectedOptionIndex, isCorrect) => handleAnswerSelect(question.id, selectedOptionIndex, isCorrect)}
                />
              );
            }
            return null;
          })}
        </div>
      </div>

      <div className={styles.navigation}>
        <button
          className={styles.resetButton}
          onClick={handleResetQuiz}
        >
          Reset
        </button>
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

