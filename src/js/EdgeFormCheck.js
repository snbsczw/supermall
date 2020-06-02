import store from "../store";
let checkSource = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('起始点ID不能为空!'));
  }
  store.state.nodes.forEach(cn => {
    if(cn.id === value){
      callback();
    }
  });
  callback(new Error('此节点Id不存在!'));
};
let checkTarget = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('目标点ID不能为空!'));
  }
  store.state.nodes.forEach(cn => {
    if(cn.id === value){
      callback();
    }
  });
  callback(new Error('此节点Id不存在!'));
};
export {
  checkSource,
  checkTarget
}