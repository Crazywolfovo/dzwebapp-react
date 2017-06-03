import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.scss'

class LoadMore extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div className="load-more" ref="wrapper">
                {
                    this.props.isLoadingMore
                    ? <span>加载中...</span>
                    : <span onClick={this.loadMoreHandle.bind(this)}>加载更多</span>
                }
            </div>
        )
    }
    loadMoreHandle(){
        this.props.loadMoreFn()
    }
    componentDidMount() {
        const loadMoreFn = this.props.loadMoreFn
        const wrapper = this.refs.wrapper
        let timeOutId;
        window.addEventListener('scroll',()=>{
            if (this.props.isLoadingMore) {
                return
            }
            if (timeOutId) {
                clearTimeout(timeOutId)
            }
            timeOutId = setTimeout(()=>{
                const top = wrapper.getBoundingClientRect().top;
                const windowHeight = window.screen.height;
                if (top && top < windowHeight) {
                    loadMoreFn();
                }
            },50);
        },false);
    }
}

export default LoadMore
