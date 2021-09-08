/*
 * B. Изобретательный Петя
 *
 * Ограничение времени - 1 секунда
 * Ограничение памяти - 64Mb
 * Ввод - стандартный ввод или input.txt
 * Вывод - стандартный вывод или output.txt
 *
 * Петя нашел на чердаке старый телеграфный аппарат и приделал к нему хитроумное устройство, которое может печатать на телеграфной ленте определенное слово (обозначим его X). Петино устройство может напечатать на ленте это слово сколько угодно раз. Петя может заставить аппарат напечатать на ленте и любое другое сообщение, но для этого ему нужно разобрать свое хитроумное устройство, и после этого он уже не сможет печатать сообщение X. А самое главное, что напечатать даже один символ другого сообщения потребует от Пети больше усилий, чем напечатать на ленте слово X с помощью хитроумного устройства.
 * Петя хочет сделать так, чтобы всем казалось, что ему по телеграфу пришло сообщение Z. Для этого он может (строго в этой последовательности):
 * - сколько угодно раз напечатать сообщение X
 * - разобрать хитроумное устройство и посимвольно напечатать еще что-нибудь (назовем это Y)
 * - оторвать и выбросить начало ленты так, чтобы на оставшейся ленте было напечатано в точности сообщение Z
 * Поскольку набирать отдельные символы сообщения Y довольно сложно, Петя хочет, чтобы в сообщении Y было как можно меньше символов.
 * Для лучшего понимания задачи смотрите примеры и пояснения к ним.
 *
 * Формат ввода
 * В первой строке вводится слово X, которое Петя может печатать с помощью хитроумного устройства сколько угодно раз. Во второй строке вводится сообщение Z, которое хочет получить Петя. Каждое сообщение состоит только из маленьких латинских букв и имеет длину не более 100 символов.
 *
 * Формат вывода
 * Выведите минимальное по длине сообщение Y, которое Пете придется допечатать вручную.
 * */

const { readFile } = require('fs/promises')
const { resolve } = require('path')

async function readInput(filePath) {
  const input = await readFile(resolve(__dirname, filePath), { encoding: 'utf8' })
  return input.trim().split(/\s+/)
}

async function ansFunc(word, target) {}

;(async () => {
  console.log(await ansFunc(...(await readInput('input.txt'))))
})()
