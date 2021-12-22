/*
    PredictionScreen is the component handling the choosing of prediction method 
    and creation of predictions
*/
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { useState } from 'react';
import ShorterMethod from './ShorterMethod';
import LongerMethod from './LongerMethod';
import {PredictionButton} from './StyledButtons';
export default function PredictionScreen(){
    /* radioValues is used to update the values checked off
       for each type of radio button */
    let radioValues = ["0health","0star","0fadrft"];

    const methodButtons = 
        <>
            <div className = "centering">
                <PredictionButton variant="contained" className="Button" 
                id="shorter"
                onClick={(event)=> methodHandler(event)}>
                    Shorter Method
                </PredictionButton>

                &nbsp; &nbsp; &nbsp;

                <PredictionButton variant="contained" className="Button" 
                id="longer"
                onClick={(event)=> methodHandler(event)}>
                    Longer Method
                </PredictionButton>
            </div>
            <div id="method-description" className='centering'>
                Shorter method requires much less inputted information, but 
                may produce results much slower than the longer method.
            </div>
        </>

    /* When the user clicks on a method type, method should be 
    changed to that method's inputs */
    const [method, setMethod] = useState(methodButtons);
    
    //The arrays below are used to create the radio buttons
    const playerRoleArray = ["Superstar", "Star", "All Star", "Role Player"];
    const teamStateArray = ["All Healthy", "Mostly Healthy", "Sometimes Healthy", "Rarely Healthy"];
    const futureStateArray = ["Amazing", "Good", "Decent", "Terrible"];

    //Both the shorter and longer method use the radio buttons below
    const radioForms:JSX.Element = 
        <>
            <FormLabel component="legend">
                <strong>How injured was this player's team last season?</strong> 
            </FormLabel>
            <RadioGroup
                row aria-label="healthy_radio"
                defaultValue="All Healthy"
                name="radio-buttons-group"
            >
                {
                    teamStateArray.map((role:string, index:number)=>
                        <FormControlLabel value={role} name="injury_state" 
                        onClick={()=> radioValues[0] = index+"health"}
                        control={<Radio />} label={role}/>
                    )
                }
            </RadioGroup><br/>

            <FormLabel component="legend">
                <strong>What is this player's role/ability?</strong>
            </FormLabel>
            <RadioGroup
                row aria-label="role_radio"
                defaultValue="Superstar"
                name="radio-buttons-group"
            >
                {
                    playerRoleArray.map((role, index)=>
                        <FormControlLabel value={role} name="player_state" 
                        onClick={()=> radioValues[1] = index+"star"}
                        control={<Radio />} label={role}/>
                    )
                }
            </RadioGroup><br/>

            <FormLabel component="legend">
                <strong>How was the player's team draft and/or free agency wise? </strong>
            </FormLabel>
            <RadioGroup
                row aria-label="fadraft_radio"
                defaultValue="Amazing"
                name="radio-buttons-group"
            >
                {
                    futureStateArray.map((role, index)=>
                    <FormControlLabel value={role} name="fadraft_state" 
                    onClick={()=> radioValues[2] = index+"fadrft"}
                    control={<Radio />} label={role}/>
                    )
                }
            </RadioGroup>
        </>;

    //Callback function for the submit event of each method forms
    const handleSubmit = (event: any, formObject: object)=>{
        event.preventDefault();
        console.log(formObject);
    }

    const methodHandler = (event: any)=>{
        const methodName = event.target.id;
        if(methodName === "shorter"){
            setMethod(<ShorterMethod radioButtons={radioForms} handleSubmit={handleSubmit}/>)
        }
        else if (methodName === "longer"){
            setMethod(<LongerMethod radioButtons={radioForms} handleSubmit={handleSubmit}/>);
        }
    }


    /*
        For every screen in the app, the screen-style css class
        is what gives each screen the same style (that is, the 
        style of the app).

        In order for this style to not interfere with the styling
        of elements in the screen itself, a outer div with the 
        child-screen-style class is required to override the properties 
        that should be exclusive to screen-style (padding)
    */
    return(
        <div className='screen-style'>
            <div className='child-screen-style'>
                <br/><br/><br/>
                {method}
            </div>
        </div>
    );
}