Component({
  properties: {
    show: {
      type: Boolean,
    },
    position: {
      type: String,
      value: 'right',
    },
    conditions: {
      type: Array,
      value: [],
      /** 
       * {
       *  id: string
       *  title: string
       *  type: string
       *  initialValue: string
       *  options: { value: string, title: string }
       * }[]
       */
      observer: function() {
        this.getInitialValue()
      }
    },
    /* values: {
      type: Object,
      observer: function(newValue, oldValue) {
        this.setData({ searchValues: newValue })
      }
    } */
  },
  data: {
    /* 筛选条件值 */
    searchValues: {},
  },
  methods: {
    /* 筛选项改变 */
    onChangeHandle(e) {
      console.log(e.detail)
      const { name, value } = e.detail
      const key = 'searchValues.' + name
      this.setData({
        [key]: value,
      })
    },

    /* 获取默认初始条件值 */
    getInitialValue() {
      const values = {}
      this.properties.conditions.map(item => {
        if (item.initialValue !== null && item.initialValue !== undefined) {
          if (Array.isArray(item.id)) {
            // 如果条件id是数组
            for (const key in item.id) {
              const field = item.id[key]
              values[field] = item.initialValue[key]
            }
          } else {
            values[item.id] = item.initialValue
          }
        }
      })
      this.setData({
        searchValues: values,
      })
    },

    onSubmitHandle() {
      this.triggerEvent('submitHandle', { values: this.data.searchValues })
    },
    
    onResetHandle() {
      this.getInitialValue()
    },

    onCloseHandle() {
      this.triggerEvent('closeHandle')
    },
  }
})