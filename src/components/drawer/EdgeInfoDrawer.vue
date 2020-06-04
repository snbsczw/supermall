<template>
  <el-drawer title="线段信息" :visible.sync="edgeInfo.isVisible"
             direction="ltr">
      <el-form  :model="edgeInfo" >
        <el-form-item label="线段ID：">
          <el-input v-model="edgeInfo.id" placeholder="请输入内容" :disabled="true" class="input"></el-input>
        </el-form-item>
        <el-form-item label="线段起始点坐标：">
          <el-input v-model="edgeInfo.source" placeholder="请输入内容" :disabled="true" class="input"></el-input>
        </el-form-item>
        <el-form-item label="线段目标点坐标：">
          <el-input v-model="edgeInfo.target" placeholder="请输入内容" :disabled="true" class="input"></el-input>
        </el-form-item>
        <el-form-item label="线段Label：">
          <el-input v-model="edgeInfo.label" placeholder="请输入内容" class="input"></el-input>
        </el-form-item>
        <el-form-item label="线段info：" >
          <el-input v-model="edgeInfo.info" type="textarea" placeholder="请输入节点详细信息" class="input"></el-input>
        </el-form-item>
        <el-button @click="delEdge" class="button">删除此线段</el-button>
        <el-button @click="updateEdge" class="button">更新此线段</el-button>
      </el-form>
  </el-drawer>

</template>

<script>
  export default {
    name: "EdgeInfoDrawer",
    props:{
      edgeInfo:{}
    },
    data(){
      return{
      }
    },
    methods: {
      delEdge(){
        this.$emit('deledge',this.edgeInfo.id);
      },
      updateEdge(formName){
        this.$emit('updateedge',this.edgeInfo);
      }
    }
  }
</script>

<style scoped>
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