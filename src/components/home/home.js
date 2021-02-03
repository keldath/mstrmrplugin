import React, { Component } from 'react'

import links from './links';
import styles from './home.module.css';

import {SELECTORSTATE} from '../../store/stateTemplate';
//import store from '../../store/store';

//store.subscribe(()=>{console.log(store.getState())})

export class home extends Component {

    state = {
        infoBoxStatus: false,
        target: '',
        desc: ''
    }

    componentDidMount () {
        console.log('mounted')
    }

    infoBox = (event) => {

        console.log(event.type)
   
        let el = event.target.innerText
        
        if (event.type === "mouseout") {
            this.setState({infoBoxStatus: false,
                           target: '',
                           desc: ''
            })
            return
        }
        
       // debugger;
        if (el === this.state.target) {
             return
        }
        
        this.setState({target: el,
                infoBoxStatus : true,
                desc: SELECTORSTATE[el]?.description})
    }
    
    render() {
        window.history.pushState({}, null, `/Home`);//add a Home Url Name
        let ibox = null;

        if (this.state.infoBoxStatus) {
            ibox = <div className={styles.infoBox}>
                    info box for selectors 
                    {this.state.target}
                    {this.state.desc}
                   </div>
        }

        return (
            <div>
                <br/>
                <h1>Welcome to MicroStrategy Custom Plugin !</h1>
                <br/>
                <p>choose the selector you would like to create</p>
                <div className={styles.wrapper}>
                    <div className={styles.linksBox}>
                      {links('',this.infoBox.bind(this))}
                    </div>
                </div>
                <br/>
                <br/>
                {ibox}
            </div>
        )
    }
}

export default home;

