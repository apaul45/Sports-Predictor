import { useContext, useState } from 'react'
import { GlobalStoreContext} from '../store'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
export default function BasketballScreen(){
    //The state variable below will be updated everytime a prediction is made
    const [method, setMethod] = useState("");


    const navigate = useNavigate();


    
    const BootstrapButton = styled(Button)({
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: "30pt",
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: 'white',
        color:"black",
        width:"30%",
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

    

    /* clickHandler identifies which event was clicked on, and 
    goes to the appropriate screen */
    const clickHandler = (event: any)=>{
        console.log(event.target.id);
        switch(event.target.id){
            case("make-prediction"):{
                navigate("/bball/make-prediction");
                break;
            }
            case('view-predictions'):{
                break;
            }
            case('view-your-predictions'):{
                break;
            }
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
        <div id= "basketball-screen" className='screen-style'>
            <div className='child-screen-style'>
                <br/>
                <div className='centering'
                style={{fontSize: "30pt"}}>
                    Welcome JJ!
                </div><br/>

                <div className="centering">
                    <BootstrapButton variant="contained" className="Button" 
                    id="make-prediction"
                    onClick={(event) => clickHandler(event)}>
                        Make a prediction
                    </BootstrapButton>
                </div><br/>

                <div className="centering">
                    <BootstrapButton variant="contained" className="Button" 
                    id="view-predictions"
                    onClick={(event) => clickHandler(event)}>
                        View all predictions
                    </BootstrapButton>
                </div><br/>

                <div className="centering">
                    <BootstrapButton variant="contained" className="Button" 
                    id="view-user-predictions"
                    onClick={(event) => clickHandler(event)}>
                        View your predictions
                    </BootstrapButton>
                </div>
            </div>
        </div>
    )
}