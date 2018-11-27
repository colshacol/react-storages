import { parseValues, parse, stringify } from 'storage-utilities'
import storageChanged from 'storage-changed'
import curry from 'just-curry-it'
import get from 'get-value'
import set from 'set-value'

import { isNestedPath, getStorageName } from './utilities'

const APP_NAME = process.env.APP_NAME || 'opsportal-core'

export const createCustomStorage = (nativeStorage) => {
  const native = nativeStorage
  const storage = parseValues(native)
  const storageName = getStorageName(native)
  const eventName = `${storageName}StorageChanged`

  const listen = () => {
    window.addEventListener(eventName, (event: CustomEvent) => {
      storage[event.detail.key] = parse(event.detail.value)
    })
  }

  const setNativeItem = curry((key: string, value: any) => {
    const [isNested, rootPath, restPath] = isNestedPath(key)

    if (isNested) {
      // TODO: Non-objects warning/error handling.
      const rootValue = parse(native.getItem(rootPath) || {})
      const newValue = set(rootValue, restPath, value)
      native.setItem(rootPath, stringify(newValue))

      return newValue
    }

    native.setItem(key, stringify(value))
  })

  const getNativeItem = (key: string) => {
    return native.getItem(key)
  }

  const setPrivateItem = curry((key: string, value: any) => {
    const privateKey = `${APP_NAME}:${key}`
    return setItem(privateKey, value)
  })

  const getPrivateItem = (key: string) => {
    const privateKey = `${APP_NAME}:${key}`
    return getItem(privateKey)
  }

  const getItem = (key: string) => {
    const value = get(storage, key)
    return value === 'undefined' ? undefined : value
  }

  const setItem = curry((key: string, value: any) => {
    const [isNested, rootPath, restPath] = isNestedPath(key)

    if (isNested) {
      const rootValue = getItem(rootPath) || {}
      const newValue = set(rootValue, restPath, value)

      setNativeItem(rootPath, newValue)
      storage[rootPath] = newValue

      return newValue
    }

    set(storage, key, value)
    setNativeItem(key, value)
  })

  storageChanged(storageName)
  listen()

  return {
    getPrivateItem,
    setPrivateItem,
    storage,
    native,
    setItem,
    getItem,
    getNativeItem,
    setNativeItem,
    storageName,
    eventName,
  }
}
