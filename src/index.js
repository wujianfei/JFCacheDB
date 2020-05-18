/*
 * @Author: wujianfei
 * @Date:   2020-05-15 16:05:10
 * @Last Modified by:   wujianfei
 * @Last Modified time: 2020-05-15 16:10:05
 */
/* eslint-disable no-undef */

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
  function fingerprint() {
    const {
      userAgent,
      language,
      languages,
      platform,
      hardwareConcurrency,
      deviceMemory,
    } = window.navigator;
    const plugins = Object.entries(window.navigator.plugins).map(
      ([, plugin]) => plugin.name
    );
    const { colorDepth, availWidth, availHeight } = window.screen;
    const timezoneOffset = new Date().getTimezoneOffset();
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const touchSupport = 'ontouchstart' in window;
  
    const canvas = (() => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.textBaseline = 'top';
        ctx.font = "14px 'Arial'";
        ctx.textBaseline = 'alphabetic';
        ctx.fillStyle = '#f60';
        ctx.fillRect(125, 1, 62, 20);
        ctx.fillStyle = '#069';
        ctx.fillText(
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`~1!2@3#4$5%6^7&8*9(0)-_=+[{]}|;:',<.>/?",
          2,
          15
        );
        ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
        ctx.fillText(
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`~1!2@3#4$5%6^7&8*9(0)-_=+[{]}|;:',<.>/?",
          4,
          17
        );
  
        const result = canvas.toDataURL();
        return result;
      } catch (error) {
        return error;
      }
    })();
  
    const data = JSON.stringify({
      userAgent,
      language,
      languages,
      platform,
      hardwareConcurrency,
      deviceMemory,
      plugins,
      colorDepth,
      availWidth,
      availHeight,
      timezoneOffset,
      timezone,
      touchSupport,
      canvas,
    });
  
    const murmurhash3_32_gc = (key) => {
      const remainder = key.length & 3; // key.length % 4
      const bytes = key.length - remainder;
      const c1 = 0xcc9e2d51;
      const c2 = 0x1b873593;
  
      let h1, h1b, k1;
  
      for (let i = 0; i < bytes; i++) {
        k1 =
          (key.charCodeAt(i) & 0xff) |
          ((key.charCodeAt(++i) & 0xff) << 8) |
          ((key.charCodeAt(++i) & 0xff) << 16) |
          ((key.charCodeAt(++i) & 0xff) << 24);
        ++i;
  
        k1 =
          ((k1 & 0xffff) * c1 + ((((k1 >>> 16) * c1) & 0xffff) << 16)) &
          0xffffffff;
        k1 = (k1 << 15) | (k1 >>> 17);
        k1 =
          ((k1 & 0xffff) * c2 + ((((k1 >>> 16) * c2) & 0xffff) << 16)) &
          0xffffffff;
  
        h1 ^= k1;
        h1 = (h1 << 13) | (h1 >>> 19);
        h1b =
          ((h1 & 0xffff) * 5 + ((((h1 >>> 16) * 5) & 0xffff) << 16)) & 0xffffffff;
        h1 = (h1b & 0xffff) + 0x6b64 + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16);
      }
  
      const i = bytes - 1;
  
      k1 = 0;
  
      switch (remainder) {
        case 3: {
          k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
          break;
        }
        case 2: {
          k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
          break;
        }
        case 1: {
          k1 ^= key.charCodeAt(i) & 0xff;
          break;
        }
      }
  
      k1 =
        ((k1 & 0xffff) * c1 + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
      k1 = (k1 << 15) | (k1 >>> 17);
      k1 =
        ((k1 & 0xffff) * c2 + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;
      h1 ^= k1;
  
      h1 ^= key.length;
  
      h1 ^= h1 >>> 16;
      h1 =
        ((h1 & 0xffff) * 0x85ebca6b +
          ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) &
        0xffffffff;
      h1 ^= h1 >>> 13;
      h1 =
        ((h1 & 0xffff) * 0xc2b2ae35 +
          ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16)) &
        0xffffffff;
      h1 ^= h1 >>> 16;
  
      return h1 >>> 0;
    };
  
    const result = murmurhash3_32_gc(data);
    return result;
  }
  export function JFcacheDB() {
    const that = this;
    const constString = {
      tbtDesc: `存储表名的表,其他表的表名将直接是加密的`,
    };
    let encryptFun = {
      decodeData: (d) => d,
      encodeData: (d) => d,
      encodeTableName: (d) => d,
    };
    /**
     * 获得默认模板
     * @param {*} param0
     */
    function getDataTemplate({ description }) {
      return JSON.stringify({
        description: description || '', // 表描述
        data: {}, //{id: 数据}
        idSortList: [], // [id]
      });
    }
    /**
     * 设置加密算法
     */
    that.setEncryption = function ({ decodeData, encodeData, encodeTableName }) {
      encryptFun = { decodeData, encodeData, encodeTableName };
    };
    /**
     * 初始化
     */
    function initCacheDb(storage, tableName, description) {
      let tableValStr = storage.getItem(tableName);
      if (tableValStr) {
        return JSON.parse(encryptFun.decodeData(tableValStr));
      } else {
        return JSON.parse(getDataTemplate({ description }));
      }
    }
    /**
     * 获取存储类型
     * @param {*} type
     */
    function getStorage(type) {
      return {
        1: localStorage,
        2: sessionStorage,
      }[type];
    }
    /**
     * 事务提交
     * @param {*} storage
     * @param {*} key
     * @param {*} value
     */
    function commit(storage, key, value) {
      storage.setItem(key, encryptFun.encodeData(JSON.stringify(value)));
    }
    /**
     * 保存表名
     */
    function saveTableName({ storage, table, tableName, cacheData }) {
      cacheData.data[tableName] = encryptFun.encodeTableName(tableName);
      commit(storage, table.tableName, cacheData);
      return cacheData.data[tableName];
    }
    /**
     * 获得加密表名
     */
    function getEncryptionName(tableName) {
      const table = {
        tableName: encryptFun.encodeTableName(fingerprint()),
        description: constString.tbtDesc,
        cacheType: 1,
      };
      const storage = getStorage(table.cacheType);
      let tbtStr = storage.getItem(table.tableName);
      if (tbtStr) {
        const tbt = JSON.parse(encryptFun.decodeData(tbtStr));
        return tbt.data[tableName]
          ? tbt.data[tableName]
          : saveTableName({ storage, table, tableName, cacheData: tbt });
      } else {
        const tbt = JSON.parse(getDataTemplate({
          description: table.description,
        }));
        return saveTableName({ storage, table, tableName, cacheData: tbt });
      }
    }
    that.getTable = function({ tableName, description, cacheType }) {
      return new Table({ tableName, description, cacheType })
    }
    /**
     * 获得一张表
     */
    const Table = function ({ tableName, description, cacheType }) {
      const storage = getStorage(cacheType);
      const encryptionName = getEncryptionName(tableName);
      const cacheData = initCacheDb(storage, encryptionName, description);
      
      /**
       * 排序id
       * @param {*} id
       */
      function clearSortId(id) {
        let sort = cacheData.idSortList;
        for (let i = sort.length - 1; i >= 0; i--) {
          if (sort[i] === id) {
            cacheData.idSortList.splice(i, 1);
          }
        }
      }
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
        cacheData.data[id] = data;
        let sort = cacheData.idSortList;
        for (let i = sort.length - 1; i >= 0; i--) {
          if (sort[i] === id) {
            cacheData.idSortList.splice(i, 1);
          }
        }
        clearSortId(id);
        cacheData.idSortList.unshift(id);
        commit(storage, encryptionName, cacheData); // 提交事务
        return true;
      };
  
      // 删除某一项
      this.removeById = function (id) {
        delete cacheData.data[id];
        clearSortId(id);
        commit(storage, encryptionName, cacheData); // 事务提交
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
        storage.removeItem(encryptionName);
      };
    };
  }
  

  return JFcacheDB;
});
