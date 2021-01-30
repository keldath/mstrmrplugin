

 const presetSRC = (props) => {
     
    const options = props.optionsNumbering.map((item,idx)=>{
        let optionData = props.options[item]
    
        let subOptions = optionData.optionsSubNumbering.map((item,idx)=>{
    
          return (
                `<div id='atrmtr' linker='${optionData.subOptions[item].linker}' iname='${optionData.subOptions[item].iname}' 
                                    did='${optionData.subOptions[item].did}' zoneidx='${optionData.subOptions[item].zoneidx}' zoneposition='${optionData.subOptions[item].zoneposition}'>
                </div>`
            )
        })
    
        return (
            `<!--OPTION ${item} -->
            <div class='presetoptions' linker='${optionData.linker}' alias='${optionData.alias}'
                            datasname='${optionData.datasname}' datasid='${optionData.datasid}' 
                            props='${optionData.props}' subsalias='${optionData.subsalias}'
                            parentselctrOp='${optionData.parentselctrOp}'>
                    ${subOptions}  
            <div/>`
          )
        }
    )        
    
    //
    //left these ones out, to omuch work for an existing thing.
    //
    //grid filter is an older mechanizem that allow to use a grid visualisation as a filter on anothe visualization
    //in msyt 10.9 there were no viewFilter options so i improvised with this one and hid the grid it self.
    //in later mstr - viewfilter selector can filter specific values of a visualizatiob.
    const gridFilters = '';
    //this changes a box text according to the option choice of the main selector parent option.
    //since then i created a stand alone dynamic selecto that does the same thing , but as a separated selector.
    const dynamicHeadline = '';

    const main = props.maindef;
    console.log(main)
    //dont need the second refrence
    //const selectorFn = (event) => {return window.scSelectorsEffect(props.maindef.linker)};
    return (
      `
      <div class='SelectorsContainer' id='${main.id}' type='preset' affectedtarget='${main.affectedtarget}' mask='${main.mask}' linker='${main.linker}' subselector='${main.subselector}' fakeheadline='${main.fakeheadline}'>${main.text}&nbsp;&nbsp;
        <div class='Container_drop_down' linker='${main.linker}'>
          <button class='Container_btn' name='${main.id}' linker='${main.linker}' onmouseenter="event.stopPropagation(),window.scSelectorsEffect('${main.id}','${main.linker}'))">${main.default}</button>
        <div class='Container_drop_list' linker='${main.linker}'>
            <!-- js adds items here -->
        </div>
        <!--pre list items divided into options and its items ro replace-->
        <div class='PresetItems' linker='${main.linker}' style='display: none;'>
        ${options}
        </div>
      </div>
      ${gridFilters}
      ${dynamicHeadline}
      `
    )
}
export default presetSRC;




