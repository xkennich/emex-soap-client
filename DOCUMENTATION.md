### Table of Contents

-   [addBalance][1]
    -   [Parameters][2]
-   [getConsumerBalances][3]
    -   [Parameters][4]
-   [getBalanceChangesHistory][5]
    -   [Parameters][6]
-   [balance][7]
    -   [Parameters][8]
    -   [Properties][9]
-   [balance][10]
    -   [Parameters][11]
    -   [Properties][12]
-   [getUsers][13]
    -   [Parameters][14]
-   [changeUserSettings][15]
    -   [Parameters][16]
-   [getPricesAndSignsDict][17]
    -   [Parameters][18]
-   [dictionaries][19]
    -   [Parameters][20]
    -   [Properties][21]
-   [dictionaries][22]
    -   [Parameters][23]
    -   [Properties][24]
-   [inmWholesaler][25]
    -   [Parameters][26]
-   [inmConsumer][27]
    -   [Parameters][28]
-   [inMotionSubIdByGlobalId][29]
    -   [Parameters][30]
-   [inMotionSubIdByGlobalId][31]
    -   [Parameters][32]
-   [inmotion][33]
    -   [Parameters][34]
    -   [Properties][35]
-   [inmotion][36]
    -   [Parameters][37]
    -   [Properties][38]
-   [inmotion][39]
    -   [Parameters][40]
    -   [Properties][41]
-   [inmotion][42]
    -   [Parameters][43]
    -   [Properties][44]
-   [getActiveOrdersDetails][45]
    -   [Parameters][46]
-   [supplierOrders][47]
    -   [Parameters][48]
    -   [Properties][49]

## addBalance

Метод пополнения баланса потребителя.

### Parameters

-   `callback` **[function][50]** callback-функция в которую передается ответ
-   `options` **[Object][51]** Параметры запроса
    -   `options.id` **[number][52]** Идентификатор клиента - UserId
    -   `options.money` **[number][52]** сумма попосления со знаком +, и отрицательная сумма - снятие
    -   `options.comment` **[string][53]** коментарий к счетуМетод возвращяет true, если изменение счета успешно завершено. false - если изменение счета не произошло.

Returns **[boolean][54]** 

## getConsumerBalances

Получение информации о балансе клиентов.
Метод используется при получении данных о балансе клиентов оптовика. Метод вызывается только оптовиком

### Parameters

-   `callback` **[function][50]** callback-функция в которую передается ответ
-   `options` **[Object][51]** Параметры запроса
    -   `options.mounth` **[number][52]** Месяц, за который запрашивается информация (1 … 12).
          При передаче значения 0 возвращает данные за последние 6 месяцев. При передаче значения -1 возвращает данные за весь период работы.
    -   `options.id` **[number][52]** Идентификатор пользователя

Returns **[Array][55]&lt;ConsumerBalance>** ConsumerBalance

## getBalanceChangesHistory

Получение истории баланса потребителей.
Метод используется при получении истории списание/пополнений средств на счете потребителей оптовика.
Метод может быть вызван только оптовиком с указанием периода, за который требуется получить данные.

### Parameters

-   `callback` **[function][50]** callback-функция в которую передается ответ
-   `options` **[Object][51]** Параметры запроса
    -   `options.id` **([number][52] | null)** Идентификатор пользователя
    -   `options.type` **([string][53] | null)** Строковый перечислитель "Тип события". При передаче значения null параметр не будет влиять на выборку.
    -   `options.dateFrom` **dateTime** Начальная дата задаваемого периода.
    -   `options.dateTo` **dateTime** Конечная дата периода, за который запрашивается информация.

Returns **[Array][55]&lt;BalanceChangesHistoryEvent>** BalanceChangesHistoryEvent

## balance

Type: [Object][51]

### Parameters

-   `manager`  

### Properties

-   `UserId` **[number][52]** Идентификатор клиента
-   `PotrName` **[string][53]** ФИО клиента
-   `PotrName_Logo` **[string][53]** Лого (код) потребителя (клиента)
-   `Balance` **float** Значение баланса
-   `Spent` **float** Потраченная сумма
-   `InWorkSumm` **float** Сумма текущих операций клиента
-   `Diff` **float** Разница значений баланса и потраченного/в работе

## balance

Type: [Object][51]

### Parameters

-   `manager`  

### Properties

