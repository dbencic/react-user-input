/**
 * adds common event methods
 */
module.exports = function(instance, methodsToBind) {
    if (!instance) throw new Error("instance (first argument). Cannot be null. Methods should be bound to it");
    var onBlurRoutine = function(event) {
        this.finish(this.state.value);
    }.bind(instance);

    var finish = function(value) {
        this.props.onChange(value);
        this.props.onEditingFinished(this.state.error);
    }.bind(instance);

    var onKeyPressRoutine = function(e) {
        let keyCode = e.nativeEvent.keyCode;
        if (keyCode === 13) {
            this.finish(this.state.value);
        }
    }.bind(instance);

    var onKeyDownRoutine = function(e) {
        let keyCode = e.nativeEvent.keyCode;
        if(keyCode == 27) {
            this.setState(this.getStateFromValues(this.state.initialValue, this.state.initialValue, this.props.mandatory));
            this.finish(this.state.initialValue);
        }
    }.bind(instance);

    var methods = {onBlurRoutine, finish, onKeyPressRoutine, onKeyDownRoutine};
    if (!methodsToBind) methodsToBind = Object.getOwnPropertyNames(methods);
    methodsToBind.forEach((methodName)=>{
        instance[methodName] = methods[methodName];
    });
};