import theOptions from './Options'
import { next, start } from './NextTest'

describe('Options', () => {
  test('Options.options', () => {
    expect(Object.keys(theOptions.list).length).toBeGreaterThan(0)
  })
  test('addQueryString', async () => {
    await next(() => {
      theOptions.set({})
      expect(theOptions.list).toEqual({})
      theOptions.addQueryString('options=flag1,-flag2,+flag3&flag4=four')
      expect(theOptions.list.flag1).toBeTruthy()
      expect(theOptions.list.flag2).toBeFalsy()
      expect(theOptions.list.flag3).toBeTruthy()
      expect(theOptions.list.flag4).toBe('four')
    })
  })
  test('addQueryString with multiple and colliding options', async () => {
    await next(() => {
      theOptions.set({})
      expect(theOptions.list).toEqual({})
      theOptions.addQueryString(
        'flag5=true&options=flag1,-flag2,+flag3&flag4=four&options=-flag1,+flag2,-flag3,-flag4&flag5=five'
      )
      expect(theOptions.list.flag1).toBeFalsy()
      expect(theOptions.list.flag2).toBeTruthy()
      expect(theOptions.list.flag3).toBeFalsy()
      expect(theOptions.list.flag4).toBeFalsy()
      expect(theOptions.list.flag5).toBe('five')
    })
  })
  test('set', async () => {
    await next(() => {
      theOptions.set({})
      expect(theOptions.list).toEqual({})
    })
  })
  test('read restores original init', async () => {
    await next(() => {
      theOptions.init()
      const json = JSON.stringify(theOptions.list)
      theOptions.set({})
      expect(theOptions.list).toEqual({})
      theOptions.read()
      expect(theOptions.list).not.toEqual({})
      expect(JSON.stringify(theOptions.list)).toBe(json)
    })
  })
  test('we can dynamically change options in code', async () => {
    await next(() => {
      const json = JSON.stringify(theOptions.list)
      theOptions.update({ dynamic: false })
      expect(theOptions.list.dynamic).toBeFalsy()
      theOptions.update({ dynamic: true })
      expect(theOptions.list.dynamic).toBeTruthy()
      theOptions.read()
      expect(theOptions.list.dynamic).toBeTruthy()
      expect(JSON.stringify(theOptions.list)).not.toBe(json)
    })
  })
  test('callbacks', async () => {
    await next(() => {
      theOptions.onChange(options => {
        expect(options.foo).toBe('foo')
      })
      theOptions.onChange(options => {
        expect(options.bar).toBe('bar')
      })
      theOptions.update({ foo: 'foo', bar: 'bar' })
    })
  })
  start()
})
