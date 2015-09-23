'use strict'

angular.module "scheduler"
  .config ($stateProvider, $urlRouterProvider, calendarProvider) ->

    calendar = calendarProvider.$get()
    CurrentDayId = calendar.getDayId(calendar.currentDay)

    # Better move to stateProvider state. Add controller with redirect logic
    $urlRouterProvider.when "", "/home/schedule/" + CurrentDayId
    $urlRouterProvider.when "/", "/home/schedule/" + CurrentDayId
    $urlRouterProvider.otherwise "/home/schedule/" + CurrentDayId

    # Better extract index state and app controller
    $stateProvider
      .state "home",
        abstract: true
        url: "/home"
        templateUrl: "app/main/main.html"
        controller: "MainCtrl"
        controllerAs: "main"

      .state 'home.schedule',
        url: "/schedule/:dayId"
#        params:
#          skipweeks: 0
        controller: "ScheduleCtrl"
        controllerAs: "schedule"
        templateUrl: "app/schedule/schedule.html"
