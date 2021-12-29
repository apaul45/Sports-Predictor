import { ListItem } from '@material-ui/core';
import { List } from '@mui/material';
import Player from '../classes/player-model';
import {useAppSelector} from '../reduxHookTypes';

export default function ViewPredictions(){

    const predictionList = useAppSelector((state) => state.predictions.data);

    return (
        <div className="screen-style">
            <div className="child-screen-style centering">
                <List>
                {
                    predictionList.map((prediction: Player) => 
                        <>
                            <ListItem>
                                {prediction.toString()}
                            </ListItem><br/>
                        </>
                    )
                }
                </List>
            </div>
        </div>
    )
}
