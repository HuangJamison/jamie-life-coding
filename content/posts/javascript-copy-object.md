---
title: "Javascript 讓你困惑的事 - copy object"
date: 2021-10-15T00:35:01+08:00
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
coverCaption: "複製了，就沒事了嗎? by kick stock"
coverMeta: "out"
coverSize: "partial"
comments: true
---
痛過才記得 JS 讓我困惑的地方，踩雷紀錄，弄不清楚拷貝讓你覺得靠北...
<!--more-->
# 本文大綱
- [本文大綱](#本文大綱)
- [Javascript 資料型態](#javascript-資料型態)
- [深拷貝與淺拷貝](#深拷貝與淺拷貝)
- [學習重點](#學習重點)
- [參考連結](#參考連結)

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

# 深拷貝與淺拷貝

# 學習重點

# 參考連結
* [3 Ways to Clone Objects in JavaScript](https://www.samanthaming.com/tidbits/70-3-ways-to-clone-objects/)
* [JavaScript 淺拷貝 (Shallow Copy) 與深拷貝 (Deep Copy)](https://awdr74100.github.io/2019-10-24-javascript-deepcopy/)
* [Javascript Mutable 跟 Immutable 資料型態](https://ithelp.ithome.com.tw/articles/10193474)

{{< disable-ads >}}