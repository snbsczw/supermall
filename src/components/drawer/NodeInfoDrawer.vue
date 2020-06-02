<template>


  <el-drawer title="节点信息" :visible.sync="this.$store.state.nodeInfoDrawerVisible"
             :before-close="handleClose"
             direction="ltr">
    <el-scrollbar style="height: 870px">
    <div class="nodeDrawer">
      <el-form>
        <el-form-item label="节点ID：">
          <el-input v-model="nodeInfo.id" placeholder="请输入内容" :disabled="true" class="input"></el-input>
        </el-form-item>
        <el-form-item label="节点X坐标：">
          <el-input v-model="nodeInfo.x" placeholder="请输入内容" :disabled="true" class="input"></el-input>
        </el-form-item>
        <el-form-item label="节点y坐标：">
          <el-input v-model="nodeInfo.y" placeholder="请输入内容" :disabled="true" class="input"></el-input>
        </el-form-item>
        <el-form-item label="节点Size：">
          <el-input v-model="nodeInfo.size" placeholder="请输入内容" class="input"></el-input>
        </el-form-item>
        <el-form-item label="节点Label：">
          <el-input v-model="nodeInfo.label" placeholder="请输入内容" class="input"></el-input>
        </el-form-item>
        <el-form-item label="节点Color：">
          <el-input v-model="nodeInfo.color" placeholder="请输入内容" class="input"></el-input>
        </el-form-item>
        <el-divider>更改节点Color</el-divider>
        <ColorPicker @setcolor="updateColor"  class="input"></ColorPicker>
        <el-divider></el-divider>
        <el-form-item label="节点info：" >
          <el-input v-model="nodeInfo.info" type="textarea" placeholder="请输入节点详细信息" class="input"></el-input>
        </el-form-item>
        <el-button @click="neiborNodes = true" class="button">查看相邻节点</el-button>
        <el-button @click="delNode('delNode')" class="button">删除此节点</el-button>
        <el-button @click="updateNode('updateNode')" class="button">更新此节点</el-button>
<!--        <el-drawer title="相邻节点" :append-to-body="true" :visible.sync="neiborNodes">-->
<!--          <el-table :data = "nborNodes" @row-click="getEdge">-->
<!--            <el-table-column property="id" label="节点ID" width="150"></el-table-column>-->
<!--            <el-table-column property="label" label="节点Label" width="150"></el-table-column>-->
<!--            <el-table-column property="size" label="节点Size" width="150"></el-table-column>-->
<!--            <el-table-column property="style.fill" label="节点Color" width="150"></el-table-column>-->
<!--          </el-table>-->
<!--        </el-drawer>-->
      </el-form>
    </div>
    </el-scrollbar>
  </el-drawer>

</template>

<script>
  import ColorPicker from "@/components/tools/ColorPicker";
  export default {
    name: "NodeInfoDrawer",
    components: {
      ColorPicker,
    },
    props:{
      nodeInfo:{}
    },
    data(){
      return{

      }
    },
    methods: {
      handleClose(){
        this.$confirm('确认关闭？')
          .then(_ => {
            this.$store.commit('setNodeInfoDrawerVis',false);
            // done();
          })
          .catch(_ => {});
      },
      updateColor(color){
        this.nodeInfo.color = color;
      },
      delNode(Option){
        this.$emit('setnode',this.nodeInfo.id,Option);
      },
      updateNode(Option){
        // console.log(this.nodeInfo);
        this.$emit('setnode',this.nodeInfo,Option);
      }
    }
  }
</script>

<style scoped>
  el-scrollbar__view {
    overflow-x: hidden;
  }
  .input {
    display: block;
    width: 550px;
    margin-right: 10px;
    margin-left: 10px;
  }
  .button {
    margin-bottom: 20px;
  }
</style>