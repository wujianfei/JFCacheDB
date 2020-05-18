### JFCacheDB(前端缓存工具类)

#### 概述
我们通过浏览器自带的```localStorage```和```sessionStorage```已经能够很方便的对数据进行按需存储，但是没有一个很好的规划，缓存索引将会非常长，数据也很混乱同时你可能会不小心暴露出敏感数据，```JFCacheDB```应运而生，它提供了丰富的接口，并且你将会很容易上手。
```JFCacheDB```还提供了开发阶段自动展示数据，生产环境下自动加密数据。


#### Install(安装)

```javascript
npm i jfcachedb --save
```

#### Usage(使用)
首先，你得定义一个数据表，你可以在config下定义一个表配置：

```javascript
export default {
  table_session_sys: {
    tableName: '@table_session_sys',
    description: '测试',
    cacheType: 2 // 1 localStorage 2 sessionStorage
  }
}
```

然后你新建一个```db```对象:
```javascript
import BaseDB from 'jfcachedb';

const table = new JFCacheDB(NormalString.table_local_sys, {
  decodeData: () => {}, // 解密数据方法
  encodeData: () => {}, // 加密数据方法
  md5Encode: () => {} // 表加密方法
}, 1);
```
现在，你可以对你得数据在这张表上进行很好的规划和很方便的操作它了。
- ```table.saveOrUpdate``` 保存数据
- ```table.removeById``` 删除项
- ```table.get``` 获取项，你可以传入一个id，并且获取对应的值，比如：

```javascript
table.get(id, [defaultValue默认值])
```

- ```table.getCacheData``` 获取整个table的数据以及表描述信息，索引等
- ```table.dropCurrentTable``` 删除表

加密解密，可以自己定义，也可以使用如下方式引入```crypto-js```库:

```javascript
import AES from "jfcachedb/crypto-js/aes";
import MD5 from "jfcachedb/crypto-js/md5";
import ENC from "jfcachedb/crypto-js/enc-latin1";
import MODE from "jfcachedb/crypto-js/mode-ecb";
import PKCS7 from "jfcachedb/crypto-js/pad-pkcs7";
import UTF8 from "jfcachedb/crypto-js/enc-utf8"
```
[具体使用参照地址 https://www.npmjs.com/package/crypto-js](https://www.npmjs.com/package/crypto-js)

#### 更多描述可参考
[博客](https://www.cnblogs.com/SATinnovation/p/12909254.html)

#### Contact me(联系我)

Email: swordfly_cool@163.com

#### License

[MIT](http://opensource.org/licenses/MIT) Copyright (c) 2018 - forever Naufal Rabbani