-   `UserId` **[number][52]** Идентификатор клиента
-   `ChangeDate` **dateTime** Дата/время события изменения баланса
-   `ChangeType` **[string][53]** Строковый перечислитель "Тип события"
-   `Amount` **float** Величина изменения баланса
-   `Comment` **[string][53]** Комментарий, сопровождающий изменение баланса
-   `ChangeSource` **[string][53]** Строковый перечислитель "Источник изменения"
-   `CommissionUser` **float** Комиссия платёжной системы в рублях
-   `PaymentsSystem` **[string][53]** Строковый перечислитель "Платёжная система"

## getUsers

Метод возвращает список потребителей оптовика в виде списка объектов

### Parameters

-   `callback` **[function][50]** callback-функция в которую передается ответ
-   `id` **([number][52] | null)** идентификатор пользователя в системе Эмекс, для которого нужно вернуть данные. Если передать null - возвратятся все потребители оптовика

Returns **[Array][55]&lt;UserInfo>** UserInfo

## changeUserSettings

Метод предназначен для изменения оптовиком настроек потребителя.

### Parameters

-   `callback` **[function][50]** callback-функция в которую передается ответ
-   `options` **([Object][51] | null)** Параметры запроса
    -   `options.id` **([number][52] | null)** идентификатор пользователя в системе Эмекс, настройки которого изменяются
    -   `options.userLogo` **([string][53] | null)** внутренний заголовок пользователя у дилера
    -   `options.managerId` **([number][52] | null)** Id менеджера оптовика, который закреплен за потребителем
    -   `options.address` **([string][53] | null)** уточнение адреса потребителя
    -   `options.autoFreeze` **([string][53] | null)** автоматическая заморозка всех заказов
    -   `options.cashlessPayments` **([boolean][54] | null)** принимать ли оплату по безналичному расчёту (true|false|null)
    -   `options.onlinePayments` **([boolean][54] | null)** пополнение баланса онлайн (true|false|null)
    -   `options.postpaid` **([boolean][54] | null)** прием заказов с постоплатой (true|false|null)
    -   `options.postBalanceLimit` **(any | null)** предельная сумма приёма заказов при постоплате (число|-1|null)
    -   `options.postDeliveryLimit` **(any | null)** предельная сумма выдачи заказов (число|-1|null)
    -   `options.orderPriceChange` **([string][53] | null)** изменение цены по заказу "в работе": 0 - не изменять; 1 - соответствовать моей цене; 2 - умножать на коэффицент наценки; 3 - всегда изменять вручнуюПри передаче null в параметре соответствующая настройка не изменяется. Значение -1 для postBalanceLimit и postDeliveryLimit соответствуют безлимитной предоплате

Returns **[boolean][54]** Возвращает true, если настройки успешно изменены.

## getPricesAndSignsDict

Метод возвращает словарь поставщиков и признаков в виде списка объектов для заданных лого прайса и кода поставки.

### Parameters

-   `callback` **[function][50]** callback-функция в которую передается ответ
-   `options` **[Object][51]** Параметры запроса
    -   `options.priceLogo` **([number][52] | null)** лого прайса. Если параметр пустой, то он не учитывается при выборке.
    -   `options.destinationLogo` **([string][53] | null)** код поставки. Если параметр пустой, то он не учитывается при выборке.

Returns **[Array][55]&lt;PriceAndSigns>** PriceAndSigns

## dictionaries

Type: [Object][51]

### Parameters

-   `manager`  

### Properties

-   `UserId` **[number][52]** Идентификатор клиента
-   `UserSurname` **[string][53]** Фамилия потребителя
-   `UserFirstName` **[string][53]** Имя потребителя
-   `UserLastName` **[string][53]** Отчество потребителя
-   `UserLogo` **[string][53]** Лого потребителя
-   `LocationId` **[number][52]** Id офиса потребителя
-   `LocationAddress` **[string][53]** Адрес офиса потребителя
-   `LocationAddressAdditional` **[string][53]** Уточнение адреса офиса потребителя
-   `ManagerId` **[number][52]** Id менеджера, за которым закреплен потребитель
-   `ManagerFio` **[string][53]** ФИО менеджера, за которым закреплен потребитель
-   `AutoFreeze` **[boolean][54]** Автозаморозка (останавливать обработку заказа или отправлять дальше)
-   `Postpaid` **[boolean][54]** Прием заказов с постоплатой (true) или с предоплатой (false)
-   `OnlinePayments` **[boolean][54]** Пополнение баланса онлайн (доступность платежных систем для самостоятельного пополнения баланса потребителем)
-   `CashlessPayments` **[boolean][54]** Оплата по безналу (доступность безналичного пополнения баланса потребителем)
-   `PostBalanceLimit` **[number][52]** Максимальная сумма (лимит) заказов по постоплате. Если сумма заказов превышает этот лимит, дальнейшее оформление без предоплаты становится невозможно. Если лимит не установлен, возвращает: -1
-   `PostDeliveryLimit` **[number][52]** Максимальная сумма (лимит) заказов к выдаче. При превышении суммы заказов клиента (к выдаче) этого лимита, дальнейшее оформление заказов без предоплаты становится невозможным. Если лимит не установлен, возвращает: -1
-   `OrderPriceChange` **[number][52]** Правило работы с изменением цены

