'use strict'

angular.module 'scheduler'
.controller 'ScheduleCtrl',
  ['$scope', '$stateParams', '$modal', 'calendar', ($scope, $stateParams, $modal, calendar) ->
    vm = this

    if $stateParams.dayId
      calendar.currentDay = moment($stateParams.dayId, 'YYYYMMDD')._d
      $scope.$emit('newDate', calendar.currentDay)

    $scope.week = calendar.getWeek calendar.currentDay

    $scope.getDayId = calendar.getDayId

    $scope.dayTitle = (day) ->
      return moment day
        .format('DD MMMM / ddd')

    $scope.isToday = calendar.isToday

    $scope.openEditModal = (clickedObj) ->
      editInstance = $modal.open
        animation: true,
        templateUrl: 'app/edit/edit.html',
        controller: 'EditInstanceCtrl',
        resolve:
          clickedObj: ->
            clickedObj

      editInstance.result.then (result) ->
        if result.action == 'save'
          calendar.removeEvent result.dailyShedule.dayId, result.event.id if result.event.id?
          calendar.addEvent result.dailyShedule.dayId, result.event
        else if result.action == 'delete'
          calendar.removeEvent result.dailyShedule.dayId, result.event.id
        result.dailyShedule.dayData = calendar.get(result.dailyShedule.dayId)

    return
  ]
