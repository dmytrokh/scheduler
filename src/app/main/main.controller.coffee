'use strict'

angular.module 'scheduler'
  .controller 'MainCtrl',
  ['$scope', '$stateParams', 'calendar', ($scope, $stateParams, calendar) ->
    vm = this

    $scope.getYearTitle = () ->
      return 'Year ' + calendar.currentDay.getFullYear()

    getNextMondayId = () ->
      nextId = ->
      day = new Date calendar.currentDay
      day.setDate(day.getDate() - ((day.getDay() + 6) %7 + 7))
      return calendar.getDayId(day)

    getPrevMondayId = () ->
      nextId = ->
      day = new Date calendar.currentDay
      day.setDate(day.getDate() - ((day.getDay() + 6) %7 - 7))
      return calendar.getDayId(day)

    $scope.nextMondayId = getNextMondayId()
    $scope.prevMondayId = getPrevMondayId()

    $scope.$on 'newDate',(event, args) ->
      $scope.nextMondayId = getNextMondayId()
      $scope.prevMondayId = getPrevMondayId()

    return
  ]
