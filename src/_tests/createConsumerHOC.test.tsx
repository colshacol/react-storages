
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'
import * as React from 'react'
import * as createContext from 'create-react-context'
import { render } from 'react-testing-library'

import createConsumerHOC from '../createConsumerHOC'

const NOOP = () => {}

beforeEach(() => {
  window.addEventListener = jest.fn(() => { })
  window.removeEventListener = jest.fn(() => { })
})

const context = createContext(null)

const Comp = createConsumerHOC(context.Consumer)()(props => {
  return null
})

test('createConsumerHOC', () => {
   const { container } = render(<Comp />)
  expect(container).toHaveTextContent('')
})
