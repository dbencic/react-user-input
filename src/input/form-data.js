/**
 * Keeps form data encapsulated and serves as a factory for change handlers.
 * @param value value that will be rapresented by form (can be null)
 * @param listener for valuechanges, not mandatory, signature: (newValue, changedFieldName)
 */

function FormData(value = {}, changeListener = (newValue, changedFieldName)=>{}) {
    this.value = Object.assign({}, value);
    this.changeListener = changeListener;
    this.mandatoryFields = [];
    this.allFields = [];

    /**
     * returns change handler that wil update current value
     */
    this.changeHandler = function(fieldName) {
        return function(newFieldValue){
            if (this.value[fieldName] != newFieldValue) {
                this.value[fieldName] = newFieldValue;
                this.changeListener(this.value, fieldName);
            }
        }.bind(this);
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
            this.mandatoryFields.push(fieldName);
        }
        this.allFields.push(fieldName);

        return {
            onChange: this.changeHandler(fieldName),
            value: this.value[fieldName],
            mandatory: mandatory
        };
    };

    /**
     * returns edited value, if value contains all required fields, else returns null
     * so null is sign that value in form is not edited correctly.
     * Returned value will contain only fields declared in form!
     */
    this.getValue = function() {
        for (let i=0; i<this.mandatoryFields.length; i++) {
            if (!this.value[this.mandatoryFields[i]]) {
                // console.log("value for mandatory field %s not found", this.mandatoryFields[i]);
                return null;
            };
        }
        return _trim(this.value, this.allFields);
    };

    /**
     * returns current value, regardless if value is valid or not and regardless of formFields
     * This can be usefull for component updates
     * if in that update form fields changes (for example checkbox advanced can be turned on/off)
     */
    this.rawValue = function(){
        return Object.assign({}, this.value);
    };

    /**
     * logs current value to console
     */
    this.log = function() {
        console.log("--------dumping form data to log -------");
        console.log("Current value: ");
        console.log(this.value);
        console.log("All fields: ");
        console.log(this.allFields);
        console.log("Mandatory fields: ");
        console.log(this.mandatoryFields);
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
