import theOptions from './OptionsLaunchDarkly'
import "regenerator-runtime/runtime.js"

const wait = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

describe('OptionsLaunchDarkly', () => {
  test('allFlags', async () => {
    expect(theOptions.ldclient).toBeDefined()

    await wait(500)
    if (!theOptions.allFlags) await wait(1000)
    expect(theOptions.allFlags).toBeDefined()
    expect(theOptions.allFlags).not.toEqual({})
  })
})
