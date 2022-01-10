---
title: "Hugo 從 0 到 1"
date: 2021-09-06T01:02:01+08:00
description: "hugo 建置，hugo themes, Tranquilpeak, blog-setting" 
slug: "hugo-from-beginning-to-done"
draft: false
categories:
- blog-setting
tags:
- hugo
keywords:
- hugo
- deploy
clearReading: true
thumbnailImagePosition: left
thumbnailImage: images/beginning.jpeg
coverImage: images/beginning.jpeg
coverCaption: "start beginning photo by Dayne Topkin"
coverMeta: "out"
coverSize: "partial"
comments: true
---
讓我們重"心"開始，華麗的開始，接踵而至的是不停撞破牆的設定，如果一次設定不好，怎麼沒試過設定第二次呢？
<!--more-->

# 本文大綱
- [本文大綱](#本文大綱)
- [建置 hugo](#建置-hugo)
  - [讓你本機端有 hugo，執行它](#讓你本機端有-hugo執行它)
  - [現在人在你專案底下，接著挑選一個 themes](#現在人在你專案底下接著挑選一個-themes)
  - [複製一份到 themes 底下](#複製一份到-themes-底下)
  - [建置與作者一樣的環境 — 無腦複製時間](#建置與作者一樣的環境--無腦複製時間)
- [客製化 hugo blog](#客製化-hugo-blog)
  - [開始之前，先了解專案架構](#開始之前先了解專案架構)
  - [小細節設定 & hugo-tranquilpeak-theme setting](#小細節設定--hugo-tranquilpeak-theme-setting)
- [學習重點](#學習重點)
- [參考連結](#參考連結)

# 建置 hugo

## 讓你本機端有 hugo，執行它
> 出發總有個目標，一切從命令提示字元開始

{{< tabbed-codeblock command-line >}}
    <!-- tab cmd -->
    brew install hugo
    hugo new site your-site-name
    cd your-site-name
    <!-- endtab -->
{{< /tabbed-codeblock >}}

## 現在人在你專案底下，接著挑選一個 themes
| [ ![hugo-themes](/images/hugo-themes.png) ](/images/hugo-themes.png) | 
|:--:|
| *超級多的主題，眼花撩亂* |

  * Themes: [Link](https://themes.gohugo.io/)
  * 不錯看的主題推坑
    * [LoveIt](https://themes.gohugo.io/themes/loveit/)
    * [Tranquilpeak](https://tranquilpeak.kakawait.com/)

  
## 複製一份到 themes 底下

{{< tabbed-codeblock command-line >}}
    <!-- tab cmd -->
    cd themes
    git clone https://github.com/kakawait/hugo-tranquilpeak-theme.git
    <!-- endtab -->
{{< /tabbed-codeblock >}}

## 建置與作者一樣的環境 — 無腦複製時間 
> 學習最好的方式是複製
我們將 i18n(多國語言)、layouts(html)、static(css, js, images), config.toml(設定檔) 複製過去，然後 command line 下 `hugo server`
  
| [ ![hugo-run](/images/hugo-run-first.png) ](/images/hugo-run-first.png) | 
|:--:|
| *複製完成，跑在本機應該跟作者一樣* |

# 客製化 hugo blog
## 開始之前，先了解專案架構
  我用樹狀圖畫出如下
  * config.toml 為設定檔，包含 sidebar, blog setting, author setting, etc.
  * archetypes 為所文章 template，可藉由不同 template 生成不同屬性文章的預設值
  * content 為文章放置處
  * layouts 為 template 的 html，通常大部分使用者會乖乖複製它XD
  * static 為 css, images, js 放置處，可以放入文章使用圖片
  * themes 為放置套用的 template 
  
{{< tabbed-codeblock command-line >}}
  <!-- tab cmd -->
  ├── archetypes
  │   ├── default.md
  │   └── posts.md
  ├── content
  │   ├── dns.md
  │   └── medium-to-hugo.md
  ├── layouts
  │   ├── partials
  │   └── _default
  ├── static
  │   ├── css
  │   └── images
  │   └── js
  ├── themes
  │   └── hugo-tranquilpeak-theme
  └── config.toml
  <!-- endtab -->
{{< /tabbed-codeblock >}}

## 小細節設定 & hugo-tranquilpeak-theme setting
> 說而言，不如起而行 actions speak louder than words
* 所有設定都由 `config.toml` 去設定，其他 template 有些用 `yaml` or `json` 
* tranquilpeak 有整合 `disqus` 留言系統，於 `disqusShortname` 打上即可
* `sidebarBehavior` 看你喜歡的側邊欄設定 1 最大
* tranquilpeak 也可以自定義 css, js

| [ ![mysite-first-run-hugo](/images/mysite-first-run.png) ](/images/mysite-first-run.png) | 
|:--:|
| *客製化hugo* |

# 學習重點
{{< alert info >}}
只要記住 archetypes 是生成 article 的 template  
config.toml 是 blog-setting 用的  
就足以應付 80% 情況，剩下的就是個人化的部分XD
{{< /alert >}}

> 複製模仿是站在巨人肩膀上的第一步

# 參考連結

* [IT 邦介紹 hugo-blog](https://ithelp.ithome.com.tw/users/20106430/ironman/3613)
* [hugo doc](https://gohugo.io/documentation/)

{{< disable-ads >}}