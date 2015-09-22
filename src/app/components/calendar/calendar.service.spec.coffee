'use strict'
describe 'services', ->

  calendar = {}
  storagePrefix  = 'tests'
  eventItem = {}

  beforeEach module 'scheduler'
  beforeEach inject (_calendar_) ->
    calendar = _calendar_
    calendar.setStoragePrefix(storagePrefix)

  beforeEach inject (_eventItem_) ->
    eventItem = _eventItem_

  describe 'localStorage', ->
    it 'shold content tests storagePrefix.. just checking', ->
      expect do ->
        storageKey = calendar.storageKey '1234567'
        storageKey.substring 0, storagePrefix.length
      .toBe(storagePrefix)

    it 'shold add and get data from storage', ->
      expect do ->
        calendar.add('20151010', 'test')
        return calendar.get('20151010')
      .toContain('test')

    it 'shold remove data from storage', ->
      expect do ->
        calendar.add('20151010', 'test')
        calendar.remove('20151010')
        return calendar.get('20151010')
      .toEqual([])

    it 'shold add 2 new events to storage', ->
      expect do ->
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

        return calendar.get('20151010').length
      .toBe(2)

    it 'shold be new id in added event', ->
      expect do ->
        newEvent1 = new eventItem
        newEvent1.startTimeId = 0
        newEvent1.endTimeId = 5
        newEvent1.name = 'test3'
        newEvent1.comment = 'coment'
        calendar.addEvent('20151010', newEvent1)

        events = calendar.get('20151010')
        return events[events.length-1].id
      .toBeGreaterThan(0)

    it 'shold remove specified events from storage (exept last)', ->
      expect do ->
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

        return newEventList.length == 1 && newEventList[0].name == 'test5'
      .toBeTruthy()

    it 'shold clean tests storage values', ->
      expect do ->
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

        return calendar.get('20151010').length
      .toBe(0)



