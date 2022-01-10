---
title: "Laravel dev setting - Artisan & Composer & how to run laravel locally"
date: 2021-12-13T00:15:01+08:00
description: "laravel MVC concept, php artisan, env setting, Composer concept, how to run laravel locally"
slug: "laravel-artisan-run"
draft: false
categories:
- laravel
tags:
- laravel
- metatime
keywords:
- laravel
- migrations
- seeding
- controller
- php artisan
clearReading: true
thumbnailImagePosition: left
thumbnailImage: images/laravel.png
coverImage: images/laravel.png
coverCaption: "我跳槽學習 Laravel 了！"
coverMeta: "out"
coverSize: "partial"
comments: true
---
優美的框架？ Laravel 學習之路！
<!--more-->
# 本文大綱
- [本文大綱](#本文大綱)
- [Laravel 學習動機](#laravel-學習動機)
- [Laravel 起手式 artisan](#laravel-起手式-artisan)
- [composer](#composer)
- [創建 laravel 並在地端跑起來](#創建-laravel-並在地端跑起來)
- [心得](#心得)
- [參考連結](#參考連結)

# Laravel 學習動機
目前在公司都是寫 Codeigniter，優點不外乎是易寫、好懂、輕量，缺點難維護、沒有固定 pattern，慢慢重構程式碼過程中，有慢慢知道什麼 Code 是好的，什麼是不好的，也去看看市場上的主流框架是否跟公司內部一樣。
Laravel 從我剛轉職工程師不久就常聽到，跟 Codeigniter 一樣都是 PHP Framework，以下是 PHP framework trend
| [![php-trend](/images/php-trend.png) ](/images/php-trend.png)| 
|:--:|
| *php-trend resouce from https://dev.to/theme_selection/which-php-framework-is-best-for-web-development-in-2021-5ck5* |

> 都入坑 PHP 這麼久，不知道誰是老大或不知道老大的好，不太對吧！ 另個現實是PHP相關職缺好像都是 Laravel related

# Laravel 起手式 artisan

知識 +++
{{< alert info >}}
Artisan： Laravel 框架內的的魔法指令，簡單說指令集合的工具包，可以透過 artisan 去幫你建立常用到的 MVC 以及其他功能。
{{< /alert >}}

{{< tabbed-codeblock command-line >}}
<!-- tab cmd -->
// 1. 看有哪些指令
php artisan list
// 2. help 單一指令
php artisan help migrate
<!-- endtab -->
{{< /tabbed-codeblock >}}
# composer
知識 +++
{{< alert info >}}
Composer：php 套件管理機制，安裝完成後，它會在當前資料夾下建立 composer.json、composer.lock 及 vendor/ 的資料夾。  
簡單說就跟 node 的 package.json 很像，去紀錄 workspack repo 內安裝的套件
{{< /alert >}}

# 創建 laravel 並在地端跑起來
分為兩種情況自建或是複製 github 上的 repo，只要最後可以 run laravel locally 就算成功！
1. 自建 
{{< tabbed-codeblock command-line >}}
<!-- tab cmd -->
laravel new project-name
// run laravel locally 可指定 port 或不寫
php artisan serve --port=8000
<!-- endtab -->
{{< /tabbed-codeblock >}}
2. clone 
我著重講 clone 好了！畢竟新手如我卡在這邊  
Step 1. `git clone your-url.git`  
Step 2. 裝相對應套件 `composer install`
Step 3. 通常作者會有一份叫做 `.env.example` 的檔案，複製它命名為 .env `cp .env.example .env`
Step 4. 確認 `.env` setting 可參考下面

{{< tabbed-codeblock config >}}
<!-- tab env -->
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=root
<!-- endtab -->
{{< /tabbed-codeblock >}}  

> 這邊應該下 `php artisan serve` 可以 run 起來了！但因為複製 repo 通常會 conn db 因此接下來步驟為解決 db conn 問題

Step 5. migrate 依據各 repo 情況，記住如果 repo 有設定 db name 要記得手動建立 db，名字要吻合
> 順道一提 migrate 是 laravel 去紀錄 db 異動的版控，下一篇看有沒有時間去細提，只能說把 db schema 放進版控，真是傑出的一手!!!
> 重要、重要、重要!!!!! 記得打開 MySQL，笨蛋如我忘記開...  

{{< tabbed-codeblock command-line >}}
<!-- tab cmd -->
// sets the APP_KEY value in your .env file.
php artisan key:generate
// 資料庫不存在，直接使用此指令
php artisan migrate --seed
// 資料庫已存在，可以加上 :refresh 刷掉(用這個）
php artisan migrate:refresh --seed
<!-- endtab -->
{{< /tabbed-codeblock >}}

Step 6. 啟動 laravel  `php artisan serve --port=8000`

疑難雜症. 可以試著清除一些設定，再重複上面的指令，真不行就 google 一下，祝你馬到成功
{{< tabbed-codeblock command-line >}}
<!-- tab cmd -->
php artisan cache:clear 
php artisan config:clear
<!-- endtab -->
{{< /tabbed-codeblock >}}

# 心得
寫文章記錄真的是一件花時間的事情，不累但很耗時，好處是可以把之前踩過的雷去再回想一次，也希望做個紀錄，算是一些小小成就感，這一篇主要是去紀錄簡單的 Laravel dev setting 全記錄，下一篇再來紀錄開發的學習，MVC 與 controllers/migrations 等觀念。 

# 參考連結
* [laravel 8](https://laravel.com/docs/8.x)
* [laravel 5.2 中文](https://laravel.tw/docs/5.2)

{{< disable-ads >}}