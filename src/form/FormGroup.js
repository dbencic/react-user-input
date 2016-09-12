import React, {Component} from "react";

/**
 * wrapper arround elements in bootstrap form group element
 */
class FormGroup extends Component {

    render() {
        return (<div className="form-group">
            <label>{this.props.label}</label>{"\n"}
            {this.props.children}
            </div>);
    }

}

FormGroup.propTypes = {
    label: React.PropTypes.string.isRequired
};

export default FormGroup;