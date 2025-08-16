# Task Management System

## Mô tả

Ứng dụng quản lý công việc được xây dựng với React và JSON Server.

## Tính năng

- Xác thực người dùng: Đăng ký, Đăng nhập, và Đăng xuất an toàn.
- Duy trì phiên đăng nhập: Người dùng không cần đăng nhập lại mỗi khi truy cập lại ứng dụng.
- Quản lý công việc (CRUD): Dễ dàng Tạo mới, Xem, Cập nhật, và Xóa các công việc.
- Giao diện Sáng/Tối (Dark/Light Mode): Chuyển đổi giao diện mượt mà và tự động lưu lại lựa chọn của người dùng cho các lần truy cập sau.
- Lọc và Tìm kiếm:
- Lọc công việc theo trạng thái (Cần làm, Đang làm, Hoàn thành).
- Lọc công việc theo độ ưu tiên (Cao, Trung bình, Thấp).
- Tìm kiếm công việc theo tiêu đề.
- Giao diện Responsive: Tự động thích ứng để hoạt động tốt trên các kích thước màn hình khác nhau, từ máy tính để bàn đến điện thoại di động.
- Phản hồi người dùng: Hiển thị các trạng thái tải (loading spinners) và thông báo lỗi rõ ràng, thân thiện.
- Kiểm tra dữ liệu (Form Validation): Kiểm tra tính hợp lệ của dữ liệu người dùng nhập vào ở các form đăng ký, đăng nhập và tạo/sửa công việc.
- Hiệu ứng chuyển đổi: Panel Đăng nhập/Đăng ký có hiệu ứng trượt qua lại mượt mà, nâng cao trải nghiệm người dùng.

## Công nghệ sử dụng

Frontend:
- React 18: Tận dụng các hook hiện đại như useState, useEffect, useContext, useRef để quản lý state và vòng đời component.
- React Router DOM: Quản lý việc định tuyến (routing) giữa các trang trong ứng dụng.
- CSS3 thuần: Sử dụng Flexbox, Grid để xây dựng layout và Biến CSS (CSS Variables) để triển khai hệ thống theme Sáng/Tối một cách hiệu quả.
Backend (Giả lập):
- JSON Server: Tạo một REST API giả lập nhanh chóng để lưu trữ và quản lý dữ liệu người dùng và công việc.

## Cài đặt và chạy

### Prerequisites

- Node.js >= 14
- npm

### Installation

\`\`\`bash  
git clone [https://github.com/icefox2804/Task-Management]  
cd task-management  
npm install  
\`\`\`

### Chạy ứng dụng

\`\`\`bash

# Terminal 1: Chạy JSON Server

npm run server

# Terminal 2: Chạy React app

npm start  
\`\`\`

## Demo

- **Live demo**: [URL deployed app]
- **API endpoint**: [URL JSON Server]

## Screenshots
Giao diện Đăng nhập (Theme Sáng & Tối)
<img width="954" height="936" alt="image" src="https://github.com/user-attachments/assets/ec1b8c4a-acf5-4eb6-a5c0-8bd4edc40afe" />

<img width="950" height="932" alt="Screenshot 2025-08-16 054007" src="https://github.com/user-attachments/assets/cafeef3f-a3f6-4bec-b96d-83867f81819a" />


[Thêm screenshots của app]

Bảng điều khiển quản lý công việc

<img width="958" height="1679" alt="image" src="https://github.com/user-attachments/assets/8e54a5ac-7680-4317-b113-e8f532f49d6d" />

<img width="958" height="2161" alt="image" src="https://github.com/user-attachments/assets/5786cd95-83ab-4fb5-ba65-6d4c19dc3c5a" />

<img width="958" height="1124" alt="image" src="https://github.com/user-attachments/assets/f3b00525-24f4-46ad-b9e0-3995353ab3e7" />

<img width="958" height="1690" alt="image" src="https://github.com/user-attachments/assets/841490d2-7ff8-4fc1-8444-794f8e697615" />





## Tác giả

Lê Tấn Bửu C2410L
