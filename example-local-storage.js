    var room = HBInit({
        roomName: "🏆haxball-botexampe🏆",
        maxPlayers: 16,
        noPlayer: true,
        public: true,
        geo : {code: 'tr',lon: 29.074202,lat: 40.193298}
    });

var bilgi = new Map();

function definir_info(player) {
	if (bilgi.get(player.name)) {
		return;
	}
	else {
		info.set(player.name, {auth: player.auth, conn: player.conn});
		localStorage.setItem("bilgi: ", JSON.stringify([...bilgi]));
	}
}
room.onRoomLink = (link) => {
	if (localStorage.getItem("bilgi: ") == null) {
		return;
	}
	else { 
		bilgi = new Map(JSON.parse(localStorage.bilgi));
	}
}
room.onPlayerJoin = (player) => {
	definir_bilgi(player)
}
