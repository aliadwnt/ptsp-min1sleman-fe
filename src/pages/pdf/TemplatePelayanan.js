import React from "react";
const PdfTemplate = ({ data }) => {
  return (
    <div className="a-4-1">
      <style>{`
    a,
    button,
    input,
    select,
    h1,
    h2,
    h3,
    h4,
    h5,
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        border: none;
        text-decoration: none;
        background: none;

        -webkit-font-smoothing: antialiased;
    }

    menu,
    ol,
    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }

    .a-4-1,
    .a-4-1 * {
        box-sizing: border-box;
    }

    .a-4-1 {
        background: #ffffff;
        height: 718.4px;
        position: relative;
        overflow: hidden;
    }

    .form-1 {
        display: flex;
        flex-direction: column;
        gap: 12.8px;
        align-items: flex-end;
        justify-content: flex-start;
        position: absolute;
        left: 14.4px;
        top: 19.2px;
    }

    .kop {
        display: flex;
        flex-direction: row;
        gap: 9.6px;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;
        flex-shrink: 0;
        width: 446.4px;
        position: relative;
    }

    .logo-geschool-bulat-3 {
        width: 50px;
        height: 50px;
        position: absolute;
    }

    .text {
        display: flex;
        flex-direction: column;
        gap: 0px;
        align-items: flex-start;
        justify-content: flex-start;
        flex-shrink: 0;
        position: relative;
    }

    .pemerintah-kota-yogyakarta-sma-cerdas-mandiri-yogyakarta {
        color: #000000;
        text-align: center;
        font-family: "-", sans-serif;
        font-size: 19.200000762939453px;
        font-weight: 400;
        position: relative;
    }

    .pemerintah-kota-yogyakarta-sma-cerdas-mandiri-yogyakarta-span {
        color: #000000;
        font-family: "Inter-Regular", sans-serif;
        font-size: 19.200000762939453px;
        font-weight: 400;
    }

    .pemerintah-kota-yogyakarta-sma-cerdas-mandiri-yogyakarta-span2 {
        color: #000000;
        font-family: "Inter-SemiBold", sans-serif;
        font-size: 19px;
        font-weight: 600;
        margin-left: 50px;
    }

    .address {
        color: #000000;
        text-align: center;
        font-family: "Inter-Light", sans-serif;
        font-size: 8.000000953674316px;
        font-weight: 300;
        position: relative;
         margin-left: 100px;
    }

    .line {
        border-bottom: 1px solid black;
        margin: 10px 0;
        /* Sesuaikan dengan kebutuhan */
    }

    .div-columns-2 {
        display: flex;
        flex-direction: column;
        gap: 8px;
        align-items: flex-start;
        justify-content: flex-start;
        flex-shrink: 0;
        width: 445px;
        margin-top: 20px;
        position: relative;
    }

    .div-w-full {
        padding: 0px 10px 0px 10px;
        display: flex;
        flex-direction: row;
        gap: 50px;
        align-items: center;
        justify-content: flex-start;
        align-self: stretch;
        flex-shrink: 0;
        position: relative;
    }

    .label {
        padding: 10;
        /* Menghapus padding yang tidak perlu */
        display: flex;
        flex-direction: row;
        gap: 10px;
        align-items: center;
        /* Sesuaikan alignment sesuai kebutuhan */
        justify-content: flex-start;
        flex-shrink: 0;
        padding-top: 10px;
    }

    .no-registrasi {
        color: var(--ppdbman1yogyakartaschidpendaftaran21edit-prestasi1512x851default-oxford-blue, #374151);
        text-align: left;
        font-family: "Inter-Bold", sans-serif;
        font-size: 9.16px;
        /* Pembulatan ukuran font */
        font-weight: 700;
        text-transform: uppercase;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
    }


   .input {
    background: #ffffff;
    border-bottom: 1px dotted black;
    border-width: 0.6px;
    display: flex;
    flex-direction: column; /* Mengubah menjadi kolom */
    gap: 10px;
    align-items: flex-start; /* Sesuaikan untuk menyelaraskan elemen */
    justify-content: center;
    flex: 1;
    position: relative;
    margin-top: 5px;
}

    .div-h-2-d-634-f-5440 {
        padding: 0;
        /* Menghapus padding yang tidak perlu */
        display: flex;
        flex-direction: row;
        gap: 0;
        align-items: flex-start;
        justify-content: flex-start;
        align-self: stretch;
        flex-shrink: 0;
        position: relative;
        overflow: hidden;
    }

    .value {
        color: var(--ppdbman1yogyakartaschidpendaftaran21edit-prestasi1512x851default-oxford-blue, #374151);
        text-align: left;
        font-family: "Inter-Regular", sans-serif;
        font-size: 11.2px;
        /* Pembulatan ukuran font */
        line-height: 15.26px;
        font-weight: 400;
        position: relative;
        max-width: 389.18px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        white-space: nowrap;
        /* Mencegah teks ter-enter */
        overflow: hidden;
        /* Menyembunyikan teks yang melampaui batas */
        text-overflow: ellipsis;
        /* Menambahkan elipsis pada teks yang terpotong */
    }


    .no-help-desk {
        color: var(--ppdbman1yogyakartaschidpendaftaran21edit-prestasi1512x851default-oxford-blue,
                #374151);
        text-align: left;
        font-family: "Inter-Bold", sans-serif;
        font-size: 9.157268524169922px;
        line-height: 12.21px;
        letter-spacing: 0.23px;
        font-weight: 700;
        text-transform: uppercase;
        position: relative;
        max-width: 415.13px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .isi-permohonan {
        color: var(--ppdbman1yogyakartaschidpendaftaran21edit-prestasi1512x851default-oxford-blue,
                #374151);
        text-align: left;
        font-family: "Inter-Bold", sans-serif;
        font-size: 9.157268524169922px;
        line-height: 12.21px;
        letter-spacing: 0.23px;
        font-weight: 700;
        text-transform: uppercase;
        position: ;
        max-width: 415.13px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .input2 {
        background: #ffffff;
        border-radius: 3.05px;
        border-style: solid;
        border-color: var(--ppdbman1yogyakartaschidpendaftaran21edit-prestasi1512x851default-athens-gray,
                #e5e7eb);
        border-width: 0.76px;
        padding: 9.92px 12.97px 9.92px 12.97px;
        display: flex;
        flex-direction: column;
        gap: 0px;
        align-items: flex-start;
        justify-content: flex-start;
        flex: 1;
        height: 54.4px;
        position: relative;
    }

    .div-h-2-d-634-f-54402 {
        padding: 0px 344.92px 0px 0px;
        display: flex;
        flex-direction: column;
        gap: 0px;
        align-items: flex-start;
        justify-content: center;
        align-self: stretch;
        flex-shrink: 0;
        position: relative;
        overflow: hidden;
    }

    .permohonan-surat-izin-penelitian-thesis {
        color: var(--ppdbman1yogyakartaschidpendaftaran21edit-prestasi1512x851default-oxford-blue,
                #374151);
        text-align: left;
        font-family: "Inter-Regular", sans-serif;
        font-size: 11.20000171661377px;
        line-height: 15.26px;
        font-weight: 400;
        position: relative;
        max-width: 389.18px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .no-surat-permohonan {
        color: var(--ppdbman1yogyakartaschidpendaftaran21edit-prestasi1512x851default-oxford-blue,
                #374151);
        text-align: left;
        font-family: "Inter-Bold", sans-serif;
        font-size: 9.157268524169922px;
        line-height: 12.21px;
        letter-spacing: 0.23px;
        font-weight: 700;
        text-transform: uppercase;
        position: relative;
        width: 73.6px;
        max-width: 415.13px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .tanggal-surat {
        color: var(--ppdbman1yogyakartaschidpendaftaran21edit-prestasi1512x851default-oxford-blue,
                #374151);
        text-align: left;
        font-family: "Inter-Bold", sans-serif;
        font-size: 9.157268524169922px;
        line-height: 12.21px;
        letter-spacing: 0.23px;
        font-weight: 700;
        text-transform: uppercase;
        position: relative;
        max-width: 415.13px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }


    .nama-pemohon {
        color: var(--ppdbman1yogyakartaschidpendaftaran21edit-prestasi1512x851default-oxford-blue,
                #374151);
        text-align: left;
        font-family: "Inter-Bold", sans-serif;
        font-size: 9.157268524169922px;
        line-height: 12.21px;
        letter-spacing: 0.23px;
        font-weight: 700;
        text-transform: uppercase;
        position: relative;
        max-width: 415.13px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }


    .alamat-pemohon {
        color: var(--ppdbman1yogyakartaschidpendaftaran21edit-prestasi1512x851default-oxford-blue,
                #374151);
        text-align: left;
        font-family: "Inter-Bold", sans-serif;
        font-size: 9.157268524169922px;
        line-height: 12.21px;
        letter-spacing: 0.23px;
        font-weight: 700;
        text-transform: uppercase;
        position: relative;
        max-width: 415.13px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .input3 {
        background: #ffffff;
        border-radius: 3.05px;
        border-style: solid;
        border-color: var(--ppdbman1yogyakartaschidpendaftaran21edit-prestasi1512x851default-athens-gray,
                #e5e7eb);
        border-width: 1px;
        padding: 9.92px 12.97px 9.92px 12.97px;
        display: flex;
        flex-direction: column;
        gap: 0px;
        align-items: flex-start;
        justify-content: flex-start;
        flex: 1;
        height: 57.6px;
        position: relative;
    }

    .kontak-pemohon {
        color: var(--ppdbman1yogyakartaschidpendaftaran21edit-prestasi1512x851default-oxford-blue,
                #374151);
        text-align: left;
        font-family: "Inter-Bold", sans-serif;
        font-size: 9.157268524169922px;
        line-height: 12.21px;
        letter-spacing: 0.23px;
        font-weight: 700;
        text-transform: uppercase;
        position: relative;
        width: 94.4px;
        max-width: 415.13px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }


    .waktu-masuk-surat {
        color: var(--ppdbman1yogyakartaschidpendaftaran21edit-prestasi1512x851default-oxford-blue,
                #374151);
        text-align: left;
        font-family: "Inter-Bold", sans-serif;
        font-size: 9.157268524169922px;
        line-height: 12.21px;
        letter-spacing: 0.23px;
        font-weight: 700;
        text-transform: uppercase;
        position: relative;
        width: 73.6px;
        max-width: 415.13px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }


    .estimasi-waktu-selesai {
        color: var(--ppdbman1yogyakartaschidpendaftaran21edit-prestasi1512x851default-oxford-blue,
                #374151);
        text-align: left;
        font-family: "Inter-Bold", sans-serif;
        font-size: 9.157268524169922px;
        line-height: 12.21px;
        letter-spacing: 0.23px;
        font-weight: 700;
        text-transform: uppercase;
        position: relative;
        width: 86.4px;
        max-width: 415.13px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }


    .status-pelayanan {
        color: var(--ppdbman1yogyakartaschidpendaftaran21edit-prestasi1512x851default-oxford-blue,
                #374151);
        text-align: left;
        font-family: "Inter-Bold", sans-serif;
        font-size: 9.157268524169922px;
        line-height: 12.21px;
        letter-spacing: 0.23px;
        font-weight: 700;
        text-transform: uppercase;
        position: relative;
        max-width: 415.13px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    paraf {
        display: flex;
        flex-direction: column;
        gap: 43.2px;
        align-items: flex-end;
        /* Move the container to the right */
        flex-shrink: 0;
        position: relative;
    }

    .petugas-penerima,
    .sistem {
        color: #000000;
        text-align: right;
        font-family: "Inter-Regular", sans-serif;
        font-size: 11.20000171661377px;
        line-height: 15.26px;
        font-weight: 400;
        position: relative;
        display: flex;
        margin-top: 17px;
        align-items: center;
        justify-content: flex-start;
    }

    .footer {
        display: flex;
        flex-direction: row;
        gap: 84.8px;
        align-items: flex-end;
        justify-content: flex-start;
        flex-wrap: wrap;
        flex-shrink: 0;
        width: 446.4px;
        position: relative;
    }

    .line-2 {
        flex-shrink: 0;
        width: 446.4px;
        height: 0px;
        position: relative;
        overflow: visible;
    }

    .untuk-pemohon-jangan-sampai-hilang {
        color: #000000;
        text-align: left;
        font-family: "Inter-Bold", sans-serif;
        font-size: 11.20000171661377px;
        line-height: 15.26px;
        font-weight: 700;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .yogyakarta-23-juni-2024 {
        color: #000000;
        text-align: left;
        font-family: "Inter-Regular", sans-serif;
        font-size: 11.20000171661377px;
        line-height: 15.26px;
        font-weight: 400;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .rectangle-6 {
        border-style: dashed;
        border-color: #000000;
        border-width: 0px 1px 0px 0px;
        width: 1px;
        height: 719px;
        position: absolute;
        left: calc(50% - 0px);
        top: 0.2px;
    }

    .form-2 {
        display: flex;
        flex-direction: column;
        gap: 12.8px;
        align-items: flex-end;
        justify-content: flex-start;
        position: absolute;
        left: 600px;
        top: 19.2px;
    }

    .pemerintah-kota-yogyakarta-sma-cerdas-mandiri-yogyakarta-span3 {
        color: #000000;
        font-family: "Inter-Regular", sans-serif;
        font-size: 19.200000762939453px;
        font-weight: 400;
    }

    .pemerintah-kota-yogyakarta-sma-cerdas-mandiri-yogyakarta-span4 {
        color: #000000;
        font-family: "Inter-SemiBold", sans-serif;
        font-size: 19.200000762939453px;
        font-weight: 600;
    }

    .footer2 {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        width: 100%;
        position: relative;
    }

    .tempel-di-berkas,
    .yogyakarta-23-juni-2024 {
        font-family: "Inter-Bold", sans-serif;
        font-size: 11.2px;
        line-height: 15.26px;
        font-weight: 700;
    }

    .tempel-di-berkas {
        color: #000000;
        text-align: left;
    }

    .yogyakarta-23-juni-2024 {
        color: #000000;
        text-align: right;
    }`}</style>
    <div className="form-1">
        <div className="kop">
          <img
            className="logo-geschool-bulat-3"
            src="https://seeklogo.com/images/M/man-1-yogyakarta-logo-25AA3AE0FF-seeklogo.com.png"
            alt="Logo"
          />
          <div className="text">
            <div className="pemerintah-kota-yogyakarta-sma-cerdas-mandiri-yogyakarta">
              <span>
                <span className="pemerintah-kota-yogyakarta-sma-cerdas-mandiri-yogyakarta-span">
                  Pemerintah Kota Yogyakarta
                  <br />
                </span>
                <span className="pemerintah-kota-yogyakarta-sma-cerdas-mandiri-yogyakarta-span2">
                  MADRASAH ALIYAH NEGERI (MAN) 1 YOGYAKARTA
                </span>
              </span>
            </div>
            <div className="address text-right">
              Jl. C Simanjuntak 60 (C Simanjuntak), Yogyakarta, DI Yogyakarta,
              Indonesia
              <br />
              Telepon +62858-6924-0876, Faksimile +62858-6924-0876
              <br />
              Laman https://man1yogyakarta.sch.id/, Email
              info@man1yogyakarta.sch.id
            </div>
          </div>
        </div>
        <div className="line"></div>
        <div className="div-columns-2">
          <div className="div-w-full">
            <div className="label">
              <div className="no-registrasi">No Registrasi</div>
            </div>
            <div className="input">
              <div className="div-h-2-d-634-f-5440">
                <div className="value">{data.no_reg}</div>
              </div>
            </div>
          </div>
          <div className="div-w-full">
            <div className="label">
              <div className="no-registrasi">Nama Pelayanan</div>
            </div>
            <div className="input">
              <div className="div-h-2-d-634-f-5440">
                <div className="value">{data.nama_pelayanan}</div>
              </div>
            </div>
          </div>
          <div className="div-w-full">
            <div className="label">
              <div className="isi-permohonan">Isi Permohonan</div>
            </div>
            <div className="input">
              <div className="div-h-2-d-634-f-5440">
                <div className="value">{data.perihal}</div>
              </div>
            </div>
          </div>
          <div className="div-w-full">
            <div className="label">
              <div className="no-surat-permohonan">No Surat Permohonan</div>
            </div>
            <div className="input">
              <div className="div-h-2-d-634-f-5440">
                <div className="value">{data.no_surat}</div>
              </div>
            </div>
          </div>
          <div className="div-w-full">
            <div className="label">
              <div className="tanggal-surat">Tanggal Surat</div>
            </div>
            <div className="input">
              <div className="div-h-2-d-634-f-5440">
                <div className="value">{data.tgl}</div>
              </div>
            </div>
          </div>
          <div className="div-w-full">
            <div className="label">
              <div className="nama-pemohon">Nama Pemohon</div>
            </div>
            <div className="input">
              <div className="div-h-2-d-634-f-5440">
                <div className="value">{data.nama_pemohon}</div>
              </div>
            </div>
          </div>
          <div className="div-w-full">
            <div className="label">
              <div className="alamat-pemohon">Alamat Pemohon</div>
            </div>
            <div className="input">
              <div className="div-h-2-d-634-f-5440">
                <div className="value">{data.alamat}</div>
              </div>
            </div>
          </div>
          <div className="div-w-full">
            <div className="label">
              <div className="kontak-pemohon">Kontak Pemohon</div>
            </div>
            <div className="input">
              <div className="div-h-2-d-634-f-5440">
                <div className="value">{data.no_hp}</div>
              </div>
            </div>
          </div>

          <div className="div-w-full">
            <div className="label">
              <div className="status-pelayanan">Status Pelayanan</div>
            </div>
            <div className="input">
              <div className="div-h-2-d-634-f-5440">
                <div className="value">{data.status}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="paraf">
          <div className="petugas-penerima">Petugas Penerima</div>
          <div className="sistem">Sistem</div>
        </div>
        <div className="line"></div>
        <div className="footer">
          <div className="untuk-pemohon-jangan-sampai-hilang">
            *Untuk Pemohon, Jangan Sampai Hilang!
          </div>
          <div className="yogyakarta-23-juni-2024">
            Yogyakarta, {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
      <div className="form-2">
        {/* Duplicate form logic for the second form if needed */}
        <div className="kop">
          <img
            className="logo-geschool-bulat-3"
            src="https://seeklogo.com/images/M/man-1-yogyakarta-logo-25AA3AE0FF-seeklogo.com.png"
            alt="Logo"
          />
          <div className="text">
            <div className="pemerintah-kota-yogyakarta-sma-cerdas-mandiri-yogyakarta">
              <span>
                <span className="pemerintah-kota-yogyakarta-sma-cerdas-mandiri-yogyakarta-span">
                  Pemerintah Kota Yogyakarta
                  <br />
                </span>
                <span className="pemerintah-kota-yogyakarta-sma-cerdas-mandiri-yogyakarta-span2">
                  MADRASAH ALIYAH NEGERI (MAN) 1 YOGYAKARTA
                </span>
              </span>
            </div>
            <div className="address text-center">
              Jl. C Simanjuntak 60 (C Simanjuntak), Yogyakarta, DI Yogyakarta,
              Indonesia
              <br />
              Telepon +62858-6924-0876, Faksimile +62858-6924-0876
              <br />
              Laman https://man1yogyakarta.sch.id/, Email
              info@man1yogyakarta.sch.id
            </div>
          </div>
        </div>
        <div className="line"></div>
        <div className="div-columns-2">
          <div className="div-w-full">
            <div className="label">
              <div className="no-registrasi">No Registrasi</div>
            </div>
            <div className="input">
              <div className="div-h-2-d-634-f-5440">
                <div className="value">{data.no_reg}</div>
              </div>
            </div>
          </div>
          <div className="div-w-full">
            <div className="label">
              <div className="no-registrasi">Nama Pelayanan</div>
            </div>
            <div className="input">
              <div className="div-h-2-d-634-f-5440">
                <div className="value">{data.nama_pelayanan}</div>
              </div>
            </div>
          </div>
          <div className="div-w-full">
            <div className="label">
              <div className="isi-permohonan">Isi Permohonan</div>
            </div>
            <div className="input">
              <div className="div-h-2-d-634-f-5440">
                <div className="value">{data.perihal}</div>
              </div>
            </div>
          </div>
          <div className="div-w-full">
            <div className="label">
              <div className="no-surat-permohonan">No Surat Permohonan</div>
            </div>
            <div className="input">
              <div className="div-h-2-d-634-f-5440">
                <div className="value">{data.no_surat}</div>
              </div>
            </div>
          </div>
          <div className="div-w-full">
            <div className="label">
              <div className="tanggal-surat">Tanggal Surat</div>
            </div>
            <div className="input">
              <div className="div-h-2-d-634-f-5440">
                <div className="value">{data.tgl}</div>
              </div>
            </div>
          </div>
          <div className="div-w-full">
            <div className="label">
              <div className="nama-pemohon">Nama Pemohon</div>
            </div>
            <div className="input">
              <div className="div-h-2-d-634-f-5440">
                <div className="value">{data.nama_pemohon}</div>
              </div>
            </div>
          </div>
          <div className="div-w-full">
            <div className="label">
              <div className="alamat-pemohon">Alamat Pemohon</div>
            </div>
            <div className="input">
              <div className="div-h-2-d-634-f-5440">
                <div className="value">{data.alamat}</div>
              </div>
            </div>
          </div>
          <div className="div-w-full">
            <div className="label">
              <div className="kontak-pemohon">Kontak Pemohon</div>
            </div>
            <div className="input">
              <div className="div-h-2-d-634-f-5440">
                <div className="value">{data.no_hp}</div>
              </div>
            </div>
          </div>

          <div className="div-w-full">
            <div className="label">
              <div className="status-pelayanan">Status Pelayanan</div>
            </div>
            <div className="input">
              <div className="div-h-2-d-634-f-5440">
                <div className="value">{data.status}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="paraf">
          <div className="petugas-penerima">Petugas Penerima</div>
          <div className="sistem">Sistem</div>
        </div>
        <div className="line"></div>
        <div className="footer">
          <div className="untuk-pemohon-jangan-sampai-hilang">
            *Tempel di Berkas
          </div>
          <div className="yogyakarta-23-juni-2024">
            Yogyakarta, {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfTemplate;