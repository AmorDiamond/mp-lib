import { formControlBehavior } from '../../../../common/Behaviors/FormControl/index'
Component({
  behaviors: [formControlBehavior],
  properties: {
    type: {
      type: String,
    },
    options: {
      type: Array,
      value: []
    }
  },
})