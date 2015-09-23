'use strict'

angular.module 'scheduler'
.controller 'EditInstanceCtrl',
  ['$scope', '$modalInstance', '$modal', 'calendar', 'eventItem', 'toastr', 'clickedObj',
  ($scope, $modalInstance, $modal, calendar, eventItem, toastr, clickedObj) ->

    $scope.event = new eventItem

    $scope.editButtonVisible = ''

    if clickedObj.timeId != undefined
      $scope.event.startTimeId = clickedObj.timeId
      $scope.event.endTimeId = clickedObj.timeId + 1
      $scope.editButtonVisible = 'display: none' # Wrong way to store styles at view

    $scope.editTitle = ->
      if clickedObj.event
        $scope.event = clickedObj.event
        return 'Изменить событие'
      return 'Добавить событие'

    checkEvent = (event) ->
      # Better extract sub methods
      if event.startTimeId == event.endTimeId
        toastr.error 'Неверно указано время'
        return false

      if event.startTimeId > event.endTimeId
        event.endTimeId = [event.startTimeId, event.startTimeId = event.endTimeId][0]

      dayData = calendar.get(clickedObj.dailyShedule.dayId)
      for existEvent in dayData
        if existEvent.id == event.id
          continue
        # Move method to model
        P1a = event.startTimeId
        P1b = event.endTimeId
        P2a = existEvent.startTimeId
        P2b = existEvent.endTimeId
        u2a = ((P2a-P1a)*(P1b-P1a))/((P1b-P1a)*(P1b-P1a))
        u2b = ((P2b-P1a)*(P1b-P1a))/((P1b-P1a)*(P1b-P1a))
        if !(Math.max(u2a,u2b) <= 0 || Math.min(u2a,u2b) >= 1)
          toastr.error 'Время занято'
          return false
      true

    confirm = () ->
      # Better to return state and pass flag to template
      confirmInstance = $modal.open
        animation: true,
        size: 'sm',
        templateUrl: 'app/confirm/confirm.html',
        controller: 'ConfirmInstanceCtrl',
        resolve:
          eventName: ->
            $scope.event.name

      confirmInstance.result.then () ->
        $modalInstance.close {dailyShedule: clickedObj.dailyShedule, event: $scope.event, action: 'delete'}

    $scope.save = ->
      if checkEvent($scope.event)
        $modalInstance.close {dailyShedule: clickedObj.dailyShedule, event: $scope.event, action: 'save'}

    $scope.delete = ->
      confirm()

    $scope.cancel = ->
      $modalInstance.dismiss 'cancel'

    $scope.timeIds = []
    $scope.timeIds.push({id:i, label:('0'+i).match(/..$/)[0] + ':00'}) for i in [0..24]

    return
  ]
