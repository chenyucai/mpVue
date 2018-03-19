<template>
  <div class="consult-doctor-detail-page">
    <div class="m-doctor-panel">
      <img :src="selectedDoctor.avatar" alt="" class="u-doctor-icon">
      <div class="m-doctor-info">
        <div class="u-doctor-name">
          <span class="u-name">{{selectedDoctor.doctorName}}</span>
          <span class="u-level">{{selectedDoctor.staff}}</span>
        </div>
        <div class="u-hospital">{{selectedDoctor.hospitalName}}</div>
      </div>
    </div>
    <div class="u-doctor-intro">
      <div class="u-content" :class="{fold: fold}">
        <span>擅长：{{selectedDoctor.strongFiled}}</span>
        <span class="fold-btn" @click="fold = !fold">收起</span>
      </div>
    </div>
    <div class="u-doctor-remark">
      通知：侯意枫每周二、周四、周六有空，建议在此时间提问。如果医生未及时回复，请您谅解。
    </div>
    <div class="m-doctor-server">
      <div class="u-server-title">医生服务</div>
      <ul class="m-server-list">
        <li class="u-server-item">
          <span class="u-server-icon"></span>
          <div class="u-server-info">
            <span class="u-server-name">{{selectedServer.goodsKind}}</span>
            <span class="u-server-remark">{{selectedServer.serveDesc}}</span>
          </div>
        </li>
      </ul>
    </div>

    <base-button
      :fixed-bottom="true"
      :text="buttonText"
      @click="goToPay"
    ></base-button>
  </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex';
  import BaseButton from '../../../components/base-button/base-button.vue';
  import PayUtils from "../../../framework/utils/PayUtils";

  export default {
    components: {
      BaseButton
    },
    data() {
      return {
        fold: false
      }
    },
    computed: {
      ...mapState('consult', [
        'selectedDoctor'
      ]),
      ...mapGetters('consult', [
        'selectedServer'
      ]),
      ...mapGetters([
        'isUserRegistered'
      ]),
      buttonText() {
        return `${this.selectedServer.goodsKind}（¥${PayUtils.priceFenToYuan(this.selectedServer.servePrice)}）`;
      }
    },
    mounted() {
      this.$loading.show();
      this.$store.dispatch('consult/getDoctorServer').then(() => {
        this.$loading.hide();
      });
    },
    methods: {
      goToPay() {
        if (!this.isUserRegistered) {
          this.$router.push({
            name: 'registerMobile',
            query: {
              target: 'consultDoctorDetail'
            }
          });
        } else {
          this.$loading.show();
          this.$store.dispatch('consult/createOrder').then(() => {
            this.$loading.hide();
            this.$router.push({
              name: 'consultPay'
            });
          });
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../styles/mixin";

  .consult-doctor-detail-page {
    .m-doctor-panel {
      display: flex;
      padding: 22px 15px;
      background: @brand-primary;
      .u-doctor-icon {
        width: 45px;
        height: 45px;
        margin-right: 15px;
        border-radius: 50%;
      }
      .m-doctor-info {
        color: #ffffff;
        .u-doctor-name {
          display: flex;
          align-items: flex-end;
          margin-bottom: 10px;
          line-height: 1;
          .u-name {
            font-size: 17px;
            margin-right: 8px;
          }
          .u-level {
            font-size: 14px;
          }
        }
      }
    }

    .u-doctor-intro {
      padding: 15px;
      background: #ffffff;
      .u-content {
        font-size: 14px;
        color: @color-text-gray;
        line-height: 1.4;
        &.fold {
        }
        .fold-btn {
          color: #57B3F6;
        }
      }
    }

    .u-doctor-remark {
      padding: 15px;
      color: #ffffff;
      background: @brand-primary;
      opacity: 0.5;
      line-height: 1.4;
      font-size: 14px;
      margin: 10px 0;
    }

    .m-doctor-server {
      background: #ffffff;
      .u-server-title {
        padding: 13px 15px;
        font-size: 15px;
        color: @color-text-deep-gray;
        .hairline-bottom();
      }
      .m-server-list {
        background: #ffffff;
        .u-server-item {
          display: flex;
          align-items: center;
          padding: 17px 15px;
          .u-server-icon {
            flex: 0 0 28px;
            margin-right: 15px;
            .bg-image('~images/consult-server-type', 28px, 25px);
          }
          .u-server-info {
            display: flex;
            flex-direction: column;
            .u-server-name {
              margin-bottom: 5px;
            }
            .u-server-remark {
              font-size: 14px;
              color: @color-text-gray;
            }
          }
        }
      }
    }
  }
</style>
