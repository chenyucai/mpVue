/**
 * 支付工具类
 */
export default class PayUtils {

  static createPay(model, callback) {
    window.$InvokePay(model, (status, msg) => {
      typeof callback === 'function' ? callback(status, msg) : null;
    });
  }

  static priceYuanToFen(price) {
    return Number(price) * 100;
  }

  static priceFenToYuan(price) {
    return Number(price) / 100;
  }

}
