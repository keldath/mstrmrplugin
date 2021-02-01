
try {
    ///warn admin user
    function saveAlert () {
    
      if($("#mstrPathAccount2").text() != ('Web Administrator [sign out]')
         && $("[type='autoRefresherWrap']").length > 0) {
         //add a click listener to save btn
         $(".item.btn.save",".item.mb.file").off('click',saveAlert)//remove if exists
          $(".item.btn.save",".item.mb.file").on('click',saveAlert)
            //run the alert
          alert('This Report contain an AutoRefresher mechanizm.\
    if you leave this report with saving it as is -> the AutoRefresher will be gone.\
    you can re add the code by using the adder funcion - contact CS Plugin Developers.')
    
      }
    }
    
    window.Allot['AutoRefresher'].autoRefresher = function (event,trigger) {
      //console.log(event,'refresher')
      //triger can come from auto run - report load or manual - form the start button.
      //their the needed id of event target is different for each.
    
      var parentWrapper;
      if (trigger == 0) {
        parentWrapper = document.getElementById(event)
        //remove the mask, we are ready (page setup finished.) --> this is the first time the code runs.
        if(/*window.Allot.plugins.scriptsFN.WaitBoxStatus() && */$(".autorefresherMask").length > 0) {
            window.Allot.plugins.scriptsFN.maskTrigger({'className':'autorefresherMask','trigger':'off'})
    
          }
    
      }
      else {
        parentWrapper = document.getElementById(event.target.parentElement.id);
      }
      if (parentWrapper == null) {
        return
      }
      window.Allot['AutoRefresher'].resizer()
      // this fires a custom event to the body to tell that a new count is begining
          //with this we can make stuff to fire once a new cycle of wait time begins :)
          //see websafe real time report on hardcoded.js  - it fires a python script after event was detected.
      const customEvent = new Event('AutoRefresher',{detail: {startingInterval : true}});
      document.body.dispatchEvent(customEvent);
    
    
      var quantity = document.getElementById(parentWrapper.children[1].id)
      var counter = document.getElementById(parentWrapper.children[5].id)
      var intervalT = document.getElementById(parentWrapper.children[2].id).value == 'Min' ? 60000 : 1000 //set the interval of the refresh according to the dropdown
      quantity.attributes.value.value = parseInt(quantity.value);
      counter.innerText = parseInt(quantity.value)
      var time = new Date(); //can be used to limit wait time
      var now = time.getTime();//can be used to limit wait time
      function clocker ()  {
        var int;
    
         if(window.Allot.plugins.scriptsFN.WaitBoxStatus() && $(".autorefresherMask").length > 0) {
              window.Allot.plugins.scriptsFN.maskTrigger({'className':'autorefresherMask','trigger':'off'})
              //remove the mask, we are ready (page setup finished.)
        }
        if (parentWrapper.attributes.active.value == 'no') {
            //this allows to break the refresher - using an attribute in the html
            stopperclocker();
            int = null;
            console.log('stopped')
            return
        }
    
        if (parseInt(counter.innerText) > 1) {
                 counter.innerText = parseInt(counter.innerText)-1;
                //these will make sure the sesison wont time out - if time out after 15 - autoref is gone...
                //bug found by aliaksei a.
                mstrApp.sessionManager.restart();
                mstrApp.sessionManager.keepSessionAlive();
                $(".mstrmojo-VIBox:eq(0)").click()
               //  console.log(counter.innerText)
                 //reduce the counter
                 //debugger;
        }
        else if (parseInt(counter.innerText) == 1) {
                //if thers 1 second, stop it and click the mstr refresh butotn/function
                stopperclocker();
                int = null;
                counter.innerText = parseInt(counter.innerText)-1
                //these will make sure the sesison wont time out - if time out after 15 - autoref is gone...
                //bug found by aliaksei a.
                mstrApp.sessionManager.restart();
                mstrApp.sessionManager.keepSessionAlive();
                $(".mstrmojo-VIBox:eq(0)").click()
                var future = new Date();
                var timepassed = future.getTime() - now;
                window.Allot['AutoRefresher'].autoRefresherReset(event,trigger) //carry pver the params for the next cycle.
                return
        }
        else {
            stopperclocker()
            int = null;
    
    
        }
      }
    
     int = setInterval(clocker,intervalT)
    
      function stopperclocker () {
            clearInterval(int)
            // Set a fake timeout to get the highest timeout id - kill all timeout
            var highestTimeoutId = setTimeout(";");
            var highestintervalId = setInterval(";");
            for (var i = 0 ; i < highestTimeoutId ; i++) {
              clearTimeout(i);
            }
            for (var i = 0 ; i < highestintervalId ; i++) {
              clearInterval(i);
            }
      }
    
    }
    
    window.Allot['AutoRefresher'].autoRefresherReset =  function (event,trigger) {
         mstrApp.rootCtrl.docCtrl.refresh();//mstr function to refresh
         var waitBoxint = setInterval (()=>{
                    if(window.Allot.plugins.scriptsFN.WaitBoxStatus()) {
                        clearInterval(waitBoxint)
                         //this part will fire a mouseenter for every selector btn in the report.
                        //refresh can reset the button name to default. so some selectors (for now panelstack,upon hover , will set their button
                        //according to the target or some other method i did. sagis 03092020)
                        var pluginSelectorsBtn = $(".mstrmojo-DocPanel.mstrmojo-VIDocRelativePanel:visible .Container_btn")
                        if (pluginSelectorsBtn.legnth > 0 ) {
                            for (let j=0;j<pluginSelectorsBtn.length;j++) {
                                $(pluginSelectorsBtn[j]).trigger('mouseenter')
                                $(pluginSelectorsBtn[j]).trigger('mouseleave')
                            }
                        }
                        window.Allot['AutoRefresher'].autoRefresher(event,trigger);
                        return
                      }
          },500)
    }
    
    //button to manual start
    window.Allot['AutoRefresher'].autoRefresherStarter = function (event) {
      //console.log(event,'starter')
      var parentWrapper = document.getElementById(event.target.parentElement.id);
      parentWrapper.attributes.active.value = 'yes'
      //var currcss = $("#AutoRefreshId").find("[name='Stop']").css('background-color')
      var currcss = $("#AutoRefreshId").find("[name='Stop']").css('display')
      if (currcss == 'none') {
        $("#AutoRefreshId").find("[name='Start']").css('display', 'none')
        $("#AutoRefreshId").find("[name='Stop']").css('display','inline')
      }
      window.Allot['AutoRefresher'].resizer()
      return window.Allot['AutoRefresher'].autoRefresher(event,1)
    }
    
    //button to manual stop
    window.Allot['AutoRefresher'].autoRefresherStopper = function (event) {
      var parentWrapper = document.getElementById(event.target.parentElement.id);
      var quantity = document.getElementById(parentWrapper.children[1].id)
      var counter = document.getElementById(parentWrapper.children[5].id)
      parentWrapper.attributes.active.value = 'no';
      //var currcss = $("#AutoRefreshId").find("[name='Start']").css('background-color')
      var currcss = $("#AutoRefreshId").find("[name='Start']").css('display')
      if (currcss == 'none') {
        $("#AutoRefreshId").find("[name='Start']").css('display','inline')
        $("#AutoRefreshId").find("[name='Stop']").css('display','none')
      }
      counter.innerText = parseInt(quantity.value);
      window.Allot['AutoRefresher'].resizer()
      return false
    }
    
    //button to manual stop
    window.Allot['AutoRefresher'].autoRefresherInit = function (event,dynamic=true) {
      event.stopPropagation();
      event.stopImmediatePropagation();
      event.preventDefault();
      var parentWrapper = document.getElementById(event.target.parentElement.id);
    
      var autoelem = $("#AutoRefreshId");
      var defaultInt = autoelem.find("[name='rate']")[0].value;
      var primary = autoelem.find('[name="select"]')[0].value;
      var secodary = primary == 'Min' ? 'Sec' : 'Min';
      window.Allot['AutoRefresher'].nodeHtml(defaultInt,primary,secodary,script="<div/>",dynamic)
    
      return false
    }
    
    window.Allot['AutoRefresher'].rootready =  function (id) {
    
         if (window.Allot.plugins.scripts.dossier['AutoRefresher'][0] == 'loaded') {
         var pabelcanvas =  $(".mstrmojo-VIDocLayout:visible")
         var maskValues = {'className':'autorefresherMask','trigger':'on','height': window.innerHeight+"px",
                                            'width': window.innerWidth+"px",
                                            'text': 'Preparing AutoRefresher...','background': '#eaebeb','bottom': '0px','margin-left': '36%' , 'loaderImg': '../style/mstr/images/loader_round.gif','size': '70'}
         if($(".autorefresherMask").length == 0) {
           window.Allot.plugins.scriptsFN.maskTrigger(maskValues)
         }
    
            if ($(".mstrmojo-RootView-content").length > 0 && $(".scriptsMask").length == 0) {
              try {
                var htmlCont = $("#"+id).closest(".mstrmojo-UnitContainer.mstrmojo-HtmlBox").get(0).id
                if($('.BodyRefresher').length == 0) {
                  //lets take the html box dom adn cut it from the canvas (detach)
                  var node = $("#"+id).detach().addClass('BodyRefresher').css({'position':'absolute','z-index':'9999','left':$("#mojoPath-extraLinks").position().left-300 + 'px','margin-top':'0.16%'})
                  $("body").prepend(node); //now paste it back to the body element it self.
                  var BodyRefresher = $('.BodyRefresher')
                  BodyRefresher.find("[name='Init']").remove(); //we dont want init on the body. it is set with the default.
                  if (BodyRefresher.find("[name='rate']").attr('dynamic') == 'false') {
                    //right click on the init means we do not want to allow the user to change the interval refresher
                       BodyRefresher.find("[name='rate']").hide()
                      BodyRefresher.find("[name='select']").hide()
                  }
                  //readjust the positioning to the page res and rpeort name length
                   window.Allot['AutoRefresher'].resizer()
                   // mstrmojo.all[htmlCont].parent.deleteBoxAndSubmit(mstrmojo.all[htmlCont])//special method - to remove only the html box - its still in the mstrmojo.
                   //mstrmojo.all[htmlCont].parent.deleteBox(mstrmojo.all[htmlCont])
                  // mstrmojo.all[htmlCont].deleteSelf()
                    //now that we pushed the code to the body, we dont need the htnl box, so remove it to regain proper report structure.
                    mstrmojo.all[htmlCont].selectVIUnit()
                    try {mstrmojo.all[htmlCont].disposables[4].items[2].fn()}catch{}
                    try {mstrmojo.all[htmlCont].menuBtnInfo.menuCfg.menus[3].fn()}catch{}
                     if ($("#mstrPathAccount2").text().includes('Administrator ')) {
                          saveAlert()
                    }
    
                }
              } catch{}
    
              window.Allot['AutoRefresher'].autoRefresher(id,0) //now we have proper dom setup, start the refresher
            }
            else {
               setTimeout(()=> {window.Allot['AutoRefresher'].rootready(id) },1000)
            }
    
        }
    }
    
    //once the report loads, do the magic.
    $(window).ready(function(){
      if($("#AutoRefreshId").length >0) {
          window.Allot['AutoRefresher'].rootready('AutoRefreshId')
        }
      })
    //once the report loads, do the magic.
    window.Allot['AutoRefresher'].resizer = function () {
    
      if($("#AutoRefreshId").length >0) {
          if($('.BodyRefresher').length > 0) {
                $(".BodyRefresher").css({'position':'absolute','z-index':'9999','left':$("#mojoPath-extraLinks").position().left-350 + 'px','margin-top':'0.16%'})
                /*$(".BodyRefresher").css('left',$("#mojoPath-extraLinks").position().left-300 + 'px')
                 var pathbar = $(".pathCurrent").position().left + $(".pathCurrent").text().length+80
                 var updatedposition = pathbar > $(".BodyRefresher").position().left ?pathbar  : $("#mojoPath-extraLinks").position().left-300 + 'px';
                  $(".BodyRefresher").css('left',updatedposition+ 20 +"px")
                  console.log('resize')
                 */
        }}
    }
    
    window.addEventListener('resize',window.Allot['AutoRefresher'].resizer)
    
    
    window.Allot['AutoRefresher'].nodeHtml = function (defaultInt=60,primary="Sec",secodary="Min",script="<div/>",dynamic=true) {
        /*this function is the button, it will add the html to an html box in the report.*/
        /*this is the most importent part - it will make sure not to remove the dom until report is reloaded */
        window.Allot.plugins.scripts.dossier['AutoRefresher'][0] = 'restartreport'//anyname will do
    
        var useIntervallater = false;
        var existinghAutoRefresh = $("#AutoRefreshId")
        if (existinghAutoRefresh.length > 0) {
            var id = existinghAutoRefresh.closest(".mstrmojo-UnitContainer.mstrmojo-HtmlBox").get(0).id
            mstrmojo.all[id].selectVIUnit()
            try {mstrmojo.all[id].disposables[4].items[2].fn()}catch{}
            try {mstrmojo.all[id].menuBtnInfo.menuCfg.menus[3].fn()}catch{}
            useIntervallater = true;
        }//
    
    
        var pretxt = primary == 'Sec' ? 's' : 'm';
        var txt = dynamic == false ? defaultInt + ' ' + pretxt : '';
        var newId =  'AutoRefreshId'//Math.random().toString(36).substr(2, 10)+Math.random().toString(36).substr(2, 10)
        var script = "<script>(function  waitforscript () {\
                        setTimeout(()=>{\
                              if (window.Allot.plugins.scripts.dossier['AutoRefresher'][0] == 'loaded') {\
                                  window.Allot.AutoRefresher.rootready('"+newId+"')\
                               }\
                              else {\
                                waitforscript ()\
                              }  },500)\
                        })()</script>"
         var autoRefresherDOM = (/*script+*/
                                "<div class='SelectorsContainer' id='"+newId+"' type='autoRefresherWrap' active='yes' \
                                 style='display: inline-block;background-color: #8080801 ;margin-top: 0.16%;'>\
                                          <label for='rate' name='ratelbl' style='padding: 5px 10px 5px 10px;color: #fff;background:#a2a2a299;border-radius: 20px;' >Refresh Every:"+txt+"</label>\
                                          <input type='number' name='rate' dynamic='"+dynamic+"' title='define the refresh time Interval rate' step='2' id='quantity' name='quantity' min='1' max='1000' value='"+defaultInt+"' style='background:#fff;text-align:center;border-width:thin;border-radius:5px;'>\
                                          <select name='select' id='time' dynamic='"+dynamic+"' title='choose the time type to count with'  style='background:#fff;border-radius:20px;'>\
                                             <option value='"+primary+"'>"+primary+"</option>\
                                             <option value='"+secodary+"'>"+secodary+"</option>\
                                           </select>\
                                          <input type='submit' name='Start' id='start' value='&#x23f5;' title='Start the AutoRefresher' onclick='window.Allot.AutoRefresher.autoRefresherStarter(event)' style='border-width:thin;border-radius:5px;display:none;width:25px;'>\
                                          <input type='submit' name='Stop' value='&#10073;&#10073;' title='Stop the AutoRefresher' onclick='window.Allot.AutoRefresher.autoRefresherStopper(event)' style='border-width:thin;border-radius:5px;width:25px;'>\
                                          <label for='Start' id='counter' title='How Much Time left before Data Refresh' style='padding: 5px 10px 5px 10px;border-radius:10px;color:#fff;\
                                                font-weight:bold;font-family:sans-serif;background:#a2a2a299;'>0</label>\
                                          <input type='submit' name='Init' id='init' title='Set the selected setup: right click will disable interval change' value='Init' onclick='window.Allot.AutoRefresher.autoRefresherInit(event,true)' \
                                                                                                  oncontextmenu='window.Allot.AutoRefresher.autoRefresherInit(event,false)' \
                                          style='border-width:thin;border-radius:5px;'>\
                                   </div>")
         if (useIntervallater) {
         var addHtml = setInterval(()=>  {
                      if(window.Allot.plugins.scriptsFN.WaitBoxStatus()) {//wait when its clear
                          clearInterval(addHtml)
                          mstrApp.rootCtrl.docCtrl.insertHtml();
                        }
                    },200)
         }
         else {
            mstrApp.rootCtrl.docCtrl.insertHtml();
         }
         //add html box
         var waitBoxinthtml = setInterval (()=>{
                    if(window.Allot.plugins.scriptsFN.WaitBoxStatus()) {//wait when its clear
                        clearInterval(waitBoxinthtml)
                        var newHtml = mstrmojo.all[$(".mstrmojo-UnitContainer.mstrmojo-HtmlBox.selected").get(0).id] //the selected is the one we just added (default mstr effect.. luckily)
                        newHtml.children[1].children[2]._set_selectedIndex(1,1,1) //switch to html and not iframe
                        newHtml.children[1].children[3].value = autoRefresherDOM //update the text dom
                        newHtml.children[1].children[4].onclick() //fire a click
                        return true
                      }
                    },500)
    }
    
    
    //add an alert -  only for administrators.
    $(window).ready(()=>{
      saveAlert()
    })
    
    window.Allot.plugins.scripts.dossier['AutoRefresher'][0] = 'loaded'
    
    //HELPER FUNCTION - used during development to add the refresher. left here as a tribute to Mali.M.
    window.Allot.CLRCSTUFF = {'MaliDAQueen':''}
    window.Allot.CLRCSTUFF['MaliDAQueen'] =  function ()  {
                 if ($("[type='autoRefresherWrap']").length == 0) {
                     alert('After report reload - do not save it or the Refresher will be gone')
                     window.Allot['AutoRefresher'].nodeHtml()
                 }
                 else {
                      alert('There is already an AutoRefresher on the page')
                 }
    }
    
    }
    catch {
      window.Allot.plugins.scripts.dossier['AutoRefresher'][0] = 'error'
    }
    
    