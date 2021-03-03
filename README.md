# ta-options
an agnostic feature flag implementation that enables you to overload in code, querystring and api, like launchdarkly

## Install
```
$ npm install ta-options
```

## Options vs FeatureFlags

  I'm calling this "Options", since featureflags is taken
  the goal is to develop an agnostic approach that is not dependent on react, redux, etc.

  It should allow the developer to specify options (flags) in multiple ways...
   - first they can be initialized in config.options
   - but those can be overloaded by process.env
   - and then overloaded by sessionStorage (prior changes)
   - and then overloaded by a querystring (in case we want to overload it now, dynamically)
   - and all can be changed dynamically in the code and gui (logic trumps all)
   - and you can extend this object to include remote options, like launchdarkly feature flags, etc.
    
  e.g. ```http://your-domain.com?options=flag1,-flag2,+flag3&flag4=four``` would turn flag1 On (true), and flag2 and flag3 Off (false)

```javascript
  options will look something like {
      flag1: true,
      flag2: false,
      flag3: true,
      flag4: 'four',
  }
```


## usage

```javascript
import theOptions from 'ta-options'

describe('Options', () => {
  test('Options.options', () => {
    expect(Object.keys(theOptions.list).length).toBeGreaterThan(0)
  })
  test('addQueryString', async () => {
      theOptions.set({})
      expect(theOptions.list).toEqual({})
      theOptions.addQueryString('options=flag1,-flag2,+flag3&flag4=four')
      expect(theOptions.list.flag1).toBeTruthy()
      expect(theOptions.list.flag2).toBeFalsy()
      expect(theOptions.list.flag3).toBeTruthy()
      expect(theOptions.list.flag4).toBe('four')
  })

  ...
```

