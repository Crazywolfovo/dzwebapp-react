import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getListData } from '../../../fetch/home/home'
import { getSearchData }from '../../../fetch/search/search'
import ListComponent from '../../../components/List/index'
import LoadMore from '../../../components/LoadMore/index'
import { connect } from "react-redux"
import { bindActionCreators} from "redux"
import * as userInfoActionFromOtherFile from "../../../actions/userinfo";

const initialState = {
            data:[],
            hasMore:false,
            isLoadingMore:false, //judge is loading ?
            page:1 //next page index
        }

class SearchList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = initialState
    }
    render() {
        return (
            <div>
                {/*<h2 style={{fontSize:'16px',color:'#666',margin:'10px 15px'}}>猜你喜欢</h2>*/}
                {
                    this.state.data.length
                    ?<ListComponent data={this.state.data}/>
                    :<div>加载中......</div>
                }
                {
                    this.state.hasMore
                    ? <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)}/>
                    : ''
                }
            </div>
        )
    }
    componentDidMount() {
        this.loadFirstPageData();
    }
    componentDidUpdate(prevProps, prevState) {
        const type = this.props.type;
        const keyword = this.props.keyword;
        if (keyword ===prevProps.keyword && type ===prevProps.type ) {
            return
        }
        this.setState(initialState);
        this.loadFirstPageData();
    }
    loadMoreData(){
        this.setState({
            isLoadingMore:true
        });
        const cityName = this.props.userinfo.cityName;
        const type = this.props.type;
        const keyword = this.props.keyword || '';
        const page = this.state.page;
        const result = getSearchData(page,cityName,type,keyword);
        this.resultHandler(result);
        this.setState({
            page: page + 1,
            isLoadingMore: false
        });
    }
    loadFirstPageData(){
        const cityName = this.props.userinfo.cityName;
        const type = this.props.type;
        const keyword = this.props.keyword || '';
        const result = getSearchData(0,cityName,type,keyword);
        this.resultHandler(result);
    }
    resultHandler(result){
        result.then((res)=>{
            return res.json()
        }).then((json)=>{
            const hasMore = json.hasMore
            const data = json.data
            this.setState({
                data:this.state.data.concat(data),
                hasMore:hasMore
            })
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
)(SearchList)
// 使用 require.ensure 异步加载，还不支持 ES6 的 export
//module.exports = NotFound
