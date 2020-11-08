
import React, { Component } from 'react';

import * as actionTypes from '../../store/actions';
//import store from '../../store/store'
import { connect } from 'react-redux';

import PanelStack from './panelStack/panelStack';
import * as naming from '../../layout/naming';
import styles from './indexselectors.module.css';

//store.subscribe(()=>{console.log(store.getState())})

let selectorType ='';//global placeHolder;

class Indexselectors extends Component {
/*
    constructor(props) {
        super(props)
        //this.myref = React.createRef();
    }
  */  
    
    render() {
       // console.log(this.props.history.replace('/','ynet'))
       //console.log( this.props.history)
       //window.history.pushState('page2', 'Title', '/page2.php');
        window.history.pushState({}, null, `/${this.props.match.params.sType}`);//hide the indexselector component name without rendering
        let selectorMain = '';
        let selectorOptions = '';
        let selectorButton = '';
        selectorType = this.props.match.params.sType //this.props.rSrc;//2 parameter pass options
        //load the right selector inputs-sent from the router
        switch (selectorType) {
            case naming.PANELSTACK/*'panelStack'*/:
                selectorMain = <PanelStack.PanelStackMain sId={this.props[selectorType].selected}/>;
                selectorOptions = <PanelStack.PanelStackOptions sId={this.props[selectorType].selected}/>;
                selectorButton = Object.keys(this.props[selectorType]);
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
                    <button key={idx} className={styles.button} onClick={this.props.setSetected.bind(this,item)} onContextMenu={this.props.removeSelector}>{item}</button>
                )
        });
       
        console.log(this.props[selectorType])
        return (
            <div style={{display:'block'}}>
                <br/><br/><br/>
                im a {selectorType} selector
                <br/>
                <br/>
                <div className={styles.mainContainer}> 
                <div className={styles.selectorNavBar}>
                    <div className={styles.selectorNavBarTab}>
                        <button className={styles.button} onClick={this.props.addSelector}>+</button>
                        {tabs}
                    </div>
                </div>  
                <div className={styles.frstContainer}>
                    {selectorMain}
                </div>  
                    <div className={styles.dualcontainer}>
                        <div className={styles.secContainer} ref={this.myref}>
                        <nav className={styles.optionNavBar}>
                            <button className={styles.button} onClick={this.props.addOption.bind(this,selectorType,this.props[selectorType].selected)}>Option +</button>
                            <button className={styles.submit} onClick={this.props.submit.bind(this,this.props[selectorType].selected)}>Submit</button>
                        </nav>   
                        {selectorOptions}
                        <br/>
                        </div>
                        <div className={styles.thrdContainer}>
                            <br/>
                            <span style={{display:'block', fontSize: '14px',textAlign: 'center'}} >Selector's HTML Template</span>
                            <br/>
                            {this.props[selectorType][this.props[selectorType].selected].html}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        [naming.PANELSTACK]: state[naming.PANELSTACK]
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
        removeSelector: (event) => {  event.preventDefault();
                                      event.stopPropagation();
                                      console.log('aa')
                                      return dispatch ({type: actionTypes.REMOVE_SELECTOR})},
        submit: (selected) => dispatch({type: actionTypes.SUBMIT, payload : { selected: selected,
                                                                                               selectorType: selectorType}})
    }
}

export default connect(mapStateToProps,mapDispatchToPorps) (React.memo(Indexselectors));

/* {options}*/