import { Container, FormControl, Box, Grid, InputLabel, TextField, Button, LinearProgress } from "@mui/material";
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
        name: "", team: ""
    };
    const [formObject, setFormObject] = useState(initObject);

    /*
        This string variable helps to tell what to display in place of the submit button:
        if submit is clicked, the button turns into a loading animation, and then into a 
        div that notifies the user that their prediction was successful 
    */
    const initDisplay:JSX.Element = <Button type="submit"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    >
                                        Enter
                                    </Button>;
    const [display, setDisplay] = useState(initDisplay);
    
    //See above explanation on index signatures
    const handleChange = (attribute: string, event:any) => {
        formObject[attribute] = event.target.value;
        setFormObject(formObject);
    }

    const submitHandler = (event:any) => {
        event.preventDefault();

        //Allow for the loading animatin to appear in place of the submit button
        setDisplay(<Box sx={{ width: '100%' }}>
                        <LinearProgress />
                  </Box>);

        /* 
           The handleSubmit callback in PredictionScreen will handle 
           checking, creating, and adding a prediction. It will then set the display 
           to a div notifying the user that their prediction was successfully created.

           NOTE: It is NECESSARY for handleSubmit to set this because it is an async function. 
           That means trying to return a jsx element to set display to will be more complicated
           due to the async await logic in js (handling Promises)
        */
        handleSubmit(formObject, setDisplay);

        //Reset the display back to the submit button after 5 seconds
        window.setTimeout(function(){setDisplay(initDisplay)}, 5000);
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

       In this case, the xs is 2 to allow for 2 columns with 1 item
       in each row
    */
    const textfields = array.map(entry => 
        <Grid item xs={2.0}>
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
            onSubmit={(event: any)=>submitHandler(event)}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
                <Grid container spacing={2}
                  direction="row"
                  alignItems="center"
                  justifyContent="center">
                    {textfields}
                </Grid>

                <br/>

                <FormControl
                style={{marginTop: 48}}>
                    {radioButtons}
                </FormControl>
                <br/>
                {display}
            </Box>
        </Container>
    );
}

export default ShorterMethod;