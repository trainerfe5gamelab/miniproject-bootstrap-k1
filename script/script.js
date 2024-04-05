//GANTI MENU MAKANAN DAN MINUMAN
function switchMenu(menu) {
  if (menu === "foods") {
    document.querySelector(".menu-foods").style.display = "block";
    document.querySelector(".menu-drinks").style.display = "none";
  } else if (menu === "drinks") {
    document.querySelector(".menu-foods").style.display = "none";
    document.querySelector(".menu-drinks").style.display = "block";
  }

  // Scroll to top
  document.querySelector('#menu').scrollIntoView({
    behavior: 'smooth'
  });
}
//popupAboutUS

var modal = document.getElementById("popup");

var btn = document.querySelector(".read-more");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
function redirectToWhatsApp() {
  // Mendapatkan nilai dari inputan form
  var name = document.getElementById('name').value;
  var alamat = document.getElementById('alamat').value;
  var phone = document.getElementById('Phone').value;
  var message = document.getElementById('message').value;

  // Format pesan yang akan dikirim melalui WhatsApp
  var whatsappMessage = "Halo, saya ingin memesan:\n\n" +
                        "Nama: " + name + "\n" +
                        "Alamat: " + alamat + "\n" +
                        "No Hp: " + phone + "\n" +
                        "Deskripsi(Pesanan): " + message;

  // Encode pesan untuk URL
  var encodedMessage = encodeURIComponent(whatsappMessage);

  // Redirect ke aplikasi WhatsApp dengan pesan yang telah ditentukan dalam tab baru
  window.open("https://wa.me/6282145674937?text=" + encodedMessage, '_blank');
}

//PESANAN
