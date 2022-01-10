---
title: "DNS - 網域名稱系統，買網域惹!"
date: 2021-08-22T19:35:01+08:00
description: "紀錄 DNS 與買網域設定的雷點與歷程，網域名稱系統，GoDaddy，買網域，網站設定
             record how to buy domain and share how to do the setting."
slug: "dns-setting"
draft: false
categories:
- blog-setting
tags:
- DNS
keywords:
- DNS
- domain name system
- 網域名稱系統
clearReading: true
thumbnailImagePosition: left
thumbnailImage: images/dirty-hand.jpeg
coverImage: images/dirty-hand.jpeg
coverCaption: "dirty-hand photo by jesse orrico"
coverMeta: "out"
coverSize: "partial"
comments: true
---
以為自己很熟悉 DNS，但設定還是弄得亂糟糟，滿是瘡口!
<!--more-->
# 本文大綱
- [本文大綱](#本文大綱)
- [DNS - domain name system](#dns---domain-name-system)
- [firebase custom domain setting](#firebase-custom-domain-setting)
- [學習重點](#學習重點)
- [參考連結](#參考連結)

# DNS - domain name system
DNS，又稱網域名稱系統，將人們覺得有意義的名稱轉換成機器可讀懂的 IP 位址 (118.96.168.1)。
{{< youtube HHC7JPhBPBQ >}}
{{< alert info >}}
看到台大地大台科大，還不跪下來，讓我收下你的膝蓋
{{< /alert >}}

讓我為客官說一個故事，小明小美要約會有一天相約在老地方吃飯，因地點不明確，有了以下的留言
* 小明： 我們約老地方吃飯，東經 121.5 度，北緯 23.5 度
* 小美： 你跟鬼說話嗎？ 幾度幾度我怎知道在哪？ 我要生氣囉！
* 小明： 對不起啦！ 台北中山區忠孝北路 520 號 3 F ，fall in love 餐酒館
* 小明： 不要生氣了，我對你的愛是 `愛你無法度`
* 小美： (已讀)

因此在網路的世界中，上面的 fall in love 餐酒館就是`網域名稱`， 東經 121.5 度，北緯 23.5 度 跟 台北中山區忠孝北路 520 號 3 F 就是 `IP 位址`，對於人們來說， fall in love 餐酒館是比較好溝通且容易記得的

機器在解析域名時，會由右邊至左邊，以 `jamie-life-coding.site` 網域來說，會先去解析 `.site` 伺服器，一層一層往上找。 

* CNAME: 網站別名，通常對應為有意義文字，例如  `jamie-life-coding.site`
* A: 對應到 IP address

# firebase custom domain setting
因為我們是在 firebase 使用託管的服務，所以 domain name 為 `.web.app` 結尾，然而我們想要客製化屬於自己專屬域名，需要以下步驟，以下以圖片記錄。
1. 花 $ 或是尋找免費的域名服務
我自己本身是用 [GoDaddy](https://tw.godaddy.com/)，花了 35 元一年，也是人生中第一次購買這類產品，蠻新鮮的。
![buy-domain](/images/buy-domain.png)

2. 買完後，firebase 左側欄點擊 `Hosting`，並點擊 `新增自訂網域`，會出現這個畫面，填入你剛買的域名
![firebase-setting](/images/firebase-setting.png)

3. 會產生出一組 TXT，類似驗證碼，驗證這個服務與主機的連結，可參考[說明](https://tw.godaddy.com/help/add-a-txt-record-19232)，主機填入你剛剛買的域名(jamie-life-coding.site)，TXT value 填入 firebase 產生的驗證碼，TTL 用來定義DNS 記錄的後續變更生效前的時間。<br/>

4. 填入後，回到 firebase 頁面，此時，他會給你 IP address

5. 複製這個 IP 也就是 DNS 的 A 給你購買的 DNS 託管服務商，填入到 A 那列

6. 如果你只有一層你可以只填一層 CNAME，名稱 www ，值 hugo-firebase-blog.web.app，就可以了
    兩層的話，就是在網址前有個子域 `blog`，所以 `blog.jamie-life-coding.site` 也可以通！
    ![godaddy](/images/godaddy.png)

7. 睡一覺，因為 SSL 認證等等機制，所以會晚一點，這也印證了當你解決不了時，不妨睡一下海闊天空

# 學習重點
* 自己摸了一下 firebase depoly 後如何設定 custom domain
* 瞭解 DNS 運作機制
* 買了人生第一個域名，算是人生的里程碑吧！
> 你想徹徹底底了解一遍，先把手弄髒吧！

# 參考連結

* [aws dns](https://aws.amazon.com/tw/route53/what-is-dns/)
* [IT 邦 Gene](https://blog.genesu.me/2020/09/hugo-site-deploy/)
* [GoDaddy](https://tw.godaddy.com/help/add-a-txt-record-19232)
* [域名系統（DNS）101—網址的小旅行](https://medium.com/%E5%BE%8C%E7%AB%AF%E6%96%B0%E6%89%8B%E6%9D%91/%E5%9F%9F%E5%90%8D%E7%B3%BB%E7%B5%B1-dns-101-7c9fc6a1b8e6)

{{< disable-ads >}}