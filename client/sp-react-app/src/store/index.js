import playerGraph from '../player-graph';
import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});

//Initialize the player graph-- use methods such as addVertex and addEdge to add to the graph
const newGraph = new playerGraph(12);


function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        //playerList will hold all of the entered player's future statistics, as 
        //entered by the user

        //NOTE: plan is to save this in a back end database in the future
        playerList: [],
    });
    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}
export default GlobalStoreContext;
export { GlobalStoreContextProvider };