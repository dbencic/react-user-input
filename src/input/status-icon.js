import React,{Component} from "react";

class StatusIcon extends Component {

    render() {
        let value = this.props.value;
        let valuePresent = this.isValuePresent(value);
        let iconClassName = "glyphicon glyphicon-ok-circle text-success";
        if (this.props.mandatory === false && !valuePresent) {
            iconClassName = "glyphicon glyphicon-option-horizontal text-default";
        }
        if (this.props.error) {
            iconClassName = "glyphicon glyphicon-remove-circle text-danger";
        }
        iconClassName += " formy-icon";
        return <i className={iconClassName} onClick={()=>this.iconClicked()} />;
    }

    iconClicked() {
        this.props.onClicked();
    }

    isValuePresent(value) {
        if (value === 0) return true;
        if (value === undefined || value === null) return false;
        if (value.trim && !(value.trim())) return false;
        return (!!value);
    }
}

StatusIcon.defaultProps = {
    mandatory: false
};

StatusIcon.propTypes = {
    onClicked: React.PropTypes.func.isRequired,
    error: React.PropTypes.bool.isRequired,
    value: React.PropTypes.any,
    mandatory: React.PropTypes.bool
};

export default StatusIcon;