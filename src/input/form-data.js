/**
 * Keeps form data encapsulated and serves as a factory for change handlers.
 * @param value value that will be rapresented by form (can be null)
 * @param listener for valuechanges, not mandatory, signature: (newValue, changedFieldName)
 */

function FormData(value = {}, changeListener = (newValue, changedFieldName)=>{}) {
    this.__value = Object.assign({}, value);
    this.__changeListener = changeListener;
    this.__mandatoryFields = [];
    this.__allFields = [];
    this.__changedFieldsWitErrors = [];

    /**
     * returns change handler that wil update current value
     */
    this.__changeHandler = function(fieldName) {
        return function(error, newFieldValue){
            if (error) {
                this.__changedFieldsWitErrors.push(fieldName);
            }else {
                this.__changedFieldsWitErrors = this.__changedFieldsWitErrors.filter((f)=>f != fieldName);
            }
            this.updateValue(fieldName, newFieldValue);
        }.bind(this);
    };

    /**
     * Updates field value
     */
    this.updateValue = function(fieldName, newFieldValue) {
        if (this.__value[fieldName] != newFieldValue) {
            this.__value[fieldName] = newFieldValue;
            this.__changeListener(this.__value, fieldName);
        }
    };

    /**
     * generates field's attributes:
     * - change handler
     * - value
     * - mandatory
     * Use spread operator inside jsx to add this properties
     */
    this.field = function(fieldName, mandatory) {
        if (mandatory) {
            this.__mandatoryFields.push(fieldName);
        }
        this.__allFields.push(fieldName);

        return {
            onEditingFinished: this.__changeHandler(fieldName),
            value: this.__value[fieldName],
            mandatory: mandatory
        };
    };

    /**
     * returns edited value, if value contains all required fields, else returns null
     * so null is sign that value in form is not edited correctly.
     * Returned value will contain only fields declared in form!
     */
    this.getValue = function() {
        if (this.__changedFieldsWitErrors.length > 0) return null;
        for (let i=0; i<this.__mandatoryFields.length; i++) {
            if (!this.__value[this.__mandatoryFields[i]]) {
                return null;
            };
        }
        return _trim(this.__value, this.__allFields);
    };

    /**
     * returns current value, regardless if value is valid or not and regardless of formFields
     * This can be usefull for component updates
     * if in that update form fields changes (for example checkbox advanced can be turned on/off)
     */
    this.rawValue = function(){
        return Object.assign({}, this.__value);
    };

    /**
     * logs current value to console
     */
    this.log = function() {
        console.log("--------dumping form data to log -------");
        console.log("Current value: ");
        console.log(this.__value);
        console.log("All fields: ");
        console.log(this.__allFields);
        console.log("Mandatory fields: ");
        console.log(this.__mandatoryFields);
        console.log("------END dumping form data to log ------");
    };

    /**
     * trims value to only registered fields
     */
    function _trim(value, fields) {
        var result = {};
        fields.forEach((f)=>{
            result[f] = value[f];
        });
        return result;
    }
}

export default FormData;
