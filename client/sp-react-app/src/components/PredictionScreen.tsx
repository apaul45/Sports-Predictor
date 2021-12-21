/*
    PredictionScreen is the component representing the screen
    where users can make predictions
*/
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
export default function PredictionScreen(){

    //The arrays below are used to create the radio buttons
    const playerRoleArray = ["Superstar", "Star", "All Star", "Role Player"];
    const teamStateArray = ["All Healthy", "Mostly Healthy", "Sometimes Healthy", "Rarely Healthy"];
    const futureStateArray = ["Amazing", "Good", "Decent", "Terrible"];

    //Both the shorter and longer method use the radio buttons below
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

    //Radio forms is used in both methods, so make it a variable that can be added to jsx of either elements
    const changeCheck = (param : string)=>{
        console.log(param);
    }

    const StyledButton = styled(Button)({
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: "50pt",
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: 'white',
        color:"black",
        width:"20%",
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
                <br/>
                <div className="centering">
                    <StyledButton variant="contained" className="Button" 
                            id="shorter">
                        Shorter Method
                        
                    </StyledButton>
                    &nbsp; &nbsp; &nbsp;
                    <StyledButton variant="contained" className="Button" 
                            id="longer">
                        Longer Method
                    </StyledButton>
                </div>
            </div>
        </div>
    );
}