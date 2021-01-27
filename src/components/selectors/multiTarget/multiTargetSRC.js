
 const multiTargetSRC = (props) => {

    const options = props.optionsNumbering.map((item,idx)=>{

    let optionData = props.options[item];
    return (
        `<div class='htmlHead' alias='${optionData.alias}' subsalias='${optionData.subsalias}' id="Hierarchy" headlines=>${optionData.headlines}>${optionData.text}</div>`
      ) 
    })

    const main = props.maindef;
  
    const selectorFn = (event) => {return window.Allot.plugins.scriptsFN.CS_Custom_Selectors.multiTargetSelector(event,'buildList')};

    return (
        
     `<div class='SelectorsContainer' id='multiTargetSelector' affectedtarget='${main.affectedtarget}' type='text'  mask='${main.mask}' subselector='${main.subselector}'>${main.default}
        <div class='Container_drop_down'>
          <button class='Container_btn' onmouseenter="event.stopPropagation(),window.Allot.plugins.scriptsFN.CS_Custom_Selectors.multiTargetSelector(event,'buildList')">${main.text}</button>
        <div class='Container_drop_list'>
        <!-- js adds items here -->
        <!--pre list items divided into options and its items ro replace-->
        </div>
          <div style='display: none;'>
          ${options}
          </div>
      </div>
      `
      
    )
  }
  export default multiTargetSRC;


   /*

          this selector allows changing of a text box options via frop down options + a desried css.
            <div class='SelectorsContainer' id='multiTargetSelector' affectedtarget='selectorIDboxa2p1,selectorIDboxa3p1' type='text'  mask='1' subselector=''>
                <div class='Container_drop_down'>
                  <button class='Container_btn' onmouseenter="event.stopPropagation(),window.Allot.plugins.scriptsFN.CS_Custom_Selectors.multiTargetSelector(event,'buildList')">None</button>
                <div class='Container_drop_list'>
                <!-- js adds items here -->
                <!--pre list items divided into options and its items ro replace-->
                </div>
                <div style='display: none;'>
                    <!--make sure the cssdefs is the first-->
                    <div class='htmlHead' alias='None' subsalias='' id="Hierarchy" headlines='Current,Previous'>None</div>
                    <div class='htmlHead' alias='RTT' subsalias='' id="Hierarchy" headlines='Current_RTT,Previous_RTT'>RTT</div>
                    <div class='htmlHead' alias='% Dropped_Packets' id="Hierarchy" headlines='Current_%_Dropped_Packets,Previous_%_Dropped_Packets'>% Dropped_Packets</div>
               </div>
            </div>
         Parameters to update:
          id = unique id
          affectedtarget = name of the target html
          subselector = for chaining selectors
          alias - name of the option, not that important
          text value = the text to use
          subalias - if using selector chaining - chain to parent option.

          */