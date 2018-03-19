<template>
  <div class="hospital-list-container">
    <div class="hospital-search">
      <div class="search-box">
        <input class="search" type="text" placeholder="请输入医院名称">
      </div>
    </div>
    <ul class="hospital-items">
      <li class="hospital-item" v-for="(item, index) in hospitalList" @click="goToDoctorList(item)" :key="index">
        <img :src="item.hospitalImg" alt="" class="hospital-item-img">
        <div class="hospital-item-content">
          <div class="hospital-item-name">{{item.hospitalName}}</div>
          <div class="hospital-item-level">{{item.hospitalLevel}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {SET_CONSULT_SELECTED_HOSPITAL} from "../../../store/mutation-types";

  export default {
    data() {
      return {
        searchHospitalName: ''
      }
    },
    computed: {
      ...mapGetters('consult', [
        'hospitalList'
      ])
    },
    mounted() {
      wx.showTabBarRedDot({
        index: 0
      });
      wx.showLoading({
        title: '加载中'
      });
      this.$store.dispatch('consult/getHospitalList', {
        hospitalName: this.searchHospitalName
      }).then(() => {
        wx.hideLoading()
      });
    },
    methods: {
      goToDoctorList(item) {
        this.$store.commit(`consult/${SET_CONSULT_SELECTED_HOSPITAL}`, item);
        wx.navigateTo({
          url: '/pages/consult/doctor/list?id=1'
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../styles/mixin";

  .hospital-list-container {
    padding-bottom: 60px;
    .hospital-search {
      padding: 5px 15px;
      background-color: @brand-primary;
      .search-box {
        height: 36px;
        border-radius: 18px;
        background-color: #fff;
        .search {
          text-align: center;
          width: 100%;
          height: 100%;
        }
        ::-webkit-input-placeholder {
          font-size: 15px;
          color: @color-text-gray;
        }
      }
    }
    .hospital-items {
      display: flex;
      flex-direction: column;
      background: #ffffff;
      .hospital-item {
        display: flex;
        flex-direction: row;
        padding: 20px 15px;
        .hairline-bottom();
//        .touchHighlight();
        .hospital-item-img {
          flex: 0 0 80px;
          width: 80px;
          height: 60px;
          margin-right: 15px;
        }
        .hospital-item-content {
          flex: 1;
          .hospital-item-name {
            margin: 10px 0;
            font-size: 15px;
            color: @color-text-deep-gray;
          }
          .hospital-item-level {
            font-size: 14px;
            color: @brand-primary;
          }
        }
      }
    }
  }
</style>
