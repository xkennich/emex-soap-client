const connect = require('./connect')('EmExSupplierOrders')

const getActiveOrdersDetails = manager => callback => {
    connect((err, client) => {
        if(err) throw new Error(err)

        client.GetActiveOrdersDetails(manager, (err, result) => {
            if(err) throw new Error(err)
            callback(result.GetActiveOrdersDetailsResult.ActiveOrderDetail)
        })
    })
}

module.exports = manager => {
    return {
        getActiveOrdersDetails: getActiveOrdersDetails(manager)
    }
}
