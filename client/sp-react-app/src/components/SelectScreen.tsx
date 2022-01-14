/*
    SelectScreen is used to display the two sports the user 
    can select from to make a prediction
    (only has option for basketball currently)
*/
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
export default function SelectScreen(){
    const navigate = useNavigate();
    return(
        <div className='screen-style'>
            
            <Button variant="outlined"
            onClick={() => navigate("/home/")}
            style={{position: "absolute", left:"6.5%", bottom:"76.6%    ????????????????????"}}>
                <ArrowBackIcon/>
                Back
            </Button>

            <button id="bball" className = "currentSports child-screen-style"
            onClick={()=>navigate("/make-prediction")}>
                <div id = "bballContainer">
                    <strong>Basketball</strong>
                </div>
            </button>
        </div>
        
    )
}