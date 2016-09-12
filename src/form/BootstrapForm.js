import React, {Component} from "react";
import BootstrapFormGroup from "./BootstrapFormGroup";
import _ from "lodash";

class BootstrapForm extends Component {
    render() {
        var children = this.props.children;
        if (!_.isArray(this.props.children)) {
            children = [children];
        }
        var elements = children.map((c)=>{
            return <BootstrapFormGroup>{c}</BootstrapFormGroup>;
        });
        return <form className="form">
            {elements}
        </form>;
    }
}

export default BootstrapForm;