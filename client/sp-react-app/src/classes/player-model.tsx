/*
    This class contains the necessary info for a player, along with the 
    methods necessary to calculate a prediction

    The player's info can then be saved to the backend
*/
import axios from "axios";
import playerGraph from '../classes/player-graph';
import teamStandings from '../nba.json';

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
    totalWeight:number = 0;

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

                //If info exists, that means that the user entered both a correct name&team
                if (info){
                    console.log(info);
                    /* Finally, use the games played filter to 
                    calculate ppg, rpg, etc, and create a stats object
                    to set this player's info to */

                    let stats:any = {};

                    perGame.forEach((stat:Array<string>) => { 
                        stats[stat[0]] =  info[stat[1]]/= info.gp;
                    });
                    //Make sure info also includes a name, team, and gp field
                    stats.name = this.info.name;
                    stats.team = this.info.team;
                    stats.gp = String(info.gp);
                    stats.age = String(info.player_age);
                    /* Instead of returning a value or setting this.info in 
                        this method, send the value to a setter method that will 
                        update this.info 
                        
                        async await creates a Promise object, so trying to return a value 
                        requires more knowledge of how promises work
                    */

                    this.setInfo(stats);
                }
            });
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

        const team:any = teamStandings[index].standingsData;
        
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

    predictionCalculator(radioValues:any, graph:playerGraph){
        //Add age and injury weights to the total weight
        this.totalWeight += (this.getAgeWeight() + this.getInjuryWeight());
        this.totalWeight += graph.getPathWeight(radioValues.player_role, this.getTeamRank(), radioValues.health, radioValues.fadrft);

        this.predictStats();
    }
    round(num:number){
        var m = Number((Math.abs(num) * 100).toPrecision(15));
        return Math.round(m) / 100 * Math.sign(num);
    }
    predictStats(){
        perGame.forEach((stat: Array<string>, index: number) => {

            const newStat:number =  this.round(Number(this.info[stat[0]]) + 
                                    Number(this.totalWeight/perGameWeights[index]));
            this.info[stat[0]] = newStat;
          }
        );

        console.log(this.info);
    }

    getInfo(){
        console.log(this.info);
        return this.info;
    }

    toString(){
        let playerString = this.info.name + ": ";

        perGame.forEach((stat:Array<string>) => 
            playerString += (this.info[stat[0]] + stat[0] + ", ")
        );
        return playerString;
    }

}