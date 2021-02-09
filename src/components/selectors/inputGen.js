import React, { Component } from 'react';

import * as actionTypes from '../../store/actions'
//import store from '../../store/store'
import { connect } from 'react-redux';

//import { PANELSTACK } from '../../layout/naming';

//import styles from './panelStack/panelStack.module.css';
import styles from './inputGen.module.css';

//store.subscribe(()=>{console.log('updated state:' ,store.getState())})

/* This will define the selector type all the inputs that are collected from this selector

it will be sent to the redux state once submit button is clicked.*/
//const mainInputs = ['text','default','mask','subselector']
//const optionsInput = ['alias','affectedTarget']
class InputGenMain extends Component {


    constructor(props) {
        super(props)
        this.myref = React.createRef();
    }

    cleanInput = (event) => {

        event.target.value = '';
    }
   

    render() {
        //const seltypeInp = this.props.seltype
        const seltypeInp = this.props.stype
        console.log(seltypeInp)
      //  debugger;
        console.log(this.props)
        //const mainInputs = this.props[PANELSTACK].inputTypesMain;
        const mainInputs = this.props[seltypeInp].inputTypesMain;
        /*note input word for in jsx is htmlFor amd the usage of name*/
        let inputs = mainInputs.map((item,idx)=>{
            return (
                <React.Fragment key={idx}>
                    <label htmlFor={item} className={styles.test} ><span className={styles.labelTag}>{item}</span>
                        <input type="text" onChange={this.props.updateParmeters.bind(this,'maindef',null,null,seltypeInp)} name={item}
                                        onDoubleClick={this.cleanInput.bind(this)}
                                        value={this.props[seltypeInp][this.props[seltypeInp].selected].maindef[item]}/>
                    </label>
                </React.Fragment>
            )
        })

        return (
             <React.Fragment>
                  <br/>
                 <div className={styles.inputMain}>
                   {inputs}
                 </div>
             </React.Fragment>
        )
    }
}         

class InputGenOptions extends Component {

    constructor(props) {
        super(props)
        this.myref = React.createRef();
    }

    cleanInput = (event) => {
        event.target.value = '';
    }
 //value={this.props.panelStack[this.props.selected].options[item]}
    render() {
        //const seltypeInp = this.props.seltype
        const seltypeInp = this.props.stype
        //console.log(this.props)
        //debugger;
        //const optionsInput = this.props[PANELSTACK].inputTypesOptions;
        const optionsInput = this.props[seltypeInp].inputTypesOptions;
        // const subOptionsInput = this.props[seltypeInp].inputTypesSubOptions;
        let selected = this.props[seltypeInp].selected
        let selectedObj = this.props[seltypeInp][selected];
        console.log(selectedObj)
      //  debugger;
        if (selectedObj.optionsNumbering.length === 0) {
            //in case all options were removed
            return null;
        }
       
        let optionContainer = selectedObj.optionsNumbering.map((item1,idx1)=>{
            //cant work with idx's - when deleting options, the index of items will not be equal to the item, 
            //if option 0 is deleted, and theres option 1, it will cause an error, so always use the item it self
            let secInputs = optionsInput.map((item2,idx2)=> {
                //---------------------------options input generator------------------------
                return (
                        <React.Fragment  key={(selected+'option'+item2+item1)}>
                            <label htmlFor={item2} className={styles.test}><span className={styles.labelOption}>{item2}</span>
                            <input type="text" name={item2}
                                                onChange={this.props.updateParmeters.bind(this,'options',item1,null,seltypeInp)}  
                                                onDoubleClick={this.cleanInput.bind(this)} 
                            value={this.props[seltypeInp][selected].options[item1][item2]} />
                            </label>
                        </React.Fragment>
                )
            }) 

            //---------------------------Suboptions generator------------------------
            // let subOptionContainer = null;
            //  if (selectedObj.options[item1].subOptions !== undefined) {
            //      //only in case all Suboptions exists
            //         subOptionContainer = selectedObj.options[item1].optionsSubNumbering.map((item3,idx3) => {

            //             let inputs = subOptionsInput.map((item4,idx4) => {
            //                 return  (  
            //                         <React.Fragment key={(selected+'subOption'+item4+item3)} >
            //                             <label  htmlFor={item4} className={styles.test}><span className={styles.labelOption} >{item4}</span>
            //                                <input  type="text" onChange={this.props.updateParmeters.bind(this,'subOption',item1,item3,seltypeInp)} name={item4} 
            //                                         onDoubleClick={this.cleanInput.bind(this)}
            //                                       value={selectedObj.options[item1].subOptions[item3][item4]}/>
            //                             </label>
            //                         </React.Fragment>
            //                 )
            //             }) 

            //              return  (  <React.Fragment  key={selected+'subOptionContainer'+item3+item1}>
            //                             <div className={'seperator'} style={{"fontSize":"2.0vh","textAlign":"left","backgroundColor": "rgb(109, 48, 58)"}}>action {item3}:</div>
            //                             <button className={styles.removeBtn} onClick={this.props.removeSubOption.bind(this,seltypeInp,item1,item3)}>-</button>
            //                             {inputs}
            //                         </React.Fragment>
                                    
            //                     )
                                 
            //      })
            // }

//key={(item4+idx4+idx3+Math.random *100 -1)}
            //-----------------------complete option component---------------------
            return (
                            <div className={styles.optionContainer} key={selected+seltypeInp+'optionContainer'+item1}
                                onMouseEnter={this.props.selectedOption.bind(this,seltypeInp,item1)}
                            >
                                <span className={styles.optionName}>option {item1}:</span> 
                                <button className={styles.removeBtn} onClick={this.props.removeOption.bind(this,item1,seltypeInp)}>-</button>
                                {/* {subOptionsInput !== undefined ?
                                    <button className={styles.removeBtn} onClick={this.props.addSubOption.bind(this,seltypeInp,selected,item1)}>+</button> 
                                    : null} */}
                                <div>
                                     {secInputs}
                                     {/* {subOptionContainer !== null ? <div className={'seperator'} 
                                                                        style={{"fontSize":"2.5vh","textAlign":"left","backgroundColor": "rgb(109, 48, 48)"}}>
                                                                            Sub Option:</div> : null } 
                                     {subOptionContainer} */}
                                </div> 
                                 {/* <div>
                                     {subOptionContainer !== null ? <div className={'seperator'} 
                                                                        style={{"fontSize":"2.5vh","textAlign":"left","backgroundColor": "rgb(109, 48, 48)"}}>
                                                                            Sub Option:</div> : null } 
                                     {subOptionContainer}
                                </div>  */}
                            </div>
            )
        })

        //-----------------------complete component---------------------
        ///random key here breaks the input focus so i removed key={(Math.floor((Math.random() *100000 -1)))}
        return (  
            <React.Fragment > 
                {optionContainer} 
            </React.Fragment>
        )
    }
}

