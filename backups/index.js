/*
 * @Author: wujianfei
 * @Date:   2020-05-15 16:05:10
 * @Last Modified by:   wujianfei
 * @Last Modified time: 2020-05-15 16:10:05
 */
/* eslint-disable no-undef */
import { encodeUrl, decodeUrl, md5Encode } from './utils/cypto-utils';
import { getFingerPrint } from './utils/fingerprint-utils';
import { getDevCallback } from './utils/dev-utils';

(function (root, globalName, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD:
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node:
    module.exports = factory();
    // Use module export as simulated ES6 default export:(将模块导出用作模拟ES6默认导出)
    module.exports.default = module.exports;
  } else {
    // Browser:
    root[globalName] = factory();
  }
})(this, 'dataType', function () {
  'use strict';

  function getDefaultTemlate(options) {
    return JSON.stringify({
      description: options.description || '', // 表描述
      data: {}, //{id: 数据}
      idSortList: [], // [id]
    });
  }
  /**
   * 加密解密
   * @param {*} str 字符串值
   * @param {*} isDec false表示加密 true表示解密
   */
  function encryptionData(str, isDec = false) {
    return getDevCallback(
      () => {
        return str;
      },
      () => {
        return isDec ? decodeUrl(str) : encodeUrl(str);
      }
    );
  }
  /**
   * 加密表名
   * @param {*} tableName 表名
   */
  function encryptionName(tableName) {
    return getDevCallback(
      () => {
        return tableName;
      },
      () => {
        return md5Encode(tableName);
      }
    );
  }

  function getCacheType(type) {
    return {
      1: localStorage,
      2: sessionStorage,
    }[type];
  }

  /**
   * 初始化cacheData
   * 读取本地数据
   */
  let getInitCacheData = function (cacheObj, tableName, options) {
    let cacheDataStr = '';
    let tableValStr = cacheObj.getItem(tableName);
    if (tableValStr) {
      cacheDataStr = encryptionData(tableValStr, true);
    } else {
      cacheDataStr = getDefaultTemlate(options);
    }
    return JSON.parse(cacheDataStr);
  };
  /**
   * 构建存储表名的表
   * @param {*} tableName
   */
  function getNameTable(tableName) {
    const table = {
      tableName: md5Encode(getFingerPrint()),
      description: `存储表名的表\n其他表的表名将直接是加密的`,
      cacheType: 1,
    };
    let cacheObj = getCacheType(table.cacheType);
    let nameObj = JSON.parse(
      cacheObj.getItem(table.tableName) ||
        getDefaultTemlate({
          description: table.description,
        })
    );
    if (nameObj[tableName]) {
      return nameObj[tableName];
    } else {
      nameObj[tableName] = encryptionName(tableName);
      cacheObj.setItem(
        table.tableName,
        encryptionData(JSON.stringify(nameObj), false)
      );
      return nameObj[tableName];
    }
  }

  /**
   * 缓存数据
   * @param {*} tableName_ 表名
   * @param {*} options
   * @param {*} cacheType
   */
  function BaseDB(
    table = { description: '', tableName: '', cacheType: 1 }
  ) {
    let tableName = getNameTable(table.tableName);
    let cacheObj = getCacheType(table.cacheType);
    let cacheData = getInitCacheData(cacheObj, tableName, {
      description: table.description,
    }); // 初始化

    /**
     * 校验
     */
    let illegalError = function () {
      // if (tableName.indexOf('@table') !== 0) {
      //   throw new Error('The operation cannot be operated directly here');
      // }
    };
    /**
     * 排序id
     * @param {*} id
     */
    let clearSortId = function (id) {
      let sort = cacheData.idSortList;
      for (let i = sort.length - 1; i >= 0; i--) {
        if (sort[i] === id) {
          cacheData.idSortList.splice(i, 1);
        }
      }
    };
    /**
     * 事务提交
     */
    let commit = function () {
      // 加密保存
      cacheObj.setItem(
        tableName,
        encryptionData(JSON.stringify(cacheData), false)
      );
    };
    /**
     * 保存数据
     * 如果已经有，则会直接覆盖
     * @params {*} id 记录编号
     * @params {*} data 记录值
     */
    this.saveOrUpdate = function (id, data = {}) {
      if (!id) {
        return;
      }
      illegalError();
      cacheData.data[id] = data;
      let sort = cacheData.idSortList;
      for (let i = sort.length - 1; i >= 0; i--) {
        if (sort[i] === id) {
          cacheData.idSortList.splice(i, 1);
        }
      }
      clearSortId(id);
      cacheData.idSortList.unshift(id);
      commit(); // 提交事务
      return true;
    };

    // 删除某一项
    this.removeById = function (id) {
      illegalError();
      delete cacheData.data[id];
      clearSortId(id);
      commit(); // 事务提交
    };
    /**
     * 根据id取记录
     * @params {*} id 记录编号
     * @params {*} defaultVal 默认值
     */
    this.get = function (id, defaultVal) {
      if (cacheData.data[id] !== undefined) {
        return cacheData.data[id];
      }
      if (defaultVal !== undefined) {
        return defaultVal;
      }
      return null;
    };
    // 整张表的数据
    this.getCacheData = function () {
      return cacheData;
    };
    /**
     * 删除当前表
     */
    this.dropCurrentTable = function () {
      cacheObj.removeItem(tableName);
    };
  }
  return function dataType(data) {
    console.info('================>>>', BaseDB)
    return BaseDB;
  };
});
