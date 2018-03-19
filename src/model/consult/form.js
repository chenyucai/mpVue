import {Check, CheckType, RCModel} from "../../framework/framework";

export default class ConsultFormRequest extends RCModel {
  // 是否进行过手术
  @Check(CheckType.String)
  hasSurgery = '';

  // 病理类型
  @Check(CheckType.String)
  pathological = '';

  // 手术日期
  @Check(CheckType.String)
  surgeryDate = '';

  // 月经状态
  @Check(CheckType.String)
  menstrualState = '';

  // 家族史
  @Check(CheckType.String)
  familyHistory = '';

  // 咨询目的
  @Check(CheckType.String)
  purpose = '';

  // 病情描述
  @Check(CheckType.String)
  describe = '';

  // 筛查报告
  @Check(CheckType.Array)
  screeningReports = [];

  // 病理检查报告
  @Check(CheckType.Array)
  pathologyReports = [];

  // 门诊或住院病历资料
  @Check(CheckType.Array)
  hospitalMaterial = [];

  verify() {
    return true;
  }

  convert() {
    return this;
  }
}
