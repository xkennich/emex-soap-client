# EMEX Client

Node js клиент для работы с Emex.ru

### Установка

```sh
$ npm install emex-soap-client
```

### Инициализация

```js

const EmexClient = require('emex-soap-client')

module.exports = EmexClient({login: '123456', password: '123456'})

```

### Использование

Получить всех клиентов

```js
const EmexClient = require('./emex')

const usersCallback = users => console.log(users) 

EmexClient.getUsers(usersCallback)

```

Получить одного клиента

```js
const EmexClient = require('./emex')

const userCallback = user => console.log(user) 

EmexClient.getUsers(userCallback, 1111111)

```

## License
The files included in this repository are licensed under the MIT license.