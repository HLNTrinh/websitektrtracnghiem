# 📋 SPRINT SCRUM - HỆ THỐNG QUẢN LÝ BÀI KIỂM TRA TRẮC NGHIỆM

## 👥 Thành viên nhóm (3 người)
- **Người 1: Backend Lead** - Phụ trách API, Database, Logic
- **Người 2: Frontend Lead** - Phụ trách UI/UX, Components, Pages  
- **Người 3: QA/DevOps** - Phụ trách Testing, Deploy, Tài liệu

---

## 📅 SPRINT 1 (1-2 tuần): MVP - Chức năng cơ bản

### **Sprint Goal**
Hoàn thành hệ thống cơ bản: đăng ký/đăng nhập, giáo viên tạo đề thi, học sinh làm bài, xem điểm.

---

## 🎯 USER STORIES & TASKS

### **US1: Đăng ký / Đăng nhập (Ước tính: 8 điểm)**

#### Backend (Người 1) - 5 điểm
- [ ] Tạo model User (name, email, password, role, status)
- [ ] API POST /api/auth/register - đăng ký tài khoản
- [ ] API POST /api/auth/login - đăng nhập, trả JWT token
- [ ] API POST /api/auth/logout - đăng xuất
- [ ] Middleware xác thực JWT

#### Frontend (Người 2) - 3 điểm
- [ ] Component LoginPage (form đăng nhập)
- [ ] Component RegisterPage (form đăng ký)
- [ ] Lưu token vào localStorage
- [ ] Navigation theo role (Admin/Teacher/Student)

---

### **US2: Quản lý câu hỏi (Teacher) (Ước tính: 13 điểm)**

#### Backend (Người 1) - 8 điểm
- [ ] Tạo model Question (content, options, correctAnswer, category, difficulty, createdBy)
- [ ] API POST /api/questions - tạo câu hỏi
- [ ] API GET /api/questions - danh sách câu hỏi của giáo viên
- [ ] API PUT /api/questions/:id - chỉnh sửa
- [ ] API DELETE /api/questions/:id - xóa
- [ ] API GET /api/questions/categories - danh sách chủ đề
- [ ] Validate: câu hỏi phải có 4 đáp án, 1 đáp án đúng

#### Frontend (Người 2) - 5 điểm
- [ ] Page QuestionBank (danh sách, search, filter)
- [ ] Component QuestionForm (tạo/sửa câu hỏi)
- [ ] Form nhập 4 đáp án
- [ ] Chọn đáp án đúng
- [ ] Toast notification (thành công/lỗi)

---

### **US3: Tạo đề thi (Teacher) (Ước tính: 13 điểm)**

#### Backend (Người 1) - 8 điểm
- [ ] Tạo model Quiz (title, description, questions[], duration, maxAttempts, startDate, endDate, showAnswerAfter, createdBy)
- [ ] API POST /api/quizzes - tạo đề thi
- [ ] API GET /api/quizzes - danh sách đề thi của giáo viên
- [ ] API PUT /api/quizzes/:id - chỉnh sửa
- [ ] API DELETE /api/quizzes/:id - xóa
- [ ] Validate: đề thi phải có tối thiểu 1 câu hỏi
- [ ] Hỗ trợ chọn câu hỏi thủ công hoặc random

#### Frontend (Người 2) - 5 điểm
- [ ] Page CreateQuiz (form tạo đề thi)
- [ ] Component SelectQuestionsForm (chọn câu hỏi thủ công)
- [ ] Tùy chọn random câu hỏi từ ngân hàng
- [ ] Cấu hình thời gian, số lần làm, ngày mở/đóng
- [ ] Preview đề thi trước khi lưu

---

### **US4: Giao đề thi (Teacher) (Ước tính: 8 điểm)**

#### Backend (Người 1) - 5 điểm
- [ ] Tạo model QuizAssignment (quizId, teacherId, studentIds[], assignedDate, deadline)
- [ ] API POST /api/quiz-assignments - giao đề thi
- [ ] API GET /api/quiz-assignments/:quizId - xem ai được giao đề thi
- [ ] API PUT /api/quiz-assignments/:id - cập nhật danh sách học sinh

#### Frontend (Người 2) - 3 điểm
- [ ] Page AssignQuiz (chọn đề thi, chọn lớp/học sinh)
- [ ] Danh sách checkbox học sinh
- [ ] Xác nhận giao bài

---

### **US5: Làm bài thi (Student) (Ước tính: 21 điểm)**

