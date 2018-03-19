import {Check, CheckType, RCModel} from "../../framework/framework";
import DateUtils from "../../framework/utils/DateUtils";

export default class ConsultSheetRequest extends RCModel {

  @Check(CheckType.String)
  id = '';

  // 订单id
  @Check(CheckType.String)
  orderId = '';

  // 咨询目的
  @Check(CheckType.String)
  consultPurpose = '';

  // 病情
  @Check(CheckType.String)
  illnessSituation = '';

  // 报告图片
  @Check(CheckType.Array)
  reportsInfo = [];

  // 是否进行过乳腺部位手术，01-有，02-没有
  @Check(CheckType.String)
  hasSurgery = '';

  // 手术日期，不大于今天
  @Check(CheckType.String)
  surgeryDate = '';

  // 病理类型
  @Check(CheckType.String)
  pathologyType = '';

  // 月经状态,01-已绝经，02-未绝经
  @Check(CheckType.String)
  menstrualState = '';

  // 乳腺癌/卵巢癌家族史，01-有，02-没有
  @Check(CheckType.String)
  familyCancer = '';

  verify() {
    return true
  }

  convert() {
    this.surgeryDate = DateUtils.stringToNumber(this.surgeryDate);
    return this;
  }
}
