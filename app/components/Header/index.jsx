import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './style.scss';
class Header extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div id="common-header">
                <span className="back-icon" onClick={this.clickHandler.bind(this)}>
                    <i className="icon-chevron-left"></i>
                </span>
                <h1>{this.props.title}</h1>
            </div>
        )
    }
    clickHandler(){
        window.history.back()
    }
}

// 使用 require.ensure 异步加载，还不支持 ES6 的 export
export default Header
// module.exports = NotFound
