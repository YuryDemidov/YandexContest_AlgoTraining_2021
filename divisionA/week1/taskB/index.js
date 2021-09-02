/*
 * B. Параллелограмм
 *
 * Ограничение времени - 1 секунда
 * Ограничение памяти - 64Mb
 * Ввод - стандартный ввод или input.txt
 * Вывод - стандартный вывод или output.txt
 *
 * На уроке геометрии семиклассники Вася и Петя узнали, что такое параллелограмм. На перемене после урока они стали играть в игру: Петя называл координаты четырех точек в произвольном порядке, а Вася должен был ответить, являются ли эти точки вершинами параллелограмма.
 * Вася, если честно, не очень понял тему про параллелограммы, и ему требуется программа, умеющая правильно отвечать на Петины вопросы.
 * Напомним, что параллелограммом называется четырехугольник, противоположные стороны которого равны и параллельны.
 *
 * Формат ввода
 * В первой строке входного файла записано целое число N (1 ≤ N ≤ 10) - количество заданных Петей вопросов. Каждая из N последующих строк содержит описание четырех точек - четыре пары целых чисел X и Y (−100 ≤ X ≤ 100, −100 ≤ Y ≤ 100), обозначающих координаты точки. Гарантируется, что четыре точки, о которых идет речь в одном вопросе, не лежат на одной прямой.
 *
 * Формат вывода
 * Для каждого из вопросов выведите "YES", если четыре заданные точки могут образовать параллелограмм, и "NO" в противном случае. Ответ на каждый из запросов должен быть в отдельной строке без кавычек.
 * */

const { readFile } = require('fs/promises')
const { resolve } = require('path')

async function readInput(filePath) {
  const input = await readFile(resolve(__dirname, filePath), { encoding: 'utf8' })
  return input.split('\n')
}

async function isParallelograms(N, ...questions) {
  const answers = []

  for (let i = 0; i < N; i++) {
    const [x1, y1, x2, y2, x3, y3, x4, y4] = questions[i].split(/\s+/)

    if (
      (x1 === x2 && y1 === y2) ||
      (x1 === x3 && y1 === y3) ||
      (x1 === x4 && y1 === y4) ||
      (x2 === x3 && y2 === y3) ||
      (x2 === x4 && y2 === y4) ||
      (x3 === x4 && y3 === y4)
    ) {
      answers.push('NO')
      continue
    }

    const AB = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
    const BC = Math.sqrt((x3 - x2) ** 2 + (y3 - y2) ** 2)
    const CD = Math.sqrt((x4 - x3) ** 2 + (y4 - y3) ** 2)
    const DA = Math.sqrt((x1 - x4) ** 2 + (y1 - y4) ** 2)
    const BD = Math.sqrt((x2 - x4) ** 2 + (y2 - y4) ** 2)
    const AC = Math.sqrt((x1 - x3) ** 2 + (y1 - y3) ** 2)

    const firstCond = AB === CD
    const secCond = BC === DA
    const thirdCond = BD === AC
    const fourthCond =
      Math.round(AC ** 2 + BD ** 2) === Math.round(2 * (AB ** 2 + BC ** 2)) ||
      Math.round(AB ** 2 + CD ** 2) === Math.round(2 * (AC ** 2 + BC ** 2)) ||
      Math.round(DA ** 2 + BC ** 2) === Math.round(2 * (AB ** 2 + AC ** 2))

    answers.push(firstCond + secCond + thirdCond + fourthCond >= 3 ? 'YES' : 'NO')
  }

  return answers.join('\n')
}

;(async () => {
  console.log(await isParallelograms(...(await readInput('input.txt'))))
})()
