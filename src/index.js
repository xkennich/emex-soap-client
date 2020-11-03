/**
  * @typedef manager Данные пользователя для API
  * @type {Object}
  * @property {number} login Логин
  * @property {string} password Пароль
 */

/**
  * 
  * @function EmexClient
  * @param {manager} manager
  * @returns {Object} Object с функциями
  * 
  * @author Timofey Sherbakov <xkennich@gmail.com>
  */

module.exports = manager => {

    if(typeof manager !== 'object') 
        throw new Error('The parameter must be an object')
    if(typeof manager.login !== 'string') 
        throw new Error('the object must contain the login property')
    if(typeof manager.password !== 'string') 
        throw new Error('the object must contain the password property')

    return {
        //dictionaries
        ...require('./dictionaries')(manager),

        //inmotion
        ...require('./inmotion')(manager),

        //balance
        ...require('./balance')(manager),

        //supplierOrders
        ...require('./supplierOrders')(manager)
    }
}