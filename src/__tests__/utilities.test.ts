import { isNestedPath } from '../utilities'

test('isNestedPath (false)', () => {
  const [isNested0, rootPath0, restPath0] = isNestedPath('a')
  const [isNested1, rootPath1, restPath1] = isNestedPath('a_b:c,d')

  expect(isNested0).toBe(false)
  expect(isNested1).toBe(false)

  expect(rootPath0).toBe('a')
  expect(rootPath1).toBe('a_b:c,d')

  expect(restPath0).toBe('')
  expect(restPath1).toBe('')
})

test('isNestedPath (true)', () => {
  const [isNested2, rootPath2, restPath2] = isNestedPath('a.b')
  const [isNested3, rootPath3, restPath3] = isNestedPath('a.b.c')

  expect(isNested2).toBe(true)
  expect(isNested3).toBe(true)

  expect(rootPath2).toBe('a')
  expect(rootPath3).toBe('a')

  expect(restPath2).toBe('b')
  expect(restPath3).toBe('b.c')
})
