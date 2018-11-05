import generateHOCName from '../generateHOCName'

test('generateHOCName', () => {
  expect(generateHOCName('local')).toBe('withLocalStorage')
  expect(generateHOCName('session')).toBe('withSessionStorage')
})
