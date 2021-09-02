/*
 * A. Сложное уравнение
 *
 * Ограничение времени - 1 секунда
 * Ограничение памяти - 64Mb
 * Ввод - стандартный ввод или input.txt
 * Вывод - стандартный вывод или output.txt
 *
 * Решить в целых числах уравнение ( ax + b ) : ( cx + d ) = 0
 *
 * Формат ввода
 * Вводятся 4 числа: a, b, c и d; c и d не равны нулю одновременно.
 *
 * Формат вывода
 * Необходимо вывести все целочисленные решения, если их число конечно, “NO” (без кавычек), если целочисленных решений нет, и “INF” (без кавычек), если их бесконечно много.
 * */

const { readFile } = require('fs/promises')
const { resolve } = require('path')

async function readInput(filePath) {
  const input = await readFile(resolve(__dirname, filePath), { encoding: 'utf8' })
  return input.split('\n').map(v => +v)
}

async function calculate(a, b, c, d) {
  if (a === 0 && b === 0) {
    return 'INF'
  }
  if (a === 0 || (b === 0 && d === 0)) {
    return 'NO'
  }
  if (b === 0) {
    return 0
  }

  let ans = -b / a
  let invalidAns = c === 0 ? null : -d / c

  if ((invalidAns && ans === invalidAns) || !Number.isInteger(ans)) {
    return 'NO'
  }

  return ans
}

;(async () => {
  console.log(await calculate(...(await readInput('input.txt'))))
})()
