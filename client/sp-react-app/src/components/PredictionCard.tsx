import {Card, CardContent, IconButton, styled,} from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {useAppDispatch} from '../reduxHookTypes';
import {DELETE_PREDICTION} from "../GraphQL/Mutations";
import {deletePrediction, fetchPredictions} from "../slices/prediction";

const PredictionCard = ({prediction} : any) => {

    const dispatch = useAppDispatch();

    const StyledCard = styled(Card)({
        maxWidth: '28%',
        height: '20%',
        backgroundColor: "white",
        borderRadius:"2px", 
        justifyContent: "space-between"
    });

    return (
        <StyledCard variant="outlined">
            <CardContent>
                <div className="centering prediction-card">
                    {prediction.stats.name + ", " + prediction.stats.team}
                    <IconButton
                    onClick={() => dispatch(fetchPredictions(deletePrediction, DELETE_PREDICTION, {id:prediction._id}))}>
                        <DeleteOutlineOutlinedIcon>    
                        </DeleteOutlineOutlinedIcon>
                    </IconButton>
                </div>

                <br/>
                    {
                        Object.entries(prediction.stats)
                        .filter((entry) => entry[0] !== "name" && entry[0]!=="team")
                        .map(entry => 
                            <>
                                <div className="centering"
                                style={{fontSize: "20pt"}}>
                                {entry[1] + " " + entry[0] + " "}
                                </div>
                            </>
                        )
                    }
            </CardContent>
        </StyledCard>
    );
}

export default PredictionCard;
