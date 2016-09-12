import React, {Component} from "react";
import InlineLayout from "./inline-layout";
import Select from "../input/select";

class SelectInlineEdit extends Component {

	constructor(props) {
        super(props);
        this.state = {
            isEdit: (!this.props.value && this.props.mandatory),
            value: this.props.value
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            isEdit: (!this.props.value && this.props.mandatory),
            value: this.props.value
        });
    }

	render() {
        return (<InlineLayout value={this.state.value}
                    displayFormat={this.props.displayFormat || ((value)=>this.defaultDisplayFormat(value))}
                    onEditValueClicked={()=>this.setState({isEdit: true})} isEdit={this.state.isEdit}
                        displayModeClassName={this.props.displayModeClassName}>
                    
                    <Select value={this.state.value} valueParser={this.props.valueParser}
                        styleName={this.props.editModeClassName} onChange={(value)=>this.onChangeRoutine(value)} 
                            mandatory={this.props.mandatory} options={this.props.options}
                                onEditingFinished={(withError)=>this.onEditingFinishedRoutine(withError)}/>
        
                </InlineLayout>);
    }

    onEditingFinishedRoutine(withError) {
        // console.log("Editing finished with error: " , withError);
        this.setState({isEdit: withError});
    }

    onChangeRoutine(newValue){
        this.setState({
            value: newValue
        });
        this.props.onChange(newValue);
    }
 

    defaultDisplayFormat(value) {
        if (this.props.options[value]) return this.props.options[value];
        return value;
    }

}

SelectInlineEdit.propTypes = {
    value : React.PropTypes.node.isRequired,
    onChange : React.PropTypes.func.isRequired,//if on change is null, component is rendered as readonly, in display mode
    valueParser: React.PropTypes.func.isRequired,
    displayFormat: React.PropTypes.func,
    displayModeClassName: React.PropTypes.string,
    editModeClassName: React.PropTypes.string,
    mandatory: React.PropTypes.bool,
    options: React.PropTypes.object.isRequired,//value - label pairs
};

export default SelectInlineEdit;