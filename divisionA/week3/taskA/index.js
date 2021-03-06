/*
 * A. Угадай число - 2
 *
 * Ограничение времени - 1 секунда
 * Ограничение памяти - 64Mb
 * Ввод - стандартный ввод или input.txt
 * Вывод - стандартный вывод или output.txt
 *
 * Август загадал натуральное число от 1 до n. Беатриса пытается угадать это число, для этого она называет некоторые множества натуральных чисел. Август отвечает Беатрисе YES, если среди названных ей чисел есть задуманное или NO в противном случае. После нескольких заданных вопросов Беатриса запуталась в том, какие вопросы она задавала и какие ответы получила и просит вас помочь ей определить, какие числа мог задумать Август.
 * Август и Беатриса продолжают играть в игру, но Август начал жульничать. На каждый из вопросов Беатрисы он выбирает такой вариант ответа YES или NO, чтобы множество возможных задуманных чисел оставалось как можно больше. Например, если Август задумал число от 1 до 5, а Беатриса спросила про числа 1 и 2, то Август ответит NO, а если Беатриса спросит про 1, 2, 3, то Август ответит YES. Если же Беатриса в своем вопросе перечисляет ровно половину из задуманных чисел, то Август из вредности всегда отвечает NO. Наконец, Август при ответе учитывает все предыдущие вопросы Беатрисы и свои ответы на них, то есть множество возможных задуманных чисел уменьшается.
 *
 * Формат ввода
 * Вам дана последовательность вопросов Беатрисы. Приведите ответы Августа на них. Первая строка входных данных содержит число n — наибольшее число, которое мог загадать Август. Далее идут строки, содержащие вопросы Беатрисы. Каждая строка представляет собой набор чисел, разделенных пробелами. Последняя строка входных данных содержит одно слово HELP.
 *
 * Формат вывода
 * Для каждого вопроса Беатрисы выведите ответ Августа на этот вопрос. После этого выведите (через пробел, в порядке возрастания) все числа, которые мог загадать Август после ответа на все вопросы Беатрисы.
 * */

const { readFile } = require('fs/promises')
const { resolve } = require('path')

async function readInput(filePath) {
  const input = await readFile(resolve(__dirname, filePath), { encoding: 'utf8' })
  return input.trim().split('\n')
}

async function getGuessNumberResults(max, ...tries) {
  let available = new Set()
  const answers = []
  for (let i = 1; i <= max; i++) {
    available.add(`${i}`)
  }

  for (let j = 0; j < tries.length; j++) {
    if (tries[j] === 'HELP') {
      answers.push([...available].join(' '))
      return answers.join('\n')
    }

    const guess = tries[j].split(' ').filter(num => available.has(num))

    if (guess.length > available.size / 2) {
      const newAvailable = new Set()
      for (let l = 0; l < guess.length; l++) {
        if (available.has(guess[l])) {
          newAvailable.add(guess[l])
        }
      }
      available = newAvailable
      answers.push('YES')
    } else {
      for (let k = 0; k < guess.length; k++) {
        available.delete(guess[k])
      }
      answers.push('NO')
    }
  }
}

;(async () => {
  console.log(await getGuessNumberResults(...(await readInput('input.txt'))))
})()
