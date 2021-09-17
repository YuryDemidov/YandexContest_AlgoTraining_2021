/*
 * D. Правильная, круглая, скобочная
 *
 * Ограничение времени - 1 секунда
 * Ограничение памяти - 64Mb
 * Ввод - стандартный ввод или input.txt
 * Вывод - стандартный вывод или output.txt
 *
 * Если из правильного арифметического выражения вычеркнуть всё, кроме круглых скобок, то получится правильная скобочная последовательность. Проверьте, является ли введённая строка правильной скобочной последовательностью.
 *
 * Формат ввода
 * Вводится непустая строка, состоящая из открывающих и закрывающих круглых скобок. Длина строки не превосходит 100000
 *
 * Формат вывода
 * Выведите YES если введённая строка является правильной скобочной последовательностью и NO иначе
 * */

const { readFile } = require('fs/promises')
const { resolve } = require('path')

async function readInput(filePath) {
  const input = await readFile(resolve(__dirname, filePath), { encoding: 'utf8' })
  return input.trim().split('')
}

function isCorrectBraces(...sequence) {
  let bracesCounter = 0

  for (let i = 0; i < sequence.length; i++) {
    if (sequence[i] === '(') {
      ++bracesCounter
    } else {
      --bracesCounter
    }
    if (bracesCounter < 0) {
      return 'NO'
    }
  }

  return bracesCounter === 0 ? 'YES' : 'NO'
}

;(async () => {
  console.log(isCorrectBraces(...(await readInput('input.txt'))))
})()
