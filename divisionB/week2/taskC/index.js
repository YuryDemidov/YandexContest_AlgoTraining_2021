/*
 * C. Изготовление палиндромов
 *
 * Ограничение времени - 2 секунды
 * Ограничение памяти - 512Mb
 * Ввод - стандартный ввод или input.txt
 * Вывод - стандартный вывод или output.txt
 *
 * В строкоремонтную мастерскую принесли строку, состоящую из строчных латинских букв. Заказчик хочет сделать из неё палиндром. В мастерской могут за 1 байтландский тугрик заменить произвольную букву в строке любой выбранной заказчиком буквой.
 * Какую минимальную сумму придётся заплатить заказчику за ремонт строки?
Напомним, что палиндромом называется строка, которая равна самой себе, прочитанной в обратном направлении.
 *
 * Формат ввода
 * Входные данные содержат непустую строку, состоящую из строчных латинских букв, которую принёс заказчик. Длина строки не превосходит 10^4.
 *
 * Формат вывода
 * Выведите одно целое число — минимальную сумму, которую заказчику придётся заплатить за превращение принесённой заказчиком строки в палиндром.
 * */

const { readFile } = require('fs/promises')
const { resolve } = require('path')

async function readInput(filePath) {
  const input = await readFile(resolve(__dirname, filePath), { encoding: 'utf8' })
  return input.trim().split('')
}

async function getPalindromeCost(strArr) {
  let cost = 0

  for (let i = 0; i <= strArr.length / 2 - 1; i++) {
    if (strArr[i] !== strArr[strArr.length - 1 - i]) {
      cost++
    }
  }

  return cost
}

;(async () => {
  console.log(await getPalindromeCost(await readInput('input.txt')))
})()