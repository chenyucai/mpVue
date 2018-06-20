<template>
  <div class="server-detail-page">
    <div class="server-detail-breadcrumb">
      <img width="100%" src="/static/images/jindutiao2.png" alt="图片不存在"/>
    </div>
    <!--<div class="g-server-detail" v-html="selectedServer.detail"></div>-->
    <div>
      <wxParse :content="selectedServer.detail" />
    </div>
    <div class="server-detail-footer">
      <div class="server-detail-money">
        <span class="server-detail-money-label">价格：</span>
        <span class="server-detail-money">¥{{selectedServer.price / 100}}</span>
      </div>
      <div class="server-detail-btn-warp">
        <div class="server-detail-kf">
          <img class="server-detail-img-wrap" src="/static/images/kefu-png.png">
          <span class="server-detail-kf-name">小初客服</span>
        </div>
        <div class="server-detail-pay">立即购买</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import wxParse from 'mpvue-wxparse'

  export default {
    components: {
      wxParse
    },
    data() {
      return {
      }
    },
    computed: {
      ...mapState('consult', [
        'selectedServer'
      ])
    },
    mounted() {
      this.$store.dispatch('consult/getServerById', this.selectedServer.id);
    },
    methods: {
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../../styles/mixin";
  @import url("~mpvue-wxparse/src/wxParse.css");

  .server-detail-page {
    .server-detail-breadcrumb {
      width: 100%;
      height: 50px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .server-detail-footer {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #fff;
      .server-detail-money {
        margin-left: 16px;
        .server-detail-money-label {
          font-size: 14px;
          color: #999;
        }
        .server-detail-money {
          font-size: 19px;
          color: #ED706B;
        }
      }
      .server-detail-btn-warp {
        display: flex;
        .server-detail-kf {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-right: 15px;
          .server-detail-img-wrap {
            width: 22px;
            height: 18px;
          }
          .server-detail-kf-name {
            font-size: 12px;
            color: #666;
          }
        }
        .server-detail-pay {
          width: 120px;
          padding: 19px 0 14px 0;
          text-align: center;
          color: #fff;
          font-size: 17px;
          background-color: @brand-primary;
        }
      }
    }
  }
</style>
