import React,{Component} from "react";
import ReactDOM from "react-dom";
import StatusIcon from "./status-icon";
// import InputComponent from "./input-component";

class Selecto extends Component {

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

    getShowMoreOptions(value, moreOptions) {
        if (Object.getOwnPropertyNames(moreOptions).find((v)=>v==value)) return true;
        return false;
    }

    getStateFromValues(rawValue, value, moreOptions, mandatory) {
        return {
            rawValue: rawValue,
            value: value,
            showMoreOptions: this.getShowMoreOptions(value, moreOptions),
            error: this.getIsError(value, mandatory)
        };
    }

    getStateFromProps(props) {
        return Object.assign({
            initialValue: props.value,
        }, this.getStateFromValues(props.value, props.value, props.moreOptions, props.mandatory));
    }

    getInputClassName() {
        let inputClassName = "formy-input formy-selecto form-control";
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
        if (this.state.showMoreOptions){
            opts = Object.assign(opts, this.props.moreOptions);
        }
        var options = Object.getOwnPropertyNames(opts).map((o)=>{
            return (<option key={o} value={o}>{opts[o]}</option>);
        });
        var disabled = (this.props.disabled)?{disabled: true}:{};
        var checked = (this.state.showMoreOptions)?{checked: true}:{checked: false};
        return (<div className="input-group">
                <select ref="input" value={this.state.rawValue} className={this.getInputClassName()} {...disabled}
                            onChange={(e)=>this.onChangeRoutine(e)} onBlur={(e)=>this.onBlurRoutine(e)}
                                onKeyPress={(e)=>this.onKeyPressRoutine(e)} onKeyDown={(e)=>this.onKeyDownRoutine(e)}>
                        {options}
                    </select>
                    <div className="input-group-addon">
                        <input type="checkbox" {...checked} {...disabled}
                            onChange={(e)=>this.moreOptionsClicked(e.target.checked)}/> {(this.props.moreOptionsLabel || "More options")}
                    </div>
                    <div className="input-group-addon">
                        <StatusIcon error={this.state.error} onClicked={()=>this.onStatusIconClicked()}
                            value={this.state.value} mandatory={this.props.mandatory}/>
                    </div>
                    
                </div>);
        
    }

    moreOptionsClicked(checked) {
        let valueIsInMoreOptions = (Object.getOwnPropertyNames(this.props.moreOptions).find((v)=>v==this.state.value));
        if (!checked && valueIsInMoreOptions) return;
        this.setState({showMoreOptions: checked});
    }

    parseValue(value) {
        return this.props.valueParser(value);
    }

    onStatusIconClicked() {
        if (this.state.error) {
            this.setState(this.getStateFromValues(this.state.initialValue, this.state.initialValue, this.props.moreOptions, this.props.mandatory));
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
            this.setState(this.getStateFromValues(this.state.initialValue, this.state.initialValue, this.props.moreOptions, this.props.mandatory));
            this.props.onChange(this.state.initialValue);
            this.props.onEditingFinished(this.getIsError(this.state.initialValue, this.props.mandatory));
        }
    }

}

Selecto.defaultProps = {
    onEditingFinished: ()=>{},
    onChange: ()=>{},
    valueParser: (v)=>v //raw parser
};

Selecto.propTypes = {
    styleName: React.PropTypes.string,
    value : React.PropTypes.node,
    onChange: React.PropTypes.func,
    onEditingFinished: React.PropTypes.func,
    mandatory: React.PropTypes.bool,
    options: React.PropTypes.object.isRequired,//value - label pairs
    moreOptions: React.PropTypes.object.isRequired,//value - label pairs
    valueParser: React.PropTypes.func,
    disabled: React.PropTypes.bool,
    moreOptionsLabel: React.PropTypes.string
};

export default Selecto;
