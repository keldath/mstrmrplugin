import React, { Component } from 'react';

import * as actionTypes from '../../../store/actions';
import store from '../../../store/store'
import { connect } from 'react-redux';

import { PANELSTACK } from '../../../layout/naming';
import styles from './panelStack.module-deprecated.css';

store.subscribe(()=>{console.log('updated state:' ,store.getState())})

/* This will define the selector type all the inputs that are collected from this selector

it will be sent to the redux state once submit button is clicked.*/
const mainInputs = ['text','default','mask','subselector']
const optionsInput = ['alias','affectedTarget']
class PanelStackMain extends Component {


    constructor(props) {
        super(props)
        this.myref = React.createRef();
    }
    
    render() {

        /*note input word for in jsx is htmlFor amd the usage of name*/
        let inputs = mainInputs.map((item,idx)=>{
            return (
                <React.Fragment key={idx}>
                    <label htmlFor={item} className={styles.test} ><span className={styles.labelTag}>{item}</span>
                        <input type="text" onChange={this.props.updateParmeters.bind(this,'maindef',null)} name={item}
                                         value={this.props[PANELSTACK][this.props.selected].maindef[item]}/>
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

class PanelStackOptions extends Component {

    constructor(props) {
        super(props)
        this.myref = React.createRef();
    }
 //value={this.props.panelStack[this.props.selected].options[item]}
    render() {
        let selectedObj = this.props[PANELSTACK][this.props.selected];
        if (selectedObj.optionsNumbering.length === 0) {
            //in case all options were removed
            return null;
        }
        let optionContainer = selectedObj.optionsNumbering.map((item1,idx1)=>{
            //cant work with idx's - when deleting options, the index of items will not be equal to the item, 
            //if option 0 is deleted, and theres option 1, it will cause an error, so always use the item it self
             let secInputs = optionsInput.map((item2,idx2)=> {
                return (
                   <React.Fragment key={(selectedObj+'option'+item2)}>
                     
                        <label htmlFor={item2} className={styles.test}><span className={styles.labelOption}>{item2}</span>
                            <input type="text" onChange={this.props.updateParmeters.bind(this,'options',item1)} name={item2} 
                                   value={this.props[PANELSTACK][this.props.selected].options[item1][item2]}/>
                        </label>
                    </React.Fragment>
                )
            })
            return (
                <React.Fragment key={(this.props.selected+item1)}>
                            <div className={styles.optionContainer}>
                                <span className={styles.optionName}>option {item1}:</span> 
                                <button className={styles.removeBtn} onClick={this.props.removeOption.bind(this,item1)}>-</button>
                                <section>
                                     {secInputs}
                                </section> 
                            </div>
                </React.Fragment>
            )
        })

        return (  
            <React.Fragment key={(Math.random *100 -1)}> 
                {optionContainer} 
            </React.Fragment>
              
                )
    }
}



const mapStateToProps = state => {

    return {
        [PANELSTACK]: state[PANELSTACK],
        selected: state[PANELSTACK].selected
    }
}

const mapDispatchToPorps = dispatch => {
    return {
        updateParmeters: (source,optionIdx,event) => dispatch({type: actionTypes.INPUT_CHANGE, 
                                                               payload: {inputData: event.target, 
                                                                         inputSource: source,
                                                                         optionIdx: optionIdx}}),
        removeOption: (idx) => dispatch({type: actionTypes.REMOVE_OPTION, payload: idx})                                                           
    }
}

export default { PanelStackMain : connect(mapStateToProps,mapDispatchToPorps) (React.memo(PanelStackMain)),
                 PanelStackOptions : connect(mapStateToProps,mapDispatchToPorps) (React.memo(PanelStackOptions))
                 };


