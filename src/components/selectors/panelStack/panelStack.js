import React, { Component } from 'react';

//import * as actionTypes from '../../../store/actions';
import store from '../../../store/store'
import { connect } from 'react-redux';

import { PANELSTACK } from '../../../layout/naming';
import styles from './panelStack.module.css';

store.subscribe(()=>{console.log(store.getState())})

/* This will define the selector type all the inputs that are collected from this selector
it will be sent to the redux state once submit button is clicked.*/
const inputsObj = {};
const sType = PANELSTACK;
function inputHandler (event) {
    inputsObj[event.target.id] = event.target.value;
    console.log(inputsObj)
}

class PanelStackMain extends Component {


    constructor(props) {
        super(props)
        this.myref = React.createRef();
    }
    /*
    static inputsObj = {}

    inputHandler = (event) => {
        PanelStackMain.inputsObj[event.target.id] = event.target.value;
        console.log(PanelStackMain.inputsObj)
    }
    */
    render() {
        console.log(this.props.sId)
      return (
          <React.Fragment>
              <br/>
              text <input type="text" id='text' onChange={inputHandler.bind(this)}></input> 
              default Name <input type="text" id='default' onChange={inputHandler.bind(this)}></input>
              Mask <input type="text" id='Mask' onChange={inputHandler.bind(this)}></input>
              Subselector <input type="text" id='subselector' onChange={inputHandler.bind(this)}></input>   
          </React.Fragment>   
      )
    }
}         


class PanelStackOptions extends Component {

    constructor(props) {
        super(props)
        this.myref = React.createRef();
    }
    
    //using the static from the PanelStackMain component :)
    //static inputsObj = {}
    /*
    inputHandler = (event) => {
        PanelStackMain.inputsObj[event.target.id] = event.target.value;
        console.log(PanelStackMain.inputsObj)
    }
    */
    render() {
        console.log(PanelStackOptions.aa)
        //let pStack = this.props.panelStack;  
        return (  
                <div key='123' className={styles.optionContainer}>option: 
                      <section style={{'display':'block'}}>
                          alias<input type="text" id='alias' placeholder='aa' onChange={inputHandler.bind(this)}/>
                          affected Target Name<input id='affectedTarget' type="text" placeholder='bb'onChange={inputHandler.bind(this)}/>
                       </section>
                </div> )
    }
}



const mapStateToProps = state => {

    return {
        panelStack: state.panelStack
    }
}
/*
const mapDispatchToPorps = dispatch => {
    return {
        updateParmeters: (event) => dispatch({type: actionTypes.INPUT_CHANGE, payload: event.target})
    }
}
*/
export default { PanelStackMain : connect(mapStateToProps,null) (React.memo(PanelStackMain)),
                 PanelStackOptions : connect(mapStateToProps,null) (React.memo(PanelStackOptions))
                 };
//send the iput info to the indexselector so submit can update the redux state.
export {inputsObj, sType};
