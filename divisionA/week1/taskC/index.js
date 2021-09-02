/*
 * C. Проверьте правильность ситуации
 *
 * Ограничение времени - 1 секунда
 * Ограничение памяти - 64Mb
 * Ввод - стандартный ввод или input.txt
 * Вывод - стандартный вывод или output.txt
 *
 * Напишите программу, которая по изображению поля для игры в «Крестики-нолики» определит, могла ли такая ситуация возникнуть в результате игры с соблюдением всех правил.
 * Напомним, что игра в «Крестики-нолики» ведется на поле 3*3. Два игрока ходят по очереди. Первый ставит крестик, а второй – нолик. Ставить крестик и нолик разрешается в любую еще не занятую клетку поля. Когда один из игроков поставит три своих знака в одной горизонтали, вертикали или диагонали, или когда все клетки поля окажутся заняты, игра заканчивается.
 *
 * Формат ввода
 * Вводится три строки по три числа в каждой, описывающих игровое поле. Число 0 обозначает пустую клетку, 1 – крестик, 2 – нолик. Числа в строке разделяются пробелами.
 *
 * Формат вывода
 * Требуется вывести слово YES, если указанная ситуация могла возникнуть в ходе игры, и NO в противном случае.
 * */

const { readFile } = require('fs/promises')
const { resolve } = require('path')

async function readInput(filePath) {
  const input = await readFile(resolve(__dirname, filePath), { encoding: 'utf8' })
  return input.split(/\s/).map(v => +v)
}

function isWinner(player, cells) {
  return (
    (cells[0] === player && cells[1] === player && cells[2] === player) ||
    (cells[3] === player && cells[4] === player && cells[5] === player) ||
    (cells[6] === player && cells[7] === player && cells[8] === player) ||
    (cells[0] === player && cells[3] === player && cells[6] === player) ||
    (cells[1] === player && cells[4] === player && cells[7] === player) ||
    (cells[2] === player && cells[5] === player && cells[8] === player) ||
    (cells[0] === player && cells[4] === player && cells[8] === player) ||
    (cells[2] === player && cells[4] === player && cells[6] === player)
  )
}

async function isRealTicTacToe(...cells) {
  let count1 = 0
  let count2 = 0

  for (let c of cells) {
    count1 = c === 1 ? count1 + 1 : count1
    count2 = c === 2 ? count2 + 1 : count2
  }

  const is1Win = isWinner(1, cells)
  const is2Win = isWinner(2, cells)
  const turnCount = count1 === count2
  const halfTurnCount = count1 === count2 + 1

  if (!(turnCount || halfTurnCount) || (is1Win && turnCount) || (is2Win && halfTurnCount) || (is1Win && is2Win)) {
    return 'NO'
  }

  return 'YES'
}

;(async () => {
  console.log(await isRealTicTacToe(...(await readInput('input.txt'))))
})()
