import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import * as React from 'react';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
export default function BasketballScreen(){
    const { store } = useContext(GlobalStoreContext);
    //State variable below is used to allow for the proper form to render
    const [method, setMethod] = useState("");
    const playerRoleArray = ["Superstar", "Star", "All Star", "Role Player"];
    const teamStateArray = ["All Healthy", "Mostly Healthy", "Sometimes Healthy", "Rarely Healthy"];
    const futureStateArray = ["Amazing", "Good", "Decent", "Terrible"];
    //Radio forms is used in both methods, so make it a variable that can be added to jsx of either elements
    function changeCheck(param){

    }
    //Both the shorter and longer method contain the radio buttons below
    const radioForms = 
    <div>
        <FormLabel component="legend">
            How injured was this player's team last season? 
            (<u style="color: blue;">Answer for player's current team</u>)
        </FormLabel>
        <RadioGroup
            row aria-label="healthy_radio"
            defaultValue="Sometimes Healthy"
            name="radio-buttons-group"
        >
            {
                teamStateArray.map((role, index)=>
                    <FormControlLabel value={role} name="injury_state" onClick={changeCheck(index+"health")}
                    control={<Radio />}/>
                )
            }
        </RadioGroup><br/>

        <FormLabel component="legend">
            <strong>What is this player's role/ability?</strong>
        </FormLabel>
        <RadioGroup
            row aria-label="role_radio"
            defaultValue="Role Player"
            name="radio-buttons-group"
        >
            {
                playerRoleArray.map((role, index)=>
                    <FormControlLabel value={role} name="player_state" onClick={changeCheck(index+"star")}
                    control={<Radio />}/>
                )
            }
        </RadioGroup><br/>

        <FormLabel component="legend">
            <strong>How was the player's team draft and/or free agency wise? (<u style="color: blue;">Answer for player's current team</u>)</strong>
        </FormLabel>
        <RadioGroup
            row aria-label="fadraft_radio"
            defaultValue="Decent"
            name="radio-buttons-group"
        >
            {
                futureStateArray.map((role, index)=>
                <FormControlLabel value={role} name="fadraft_state" onClick={changeCheck(index+"fadrft")}
                control={<Radio />}/>
                )
            }
        </RadioGroup>
    </div>;
    function openMethod(method){
        //Configure a state variable that re-renders when a new method is chosen
        //^this will decide which jsx element to return that displays the respective form
        if (method==="shorter"){
            
        }
    }
    return(
        <>
            <Button variant="contained" className="method-list" 
            id="shorter" onClick={openMethod("shorter")}>
                <strong><u>Shorter Method</u></strong>:
                Requires less information to be entered but takes longer and/or doesn't produce any results at all
            </Button>

            <Button variant="contained" className="method-list" 
            id="longer" onClick={openMethod("longer")}>
                <strong><u>Longer Method </u></strong>
                Requires more information to be entered but produces quicker results
            </Button>
        </>
    )
}