## dictionaries

Type: [Object][51]

### Parameters

-   `manager`  

### Properties

-   `PriceLogo` **[string][53]** Лого прайса
-   `DestinationLogo` **[string][53]** Код поставки
-   `PriceDesc` **[string][53]** Описание прайса
-   `DestinationDesc` **[string][53]** Описание поставки
-   `PriceDescPublicFull` **[string][53]** Полное описание поставщика
-   `OriginalSigns` **[string][53]** Признаки, применимые к прайсу по оригинальным производителям.
-   `NotOriginalSigns` **[string][53]** Признаки, применимые к прайсу по неоригинальным производителям.

## inmWholesaler

Метод возвращает массив объектов, представляющий оптовику выборку
из истории состояний детали в процессе покупки и доставки клиенту. Выборка данных
определяется переданными параметрами. Используется только для оптовика.

### Parameters

-   `callback` **[function][50]** callback-функция в которую передается ответ
-   `options` **[Object][51]&lt;inmOptions>** Параметры запросаЭтот метод разрешено использовать только оптовикам и запрещено потребителям. В случае
    потребителя метод возвращает SoapError: "Данный метод может вызываться только оптовиком".

Returns **[Array][55]&lt;InmWholesaler>** InmWholesaler

## inmConsumer

Метод возвращает массив объектов, представляющий потребителю
выборку из истории состояний детали в процессе покупки и доставки клиенту.
Выборка данных определяется переданными параметрами.

### Parameters

-   `callback` **[function][50]** callback-функция в которую передается ответ
-   `options` **[Object][51]&lt;inmOptions>** Параметры запроса

Returns **[Array][55]&lt;InmConsumer>** InmConsumer

## inMotionSubIdByGlobalId

Возвращает номера заказов по данной позиции движения.

### Parameters

-   `callback` **[function][50]** callback-функция в которую передается ответ
-   `id` **[number][52]** Параметры запроса

Returns **[Array][55]&lt;[number][52]>** 

## inMotionSubIdByGlobalId

Задаёт состояния заказов по уникальным идентификаторам движения и возвращает массив объектов,
представляющий данные о текущем состоянии переданных на вход метода заказов.

### Parameters

-   `callback` **[function][50]** callback-функция в которую передается ответ
-   `items` **[Array][55]&lt;GlobalIdInputItem>** Параметры запроса

Returns **[Array][55]&lt;[number][52]>** 

## inmotion

Type: [Object][51]

### Parameters

-   `manager`  

### Properties

-   `beginDateначальная` **(dateTime | null)** дата выборки. При передаче null фильтрация по этому полю не производится.
-   `endDate` **(dateTime | null)** конечная дата выборки. При передаче null фильтрация по этому полю не производится.
-   `id` **([number][52] | null)** уникальный идентификатор заказа
-   `activeOnly` **[boolean][54]** при передаче значения true вернутся только активные заказы (т.е. заказы НЕ в статусах 5, 22)
-   `timestamp` **([string][53] | null)** при передаче непустого значения вернется движение с timestamp больше переданного. Если передать null – параметр не повлияет на выборку.
-   `detailNum` **([number][52] | null)** номер детали.
-   `reference` **[string][53]** комментарий, который заносит оптовик.
-   `states` **[number][52]** список допустимых состояний для фильтрации.
-   `globalIds` **(\[[number][52]] | null)** список заказов для фильтрации

## inmotion

Type: [Object][51]

### Parameters

-   `manager`  

### Properties

-   `GlobalId` **[number][52]** Уникальный идентификатор движения
-   `Count` **[number][52]** Количество деталей
-   `State` **[number][52]** Новое состояние

