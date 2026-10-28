const greetingButton = document.getElementById('greetBTN');
const greetingMessage = document.getElementById('greetingMessage');

greetingButton.addEventListener('click', function () {
    greetingMessage.textContent = 'สวัสดีครับ ขอบคุณที่เข้ามาชมผลงานของผม!';
});