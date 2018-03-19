import {Check, CheckType, RCModel} from "../../framework/framework";

export default class ImMessageRequest extends RCModel {
  // 消息类型
  @Check(CheckType.String)
  kinds = '';

  // 消息信息
  @Check(CheckType.String)
  desc = '';

  // 消息大小，文本长度、语音时长、图片大小
  @Check(CheckType.Number)
  size = 0;

  verify() {

  }
}
