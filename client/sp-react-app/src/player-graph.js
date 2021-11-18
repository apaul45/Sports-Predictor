export default class playerGraph{
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