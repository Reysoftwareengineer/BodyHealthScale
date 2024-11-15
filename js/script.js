function calculateIMT() {
    const tinggi = parseFloat(document.getElementById("tinggi").value) / 100;
    const berat = parseFloat(document.getElementById("berat").value);
    const gender = document.querySelector('input[name="gender"]:checked')?.value;

    if (!tinggi || !berat || !gender) {
        alert("Semua input harus diisi!");
        return;
    }

    const imt = berat / (tinggi * tinggi);
    const gaugeIndicator = document.getElementById("gaugeIndicator");
    const gauge = document.getElementById("gauge");
    const category = document.getElementById("category");
    const difference = document.getElementById("difference");

    let kategori;
    let warna;
    let selisihBerat;

    let imtAdjusted = imt;
    if (gender === 'male') {
        imtAdjusted = imt * 1.05;
    } else if (gender === 'female') {
        imtAdjusted = imt * 0.95;
    }

    const allLinks = document.querySelectorAll(".bmi-table a");
    allLinks.forEach(link => link.classList.add("disabled"));

    if (imtAdjusted <= 15.9) {
        kategori = "Bobot Terlalu Rendah";
        warna = "#03A9F4";
        document.getElementById('bobot-rendah-link').classList.remove("disabled");
    } else if (imtAdjusted <= 16.9) {
        kategori = "Sangat Kurang Bobot";
        warna = "#2196F3";
        document.getElementById('sangat-kurang-link').classList.remove("disabled");
    } else if (imtAdjusted <= 18.4) {
        kategori = "Kurang Bobot";
        warna = "#42A5F5";
        document.getElementById('kurang-bobot-link').classList.remove("disabled");
    } else if (imtAdjusted <= 24.9) {
        kategori = "Normal";
        warna = "#00C853";
        document.getElementById('normal-link').classList.remove("disabled");
    } else if (imtAdjusted <= 29.9) {
        kategori = "Kelebihan Bobot";
        warna = "#FFB300";
        document.getElementById('kelebihan-bobot-link').classList.remove("disabled");
    } else if (imtAdjusted <= 34.9) {
        kategori = "Obesitas Kelas I";
        warna = "#FF5722";
        document.getElementById('obesitas-i-link').classList.remove("disabled");
    } else if (imtAdjusted <= 39.9) {
        kategori = "Obesitas Kelas II";
        warna = "#FF5252";
        document.getElementById('obesitas-ii-link').classList.remove("disabled");
    } else {
        kategori = "Obesitas Kelas III";
        warna = "#D50000";
        document.getElementById('obesitas-iii-link').classList.remove("disabled");
    }

    gaugeIndicator.textContent = imtAdjusted.toFixed(2);
    gaugeIndicator.style.color = warna;
    gauge.style.borderColor = warna;
    gauge.style.backgroundColor = `${warna}22`;

    category.textContent = kategori;
    category.style.color = warna;

    if (imtAdjusted < 18.5) {
        selisihBerat = (18.5 * tinggi * tinggi) - berat;
    } else if (imtAdjusted > 24.9) {
        selisihBerat = berat - (24.9 * tinggi * tinggi);
    } else {
        selisihBerat = 0;
    }
    difference.textContent = selisihBerat.toFixed(1);

    document.getElementById("bmiTable").style.display = "block";

    const arrowIndicators = document.querySelectorAll(".arrowIndicator");
    arrowIndicators.forEach(arrow => arrow.style.display = "none");

    const selectedArrow = document.querySelector(`#${kategori.toLowerCase().replace(/ /g, '-')} .arrowIndicator`);
    console.log(`Selected arrow for kategori: ${kategori}`, selectedArrow);  // Tambahkan log
    if (selectedArrow) {
        selectedArrow.style.display = "inline";
    }
}
