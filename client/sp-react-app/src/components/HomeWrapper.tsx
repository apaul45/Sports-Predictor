/*
  This component is used to display the name of the app 
  and the nav bar going to each screen 
*/
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

export default function HomeWrapper(){
    const navigate = useNavigate();
    const leftPic = "https://www.pngall.com/wp-content/uploads/2016/03/Basketball-PNG-Clipart.png";
    const rightPic = "https://images.vexels.com/media/users/3/202468/isolated/preview/43b5df3eae6ba10e91532d4402b692a4-american-football-ball-flat-icon-by-vexels.png";

    const StyledButton = styled(Button)({
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


    //Set up HomeWrapper to contain the top title bar and nav bar with buttons going to each page
    return(
        <div id= "Select"> 
						<h1>Sports Predictor</h1> <br/><br/>

						<div id="tabs-open">

							<StyledButton variant="contained" id="about"
							style={{left: "2px"}}
							onClick={()=>navigate("/about/")}>
									About
							</StyledButton>  

							<StyledButton variant="contained"
							style={{left: "12px"}}
							onClick={()=>navigate("/select/")}>
									Select a Sport
							</StyledButton>

							<StyledButton variant="contained" id="method"
							style={{left: "22px"}}
							onClick={()=>navigate("/how_done/")}>
								How It's Done
							</StyledButton>

							<img src={rightPic}
							width="110" height="110" id='footballImg'>
							</img>

							<img src={leftPic}
							width="110" height="110" id='bballImg'>
							</img>

					</div>

      </div>
    )
}