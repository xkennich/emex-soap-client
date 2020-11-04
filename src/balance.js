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
    if (err) throw new Error(err)
    const {id, money, comment} = options
    const query = {
      ...this.manager,
      consumerUserId: id,
      money,
      comment
    }
    client.AddBalance(query, (err, result) => {
      if (err) throw new Error(err)
      callback(result.AddBalanceResult)
    })
  })
}

const getConsumerBalancesOptions = {
  id: null,
  mounth: '-1'
}

/**
 * Получение информации о балансе клиентов.
 * Метод используется при получении данных о балансе клиентов оптовика. Метод вызывается только оптовиком
 * @function getConsumerBalances
 * @param {function} callback callback-функция в которую передается ответ
 * @param {Object} options Параметры запроса
 * @param {number} options.mounth Месяц, за который запрашивается информация (1 … 12).
 *   При передаче значения 0 возвращает данные за последние 6 месяцев. При передаче значения -1 возвращает данные за весь период работы.
 * @param {number} options.id Идентификатор пользователя
 *
 * @returns {Array.<ConsumerBalance>} ConsumerBalance
 */
const getConsumerBalances = (callback, options = getConsumerBalancesOptions) => {
  connect((err, client) => {
    if (err) throw new Error(err)
    const {id, mounth} = options
    const query = {...this.manager, Mounth: mounth}
    if (id !== null) query.Filter = `UserId=${id}`

    client.GetConsumerBalances(query, (err, result) => {
      if (err) throw new Error(err)
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
 * Получение истории баланса потребителей.
 * Метод используется при получении истории списание/пополнений средств на счете потребителей оптовика.
 * Метод может быть вызван только оптовиком с указанием периода, за который требуется получить данные.
 * @function getBalanceChangesHistory
 * @param {function} callback callback-функция в которую передается ответ
 * @param {Object} options Параметры запроса
 * @param {number | null} options.id Идентификатор пользователя
 * @param {string | null} options.type Строковый перечислитель "Тип события". При передаче значения null параметр не будет влиять на выборку.
 * @param {dateTime} options.dateFrom Начальная дата задаваемого периода.
 * @param {dateTime} options.dateTo Конечная дата периода, за который запрашивается информация.
 *
 * @returns {Array<BalanceChangesHistoryEvent>} BalanceChangesHistoryEvent
 */
const getBalanceChangesHistory = (
  callback,
  options = getBalanceChangesHistoryOptions
) => {
  connect((err, client) => {
    if (err) throw new Error(err)

    const query = {
      ...this.manager,
      userId: options.id,
      balanceHistoryChangeType: options.type,
      dateFrom: options.dateFrom,
      dateTo: options.dateTo
    }

    client.GetBalanceChangesHistory(query, (err, result) => {
      if (err) throw new Error(err)
      callback(result.GetBalanceChangesHistoryResult.BalanceChangesHistoryEvent)
    })
  })
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
