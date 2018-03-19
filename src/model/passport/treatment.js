import {Check, CheckType, RCModel} from "../../framework/framework";

export default class PassportTreatmentInfoRequest extends RCModel {
  // 主键id
  id = '';

  // 数据版本
  dataV = '';

  // 治疗信息列表
  @Check(CheckType.Array)
  treatmentInfoList = [];

  verify() {
    return true;
  }

  convert() {
    return this;
  }
}
