import React, { Component } from 'react';
import { Route , Switch} from 'react-router-dom';


import Home from '../components/home/home';
import Navbar from '../components/navBar/navbar';
//import PanelStack from '../components/selectors/panelStack/panelStack';
import Indexselectors from '../components/selectors/indexselectors';
import * as names from './naming';
import styles from './index.module.css';

export class mainframe extends Component {

  
    render() {
        return (
            <div className={styles.frame}> 
              <Navbar/>
               <Switch>
                   <Route path="/" component={Home} exact />
                   <Route path="/indexselectors"  render={(props) => <Indexselectors {...props} rSrc={names.PANELSTACK} />}/> {/*this will pass a parameter along */}
                 </Switch>
            </div>
        )
    }
}

export default mainframe
/*component={PanelStack}*/