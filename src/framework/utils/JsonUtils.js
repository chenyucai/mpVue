/**
 * Json对象处理工具类
 */
export default class JsonUtils {

  static toJSONString(json) {
    return JSON.stringify(json);
  }

  static parseObject(JSONString) {
    return JSON.parse(JSONString);
  }

}
