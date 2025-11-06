// Program Aplikasi Cuti - Versi Node.js (diperbaiki)
const readline = require("readline");

class Karyawan {
  constructor(nama) {
    this.nama = nama;
    this.cuti = {
      tahunan: 12,
      sakit: 2,
      melahirkan: 90
    };
  }

  ajukanCuti(jenis, hari) {
    // cek apakah jenis cuti ada (jangan pakai falsy-check karena 0 juga falsy)
    if (!(jenis in this.cuti)) {
      console.log("❌ Jenis cuti tidak valid!");
      return;
    }

    if (typeof hari !== "number" || Number.isNaN(hari) || hari <= 0) {
      console.log("❌ Masukkan jumlah hari yang valid (angka > 0).");
      return;
    }

    const sisa = this.cuti[jenis];
    if (hari <= sisa) {
      this.cuti[jenis] -= hari;
      console.log(`✅ Cuti ${jenis} untuk ${this.nama} disetujui (${hari} hari).`);
      console.log(`Sisa cuti ${jenis}: ${this.cuti[jenis]} hari.`);
    } else {
      console.log("❌ Kuota anda tidak cukup untuk mengajukan cuti ini!");
      console.log(`Sisa cuti ${jenis}: ${sisa} hari.`);
    }
  }

  tampilkanKuota() {
    console.log(`\nKuota cuti ${this.nama}:`);
    for (const [k, v] of Object.entries(this.cuti)) {
      console.log(` - ${k}: ${v} hari`);
    }
    console.log("");
  }
}

// Setup readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function tanya(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (ans) => resolve(ans));
  });
}

(async function main() {
  console.log("=== Aplikasi Cuti ===");
  const nama = (await tanya("Masukkan nama karyawan: ")).trim() || "TanpaNama";
  const user = new Karyawan(nama);

  console.log("\nTipe cuti yang tersedia: tahunan, sakit, melahirkan");
  console.log("Ketik 'exit' pada pilihan jenis untuk keluar.\n");

  while (true) {
    user.tampilkanKuota();
    const jenisRaw = (await tanya("Pilih jenis cuti: ")).trim().toLowerCase();
    if (jenisRaw === "exit") break;

    const hariRaw = (await tanya("Masukkan jumlah hari yang diajukan: ")).trim();
    const hari = parseInt(hariRaw, 10);

    user.ajukanCuti(jenisRaw, hari);
    console.log(""); // spacing
  }

  console.log("\nTerima kasih. Program selesai.");
  rl.close();
})();
