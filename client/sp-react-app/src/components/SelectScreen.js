/*
    SelectScreen is used to display the two sports to select from (
    only has option for basketball currently)
*/
import { Link } from "react-router-dom";
export default function SelectScreen(){
    return(
        <>
            <Link to="/bball/">
                <button id="bball" className = "currentSports">
                        <div id = "bballContainer">
                            <strong>Basketball</strong>
                        </div>
                </button>
            </Link>
        </>
    )
}