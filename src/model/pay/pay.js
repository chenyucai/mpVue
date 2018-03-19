import {Check, CheckType, RCModel} from "../../framework/framework";

export default class PayRequest extends RCModel {

  // "机构支付标识，要求在32以内"
  @Check(CheckType.String)
  comId = '';

  // "商户交易号，要求在32以内，每家机构唯一, MD5(业务订单号 + 交易金额)"
  @Check(CheckType.String)
  tradeNo = '';

  // "支付用户的标识ID, 要求在32以内，每家机构唯一"
  @Check(CheckType.String)
  payerId = '';

  // "支付设备ID，要求在32以内"
  @Check(CheckType.String)
  deviceId = 'web';

  // "交易金额 单位： 分, 1元 = 100分"
  @Check(CheckType.Number)
  amount = 0;

  // "支付方式：01-微信支付，02-支付宝支付"
  @Check(CheckType.String)
  payMode = '01';

  // "支付描述，长度要求在128以内"
  @Check(CheckType.String)
  payDesc = '';

  // "支付详情"
  @Check(CheckType.String)
  payDetail = '';

  // "支付结果页面跳转URL, 长度要求在230以内"
  @Check(CheckType.String)
  redirect = '';

  // "异步回调通知URL, 长度要求在230以内"
  @Check(CheckType.String)
  notifyURL = '';

  // "支付数据验签值；验签方式参考文档，为发保证安全建议验签值在服务后端计算"
  @Check(CheckType.String)
  sign = '11111';

  verify() {

  }
}
