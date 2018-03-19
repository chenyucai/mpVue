import {RCModel} from "../../framework/framework";

export default class PassportTreatmentInfoItem extends RCModel {
  // 治疗类型,01-化疗，02-放疗，03-靶向治疗，04-内分泌治疗
  treatType = '';

  // 开始治疗时间
  treatStartTime = '';

  // 治疗结束时间
  treatEndTime = '';

  // 化疗方案
  chemoPlan = '';

  // 药物
  drugs = '';

  verify() {
    return true;
  }

  convert() {
    return this;
  }
}
