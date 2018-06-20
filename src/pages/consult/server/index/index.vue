<template>
  <div class="server-index-wrap">
    <ul class="server-list">
      <li class="server-item" v-for="(item, index) in doctorList" :key="index" @click="goToList(item)">
        <span class="server-item-name">{{item.doctorName}}</span>
        <img class="server-item-arrow" src="/static/images/icon-arrow-right.png">
      </li>
      <li class="server-item" @click="goToMyServer">
        <span class="server-item-name">我的服务单</span>
        <img class="server-item-arrow" src="/static/images/icon-arrow-right.png">
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {SET_CONSULT_SELECTED_DOCTOR} from "../../../../store/mutation-types";

  export default {
    data() {
      return {}
    },
    computed: {
      ...mapGetters('consult', [
        'doctorList'
      ])
    },
    created() {
      this.$store.dispatch('login').then(() => {
        this.$store.dispatch('consult/getDoctorList');
      });
    },
    methods: {
      goToList(item) {
        this.$store.commit(`consult/${SET_CONSULT_SELECTED_DOCTOR}`, item);
        wx.navigateTo({
          url: '/pages/consult/server/list/main'
        })
      },
      goToMyServer() {
        wx.navigateTo({
          url: '/pages/consult/server/message/main'
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../../styles/mixin";
  .server-index-wrap {
    .server-list {
      font-size: 15px;
      .server-item {
        display: flex;
        align-items: center;
        padding: 13px 15px;
        .hairline-bottom();
        .server-item-name {
          flex: 1;
          font-size: 15px;
        }
        .server-item-arrow {
          width: 8px;
          height: 14px;
        }
      }
    }
  }
</style>
