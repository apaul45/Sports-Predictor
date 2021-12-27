/*
  This component is used to display the name of the app 
  and the nav bar going to each screen 
*/
import { useNavigate } from 'react-router-dom';
import { HomeWrapperButton } from './StyledButtons';

export default function HomeWrapper(){
    const navigate = useNavigate();
    const leftPic = "https://www.pngall.com/wp-content/uploads/2016/03/Basketball-PNG-Clipart.png";
    const rightPic = "https://images.vexels.com/media/users/3/202468/isolated/preview/43b5df3eae6ba10e91532d4402b692a4-american-football-ball-flat-icon-by-vexels.png";


    //Set up HomeWrapper to contain the top title bar and nav bar with buttons going to each page
    return(
        <div id= "Select"> 
			<h1>Sports Predictor</h1> <br/><br/>

			<div id="tabs-open">
				<HomeWrapperButton variant="contained" id="about"
				style={{left: "2px"}}
				onClick={()=>navigate("/about/")}>
						About
				</HomeWrapperButton>  

				<HomeWrapperButton variant="contained"
				style={{left: "12px"}}
				onClick={()=>navigate("/home/")}>
						Home
				</HomeWrapperButton>

				<HomeWrapperButton variant="contained" id="method"
				style={{left: "22px"}}
				onClick={()=>navigate("/how_done/")}>
					How It's Done
				</HomeWrapperButton>

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