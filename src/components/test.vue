<template>
  <el-card id="box-card" class="box-card" :style="'display:'+isCardDisplay">
  </el-card>
</template>

<script>
  export default {
    name: "test",
    data() {
      return{
        isCardDisplay: 'block',
      }
    }
  }
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {

    width: 300px;
  }
</style>