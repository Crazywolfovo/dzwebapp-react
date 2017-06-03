import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Header from "../../components/Header/index";
import CommentList from "./subpage/Comment";
import Info from "./subpage/info";
import Buy from "./subpage/buy";

class Detail extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        const id = this.props.params.id;
        return (
            <div>
                <Header title='商品详情'/>
                <Info id={id} />
                <Buy id={id} />
                <CommentList />
            </div>
        )
    }
}

// 使用 require.ensure 异步加载，还不支持 ES6 的 export
// export default Detail
module.exports = Detail
