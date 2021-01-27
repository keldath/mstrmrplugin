

//dear sagi -
/*
you need two type of options -
global
and local
add an toption type to the inputs of the selector

*/

 const viewFiltersSRC = (props) => {
  const options = props.optionsNumbering.map((item,idx)=>{
    let optionData = props.options[item]

    let subOptions = optionData.optionsSubNumbering.map((item,idx)=>{

      return (
        `<div id='condition' conditionidx="${optionData.subOptions[item].condIdx}" iname='${optionData.subOptions[item].iname}' 
          itemdid='${optionData.subOptions[item].objectID}' dsid='${optionData.subOptions[item].datasetID}' 
          basedOn='${optionData.subOptions[item].basedOn}' topx='${optionData.subOptions[item].topx}' 
          operator='${optionData.subOptions[item].operator}' selectTab='${optionData.subOptions[item].selectTab}'>
          parentselctrOp='${optionData.subOptions[item].parentselctrOp}'
          <div id='filteron'>${optionData.subOptions[item].filterOn}</div>
        </div>
        `)
    })

    if (optionData.type ==='preset') {
      return (
        ` <!--OPTION ${item} -->
        <div class='presetFilters' iname='${optionData.iname}' idx='${idx}' linkedalias='${optionData.linkedalias}' 
                alias='${optionData.alias}' subsalias='${optionData.subsalias}'  style='display: none;'>
        <!-- same index means the second will be done only if the first wont (none existeent..its a way to make alternative condition-->
         ${subOptions}  
        </div>`
      )
    }
    else {
      return (
      ` <!--global -->
        <!--globals are condition that are committed anyway-->
        <div class='globalFilters'  iname='globals' alias='globals' idx='${idx}' style='display: none;'>
        ${subOptions}  
        </div> `
      )
    }
  })


  const main = props.maindef;
  console.log(main)

  const selectorFn = (event) => {return window.Allot.plugins.scriptsFN.CS_Custom_Selectors.advViewFilters(event,'buildList')};
  return (

    `<div class='SelectorsContainer' id='${main.id}' type='viewFilter' linkedto='${main.linkedto}' linked='${main.linked}' affectedtarget='${main.affectedtarget}' 
        mask='${main.mask}' linker='${main.linker}' subselector='${main.subselector}' fakeheadline='${main.fakeheadline}' style='display: none;'> ${main.text}
        <div class='Container_drop_down' linker='${main.linker}'>
          <button class='Container_btn' name='${main.id}' linker='${main.linker}' onmouseenter="event.stopPropagation(),${selectorFn}">${main.default}</button>
            <div class='Container_drop_list' linker='${main.linker}'>
                <!-- js adds items here -->
            </div>
            <!-- the id's are empty - this selector type is  type='atrmtr' -uses the targets id's-->
            <div class='ViewFilters' style='display: none;'>
            ${options}
        </div>
    </div>`

  )
}
export default viewFiltersSRC;