// <body>
// <div class='SelectorsContainer' id='Toppanels5msg' type = 'preset' affectedtarget='Top Network Traffic' mask='1' linker='1' subselector='Toppanels5msgs' fakeheadline='none'>by&nbsp;&nbsp;
//       <div class='Container_drop_down' linker='1'>
//         <button class='Container_btn' name='Toppanels5msg' linker='1' onmouseenter="event.stopPropagation(),window.scSelectorsEffect('Toppanels5msg','1')">Top Line</button>
//       <div class='Container_drop_list' linker='1'>
//       <!-- js adds items here -->
// </div>
//       <!--pre list items divided into options and its items ro replace-->
//       <div class='PresetItems' linker='1' style='display: none;'>
//             <div class='presetoptions' linker='1' alias='Top Line' datasname='' datasid='084EB1FD43CCD3EB1181DAA13C8F9C42' props='sortxdesc,condensex' subsalias='Level Name0'>
//                   <div id='atrmtr' linker='1' iname='Line' did='AACDAECF417F17D9E7DD23A90B224C8F' zoneidx='0' zoneposition='0'></div>
//                   <div id='atrmtr' linker='1' iname='Total Bandwidth (sum)' did='F6840B1642BD089776A6DFA151BF4979' zoneidx='1' zoneposition='0'></div>
//                   <div id='atrmtr' linker='1' iname='Line' did='AACDAECF417F17D9E7DD23A90B224C8F' zoneidx='2' zoneposition='0' ></div>
//             </div>
//             <div class='presetoptions' linker='1' alias='Top Apps' datasname='' datasid='719732734E5CDE82CB40E89F7424F3FF' props='sortxdesc,condensex' subsalias='Level Name1'>
//                   <div id='atrmtr' linker='1' iname='Application' did='63D0AC5011E993192E0C0080EF65FA8D' zoneidx='0' zoneposition='0'></div>
//                   <div id='atrmtr' linker='1' iname='Total Bandwidth (sum)' did='74CF208A448FE075F55E649A1B4548F7' zoneidx='1' zoneposition='0'></div>
//                   <div id='atrmtr' linker='1' iname='Application' did='63D0AC5011E993192E0C0080EF65FA8D' zoneidx='2' zoneposition='0' ></div>
//             </div>
//              <div class='presetoptions' linker='1' alias='Top Apps Groups' datasname='' datasid='1842F33248AF020505DF4D807B452716' props='sortxdesc,condensex' subsalias='Level Name2'>
//                   <div id='atrmtr' linker='1' iname='App Group' did='2643219F40FA87108C9122A292408E71' zoneidx='0' zoneposition='0'></div>
//                   <div id='atrmtr' linker='1' iname='Total Bandwidth (Sum)' did='5B7A7ACE4E0716E81EB683BC3DEFB3A7' zoneidx='1' zoneposition='0'></div>
//                   <div id='atrmtr' linker='1' iname='App Group' did='2643219F40FA87108C9122A292408E71' zoneidx='2' zoneposition='0' ></div>
//            </div>
//            <div class='presetoptions' linker='1' alias='Top Host Internal' datasname='' datasid='D8F6E050477AA7508CBD3DAFF11FFBE5' props='sortxdesc,condensex' subsalias='Level Name3'>
//                   <div id='atrmtr' linker='1' iname='Host Internal' did='061C3AF911E985F893E10080EFA51F69' zoneidx='0' zoneposition='0'></div>
//                   <div id='atrmtr' linker='1' iname='Total Bandwidth (sum)' did='854098C34A8D1F32466393AE9C069CEF' zoneidx='1' zoneposition='0'></div>
//                   <div id='atrmtr' linker='1' iname='Host Internal' did='061C3AF911E985F893E10080EFA51F69' zoneidx='2' zoneposition='0' ></div>
//           </div>
//            <div class='presetoptions' linker='1' alias='Top Domains' datasname='' datasid='81D0CAF14EC3E1A3E65B53AD789B7D43' props='sortxdesc,condensex' subsalias='Level Name4'>
//                   <div id='atrmtr' linker='1' iname='Domains' did='A19F02C14C16A7427D74469F08E39363' zoneidx='0' zoneposition='0'></div>
//                   <div id='atrmtr' linker='1' iname='Total Bandwidth' did='2D77D4564379D6F33E5BF6BC096B1794' zoneidx='1' zoneposition='0'></div>
//                   <div id='atrmtr' linker='1' iname='Domains' did='A19F02C14C16A7427D74469F08E39363' zoneidx='2' zoneposition='0' ></div>
//            </div>
//            <div class='presetoptions' linker='1' alias='Top Users' datasname='' datasid='C65677464B1E3A242182B4A711DD6732' props='sortxdesc,condensex' subsalias='Level Name5'>
//                   <div id='atrmtr' linker='1' iname='User ID' did='63D0B0B011E993192E0C0080EF65FA8D' zoneidx='0' zoneposition='0'></div>
//                   <div id='atrmtr' linker='1' iname='Total Bandwidth (Sum)' did='10F0B0E44D790514F9B038BB1C64F348' zoneidx='1' zoneposition='0'></div>
//                   <div id='atrmtr' linker='1' iname='User ID' did='63D0B0B011E993192E0C0080EF65FA8D' zoneidx='2' zoneposition='0' ></div>
//            </div>
//            </div>
//       </div>
//       <!-- this is a second selector - unconnected to the first selector - just an easy way to place more selectors in the same html -->
//      <div class='SelectorsContainer' id='Toppanels5msgs' affectedtarget='filtergridsg5m' subselector='viewFilterTest3' fakeheadline='dynamicHeadline' mask='0' linker='2' style='display: none;'>
//        <div class='Container_drop_down' linker='2'>
//         <button class='Container_btn' name='Toppanels5msgs' linker='2' onmouseenter="event.stopPropagation(),window.scSelectorsEffect('Toppanels5msgs','2')">Level Name0</button>
//         <div class='Container_drop_list' linker='2'>
//       <!-- js adds items here -->
//     </div>
//       <!--pre list items divided into options and its items ro replace-->
//       <div class='PresetItems' linker='2'  style='display: none;'>
//             <div class='presetoptions' linker='2' alias='Level Name0' datasname='' datasid='084EB1FD43CCD3EB1181DAA13C8F9C42' props='none' subsalias='option 0'>
//                   <div id='atrmtr' linker='2' iname='Level Name' did='8355E63641833B413C4AFBAA4E421A28' zoneidx='0' zoneposition='0'></div>
//             </div>
//             <div class='presetoptions' linker='2' alias='Level Name1' datasname='' datasid='719732734E5CDE82CB40E89F7424F3FF' props='none' subsalias='option 1' parentselctrOp='selectorId,seelctorslinker,option alias,show/hide/all'>
//                   <div id='atrmtr' linker='2' iname='Level Name' did='8355E63641833B413C4AFBAA4E421A28' zoneidx='0' zoneposition='0'></div>
//             </div>
//             <div class='presetoptions' linker='2' alias='Level Name2' datasname='' datasid='1842F33248AF020505DF4D807B452716' props='none' subsalias='option 2'>
//                   <div id='atrmtr' linker='2' iname='Level Name' did='8355E63641833B413C4AFBAA4E421A28' zoneidx='0' zoneposition='0'></div>
//             </div>
//             <div class='presetoptions' linker='2' alias='Level Name3' datasname='' datasid='D8F6E050477AA7508CBD3DAFF11FFBE5' props='none' subsalias='option 3'>
//                   <div id='atrmtr' linker='2' iname='Level Name' did='8355E63641833B413C4AFBAA4E421A28' zoneidx='0' zoneposition='0'></div>
//             </div>
//             <div class='presetoptions' linker='2' alias='Level Name4' datasname='' datasid='81D0CAF14EC3E1A3E65B53AD789B7D43' props='none' subsalias='option 3'>
//                   <div id='atrmtr' linker='2' iname='Level Name' did='8355E63641833B413C4AFBAA4E421A28' zoneidx='0' zoneposition='0'></div>
//             </div>
//             <div class='presetoptions' linker='2' alias='Level Name5' datasname='' datasid='C65677464B1E3A242182B4A711DD6732' props='none' subsalias='option 3'>
//                   <div id='atrmtr' linker='2' iname='Level Name' did='8355E63641833B413C4AFBAA4E421A28' zoneidx='0' zoneposition='0'></div>
//             </div>
//       </div>
//        <!--grid filters can be aligned with the preset above Presetlink==alias only works on grids-->
//       <div class='gridFilters' linked='2' style='display: none;'>
//             <div class='presetgFilters'  linkedalias='Level Name0'>
//                 <div id='gfilteron'>LINE</div>
//             </div>
//             <div class='presetgFilters' linkedalias='Level Name1'>
//                 <div id='gfilteron'>SG</div>
//             </div>
//             <div class='presetgFilters' linkedalias='Level Name2'>
//                 <div id='gfilteron'>SG</div>
//             </div>
//             <div class='presetgFilters' linkedalias='Level Name3'>
//                 <div id='gfilteron'>SG</div>
//             </div>
//             <div class='presetgFilters' linkedalias='Level Name4'>
//                 <div id='gfilteron'>SG</div>
//             </div>
//             <div class='presetgFilters' linkedalias='Level Name5'>
//                 <div id='gfilteron'>SG</div>
//             </div>
//       </div>
//       <!--view filters in additions chaining or as a stand alone - use style='display: none;' if you wish to hide it -->
//         <div class='SelectorsContainer' id='viewFilterTest3' type='viewFilter' linkedto='viewFilterTest3' linked='3' affectedtarget='Top Network Traffic' mask='1' linker='4' subselector='none' fakeheadline='none'> View Filter:
//               <div class='Container_drop_down' linker='4'>
//                 <button class='Container_btn' name='viewFilterTest3' linker='4' onmouseenter="event.stopPropagation(),window.Allot.plugins.scriptsFN.CS_Custom_Selectors.advViewFilters(event,'buildList')">option 0</button>
//               <div class='Container_drop_list' linker='4'>
//               <!-- js adds items here -->
//               </div>
//               <div class='ViewFilters' style='display: none;'>
//                     <!-- General top x for all options. the data is delivered directly from the target visualization-->
//                      <div class='presetFilters'   linkedalias='Level Name0' alias='option 0' idx='0' style='display: none;'>
//                        <div id='condition'  conditionidx="0" itemdid="8355E63641833B413C4AFBAA4E421A28" dsid="018905FE4C0082827852609A608322BC" basedOn='' topx='' operator="In" selectTab="ID">
//                              <div id='filteron' >SG</div>
//                        </div>
//                     </div>
//                     <!-- view filter with mulitple conditions-->
//                     <div class='presetFilters'  linkedalias='Level Name1' idx='1' alias='option 1' style='display: none;'>
//                        <div id='condition' conditionidx="0" itemdid="5F2CE89F4EC7F418D29285AA483150A5" dsid="018905FE4C0082827852609A608322BC"  basedOn='' topx='' operator="In" selectTab="ID">
//                              <div id='filteron'>SG-FAR-1 > CBR8-CHP-1 > TOUDOO</div>
//                        </div>
//                        <div id='condition' conditionidx="1" itemdid="A19F02C14C16A7427D74469F08E39363" dsid="018905FE4C0082827852609A608322BC" basedOn='' topx='' operator="Greater than or equal to" selectTab="ID">
//                              <div id='filteron'>10</div>
//                        </div>
//                     </div>
//                     <div class='presetFilters'  linkedalias='Level Name2' alias='option 2' idx='2' style='display: none;' >
//                        <div id='condition' conditionidx="0" itemdid="8355E63641833B413C4AFBAA4E421A28" dsid="018905FE4C0082827852609A608322BC" basedOn='' topx='' operator="In" selectTab="ID">
//                              <div id='filteron'>VC</div>
//                        </div>
//                     </div>
//                     <div class='presetFilters'   linkedalias='Level Name3' alias='option 3' idx='3' style='display: none;'>
//                        <div id='condition' conditionidx="0" itemdid="A19F02C14C16A7427D74469F08E39363" dsid="018905FE4C0082827852609A608322BC" basedOn='' topx='' operator="Greater than or equal to" selectTab="ID">
//                              <div id='filteron'>5</div> <!-- use : as a separator for 2 options - between for example, 0:5 -->
//                        </div>
//                     </div>
//               </div>
//              </div>
//           </div>
//       <!--dynamic fake headline component-->
//        <!--dynamic fake headline component-->
//       <div class='dynamicHeadline' affectedtarget='htmlH12' linked='2' style='display: none;'>
//       <div class='cssdefs'>text-align: left; color: #444649; font: bold 9pt Arial;line-height: 1.8em; padding: 0 6px; text-align: left;border-bottom: 2px solid #F58829;</div>
//       <div class='htmlHead'  linkedalias='Top Pipe'>
//           <div id='dheadline'>Top Network Traffic | Top Pipe</div>
//       </div>
//       <div class='htmlHead' linkedalias='Top Apps'>
//           <div id='dheadline'>Top Network Traffic | Top Apps</div>
//       </div>
//       <div class='htmlHead' linkedalias='Top Apps Groups'>
//           <div id='dheadline'>Top Network Traffic | Top Apps Groups</div>
//       </div>
//       <div class='htmlHead' linkedalias='Top Host Internal'>
//           <div id='dheadline'>Top Network Traffic | Top Host Internal</div>
//       </div>
//       <div class='htmlHead' linkedalias='Top Users'>
//           <div id='dheadline'>Top Network Traffic | Top Users</div>
//       </div>
// </div>
// </body>