import { http } from '../../../../utils/http'
import apis from '../../../../apis/index'
Component({
  page: 1,
  keyWord: '',
  total: 0,
  lifetimes: {
    detached() {
      console.log('detached')
    }
  },
  data: {
    list: [],
  },
  methods: {
    onSearchHandle(e) {
      const value = e.detail.value
      if (!value) {
        return
      }
      this.keyWord = value
      this.getMaterialList()
    },

    onScrollBottomHandle() {
      console.log(12)
      const { list } = this.data
      if (list.length < this.total) {
        this.page += 1
        this.getMaterialList()
      }
    },

    getMaterialList() {
      wx.showLoading({ title: '加载中...' })
      const params = {
        conditions: {
          matName: this.keyWord,
        },
        page: this.page,
        size: 30
      }
      http({ url: apis.GetMaterialByName, data: params, method: 'POST' }).then(res => {
        const list = res.data.content
        this.total = res.data.totalElements
        this.setData({
          list: [ ...this.data.list, ...list ],
        })
      }).finally(() => {
        wx.hideLoading()
      })
    },

    onSelectRowHandle(e) {
      const { code, name } = e.currentTarget.dataset
      this.triggerEvent('selectHandle', { data: { code, name } })
    },

    onCancleSearch() {
      this.triggerEvent('cancleHandle')
    }
  }
})