import { Box, Button, FormControl, Input, InputLabel, TextField } from "@mui/material";
import { useState } from "react";

interface RadioButtons{
    radioButtons : JSX.Element;
}

function LongerMethod({radioButtons} : RadioButtons){
    /*
        In TypeScript, an index signature (using a string value to access a value in a 
        object) requires two things in this case. First, the object itself must have
        its type explicitly defined (in this case, {[key: string]: any}). Then, 
        the key itself must be explicitly defined as a string in this case (attribute: string).
        This goes back to the idea that a value in a js object can be accessed in two ways:
        either object.key or object["key"]

        https://stackoverflow.com/questions/55831886/typescript-an-index-signature-parameter-must-be-a-string-or-number-when-try
    */
    const initObject:{[key: string]: any} = {
        name: "", age: 0, gp: 0, team: "", ppg: 0.0, 
        rpg: 0.0, apg: 0.0, spg: 0.0, bpg: 0.0
    };
    /* 
        formObject is used to update values in the textfields whenever they change
        It gets sent in a callback function to the PredictionScreen, to be processed
        along with the radioValue array in the store 
    */
    const [formObject, setFormObject] = useState(initObject);

    const handleChange = (attribute: string, event:any) => {
        formObject[attribute] = event.target.value;
        setFormObject(formObject);
        console.log(formObject[attribute])
    }

    //Object.entries() can be used to get an array with each keyname pair as an array
    const array = Object.entries(formObject);
    const textfields = array.map(entry => 
        <>
            <InputLabel>
                Enter the player's {entry[0]}
            </InputLabel>
            <TextField 
            defaultValue={entry[1]}
            onChange={(event) => handleChange(entry[0], event)}
            /><br/>
        </>
    );
    return(
        <div className="centering">
            <form>
                <br/>
                {textfields}
                <FormControl>
                    {radioButtons}
                </FormControl>
                <br/>
                <Button type="submit"
                onClick={()=>console.log(1)}>
                    Submit
                </Button>
            </form>
        </div>
    );
}
export default LongerMethod;