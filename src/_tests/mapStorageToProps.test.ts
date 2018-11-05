import mapStorageToProps from '../mapStorageToProps'

const mapper = (state) => {
  return {
    foo: state.foo
    bar: 'bar',
  }
}

const state = {
  foo: 'foo'
}

const props = {
  isProps: true
}

const expected = {
  isProps: true,
  foo: 'foo',
  bar: 'bar'
}

test('mapStorageToProps', () => {
  expect(mapStorageToProps(state, props, mapper)).toEqual(expected)
})
