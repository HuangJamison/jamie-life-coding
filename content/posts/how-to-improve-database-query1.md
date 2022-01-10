---
title: "如何優化資料庫 query，從 explain 開始吧 — 上半場 select_type"
date: 2021-09-12T23:35:01+08:00
description: "database query performance improve, explain query, select_type"
slug: "how-to-improve-database-query-1"
draft: false
categories:
- coding
tags:
- database
keywords:
- database query 
- database index
- explain select_type
clearReading: true
thumbnailImagePosition: left
thumbnailImage: images/loading.jpeg
coverImage: images/loading.jpeg
coverCaption: "imporve query speed photo by lukechesser"
coverMeta: "out"
coverSize: "partial"
comments: true
---
越煩雜越要整理，每次用到，每次忘記XD
<!--more-->
# 本文大綱
- [本文大綱](#本文大綱)
- [問題起源](#問題起源)
- [explain 基本欄位說明](#explain-基本欄位說明)
  - [select_type](#select_type)
  - [table](#table)
- [學習重點](#學習重點)
- [參考連結](#參考連結)

# 問題起源
當你開始做報表工具時，自己寫完發現沒問題，沾沾自喜，殊不知業務開多個分頁，形成 slow query，此時該如何解決問題呢？
> 如果解決不了問題，就解決提出問題的那個人XD

通常我會用以下三個方法去嘗試解決：
1. 詢問需求端，不必要的資料，例如：業務其實不需要一年以前的資料，或是其他欄位沒這麼重要，可以少 join 一些 table

2. 盡可能讓 query 簡單，讓痛苦留在 controller，既然 database 為瓶頸，何不嘗試把困難轉嫁到 controllers 上

3. 通常前兩項一起使用 90 % 的問題都可以解決，但當商業邏輯極度複雜時，建議診斷看看你的 query， 當然優化 slow query 也可以從這邊開始，練習優化 db query 吧

# explain 基本欄位說明
先打個預防針，這篇講的不會太深，一般來說，我們查詢一段 query，我們在 query 前加上 `EXPLAIN` 後就可以看到這段 query 用到哪些 index, type, advice 等等。
| [ ![explain-query](/images/query.png) ](/images/query.png) | 
|:--:|
| *大概跟第一次看到線性代數一樣* |
## select_type
{{< alert info >}}
表示查詢類型，這個查詢是否太過複雜，query 不包含子查詢或是 UNION 都屬於 SIMPLE
{{< /alert >}}

| 名稱 | 意義 |
|:----------:|:------------:|
| SIMPLE | 不包含子查詢或 UNION |
| PRIMARY | 指的是複雜查詢的外層查詢，見範例 1|
| SUBQUERY | 在 select 或 where 中包含子查詢，見範例 1 |
| DERIVED | 在 from 中包含子查詢且被標記為衍生表，見範例 2 |
| UNION | 在 from 中子查詢的出現在 UNION 後的 select，見範例 2 |
| UNION RESULT | 從 UNION 表中獲取結果的 select，見範例 2 |
  

- 範例 1：
| [ ![explain-query](/images/query-ex1.png) ](/images/query-ex1.png) | 
|:--:|
| *query中包含子查詢* |
    - 此時 `select * from event where id = ?` 就為 PRIMARY
    - 此刻子查詢的 `SELECT id FROM `event` WHERE `event_id` = 'line8888'`  為 SUBQUERY
    - 暫存的 UNION 結果存在 UNION RESULT
{{< tabbed-codeblock sql >}}
    <!-- tab sql -->
    explain 
        SELECT 
           * 
        FROM 
            `event`
        WHERE 
        id = ( 
        SELECT 
            id 
        FROM 
            `event`
        WHERE 
            `event_id` = 'line8888'
        )
    <!-- endtab -->
{{< /tabbed-codeblock >}}
  
- 範例 2：  
MySQL 會遞迴執行這些子查詢，放在臨時表中
| [ ![explain-query](/images/query-ex2.png) ](/images/query-ex2.png) | 
|:--:|
| *query中包含UNION* |
    - DERIVED 衍生表會由 UNION 開頭那張表作為主表衍生，可以看到 972 rows 是 event 總列數
    - UNION 後的 select 的第二張表，會被標記為 UNION，可以看到 19 rows 是 faq 總列數
{{< tabbed-codeblock sql >}}
    <!-- tab sql -->
    explain SELECT
        *
    FROM
        (
        SELECT
            id
        FROM
            `event`
        UNION
        SELECT
            id
        FROM
            faq
        ) AS union_table
    WHERE
        union_table.id = 3
    <!-- endtab -->
{{< /tabbed-codeblock >}}

## table
table: 就表示查詢哪張表，非常直觀XD

# 學習重點
剛開始想說一次到位，把所有的 `explain` 的意義一次寫完，但後來想想按照自己學習的節奏好了！
我會把他切成三個部分
1. select_type
2. type
3. 優化與技巧
> 學習勿操之過急，慢慢來比較快
# 參考連結
* [透過索引優化來提高SQL效能](https://castion2293.medium.com/%E9%80%8F%E9%81%8Eexplain%E5%88%86%E6%9E%90%E6%95%88%E8%83%BD-dad14f16ae7e)
* [explain都不會用，你好意思說精通MySQL查詢優化？](https://database.51cto.com/art/202008/624772.htm)

{{< disable-ads >}}