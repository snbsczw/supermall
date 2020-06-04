import Vue from 'vue';
import Vuex from 'vuex';
import getters from "./getters";
import mutations from "./mutations";
//1.安装插件
Vue.use(Vuex);

const state = {
  nodes: [ {
    id: 'node1', // String，该节点存在则必须，节点的唯一标识
    x: 100, // Number，可选，节点位置的 x 值
    y: 200, // Number，可选，节点位置的 y 值
    label: 'node1',//String,可选,节点的标签
    size: 30,//Number,可选,节点的大小
    style: {
      fill: '#FE7874',//可选,节点颜色
    },
    info: '',//String,可选,节点详细信息
  },
    {
      id: 'node2', // String，该节点存在则必须，节点的唯一标识
      x: 300, // Number，可选，节点位置的 x 值
      y: 200, // Number，可选，节点位置的 y 值
      label: 'node2',//String,可选,节点的标签
      size: 30,//Number,可选,节点的大小
      style: {
        fill: '#FE7874',//可选,节点颜色
      },
      info: '',//String,可选,节点详细信息
    }],
  edges: [ {
    id: 'node1-node2',
    source: 'node1', // String，必须，起始点 id
    target: 'node2', // String，必须，目标点 id
    label: '',//String,可选,边标签
    info: '',//String,可选,线段详细信息
  },],
  // nodeInfoDrawerVisible: false,
};
//2.创建对象
const store = new Vuex.Store({
  state,
  mutations,
  actions: {},
  getters,
  modules: {}
});

//3.导出store对象
export default store