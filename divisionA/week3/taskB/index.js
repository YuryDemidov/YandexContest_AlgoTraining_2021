/*
 * B. Мультиграф
 *
 * Ограничение времени - 1 секунда
 * Ограничение памяти - 64Mb
 * Ввод - стандартный ввод или input.txt
 * Вывод - стандартный вывод или output.txt
 *
 * Дан неориентированный невзвешенный граф. В графе возможны петли и кратные рёбра. Постройте такой новый граф без петель и кратных рёбер, что для любых двух вершин в нём расстояние равно расстоянию в исходном графе. Если вершины не связны, расстояние между ними бесконечность.
 *
 * Формат ввода
 * На первой строке число вершин n и число рёбер m (1 ≤ n,m ≤ 100000). Следующие m строк содержат пары чисел от 1 до n – рёбра графа.
 *
 * Формат вывода
 * Новый граф в таком же формате. Рёбра можно выводить в произвольном формате.
 * */

const { readFile } = require('fs/promises')
const { resolve } = require('path')

async function readInput(filePath) {
  const input = await readFile(resolve(__dirname, filePath), { encoding: 'utf8' })
  return input.trim().split('\n')
}

async function removeLoopsAndMultipleEdges(graphStructure, ...edges) {
  const totalV = graphStructure.split(' ')[0]
  const answerStructure = {}

  for (let i = 0; i < edges.length; i++) {
    const [v1, v2] = edges[i].split(' ')
    const min = Math.min(+v1, +v2)
    const max = +v1 === min ? +v2 : +v1
    const edge = `${min}-${max}`
    if (!answerStructure[edge] && min !== max) {
      answerStructure[edge] = `${min} ${max}`
    }
  }

  const answerEdges = Object.values(answerStructure)
  return `${totalV} ${answerEdges.length}\n${answerEdges.join('\n')}`
}

;(async () => {
  console.log(await removeLoopsAndMultipleEdges(...(await readInput('input.txt'))))
})()
