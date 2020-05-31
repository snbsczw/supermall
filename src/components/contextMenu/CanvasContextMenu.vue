<template>
  <ul  id="canvasBoxCard" class="canvas-card" :style="'visibility:'+isVisibility">
    <li>添加节点</li>
    <li>添加线段</li>
    <li>关系检测</li>
    <li></li>
    <li></li>
    <li></li>
  </ul>
</template>

<script>
  export default {
    name: "CanvasContextMenu",
    data() {
      return{
        isVisibility: 'hidden',
      }
    },
  }
</script>

<style scoped>
  li {
    cursor: pointer;
    margin-left: 0;
  }
  li:hover {
    color: #aaa;
  }
  ul {
    list-style: none;
    line-height: 20px;
    margin: 0;
    padding: 10px 0;
    background-color: rgba(255, 255, 255, 0.9);
    border: 1px solid #e2e2e2;
    border-radius: 4px;
  }
  .canvas-card {
    background-color: #fff;
    border: none;
    position: absolute;
    width: 100px;
  }
</style>