class InputGenSubOptions extends Component {

    cleanInput = (event) => {
        event.target.value = '';
    }
    render() {
        console.log('subbbbbbbbbbbbbb')
    //---------------------------Suboptions generator------------------------
        const seltypeInp = this.props.stype;
        const subOptionsInput = this.props[seltypeInp].inputTypesSubOptions;
        let selected = this.props[seltypeInp].selected;
        let selectedOption = this.props[seltypeInp].selectedOption;
        let selectedObj = this.props[seltypeInp][selected];
        let subOptionContainer = null;
//console.log(selectedObj.options[selectedOption]?.subOptions  !== undefined)
//debugger;
        if (selectedObj.options[selectedOption]?.subOptions !== undefined) {
             //only in case all Suboptions exists
                subOptionContainer = selectedObj.options[selectedOption].optionsSubNumbering.map((item3,idx3) => {

                    let inputs = subOptionsInput.map((item4,idx4) => {
                        return  (  
                                <React.Fragment key={(selected+'subOption'+item4+item3)} >
                                    <label  htmlFor={item4} className={styles.test}><span className={styles.labelOption} >{item4}</span>
                                       <input  type="text" name={item4} 
                                               onChange={this.props.updateParmeters.bind(this,'subOption',selectedOption,item3,seltypeInp)} 
                                               onDoubleClick={this.cleanInput.bind(this)} 
                                              value={selectedObj.options[selectedOption].subOptions[item3][item4]}/>
                                    </label>
                                </React.Fragment>
                        )
                    }) 

                     return  (  <React.Fragment  key={selected+'subOptionContainer'+item3+selectedOption}>
                                     <div className={styles.optionContainer}  name='sagi'>
                                        <div className={styles.seperator}>
                                            Option {selectedOption} - action {item3}
                                            <button className={styles.removeBtn} onClick={this.props.removeSubOption.bind(this,seltypeInp,selectedOption,item3)}>-</button> 
                                        </div>
                                         {inputs}
                                    </div>
                                </React.Fragment>

                            )
             })
        }
        console.log(subOptionContainer)
        return (
            <React.Fragment > 
                    <div className={styles.seperator} key='someKey'>
                        <button className={styles.button} onClick={this.props.addSubOption.bind(this,seltypeInp,selected,selectedOption)}>Sub Option+</button>
                </div>             
                {subOptionContainer} 
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    
    //wanted to create a dynamic not hard coded state based on the selecor that was 
    //havnt found anouther way yet. 11012021
    const typeSelector = window.location.pathname.replace('/indexselectors/','').replace('/','')
    //this above is not needed - getting it from the indexselector directly - this.props.stype
    return {
        // [typeSelector]: state[typeSelector],
        ...state,
        seltype: typeSelector
    }

    /*
    return {
        [PANELSTACK]: state[PANELSTACK],
        selected: state[PANELSTACK].selected
    }
    */
}

const mapDispatchToPorps = dispatch => {
    return {
        updateParmeters: (source,optionIdx,subOptionIdx,seltype,event) => dispatch({type: actionTypes.INPUT_CHANGE, 
                                                               payload: {inputData: event.target, 
                                                                         inputSource: source,
                                                                         optionIdx: optionIdx,
                                                                         subOptionIdx: subOptionIdx,
                                                                         seltype: seltype}}),
        addSubOption: (selectorType,selected,optionIdx) => dispatch({type: actionTypes.ADD_SUBOPTION,
                                                                         payload: {seltype: selectorType, selected: selected,optionIdx: optionIdx}}),
        removeOption: (idx,seltype) => dispatch({type: actionTypes.REMOVE_OPTION, payload: {idx: idx, seltype: seltype}})  ,
        removeSubOption: (seltype,optionIdx,subOptionIdx) => dispatch({type: actionTypes.REMOVE_SUBOPTION, payload: {seltype: seltype 
                                                                                                                    ,optionIdx: optionIdx
                                                                                                                    ,subOptionIdx: subOptionIdx,}})   ,
        selectedOption: (seltype,optionIdx) => dispatch({type: actionTypes.SELECTEDOPTION, payload: {seltype: seltype ,optionIdx: optionIdx}})                                                                                                                                       
    }
}

export default { InputGenMain : connect(mapStateToProps,mapDispatchToPorps) (React.memo(InputGenMain)),
                 InputGenOptions : connect(mapStateToProps,mapDispatchToPorps) (React.memo(InputGenOptions)),
                 InputGenSubOptions: connect(mapStateToProps,mapDispatchToPorps) (React.memo(InputGenSubOptions))
                 };


