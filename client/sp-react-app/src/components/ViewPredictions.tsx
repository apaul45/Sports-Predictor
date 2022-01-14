import {List} from '@mui/material';
import {useAppSelector} from '../reduxHookTypes';
import PredictionCard from './PredictionCard';

export default function ViewPredictions(){
    let predictionList:Array<any> = useAppSelector((state) => state.predictions.data);

    return (
        <div className="screen-style">
            <div className="child-screen-style">
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
