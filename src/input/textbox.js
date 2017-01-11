import React,{Component} from "react";
import ReactDOM from "react-dom";
import StatusIcon from "./status-icon";
import parsers from "../parsers";
import mixEventMethods from "./mixin/mixEventMethods";
import mixCommonMethods from "./mixin/mixCommonMethods";

class TextBox extends Component {

    constructor(props) {
        super(props);
        mixEventMethods(this);
        mixCommonMethods(this);
        this.state = this.getStateFromProps(props);
    }

    componentWillReceiveProps(props) {
        this.setState(this.getStateFromProps(props));
    }

    // getIsError(value, mandatory) {
    //     return parsers.haveParsingFailed(value) || (!value && mandatory);
    // }

    getStateFromValues(rawValue, value, mandatory) {
        return {
            rawValue: rawValue,
            value: value,
            error: this.getIsError(value, mandatory)
        };
    }

    getStateFromProps(props) {
        var v = props.value || "";
        return Object.assign({
            initialValue: v
        }, this.getStateFromValues(v, v, props.mandatory));
    }

    getInputClassName() {
        let inputClassName = "formy-input formy-textbox form-control";
        if (this.state.error) {
            inputClassName += " error";
        }
        if (this.props.styleName) {
            inputClassName += " " + this.props.styleName;
        }
        return inputClassName;
    }

    render() {
        var opts = Object.assign({}, this.props.options);//shallow clone
        var options = Object.getOwnPropertyNames(opts).map((o)=>{
            return (<option key={o} value={o}>{opts[o]}</option>);
        });
        var disabled = (this.props.disabled)?{disabled: true}:{};
        return (<div className="input-group">
                <input type="text" ref="input" className={this.getInputClassName()}
                    value={this.state.rawValue} {...disabled}
                        onChange={(e)=>this.onChangeRoutine(e)} onBlur={(e)=>this.onBlurRoutine(e)}
                                onKeyPress={(e)=>this.onKeyPressRoutine(e)} onKeyDown={(e)=>this.onKeyDownRoutine(e)}/>

                    <div className="formy-addon input-group-addon">
                        <StatusIcon error={this.state.error} onClicked={()=>this.onStatusIconClicked()}
                            value={this.state.value} mandatory={this.props.mandatory}/>
                    </div>

                </div>);
        
    }

    parseValue(value) {
        return this.props.valueParser(value);
    }

    onStatusIconClicked() {
        if (this.state.error) {
            this.setState(this.getStateFromValues(this.state.initialValue, this.state.initialValue, this.props.mandatory));
        }
        // this.finish(this.state.initialValue);
    }

    componentDidUpdate() {
        //ReactDOM.findDOMNode(this.refs.input).focus();
    }

}

TextBox.defaultProps = {
    onEditingFinished: ()=>{},
    onChange: ()=>{},
    valueParser: (v)=>v, //raw parser
    value: "",
    mandatory: false
};

TextBox.propTypes = {
    styleName: React.PropTypes.string,
    value : React.PropTypes.node,
    onChange: React.PropTypes.func,
    onEditingFinished: React.PropTypes.func,
    mandatory: React.PropTypes.bool,
    valueParser: React.PropTypes.func,
    disabled: React.PropTypes.bool
};

export default TextBox;
