<template>
  <div class="user-wrap">
    <ul class="user-list">
      <li class="user-item">
        <img class="user-item-icon icon-order" src="../../../static/images/user-center-order.png">
        <span class="user-item-name">我的服务单</span>
        <img class="user-item-arrow" src="../../../static/images/icon-arrow-right.png">
      </li>
      <li class="user-item">
        <img class="user-item-icon icon-logo" src="../../../static/images/user-center-logo.png">
        <span class="user-item-name">关于若初</span>
        <img class="user-item-arrow" src="../../../static/images/icon-arrow-right.png">
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    }
  }
</script>

<style lang="less" scoped>
  @import "../../styles/mixin";

  .user-wrap {
    .user-list {
      .user-item {
        display: flex;
        align-items: center;
        padding: 13px 15px;
        .hairline-bottom();
        .user-item-icon {
          margin-right: 15px;
          &.icon-order {
            width: 21px;
            height: 25px;
          }
          &.icon-logo {
            width: 24px;
            height: 24px;
          }
        }
        .user-item-name {
          flex: 1;
          font-size: 15px;
        }
        .user-item-arrow {
          width: 8px;
          height: 14px;
        }
      }
    }
  }
</style>
