---
title: "Lidemy 學習 Redux 第一章 — 基本概念"
date: 2021-09-22T01:00:01+08:00
description: "lidemy learning, redux, react-redux, self-learning"
slug: "redux-lidemy-learning"
draft: false
categories:
- coding
tags:
- redux
keywords:
- redux
- lidemy
- react
clearReading: true
thumbnailImagePosition: left
thumbnailImage: images/user-interface.jpeg
coverImage: images/user-interface.jpeg
coverCaption: "資料與畫面 photo by UX Indonesia"
coverMeta: "out"
coverSize: "partial"
comments: true
---
框架的出現是解救蒼生XD 站在前人的肩膀上做事情，就可以避免悲劇發生...
<!--more-->
# 本文大綱
- [本文大綱](#本文大綱)
- [Redux 基本概念](#redux-基本概念)
  - [Redux 三本柱](#redux-三本柱)
- [Redux 範例](#redux-範例)
- [學習重點](#學習重點)
- [參考連結](#參考連結)

# Redux 基本概念
紀錄 Lidemy 學習 Redux 的課程，有興趣可以看 [Huli 的 Lidemy](https://lidemy.com/courses/fe303-react-redux)，這邊純粹整理與紀錄學習心得。
我使用過的前端 Jquery，從畫面上拿取資料，沒有 state 概念，在 script 寫邏輯，然後再把邏輯丟回畫面 render DOM。  
React 則只需要管理 state，state 改變，畫面就會重新 render，畫面也會改變。  

過去我們學習 React 會利用 `useState` 去設定 state 初始值，並利用 `setState` 去改變狀態，因此沒有使用 redux 我們還是可以活得很好。
Redux 要解決的問題是狀態管理，當專案越來越大、情境越來越複雜時，使用 React state 較難管理，也越來越多可以觸發的路徑，當出現問題時，會遇到一個大問題是，哪個 view 的 component 去改變 state 的，此時就需要 redux 統一狀態管理，減少 debug 與開發時間。
{{< alert info >}}
Redux 是一個統一狀態管理工具，react 與 redux 是分開的概念，沒有使用 redux，還是可以使用 react 去改變 state。
{{< /alert >}}
## Redux 三本柱
| [ ![redux-concept](/images/redux-concept.png) ](/images/redux-concept.png)| 
|:--:|
| *redux-concept resouce from https://redux.js.org/* |

如果以這張圖來說，按下 Deposit 存錢，Dispatch 一個 Action 帶上 type & payload，將 Action 進入 Store，藉由 Reducer 去改變 state，改變完 State，更新畫面。
{{< alert info >}}
整體流程： UI trigger -> event handler dispatch action -> Store -> Reducer(將原 state 結合新 action payload) → response 新的 state → 寫回 UI
{{< /alert >}}
* Store：state 的倉庫，將所有 state 放在 store 內做管理，以 js 的 object 方式儲存
* Reducer： Reducer 接收 Action，根據 action 的類型，將原來的 state 結合傳進來的 Action 對 state 進行改變
* Dispatch： 發動 action，會定義其 action.type & payload(改變的資料)

# Redux 範例
1. 首先創建一個 Store object
2. 定義你想要的 Reducer function
3. Dispatch action 皆經由 Reducer 改變 action 
{{< tabbed-codeblock app.js >}}
<!-- tab javascript -->
const { createStore } = require("redux");
const initialState = {
  value: 0,
};

function counterReducer(state = initialState, action) {
  console.log("receive action: ", action);
  switch (action.type) {
    case "plus":
      return {
        value: state.value + 1,
      };
    case "minus":
      return {
        value: state.value - 1,
      };
    default:
      return state;
  }
}

const storeObject = createStore(counterReducer);
console.log("store:", storeObject);
console.log("first state:", storeObject.getState());

storeObject.dispatch({
  type: "plus",
});
storeObject.dispatch({
  type: "plus",
});
console.log("second state plus :", storeObject.getState());
storeObject.dispatch({
  type: "minus",
});
console.log("third state plus :", storeObject.getState());
<!-- endtab -->
{{< /tabbed-codeblock >}}

| [ ![redux-example](/images/redux-example1.png) ](/images/redux-example1.png)| 
|:--:|
| *redux-example* |

* 接下來，可利用 subscribe 監聽 state 是否改變，當 state 改變後可以做一些事... 很像 hooks 的 useEffect 
* 加上 payload 概念，可以做到發 action 帶上 type & payload，去改變 state

{{< tabbed-codeblock app.js >}}
<!-- tab javascript -->
const { createStore } = require("redux");
const initialState = {
  value: 0,
};

function counterReducer(state = initialState, action) {
  console.log("receive action: ", action);
  switch (action.type) {
    case "plus":
      return {
        value: state.value + action.payload.value,
      };
    case "minus":
      return {
        value: state.value - action.payload.value,
      };
    default:
      return state;
  }
}

const storeObject = createStore(counterReducer);
storeObject.subscribe(() => {
  console.log("changed! now state is :", storeObject.getState());
});
console.log("first state:", storeObject.getState());

storeObject.dispatch({
  type: "plus",
  payload: {
    value: 3,
  },
});
storeObject.dispatch({
  type: "plus",
  payload: {
    value: 2,
  },
});
storeObject.dispatch({
  type: "minus",
  payload: {
    value: 1,
  },
});
<!-- endtab -->
{{< /tabbed-codeblock >}}

| [ ![redux-example](/images/redux-example2.png) ](/images/redux-example2.png)| 
|:--:|
| *redux-example2 payload & subscribe* |

# 學習重點
redux 是一個幫助前端框架集中管理狀態的方法，有了 redux，react 將可以讓改變資料變成單向的資料流，將任何觸發管道，變成只有一個管道 dispatch 去觸發，是一個集中管理 state 的概念。
> 之前在公司碰到 redux 都覺得很複雜，dispatch, action, api 都覺得幹嘛繞一個圈去拿資料，到學習 redux 才真正了解，redux 要解決的問題是統一管理資料流

# 參考連結
* [Lidemy Redux](https://lidemy.com/courses/fe303-react-redux)
* [Redux 基礎](https://zhuanlan.zhihu.com/p/101151851)
* [Redux Doc](https://redux.js.org/)

{{< disable-ads >}}