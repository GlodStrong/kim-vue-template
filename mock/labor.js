const Mock = require('mockjs')

const data = Mock.mock({
  'labors|30': [
    {
      id: '@increment(1)',
      name: '@cname',
      'pos_cd|1': ['intern', 'staff', 'director', 'manager', 'chief', 'ceo'],
      'apr_cd|1': ['waiting', 'approved', 'deleted'],
      iv_str_dt: '@date',
      iv_end_dt: '@date',
      unit: '@integer(0, 999999)',
      level_cd: '@integer(0, 10)'
    }
  ]
})

module.exports = [
  {
    url: '/vue-admin-template/labor/list',
    type: 'get',
    response: config => {
      const labors = data.labors
      return {
        code: 20000,
        data: {
          total: labors.length,
          items: labors
        }
      }
    }
  }
]
