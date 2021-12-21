/*
    SelectScreen is used to display the two sports to select from (
    only has option for basketball currently)
*/
import { useNavigate } from 'react-router-dom';
export default function SelectScreen(){
    const navigate = useNavigate();
    return(
        <div className='screen-style'>
            <button id="bball" className = "currentSports child-screen-style"
            onClick={()=>navigate("/bball/")}>
                <div id = "bballContainer">
                    <strong>Basketball</strong>
                </div>
            </button>
        </div>
        
    )
}