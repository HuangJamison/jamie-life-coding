---
title: "[Laravel doc 3] Laravel Service Provider Document 導讀"
date: 2022-04-17T00:15:01+08:00
description: "laravel lifecycle,laravel8, laravel doc"
slug: "laravel-artisan-run"
draft: false
categories:
- laravel
tags:
- laravel
keywords:
- laravel
- lifecycle
- php artisan
clearReading: true
thumbnailImagePosition: left
thumbnailImage: images/laravel.png
coverImage: images/laravel.png
coverCaption: "閱讀文件囉！"
coverMeta: "out"
coverSize: "partial"
comments: true
---
邊看文件邊翻譯邊理解...
<!--more-->
# 本文大綱
- [本文大綱](#本文大綱)
- [Provider 基本概念](#provider-基本概念)
- [編寫 service provider](#編寫-service-provider)
- [Deferred Providers](#deferred-providers)
- [Faceds](#faceds)
- [總結與心得](#總結與心得)
- [參考連結](#參考連結)

# Provider 基本概念
Service Provider 是所有 Laravel application 註冊服務的中心。
包含:
1. registering service container bindings
2. event listeners
3. middleware
4. router

`config/app.php`
{{< tabbed-codeblock php >}}
<!-- tab php -->
'providers' => [
        /*
         * Laravel Framework Service Providers...
         */
        Illuminate\Auth\AuthServiceProvider::class,
        Illuminate\Broadcasting\BroadcastServiceProvider::class,
        Illuminate\Bus\BusServiceProvider::class,
        Illuminate\Cache\CacheServiceProvider::class,
        Illuminate\Foundation\Providers\ConsoleSupportServiceProvider::class,
        Illuminate\Cookie\CookieServiceProvider::class,
        Illuminate\Database\DatabaseServiceProvider::class,
        Illuminate\Encryption\EncryptionServiceProvider::class,
        Illuminate\Filesystem\FilesystemServiceProvider::class,
        Illuminate\Foundation\Providers\FoundationServiceProvider::class,
        Illuminate\Hashing\HashServiceProvider::class,
        Illuminate\Mail\MailServiceProvider::class,
        Illuminate\Notifications\NotificationServiceProvider::class,
        Illuminate\Pagination\PaginationServiceProvider::class,
        Illuminate\Pipeline\PipelineServiceProvider::class,
        Illuminate\Queue\QueueServiceProvider::class,
        Illuminate\Redis\RedisServiceProvider::class,
        Illuminate\Auth\Passwords\PasswordResetServiceProvider::class,
        Illuminate\Session\SessionServiceProvider::class,
        Illuminate\Translation\TranslationServiceProvider::class,
        Illuminate\Validation\ValidationServiceProvider::class,
        Illuminate\View\ViewServiceProvider::class,

        /*
         * Package Service Providers...
         */

        /*
         * Application Service Providers...
         */
        App\Providers\AppServiceProvider::class,
        App\Providers\AuthServiceProvider::class,
        // App\Providers\BroadcastServiceProvider::class,
        App\Providers\EventServiceProvider::class,
        App\Providers\RouteServiceProvider::class,

    ],
<!-- endtab -->
{{< /tabbed-codeblock >}}
以上為 application 載入時，要 load 的 service provider，service 真正實際啟動時才會被 load。

# 編寫 service provider
所有 service provider extend `Illuminate\Support\ServiceProvider`，每個 service provider 都包含一個 register and boot method。在
register method 中，你只需要將 service bind 進去 service container。
{{< tabbed-codeblock AppServiceProvider.php >}}
<!-- tab php -->
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Riak\Connection;

class RiakServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(Connection::class, function ($app) {
            return new Connection(config('riak'));
        });
    }
}
<!-- endtab -->
{{< /tabbed-codeblock >}}
不要將 event listeners, routes 或其他功能 bind service provider。
如果你的 Service Provider 註冊許多 bindings，可用 binds and singletons，去讓程式更有可讀性，在 load service provider 自動檢查這些屬性，register 相對應 bindings。

{{< alert info >}}
boot 做什麼用的呢？ 其作為啟動所有 application service，其啟動於 all service providers are registered 才能被調用。
{{< /alert >}}
all service providers 透過 config/app.php 進行 register，包含郵件、queue、cache和其他功能。

# Deferred Providers
可以選擇延遲 load 該綁定直到其服務真的需要時才去 load 其 providers，可增加應用性能，不會每次請求都 load。

# Faceds
概念為 service container 提供一個 static interface 可使用於 service container。
Laravel Faceds 定義在 `Illuminate\Support\Facades` namespace 下。
<!-- tab php -->
use Illuminate\Support\Facades\Route;

Route::get('/cache', function () {
    return Cache::get('key');
});

<!-- endtab -->

{{< alert info >}}
Facades 不需要注入，但要小心別讓 class 越來越肥大，Facades 不同於 dependency injection，DI 在測試時，會 inject mock or stub 去 assert 結果。 Facades 不會是 mock or stub，Facades 就我閱讀起來比較像是全域的插件，可以隨時呼叫內建於 Laravel 的小功能。
{{< /alert >}}

# 總結與心得
我用一個比喻去描述我看完 Laravel container and service 的概念。  
Service container 就像是水族箱的箱子一樣，你沒裝水，或安裝不同器具的功能，其就只是個箱子。  
Service provider 像是安裝於的功能，你在使用這些功能前，必須檢查其有無安裝於此水族箱 (container) 內，才能呼叫使用這個水族箱的服務。  
Facades 很像是 Laravel 內建寫好的小功能，就像水族箱原生就有過濾器，有點像是內建的魔法糖，其為全域都可呼叫。  
基本的 Laravel 的核心架構文件大致上都看完了，接下來會挑重點去看 Laravel 的基礎功能。
# 參考連結
* [laravel 8](https://laravel.com/docs/8.x)
* [簡體中文 laravel 8](https://learnku.com/docs/laravel/8.x/)

{{< disable-ads >}}