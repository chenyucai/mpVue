import {Check, CheckType, RCModel} from "../../framework/framework";
import DateUtils from "../../framework/utils/DateUtils";

export default class PassportSurgeryInfoModel extends RCModel {
  // 主键id
  id = '';

  // 数据版本
  dataV = '';

  // 手术医院
  @Check(CheckType.String)
  hospital = '';

  // 手术医生
  @Check(CheckType.String)
  doctorName = '';

  // 手术日期
  @Check(CheckType.String)
  surgeryDate = '';

  // 手术方式
  @Check(CheckType.String)
  surgeryType = '';

  verify() {
    return true;
  }

  convert() {
    this.surgeryDate = DateUtils.stringToNumber(this.surgeryDate);
    return this;
  }
}
