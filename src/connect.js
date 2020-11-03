const soap = require('soap')

/**
  * Создание соединения с сервером.
  * @function connect
  * @param {string} dictionaries название файла без разширения

  * @returns {function} 
  */
module.exports = dictionaries => callback => 
    soap.createClient(`http://ws.emex.ru/${dictionaries}.asmx?wsdl`, callback)