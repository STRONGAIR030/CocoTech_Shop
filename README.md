# 關於 COCOTECH

這是一個簡單的一頁式電商平台，包含前台與後台。

- **前台**：顧客可以購買商品、註冊帳號、查看訂單。
- **後台**：管理者可以查看與管理所有訂單，並編輯商品資訊。
- **設計理念**：平台販售由巧克力製作的 3C 產品。

## DEMO 影片

[影片連結](https://youtu.be/1kjlotYHR20)

## 功能列表

### 前台

- 登入
- 註冊
- 將商品加入購物車
- 編輯購物車的物品(刪除)
- 完成訂單
- 登入後可查看該顧客自己的訂單

### 後台

- **LGOIN頁面**（前往 `/admin` 後，登入管理員帳號後可進入後台）
- **HOME頁面**（可查看總訂單數、總顧客數、總賣出商品數、最新５筆訂單）
- **ORDER頁面**（可查看所有訂單並且可改變訂單狀態）
- **CUSTOMER頁面**（可依顧客查看訂單）
- **PRODUCT頁面** （可管裡商城商品的價格、名稱等資訊）

## 安裝與啟動

1. Clone 此專案到本地

```
git clone https://github.com/STRONGAIR030/CocoTech_Shop.git
```

2. 安裝依賴

```
npm install
```

3. 起動開發伺服器

```
npm run dev
```

4. 使用JSON Server

```
npm run stJsonServer
```

## 使用技術

- 前端：React.js
- 後端及資料庫：[json-server](https://www.npmjs.com/package/json-server)
