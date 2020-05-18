<font size=2>

### JFCacheDB

##### summary

We can easily store the data on demand through the local storage and ```sessionstorage``` provided by the browser, but without a good plan, the cache index will be very long, the data will be confused, and you may inadvertently expose sensitive data. ```Jfcachedb``` came into being, which provides a rich interface, and you will be easy to use. ```Jfcachedb``` also provides automatic display of data in the development stage and automatic encryption of data in the production environment.


#### Install

```javascript
npm i jfcachedb --save
```

#### Usage
First, you need to define a data table. You can define a table configuration under config:

```javascript
export default {
  table_session_sys: {
    tableName: '@table_session_sys',
    description: '测试',
    cacheType: 2 // 1 localStorage 2 sessionStorage
  }
}
```
Customize a way to develop a production environment:
```javascript
function getDevCallback(devCallback = () => {}, proCallback = () => {}) {
  if (process.env.NODE_ENV === 'production') {
    return proCallback();
  } else if (process.env.NODE_ENV === 'development') {
    return devCallback();
  }
}
```

then you can build a```db```object:
```javascript
import JFcacheDB from 'jfcachedb';
let db = new JFcacheDB();
db.setEncryption({
  decodeData: (data) => {
    return getDevCallback(
      () => data,
      () => decodeUrl(data)
    );
  },
  encodeData: (data) => {
    return getDevCallback(
      () => data,
      () => encodeUrl(data)
    );
  },
  encodeTableName: (data) => {
    return getDevCallback(
      () => data,
      () => md5Encode(data)
    );
  },
});

let table = db.getTable(TableConst.table_session_sys);
let table2 = db.getTable(TableConst.table_local_xu);
table.saveOrUpdate('sansan', {
  age: 21,
  name: 'zansan',
  sex: '男',
  realName: '张三'
});
table2.saveOrUpdate('id', 'xxxxxuuuuuuuuu');
table2.saveOrUpdate('id2', '3333333');
```
Now, you can plan your data well and operate it conveniently.
- ```table.saveOrUpdate``` update data,it will cover old data
- ```table.removeById``` delete item
- ```table.get``` To get the item, you can pass in an ID and get the corresponding value, such as：

```javascript
table.get(id, [defaultValue])
```

- ```table.getCacheData``` Get the data of the whole table, table description information, index, etc
- ```table.dropCurrentTable``` drop table

Encryption and decryption can be defined by yourself, or you can use the following methods to introduce the 'crypto JS' Library:

```javascript
import AES from "jfcachedb/crypto-js/aes";
import MD5 from "jfcachedb/crypto-js/md5";
import ENC from "jfcachedb/crypto-js/enc-latin1";
import MODE from "jfcachedb/crypto-js/mode-ecb";
import PKCS7 from "jfcachedb/crypto-js/pad-pkcs7";
import UTF8 from "jfcachedb/crypto-js/enc-utf8"
```
[Specific use reference address https://www.npmjs.com/package/crypto-js](https://www.npmjs.com/package/crypto-js)

#### For further description, please refer to
[https://www.cnblogs.com/SATinnovation/p/12909254.html](https://www.cnblogs.com/SATinnovation/p/12909254.html)

#### Contact me

Email: swordfly_cool@163.com

#### License

[MIT](http://opensource.org/licenses/MIT) Copyright (c) 2018 - forever Naufal Rabbani

</font>