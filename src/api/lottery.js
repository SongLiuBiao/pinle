import request from '@/router/axios'
/**
 *     购彩管理
 *         获取彩票种类
 **/
export function apiGetListLottery(query) {
  return request({
    url: '/admin/lottery/listLottery',
    method: 'get',
    params: query
  })
}
/**
 *     购彩管理
 *         全部订单列表
 **/
export function apiGetListScheme(query) {
  return request({
    url: '/admin/scheme/listScheme',
    method: 'post',
    data: query
  })
}

/**
 *     购彩管理
 *         手动撤单
 **/
export function apiReversal(query) {
  return request({
    url: '/admin/scheme/reversal',
    method: 'post',
    data: query
  })
}

/**
 *     购彩管理
 *         方案出票
 **/
export function apiBuyIntoCompulsory(query) {
  return request({
    url: '/admin/scheme/buyIntoCompulsory',
    method: 'post',
    data: query
  })
}
/**
 *     购彩管理
 *         方案ticket出票
 **/
export function apiTicketDrawBill(query) {
  return request({
    url: '/admin/scheme/ticketDrawBill',
    method: 'post',
    data: query
  })
}
/**
 *     购彩管理
 *         订单列表导出
 **/
export function apiExportListScheme(query) {
  return request({
    url: '/admin/export/scheme',
    method: 'post',
    data: query,
    responseType: 'blob'
  })
}

/**
 *     购彩管理
 *         彩种详情
 **/
export function apiGetLotteryInfo(query) {
  return request({
    url: '/admin/lottery/getLotteryInfo',
    method: 'post',
    data: query
  })
}

/**
 *     购彩管理
 *         彩种详情修改
 **/
export function apiUpdateLottery(query) {
  return request({
    url: '/admin/lottery/updateLottery',
    method: 'post',
    data: query
  })
}
/**
 *     购彩管理
 *         奖期列表
 **/
export function apiGetListIssue(query) {
  return request({
    url: '/admin/issue/listIssue',
    method: 'post',
    data: query
  })
}
/**
 *     购彩管理
 *         奖期新增和修改
 **/
export function apiAddorUpdateIssue(query) {
  return request({
    url: '/admin/issue/updateIssue',
    method: 'post',
    data: query
  })
}
/**
 *     购彩管理
 *         奖期删除
 **/
export function apiDeleteIssue(query) {
  return request({
    url: '/admin/issue/deleteIssue',
    method: 'post',
    data: query
  })
}
/**
 *     购彩管理
 *         奖期详情
 **/
export function apiGetIssueInfo(query) {
  return request({
    url: '/admin/issue/getIssueInfo',
    method: 'post',
    data: query
  })
}
/**
 *     购彩管理
 *         奖期详情-添加开奖号码
 **/
export function apiAddIssueDrawNumber(query) {
  return request({
    url: '/admin/issue/addIssueDrawNumber',
    method: 'post',
    data: query
  })
}
/**
 *     购彩管理
 *         奖期详情-掉期处理
 **/
export function apiProcssIssueLost(query) {
  return request({
    url: '/admin/issue/procssIssueLost',
    method: 'post',
    data: query
  })
}
/**
 *     购彩管理
 *         奖期详情-一键撤单
 **/
export function apiAllReversal(query) {
  return request({
    url: '/admin/issue/allReversal',
    method: 'post',
    data: query
  })
}
/**
 *     购彩管理
 *         奖期详情-兑奖还原
 **/
export function apiRedeemRestore(query) {
  return request({
    url: '/admin/issue/redeemRestore',
    method: 'post',
    data: query
  })
}
/**
 *     购彩管理
 *         奖期详情-足球开奖详情
 **/
export function apiGetFootballMatchInfo(query) {
  return request({
    url: '/admin/issue/getFootballMatchInfo',
    method: 'post',
    data: query
  })
}
/**
 *     购彩管理
 *         奖期详情-修改足球开奖
 **/
export function apiUpdateFootballMatchInfo(query) {
  return request({
    url: '/admin/issue/updateFootballMatch',
    method: 'post',
    data: query
  })
}
/**
 *     购彩管理
 *         奖期详情-足球详情-取消比赛
 **/
export function apiCancelFootballMatch(query) {
  return request({
    url: '/admin/issue/cancelFootballMatch',
    method: 'post',
    data: query
  })
}

/**
 *     购彩管理
 *         彩种设置列表
 **/
export function apiGetlistLottery(query) {
  return request({
    url: '/admin/lottery/listLottery',
    method: 'get',
    params: query
  })
}
/**
 *     购彩管理
 *         获取方案详情
 **/
export function apiGetSchemeInfo(query) {
  return request({
    url: '/admin/scheme/getSchemeInfo',
    method: 'post',
    data: query
  })
}
