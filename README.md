# 關於 COCOTECH  
這是一個簡單的一頁式電商平台，包含前台與後台。  

- **前台**：顧客可以購買商品、註冊帳號、查看訂單。  
- **後台**：管理者可以查看與管理所有訂單，並編輯商品資訊。  
- **設計理念**：平台販售由巧克力製作的 3C 產品。

## DEMO 影片  
[請插入影片連結]

## 功能列表  

### 前台  
- 登入  
- 註冊  
- 將商品加入購物車  
- 編輯購物車內的商品（刪除）  
- 完成訂單  
- 登入後可查看該顧客的訂單  

### 後台  
- **LOGIN 頁面**（前往 `/admin` 後，登入管理員帳號可進入後台）  
- **HOME 頁面**（可查看總訂單數、總顧客數、總銷售商品數、最新 5 筆訂單）  
- **ORDER 頁面**（可查看所有訂單，並變更訂單狀態）  
- **CUSTOMER 頁面**（可依顧客查詢訂單）  
- **PRODUCT 頁面**（可管理商城商品的價格、名稱等資訊）  

##  安裝與啟動

  1. Clone 此專案到本地  
```
git clone https://github.com/STRONGAIR030/CocoTech_Shop.git
```

   2. List item  
```
npm install
```

3. 啟動開發伺服器  
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
