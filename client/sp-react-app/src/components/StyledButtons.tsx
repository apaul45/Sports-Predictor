/*
    This file serves as a singleton for all styled buttons in 
    the application. 
*/

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const PredictionButton = styled(Button)({
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: "50pt",
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: 'white',
        color:"black",
        width:"20%",
        borderColor: '#0063cc',
        '&:hover': {
            backgroundColor: 'black',
            color: "white",
            borderColor: '#0062cc',
            boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#0062cc',
            borderColor: '#005cbf',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    });

const HomeScreenButton = styled(Button)({
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: "30pt",
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: 'white',
        color:"black",
        width:"30%",
        borderColor: '#0063cc',
        '&:hover': {
          backgroundColor: 'black',
          color: "white",
          borderColor: '#0062cc',
          boxShadow: 'none',
        },
        '&:active': {
          boxShadow: 'none',
          backgroundColor: '#0062cc',
          borderColor: '#005cbf',
        },
        '&:focus': {
          boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    });

const HomeWrapperButton= styled(Button)({
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        border: '1px solid',
        lineHeight: 1.5,
		backgroundColor: "#C4C4C4",
        color: 'black',
        borderColor: '#0063cc',
		position: "relative",
        '&:hover': {
          backgroundColor: '#0069d9',
		  color:"white",
          borderColor: '#0062cc',
          boxShadow: 'none',
        },
        '&:active': {
          boxShadow: 'none',
          backgroundColor: '#0062cc',
          borderColor: '#005cbf',
        },
        '&:focus': {
          boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    });
export{
    PredictionButton,
    HomeScreenButton,
    HomeWrapperButton
};