const connect = require('./connect')('EmExSupplierOrders')

/**
 * Метод возвращает актуальный список заказанных у поставщика товаров.
 * Актуальными считаются заказы в статусах: "Заказано", "Выкуплено", "В пути".
 * Заказы со статусами: "Отказано", "Выполнено" в эту выборку не попадают.
 *
 * @function getActiveOrdersDetails
 * @param {function} callback callback-функция в которую передается ответ
 *
 * @returns {Array.<ActiveOrderDetail>} ActiveOrderDetail
 */
const getActiveOrdersDetails = callback => {
  connect((err, client) => {
    if (err) throw new Error(err)

    client.GetActiveOrdersDetails(this.manager, (err, result) => {
      if (err) throw new Error(err)
      callback(result.GetActiveOrdersDetailsResult.ActiveOrderDetail)
    })
  })
}

/**
 * @typedef ActiveOrderDetail
 * @type {Object}
 * @property {string} MakeName	Марка
 * @property {string} DetailNum Номер детали
 * @property {string} PriceLogo Прайс-лист
 * @property {number} OrderNumber Номер заказа
 * @property {dateTime} OrderDate Дата заказа
 * @property {number} OrderDetailSubId	Идентификатор заказа
 * @property {time} HoursLeft Окончание срока поставки через HoursLeft часов
 * @property {string} DetailName Наименование детали
 * @property {string} Comments	Признак заказа
 * @property {number} DetailQuantity Количество деталей
 * @property {float} DetailPriceBuy Цена детали (в CurrencyLogo)
 * @property {string} CurrencyLogo	Валюта
 * @property {float} DetailPriceBuyRUR Цена детали (в рублях)
 * @property {number} AnswerQuantity Количество (шт.) в ответе поставщика
 * @property {number} InvoicedQuantity	Отправлено (шт.)
 */

module.exports = manager => {
  this.manager = manager
  return {
    getActiveOrdersDetails: getActiveOrdersDetails.bind(this)
  }
}
