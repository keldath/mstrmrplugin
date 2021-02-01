import React from 'react'
import {Link} from 'react-router-dom';

import styles from './links.module.css';
import * as naming from '../../layout/naming'

//do the links dynamic according to the namining - make sure to convert the naming to an object
export default function links(display) {

    let css = '';
    let link = '';
    if (display === 'grid') {
        css = styles.dropdown_content1
        link = styles.link1
    }
    else {
        css = styles.dropdown_content2
        link = styles.link2
    }
    
    // cc = (event) => {
    //      $(event.target).addClass('active').siblings().removeClass('active');
    // }

    return (
        <div className={css}>
            <Link className={link} to={`/indexselectors/${naming.PANELSTACK}`} >{naming.PANELSTACK}</Link>
            <Link className={link} to={`/indexselectors/${naming.SHEETPANEL}`}>{naming.SHEETPANEL}</Link>
            <Link className={link} to={`/indexselectors/${naming.VIEWFILTER}`}>{naming.VIEWFILTER}</Link>
            <Link className={link} to={`/indexselectors/${naming.DYNAMICTEXT}`}>{naming.DYNAMICTEXT}</Link>
            <Link className={link} to={`/indexselectors/${naming.MULTITARGET}`}>{naming.MULTITARGET}</Link>
            <Link className={link} to={`/indexselectors/${naming.CHARTSETUP}`}>{naming.CHARTSETUP}</Link>
            <Link className={link} to={`/indexselectors/${naming.PRESET}`}>{naming.PRESET}</Link>
            <Link className={link} to={`/indexselectors/${naming.AUTOREFRESHER}`}>{naming.AUTOREFRESHER}</Link>
        </div>
    )
}
