import {Card, CardContent, Grid, IconButton, styled,} from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {useAppDispatch} from '../reduxHookTypes';
import {DELETE_PREDICTION} from "../GraphQL/Mutations";
import {deletePrediction, fetchPredictions} from "../slices/prediction";

const PredictionCard = ({prediction} : any) => {

    const dispatch = useAppDispatch();

    const StyledCard = styled(Card)({
        maxWidth: '100%',
        height: '10%',
        backgroundColor: "white",
        borderRadius:"2px", 
        justifyContent: "space-between"
    });

    /* 
       A MUI grid can be used to control how 
       many inputs are grouped together: the xs (or sm)
       attribute allows for controlling how much space an
       item takes up in terms of its width. The max value is 12, 
       which means an xs of 6 would allow for 2 columns

       In this case, the xs is 3 to allow for 4 columns
    */
    return (
        <Grid item xs={3.0}>
            <StyledCard variant="outlined">
                <CardContent>
                    <div className="centering prediction-card">

                        {prediction.stats.name + ", " + prediction.stats.team}

                        <IconButton
                        onClick={() => dispatch(fetchPredictions(deletePrediction, DELETE_PREDICTION, {id:prediction._id}))}>
                            <DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>
                        </IconButton>

                    </div>

                    <br/>
                    {
                        Object.entries(prediction.stats)
                        .filter((entry) => entry[0] !== "name" && entry[0]!=="team")
                        .map(entry => 
                            <div className="centering"
                            style={{fontSize: "20pt"}}>
                                {entry[1] + " " + entry[0] + " "}
                            </div>
                        )
                    }
                </CardContent>
            </StyledCard>
        </Grid>
    );
}

export default PredictionCard;
