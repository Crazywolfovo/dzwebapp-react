import React from 'react'
import { connect} from "react-redux"
import { bindActionCreators} from "redux"

import PureRenderMixin from 'react-addons-pure-render-mixin'
import localStore from "../util/localStore"
import { CITYNAME } from "../config/localStoreKey"

import * as userInfoActionFromOtherFile from "../actions/userinfo";

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            initDone:false
        };
    }
    render() {
        return (
            <div>
                {
                    this.state.initDone
                    ?this.props.children
                    :<div>加载中......</div>
                }
            </div>
        )
    }
    componentDidMount() {
        //get data from localstorage
        let cityName = localStore.getItem(CITYNAME);
        if (cityName == null) {
            cityName = '太原'
        }
        //insert city data into redux(store) and listen it`s change
        this.props.userInfoActions.update({
            cityName:cityName
        })

        this.setState({
            initDone:true
        })
    }
}

function mapStateToProps(state){
    return {
        userinfo:state.userinfo
    }
}
//user operate of view link to action
function mapDispatchToProps(dispatch){
    return {
        //get reducer
        userInfoActions:bindActionCreators(userInfoActionFromOtherFile,dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
