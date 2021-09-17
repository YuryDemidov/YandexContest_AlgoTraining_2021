/*
 * A. Префиксные суммы
 *
 * Ограничение времени - 1 секунда
 * Ограничение памяти - 256Mb
 * Ввод - стандартный ввод или input.txt
 * Вывод - стандартный вывод или output.txt
 *
 * В этой задаче вам нужно будет много раз отвечать на запрос «Найдите сумму чисел на отрезке в массиве».
 *
 * Формат ввода
 * В первой строке записано два целых числа n и q (1 ≤ n,q ≤ 3⋅10^5) - размер массива и количество запросов. Во второй строке записаны n целых чисел ai (1 ≤ ai ≤ 10^9) - сам массив.Далее в q строках описаны запросы к массиву. Каждый запрос описывается двумя числами l, r (1 ≤ l ≤ r ≤ n) - левой и правой границей отрезка, на котором нужно найти сумму.
 *
 * Формат вывода
 * Для каждого запроса в отдельной строке выведите единственное число - сумму на соответствующем отрезке.
 * */

const { readFile } = require('fs/promises')
const { resolve } = require('path')

async function readInput(filePath) {
  const input = await readFile(resolve(__dirname, filePath), { encoding: 'utf8' })
  return input.trim().split('\n')
}

async function getArrayPartSum(data) {
  const arr = data[1].split(' ').map(Number)
  const prefixSums = [0]
  const responses = []

  for (let i = 0; i < arr.length; i++) {
    prefixSums.push(arr[i] + prefixSums[i])
  }

  for (let j = 2; j < data.length; j++) {
    const [l, r] = data[j].split(' ')
    responses.push(prefixSums[r] - prefixSums[l - 1])
  }

  return responses.join('\n')
}

;(async () => {
  console.log(await getArrayPartSum(await readInput('input.txt')))
})()
