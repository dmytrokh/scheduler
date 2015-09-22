'use strict'
describe 'services', ->

  calendar = {}
  storagePrefix  = 'tests'
  eventItem = {}

  beforeEach module 'scheduler'
  beforeEach inject (_calendar_, _eventItem_) ->
    calendar = _calendar_
    calendar.setStoragePrefix(storagePrefix)
    eventItem = _eventItem_


  describe 'localStorage', ->
    it 'shold content tests storagePrefix.. just checking', ->
      storageKey = calendar.storageKey '1234567'
      expect  storageKey.substring 0, storagePrefix.length
        .toBe storagePrefix

    it 'shold add and get and remove data from storage', ->
      calendar.add('20151010', 'test')
      expect  calendar.get('20151010')
        .toContain('test')

      calendar.remove('20151010')
      expect calendar.get('20151010')
        .toEqual []

    it 'shold add 2 new events to storage', ->
      newEvent1 = new eventItem
      newEvent1.startTimeId = 0
      newEvent1.endTimeId = 5
      newEvent1.name = 'test1'
      newEvent1.comment = 'coment'
      calendar.addEvent('20151010', newEvent1)

      newEvent2 = new eventItem
      newEvent2.startTimeId = 7
      newEvent2.endTimeId = 8
      newEvent2.name = 'test2'
      newEvent2.comment = 'coment'
      calendar.addEvent('20151010', newEvent2)

      expect calendar.get('20151010').length
        .toBe 2

    it 'shold be new id in added event', ->
      newEvent1 = new eventItem
      newEvent1.startTimeId = 0
      newEvent1.endTimeId = 5
      newEvent1.name = 'test3'
      newEvent1.comment = 'coment'
      calendar.addEvent('20151010', newEvent1)

      events = calendar.get('20151010')
      expect events[events.length-1].id
        .toBeGreaterThan 0

    it 'shold remove specified events from storage (exept last)', ->
      newEvent1 = new eventItem
      newEvent1.startTimeId = 0
      newEvent1.endTimeId = 5
      newEvent1.name = 'test4'
      newEvent1.comment = 'coment'
      calendar.addEvent('20151010', newEvent1)

      newEvent2 = new eventItem
      newEvent2.startTimeId = 7
      newEvent2.endTimeId = 8
      newEvent2.name = 'test5'
      newEvent2.comment = 'coment'
      calendar.addEvent('20151010', newEvent2)

      events = calendar.get('20151010')
      for i in [0..events.length-2]
        calendar.removeEvent('20151010', events[i].id)

      newEventList = calendar.get('20151010')

      expect newEventList.length
        .toBe 1

      expect newEventList[0].name
        .toBe 'test5'

    it 'shold clean tests storage values', ->
      newEvent1 = new eventItem
      newEvent1.startTimeId = 0
      newEvent1.endTimeId = 5
      newEvent1.name = 'test'
      newEvent1.comment = 'coment'
      calendar.addEvent('20151010', newEvent1)

      newEvent2 = new eventItem
      newEvent2.startTimeId = 7
      newEvent2.endTimeId = 8
      newEvent2.name = 'test'
      newEvent2.comment = 'coment'
      calendar.addEvent('20151010', newEvent2)

      calendar.reset()
      expect calendar.get('20151010').length
        .toBe 0



