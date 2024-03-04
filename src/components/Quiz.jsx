import { useState } from 'react'
import { quiz } from '../../quiz'
import styles from '../components/style.module.scss'
import { Result } from './Result'

export const Quiz = () => {
  const [activeQuestion, setActiveQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    name: '',
  })
  const [name, setName] = useState('')

  const { questions } = quiz
  const { question, choices, correctAnswer } = questions[activeQuestion]

  const onClickNext = () => {
    setSelectedAnswerIndex(null)
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    )
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1)
    } else {
      setActiveQuestion(0)
      setShowResult(true)
    }
  }

  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index)
    setSelectedAnswer(answer === correctAnswer)
  }

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`)
  const handleStart = () => {
    if (name.trim() !== '') {
      setResult((prevResult) => ({ ...prevResult, name: name }))
    }
  }
  console.log(result)
  return (
    <div className={styles['quiz-container']}>
      {result.name === '' ? (
        <div className={styles['name-container']}>
          <h2>Введите свое имя</h2>
          <input
            className={styles['input']}
            type="text"
            placeholder="Введите свое имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleStart} disabled={name.trim() === ''}>
            Начать
          </button>
        </div>
      ) : !showResult ? (
        <div>
          <div>
            <span className={styles['active-question-no']}>
              {addLeadingZero(activeQuestion + 1)}
            </span>
            <span className={styles['total-question']}>
              /{addLeadingZero(questions.length)}
            </span>
          </div>
          <h2>{question}</h2>
          <ul>
            {choices &&
              choices.map((answer, index) => (
                <li
                  onClick={() => onAnswerSelected(answer, index)}
                  key={answer}
                  className={
                    selectedAnswerIndex === index
                      ? styles['selected-answer']
                      : ''
                  }
                >
                  {answer}
                </li>
              ))}
          </ul>
          <div className={styles['flex-right']}>
            <button
              onClick={onClickNext}
              disabled={selectedAnswerIndex === null}
            >
              {activeQuestion === questions.length - 1 ? 'Конец' : 'next'}
            </button>
          </div>
        </div>
      ) : (
        <Result questions={questions} result={result} />
      )}
    </div>
  )
}
