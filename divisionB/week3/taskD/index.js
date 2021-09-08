/*
 * D. Угадай число
 *
 * Ограничение времени - 2 секунды
 * Ограничение памяти - 64Mb
 * Ввод - стандартный ввод или input.txt
 * Вывод - стандартный вывод или output.txt
 *
 * Август и Беатриса играют в игру. Август загадал натуральное число от 1 до n. Беатриса пытается угадать это число, для этого она называет некоторые множества натуральных чисел. Август отвечает Беатрисе YES, если среди названных ей чисел есть задуманное или NO в противном случае. После нескольких заданных вопросов Беатриса запуталась в том, какие вопросы она задавала и какие ответы получила и просит вас помочь ей определить, какие числа мог задумать Август.
 *
 * Формат ввода
 * Первая строка входных данных содержит число n — наибольшее число, которое мог загадать Август. Далее идут строки, содержащие вопросы Беатрисы. Каждая строка представляет собой набор чисел, разделенных пробелами. После каждой строки с вопросом идет ответ Августа: YES или NO. Наконец, последняя строка входных данных содержит одно слово HELP.
 *
 * Формат вывода
 * Вы должны вывести (через пробел, в порядке возрастания) все числа, которые мог задумать Август.
 * */

const { readFile } = require('fs/promises')
const { resolve } = require('path')

async function readInput(filePath) {
  const input = await readFile(resolve(__dirname, filePath), { encoding: 'utf8' })
  return input.trim().split('\n')
}

async function guessNumber(max, ...tries) {
  let possible = new Set()
  for (let i = 1; i <= max; i++) {
    possible.add(i)
  }

  let currentTry = []
  for (let j = 0; j < tries.length; j++) {
    if (tries[j] !== 'YES' && tries[j] !== 'NO' && tries[j] !== 'HELP') {
      currentTry = tries[j].split(' ').map(Number)
      continue
    }

    switch (tries[j]) {
      case 'YES':
        const joinedPossible = new Set()
        for (let m = 0; m < currentTry.length; m++) {
          if (possible.has(currentTry[m])) {
            joinedPossible.add(currentTry[m])
          }
        }
        possible = joinedPossible
        break
      case 'NO':
        for (let k = 0; k < currentTry.length; k++) {
          possible.delete(currentTry[k])
        }
        break
      case 'HELP':
        return [...possible].sort((a, b) => a - b).join(' ')
    }
  }
}

;(async () => {
  console.log(await guessNumber(...(await readInput('input.txt'))))
})()
