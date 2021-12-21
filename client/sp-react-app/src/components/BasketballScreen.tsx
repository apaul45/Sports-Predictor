import { useContext, useState } from 'react'
import { GlobalStoreContext} from '../store'
import * as React from 'react';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { styled } from '@mui/material/styles';
export default function BasketballScreen(){
    //The state variable below will be updated everytime a prediction is made
    const [method, setMethod] = useState("");

    //The arrays below are used to create the radio buttons
    const playerRoleArray = ["Superstar", "Star", "All Star", "Role Player"];
    const teamStateArray = ["All Healthy", "Mostly Healthy", "Sometimes Healthy", "Rarely Healthy"];
    const futureStateArray = ["Amazing", "Good", "Decent", "Terrible"];

    //Radio forms is used in both methods, so make it a variable that can be added to jsx of either elements
    function changeCheck(this: any, param : string){
        console.log(param);
    }

    //Both the shorter and longer method contain the radio buttons below
    const radioForms = 
                <>
                    <FormLabel component="legend">
                        <strong>How injured was this player's team last season?</strong> 
                    </FormLabel>
                    <RadioGroup
                        row aria-label="healthy_radio"
                        defaultValue="Sometimes Healthy"
                        name="radio-buttons-group"
                    >
                        {
                            teamStateArray.map((role:string, index:number)=>
                                <FormControlLabel value={role} name="injury_state" 
                                onClick={()=>changeCheck(index+"health")}
                                control={<Radio />} label={role}/>
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
                                <FormControlLabel value={role} name="player_state" 
                                onClick={()=>changeCheck(index+"star")}
                                control={<Radio />} label={role}/>
                            )
                        }
                    </RadioGroup><br/>

                    <FormLabel component="legend">
                        <strong>How was the player's team draft and/or free agency wise? </strong>
                    </FormLabel>
                    <RadioGroup
                        row aria-label="fadraft_radio"
                        defaultValue="Decent"
                        name="radio-buttons-group"
                    >
                        {
                            futureStateArray.map((role, index)=>
                            <FormControlLabel value={role} name="fadraft_state" 
                            onClick={()=>changeCheck(index+"fadrft")}
                            control={<Radio />} label={role}/>
                            )
                        }
                    </RadioGroup>
                </>;

    
    const BootstrapButton = styled(Button)({
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: "30pt",
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: 'white',
        color:"black",
        width:"55%",
        borderColor: '#0063cc',
        '&:hover': {
          backgroundColor: 'black',
          color: "white",
          borderColor: '#0062cc',
          boxShadow: 'none',
        },
        '&:active': {
          boxShadow: 'none',
          backgroundColor: '#0062cc',
          borderColor: '#005cbf',
        },
        '&:focus': {
          boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
      });


    
    return(
        <div id= "basketball-screen" className='screen-style'>
            <div className='child-screen-style'>
                <br/>
                <div className='centering'
                style={{fontSize: "30pt"}}>
                    Welcome JJ!
                </div><br/>

                <div className="centering">
                    <BootstrapButton variant="contained" className="Button" 
                    id="shorter">
                        Make a prediction
                    </BootstrapButton>
                </div><br/>

                <div className="centering">
                    <BootstrapButton variant="contained" className="Button" 
                    id="shorter">
                        View all predictions
                    </BootstrapButton>
                </div>
            </div>
        </div>
    )
}