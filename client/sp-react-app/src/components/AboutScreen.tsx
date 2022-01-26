export default function AboutScreen(){
    //hr is used to display a horizontal line
    return(
        <div className='screen-style'>
            <div className='child-screen-style'>
                <h1 className='centering'>About</h1>
                <hr></hr>
                <p style={{fontSize: '25pt', marginLeft: '2%'}}>
                    This page is about figuring out a player's future stats given factors like their age.
                    The statistics themselves aren't meant to be taken seriously: their purpose is to indicate 
                    what kind of trend a player is headed towards.
                </p>
            </div>
        </div>
    )
}