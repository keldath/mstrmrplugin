import React, { Component } from 'react'
import { connect } from 'react-redux';

import links from './links';
import styles from './home.module.css';

//import store from '../../store/store';

//store.subscribe(()=>{console.log(store.getState())})

export class home extends Component {

    componentDidMount () {
        console.log('mounted')
    }
    render() {
        return (
            <div>
                <br/>
                <h1>Welcome to MicroStrategy Custom Plugin !</h1>
                <br/>
                <p>choose the selector you would like to create</p>
                <div className={styles.wrapper}>
                    <div className={styles.linksBox}>
                    {links()}
                    </div>
                </div>
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

