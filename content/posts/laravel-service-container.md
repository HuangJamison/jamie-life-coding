---
title: "[Laravel doc 2] Laravel Service Container Document 導讀"
date: 2022-02-13T00:15:01+08:00
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
繼續看 Laravel document ...
<!--more-->
# 本文大綱
- [本文大綱](#本文大綱)
- [Container 基本概念 依賴注入](#container-基本概念-依賴注入)
- [When to use service container？](#when-to-use-service-container)
- [Binding](#binding)
    - [Binding interfaces to implementations](#binding-interfaces-to-implementations)
- [Resolving - make method](#resolving---make-method)
- [Automatic injection](#automatic-injection)
- [總結與心得](#總結與心得)
- [參考連結](#參考連結)

# Container 基本概念 依賴注入
Service container 是一個管理類別依賴與依賴注入的工具，Dependency injection 藉由 constructor 或是 setter methods 去注入。
官網提供一個案例， `UserController` 需要取得 users 相關資料，利用 `UserRepository` 去將 users data 取回來。
{{< alert info >}}
依賴注入又被稱為 DI (Dependency Injection) 指的是從外部傳入依賴實例或是資料，因此當你 class B 注入 class A，你改動 class B 改動，A也要跟著改，因此耦合性相對提高，解決辦法為將 B 在外部實例化再傳入 A，
因此在 A 時，B 是當作參數傳入 A。
{{< /alert >}}
{{< tabbed-codeblock php >}}
<!-- tab php -->
<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Repositories\UserRepository;
use App\Models\User;

class UserController extends Controller
{
    /**
     * The user repository implementation.
     *
     * @var UserRepository
     */
    protected $users;

    /**
     * Create a new controller instance.
     *
     * @param  UserRepository  $users
     * @return void
     */
    public function __construct(UserRepository $users)
    {
        $this->users = $users;
    }

    /**
     * Show the profile for the given user.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        $user = $this->users->find($id);

        return view('user.profile', ['user' => $user]);
    }
}
<!-- endtab -->
{{< /tabbed-codeblock >}}
上述就是一個利用 `UserRepository` 作為 DI 注入 `UserController` 的例子，順帶一提 DI 也可以幫助後續測試方便用 mock 或是 dummy 去替代。

# When to use service container？
如果你 class 使用 interface，你必須定義 container `how to resolve that interface`，你在使用 Laravel package 時，你協同開發因此你需要 `bind your package's services into the containers`
另外，Laravel Dependency 具有自動依賴，因此如果你的 Dependency 是巢狀依賴，就會自動注入，文章 [Day 05. 一不小心就會扯遠的依賴注入 (DI)](https://ithelp.ithome.com.tw/articles/10213983)。

# Binding
`Service container bindings` 會註冊於 `Service Providers`，在 `Service Providers` 你可以存取 container 藉由 `$this->app`
{{< tabbed-codeblock php >}}
<!-- tab php -->
use App\Services\Transistor;
use App\Services\PodcastParser;

$this->app->bind(Transistor::class, function ($app) {
    return new Transistor($app->make(PodcastParser::class));
});
<!-- endtab -->
{{< /tabbed-codeblock >}}
這邊提到的 `service provider` 是提供我們註冊日後需要注入依賴的地方，在 provider register 告訴 Laravel 提供具體類別的地方，container bind 完成註冊。

### Binding interfaces to implementations
在 controllers 可以 inject interface in constructor，因此可以注入 interface 去管理 params，文檔中提到 controllers, event listeners, middleware and other classes in Laravel 都是使用 containers 概念去實作。

{{< tabbed-codeblock php >}}
<!-- tab php -->
use App\Contracts\EventPusher;
/**
 * Create a new class instance.
 *
 * @param  \App\Contracts\EventPusher  $pusher
 * @return void
 */
public function __construct(EventPusher $pusher)
{
    $this->pusher = $pusher;
}
<!-- endtab -->
{{< /tabbed-codeblock >}}

# Resolving - make method
container 內應用 make method 將所需參數傳進 inject 的 interface
{{< tabbed-codeblock php >}}
<!-- tab php -->
use App\Services\Transistor;
 
$transistor = $this->app->makeWith(Transistor::class, ['id' => 1]);
<!-- endtab -->
{{< /tabbed-codeblock >}}

# Automatic injection
在 controllers, event listeners, middleware 內也可以利用 inject 去管理進入的參數。
> 我想 Laravel 與 Codeigniter 不同在於，更強調注入管理輸入參數的重要性吧！過去使用 CI 很少 inject service or repository

{{< tabbed-codeblock php >}}
<!-- tab php -->
<?php
 
namespace App\Http\Controllers;
 
use App\Repositories\UserRepository;
 
class UserController extends Controller
{
    /**
     * The user repository instance.
     *
     * @var \App\Repositories\UserRepository
     */
    protected $users;
 
    /**
     * Create a new controller instance.
     *
     * @param  \App\Repositories\UserRepository  $users
     * @return void
     */
    public function __construct(UserRepository $users)
    {
        $this->users = $users;
    }
}
<!-- endtab -->
{{< /tabbed-codeblock >}}

# 總結與心得
我想 Laravel 相當強調依賴注入的概念，不管在 controllers, middleware 等地方都可以利用 dependency injector 去管理輸入的參數，或是呼叫時實例化參數。
Service provider 是提供註冊日後需要注入依賴的地方，provider register 是提供具體類別的地方。
最近也有應用 DI 的概念在呼叫 controllers 時注入 Form Validation 去管理表單驗證，減少程式耦合性。

# 參考連結
* [laravel 8](https://laravel.com/docs/8.x)
* [學習筆記 依賴注入(DI)](https://ithelp.ithome.com.tw/articles/10211847)
* [Day 05. 一不小心就會扯遠的依賴注入 (DI)](https://ithelp.ithome.com.tw/articles/10213983)

{{< disable-ads >}}