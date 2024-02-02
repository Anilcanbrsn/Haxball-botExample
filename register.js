var room = HBInit({
    roomName: "Odam",
    maxPlayers: 16,
    noPlayer: true,
});

var kayit = JSON.parse(localStorage.getItem("kayit")) || [];

room.onPlayerJoin = (player) => {
    var kayitliOyuncu = kayit.find((o) => o.bilgiler.auth === player.auth);

    if (kayitliOyuncu) {
        if (kayitliOyuncu.bilgiler.sifre !== "") {
            room.sendAnnouncement("🔐 Şifreniz var, giriş yapmak için !giriş şifre komutunu kullanın.", player.id, 0xFFFF00);
        } else {
            kayitliOyuncu.isimler.push(player.name);
        }

        kayitliOyuncu.bilgiler.id = player.id;
    } else {
        kayit.push({
            'isimler': [player.name],
            'bilgiler': {
                'auth': player.auth,
                'id': player.id,
                'giriskontrol': false,
                'sifre': '',
                'rank': {
                    'gol': 0,
                    'asist': 0,
                }
            },
        });
    }

    // Save data to localStorage
    localStorage.setItem("kayit", JSON.stringify(kayit));

    console.log(`Oyuncu katıldı.`);
    girisKontrol();
    console.log(kayit);
}

room.onPlayerLeave = (player) => {
    var kayitliOyuncu = kayit.find((o) => o.bilgiler.id === player.id);
    if (kayitliOyuncu) {
        kayitliOyuncu.bilgiler.giriskontrol = false;
    }

    // Save data to localStorage
    localStorage.setItem("kayit", JSON.stringify(kayit));

    console.log(`Oyuncu ayrıldı.`);
    console.log(kayit);
}

function girisKontrol() {
    for (var i = 0; i < kayit.length; i++) {
        if (kayit[i].bilgiler.giriskontrol == false) {
            room.sendAnnouncement("🔐 𝗚𝗜𝗥𝗜𝗦 / 𝗞𝗔𝗬𝗜𝗧 ᴏʟᴍᴀᴢsᴀɴɪᴢ ɪsᴛᴀᴛɪsᴛɪᴋʟᴇʀɪɴɪᴢ ᴋᴀʏᴅᴏʟᴍᴀᴢ. 💎 𝗞𝗔𝗬𝗜𝗧 ɪᴄɪɴ !kayıt şifre     💎 𝗚𝗜𝗥𝗜𝗦 ɪᴄɪɴ !giriş şifre", kayit[i].bilgiler.id, 0xFF0000);
        }
    }
    setTimeout(function () {
        for (var i = 0; i < kayit.length; i++) {
            if (kayit[i].bilgiler.giriskontrol == false) {
                room.kickPlayer(kayit[i].bilgiler.id, "Zamanında Giriş/Kayıt olmadığınız için atıldınız.");
            }
        }
    }, 20000);
    return false;
}

function giris(player, message) {
    let currentPlayer = kayit.find(p => p.auth === player.auth);
    if (currentPlayer) {
        if (!currentPlayer.bilgiler.giriskontrol) {
            if (currentPlayer.bilgiler.sifre === message.substr('!giriş'.length).trim()) {
                currentPlayer.bilgiler.giriskontrol = true;
                room.sendAnnouncement(`🔐 𝗚𝗜𝗥𝗜𝗦 ʙᴀşᴀʀɪʟɪ!`, player.id, 0x00FF00);
            } else {
                room.sendAnnouncement('Hata: Şifre yanlış!', player.id, 0xFF0000);
            }
        } else {
            room.sendAnnouncement('Uyarı: Zaten giriş yapmışsınız!', player.id, 0xFFFF00);
        }
    }
}

function kayitol(player, message) {
    let currentPlayer = kayit.find(p => p.auth === player.auth);
    if (currentPlayer) {
        if (currentPlayer.bilgiler.sifre === "") {
            const sifre = message.substr('!kayıt'.length).trim();

            if (sifre && sifre.length >= 6 && sifre.length <= 60) {
                currentPlayer.bilgiler.sifre = sifre;
                currentPlayer.bilgiler.giriskontrol = true;
                room.sendAnnouncement(`🔐 𝗞𝗔𝗬𝗜𝗧 ᴏʟᴜşᴛᴜʀᴜʟᴅᴜ !`, player.id, 0x00FF00);
            } else {
                room.sendAnnouncement('Hata: Şifre en az 6, en fazla 60 karakter olmalıdır!', player.id, 0xFF0000);
            }
        } else {
            room.sendAnnouncement('Hata: Zaten bir şifreniz var!', player.id, 0xFF0000);
        }
    }
}

function sifreDegistir(player, message) {
    let currentPlayer = kayit.find(p => p.auth === player.auth);
    if (currentPlayer) {
        const komutUzunluk = '!şifre-değiştir'.length;
        const parametreler = message.substr(komutUzunluk).trim().split(' ');

        if (currentPlayer.bilgiler.sifre !== "") {
            const eskiSifre = parametreler[0];
            if (eskiSifre && eskiSifre === currentPlayer.bilgiler.sifre) {
                const yeniSifre = parametreler[1];
                if (yeniSifre && yeniSifre.length >= 6 && yeniSifre.length <= 60) {
                    currentPlayer.bilgiler.sifre = yeniSifre;
                    room.sendAnnouncement(`🔐 Şifreniz başarıyla değiştirildi! Yeni şifreniz: ${yeniSifre}`, player.id, 0x00FF00);
                } else {
                    room.sendAnnouncement('Hata: Yeni şifre en az 6, en fazla 60 karakter olmalıdır!', player.id, 0xFF0000);
                }
            } else {
                room.sendAnnouncement('Hata: Eski şifre yanlış!', player.id, 0xFF0000);
            }
        } else {
            room.sendAnnouncement('Hata: Şifreniz bulunmamaktadır. Önce !kayıt komutu ile bir şifre oluşturun.', player.id, 0xFF0000);
        }
    }
}







room.onPlayerChat = (player, message) => {
    if (message.startsWith('!giriş')) {
        giris(player, message);
        return false;
    }
    if (message.startsWith('!kayıt')) {
        kayitol(player, message);
        return false;
    }
    if (message.startsWith('!şifre-değiştir')) {
        sifreDegistir(player, message);
        return false;
    }
}
