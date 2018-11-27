declare interface Window {
  ls: CustomStorage
  ss: CustomStorage
}

interface CustomStorage {
  getPrivateItem(key: string): any
  setPrivateItem: any
  storage: any
  native: any
  setItem: any
  getItem(key: string): any
  getNativeItem(key: string): any
  setNativeItem: any
  storageName: StorageNameT
  eventName: string
}

interface CustomEvent {
  detail: any
}
