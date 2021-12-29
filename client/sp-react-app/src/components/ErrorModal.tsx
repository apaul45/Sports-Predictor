import { Alert, Box, Button, Modal, Stack, styled } from "@mui/material"
import { style } from "@mui/system"
import { error } from "console"
import { useAppDispatch, useAppSelector } from "../reduxHookTypes";
import { setError } from "../slices/prediction";

/*
    This component will be used to display any errors 
    a user makes when navigating the site
*/

const ErrorModal = () => {
    const errorMessage = useAppSelector((state) => state.predictions.errorMessage);
    const setMessage = useAppDispatch();
    
    const handleCloseError = () => {
        setMessage(setError(""));
    }

    /* 
        The line "as const" must be added in order for the sx prop 
        of the Box component to take in the style below 

        More info: https://mui.com/system/the-sx-prop/
    */
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      } as const;

    return (
        <div>
            <Modal
            open={errorMessage ? true : false}
            onClose={handleCloseError}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert severity="error">
                            {errorMessage}
                        </Alert>
                    </Stack>
                    <Button id="dialog-ok-button"
                    className =  "modal-button"
                    onClick={handleCloseError}>
                        OK
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}

export default ErrorModal
