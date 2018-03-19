import {RCModel} from "../../framework/framework";

export default class UserRealInfo extends RCModel {
  phone = '';
  realName = '';
  cardNo = '';

  verify() {
    // if (StringUtils.isBlank(this.realName)) {
    //   throwErrorMessage('请输入姓名');
    //   return false;
    // }
    return true;
  }
  convert() {
    return this;
  }
}
