<template>
  <el-container>
    <el-header class="el-header">
      <el-button @click="ceshi">测试按钮</el-button>
      <el-button @click="ceshi2">测试按钮2</el-button>
    </el-header>
    <el-main id="mountNode" class="el-main">
      <nodeContextMenu></nodeContextMenu>
      <canvasContextMenu></canvasContextMenu>
    </el-main>
  </el-container>
</template>

<script>
  import G6 from '@antv/g6';
  import nodeContextMenu from "../contextMenu/NodeContextMenu";
  import canvasContextMenu from "../contextMenu/CanvasContextMenu";
  export default {
    name: "AppMain",
    data(){
      return{
        nodes: [ {
          id: 'node1', // String，该节点存在则必须，节点的唯一标识
          x: 100, // Number，可选，节点位置的 x 值
          y: 200, // Number，可选，节点位置的 y 值
        },
          {
            id: 'node2', // String，该节点存在则必须，节点的唯一标识
            x: 300, // Number，可选，节点位置的 x 值
            y: 200, // Number，可选，节点位置的 y 值
          }],
        edges: [ {
          source: 'node1', // String，必须，起始点 id
          target: 'node2', // String，必须，目标点 id
        },]
      }
    },
    mounted() {
      this.init();
      document.oncontextmenu = () => false;
    },
    methods: {
      ceshi(){
        this.$router.replace({path: '/test'});
      },
      ceshi2(){
        const conextMenuContainer = document.getElementById('nodeBoxCard');
        conextMenuContainer.style.left = '0';
        conextMenuContainer.style.top = '0';
      },

      init(){
        const _t = this;
        const initData = {
          nodes: this.nodes,
          edges: this.edges
        };
        const canvas = document.getElementById('mountNode');
        console.log(canvas);
        const width = canvas.scrollWidth
        const height = canvas.scrollHeight;
        _t.graph = new G6.Graph({
          container: 'mountNode',
          width,
          height,
          layout: 'random',
          //节点在不同状态下的样式集合
          nodeStateStyles: {
            hover: {
              fill: '#2980b9',
            },
            click: {
              stroke: '#000',
              lineWidth: 2,
            },
          },
          //边在不同状态下的样式集合
          edgeStateStyles: {
            click: {
              stroke: 'steelblue',
            }
          },
          //节点在默认状态下的样式
          defaultNode: {
            size: 30,
            style: {
              fill: "#00FFFF",
            }
          }
        });
        //节点的hover状态
        _t.graph.on('node:mouseenter', e => {
          const nodeItem = e.item;
          _t.graph.setItemState(nodeItem,'hover',true);
        });
        //取消节点hover状态
        _t.graph.on('node:mouseleave', e => {
          const nodeItem = e.item;
          _t.graph.setItemState(nodeItem,'hover',false);
        });
        //节点的click状态
        _t.graph.on('node:mousedown', e => {
          this.hiddenContextmenu();
          //先找到当前处于click状态的其他节点,将其click状态取消,在设置该节点为click状态
          const clickNodes = _t.graph.findAllByState('node','click');
          clickNodes.forEach(cn => {
            _t.graph.setItemState(cn, 'click', false);
          });
          const nodeItem = e.item;
          _t.graph.setItemState(nodeItem, 'click', true);
        });
        //边的click状态
        _t.graph.on('edge:click', e => {
          this.hiddenContextmenu();
          //先找到当前处于click状态的其他边,将其click状态取消,在设置该边为click状态
          const clickEdges = _t.graph.findAllByState('node','click');
          clickEdges.forEach(cn => {
            _t.graph.setItemState(cn, 'click', false);
          });
          const edgeItem = e.item;
          _t.graph.setItemState(edgeItem, 'click', true);
        });
        //右键节点弹出卡片
        _t.graph.on('node:contextmenu', e => {

          const noedItem = e.item;
          let x = noedItem.getBBox().centerX;
          let y = noedItem.getBBox().centerY;
          this.visibleCard('nodeBoxCard',x,y);
        });
        //右键画布弹出卡片
        _t.graph.on('canvas:contextmenu', e => {
          this.hiddenContextmenu();
          const x = e.x;
          const y = e.y;
          this.visibleCard('canvasBoxCard',x,y);
        });

        _t.graph.data(initData);
        _t.graph.render();



      },
      //隐藏卡片位置
      hiddenContextmenu(){
        const contextMenuContainer = document.getElementById('nodeBoxCard');
        contextMenuContainer.style.visibility = 'hidden';
      },
      //显示卡片位置并设置坐标
      visibleCard(id,x,y){
        const contextMenuContainer = document.getElementById(id);
        contextMenuContainer.style.visibility = 'visible';
        contextMenuContainer.style.left = x + 'px';
        contextMenuContainer.style.top = y + 'px';
      }
    },
    components: {
      nodeContextMenu,
      canvasContextMenu
    }

  }
</script>

<style scoped>
  #mountNode {
    position: relative;
    height: 850px;
    background-color: #eaeaea;
  }
  .el-header{
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
</style>