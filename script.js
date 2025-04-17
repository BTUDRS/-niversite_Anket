const girisFormu = document.getElementById('giris-formu');
const anketAlani = document.getElementById('anket-alani');
const anketFormu = document.getElementById('anket-formu');
const sonucAlani = document.getElementById('sonuc-alani');
const sonuclarDiv = document.getElementById('sonuclar');

let kullaniciBilgileri = {};
let sorular = [
    {
        soru: "İstanbul Aydın Üniversitesi'ndeki öğrenim deneyiminizden genel olarak ne kadar memnunsunuz?",
        cevaplar: ["Çok Memnun", "Memnun", "Kararsızım", "Memnun Değilim"]
    },
    {
        soru: "Derslerin içerikleri ve öğretim kalitesi hakkında ne düşünüyorsunuz?",
        cevaplar: ["Çok İyi", "İyi", "Orta", "Kötü"]
    },
    {
        soru: "Öğretim üyeleriyle iletişiminiz nasıl?",
        cevaplar: ["Çok İyi", "İyi", "Orta", "Kötü"]
    },
    {
        soru: "Üniversitenin sunduğu sosyal ve kültürel etkinliklerden memnun musunuz?",
        cevaplar: ["Çok Memnun", "Memnun", "Kararsızım", "Memnun Değilim"]
    },
    {
        soru: "Kampüs olanakları (kütüphane, laboratuvar vb.) yeterli mi?",
        cevaplar: ["Kesinlikle Yeterli", "Yeterli", "Kısmen Yeterli", "Yetersiz"]
    },
    {
        soru: "Bölümünüzdeki akademik danışmanlık hizmetlerinden ne kadar faydalandınız?",
        cevaplar: ["Çok Faydalandım", "Faydalandım", "Kısmen Faydalandım", "Faydalanmadım"]
    },
    {
        soru: "Kariyer merkezi ve staj olanakları hakkında ne düşünüyorsunuz?",
        cevaplar: ["Çok İyi", "İyi", "Orta", "Kötü"]
    },
    {
        soru: "Üniversitenin uluslararası değişim programları hakkında bilginiz var mı?",
        cevaplar: ["Evet ve Katıldım", "Evet, Biliyorum", "Hayır, Bilgim Yok", "İlgilenmiyorum"]
    },
    {
        soru: "İstanbul Aydın Üniversitesi'ni arkadaşlarınıza tavsiye eder misiniz?",
        cevaplar: ["Kesinlikle Ederim", "Ederim", "Kararsızım", "Etmem"]
    },
    {
        soru: "Üniversitenin genel öğrenci destek hizmetlerinden (sağlık, psikolojik danışmanlık vb.) memnun musunuz?",
        cevaplar: ["Çok Memnun", "Memnun", "Kararsızım", "Memnun Değilim"]
    }
];
let mevcutSoruIndex = 0;
let cevaplar = [];

function baslatAnket() {
    const ad = document.getElementById('ad').value;
    const soyad = document.getElementById('soyad').value;
    const sehir = document.getElementById('sehir').value;

    if (ad && soyad && sehir) {
        kullaniciBilgileri = { ad, soyad, sehir };
        girisFormu.style.display = 'none';
        anketAlani.style.display = 'block';
        sorulariGoster();
    } else {
        alert('Lütfen tüm alanları doldurun.');
    }
}

function sorulariGoster() {
    anketFormu.innerHTML = ''; // Önceki soruları temizle

    if (mevcutSoruIndex < sorular.length) {
        const mevcutSoru = sorular[mevcutSoruIndex];
        const soruDiv = document.createElement('div');
        soruDiv.classList.add('soru');
        soruDiv.innerHTML = `<h3>${mevcutSoru.soru}</h3>`;

        const cevaplarDiv = document.createElement('div');
        cevaplarDiv.classList.add('cevaplar');

        mevcutSoru.cevaplar.forEach((cevap, index) => {
            const cevapLabel = document.createElement('label');
            const cevapInput = document.createElement('input');
            cevapInput.type = 'radio';
            cevapInput.name = `soru-${mevcutSoruIndex}`;
            cevapInput.value = cevap;
            cevapInput.addEventListener('change', () => sonrakiSoru()); // Cevap seçildiğinde bir sonraki soruya geç
            cevapLabel.appendChild(cevapInput);
            cevapLabel.appendChild(document.createTextNode(cevap));
            cevaplarDiv.appendChild(cevapLabel);
        });

        soruDiv.appendChild(cevaplarDiv);
        anketFormu.appendChild(soruDiv);

        // Eğer ilk soru değilse "Geri" butonu ekle
        if (mevcutSoruIndex > 0) {
            const geriButton = document.createElement('button');
            geriButton.textContent = 'Geri';
            geriButton.onclick = oncekiSoru;
            anketFormu.appendChild(geriButton);
        }

        // Eğer son soru değilse "İleri" butonu ekle
        if (mevcutSoruIndex < sorular.length - 1) {
            const ileriButton = document.createElement('button');
            ileriButton.textContent = 'İleri';
            ileriButton.onclick = sonrakiSoru;
            anketFormu.appendChild(ileriButton);
        } else {
            // Son sorudaysa "Sonuçları Göster" butonu aktif hale gelir
            const bitirButton = document.createElement('button');
            bitirButton.textContent = 'Bitir ve Sonuçları Göster';
            bitirButton.onclick = sonuclariGoster;
            anketFormu.appendChild(bitirButton);
        }

    } else {
        // Tüm sorular tamamlandıysa sonuçları göster fonksiyonunu çağır
        sonuclariGoster();
    }
}

function sonrakiSoru() {
    const secilenCevap = document.querySelector(`input[name="soru-${mevcutSoruIndex}"]:checked`);
    if (secilenCevap) {
        cevaplar[mevcutSoruIndex] = secilenCevap.value;
        mevcutSoruIndex++;
        sorulariGoster();
    }
}

function oncekiSoru() {
    if (mevcutSoruIndex > 0) {
        mevcutSoruIndex--;
        sorulariGoster();
    }
}

function sonuclariGoster() {
    anketAlani.style.display = 'none';
    sonucAlani.style.display = 'block';
    sonuclarDiv.innerHTML = '<h3>Verdiğiniz Cevaplar:</h3><ul>';
    sorular.forEach((soru, index) => {
        sonuclarDiv.innerHTML += `<li><strong>${soru.soru}</strong>: ${cevaplar[index] || 'Cevaplanmadı'}</li>`;
    });
    sonuclarDiv.innerHTML += '</ul>';
    sonuclarDiv.innerHTML += `<p>Ad: ${kullaniciBilgileri.ad}</p>`;
    sonuclarDiv.innerHTML += `<p>Soyad: ${kullaniciBilgileri.soyad}</p>`;
    sonuclarDiv.innerHTML += `<p>Şehir: ${kullaniciBilgileri.sehir}</p>`;
}

function tekrarAnket() {
    mevcutSoruIndex = 0;
    cevaplar = [];
    sonucAlani.style.display = 'none';
    girisFormu.style.display = 'block';
}

// İlk açılışta giriş formunu göster
girisFormu.style.display = 'block';
anketAlani.style.display = 'none';
sonucAlani.style.display = 'none';