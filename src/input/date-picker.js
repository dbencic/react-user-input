import React,{Component} from "react";
import ReactDOM from "react-dom";
import StatusIcon from "./status-icon";
import DatePicker from "react-datepicker";
import moment from "moment";
import parsers from "../parsers";
import _ from "lodash";
import mixEventMethods from "./mixin/mixEventMethods";
import mixCommonMethods from "./mixin/mixCommonMethods";

class DatePickerInput extends Component {

    constructor(props) {
        super(props);
        mixEventMethods(this, ["onBlurRoutine", "finish"]);
        mixCommonMethods(this);
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
            this.setState(this.getStateFromValues(this.state.initialValue, this.props.mandatory));
        }
        // this.finish(this.state.initialValue);
    }

    componentDidUpdate() {
        // ReactDOM.findDOMNode(this.refs.input).focus();
    }

    /**
     * handles change over state, not directly. This is prefered react way
     */
    onChangeRoutine(value) {
        this.setState({
            value: value,
            error: this.getIsError(value, this.props.mandatory)
        });
        this.props.onChange(value, value);
    }
}

DatePickerInput.defaultProps = {
    onEditingFinished: ()=>{},
    onChange: ()=>{},
    value: null,
    mandatory: false
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
