import {Check, CheckType, RCModel} from "../../framework/framework";

export default class PassportPathologyInfoModel extends RCModel {
  // 主键id
  id = '';

  // 数据版本
  dataV = '';

  // 病理类型
  @Check(CheckType.String)
  pathologyType = '';

  // 最大径
  @Check(CheckType.String)
  maxLength = '';

  // 脉管侵犯
  @Check(CheckType.String)
  vascularInvasion = '';

  // 组织学分级
  @Check(CheckType.String)
  histologyClassification = '';

  // 转移淋巴结（个数）
  @Check(CheckType.Number)
  metastaticLymphNode = 0;

  // er
  @Check(CheckType.String)
  er = '';

  // pr
  @Check(CheckType.String)
  pr = '';

  // her2
  @Check(CheckType.String)
  her2 = '';

  // KI-67
  @Check(CheckType.String)
  ki67 = '';

  // FISH
  @Check(CheckType.String)
  fish = '';

  // 月经状态： 01-未绝经、02-已绝经
  @Check(CheckType.String)
  menstrualState = '';

  // 乳腺癌／卵巢癌家族史： 01-有、02-无
  @Check(CheckType.String)
  familyCancer = '';

  verify() {
    return true;
  }

  convert() {
    return this;
  }
}
