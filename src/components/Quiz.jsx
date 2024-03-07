import { useState, useRef } from 'react'
import { quiz } from '../../quiz'
import styles from '../components/style.module.scss'
import { Result } from './Result'

import correctSound from '../assets/correct.mp3'
import incorrectSound from '../assets/incorrect.mp3'
export const Quiz = () => {
  const [activeQuestion, setActiveQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
  const [answer, setAnswer] = useState('')
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    name: '',
  })
  const [name, setName] = useState('')

  const correctAudioRef = useRef(null)
  const incorrectAudioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const { questions } = quiz
  const { question, choices, correctAnswer, img, type } =
    questions[activeQuestion]

  const onClickNext = () => {
    if (!type) {
      if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
        setResult((prev) => ({
          ...prev,
          score: prev.score + 200,
          correctAnswers: prev.correctAnswers + 1,
        }))

        correctAudioRef.current.play()
      } else {
        setResult((prev) => ({
          ...prev,
          wrongAnswers: prev.wrongAnswers + 1,
        }))
        incorrectAudioRef.current.play()
      }
      setIsPlaying(true)
    } else {
      if (selectedAnswer) {
        setResult((prev) => ({
          ...prev,
          score: prev.score + 200,
          correctAnswers: prev.correctAnswers + 1,
        }))
        correctAudioRef.current.play()
      } else {
        setResult((prev) => ({
          ...prev,
          wrongAnswers: prev.wrongAnswers + 1,
        }))
        incorrectAudioRef.current.play()
      }
      setIsPlaying(true)
    }
    setAnswer('')
    setSelectedAnswerIndex(null)
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

  const handleAudioEnded = () => {
    setIsPlaying(false)
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1)
    } else {
      setActiveQuestion(0)
      setShowResult(true)
    }
  }

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
          <img className={styles['image']} src={img} alt="" />
          {type ? (
            <ul>
              {choices &&
                choices.map((answer, index) => (
                  <li
                    onClick={() => onAnswerSelected(answer, index)}
                    key={answer}
                    className={
                      selectedAnswerIndex === index
                        ? styles['selected-answer']
                        : isPlaying && answer === correctAnswer
                        ? styles['correct-answer']
                        : ''
                    }
                  >
                    {answer}
                  </li>
                ))}
            </ul>
          ) : (
            <>
              {isPlaying && <h5>Верный ответ: {correctAnswer}</h5>}
              <input
                className={styles['input']}
                type="text"
                placeholder="Введите ответ"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </>
          )}

          <div className={styles['flex-right']}>
            <button
              onClick={onClickNext}
              disabled={
                !type
                  ? answer === ''
                  : selectedAnswerIndex === null || isPlaying
              }
            >
              {activeQuestion === questions.length - 1 ? 'Конец' : 'Ответить'}
            </button>
          </div>
        </div>
      ) : (
        <Result questions={questions} result={result} />
      )}
      <audio
        ref={correctAudioRef}
        src={correctSound}
        onEnded={handleAudioEnded}
      />
      <audio
        ref={incorrectAudioRef}
        src={incorrectSound}
        onEnded={handleAudioEnded}
      />
    </div>
  )
}
