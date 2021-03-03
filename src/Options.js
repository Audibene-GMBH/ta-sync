import querystring from 'querystring'


/*
  I'm calling this "Options", since featureflags is taken
  the goal is to develop an agnostic approach that is not dependent on react, redux, etc.

  It should allow the developer to specify options (flags) in multiple ways...
    first they can be initialized in config.options
    but those can be overloaded by process.env
    and then overloaded by sessionStorage (prior changes)
    and then overloaded by a querystring (in case we want to overload it now, dynamically)
    and all can be changed dynamically in the code and gui (logic trumps all)
    and you can extend this object to include remote options, like launchdarkly feature flags, etc.
    
  Usage... http://hear.com?options=flag1,-flag2,+flag3&flag4=four would turn flag1 On (true), and flag2 and flag3 Off (false)

  options will look something like {
      flag1: true,
      flag2: false,
      flag3: true,
      flag4: 'four',
  }
  
*/

const globalThis = window || global

export class Options {
  constructor(props = {}) {
    this.config = {...this.config, ...props.config}
    this.init(props)
  }

  config = { options: {} }

  init = (props = {}) => {
    const priorUpdates = this.read()
    this.write({ ...this.config.options, ...process.env, ...props, ...priorUpdates })
    this.addQueryString()
  }

  set = options => {
    this.list = options || {}
  }

  update = options => {
    this.write({ ...this.list, ...options })
    this.callbacks.forEach(func => {
      func(this.list)
    })
  }

  callbacks = []
  onChange = func => {
    if (typeof func !== 'function') return
    if (this.callbacks.indexOf(func) > -1) return
    this.lastCallback = func
    this.callbacks.push(func)
  }

  write = options => {
    this.list = options || this.list
    if (!this.list) return
    if (globalThis.sessionStorage)
      globalThis.sessionStorage.setItem('options', JSON.stringify(this.list))
    else globalThis.options = this.list
  }

  read = () => {
    let temp = globalThis.sessionStorage?.getItem('options')
    if (temp) temp = JSON.parse(temp)
    this.list = temp || globalThis.options || this.list || {}
    return this.list
  }

  addQueryString = qs => {
    if (this.list.addQueryString === false) return
    qs = qs || window.location?.search
    if (qs[0] === '?') qs = qs.slice(1)
    const params = querystring.parse(qs)

    // parse the options param
    if (params.options) {
      let list = params.options
      if (!Array.isArray(list)) list = [list] // ensure list is an array
      list.forEach(options => {
        options.split(',').forEach(word => {
          word = word.trim()
          if (word[0] === '-') {
            params[word.slice(1)] = false
          } else if (word[0] === '+') {
            params[word.slice(1)] = true
          } else params[word] = true
        })
      })
      delete params.options
    }

    // deduplicate params aka an array per param
    Object.keys(params).forEach(key => {
      const p = params[key]
      if (Array.isArray(p)) params[key] = p[p.length - 1] // retain the last one only
    })

    this.update(params)
  }
}

export const theOptions = new Options() // singleton
export default theOptions
