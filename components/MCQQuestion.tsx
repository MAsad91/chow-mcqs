'use client';

import { useState, useEffect } from 'react';
import { Question } from '@/types/question';
import styles from './MCQQuestion.module.css';

interface MCQQuestionProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  score?: number;
  totalAnswered?: number;
  initialSelectedAnswer?: number;
  isAnswered?: boolean;
  onAnswerSelect: (selectedOptionIndex: number, isCorrect: boolean) => void;
}

export default function MCQQuestion({ question, currentIndex, totalQuestions, score = 0, totalAnswered = 0, initialSelectedAnswer, isAnswered, onAnswerSelect }: MCQQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(initialSelectedAnswer ?? null);
  const [showFeedback, setShowFeedback] = useState(isAnswered ?? false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(
    isAnswered && initialSelectedAnswer !== undefined 
      ? initialSelectedAnswer === question.correctAnswer 
      : null
  );

  // Update state when question changes or when initial values are provided
  useEffect(() => {
    if (initialSelectedAnswer !== undefined && isAnswered) {
      setSelectedOption(initialSelectedAnswer);
      setShowFeedback(true);
      setIsCorrect(initialSelectedAnswer === question.correctAnswer);
    } else {
      setSelectedOption(null);
      setShowFeedback(false);
      setIsCorrect(null);
    }
  }, [question.id, question.correctAnswer, initialSelectedAnswer, isAnswered]);

  const handleOptionClick = (optionIndex: number) => {
    if (showFeedback && isAnswered) return; // Prevent changing answer after feedback is shown

    setSelectedOption(optionIndex);
    const correct = optionIndex === question.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);
    onAnswerSelect(optionIndex, correct);
  };

  return (
    <div className={styles.container}>
      <div className={styles.questionCard}>
        <div className={styles.questionHeader}>
          <h2 className={styles.questionNumber}>
            Question {currentIndex + 1} of {totalQuestions}
          </h2>
          <div className={styles.mobileScore}>
            <span className={styles.mobileScoreLabel}>Score</span>
            <span className={styles.mobileScoreValue}>{score}/{totalAnswered || 0}</span>
          </div>
        </div>
        <p className={styles.questionText}>{question.question}</p>
        
        <div className={styles.optionsContainer}>
          {question.options.map((option, index) => {
            let optionClass = styles.option;
            
            if (showFeedback && selectedOption === index) {
              optionClass += selectedOption === question.correctAnswer
                ? ` ${styles.correct}`
                : ` ${styles.incorrect}`;
            }
            
            if (showFeedback && index === question.correctAnswer && selectedOption !== question.correctAnswer) {
              optionClass += ` ${styles.correctAnswer}`;
            }
            
            if (selectedOption === index) {
              optionClass += ` ${styles.selected}`;
            }

            return (
              <button
                key={index}
                className={optionClass}
                onClick={() => handleOptionClick(index)}
                disabled={showFeedback && isAnswered}
              >
                <span className={styles.optionLabel}>
                  {String.fromCharCode(65 + index)}. {/* A, B, C, D */}
                </span>
                <span className={styles.optionText}>{option}</span>
              </button>
            );
          })}
        </div>

        {showFeedback && (
          <div className={styles.feedbackContainer}>
            <div className={isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect}>
              <span className={styles.feedbackIcon}>
                {isCorrect ? '✓' : '✗'}
              </span>
              <span className={styles.feedbackText}>
                {isCorrect
                  ? 'Correct!'
                  : `Not Correct. The correct answer is: ${String.fromCharCode(65 + question.correctAnswer)}. ${question.options[question.correctAnswer]}`}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

