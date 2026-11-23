// ==========================================
// 1. ตัวแปรอ้างอิงองค์ประกอบเดิม (Original Elements)
// ==========================================
const greetingButton = document.getElementById('greetBTN');
const greetingMessage = document.getElementById('greetingMessage');
const visitorWelcome = document.getElementById('visitorWelcome');
const estimateButton = document.getElementById('estimateButton');
const estimatorResult = document.getElementById('estimatorResult');
const pagePrice = 500;

// ==========================================
// 2. ระบบ Dark Mode (ธีมมืด / ธีมสว่าง)
// ==========================================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const themeText = document.getElementById('themeText');

/**
 * ปรับใช้ธีม (Dark / Light) พร้อมอัปเดตสถานะปุ่มและบันทึกลง LocalStorage
 * @param {string} theme - 'dark' หรือ 'light'
 */
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
        localStorage.setItem('theme', theme);
    } catch (e) {
        // จัดการกรณีเว็บบราวเซอร์ปิดการใช้งาน LocalStorage
    }

    if (theme === 'dark') {
        if (themeToggle) themeToggle.setAttribute('aria-pressed', 'true');
        if (themeIcon) themeIcon.textContent = '☀️';
        if (themeText) themeText.textContent = 'โหมดสว่าง';
    } else {
        if (themeToggle) themeToggle.setAttribute('aria-pressed', 'false');
        if (themeIcon) themeIcon.textContent = '🌙';
        if (themeText) themeText.textContent = 'โหมดมืด';
    }
}

// ตรวจสอบธีมเริ่มต้น: LocalStorage -> System Preference -> ค่าเริ่มต้น Light
let storedTheme = null;
try {
    storedTheme = localStorage.getItem('theme');
} catch (e) {}

const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');
applyTheme(initialTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', function () {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(targetTheme);
    });
}

// ==========================================
// 3. ระบบ Project Filter (กรองผลงานตามหมวดหมู่)
// ==========================================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const noProjectsMsg = document.getElementById('noProjectsMsg');

filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        const selectedFilter = this.getAttribute('data-filter');

        // สลับสถานะปุ่ม Active
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        // กรองการแสดงผลของการ์ดผลงาน
        let visibleCount = 0;
        projectCards.forEach(function (card) {
            const cardCategory = card.getAttribute('data-category');
            if (selectedFilter === 'all' || cardCategory === selectedFilter) {
                card.classList.remove('is-hidden');
                visibleCount++;
            } else {
                card.classList.add('is-hidden');
            }
        });

        // แสดงข้อความเมื่อไม่พบผลงานในหมวดหมู่ที่เลือก
        if (noProjectsMsg) {
            noProjectsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    });
});

// ==========================================
// 4. การทำงานเดิมของ Portfolio (Preserved Functionality)
// ==========================================
if (greetingButton) {
    greetingButton.addEventListener('click', function () {
        greetingMessage.textContent = 'ยินดีที่ได้รู้จักครับ ขอบคุณที่เข้ามาเยี่ยมชมเว็บไซต์ของผม!';
    });
}

const visitorName = prompt('กรุณากรอกชื่อของคุณ');

if (visitorName && visitorName.trim() && visitorWelcome) {
    visitorWelcome.textContent = `ยินดีต้อนรับคุณ ${visitorName.trim()} เข้าสู่เว็บไซต์ Portfolio ของฉัน`;
}

if (estimateButton) {
    estimateButton.addEventListener('click', function () {
        const pageCountInput = prompt('ต้องการพัฒนาเว็บไซต์กี่หน้า?');

        if (pageCountInput === null) {
            return;
        }

        const pageCount = Number(pageCountInput);

        if (!Number.isInteger(pageCount) || pageCount < 1) {
            estimatorResult.textContent = 'กรุณาระบุจำนวนหน้าเป็นจำนวนเต็มตั้งแต่ 1 หน้าขึ้นไป';
            return;
        }

        const totalCost = pageCount * pagePrice;
        estimatorResult.textContent = `จำนวนหน้าที่ต้องการ: ${pageCount} หน้า | ค่าบริการรวม: ${totalCost.toLocaleString('th-TH')} บาท`;
    });
}
