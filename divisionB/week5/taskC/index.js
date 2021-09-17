/*
 * C. Каждому по компьютеру
 *
 * Ограничение времени - 1 секунда
 * Ограничение памяти - 64Mb
 * Ввод - стандартный ввод или input.txt
 * Вывод - стандартный вывод или output.txt
 *
 * В новом учебном году на занятия в компьютерные классы Дворца Творчества Юных пришли учащиеся, которые были разбиты на N групп. В i-й группе оказалось Xi человек. Тут же перед директором встала серьезная проблема: как распределить группы по аудиториям. Во дворце имеется M ≥ N аудиторий, в j-й аудитории имеется Yj компьютеров. Для занятий необходимо, чтобы у каждого учащегося был компьютер и еще один компьютер был у преподавателя. Переносить компьютеры из одной аудитории в другую запрещается. Помогите директору!
 * Напишите программу, которая найдет, какое максимальное количество групп удастся одновременно распределить по аудиториям, чтобы всем учащимся в каждой группе хватило компьютеров, и при этом остался бы еще хотя бы один для учителя.
 *
 * Формат ввода
 * На первой строке входного файла расположены числа N и M (1 ≤ N ≤ M ≤ 1000). На второй строке расположено N чисел — X1, …, XN (1 ≤ Xi ≤ 1000 для всех 1 ≤ i ≤ N). На третьей строке расположено M чисел Y1, ..., YM (1 ≤ Yi ≤ 1000 для всех 1 ≤ i ≤ M).
 *
 * Формат вывода
 * Выведите на первой строке число P - количество групп, которые удастся распределить по аудиториям. На второй строке выведите распределение групп по аудиториям – N чисел, i-е число должно соответствовать номеру аудитории, в которой должна заниматься i-я группа. (Нумерация как групп, так и аудиторий, начинается с 1). Если i-я группа осталась без аудитории, i-е число должно быть равно 0. Если допустимых распределений несколько, выведите любое из них.
 * */

const { readFile } = require('fs/promises')
const { resolve } = require('path')

async function readInput(filePath) {
  const input = await readFile(resolve(__dirname, filePath), { encoding: 'utf8' })
  return input.trim().split('\n')
}

function distributeComputers(data) {
  let distributed = 0
  const groups = data[1]
    .split(' ')
    .map((value, index) => {
      return {
        index,
        value: +value,
      }
    })
    .sort((a, b) => b.value - a.value)
  const computers = data[2]
    .split(' ')
    .map((value, index) => {
      return {
        index,
        value: value - 1,
      }
    })
    .sort((a, b) => b.value - a.value)

  const answer = new Array(groups.length).fill(0)
  let groupsPointer = 0
  let computersPointer = 0
  while (groupsPointer < groups.length && computersPointer < computers.length) {
    if (groups[groupsPointer].value <= computers[computersPointer].value) {
      distributed++
      answer[groups[groupsPointer].index] = computers[computersPointer].index + 1
      computersPointer++
    }
    groupsPointer++
  }

  return `${distributed}
${answer.join(' ')}`
}

;(async () => {
  console.log(distributeComputers(await readInput('input.txt')))
})()
