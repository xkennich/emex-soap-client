const connect = require('./connect')('EmExInmotion')

const inmOptions = {
    beginDate: null,
    endDate: null,
    id: null,
    activeOnly: false,
    timestamp: null,
    detailNum: null,
    reference: null,
    states: null,
    globalIds: null,
}

const inmWholesaler = manager => (callback, query = inmOptions) => {
    connect((err, client) => {
        if(err) throw new Error(err)
        const options = {
            ...manager,
            beginDate: query.beginDate,
            endDate: query.endDate,
            greaterThenGlobalId: query.id,
            activeOnly: query.activeOnly,
            timestamp: query.timestamp,
            detailNum: query.detailNum,
            reference: query.reference,
            states: query.states,
            globalIds: query.globalIds,
        }
        client.GetWholesalerInmotion4(options, (err, result) => {
            if(err) throw new Error(err)
            callback(result.GetWholesalerInmotion4Result.InmWholesaler_v4)
        })
    })
}

const inmConsumer = manager => (callback, query = inmOptions) => {
    connect((err, client) => {
        if(err) throw new Error(err)
        const options = {
            ...manager,
            beginDate: query.beginDate,
            endDate: query.endDate,
            greaterThenGlobalId: query.id,
            activeOnly: query.activeOnly,
            timestamp: query.timestamp,
            detailNum: query.detailNum,
            reference: query.reference,
            states: query.states,
            globalIds: query.globalIds,
        }
        client.GetConsumerInmotion(options, (err, result) => {
            if(err) throw new Error(err)
            callback(result.GetConsumerInmotionResult.InmConsumer_v5)
        })
    })
}

const inMotionSubIdByGlobalId = manager => (callback, id) => {
    connect((err, client) => {
        if(err) throw new Error(err)
        const options = {
            ...manager,
            GlobalId: id
        }
        client.InMotion_SubIdByGlobalId(options, (err, result) => {
            if(err) throw new Error(err)
            callback(result.InMotion_SubIdByGlobalIdResult)
        })
    })
}

const setInmotionStateByGlobalId = manager => (callback, items = []) => {
    connect((err, client) => {
        if(err) throw new Error(err)
        const options = {
            ...manager,
            setInmotionStateItems: items
        }
        client.SetInmotionStateByGlobalId(options, (err, result) => {
            if(err) throw new Error(err)
            callback(result.SetInmotionStateByGlobalIddResult.SetInmotionStateByGlobalIdOutputItem)
        })
    })
}

module.exports = manager => {
    return {
        inmOptions,
        inmWholesaler: inmWholesaler(manager),
        inmConsumer: inmConsumer(manager),
        inMotionSubIdByGlobalId: inMotionSubIdByGlobalId(manager),
        setInmotionStateByGlobalId: setInmotionStateByGlobalId(manager)
    }
}

