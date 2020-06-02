export default {
  addNode(state,node){
    // console.log(node);
    state.nodes.push(node);
    // console.log(state.nodes);
  },
  addEdge(state,edge){
    state.edges.push(edge);
  },

}