/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
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
      <h3>За вы игранные балы вы можете купить :</h3>
      <ul>
        <li>Подарочная карта Золотое яблоко</li>{' '}
        <li>Подарочная карта Иль де ботэ</li>
        <li>Подписка Telegram</li>
        <li>Подписка Okko</li>
        <li>Подписка Яндекс</li>
        <li>Подписка IVI</li>
        <li>Взять деньгами </li>
      </ul>
    </div>
  )
}
