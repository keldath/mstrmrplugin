
import React, { Component } from 'react';

import * as actionTypes from '../../store/actions';
//import store from '../../store/store'
import { connect } from 'react-redux';

//import PanelStack from './panelStack/panelStack-deprecated';
import InputGen from './inputGen';
//import * as naming from '../../layout/naming';//not needed here for now obsolete to maintain dynamic.
import styles from './indexselectors.module.css';

//store.subscribe(()=>{console.log(store.getState())})

let selectorType ='';//window.location.pathname.split('/')[1];//global placeHolder;
class Indexselectors extends Component {
/*
    constructor(props) {
        super(props)
        //this.myref = React.createRef();
    }
  */ 
    updatePatch = (routePath,selectorType_,dispatch) => {
        if (routePath !== selectorType_) {
            dispatch(selectorType) 
        }
        return;
    }

    render() {
        /* in order to leep the selector type dynamic, i used the window.location to grab it,
            before - this was defined here,
            and in the maptostate, i used explicit naming.PANELSTACK var.
            so for now, these 2 are obsolete.
            note that both vars are the same below.
            selectorType = this.props.match.params.sType ;
            this.props.rSrc;
        */
        selectorType = this.props.match.params.sType ;
        this.updatePatch(this.props.state.routePath,selectorType,this.props.routePath)
        console.log(selectorType)
        window.history.pushState({}, null, `/${selectorType}`);//hide the indexselector component name without rendering
        let selectorMain =  <InputGen.InputGenMain />;
        let selectorOptions = <InputGen.InputGenOptions/>;
        console.log(this.props)
        let selectorButton = Object.keys(this.props.state[selectorType]);
        
        let tabs = selectorButton.map((item,idx)=> { 
            if (['selected','selectorsNumbering','optionsNumbering','inputTypesOptionsDesc','inputTypesMain','inputTypesOptions','srcFn','optionsSubNumbering','inputTypesSubOptions'].indexOf(item) !== -1) {
                //dont make buttons out of these
                return null
            }
            return (
                    <button key={idx} className={styles.button} onClick={this.props.setSetected.bind(this,item,selectorType)} onContextMenu={this.props.removeSelector.bind(this,selectorType)} title={'Right click to remove'}>{item}</button>
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
                        <button className={styles.button} onClick={this.props.addSelector.bind(this,selectorType)} title={'--Click to add a Selector. \n--Right click ON a Selector to remove it.'}>+</button>
                        {tabs}
                    </div>
                </div>  
                <div className={styles.frstContainer}>
                    {selectorMain}
                </div>  
                    <div className={styles.dualcontainer}>
                         <div className={styles.secContainer}> {/* ref={this.myref} */}
                        <nav className={styles.optionNavBar}>
                            <button className={styles.button} onClick={this.props.addOption.bind(this,selectorType,this.props.state[selectorType].selected)}>Option +</button>
                            <button className={styles.submit} onClick={this.props.submit.bind(this,this.props.state[selectorType].selected,selectorType)}>Submit</button>
                        </nav>   
                        {selectorOptions}
                        <br/>
                        </div>
                        <div className={styles.thrdContainer}>
                            <br/>
                            <span style={{display:'block', fontSize: '14px',textAlign: 'center'}} >Selector's HTML Template</span>
                            <br/>
                            {this.props.state[selectorType][this.props.state[selectorType].selected].html}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
    
const mapStateToProps = state => {
    /***section obsolete - the stype is taken from the match - see the class above. 
        also due to multiple selectors - i get the whole state - this can be more efficiant with Object.keys...
     */
    //wanted to create a dynamic not hard coded state based on the selecor that was 
    //havnt found anouther way yet. 11012021
    //const pathSelector = window.location.pathname.replace('/indexselectors/','').replace('/','')
    //console.log(pathSelector)
    // return {
    //     //[selectorType]: state[selectorType]
    //     [pathSelector]: state[pathSelector] //using window to catch the selector type
    // }
    return {state:state}
}
/*
//this is a more hard coded approach from the above.
const mapStateToProps = state => {
    return {
        //[selectorType]: state[selectorType]
        [naming.PANELSTACK]: state[naming.PANELSTACK], //using window to catch the selector type
        [naming.SHEETPANEL]: state[naming.SHEETPANEL]
    }
}
*/
const mapDispatchToPorps = dispatch => {
    return {
        setSetected: (selected,selectorType) => dispatch ({type: actionTypes.SELECTED ,payload: {selected: selected,seltype: selectorType}}),
        addSelector: (selectorType) => dispatch({type: actionTypes.ADD_SELECTOR ,payload: {seltype: selectorType}}),
        addOption: (selectorType,selected) => dispatch({type: actionTypes.ADD_OPTION, payload: {seltype: selectorType, selected: selected}}),
        removeAll: (event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              return ( dispatch({type: actionTypes.REMOVE_OPTION}));},
        removeSelector: (selectorType,event) => {  event.preventDefault();
                                      event.stopPropagation();
                                      console.log('aa')
                                      return dispatch ({type: actionTypes.REMOVE_SELECTOR,payload :{seltype : selectorType}})},
        submit: (selected,selectorType) => dispatch({type: actionTypes.SUBMIT, payload : { selected: selected,seltype: selectorType}}),
        routePath: (name) => dispatch({type: actionTypes.ROUTEPATH, payload : name})
    }
}

export default connect(mapStateToProps,mapDispatchToPorps) (React.memo(Indexselectors));

/* {options}*/