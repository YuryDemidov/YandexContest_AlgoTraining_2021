/*
 * A. Количество совпадающих
 *
 * Ограничение времени - 1 секунда
 * Ограничение памяти - 64Mb
 * Ввод - стандартный ввод или input.txt
 * Вывод - стандартный вывод или output.txt
 *
 * Даны два списка чисел, которые могут содержать до 100000 чисел каждый. Посчитайте, сколько чисел содержится одновременно как в первом списке, так и во втором. Примечание. Эту задачу на Питоне можно решить в одну строчку.
 *
 * Формат ввода
 * Вводятся два списка чисел. Все числа каждого списка находятся на отдельной строке.
 *
 * Формат вывода
 * Выведите ответ на задачу.
 * */

const { readFile } = require('fs/promises')
const { resolve } = require('path')

async function readInput(filePath) {
  const input = await readFile(resolve(__dirname, filePath), { encoding: 'utf8' })
  return input
    .trim()
    .split('\n')
    .map(numbers => numbers.split(' '))
}

async function countDuplicates(arr1, arr2) {
  const occurrences = new Set()
  let duplicates = 0

  for (let i = 0; i < arr1.length; i++) {
    occurrences.add(arr1[i])
  }
  for (let j = 0; j < arr2.length; j++) {
    if (occurrences.has(arr2[j])) {
      duplicates++
    }
  }

  return duplicates
}

;(async () => {
  console.log(await countDuplicates(...(await readInput('input.txt'))))
})()
