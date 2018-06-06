# EasyWeb' Mobile Apps

## Mục đích
- phát triển mobile apps nhanh chóng
  - prototype, demo đơn giản: bản html của F7
  - ứng dựng thực tế, phức tạp: F7-Vue

- Sử dụng với EasyBuilder
  - là prototype | demo nhanh chóng
  - triển khai dễ dàng
- tích hợp api backend

## Tính năng hiện có
- Đăng Nhập
  - tích hợp với loopback api

- Lấy thông tin User
  - tự động load và binding dữ liệu
  - xem profiles.html , [commit](https://gitlab.com/vinaas/mobileapps/easyweb-f7/commit/c2c5f6a4836186577202e0677acc7337aae1e98a)

### Tích hợp google maps
- hiển thị bản đồ
  - tọa độ có sẵn

- vị trí hiện tại (current position)
  - hoạt động với `localhost` hoặc `https`
  - tham khảo [commit](https://gitlab.com/vinaas/mobileapps/easyweb-f7/commit/95650f202c7a8fc2c468ab0c5069874f091135d2)



## Framework 7

### Xử lý form dữ liệu

#### Form Storage
> tham khảo https://framework7.io/docs/form.html#form-storage

- binding dữ liệu vào form có sẵn
  - gọi api để lấy dữ liệu, sau đó `app.form.storeFormData(formId, data)`
  - xem commit [v1](https://gitlab.com/vinaas/mobileapps/easyweb-f7/commit/989e322311a488f620d5cfcf19f4b2996f9efd70), điều chỉnh [v2](https://gitlab.com/vinaas/mobileapps/easyweb-f7/commit/11aa629222ab154bb89f1f6ac8f0b9e3ef7c398b)



## Kết hợp với EasyBuilder

1. Tạo website mới bằng EasyBuilder
1. Add tất cả thư mục trong `www` vào `asset` của EasyBuilder
  - xem hình ![import](docs/import-to-assets.png)

1. tạo layout cho trang chủ
  - copy nội dung `index.html` vào layout trang chủ, index.html, của easybuilder

1. tiếp tục sử dụng với easybuilder
  - build, deploy hoặc sync

### demo
- http://mobileapps.showcase.easywebhub.me/

### Lưu ý:
### Tránh Đụng độ giữa framework7, `F7`, và EasyBuilder
> cả hai đều sử dụng `handlebar` để binding dữ liệu

- sử dụng cú pháp `\{{escaped}}` để tránh đụng độ với easybuilder
  - ví dụ: trong `layout` của Easybuider, dùng `\{{ quocbao }}  {{title}}`
  - `\{{quocbao}}` F7 sẽ sử dụng nó (easybuilder sẽ bỏ qua)
  - `{{title}}`: xử lý bởi easybuilder


## Sử dụng
### 2. Cài Đặt

- install
```
npm install
```

This will download latest version of Framework7 (to `/www/framework7/`) and required icon fonts (to `/www/fonts/`)

### 3. Chạy ứng dụng

```
npm run serve
```

App will be opened in browser at `http://localhost:8080/`

## Use with cordova

Just put the contents of `www` folder in your cordova's project root `www` folder

## Tham khảo

- sử dụng Framework7 Tabs Starter App Template
- Live Preview https://framework7io.github.io/framework7-template-tabs/
