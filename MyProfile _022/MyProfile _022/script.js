const greetingButton = document.getElementById('greetBTN');
const greetingMessage = document.getElementById('greetingMessage');
const visitorWelcome = document.getElementById('visitorWelcome');
const estimateButton = document.getElementById('estimateButton');
const estimatorResult = document.getElementById('estimatorResult');
const pagePrice = 500;

greetingButton.addEventListener('click', function () {
    greetingMessage.textContent = 'ยินดีที่ได้รู้จักครับ ขอบคุณที่เข้ามาเยี่ยมชมเว็บไซต์ของผม!';
});

const visitorName = prompt('กรุณากรอกชื่อของคุณ');

if (visitorName && visitorName.trim()) {
    visitorWelcome.textContent = `ยินดีต้อนรับคุณ ${visitorName.trim()} เข้าสู่เว็บไซต์ Portfolio ของฉัน`;
}

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