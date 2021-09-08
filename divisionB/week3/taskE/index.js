/*
 * E. Автомобильные номера
 *
 * Ограничение времени - 1 секунда
 * Ограничение памяти - 64Mb
 * Ввод - стандартный ввод или input.txt
 * Вывод - стандартный вывод или output.txt
 *
 * Неизвестный водитель совершил ДТП и скрылся с места происшествия. Полиция опрашивает свидетелей. Каждый из них говорит, что запомнил какие-то буквы и цифры номера. Но при этом свидетели не помнят порядок этих цифр и букв. Полиция хочет проверить несколько подозреваемых автомобилей. Будем говорить, что номер согласуется с показанием свидетеля, если все символы, которые назвал свидетель, присутствуют в этом номере (не важно, сколько раз).
 *
 * Формат ввода
 * Сначала задано число M <= 100 - количество свидетелей. Далее идет M строк, каждая из которых описывает показания очередного свидетеля. Эти строки непустые и состоят из не более чем 20 символов. Каждый символ в строке - либо цифра, либо заглавная латинская буква, причём символы могут повторяться.
 * Затем идёт число N <= 1000 - количество номеров. Следующие строки представляют из себя номера подозреваемых машин и имеют такой же формат, как и показания свидетелей.
 *
 * Формат вывода
 * Выпишите номера автомобилей, согласующиеся с максимальным количеством свидетелей. Если таких номеров несколько, то выведите их в том же порядке, в котором они были заданы на входе.
 * */

const { readFile } = require('fs/promises')
const { resolve } = require('path')

async function readInput(filePath) {
  const input = await readFile(resolve(__dirname, filePath), { encoding: 'utf8' })
  return input.trim().split('\n')
}

async function getCarNumbers(...data) {
  const carNumbers = []
  const people = +data[0]
  const numbers = +data[people + 1]

  for (let i = people + 2; i < people + numbers + 2; i++) {
    carNumbers.push({
      count: 0,
      symbols: new Set(data[i]),
      i,
    })
  }
  for (let i = 0; i < carNumbers.length; i++) {
    for (let j = 1; j <= people; j++) {
      let add = true

      for (let k = 0; k < data[j].length; k++) {
        const symbol = data[j][k]
        if (!carNumbers[i].symbols.has(symbol)) {
          add = false
        }
      }
      if (add) {
        carNumbers[i].count++
      }
    }
  }

  let maxCount = 0
  const result = carNumbers.reduce((acc, item) => {
    if (item.count > maxCount) {
      maxCount = item.count
      return [data[item.i]]
    } else if (item.count === maxCount) {
      acc.push(data[item.i])
    }
    return acc
  }, [])

  return result.join('\n')
}

;(async () => {
  console.log(await getCarNumbers(...(await readInput('input.txt'))))
})()
