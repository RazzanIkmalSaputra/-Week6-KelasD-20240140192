/**
 * @file form.js — halaman Caption.
 * Validasi input nama produk & harga, lalu buat caption dari template yang dipilih.
 */

const templates = {
    promo: (nama, harga, tag) => `🔥🔥 PROMO SPESIAL HARI INI! 🔥🔥\n\nSiapa yang udah nungguin ${nama}? Akhirnya hadir dengan harga yang bikin kaget! 😱\n\n💰 Cuma ${harga} aja!\n✅ Kualitas terjamin\n✅ Stok terbatas, siapa cepat dia dapat\n✅ Pengiriman cepat ke seluruh Indonesia\n\nJangan sampai nyesel karena kehabisan ya! ⏰\nLangsung checkout sekarang sebelum harga balik normal 🛒💨\n\n#Promo #${tag} #DiskonHariIni #BelanjaHemat`,

    santai: (nama, harga, tag) => `Hai bestie! 👋✨\n\nLagi cari ${nama}? Pas banget, kamu nyasar ke tempat yang tepat 😎\n\nGak perlu nguras dompet, cukup ${harga} aja udah bisa kamu bawa pulang. Worth it parah sih ini, beneran deh! 🤌\n\nCocok buat dipakai sendiri, atau dijadiin kado buat orang tersayang 🎁💕\n\nYuk mampir, chat aja kalau ada yang mau ditanyain~ 💬\n\n#${tag} #RekomendasiProduk #RacunBelanja #WorthIt`,

    formal: (nama, harga, tag) => `Dengan bangga kami persembahkan:\n✦ ${nama} ✦\n\nProduk ini dipilih secara cermat untuk memberikan kualitas terbaik dan pengalaman yang memuaskan bagi Anda.\n\nHarga: ${harga}\n\nKeunggulan:\n- Kualitas terjamin dan telah melalui kontrol mutu\n- Layanan pelanggan yang responsif\n- Pengiriman aman dan tepat waktu\n\nUntuk pemesanan dan informasi lebih lanjut, silakan hubungi kami melalui pesan langsung. Terima kasih atas kepercayaan Anda.\n\n#${tag} #ProdukBerkualitas #BelanjaAman`,
};

const form = document.getElementById("form");

const rules = {
    nama: (v) => {
        v = v.trim();
        if (!v) return "Nama produk wajib diisi.";
        if (v.length < 3) return `Nama produk minimal 3 karakter (sekarang ${v.length}).`;
        if (v.length > 60) return `Nama produk maksimal 60 karakter (sekarang ${v.length}).`;
        if (!/\p{L}/u.test(v)) return "Nama produk harus mengandung huruf.";
        return "";
    },
    harga: (v) => {
        if (!v) return "Harga wajib diisi.";
        const n = Number(v);
        if (!Number.isInteger(n)) return "Harga harus angka bulat, tanpa koma.";
        if (n < 1000) return "Harga minimal Rp 1.000.";
        if (n > 100000000) return "Harga maksimal Rp 100.000.000.";
        return "";
    },
};

function validate(id) {
    const input = document.getElementById(id);
    const msg = rules[id](input.value);
    document.getElementById(`${id}-error`).textContent = msg;
    input.setAttribute("aria-invalid", msg ? "true" : "false");
    return !msg;
}

for (const id in rules) {
    document.getElementById(id).addEventListener("input", () => validate(id));
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const invalid = Object.keys(rules).filter((id) => !validate(id));
    if (invalid.length) {
        document.getElementById(invalid[0]).focus();
        document.getElementById("caption").value = "";
        return;
    }

    const nama = document.getElementById("nama").value.trim();
    const harga = Number(document.getElementById("harga").value)
        .toLocaleString("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 });
    const template = document.getElementById("template").value;
    const tag = nama.replace(/[^\p{L}\p{N}\s]/gu, "").split(/\s+/)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("");

    document.getElementById("caption").value = templates[template](nama, harga, tag);
});