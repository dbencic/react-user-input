/**
 * Keeps form data encapsulated and serves as a factory for change handlers.
 * Applies non null patern touroginal value so it is safe to do something like:
 * formData.original.myFIeldName
 * @param value value that will be rapresented by form (can be null)
 * @param listener for valuechanges, not mandatory, signature: (newValue, changedFieldName)
 */

function FormData(value = {}, changeListener = (newValue, changedFieldName)=>{}) {
    this.original = value;
    this.value = Object.assign({}, value);
    this.changeListener = changeListener;
    this.mandatoryFields = [];

    /**
     * returns change handler that wil update current value
     */
    this.changeHandler = function(fieldName) {
        return function(newFieldValue) {
            this.value[fieldName] = newFieldValue;
            this.changeListener(this.value, fieldName);
        }.bind(this);
    };

    this.field = function(fieldName, mandatory) {
        if (mandatory) {
            this.mandatoryFields.push(fieldName);
        }
        return {
            onChange: this.changeHandler(fieldName),
            value: this.value[fieldName],
            mandatory: mandatory
        };
    };

    /**
     * returns edited value, if value contains all required fields, else returns null
     * so null is sign that value in form is not edited correctly. Optionally verify parameter
     * can be passed as false, so this verification will be skipped and value will be returned as it is
     * @param verify 
     */
    this.getValue = function(verify = true) {
        for (let i=0; i<this.mandatoryFields.length && verify; i++) {
            if (!this.value[this.mandatoryFields[i]]) return null;
        }
        return this.value;
    };
}


export default FormData;