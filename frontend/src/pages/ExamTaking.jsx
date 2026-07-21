import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ExamTaking.css'

const totalQuestions = 30
const answered = new Set([1,2,3,4,5,6,7,8,9,10,11,12,13])
const markedForReview = new Set([4])

const options = [
  { key: 'A', text: '-2 < m < 2' },
  { key: 'B', text: 'm < -2 hoặc m > 2' },
  { key: 'C', text: '-4 < m < 0' },
  { key: 'D', text: 'm = 0' },
]

export default function ExamTaking() {
  const [current, setCurrent] = useState(13)
  const [selected, setSelected] = useState('B')
  const navigate = useNavigate()

  const progressPct = Math.round((answered.size / totalQuestions) * 100)

  return (
    <div className="exam-take-shell">
      <header className="take-topbar">
        <div className="take-brand">
          <CapIcon />
          <span>Kiểm tra Cuối kỳ: Giải tích 1</span>
        </div>
        <div className="take-topbar-right">
          <div className="timer-pill">
            <ClockIcon />
            <span>45:22</span>
          </div>
          <button className="btn-submit" onClick={() => navigate('/ket-qua')}>Nộp bài</button>
        </div>
      </header>

      <div className="take-progress-row">
        <span>Tiến độ làm bài: {answered.size}/{totalQuestions} câu</span>
        <span className="pct">{progressPct}% Hoàn thành</span>
      </div>
      <div className="take-progress-track">
        <div className="take-progress-fill" style={{ width: progressPct + '%' }} />
      </div>

      <div className="take-body">
        <section className="question-card">
          <div className="question-head">
            <div>
              <span className="q-eyebrow">CÂU HỎI {current}</span>
              <div className="q-tags">
                <span className="tag">ĐẠI SỐ</span>
                <span className="tag">MỨC ĐỘ: KHÁ</span>
              </div>
            </div>
            <button className="review-btn">
              <BookmarkIcon /> Xem sau
            </button>
          </div>

          <p className="q-text">
            Cho hàm số $f(x) = x^3 - 3x^2 + 2$. Tìm tất cả các giá trị của tham số $m$ để đường thẳng $y = m$ cắt đồ thị hàm số tại 3 điểm phân biệt?
          </p>

          <div className="q-figure" />

          <div className="q-options">
            {options.map((o) => (
              <label
                key={o.key}
                className={'q-option' + (selected === o.key ? ' checked' : '')}
              >
                <input
                  type="radio"
                  name="answer"
                  checked={selected === o.key}
                  onChange={() => setSelected(o.key)}
                />
                <span className="radio-dot" />
                <span>{o.key}. {o.text}</span>
              </label>
            ))}
          </div>

          <div className="q-nav-row">
            <button className="btn-outline" onClick={() => setCurrent((c) => Math.max(1, c - 1))}>
              ← Câu trước
            </button>
            <button className="btn-primary" onClick={() => setCurrent((c) => Math.min(totalQuestions, c + 1))}>
              Câu tiếp theo →
            </button>
          </div>
        </section>

        <aside className="question-panel">
          <h3>Danh sách câu hỏi</h3>
          <div className="panel-stats">
            <div className="panel-stat">
              <span className="ps-value">{answered.size}</span>
              <span className="ps-label">ĐÃ CHỌN</span>
            </div>
            <div className="panel-stat">
              <span className="ps-value">{totalQuestions - answered.size}</span>
              <span className="ps-label">TRỐNG</span>
            </div>
            <div className="panel-stat marked">
              <BookmarkIcon />
              <span className="ps-label">XEM SAU</span>
            </div>
          </div>

          <div className="q-grid">
            {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                className={
                  'q-num' +
                  (n === current ? ' current' : '') +
                  (markedForReview.has(n) ? ' marked' : answered.has(n) ? ' answered' : '')
                }
                onClick={() => setCurrent(n)}
              >
                {n}
              </button>
            ))}
          </div>

          <div className="panel-user">
            <img src="https://i.pravatar.cc/64?img=15" alt="" />
            <div>
              <div className="pu-name">Nguyễn Văn An <span className="pu-dot" /></div>
              <div className="pu-id">MSSV: 202410029</div>
            </div>
          </div>

          <div className="panel-note">
            ℹ️ Hệ thống tự động lưu đáp án sau mỗi lần chọn. Nếu gặp sự cố mạng, hãy giữ nguyên màn hình và liên hệ giám thị.
          </div>
        </aside>
      </div>

      <button className="support-fab">🎧 Hỗ trợ</button>
    </div>
  )
}

function CapIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 3 1 8l11 5 9-4.09V17h2V8L12 3Z" fill="currentColor" /></svg>
}
function ClockIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" /><path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
}
function BookmarkIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M6 4h12v16l-6-3.5L6 20V4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
}
