<template>
  <div class="top-tips">
    <p>{{title}}</p>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../styles/mixin";

  .top-tips {
    margin-bottom: 5px;
    padding: 13px 15px;
    font-size: 14px;
    color: @brand-primary;
    background-color: rgba(35,183,162,0.2);
  }
</style>
