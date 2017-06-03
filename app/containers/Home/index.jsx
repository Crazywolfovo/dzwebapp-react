import React from 'react'
import { connect } from "react-redux"
import PureRenderMixin from 'react-addons-pure-render-mixin'
import HomeHeader from "../../components/HomeHeader/index"
import Category from "../../components/Category/index"
import AdSubpage from "./subpage/Ad"
import ListSubpage from "./subpage/List"

class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div>
                <HomeHeader cityName={this.props.userinfo.cityName}/>
                <Category />
                <div style={{height:'15px'}}></div>
                <AdSubpage />
                <ListSubpage cityName={this.props.userinfo.cityName}/>
            </div>
        )
    }
}

//export default Home
function mapStateToProps(state){
    return {
        userinfo:state.userinfo
    }
}

function mapDispatchToProps(dispatch){
    return {
        // userInfoActions:bindActionCreators(userInfoActionFromOtherFile,dispatch)
    }
}
// export default Home
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
