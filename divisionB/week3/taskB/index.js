/*
 * B. Встречалось ли число раньше
 *
 * Ограничение времени - 1 секунда
 * Ограничение памяти - 64Mb
 * Ввод - стандартный ввод или input.txt
 * Вывод - стандартный вывод или output.txt
 *
 * Во входной строке записана последовательность чисел через пробел. Для каждого числа выведите слово YES (в отдельной строке), если это число ранее встречалось в последовательности или NO, если не встречалось.
 *
 * Формат ввода
 * Вводится список чисел. Все числа списка находятся на одной строке.
 *
 * Формат вывода
 * Выведите ответ на задачу.
 * */

const { readFile } = require('fs/promises')
const { resolve } = require('path')

async function readInput(filePath) {
  const input = await readFile(resolve(__dirname, filePath), { encoding: 'utf8' })
  return input.trim().split(' ')
}

async function showOccurrences(arr) {
  const previous = new Set()
  const answers = []

  for (let i = 0; i < arr.length; i++) {
    if (previous.has(arr[i])) {
      answers.push('YES')
    } else {
      answers.push('NO')
      previous.add(arr[i])
    }
  }

  return answers.join('\n')
}

;(async () => {
  console.log(await showOccurrences(await readInput('input.txt')))
})()
