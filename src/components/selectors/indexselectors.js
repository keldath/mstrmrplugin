import React, { Component } from 'react';

import * as actionTypes from '../../store/actions';
//import store from '../../store/store'
import { connect } from 'react-redux';

import PanelStack, {sType} from './panelStack/panelStack';
import * as naming from '../../layout/naming';
import styles from './indexselectors.module.css';

//store.subscribe(()=>{console.log(store.getState())})

let selectorType = '';//for future usability of other selectors

class Indexselectors extends Component {
/*
    constructor(props) {
        super(props)
        //this.myref = React.createRef();
    }
  */  
    render() {
        let selectorMain = '';
        let selectorOptions = '';
        let selectorButton = '';
        //load the right selector inputs-sent from the router
        switch (this.props.rSrc) {
            case naming.PANELSTACK/*'panelStack'*/:
                selectorMain = <PanelStack.PanelStackMain sId={this.props.panelStack.selected}/>;
                selectorOptions = <PanelStack.PanelStackOptions sId={this.props.panelStack.selected}/>;
                selectorButton = Object.keys(this.props.panelStack);
                selectorType = sType;
                break;
            default:
                break; 
                  
        }    

        let tabs = selectorButton.map((item,idx)=> { 
            if (['selected','selectorsNumbering','optionsNumbering'].indexOf(item) !== -1) {
                //dont make buttons out of these
                return null
            }
            return (
                    <button key={idx} className={styles.button} onClick={this.props.setSetected.bind(this,item)}>{item}</button>
                )
        });
       

        return (
            <div style={{display:'block'}}>
                <br/><br/><br/>
                im a {selectorType} selector
                <br/>
                <br/>
                <div className={styles.mainContainer}> 
                <div className={styles.selectorNavBar}>
                    <div className={styles.selectorNavBarTab}>
                        {tabs}
                        <button className={styles.button} onClick={this.props.addSelector}>+</button>
                    </div>
                </div>  
                <div className={styles.frstContainer}>
                    {selectorMain}
                </div>  
                    <div className={styles.dualcontainer}>
                        <div className={styles.secContainer} ref={this.myref}>
                        <nav className={styles.optionNavBar}>
                            <button className={styles.button} onClick={this.props.addOption.bind(this,selectorType,this.props.panelStack.selected)}>Option +</button>
                            <button className={styles.submit} onClick={this.props.submit.bind(this,this.props.panelStack.selected)}>Submit</button>
                        </nav>   
                        {selectorOptions}
                        <br/>
                        </div>
                        <div className={styles.thrdContainer}></div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        panelStack: state.panelStack
    }
}

const mapDispatchToPorps = dispatch => {
    return {
        setSetected: (selected) => dispatch ({type: actionTypes.SELECTED ,payload: selected}),
        addSelector: () => dispatch({type: actionTypes.ADD_SELECTOR ,payload: selectorType}),
        addOption: (selectorType,selected) => dispatch({type: actionTypes.ADD_OPTION, payload: {selectorType: selectorType, selected: selected}}),
        removeAll: (event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              return ( dispatch({type: actionTypes.REMOVE_OPTION}));},
        submit: (selected) => dispatch({type: actionTypes.SUBMIT, payload : { selected: selected,
                                                                                               selectorType: selectorType}})
    }
}

export default connect(mapStateToProps,mapDispatchToPorps) (React.memo(Indexselectors));

/* {options}*/