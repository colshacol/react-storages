import * as React from 'react'

const DEFAULT_MAPPER = () => {
  return {}
}

const LOCAL_OR_BOTH = ['local', 'both']
const SESSION_OR_BOTH = ['session', 'both']

const addListener = window.addEventListener
const removeListener = window.removeEventListener

// First invocation is initialization.
export const createWatchStorage = (storages) => {
  return (mapStorageToProps, which = 'both') => (Comp) => {
    const mapper = mapStorageToProps || DEFAULT_MAPPER

    return class WithStorage extends React.PureComponent {
      state = {}

      handler = () => {
        this.setState(mapper(storages, this.props))
      }

      componentDidMount() {
        LOCAL_OR_BOTH.includes(which) && addListener('localStorageChanged', this.handler)
        SESSION_OR_BOTH.includes(which) &&
          addListener('sessionStorageChanged', this.handler)
      }

      componentWillUnmount() {
        LOCAL_OR_BOTH.includes(which) &&
          removeListener('localStorageChanged', this.handler)
        SESSION_OR_BOTH.includes(which) &&
          removeListener('sessionStorageChanged', this.handler)
      }

      render() {
        const props = { ...this.props, ...this.state }
        return <Comp {...props} />
      }
    }
  }
}
