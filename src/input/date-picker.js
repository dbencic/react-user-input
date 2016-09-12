import React,{Component} from "react";
import ReactDOM from "react-dom";
import StatusIcon from "./status-icon";
import DatePicker from "react-datepicker";
import moment from "moment";
import _ from "lodash";

class DatePickerInput extends Component {

    constructor(props) {
        super(props);
        this.state = this.getStateFromProps(props);
    }

    componentWillReceiveProps(props) {
        this.setState(this.getStateFromProps(props));
    }

    getAsMoment(value) {
        if (!value) return null;
        if (moment.isMoment(value)) {
            return value;
        }
        return new moment(value);
    }

    getIsError(value, mandatory) {
        return (value === null) || (!value && mandatory);
    }

    getStateFromValues(value, mandatory) {
        return {
            value: value,
            error: this.getIsError(value, mandatory)
        };
    }

    getStateFromProps(props) {
        let value = this.getAsMoment(props.value);
        return Object.assign({
            initialValue: value
        }, this.getStateFromValues(value, props.mandatory));
    }

    getInputClassName() {
        let inputClassName = "formy-input formy-date-picker form-control";
        if (this.state.error) {
            inputClassName += " error";
        }
        if (this.props.styleName) {
            inputClassName += " " + this.props.styleName;
        }
        return inputClassName;
    }

    render() {
        var disabled = (this.props.disabled)?{disabled: true}:{};
        return (<div className="input-group">
                <DatePicker selected={this.state.value} onChange={(value)=>this.onChangeRoutine(value)}
                    dateFormat="DD.MM.YYYY" ref="input" selected={this.state.value}
                    className={this.getInputClassName()} onBlur={(e)=>this.onBlurRoutine(e)} {...disabled}/>
                    <div className="input-group-addon">
                        <StatusIcon error={this.state.error} onClicked={()=>this.onStatusIconClicked()}/>
                    </div>
                </div>);
        
    }

    parseValue(value) {
        return this.props.valueParser(value);
    }

    onStatusIconClicked() {
        if (this.state.error) {
            this.setState(this.getStateFromValues(this.state.initialValue, this.props.mandatory));
        }
        // this.finish(this.state.initialValue);
    }

    componentDidUpdate() {
        ReactDOM.findDOMNode(this.refs.input).focus();
    }

    /**
     * handles change over state, not directly. This is prefered react way
     */
    onChangeRoutine(value) {
        this.setState({
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

    // onKeyPressRoutine(e) {
    //     let keyCode = e.nativeEvent.keyCode;
    //     if (keyCode === 13) {
    //         this.finish(this.state.value);
    //     }
    // }

    // onKeyDownRoutine(e) {
    //     let keyCode = e.nativeEvent.keyCode;
    //     if(keyCode == 27) {
    //         this.setState(this.getStateFromValues(this.state.initialValue, this.props.mandatory));
    //         this.props.onChange(this.state.initialValue);
    //         this.props.onEditingFinished(this.getIsError(this.state.initialValue, this.props.mandatory));
    //     }
    // }

}

DatePickerInput.defaultProps = {
    onEditingFinished: ()=>{},
    onChange: ()=>{},
    value: null
};

DatePickerInput.propTypes = {
    styleName: React.PropTypes.string,
    value : React.PropTypes.object,
    onChange: React.PropTypes.func,
    onEditingFinished: React.PropTypes.func,
    mandatory: React.PropTypes.bool,
    disabled: React.PropTypes.bool
};

export default DatePickerInput;
