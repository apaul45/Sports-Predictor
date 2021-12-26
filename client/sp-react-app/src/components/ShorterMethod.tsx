/*
    In order to pass in props to a component, 
    a interface can be defined and then destructured
    to get the necessary props
*/

import { Container, FormControl, Box, Grid, InputLabel, TextField, Button } from "@mui/material";
import { useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
/*
    In order to pass in props to a component in typescript, 
    a interface can be defined and then destructured
    to get the necessary props
*/
import Props from './PredictionScreen'
function ShorterMethod({radioButtons, handleSubmit, methodCallback} : Props){
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
        name: "", age: 0, team: ""
    };
    const [formObject, setFormObject] = useState(initObject);
    
    //See above explanation on index signatures
    const handleChange = (attribute: string, event:any) => {
        formObject[attribute] = event.target.value;
        setFormObject(formObject);
        console.log(formObject[attribute])
    }

    //Object.entries() can be used to get an array with each keyname pair as an array
    const array = Object.entries(formObject);
    /* 
        A MUI grid can be used to control how 
       many inputs are grouped together: the xs (or sm)
       attribute allows for controlling how much space an
       item takes up in terms of its width. The max value is 12, 
       which means an xs of 6 would allow for 6 columns
       with 2 in each row. 

       In this case, the xs is 3 to allow for 3 columns with 1 item
       in each row
    */
    const textfields = array.map(entry => 
        <Grid item xs={4.0}>
            <InputLabel>
                Enter the player's {entry[0]}
            </InputLabel>
            <TextField 
            name={entry[0]}
            required
            label={entry[0]}
            autoFocus
            onChange={(event) => handleChange(entry[0], event)}
            />
        </Grid>
    );
    return(
        <Container component="main">

            <Button variant="outlined"
            onClick={() => methodCallback()}>
                <ArrowBackIcon/>
                Back
            </Button>

            <br/><br/>

            <Box component="form" 
            onSubmit={(event: any)=>handleSubmit(event, formObject)}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
                <Grid container spacing={29}>
                    {textfields}
                </Grid>

                <br/>

                <FormControl
                style={{marginTop: 48}}>
                    {radioButtons}
                </FormControl>

                <br/>

                <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                    Enter
                </Button>
            </Box>
        </Container>
    );
}

export default ShorterMethod;