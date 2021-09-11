/*
 * C. Частотный анализ
 *
 * Ограничение времени - 2 секунды
 * Ограничение памяти - 64Mb
 * Ввод - стандартный ввод или input.txt
 * Вывод - стандартный вывод или output.txt
 *
 * Дан текст. Выведите все слова, встречающиеся в тексте, по одному на каждую строку. Слова должны быть отсортированы по убыванию их количества появления в тексте, а при одинаковой частоте появления — в лексикографическом порядке. Указание. После того, как вы создадите словарь всех слов, вам захочется отсортировать его по частоте встречаемости слова. Желаемого можно добиться, если создать список, элементами которого будут кортежи из двух элементов: частота встречаемости слова и само слово. Например, [(2, 'hi'), (1, 'what'), (3, 'is')]. Тогда стандартная сортировка будет сортировать список кортежей, при этом кортежи сравниваются по первому элементу, а если они равны — то по второму. Это почти то, что требуется в задаче.
 *
 * Формат ввода
 * Вводится текст.
 *
 * Формат вывода
 * Выведите ответ на задачу.
 * */

const { readFile } = require('fs/promises')
const { resolve } = require('path')

async function readInput(filePath) {
  const input = await readFile(resolve(__dirname, filePath), { encoding: 'utf8' })
  return input.trim().split(/\s+/)
}

async function countWords(...words) {
  const results = {}

  for (const word of words) {
    if (!results[word]) {
      results[word] = {
        word,
        count: 1,
      }
    } else {
      results[word].count++
    }
  }

  const sorted = Object.values(results)
  sorted.sort((a, b) => {
    if (a.count === b.count) {
      return a.word > b.word ? 1 : -1
    } else {
      return b.count - a.count
    }
  })

  const answer = []
  for (let i = 0; i < sorted.length; i++) {
    answer.push(sorted[i].word)
  }

  return answer.join('\n')
}

;(async () => {
  console.log(await countWords(...(await readInput('input.txt'))))
})()
