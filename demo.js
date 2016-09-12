// import {parsers, inline, input} from "./index";
import input from "./src/input";
import inline from "./src/inline";
import parsers from "./src/parsers";
import {FormGroup} from "./src/form";
import React from "react";
import ReactDOM from "react-dom";
import numeral from "numeral";
import moment from "moment";

/*
	<FormGroup label="INLINE Select box demo">
				<inline.Select options={{"": "---", 1: "Jedan", 2: "Dva"}} valueParser={parsers.int} value={1} 
					onChange={(value)=>console.log("new InlineSelect Select value is: " + value)} mandatory={true}
						displayModeClassName="btn btn-default"/>
			</FormGroup>
*/
var value = {
    select: 2,
    selectDisabled: 2,
    labelWithClick: "Some readonly value with click attached",
    label: "Readonly Label demo",
    preformatted: "Some readonly preformatted value\nText in new line",
    selecto: "tri",
    textboxWithNumber: 9,
    datevalue: new Date()
};

var formData = new input.FormData(value, (v, f)=>{
    console.log("Value changed for field: %s, new value is:", f);
    console.log(v);
});

var widget = (<form className="form">
			<FormGroup label="Select box demo">
				<input.Select options={{"": "---", 1: "Jedan", 2: "Dva"}}
                    valueParser={parsers.int} {...formData.field("select", true)}/>
			</FormGroup>
			<FormGroup label="DISABLED Select box demo">
				<input.Select options={{"": "---", 1: "Jedan", 2: "Dva"}} valueParser={parsers.int}
					{...formData.field("selectDisabled", true)} disabled={true}/>
			</FormGroup>
			<FormGroup label="Readonly Label with click demo">
				<input.Label value={value.labelWithClick} 
					onClick={()=>console.log("readonly value clicked!")} styleName="btn btn-info"/>
			</FormGroup>
			<FormGroup label="Readonly Label demo">
				<input.Label value={value.label} />
			</FormGroup>
			<FormGroup label="Readonly preformatted Label demo">
				<input.Label value={value.preformatted} preformatted={true} 
                    onClick={()=>console.log("Preformatted value clicked!")}/>
			</FormGroup>
			<FormGroup label="SelectO box demo">
				<input.Selecto options={{"": "---", "jedan": "Jedan", "dva": "Dva"}} moreOptions={{"tri": "Tri", "cetiri": "Četiri"}} 
					valueParser={parsers.raw} {...formData.field("selecto", true)} moreOptionsLabel="Napredno"/>
			</FormGroup>
			<FormGroup label="DatePicker monent value demo">
				<input.DatePicker {...formData.field("date", true)} />
			</FormGroup>
            <FormGroup label="DatePicker date value demo">
                <input.DatePicker {...formData.field("datevalue", true)} />
            </FormGroup>
			<FormGroup label="text box with number demo">
				<input.TextBox valueParser={parsers.int} {...formData.field("textboxWithNumber", true)} />
			</FormGroup>
			<FormGroup label="text box with email demo">
				<input.TextBox valueParser={parsers.email} {...formData.field("textboxWithEmail", true)} />
			</FormGroup>
			<FormGroup label="text area demo">
				<input.TextArea valueParser={parsers.raw} {...formData.field("texarea", true)}  rows={4} />
			</FormGroup>
		  <button type="button" className="btn btn-primary" onClick={()=>console.log("formData.getValue()", formData.getValue())}>Submit form</button>
		</form>
);


//<FormBootstrapItem label="Text area demo" name="textarea">
//    <input.TextArea valueParser={parsers.raw} mandatory={true}  rows={4} />
//</FormBootstrapItem>

ReactDOM.render(widget, document.getElementById("container"));





