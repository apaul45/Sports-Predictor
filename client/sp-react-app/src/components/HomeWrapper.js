import * as React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
export default function HomeWrapper(){
    //Set up HomeWrapper to contain the top title bar and the nav bar
    //Link element will allow for jumping betwen pages using routes established in App.js
    return(
        <div id= "Select"> 
        <h1>Sports Predictor</h1>
            <div id="tabs-open">
                <Button variant="contained">
                    <Link to='/about/'>
                        About
                    </Link> 
                </Button>            
                <Button variant="contained">
                    <Link to='/select/'>
                            Select a Sport
                    </Link> 
                </Button>
                <Button variant="contained">
                    <Link to='/how_done/'>
                        How It's Done
                    </Link> 
                </Button>
            </div>
       </div>
    )
}