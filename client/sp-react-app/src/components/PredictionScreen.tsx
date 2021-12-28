/*
    PredictionScreen is the component handling the choosing of prediction method 
    and calculation of new predictions
*/
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { useState } from 'react';
import ShorterMethod from './ShorterMethod';
import LongerMethod from './LongerMethod';
import {PredictionButton} from './StyledButtons';
import {useNavigate} from 'react-router-dom';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Player from '../classes/player-model';
import playerGraph from '../classes/player-graph';

//This interface defines the types of props passed into the
//shorter method and longer method components
export default interface Props{
    radioButtons : JSX.Element;
    handleSubmit: Function;
    methodCallback: Function;
}

//The arrays below are used to create the radio buttons
const playerRoleArray = ["Superstar", "Star", "All Star", "Role Player"];
const teamStateArray = ["All Healthy", "Mostly Healthy", "Sometimes Healthy", "Rarely Healthy"];
const futureStateArray = ["Amazing", "Good", "Decent", "Terrible"];

const teamArray = ["Contender", "Playoffs", "Almost Playoff", "Lottery"];

//Along with the 3 arrays above, the two below are used to calculate the total graph weight
const startingWeights = [[-.2, .1, .7, 1.5], [-.65, -.8, -1, -2.5], [-1.2, -.75, .35, 1]];
const subtractValues = [[0,-.3,-.8,-1.5], [0, -2,-3,-3.55], [0,-.45,-.6,-1.5]];

/* radioValues is used to update the values checked off
for each type of radio button 
*/
let radioValues = {health: "0", player_role: "Superstar", fadrft: "0"};

let newGraph = new playerGraph(12);
newGraph.constructGraph(playerRoleArray, teamArray, teamStateArray, 
                futureStateArray, startingWeights, subtractValues)

export default function PredictionScreen(){
    const navigate = useNavigate();

    const methodButtons = 
        <>
            <Button
            onClick={() => navigate("/make-prediction/select")}
            variant="outlined"
            style={{position: "absolute", left:"6.5%"}}>
                <ArrowBackIcon/>
                Back
            </Button>

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
                        onClick={()=> radioValues.health = String(index)}
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
                    playerRoleArray.map((role)=>
                        <FormControlLabel value={role} name="player_state" 
                        onClick={()=> radioValues.player_role = role}
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
                    onClick={()=> radioValues.fadrft = String(index)}
                    control={<Radio />} label={role}/>
                    )
                }
            </RadioGroup>
        </>;

    //Callback function for the submit event of each method forms-- handles prediction calculation
    //Make sure it is async so that data can be synchronously fetched from api for shorter method 
     async function handleSubmit(event: any, formObject: object){
        event.preventDefault();
        let newPlayer = new Player(formObject);

        /* If shorter method, then this.info must be updated to
           data fetched from the NBA stats api */
        if (!("gp" in formObject)) {
            await newPlayer.fetchStats(formObject);
            console.log(newPlayer.getInfo());
        }
        newPlayer.predictionCalculator(radioValues, newGraph);
        console.log(newPlayer.getInfo());
    }
    //returnToPage is used when the user clicks back on one of the 
    //method screens
    const returnToPage = () => {
        setMethod(methodButtons);
    }
    const methodHandler = (event: any)=>{
        const methodName = event.target.id;
        if(methodName === "shorter"){
            setMethod(<ShorterMethod radioButtons={radioForms} handleSubmit={handleSubmit}
            methodCallback={returnToPage}/>)
        }
        else if (methodName === "longer"){
            setMethod(<LongerMethod radioButtons={radioForms} handleSubmit={handleSubmit}
                methodCallback={returnToPage}/>);
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