/*
 * A. Толя-Карп и новый набор структур, часть 2
 *
 * Ограничение времени - 2 секунды
 * Ограничение памяти - 256Mb
 * Ввод - стандартный ввод или input.txt
 * Вывод - стандартный вывод или output.txt
 *
 * Толя-Карп запросил для себя n посылок с «Аллигатор-экспресс».
 * Посылка представляет из себя ящик. Внутри ящика лежит целое число ai. Номер на ящике di указывает на цвет числа, лежащего внутри.
 * Толю-Карпа интересует, чему будут равны значения чисел, если сложить между собой все те, что имеют одинаковый цвет. Напишите, пожалуйста, программу, которая выводит результат.
 *
 * Формат ввода
 * В первой строке одно число n (0 ≤ n ≤ 2*10^5).
 * В следующих n строках заданы по два числа: цвет числа в ящике di и значение числа ai (-10^18 ≤ di, ai ≤ 10^18).
 * Гарантируется, что сумма чисел одного цвета не превышает 10^18.
 *
 * Формат вывода
 * Выведите в порядке возрастания номера цвета пары чисел, каждая в новой строке: номер цвета и сумму всех чисел данного цвета.
 * */

const { readFile, writeFile } = require('fs/promises')
const { resolve } = require('path')

async function readInput(filePath) {
  const input = await readFile(resolve(__dirname, filePath), { encoding: 'utf8' })
  return input.trim().split('\n')
}

function countNumbers(data) {
  const answer = []
  const results = {}

  for (let i = 1; i <= data[0]; i++) {
    const [number, count] = data[i].split(' ')
    results[number] = results[number] ? results[number] + BigInt(count) : BigInt(count)
  }

  const sorted = Object.keys(results).sort((a, b) => +a - +b)

  for (let i = 0; i < sorted.length; i++) {
    answer.push(`${sorted[i]} ${results[sorted[i]]}`)
  }

  return answer.join('\n')
}

;(async () => {
  const input = await readInput('input.txt')
  await writeFile(resolve(__dirname, 'output.txt'), countNumbers(input), { encoding: 'utf8' })
})()
