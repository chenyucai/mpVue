<template>
  <div class="message-list-container">
    <ul class="message-items">
      <li class="message-item" v-for="(item,index) in chatDoctorList" :key="index">
        <div class="g-message-title">
          <div class="m-img">
            <img class="u-img">
          </div>
          <div class="m-doctor-info">
            <div class="m-doctor-name">
              <span class="u-doctor-name">{{item.doctorName}}</span>
              <span class="u-doctor-position">{{doctorLevelToText(item.staff)}}</span>
            </div>
            <div class="u-chat-content" v-html="formatContent(item)"></div>
          </div>
        </div>
        <div class="m-chat-wrap">
          <span class="u-time">{{item.consultSheetTime === 0 ? '' : DateUtils.format('yyyy/MM/dd', DateUtils.longToDate(item.consultSheetTime))}}</span>
          <span class="u-content">{{item.illnessDesc}}</span>
        </div>
      </li>
    </ul>
    <div class="blank-page" v-if="chatDoctorList.length === 0">
      <img class="blank-page-icon" src="/static/images/no-result.png">
      <div class="blank-page-text">暂无消息</div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {doctorLevelToText, ImMessageTypes} from "../../../../utils/utils";

  export default {
    data() {
      return {
        doctorLevelToText
      }
    },
    computed: {
      ...mapGetters('consult', [
        'chatDoctorList'
      ])
    },
    mounted() {
      this.$store.dispatch('consult/getChatDoctorList')
    },
    methods: {
      formatContent(item) {
        if (!item.latestMsg) {
          return '';
        }
        let content = '';
        try {
          if (item.latestMsg.kinds === ImMessageTypes.Text) {
            content = item.latestMsg.desc;
          } else if (item.latestMsg.kinds === ImMessageTypes.IMG) {
            content = '[图片]';
          } else if (item.latestMsg.kinds === ImMessageTypes.Audio) {
            content = '[语音]';
          }
        } catch (e) {
          console.log('format message error');
        }
        return content;
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../../styles/mixin";

  .message-list-container {
    padding: 25px 15px 60px;
    .message-search {
      background-color: #fff;
      padding: 5px 15px;
      .search-box {
        height: 36px;
        border-radius: 18px;
        background-color: #f2f2f2;
        .search {
          text-align: center;
          width: 100%;
          height: 100%;
        }
      }
    }

    .message-items {
      .message-item {
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
        padding-left: 10px;
        border-radius: 5px;
        background-color: #f2f2f2;
        .g-message-title {
          display: flex;
          align-items: center;
          .hairline-bottom(#f2f2f2, 2px);
          .m-img {
            width: 33px;
            height: 33px;
            .u-img {
              width: 100%;
              height: 100%;
              border-radius: 50px;
            }
          }
          .m-doctor-info {
            margin-left: 10px;
            margin-top: 18px;
            .m-doctor-name {
              margin-bottom: 19px;
              .u-doctor-name {
                font-size: 16px;
                color: #333;
                font-weight: 700;
              }
              .u-doctor-position {
                padding: 2px 5px;
                margin-left: 10px;
                border-radius: 8px;
                font-size: 11px;
                color: #fff;
                background-color: #ff9999;
              }
            }
            .u-chat-content {
              margin-bottom: 9px;
              margin-right: 10px;
              font-size: 15px;
              color: #666;
              .ellipsisLn(1);
            }
          }
        }
        .m-chat-wrap {
          display: flex;
          flex-direction: column;
          .u-time {
            font-size: 12px;
            color: #ccc;
            margin-top: 12px;
            margin-bottom: 3px;
          }
          .u-content {
            margin-bottom: 10px;
            margin-right: 10px;
            font-size: 14px;
            color: #999;
            line-height: 1.5;
            .ellipsisLn(3);
          }
        }
      }
    }
    .blank-page {
      padding-top: 30%;
      text-align: center;
      .blank-page-icon {
        margin: 0 auto;
        width: 120px;
        height: 79px;
      }
      .blank-page-text {
        margin-top: 18px;
        font-size: 15px;
        color: #666;
      }
    }
  }
</style>
