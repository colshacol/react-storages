import storageChanged from 'storage-changed'
import { createCustomStorage } from '../createCustomStorage'
import { localStorage } from '../__mocks__/localStorage.mock'

let ls = createCustomStorage(localStorage)
window.localStorage = localStorage
storageChanged('local')

beforeEach(() => {
  window.localStorage.clear()
  ls = createCustomStorage(window.localStorage)
})

describe('CustomStorage.setItem', () => {
  test('it saves string values in native localStorage', () => {
    ls.setItem('STUB', 'STUB')
    expect(window.localStorage.getItem('STUB')).toBe('STUB')
  })

  test('it saves stringified array values in native localStorage', () => {
    ls.setItem('numberList', [0, 1, 2])
    expect(window.localStorage.getItem('numberList')).toBe('[0,1,2]')
  })

  test('it saves stringified object values in native localStorage', () => {
    ls.setItem('userObject', { name: 'Tom' })
    expect(window.localStorage.getItem('userObject')).toBe('{"name":"Tom"}')
  })

  test('it saves stringified boolean values in native localStorage', () => {
    ls.setItem('isCool', false)
    expect(window.localStorage.getItem('isCool')).toBe('false')
  })

  test('it saves stringified number values in native localStorage', () => {
    ls.setItem('age', 22)
    expect(window.localStorage.getItem('age')).toBe('22')
  })

  test('it saves stringified null values in native localStorage', () => {
    ls.setItem('nil', null)
    expect(window.localStorage.getItem('nil')).toBe('null')
  })

  test('it saves stringified undefined values in native localStorage', () => {
    ls.setItem('undef', undefined)
    expect(window.localStorage.getItem('undef')).toBe('undefined')
  })

  test('allows currying', () => {
    const setStub = ls.setItem('STUB')
    setStub('yolo')

    expect(ls.getItem('STUB')).toBe('yolo')
  })
})

describe('CustomStorage.getItem', () => {
  test('it saves string values in native localStorage', () => {
    ls.setItem('STUB', 'STUB')
    expect(ls.getItem('STUB')).toBe('STUB')
  })

  test('it saves stringified array values in native localStorage', () => {
    ls.setItem('numberList', [0, 1, 2])
    expect(ls.getItem('numberList')).toEqual([0, 1, 2])
  })

  test('it saves stringified object values in native localStorage', () => {
    ls.setItem('userObject', { name: 'Tom' })
    expect(ls.getItem('userObject')).toEqual({ name: 'Tom' })
  })

  test('it saves stringified boolean values in native localStorage', () => {
    ls.setItem('isCool', false)
    expect(ls.getItem('isCool')).toBe(false)
  })

  test('it saves stringified number values in native localStorage', () => {
    ls.setItem('age', 22)
    expect(ls.getItem('age')).toBe(22)
  })

  test('it saves null values in native localStorage', () => {
    ls.setItem('nil', null)
    expect(ls.getItem('nil')).toBe(null)
  })

  test('it saves undefined values in native localStorage', () => {
    ls.setItem('undef', undefined)
    expect(ls.getItem('undef')).toBe(undefined)
  })
})

describe('CustomStorage.setPrivateItem', () => {
  test('properly prefixed keys before storing', () => {
    ls.setPrivateItem('STUB', 'STUB')
    expect(ls.getItem('opsportal-core:STUB')).toBe('STUB')
  })

  test('allows currying', () => {
    const setStub = ls.setPrivateItem('STUB')
    setStub(96)

    expect(ls.getItem('opsportal-core:STUB')).toBe(96)
  })
})

describe('CustomStorage.getPrivateItem', () => {
  test('properly prefixed keys before storing', () => {
    ls.setPrivateItem('KEY', 97)
    expect(ls.getPrivateItem('KEY')).toBe(97)
  })
})

describe('CustomStorage.setNativeItem', () => {
  test('properly stores to native storage and retrieves', () => {
    ls.setNativeItem('KEY', 98)
    expect(window.localStorage.getItem('KEY')).toBe('98')
  })
})

describe('CustomStorage.getNativeItem', () => {
  test('properly stores to native storage and retrieves', () => {
    ls.setNativeItem('KEY', 99)
    expect(ls.getNativeItem('KEY')).toBe('99')
  })
})

describe('CustomStorage.setNativeItem (nested)', () => {
  test('creates stringified objects in native storage', () => {
    ls.setNativeItem('KEY.STUB', 100)
    expect(window.localStorage.getItem('KEY')).toEqual('{"STUB":100}')
  })

  test('updates nested values in stringified objects in native storage', () => {
    ls.setNativeItem('KEY', { foo: 'bar' })
    ls.setNativeItem('KEY.baz', 99)
    expect(window.localStorage.getItem('KEY')).toEqual('{"foo":"bar","baz":99}')
  })
})
