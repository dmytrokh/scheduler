'use strict'

angular.module 'scheduler'
.directive 'scrolly', ->
  directive =
    restrict: 'A',
    link: (scope, element, attrs) ->
      element.bind 'scroll',(e,scrollTop,localTrigger) ->
        if localTrigger
          e.target.scrollTop = scrollTop
        else
          $('div[scrolly="'+attrs.scrolly+'"]').each ->
            if !this.isEqualNode e.target
              $(this).trigger 'scroll', [e.target.scrollTop, true]