## inmotion

Type: [Object][51]

### Parameters

-   `manager`  

### Properties

-   `AccPriceOrdPotrRUR` **any** Начальная цена в рублях для потребителя
-   `AccPriceOrdOptRUR` **any** Начальная цена в рублях для оптовика
-   `AccPriceLastPotrRUR` **any** Цена в рублях для потребителя в состоянии "Выдано"
-   `AccPriceLastOptRUR` **any** Цена в рублях для оптовика в состоянии "Выдано"
-   `AccDate` **any** Дата состояния "Выдано"
-   `AccQuantity` **any** Количество в состоянии "Выдано"
-   `AccPriceOptFullRUR` **any** 
-   `AccRegDate` **any** Дата состояния "Выдано. Только для региональных складов"
-   `AccRegQuantity` **any** Количество в состоянии "Выдано. Только для региональных складов"
-   `AccRegPriceOpt` **any** Цена для оптовика в состоянии "Выдано. Только для региональных складов"
-   `AccRegPriceOptRUR` **any** Цена для оптовика в рублях в состоянии "Выдано. Только для региональных складов"
-   `AccPriceOptCreditPayRUR` **any** 
-   `AnsDate` **any** Дата состояния "Выкуплено"
-   `AnsQuantity` **any** Количество в состоянии "Выкуплено"
-   `AnsPriceOptRUR` **any** Цена в рублях для потребителя в состоянии "Выкуплено у поставщика"
-   `bitONLY` **any** Добавить в корзину. Флажок "только этот номер"
-   `bitQUAN` **any** Добавить в корзину. Флажок "только это количество"
-   `bitUNIT` **any** Добавить в корзину. Флажок "номерной агрегат"
-   `bitAGRE` **any** Добавить в корзину. Флажок "согласен на повышение цены"
-   `bitNOTC` **any** 
-   `bitWAITSTOC` **any** Добавить в корзину. Флажок "ожидать наличия месяц для складского заказа"
-   `bitWAIT` **any** Добавить в корзину. Флажок "ожидать наличия товара у поставщика месяц"
-   `bitBRAND` **any** Добавить в корзину. Флажок "только этой марки"
-   `bitREZE` **any** 
-   `CoeffMaxAGREE` **any** Мера коммерческого кредита
-   `DenyQuantity` **any** Количество отказанных деталей
-   `DetailNum` **any** Номер детали
-   `DestinationLogo` **any** Способ доставки
-   `DetailQuantity` **any** Количество деталей
-   `DefDate` **any** Дата возвращения заказчиком по причине дефекта
-   `DefQuantity` **any** Количество возвращенных деталей по причине дефекта
-   `DefPriceOpt` **any** Цена по отказанным деталям для оптовика
-   `DefPriceOptRUR` **any** Цена в рублях для оптовика в состоянии "Возвращено заказчиком по причине дефекта"
-   `DeliverTimeAverage` **any** Средний срок доставки (в днях)
-   `DeliverTimeGuarantee` **any** Максимальный срок доставки (в днях)
-   `DeliverTimeGuaranteeHours` **any** Максимальный срок доставки (в часах)
-   `DetailNameRusUser` **any** Русское название детали
-   `GlobalId` **any** Уникальный идентификатор движения
-   `InvDate` **any** Дата состояния "В пути на склад"
-   `InvQuantity` **any** Количество в состоянии "В пути на склад"
-   `MakeLogo` **any** Лого марки автомобиля
-   `MakeName` **any** Название марки автомобиля
-   `OptovikReference` **any** Коментарий, введенный оптовиком
-   `OrdDate` **any** Дата состояния "Заказано"
-   `OrdQuantity` **any** Количество в состоянии "Заказано"
-   `OrdPriceOpt` **any** Цена для оптовика в состоянии "Заказано"
-   `OptovikLogo` **any** Лого оптовика
-   `OrdPriceOptRUR` **any** Цена в рублях для оптовика в состоянии "В заказе"
-   `PotrebitelId` **any** Идентификатор потребителя
-   `PotrebitelReference` **any** Коментарий, введенный потребителем
-   `PriceLogo` **any** Лого прайса
-   `POrdDate` **any** Дата предварительного заказа
-   `POrdQuantity` **any** Количество в предварительном заказе
-   `PotrebitelName` **any** Название потребителя
-   `PotrebitelLogo` **any** Лого потребителя
-   `PriceModifier` **any** 
-   `PriceRule` **any** Изменение цены потребителя: 0-не изменять, 1-соответственно моей цене, 2-умножать на коэф. наценки, 3-всегда изменять вручную
-   `PricePotPrevRUR` **any** Начальная цена в рублях для потребителя
-   `PriceOptPrevRUR` **any** Начальная цена в рублях для оптовика
-   `QuestionsCount` **any** Количество вопросов по движению
-   `RecDate` **any** Дата состояния "Пришло"
-   `RecQuantity` **any** Количество в состоянии "Пришло"
-   `RecRegDate` **any** Дата состояния "Пришло. Только для региональных складов"
-   `RecRegQuantity` **any** Количество в состоянии "Пришло. Только для региональных складов"
-   `RecRegPriceOptRUR` **any** Цена для оптовика в рублях в состоянии "Пришло. Только для региональных складов"
-   `RecRegPriceOpt` **any** Цена для оптовика в состоянии "Пришло. Только для региональных складов"
-   `State` **any** Состояние движения (см. справочник Движение деталей)
-   `StoreDatePlan` **any** Дата хранения на складе
-   `StoreDateFact` **any** Фактическая дата хранения на складе
-   `StorePay` **any** Плата за хранение на складе
-   `StorePayFact` **any** Фактическая плата за хранение на складе
-   `SubstMakeLogo` **any** Лого производителя замены
-   `SubstMakeName` **any** Название производителя замены
-   `SubstDetailNum` **any** Номер детали, на которую была заменена заказанная деталь
-   `timestamp` **any** массив байт (byte\[]). Определяет изменение строки заказа в базе данных.
-   `UserId` **any** 
-   `ExpectedDate` **any** Ожидаемая дата доставки на пункт выдачи

