// 1.	Напишите функцию formatDate(date), которая выводит дату date в формате дд.мм.гг.
const dateDisplay = document.querySelector('#dateDisplay')

function formatDate(date) {
  date = new Date(date)
  const month = date.getMonth() + 1
  const year = date.getFullYear().toString().substring(2, 4)

  function zeroForward(value) {
    return value > 10 ? value : '0' + value
  }

  return `${zeroForward(date.getDate())}.${zeroForward(month)}.${year}`
}

dateDisplay.innerHTML = formatDate(new Date(2001, 2, 1))

//2.	Напишите функцию ucFirst(str), возвращающую строку str с заглавным первым символом.

const capitalizeDisplay = document.querySelector('#capitalizeDisplay')

function capitalize(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1, str.length + 1)
}

capitalizeDisplay.innerHTML = capitalize('hello')

//3.	Напишите функцию checkSpam(str), возвращающую true, если str содержит 'viagra' или 'XXX', а иначе false.

const spamCheckDisplay = document.querySelector('#spamCheckDisplay')

function checkSpam(str) {
  const regex = new RegExp('viagra|xxx', 'i')
  regex.ignoreCase = false
  return regex.test(str)
}

spamCheckDisplay.innerHTML = checkSpam('buy ViAgRA now')

//4.	Выделить число

const valueExtractorDisplay = document.querySelector('#valueExtractorDisplay')

function extractCurrencyValue(str) {
  while (/\$/.test(str)) {
    str = str.replace(/\$/, '')
  }
  return str
}

valueExtractorDisplay.innerHTML = extractCurrencyValue('$$$$100')
