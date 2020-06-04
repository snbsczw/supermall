<template>


  <el-drawer title="节点信息" :visible.sync="nodeInfo.isVisible"
             direction="ltr">
    <el-scrollbar style="height: 870px">
      <el-form :rules="rules" :model="nodeInfo" ref="nodeInfo">
        <el-form-item label="节点ID：">
          <el-input v-model="nodeInfo.id" placeholder="请输入内容" :disabled="true" class="input"></el-input>
        </el-form-item>
        <el-form-item label="节点X坐标：">
          <el-input v-model="nodeInfo.x" placeholder="请输入内容" :disabled="true" class="input"></el-input>
        </el-form-item>
        <el-form-item label="节点y坐标：">
          <el-input v-model="nodeInfo.y" placeholder="请输入内容" :disabled="true" class="input"></el-input>
        </el-form-item>
        <el-form-item label="节点Size：" prop="size">
          <el-input v-model="nodeInfo.size" placeholder="请输入内容" class="input" ></el-input>
        </el-form-item>
        <el-form-item label="节点Label：">
          <el-input v-model="nodeInfo.label" placeholder="请输入内容" class="input"></el-input>
        </el-form-item>
        <el-form-item label="节点Color：" prop="color">
          <el-input v-model="nodeInfo.color" placeholder="请输入内容" class="input" ></el-input>
        </el-form-item>
        <el-divider>更改节点Color</el-divider>
        <ColorPicker @setcolor="updateColor"  class="input"></ColorPicker>
        <el-divider></el-divider>
        <el-form-item label="节点info：" >
          <el-input v-model="nodeInfo.info" type="textarea" placeholder="请输入节点详细信息" class="input"></el-input>
        </el-form-item>
        <el-button @click="delNode('nodeInfo')" class="button">删除此节点</el-button>
        <el-button @click="updateNode('nodeInfo')" class="button">更新此节点</el-button>
      </el-form>
    </el-scrollbar>
  </el-drawer>

</template>

<script>
  import ColorPicker from "@/components/tools/ColorPicker";
  import {checkColor, checkSize} from "@/js/NodeFormCheck";

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
        rules: {
          size: { validator: checkSize, trigger: 'blur'},
          color: {validator: checkColor, trigger: 'blur'},
        }
      }
    },
    methods: {
      updateColor(color){
        this.nodeInfo.color = color;
      },
      delNode(){
        this.$emit('delnode',this.nodeInfo.id);
      },
      updateNode(formName){
        // console.log(this.nodeInfo);
        this.$refs[formName].validate((valid) => {
          // console.log('valid');
          if (valid) {
            this.$emit('updatenode',this.nodeInfo);
          } else {
            console.log('error submit!!');
            return false;
          }
        });

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