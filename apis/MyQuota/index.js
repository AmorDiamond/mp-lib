export default {
  /* 库存盘点 */
  // 获取默认盘点数据和盘点周期
  getInventoryDateDefault: '/api/v1/quota/dealerXCX/checkStock/getInventoryDateDefault',
  // 根据品牌和经销商获取盘点物料
  getAllmatByDealer: '/api/v1/quota/dealerXCX/checkStock/getAllmatByDealer',
  // 获取下级审批人信息
  nextTaskAgent: '/api/v1/quota/emp/QuotaApply/nextTaskAgent',
  // 提交库存盘点
  checkStockSave: '/api/v1/quota/dealerXCX/checkStock/checkStockSave',
}