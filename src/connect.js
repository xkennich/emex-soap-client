const soap = require('soap')

module.exports = dictionaries => callback =>
  soap.createClient(`http://ws.emex.ru/${dictionaries}.asmx?wsdl`, callback)
