
 const chartSetUpSRC = (props) => {

    const options = props.optionsNumbering.map((item,idx)=>{

    let optionData = props.options[item];
    return (
        `<div class='presetoptions' alias='${optionData.alias}' subsalias='${optionData.subsalias}' props=${optionData.props}>${optionData.text}</div>`
      ) 
    })

    const main = props.maindef;
  
    const selectorFn = (event) => {return window.Allot.plugins.scriptsFN.CS_Custom_Selectors.chartSetUp(event,'buildList')};

    return (
        
     `<div class='SelectorsContainer' id='${'charterSelector'.concat(main.id)}' type='preset' affectedtarget='${main.affectedtarget}' mask='${main.mask}' subselector='${main.mask}'>${main.default}
           <div class='Container_drop_down'>
             <button class='Container_btn' name=${main.name} linker=${main.linker} onmouseenter="event.stopPropagation(),${selectorFn}">${main.default}</button>
           <div class='Container_drop_list' linker=${main.linker}>
           <!-- js adds items here -->
           <!--pre list items divided into options and its items ro replace-->
           </div>
           <div style='display: none;'>
               ${options}
          </div>
        </div>
    </div> `
      
    )
  }
  export default chartSetUpSRC;


/*
    this is a standalone selector that will sort a chart according to the specs
      <div class='SelectorsContainer' id='charterSelector' type='preset' affectedtarget='Top Network Traffic' mask='1' subselector='' >
        <div class='Container_drop_down' linker='2'>
          <button class='Container_btn' name='charterSelector' linker='2' onmouseenter="event.stopPropagation(),window.Allot.plugins.scriptsFN.CS_Custom_Selectors.chartSetUp(event,'buildList')">Chart Changes</button>
        <div class='Container_drop_list' linker='2'>
        <!-- js adds items here -->
        <!--pre list items divided into options and its items ro replace-->
        </div>
        <div class='charter' style='display: none;'>
              <div class='presetoptions'  alias='option_1' subsalias='' props='sortxdesc,condensex'></div>
              <div class='presetoptions'  alias='option_2' subsalias='' props='sortxdesc,condensex'></div>
              <div class='presetoptions'  alias='option_3' subsalias='' props='sortxdesc,condensex'></div>
          </div>
       </div>
    </div>

    affectedtarget - target box to sort
    subselector - if you want this selector to work on another selector - chaining - function not ready yet.
    id - unique id for the selector
    subsalias - what is the target option in the chained slector
    props - the actions to perform - use comma seperator for 'sortxasc'/'sortxdesc'/'sortyasc'/'sortydesc' || 'condensey'/'condensex'
    alias - option name on the drop down
    use  style='display: none;' to hide a selector if you want 0 place in the SelectorsContainer main div , as an attribute.
  */