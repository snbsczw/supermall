<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" status-icon>
      <el-form-item label="节点ID：" label-width="120px" prop="id">
        <el-input autofocus="autofocus" v-model="ruleForm.id" placeholder="请输入内容"  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="节点x坐标：" label-width="120px" prop="coordinateX">
        <el-input v-model="ruleForm.coordinateX" placeholder="请输入节点x坐标,默认为鼠标点击位置"></el-input>
      </el-form-item>
      <el-form-item label="节点y坐标：" label-width="120px" prop="coordinateY">
        <el-input v-model="ruleForm.coordinateY" placeholder="请输入节点y坐标,默认为鼠标点击位置"></el-input>
      </el-form-item>
      <el-form-item label="节点Size：" label-width="120px" prop="size">
        <el-input v-model="ruleForm.size" placeholder="请输入节点大小,默认30"></el-input>
      </el-form-item>
      <el-form-item label="节点label：" label-width="120px" prop="label">
        <el-input v-model="ruleForm.label" placeholder="请输入节点标签"></el-input>
      </el-form-item>
      <el-form-item label="节点color：" label-width="120px" prop="color">
        <el-input v-model="ruleForm.color" placeholder="请输入节点填充色,默认天蓝色"></el-input>
        <ColorPicker @setcolor="setColor($event)"></ColorPicker>
      </el-form-item>
      <el-form-item label="节点info：" label-width="120px" prop="info">
        <el-input v-model="ruleForm.info" placeholder="请输入节点详细信息,可选"></el-input>
      </el-form-item>
      <div  class="dialog-footer">
        <el-button @click="dialogForm1Visible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-form>
</template>

<script>
  import {checkId,checkSize,checkCoordinateY,checkCoordinateX} from '@/js/NodeFormCheck';
  import ColorPicker from '@/components/tools/ColorPicker';
  export default {
    name: "test",
    components: {
      ColorPicker
    },
    data() {

      return{
        ruleForm: {
          id:'',
          coordinateX:'',
          coordinateY:'',
          label:'',
          size:'',
          color:'',
          info:'',
          edgeId: '',
          source:'',
          target: '',
        },
        rules: {
          id: { validator: checkId, trigger: 'blur' },
          coordinateX: { validator: checkCoordinateX, trigger: 'blur'},
          coordinateY: { validator: checkCoordinateY, trigger: 'blur'},
          size: { validator: checkSize, trigger: 'blur'},
        },

      }
    },
    methods: {
      setColor(event){
        this.ruleForm.color = event;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          // console.log('valid');
          if (valid) {
            this.$emit('addnode',this.ruleForm);
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