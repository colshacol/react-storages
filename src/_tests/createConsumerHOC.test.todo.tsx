
import 'react-testing-library/cleanup-after-each'
import React from 'react'
import { render } from 'react-testing-library'

import createConsumerHOC from '../createConsumerHOC'

const NOOP = () => {}

beforeEach(() => {
  window.addEventListener = jest.fn(() => { })
  window.removeEventListener = jest.fn(() => { })
})

const Consumer = (props) => {
  return props.children({})
}

const Comp = createConsumerHOC(Consumer)()(props => {
  return null
})

test('createConsumerHOC', () => {
  const { getByText } = render(<div><Comp /></div>)
  expect(container).toEqual(null)
})
