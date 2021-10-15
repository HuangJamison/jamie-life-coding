---
title: "離開 Medium 擁抱 Hugo"
date: 2021-08-22T19:35:01+08:00
description: "從 medium 離開與選擇 hugo 寫部落格的原因"
draft: false
categories:
- hugo
tags:
- 心情543
keywords:
- medium
- hugo
- blogs
clearReading: true
thumbnailImagePosition: left
thumbnailImage: images/medium-to-hugo.jpeg
coverImage: images/medium-to-hugo.jpeg
coverCaption: "紀錄著自己的成長 photo by Kaitlyn Baker"
coverMeta: "out"
coverSize: "partial"
comments: true
slug: "medium-to-hugo"
---
再見 Medium，你很棒，但我需要更多彈性，紀錄更多自己的技術債與學習文章！
<!--more-->

# 本文大綱
- [本文大綱](#本文大綱)
- [為什麼要自架 hugo blog？](#為什麼要自架-hugo-blog)
- [Demo hugo 功能](#demo-hugo-功能)
  - [code](#code)
  - [Table](#table)
  - [一些小樣式](#一些小樣式)
- [學習重點](#學習重點)
- [參考連結](#參考連結)

# 為什麼要自架 hugo blog？
1. Medium 貼程式碼很麻煩，要 github gist，切換分頁，在寫文章時，會非常非常阿雜
2. 同事狂推 hugo，自己本身也沒建過，想說玩玩看，不難吧，結果入坑，又是另一個故事了
3. 想試試看架在 firebase 上，且沒玩過 google analytics
4. 現在目前是架設完了，發現 DNS 之前只知道概念，實作時看了一些觀念才理解，結果設定時還是整個大踩雷，花不少時間!!!
5. 想多了解 SEO & sitemap.xml

# Demo hugo 功能
業配 hugo 環節，之後要複製也比較好找到XD
## code
{{< tabbed-codeblock >}}
    <!-- tab js -->
        console.log('Hello World!');
    <!-- endtab -->
    <!-- tab css -->
        .btn {
            color: red;
        }
    <!-- endtab -->
{{< /tabbed-codeblock >}}

## Table
|  星期六  | 星期日   | 星期一到五  |
|:----------:|:------------:|:------------:|
| 早上英文口說 | 早上自然醒 | 早上厭世喝麥片 |
| 下午打球或英文聚會 | 下午朋友約 | 看看股票 |
| 傍晚 朋友小聚  | 晚上思考人生 | 工作 coding |
| 晚上 coding | 躺在床上迎接挑戰 | 回家享天倫之樂 |

## 一些小樣式
{{< hl-text success >}}
原諒的顏色
{{< /hl-text >}}

{{< alert danger >}}
你的生命值過低，請進行充血... >////< 是補血
{{< /alert >}}

> 你必須很努力，才能看起來毫不費力

# 學習重點

作為部落格的第一篇，其實紀錄的是心境上的轉換，盡可能不要再依賴他人的服務，雖然我還是依賴的 hugo，
但在學習不同工具時，自己也被迫去了解一些相關的設定與知識。
每篇結尾都有個自己的名言，感覺起來很勵志XD
> 踏出舒適圈，才知道世界有多大

# 參考連結

* [hugo](https://gohugo.io/documentation/)
* [hugo-template-demo](https://tranquilpeak.kakawait.com/)

{{< disable-ads >}}