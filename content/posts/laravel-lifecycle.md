---
title: "[Laravel doc 1] Laravel architecture - 一切從閱讀文檔開始"
date: 2022-03-16T00:15:01+08:00
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
coverCaption: "該啃文件囉！"
coverMeta: "out"
coverSize: "partial"
comments: true
---
Reading document 是培養耐心的一種修煉...
<!--more-->
# 本文大綱
- [本文大綱](#本文大綱)
- [Laravel 文件](#laravel-文件)
- [Lifecycle](#lifecycle)
- [Service Provider](#service-provider)
- [Routing](#routing)
- [總結與心得](#總結與心得)
- [心得](#心得)
- [參考連結](#參考連結)

# Laravel 文件
怎麼會開始看文件呢？事發總有個原因XD 原因是被問到 Laravel 運作進入的順序，我大概只能回答出 middleware -> route -> controllers。

但其實這中間還有很多細節我並不知道的，我過去學習方式是以實戰下去學習，可以動就好，後來看到 Laravel conference 優美的架構後，才發現魔鬼藏在細節裡，養成良好的閱讀習慣。
以下用閱讀隨筆方式紀錄，如有錯誤，再煩請告知，不定期更新與整理。

# Lifecycle
1. `public/index.php`，為什麼 request 入口是 `public/index.php`，因為 server(Apache/Nginx) configuration 設定的。
2. `vendor/autoload.php` -> `/composer/autoload_real.php`  會去載入官方與常用套件，分成以下三種  
   (1) autoload_namespaces : 幫助日後使用 library 呼叫方便，對應其原來 library  
   (2) autoload_psr4 : 將一些常用的 packages 對應其原先 packages 位置，以便後續使用方便  
   (3) autoload_classmap : 同樣將其常用的 packages 對應其原先 packages 位置，以便後續使用方便   

What is autoloading?
[PHP autoload best practices](http://ditio.net/2008/11/13/php-autoload-best-practices/)
{{< alert info >}}
What is autoloading? Every time you want to use a new class in your PHP project, first you need to include this class (using include or require language construct, that’s right this are not functions). However if you have __autoload function defined, inclusion will handle itself.
{{< /alert >}}
實際上去翻 laravel project 內容如下，看過這些底層後，我對 `autoload` 的認知是將有需要的 package & cutomized files 利用 autoload file 去 map 絕對路徑與命名，`autoload_classmap` 對應命名與實際存放位置。

{{< tabbed-codeblock autoload_real.php >}}
<!-- tab PHP -->
// vendor/autoload.php
require_once __DIR__ . '/composer/autoload_real.php';
// autoload_real.php
    public static function loadClassLoader($class)
    {
        if ('Composer\Autoload\ClassLoader' === $class) {
            require __DIR__ . '/ClassLoader.php';
        }
    }

    /**
     * @return \Composer\Autoload\ClassLoader
     */
    public static function getLoader()
    {
        if (null !== self::$loader) {
            return self::$loader;
        }

        require __DIR__ . '/platform_check.php';

        spl_autoload_register(array('ComposerAutoloaderInit5c55c31ecadb260233c7b285c5f084a8', 'loadClassLoader'), true, true);
        self::$loader = $loader = new \Composer\Autoload\ClassLoader(\dirname(\dirname(__FILE__)));
        spl_autoload_unregister(array('ComposerAutoloaderInit5c55c31ecadb260233c7b285c5f084a8', 'loadClassLoader'));

        $useStaticLoader = PHP_VERSION_ID >= 50600 && !defined('HHVM_VERSION') && (!function_exists('zend_loader_file_encoded') || !zend_loader_file_encoded());
        if ($useStaticLoader) {
            require __DIR__ . '/autoload_static.php';

            call_user_func(\Composer\Autoload\ComposerStaticInit5c55c31ecadb260233c7b285c5f084a8::getInitializer($loader));
        } else {
            $map = require __DIR__ . '/autoload_namespaces.php';
            foreach ($map as $namespace => $path) {
                $loader->set($namespace, $path);
            }

            $map = require __DIR__ . '/autoload_psr4.php';
            foreach ($map as $namespace => $path) {
                $loader->setPsr4($namespace, $path);
            }

            $classMap = require __DIR__ . '/autoload_classmap.php';
            if ($classMap) {
                $loader->addClassMap($classMap);
            }
        }

        $loader->register(true);

        if ($useStaticLoader) {
            $includeFiles = Composer\Autoload\ComposerStaticInit5c55c31ecadb260233c7b285c5f084a8::$files;
        } else {
            $includeFiles = require __DIR__ . '/autoload_files.php';
        }
        foreach ($includeFiles as $fileIdentifier => $file) {
            composerRequire5c55c31ecadb260233c7b285c5f084a8($fileIdentifier, $file);
        }

        return $loader;
    }
<!-- endtab -->
{{< /tabbed-codeblock >}}
3. `bootstrap/app.php`，會去拿所有 instance of Laravel application，第一個動作就是創建 service container。
4. HTTP kernnel / console kernel  
   `app/Http/Kernel.php` 
    bootstrapper 會在 require 前就執行，其會設定 error handling/logging/env  環境設定
    HTTP kernel 定義在進入 application 前要進入的 middleware。
    這些 middleware 處理讀寫 HTTP session、驗證 CSRF token
> 文件中提到將 kernel 想成一個黑盒子去說明你整個應用服務，因此 kernel 就是輸入 HTTP request，其回 HTTP response 
# Service Provider
kernel bootstrapping 工作是為你的服務載入 service providers，啟動服務前要去 `config/app.php` 設定 providers，遍歷 provider 去啟動 instance，register 這些 providers。
{{< alert info >}}
看完文件後，仍有點抽象，Service Provider 是可以讓開發者依賴綁定服務到 container 內，我不需要做太多實例化(instantiate)、或宣告，
Service Provider 負責啟動各服務元件、設定 Alias 的對照表，例如：讓你在 controllers 可以直接使用 `Request`
{{< /alert >}}
> 在 [Laravel 如何實現依賴注入](https://medium.com/mr-efacani-teatime/laravel%E5%A6%82%E4%BD%95%E5%AF%A6%E7%8F%BE%E4%BE%9D%E8%B3%B4%E6%80%A7%E6%B3%A8%E5%85%A5-d760c8e5abde) 中有一個很好的比喻，Service Provider 像是點餐機器，提供你這項服務的各種功能，包含點餐、收款、付錢，Service Container 就是這個冷冰冰的機器實體，在還沒載入任何程式前，它就是普通的 POS 機台。

以下是 `config/app.php` 的 code
{{< tabbed-codeblock app.php >}}
<!-- tab PHP -->
    // ... 以上省略，包含一些名稱、時區等
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

    /*
    |--------------------------------------------------------------------------
    | Class Aliases
    |--------------------------------------------------------------------------
    |
    | This array of class aliases will be registered when this application
    | is started. However, feel free to register as many as you wish as
    | the aliases are "lazy" loaded so they don't hinder performance.
    |
    */

    'aliases' => [

        'App' => Illuminate\Support\Facades\App::class,
        'Arr' => Illuminate\Support\Arr::class,
        'Artisan' => Illuminate\Support\Facades\Artisan::class,
        'Auth' => Illuminate\Support\Facades\Auth::class,
        'Blade' => Illuminate\Support\Facades\Blade::class,
        'Broadcast' => Illuminate\Support\Facades\Broadcast::class,
        'Bus' => Illuminate\Support\Facades\Bus::class,
        'Cache' => Illuminate\Support\Facades\Cache::class,
        'Config' => Illuminate\Support\Facades\Config::class,
        'Cookie' => Illuminate\Support\Facades\Cookie::class,
        'Crypt' => Illuminate\Support\Facades\Crypt::class,
        'Date' => Illuminate\Support\Facades\Date::class,
        'DB' => Illuminate\Support\Facades\DB::class,
        'Eloquent' => Illuminate\Database\Eloquent\Model::class,
        'Event' => Illuminate\Support\Facades\Event::class,
        'File' => Illuminate\Support\Facades\File::class,
        'Gate' => Illuminate\Support\Facades\Gate::class,
        'Hash' => Illuminate\Support\Facades\Hash::class,
        'Http' => Illuminate\Support\Facades\Http::class,
        'Lang' => Illuminate\Support\Facades\Lang::class,
        'Log' => Illuminate\Support\Facades\Log::class,
        'Mail' => Illuminate\Support\Facades\Mail::class,
        'Notification' => Illuminate\Support\Facades\Notification::class,
        'Password' => Illuminate\Support\Facades\Password::class,
        'Queue' => Illuminate\Support\Facades\Queue::class,
        'RateLimiter' => Illuminate\Support\Facades\RateLimiter::class,
        'Redirect' => Illuminate\Support\Facades\Redirect::class,
        // 'Redis' => Illuminate\Support\Facades\Redis::class,
        'Request' => Illuminate\Support\Facades\Request::class,
        'Response' => Illuminate\Support\Facades\Response::class,
        'Route' => Illuminate\Support\Facades\Route::class,
        'Schema' => Illuminate\Support\Facades\Schema::class,
        'Session' => Illuminate\Support\Facades\Session::class,
        'Storage' => Illuminate\Support\Facades\Storage::class,
        'Str' => Illuminate\Support\Str::class,
        'URL' => Illuminate\Support\Facades\URL::class,
        'Validator' => Illuminate\Support\Facades\Validator::class,
        'View' => Illuminate\Support\Facades\View::class,

    ],
<!-- endtab -->
{{< /tabbed-codeblock >}}   

就拿其載入的 `App\Providers\AppServiceProvider::class` 來說，裡面可以 register 自己定義的 provider，第一步事先 service provider register 被調用，  
一但 all service provider 完成 register 後， boot 才被調用
{{< tabbed-codeblock AppServiceProvider.php >}}
<!-- tab PHP -->
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(TodoRepositoryInterface::class, TodoRepository::class);
        $this->app->bind(AssignerRepositoryInterface::class, AssignerRepository::class);
    }
<!-- endtab -->
{{< /tabbed-codeblock >}}   
> service provider 提供不同 library, validator, router 等，只要 activate serivce provider 就可以使用 Laravel 所有功能。
> 因此當 application instance 創建後，serivce provider 就被註冊，請求被啟動後，其 controllers 就可以 use 這些功能。
# Routing
文件中寫到 `App\Providers\RouteServiceProvider` 這個檔案紀錄 service providers，有哪些內容，讓我們看看程式...
{{< tabbed-codeblock RouteServiceProvider.php >}}
<!-- tab PHP -->
    public function boot()
    {
        $this->configureRateLimiting();

        $this->routes(function () {
            Route::prefix('api')
                ->middleware('api')
                ->namespace($this->namespace)
                ->group(base_path('routes/api.php'));

            Route::middleware('web')
                ->namespace($this->namespace)
                ->group(base_path('routes/web.php'));
        });
    }
<!-- endtab -->
{{< /tabbed-codeblock >}}  
我們發現其會先進入 `routes/api.php` 再去 `routes/web.php`，並載入這些 routes 所對應的 controllers，因此一切都串連起來了！
routes 會去 handle 要配發至哪個 controllers，再根據 controllers 互動 views & models，因此就連接起了 MVC 架構。
> 值得一提的是在跑進這些 routes 前會經過 middleware，middleware 提供一層過濾 HTTP requests，有種保護層的概念，可以在這裡做身份認證等。

# 總結與心得
因此 Laravel 的 LifeCycle 為 `public/index.php` -> `autoload.php` -> `HTTP kernnel / console kernel` -> `Service Container & Providers`
-> `Routing` -> `Middleware` -> `Controllers`，這些其實都可以由文件與查詢底層 Code 去了解更多，沒有去細細看文件，也不會去查找這些 folder 裝什麼XD
補充： `AppServiceProvider` 可以加入你增加的 application's bootstrapping & service container bindings。
# 心得
在某次面談中，被問到深層的意義才赫然發現，其實我不知道 Laravel 運作機制，就只是按照 SOP 流程寫作 Controllers & register routes，實際上我不知道中間發生什麼事情，只是會動，然後顯示出我想要的畫面，但其餘的我其實一無所知。
> John Snow: You know nothing. 
King Snow 死於微小沒觀察到的互動，也可以去說明，如果掌握好細節，在這個遊戲中，更能翻轉自如！


# 參考連結
* [laravel 8](https://laravel.com/docs/8.x)
* [Laravel如何實現依賴性注入？](https://medium.com/mr-efacani-teatime/laravel%E5%A6%82%E4%BD%95%E5%AF%A6%E7%8F%BE%E4%BE%9D%E8%B3%B4%E6%80%A7%E6%B3%A8%E5%85%A5-d760c8e5abde)

{{< disable-ads >}}