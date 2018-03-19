import {blob, doRequest} from "../utils/http";

/**
 * 获取 OSS signature
 * @param {string} bucket - rcst-不需要验签, rcfs-需要验签
 * @param {string} fileKey - 文件存储key
 */
export const getOssSignature = (bucket, fileKey = '') => doRequest('/api/ali/oss/signature', {bucket, fileKey});

/**
 * 获取rcfs文件 stream
 * @param fileKey
 * @return {Promise.<void>}
 */
export const getOssRcfsFile = async (fileKey) => blob('/api/ali/oss/preview', {bucket: 'rcfs', fileKey});

/**
 * 获取用户信息
 */
export const getUserInfo = () => doRequest('/api/user/info/search');

/**
 * 更新用户信息
 * @param model
 */
export const updateUserInfo = (model) => doRequest('/api/health/user/info/update', model);

/**
 * 更新用户头像
 * @param userId - 用户ID
 * @param avatar - 头像地址
 */
export const updateUserAvatar = ({userId, avatar}) => doRequest('/api/health/user/avatar/update', {userId, avatar});

/**
 * 发送验证码
 * @param phone - 手机号
 */
export const sendCaptcha = (phone) => doRequest('/api/captcha/info/send', phone);

/**
 * 验证手机验证码
 * @param phone - 手机号
 * @param captcha - 验证码
 * @param captchaKey - 验证码Key
 */
export const verifyHealthCaptcha = ({phone, captcha, captchaKey}) => doRequest('/api/captcha/info/verify', {phone, captcha, captchaKey});
