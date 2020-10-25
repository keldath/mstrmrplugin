import React, { Component } from 'react';

import * as actionTypes from '../../store/actions';
//import store from '../../store/store'
import { connect } from 'react-redux';

import PanelStack, {inputsObj, sType} from './panelStack/panelStack';
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
                selectorMain = <PanelStack.PanelStackMain sId={this.props.selected}/>;
                selectorOptions = <PanelStack.PanelStackOptions sId={this.props.selected}/>;
                selectorButton = Object.keys(this.props.panelStack);
                selectorType = sType;
                break;
            default:
                break; 
                  
        }    
        console.log(selectorType)
        console.log(selectorButton)

        let tabs = selectorButton.map((item,idx)=> { 
            if (item !== 'new')
            {
                return (
                    <button key={idx} className={styles.button} onClick={this.props.selectedS.bind(this,this.props.selected)}>{item}</button>
                )
            }
            return [];
        })
        console.log(tabs.length)
        if (tabs.length === 1) {
            //if there is only the temp new selector - add a new true selector.
            tabs = <button  className={styles.button} onClick={this.props.selectedS.bind(this,this.props.rSrc.concat(this.props.selectorsNumbering[0]))}>
                                {this.props.rSrc.concat(this.props.selectorsNumbering[0])}</button>;
        }

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
                            <button className={styles.button}
                                onClick={this.props.AddOption}
                                onContextMenu={this.props.removeAll}>
                                    Option +-</button>
                            <button className={styles.submit} onClick={this.props.submit.bind(this,this.props.selected)}>Submit</button>
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
        panelStack: state.panelStack,
        selected: state.selected,
        selectorsNumbering: state.selectorsNumbering
    }
}

const mapDispatchToPorps = dispatch => {
    return {
        selectedS: (selected) => dispatch ({type: actionTypes.SELECTED ,payload: selected}),
        addSelector: () => dispatch({type: actionTypes.ADD_SELECTOR ,payload: selectorType}),
        AddOption: () => dispatch({type: actionTypes.ADD_OPTION}),
        removeAll: (event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              return ( dispatch({type: actionTypes.REMOVE_OPTION}));},
        submit: (selected) => dispatch({type: actionTypes.SUBMIT, payload : { selected: selected,
                                                                                               data : {...inputsObj} , 
                                                                                               selectorType: selectorType}})
    }
}

export default connect(mapStateToProps,mapDispatchToPorps) (React.memo(Indexselectors));

/* {options}*/