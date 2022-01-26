export default function MethodScreen(){
    return(
        <div id="How" className='screen-style'>
            <div className='child-screen-style'>
                <h1 className='centering'>How It's Done</h1>
                <hr></hr>
                <p style={{fontSize:'20pt'}} className="about-select">
                    Future stats are determined by the following factors:
                    <ul>
                        <li>Player's Age (Are they entering a prime? Leaving? In it?)</li>
                        <li>Current state of their team (Is their team losing? Winning? Mediocre?)</li>
                        <li>Future state of their team (Any free agent moves? Big draft picks?)</li>
                        <li>Player's Role (Is this player expected to be the #1 option? Perhaps a role player?)</li>
                    </ul>

                    <strong>
                        None of this should be taken completely seriously of course, as is it impossible to predict a player's future 
                        with 100% accuracy (and without going down a never ending rabbit hole- see example below).
                    </strong>

                    <br/><br/>

                    While I tried to capture as many factors as possible when making this, there are still more 
                    intricate ones that are impossible to capture. For example: the strength and style of a coach.
                    Whereas one coach may draw up different gameplans and adjust during the game, another may rarely do so.
                    This can cause fluctuations in a player's role, as it can change from night to night and/or with coaching changes.
                    <br/><br/>
                    And while you could argue "well their stats would even out", coaching along with situation can unexpectedly revive 
                    or ruin players' careers. No  matter how many factors you account for, <strong>predicting a player's future is not 
                    an exact science.</strong>
                </p>
            </div>
        </div>
    );
}