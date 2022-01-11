import { ListItem } from '@material-ui/core';
import { List } from '@mui/material';
import {useAppSelector} from '../reduxHookTypes';

export default function ViewPredictions(){
    let predictionList:Array<any> = useAppSelector((state) => state.predictions.data);

    return (
        <div className="screen-style">
            <div className="child-screen-style centering">
                <List>
                {
                    predictionList.map((prediction: any) => 
                        <>
                            <ListItem>
                                {prediction.stats.name}
                            </ListItem><br/>
                        </>
                    )
                }
                </List>
            </div>
        </div>
    )
}
