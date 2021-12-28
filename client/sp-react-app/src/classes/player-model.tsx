import axios from "axios";

/*
    This class contains the necessary info for a player, along with the 
    methods necessary to calculate a prediction

    The player's info can then be saved to the backend
*/
const teamStandings = JSON.parse(localStorage.getItem("nba-teams") || "{}");

/* 
    Each entry in perGameWeights is mapped to 
    entry with the same index in perGame

    ie, perGameWeights[0] is mapped to perGame[0] 
*/
const perGame = [["ppg", "pts"], ["rpg", "reb"], ["apg", "ast"],
 ["bpg","blk"], ["spg", "stl"]];
const perGameWeights = [1, 4, 5, 10, 10];

export default class Player {
    info:any | undefined;

    constructor(stats: any){
        this.info = stats;
    }

    async fetchStats(stats: any){
        let id = "";
        let info:{[key:string] : any} = {};
        //First get the player's id
        let options:any = {
            method: 'GET',
            url: 'https://nba-stats4.p.rapidapi.com/players/',
            params: {page: '1', full_name: stats.name, per_page: '50'},
            headers: {
                'x-rapidapi-key': 'a4e632ada7msh1de5c83868e3a62p106019jsnfaf7d7ee40b7',
                'x-rapidapi-host': 'nba-stats4.p.rapidapi.com'
            }
        };
        let response = await axios.request(options);


        if (response.status === 200){
            id = response.data[0].id;

            //Then, get the stats of everyone on the player's team (can filter by age if desired as well)
            options = {
                method: 'GET',
                url: 'https://nba-stats4.p.rapidapi.com/season_totals_regular_season/',
                params: {
                    per_page: '50',
                    page: '1',
                    team_abbreviation: stats.team,
                    season_id: '2020-21'
                },
                headers: {
                    'x-rapidapi-key': 'a4e632ada7msh1de5c83868e3a62p106019jsnfaf7d7ee40b7',
                    'x-rapidapi-host': 'nba-stats4.p.rapidapi.com'
                }
            };
            await axios.request(options).then((response:any) => {
                    //Filter out this list of stats using the player's id
                    info = response.data.filter((player:any) =>
                    player.player_id === id)[0];

                    /* Finally, use the games played filter to 
                    calculate ppg, rpg, etc */
                    
                    const gamesPlayed = info.gp;

                    perGame.forEach((stat:Array<string>) => { 
                        info[stat[0]] =  info[stat[1]]/= gamesPlayed;
                    });
                    /* Instead of returning a value or setting this.info in 
                       this method, send the value to a setter method that will 
                       update this.info 
                       
                       async await creates a Promise object, so trying to return a value 
                       requires more knowledge of how promises work
                       */
                    this.setInfo(info);
            })
        }
    }

    setInfo(info: any){
        this.info = info;
    }

    //CHECK AGAIN LATER
    getTeamRank(){
        //Filter out the team using its abbreviated name
        //team_abbreviation for shorter method, team for longer
        const index = teamStandings.findIndex((team:any) => 
                      team.shortName === 

                     ("team" in this.info ? this.info.team :
                     this.info.team_abbreviation));

        const team = teamStandings[index].standingsData;
        
        const conferenceStanding = team.conference.rank;

        //Different conferences have different weights to account for level of competition
        if (team.conference.name === "east"){
            switch(true){
                case(conferenceStanding<4):
                    return 0;
                case(conferenceStanding<=8):
                    return 1;
                case((conferenceStanding<=11)):
                    return 2;
                default:
                    return 3;
            }
        }
        else{ 
            switch(true){
                case(conferenceStanding<=4):
                    return 0;
                case(conferenceStanding<=8):
                    return 1;
                case((conferenceStanding<=10)):
                    return 2;
                default:
                    return 3;
            }
        }
    }

    getInjuryWeight(){
        const gp = this.info.gp;
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

    getAgeWeight(){
        /* Since this.info can contain different fields based 
        on the method the user used, the line below is necessary */
        const age = ("player_age" in this.info ? this.info.player_age : 
        this.info.age);

        let ageWeight = 0; 

        //Peak age is considered to be 27 so that serves as a threshold
        if (age<27){
            ageWeight -= (27-age)/2;
        }
        else if (age>27){
            ageWeight -= (age-27)/2;
        }
        return ageWeight;
    }

    predictStats(totalWeight: number){
        perGame.forEach((stat: any, index: number) => 
            this.info[stat] /= (totalWeight/perGameWeights[index])
        );

        console.log(this.info);
    }

    getInfo(){
        console.log(this.info);
        return this.info;
    }

}