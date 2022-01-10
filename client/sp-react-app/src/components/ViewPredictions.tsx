import { useQuery } from '@apollo/client';
import { ListItem } from '@material-ui/core';
import { List } from '@mui/material';
import { useEffect, useState } from 'react';
import Player from '../classes/player-model';
import {GET_ALL_PREDICTIONS} from '../GraphQL/Queries';
export default function ViewPredictions(){

    const { error, loading, data } = useQuery(GET_ALL_PREDICTIONS);
    const [predictions, setPredictions] = useState([]);
    useEffect(() => {
      if (data) {
        setPredictions(data.getAllPredictions);
      }
    }, [data]);
    return (
        <div className="screen-style">
            <div className="child-screen-style centering">
                <List>
                {
                    predictions.map((prediction: any) => 
                        <>
                            <ListItem>
                                {prediction.stats.ppg}
                            </ListItem><br/>
                        </>
                    )
                }
                </List>
            </div>
        </div>
    )
}
