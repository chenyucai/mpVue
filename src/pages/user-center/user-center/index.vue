<template>
  <div class="user-center-page">
    <div class="m-user-info" v-if="!isRegister" @click="goToRegister">
      <img src="/static/images/avatar-female@2x.png" alt="" class="u-user-icon">
      <span class="u-title">登录／注册</span>
    </div>
    <div class="m-user-info" v-if="isRegister">
      <img src="/static/images/avatar-female@2x.png" alt="" class="u-user-icon">
      <span class="name">{{userInfo.urInfo.realName}}</span>
      <span class="sex">{{userInfo.urInfo.gender}}</span>
    </div>
    <div class="u-user-passport">
      <passport-card></passport-card>
    </div>
    <ul class="m-nav-list">
      <li class="m-nav-item" @click="goToOrderList">
        <span class="u-nav-icon icon-order"></span>
        <span class="u-nav-name">我的服务单</span>
        <span class="u-nav-arrow"></span>
      </li>
      <li class="m-nav-item" @click="goToAboutUs">
        <span class="u-nav-icon icon-logo"></span>
        <span class="u-nav-name">关于若初</span>
        <span class="u-nav-arrow"></span>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex';
  import PassportCard from './children/passport-card.vue';

  export default {
    components: {
      PassportCard
    },
    computed: {
      ...mapState([
        'userInfo'
      ]),
      ...mapGetters([
        'isUserRegistered'
      ]),
      isRegister() {
        return this.isUserRegistered;
      }
    },
    data() {
      return {}
    },
    created() {
    },
    methods: {
      goToOrderList() {
        this.$router.push({
          name: 'orderList'
        })
      },
      goToRegister() {
        this.$router.push({
          name: 'registerMobile'
        })
      },
      goToAboutUs() {
        this.$router.push({
          name: 'aboutUs'
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../styles/mixin";

  .user-center-page {
    padding-bottom: 60px;
    .m-user-info {
      display: flex;
      align-items: center;
      padding: 15px;
      background: #ffffff;
      .hairline-bottom();
      .u-user-icon {
        flex: 0 0 60px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-right: 20px;
      }
      .u-title {
        font-size: 18px;
        font-weight: 600;
      }
    }

    .u-user-passport {
      padding: 15px;
      margin-bottom: 10px;
      background: #ffffff;
    }

    .m-nav-list {
      background: #ffffff;
      .m-nav-item {
        display: flex;
        align-items: center;
        padding: 13px 15px;
        .hairline-bottom();
        .touchHighlight();
        .u-nav-icon {
          margin-right: 15px;
          &.icon-order {
            .bg-image('~images/user-center-order', 21px, 25px);
          }
          &.icon-logo {
            .bg-image('~images/user-center-logo', 24px, 24px);
          }
        }
        .u-nav-name {
          flex: 1;
          font-size: 15px;
        }
        .u-nav-arrow {
          .base-arrow-right();
        }
      }
    }
  }
</style>
