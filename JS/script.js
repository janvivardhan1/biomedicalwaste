
// translator dropdown

document.querySelectorAll('.dropbtn').forEach(button => {
  button.addEventListener('click', function () {
    const dropdown = this.parentElement;
    dropdown.classList.toggle('show');

    // Close other dropdowns
    document.querySelectorAll('.dropdown').forEach(other => {
      if (other !== dropdown) {
        other.classList.remove('show');
      }
    });
  });
});

// Close dropdown on language click
document.querySelectorAll('.dropdown-content a').forEach(link => {
    link.addEventListener('click', function () {
        this.closest('.dropdown').classList.remove('show');
    });
});

// Close dropdowns on click outside
window.addEventListener('click', function (e) {
  if (!e.target.closest('.dropdown')) {
    document.querySelectorAll('.dropdown').forEach(dropdown => dropdown.classList.remove('show'));
  }
});


///////////////////////////////////////////////////////////
// Make mobile navigation work

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

// Generate random captcha
function generateCaptcha() {
  let captcha = Math.floor(10000 + Math.random() * 90000); // 5 digit random number
  document.getElementById("captcha").innerText = captcha;
  document.getElementById("captcha").dataset.code = captcha; // store in dataset
}

// Check login
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;
  let captchaInput = document.getElementById("captchaInput").value;
  let captchaCode = document.getElementById("captcha").dataset.code;

  if (captchaInput !== captchaCode) {
    alert("❌ Incorrect Captcha");
    generateCaptcha();
    return;
  }

  // Here you can call backend API for login check
  alert("✅ Login successful (demo)");
});

// load captcha on page load
window.onload = generateCaptcha;


//label generator
function generateLabel() {
document.getElementById('prevFacility').innerText = document.getElementById('fclt-name').value;
document.getElementById('prevWaste').innerText = document.getElementById('wst-ctg').value;
document.getElementById('prevQuantity').innerText = document.getElementById('wst-qty').value;


let qrText = `Facility: ${document.getElementById('fclt-name').value}\nWaste: ${document.getElementById('wst-ctg').value}\nQuantity: ${document.getElementById('wst-ctg').value} kg`;


document.getElementById('qrcode').innerHTML = "";
new QRCode(document.getElementById('qrcode'), qrText);
}

function downloadQR() {
  // Find QR code inside the div
  let qrImg = document.querySelector("#qrcode img"); 
  // } else 
    if (qrImg) {
    let link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = qrImg.src;
    link.click();
  } else {
    alert("QR code not found!");
  }
}

