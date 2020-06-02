<template>
  <el-container>
    <el-header class="el-header">
      <el-button @click="ceshi">测试按钮</el-button>
      <el-button @click="ceshi2">测试按钮2</el-button>
    </el-header>
    <el-main id="mountNode" class="el-main">
      <nodeContextMenu ></nodeContextMenu>
      <canvasContextMenu @canvas_events="canvasEvents"></canvasContextMenu>
      <edgeContextMenu></edgeContextMenu>
    </el-main>
    <!--    添加节点表单-->
    <el-dialog title="添加节点" :visible.sync="dialogForm1Visible">
      <AddNodeForm @addnode="addNode($event)"></AddNodeForm>
    </el-dialog>
    <!--    添加线段表单-->
    <el-dialog title="添加线段" :visible.sync="dialogForm2Visible">
      <AddEdgeForm @addedge="addEdge($event)"></AddEdgeForm>
    </el-dialog>
  </el-container>
</template>

<script>
  import G6 from '@antv/g6';
  import nodeContextMenu from "../contextMenu/NodeContextMenu";
  import canvasContextMenu from "../contextMenu/CanvasContextMenu";
  import edgeContextMenu from "../contextMenu/EdgeContextMenu";
  import AddNodeForm from "@/components/form/AddNodeForm";
  import AddEdgeForm from "@/components/form/AddEdgeForm";
  export default {
    name: "AppMain",
    components: {
      nodeContextMenu,
      canvasContextMenu,
      edgeContextMenu,
      AddNodeForm,
      AddEdgeForm,
    },
    data(){
      return{
        dialogForm1Visible: false,
        dialogForm2Visible: false,
        form: {
          id:'',
          x:'',
          y:'',
          label:'',
          size:'',
          color:'',
          info:'',
          edgeId: '',
          source:'',
          target: '',
        },
        coordinate: {
          x:'',
          y:'',
        },
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
          nodes: this.$store.state.nodes,
          edges: this.$store.state.edges,
        };
        const canvas = document.getElementById('mountNode');
        // console.log(canvas);
        const width = canvas.scrollWidth;
        const height = canvas.scrollHeight;
        // console.log(width);
        _t.graph = new G6.Graph({
          container: 'mountNode',
          width,
          height,
          layout: 'random',
          modes: {
            //允许拖拽画布，放缩画布，拖拽节点
            default: ['drag-canvas', 'zoom-canvas', 'drag-node',
              'activate-relations',
            ]
          },
          //节点在不同状态下的样式集合
          nodeStateStyles: {
            hover: {
              fill: '#2980b9',
            },
            click: {
              stroke: '#000',
              lineWidth: 1,
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
            label: '',
            info: '',
            size: 30,
            style: {
              fill: "#00FFFF",
            }
          },
          defaultEdge: {
            style: {
              stroke: '#b5b5b5',
              lineAppendWidth: 3 // Enlarge the range the edge to be hitted
            },
            labelCfg: {
              autoRotate: true,
              style: {
                // A white stroke with width 5 helps show the label more clearly avoiding the interference of the overlapped edge
                stroke: 'white',
                lineWidth: 5
              }
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

          this.hiddenContextmenu('canvasBoxCard');
          this.hiddenContextmenu('edgeBoxCard');
          const nodeItem = e.item;
          let x = nodeItem.getBBox().centerX;
          let y = nodeItem.getBBox().centerY;
          this.visibleCard('nodeBoxCard',x,y);
        });
        //右键画布弹出卡片
        _t.graph.on('canvas:contextmenu', e => {
          this.hiddenContextmenu('nodeBoxCard');
          this.hiddenContextmenu('edgeBoxCard');
          let x = e.x;
          let y = e.y;
          this.getCoordinate(x,y);
          this.visibleCard('canvasBoxCard',x,y);
          // console.log(x,y);
        });
        //右键线段弹出卡片
        _t.graph.on('edge:contextmenu', e => {
          this.hiddenContextmenu('nodeBoxCard');
          this.hiddenContextmenu('canvasBoxCard');
          let x = e.x;
          let y = e.y;
          this.visibleCard('edgeBoxCard',x,y);
        });
        //单击左键隐藏所有卡片
        _t.graph.on('click', e=> {
           this.hiddenContextmenu('canvasBoxCard');
           this.hiddenContextmenu('nodeBoxCard');
           this.hiddenContextmenu('edgeBoxCard');
        });
        _t.graph.data(initData);
        _t.graph.render();



      },
      //隐藏卡片位置
      hiddenContextmenu(id){
        const contextMenuContainer = document.getElementById(id);
        if(contextMenuContainer){
          contextMenuContainer.style.visibility = 'hidden';
        }
      },
      //显示卡片位置并设置坐标
      visibleCard(id,x,y){
        const contextMenuContainer = document.getElementById(id);
        contextMenuContainer.style.visibility = 'visible';
        contextMenuContainer.style.left = x + 'px';
        contextMenuContainer.style.top = y + 'px';


      },
      canvasEvents(liOption){
        // console.log(liOption);
        if(liOption === 'addNode'){
          this.dialogForm1Visible = true;
        }else if(liOption === 'addEdge'){
          this.dialogForm2Visible = true;
        }
      },

      //添加节点
      addNode(ruleForm){
        // console.log(ruleForm[0]);
        this.dialogForm1Visible = false;
        let node = {
          id: ruleForm.id, // String，该节点存在则必须，节点的唯一标识
          x: ruleForm.coordinateX, // Number，可选，节点位置的 x 值
          y: ruleForm.coordinateY, // Number，可选，节点位置的 y 值
          size: ruleForm.size,
          label: ruleForm.label,
          info: ruleForm.info,
          style: {
            fill: ruleForm.color,
          }
        };
        if(node.size === ''){
          node.size = 30;
        }
        if(node.x === ''){
          node.x = this.coordinate.x;
        }
        if(node.y === ''){
          node.y = this.coordinate.y;
        }
        if(node.style.fill === ''){
          node.style.fill = "#00FFFF";
        }
        // console.log(node);
        this.$store.commit('addNode',node);
        const _t = this;
        _t.graph.addItem('node',node);
        _t.graph.render();
        this.hiddenContextmenu('canvasBoxCard');
      },
      addEdge(ruleForm){
        this.dialogForm2Visible = false;
        let edge = {
          source:  ruleForm.source,
          target:  ruleForm.target,
          label:  ruleForm.label,
          info:  ruleForm.info
        };
        this.$store.commit('addEdge',edge);
        const _t = this;
        _t.graph.addItem('edge',edge);
        _t.graph.render();
        this.hiddenContextmenu('canvasBoxCard');
      },
      //获取鼠标点击的坐标
      getCoordinate(x,y){
        this.coordinate.x = x;
        this.coordinate.y = y;
      }

  },


  }
</script>

<style scoped>
  #mountNode {
    position: relative;
    /*width: 1200px;*/
    height: 850px;
    margin: 0;
    padding: 0;
    background-color: #eaeaea;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  .el-header{
    margin: 0;
    padding: 0;
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
</style>