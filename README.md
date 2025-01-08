<!-- Banner -->
<p align="center">
  <a href="https://www.uit.edu.vn/" title="Trường Đại học Công nghệ Thông tin" style="border: none;">
    <img src="https://i.imgur.com/WmMnSRt.png" alt="Trường Đại học Công nghệ Thông tin | University of Information Technology">
  </a>
</p>

<!-- Header -->
<h1 align="center"><b>HỆ CƠ SỞ TRI THỨC</b></h>

<!-- Main -->
## Thành viên nhóm:
| STT    | MSSV          | Họ và Tên             |
| ------ |:-------------:| ----------------------:|
| 1      | 22520424     | Thái Đình Nhật Hiển        
| 2      | 22520929      | Đặng Thanh Ngân        |
| 3      | 22521272      | Nguyễn Hồng Phát       |
| 4      | 22521373      | Phạm Thanh Thảo        |

## GIỚI THIỆU MÔN HỌC
* **Tên môn học:** HỆ CƠ SỞ TRI THỨC
* **Mã môn học:** CS217
* **Mã lớp:** CS217.P11
* **Giảng viên**: ThS. Nguyễn Thị Ngọc Diễm

# ĐỒ ÁN CUỐI KỲ: Hệ thống Giải Toán Hình Học Lớp 6

Dự án này xây dựng một hệ thống giải toán hình học lớp 6, tập trung vào các khái niệm điểm, đoạn thẳng, tia, đường thẳng và ứng dụng kiến thức về cạnh và diện tích tam giác.

## Mục tiêu

*   Cung cấp một công cụ hỗ trợ học tập và giảng dạy môn Toán hình học lớp 6.
*   Áp dụng công nghệ để tự động hóa quá trình giải toán.
*   Xây dựng một hệ thống có khả năng mở rộng và cải tiến.

## Tính năng chính

*   Giải các bài toán hình học lớp 6.
*   Sử dụng kiến thức về cạnh và diện tích tam giác để suy luận.
*   Giao diện trực quan, dễ sử dụng.
*   Hiển thị kết quả rõ ràng, từng bước (nếu có thể).

## Công nghệ

*   **Bộ suy diễn (Backend):** Maple (sử dụng để thực hiện các thuật toán suy diễn, tính toán và xử lý các bài toán hình học).
*   **Giao diện người dùng (Frontend):** HTML, CSS, JavaScript (xây dựng giao diện tương tác và kết nối với backend thông qua API).
*   **Bộ suy diễn:** Maple.

## Cấu trúc dự án

(Liệt kê các thư mục và file quan trọng trong dự án, ví dụ:)

*   `backend/`: Chứa code Maple và các file cấu trúc tri thức.
*   `Client/`: Chứa code HTML, CSS, JavaScript và React.

## Hướng dẫn cài đặt và chạy

Mở song song Backend và Client:
* cd backend/
* cd Client/
* npm install -f 
* npm run dev (Client)
* node --watch server.js (backend)

## Hướng dẫn sử dụng

1.  Truy cập giao diện hệ thống.
2.  Nhập đề bài toán hình học vào ô nhập liệu.
3.  Nhấn nút "Giải".
4.  Hệ thống sẽ xử lý và hiển thị kết quả.

## Giao diện
1. Giao diện ban đầu
*   [Giao diện ban đầu](pic/bandau1.png)
*   [Giao diện ban đầu](pic/bandau2.png)
2. Giao diện nhập điểm, đoạn, đường, tia và kết quả
*   [Nhập bài toán](pic/Nhap.png)
*   [Kết quả bài toán](pic/KetQua.png)
3. Giao diện giải bái toán trong tam giác
*   [Nhập bài toán](pic/input.png)
*   [Kết quả bài toán](pic/output.png)

