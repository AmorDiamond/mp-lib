export default {
  /* 渠道扫码 */
  // 获取临时单数据
  GetTempOrder: '/api/v1/stock/temp/app/getTempInfo',
  // 获取产品和产品下的条码列表
  GetMatAndBarcode: '/api/v1/stock/temp/app/groupBarByMatCode',
  // 入库扫码临时储存
  EnterScanSaveTemOrder: '/api/v1/stock/temp/app/in/scan',
  // 出库扫码临时储存
  OutScanSaveTemOrder: '/api/v1/stock/temp/app/out/scan',
  // 扫码入库提交
  EnterScanCreateOrder: '/api/v1/stock/si/app/scan',
  // 数量入库提交
  EnterQuantityCreateOrder: '/api/v1/stock/si/app/quantity',
  // 获取入库记录列表
  GetEnterRecordList: '/api/v1/stock/si/app/listByRole',
  // 获取入库单详情
  GetEnterOrderDetail: '/api/v1/stock/si/app/get',
  // 获取当前用户临时单所有的条码
  GetBarcodeListForTemp: '/api/v1/stock/temp/app/listBarByUserOperType',

  // 获取出库记录列表
  GetOutRecordList: '/api/v1/stock/so/app/listByRole',
  // 获取出库单详情
  GetOutOrderDetail: '/api/v1/stock/so/app/get',
  // 扫码出库提交
  OutScanCreateOrder: '/api/v1/stock/so/app/scan',
  // 数量出库提交
  OutQuantityCreateOrder: '/api/v1/stock/so/app/quantity',
  // 盘点扫码临时储存
  InventoryScanSaveTempOrder: '/api/v1/stock/temp/app/check/scan',
  // 扫码盘点
  InventoryScanCreateOrder: '/api/v1/stock/co/app/scan',
  /** 数量盘点 */
  InventoryQuantityCreateOrder: '/api/v1/stock/co/app/quantity',
  /** 盘点列表 */
  GetInventoryList: '/api/v1/stock/co/app/listByRole',
  /** 获取盘点详情 */
  GetInventoryDetail: '/api/v1/stock/co/app/get',

  /** 删除临时单里的条码 */
  DeleteBarcodeForTempOrder: '/api/v1/stock/temp/app/deleteTempByBarCode',
  /** 清空临时单数据 */
  ClearTempOrder: '/api/v1/stock/temp/app/deleteByBarCode',

  /** 我的库存--统计数据 */
  GetMyStockCountInfo: '/api/v1/stock/month/report/app/owerStockReport',
  /** 我的库存--列表 */
  GetMyStockList: '/api/v1/stock/month/report/app/listByRole',

  /** 获取当前登录人的下级（出库获取收货人） */
  GetSubDealer: '/api/v1/user/app/customers/combox/sub/terminal',

  /** 获取出入库数量 */
  GetOutInStockCount: '/api/v1/stock/month/report/app/countStockInOUt',
}