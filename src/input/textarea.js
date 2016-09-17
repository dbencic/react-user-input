import React,{Component} from "react";
import ReactDOM from "react-dom";
import StatusIcon from "./status-icon";
// import InputComponent from "./input-component";

class TextBox extends Component {

    constructor(props) {
        super(props);
        this.state = this.getStateFromProps(props);
    }

    componentWillReceiveProps(props) {
        this.setState(this.getStateFromProps(props));
    }

    getIsError(value, mandatory) {
        return (value === null) || (!value && mandatory);
    }

    getStateFromValues(rawValue, value, mandatory) {
        return {
            rawValue: rawValue,
            value: value,
            error: this.getIsError(value, mandatory)
        };
    }

    getStateFromProps(props) {
        return Object.assign({
            initialValue: props.value
        }, this.getStateFromValues(props.value, props.value, props.mandatory));
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
                <textarea type="text" ref="input" className={this.getInputClassName()}
                    value={this.state.rawValue} {...disabled} rows={this.props.rows}
                        onChange={(e)=>this.onChangeRoutine(e)} onBlur={(e)=>this.onBlurRoutine(e)}
                                onKeyPress={(e)=>this.onKeyPressRoutine(e)} onKeyDown={(e)=>this.onKeyDownRoutine(e)}/>

                    <div className="input-group-addon">
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
        ReactDOM.findDOMNode(this.refs.input).focus();
    }

    /**
     * handles change over state, not directly. This is prefered react way
     */
    onChangeRoutine(event) {
        let rawValue = event.target.value;
        let value = this.parseValue(rawValue);
        this.setState({
            rawValue: rawValue,
            value: value,
            error: this.getIsError(value, this.props.mandatory)
        });
    }

    onBlurRoutine(event) {
        if (!this.state.error) {
            this.finish(this.state.value);
        }
        this.props.onChange(this.state.value);
    }

    finish(value) {
        if (!this.state.error) {
            this.props.onChange(value);
            this.props.onEditingFinished(this.state.error);
        }
    }

    onKeyPressRoutine(e) {
        let keyCode = e.nativeEvent.keyCode;
        if (keyCode === 13) {
            this.finish(this.state.value);
        }
    }

    onKeyDownRoutine(e) {
        let keyCode = e.nativeEvent.keyCode;
        if(keyCode == 27) {
            this.setState(this.getStateFromValues(this.state.initialValue, this.state.initialValue, this.props.mandatory));
            this.props.onChange(this.state.initialValue);
            this.props.onEditingFinished(this.getIsError(this.state.initialValue, this.props.mandatory));
        }
    }

}

TextBox.defaultProps = {
    onEditingFinished: ()=>{},
    onChange: ()=>{},
    valueParser: (v)=>v, //raw parser
    value: "",
    rows: 5
};

TextBox.propTypes = {
    styleName: React.PropTypes.string,
    value : React.PropTypes.node,
    onChange: React.PropTypes.func,
    onEditingFinished: React.PropTypes.func,
    mandatory: React.PropTypes.bool,
    valueParser: React.PropTypes.func,
    disabled: React.PropTypes.bool,
    rows: React.PropTypes.number
};

export default TextBox;
