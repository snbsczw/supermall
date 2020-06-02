<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" status-icon>
    <el-form-item  label="线段起始点ID：" label-width="120px" prop="source">
      <el-input autofocus="autofocus" v-model="ruleForm.source" placeholder="请输入线段起始点ID" ></el-input>
    </el-form-item>
    <el-form-item label="线段目标点ID：" label-width="120px" prop="target">
      <el-input v-model="ruleForm.target" placeholder="请输入线段目标点ID"></el-input>
    </el-form-item>
    <el-form-item label="线段标签：" label-width="120px" prop="label">
      <el-input v-model="ruleForm.label" placeholder="请输入线段标签,可空"></el-input>
    </el-form-item>
    <el-form-item label="线段详细信息：" label-width="120px" prop="info">
      <el-input v-model="ruleForm.info" placeholder="请输入线段详细信息,可空"></el-input>
    </el-form-item>
    <div  class="dialog-footer">
      <el-button @click="dialogForm1Visible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
    </div>
  </el-form>
</template>

<script>
  import {checkTarget,checkSource} from "../../js/EdgeFormCheck";

  export default {
    name: "AddEdgeForm",
    data(){
      return{
        ruleForm: {
          id:'',
          coordinateX:'',
          coordinateY:'',
          label:'',
          size:'',
          color:'',
          info:'',
          source:'',
          target: '',
        },
        rules: {
          source: {validator: checkSource, trigger: 'blur'},
          target: {validator: checkTarget, trigger: 'blur'}
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          // console.log('valid');
          if (valid) {
            this.$emit('addedge',this.ruleForm);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
  }
</script>

<style scoped>

</style>