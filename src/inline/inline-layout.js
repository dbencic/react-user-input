import React, {Component} from "react";

class InlineLayout extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		let styles = (this.props.displayModeClassName)?{className: this.props.displayModeClassName + " formy-value"}:{className: "formy-value"};
		if (!this.props.isEdit) {
			return (<div className="input-group" onClick={()=>this.editValueClicked()}>
						<div {...styles}>{this.getDisplayValue()}</div>
						<div className="input-group-addon">
	                        <i className="glyphicon glyphicon-edit formy-icon"/>
	                    </div>
					</div>);
		}else {
			return this.props.children; 
		}
	}

	getDisplayValue() {
		var displayFormat = (this.props.displayFormat);
		let displayValue = (displayFormat)?displayFormat(this.props.value):this.props.value;
		return displayValue;
	}

	editValueClicked() {
		this.props.onEditValueClicked();
	}
}

InlineLayout.propTypes = {
	value : React.PropTypes.node,
	displayFormat: React.PropTypes.func,
	onEditValueClicked: React.PropTypes.func.isRequired,
	displayModeClassName: React.PropTypes.string,
	isEdit: React.PropTypes.bool.isRequired
};

export default InlineLayout;