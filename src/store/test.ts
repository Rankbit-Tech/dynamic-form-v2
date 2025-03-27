export const test = [
  {
    id: 'ejZs7nfLl8dTvov-zZQfm',
    type: 'STEPPER',
    variant: 'STEPPER',
    title: 'Upload Document',
    validations: {},
    conditions: {},
    mapFields: {},
    config: {}
  },
  {
    id: 'bszc8Bm1tK42_OBSFO_Uz',
    type: 'STEPPER',
    variant: 'STEPPER',
    title: 'Summary Generation',
    validations: {},
    conditions: {},
    mapFields: {},
    config: {}
  },
  {
    id: 'zxPGHz57zJ384wimHQ6vb',
    type: 'SUMMARY',
    variant: 'SUMMARY',
    label: 'Label',
    validations: {
      fields: [
        'image'
      ]
    },
    conditions: {
      combinator: 'and',
      rules: [
        {
          field: 'employerCode',
          operator: 'equals',
          valueSource: 'value',
          value: ''
        }
      ]
    },
    parentId: 'bszc8Bm1tK42_OBSFO_Uz',
    mapFields: {},
    config: {},
    check_all: true
  },
  {
    id: 'SK3sDa4LMNPNinYQo1eiL',
    type: 'IMAGEUPLOAD',
    variant: 'FIELD',
    label: 'Image Upload Label',
    name: 'image',
    validations: {
      required: false,
      maxCount: 1,
      accept: '',
      maxSize: null
    },
    conditions: {
      combinator: 'and',
      rules: []
    },
    parentId: 'ejZs7nfLl8dTvov-zZQfm',
    mapFields: {},
    config: {}
  }
]