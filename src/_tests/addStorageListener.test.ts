import addStorageListener from '../addStorageListener'

const NOOP = () => {}

beforeEach(() => {
  window.addEventListener = jest.fn(() => { })
  window.removeEventListener = jest.fn(() => { })
})

test('addStorageListener', () => {
  const addListener = addStorageListener('local')

  const removeListener = addListener(NOOP)
  expect(window.addEventListener).toHaveBeenCalled()

  removeListener()
  expect(window.removeEventListener).toHaveBeenCalled()
})