#### Backend (Người 1) - 10 điểm
- [ ] Tạo model QuizAttempt (studentId, quizId, answers[], score, status, startTime, endTime, timeTaken)
- [ ] API POST /api/quiz-attempts/start/:quizId - bắt đầu làm bài
- [ ] API POST /api/quiz-attempts/:attemptId/submit - nộp bài
- [ ] API GET /api/quiz-attempts/:attemptId - lấy dữ liệu attempt
- [ ] Auto-submit nếu hết thời gian (optional: dùng background job)
- [ ] Tính điểm tự động

#### Frontend (Người 2) - 11 điểm
- [ ] Page QuizList (danh sách đề thi được giao)
- [ ] Page QuizAttempt (giao diện làm bài)
  - [ ] Hiển thị câu hỏi + 4 đáp án
  - [ ] Đếm ngược thời gian
  - [ ] Nút Previous/Next câu
  - [ ] Nút Submit bài
  - [ ] Lưu tạm mỗi 10 giây (auto-save)
  - [ ] Hiển thị tiến độ: câu 5/20
  - [ ] Warning nếu còn 1 phút

---

### **US6: Xem kết quả (Student + Teacher) (Ước tính: 13 điểm)**

#### Backend (Người 1) - 5 điểm
- [ ] API GET /api/quiz-attempts/:attemptId/result - chi tiết kết quả
- [ ] API GET /api/quiz-attempts/student/:studentId - lịch sử làm bài của học sinh
- [ ] API GET /api/quiz-results/quiz/:quizId - danh sách kết quả theo đề thi

#### Frontend (Người 2) - 8 điểm
- [ ] Page QuizResult (xem điểm sau khi submit)
  - [ ] Hiển thị tổng điểm, số câu đúng/sai
  - [ ] Chi tiết từng câu (đúng/sai, đáp án của em/đáp án đúng)
  - [ ] Nút "Xem lại" / "Quay lại danh sách"
- [ ] Page HistoryPage (lịch sử làm bài)
  - [ ] Bảng danh sách: tên đề, điểm, ngày làm, số lần còn lại

---

### **US7: Dashboard Giáo viên (Ước tính: 8 điểm)**

#### Backend (Người 1) - 3 điểm
- [ ] API GET /api/stats/quiz/:quizId - thống kê một đề thi
  - Tổng học sinh, số người làm, điểm trung bình, tỷ lệ câu đúng từng câu

#### Frontend (Người 2) - 5 điểm
- [ ] Page TeacherDashboard
  - [ ] Danh sách đề thi với số lượng học sinh
  - [ ] Click vào đề thi xem chi tiết kết quả
  - [ ] Bảng danh sách học sinh, điểm, lần làm, ngày làm
  - [ ] Nút Xuất Excel

---

## 🔧 SPRINT SETUP

### **Người 1: Backend Lead** - 49 điểm
1. Tạo các Models MongoDB
2. Tạo API Routes & Controllers
3. Middleware xác thực
4. Validate input
5. Tính toán điểm

### **Người 2: Frontend Lead** - 35 điểm
1. Pages & Components
2. Form handling
3. API integration
4. Timer countdown
5. Auto-save

### **Người 3: QA/DevOps** - 10 điểm
1. Setup Docker Compose
2. Unit tests (nếu thời gian)
3. Integration tests (nếu thời gian)
4. Tài liệu API (Postman/Swagger)
5. Hướng dẫn chạy ứng dụng

---

## 📊 SPRNT TIMELINE

| Ngày | Người 1 | Người 2 | Người 3 |
|------|---------|---------|---------|
| T2 | US1 Backend | US1 Frontend | Setup |
| T3 | US2 Backend | US2 Frontend | Testing |
| T4 | US3+US4 Backend | US3 Frontend | Docs |
| T5 | US5 Backend | US4+US5 Frontend | Testing |
| T6 | US6+US7 Backend | US6+US7 Frontend | Finalize |
| T7 | Bugfix | Bugfix | Deploy |

---

## 🚀 ĐỊNH NGHĨA DONE

- ✅ Code được viết & review
- ✅ Unit tests pass (>=80% coverage)
- ✅ Không có lỗi console/warning
- ✅ Tested trên Chrome, Firefox
- ✅ Tài liệu được cập nhật
- ✅ Merged vào main branch

---

## 📝 GHI CHÚ

- Sử dụng **GitHub Issues** để track tasks
- **Daily standup** 9:30 sáng (15 phút)
- **Sprint review** cuối sprint (1 giờ)
- Commit message format: `[US1] Tạo API đăng nhập`

---

## SPRINT 2+ (Nếu có thời gian)

- Quản lý lớp học (Admin)
- Quản lý tài khoản (Admin)
- Báo cáo chi tiết (Teacher)
- Notification system
- Improve UI/UX
