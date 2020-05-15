// 断言库 chai.js
var expect = require('chai').expect;
var dataType = require('../src/index');

describe('断言BaseDB', function () {
  // 每个describe块应该包括一个或多个it块，称为测试用例（test case）
  // 基本数据类型
  it('undefined-类型检测测试', () => {
    // 断言
    expect(dataType(undefined)).to.equal('undefined');
  });
});
