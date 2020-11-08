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
                 {/*    <Link className={styles.Link} to='/fakePanels'>Fake Panel Selector</Link>
                     <Link className={styles.Link} to='/fakePanels'>tst</Link>
                     <Link className={styles.Link} to='/fakePanels'>tst</Link>
                     <Link className={styles.Link} to='/fakePanels'>tst</Link>
                */}
                 <div className={styles.wrapper}> {links()}</div>
               
                </div>
              </div> 
            </div>
                
        )
    }
}

export default navbar
