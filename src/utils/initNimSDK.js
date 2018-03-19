/* eslint-disable */
const SDK = {};

export default function initNimSDK(options) {
  return SDK.NIM.getInstance(Object.assign({}, {
    debug: false,
    appKey: '',
    account: '',
    token: '',
    onconnect: onConnect,
    onerror: onError,
    onwillreconnect: onWillReconnect,
    ondisconnect: onDisconnect,
    // 多端
    onloginportschange: onLoginPortsChange,
    // 用户关系
    onblacklist: onBlacklist,
    onsyncmarkinblacklist: onMarkInBlacklist,
    onmutelist: onMutelist,
    onsyncmarkinmutelist: onMarkInMutelist,
    // 好友关系
    onfriends: onFriends,
    onsyncfriendaction: onSyncFriendAction,
    // 用户名片
    onmyinfo: onMyInfo,
    onupdatemyinfo: onUpdateMyInfo,
    onusers: onUsers,
    onupdateuser: onUpdateUser,
    // 群组
    onteams: onTeams,
    onsynccreateteam: onCreateTeam,
    onteammembers: onTeamMembers,
    onsyncteammembersdone: onSyncTeamMembersDone,
    onupdateteammember: onUpdateTeamMember,
    // 会话
    onsessions: onSessions,
    onupdatesession: onUpdateSession,
    // 消息
    onroamingmsgs: onRoamingMsgs,
    onofflinemsgs: onOfflineMsgs,
    onmsg: onMsg,
    // 系统通知
    onofflinesysmsgs: onOfflineSysMsgs,
    onsysmsg: onSysMsg,
    onupdatesysmsg: onUpdateSysMsg,
    onsysmsgunread: onSysMsgUnread,
    onupdatesysmsgunread: onUpdateSysMsgUnread,
    onofflinecustomsysmsgs: onOfflineCustomSysMsgs,
    oncustomsysmsg: onCustomSysMsg,
    // 同步完成
    onsyncdone: onSyncDone
  }, options));
}

function onConnect() {
  console.log('连接成功');
}

function onError(error, obj) {
  console.log('发生错误', error, obj);
}

function onWillReconnect(obj) {
  // 此时说明 `SDK` 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
  console.log('即将重连', obj);
}

function onDisconnect(error) {
  // 此时说明 `SDK` 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
  console.log('连接断开', error);
  if (error) {
    switch (error.code) {
      // 账号或者密码错误, 请跳转到登录页面并提示错误
      case 302:
        break;
      // 重复登录, 已经在其它端登录了, 请跳转到登录页面并提示错误
      case 417:
        break;
      // 被踢, 请提示错误后跳转到登录页面
      case 'kicked':
        alert(`你的帐号于其他端登录，请确定帐号信息安全!`);
        break;
      default:
        break;
    }
  }
}

function onLoginPortsChange(loginPorts) {
  console.log('当前登录帐号在其它端的状态发生改变了', loginPorts);
}

function onBlacklist(blacklist) {
  // console.log('收到黑名单', blacklist);
}

function onMarkInBlacklist(obj) {
  // console.log(obj.account + '被你' + (obj.isAdd ? '加入' : '移除') + '黑名单', obj);
}

function onMutelist(mutelist) {
  // console.log('收到静音列表', mutelist);
}

function onMarkInMutelist(obj) {
  // console.log(obj.account + '被你' + (obj.isAdd ? '加入' : '移除') + '静音列表', obj);
}

function onFriends(friends) {
  // console.log('收到好友列表', friends);
}

function onSyncFriendAction(obj) {
  // console.log('收到好友操作', obj);
  switch (obj.type) {
    case 'addFriend':
      console.log('你在其它端直接加了一个好友' + obj);
      onAddFriend(obj.friend);
      break;
    case 'applyFriend':
      console.log('你在其它端申请加了一个好友' + obj);
      break;
    case 'passFriendApply':
      console.log('你在其它端通过了一个好友申请' + obj);
      onAddFriend(obj.friend);
      break;
    case 'rejectFriendApply':
      console.log('你在其它端拒绝了一个好友申请' + obj);
      break;
    case 'deleteFriend':
      console.log('你在其它端删了一个好友' + obj);
      onDeleteFriend(obj.account);
      break;
    case 'updateFriend':
      console.log('你在其它端更新了一个好友', obj);
      onUpdateFriend(obj.friend);
      break;
  }
}

function onAddFriend(friend) {
  // data.friends = nim.mergeFriends(data.friends, friend);
}

function onDeleteFriend(account) {
  // data.friends = nim.cutFriendsByAccounts(data.friends, account);
}

function onUpdateFriend(friend) {
  // data.friends = nim.mergeFriends(data.friends, friend);
}

function onMyInfo(user) {
  // console.log('收到我的名片', user);
}

function onUpdateMyInfo(user) {
  // console.log('我的名片更新了', user);
}

function onUsers(users) {
  // console.log('收到用户名片列表', users);
}

function onUpdateUser(user) {
  // console.log('用户名片更新了', user);
}

function onTeams(teams) {
  // console.log('群列表', teams);
}

function onCreateTeam(team) {
  // console.log('你创建了一个群', team);
}

function onTeamMembers(obj) {
  // console.log('收到群成员', obj);
}

function onSyncTeamMembersDone() {
  // console.log('同步群列表完成');
}

function onUpdateTeamMember(teamMember) {
  // console.log('群成员信息更新了', teamMember);
}

function onSessions(sessions) {
  // console.log('收到会话列表', sessions);
}

function onUpdateSession(session) {
  // console.log('会话更新了', session);
}

function onRoamingMsgs(obj) {
  // console.log('漫游消息', obj);
}

function onOfflineMsgs(obj) {
  // console.log('离线消息', obj);
}

function onMsg(msg) {
  // console.log('收到消息', msg.scene, msg.type, msg);
}

function onOfflineSysMsgs(sysMsgs) {
  // console.log('收到离线系统通知', sysMsgs);
}

function onSysMsg(sysMsg) {
  // console.log('收到系统通知', sysMsg)
}

function onUpdateSysMsg(sysMsg) {
}


function onSysMsgUnread(obj) {
  // console.log('收到系统通知未读数', obj);
}

function onUpdateSysMsgUnread(obj) {
  // console.log('系统通知未读数更新了', obj);
}

function onOfflineCustomSysMsgs(sysMsgs) {
  // console.log('收到离线自定义系统通知', sysMsgs);
}

function onCustomSysMsg(sysMsg) {
  console.log('收到自定义系统通知', sysMsg);
}

function onSyncDone() {
  // console.log('同步完成');
}
