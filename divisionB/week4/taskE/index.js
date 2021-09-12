/*
 * E. Форум
 *
 * Ограничение времени - 1 секунда
 * Ограничение памяти - 64Mb
 * Ввод - стандартный ввод или input.txt
 * Вывод - стандартный вывод или output.txt
 *
 * Клуб Юных Хакеров организовал на своем сайте форум. Форум имеет следующую структуру: каждое сообщение либо начинает новую тему, либо является ответом на какое-либо предыдущее сообщение и принадлежит той же теме.
 * После нескольких месяцев использования своего форума юных хакеров заинтересовал вопрос - какая тема на их форуме наиболее популярна. Помогите им выяснить это.
 *
 * Формат ввода
 * В первой строке вводится целое число N - количество сообщений в форуме (1 <= N <= 1000). Следующие строки содержат описание сообщений в хронологическом порядке.
 * Описание сообщения, которое представляет собой начало новой темы, состоит из трех строк. Первая строка содержит число 0. Вторая строка содержит название темы. Длина названия не превышает 30 символов. Третья строка содержит текст сообщения.
 * Описание сообщения, которое является ответом на другое сообщение, состоит из двух строк. Первая строка содержит целое число - номер сообщения, ответом на которое оно является. Сообщения нумеруются, начиная с единицы. Ответ всегда появляется позже, чем сообщение, ответом на которое он является. Вторая строка содержит текст сообщения.
 * Длина каждого из сообщений не превышает 100 символов.
 *
 * Формат вывода
 * Выведите название темы, к которой относится наибольшее количество сообщений. Если таких тем несколько, то выведите первую в хронологическом порядке
 * */

const { readFile } = require('fs/promises')
const { resolve } = require('path')

async function readInput(filePath) {
  const input = await readFile(resolve(__dirname, filePath), { encoding: 'utf8' })
  return input.trim().split('\n')
}

async function getMostPopularTheme(total, ...messagesData) {
  const messages = []

  for (let i = 0; i < messagesData.length; i++) {
    const relatedMessage = +messagesData[i]
    if (Number.isNaN(relatedMessage)) {
      continue
    }

    const message = { rel: relatedMessage }
    if (!relatedMessage) {
      message.messages = 1
      message.theme = messagesData[i + 1]
    }
    messages.push(message)
  }

  let mostPopularThread = messages[0]
  for (let i = 0; i < messages.length; i++) {
    if (!messages[i].rel) {
      continue
    }

    let current = messages[i]
    while (current.rel) {
      current = messages[current.rel - 1]
    }
    current.messages++

    if (mostPopularThread.messages < current.messages) {
      mostPopularThread = current
    }
  }

  return mostPopularThread.theme
}

;(async () => {
  console.log(await getMostPopularTheme(...(await readInput('input.txt'))))
})()
