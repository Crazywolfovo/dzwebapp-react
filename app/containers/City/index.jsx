import React from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { hashHistory } from "react-router";
import PureRenderMixin from 'react-addons-pure-render-mixin'

import * as userInfoActionFromOtherFile from "../../actions/userinfo";

import localStore from "../../util/localStore"
import { CITYNAME } from "../../config/localStoreKey"

import Header from "../../components/Header/index";
import CurrentCity from "../../components/CurrentCity/index";
import CityList from "../../components/CityList/index";

class City extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div>
                <Header title='选择城市'/>
                <CurrentCity cityName={this.props.userinfo.cityName}/>
                <CityList changeFn={this.changeCityHandler.bind(this)}/>
            </div>
        )
    }
    componentDidMount() {
        console.log(localStore)
        console.log(CITYNAME)
    }
    changeCityHandler(newCity){

        if(newCity == null){
            return;
        }

        //change redux
        const userinfo = this.props.userinfo
        userinfo.cityName = newCity
        this.props.userInfoActions.update(userinfo)

        //change localstorage
        localStore.setItem(CITYNAME,newCity);
        hashHistory.push('/');
    }
}

function mapStateToProps(state){
    return {
        userinfo:state.userinfo
    }
}

function mapDispatchToProps(dispatch){
    return {
        userInfoActions:bindActionCreators(userInfoActionFromOtherFile,dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(City)
// 使用 require.ensure 异步加载，还不支持 ES6 的 export
// export default City
//module.exports = City
