/*
 * A. Забавный конфуз
 *
 * Ограничение времени - 1 секунда
 * Ограничение памяти - 64Mb
 * Ввод - стандартный ввод или input.txt
 * Вывод - стандартный вывод или output.txt
 *
 * Пусть A — массив, состоящий из N элементов A1,…,AN. Обозначим его максимальное и минимальное значение через max(A) и min(A) соответственно. Вычислим сумму элементов S, S=A1+A2+…+AN. Заменим каждый элемент массива на разницу S и этого элемента: Ai = S - Ai, 1 <= i <= N.
 * Такое преобразование массива A назовем операцией Confuse. Напишите программу, которая по массиву B, полученному в результате K-кратного применения операции Confuse к некоторому массиву A, вычислит разность max(A)-min(A).
 *
 * Формат ввода
 * Первая строка входного файла содержит целые числа N и K, где N — количество элементов массива B (2 <= N <= 10000), а K — количество применений операции Confuse к начальному массиву A, 1 <= K <= 100. Вторая строка файла содержит N элементов массива B. Элементы массива B — целые числа, принадлежащие диапазону от -2 000 000 000 до 2 000 000 000.
 *
 * Формат вывода
 * Единственная строка выходного файла должна содержать целое число - разность max(A) и min(A).
 * */

const { readFile } = require('fs/promises')
const { resolve } = require('path')

async function readInput(filePath) {
  const input = await readFile(resolve(__dirname, filePath), { encoding: 'utf8' })
  return input
    .trim()
    .split(/\s+/)
    .map(v => +v)
}

async function confuseArrayDiff(N, K, ...elements) {
  let max = elements[0]
  let min = elements[0]
  for (let i = 1; i < elements.length; i++) {
    min = elements[i] < min ? elements[i] : min
    max = elements[i] > max ? elements[i] : max
  }
  return max - min
}

;(async () => {
  console.log(await confuseArrayDiff(...(await readInput('input.txt'))))
})()
