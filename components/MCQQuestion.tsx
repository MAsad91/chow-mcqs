'use client';

import { useState, useEffect } from 'react';
import { Question } from '@/types/question';
import styles from './MCQQuestion.module.css';

interface MCQQuestionProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  onAnswerSelect: (isCorrect: boolean) => void;
}

export default function MCQQuestion({ question, currentIndex, totalQuestions, onAnswerSelect }: MCQQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Reset state when question changes
  useEffect(() => {
    setSelectedOption(null);
    setShowFeedback(false);
    setIsCorrect(null);
  }, [question.id]);

  const handleOptionClick = (optionIndex: number) => {
    if (showFeedback) return; // Prevent changing answer after feedback is shown

    setSelectedOption(optionIndex);
    const correct = optionIndex === question.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);
    onAnswerSelect(correct);
  };

  return (
    <div className={styles.container}>
      <div className={styles.questionCard}>
        <h2 className={styles.questionNumber}>
          Question {currentIndex + 1} of {totalQuestions}
        </h2>
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
                disabled={showFeedback}
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

