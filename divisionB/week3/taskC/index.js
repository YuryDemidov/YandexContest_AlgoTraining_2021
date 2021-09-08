/*
 * C. Уникальные элементы
 *
 * Ограничение времени - 1 секунда
 * Ограничение памяти - 64Mb
 * Ввод - стандартный ввод или input.txt
 * Вывод - стандартный вывод или output.txt
 *
 * Дан список. Выведите те его элементы, которые встречаются в списке только один раз. Элементы нужно выводить в том порядке, в котором они встречаются в списке.
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

async function getUnique(arr) {
  const elements = {}
  const result = []

  for (let i = 0; i < arr.length; i++) {
    elements[arr[i]] = elements[arr[i]] ? elements[arr[i]] + 1 : 1
  }
  for (let j = 0; j < arr.length; j++) {
    if (elements[arr[j]] === 1) {
      result.push(arr[j])
    }
  }

  return result.join(' ')
}

;(async () => {
  console.log(await getUnique(await readInput('input.txt')))
})()
