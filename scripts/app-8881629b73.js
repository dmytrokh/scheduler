(function(){"use strict";angular.module("scheduler",["ngAnimate","ui.router","anim-in-out","ui.bootstrap"])}).call(this),function(){"use strict";angular.module("scheduler").directive("scrolly",function(){var e;return e={restrict:"A",link:function(e,t,d){return t.bind("scroll",function(e,t,i){return i?e.target.scrollTop=t:$('div[scrolly="'+d.scrolly+'"]').each(function(){return this.isEqualNode(e.target)?void 0:$(this).trigger("scroll",[e.target.scrollTop,!0])})})}}})}.call(this),function(){"use strict";angular.module("scheduler").factory("calendar",["eventItem",function(e){var t,d,i,a,l,s,o,n,c,u,r,m,h,v,y,p,g,f;return g="sched",h=function(e){return g=e},p=function(e){return g+"."+e},t=function(e,t){return localStorage.setItem(p(e),JSON.stringify(t)),!0},u=function(e){return localStorage.removeItem(p(e)),!0},a=function(e){var t,d;return d=localStorage.getItem(p(e)),t=null!==d?JSON.parse(d):[]},m=function(){var e,t;for(e in localStorage)t=localStorage[e],e.substring(0,g.length)===g&&localStorage.removeItem(e);return!0},c=function(e){var t,d,i,a,l;for(l=0,i=0,a=e.length;a>i;i++)d=e[i],t=parseInt(d.id),t>l&&(l=t);return l+1},d=function(e,d){var i;return i=a(e),d.id=c(i),i.push(d),t(e,i),!0},s=function(e,t){var d,i,l,s,o;for(d=a(e),l=s=0,o=d.length;o>s;l=++s)if(i=d[l],t===i.id)return i},r=function(e,d){var i,l,s,o,n;for(i=a(e),s=o=0,n=i.length;n>o;s=++o)if(l=i[s],d===l.id){i.splice(s,1);break}return t(e,i),!0},f=new Date,f.setHours(0,0,0,0),i=new Date(f),v=function(e){return i.setDate(i.getDate()+7*e)},n=function(e){var t;return t=new Date(e),t.setHours(0,0,0,0),f.getTime()===t.getTime()},l=function(e){return moment(e).format("YYYYMMDD")},o=function(e){var t,d,i,s,o,n,c;for(c=[],o=n=0;7>n;o=++n)d=new Date(e),d.setDate(e.getDate()-((e.getDay()+6)%7-o)),s=l(d),i=a(s),t={day:d,dayId:s,dayData:i},c.push(t);return c},y={today:f,currentDay:i,isToday:n,getWeek:o,skipWeeks:v,getDayId:l,storagePrefix:g,setStoragePrefix:h,storageKey:p,add:t,get:a,remove:u,reset:m,addEvent:d,getEvent:s,removeEvent:r}}]).factory("eventItem",function(){var e,t;return e=function(){this.id=0,this.startTimeId=0,this.endTimeId=0,this.name="",this.comment=""},t=e})}.call(this),function(){"use strict";angular.module("scheduler").controller("ScheduleCtrl",["$scope","$stateParams","$modal","calendar",function(e,t,d,i){var a;a=this,t.dayId&&(i.currentDay=moment(t.dayId,"YYYYMMDD")._d,e.$emit("newDate",i.currentDay)),e.week=i.getWeek(i.currentDay),e.getDayId=i.getDayId,e.dayTitle=function(e){return moment(e).format("DD MMMM / ddd")},e.isToday=i.isToday,e.openEditModal=function(e){var t;return t=d.open({animation:!0,templateUrl:"app/edit/edit.html",controller:"EditInstanceCtrl",resolve:{clickedObj:function(){return e}}}),t.result.then(function(e){return"save"===e.action?(null!=e.event.id&&i.removeEvent(e.dailyShedule.dayId,e.event.id),i.addEvent(e.dailyShedule.dayId,e.event)):"delete"===e.action&&i.removeEvent(e.dailyShedule.dayId,e.event.id),e.dailyShedule.dayData=i.get(e.dailyShedule.dayId)})}}])}.call(this),function(){"use strict";angular.module("scheduler").controller("MainCtrl",["$scope","$stateParams","calendar",function(e,t,d){var i,a,l;l=this,e.getYearTitle=function(){return"Year "+d.currentDay.getFullYear()},i=function(){var e,t;return t=function(){},e=new Date(d.currentDay),e.setDate(e.getDate()-((e.getDay()+6)%7+7)),d.getDayId(e)},a=function(){var e,t;return t=function(){},e=new Date(d.currentDay),e.setDate(e.getDate()-((e.getDay()+6)%7-7)),d.getDayId(e)},e.nextMondayId=i(),e.prevMondayId=a(),e.$on("newDate",function(t,d){return e.nextMondayId=i(),e.prevMondayId=a()})}])}.call(this),function(){"use strict";angular.module("scheduler").controller("EditInstanceCtrl",["$scope","$modalInstance","$modal","calendar","eventItem","toastr","clickedObj",function(e,t,d,i,a,l,s){var o,n,c,u;for(e.event=new a,e.editButtonVisible="",void 0!==s.timeId&&(e.event.startTimeId=s.timeId,e.event.endTimeId=s.timeId+1,e.editButtonVisible="display: none"),e.editTitle=function(){return s.event?(e.event=s.event,"Изменить событие"):"Добавить событие"},o=function(e){var t,d,a,o,n,c,u,r,m,h;if(e.startTimeId===e.endTimeId)return l.error("Неверно указано время"),!1;for(e.startTimeId>e.endTimeId&&(e.endTimeId=[e.startTimeId,e.startTimeId=e.endTimeId][0]),n=i.get(s.dailyShedule.dayId),u=0,r=n.length;r>u;u++)if(c=n[u],c.id!==e.id&&(t=e.startTimeId,d=e.endTimeId,a=c.startTimeId,o=c.endTimeId,m=(a-t)*(d-t)/((d-t)*(d-t)),h=(o-t)*(d-t)/((d-t)*(d-t)),!(Math.max(m,h)<=0||Math.min(m,h)>=1)))return l.error("Время занято"),!1;return!0},n=function(){var i;return i=d.open({animation:!0,size:"sm",templateUrl:"app/confirm/confirm.html",controller:"ConfirmInstanceCtrl",resolve:{eventName:function(){return e.event.name}}}),i.result.then(function(){return t.close({dailyShedule:s.dailyShedule,event:e.event,action:"delete"})})},e.save=function(){return o(e.event)?t.close({dailyShedule:s.dailyShedule,event:e.event,action:"save"}):void 0},e["delete"]=function(){return n()},e.cancel=function(){return t.dismiss("cancel")},e.timeIds=[],c=u=0;24>=u;c=++u)e.timeIds.push({id:c,label:("0"+c).match(/..$/)[0]+":00"})}])}.call(this),function(){"use strict";angular.module("scheduler").controller("ConfirmInstanceCtrl",["$scope","$modalInstance","eventName",function(e,t,d){return e.title="Удаление",e.eventName=d,e.yes=function(){return t.close(!0)},e.cancel=function(){return t.dismiss("cancel")}}])}.call(this),function(){"use strict";angular.module("scheduler").run(["$log","calendar","eventItem",function(e,t,d){}])}.call(this),function(){"use strict";angular.module("scheduler").config(["$stateProvider","$urlRouterProvider","calendarProvider",function(e,t,d){var i,a;return a=d.$get(),i=a.getDayId(a.currentDay),t.when("","/home/schedule/"+i),t.when("/","/home/schedule/"+i),t.otherwise("/home/schedule/"+i),e.state("home",{"abstract":!0,url:"/home",templateUrl:"app/main/main.html",controller:"MainCtrl",controllerAs:"main"}).state("home.schedule",{url:"/schedule/:dayId",controller:"ScheduleCtrl",controllerAs:"schedule",templateUrl:"app/schedule/schedule.html"})}])}.call(this),function(){"use strict";angular.module("scheduler").constant("malarkey",malarkey).constant("moment",moment).constant("toastr",toastr)}.call(this),function(){"use strict";angular.module("scheduler").config(["$logProvider",function(e){return e.debugEnabled(!0)}])}.call(this),angular.module("scheduler").run(["$templateCache",function(e){e.put("app/confirm/confirm.html",'<div class="modal-header text-center"><h3 class="modal-title">{{title}}</h3></div><div class="modal-body"><div class="row top10"><div class="col-xs-1"></div><div class="col-xs-10"><div class="text-center">Удалить событие &#39;{{eventName}}&#39;?</div></div><div class="col-xs-1"></div></div></div><div class="modal-footer"><button type="button" ng-click="yes()" class="btn btn-primary">Да</button> <button type="button" ng-click="cancel()" class="btn btn-warning">Отмена</button></div>'),e.put("app/edit/edit.html",'<div class="modal-header text-center"><h3 class="modal-title">{{editTitle()}}</h3></div><div class="modal-body"><div class="row"><div class="col-xs-1"></div><div class="col-xs-3"><select id="startTime" ng-model="event.startTimeId" ng-options="f.id as f.label for f in timeIds" class="form-control sched-dropdown-time"><option></option></select></div><div class="col-xs-4"></div><div class="col-xs-3"><select id="startTime" ng-model="event.endTimeId" ng-options="f.id as f.label for f in timeIds" class="form-control sched-dropdown-time"><option></option></select></div><div class="col-xs-1"></div></div><div class="row top10"><div class="col-xs-1"></div><div class="col-xs-10"><input placeholder="Название" ng-model="event.name" class="form-control"></div><div class="col-xs-1"></div></div><div class="row top10"><div class="col-xs-1"></div><div class="col-xs-10"><textarea placeholder="Комментарий" ng-model="event.comment" rows="8" class="form-control sched-modal-coment"></textarea></div><div class="col-xs-1"></div></div></div><div class="modal-footer"><button type="button" ng-click="save()" class="btn btn-primary">Сохранить</button> <button type="button" ng-click="delete()" style="{{editButtonVisible}}" class="btn btn-alert">Удалить</button> <button type="button" ng-click="cancel()" class="btn btn-warning">Отмена</button></div>'),e.put("app/main/main.html",'<div ng-controller="MainCtrl"><div class="sched-left sched-col"><div scrolly="scheduler-scroll" class="anim-fade sched-left sched-body sched-row"><div class="sched-timeline-item">00:00</div><div class="sched-timeline-item">01:00</div><div class="sched-timeline-item">02:00</div><div class="sched-timeline-item">03:00</div><div class="sched-timeline-item">04:00</div><div class="sched-timeline-item">05:00</div><div class="sched-timeline-item">06:00</div><div class="sched-timeline-item">07:00</div><div class="sched-timeline-item">08:00</div><div class="sched-timeline-item">09:00</div><div class="sched-timeline-item">10:00</div><div class="sched-timeline-item">11:00</div><div class="sched-timeline-item">12:00</div><div class="sched-timeline-item">13:00</div><div class="sched-timeline-item">14:00</div><div class="sched-timeline-item">15:00</div><div class="sched-timeline-item">16:00</div><div class="sched-timeline-item">17:00</div><div class="sched-timeline-item">18:00</div><div class="sched-timeline-item">19:00</div><div class="sched-timeline-item">20:00</div><div class="sched-timeline-item">21:00</div><div class="sched-timeline-item">22:00</div><div class="sched-timeline-item">23:00</div></div></div><div class="sched-right sched-col sched-content"><p class="sched-content-caption">Ежедневник</p><div class="sched-navigate"><div class="sched-navigate-leftbtn"><a ui-sref="home.schedule({ dayId: nextMondayId })" ui-sref-opts="{reload: true}" class="btn btn-default">Prev week</a></div><div class="sched-navigate-title-block"><h1 class="anim-fade sched-navigate-title">{{getYearTitle()}}</h1></div><div class="sched-navigate-rightbtn"><a ui-sref="home.schedule({ dayId: prevMondayId })" ui-sref-opts="{reload: true}" class="btn btn-default">Next week</a></div></div><div ui-view="" class="anim-fade sched-right sched-body sched-row sched-table"></div></div></div>'),e.put("app/schedule/schedule.html",'<div ng-repeat="dailyShedule in week" id="cell_{{dailyShedule.dayId}}" class="sched-cell"><div class="shred-cell-inside"><p class="sched-cell-caption {{isToday(dailyShedule.day) &amp;&amp; &quot;sched-today-cell-caption&quot; || &quot;&quot;}}">{{dayTitle(dailyShedule.day)}}</p><div class="sched-timetable-container stretched"><div scrolly="scheduler-scroll" id="cell_{{dailyShedule.dayId}}" class="sched-timetable"><div ng-click="openEditModal({dailyShedule: dailyShedule, timeId: 0})" class="sched-timetable-item {{isToday(dailyShedule.day) &amp;&amp; &quot;sched-today&quot; || &quot;&quot;}}"></div><div ng-click="openEditModal({dailyShedule: dailyShedule, timeId: 1})" class="sched-timetable-item {{isToday(dailyShedule.day) &amp;&amp; &quot;sched-today&quot; || &quot;&quot;}}"></div><div ng-click="openEditModal({dailyShedule: dailyShedule, timeId: 2})" class="sched-timetable-item {{isToday(dailyShedule.day) &amp;&amp; &quot;sched-today&quot; || &quot;&quot;}}"></div><div ng-click="openEditModal({dailyShedule: dailyShedule, timeId: 3})" class="sched-timetable-item {{isToday(dailyShedule.day) &amp;&amp; &quot;sched-today&quot; || &quot;&quot;}}"></div><div ng-click="openEditModal({dailyShedule: dailyShedule, timeId: 4})" class="sched-timetable-item {{isToday(dailyShedule.day) &amp;&amp; &quot;sched-today&quot; || &quot;&quot;}}"></div><div ng-click="openEditModal({dailyShedule: dailyShedule, timeId: 5})" class="sched-timetable-item {{isToday(dailyShedule.day) &amp;&amp; &quot;sched-today&quot; || &quot;&quot;}}"></div><div ng-click="openEditModal({dailyShedule: dailyShedule, timeId: 6})" class="sched-timetable-item {{isToday(dailyShedule.day) &amp;&amp; &quot;sched-today&quot; || &quot;&quot;}}"></div><div ng-click="openEditModal({dailyShedule: dailyShedule, timeId: 7})" class="sched-timetable-item {{isToday(dailyShedule.day) &amp;&amp; &quot;sched-today&quot; || &quot;&quot;}}"></div><div ng-click="openEditModal({dailyShedule: dailyShedule, timeId: 8})" class="sched-timetable-item {{isToday(dailyShedule.day) &amp;&amp; &quot;sched-today&quot; || &quot;&quot;}}"></div><div ng-click="openEditModal({dailyShedule: dailyShedule, timeId: 9})" class="sched-timetable-item {{isToday(dailyShedule.day) &amp;&amp; &quot;sched-today&quot; || &quot;&quot;}}"></div><div ng-click="openEditModal({dailyShedule: dailyShedule, timeId: 10})" class="sched-timetable-item {{isToday(dailyShedule.day) &amp;&amp; &quot;sched-today&quot; || &quot;&quot;}}"></div><div ng-click="openEditModal({dailyShedule: dailyShedule, timeId: 11})" class="sched-timetable-item {{isToday(dailyShedule.day) &amp;&amp; &quot;sched-today&quot; || &quot;&quot;}}"></div><div ng-click="openEditModal({dailyShedule: dailyShedule, timeId: 12})" class="sched-timetable-item {{isToday(dailyShedule.day) &amp;&amp; &quot;sched-today&quot; || &quot;&quot;}}"></div><div ng-click="openEditModal({dailyShedule: dailyShedule, timeId: 13})" class="sched-timetable-item {{isToday(dailyShedule.day) &amp;&amp; &quot;sched-today&quot; || &quot;&quot;}}"></div><div ng-click="openEditModal({dailyShedule: dailyShedule, timeId: 14})" class="sched-timetable-item {{isToday(dailyShedule.day) &amp;&amp; &quot;sched-today&quot; || &quot;&quot;}}"></div><div ng-click="openEditModal({dailyShedule: dailyShedule, timeId: 15})" class="sched-timetable-item {{isToday(dailyShedule.day) &amp;&amp; &quot;sched-today&quot; || &quot;&quot;}}"></div><div ng-click="openEditModal({dailyShedule: dailyShedule, timeId: 16})" class="sched-timetable-item {{isToday(dailyShedule.day) &amp;&amp; &quot;sched-today&quot; || &quot;&quot;}}"></div><div ng-click="openEditModal({dailyShedule: dailyShedule, timeId: 17})" class="sched-timetable-item {{isToday(dailyShedule.day) &amp;&amp; &quot;sched-today&quot; || &quot;&quot;}}"></div><div ng-click="openEditModal({dailyShedule: dailyShedule, timeId: 18})" class="sched-timetable-item {{isToday(dailyShedule.day) &amp;&amp; &quot;sched-today&quot; || &quot;&quot;}}"></div><div ng-click="openEditModal({dailyShedule: dailyShedule, timeId: 19})" class="sched-timetable-item {{isToday(dailyShedule.day) &amp;&amp; &quot;sched-today&quot; || &quot;&quot;}}"></div><div ng-click="openEditModal({dailyShedule: dailyShedule, timeId: 20})" class="sched-timetable-item {{isToday(dailyShedule.day) &amp;&amp; &quot;sched-today&quot; || &quot;&quot;}}"></div><div ng-click="openEditModal({dailyShedule: dailyShedule, timeId: 21})" class="sched-timetable-item {{isToday(dailyShedule.day) &amp;&amp; &quot;sched-today&quot; || &quot;&quot;}}"></div><div ng-click="openEditModal({dailyShedule: dailyShedule, timeId: 22})" class="sched-timetable-item {{isToday(dailyShedule.day) &amp;&amp; &quot;sched-today&quot; || &quot;&quot;}}"></div><div ng-click="openEditModal({dailyShedule: dailyShedule, timeId: 23})" class="sched-timetable-item {{isToday(dailyShedule.day) &amp;&amp; &quot;sched-today&quot; || &quot;&quot;}}"></div><div ng-repeat="event in dailyShedule.dayData" ng-click="openEditModal({dailyShedule: dailyShedule, event: event})" ng-style="{top:event.startTimeId*30, height:(event.endTimeId - event.startTimeId)*30}" class="sched-event"><div class="sched-event-name">{{event.name}}</div></div></div></div></div></div>')}]);