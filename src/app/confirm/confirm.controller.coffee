'use strict'

angular.module 'scheduler'
.controller 'ConfirmInstanceCtrl',
  ['$scope', '$modalInstance', 'eventName'
    ($scope, $modalInstance, eventName) ->

      $scope.title = 'Удаление'
      $scope.eventName = eventName

      $scope.yes = ->
        $modalInstance.close true

      $scope.cancel = ->
        $modalInstance.dismiss 'cancel'
  ]
