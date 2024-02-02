var room = HBInit({
    roomName: "Odam",
    maxPlayers: 16,
    noPlayer: true,
    token: "thr1.AAAAAGV-IC2kbi-TvlRs9A.mxpVzDOlmV8",
});

var admin = [""];
var adminname = []
var players = [];
var banlanan_oyuncular = [];

room.onPlayerJoin = (player) => {
    var existingPlayer = players.find(p => p.auth === player.auth);
    if(admin.includes(player.auth)) {
        adminname.push(player.name)
        room.setPlayerAdmin(player.id, true);
    }
    if (existingPlayer) {
        existingPlayer.isimler.push(player.name);
    } else {
        players.push({
            'auth': player.auth,
            'id': player.id,
            'isimler': [player.name],
        });
    }
    if (banlanan_oyuncular.includes(player.auth)) {
        room.kickPlayer(player.id, 'Banlısın!');
    }
}

room.onPlayerLeave = (player) => {
    players = players.filter(p => p.auth !== player.auth);
}

room.onPlayerChat = (player, message) => {
    // Oyuncu bilgisi sorgulama komutunu kontrol et
    if (message.startsWith('!sorgu-auth') && adminname.includes(player.name)) {
        const oyuncuId = message.split(' ')[1];
        const sorgulananOyuncu = players.find(p => p.id == oyuncuId);

        if (sorgulananOyuncu) {
            room.sendAnnouncement(`Oyuncunun ID'si: ${oyuncuId}`, player.id, 0xFFD700); // Koyu Sarı
            room.sendAnnouncement(`Auth Değeri: ${sorgulananOyuncu.auth}`, player.id, 0xffff); // Açık Mavi
        } else {
            room.sendAnnouncement(`Oyuncu ID ${oyuncuId} bulunamadı.`, player.id, 0xFF0000); // Kırmızı
        }
        return false;
    }

    // Oyuncu isimleri sorgulama komutunu kontrol et
    if (message.startsWith('!sorgu-name') && adminname.includes(player.name)) {
        const oyuncuId = message.split(' ')[1];
        const sorgulananOyuncu = players.find(p => p.id == oyuncuId);

        if (sorgulananOyuncu) {
            room.sendAnnouncement(`Oyuncunun ID'si: ${oyuncuId}`, player.id, 0xFFD700); // Koyu Sarı
            room.sendAnnouncement(`İsimleri: ${sorgulananOyuncu.isimler.join(', ')}`, nuplayer.idll, 0x00FF00); // Yeşil
        } else {
            room.sendAnnouncement(`Oyuncu ID ${oyuncuId} bulunamadı.`, player.id, 0xFF0000); // Kırmızı
        }
        return false;
    }
    // Oyuncuyu banlama komutunu kontrol et
    if (message.startsWith('!banla')&& adminname.includes(player.name)) {
        const banlananAuth = message.split(' ')[1];
        const sorgulananOyuncu = players.find(p => p.auth == banlananAuth);

        if (sorgulananOyuncu) {
            banlanan_oyuncular.push(banlananAuth);
            room.sendAnnouncement(`Oyuncu Auth: ${banlananAuth}`, player.id, 0xFFD700, "bold"); // Koyu Sarı, Kalın
            room.sendAnnouncement(`İsimler: ${sorgulananOyuncu.isimler.join(', ')}`, player.id, 0x00FF00); // Yeşil
            room.sendAnnouncement('Banlandı!', null, 0xFF0000); // Kırmızı
            // Banlanan oyuncunun ID'sini bul ve odadan at
            const banlananOyuncuId = players.find(p => p.auth == banlananAuth)?.id;
            if (banlananOyuncuId) {
                room.kickPlayer(banlananOyuncuId, 'Banlısın!');
            }
        } else {
            room.sendAnnouncement(`Oyuncu auth: ${banlananAuth} bulunamadı.`, player.id, 0xFF0000); // Kırmızı
        }
        return false;
    }
}
