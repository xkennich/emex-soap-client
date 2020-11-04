const connect = require('./connect')('EmExDictionaries')

/**
 * Метод возвращает список потребителей оптовика в виде списка объектов
 *
 * @function getUsers
 * @param {function} callback callback-функция в которую передается ответ
 * @param {number | null} id идентификатор пользователя в системе Эмекс, для которого нужно вернуть данные. Если передать null - возвратятся все потребители оптовика
 *
 * @returns {Array.<UserInfo>} UserInfo
 */
const getUsers = (callback, id = null) => {
  connect((err, client) => {
    if (err) throw new Error(err)
    client.GetUsers2({...this.manager, userId: id}, (err, result) => {
      if (err) throw new Error(err)
      callback(result.GetUsers2Result.UserInfo)
    })
  })
}

const changeUserSettingsOptions = {
  id: null,
  userLogo: null,
  managerId: null,
  address: null,
  autoFreeze: null,
  cashlessPayments: null,
  onlinePayments: null,
  postpaid: null,
  postBalanceLimit: null,
  postDeliveryLimit: null,
  orderPriceChange: null
}

/**
 * Метод предназначен для изменения оптовиком настроек потребителя.
 *
 * @function changeUserSettings
 * @param {function} callback callback-функция в которую передается ответ
 * @param {Object | null} options Параметры запроса
 * @param {number | null} options.id идентификатор пользователя в системе Эмекс, настройки которого изменяются
 * @param {string | null} options.userLogo внутренний заголовок пользователя у дилера
 * @param {number | null} options.managerId Id менеджера оптовика, который закреплен за потребителем
 * @param {string | null} options.address уточнение адреса потребителя
 * @param {string | null} options.autoFreeze автоматическая заморозка всех заказов
 * @param {boolean | null} options.cashlessPayments принимать ли оплату по безналичному расчёту (true|false|null)
 * @param {boolean | null} options.onlinePayments пополнение баланса онлайн (true|false|null)
 * @param {boolean | null} options.postpaid прием заказов с постоплатой (true|false|null)
 * @param {any | null} options.postBalanceLimit предельная сумма приёма заказов при постоплате (число|-1|null)
 * @param {any | null} options.postDeliveryLimit предельная сумма выдачи заказов (число|-1|null)
 * @param {string | null} options.orderPriceChange изменение цены по заказу "в работе": 0 - не изменять; 1 - соответствовать моей цене; 2 - умножать на коэффицент наценки; 3 - всегда изменять вручную
 *
 * При передаче null в параметре соответствующая настройка не изменяется. Значение -1 для postBalanceLimit и postDeliveryLimit соответствуют безлимитной предоплате
 *
 * @returns {boolean} Возвращает true, если настройки успешно изменены.
 */
const changeUserSettings = (callback, options = changeUserSettingsOptions) => {
  connect((err, client) => {
    if (err) throw new Error(err)
    const query = {
      ...this.manager,
      userId: options.id,
      userLogo: options.userLogo,
      managerId: options.managerId,
      locationAddressAdditional: options.address,
      autoFreeze: options.autoFreeze,
      cashlessPayments: options.cashlessPayments,
      onlinePayments: options.onlinePayments,
      postpaid: options.postpaid,
      postBalanceLimit: options.postBalanceLimit,
      postDeliveryLimit: options.postDeliveryLimit,
      orderPriceChange: options.orderPriceChange
    }
    client.ChangeUserSettings(query, (err, result) => {
      if (err) throw new Error(err)
      callback(result.ChangeUserSettingsResult)
    })
  })
}

const getPricesAndSignsDictOptions = {
  priceLogo: null,
  destinationLogo: null
}

/**
 * Метод возвращает словарь поставщиков и признаков в виде списка объектов для заданных лого прайса и кода поставки.
 *
 * @function getPricesAndSignsDict
 * @param {function} callback callback-функция в которую передается ответ
 * @param {Object} options Параметры запроса
 * @param {number | null} options.priceLogo лого прайса. Если параметр пустой, то он не учитывается при выборке.
 * @param {string | null} options.destinationLogo - код поставки. Если параметр пустой, то он не учитывается при выборке.
 *
 * @returns {Array<PriceAndSigns>} PriceAndSigns
 */
const getPricesAndSignsDict = (callback, options = getPricesAndSignsDictOptions) => {
  connect((err, client) => {
    if (err) throw new Error(err)
    const query = {
      ...this.manager,
      ...options
    }
    client.GetPricesAndSignsDict2(query, (err, result) => {
      if (err) throw new Error(err)
      callback(result.GetPricesAndSignsDict2Result.SupplierAndSigns2)
    })
  })
}

/**
 * @typedef UserInfo
 * @type {Object}
 * @property {number} UserId Идентификатор клиента
 * @property {string} UserSurname Фамилия потребителя
 * @property {string} UserFirstName Имя потребителя
 * @property {string} UserLastName Отчество потребителя
 * @property {string} UserLogo Лого потребителя
 * @property {number} LocationId Id офиса потребителя
 * @property {string} LocationAddress Адрес офиса потребителя
 * @property {string} LocationAddressAdditional Уточнение адреса офиса потребителя
 * @property {number} ManagerId Id менеджера, за которым закреплен потребитель
 * @property {string} ManagerFio ФИО менеджера, за которым закреплен потребитель
 * @property {boolean} AutoFreeze	Автозаморозка (останавливать обработку заказа или отправлять дальше)
 * @property {boolean} Postpaid Прием заказов с постоплатой (true) или с предоплатой (false)
 * @property {boolean} OnlinePayments	Пополнение баланса онлайн (доступность платежных систем для самостоятельного пополнения баланса потребителем)
 * @property {boolean} CashlessPayments Оплата по безналу (доступность безналичного пополнения баланса потребителем)
 * @property {number} PostBalanceLimit Максимальная сумма (лимит) заказов по постоплате. Если сумма заказов превышает этот лимит, дальнейшее оформление без предоплаты становится невозможно. Если лимит не установлен, возвращает: -1
 * @property {number} PostDeliveryLimit Максимальная сумма (лимит) заказов к выдаче. При превышении суммы заказов клиента (к выдаче) этого лимита, дальнейшее оформление заказов без предоплаты становится невозможным. Если лимит не установлен, возвращает: -1
 * @property {number} OrderPriceChange Правило работы с изменением цены
 */

/**
 * @typedef PriceAndSigns
 * @type {Object}
 * @property {string} PriceLogo Лого прайса
 * @property {string} DestinationLogo Код поставки
 * @property {string} PriceDesc Описание прайса
 * @property {string} DestinationDesc Описание поставки
 * @property {string} PriceDescPublicFull Полное описание поставщика
 * @property {string} OriginalSigns Признаки, применимые к прайсу по оригинальным производителям.
 * @property {string} NotOriginalSigns Признаки, применимые к прайсу по неоригинальным производителям.
 */

module.exports = manager => {
  this.manager = manager
  return {
    changeUserSettingsOptions,
    getPricesAndSignsDictOptions,
    getUsers: getUsers.bind(this),
    changeUserSettings: changeUserSettings.bind(this),
    getPricesAndSignsDict: getPricesAndSignsDict.bind(this)
  }
}