## inmotion

Type: [Object][51]

### Parameters

-   `manager`  

### Properties

-   `AccPriceOrdPotrRUR` **any** Начальная цена в рублях для потребителя
-   `AccPriceOrdPotrRUR` **any** Начальная цена в рублях для потребителя
-   `AccPriceLastPotrRUR` **any** Цена в рублях для потребителя в состоянии "Выдано"
-   `AccDate` **any** Дата состояния "Выдано"
-   `AccQuantity` **any** Количество в состоянии "Выдано"
-   `AccRegDate` **any** Дата состояния "Выдано. Только для региональных складов"
-   `AccRegQuantity` **any** Количество в состоянии "Выдано. Только для региональных складов"
-   `AnsDate` **any** Дата состояния "Выкуплено"
-   `AnsQuantity` **any** Количество в состоянии "Выкуплено"
-   `bitONLY` **any** Добавить в корзину. Флажок "только этот номер"
-   `bitQUAN` **any** Добавить в корзину. Флажок "только это количество"
-   `bitUNIT` **any** Добавить в корзину. Флажок "номерной агрегат"
-   `bitAGRE` **any** Добавить в корзину. Флажок "согласен на повышение цены"
-   `bitNOTC` **any** 
-   `bitWAITSTOC` **any** Добавить в корзину. Флажок "ожидать наличия месяц для складского заказа"
-   `bitWAIT` **any** Добавить в корзину. Флажок "ожидать наличия товара у поставщика месяц"
-   `bitBRAND` **any** Добавить в корзину. Флажок "только этой марки"
-   `bitREZE` **any** 
-   `DenyQuantity` **any** Количество отказанных деталей
-   `DetailNum` **any** Номер детали
-   `DestinationLogo` **any** Способ доставки
-   `DetailQuantity` **any** Количество деталей
-   `DefDate` **any** Дата возвращения заказчиком по причине дефекта
-   `DefQuantity` **any** Количество возвращенных деталей по причине дефекта
-   `DeliverTimeAverage` **any** Средний срок доставки (в днях)
-   `DeliverTimeGuarantee` **any** Максимальный срок доставки (в днях)
-   `DeliverTimeGuaranteeHours` **any** Максимальный срок доставки (в часах)
-   `DetailNameRusUser` **any** Русское название детали
-   `GlobalId` **any** Уникальный идентификатор движения
-   `InvDate` **any** Дата состояния "В пути на склад"
-   `InvQuantity` **any** Количество в состоянии "В пути на склад"
-   `MakeLogo` **any** Лого марки автомобиля
-   `MakeName` **any** Название марки автомобиля
-   `OrdDate` **any** Дата состояния "Заказано"
-   `OrdQuantity` **any** Количество в состоянии "Заказано"
-   `OptovikLogo` **any** Лого оптовика
-   `PotrebitelId` **any** Идентификатор потребителя
-   `PotrebitelReference` **any** Коментарий, введенный потребителем
-   `PriceLogo` **any** Лого прайса
-   `POrdQuantity` **any** Количество в предварительном заказе
-   `PotrebitelName` **any** Название потребителя
-   `PotrebitelLogo` **any** Лого потребителя
-   `PricePotPrevRUR` **any** Начальная цена в рублях для потребителя
-   `QuestionsCount` **any** Количество вопросов по движению
-   `RecDate` **any** Дата состояния "Пришло"
-   `RecQuantity` **any** Количество в состоянии "Пришло"
-   `RecRegDate` **any** Дата состояния "Пришло. Только для региональных складов"
-   `RecRegQuantity` **any** Количество в состоянии "Пришло. Только для региональных складов"
-   `State` **any** Состояние движения (см. справочник Движение деталей)
-   `StoreDatePlan` **any** Дата хранения на складе
-   `StoreDateFact` **any** Фактическая дата хранения на складе
-   `SubstMakeLogo` **any** 
-   `SubstMakeName` **any** 
-   `SubstDetailNum` **any** 
-   `UserId` **any** 
-   `timestamp` **any** 
-   `ExpectedDate` **any** Ожидаемая дата доставки на пункт выдачи

