<template>
  <div>
    <p>备选色:</p>
    <el-button circle style="background-color: #fe9b6e" @click="updateColor('#fe9b6e')"></el-button>
    <el-button circle style="background-color: #fe7874" @click="updateColor('#fe7874')"></el-button>
    <el-button circle style="background-color: #5ddad2" @click="updateColor('#5ddad2')"></el-button>
    <el-button circle style="background-color: #b27ee9" @click="updateColor('#b27ee9')"></el-button>
    <el-button circle style="background-color: #69c0ff" @click="updateColor('#69c0ff')"></el-button>
    <el-button circle style="background-color: #83a5fe" @click="updateColor('#83a5fe')"></el-button>
    <el-button circle style="background-color: #ffc069" @click="updateColor('#ffc069')"></el-button>
    <el-button circle style="background-color: #96de64" @click="updateColor('#96de64')"></el-button>
  </div>
</template>

<script>
  export default {
    name: "ColorPicker",
    methods: {
      updateColor(color){
        this.$emit('setcolor', color);
      },
    }
  }
</script>

<style scoped>

</style>