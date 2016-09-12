import React,{Component} from "react";

class StatusIcon extends Component {

    render() {
        let iconClassName = "glyphicon glyphicon-ok-circle text-success";
        if (this.props.error) {
            iconClassName = "glyphicon glyphicon-remove-circle text-danger";
        }
        iconClassName += " formy-icon";
        return <i className={iconClassName} onClick={()=>this.iconClicked()} />;
    }

    iconClicked() {
        this.props.onClicked();
    }
}


StatusIcon.propTypes = {
    onClicked: React.PropTypes.func.isRequired,
    error: React.PropTypes.bool.isRequired
};

export default StatusIcon;