import React from "react";

const SuratTemplate = ({ settingsData, data }) => {
  return (
    <div className="pdf-container">
      <style>
        {`
                  .pdf-container {
                      font-family: Arial, sans-serif;
                      padding: 20px;
                      border: 1px solid #000;
                      width: 100%;
                      max-width: 600px;
                      margin: auto;
                    }
                    .header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 10px;
                        border-bottom: 2px solid #000; 
                    }
                        
                    .header-details  {
                        text-align: center;
                        margin-bottom: 20px;
                    }

                    .logo-image {
                        width: 80px;
                        height: auto;
                    }

                    .header-details h2 {
                        margin: 0;
                        font-size: 18px;
                        font-weight: bold;
                        
                    }

                    .header-details p {
                        margin: 2px 0;
                        font-size: 12px;
                        
                    }

                    .h1 {
                    font-size: 20px;
                    margin: 0;
                    }

                    .h2 {
                    font-size: 18px;
                    margin: 0;
                    }

                  .surat-info {
                      display: flex;
                      justify-content: space-between; /* Membuat ruang antara kolom kiri dan kanan */
                      align-items: flex-start; /* Menyelaraskan elemen-elemen di atas */
                    }

                    .left-column {
                      flex: 1.5; /* Kolom kiri lebih lebar (dua kali lebih lebar dari kanan) */
                      text-align: left; /* Menyelaraskan teks di kolom kiri ke kiri */
                    }

                    .right-column {
                      flex: 1; /* Kolom kanan lebih kecil */
                      text-align: right; /* Menyelaraskan teks di kolom kanan ke kanan */
                      margin-left: 20px; /* Memberikan sedikit jarak antara kolom kiri dan kanan */
                    }

                    .nomor,
                    .tanggal {
                    font-size: 14px;
                    margin: 0;
                    }

                    .content {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 20px;
                    }

                   

                    .p {
                      font-size: 14px;
                      margin: 0;
                    }

                    .isi-surat {
                    margin-top: 20px;
                    font-size: 14px;
                    }
                
                    .surat {
                      padding: 20px;
                      max-width: 800px;
                      margin: 0 auto;
                    
                    }
                    
                    .header {
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      margin-bottom: 20px;
                    }
                    
                    .header-right {
                      text-align: right;
                    }
                    
                    .logo img {
                      max-width: 120px;
                    }
                    
                    .h1 {
                      font-size: 20px;
                      margin: 0;
                    }
                    
                    .h2 {
                      font-size: 18px;
                      margin: 0;
                    }
                    
                    .surat-info {
                      display: flex;
                      justify-content: space-between;
                      margin-bottom: 20px;
                    }
                    
                    .nomor,
                    .tanggal {
                      font-size: 14px;
                      margin: 0;
                    }
                
               .content {
                  display: flex;
                  flex-direction: column; /* Susun elemen secara vertikal */
                  align-items: flex-start; /* Menyelaraskan semua elemen ke kiri */
                }

                .left-column,
                .right-column {
                  width: 100%; /* Membuat kedua kolom lebar penuh */
                  margin-bottom: 10px; /* Menambahkan sedikit jarak antar kolom */
                }
                .left-column {
                  display: flex;
                  flex-direction: column;
                }

                .p {
                  font-size: 14px;
                  display: flex;
                  align-items: baseline; /* Memastikan teks label dan value sejajar secara vertikal */
                  margin-bottom: 10px; /* Jarak antar baris */
                }

                .label {
                    min-width: 120px; /* Menetapkan lebar minimum untuk label agar seragam */
                    display: inline-block;
                    margin-left: 3px; /* Jarak antara label dan nilai */
                    font-size: 14px; /* Mengatur ukuran font menjadi 12px */
                    font-weight: normal; /* Mengatur font menjadi biasa (bukan tebal atau ringan) */
                  }
       
                  .footer-bar {
                  display: flex;
                  justify-content: space-between;
                  align-items: flex-start;
                  margin-top: 40px;
                  }

                  .tembusan {
                  font-size: 14px;
                  font-weight: bold;
                  width: 50%; /* Menyesuaikan lebar dengan layout */
                  }

                  .tembusan {
                  font-size: 14px;
                  width: 50%; /* Menyesuaikan lebar dengan layout */
                  }

                .kepala {
                  font-size: 14px;
                  font-weight: bold;
                  text-align: right;
                  width: 50%;
                  margin-bottom: 20px;
                  margin-left: auto;
                  margin-right: 0;
                }

                .ttd-name {
                  font-size: 14px;
                  margin-top: 70px;
                  text-align: right;
                  width: 100%;
                  text-transform: uppercase; /* Mengubah teks menjadi huruf kapital */
                  text-decoration: underline; /* Menambahkan garis bawah pada teks */
                }

                .kepada {
                  font-size:14px;
                }
                
                .tempat-penerima {
                  font-size: 14px;
                  max-width: 50%; /* Membatasi lebar maksimal hanya 50% dari lebar kontainer */
                  word-wrap: break-word; /* Membuat teks terpotong dan pindah baris jika melebihi lebar */
                  white-space: normal; /* Membolehkan teks untuk melanjutkan ke baris baru jika perlu */
                  margin: 0;
                }

                .ttd {
                text-align: right;
                margin-top: 50px;
                border-top:2px
                }

                .pemerintah-kota-yogyakarta {
                  text-align: center;
                  font-size: 18px;
                }

                .alamat-lembaga {
                   text-align: center;
                   font-size: 20px;
                }
                no-identitas-kepala-kantor {
                  font-size:12px;
                }

`}
      </style>

      <header className="header">
        <div className="logo">
          <img
            src={settingsData.kop_surat}
            alt="Kop Surat"
            className="logo-image"
          />{" "}
        </div>
        <div className="header-details">
          <p className="pemerintah-kota-yogyakarta">Pemerintah Kota Yogyakarta</p>
          <h2>{settingsData.nama_lembaga}</h2>
          <p className="alamat-lembaga">{settingsData.alamat}</p>
          <p>{settingsData.telp}</p>
          <p>
            Laman :{" "}
            <a
              href={settingsData.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              {settingsData.website}
            </a>{" "}
           Email :{" "}
            <a href={`mailto:${settingsData.email}`}>{settingsData.email}</a>
          </p>
        </div>
      </header>
      <div className="surat-info">
        <div className="left-column">
        <p className="p">
        <strong className="label">Nomor</strong>: {data.no_surat}
        </p>
        <p className="p">
          <strong className="label">Sifat</strong>: {data.sifat}
        </p>
        <p className="p">
          <strong className="label">Lampiran</strong>: {data.lampiran}
        </p>
        <p className="p">
          <strong className="label">Perihal</strong>: {data.perihal}
        </p>
        </div>
        <div className="right-column">
          <p className="tanggal">
            {data.tgl_surat
              ? `Yogyakarta, ${new Date(data.tgl_surat).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}`
              : "Yogyakarta, -"}
          </p>
        </div>
      </div>

      <div className="penerima">
       <p className="kepada">Kepada Yth.</p>
          {data.ditujukan.split(";").map((nama, index) => (
            <p key={index} className="p">
              {nama.trim()}
            </p>
          ))}
       <p className="tempat-penerima">{data.ditujukan_alamat}</p>
      </div>
      <div className="isi-surat">
        <p className="isi-surat"
          dangerouslySetInnerHTML={{
            __html: data.isi_surat || "",
          }}
        />

      </div>
      <div className="footer-bar">
        <div className="tembusan">
          Tembusan:
          <p className="isi-tembusan">{data.tembusan}</p>
        </div>
        <div class="kepala">
          {settingsData.jabatan}
          <div class="ttd-name">{settingsData.kepala_kantor}</div>
          <div class="no-identitas-kepala-kantor">{settingsData.jenis_identitas}.{settingsData.no_identitas}</div>
        </div>
      </div>
    </div>
  );
};

export default SuratTemplate;
