import {RCModel} from "../../framework/framework";

export default class PassportReportsInfoItem extends RCModel {

  type = '';

  // 图片集合
  imgs = [];

  verify() {
    return true;
  }

  convert() {
    return this;
  }
}
