require("dotenv").config();

function htmlEmailRegister(data) {
  let html = `
  <body style="font-family: Arial, Helvetica, sans-serif;">
    <div style="width: 360px; height: max-content; background-color: gainsboro; padding: 0 0 10px; float: left; margin: 0 5px;">
      <img src="cid:gb" style="width: 50%;"><img src="cid:gk" style="width: 50%;">
      <div>
        <img src="cid:amplop" style="width: 50%; padding: 100px 25%;">
        <div style="text-align: center;">
          <h4 style="width: 70%; margin: 0 15%; color: black;">Selamat akun anda berhasil di daftarkan di 'nama aplikasi'</h4>
          <p style="width: 90%; margin: 0 5%; color: black;">Klik link berikut untuk mengatur password anda.</p>
          <p style="width: 90%; margin: 0 5%; color: black;">${process.env.SITE_URL}/setting-password/${data.hashedId}</p>
        </div>
      </div>
    </div>
  </body>`;

  return html;
}

module.exports = htmlEmailRegister;