// idx: '0',//use the input to generate according to he option idx when adding a new
// alias : 'globals/any', //the name that is assosiated with a parent selector if any
// type: 'global/preset',//should be contsant - it mostly be used when this is taken into chaining selectors (subselector)
// iname: 'globals/any', //name of the option 
// optionsSubNumbering:[0],
// subOptions : {
//   0 : {
//     condIdx: '0', //same idx for another following condition will act as alternatice condition in case this one didnt work(dynamic conditioning)
//     iname: 'attr,0/mstr,0/any', //this will be matched with the parent selector if chaining was done. it will look for the same name and then click it.
//     objectID : 'ObjectId', // the id of the attribute/metric the condition should be set
//     datasetID: 'DataSetId', //id of the data set that contains the mtr / attr
//     basedOn: '', //can be used to grab by nmae an item from the chart it self.//not tested
//     topx: '', //used to filter top x values - need to check i think its not working well - use selectTab ranking instead.
//     operator: 'In/Is Null/Not[..]', //this is the operator for how to choose the values  - default is ID **one day ill do the list in list - they are complicated.
//     selectTab: 'ID/Rank between highest', //how to set the values? with an in operator or not in for example. for metrics - this will be the operator type, betwwen, equal, and su
//     parentselectrOp: 'selectorId,seelctorslinker,optionAlias,show/hide/all', //show or hide the option dependant on another selectors btn
//     filterOn: 'mtr-attr value/for rank- 0:25', //will hold the values to filter , comma seperated values. (if null then its probably a topx) for metrics => as a separator for 2 options - between for example, 0:5
//   }
// },

  /*
            event - the event fired from this function by the html below
            type - tells the function wheather to build a drop list and pass, or run the functionality
            if you want to this selector to run another sub selector in order , using run manager - the runlist holds the functions list,
            and in the end of this - it will add the subselector to that list. so you can run in an orderly fashioned way multiple selectors.
            runlist - can be used with the run manager - if not used its an empty list.
          */
          /*
           <div class='SelectorsContainer' id='viewFilter5mSG3' type='viewFilter' linkedto='Toppanelsmtr5mSG3' linked='Toppanelsmtr5mSG3' affectedtarget='Top Network Traffic' mask='1' linker='4' subselector='charterSelector' fakeheadline='none' style='display: none;'> View Filter:
              <div class='Container_drop_down' linker='4'>
       <button class='Container_btn' name='viewFilter5mSG3' linker='4' onmouseenter="event.stopPropagation(),window.Allot.plugins.scriptsFN.CS_Custom_Selectors.advViewFilters(event,'buildList')">1</button>
              <div class='Container_drop_list' linker='4'>
              <!-- js adds items here -->
              </div>
      <!-- the id's are empty - this selector type is  type='atrmtr' -uses the targets id's-->
              <div class='ViewFilters' style='display: none;'>
            <!--global -->
      <!--globals are condition that are committed anyway-->
            <div class='globalFilters'  iname='globals' alias='globals' idx='0' style='display: none;'>
              <!--this condition only exists in domain, so it will fire only if the ds is of domains -->
              <div id='condition' conditionidx="0" iname="Level Name" itemdid="" dsid=""  basedOn='' topx='' operator="In" selectTab="ID" parentselctrOp="Toppanelsmtr5mSG2,2,Top Line,hide">
                    <div id='filteron'>SG</div>
                       </div>
              <!--alternative condition for the above - all other ds are using it basically -->
              <!--parentselctrOp - show or hide the option dependant on another selectors btn -->
        <div id='condition' conditionidx="1" iname="Level Name" itemdid="" dsid=""  basedOn='' topx='' operator="In" selectTab="ID" parentselctrOp="Toppanelsmtr5mSG2,2,Top Line,show">
                    <div id='filteron'>LINE</div>
                       </div>
              <div id='condition' conditionidx="2" iname="attr,0" itemdid="" dsid=""  basedOn='' topx='' operator="Is Not Null" selectTab="ID">
                    <div id='filteron'></div>
                    </div>
           <!--OPTION 1 -->
           <div class='presetFilters'  iname='Total Bandwidth' idx='1' linkedalias='1' alias='1' subsalias='1'  style='display: none;'>
           <!-- same index means the second will be done only if the first wont (none existeent..its a way to make alternative condition-->
              <div id='condition' conditionidx="0" iname='Top X' itemdid="" dsid="" basedOn='' topx='' operator="Between" selectTab="ID">
                    <div id='filteron'>0:25</div>
                       </div>
              <div id='condition' conditionidx="0" iname='Total Bandwidth' itemdid="" dsid="" basedOn='' topx='' operator="" selectTab="Rank between highest">
                    <div id='filteron'>0:25</div>
                    </div>
                       </div>
            <!--OPTION 2 -->
            <div class='presetFilters'  iname='In Bandwidth' idx='2' linkedalias='2' alias='2' subsalias='1'  style='display: none;'>
              <div id='condition' conditionidx="0" iname='In Bandwidth' itemdid="" dsid="" basedOn='' topx='' operator='' selectTab="Rank between highest">
                    <div id='filteron'>0:25</div>
                    </div>
              </div>
             </div>
          </div>
</div>

          itemdid = the id of the attribute the condition should be set
          dsid = the items data set
          type='viewFilter' = should be contsant - it mostly be used when this is taken into chaining selectors (subselector)
          alias = the name that is assosiated with a parent selector if any
          basedOn = can be used to grab by nmae an item from the chart it self.//not tested
          topx = what is the amount of results to display? top 15 for example -if null and the type is still generaltopx -the
                 top will be chosed by the filteronvalues? topx overwrites the filterOn div values!
          operator = this is the operator for how to choose the values  - default is ID **one day ill do the list in list - they are complicated.
          selectTab = how to set the values? with an in operator or not in for example.
                      for metrics - this will be the operator type, betwwen, equal, and such
          filteron text value = will hold the values to filter , comma seperated values. (if null then its probably a topx)
                                for metrics => as a separator for 2 options - between for example, 0:5
          Linker - uses to help chain selectors.

          //how chain to preset selector :
          linkedto='Toppanelsmtr5mline4' //will hold the parent name selector
          linked='2' //will hold the linker of the parent
          iname = this will be matched with the parent selector if chaining was done. it will look for the same name and then click it.

          */