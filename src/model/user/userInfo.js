import {RCModel} from "../../framework/framework";

export default class UserInfoRequest extends RCModel {

  id = '';

  healthUserInfo = {};

  verify() {
    return true;
  }

  convert() {
    return this;
  }
}
