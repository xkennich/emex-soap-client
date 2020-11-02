const connect = require('./connect')('EmExBalance')

const addBalance = manager => (callback, {id, money, comment}) => {
    connect((err, client) => {
        if(err) throw new Error(err)
        const options = {
            ...manager,
            consumerUserId: id,
            money,
            comment
        }
        client.AddBalance(options, (err, result) => {
            if(err) throw new Error(err)
            callback(result.AddBalanceResult)
        })
    })
}

const getConsumerBalancesOptions = {
    id: null, 
    mounth: '-1'
}

const getConsumerBalances = manager => (callback, query = getConsumerBalancesOptions) => {
    connect((err, client) => {
        if(err) throw new Error(err)
        const {id, mounth} = query
        const option = { ...manager, Mounth: mounth}
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
    userId: null,
    balanceHistoryChangeType: null,
    dateFrom: ly.toISOString(),
    dateTo: now.toISOString()
}

const getBalanceChangesHistory = manager => (callback, query = getBalanceChangesHistoryOptions) => {
    connect((err, client) => {
        if(err) throw new Error(err)
        
        const options = {
            ...manager,
            ...query,
        }

        client.GetBalanceChangesHistory(options, (err, result) => {
            if(err) throw new Error(err)
            callback(result.GetBalanceChangesHistoryResult.BalanceChangesHistoryEvent)
        })
    })
}

module.exports = manager => {
    return {
        getConsumerBalancesOptions,
        getBalanceChangesHistoryOptions,
        gddBalance: addBalance(manager),
        getConsumerBalances: getConsumerBalances(manager),
        getBalanceChangesHistory: getBalanceChangesHistory(manager)
    }
}