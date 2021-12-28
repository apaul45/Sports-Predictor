let teamsKey = "teams";
let standingsKey = "standings"
let passCounter = 0;
let prevPage = document.getElementById("Select");
let formList = [...document.querySelectorAll(".form")];
var ipGraph;
let playerRoleArray = ["Superstar", "Star", "All Star", "Role Player"];
let teamArray = ["Contender", "Playoffs", "Almost Playoff", "Lottery"];
let teamStateArray = ["All Healthy", "Mostly Healthy", "Sometimes Healthy", "Rarely Healthy"];
let futureStateArray = ["Amazing", "Good", "Decent", "Terrible"];
let startingWeights = [[-.2, .1, .7, 1.5], [-.65, -.8, -1, -2.5], [-1.2, -.75, .35, 1]];
let subtractValues = [[0,-.3,-.8,-1.5], [0, -2,-3,-3.55], [0,-.45,-.6,-1.5]];
let istate = "";
let role = "";
let fa = "";
function compare(a,b){
    if (a.teamId < b.teamId) 
        return -1;
    return 1;
    
}
function retrieveTeams(){
    if (localStorage.getItem(standingsKey) == null && localStorage.getItem(teamsKey)==null){
        let teams = [];
        var options = {
        method: 'GET',
        url: 'https://api-nba-v1.p.rapidapi.com/teams/league/standard',
        headers: {
            'x-rapidapi-key': 'a4e632ada7msh1de5c83868e3a62p106019jsnfaf7d7ee40b7',
            'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
        }
        };

        axios.request(options).then(function (response) {
            teams = response.data.api.teams;
        }).catch(function (error) {
            console.error(error);
        });

        options = {
            method: 'GET',
            url: 'https://api-nba-v1.p.rapidapi.com/standings/standard/2020/',
            headers: {
            'x-rapidapi-key': 'a4e632ada7msh1de5c83868e3a62p106019jsnfaf7d7ee40b7',
            'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
            }
        };
        axios.request(options).then(function (response) {
            let teams2 = response.data.api.standings;
            teams2.sort(compare);
            let j=0;
            for (let i = 0; i<teams2.length; i++){
                if (teams2[i].teamId == teams[j].teamId){
                    teams2[i].teamName = teams[j].shortName;
                }
                else{
                    j++;
                    teams2[i].teamName = teams[j].shortName;
                }
                j++;
            }
            //Save the modified list of standings to local storage (so that it is preserved beyond site reloads)
            localStorage.setItem(standingsKey, JSON.stringify(teams2));
        }).catch(function (error) {
            console.error(error);
        });
    }
    if (localStorage.getItem(teamsKey)==null){
        let teams = [];
        var options = {
        method: 'GET',
        url: 'https://api-nba-v1.p.rapidapi.com/teams/league/standard',
        headers: {
            'x-rapidapi-key': 'a4e632ada7msh1de5c83868e3a62p106019jsnfaf7d7ee40b7',
            'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
        }
        };

        axios.request(options).then(function (response) {
            teams = response.data.api.teams;
            localStorage.setItem(teamsKey, JSON.stringify(teams));
        }).catch(function (error) {
            console.error(error);
        });
    }
    else{
        console.log(JSON.parse(localStorage.getItem(standingsKey)));
        console.log(JSON.parse(localStorage.getItem(teamsKey)));
    }
}
class graphNode{
    constructor(noVertices){
        this.noVertices = noVertices;
        this.adjList = new Map();
    }
    //Add vertices to the adjacency list using the contents of 3 lists that are the same size
    addVertex(v,w,z){
        this.adjList.set(v[0], []).set(v[1], []).set(v[2], []).set(v[3], []);
        this.adjList.set(w[0], []).set(w[1], []).set(w[2], []).set(w[3], []);
        this.adjList.set(z[0], []).set(z[1], []).set(z[2], []).set(z[3], []);
    }
    //Set edge from v to w with the indicated weightvalue
    addEdge(v, w, weightValue){
        /* Add the directed edge from v to w, with the latter being 
        an array to hold a weight value */
        this.adjList.get(v).push([w,weightValue]);
    }
    //Get the value of the path between the four argument vertices
    getPathWeight(v,w,y,z){
        let totalVal = 0;
        /*First get the starting vertex (playerRole), then the index of the specified team state, and finally 
        the index of the weight within this edge array */
        let tv = this.adjList.get(v);
        totalVal += this.adjList.get(v)[w][1];
        totalVal += this.adjList.get(this.adjList.get(v)[w][0])[y][1];
        //ifPath is the name of the specified injury state, which is to be used to retrieve the last weight
        let ifPath = this.adjList.get(this.adjList.get(v)[w][0])[y][0];
        totalVal += this.adjList.get(ifPath)[z][1];
        return totalVal;
    }
}
function createIPGraph(){
    ipGraph = new graphNode(12);
    ipGraph.addVertex(playerRoleArray,teamArray,teamStateArray);
    for (let i = 0; i<playerRoleArray.length; i++){
        //For each player role, add 4 edges (one to each team state) with the weight value being startingWeights-subtractVals
        ipGraph.addEdge(playerRoleArray[i], teamArray[0], startingWeights[0][0]-subtractValues[0][i]);
        ipGraph.addEdge(playerRoleArray[i], teamArray[1], startingWeights[0][1]-subtractValues[0][i]);
        ipGraph.addEdge(playerRoleArray[i], teamArray[2], startingWeights[0][2]-subtractValues[0][i]);
        ipGraph.addEdge(playerRoleArray[i], teamArray[3], startingWeights[0][3]-subtractValues[0][i]);
    }
    for (let i = 0; i<playerRoleArray.length; i++){
        //For each team state, add 4 edges (one to each team injury state) with the weight value being startingWeights-subtractVals
        ipGraph.addEdge(teamArray[i], teamStateArray[0], startingWeights[1][0]-subtractValues[1][i]);
        ipGraph.addEdge(teamArray[i], teamStateArray[1], startingWeights[1][1]-subtractValues[1][i]);
        ipGraph.addEdge(teamArray[i], teamStateArray[2], startingWeights[1][2]-subtractValues[1][i]);
        ipGraph.addEdge(teamArray[i], teamStateArray[3], startingWeights[1][3]-subtractValues[1][i]);
    }
    for (let i = 0; i<playerRoleArray.length; i++){
        //For each team injury state, add 4 edges (one to each future team state) with the weight value being startingWeights-subtractVals
        ipGraph.addEdge(teamStateArray[i], futureStateArray[0], startingWeights[2][0]-subtractValues[2][i]);
        ipGraph.addEdge(teamStateArray[i], futureStateArray[1], startingWeights[2][1]-subtractValues[2][i]);
        ipGraph.addEdge(teamStateArray[i], futureStateArray[2], startingWeights[2][2]-subtractValues[2][i]);
        ipGraph.addEdge(teamStateArray[i], futureStateArray[3], startingWeights[2][3]-subtractValues[2][i]);
    }
}
function changeCheck(w){
    document.getElementById(w).checked = true;
}
function newfunct(s){
    /*Have to do 2 steps for adding a new bullet point: create the li element,
    and add a textNode with the desired text 
    */
    let node = document.createElement('li');
    let textnode = document.createTextNode(s);
    node.appendChild(textnode);
    node.className = "segundo";
    document.getElementById('second').appendChild(node);
}
function passexperiment(){
    let passcode = "Hihihi";
    //TO retrieve the user inputted values, have to use .value
    let entered_user = document.getElementById('entersomething').value;
    let entered__pass = document.getElementById('pass').value;
    alert(entered__pass == passcode ? "You got it right " + entered_user + "!" : 
    "Wrong, better luck next time " + entered_user + "!");
    newfunct(entered_user);
    let option = document.createElement("option");
    option.innerHTML = entered_user;
    document.getElementById("selector").appendChild(option);
    passCounter++;
    var domImg = document.createElement("img");
    domImg.src = "https://sayingimages.com/wp-content/uploads/oh-you-want-to-know-password-memes.jpg";
    domImg.id = "passImg";
    if (passCounter == 1){
        document.getElementById('Select').appendChild(domImg);
        document.getElementById("passImg").style.position = "relative";
        document.getElementById("passImg").style.bottom = "-150px";
        document.getElementById("passImg").style.right = "-27px";
    }
    else{
        document.getElementById('Select').removeChild(domImg);
        document.getElementById('Select').appendChild(domImg);
        document.getElementById("passImg").style.position = "relative";
        document.getElementById("passImg").style.bottom = "-150px";
        document.getElementById("passImg").style.right = "-27px";
    }
}
function openTab(evt, tabName){
    if (prevPage.id != tabName){
        prevPage.style.display = "none";
        prevPage = document.getElementById(tabName);
        prevPage.style.display = "block";
    }
}
function openMethod(method){
    if (method == "shorter"){
        let shorter = document.getElementById("selectplayer");
        document.getElementById("selectplayer2").style.display = "none";
        shorter.style.display = "flex";
        shorter.style.justifyContent = "center";
        shorter.style.alignContent = "center";

    }
    else{
        let longer = document.getElementById("selectplayer2");
        document.getElementById("selectplayer").style.display = "none";
        longer.style.display = "flex";
        longer.style.justifyContent = "center";
        longer.style.alignContent = "center";
    }
}
function displayPlayers(){
    var list = document.getElementById("second");
    var array = list.getElementsByTagName("li");
    var selectElement = document.getElementById("selector");             
    for (var i = 0; i < array.length; i++) {
        var option = document.createElement("option");
        option.value = i + 1;
        option.innerHTML = array[i].textContent;
        selectElement.appendChild(option);
    }   
}
function displayNewPlayer(){
    var list = document.getElementById("second");
    var selectElement = document.getElementById("selector");  
    var option = document.createElement("option");
    option.innerHTML = list.lastChild.textContent;
    option.value = list.childElementCount;
    selectElement.appendChild(option);
}
function addPlayers(player){
    var list = document.getElementById("second");
    var array = list.getElementsByTagName("li");
    var selectElement = document.getElementById("selector"); 
    var option = document.createElement("option");
    option.value = selectElement.length + 1;
    option.innerHTML = player;
    selectElement.appendChild(option);
}
/*As the peak age is regarded to be 27, getAgeWeight
uses it to determine the age weight */
function getAgeWeight(age){
    let ageWeight = 0;
    if (age<27){
        ageWeight -= (27-age)/2;
        return ageWeight;
    }
    else if (age>27){
        ageWeight -= (age-27)/2;
        return ageWeight;
    }
    else{
        return ageWeight;
    }
}
function getInjuryWeight(gp){
    let injuryWeight = 0;
    switch(true){
        case((gp>=0)&&(gp<=25)):
            return injuryWeight-=2;
        case((gp>=26)&&(gp<=40)):
            return injuryWeight-=1;
        case((gp>=41)&&(gp<=49)):
            return injuryWeight-=.5;
        case((gp>=50)&&(gp<=59)):
            return injuryWeight-=.2;
        default:
            return injuryWeight;
    }
}
/* Since the west is stronger than the east, both conferences have different "cutoffs".
That is, the cutoff for a contending team in the east may be less flexible than that of the west,
since most of the contending teams come from the west. */
function getTeamRank(id){
    let index = JSON.parse(localStorage.getItem(standingsKey)).findIndex(i => i.teamId == id);
    let conference = JSON.parse(localStorage.getItem(standingsKey))[index].conference.name;
    let i = Number(JSON.parse(localStorage.getItem(standingsKey))[index].conference.rank);
    if (conference == "east"){
        switch(true){
            case(i<4):
                return 0;
            case(i<=8):
                return 1;
            case((i<=11)):
                return 2;
            default:
                return 3;
        }
    }
    else{
        switch(true){
            case(i<=4):
                return 0;
            case(i<=8):
                return 1;
            case((i<=10)):
                return 2;
            default:
                return 3;
        }
    }
}
function round(num){
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return Math.round(m) / 100 * Math.sign(num);
}
function fetchFutureStats(){
    let playerArray = document.getElementById("chooseplayer").value.split(',');
    if (playerArray.length < 3){
        console.error("Please enter all the required information.");
    }
    istate = document.querySelector('input[name="injury_state"]:checked').id.substring(0,1);
    role = document.querySelector('input[name="player_state"]:checked').value;
    fa = document.querySelector('input[name="fadraft_state"]:checked').id.substring(0,1);
    if ((istate == "n") || (role == "on") || (fa == "f")){
        alert("Please fill out all fields.");
        return;
    }
    else{
        const age = playerArray[1];
        const name = playerArray[0];
        const team = playerArray[2];
        let id = "";
        var options = {
            method: 'GET',
            url: 'https://nba-stats4.p.rapidapi.com/players/',
            params: {page: '1', full_name: name, per_page: '50'},
            headers: {
            'x-rapidapi-key': 'a4e632ada7msh1de5c83868e3a62p106019jsnfaf7d7ee40b7',
            'x-rapidapi-host': 'nba-stats4.p.rapidapi.com'
            }
        };
        
        axios.request(options).then(function (response) {
           id = response.data[0].id;
        })
        .catch(function (error) {
            alert("Please enter the correct name.");
        });
        options = {
        method: 'GET',
        url: 'https://nba-stats4.p.rapidapi.com/season_totals_regular_season/',
        params: {
            per_page: '50',
            page: '1',
            player_age: String(age),
            team_abbreviation: team,
            season_id: '2020-21'
        },
        headers: {
            'x-rapidapi-key': 'a4e632ada7msh1de5c83868e3a62p106019jsnfaf7d7ee40b7',
            'x-rapidapi-host': 'nba-stats4.p.rapidapi.com'
        }
        };
        axios.request(options).then(function (response) {
            window.setTimeout(function(){predictStatsAPI(response.data, name, age, team, id);}, 100000);
        }).catch(function (error) {
            console.error("Please enter the correct age and/or team name.");
        });
    }
}
//formValidation() is only used for the longer method, as it checks if all stats/info have been filled
function formValidation(){
    //Can loop over a node list (from .querySelectorAll) just like a regular array
    for (let i = 0; i< formList.length; i++){
        if (formList[i].value == ""){
            return true;
        }
    }
    return false;
}
function predictStatsAPI(statsArray, name, age, team, id){
    let pos = statsArray.findIndex(i => i.player_id == id);
    let gamesPlayed = statsArray[pos].gp;
    let ppg = statsArray[pos].pts/gamesPlayed;
    let rpg = statsArray[pos].reb/gamesPlayed;
    let apg = statsArray[pos].ast/gamesPlayed;
    let bpg = statsArray[pos].blk/gamesPlayed;
    let spg = statsArray[pos].stl/gamesPlayed;
    let fadein = document.getElementById("fade_in_stats");
    let fadeout = document.getElementById("fade_out_stats");
    let totalWeight = 0;
    totalWeight+= getInjuryWeight(gamesPlayed);
    totalWeight+= getAgeWeight(age);
    let teamIndex = JSON.parse(localStorage.getItem(teamsKey)).findIndex(i => i.shortName == team);
    let teamId = JSON.parse(localStorage.getItem(teamsKey))[teamIndex].teamId;
    let teamRank = getTeamRank(teamId);
    totalWeight+=ipGraph.getPathWeight(role,teamRank,istate,fa);
    let new_ppg = round(ppg + totalWeight);
    let new_apg = round(apg+(totalWeight/5));
    let new_rpg = round(rpg+(totalWeight/4));
    let new_bpg = round(bpg+(totalWeight/10));
    let new_spg = round(spg+(totalWeight/10));
    fadein.style.display = "block";
    /* To make the prediction successful message fade in and fade out after a few seconds, 
    have to use 2 setTimeouts to allow for the animations to occur
    before turning displays back to none */
    window.setTimeout(function(){document.getElementById("fade_in_stats").style.display ="none";
    document.getElementById('fade_out_stats').style.display='block';window.setTimeout(function(){document.getElementById("fade_out_stats").style.display="none";}, 4000)}, 4000);
    //Add the new stats to the current list
    newfunct(name + ": " + String(new_ppg) + " ppg, " + String(new_rpg) + " rpg, "+
    String(new_apg) + " apg, " + String(new_spg) + " spg, " + String(new_bpg) + " bpg");
    displayNewPlayer();
}
function predictStats(){
    if (formValidation()){
        alert("Please fill out all fields.");
        return;
    }
    istate = document.querySelector('input[name="injury_state"]:checked').id.substring(0,1);
    role = document.querySelector('input[name="player_state"]:checked').value;
    fa = document.querySelector('input[name="fadraft_state"]:checked').id.substring(0,1);
    if ((istate == "n") || (role == "on") || (fa == "f")){
        alert("Please fill out all fields.");
        return;
    }
    let fadein = document.getElementById("fade_in_stats");
    let fadeout = document.getElementById("fade_out_stats");
    let totalWeight = 0;
    totalWeight+= getInjuryWeight(document.getElementById("gp").value);
    totalWeight+= getAgeWeight(document.getElementById("enterage").value);
    let teamIndex = JSON.parse(localStorage.getItem(teamsKey)).findIndex(i => i.shortName == document.getElementById("enterteam").value);
    let teamId = JSON.parse(localStorage.getItem(teamsKey))[teamIndex].teamId;
    let teamRank = getTeamRank(teamId);
    totalWeight+=ipGraph.getPathWeight(role,teamRank,istate,fa);
    let new_ppg = round(Number(document.getElementById("enterppg").value) + totalWeight);
    let new_apg = round(Number(document.getElementById("enterapg").value)+(totalWeight/5));
    let new_rpg = round(Number(document.getElementById("enterrpg").value)+(totalWeight/4));
    let new_bpg = round(Number(document.getElementById("enterbpg").value)+(totalWeight/10));
    let new_spg = round(Number(document.getElementById("enterspg").value)+(totalWeight/10));
    fadein.style.display = "block";
    /* To make the prediction successful message fade in and fade out after a few seconds, 
    have to use 2 setTimeouts to allow for the animations to occur
    before turning displays back to none */
    window.setTimeout(function(){document.getElementById("fade_in_stats").style.display="none";
    document.getElementById('fade_out_stats').style.display='block';window.setTimeout(function(){document.getElementById("fade_out_stats").style.display="none";}, 4000)}, 4000);
    //Add the new stats to the current list
    newfunct(document.getElementById("entername").value + ": " + String(new_ppg) + " ppg, " + String(new_rpg) + " rpg, "+
    String(new_apg) + " apg, " + String(new_spg) + " spg, " + String(new_bpg) + " bpg");
    displayNewPlayer();
}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
displayPlayers();
retrieveTeams();
createIPGraph();