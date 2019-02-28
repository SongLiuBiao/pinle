import request from '@/router/axios'
/**
 * 
 *    通道管理
 *       通道列表
 **/
export function apiGetlistPayment(query) {
  return request({
    url: '/admin/payment/listPayment',
    method: 'post',
    data: query
  })
}
/**
 * 
 *    通道管理
 *      修改支付通道
 **/
export function apiUpdatePayment(query) {
  return request({
    url: '/admin/payment/updatePayment',
    method: 'post',
    data: query
  })
}
/**
 * 
 *    充值明细
 *       充值列表
 **/
export function apiGetRechargeList(query) {
  return request({
    url: '/admin/capital/listCapitalRecharge',
    method: 'post',
    data: query
  })
}
/**
 * 
 *    充值明细
 *       充值详情
 **/
export function apiGetRechargeInfo(query) {
  return request({
    url: '/admin/capital/getCapitalInRechargeInfo',
    method: 'post',
    data: query
  })
}
/**
 * 
 *    充值明细
 *       修改充值状态
 **/
export function apiUpdateStatus(query) {
  return request({
    url: '/admin/capital/dealWithRecharge',
    method: 'post',
    data: query
  })
}
/**
 * 
 *    充值明细
 *       充值列表导出
 **/
export function apiExportRecharge(query) {
  return request({
    url: '/admin/export/recharge',
    method: 'post',
    data: query,
    responseType: 'blob'
  })
}
/**
 * 
 *    提现申请
 *       提现列表
 **/
export function apiGetListCapitalWithdraw(query) {
  return request({
    url: '/admin/capital/listCapitalWithdraw',
    method: 'post',
    data: query
  })
}
/**
 * 
 *    提现申请
 *       提现列表导出
 **/
export function apiExportWithdraw(query) {
  return request({
    url: '/admin/export/withdraw',
    method: 'post',
    data: query,
    responseType: "blob"
  })
}
/**
 * 
 *    提现申请
 *       提现详情
 **/
export function apiGetCapitalWithdrawInfo(query) {
  return request({
    url: '/admin/capital/getCapitalWithdrawInfo',
    method: 'post',
    data: query
  })
}
/**
 * 
 *    提现申请
 *       提现详情 -修改银行信息
 **/
export function apiUpdateBankInfo(query) {
  return request({
    url: '/admin/capital/updateBankInfo',
    method: 'post',
    data: query
  })
}
/**
 * 
 *    提现申请
 *       提现详情 -提现状态通过、拒绝
 **/
export function apiUpdateDealWithDrawStatus(query) {
  return request({
    url: '/admin/capital/dealWithDraw',
    method: 'post',
    data: query
  })
}
/**
 * 
 *    中奖明细
 *       中奖列表
 **/
export function apiGetListPrize(query) {
  return request({
    url: '/admin/capital/listCapitalPrize',
    method: 'post',
    data: query
  })
}
/**
 * 
 *    中奖明细
 *       中奖列表-兑奖
 **/
export function apiDealCapitalPrize(query) {
  return request({
    url: '/admin/capital/dealCapitalPrize',
    method: 'post',
    data: query
  })
}
/**
 * 
 *    中奖明细
 *       中奖列表导出
 **/
export function apiExportPrize(query) {
  return request({
    url: '/admin/export/prize',
    method: 'post',
    data: query,
    responseType: "blob"
  })
}
/**
 * 
 *    提现通知管理
 *        获取提现通知管理
 **/
export function apiGetWithdrawNotice(query) {
  return request({
    url: '/admin/resource/getWithdrawNotice',
    method: 'post',
    data: query
  })
}
/**
 * 
 *    提现通知管理
 *        提现通知管理修改
 **/
export function apiUpdateWithdrawNotice(query) {
  return request({
    url: '/admin/resource/updateWithdrawNotice',
    method: 'post',
    data: query
  })
}
