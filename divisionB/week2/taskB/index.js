/*
 * B. Дома и магазины
 *
 * Ограничение времени - 1 секунда
 * Ограничение памяти - 64Mb
 * Ввод - стандартный ввод или input.txt
 * Вывод - стандартный вывод или output.txt
 *
 * На Новом проспекте построили подряд 10 зданий. Каждое здание может быть либо жилым домом, либо магазином, либо офисным зданием.
 * Но оказалось, что жителям некоторых домов на Новом проспекте слишком далеко приходится идти до ближайшего магазина. Для разработки плана развития общественного транспорта на Новом проспекте мэр города попросил вас выяснить, какое же наибольшее расстояние приходится преодолевать жителям Нового проспекта, чтобы дойти от своего дома до ближайшего магазина.
 *
 * Формат ввода
 * Программа получает на вход десять чисел, разделенных пробелами. Каждое число задает тип здания на Новом проспекте: число 1 обозначает жилой дом, число 2 обозначает магазин, число 0 обозначает офисное здание. Гарантируется, что на Новом проспекте есть хотя бы один жилой дом и хотя бы один магазин.
 *
 * Формат вывода
 * Выведите одно целое число: наибольшее расстояние от дома до ближайшего к нему магазина. Расстояние между двумя соседними домами считается равным 1 (то есть если два дома стоят рядом, то между ними расстояние 1, если между двумя домами есть еще один дом, то расстояние между ними равно 2 и т.д.)
 * */

const { readFile } = require('fs/promises')
const { resolve } = require('path')

async function readInput(filePath) {
  const input = await readFile(resolve(__dirname, filePath), { encoding: 'utf8' })
  return input.split(/\s+/).map(v => +v)
}

async function maxShopDistance(...buildings) {
  let distances = {}
  let closestShopIndex = null
  let result = null

  for (let i = 0; i < buildings.length; i++) {
    if (buildings[i] === 1) {
      distances[i] = closestShopIndex !== null ? i - closestShopIndex : null
    } else if (buildings[i] === 2) {
      closestShopIndex = i
    }
  }

  closestShopIndex = null
  for (let i = buildings.length - 1; i >= 0; i--) {
    if (buildings[i] === 1) {
      if (!distances[i]) {
        distances[i] = closestShopIndex - i
      } else if (closestShopIndex !== null) {
        distances[i] = Math.min(distances[i], closestShopIndex - i)
      }
    } else if (buildings[i] === 2) {
      closestShopIndex = i
    }
  }

  Object.values(distances).forEach(v => {
    result = Math.max(result, v)
  })

  return result
}

;(async () => {
  console.log(await maxShopDistance(...(await readInput('input.txt'))))
})()
