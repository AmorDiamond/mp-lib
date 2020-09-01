export default {
  /* 我的待办 */
  /** 获取入库管理物流单列表 */
  GetLogisticsOrderList: '/api/v1/stock/logistics/app/listByRole',
  /** 物流单详情 */ 
  LogisticsOrderDetail: '/api/v1/stock/logistics/app/get',
  /** 根据物流单获取物料数据列表 */
  GetMatListByLogisticNo: '/api/v1/stock/logistics/app/subList',
  /** 物流单一键入库 */
  OnceClickWarehouse: '/api/v1/stock/si/app/once',

  /* 货物调拨 */
  
  /** 调拨任务列表 */
  GetTransferTaskList: '/api/v1/stock/ao/app/listByRole',
  /** 调拨任务的入库单列表 */
  GetTransferTaskOrderList: '/api/v1/stock/si/app/listByAoCode',
  /** 调拨单详情 */
  GetTransferOrderDetail: '/api/v1/stock/ao/app/get',

  /* 积分考核结果 */

  /** 积分考核接口列表 */
  GetIntegralAssessList: '/api/v1/stock/logistics/app/listByRole',

}