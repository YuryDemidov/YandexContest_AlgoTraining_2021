/*
 * D. Выборы Государственной Думы
 *
 * Ограничение времени - 2 секунды
 * Ограничение памяти - 64Mb
 * Ввод - стандартный ввод или input.txt
 * Вывод - стандартный вывод или output.txt
 *
 * Статья 83 закона “О выборах депутатов Государственной Думы Федерального Собрания Российской Федерации” определяет следующий алгоритм пропорционального распределения мест в парламенте.
 * Необходимо распределить 450 мест между партиями, участвовавших в выборах. Сначала подсчитывается сумма голосов избирателей, поданных за каждую партию и подсчитывается сумма голосов, поданных за все партии. Эта сумма делится на 450, получается величина, называемая “первое избирательное частное” (смысл первого избирательного частного - это количество голосов избирателей, которое необходимо набрать для получения одного места в парламенте).
 * Далее каждая партия получает столько мест в парламенте, чему равна целая часть от деления числа голосов за данную партию на первое избирательное частное.
 * Если после первого раунда распределения мест сумма количества мест, отданных партиям, меньше 450, то оставшиеся места передаются по одному партиям, в порядке убывания дробной части частного от деления числа голосов за данную партию на первое избирательное частное. Если же для двух партий эти дробные части равны, то преимущество отдается той партии, которая получила большее число голосов.
 *
 * Формат ввода
 * На вход программе подается список партий, участвовавших в выборах. Каждая строка входного файла содержит название партии (строка, возможно, содержащая пробелы), затем, через пробел, количество голосов, полученных данной партией – число, не превосходящее 10^8.
 *
 * Формат вывода
 * Программа должна вывести названия всех партий и количество голосов в парламенте, полученных данной партией. Названия необходимо выводить в том же порядке, в котором они шли во входных данных.
 * */

const { readFile } = require('fs/promises')
const { resolve } = require('path')

async function readInput(filePath) {
  const input = await readFile(resolve(__dirname, filePath), { encoding: 'utf8' })
  return input.trim().split('\n')
}

async function countDumaVotes(...results) {
  const DUMA_PLACES = 450
  const votes = []
  let totalVotes = 0

  for (let i = 0; i < results.length; i++) {
    const result = results[i]
    const lastSpaceIndex = result.lastIndexOf(' ')
    const party = result.slice(0, lastSpaceIndex)
    const count = +result.slice(lastSpaceIndex + 1)
    votes.push({
      i,
      party,
      count,
      places: 0,
    })
    totalVotes += count
  }

  const definingDivisionResult = totalVotes / DUMA_PLACES

  let totalPlaces = 0
  votes.forEach(party => {
    const countReminder = party.count % definingDivisionResult
    party.places = Math.floor(party.count / definingDivisionResult)
    totalPlaces += party.places
    party.count = countReminder
  })
  if (totalPlaces < DUMA_PLACES) {
    votes.sort((a, b) => b.count - a.count)
    for (let i = 1; i <= DUMA_PLACES - totalPlaces; i++) {
      votes[i - 1].places++
    }
  }

  votes.sort((a, b) => a.i - b.i)

  const answers = []
  for (let i = 0; i < votes.length; i++) {
    answers.push(`${votes[i].party} ${votes[i].places}`)
  }
  return answers.join('\n')
}

;(async () => {
  console.log(await countDumaVotes(...(await readInput('input.txt'))))
})()
