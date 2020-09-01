Component({
  properties: {
    infoId: {
      type: String,
      value: "",
    },
    title: {
      type: String,
      value: "",
    },
    time: {
      type: String,
      value: "",
    },
    content: {
      type: String,
      value: "",
    },
    new: {
      type: Boolean,
      value: false,
    }
  },
  data: {
  },
  methods: {
    clickHandle: function(){
      const id = this.data.infoId
      console.log(id)
      this.triggerEvent("click",{id})
    }
  }
})