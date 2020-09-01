const formatTime = date => {
  var date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatTimeItem = dates => {
  var dates = new Date()
  const year = dates.getFullYear()
  const month = dates.getMonth() + 1
  const day = dates.getDate()
  const hour = dates.getHours()
  const minute = dates.getMinutes()
  const second = dates.getSeconds()

  return {year, month, day, hour, minute, second}
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
 * 上面方法有使用，所以新增个方法处理时间
 * @param {string} time 
 */
const formatTimeToString = function (time) {
  if (!time) {
    return
  }
  const date = new Date(time)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const h = date.getHours()
  const m = date.getMinutes()
  const s = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-') + ' ' + [h, m, s].map(formatNumber).join(':')
}

/**
 * 映射出入库类型
 * @param {string} type 
 */
const mappingStockType = (type) => {
  const typeEnum = {
    aoi: '调拨入库',
    pur: '采购',
    ret: '退货入库',
    cp: '盘库入库',
    aoo: '调拨出库',
    sale: '销售出库',
    worn: '破损出库',
    other: '其他出库',
    cd: '盘亏出库'
  }
  return typeEnum[type] || type
}

/**
 * 映射出入库方式
 * @param {string} way 
 */
const mappingStockWay = (way) => {
  const wayEnum = {
    num: '数量',
    scan: '扫码',
    once: '一件入库',
  }
  return wayEnum[way] || way
}

/**
 * 去除对象里的空值，主要用于处理筛选条件
 * @param {object} object 
 */
const removeEmptyObjectKey = (object) => {
  const newObj = {}
  for (const key in object) {
    const element = object[key]
    if (object.hasOwnProperty(key) && element) {
      newObj[key] = object[key]
    }
  }
  return newObj
}

module.exports = {
  formatTime: formatTime,
  formatTimeItem: formatTimeItem,
  formatTimeToString: formatTimeToString,
  mappingStockType: mappingStockType,
  mappingStockWay: mappingStockWay,
  removeEmptyObjectKey: removeEmptyObjectKey,
  formatNumber: formatNumber,
}