## getActiveOrdersDetails

Метод возвращает актуальный список заказанных у поставщика товаров.
Актуальными считаются заказы в статусах: "Заказано", "Выкуплено", "В пути".
Заказы со статусами: "Отказано", "Выполнено" в эту выборку не попадают.

### Parameters

-   `callback` **[function][50]** callback-функция в которую передается ответ

Returns **[Array][55]&lt;ActiveOrderDetail>** ActiveOrderDetail

## supplierOrders

Type: [Object][51]

### Parameters

-   `manager`  

### Properties

-   `MakeName` **[string][53]** Марка
-   `DetailNum` **[string][53]** Номер детали
-   `PriceLogo` **[string][53]** Прайс-лист
-   `OrderNumber` **[number][52]** Номер заказа
-   `OrderDate` **dateTime** Дата заказа
-   `OrderDetailSubId` **[number][52]** Идентификатор заказа
-   `HoursLeft` **time** Окончание срока поставки через HoursLeft часов
-   `DetailName` **[string][53]** Наименование детали
-   `Comments` **[string][53]** Признак заказа
-   `DetailQuantity` **[number][52]** Количество деталей
-   `DetailPriceBuy` **float** Цена детали (в CurrencyLogo)
-   `CurrencyLogo` **[string][53]** Валюта
-   `DetailPriceBuyRUR` **float** Цена детали (в рублях)
-   `AnswerQuantity` **[number][52]** Количество (шт.) в ответе поставщика
-   `InvoicedQuantity` **[number][52]** Отправлено (шт.)

[1]: #addbalance

[2]: #parameters

[3]: #getconsumerbalances

[4]: #parameters-1

[5]: #getbalancechangeshistory

[6]: #parameters-2

[7]: #balance

[8]: #parameters-3

[9]: #properties

[10]: #balance-1

[11]: #parameters-4

[12]: #properties-1

[13]: #getusers

[14]: #parameters-5

[15]: #changeusersettings

[16]: #parameters-6

[17]: #getpricesandsignsdict

[18]: #parameters-7

[19]: #dictionaries

[20]: #parameters-8

[21]: #properties-2

[22]: #dictionaries-1

[23]: #parameters-9

[24]: #properties-3

[25]: #inmwholesaler

[26]: #parameters-10

[27]: #inmconsumer

[28]: #parameters-11

[29]: #inmotionsubidbyglobalid

[30]: #parameters-12

[31]: #inmotionsubidbyglobalid-1

[32]: #parameters-13

[33]: #inmotion

[34]: #parameters-14

[35]: #properties-4

[36]: #inmotion-1

[37]: #parameters-15

[38]: #properties-5

[39]: #inmotion-2

[40]: #parameters-16

[41]: #properties-6

[42]: #inmotion-3

[43]: #parameters-17

[44]: #properties-7

[45]: #getactiveordersdetails

[46]: #parameters-18

[47]: #supplierorders

[48]: #parameters-19

[49]: #properties-8

[50]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function

[51]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[52]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[53]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[54]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[55]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array
