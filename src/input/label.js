import React,{Component} from "react";

class Label extends Component {

    constructor(props) {
        super();
        this.valueProvider = props.displayFormat;
        if (props.preformatted) {
            this.valueProvider=(v)=><pre>{props.displayFormat(v)}</pre>;
        }
    }

    render() {
        let styles = {className: (this.props.styleName + " formy-value")};
        if (!this.props.onClick) {
            styles.className = styles.className + " not-clickable";            
        }
        let addon = (this.props.onClick)?<i className="glyphicon glyphicon-pencil formy-icon"/>:"";
        var onclick = this.props.onClick || (()=>{});
        return (<div className="input-group" onClick={(e)=>onclick()}>
                        <div {...styles}>{this.valueProvider(this.props.value)}</div>
                        <div className="formy-addon input-group-addon">
                            {addon}
                        </div>
                    </div>);
    }

}

Label.defaultProps = {
    styleName: "btn btn-default",
    value: "-",
    displayFormat: (v)=>v //raw formatter
};

Label.propTypes = {
    styleName: React.PropTypes.string,
    value : React.PropTypes.any,
    displayFormat: React.PropTypes.func,
    onClick: React.PropTypes.func,
    preformatted: React.PropTypes.bool
};

export default Label;