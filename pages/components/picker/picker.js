// pages/components/picker/picker.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showRegion: {
      type: Boolean,
      observer: function (newVal, oldVal) {
          this.setData({
              dialog: newVal,
          });
      },
  },
  },

  /**
   * 组件的初始数据
   */
  data: {
    dialog:''
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
