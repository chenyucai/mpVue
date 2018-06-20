<template>
  <div class="server-list-wrap">
    <div class="server-list-breadcrumb">
      <img src="/static/images/jindutiao1.png" alt="图片不存在"/>
    </div>
    <ul class="server-list">
      <li class="server-item" v-for="item in serverList" :key="item.id" @click="handleClick(item)">
        <image style="width: 100%;height: 174px;" :src="'http://rcst.oss-cn-shanghai.aliyuncs.com/'+item.icon"></image>
        <div class="server-item-info">
          <span class="server-item-title">{{item.name}}</span>
          <span class="server-item-money">¥{{item.price/100}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex';
  import {SET_CONSULT_SELECTED_SERVER} from "../../../../store/mutation-types";

  export default {
    data() {
      return {}
    },
    computed: {
      ...mapState('consult', [
        'selectedDoctor'
      ]),
      ...mapGetters('consult', [
        'serverList'
      ])
    },
    mounted() {
      this.$store.dispatch('consult/getServerPackageList', this.selectedDoctor.id);
    },
    methods: {
      handleClick(item) {
        this.$store.commit(`consult/${SET_CONSULT_SELECTED_SERVER}`, item);
        wx.navigateTo({
          url: '/pages/consult/server/detail/main'
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../../styles/mixin";

  .server-list-wrap {
    .server-list-breadcrumb {
      width: 100%;
      height: 50px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .server-list {
      display: flex;
      flex-direction: column;
      padding: 10px;
      .server-item {
        margin-bottom: 10px;
        border-radius: 3px;
        background-color: #fff;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        .server-item-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 10px;
          .server-item-title {
            font-size: 15px;
            color: #333;
            line-height: 1.5;
            .ellipsisLn(2);
          }
          .server-item-money {
            color: #ff6666;
            font-size: 18px;
            margin-left: 32px;
          }
        }
      }
    }
  }
</style>
