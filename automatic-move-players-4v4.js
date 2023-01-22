var room = HBInit({
    roomName: '4v4 Futsal Thiago Ys Deneme odası',
    maxPlayers: 16,
    public: false,
    noPlayer: true
});

room.setTeamsLock(true);

let maxoyuncu = 1;

function takim() {
    red = room.getPlayerList().filter((player)=>player.team==1);
    blue = room.getPlayerList().filter((player)=>player.team==2);
    spect = room.getPlayerList().filter((player)=>player.team==0);
}

let tasi = {
    playerLoser: (scores)=>{
        takim();
        if (scores.red > scores.blue) {
            room.stopGame();
            blue.map((player)=> room.setPlayerTeam(player.id, 0));
            tasi.spectPlayer({ team: 2 });
        }
        else {
            room.stopGame();
            red.map((player)=> room.setPlayerTeam(player.id, 0));
            tasi.spectPlayer({ team: 1 });
        }
    },
    spectPlayer: (object)=>{ // Filtre os jogadores espectadores para o time vermelho ou azul.
        takim();
        if (object.team==1) { // { team: 1 } = red
            setTimeout(()=>{
                spect.slice(0, maxoyuncu).map((player)=> room.setPlayerTeam(player.id, 1));
                room.startGame();
            },3000);
        }
        if (object.team==2) { // { team: 2 } = blue
            setTimeout(()=>{
                spect.slice(0, maxoyuncu).map((player)=> room.setPlayerTeam(player.id, 2));
                room.startGame();
            },3000);
        }
    },
    playerJoin: (player)=>{ //oyuncu girince olucaklar
        takim();
        if (blue.length > red.length) {
            room.setPlayerTeam(player.id, 1);
        }
        else if (blue.length < maxoyuncu) {
            room.setPlayerTeam(player.id, 2);
        }
        if (red.length > blue.length) {
            room.setPlayerTeam(player.id, 2);
        }
        else if (red.length < maxoyuncu) {
            room.setPlayerTeam(player.id, 1);
        }
    },
    checkTeams: ()=>{ // Ekipman sürücülerini yapılandırın.
        takim();
        if (spect.length >= 1) {
            if (red.length < maxoyuncu) { // Kırmızı takımın {maxoyuncu}'dan az olup olmadığını kontrol eder.
                spect.slice(0, maxoyuncu - red.length).forEach(player => room.setPlayerTeam(player.id, 1))
            }
            else if (blue.length < maxoyuncu) { // Aksi takdirde, mavi takımın {maxoyuncu}'dan küçük olup olmadığını kontrol edin.
                spect.slice(0, maxoyuncu - blue.length).forEach(player => room.setPlayerTeam(player.id, 2))
            }
        }
        else if (spect.length >= 6) {
            room.startGame();
        }
    }
};

room.onTeamVictory = (scores) => {
    tasi.playerLoser(scores);
}

room.onPlayerLeave = (player) => {
    tasi.checkTeams();
}

room.onPlayerJoin = (player) => {
    tasi.playerJoin(player);
}
room.onGameStop  = function (){
    tasi.checkTeams();
}

room.onPlayerTeamChange = (changedPlayer, byPlayer) => {
    takim();
    if (red.length >= maxoyuncu && blue.length >= maxoyuncu) {
        setTimeout(()=>{
            room.startGame();
        },3000);
    }
}