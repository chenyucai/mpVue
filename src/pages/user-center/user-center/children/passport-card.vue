<template>
  <div class="passport-card-tpl">
    <div class="m-card-header">
      <span class="u-card-icon"></span>
      <span class="u-card-title">健康护照</span>
    </div>
    <div class="m-card-body">
      完善健康护照有助于您的医师更全面的了解您的情况，给予更详细更有针对性的意见
    </div>
    <div class="m-card-footer" @click="goToPassport">
      <span class="u-footer-title">完善健康护照</span>
      <span class="u-footer-arrow"></span>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    created() {
    },
    methods: {
      goToPassport() {
        this.$router.push({
          name: 'passport'
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../../styles/mixin";

  .passport-card-tpl {
    min-height: 180px;
    padding: 24px 15px;
    box-sizing: border-box;
    background: ~"url(/static/images/passport-card-bg@2x.png)" center;
    background-size: cover;
    border-radius: 5px;
    .m-card-header {
      display: flex;
      .u-card-icon {
        .bg-image('~images/passport-card-icon', 33px, 21px);
        margin-right: 10px;
      }
      .u-card-title {
        font-size: 18px;
        font-weight: 600;
        color: #ffffff;
      }
    }
    .m-card-body {
      font-size: 16px;
      color: #ffffff;
      line-height: 1.4;
      margin: 27px 0;
    }
    .m-card-footer {
      display: flex;
      align-items: center;
      .u-footer-title {
        flex: 1;
        text-align: right;
        font-size: 15px;
        color: #ffffff;
        margin-right: 11px;
      }
      .u-footer-arrow {
        .base-arrow-right-white();
      }
    }
  }
</style>
