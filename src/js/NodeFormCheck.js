import store from "../store";

let checkId = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('ID不能为空!'));
  }
  store.state.nodes.forEach(cn => {
    if(cn.id === value){
      return callback(new Error('此ID已存在!'))
    }
  });
  callback();
};
let checkCoordinateX = (rule, value, callback) => {
  if(!value){
    callback();
  }else{
    let reg = /^[0-9]+$/;
    if(value !== "" && !reg.test(value)){
      return callback(new Error('只能输入数字!'))
    }
    if(value > 1200 || value < 0){
      return  callback(new Error('范围在0~1200'))
    }
    callback();
  }
};
let checkCoordinateY = (rule, value, callback) => {
  if(!value){
    callback();
  }else{
    let reg = /^[0-9]+$/;
    if(value !== "" && !reg.test(value)){
      return callback(new Error('只能输入数字!'))
    }
    if(value > 850 || value < 0){
      return  callback(new Error('范围在0~850'))
    }
    callback();
  }
};
let checkSize = (rule, value, callback) => {
  if(!value){
    value = 30;
  }
  let reg = /^[0-9]+$/;
  if(value !== "" && !reg.test(value)){
    return callback(new Error('只能输入数字!'))
  }
  if(value > 100|| value < 0){
    return  callback(new Error('范围在0~100'))
  }
  callback();
};

export {
  checkId,
  checkCoordinateX,
  checkCoordinateY,
  checkSize
}