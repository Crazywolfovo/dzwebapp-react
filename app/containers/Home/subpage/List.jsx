import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getListData } from '../../../fetch/home/home'
import ListComponent from '../../../components/List/index'
import LoadMore from '../../../components/LoadMore/index'

class List extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state= {
            data:[],
            hasMore:false,
            isLoadingMore:false, //judge is loading ?
            page:1 //next page index
        }
    }
    render() {
        return (
            <div>
                <h2 style={{fontSize:'16px',color:'#666',margin:'10px 15px'}}>猜你喜欢</h2>
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
    loadMoreData(){
        this.setState({
            isLoadingMore:true
        });
        const cityName = this.props.cityName;
        const page = this.state.page;
        const result = getListData(cityName,page);
        this.resultHandler(result);
        this.setState({
            page: page + 1,
            isLoadingMore: false
        });
    }
    loadFirstPageData(){
        const cityName = this.props.cityName;
        const result = getListData(cityName,0);
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

// 使用 require.ensure 异步加载，还不支持 ES6 的 export
 export default List
//module.exports = NotFound
