# @copart/ops-storage

## `localStorage` and `sessionStorage`

```ts
import { localStorage, sessionStorage } from '@copart/ops-storage'
```

Both `localStorage` and `sessionStorage` from `@copart/ops-storage` have
identical APIs. They expose the standard [Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage) (although, more featureful), as well as a few extra methods.

Each of the two storage mechanisms exported by this package act as proxies for
their respective native storage. (i.e `localStorage` syncs to `window.localStorage`, `sessionStorage` syncs to `window.sessionStorage`.)

In order to provide the ability to create reusable utilities for your specific appliaction, all of the `setItem` methods `setItem, setPrivateItem, setNativeItem` also allow currying. (See: currying)

\_Note: All methods

### setItem

```ts
type SetItemFunctionT = (key: string, value: any) => void
```

The `setItem` method stores the second argument (the value) in its internal
state and also persists that value as a string to its native storage binding.

```ts
import { localStorage } from '@copart/ops-storage'

const user = { name: 'Tom' }

localStorage.setItem('myString', 'value')
localStorage.setItem('myNumber', 100)
localStorage.setItem('myBoolean', true)
localStorage.setItem('myNull', null)
localStorage.setItem('myArray', [0, 1, 2])
localStorage.setItem('myObject', user)

// Persists them to native storage, stringified.
window.localStorage.getItem('myString') // "value"
window.localStorage.getItem('myNumber') // "100"
window.localStorage.getItem('myBoolean') // "true"
window.localStorage.getItem('myNull') // "null"
window.localStorage.getItem('myArray') // "[0,1,2]"
window.localStorage.getItem('myObject') // "{ name: "Tom" }"

// Saves the exact values in its internal state.
localStorage.getItem('myString') // "value"
localStorage.getItem('myNumber') // 100
localStorage.getItem('myBoolean') // true
localStorage.getItem('myNull') // null
localStorage.getItem('myArray') // [0, 1, 2]
localStorage.getItem('myObject') // { name: "Tom" }

user === localStorage.getItem('myObject') // true
```

```js
// Safely get/set nested properties.
sessionStorage.setItem('settings.favorites.color', 'blue')
sessionStorage.getItem('settings.favorites.color') // 'blue'

// Stores prefixed key/values.
sessionStorage.setPrivateItem('foo', 123)
sessionStorage.getPrivateItem('foo') // 123
sessionStorage.getItem('opsportal-core:foo') // 123

// Allows currying of setItem methods.
const setUserName = localStorage.setItem('login.userData.entity_name')
setUserName('tammy101')
localStorage.getItem('login.userData.entity_name') // 'tammy101'

// Currying makes it easy to create utilities out of
// commonly used storage paths.
const setUserName = localStorage.setItem('login.userData.entity_name')
const setUserEmail = localStorage.setItem('login.userData.entity_email')
```

### watchStorage

<!--`(mapStorageToProps: Function, which?: string) => (Comp: Function | React.ClassComponent) => React.Element`-->

```js
import { localStorage, watchStorage } from 'this-pkg'

localStorage.setItem('user.todos', [
  { id: 1, description: 'Be cool.' },
  { id: 2, description: 'Be smooth.' },
])

const mapStorageToProps = (props) => {
  return {
    todos: localStorage.getItem('user.todos'),
  }
}

const TodoList = watchStorage(mapStorageToProps)((props) => {
  return (
    <ul>
      {props.todos.map((todo) => (
        <p key={todo.id}>todo: {todo.description}</p>
      ))}
    </ul>
  )
})
```
