const connect = require('./connect')('EmExInmotion')

/**
  * @typedef inmOptions
  * @type {Object}
  * @property {dateTime | null} beginDateначальная дата выборки. При передаче null фильтрация по этому полю не производится.
  * @property {dateTime | null} endDate конечная дата выборки. При передаче null фильтрация по этому полю не производится.
  * @property {number | null} id уникальный идентификатор заказа
  * @property {boolean} activeOnly при передаче значения true вернутся только активные заказы (т.е. заказы НЕ в статусах 5, 22)
  * @property {string | null} timestamp при передаче непустого значения вернется движение с timestamp больше переданного. Если передать null – параметр не повлияет на выборку.
  * @property {number | null} detailNum номер детали.
  * @property {string} reference комментарий, который заносит оптовик.
  * @property {number} states список допустимых состояний для фильтрации.
  * @property {[number] | null} globalIds список заказов для фильтрации
  */
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

/**
  * @typedef InmWholesaler
  * @type {Object}
  * @property {*} AccPriceOrdPotrRUR	Начальная цена в рублях для потребителя
  * @property {*} AccPriceOrdOptRUR	Начальная цена в рублях для оптовика
  * @property {*} AccPriceLastPotrRUR	Цена в рублях для потребителя в состоянии "Выдано"
  * @property {*} AccPriceLastOptRUR	Цена в рублях для оптовика в состоянии "Выдано"
  * @property {*} AccDate	Дата состояния "Выдано"
  * @property {*} AccQuantity	Количество в состоянии "Выдано"
  * @property {*} AccPriceOptFullRUR	 
  * @property {*} AccRegDate	Дата состояния "Выдано. Только для региональных складов"
  * @property {*} AccRegQuantity	Количество в состоянии "Выдано. Только для региональных складов"
  * @property {*} AccRegPriceOpt	Цена для оптовика в состоянии "Выдано. Только для региональных складов"
  * @property {*} AccRegPriceOptRUR	Цена для оптовика в рублях в состоянии "Выдано. Только для региональных складов"
  * @property {*} AccPriceOptCreditPayRUR	 
  * @property {*} AnsDate	Дата состояния "Выкуплено"
  * @property {*} AnsQuantity	Количество в состоянии "Выкуплено"
  * @property {*} AnsPriceOptRUR	Цена в рублях для потребителя в состоянии "Выкуплено у поставщика"
  * @property {*} bitONLY	Добавить в корзину. Флажок "только этот номер"
  * @property {*} bitQUAN	Добавить в корзину. Флажок "только это количество"
  * @property {*} bitUNIT	Добавить в корзину. Флажок "номерной агрегат"
  * @property {*} bitAGRE	Добавить в корзину. Флажок "согласен на повышение цены"
  * @property {*} bitNOTC	 
  * @property {*} bitWAITSTOC	Добавить в корзину. Флажок "ожидать наличия месяц для складского заказа"
  * @property {*} bitWAIT	Добавить в корзину. Флажок "ожидать наличия товара у поставщика месяц"
  * @property {*} bitBRAND	Добавить в корзину. Флажок "только этой марки"
  * @property {*} bitREZE	 
  * @property {*} CoeffMaxAGREE	Мера коммерческого кредита
  * @property {*} DenyQuantity	Количество отказанных деталей
  * @property {*} DetailNum	Номер детали
  * @property {*} DestinationLogo	Способ доставки
  * @property {*} DetailQuantity	Количество деталей
  * @property {*} DefDate	Дата возвращения заказчиком по причине дефекта
  * @property {*} DefQuantity	Количество возвращенных деталей по причине дефекта
  * @property {*} DefPriceOpt	Цена по отказанным деталям для оптовика
  * @property {*} DefPriceOptRUR	Цена в рублях для оптовика в состоянии "Возвращено заказчиком по причине дефекта"
  * @property {*} DeliverTimeAverage	Средний срок доставки (в днях)
  * @property {*} DeliverTimeGuarantee	Максимальный срок доставки (в днях)
  * @property {*} DeliverTimeGuaranteeHours	Максимальный срок доставки (в часах)
  * @property {*} DetailNameRusUser	Русское название детали
  * @property {*} GlobalId	Уникальный идентификатор движения
  * @property {*} InvDate	Дата состояния "В пути на склад"
  * @property {*} InvQuantity	Количество в состоянии "В пути на склад"
  * @property {*} MakeLogo	Лого марки автомобиля
  * @property {*} MakeName	Название марки автомобиля
  * @property {*} OptovikReference	Коментарий, введенный оптовиком
  * @property {*} OrdDate	Дата состояния "Заказано"
  * @property {*} OrdQuantity	Количество в состоянии "Заказано"
  * @property {*} OrdPriceOpt	Цена для оптовика в состоянии "Заказано"
  * @property {*} OptovikLogo	Лого оптовика
  * @property {*} OrdPriceOptRUR	Цена в рублях для оптовика в состоянии "В заказе"
  * @property {*} PotrebitelId	Идентификатор потребителя
  * @property {*} PotrebitelReference	Коментарий, введенный потребителем
  * @property {*} PriceLogo	Лого прайса
  * @property {*} POrdDate	Дата предварительного заказа
  * @property {*} POrdQuantity	Количество в предварительном заказе
  * @property {*} PotrebitelName	Название потребителя
  * @property {*} PotrebitelLogo	Лого потребителя
  * @property {*} PriceModifier	 
  * @property {*} PriceRule	Изменение цены потребителя: 0-не изменять, 1-соответственно моей цене, 2-умножать на коэф. наценки, 3-всегда изменять вручную
  * @property {*} PricePotPrevRUR	Начальная цена в рублях для потребителя
  * @property {*} PriceOptPrevRUR	Начальная цена в рублях для оптовика
  * @property {*} QuestionsCount	Количество вопросов по движению
  * @property {*} RecDate	Дата состояния "Пришло"
  * @property {*} RecQuantity	Количество в состоянии "Пришло"
  * @property {*} RecRegDate	Дата состояния "Пришло. Только для региональных складов"
  * @property {*} RecRegQuantity	Количество в состоянии "Пришло. Только для региональных складов"
  * @property {*} RecRegPriceOptRUR	Цена для оптовика в рублях в состоянии "Пришло. Только для региональных складов"
  * @property {*} RecRegPriceOpt	Цена для оптовика в состоянии "Пришло. Только для региональных складов"
  * @property {*} State	Состояние движения (см. справочник Движение деталей)
  * @property {*} StoreDatePlan	Дата хранения на складе
  * @property {*} StoreDateFact	Фактическая дата хранения на складе
  * @property {*} StorePay	Плата за хранение на складе
  * @property {*} StorePayFact	Фактическая плата за хранение на складе
  * @property {*} SubstMakeLogo	Лого производителя замены
  * @property {*} SubstMakeName	Название производителя замены
  * @property {*} SubstDetailNum	Номер детали, на которую была заменена заказанная деталь
  * @property {*} timestamp	массив байт (byte[]). Определяет изменение строки заказа в базе данных.
  * @property {*} UserId	 
  * @property {*} ExpectedDate	Ожидаемая дата доставки на пункт выдачи
 */

