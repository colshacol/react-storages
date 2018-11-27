type NestedPathResultT = [boolean, string, string]
type StorageNameT = 'session' | 'local'

export const isNestedPath = (key: string): NestedPathResultT => {
  if (!key.includes('.')) return [false, key, '']

  const [rootPath, ...restPath] = key.split('.')
  return [true, rootPath, restPath.join('.')]
}

export const getStorageName = (nativeStorage: Object): StorageNameT => {
  return nativeStorage === window.sessionStorage ? 'session' : 'local'
}
