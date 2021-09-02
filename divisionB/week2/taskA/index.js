/*
 * A. Количество равных максимальному
 *
 * Ограничение времени - 1 секунда
 * Ограничение памяти - 64Mb
 * Ввод - стандартный ввод или input.txt
 * Вывод - стандартный вывод или output.txt
 *
 * Последовательность состоит из натуральных чисел и завершается числом 0. Всего вводится не более 10000 чисел (не считая завершающего числа 0). Определите, сколько элементов этой последовательности равны ее наибольшему элементу.
 * Числа, следующие за числом 0, считывать не нужно.
 *
 * Формат ввода
 * Вводится последовательность целых чисел, оканчивающаяся числом 0 (само число 0 в последовательность не входит).
 *
 * Формат вывода
 * Выведите ответ на задачу.
 * */

const { readFile } = require('fs/promises')
const { resolve } = require('path')

async function readInput(filePath) {
  const input = await readFile(resolve(__dirname, filePath), { encoding: 'utf8' })
  return input.split('\n').map(v => +v)
}

async function countMax(...numbers) {
  const dict = {}
  let max = 0
  let i = 0
  while (numbers[i]) {
    max = numbers[i] > max ? numbers[i] : max
    dict[numbers[i]] = dict[numbers[i]] ? ++dict[numbers[i]] : 1
    i++
  }
  return dict[max]
}

;(async () => {
  console.log(await countMax(...(await readInput('input.txt'))))
})()
