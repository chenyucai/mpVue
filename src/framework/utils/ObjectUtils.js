/**
 * 对象工具类
 */
export default class ObjectUtils {

  static isObject(object) {
    return object && {}.toString.call(object) === '[object Object]';
  }

  static isNullOrEmpty(object) {
    if (object === null || object === undefined) {
      return true;
    }
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  static deepCopy(object) {
    if (object === null) {
      return object;
    }
    if (typeof object !== 'object') {
      return object;
    }
    const newObj = {}.toString.call(object) === '[object Array]' ? [] : {};
    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        newObj[key] = typeof object[key] === 'object'
          ? this.deepCopy(object[key])
          : object[key];
      }
    }
    return newObj;
  }

  static merge(target) {
    for (let i = 1, j = arguments.length; i < j; i++) {
      let source = arguments[i] || {};
      for (let prop in source) {
        if (source.hasOwnProperty(prop)) {
          let value = source[prop];
          if (value !== undefined) {
            target[prop] = value;
          }
        }
      }
    }

    return target;
  }

}
