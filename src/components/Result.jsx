/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import '../components/style.css'
export const Result = ({ questions, result }) => {
  return (
    <div className="result">
      <h3>
        {' '}
        {result?.name[0].toUpperCase() + result?.name.slice(1)} Ваш результат
      </h3>
      <p>
        Всего вопросов: <span>{questions?.length}</span>
      </p>
      <p>
        Общий счет:<span> {result?.score}</span>
      </p>
      <p>
        Верных ответов:<span> {result?.correctAnswers}</span>
      </p>
      <p>
        Неправильные ответы:<span> {result?.wrongAnswers}</span>
      </p>
    </div>
  )
}
