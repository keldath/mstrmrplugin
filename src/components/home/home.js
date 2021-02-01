import React, { Component } from 'react'
import { connect } from 'react-redux';

import links from './links';
import styles from './home.module.css';

import * as SELECTORSTATE from '../../store/stateTemplate';
//import store from '../../store/store';

//store.subscribe(()=>{console.log(store.getState())})

export class home extends Component {

    state = {
        infoBoxStatus: false,
        target: ''
    }

    componentDidMount () {
        console.log('mounted')
    }

    infoBox = (event) => {

        var posX = event.clientX;
        var posY = event.clientY;
        console.log(posX,posY)
        
        let  el = document.elementFromPoint(posX, posY);
        console.log(el)
         if (this.state.target === el.text) {
             return
         }
        if(!el.href) {
            this.setState({infoBoxStatus : false })
            return
        }
        console.log(el.text)
         this.setState({target: el.text,
                infoBoxStatus : true})
    }

    
    render() {
        window.history.pushState({}, null, `/Home`);//add a Home Url Name
        let ibox = null;

        if (this.state.infoBoxStatus) {
            ibox = <div className={styles.infoBox}>
                    info box for selectors 
                    {this.state.target}
                   </div>
        }

        return (
            <div>
                <br/>
                <h1>Welcome to MicroStrategy Custom Plugin !</h1>
                <br/>
                <p>choose the selector you would like to create</p>
                <div className={styles.wrapper}>
                    <div className={styles.linksBox} onMouseMove={this.infoBox.bind(this)} onMouseLeave={this.infoBox.bind(this)}>
                      {links()}
                    </div>
                </div>
                <br/>
                <br/>
                {ibox}
            </div>
        )
    }
}

const mapStateToProps = state => {

    return {
        counter: state.counter
    }
}

const mapDispatchToPorps = dispatch => {
    return {
      
    }
}

export default connect(mapStateToProps,mapDispatchToPorps) (home);

