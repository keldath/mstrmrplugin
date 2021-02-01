import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import styles from './navbar.module.css';
import links from '../home/links';

export class navbar extends Component {
    render() {
        return (

            <div className={styles.topnav} id="myTopnav">
               <Link className={styles.Link} to='/'>Home</Link> 
               <div className={styles.dropdown}>
               <button className={styles.dropbtn}>Dropdown</button>
                <div className={styles.dropdown_content}>
                 <div className={styles.wrapper}> {links('grid')}</div>
                </div>
              </div> 
            </div>
                
        )
    }
}

export default navbar
