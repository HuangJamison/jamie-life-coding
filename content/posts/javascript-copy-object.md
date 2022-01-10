---
title: "Javascript 讓你困惑的事 - copy object"
date: 2021-10-16T01:35:01+08:00
description: "shallow-copy, deep-copy, javascript copy object"
slug: "javascript-copy-object"
draft: false
categories:
- coding
tags:
- javascript
keywords:
- deep copy
- shallow copy
- javascript copy
clearReading: true
thumbnailImagePosition: left
thumbnailImage: images/copy.jpeg
coverImage: images/copy.jpeg
coverCaption: "複製了，就沒事了嗎？ by kick stock"
coverMeta: "out"
coverSize: "partial"
comments: true
---
痛過才記得 JS 讓我困惑的地方，踩雷紀錄，弄不清楚拷貝讓你覺得靠北...
<!--more-->
# 本文大綱
- [本文大綱](#本文大綱)
- [Javascript 資料型態](#javascript-資料型態)
- [Object.assign](#objectassign)
- [深拷貝與淺拷貝](#深拷貝與淺拷貝)
- [學習重點](#學習重點)
- [參考連結](#參考連結)

有鑒於要紀錄深拷貝 (deep-copy) 與淺拷貝 (shallow-copy)，就必須一整套去紀錄從 mutable 開始講起...
# Javascript 資料型態
1. 原始資料型態 Primitive：Boolean/Null/Undefined/Number/String/Symbol，這些都是 Immutable。
2. 物件資料型態 Object： Array/Object/Function/Date/Map/Set/JSON，這些都是 Mutable。

{{< alert info >}}
什麼是 Immutable？ 什麼是 Mutable?  
Mutable 代表可變的，因此 Immutable 代表不可變的！  
因此像是 Primitive 型態為不可變的資料型態，基本上賦值，pass by value！  
因此像是 Object 型態為可變的資料型態，基本上賦值，pass by reference！
{{< /alert >}}
<br/>

講這麼多，來個範例吧 ~   
<br/>
* Primitive example pass by value  
    * immutable
    * `originalValue` & `copyValue` 紀錄在不同記憶體位址
    * pass by value
    * 改 `copyValue` 改動不會異動到 `originalValue`  
<br/>

{{< tabbed-codeblock primitive-example.js >}}
<!-- tab javascript -->
// immutable different address
let originalValue = 5;
let copyValue = originalValue;

copyValue = 10;

console.log('originalValue:', originalValue);
console.log('copyValue:', copyValue);
// outcome
> "originalValue:" 5
> "copyValue:" 10
<!-- endtab -->
{{< /tabbed-codeblock >}}
<br/>
* Object example pass by reference  
    * mutable
    * `originalObject` & `copyObject` 紀錄在相同記憶體位址
    * pass by reference
    * 改 `copyObject` 改動會異動到 `originalObject`
<br/>  
  
{{< tabbed-codeblock object-example.js >}}
<!-- tab javascript -->
// object mutable
const originalObject = {
  fruit: 'apple',
  price: 20
};

const copyObject = originalObject;
copyObject.fruit = 'orange';
copyObject.price = 30;

console.log('originalObject:', originalObject);
console.log('copyObject:', copyObject);
console.log('originalObject is equal copyObject:', copyObject === originalObject);

// outcome
> "originalObject:" Object { fruit: "orange", price: 30 }
> "copyObject:" Object { fruit: "orange", price: 30 }
> "originalObject is equal copyObject:" true
<!-- endtab -->
{{< /tabbed-codeblock >}}

接下來你就會困惑，我想要複製又不想改到原物件該怎麼做？
# Object.assign
> 沒錯！ Object.assign 是你的好朋友，詳細可以看 [MDN 文件](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

`Object.assign(target, source)` 就是 clone an object！
將上面的範例帶過來看看  
<br/>
{{< tabbed-codeblock object-example.js >}}
<!-- tab javascript -->
// object mutable
const originalObject = {
  fruit: 'apple',
  price: 20
};
// 要客製化複製物件方法一
const copyObject = Object.assign({}, originalObject, {fruit: 'orange'});
// 要客製化複製物件方法二
const copyObject2 = Object.assign({}, originalObject);
copyObject2.fruit = 'orange';
console.log('originalObject:', originalObject);
console.log('copyObject:', copyObject);
console.log('copyObject2:', copyObject2);
console.log('originalObject is equal copyObject:', copyObject === originalObject);
console.log('originalObject is equal copyObject2:', copyObject2 === originalObject);

> "originalObject:" Object { fruit: "apple", price: 20 }
> "copyObject:" Object { fruit: "orange", price: 20 }
> "copyObject2:" Object { fruit: "orange", price: 20 }
> "originalObject is equal copyObject:" false
> "originalObject is equal copyObject2:" false
<!-- endtab -->
{{< /tabbed-codeblock >}}
你以為就此就幸福快樂？是否太天真了？
# 深拷貝與淺拷貝
終於講到為什麼要紀錄這篇文章技術債了，鋪陳了好大一段，我在做專案時，有個功能是複製商品，我將商品 A clone(克隆)一份，形成商品 B，然而我修改商品 B object 內的第二層時，神奇的事情竟然發生，`修改商品 B 會改到商品 A，兩者會連動`，我沒施魔法，也沒撞鬼，鐵定是哪裡出問題，魔鬼藏在細節裡，因為 Object.assign 是淺拷貝 (shallow-copy)。  
{{< alert info >}}
shallow-copy：只完成 Object 第一層的淺層複製，第二層還是連動原物件第二層。  
簡單說第一層 pass by value，第二層 pass by reference。  
因此，改了商品 B 第二層，因其記憶體位址相同，會連動影響商品 A。
{{< /alert >}}

還是看個範例好了...  
<br/>

{{< tabbed-codeblock object-example.js >}}
<!-- tab javascript -->
// shallow copy
const originalObject = {
  fruit: 'apple',
  country: {
    city: 'keelung',
  },
};

const copyObject = Object.assign({}, originalObject);
copyObject.fruit = 'banana';
copyObject.country.city = 'taipei';
console.log('originalObject:', originalObject);
console.log('copyObject:', copyObject);
console.log('originalObject is equal copyObject:', copyObject === originalObject);
// outcome
> "originalObject:" Object { fruit: "apple", country: Object { city: "taipei" } }
> "copyObject:" Object { fruit: "banana", country: Object { city: "taipei" } }
> "originalObject is equal copyObject:" false
<!-- endtab -->
{{< /tabbed-codeblock >}}

可以看到修改 `copyObject` 第一層不會影響 `originalObject` 的第一層。  
但修改第二層 `copyObject` 第二層就會影響 `originalObject` 的第二層，真的靠北！  
現在我知道是淺拷貝 (shallow-copy)，所以我想要深度拷貝，商品 B 跟商品 A 就可以徹徹底底分開，我們從此不再有關聯！有淺就有深，呼叫深拷貝。  
<br/>

{{< alert info >}}
deep-copy：深度複製 Object，複製出的元件變動不會影響原物件。 
因此，改了商品 B 第二層/第 N 層，因其`記憶體位址不相同`，不會連動影響商品 A。
{{< /alert >}}

最後的範例了！  
<br/>

{{< tabbed-codeblock object-example.js >}}
<!-- tab javascript -->
// deep copy
const originalObject = {
  fruit: 'apple',
  country: {
    city: 'keelung',
  },
};
const copyObject = JSON.parse(JSON.stringify(originalObject));
copyObject.fruit = 'banana';
copyObject.country.city = 'taipei';
console.log('originalObject:', originalObject);
console.log('copyObject:', copyObject);
console.log('originalObject is equal copyObject:', copyObject === originalObject);

> "originalObject:" Object { fruit: "apple", country: Object { city: "keelung" } }
> "copyObject:" Object { fruit: "banana", country: Object { city: "taipei" } }
> "originalObject is equal copyObject:" false
<!-- endtab -->
{{< /tabbed-codeblock >}}

可以看到 `originalObject` 複製一個雙胞胎 `copyObject`，使用了 `JSON.parse(JSON.stringify(originalObject))`，先轉字串再轉回 JSON。  
無論我修改第一層或第二層，不會連動影響，你就是你，我就是我，切得一乾二凈。

# 學習重點
這次的學習紀錄，起心動念於我卡住一個 bug 一個小時，想說我眼花，A 複製一個 B，雙胞胎 B 改變了資料結構，
A 也跟著改，是怎樣逆！很叛逆，但其實是我沒搞清楚 JS！  
> 當踩到坑時，你必須由淺入深一層一層剝開自己的心，才有辦法接納 JS 奇妙的存在，就像這次拷貝事件一樣
# 參考連結
* [3 Ways to Clone Objects in JavaScript](https://www.samanthaming.com/tidbits/70-3-ways-to-clone-objects/)
* [JavaScript 淺拷貝 (Shallow Copy) 與深拷貝 (Deep Copy)](https://awdr74100.github.io/2019-10-24-javascript-deepcopy/)
* [Javascript Mutable 跟 Immutable 資料型態](https://ithelp.ithome.com.tw/articles/10193474)

{{< disable-ads >}}