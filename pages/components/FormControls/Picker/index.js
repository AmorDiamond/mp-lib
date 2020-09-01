import { formControlBehavior } from '../../../../common/Behaviors/FormControl/index'
Component({
  externalClasses: ['picker-item'],
  behaviors: [formControlBehavior],
  properties: {
    mode: {
      type: String,
      value: 'date',
    },
    fields: {
      type: String,
      value: 'day',
    }
  }
})