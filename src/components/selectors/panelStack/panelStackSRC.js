
import React from 'react'

export default function panelStackSRC(props) {

    const options = props.map(()=>{})

    return (

        <div class='SelectorsContainer' id='panelStackSelector_p_all' type='panelStack' mask='1' subselector='panelStackSelector_s_all' linker='0'>Metric Type: 
            <div class='Container_drop_down' linker='0'>
                <button class='Container_btn' name='panelStackSelector_p_all' linker='0' 
                        onmouseenter="event.stopPropagation(),window.Allot.plugins.scriptsFN.CS_Custom_Selectors.panelStack(event,'buildList')">Requests</button>
                    <div class='Container_drop_list' linker='0'>
                    {/*<!-- js adds items here -->*/}
                    {/*<!--pre list items divided into options and its items ro replace-->*/}
                    </div>
                    <div class='psoptions' style='display: none;'>
                        {options}
                        <div class='presetoptions' idx='0' alias='Requests' subidx='0' affectedTarget='Inspected Requests - Last 12 Hours'></div>
                        <div class='presetoptions' idx='1' alias='Requests Rate' subidx='1' affectedTarget='Inspected Requests Rate - Last 12 Hours'></div>
                    </div>
            </div>
        </div>
    )
}

{/*
<!--------------------------------------------------------------------------------------------------------------------------------------------------------------->    
<!--primary selector--------------------------------------------------------------------------------------------------------------------------------------------->
<!--------------------------------------------------------------------------------------------------------------------------------------------------------------->
<div class='SelectorsContainer' id='panelStackSelector_p_all' type='panelStack' mask='1' subselector='panelStackSelector_s_all' linker='0'>Metric Type: 
     <div class='Container_drop_down' linker='0'>
       <button class='Container_btn' name='panelStackSelector_p_all' linker='0' onmouseenter="event.stopPropagation(),window.Allot.plugins.scriptsFN.CS_Custom_Selectors.panelStack(event,'buildList')">Requests</button>
     <div class='Container_drop_list' linker='0'>
     <!-- js adds items here -->
     <!--pre list items divided into options and its items ro replace-->
     </div>
     <div class='psoptions' style='display: none;'>
           <div class='presetoptions' idx='0' alias='Requests' subidx='0' affectedTarget='Inspected Requests - Last 12 Hours'></div>
           <div class='presetoptions' idx='1' alias='Requests Rate' subidx='1' affectedTarget='Inspected Requests Rate - Last 12 Hours'></div>
           </div>
    </div>
</div>
<!--------------------------------------------------------------------------------------------------------------------------------------------------------------->
<!--secondary selector------------------------------------------------------------------------------------------------------------------------------------------->
<!--------------------------------------------------------------------------------------------------------------------------------------------------------------->
<div class='SelectorsContainer' id='panelStackSelector_s_all' type='panelStack' mask='1' subselector='' linker='1' style='display: none;'>Metric Type: 
     <div class='Container_drop_down' linker='1'>
       <button class='Container_btn' name='panelStackSelector_s_all' linker='0' onmouseenter="event.stopPropagation(),window.Allot.plugins.scriptsFN.CS_Custom_Selectors.panelStack(event,'buildList')">3</button>
     <div class='Container_drop_list' linker='1'>
     <!-- js adds items here -->
     <!--pre list items divided into options and its items ro replace-->
     </div>
     <div class='psoptions' style='display: none;'>
           <div class='presetoptions' idx='0' alias='3' subidx='' affectedTarget='Blocked Requests - Last 12 Hours'></div>
           <div class='presetoptions' idx='1' alias='4' subidx='' affectedTarget='Blocked Requests Rate - Last 12 Hours'></div>
           </div>
    </div>
</div>
*/}