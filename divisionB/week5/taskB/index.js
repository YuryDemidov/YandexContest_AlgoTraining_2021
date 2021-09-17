/*
 * B. Максимальная сумма
 *
 * Ограничение времени - 1 секунда
 * Ограничение памяти - 256Mb
 * Ввод - стандартный ввод или input.txt
 * Вывод - стандартный вывод или output.txt
 *
 * В этой задаче вам требуется найти непустой отрезок массива с максимальной суммой.
 *
 * Формат ввода
 * В первой строке входных данных записано единственное число n (1 ≤ n ≤ 3⋅10^5) -  размер массива. Во второй строке записано n целых чисел ai (−10^9 ≤ ai ≤ 10^9) - сам массив.
 *
 * Формат вывода
 * Выведите одно число - максимальную сумму на отрезке в данном массиве.
 * */

const { readFile } = require('fs/promises')
const { resolve } = require('path')

async function readInput(filePath) {
  const input = await readFile(resolve(__dirname, filePath), { encoding: 'utf8' })
  return input.trim().split(/\s+/).map(Number)
}

async function maxArrPartSum(arr) {
  let max = Number.MIN_SAFE_INTEGER
  let localMax = 0

  for (let i = 1; i < arr.length; i++) {
    localMax = Math.max(arr[i], localMax + arr[i])
    max = max < localMax ? localMax : max
  }

  return max
}

;(async () => {
  console.log(await maxArrPartSum(await readInput('input.txt')))
})()
