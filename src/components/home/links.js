import React from 'react'
import {Link} from 'react-router-dom';

import styles from './links.module.css';

export default function links() {
    return (
        <div className={styles.dropdown_content}>
            <Link className={styles.link} to='/indexselectors'>PanelStack Selector</Link>
            <Link className={styles.link} to='/indexselectors'>preset</Link>
            <Link className={styles.link} to='/indexselectors'>sheet panel</Link>
            <Link className={styles.link} to='/indexselectors'>tst</Link>
            <Link className={styles.link} to='/indexselectors'>tst</Link>
            <Link className={styles.link} to='/indexselectors'>tst</Link>
            <Link className={styles.link} to='/indexselectors'>tst</Link>
            <Link className={styles.link} to='/indexselectors'>tst</Link>
            <Link className={styles.link} to='/indexselectors'>tst</Link>
        </div>
    )
}
