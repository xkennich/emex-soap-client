const connect = require('./connect')('EmExDictionaries')

const getUsers = manager => (callback, userId = null) => {
    connect((err, client) => {
        if(err) throw new Error(err)
        client.GetUsers2({...manager, userId}, (err, result) => {
            if(err) throw new Error(err)
            callback(result.GetUsers2Result.UserInfo)
        })
    })
}

const changeUserSettingsOptions = {
    userId: null,
    userLogo: null,
    managerId: null,
    locationAddressAdditional: null,
    autoFreeze: null,
    cashlessPayments: null,
    onlinePayments: null,
    postpaid: null,
    postBalanceLimit: null,
    postDeliveryLimit: null,
    orderPriceChange: null
}

const changeUserSettings = manager => (callback, query = changeUserSettingsOptions) => {
    connect((err, client) => {
        if(err) throw new Error(err)
        const options = {
            ...manager,
            ...query
        }
        client.ChangeUserSettings(options, (err, result) => {
            if(err) throw new Error(err)
            callback(result.ChangeUserSettingsResult)
        })
    })
}

const getPricesAndSignsDictOptions = {
    priceLogo: null,
    destinationLogo: null
}

const getPricesAndSignsDict = manager => (callback, query = getPricesAndSignsDictOptions) => {
    connect((err, client) => {
        if(err) throw new Error(err)
        const options = {
            ...manager,
            ...query
        }
        client.GetPricesAndSignsDict2(options, (err, result) => {
            if(err) throw new Error(err)
            callback(result.GetPricesAndSignsDict2Result.SupplierAndSigns2)
        })
    })
}

module.exports = manager => {
    return {
        changeUserSettingsOptions,
        getPricesAndSignsDictOptions,
        getUsers: getUsers(manager),
        changeUserSettings: changeUserSettings(manager),
        getPricesAndSignsDict: getPricesAndSignsDict(manager)
    }
}