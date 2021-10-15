---
title: "正規化 or 反正規化，優缺點一次說明"
date: 2021-09-07T01:05:01+08:00
description: "normalization or denormalized"
slug: "database-normalization-pros-cons"
draft: false
categories:
- database
tags:
- database-design
keywords:
- database-design
- normalize
- denormalized
clearReading: true
thumbnailImagePosition: left
thumbnailImage: images/database.jpeg
coverImage: images/database.jpeg
coverCaption: "you have to decide until knowing everything photo by Caspar Camille Rubin"
coverMeta: "out"
coverSize: "partial"
comments: true
---
沒有最佳解，你必須通盤了解，才能找到最適解！
<!--more-->
# 本文大綱
- [本文大綱](#本文大綱)
- [正規化](#正規化)
- [正規化細節](#正規化細節)
- [什麼時候反正規化](#什麼時候反正規化)
- [學習重點](#學習重點)
- [參考連結](#參考連結)

# 正規化

最近在寫程式時，常面臨到 database join 來 join 去，導致於執行速度過慢，開發時，又要理解很多 table 之間的關聯，正規化真的好嗎？
> 當你不知道選擇哪個架構，往往是你不清楚你想要什麼？

正規化要解決的事情是降低資料的重複性，你不會在一個 table 裡面看到 `訂單資料` 、 `使用者資料`，這樣這張表就太多 column，一個視窗也拉不完，因此會將 `訂單資料` 成一個獨立的表， `使用者資料` 成另一個獨立表，可避免資料重複。<br/>

正規化的優點：
{{< alert success >}}
1. 降低資料的重複性
2. 去除相依性，利用外部索引鍵，產生關聯
3. update 資料較快(因 update 部分資料，例如：只想更新使用者地址，那就更新使用者資料，不必更新訂單的每個資料)
{{< /alert >}}

<br/>正規化的缺點：<br/>
{{< alert warning >}}
1. 耦合性高，牽一髮動全身(約束性強)
2. 查詢較慢(如 join table 到一定數量，爆炸慢)
3. DB I/O 繁忙，因為 join 很多表
4. 儲存成本高
{{< /alert >}}

# 正規化細節

1. 第一正規化：去除重複性，像是購物車訂單，不會包含此筆訂單下的所有商品，不會存成...
{{< alert danger >}}
錯誤示範 cart_orders
|  id  | user   | product  |
|:----------:|:------------:|:------------:|
| 1 | jamie | 麥片、水果 |
| 2 | win | 水果、滑鼠 |
| 3 | leo | 滑鼠、麥片 |
{{< /alert >}}
<br/>
    應該會存成下面這樣，才會是模範生...
<br/>
{{< alert success >}}
正確示範 cart_orders
| id | user | product |
|:----------:|:------------:|:------------:|
| 1 | jamie | 麥片 |
| 2 | jamie | 水果 |
| 3 | win | 水果 |
| 4 | win | 滑鼠 |
| 5 | leo | 滑鼠 |
| 6 | leo | 麥片 |
{{< /alert >}}
      
    <br/>  

2. 第二正規化：去除相依性，使用外部索引鍵，讓這些資料表產生關聯，而不是一張 table 塞入所有資訊  
     不要以為剛剛那樣就很完美，還有一些地方可以優化，仔細看下面示範，把 `user` 與 `product` 放在同一張表內
{{< alert danger >}}
錯誤示範 cart_orders
| id | user | product |
|:----------:|:------------:|:------------:|
| 1 | jamie | 麥片 |
| 2 | jamie | 水果 |
| 3 | win | 水果 |
| 4 | win | 滑鼠 |
| 5 | leo | 滑鼠 |
| 6 | leo | 麥片 |
{{< /alert >}}
<br/>
    應該要分成兩張表 `users` 跟 `cart_orders`
<br/>
{{< alert success >}}
正確示範 cart_orders
| id | user_id | product |
|:----------:|:------------:|:------------:|
| 1 | 1 | 麥片 |
| 2 | 1 | 水果 |
| 3 | 2 | 水果 |
| 4 | 2 | 滑鼠 |
| 5 | 3 | 滑鼠 |
| 6 | 3 | 麥片 |

正確示範 users
| id | name |
|:----------:|:------------:|
| 1 | jamie |
| 2 | win  |
| 3 | leo  |
{{< /alert >}}

3. 第三正規化：刪除不依賴索引鍵的欄位，例如說：訂單數量 `count` 與單價 `unit_price` 已經存在表單，又多了每一筆訂單的 amount，就是不必要的  
   因此，剛剛的 schema 還可以優化，例如說以下錯誤示範
{{< alert danger >}}
錯誤示範 cart_orders
| id | user_id | product | count | unit_price | amount | 
|:----------:|:------------:|:------------:|:------------:|:------------:|:------------:|
| 1 | 1 | 麥片 | 2 | 2 | 4 |
| 2 | 1 | 水果 | 3 | 1 | 3 |
| 3 | 2 | 水果 | 4 | 1 | 4 |
| 4 | 2 | 滑鼠 | 1 | 10 | 10 |
| 5 | 3 | 滑鼠 | 7 | 10 | 70 |
| 6 | 3 | 麥片 | 10 | 2 | 20 |
{{< /alert >}}
<br/>
    應該要把相依性 amount 拿掉
<br/>
{{< alert success >}}
正確示範 cart_orders
| id | user_id | product | count | unit_price |
|:----------:|:------------:|:------------:|:------------:|:------------:|
| 1 | 1 | 麥片 | 2 | 2 |
| 2 | 1 | 水果 | 3 | 1 |
| 3 | 2 | 水果 | 4 | 1 |
| 4 | 2 | 滑鼠 | 1 | 10 |
| 5 | 3 | 滑鼠 | 7 | 10 |
| 6 | 3 | 麥片 | 10 | 2 |
{{< /alert >}}

# 什麼時候反正規化
教科學經常告訴學生最好的參照方式，但實際運用時必須考慮天時、地利、人和，簡單說，就是必須考量到實際運用情境。<br/>
當你遇到商業邏輯極為複雜時，又使得資料庫正規化到極致，很有可能讓後續維護困難  
以下幾種情境可以使用反正規化
{{< alert info >}}
1. 耦合性高，牽一髮動全身(約束性強)
2. 經常要查詢，但不常更動的設計(因為常查詢如果反正規化可以少 join 一堆 table)
3. 資料不超過百萬
4. 不要求快速寫入
{{< /alert >}}
# 學習重點
這一次要重整公司複雜的商業邏輯，因過去時空背景下，是將資料正規化到極致，導致於後續維護成本高，因此尋找有沒有更簡單的解法，  
可以讓前人種樹，後人乘涼的解法，因此找到了`反正規化`，因此寫了兩者的比較，讓自己對 database schema 設計更了解，才能設計出更好的架構。
> 可以簡單，何必複雜！
# 參考連結
* [資料庫到底要不要做正規化](https://kylinyu.win/table-normalize-or-denormalized/)
* [正規與反正規化的戰爭](https://mark-lin.com/posts/20160917/)

{{< disable-ads >}}