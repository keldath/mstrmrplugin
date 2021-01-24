import React from 'react'
import {Link} from 'react-router-dom';

import styles from './links.module.css';
import * as naming from '../../layout/naming'

export default function links() {
    return (
        <div className={styles.dropdown_content}>
            <Link className={styles.link} to={`/indexselectors/${naming.PANELSTACK}`} >{naming.PANELSTACK}</Link>
            <Link className={styles.link} to={`/indexselectors/${naming.SHEETPANEL}`}>{naming.SHEETPANEL}</Link>
            <Link className={styles.link} to={`/indexselectors/${naming.VIEWFILTER}`}>{naming.VIEWFILTER}</Link>
            <Link className={styles.link} to={`/indexselectors/${naming.DYNAMICTEXT}`}>{naming.DYNAMICTEXT}</Link>
            <Link className={styles.link} to='/indexselectors'>tst</Link>
        </div>
    )
}
