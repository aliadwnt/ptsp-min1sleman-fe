import React from "react";

const PDFTemplate = ({ logo, data }) => {
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
                        margin-bottom: 20px;
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

                    .title-section {
                        text-align: center;
                        margin-bottom: 20px;
                    }

                    .disposisi-title {
                        font-size: 22px;
                        font-weight: bold;
                    }

                    .disposisi-info {
                        font-size: 14px;
                        font-style: italic;
                    }

                    .disposisi-details {
                        display: grid;
                        grid-template-columns: 1fr 1fr; /* Membuat 2 kolom */
                        grid-gap: 0px; /* Tidak ada gap antar elemen */
                        border: 1px solid #000;
                        padding: 0px;
                    }

                    .disposisi-item {
                        display: flex;
                        justify-content: space-between;
                        padding: 10px;
                        border-right: 1px solid #000; /* Garis pemisah antar kolom */
                    }

                    .disposisi-item:last-child {
                        border-right: none; /* Menghapus border kanan untuk kolom terakhir */
                    }

                    .disposisi-item p {
                        margin: 0;
                    }

                    /* Menambahkan garis bawah pada no_surat dan tgl_surat */
                    .disposisi-item.with-bottom-border {
                        border-bottom: 1px solid #000; /* Garis bawah */
                    }

                    /* Input Kolom Nama */
                    .input-nama {
                        grid-column: span 2; /* Membuat kolom nama mengambil dua kolom */
                        padding: 10px;
                        border-top: 1px solid #000;
                    }

                    .input-tgl {
                        grid-column: span 2; /* Membuat kolom nama mengambil dua kolom */
                        padding: 10px;
                        border-top: 1px solid #000;
                        border-bottom: 1px solid #000;
                        display: flex;
                        justify-content: space-between; /* Membuat elemen sejajar */
                        align-items: center; /* Memastikan konten sejajar vertikal */
                    }

                    .input-tgl p {
                        margin: 0;
                    }

                    /* Footer section */
                    .footer {
                        text-align: center;
                        margin-top: 20px;
                        font-size: 12px;
                        font-style: italic;
                    }

                    .footer p {
                        margin: 5px 0;
                    }
                `}
      </style>
      <header className="header">
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-image" />{" "}
          {/* Ganti dengan logo */}
        </div>
        <div className="header-details">
          <h2>Pemerintah Kota Yogyakarta</h2>
          <h2>MADRASAH IBTIDAIYAH NEGERI 1 SLEMAN</h2>
          <address>
            Jl. Magelang Km. 4, Sinduadi, Mlati, Sleman, Daerah Istimewa
            Yogyakarta, Indonesia
          </address>
          <p>Telepon (0274) 557464</p>
          <p>Laman : https://min1sleman.sch.id/Email : minsatu.yk@gmail.com</p>
        </div>
      </header>

      <div className="title-section">
        <h1 className="disposisi-title">LEMBAR DISPOSISI</h1>
        <p className="disposisi-info">
          Diberikan memeriksa sebagai surat yang ditujukan dalam bentuk ini
        </p>
      </div>

      <div className="disposisi-details">
        <div className="disposisi-item with-bottom-border">
          <p>
            <strong>No Surat:</strong>
          </p>
          <p className="value">{data.no_surat}</p>
        </div>
        <div className="disposisi-item with-bottom-border">
          <p>
            <strong>Status:</strong>
          </p>
          <p className="value">{data.status}</p>
        </div>

        <div className="disposisi-item with-bottom-border">
          <p>
            <strong>Tanggal Surat:</strong>
          </p>
          <p className="value">
            {data.tgl_surat
              ? new Date(data.tgl_surat).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })
              : "-"}
          </p>
        </div>

        <div className="disposisi-item with-bottom-border">
          <p>
            <strong>Sifat:</strong>
          </p>
          <p className="value">{data.sifat}</p>
        </div>
        <div className="input-tgl with-bottom-border">
          <p>
            <strong>Lampiran</strong>
          </p>
          <p className="value">{data.lampiran}</p>
        </div>
        <div className="disposisi-item with-bottom-border">
          <p>
            <strong>Diterima Tanggal:</strong>
          </p>
          <p className="value">
            {data.diterima
              ? new Date(data.diterima).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })
              : "-"}
          </p>
        </div>
        <div className="disposisi-item with-bottom-border">
          <p>
            <strong>No Agenda</strong>
          </p>
          <p className="value">{data.no_agenda}</p>
        </div>
        <div className="disposisi-item with-bottom-border">
          <p>
            <strong>Dari Instansi:</strong>
          </p>
          <p className="value">{data.instansi}</p>
        </div>
        <div className="disposisi-item with-bottom-border">
          <p>
            <strong>Klasifikasi</strong>
          </p>
          <p className="value">{data.klasifikasi}</p>
        </div>

        {/* Input Nama Kolom - Satu Kolom */}
        <div className="input-nama">
          <label>
            <strong>Perihal</strong>
            <p className="value">{data.perihal}</p>
          </label>
        </div>
        {/* Input Nama Kolom - Satu Kolom */}
        <div className="input-tgl">
          <p>
            <strong>Disposisi Kepada:</strong>
          </p>
          <p className="value">{data.disposisi}</p>
        </div>
        {/* <div className="input-tgl">
          <p className="value">{data.created_at}</p>
          <p></p>
          <strong>Pada tanggal:</strong>
        </div> */}
        <div className="input-nama">
          <label>
            <strong>Disposisi aksi:</strong>
            <p className="value">{data.tindakan}</p>
          </label>
        </div>
        <div className="input-tgl">
          <p>
            <strong>Catatan:</strong>
          </p>
          <p className="value">{data.catatan}</p>
        </div>
      </div>

      <footer className="footer">
        <p>Madrasah Ibtidaiyah Negeri 1 Sleman</p>
        <p>
          Jl. Magelang Km. 4, Sinduadi, Mlati, Sleman, Daerah Istimewa
          Yogyakarta, Indonesia
        </p>
        {/* <p>Disposisi Kepala Madrasah: Segera Tindak Lanjut</p> */}
      </footer>
    </div>
  );
};

export default PDFTemplate;
