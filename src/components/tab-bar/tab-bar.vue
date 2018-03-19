<template>
  <div class="nav-box">
    <div class="nav" :class="{active: selected === 'doctor'}" @click="goToDoctor">
      <i class="doctor-icon"></i>
      找医生
    </div>
    <div class="nav" :class="{active: selected === 'message'}" @click="goToMessage">
      <i class="message-icon"></i>
      消息
    </div>
    <div class="nav" :class="{active: selected === 'my'}" @click="goToMy">
      <i class="my-icon"></i>
      我
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      selected: {
        type: String
      }
    },
    data() {
      return {}
    },
    methods: {
      goToDoctor() {
        this.$router.push({name: 'consultHospitalList'});
//        this.$router.push({name: 'consultDoctorAll'});
      },
      goToMessage() {
        this.$router.push({name: 'consultMessageList'});
      },
      goToMy() {
        this.$router.push({name: 'userCenter'});
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../styles/mixin";

  .nav-box {
    display: flex;
    position: fixed !important;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    z-index: 100;
    font-size: 10px;
    color: #999;
    background-color: #fff;
    line-height: 1;
    padding-top: 3px;
    box-sizing: border-box;
    .hairline-top();
    .nav {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-flow: column nowrap;
      .doctor-icon {
        .bg-image("~images/nav-doctor", 20px, 25px);
        margin-bottom: 3px;
      }
      .message-icon {
        .bg-image("~images/nav-message", 23px, 23px);
        margin-bottom: 5px;
      }
      .my-icon {
        .bg-image("~images/nav-my", 23px, 23px);
        margin-bottom: 5px;
      }
      &.active {
        color: @brand-primary;
        .doctor-icon {
          .bg-image("~images/nav-doctor-selected", 20px, 25px);
          margin-bottom: 3px;
        }
        .message-icon {
          .bg-image("~images/nav-message-selected", 23px, 23px);
          margin-bottom: 5px;
        }
        .my-icon {
          .bg-image("~images/nav-my-selected", 23px, 23px);
          margin-bottom: 5px;
        }
      }
    }
  }
</style>