/**
  * Метод возвращает массив объектов, представляющий оптовику выборку
  * из истории состояний детали в процессе покупки и доставки клиенту. Выборка данных
  * определяется переданными параметрами. Используется только для оптовика.
  * 
  * @function inmWholesaler
  * @param {function} callback callback-функция в которую передается ответ
  * @param {inmOptions} query Параметры запроса
  * 
  * Этот метод разрешено использовать только оптовикам и запрещено потребителям. В случае
  * потребителя метод возвращает SoapError: "Данный метод может вызываться только оптовиком".
  * 
  * @returns {Array.<InmWholesaler>} InmWholesaler
  */
const inmWholesaler = (callback, query = inmOptions) => {
    connect((err, client) => {
        if(err) throw new Error(err)
        const options = {
            ...this.manager,
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

/**
  * @typedef InmConsumer
  * @type {Object}
  * @property {*} AccPriceOrdPotrRUR	Начальная цена в рублях для потребителя
  * @property {*} AccPriceOrdPotrRUR	Начальная цена в рублях для потребителя
  * @property {*} AccPriceLastPotrRUR	Цена в рублях для потребителя в состоянии "Выдано"
  * @property {*} AccDate	Дата состояния "Выдано"
  * @property {*} AccQuantity	Количество в состоянии "Выдано"
  * @property {*} AccRegDate	Дата состояния "Выдано. Только для региональных складов"
  * @property {*} AccRegQuantity	Количество в состоянии "Выдано. Только для региональных складов"
  * @property {*} AnsDate	Дата состояния "Выкуплено"
  * @property {*} AnsQuantity	Количество в состоянии "Выкуплено"
  * @property {*} bitONLY	Добавить в корзину. Флажок "только этот номер"
  * @property {*} bitQUAN	Добавить в корзину. Флажок "только это количество"
  * @property {*} bitUNIT	Добавить в корзину. Флажок "номерной агрегат"
  * @property {*} bitAGRE	Добавить в корзину. Флажок "согласен на повышение цены"
  * @property {*} bitNOTC	 
  * @property {*} bitWAITSTOC	Добавить в корзину. Флажок "ожидать наличия месяц для складского заказа"
  * @property {*} bitWAIT	Добавить в корзину. Флажок "ожидать наличия товара у поставщика месяц"
  * @property {*} bitBRAND	Добавить в корзину. Флажок "только этой марки"
  * @property {*} bitREZE	 
  * @property {*} DenyQuantity	Количество отказанных деталей
  * @property {*} DetailNum	Номер детали
  * @property {*} DestinationLogo	Способ доставки
  * @property {*} DetailQuantity	Количество деталей
  * @property {*} DefDate	Дата возвращения заказчиком по причине дефекта
  * @property {*} DefQuantity	Количество возвращенных деталей по причине дефекта
  * @property {*} DeliverTimeAverage	Средний срок доставки (в днях)
  * @property {*} DeliverTimeGuarantee	Максимальный срок доставки (в днях)
  * @property {*} DeliverTimeGuaranteeHours	Максимальный срок доставки (в часах)
  * @property {*} DetailNameRusUser	Русское название детали
  * @property {*} GlobalId	Уникальный идентификатор движения
  * @property {*} InvDate	Дата состояния "В пути на склад"
  * @property {*} InvQuantity	Количество в состоянии "В пути на склад"
  * @property {*} MakeLogo	Лого марки автомобиля
  * @property {*} MakeName	Название марки автомобиля
  * @property {*} OrdDate	Дата состояния "Заказано"
  * @property {*} OrdQuantity	Количество в состоянии "Заказано"
  * @property {*} OptovikLogo	Лого оптовика
  * @property {*} PotrebitelId	Идентификатор потребителя
  * @property {*} PotrebitelReference	Коментарий, введенный потребителем
  * @property {*} PriceLogo	Лого прайса
  * @property {*} POrdQuantity	Количество в предварительном заказе
  * @property {*} PotrebitelName	Название потребителя
  * @property {*} PotrebitelLogo	Лого потребителя
  * @property {*} PricePotPrevRUR	Начальная цена в рублях для потребителя
  * @property {*} QuestionsCount	Количество вопросов по движению
  * @property {*} RecDate	Дата состояния "Пришло"
  * @property {*} RecQuantity	Количество в состоянии "Пришло"
  * @property {*} RecRegDate	Дата состояния "Пришло. Только для региональных складов"
  * @property {*} RecRegQuantity	Количество в состоянии "Пришло. Только для региональных складов"
  * @property {*} State	Состояние движения (см. справочник Движение деталей)
  * @property {*} StoreDatePlan	Дата хранения на складе
  * @property {*} StoreDateFact	Фактическая дата хранения на складе
  * @property {*} SubstMakeLogo	 
  * @property {*} SubstMakeName	 
  * @property {*} SubstDetailNum	 
  * @property {*} UserId	 
  * @property {*} timestamp	 
  * @property {*} ExpectedDate	Ожидаемая дата доставки на пункт выдачи
 */

/**
  * Метод возвращает массив объектов, представляющий потребителю
  * выборку из истории состояний детали в процессе покупки и доставки клиенту.
  * Выборка данных определяется переданными параметрами.
  * 
  * @function inmConsumer
  * @param {function} callback callback-функция в которую передается ответ
  * @param {inmOptions} query Параметры запроса
  * 
  * @returns {Array.<InmConsumer>} InmConsumer
  */
const inmConsumer = (callback, query = inmOptions) => {
    connect((err, client) => {
        if(err) throw new Error(err)
        const options = {
            ...this.manager,
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
        client.GetConsumerInmotion5(options, (err, result) => {
            if(err) throw new Error(err)
            callback(result.GetConsumerInmotion5Result.InmConsumer_v5)
        })
    })
}

/**
  * Возвращает номера заказов по данной позиции движения.
  * 
  * @function inMotionSubIdByGlobalId
  * @param {function} callback callback-функция в которую передается ответ
  * @param {number} id Параметры запроса
  * 
  * @returns {Array<number>} 
  */
const inMotionSubIdByGlobalId = (callback, id) => {
    connect((err, client) => {
        if(err) throw new Error(err)
        const options = {
            ...this.manager,
            GlobalId: id
        }
        client.InMotion_SubIdByGlobalId(options, (err, result) => {
            if(err) throw new Error(err)
            callback(result.InMotion_SubIdByGlobalIdResult)
        })
    })
}

/**
  * @typedef GlobalIdInputItem
  * @type {Object}
  * @property {number} GlobalId	Уникальный идентификатор движения
  * @property {number} Count	Количество деталей
  * @property {number} State	Новое состояние
 */

/**
  * Задаёт состояния заказов по уникальным идентификаторам движения и возвращает массив объектов,
  * представляющий данные о текущем состоянии переданных на вход метода заказов.
  * 
  * @function inMotionSubIdByGlobalId
  * @param {function} callback callback-функция в которую передается ответ
  * @param {Array.<GlobalIdInputItem>} items Параметры запроса
  * 
  * @returns {Array<number>} 
  */
const setInmotionStateByGlobalId = (callback, items = []) => {
    connect((err, client) => {
        if(err) throw new Error(err)
        const options = {
            ...this.manager,
            setInmotionStateItems: items
        }
        client.SetInmotionStateByGlobalId(options, (err, result) => {
            if(err) throw new Error(err)
            callback(result.SetInmotionStateByGlobalIddResult.SetInmotionStateByGlobalIdOutputItem)
        })
    })
}

module.exports = manager => {
    this.manager = manager
    return {
        inmOptions,
        inmWholesaler: inmWholesaler.bind(this),
        inmConsumer: inmConsumer.bind(this),
        inMotionSubIdByGlobalId: inMotionSubIdByGlobalId.bind(this),
        setInmotionStateByGlobalId: setInmotionStateByGlobalId.bind(this)
    }
}

