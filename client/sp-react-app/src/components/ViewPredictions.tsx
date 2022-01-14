import {List, TextField} from '@mui/material';
import {useAppSelector, useAppDispatch} from '../reduxHookTypes';
import PredictionCard from './PredictionCard';
import {setSearchField} from '../slices/prediction';

export default function ViewPredictions(){
   
    let predictionList:Array<any> = useAppSelector((state) => state.predictions.data);
    let searchField = useAppSelector((state) => state.predictions.searchField);
    let dispatch = useAppDispatch();

    const handleTextChange = (event:any)=>{
        dispatch(setSearchField(event.target.value));
    }

    if (searchField){
        predictionList = predictionList.filter((prediction) => 
        prediction.stats.name.toLowerCase() === searchField.toLowerCase());
    }

    return (
        <div className="screen-style">
            <div className="child-screen-style">

                <div className="centering">
                    <TextField onChange={(event) => handleTextChange(event)}
                    label="Enter player name">
                    </TextField>
                </div>

                <List style={{maxHeight: '70%', overflow: 'auto'}}  
                sx={{ width: '96.8%', left: '35%'}}>
                {
                    predictionList.map((prediction: any) => 
                        <PredictionCard prediction={prediction} />
                    )
                }
                </List>

            </div>
        </div>
    )
}
