/*
    SelectScreen is used to display the two sports to select from (
    only has option for basketball currently)
*/
import { Link } from "react-router-dom";
export default function SelectScreem(){
    return(
        <>
            <button id="bball" className = "currentSports">
                <Link to="/bball/">
                    <div id = "bballContainer">
                        <strong>Basketball</strong>
                    </div>
                </Link>
            </button>
        </>
    )
}