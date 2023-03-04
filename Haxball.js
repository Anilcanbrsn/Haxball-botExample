var room = HBInit({
    roomName: "🏆THİAGO ACEMİ FUTSAL ODASI🏆",
    playerName: "Legend Bot",
    maxPlayers: 12,
    public: true,
    noPlayer: true, // Remove host player (recommended!)
    geo : {code: 'tr',
        lon: 29.074202,
        lat: 40.193298

    } });

function updateLogins() {
    var players = room.getPlayerList()
    return players.length
}

const admin_list = ["P9jYk0de91YbZWcjg_kRqImFf_DaJVuTG7wP5SOS0OM"];
const oyunculist = [];
const ban_list = [];
const vip = ["P9jYk0de91YbZWcjg_kRqImFf_DaJVuTG7wP5SOS0OM"];
let adminprefix = "👑 ";
let vipprefix = "⭐️ ";
let vipname = [];
let adminname = [];


room.onPlayerJoin = function(player) {
    const checkVip = vip.every((vipAuth) => { return vipAuth !== player.auth })
    const playersLength = updateLogins()
    if (playersLength > 14 && checkVip) {
        room.kickPlayer(player.id, 'Son 2 yer dostlar meclisi')
    }if(oyunculist.push(`{name:${player.name},auth:${player.auth},conn:${player.conn}}`)){

    }if(ban_list.includes(player.auth)){
        room.kickPlayer(player.id," BANLANDIN  ","bold",true);
    }if(admin_list.includes(player.auth)){
        room.setPlayerAdmin(player.id,true);
        room.sendAnnouncement(player.name+" İsimli Yetkili Oyuna Teşrif Etti.",null,0x00ffff,"bold",1);
        adminname.push(player.name)
    }else if (!admin_list.includes(player.auth) && vip.includes(player.auth)){
        room.sendAnnouncement(player.name+" a Çay beleş!",null,0xFF7F00,"bold",1);
        vipname.push(player.name);
    }else if (!admin_list.includes(player.auth) && !vip.includes(player.auth)){
        room.sendAnnouncement("Acemi Mekanına hoş geldin",player.id,0xFF7F00,"bold",2);
    }
    console.log(oyunculist)
}

room.onPlayerChat = (player, message) =>{
    if(vipname.includes(player.name) && !adminname.includes(player.name)) {
        room.sendAnnouncement(vipprefix + player.name + ": " + message, null, 0xc08081, 'bold', 1);
        return false;
    }if(adminname.includes(player.name)) {
        room.sendAnnouncement(adminprefix + player.name + ": " + message, null, 0xFF7F00, 'bold', 1);
        return false;
    }
}