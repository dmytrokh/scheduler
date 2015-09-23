'use strict'

angular.module 'scheduler'
  .factory 'calendar', (eventItem) ->

    # Better use model logic. It's easy way to modify to RestAPI storage
    # For example - rails-angular-resourse (model logic, list and inited object) 

    storagePrefix = 'sched'

    setStoragePrefix = (newPrefix) ->
      storagePrefix = newPrefix

    storageKey = (dayId) ->
      return storagePrefix + '.' + dayId

    add = (dayId, dayData) ->
      localStorage.setItem storageKey(dayId), JSON.stringify dayData
      true

    remove = (dayId) ->
      localStorage.removeItem storageKey dayId
      true

    get = (dayId) ->
      stored = localStorage.getItem storageKey(dayId)
      if stored != null
        data = JSON.parse stored
      else
        data = []
      return data

    reset = () ->
      for key, value of localStorage
        if key.substring(0, storagePrefix.length) == storagePrefix
          localStorage.removeItem key
      true

    newEventId = (dayData) ->
      maxid = 0
      for event in dayData
        ev_id = parseInt(event.id)
        if maxid < ev_id
          maxid = ev_id
      return maxid + 1

    addEvent = (dayId, eventData) ->
      dayData = get(dayId)
      eventData.id = newEventId dayData
      dayData.push(eventData)
      add(dayId,dayData)
      true

    getEvent = (dayId, eventId) ->
      dayData = get(dayId)
      for event, index in dayData
        if eventId == event.id
          return event

    removeEvent = (dayId, eventId) ->
      dayData = get(dayId)
      for event, index in dayData
        if eventId == event.id
          dayData.splice(index, 1)
          break
      add(dayId,dayData)
      true

    today = new Date
    today.setHours 0,0,0,0
    currentDay =  new Date today

    skipWeeks = (num) ->
      currentDay.setDate(currentDay.getDate()+7*num)

    isToday = (date) ->
      nulledDate = new Date date
      nulledDate.setHours 0,0,0,0
      return today.getTime() == nulledDate.getTime()

    getDayId = (day) ->
      return moment day
      .format('YYYYMMDD')

    getWeek = (date) ->
      week = []
      for i in [0...7]
        day = new Date date
        day.setDate(date.getDate() - ((date.getDay() + 6) %7 - i))
        dayId = getDayId(day)
        dayData = get(dayId)
        dailyShedule =
          day: day
          dayId: dayId
          dayData: dayData
        week.push dailyShedule
      return week

    srv =
      today: today
      ,currentDay: currentDay
      ,isToday: isToday
      ,getWeek: getWeek
      ,skipWeeks: skipWeeks
      ,getDayId: getDayId

      ,storagePrefix: storagePrefix
      ,setStoragePrefix: setStoragePrefix
      ,storageKey: storageKey
      ,add: add
      ,get: get
      ,remove: remove
      ,reset: reset

      ,addEvent: addEvent
      ,getEvent: getEvent
      ,removeEvent: removeEvent



  .factory 'eventItem', () ->
    eventItem = ->
      @id = 0
      @startTimeId = 0
      @endTimeId = 0
      @name = ''
      @comment = ''
      return

    ret = eventItem
