import "regenerator-runtime/runtime.js"

/*
  runs test functions in a sequence in spite of jest's asynchronousity, use sparingly
  useful for singletons and external libraries or any external thing where the state can be affected by concurrent tests

  usage:

    import {next,start} from 'NextTest'

    test('first test',async () => {
        await next(() => {
            // test code goes here
        })
    } )

    test('second test',async () => {
        await next(() => {
            // test code goes here
        })
    } )

    test('last test',async () => {
        await next(() => {
            // test code goes here
        })
    } )

    start() // runs them in sequence

  */

export const wait = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export default class NextTest {
  constructor(ms = 0) {
    this.ms = ms
  }
  count = 0 // total tests
  index = 0 // current test
  doNext = async (func, ms = this.ms) => {
    const count = ++this.count
    while (this.index < count) await wait(ms) // surrender this thread
    this.index++
    return func()
  }
  start = () => this.index++ // starts the queue
}

// copy this code into your block if you want to avoid collisions with other sequential tests
const me = new NextTest() // singleton
export const next = me.doNext
export const start = me.start
