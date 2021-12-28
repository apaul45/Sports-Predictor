//TODO: REVISE TO MAKE IT EASIER/SIMPLER TO READ

export default class playerGraph{
    adjList: Map<any, any>;
    noVertices: any;
    constructor(noVertices:number){
        this.noVertices = noVertices;
        this.adjList = new Map();
    }
    //Add vertices to the adjacency list using the contents of 3 lists that are the same size
    addVertex(v: Array<any>,w: Array<any>,z: Array<any>){
        this.adjList.set(v[0], []).set(v[1], []).set(v[2], []).set(v[3], []);
        this.adjList.set(w[0], []).set(w[1], []).set(w[2], []).set(w[3], []);
        this.adjList.set(z[0], []).set(z[1], []).set(z[2], []).set(z[3], []);
    }
    //Set edge from v to w with the indicated weightvalue
    addEdge(v: any, w: any, weightValue: any){
        /* Add the directed edge from v to w, with the latter being 
        an array to hold a weight value */
        this.adjList.get(v).push([w,weightValue]);
    }
    //Get the value of the path between the four argument vertices
    getPathWeight(v: string,w: number,y: string,z: string){
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

    //For graphs w/12 vertices
    constructGraph(playerRoleArray: Array<string>, teamArray: Array<string>, teamStateArray: Array<string>, 
                   futureStateArray: Array<string>, startingWeights: Array<Array<number>>, 
                   subtractValues: Array<Array<number>>){

        this.addVertex(playerRoleArray,teamArray,teamStateArray);
        for (let i = 0; i<playerRoleArray.length; i++){
            //For each player role, add 4 edges (one to each team state) with the weight value being startingWeights-subtractVals
            this.addEdge(playerRoleArray[i], teamArray[0], startingWeights[0][0]-subtractValues[0][i]);
            this.addEdge(playerRoleArray[i], teamArray[1], startingWeights[0][1]-subtractValues[0][i]);
            this.addEdge(playerRoleArray[i], teamArray[2], startingWeights[0][2]-subtractValues[0][i]);
            this.addEdge(playerRoleArray[i], teamArray[3], startingWeights[0][3]-subtractValues[0][i]);
        }
        for (let i = 0; i<playerRoleArray.length; i++){
            //For each team state, add 4 edges (one to each team injury state) with the weight value being startingWeights-subtractVals
            this.addEdge(teamArray[i], teamStateArray[0], startingWeights[1][0]-subtractValues[1][i]);
            this.addEdge(teamArray[i], teamStateArray[1], startingWeights[1][1]-subtractValues[1][i]);
            this.addEdge(teamArray[i], teamStateArray[2], startingWeights[1][2]-subtractValues[1][i]);
            this.addEdge(teamArray[i], teamStateArray[3], startingWeights[1][3]-subtractValues[1][i]);
        }
        for (let i = 0; i<playerRoleArray.length; i++){
            //For each team injury state, add 4 edges (one to each future team state) with the weight value being startingWeights-subtractVals
            this.addEdge(teamStateArray[i], futureStateArray[0], startingWeights[2][0]-subtractValues[2][i]);
            this.addEdge(teamStateArray[i], futureStateArray[1], startingWeights[2][1]-subtractValues[2][i]);
            this.addEdge(teamStateArray[i], futureStateArray[2], startingWeights[2][2]-subtractValues[2][i]);
            this.addEdge(teamStateArray[i], futureStateArray[3], startingWeights[2][3]-subtractValues[2][i]);
        }
    }
}