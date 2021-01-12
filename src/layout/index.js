import React, { Component } from 'react';
import { Route , Switch} from 'react-router-dom';


import Home from '../components/home/home';
import Navbar from '../components/navBar/navbar';
//import PanelStack from '../components/selectors/panelStack/panelStack';
import Indexselectors from '../components/selectors/indexselectors';
//import * as names from './naming';
import styles from './index.module.css';

export class mainframe extends Component {

    render() {
        return (
            <div className={styles.frame}> 
              <Navbar/>
               <Switch>
                   <Route path="/" component={Home} exact />
                   <Route path="/indexselectors/:sType" render={(props) => <Indexselectors {...props} />}/> {/*this will pass a parameter along */}
                   <Route path="/" component={Home}/>{/*this will redirect any wrong routing */}
                 </Switch>
            </div>
        )
    }
}

export default mainframe;
//r={names.PANELSTACK}
//r={names.SHEETPANEL}
/*component={PanelStack}

 <Route path="/indexselectors/:sType"  
                            children={props => <Testchildrenroute {...props}/>}
                            render={(props) => <Indexselectors {...props} rSrc={names.PANELSTACK} />}/> 
                  
*/
{/*this will pass a parameter along */}