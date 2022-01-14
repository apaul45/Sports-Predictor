import { useNavigate } from 'react-router-dom';
import { HomeScreenButton } from './StyledButtons';
export default function HomeScreen(){

    const navigate = useNavigate();

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
        <div id= "home-screen" className='screen-style'>
            <div className='child-screen-style'>
                <br/>
                
                <div className='centering'
                style={{fontSize: "30pt"}}>
                    Welcome!
                </div><br/>

                <div className="centering">
                    <HomeScreenButton variant="contained" className="Button" 
                    id="make-prediction"
                    onClick={() => navigate("/make-prediction/select/")}>
                        Make a prediction
                    </HomeScreenButton>
                </div><br/>

                <div className="centering">
                    <HomeScreenButton variant="contained" className="Button" 
                    id="view-predictions"
                    onClick={() => navigate("/home/view-predictions")}>
                        View all predictions
                    </HomeScreenButton>
                </div><br/>


                <div className="centering">
                    <HomeScreenButton variant="contained" className="Button" 
                    id="compare-predictions">
                        Compare predictions
                    </HomeScreenButton>
                </div>
            </div>
        </div>
    )
}