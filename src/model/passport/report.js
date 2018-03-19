import {Check, CheckType, RCModel} from "../../framework/framework";
import DateUtils from "../../framework/utils/DateUtils";

export default class PassportReportInfoModel extends RCModel {
  // 主键id
  id = '';

  // 数据版本
  dataV = '';

  // 上传日期
  @Check(CheckType.String)
  reportDate = '';

  // 备注
  @Check(CheckType.String)
  remark = '';

  // 报告图片
  @Check(CheckType.Array)
  reportsInfo = [];

  verify() {
    return true;
  }

  convert() {
    this.reportDate = DateUtils.stringToNumber(this.reportDate);
    return this;
  }
}
