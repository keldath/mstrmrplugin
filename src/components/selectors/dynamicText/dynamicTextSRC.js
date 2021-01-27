
 const dynamicTextSRC = (props) => {

    const options = props.optionsNumbering.map((item,idx)=>{

    let optionData = props.options[item];
    return (
        `<div class='htmlHead' alias='${optionData.alias}' subsalias='${optionData.subsalias}'>${optionData.text}</div>`
      ) 
    })

    const main = props.maindef;
  
    const selectorFn = (event) => {return window.Allot.plugins.scriptsFN.CS_Custom_Selectors.dynamicText(event,'buildList')};

    return (
        
     `<div class='SelectorsContainer' id='${'dynamicHeadline'.concat(main.id)}' type='text' affectedtarget='${main.affectedtarget}' mask='${main.mask}' subselector='${main.mask}'>${main.default}
           <div class='Container_drop_down'>
             <button class='Container_btn' onmouseenter="event.stopPropagation(),${selectorFn}">${main.text}</button>
           <div class='Container_drop_list'>
           <!-- js adds items here -->
           <!--pre list items divided into options and its items ro replace-->
           </div>
           <div style='display: none;'>
               <!--make sure the cssdefs is the first-->
               <div class='cssdefs'>text-align: left; color: #444649; font: bold 9pt Arial;line-height: 1.8em; padding: 0 6px; text-align: left;border-bottom: 2px solid #F58829;</div>
               <!-- the headline options are generated here -->
               ${options}
          </div>
      </div>
      
      
      <!---this can be placed in a text box - the selector will change it according to selections

      <div class='htmlH12' style="text-align: left; color: #444649; font: bold 9pt Arial;
                         line-height: 1.8em; padding: 0 6px; text-align: left;
                         border-bottom: 2px solid #F58829;">Put Text Here</div>

      --->
      
      
      `
      
    )
  }
  export default dynamicTextSRC;


//    this selector allows changing of a text box options via frop down options + a desried css.
//    <div class='SelectorsContainer' id='dynamicHeadline' type='text' affectedtarget='htmlH12' mask='1' subselector=''>
//        <div class='Container_drop_down'>
//          <button class='Container_btn' onmouseenter="event.stopPropagation(),window.Allot.plugins.scriptsFN.CS_Custom_Selectors.dynamicText(event,'buildList')">Dynamic Text</button>
//        <div class='Container_drop_list'>
//        <!-- js adds items here -->
//        <!--pre list items divided into options and its items ro replace-->
//        </div>
//        <div style='display: none;'>
//            <!--make sure the cssdefs is the first-->
//            <div class='cssdefs'>text-align: left; color: #444649; font: bold 9pt Arial;line-height: 1.8em; padding: 0 6px; text-align: left;border-bottom: 2px solid #F58829;</div>
//            <div class='htmlHead' alias='Top Pipe' subsalias=''>Top Network Traffic | Top Pipe</div>
//            <div class='htmlHead' alias='Top Apps' subsalias=''>Top Network Traffic | Top Apps </div>
//            <div class='htmlHead' alias='Top Apps Groups' subsalias=''>Top Network Traffic | Top Apps Groups</div>
//            <div class='htmlHead' alias='Top Host Internal' subsalias=''>Top Network Traffic | Top Host Internal</div>
//            <div class='htmlHead' alias='Top Users' subsalias=''>Top Network Traffic | Top Users</div>
//       </div>
//    </div>
//  <!--the default text - place in an HTMLbOX-->
//  <div class='htmlH12' style="text-align: left; color: #444649; font: bold 9pt Arial;
//                   line-height: 1.8em; padding: 0 6px; text-align: left;
//                   border-bottom: 2px solid #F58829;">Top Network Traffic | Top Pipe</div>

//  Parameters to update:
//  id = unique id
//  affectedtarget = name of the target html
//  subselector = for chaining selectors
//  alias - name of the option, not that important
//  text value = the text to use
//  subalias - if using selector chaining - chain to parent option.
//  cssdefs - set the css for the text
