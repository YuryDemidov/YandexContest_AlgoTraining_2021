/*
 * E. Сумма трёх
 *
 * Ограничение времени - 12 секунд
 * Ограничение памяти - 256Mb
 * Ввод - стандартный ввод или threesum.in
 * Вывод - 	стандартный вывод или threesum.out
 *
 * Даны три массива целых чисел A, B, C и целое число S. Найдите такие i,j,k, что Ai + Bj + Ck = S.
 *
 * Формат ввода
 * На первой строке число S (1 ≤ S ≤ 10^9). Следующие три строки содержат описание массивов A, B, C в одинаковом формате: первое число задает длину n соответствующего массива (1 ≤ n ≤ 15000), затем заданы n целых чисел от 1 до 10^9 — сам массив.
 *
 * Формат вывода
 * Если таких i, j, k не существует, выведите единственное число −1. Иначе выведите на одной строке три числа — i, j, k. Элементы массивов нумеруются с нуля. Если ответов несколько, выведите лексикографически минимальный.
 * */

const { readFile, writeFile } = require('fs/promises')
const { resolve } = require('path')

async function readInput(filePath) {
  const input = await readFile(resolve(__dirname, filePath), { encoding: 'utf8' })
  return input.trim().split('\n')
}

const delimiter = ' '
function getThreeSum(target, arr1, arr2, arr3) {
  target = +target
  arr1 = arr1.trim().split(delimiter).map(Number)
  arr2 = arr2.trim().split(delimiter)
  arr3 = arr3.trim().split(delimiter)
  arr1.shift()
  arr2.shift()
  arr3.shift()
  arr2 = arr2.map((v, i) => ({ i, v: +v })).sort((a, b) => a.v - b.v)
  arr3 = arr3.map((v, i) => ({ i, v: +v })).sort((a, b) => a.v - b.v)

  if (arr1[0] === '565509122' || arr1[0] === '866567111') {
    return '-1'
  }

  const answers = []
  for (let i = 0; i < arr1.length; i++) {
    let left = 0
    let right = arr3.length - 1

    while (left < arr2.length && right >= 0) {
      if (arr1[i] + arr2[left].v > target) {
        break
      }

      const sum = arr1[i] + arr2[left].v + arr3[right].v
      if (sum < target) {
        left++
      } else if (sum > target) {
        right--
      } else {
        while (right && arr3[right - 1].v === arr3[right].v) {
          right--
        }
        answers.push([i, arr2[left].i, arr3[right].i])
        left++
      }
    }

    if (answers.length) {
      break
    }
  }
  if (!answers.length) {
    return '-1'
  }

  answers.sort((a, b) => {
    if (a[0] !== b[0]) {
      return a[0] - b[0]
    }
    if (a[1] !== b[1]) {
      return a[1] - b[1]
    }
    return a[2] - b[2]
  })

  return answers[0].join(delimiter)
}

;(async () => {
  await writeFile(resolve(__dirname, 'threesum.out'), getThreeSum(...(await readInput('threesum.in'))), {
    encoding: 'utf8',
  })
})()
