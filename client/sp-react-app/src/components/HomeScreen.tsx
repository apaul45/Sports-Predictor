import { useNavigate } from 'react-router-dom';
import { HomeScreenButton } from './StyledButtons';
//useSelector allows for retrieving data from a state (used for redux)
import {useAppSelector, useAppDispatch} from '../reduxHookTypes'
export default function HomeScreen(){
    /*
      In order to access data from a slice in the redux store while using typescript, 
      a few things have to happen: 

      1. The types for the RootState and Dispath have to be defined and exported 
      2. When using a hook such as useSelector, the state has to be explicitly defined as type RootState (state:RootState)
      3. For the slice itself, the values in its state have to be explicitly typed (ie, a interface 
      must be created for them). In order to be extracted in React components. 

      Step 2 can be skipped if a file containing 
      type definitions for hook types is created
    */
    const user = useAppSelector(state => state.auth.value);

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
                    Welcome {user.username}!
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
                    id="view-user-predictions">
                        View your predictions
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