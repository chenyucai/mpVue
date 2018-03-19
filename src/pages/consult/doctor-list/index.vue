<template>
  <div class="doctor-list-container">
    <div class="doctor-search">
      <div class="search-box">
        <div class="select-hospital" @click="selectHospital">
          <span class="icon"></span>
          <span class="selected-hospital">{{selectedHospital.hospitalName}}</span>
          <span class="arrow"></span>
        </div>
        <div class="search-field">
          <input class="search" type="text" placeholder="搜索医生">
        </div>
      </div>
    </div>
    <ul class="doctor-items">
      <li class="doctor-item" v-for="(item, index) in doctorList" @click="selectDoctor(item)" :key="index">
        <img :src="item.avatar" alt="" class="doctor-item-img">
        <div class="doctor-item-content">
          <div class="doctor-item-name-level">
            <div class="doctor-item-name">{{item.doctorName}}</div>
            <div class="doctor-item-level">{{item.staff}}</div>
          </div>
          <div class="doctor-item-hospital">{{item.hospitalName}}</div>
          <div class="doctor-item-good-at">{{item.strongFiled}}</div>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex';
  import {SET_CONSULT_SELECTED_DOCTOR} from "../../../store/mutation-types";

  export default {
    data() {
      return {
        searchDoctorName: ''
      }
    },
    computed: {
      ...mapState('consult', [
        'selectedHospital'
      ]),
      ...mapGetters('consult', [
        'doctorList'
      ])
    },
    mounted() {
      wx.showLoading({
        title: '加载中'
      });
      this.$store.dispatch('consult/getDoctorList', {
        doctorName: this.searchDoctorName
      }).then(() => {
        wx.hideLoading()
      })
    },
    methods: {
      selectHospital() {
        this.$router.push({
          name: 'consultHospitalList'
        })
      },
      selectDoctor(item) {
        this.$store.commit(`consult/${SET_CONSULT_SELECTED_DOCTOR}`, item);
        wx.navigateTo({
          url: '/pages/consult/doctor/detail?id=1'
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../styles/mixin";

  .doctor-list-container {
    padding-bottom: 60px;
    .doctor-search {
      padding: 5px 15px;
      background: #ffffff;
      .search-box {
        display: flex;
        .select-hospital {
          display: flex;
          align-items: center;
          flex-flow: row nowrap;
          flex: 0 0 106px;
          width: 106px;
          position: relative;
          .icon {
            .bg-image('~images/position', 12px, 15px);
          }
          .arrow {
            .base-arrow-down();
          }
          .selected-hospital {
            flex: 0 0 73px;
            .ellipsis();
            margin: 0 3px 0 4px;
          }
        }
        .search-field {
          flex: 1;
          .search {
            width: 100%;
            height: 36px;
            margin-left: 10px;
            border-radius: 18px;
            text-align: center;
            background-color: #f2f2f2;
          }
        }
      }
    }
    .doctor-items {
      display: flex;
      flex-direction: column;
      background: #ffffff;
      .doctor-item {
        display: flex;
        flex-direction: row;
        padding: 10px 15px 15px 15px;
        .hairline-bottom();
//        .touchHighlight();
        .doctor-item-img {
          flex: 0 0 45px;
          width: 45px;
          height: 45px;
          margin-right: 20px;
          border-radius: 50%;
        }
        .doctor-item-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          .doctor-item-name-level {
            display: flex;
            align-items: flex-end;
            flex-direction: row;
            margin-bottom: 15px;
            .doctor-item-name {
              font-size: 17px;
              color: @color-text-base;
            }
            .doctor-item-level {
              margin-left: 10px;
              font-size: 14px;
              color: @color-text-deep-gray;
            }
          }
          .doctor-item-hospital {
            font-size: 16px;
            margin-bottom: 10px;
          }
          .doctor-item-good-at {
            line-height: 1.5;
            font-size: 14px;
            color: @color-text-gray;
          }
        }
      }
    }
  }
</style>
