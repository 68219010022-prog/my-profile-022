const greetingButton = document.getElementById('greetBTN');
const greetingMessage = document.getElementById('greetingMessage');

greetingButton.addEventListener('click', function () {
    greetingMessage.textContent = 'ยินดีที่ได้รู้จักครับ ขอบคุณที่เข้ามาเยี่ยมชมเว็บไซต์ของผม!';
});