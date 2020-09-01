class ChannelCodeOption {
  /** 采购入库，待办的物料单入库，也使用该配置，只是保存临时单多一个物流单号orderCode */
  purchaseIn = {
    key: 'purchaseIn',
    handleType: 'enter',
    operType: 'pur',
    historyPage: {
      title: '未完成入库单',
      items: [
        { label: '入库时间', id: 'scanDate' },
        { label: '入库数量', quantity: true },
      ]
    },
    barcodePage: {
      title: '扫码入库',
    },
    quantityPage: {
      title: '数量入库',
    }
  }

  /** 销售出库 */
  saleOut = {
    key: 'saleOut',
    handleType: 'out',
    operType: 'sale',
    historyPage: {
      title: '未完成出库单',
      items: [
        { label: '出库时间', id: 'scanDate' },
        { label: '出库数量', quantity: true },
      ]
    },
    barcodePage: {
      title: '扫码出库',
    },
    quantityPage: {
      title: '数量出库',
    }
  }

  /** 下游退货 */
  returnIn = {
    key: 'returnIn',
    handleType: 'enter',
    operType: 'ret',
    historyPage: {
      title: '未完成退货单',
      items: [
        { label: '入库时间', id: 'scanDate' },
        { label: '入库数量', quantity: true },
      ]
    },
    barcodePage: {
      title: '退货扫码',
    },
    quantityPage: {
      title: '退货入库',
    }
  }

  /** 其他出库 */
  otherOut = {
    key: 'otherOut',
    handleType: 'out',
    operType: 'other',
    historyPage: {
      title: '未完成出库单',
      items: [
        { label: '出库时间', id: 'scanDate' },
        { label: '出库数量', quantity: true },
      ]
    },
    barcodePage: {
      title: '扫码出库',
    },
    quantityPage: {
      title: '数量出库',
    }
  }

  /** 盘点 */
  stockInventory = {
    key: 'stockInventory',
    handleType: 'inventory',
    operType: 'check',
    historyPage: {
      title: '未完成盘点单',
      items: [
        { label: '盘点时间', id: 'scanDate' },
        { label: '盘点数量', quantity: true },
      ]
    },
    barcodePage: {
      title: '扫码盘点',
    },
    quantityPage: {
      title: '数量盘点',
    }
  }

  /** 待办--破损出库 */
  wornOut = {
    key: 'wornOut',
    handleType: 'out',
    operType: 'worn',
    historyPage: {
      title: '未完成出库单',
      items: [
        { label: '出库时间', id: 'scanDate' },
        { label: '出库数量', quantity: true },
      ]
    },
    barcodePage: {
      title: '扫码出库',
    },
    quantityPage: {
      title: '数量出库',
    }
  }
  /** 待办--物流调拨入库 */
  transferIn = {
    key: 'transferIn',
    handleType: 'enter',
    operType: 'ao',
    historyPage: {
      title: '未完成调拨入库单',
      items: [
        { label: '入库时间', id: 'scanDate' },
        { label: '入库数量', quantity: true },
      ]
    },
    barcodePage: {
      title: '调拨扫码',
    },
    quantityPage: {
      title: '数量入库',
    }
  }

}

const channelCodeOption = new ChannelCodeOption()

export {
  channelCodeOption
}
