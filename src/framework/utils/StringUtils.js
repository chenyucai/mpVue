/**
 * 字符串工具类
 */
export default class StringUtils {

  static isBlank(string) {
    return string === '' || string === null || string === undefined;
  }

  static toArray(string, char = ',') {
    return string.split(char);
  }

}
