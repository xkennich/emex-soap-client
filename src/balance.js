const connect = require('./connect')('EmExBalance')

/**
  * Метод пополнения баланса потребителя.
  * @function addBalance
  * @param {function} callback callback-функция в которую передается ответ
  * @param {Object} options Параметры запроса
  * @param {number} options.id Идентификатор клиента - UserId
  * @param {number} options.money сумма попосления со знаком +, и отрицательная сумма - снятие
  * @param {string} options.comment коментарий к счету
  * 
  * Метод возвращяет true, если изменение счета успешно завершено. false - если изменение счета не произошло.
  * @returns {boolean}
  */
const addBalance = (callback, options) => {
    connect((err, client) => {
        if(err) throw new Error(err)
        const {id, money, comment} = options
        const query = {
            ...this.manager,
            consumerUserId: id,
            money,
            comment
        }
        client.AddBalance(query, (err, result) => {
            if(err) throw new Error(err)
            callback(result.AddBalanceResult)
        })
    })
}

const getConsumerBalancesOptions = {
    id: null, 
    mounth: '-1'
}

/**
  * @typedef ConsumerBalance
  * @type {Object}
  * @property {number} UserId Идентификатор клиента
  * @property {string} PotrName ФИО клиента
  * @property {string} PotrName_Logo Лого (код) потребителя (клиента)
  * @property {float} Balance Значение баланса
  * @property {float} Spent Потраченная сумма
  * @property {float} InWorkSumm Сумма текущих операций клиента
  * @property {float} Diff Разница значений баланса и потраченного/в работе
 */

/**
  * Получение информации о балансе клиентов.
  * Метод используется при получении данных о балансе клиентов оптовика. Метод вызывается только оптовиком
  * @function getConsumerBalances
  * @param {function} callback callback-функция в которую передается ответ
  * @param {Object} option Параметры запроса
  * @param {number} option.mounth Месяц, за который запрашивается информация (1 … 12). 
  *   При передаче значения 0 возвращает данные за последние 6 месяцев. При передаче значения -1 возвращает данные за весь период работы.
  * @param {number} option.id Идентификатор пользователя  
  *  
  * @returns {Array.<ConsumerBalance>} ConsumerBalance
  */
const getConsumerBalances = (callback, query = getConsumerBalancesOptions) => {
    connect((err, client) => {
        if(err) throw new Error(err)
        const {id, mounth} = query
        const option = { ...this.manager, Mounth: mounth}
        if (id !== null) option.Filter = `UserId=${id}`

        client.GetConsumerBalances(options, (err, result) => {
            if(err) throw new Error(err)
            callback(result.GetConsumerBalancesResult.ConsumerBalance)
        })
    })
}

const now = new Date()
now.setDate(now.getDate() + 1)

const ly = new Date()
ly.setDate(ly.getDate() - 365)

const getBalanceChangesHistoryOptions = {
    id: null,
    type: null,
    dateFrom: ly.toISOString(),
    dateTo: now.toISOString()
}

/**
  * @typedef BalanceChangesHistoryEvent
  * @type {Object}
  * @property {number} UserId Идентификатор клиента
  * @property {dateTime} ChangeDate Дата/время события изменения баланса
  * @property {string} ChangeType Строковый перечислитель "Тип события"
  * @property {float} Amount Величина изменения баланса
  * @property {string} Comment Комментарий, сопровождающий изменение баланса
  * @property {string} ChangeSource Строковый перечислитель "Источник изменения"
  * @property {float} CommissionUser Комиссия платёжной системы в рублях
  * @property {string} PaymentsSystem Строковый перечислитель "Платёжная система"
 */

/**
  * Получение истории баланса потребителей.
  * Метод используется при получении истории списание/пополнений средств на счете потребителей оптовика. 
  * Метод может быть вызван только оптовиком с указанием периода, за который требуется получить данные.
  * @function getBalanceChangesHistory
  * @param {function} callback callback-функция в которую передается ответ
  * @param {Object} option Параметры запроса
  * @param {number} option.id Идентификатор пользователя 
  * @param {string | null} option.type Строковый перечислитель "Тип события". При передаче значения null параметр не будет влиять на выборку.
  * @param {dateTime} option.dateFrom Начальная дата задаваемого периода.
  * @param {dateTime} option.dateTo Конечная дата периода, за который запрашивается информация.
  *  
  * @returns {Array<BalanceChangesHistoryEvent>} BalanceChangesHistoryEvent
  */
const getBalanceChangesHistory = (callback, query = getBalanceChangesHistoryOptions) => {
    connect((err, client) => {
        if(err) throw new Error(err)
        
        const options = {
            ...this.manager,
            userId: query.id,
            balanceHistoryChangeType: query.type,
            dateFrom: query.dateFrom,
            dateTo: query.dateTo,
        }

        client.GetBalanceChangesHistory(options, (err, result) => {
            if(err) throw new Error(err)
            callback(result.GetBalanceChangesHistoryResult.BalanceChangesHistoryEvent)
        })
    })
}

module.exports = manager => {
    this.manager = manager
    return {
        getConsumerBalancesOptions,
        getBalanceChangesHistoryOptions,
        gddBalance: addBalance.bind(this),
        getConsumerBalances: getConsumerBalances.bind(this),
        getBalanceChangesHistory: getBalanceChangesHistory.bind(this)
    }
}