import mixer from "./mixer";

var onBlurRoutine = function(event) {
        this.finish();
    };

var finish = function() {
    // this.props.onChange(this.state.value);
    this.props.onEditingFinished(this.state.error, this.state.value);
};

var onKeyPressRoutine = function(e) {
    let keyCode = e.nativeEvent.keyCode;
    if (keyCode === 13) {
        this.finish();
    }
};

var onKeyDownRoutine = function(e) {
    let keyCode = e.nativeEvent.keyCode;
    if(keyCode == 27) {
        this.setState(this.getStateFromValues(this.state.initialValue, this.state.initialValue, this.props.mandatory));
        this.finish();
    }
};

/**
 * handles change over state, not directly. This is prefered react way
 */
var onChangeRoutine = function(event) {
    let rawValue = event.target.value;
    let value = this.parseValue(rawValue);
    this.setState({
        rawValue: rawValue,
        value: value,
        error: this.getIsError(value, this.props.mandatory)
    });
    this.props.onChange(value, rawValue);
};

var methods = {onBlurRoutine, finish, onKeyPressRoutine, onKeyDownRoutine, onChangeRoutine};

/**
 * adds common event methods
 */
module.exports = function(instance, methodsToBind) {
    if (!instance) throw new Error("instance (first argument). Cannot be null. Methods should be bound to it");

    mixer(instance, methods, methodsToBind);
};