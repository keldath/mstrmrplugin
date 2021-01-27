import React from 'react'
import {Link} from 'react-router-dom';

import styles from './links.module.css';
import * as naming from '../../layout/naming'

//do the links dynamic according to the namining - make sure to convert the naming to an object
export default function links() {
    return (
        <div className={styles.dropdown_content}>
            <Link className={styles.link} to={`/indexselectors/${naming.PANELSTACK}`} >{naming.PANELSTACK}</Link>
            <Link className={styles.link} to={`/indexselectors/${naming.SHEETPANEL}`}>{naming.SHEETPANEL}</Link>
            <Link className={styles.link} to={`/indexselectors/${naming.VIEWFILTER}`}>{naming.VIEWFILTER}</Link>
            <Link className={styles.link} to={`/indexselectors/${naming.DYNAMICTEXT}`}>{naming.DYNAMICTEXT}</Link>
            <Link className={styles.link} to={`/indexselectors/${naming.MULTITARGET}`}>{naming.MULTITARGET}</Link>
            <Link className={styles.link} to={`/indexselectors/${naming.CHARTSETUP}`}>{naming.CHARTSETUP}</Link>
            <Link className={styles.link} to={`/indexselectors/${naming.PRESET}`}>{naming.PRESET}</Link>
            <Link className={styles.link} to={`/indexselectors/${naming.AUTOREFRESHER}`}>{naming.AUTOREFRESHER}</Link>
        </div>
    )
}
