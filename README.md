#React form utilities

**I've built this for my personal use so it is not well documented neither polished in sense of generic use.**
**Depends on bootstrap.css**

General idea is to manage input validation for various types of input: data conversion, plus handling changes and populating values. Suports input format and value validation. It has 2 main components:

- inputs: input components like textbox, or select box
- parsers: functions that takes text as an argument (text comes from input element) and than parses this text into correct data format, ex int, or float. If data is not parsable should return parsers.nonParsableValue

NOTE: I havent built all imput components, just the ones I've needed this far



##Example usage

```
#!javascript
import {input, parsers, FormGroup} from "react-user-input";

var formData = new input.FormData(value, (value, field)=>{
    console.log("Value changed for field: %s, new value is:", field);
    console.log(value);
});
var widget = <FormGroup label="Select box demo">
                <input.Select options={{"": "---", 1: "One", 2: "Two"}}
                    valueParser={parsers.int} {...formData.field("select", true)}/>
            </FormGroup>;
React.render(widget, document.getElementById("container"));
```

For sample code take a look at <a href="https://github.com/dbencic/react-user-input/blob/master/demo.js">Demo sample</a></p>. 
