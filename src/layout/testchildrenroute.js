import React,{ Component } from 'react';

import * as actionTypes from '../store/actions';
import { connect } from 'react-redux';
import Indexselectors from '../components/selectors/indexselectors';

class Testchildrenroute extends Component {


    render() {
        console.log(this.props)
        this.props.updateRoutePath(this.props.match.params.sType)

        return (
           <div>hey</div>
        )
    }
}


const mapDispatchToPorps = dispatch => {
    return {
        updateRoutePath: (routePath) => dispatch ({type: actionTypes.ROUTEPATH, payload: routePath})
    }
}

export default connect(null,mapDispatchToPorps) (Testchildrenroute);