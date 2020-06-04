<template>
  <el-container class="el-container">
    <el-header class="el-header">
        <ul class="tab">
          <li><i class="el-icon-edit"></i></li>
          <li><i class="el-icon-edit"></i></li>
          <li><i class="el-icon-edit"></i></li>
          <li><i class="el-icon-edit"></i></li>
          <li><i class="el-icon-edit"></i></li>
          <li><i class="el-icon-edit"></i></li>
        </ul>
    </el-header>
    <el-main id="mountNode" class="el-main">
      <nodeContextMenu></nodeContextMenu>
      <canvasContextMenu @addnode="addNodeForm" @addedge="addEdgeForm"></canvasContextMenu>
      <edgeContextMenu></edgeContextMenu>
    </el-main>
    <!--    修改 删除 查看节点信息抽屉-->
    <NodeInfoDrawer :nodeInfo="nodeForm" @updatenode="updateNode" @delnode="delNode"></NodeInfoDrawer>
    <EdgeInfoDrawer :edgeInfo="edgeForm" @updateedge="updateEdge" @deledge="delEdge"></EdgeInfoDrawer>
    <!--    添加节点表单-->
    <AddNodeForm :isVisible="dialogForm1Visible" @addnode="addNode($event)" @cancel="cancelNodeForm"></AddNodeForm>
    <!--    添加线段表单-->
    <AddEdgeForm :isVisible="dialogForm2Visible" @addedge="addEdge($event)" @cancel="cancelEdgeForm"></AddEdgeForm>

  </el-container>
</template>

<script>
  import G6 from '@antv/g6';
  import nodeContextMenu from "../contextMenu/NodeContextMenu";
  import canvasContextMenu from "../contextMenu/CanvasContextMenu";
  import edgeContextMenu from "../contextMenu/EdgeContextMenu";
  import AddNodeForm from "@/components/form/AddNodeForm";
  import AddEdgeForm from "@/components/form/AddEdgeForm";
  import NodeInfoDrawer from "@/components/drawer/NodeInfoDrawer";
  import EdgeInfoDrawer from "@/components/drawer/EdgeInfoDrawer";
  export default {
    name: "AppMain",
    components: {
      nodeContextMenu,
      canvasContextMenu,
      edgeContextMenu,
      AddNodeForm,
      AddEdgeForm,
      NodeInfoDrawer,
      EdgeInfoDrawer,
    },
    data(){
      return{
        nodeInfoDrawerVisible: false,
        dialogForm1Visible: false,
        dialogForm2Visible: false,
        nodeForm: {
          id:'',
          x:Number,
          y:Number,
          label:'',
          size:'',
          color:'',
          info:'',
          isVisible: false,
        },
        edgeForm: {
          id: '',
          source:'',
          target: '',
          info:'',
          label:'',
          isVisible: false,
        },
        coordinate: {
          x:Number,
          y:Number,
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
            default: ['drag-canvas', 'drag-node',
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
        _t.graph.on('click', e => {
           this.hiddenContextmenu('canvasBoxCard');
           this.hiddenContextmenu('nodeBoxCard');
           this.hiddenContextmenu('edgeBoxCard');
        });
        _t.graph.on('node:click', e => {
          // this.$store.commit('setNodeInfoDrawerVis',true);
          this.$store.state.nodes.forEach(cn => {
            if(cn.id === e.item.getModel().id){
              this.nodeForm.id = cn.id;
              this.nodeForm.x = cn.x;
              this.nodeForm.y = cn.y;
              this.nodeForm.size = cn.size;
              this.nodeForm.color = cn.style.fill;
              this.nodeForm.info = cn.info;
              this.nodeForm.label = cn.label;
              this.nodeForm.isVisible = true;
              // this.$store.commit('setNodeInfoDrawerVis',true);
            }
          })
        });
        _t.graph.on('edge:click', e => {
          this.$store.state.edges.forEach(cn => {
            if(cn.id === e.item.getModel().id){
              this.edgeForm.id = cn.id;
              this.edgeForm.source = cn.source;
              this.edgeForm.target = cn.target;
              this.edgeForm.info = cn.info;
              this.edgeForm.label = cn.label;
              this.edgeForm.isVisible = true;
            }
          })
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
      addNodeForm(){
        this.dialogForm1Visible = true;
        this.hiddenContextmenu('canvasBoxCard');
      },
      cancelNodeForm(){
        this.dialogForm1Visible = false;
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
      },
      addEdgeForm(){
        this.dialogForm2Visible = true;
        this.hiddenContextmenu('canvasBoxCard');
      },
      cancelEdgeForm(){
        this.dialogForm2Visible = false;
      },
      addEdge(ruleForm){
        this.dialogForm2Visible = false;
        let edge = {
          id: ruleForm.id,
          source:  ruleForm.source,
          target:  ruleForm.target,
          label:  ruleForm.label,
          info:  ruleForm.info
        };
        this.$store.commit('addEdge',edge);
        const _t = this;
        _t.graph.addItem('edge',edge);
        _t.graph.render();
      },
      //获取鼠标点击的坐标
      getCoordinate(x,y){
        this.coordinate.x = x;
        this.coordinate.y = y;
      },
      updateNode(ruleForm){
        this.$store.state.nodes.forEach(cn => {
          if(ruleForm.id === cn.id){
            cn.x = ruleForm.x;
            // console.log(typeof cn.x);
            cn.y = ruleForm.y;
            cn.label = ruleForm.label;
            cn.size = ruleForm.size;
            cn.info = ruleForm.info;
            cn.style.fill = ruleForm.color;
            // this.graph.updateItem(
            const item = this.graph.findById(cn.id);
            item.update(cn);
          }
        })
      },
      delNode(id){
        let nodes = this.$store.state.nodes;
        for(let i = 0; i < nodes.length; i++){
          if(id ===  nodes[i].id){
            nodes.splice(i,1);
            this.graph.remove(this.graph.findById(id));
            break;
          }
        }
      },
      updateEdge(ruleForm){
        this.$store.state.edges.forEach(cn => {
          if(ruleForm.id === cn.id){
            cn.label = ruleForm.label;
            cn.info = ruleForm.info;
            this.graph.findById(cn.id).update(cn);
          }
        })
      },
      delEdge(id){
        let edges = this.$store.state.edges;
        for(let i = 0; i < edges.length; i++){
          if(id === edges[i].id){
            edges.splice(i,1);
            this.graph.remove(this.graph.findById(id));
            break;
          }
        }
      }
  },
  }
</script>

<style scoped>
  body {
    margin: 0;
    padding: 0;
  }
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

  .tab {
    height: 20px;
    /*background-color: #fff;*/
    margin-top: 38px;
    border: 1px solid #eaeaea;
  }
  .tab {
    margin: 40px 0 0 0;
    padding: 0;
  }
  .tab li {
    display: inline-block;
    list-style: none;
    padding: 0;
    margin: 0;
  }
</style>