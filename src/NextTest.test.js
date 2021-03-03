import NextTest, { wait } from './NextTest'

describe('nextFunction', () => {
  const tests = new NextTest()
  const next = tests.doNext
  const start = tests.start
  const sequence = []

  test('first test', async () => {
    await next(() => {
      sequence.push(1)
      expect(sequence).toEqual([1])
    })
  })

  test('second test', async () => {
    await next(async () => {
      await wait(2000) // if this tests runs out of sequence the array will be wrong
      sequence.push(2)
      expect(sequence).toEqual([1, 2])
    })
  })

  test('last test', async () => {
    await next(() => {
      sequence.push(3)
      expect(sequence).toEqual([1, 2, 3])
    })
  })

  start() // runs them in sequence
})
