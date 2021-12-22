/*
    In order to pass in props to a component, 
    a interface can be defined and then destructured
    to get the necessary props
*/

import { FormControl } from "@mui/material";

interface RadioButtons{
    radioButtons : JSX.Element;
}
function ShorterMethod({radioButtons} : RadioButtons){
    return(
        <div className="centering">
            <FormControl>
                {radioButtons}
            </FormControl>
        </div>
    );
}

export default ShorterMethod;