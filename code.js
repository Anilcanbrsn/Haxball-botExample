
var asistid = "";
var redMax = 1;
var blueMax = 1;
var oyuncular = []; // isim:,id:,galibiyet:,yenilgi:var gol; formanumarasi=0;
ballOut = true;
ballOut = true;
kirmiziTakim = [];
maviTakim = [];
redTeam = [0, 0, 0, 0, 0, 0];
blueTeam = [0, 0, 0, 0, 0, 0];
redT = [];
blueT = [];
var roomName = "🆑 #1# 𝐑𝐒 𝐯𝟔| Pen6 | 6dk + Uzatma";
var geciciadminler = [];
var maxPlayers = 16;
var roomPublic = true;
var playerName = " 🏼 🤵🏼 ";
var maxTeamSize = 6; // This works for 1 (you might want to adapt things to remove some useless stats in 1v1 like assist or cs), 2, 3 or 4
var susturulanlar = [];
actualTimeAdded2 = 0;
sustur = false;
zaman = false;
avatarTime = false;
oylamazamani = false;
yaylilar = [];
yaysizlar = [];
voteKickList = [];

////v6 yaylı,yaysiz ayarları

var stadiumWidth = 1400;
var stadiumHeight = 660;
var radiusBall = 8;
var throwInLeeway = 500;
var greenLine = 565;
var triggerDistance = radiusBall + 15 + 0.01;
var outLineY = stadiumWidth - (radiusBall / 2) + 6;
stadiumWidth += (radiusBall / 2) + 6;
stadiumHeight += (radiusBall / 2) + 6;

var ballSpeed;
var point = [{
	"x": 0,
	"y": 0
}, {
	"x": 0,
	"y": 0
}]; // created to get ball speed

var Team = {
	SPECTATORS: 0,
	RED: 1,
	BLUE: 2
};
var playersNotInLineId = [];
var lastScores = 0;
var lastTeamTouched = 0;
var lineBallPosition;
var exitingPos = null;
var previousBallPos;
var assistingTouch = "";
var lastPlayerTouched = "";
var lastCall;
var backMSG = false;
var isBallUp = false;
var crossed = false;
var isTimeAddedShown = false;
var lineCrossedPlayers = [{
	name: "temp",
	times: 0
}];
var isBallKickedOutside = false;
var previousPlayerTouched;
var timeOutside = 0;
geo = {
	"code": "TR",
	"lat": 41.0219,
	"lon": 28.991
}
var room = HBInit({
	roomName: roomName,
	maxPlayers: maxPlayers,
	public: roomPublic,
	playerName: playerName,
	geo
});
room.setScoreLimit(0);
room.setTimeLimit(0);
room.setTeamsLock(true);

//Haritalar
var RSHLMap = ` {   "name" : "| R.S. Yaysız v6 |",  "width" : 1600,  "height" : 850,  "spawnDistance" : 770,  "bg" : { "type" : "grass", "width" : 1400, "height" : 660, "kickOffRadius" : 180, "cornerRadius" : 0 },  "playerPhysics" : { "bCoef" : 0.5, "invMass" : 0.5, "damping" : 0.96101, "acceleration" : 0.1201, "kickingAcceleration" : 0.07, "kickingDamping" : 0.9605, "kickStrength" : 5.8652  },  "ballPhysics" : { "radius" : 8, "bCoef" : 0.5, "invMass" : 1, "damping" : 0.9902, "color" : "FFFFFF", "cMask" : [ "all" ], "cGroup" : [ "ball" ]  },  "vertexes" : [ /* 0 */ { "x" : 0, "y" : 758, "trait" : "kickOffBarrier" }, /* 1 */ { "x" : 0, "y" : 180, "trait" : "kickOffBarrier" }, /* 2 */ { "x" : 0, "y" : -180, "trait" : "kickOffBarrier" }, /* 3 */ { "x" : 0, "y" : -785, "trait" : "kickOffBarrier" },  /* 4 */ { "x" : 1398, "y" : 310, "trait" : "line" }, /* 5 */ { "x" : 1000, "y" : 310, "trait" : "line" }, /* 6 */ { "x" : 1398, "y" : -310, "trait" : "line", "curve" : 0 }, /* 7 */ { "x" : 1000, "y" : -310, "trait" : "line", "curve" : 0 }, /* 8 */ { "x" : 1398, "y" : 180, "trait" : "line" }, /* 9 */ { "x" : 1263, "y" : 180, "trait" : "line", "curve" : 0 }, /* 10 */ { "x" : 1398, "y" : -180, "trait" : "line" }, /* 11 */ { "x" : 1263, "y" : -180, "trait" : "line", "curve" : 0 }, /* 12 */ { "x" : 1000, "y" : -150, "trait" : "line", "curve" : -130 }, /* 13 */ { "x" : 1000, "y" : 150, "trait" : "line", "curve" : -130 }, /* 14 */ { "x" : -1400, "y" : -310, "trait" : "line" }, /* 15 */ { "x" : -1000, "y" : -310, "trait" : "line" }, /* 16 */ { "x" : -1400, "y" : 310, "trait" : "line" }, /* 17 */ { "x" : -1000, "y" : 310, "trait" : "line" }, /* 18 */ { "x" : -1400, "y" : -180, "trait" : "line" }, /* 19 */ { "x" : -1262, "y" : -180, "trait" : "line" }, /* 20 */ { "x" : -1400, "y" : 180, "trait" : "line", "curve" : 0 }, /* 21 */ { "x" : -1262, "y" : 180, "trait" : "line", "curve" : 0 }, /* 22 */ { "x" : -1000, "y" : 150, "trait" : "line", "curve" : -130 }, /* 23 */ { "x" : -1000, "y" : -150, "trait" : "line", "curve" : -130 }, /* 24 */ { "x" : 1130, "y" : 0, "trait" : "line" }, /* 25 */ { "x" : 1130, "y" : -8, "trait" : "line" }, /* 26 */ { "x" : -1128, "y" : 1, "trait" : "line" }, /* 27 */ { "x" : -1128, "y" : -7, "trait" : "line" }, /* 28 */ { "x" : -1397, "y" : 135, "trait" : "line", "color" : "ffffff" }, /* 29 */ { "x" : -1465, "y" : 135, "trait" : "line", "color" : "ffffff" }, /* 30 */ { "x" : -1397, "y" : -135, "trait" : "line", "color" : "ffffff", "curve" : -5 }, /* 31 */ { "x" : -1465, "y" : -135, "trait" : "line", "color" : "ffffff", "curve" : -5 }, /* 32 */ { "x" : 1398, "y" : 135, "trait" : "line", "color" : "ffffff", "pos" : [1400,135 ] }, /* 33 */ { "x" : 1465, "y" : 135, "trait" : "line", "color" : "ffffff", "pos" : [1400,135 ] }, /* 34 */ { "x" : 1398, "y" : -135, "trait" : "line", "color" : "ffffff", "pos" : [1400,-135 ] }, /* 35 */ { "x" : 1465, "y" : -135, "trait" : "line", "color" : "ffffff", "pos" : [1400,-135 ] }, /* 36 */ { "x" : 0, "y" : -4, "trait" : "line" }, /* 37 */ { "x" : 0, "y" : 4, "trait" : "line" }, /* 38 */ { "x" : 0, "y" : -4, "trait" : "line" }, /* 39 */ { "x" : 0, "y" : 4, "trait" : "line" }, /* 40 */ { "x" : -1465, "y" : 135, "trait" : "line", "color" : "ffffff" }, /* 41 */ { "x" : -1515, "y" : 190, "trait" : "line", "color" : "ffffff", "pos" : [-1515,190 ] }, /* 42 */ { "x" : -1465, "y" : -135, "trait" : "line", "color" : "ffffff" }, /* 43 */ { "x" : -1515, "y" : -190, "trait" : "line", "color" : "ffffff", "pos" : [-1250,-150 ] }, /* 44 */ { "x" : 1465, "y" : 135, "trait" : "line", "color" : "ffffff", "pos" : [1400,135 ] }, /* 45 */ { "x" : 1515, "y" : 190, "trait" : "line", "color" : "ffffff", "pos" : [1515,190 ] }, /* 46 */ { "x" : 1465, "y" : -135, "trait" : "line", "color" : "ffffff", "pos" : [1400,-135 ] }, /* 47 */ { "x" : 1515, "y" : -190, "trait" : "line", "color" : "ffffff", "pos" : [1515,-190 ] },  /* 48 */ { "x" : -0.8411691949913092, "y" : 181.70623074049965, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["blueKO" ], "trait" : "kickOffBarrier", "curve" : -160.5 }, /* 49 */ { "x" : 0.6980143617980445, "y" : -180.28516742489984, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["blueKO" ], "trait" : "kickOffBarrier", "curve" : -160.5 }, /* 50 */ { "x" : 0.1357807900351844, "y" : 180.11207280820105, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO" ], "trait" : "kickOffBarrier", "curve" : 154 }, /* 51 */ { "x" : 0.7169100816519887, "y" : -179.87947197937916, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO" ], "trait" : "kickOffBarrier", "curve" : 154 },  /* 52 */ { "x" : -1427, "y" : 180, "bCoef" : -5.5, "cMask" : ["ball" ], "trait" : "line", "curve" : 40, "color" : "576C46" }, /* 53 */ { "x" : -1427, "y" : 310, "bCoef" : -5.5, "cMask" : ["ball" ], "trait" : "line", "curve" : 40, "color" : "576C46" }, /* 54 */ { "x" : 1428, "y" : 180, "bCoef" : -5.5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "576C46" }, /* 55 */ { "x" : 1428, "y" : 310, "bCoef" : -5.5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "576C46" }, /* 56 */ { "x" : -1427, "y" : -180, "bCoef" : -5.5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "576C46" }, /* 57 */ { "x" : -1427, "y" : -310, "bCoef" : -5.5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "576C46" }, /* 58 */ { "x" : 1428, "y" : -180, "bCoef" : -5.5, "cMask" : ["ball" ], "trait" : "line", "curve" : 40, "color" : "576C46" }, /* 59 */ { "x" : 1428, "y" : -310, "bCoef" : -5.5, "cMask" : ["ball" ], "trait" : "line", "curve" : 40, "color" : "576C46" }, /* 60 */ { "x" : 1413, "y" : -653, "bCoef" : -3.45, "cMask" : ["ball" ], "trait" : "line", "curve" : -60, "color" : "576C46" }, /* 61 */ { "x" : 1443, "y" : -633, "bCoef" : -3.45, "cMask" : ["ball" ], "trait" : "line", "curve" : -60, "color" : "576C46" }, /* 62 */ { "x" : 1413, "y" : 653, "bCoef" : -3.45, "cMask" : ["ball" ], "trait" : "line", "curve" : 60, "color" : "576C46" }, /* 63 */ { "x" : 1443, "y" : 633, "bCoef" : -3.45, "cMask" : ["ball" ], "trait" : "line", "curve" : 60, "color" : "576C46" }, /* 64 */ { "x" : -1413, "y" : 653, "bCoef" : -3.45, "cMask" : ["ball" ], "trait" : "line", "curve" : -75, "color" : "576C46" }, /* 65 */ { "x" : -1443, "y" : 633, "bCoef" : -3.45, "cMask" : ["ball" ], "trait" : "line", "curve" : -75, "color" : "576C46" }, /* 66 */ { "x" : -1413, "y" : -653, "bCoef" : -3.45, "cMask" : ["ball" ], "trait" : "line", "curve" : 75, "color" : "576C46" }, /* 67 */ { "x" : -1443, "y" : -633, "bCoef" : -3.45, "cMask" : ["ball" ], "trait" : "line", "curve" : 75, "color" : "576C46" },  /* 68 */ { "x" : -1433, "y" : -310, "bCoef" : 0, "cMask" : ["ball" ] }, /* 69 */ { "x" : -1433, "y" : -180, "cMask" : ["ball" ] },  /* 70 */ { "x" : -1427, "y" : 310, "bCoef" : -5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "576C46" },  /* 71 */ { "x" : -1433, "y" : 310, "bCoef" : 0, "cMask" : ["ball" ] },  /* 72 */ { "x" : -1427, "y" : 180, "bCoef" : -5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "576C46" },  /* 73 */ { "x" : -1433, "y" : 180, "cMask" : ["ball" ] }, /* 74 */ { "x" : 1434, "y" : -310, "bCoef" : 0, "cMask" : ["ball" ] }, /* 75 */ { "x" : 1434, "y" : -180, "cMask" : ["ball" ] },  /* 76 */ { "x" : 1428, "y" : -180, "bCoef" : -5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "576C46" }, /* 77 */ { "x" : 1428, "y" : -310, "bCoef" : -5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "576C46" },  /* 78 */ { "x" : 1434, "y" : 310, "bCoef" : 0, "cMask" : ["ball" ] }, /* 79 */ { "x" : 1434, "y" : 180, "cMask" : ["ball" ] },  /* 80 */ { "x" : 1428, "y" : 310, "bCoef" : -5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "576C46" }, /* 81 */ { "x" : 1428, "y" : 180, "bCoef" : -5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "576C46" }, /* 82 */ { "x" : -1399, "y" : -575, "trait" : "line", "color" : "5E844D", "curve" : 0 }, /* 83 */ { "x" : 1399, "y" : -575, "trait" : "line", "color" : "5E844D", "curve" : 0 }, /* 84 */ { "x" : -1399, "y" : 575, "trait" : "line", "color" : "5E844D", "curve" : 0 }, /* 85 */ { "x" : 1399, "y" : 575, "trait" : "line", "color" : "5E844D", "curve" : 0 }, /* 86 */ { "x" : -1399.484375, "y" : 322.515625, "trait" : "line" }, /* 87 */ { "x" : -1110.484375, "y" : 659.515625, "trait" : "line" }, /* 88 */ { "x" : 1399.635035092499, "y" : -319.2764558771561, "trait" : "line" }, /* 89 */ { "x" : 1117.8329344345261, "y" : -659.7348941564355, "trait" : "line" }, /* 90 */ { "x" : -1113.1248350248002, "y" : -658.6565383524106, "trait" : "line" }, /* 91 */ { "x" : -1399.3634268273672, "y" : -318.33677598281287, "trait" : "line" }, /* 92 */ { "x" : 1101.6178310984292, "y" : 659.9423287742153, "trait" : "line" }, /* 93 */ { "x" : 1398.2083664448207, "y" : 324.5389963159137, "trait" : "line" }, /* 94 */ { "x" : -1399.8898822239466, "y" : 685.3333277702332, "trait" : "line" }, /* 95 */ { "x" : -1399.8898822239466, "y" : 662.8333277702332, "trait" : "line" }, /* 96 */ { "x" : -1421.675596509661, "y" : 686.1666102409363, "trait" : "line", "color" : "DEFE2E" }, /* 97 */ { "x" : -1408.0595250810898, "y" : 686.1666102409363, "trait" : "line", "color" : "DEFE2E" }, /* 98 */ { "x" : -1412.144346509661, "y" : 686.1666102409363, "trait" : "line", "color" : "FA2E49" }, /* 99 */ { "x" : -1398.5282750810898, "y" : 686.1666102409363, "trait" : "line", "color" : "FA2E49" }, /* 100 */ { "x" : -1398.571492386553, "y" : 689.4638750342431, "trait" : "line", "color" : "DEFE2E" }, /* 101 */ { "x" : -1412.187447567113, "y" : 689.5155274858153, "trait" : "line", "color" : "DEFE2E" }, /* 102 */ { "x" : -1408.1026610129452, "y" : 689.5000317503436, "trait" : "line", "color" : "FA2E49" }, /* 103 */ { "x" : -1421.7186161935053, "y" : 689.5516842019159, "trait" : "line", "color" : "FA2E49" }, /* 104 */ { "x" : -1399.8510526309224, "y" : 661.1171708331165, "trait" : "line" },  /* 105 */ { "x" : -119.33333587646484, "y" : 822.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 106 */ { "x" : -119.33333587646484, "y" : 837.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 107 */ { "x" : -119.33333587646484, "y" : 793.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 108 */ { "x" : -119.33333587646484, "y" : 808.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 109 */ { "x" : -119.33333587646484, "y" : 762.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 110 */ { "x" : -119.33333587646484, "y" : 777.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 111 */ { "x" : -474.33333587646484, "y" : 819.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 112 */ { "x" : -474.33333587646484, "y" : 834.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 113 */ { "x" : -474.33333587646484, "y" : 791.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 114 */ { "x" : -474.33333587646484, "y" : 806.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 115 */ { "x" : -474.33333587646484, "y" : 761.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 116 */ { "x" : -474.33333587646484, "y" : 776.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 117 */ { "x" : -223.33333587646484, "y" : 762.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 118 */ { "x" : -208.33333587646484, "y" : 762.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 119 */ { "x" : -255.33333587646484, "y" : 762.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 120 */ { "x" : -240.33333587646484, "y" : 762.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 121 */ { "x" : -286.33333587646484, "y" : 762.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 122 */ { "x" : -271.33333587646484, "y" : 762.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 123 */ { "x" : -317.33333587646484, "y" : 762.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 124 */ { "x" : -302.33333587646484, "y" : 762.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 125 */ { "x" : -349.33333587646484, "y" : 762.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 126 */ { "x" : -334.33333587646484, "y" : 762.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 127 */ { "x" : -381.33333587646484, "y" : 762.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 128 */ { "x" : -366.33333587646484, "y" : 762.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 129 */ { "x" : -413.33333587646484, "y" : 762.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 130 */ { "x" : -398.33333587646484, "y" : 762.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 131 */ { "x" : -443.33333587646484, "y" : 762.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 132 */ { "x" : -428.33333587646484, "y" : 762.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 133 */ { "x" : -474.33333587646484, "y" : 762.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 134 */ { "x" : -459.33333587646484, "y" : 762.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 135 */ { "x" : -133.33333587646484, "y" : 762.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 136 */ { "x" : -118.33333587646484, "y" : 762.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 137 */ { "x" : -164.33333587646484, "y" : 763.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 138 */ { "x" : -149.33333587646484, "y" : 763.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 139 */ { "x" : -194.33333587646484, "y" : 762.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 140 */ { "x" : -179.33333587646484, "y" : 762.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 141 */ { "x" : 413.66666412353516, "y" : 823.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 142 */ { "x" : 413.66666412353516, "y" : 838.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 143 */ { "x" : 413.66666412353516, "y" : 794.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 144 */ { "x" : 413.66666412353516, "y" : 809.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 145 */ { "x" : 413.66666412353516, "y" : 763.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 146 */ { "x" : 413.66666412353516, "y" : 778.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 147 */ { "x" : 59.666664123535156, "y" : 820.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 148 */ { "x" : 59.666664123535156, "y" : 835.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 149 */ { "x" : 59.666664123535156, "y" : 792.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 150 */ { "x" : 59.666664123535156, "y" : 807.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 151 */ { "x" : 59.666664123535156, "y" : 762.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 152 */ { "x" : 59.666664123535156, "y" : 777.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 153 */ { "x" : 310.66666412353516, "y" : 763.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 154 */ { "x" : 325.66666412353516, "y" : 763.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 155 */ { "x" : 278.66666412353516, "y" : 763.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 156 */ { "x" : 293.66666412353516, "y" : 763.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 157 */ { "x" : 247.66666412353516, "y" : 763.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 158 */ { "x" : 262.66666412353516, "y" : 763.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 159 */ { "x" : 216.66666412353516, "y" : 763.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 160 */ { "x" : 231.66666412353516, "y" : 763.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 161 */ { "x" : 184.66666412353516, "y" : 763.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 162 */ { "x" : 199.66666412353516, "y" : 763.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 163 */ { "x" : 152.66666412353516, "y" : 763.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 164 */ { "x" : 167.66666412353516, "y" : 763.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 165 */ { "x" : 120.66666412353516, "y" : 763.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 166 */ { "x" : 135.66666412353516, "y" : 763.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 167 */ { "x" : 90.66666412353516, "y" : 763.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 168 */ { "x" : 105.66666412353516, "y" : 763.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 169 */ { "x" : 59.666664123535156, "y" : 763.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 170 */ { "x" : 74.66666412353516, "y" : 763.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 171 */ { "x" : 399.66666412353516, "y" : 764.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 172 */ { "x" : 414.66666412353516, "y" : 764.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 173 */ { "x" : 369.66666412353516, "y" : 764.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 174 */ { "x" : 384.66666412353516, "y" : 764.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 175 */ { "x" : 339.66666412353516, "y" : 763.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 176 */ { "x" : 354.66666412353516, "y" : 763.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" },  /* 177 */ { "x" : -1398.571492386553, "y" : 691.9638750342431, "trait" : "line", "color" : "DEFE2E" }, /* 178 */ { "x" : -1412.187447567113, "y" : 692.0155274858153, "trait" : "line", "color" : "DEFE2E" }, /* 179 */ { "x" : -1408.1026610129452, "y" : 692.0000317503436, "trait" : "line", "color" : "FA2E49" }, /* 180 */ { "x" : -1421.7186161935053, "y" : 692.0516842019159, "trait" : "line", "color" : "FA2E49" }, /* 181 */ { "x" : -1421.675596509661, "y" : 683.6666102409363, "trait" : "line", "color" : "DEFE2E" }, /* 182 */ { "x" : -1408.0595250810898, "y" : 683.6666102409363, "trait" : "line", "color" : "DEFE2E" }, /* 183 */ { "x" : -1412.144346509661, "y" : 683.6666102409363, "trait" : "line", "color" : "FA2E49" }, /* 184 */ { "x" : -1398.5282750810898, "y" : 683.6666102409363, "trait" : "line", "color" : "FA2E49" }, /* 185 */ { "x" : -1399.113783322848, "y" : -660.8042821681452, "trait" : "line" }, /* 186 */ { "x" : -1399.113783322848, "y" : -684.2265999819103, "trait" : "line" }, /* 187 */ { "x" : -1419.2348612580704, "y" : -688.1303196175377, "trait" : "line", "color" : "DEFE2E" }, /* 188 */ { "x" : -1406.2224624726455, "y" : -688.1303196175377, "trait" : "line", "color" : "DEFE2E" }, /* 189 */ { "x" : -1410.1261821082728, "y" : -688.1303196175377, "trait" : "line", "color" : "FA2E49" }, /* 190 */ { "x" : -1397.113783322848, "y" : -688.1303196175377, "trait" : "line", "color" : "FA2E49" }, /* 191 */ { "x" : -1397.1550845760084, "y" : -684.6978936662059, "trait" : "line", "color" : "DEFE2E" }, /* 192 */ { "x" : -1410.1673722673127, "y" : -684.6441238823576, "trait" : "line", "color" : "DEFE2E" }, /* 193 */ { "x" : -1406.2636859599213, "y" : -684.660254817512, "trait" : "line", "color" : "FA2E49" }, /* 194 */ { "x" : -1419.275973651226, "y" : -684.6064850336637, "trait" : "line", "color" : "FA2E49" }, /* 195 */ { "x" : -1397.1550845760084, "y" : -682.0954139091209, "trait" : "line", "color" : "DEFE2E" }, /* 196 */ { "x" : -1410.1673722673127, "y" : -682.0416441252727, "trait" : "line", "color" : "DEFE2E" }, /* 197 */ { "x" : -1406.2636859599213, "y" : -682.057775060427, "trait" : "line", "color" : "FA2E49" }, /* 198 */ { "x" : -1419.275973651226, "y" : -682.0040052765788, "trait" : "line", "color" : "FA2E49" }, /* 199 */ { "x" : -1419.2348612580704, "y" : -690.7327993746228, "trait" : "line", "color" : "DEFE2E" }, /* 200 */ { "x" : -1406.2224624726455, "y" : -690.7327993746228, "trait" : "line", "color" : "DEFE2E" }, /* 201 */ { "x" : -1410.1261821082728, "y" : -690.7327993746228, "trait" : "line", "color" : "FA2E49" }, /* 202 */ { "x" : -1397.113783322848, "y" : -690.7327993746228, "trait" : "line", "color" : "FA2E49" }, /* 203 */ { "x" : 1400.7767857142858, "y" : 682.6665797233582, "trait" : "line" }, /* 204 */ { "x" : 1400.7767857142858, "y" : 660.1665797233582, "trait" : "line" }, /* 205 */ { "x" : 1398.9910714285713, "y" : 681.4998621940613, "trait" : "line", "color" : "DEFE2E" }, /* 206 */ { "x" : 1412.6071428571427, "y" : 681.4998621940613, "trait" : "line", "color" : "DEFE2E" }, /* 207 */ { "x" : 1408.5223214285713, "y" : 681.4998621940613, "trait" : "line", "color" : "FA2E49" }, /* 208 */ { "x" : 1422.1383928571427, "y" : 681.4998621940613, "trait" : "line", "color" : "FA2E49" }, /* 209 */ { "x" : 1422.0951755516794, "y" : 684.7971269873681, "trait" : "line", "color" : "DEFE2E" }, /* 210 */ { "x" : 1408.4792203711195, "y" : 684.8487794389403, "trait" : "line", "color" : "DEFE2E" }, /* 211 */ { "x" : 1412.5640069252872, "y" : 684.8332837034686, "trait" : "line", "color" : "FA2E49" }, /* 212 */ { "x" : 1398.948051744727, "y" : 684.8849361550409, "trait" : "line", "color" : "FA2E49" }, /* 213 */ { "x" : 1422.0951755516794, "y" : 687.2971269873681, "trait" : "line", "color" : "DEFE2E" }, /* 214 */ { "x" : 1408.4792203711195, "y" : 687.3487794389403, "trait" : "line", "color" : "DEFE2E" }, /* 215 */ { "x" : 1412.5640069252872, "y" : 687.3332837034686, "trait" : "line", "color" : "FA2E49" }, /* 216 */ { "x" : 1398.948051744727, "y" : 687.3849361550409, "trait" : "line", "color" : "FA2E49" }, /* 217 */ { "x" : 1398.9910714285713, "y" : 678.9998621940613, "trait" : "line", "color" : "DEFE2E" }, /* 218 */ { "x" : 1412.6071428571427, "y" : 678.9998621940613, "trait" : "line", "color" : "DEFE2E" }, /* 219 */ { "x" : 1408.5223214285713, "y" : 678.9998621940613, "trait" : "line", "color" : "FA2E49" }, /* 220 */ { "x" : 1422.1383928571427, "y" : 678.9998621940613, "trait" : "line", "color" : "FA2E49" }, /* 221 */ { "x" : 1399.7924107142858, "y" : -657.286464214325, "trait" : "line" }, /* 222 */ { "x" : 1399.7924107142858, "y" : -679.786464214325, "trait" : "line" }, /* 223 */ { "x" : 1398.0066964285713, "y" : -684.4531817436218, "trait" : "line", "color" : "DEFE2E" }, /* 224 */ { "x" : 1411.6227678571427, "y" : -684.4531817436218, "trait" : "line", "color" : "DEFE2E" }, /* 225 */ { "x" : 1407.5379464285713, "y" : -684.4531817436218, "trait" : "line", "color" : "FA2E49" }, /* 226 */ { "x" : 1421.1540178571427, "y" : -684.4531817436218, "trait" : "line", "color" : "FA2E49" }, /* 227 */ { "x" : 1421.1108005516794, "y" : -681.155916950315, "trait" : "line", "color" : "DEFE2E" }, /* 228 */ { "x" : 1407.4948453711195, "y" : -681.1042644987429, "trait" : "line", "color" : "DEFE2E" }, /* 229 */ { "x" : 1411.5796319252872, "y" : -681.1197602342145, "trait" : "line", "color" : "FA2E49" }, /* 230 */ { "x" : 1397.963676744727, "y" : -681.0681077826422, "trait" : "line", "color" : "FA2E49" }, /* 231 */ { "x" : 1421.1108005516794, "y" : -678.655916950315, "trait" : "line", "color" : "DEFE2E" }, /* 232 */ { "x" : 1407.4948453711195, "y" : -678.6042644987429, "trait" : "line", "color" : "DEFE2E" }, /* 233 */ { "x" : 1411.5796319252872, "y" : -678.6197602342145, "trait" : "line", "color" : "FA2E49" }, /* 234 */ { "x" : 1397.963676744727, "y" : -678.5681077826422, "trait" : "line", "color" : "FA2E49" }, /* 235 */ { "x" : 1398.0066964285713, "y" : -686.9531817436218, "trait" : "line", "color" : "DEFE2E" }, /* 236 */ { "x" : 1411.6227678571427, "y" : -686.9531817436218, "trait" : "line", "color" : "DEFE2E" }, /* 237 */ { "x" : 1407.5379464285713, "y" : -686.9531817436218, "trait" : "line", "color" : "FA2E49" }, /* 238 */ { "x" : 1421.1540178571427, "y" : -686.9531817436218, "trait" : "line", "color" : "FA2E49" },  /* 239 */ { "x" : 5.00006103515625, "y" : -785.3229217529297, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO" ], "trait" : "kickOffBarrier" }, /* 240 */ { "x" : 6.00006103515625, "y" : 757.7882690429688, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO" ], "trait" : "kickOffBarrier" }, /* 241 */ { "x" : -3.99993896484375, "y" : -785.3229217529297, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["blueKO" ], "trait" : "kickOffBarrier" }, /* 242 */ { "x" : -3.99993896484375, "y" : 756.7882690429688, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["blueKO" ], "trait" : "kickOffBarrier" }  ],  "segments" : [ { "v0" : 29, "v1" : 31, "color" : "ffffff", "trait" : "reargoalNetleft", "x" : -1465 },  { "v0" : 33, "v1" : 35, "color" : "ffffff", "trait" : "reargoalNetright", "x" : 1465 },  { "v0" : 0, "v1" : 1, "trait" : "kickOffBarrier" }, { "v0" : 2, "v1" : 3, "trait" : "kickOffBarrier" },  { "v0" : 4, "v1" : 5, "trait" : "line", "y" : 310 }, { "v0" : 5, "v1" : 7, "trait" : "line", "x" : 1000 }, { "v0" : 6, "v1" : 7, "curve" : 0, "trait" : "line", "y" : -310 }, { "v0" : 8, "v1" : 9, "trait" : "line", "y" : 180 }, { "v0" : 9, "v1" : 11, "curve" : 0, "trait" : "line", "x" : 1130 }, { "v0" : 10, "v1" : 11, "trait" : "line", "y" : -180 }, { "v0" : 12, "v1" : 13, "curve" : -130, "trait" : "line", "x" : 1000 }, { "v0" : 14, "v1" : 15, "trait" : "line", "y" : -310 }, { "v0" : 15, "v1" : 17, "trait" : "line", "x" : -1000 }, { "v0" : 16, "v1" : 17, "trait" : "line", "y" : 310 }, { "v0" : 18, "v1" : 19, "trait" : "line", "y" : -180 }, { "v0" : 19, "v1" : 21, "trait" : "line", "x" : -1130 }, { "v0" : 20, "v1" : 21, "curve" : 0, "trait" : "line", "y" : 180 }, { "v0" : 22, "v1" : 23, "curve" : -130, "trait" : "line", "x" : -1000 }, { "v0" : 24, "v1" : 25, "curve" : -180, "trait" : "line", "x" : 935 }, { "v0" : 26, "v1" : 27, "curve" : -180, "trait" : "line", "x" : -935 }, { "v0" : 24, "v1" : 25, "curve" : 180, "trait" : "line", "x" : 935 }, { "v0" : 26, "v1" : 27, "curve" : 180, "trait" : "line", "x" : -935 }, { "v0" : 24, "v1" : 25, "curve" : -148.65295185187, "trait" : "line", "x" : 935 }, { "v0" : 26, "v1" : 27, "curve" : 90, "trait" : "line", "x" : -935 }, { "v0" : 24, "v1" : 25, "curve" : -90, "trait" : "line", "x" : 935 }, { "v0" : 26, "v1" : 27, "curve" : -90, "trait" : "line", "x" : -935 }, { "v0" : 24, "v1" : 25, "trait" : "line", "x" : 935 }, { "v0" : 26, "v1" : 27, "trait" : "line", "x" : -935 },  { "v0" : 28, "v1" : 29, "curve" : 5, "color" : "ffffff", "trait" : "sidegoalNet", "y" : 135 }, { "v0" : 30, "v1" : 31, "curve" : -5, "color" : "ffffff", "trait" : "sidegoalNet", "y" : -135 }, { "v0" : 32, "v1" : 33, "curve" : -5, "color" : "ffffff", "trait" : "sidegoalNet", "y" : 135, "pos" : [1400,135 ] }, { "v0" : 34, "v1" : 35, "curve" : 5, "color" : "ffffff", "trait" : "sidegoalNet", "y" : -135, "pos" : [1400,-135 ] },  { "v0" : 36, "v1" : 37, "curve" : -180, "trait" : "line" }, { "v0" : 38, "v1" : 39, "curve" : 180, "trait" : "line" }, { "v0" : 36, "v1" : 37, "curve" : -90, "trait" : "line" }, { "v0" : 38, "v1" : 39, "curve" : 90, "trait" : "line" }, { "v0" : 40, "v1" : 41, "color" : "ffffff", "trait" : "line" }, { "v0" : 42, "v1" : 43, "color" : "ffffff", "trait" : "line" }, { "v0" : 44, "v1" : 45, "color" : "ffffff", "trait" : "line" }, { "v0" : 46, "v1" : 47, "color" : "ffffff", "trait" : "line" },  { "v0" : 49, "v1" : 48, "curve" : -178.857292466234, "vis" : false, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["blueKO" ], "trait" : "kickOffBarrier" }, { "v0" : 51, "v1" : 50, "curve" : 179.37583755680356, "vis" : false, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO" ], "trait" : "kickOffBarrier" },  { "v0" : 52, "v1" : 53, "curve" : 40, "vis" : true, "color" : "576C46", "bCoef" : -5.5, "cMask" : ["ball" ], "trait" : "line", "x" : -1220 }, { "v0" : 54, "v1" : 55, "curve" : -40, "vis" : true, "color" : "576C46", "bCoef" : -5.5, "cMask" : ["ball" ], "trait" : "line", "x" : 1220 }, { "v0" : 56, "v1" : 57, "curve" : -40, "vis" : true, "color" : "576C46", "bCoef" : -5.5, "cMask" : ["ball" ], "trait" : "line", "x" : -1220 }, { "v0" : 58, "v1" : 59, "curve" : 40, "vis" : true, "color" : "576C46", "bCoef" : -5.5, "cMask" : ["ball" ], "trait" : "line", "x" : 1220 }, { "v0" : 60, "v1" : 61, "curve" : -60, "vis" : true, "color" : "576C46", "bCoef" : -3.45, "cMask" : ["ball" ], "trait" : "line" }, { "v0" : 62, "v1" : 63, "curve" : 60, "vis" : true, "color" : "576C46", "bCoef" : -3.45, "cMask" : ["ball" ], "trait" : "line" }, { "v0" : 64, "v1" : 65, "curve" : -75, "vis" : true, "color" : "576C46", "bCoef" : -3.45, "cMask" : ["ball" ], "trait" : "line" }, { "v0" : 66, "v1" : 67, "curve" : 75, "vis" : true, "color" : "576C46", "bCoef" : -3.45, "cMask" : ["ball" ], "trait" : "line" },  { "v0" : 57, "v1" : 68, "vis" : true, "bCoef" : 0, "cMask" : ["ball" ], "y" : -310 }, { "v0" : 56, "v1" : 69, "vis" : true, "cMask" : ["ball" ], "y" : -180 }, { "v0" : 73, "v1" : 72, "vis" : true, "cMask" : ["ball" ], "y" : 180 }, { "v0" : 71, "v1" : 70, "vis" : true, "cMask" : ["ball" ], "y" : 310 }, { "v0" : 79, "v1" : 81, "vis" : true, "color" : "000000", "cMask" : ["ball" ], "y" : 180 }, { "v0" : 78, "v1" : 80, "vis" : true, "color" : "000000", "cMask" : ["ball" ], "y" : 310 }, { "v0" : 74, "v1" : 77, "vis" : true, "color" : "000000", "cMask" : ["ball" ], "y" : -310 }, { "v0" : 75, "v1" : 76, "vis" : true, "color" : "000000", "cMask" : ["ball" ], "y" : -180 },  { "v0" : 82, "v1" : 83, "curve" : 0, "vis" : true, "color" : "5E844D", "trait" : "line", "y" : -575 }, { "v0" : 84, "v1" : 85, "curve" : 0, "vis" : true, "color" : "5E844D", "trait" : "line", "y" : 575 }, { "v0" : 86, "v1" : 87, "curve" : 101.39698978806615, "vis" : true, "color" : "5E844D", "trait" : "line" }, { "v0" : 88, "v1" : 89, "curve" : 101.39698978806615, "vis" : true, "color" : "5E844D", "trait" : "line" }, { "v0" : 90, "v1" : 91, "curve" : 101.39698978806615, "vis" : true, "color" : "5E844D", "trait" : "line" }, { "v0" : 92, "v1" : 93, "curve" : 101.39698978806615, "vis" : true, "color" : "5E844D", "trait" : "line" }, { "v0" : 94, "v1" : 95, "vis" : true, "color" : "C7E6BD", "trait" : "line" }, { "v0" : 96, "v1" : 97, "vis" : true, "color" : "DEFE2E", "trait" : "line" }, { "v0" : 98, "v1" : 99, "vis" : true, "color" : "FA2E49", "trait" : "line" }, { "v0" : 100, "v1" : 101, "vis" : true, "color" : "DEFE2E", "trait" : "line" }, { "v0" : 102, "v1" : 103, "vis" : true, "color" : "FA2E49", "trait" : "line" },  { "v0" : 105, "v1" : 106, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 107, "v1" : 108, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 109, "v1" : 110, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 111, "v1" : 112, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 113, "v1" : 114, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 115, "v1" : 116, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 117, "v1" : 118, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 119, "v1" : 120, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 121, "v1" : 122, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 123, "v1" : 124, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 125, "v1" : 126, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 127, "v1" : 128, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 129, "v1" : 130, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 131, "v1" : 132, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 133, "v1" : 134, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 135, "v1" : 136, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 137, "v1" : 138, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 139, "v1" : 140, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 141, "v1" : 142, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 143, "v1" : 144, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 145, "v1" : 146, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 147, "v1" : 148, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 149, "v1" : 150, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 151, "v1" : 152, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 153, "v1" : 154, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 155, "v1" : 156, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 157, "v1" : 158, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 159, "v1" : 160, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 161, "v1" : 162, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 163, "v1" : 164, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 165, "v1" : 166, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 167, "v1" : 168, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 169, "v1" : 170, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 171, "v1" : 172, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 173, "v1" : 174, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 175, "v1" : 176, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" },  { "v0" : 177, "v1" : 178, "vis" : true, "color" : "DEFE2E", "trait" : "line" }, { "v0" : 179, "v1" : 180, "vis" : true, "color" : "FA2E49", "trait" : "line" }, { "v0" : 181, "v1" : 182, "vis" : true, "color" : "DEFE2E", "trait" : "line" }, { "v0" : 183, "v1" : 184, "vis" : true, "color" : "FA2E49", "trait" : "line" }, { "v0" : 185, "v1" : 186, "vis" : true, "color" : "C7E6BD", "trait" : "line" }, { "v0" : 187, "v1" : 188, "vis" : true, "color" : "DEFE2E", "trait" : "line" }, { "v0" : 189, "v1" : 190, "vis" : true, "color" : "FA2E49", "trait" : "line" }, { "v0" : 191, "v1" : 192, "vis" : true, "color" : "DEFE2E", "trait" : "line" }, { "v0" : 193, "v1" : 194, "vis" : true, "color" : "FA2E49", "trait" : "line" }, { "v0" : 195, "v1" : 196, "vis" : true, "color" : "DEFE2E", "trait" : "line" }, { "v0" : 197, "v1" : 198, "vis" : true, "color" : "FA2E49", "trait" : "line" }, { "v0" : 199, "v1" : 200, "vis" : true, "color" : "DEFE2E", "trait" : "line" }, { "v0" : 201, "v1" : 202, "vis" : true, "color" : "FA2E49", "trait" : "line" }, { "v0" : 203, "v1" : 204, "vis" : true, "color" : "C7E6BD", "trait" : "line" }, { "v0" : 205, "v1" : 206, "vis" : true, "color" : "DEFE2E", "trait" : "line" }, { "v0" : 207, "v1" : 208, "vis" : true, "color" : "FA2E49", "trait" : "line" }, { "v0" : 209, "v1" : 210, "vis" : true, "color" : "DEFE2E", "trait" : "line" }, { "v0" : 211, "v1" : 212, "vis" : true, "color" : "FA2E49", "trait" : "line" }, { "v0" : 213, "v1" : 214, "vis" : true, "color" : "DEFE2E", "trait" : "line" }, { "v0" : 215, "v1" : 216, "vis" : true, "color" : "FA2E49", "trait" : "line" }, { "v0" : 217, "v1" : 218, "vis" : true, "color" : "DEFE2E", "trait" : "line" }, { "v0" : 219, "v1" : 220, "vis" : true, "color" : "FA2E49", "trait" : "line" }, { "v0" : 221, "v1" : 222, "vis" : true, "color" : "C7E6BD", "trait" : "line" }, { "v0" : 223, "v1" : 224, "vis" : true, "color" : "DEFE2E", "trait" : "line" }, { "v0" : 225, "v1" : 226, "vis" : true, "color" : "FA2E49", "trait" : "line" }, { "v0" : 227, "v1" : 228, "vis" : true, "color" : "DEFE2E", "trait" : "line" }, { "v0" : 229, "v1" : 230, "vis" : true, "color" : "FA2E49", "trait" : "line" }, { "v0" : 231, "v1" : 232, "vis" : true, "color" : "DEFE2E", "trait" : "line" }, { "v0" : 233, "v1" : 234, "vis" : true, "color" : "FA2E49", "trait" : "line" }, { "v0" : 235, "v1" : 236, "vis" : true, "color" : "DEFE2E", "trait" : "line" }, { "v0" : 237, "v1" : 238, "vis" : true, "color" : "FA2E49", "trait" : "line" },  { "v0" : 239, "v1" : 240, "vis" : false, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO" ], "trait" : "kickOffBarrier" }, { "v0" : 241, "v1" : 242, "vis" : false, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["blueKO" ], "trait" : "kickOffBarrier" }  ],  "goals" : [ { "p0" : [-1410,135 ], "p1" : [-1410,-135 ], "team" : "red" }, { "p0" : [1410,135 ], "p1" : [1410,-135 ], "team" : "blue" }  ],  "discs" : [ { "pos" : [-1400,135 ], "trait" : "goalPost", "x" : -1400, "y" : 135 }, { "pos" : [-1400,-135 ], "trait" : "goalPost", "x" : -1400 }, { "pos" : [1400,135 ], "trait" : "goalPost", "y" : 135 }, { "pos" : [1400,-135 ], "trait" : "goalPost", "y" : -135 },  { "pos" : [-1515,190 ], "trait" : "stanchion", "x" : -1515, "y" : 190 }, { "pos" : [-1515,-190 ], "trait" : "stanchion" }, { "pos" : [1515,190 ], "trait" : "stanchion", "x" : 1515, "y" : 190 }, { "pos" : [1515,-190 ], "trait" : "stanchion", "x" : 1515, "y" : -190 },  { "pos" : [1400,-659 ], "trait" : "cornerflag" }, { "pos" : [1401,660 ], "trait" : "cornerflag" }, { "pos" : [-1399.651123046875,662.0468723773956 ], "trait" : "cornerflag" }, { "pos" : [-1398.651123046875,-659.6199214458466 ], "trait" : "cornerflag" }  ],  "planes" : [ { "normal" : [0,1 ], "dist" : -700, "bCoef" : 0, "trait" : "ballArea" }, { "normal" : [0,-1 ], "dist" : -700, "bCoef" : 0, "trait" : "ballArea" },  { "normal" : [0,1 ], "dist" : -785, "bCoef" : 0 }, { "normal" : [0,-1 ], "dist" : -757, "bCoef" : 0 }, { "normal" : [1,0 ], "dist" : -1587, "bCoef" : 0 }, { "normal" : [-1,0 ], "dist" : -1594, "bCoef" : 0.1 }, { "normal" : [1,0 ], "dist" : -1465, "bCoef" : 0, "cMask" : ["ball" ] }, { "normal" : [-1,0 ], "dist" : -1465, "bCoef" : 0, "cMask" : ["ball" ] }  ],  "traits" : { "ballArea" : { "vis" : false, "bCoef" : 0, "cMask" : ["ball" ] }, "goalPost" : { "radius" : 5, "invMass" : 0, "bCoef" : 2 }, "stanchion" : { "radius" : 3, "invMass" : 0, "bCoef" : 3, "cMask" : ["none" ] }, "cornerflag" : { "radius" : 3, "invMass" : 0, "bCoef" : 0.5, "color" : "FFFF00", "cGroup" : [ ] }, "reargoalNetleft" : { "vis" : true, "bCoef" : 0.1, "cMask" : ["ball","red","blue" ], "curve" : 10, "color" : "C7E6BD" }, "reargoalNetright" : { "vis" : true, "bCoef" : 0.1, "cMask" : ["ball","red","blue" ], "curve" : -10, "color" : "C7E6BD" }, "sidegoalNet" : { "vis" : true, "bCoef" : 1, "cMask" : ["ball","red","blue" ], "color" : "C7E6BD" }, "kickOffBarrier" : { "vis" : false, "bCoef" : 0.1, "cGroup" : ["redKO","blueKO" ], "cMask" : ["red","blue" ] }, "line" : { "vis" : true, "cMask" : [ ], "color" : "C7E6BD" }, "tunnel" : { "vis" : true, "cMask" : ["red","blue" ], "color" : "000000" }, "advertising" : { "vis" : true, "cMask" : ["red","blue" ], "color" : "333333" }, "teambench" : { "vis" : true, "cMask" : [ ], "color" : "000000" }, "manager" : { "radius" : 15, "vis" : true, "cMask" : ["red","blue" ], "invMass" : 0, "color" : "333333" }, "physio" : { "radius" : 15, "vis" : true, "cMask" : ["red","blue" ], "invMass" : 0, "color" : "666666" }, "redsubs" : { "radius" : 15, "vis" : true, "cMask" : ["red","blue" ], "invMass" : 0, "color" : "E56E56" }, "bluesubs" : { "radius" : 15, "vis" : true, "cMask" : ["red","blue" ], "invMass" : 0, "color" : "5689E5" }  } }`;
var penalti = `{  "name" : "R.S. Penaltılar",  "width" : 420,  "height" : 200,  "spawnDistance" : 300,  "bg" : { "type" : "hockey", "width" : 500, "height" : 250, "kickOffRadius" : 10, "cornerRadius" : 0 },  "vertexes" : [ /* 0 */ { "x" : 420, "y" : 600, "trait" : "ballArea" }, /* 1 */ { "x" : 420, "y" : -600, "trait" : "ballArea" },  /* 2 */ { "x" : 283, "y" : 500, "trait" : "gkArea", "cMask" : ["blue" ] }, /* 3 */ { "x" : 283, "y" : -500, "trait" : "gkArea", "cMask" : ["blue" ] }, /* 4 */ { "x" : 335, "y" : 500, "trait" : "gkArea" }, /* 5 */ { "x" : 335, "y" : -500, "trait" : "gkArea" },  /* 6 */ { "x" : -475, "y" : -200, "trait" : "penArea" }, /* 7 */ { "x" : -10, "y" : -190, "trait" : "penArea" }, /* 8 */ { "x" : -10, "y" : 190, "trait" : "penArea" }, /* 9 */ { "x" : -475, "y" : 200, "trait" : "penArea" },  /* 10 */ { "x" : 300, "y" : -250, "trait" : "line", "color" : "1414FF" }, /* 11 */ { "x" : 300, "y" : 250, "trait" : "line", "color" : "1414FF" }, /* 12 */ { "x" : 0, "y" : 9, "trait" : "line", "color" : "00BFFF" }, /* 13 */ { "x" : 0, "y" : -9, "trait" : "line", "color" : "00BFFF" }, /* 14 */ { "x" : 0, "y" : 9, "trait" : "line", "color" : "00BFFF" }, /* 15 */ { "x" : 0, "y" : -9, "trait" : "line", "color" : "00BFFF" }, /* 16 */ { "x" : 175, "y" : -175, "trait" : "line", "color" : "1414FF" }, /* 17 */ { "x" : 300, "y" : -175, "trait" : "line", "color" : "1414FF" }, /* 18 */ { "x" : 175, "y" : 175, "trait" : "line", "color" : "1414FF" }, /* 19 */ { "x" : 300, "y" : 175, "trait" : "line", "color" : "1414FF" }, /* 20 */ { "x" : -120, "y" : -250, "trait" : "line", "color" : "FF1414" }, /* 21 */ { "x" : -120, "y" : 250, "trait" : "line", "color" : "FF1414" }, /* 22 */ { "x" : -120, "y" : -190, "trait" : "line", "color" : "FF1414" }, /* 23 */ { "x" : -120, "y" : 190, "trait" : "line", "color" : "FF1414" }, /* 24 */ { "x" : 300, "y" : -100, "trait" : "line", "color" : "1414FF" }, /* 25 */ { "x" : 350, "y" : -98, "trait" : "line", "color" : "1414FF" }, /* 26 */ { "x" : 350, "y" : 98, "trait" : "line", "color" : "1414FF" }, /* 27 */ { "x" : 300, "y" : 100, "trait" : "line", "color" : "1414FF" },  /* 28 */ { "x" : 0, "y" : -15, "trait" : "powerboost" }, /* 29 */ { "x" : 0, "y" : 15, "trait" : "powerboost" },  /* 30 */ { "x" : 400, "y" : -135, "trait" : "line", "color" : "1414FF" }, /* 31 */ { "x" : 400, "y" : 135, "trait" : "line", "color" : "1414FF" }, /* 32 */ { "x" : -119, "y" : -113, "curve" : 0, "vis" : false, "trait" : "line", "color" : "808080" }, /* 33 */ { "x" : 298, "y" : -112, "curve" : 0, "vis" : false, "trait" : "line", "color" : "808080" },  /* 34 */ { "x" : 87, "y" : 112, "curve" : 0 }, /* 35 */ { "x" : 87, "y" : 112, "curve" : 0 }, /* 36 */ { "x" : -21, "y" : -252, "curve" : 0, "vis" : false }, /* 37 */ { "x" : -17, "y" : 247, "curve" : 0, "vis" : false },  /* 38 */ { "x" : -119, "y" : 113, "curve" : 0, "vis" : false, "trait" : "line", "color" : "808080" }, /* 39 */ { "x" : 298, "y" : 113, "curve" : 0, "vis" : false, "trait" : "line", "color" : "808080" },  /* 40 */ { "bCoef" : 3, "trait" : "goalPost", "x" : -394.29999923706055, "y" : -16.600006103515625 }, /* 41 */ { "bCoef" : 3, "trait" : "goalPost", "x" : 685.7000007629395, "y" : 95.39999389648438 },  /* 42 */ { "x" : 335, "y" : 500, "trait" : "gkArea", "curve" : 190 }, /* 43 */ { "x" : 335, "y" : -500, "trait" : "gkArea", "curve" : 190 }, /* 44 */ { "bCoef" : 0, "cMask" : ["blue" ], "trait" : "gkArea", "x" : 298.70000076293945, "y" : -99.60000610351562 }, /* 45 */ { "bCoef" : 0, "cMask" : ["blue" ], "trait" : "gkArea", "x" : 294.70000076293945, "y" : -98.60000610351562, "vis" : true, "color" : "1414FF" }, /* 46 */ { "bCoef" : 0, "cMask" : ["blue" ], "trait" : "gkArea", "x" : 257.70000076293945, "y" : -10.600006103515625, "curve" : -95.14842808998041, "vis" : true, "color" : "1414FF" }, /* 47 */ { "bCoef" : 0, "cMask" : ["blue" ], "trait" : "gkArea", "x" : 296.70000076293945, "y" : 95.39999389648438, "curve" : -95.14842808998041, "vis" : true, "color" : "1414FF" }  ],  "segments" : [ { "v0" : 0, "v1" : 1, "trait" : "ballArea" },  { "v0" : 4, "v1" : 5, "trait" : "gkArea", "curve" : 11.642296180133648 },  { "v0" : 6, "v1" : 7, "trait" : "penArea" }, { "v0" : 7, "v1" : 8, "trait" : "penArea", "curve" : 50 }, { "v0" : 8, "v1" : 9, "trait" : "penArea" }, { "v0" : 9, "v1" : 6, "trait" : "penArea" },  { "v0" : 10, "v1" : 11, "trait" : "line", "color" : "1414FF" }, { "v0" : 12, "v1" : 13, "trait" : "line", "curve" : -180, "color" : "00BFFF" }, { "v0" : 14, "v1" : 15, "trait" : "line", "curve" : 180, "color" : "00BFFF" }, { "v0" : 16, "v1" : 17, "trait" : "line", "color" : "1414FF" }, { "v0" : 16, "v1" : 18, "trait" : "line", "color" : "1414FF" }, { "v0" : 18, "v1" : 19, "trait" : "line", "color" : "1414FF" }, { "v0" : 20, "v1" : 21, "trait" : "line", "color" : "FF1414" }, { "v0" : 22, "v1" : 23, "trait" : "line", "curve" : -140, "color" : "FF1414" },  { "v0" : 24, "v1" : 25, "trait" : "goalnet", "curve" : 10, "color" : "1414FF" }, { "v0" : 25, "v1" : 26, "trait" : "goalnet", "curve" : 10, "color" : "1414FF" }, { "v0" : 26, "v1" : 27, "trait" : "goalnet", "curve" : 10, "color" : "1414FF" },  { "v0" : 28, "v1" : 29, "trait" : "powerboost", "curve" : 180 },  { "v0" : 25, "v1" : 30, "trait" : "line", "color" : "1414FF" }, { "v0" : 26, "v1" : 31, "trait" : "line", "color" : "1414FF" }, { "curve" : 0, "vis" : false, "color" : "808080", "v0" : 32, "v1" : 33, "trait" : "line" },  { "curve" : 0, "vis" : true, "color" : "00BFFF", "v0" : 34, "v1" : 35, "x" : 87, "y" : 112 },  { "curve" : 0, "vis" : false, "color" : "808080", "v0" : 38, "v1" : 39, "trait" : "line" },  { "curve" : -44.962757801994314, "vis" : true, "bCoef" : 0, "cMask" : ["blue" ], "trait" : "gkArea", "v0" : 45, "v1" : 46, "color" : "1414FF" }, { "curve" : -44.962757801994314, "vis" : true, "bCoef" : 0, "cMask" : ["blue" ], "trait" : "gkArea", "v0" : 46, "v1" : 47, "color" : "1414FF" }, { "curve" : -44.962757801994314, "vis" : true, "bCoef" : 0, "cMask" : ["blue" ], "trait" : "gkArea", "v0" : 45, "v1" : 45 }  ],  "goals" : [ { "p0" : [300,100 ], "p1" : [300,-100 ], "team" : "blue", "color" : "1414FF" }, { "p0" : [-13,250 ], "p1" : [-13,-250 ], "team" : "red" }, { "team" : "red", "p0" : [297.70000076293945,-113.60000610351562 ], "p1" : [-396.29999923706055,-17.600006103515625 ] }, { "team" : "red", "p0" : [299.70000076293945,112.39999389648438 ], "p1" : [-396.29999923706055,-15.600006103515625 ] }  ],  "discs" : [ { "pos" : [300,100 ], "trait" : "goalPost", "bCoef" : 3, "radius" : 8, "color" : "DEFFE8" }, { "pos" : [300,-100 ], "trait" : "goalPost", "bCoef" : 3, "radius" : 8, "color" : "DEFFE8" },  { "pos" : [400,-135 ], "trait" : "stanchion" }, { "pos" : [400,135 ], "trait" : "stanchion" }  ],  "planes" : [ { "normal" : [0,1 ], "dist" : -200, "trait" : "ballArea" }, { "normal" : [0,-1 ], "dist" : -200, "trait" : "ballArea" },  { "normal" : [0,1 ], "dist" : -250, "bCoef" : 0.1 }, { "normal" : [0,-1 ], "dist" : -250, "bCoef" : 0.1 }, { "normal" : [1,0 ], "dist" : -400, "bCoef" : 0.1 }, { "normal" : [-1,0 ], "dist" : -410, "bCoef" : 0.1 }  ],  "traits" : { "ballArea" : { "vis" : false, "bCoef" : 1, "cMask" : ["ball" ] }, "gkArea" : { "vis" : false, "bCoef" : 0, "cMask" : ["blue" ] }, "penArea" : { "vis" : false, "bCoef" : 0, "cMask" : ["red" ] }, "line" : { "vis" : true, "color" : "C7E6BD", "cMask" : [ ] }, "goalnet" : { "vis" : true, "bCoef" : 0.1, "color" : "C7E6BD", "cMask" : ["ball","red","blue" ] }, "powerboost" : { "vis" : false, "bCoef" : -2.4, "cMask" : ["ball" ], "color" : "C7E6BD" }, "goalPost" : { "radius" : 5, "invMass" : 0, "bCoef" : 1.3, "color" : "FFFFFF" }, "stanchion" : { "radius" : 3, "invMass" : 0, "bCoef" : 1, "color" : "FFFFFF" }  } }`;
var RSHLMap2 = ` { "name" : "| R.S. Yaylı v6 |",  "width" : 1600,  "height" : 850,  "spawnDistance" : 770,  "bg" : { "type" : "grass", "width" : 1400, "height" : 660, "kickOffRadius" : 180, "cornerRadius" : 0 },  "playerPhysics" : { "bCoef" : 0.5, "invMass" : 0.5, "damping" : 0.96101, "acceleration" : 0.1201, "kickingAcceleration" : 0.07, "kickingDamping" : 0.9605, "kickStrength" : 5.8652  },  "ballPhysics" : { "radius" : 8, "bCoef" : 0.5, "invMass" : 1, "damping" : 0.9902, "color" : "FFFFFF", "cMask" : [ "all" ], "cGroup" : [ "ball" ]  },  "vertexes" : [ /* 0 */ { "x" : 0, "y" : 758, "trait" : "kickOffBarrier" }, /* 1 */ { "x" : 0, "y" : 180, "trait" : "kickOffBarrier" }, /* 2 */ { "x" : 0, "y" : -180, "trait" : "kickOffBarrier" }, /* 3 */ { "x" : 0, "y" : -785, "trait" : "kickOffBarrier" },  /* 4 */ { "x" : 1398, "y" : 310, "trait" : "line" }, /* 5 */ { "x" : 1000, "y" : 310, "trait" : "line" }, /* 6 */ { "x" : 1398, "y" : -310, "trait" : "line", "curve" : 0 }, /* 7 */ { "x" : 1000, "y" : -310, "trait" : "line", "curve" : 0 }, /* 8 */ { "x" : 1398, "y" : 180, "trait" : "line" }, /* 9 */ { "x" : 1263, "y" : 180, "trait" : "line", "curve" : 0 }, /* 10 */ { "x" : 1398, "y" : -180, "trait" : "line" }, /* 11 */ { "x" : 1263, "y" : -180, "trait" : "line", "curve" : 0 }, /* 12 */ { "x" : 1000, "y" : -150, "trait" : "line", "curve" : -130 }, /* 13 */ { "x" : 1000, "y" : 150, "trait" : "line", "curve" : -130 }, /* 14 */ { "x" : -1400, "y" : -310, "trait" : "line" }, /* 15 */ { "x" : -1000, "y" : -310, "trait" : "line" }, /* 16 */ { "x" : -1400, "y" : 310, "trait" : "line" }, /* 17 */ { "x" : -1000, "y" : 310, "trait" : "line" }, /* 18 */ { "x" : -1400, "y" : -180, "trait" : "line" }, /* 19 */ { "x" : -1262, "y" : -180, "trait" : "line" }, /* 20 */ { "x" : -1400, "y" : 180, "trait" : "line", "curve" : 0 }, /* 21 */ { "x" : -1262, "y" : 180, "trait" : "line", "curve" : 0 }, /* 22 */ { "x" : -1000, "y" : 150, "trait" : "line", "curve" : -130 }, /* 23 */ { "x" : -1000, "y" : -150, "trait" : "line", "curve" : -130 }, /* 24 */ { "x" : 1130, "y" : 0, "trait" : "line" }, /* 25 */ { "x" : 1130, "y" : -8, "trait" : "line" }, /* 26 */ { "x" : -1128, "y" : 1, "trait" : "line" }, /* 27 */ { "x" : -1128, "y" : -7, "trait" : "line" }, /* 28 */ { "x" : -1397, "y" : 135, "trait" : "line", "color" : "ffffff" }, /* 29 */ { "x" : -1465, "y" : 135, "trait" : "line", "color" : "ffffff" }, /* 30 */ { "x" : -1397, "y" : -135, "trait" : "line", "color" : "ffffff", "curve" : -5 }, /* 31 */ { "x" : -1465, "y" : -135, "trait" : "line", "color" : "ffffff", "curve" : -5 }, /* 32 */ { "x" : 1398, "y" : 135, "trait" : "line", "color" : "ffffff", "pos" : [1400,135 ] }, /* 33 */ { "x" : 1465, "y" : 135, "trait" : "line", "color" : "ffffff", "pos" : [1400,135 ] }, /* 34 */ { "x" : 1398, "y" : -135, "trait" : "line", "color" : "ffffff", "pos" : [1400,-135 ] }, /* 35 */ { "x" : 1465, "y" : -135, "trait" : "line", "color" : "ffffff", "pos" : [1400,-135 ] }, /* 36 */ { "x" : 0, "y" : -4, "trait" : "line" }, /* 37 */ { "x" : 0, "y" : 4, "trait" : "line" }, /* 38 */ { "x" : 0, "y" : -4, "trait" : "line" }, /* 39 */ { "x" : 0, "y" : 4, "trait" : "line" }, /* 40 */ { "x" : -1465, "y" : 135, "trait" : "line", "color" : "ffffff" }, /* 41 */ { "x" : -1515, "y" : 190, "trait" : "line", "color" : "ffffff", "pos" : [-1515,190 ] }, /* 42 */ { "x" : -1465, "y" : -135, "trait" : "line", "color" : "ffffff" }, /* 43 */ { "x" : -1515, "y" : -190, "trait" : "line", "color" : "ffffff", "pos" : [-1250,-150 ] }, /* 44 */ { "x" : 1465, "y" : 135, "trait" : "line", "color" : "ffffff", "pos" : [1400,135 ] }, /* 45 */ { "x" : 1515, "y" : 190, "trait" : "line", "color" : "ffffff", "pos" : [1515,190 ] }, /* 46 */ { "x" : 1465, "y" : -135, "trait" : "line", "color" : "ffffff", "pos" : [1400,-135 ] }, /* 47 */ { "x" : 1515, "y" : -190, "trait" : "line", "color" : "ffffff", "pos" : [1515,-190 ] },  /* 48 */ { "x" : -0.8411691949913092, "y" : 181.70623074049965, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["blueKO" ], "trait" : "kickOffBarrier", "curve" : -160.5 }, /* 49 */ { "x" : 0.6980143617980445, "y" : -180.28516742489984, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["blueKO" ], "trait" : "kickOffBarrier", "curve" : -160.5 }, /* 50 */ { "x" : 0.1357807900351844, "y" : 180.11207280820105, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO" ], "trait" : "kickOffBarrier", "curve" : 154 }, /* 51 */ { "x" : 0.7169100816519887, "y" : -179.87947197937916, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO" ], "trait" : "kickOffBarrier", "curve" : 154 },  /* 52 */ { "x" : -1427, "y" : 180, "bCoef" : -5.5, "cMask" : ["ball" ], "trait" : "line", "curve" : 40, "color" : "576C46" }, /* 53 */ { "x" : -1427, "y" : 310, "bCoef" : -5.5, "cMask" : ["ball" ], "trait" : "line", "curve" : 40, "color" : "576C46" }, /* 54 */ { "x" : 1428, "y" : 180, "bCoef" : -5.5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "576C46" }, /* 55 */ { "x" : 1428, "y" : 310, "bCoef" : -5.5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "576C46" }, /* 56 */ { "x" : -1427, "y" : -180, "bCoef" : -5.5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "576C46" }, /* 57 */ { "x" : -1427, "y" : -310, "bCoef" : -5.5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "576C46" }, /* 58 */ { "x" : 1428, "y" : -180, "bCoef" : -5.5, "cMask" : ["ball" ], "trait" : "line", "curve" : 40, "color" : "576C46" }, /* 59 */ { "x" : 1428, "y" : -310, "bCoef" : -5.5, "cMask" : ["ball" ], "trait" : "line", "curve" : 40, "color" : "576C46" }, /* 60 */ { "x" : 1413, "y" : -653, "bCoef" : -3.45, "cMask" : ["ball" ], "trait" : "line", "curve" : -60, "color" : "576C46" }, /* 61 */ { "x" : 1443, "y" : -633, "bCoef" : -3.45, "cMask" : ["ball" ], "trait" : "line", "curve" : -60, "color" : "576C46" }, /* 62 */ { "x" : 1413, "y" : 653, "bCoef" : -3.45, "cMask" : ["ball" ], "trait" : "line", "curve" : 60, "color" : "576C46" }, /* 63 */ { "x" : 1443, "y" : 633, "bCoef" : -3.45, "cMask" : ["ball" ], "trait" : "line", "curve" : 60, "color" : "576C46" }, /* 64 */ { "x" : -1413, "y" : 653, "bCoef" : -3.45, "cMask" : ["ball" ], "trait" : "line", "curve" : -75, "color" : "576C46" }, /* 65 */ { "x" : -1443, "y" : 633, "bCoef" : -3.45, "cMask" : ["ball" ], "trait" : "line", "curve" : -75, "color" : "576C46" }, /* 66 */ { "x" : -1413, "y" : -653, "bCoef" : -3.45, "cMask" : ["ball" ], "trait" : "line", "curve" : 75, "color" : "576C46" }, /* 67 */ { "x" : -1443, "y" : -633, "bCoef" : -3.45, "cMask" : ["ball" ], "trait" : "line", "curve" : 75, "color" : "576C46" },  /* 68 */ { "x" : -1433, "y" : -310, "bCoef" : 0, "cMask" : ["ball" ] }, /* 69 */ { "x" : -1433, "y" : -180, "cMask" : ["ball" ] },  /* 70 */ { "x" : -1427, "y" : 310, "bCoef" : -5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "576C46" },  /* 71 */ { "x" : -1433, "y" : 310, "bCoef" : 0, "cMask" : ["ball" ] },  /* 72 */ { "x" : -1427, "y" : 180, "bCoef" : -5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "576C46" },  /* 73 */ { "x" : -1433, "y" : 180, "cMask" : ["ball" ] }, /* 74 */ { "x" : 1434, "y" : -310, "bCoef" : 0, "cMask" : ["ball" ] }, /* 75 */ { "x" : 1434, "y" : -180, "cMask" : ["ball" ] },  /* 76 */ { "x" : 1428, "y" : -180, "bCoef" : -5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "576C46" }, /* 77 */ { "x" : 1428, "y" : -310, "bCoef" : -5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "576C46" },  /* 78 */ { "x" : 1434, "y" : 310, "bCoef" : 0, "cMask" : ["ball" ] }, /* 79 */ { "x" : 1434, "y" : 180, "cMask" : ["ball" ] },  /* 80 */ { "x" : 1428, "y" : 310, "bCoef" : -5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "576C46" }, /* 81 */ { "x" : 1428, "y" : 180, "bCoef" : -5, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "576C46" }, /* 82 */ { "x" : -1399, "y" : -575, "trait" : "line", "color" : "5E844D", "curve" : 0 }, /* 83 */ { "x" : 1399, "y" : -575, "trait" : "line", "color" : "5E844D", "curve" : 0 }, /* 84 */ { "x" : -1399, "y" : 575, "trait" : "line", "color" : "5E844D", "curve" : 0 }, /* 85 */ { "x" : 1399, "y" : 575, "trait" : "line", "color" : "5E844D", "curve" : 0 }, /* 86 */ { "x" : -1399.484375, "y" : 322.515625, "trait" : "line" }, /* 87 */ { "x" : -1110.484375, "y" : 659.515625, "trait" : "line" }, /* 88 */ { "x" : 1399.635035092499, "y" : -319.2764558771561, "trait" : "line" }, /* 89 */ { "x" : 1117.8329344345261, "y" : -659.7348941564355, "trait" : "line" }, /* 90 */ { "x" : -1113.1248350248002, "y" : -658.6565383524106, "trait" : "line" }, /* 91 */ { "x" : -1399.3634268273672, "y" : -318.33677598281287, "trait" : "line" }, /* 92 */ { "x" : 1101.6178310984292, "y" : 659.9423287742153, "trait" : "line" }, /* 93 */ { "x" : 1398.2083664448207, "y" : 324.5389963159137, "trait" : "line" }, /* 94 */ { "x" : -883, "y" : 34, "bCoef" : -3.7, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "576C46" }, /* 95 */ { "x" : -884, "y" : -44, "bCoef" : -3.7, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "576C46" }, /* 96 */ { "x" : 883, "y" : 35, "bCoef" : -3.7, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "576C46" }, /* 97 */ { "x" : 882, "y" : -43, "bCoef" : -3.7, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "576C46" }, /* 98 */ { "x" : -999.1306971277922, "y" : 368.56038815099055, "bCoef" : -3.7, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "576C46" }, /* 99 */ { "x" : -946.0943959552943, "y" : 311.35767179992814, "bCoef" : -3.7, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "576C46" }, /* 100 */ { "x" : -945.6685405078478, "y" : -305.5627975998843, "bCoef" : -3.7, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "576C46" }, /* 101 */ { "x" : -998.781843670732, "y" : -362.69402397502483, "bCoef" : -3.7, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "576C46" }, /* 102 */ { "x" : 1000.1628103486075, "y" : 367.6274205942262, "bCoef" : -3.7, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "576C46" }, /* 103 */ { "x" : 947.6878973070253, "y" : 309.9092821862838, "bCoef" : -3.7, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "576C46" }, /* 104 */ { "x" : 937.6644781282787, "y" : -307.9534249802982, "bCoef" : -3.7, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "576C46" }, /* 105 */ { "x" : 997.4011078841439, "y" : -358.1185031264618, "bCoef" : -3.7, "cMask" : ["ball" ], "trait" : "line", "curve" : -40, "color" : "576C46" }, /* 106 */ { "x" : -1399.8898822239466, "y" : 685.3333277702332, "trait" : "line" }, /* 107 */ { "x" : -1399.8898822239466, "y" : 662.8333277702332, "trait" : "line" }, /* 108 */ { "x" : -1421.675596509661, "y" : 686.1666102409363, "trait" : "line", "color" : "DEFE2E" }, /* 109 */ { "x" : -1408.0595250810898, "y" : 686.1666102409363, "trait" : "line", "color" : "DEFE2E" }, /* 110 */ { "x" : -1412.144346509661, "y" : 686.1666102409363, "trait" : "line", "color" : "FA2E49" }, /* 111 */ { "x" : -1398.5282750810898, "y" : 686.1666102409363, "trait" : "line", "color" : "FA2E49" }, /* 112 */ { "x" : -1398.571492386553, "y" : 689.4638750342431, "trait" : "line", "color" : "DEFE2E" }, /* 113 */ { "x" : -1412.187447567113, "y" : 689.5155274858153, "trait" : "line", "color" : "DEFE2E" }, /* 114 */ { "x" : -1408.1026610129452, "y" : 689.5000317503436, "trait" : "line", "color" : "FA2E49" }, /* 115 */ { "x" : -1421.7186161935053, "y" : 689.5516842019159, "trait" : "line", "color" : "FA2E49" }, /* 116 */ { "x" : -1399.8510526309224, "y" : 661.1171708331165, "trait" : "line" },  /* 117 */ { "x" : -119.33333587646484, "y" : 822.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 118 */ { "x" : -119.33333587646484, "y" : 837.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 119 */ { "x" : -119.33333587646484, "y" : 793.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 120 */ { "x" : -119.33333587646484, "y" : 808.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 121 */ { "x" : -119.33333587646484, "y" : 762.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 122 */ { "x" : -119.33333587646484, "y" : 777.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 123 */ { "x" : -474.33333587646484, "y" : 819.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 124 */ { "x" : -474.33333587646484, "y" : 834.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 125 */ { "x" : -474.33333587646484, "y" : 791.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 126 */ { "x" : -474.33333587646484, "y" : 806.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 127 */ { "x" : -474.33333587646484, "y" : 761.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 128 */ { "x" : -474.33333587646484, "y" : 776.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 129 */ { "x" : -223.33333587646484, "y" : 762.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 130 */ { "x" : -208.33333587646484, "y" : 762.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 131 */ { "x" : -255.33333587646484, "y" : 762.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 132 */ { "x" : -240.33333587646484, "y" : 762.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 133 */ { "x" : -286.33333587646484, "y" : 762.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 134 */ { "x" : -271.33333587646484, "y" : 762.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 135 */ { "x" : -317.33333587646484, "y" : 762.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 136 */ { "x" : -302.33333587646484, "y" : 762.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 137 */ { "x" : -349.33333587646484, "y" : 762.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 138 */ { "x" : -334.33333587646484, "y" : 762.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 139 */ { "x" : -381.33333587646484, "y" : 762.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 140 */ { "x" : -366.33333587646484, "y" : 762.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 141 */ { "x" : -413.33333587646484, "y" : 762.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 142 */ { "x" : -398.33333587646484, "y" : 762.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 143 */ { "x" : -443.33333587646484, "y" : 762.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 144 */ { "x" : -428.33333587646484, "y" : 762.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 145 */ { "x" : -474.33333587646484, "y" : 762.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 146 */ { "x" : -459.33333587646484, "y" : 762.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 147 */ { "x" : -133.33333587646484, "y" : 762.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 148 */ { "x" : -118.33333587646484, "y" : 762.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 149 */ { "x" : -164.33333587646484, "y" : 763.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 150 */ { "x" : -149.33333587646484, "y" : 763.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 151 */ { "x" : -194.33333587646484, "y" : 762.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 152 */ { "x" : -179.33333587646484, "y" : 762.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 153 */ { "x" : 413.66666412353516, "y" : 823.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 154 */ { "x" : 413.66666412353516, "y" : 838.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 155 */ { "x" : 413.66666412353516, "y" : 794.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 156 */ { "x" : 413.66666412353516, "y" : 809.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 157 */ { "x" : 413.66666412353516, "y" : 763.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 158 */ { "x" : 413.66666412353516, "y" : 778.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 159 */ { "x" : 59.666664123535156, "y" : 820.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 160 */ { "x" : 59.666664123535156, "y" : 835.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 161 */ { "x" : 59.666664123535156, "y" : 792.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 162 */ { "x" : 59.666664123535156, "y" : 807.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 163 */ { "x" : 59.666664123535156, "y" : 762.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 164 */ { "x" : 59.666664123535156, "y" : 777.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 165 */ { "x" : 310.66666412353516, "y" : 763.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 166 */ { "x" : 325.66666412353516, "y" : 763.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 167 */ { "x" : 278.66666412353516, "y" : 763.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 168 */ { "x" : 293.66666412353516, "y" : 763.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 169 */ { "x" : 247.66666412353516, "y" : 763.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 170 */ { "x" : 262.66666412353516, "y" : 763.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 171 */ { "x" : 216.66666412353516, "y" : 763.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 172 */ { "x" : 231.66666412353516, "y" : 763.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 173 */ { "x" : 184.66666412353516, "y" : 763.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 174 */ { "x" : 199.66666412353516, "y" : 763.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 175 */ { "x" : 152.66666412353516, "y" : 763.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 176 */ { "x" : 167.66666412353516, "y" : 763.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 177 */ { "x" : 120.66666412353516, "y" : 763.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 178 */ { "x" : 135.66666412353516, "y" : 763.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 179 */ { "x" : 90.66666412353516, "y" : 763.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 180 */ { "x" : 105.66666412353516, "y" : 763.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 181 */ { "x" : 59.666664123535156, "y" : 763.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 182 */ { "x" : 74.66666412353516, "y" : 763.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 183 */ { "x" : 399.66666412353516, "y" : 764.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 184 */ { "x" : 414.66666412353516, "y" : 764.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 185 */ { "x" : 369.66666412353516, "y" : 764.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 186 */ { "x" : 384.66666412353516, "y" : 764.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 187 */ { "x" : 339.66666412353516, "y" : 763.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" }, /* 188 */ { "x" : 354.66666412353516, "y" : 763.4548950195312, "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea", "color" : "C7E6BD" },  /* 189 */ { "x" : -1398.571492386553, "y" : 691.9638750342431, "trait" : "line", "color" : "DEFE2E" }, /* 190 */ { "x" : -1412.187447567113, "y" : 692.0155274858153, "trait" : "line", "color" : "DEFE2E" }, /* 191 */ { "x" : -1408.1026610129452, "y" : 692.0000317503436, "trait" : "line", "color" : "FA2E49" }, /* 192 */ { "x" : -1421.7186161935053, "y" : 692.0516842019159, "trait" : "line", "color" : "FA2E49" }, /* 193 */ { "x" : -1421.675596509661, "y" : 683.6666102409363, "trait" : "line", "color" : "DEFE2E" }, /* 194 */ { "x" : -1408.0595250810898, "y" : 683.6666102409363, "trait" : "line", "color" : "DEFE2E" }, /* 195 */ { "x" : -1412.144346509661, "y" : 683.6666102409363, "trait" : "line", "color" : "FA2E49" }, /* 196 */ { "x" : -1398.5282750810898, "y" : 683.6666102409363, "trait" : "line", "color" : "FA2E49" }, /* 197 */ { "x" : -1399.113783322848, "y" : -660.8042821681452, "trait" : "line" }, /* 198 */ { "x" : -1399.113783322848, "y" : -684.2265999819103, "trait" : "line" }, /* 199 */ { "x" : -1419.2348612580704, "y" : -688.1303196175377, "trait" : "line", "color" : "DEFE2E" }, /* 200 */ { "x" : -1406.2224624726455, "y" : -688.1303196175377, "trait" : "line", "color" : "DEFE2E" }, /* 201 */ { "x" : -1410.1261821082728, "y" : -688.1303196175377, "trait" : "line", "color" : "FA2E49" }, /* 202 */ { "x" : -1397.113783322848, "y" : -688.1303196175377, "trait" : "line", "color" : "FA2E49" }, /* 203 */ { "x" : -1397.1550845760084, "y" : -684.6978936662059, "trait" : "line", "color" : "DEFE2E" }, /* 204 */ { "x" : -1410.1673722673127, "y" : -684.6441238823576, "trait" : "line", "color" : "DEFE2E" }, /* 205 */ { "x" : -1406.2636859599213, "y" : -684.660254817512, "trait" : "line", "color" : "FA2E49" }, /* 206 */ { "x" : -1419.275973651226, "y" : -684.6064850336637, "trait" : "line", "color" : "FA2E49" }, /* 207 */ { "x" : -1397.1550845760084, "y" : -682.0954139091209, "trait" : "line", "color" : "DEFE2E" }, /* 208 */ { "x" : -1410.1673722673127, "y" : -682.0416441252727, "trait" : "line", "color" : "DEFE2E" }, /* 209 */ { "x" : -1406.2636859599213, "y" : -682.057775060427, "trait" : "line", "color" : "FA2E49" }, /* 210 */ { "x" : -1419.275973651226, "y" : -682.0040052765788, "trait" : "line", "color" : "FA2E49" }, /* 211 */ { "x" : -1419.2348612580704, "y" : -690.7327993746228, "trait" : "line", "color" : "DEFE2E" }, /* 212 */ { "x" : -1406.2224624726455, "y" : -690.7327993746228, "trait" : "line", "color" : "DEFE2E" }, /* 213 */ { "x" : -1410.1261821082728, "y" : -690.7327993746228, "trait" : "line", "color" : "FA2E49" }, /* 214 */ { "x" : -1397.113783322848, "y" : -690.7327993746228, "trait" : "line", "color" : "FA2E49" }, /* 215 */ { "x" : 1400.7767857142858, "y" : 682.6665797233582, "trait" : "line" }, /* 216 */ { "x" : 1400.7767857142858, "y" : 660.1665797233582, "trait" : "line" }, /* 217 */ { "x" : 1398.9910714285713, "y" : 681.4998621940613, "trait" : "line", "color" : "DEFE2E" }, /* 218 */ { "x" : 1412.6071428571427, "y" : 681.4998621940613, "trait" : "line", "color" : "DEFE2E" }, /* 219 */ { "x" : 1408.5223214285713, "y" : 681.4998621940613, "trait" : "line", "color" : "FA2E49" }, /* 220 */ { "x" : 1422.1383928571427, "y" : 681.4998621940613, "trait" : "line", "color" : "FA2E49" }, /* 221 */ { "x" : 1422.0951755516794, "y" : 684.7971269873681, "trait" : "line", "color" : "DEFE2E" }, /* 222 */ { "x" : 1408.4792203711195, "y" : 684.8487794389403, "trait" : "line", "color" : "DEFE2E" }, /* 223 */ { "x" : 1412.5640069252872, "y" : 684.8332837034686, "trait" : "line", "color" : "FA2E49" }, /* 224 */ { "x" : 1398.948051744727, "y" : 684.8849361550409, "trait" : "line", "color" : "FA2E49" }, /* 225 */ { "x" : 1422.0951755516794, "y" : 687.2971269873681, "trait" : "line", "color" : "DEFE2E" }, /* 226 */ { "x" : 1408.4792203711195, "y" : 687.3487794389403, "trait" : "line", "color" : "DEFE2E" }, /* 227 */ { "x" : 1412.5640069252872, "y" : 687.3332837034686, "trait" : "line", "color" : "FA2E49" }, /* 228 */ { "x" : 1398.948051744727, "y" : 687.3849361550409, "trait" : "line", "color" : "FA2E49" }, /* 229 */ { "x" : 1398.9910714285713, "y" : 678.9998621940613, "trait" : "line", "color" : "DEFE2E" }, /* 230 */ { "x" : 1412.6071428571427, "y" : 678.9998621940613, "trait" : "line", "color" : "DEFE2E" }, /* 231 */ { "x" : 1408.5223214285713, "y" : 678.9998621940613, "trait" : "line", "color" : "FA2E49" }, /* 232 */ { "x" : 1422.1383928571427, "y" : 678.9998621940613, "trait" : "line", "color" : "FA2E49" }, /* 233 */ { "x" : 1399.7924107142858, "y" : -657.286464214325, "trait" : "line" }, /* 234 */ { "x" : 1399.7924107142858, "y" : -679.786464214325, "trait" : "line" }, /* 235 */ { "x" : 1398.0066964285713, "y" : -684.4531817436218, "trait" : "line", "color" : "DEFE2E" }, /* 236 */ { "x" : 1411.6227678571427, "y" : -684.4531817436218, "trait" : "line", "color" : "DEFE2E" }, /* 237 */ { "x" : 1407.5379464285713, "y" : -684.4531817436218, "trait" : "line", "color" : "FA2E49" }, /* 238 */ { "x" : 1421.1540178571427, "y" : -684.4531817436218, "trait" : "line", "color" : "FA2E49" }, /* 239 */ { "x" : 1421.1108005516794, "y" : -681.155916950315, "trait" : "line", "color" : "DEFE2E" }, /* 240 */ { "x" : 1407.4948453711195, "y" : -681.1042644987429, "trait" : "line", "color" : "DEFE2E" }, /* 241 */ { "x" : 1411.5796319252872, "y" : -681.1197602342145, "trait" : "line", "color" : "FA2E49" }, /* 242 */ { "x" : 1397.963676744727, "y" : -681.0681077826422, "trait" : "line", "color" : "FA2E49" }, /* 243 */ { "x" : 1421.1108005516794, "y" : -678.655916950315, "trait" : "line", "color" : "DEFE2E" }, /* 244 */ { "x" : 1407.4948453711195, "y" : -678.6042644987429, "trait" : "line", "color" : "DEFE2E" }, /* 245 */ { "x" : 1411.5796319252872, "y" : -678.6197602342145, "trait" : "line", "color" : "FA2E49" }, /* 246 */ { "x" : 1397.963676744727, "y" : -678.5681077826422, "trait" : "line", "color" : "FA2E49" }, /* 247 */ { "x" : 1398.0066964285713, "y" : -686.9531817436218, "trait" : "line", "color" : "DEFE2E" }, /* 248 */ { "x" : 1411.6227678571427, "y" : -686.9531817436218, "trait" : "line", "color" : "DEFE2E" }, /* 249 */ { "x" : 1407.5379464285713, "y" : -686.9531817436218, "trait" : "line", "color" : "FA2E49" }, /* 250 */ { "x" : 1421.1540178571427, "y" : -686.9531817436218, "trait" : "line", "color" : "FA2E49" },  /* 251 */ { "x" : 5.00006103515625, "y" : -785.3229217529297, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO" ], "trait" : "kickOffBarrier" }, /* 252 */ { "x" : 6.00006103515625, "y" : 757.7882690429688, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO" ], "trait" : "kickOffBarrier" }, /* 253 */ { "x" : -3.99993896484375, "y" : -785.3229217529297, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["blueKO" ], "trait" : "kickOffBarrier" }, /* 254 */ { "x" : -3.99993896484375, "y" : 756.7882690429688, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["blueKO" ], "trait" : "kickOffBarrier" }  ],  "segments" : [ { "v0" : 29, "v1" : 31, "color" : "ffffff", "trait" : "reargoalNetleft", "x" : -1465 },  { "v0" : 33, "v1" : 35, "color" : "ffffff", "trait" : "reargoalNetright", "x" : 1465 },  { "v0" : 0, "v1" : 1, "trait" : "kickOffBarrier" }, { "v0" : 2, "v1" : 3, "trait" : "kickOffBarrier" },  { "v0" : 4, "v1" : 5, "trait" : "line", "y" : 310 }, { "v0" : 5, "v1" : 7, "trait" : "line", "x" : 1000 }, { "v0" : 6, "v1" : 7, "curve" : 0, "trait" : "line", "y" : -310 }, { "v0" : 8, "v1" : 9, "trait" : "line", "y" : 180 }, { "v0" : 9, "v1" : 11, "curve" : 0, "trait" : "line", "x" : 1130 }, { "v0" : 10, "v1" : 11, "trait" : "line", "y" : -180 }, { "v0" : 12, "v1" : 13, "curve" : -130, "trait" : "line", "x" : 1000 }, { "v0" : 14, "v1" : 15, "trait" : "line", "y" : -310 }, { "v0" : 15, "v1" : 17, "trait" : "line", "x" : -1000 }, { "v0" : 16, "v1" : 17, "trait" : "line", "y" : 310 }, { "v0" : 18, "v1" : 19, "trait" : "line", "y" : -180 }, { "v0" : 19, "v1" : 21, "trait" : "line", "x" : -1130 }, { "v0" : 20, "v1" : 21, "curve" : 0, "trait" : "line", "y" : 180 }, { "v0" : 22, "v1" : 23, "curve" : -130, "trait" : "line", "x" : -1000 }, { "v0" : 24, "v1" : 25, "curve" : -180, "trait" : "line", "x" : 935 }, { "v0" : 26, "v1" : 27, "curve" : -180, "trait" : "line", "x" : -935 }, { "v0" : 24, "v1" : 25, "curve" : 180, "trait" : "line", "x" : 935 }, { "v0" : 26, "v1" : 27, "curve" : 180, "trait" : "line", "x" : -935 }, { "v0" : 24, "v1" : 25, "curve" : -148.65295185187, "trait" : "line", "x" : 935 }, { "v0" : 26, "v1" : 27, "curve" : 90, "trait" : "line", "x" : -935 }, { "v0" : 24, "v1" : 25, "curve" : -90, "trait" : "line", "x" : 935 }, { "v0" : 26, "v1" : 27, "curve" : -90, "trait" : "line", "x" : -935 }, { "v0" : 24, "v1" : 25, "trait" : "line", "x" : 935 }, { "v0" : 26, "v1" : 27, "trait" : "line", "x" : -935 },  { "v0" : 28, "v1" : 29, "curve" : 5, "color" : "ffffff", "trait" : "sidegoalNet", "y" : 135 }, { "v0" : 30, "v1" : 31, "curve" : -5, "color" : "ffffff", "trait" : "sidegoalNet", "y" : -135 }, { "v0" : 32, "v1" : 33, "curve" : -5, "color" : "ffffff", "trait" : "sidegoalNet", "y" : 135, "pos" : [1400,135 ] }, { "v0" : 34, "v1" : 35, "curve" : 5, "color" : "ffffff", "trait" : "sidegoalNet", "y" : -135, "pos" : [1400,-135 ] },  { "v0" : 36, "v1" : 37, "curve" : -180, "trait" : "line" }, { "v0" : 38, "v1" : 39, "curve" : 180, "trait" : "line" }, { "v0" : 36, "v1" : 37, "curve" : -90, "trait" : "line" }, { "v0" : 38, "v1" : 39, "curve" : 90, "trait" : "line" }, { "v0" : 40, "v1" : 41, "color" : "ffffff", "trait" : "line" }, { "v0" : 42, "v1" : 43, "color" : "ffffff", "trait" : "line" }, { "v0" : 44, "v1" : 45, "color" : "ffffff", "trait" : "line" }, { "v0" : 46, "v1" : 47, "color" : "ffffff", "trait" : "line" },  { "v0" : 49, "v1" : 48, "curve" : -178.857292466234, "vis" : false, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["blueKO" ], "trait" : "kickOffBarrier" }, { "v0" : 51, "v1" : 50, "curve" : 179.37583755680356, "vis" : false, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO" ], "trait" : "kickOffBarrier" },  { "v0" : 52, "v1" : 53, "curve" : 40, "vis" : true, "color" : "576C46", "bCoef" : -5.5, "cMask" : ["ball" ], "trait" : "line", "x" : -1220 }, { "v0" : 54, "v1" : 55, "curve" : -40, "vis" : true, "color" : "576C46", "bCoef" : -5.5, "cMask" : ["ball" ], "trait" : "line", "x" : 1220 }, { "v0" : 56, "v1" : 57, "curve" : -40, "vis" : true, "color" : "576C46", "bCoef" : -5.5, "cMask" : ["ball" ], "trait" : "line", "x" : -1220 }, { "v0" : 58, "v1" : 59, "curve" : 40, "vis" : true, "color" : "576C46", "bCoef" : -5.5, "cMask" : ["ball" ], "trait" : "line", "x" : 1220 }, { "v0" : 60, "v1" : 61, "curve" : -60, "vis" : true, "color" : "576C46", "bCoef" : -3.45, "cMask" : ["ball" ], "trait" : "line" }, { "v0" : 62, "v1" : 63, "curve" : 60, "vis" : true, "color" : "576C46", "bCoef" : -3.45, "cMask" : ["ball" ], "trait" : "line" }, { "v0" : 64, "v1" : 65, "curve" : -75, "vis" : true, "color" : "576C46", "bCoef" : -3.45, "cMask" : ["ball" ], "trait" : "line" }, { "v0" : 66, "v1" : 67, "curve" : 75, "vis" : true, "color" : "576C46", "bCoef" : -3.45, "cMask" : ["ball" ], "trait" : "line" },  { "v0" : 57, "v1" : 68, "vis" : true, "bCoef" : 0, "cMask" : ["ball" ], "y" : -310 }, { "v0" : 56, "v1" : 69, "vis" : true, "cMask" : ["ball" ], "y" : -180 }, { "v0" : 73, "v1" : 72, "vis" : true, "cMask" : ["ball" ], "y" : 180 }, { "v0" : 71, "v1" : 70, "vis" : true, "cMask" : ["ball" ], "y" : 310 }, { "v0" : 79, "v1" : 81, "vis" : true, "color" : "000000", "cMask" : ["ball" ], "y" : 180 }, { "v0" : 78, "v1" : 80, "vis" : true, "color" : "000000", "cMask" : ["ball" ], "y" : 310 }, { "v0" : 74, "v1" : 77, "vis" : true, "color" : "000000", "cMask" : ["ball" ], "y" : -310 }, { "v0" : 75, "v1" : 76, "vis" : true, "color" : "000000", "cMask" : ["ball" ], "y" : -180 },  { "v0" : 82, "v1" : 83, "curve" : 0, "vis" : true, "color" : "5E844D", "trait" : "line", "y" : -575 }, { "v0" : 84, "v1" : 85, "curve" : 0, "vis" : true, "color" : "5E844D", "trait" : "line", "y" : 575 }, { "v0" : 86, "v1" : 87, "curve" : 101.39698978806615, "vis" : true, "color" : "5E844D", "trait" : "line" }, { "v0" : 88, "v1" : 89, "curve" : 101.39698978806615, "vis" : true, "color" : "5E844D", "trait" : "line" }, { "v0" : 90, "v1" : 91, "curve" : 101.39698978806615, "vis" : true, "color" : "5E844D", "trait" : "line" }, { "v0" : 92, "v1" : 93, "curve" : 101.39698978806615, "vis" : true, "color" : "5E844D", "trait" : "line" }, { "v0" : 94, "v1" : 95, "curve" : -0.1626536365474556, "vis" : true, "color" : "576C46", "bCoef" : -3.7, "cMask" : ["ball" ], "trait" : "line", "x" : -1220 }, { "v0" : 96, "v1" : 97, "curve" : -0.1626536365474556, "vis" : true, "color" : "576C46", "bCoef" : -3.7, "cMask" : ["ball" ], "trait" : "line", "x" : -1220 }, { "v0" : 98, "v1" : 99, "curve" : -0.1626536365474556, "vis" : true, "color" : "576C46", "bCoef" : -3.7, "cMask" : ["ball" ], "trait" : "line", "x" : -1220 }, { "v0" : 100, "v1" : 101, "curve" : -0.1626536365474556, "vis" : true, "color" : "576C46", "bCoef" : -3.7, "cMask" : ["ball" ], "trait" : "line", "x" : -1220 }, { "v0" : 102, "v1" : 103, "curve" : -0.1626536365474556, "vis" : true, "color" : "576C46", "bCoef" : -3.7, "cMask" : ["ball" ], "trait" : "line", "x" : -1220 }, { "v0" : 104, "v1" : 105, "curve" : -0.1626536365474556, "vis" : true, "color" : "576C46", "bCoef" : -3.7, "cMask" : ["ball" ], "trait" : "line", "x" : -1220 }, { "v0" : 106, "v1" : 107, "vis" : true, "color" : "C7E6BD", "trait" : "line" }, { "v0" : 108, "v1" : 109, "vis" : true, "color" : "DEFE2E", "trait" : "line" }, { "v0" : 110, "v1" : 111, "vis" : true, "color" : "FA2E49", "trait" : "line" }, { "v0" : 112, "v1" : 113, "vis" : true, "color" : "DEFE2E", "trait" : "line" }, { "v0" : 114, "v1" : 115, "vis" : true, "color" : "FA2E49", "trait" : "line" },  { "v0" : 117, "v1" : 118, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 119, "v1" : 120, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 121, "v1" : 122, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 123, "v1" : 124, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 125, "v1" : 126, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 127, "v1" : 128, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 129, "v1" : 130, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 131, "v1" : 132, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 133, "v1" : 134, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 135, "v1" : 136, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 137, "v1" : 138, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 139, "v1" : 140, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 141, "v1" : 142, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 143, "v1" : 144, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 145, "v1" : 146, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 147, "v1" : 148, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 149, "v1" : 150, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 151, "v1" : 152, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 153, "v1" : 154, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 155, "v1" : 156, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 157, "v1" : 158, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 159, "v1" : 160, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 161, "v1" : 162, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 163, "v1" : 164, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 165, "v1" : 166, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 167, "v1" : 168, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 169, "v1" : 170, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 171, "v1" : 172, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 173, "v1" : 174, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 175, "v1" : 176, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 177, "v1" : 178, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 179, "v1" : 180, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 181, "v1" : 182, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 183, "v1" : 184, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 185, "v1" : 186, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" }, { "v0" : 187, "v1" : 188, "curve" : 0, "vis" : true, "color" : "C7E6BD", "bCoef" : 1, "cMask" : ["red","blue" ], "trait" : "ballArea" },  { "v0" : 189, "v1" : 190, "vis" : true, "color" : "DEFE2E", "trait" : "line" }, { "v0" : 191, "v1" : 192, "vis" : true, "color" : "FA2E49", "trait" : "line" }, { "v0" : 193, "v1" : 194, "vis" : true, "color" : "DEFE2E", "trait" : "line" }, { "v0" : 195, "v1" : 196, "vis" : true, "color" : "FA2E49", "trait" : "line" }, { "v0" : 197, "v1" : 198, "vis" : true, "color" : "C7E6BD", "trait" : "line" }, { "v0" : 199, "v1" : 200, "vis" : true, "color" : "DEFE2E", "trait" : "line" }, { "v0" : 201, "v1" : 202, "vis" : true, "color" : "FA2E49", "trait" : "line" }, { "v0" : 203, "v1" : 204, "vis" : true, "color" : "DEFE2E", "trait" : "line" }, { "v0" : 205, "v1" : 206, "vis" : true, "color" : "FA2E49", "trait" : "line" }, { "v0" : 207, "v1" : 208, "vis" : true, "color" : "DEFE2E", "trait" : "line" }, { "v0" : 209, "v1" : 210, "vis" : true, "color" : "FA2E49", "trait" : "line" }, { "v0" : 211, "v1" : 212, "vis" : true, "color" : "DEFE2E", "trait" : "line" }, { "v0" : 213, "v1" : 214, "vis" : true, "color" : "FA2E49", "trait" : "line" }, { "v0" : 215, "v1" : 216, "vis" : true, "color" : "C7E6BD", "trait" : "line" }, { "v0" : 217, "v1" : 218, "vis" : true, "color" : "DEFE2E", "trait" : "line" }, { "v0" : 219, "v1" : 220, "vis" : true, "color" : "FA2E49", "trait" : "line" }, { "v0" : 221, "v1" : 222, "vis" : true, "color" : "DEFE2E", "trait" : "line" }, { "v0" : 223, "v1" : 224, "vis" : true, "color" : "FA2E49", "trait" : "line" }, { "v0" : 225, "v1" : 226, "vis" : true, "color" : "DEFE2E", "trait" : "line" }, { "v0" : 227, "v1" : 228, "vis" : true, "color" : "FA2E49", "trait" : "line" }, { "v0" : 229, "v1" : 230, "vis" : true, "color" : "DEFE2E", "trait" : "line" }, { "v0" : 231, "v1" : 232, "vis" : true, "color" : "FA2E49", "trait" : "line" }, { "v0" : 233, "v1" : 234, "vis" : true, "color" : "C7E6BD", "trait" : "line" }, { "v0" : 235, "v1" : 236, "vis" : true, "color" : "DEFE2E", "trait" : "line" }, { "v0" : 237, "v1" : 238, "vis" : true, "color" : "FA2E49", "trait" : "line" }, { "v0" : 239, "v1" : 240, "vis" : true, "color" : "DEFE2E", "trait" : "line" }, { "v0" : 241, "v1" : 242, "vis" : true, "color" : "FA2E49", "trait" : "line" }, { "v0" : 243, "v1" : 244, "vis" : true, "color" : "DEFE2E", "trait" : "line" }, { "v0" : 245, "v1" : 246, "vis" : true, "color" : "FA2E49", "trait" : "line" }, { "v0" : 247, "v1" : 248, "vis" : true, "color" : "DEFE2E", "trait" : "line" }, { "v0" : 249, "v1" : 250, "vis" : true, "color" : "FA2E49", "trait" : "line" },  { "v0" : 251, "v1" : 252, "vis" : false, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO" ], "trait" : "kickOffBarrier" }, { "v0" : 253, "v1" : 254, "vis" : false, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["blueKO" ], "trait" : "kickOffBarrier" }  ],  "goals" : [ { "p0" : [-1410,135 ], "p1" : [-1410,-135 ], "team" : "red" }, { "p0" : [1410,135 ], "p1" : [1410,-135 ], "team" : "blue" }  ],  "discs" : [ { "pos" : [-1400,135 ], "trait" : "goalPost", "x" : -1400, "y" : 135 }, { "pos" : [-1400,-135 ], "trait" : "goalPost", "x" : -1400 }, { "pos" : [1400,135 ], "trait" : "goalPost", "y" : 135 }, { "pos" : [1400,-135 ], "trait" : "goalPost", "y" : -135 },  { "pos" : [-1515,190 ], "trait" : "stanchion", "x" : -1515, "y" : 190 }, { "pos" : [-1515,-190 ], "trait" : "stanchion" }, { "pos" : [1515,190 ], "trait" : "stanchion", "x" : 1515, "y" : 190 }, { "pos" : [1515,-190 ], "trait" : "stanchion", "x" : 1515, "y" : -190 },  { "pos" : [1400,-659 ], "trait" : "cornerflag" }, { "pos" : [1401,660 ], "trait" : "cornerflag" }, { "pos" : [-1399.651123046875,662.0468723773956 ], "trait" : "cornerflag" }, { "pos" : [-1398.651123046875,-659.6199214458466 ], "trait" : "cornerflag" }  ],  "planes" : [ { "normal" : [0,1 ], "dist" : -700, "bCoef" : 0, "trait" : "ballArea" }, { "normal" : [0,-1 ], "dist" : -700, "bCoef" : 0, "trait" : "ballArea" },  { "normal" : [0,1 ], "dist" : -785, "bCoef" : 0 }, { "normal" : [0,-1 ], "dist" : -757, "bCoef" : 0 }, { "normal" : [1,0 ], "dist" : -1587, "bCoef" : 0 }, { "normal" : [-1,0 ], "dist" : -1594, "bCoef" : 0.1 }, { "normal" : [1,0 ], "dist" : -1465, "bCoef" : 0, "cMask" : ["ball" ] }, { "normal" : [-1,0 ], "dist" : -1465, "bCoef" : 0, "cMask" : ["ball" ] }  ],  "traits" : { "ballArea" : { "vis" : false, "bCoef" : 0, "cMask" : ["ball" ] }, "goalPost" : { "radius" : 5, "invMass" : 0, "bCoef" : 2 }, "stanchion" : { "radius" : 3, "invMass" : 0, "bCoef" : 3, "cMask" : ["none" ] }, "cornerflag" : { "radius" : 3, "invMass" : 0, "bCoef" : 0.5, "color" : "FFFF00", "cGroup" : [ ] }, "reargoalNetleft" : { "vis" : true, "bCoef" : 0.1, "cMask" : ["ball","red","blue" ], "curve" : 10, "color" : "C7E6BD" }, "reargoalNetright" : { "vis" : true, "bCoef" : 0.1, "cMask" : ["ball","red","blue" ], "curve" : -10, "color" : "C7E6BD" }, "sidegoalNet" : { "vis" : true, "bCoef" : 1, "cMask" : ["ball","red","blue" ], "color" : "C7E6BD" }, "kickOffBarrier" : { "vis" : false, "bCoef" : 0.1, "cGroup" : ["redKO","blueKO" ], "cMask" : ["red","blue" ] }, "line" : { "vis" : true, "cMask" : [ ], "color" : "C7E6BD" }, "tunnel" : { "vis" : true, "cMask" : ["red","blue" ], "color" : "000000" }, "advertising" : { "vis" : true, "cMask" : ["red","blue" ], "color" : "333333" }, "teambench" : { "vis" : true, "cMask" : [ ], "color" : "000000" }, "manager" : { "radius" : 15, "vis" : true, "cMask" : ["red","blue" ], "invMass" : 0, "color" : "333333" }, "physio" : { "radius" : 15, "vis" : true, "cMask" : ["red","blue" ], "invMass" : 0, "color" : "666666" }, "redsubs" : { "radius" : 15, "vis" : true, "cMask" : ["red","blue" ], "invMass" : 0, "color" : "E56E56" }, "bluesubs" : { "radius" : 15, "vis" : true, "cMask" : ["red","blue" ], "invMass" : 0, "color" : "5689E5" }  }  }`
var dizilim = `{

	"name" : "new V6 Dizilim",

	"width" : 500,

	"height" : 230,

	"canBeStored" : false,

	"bg" : { "color" : "2A3B34", "width" : 450, "height" : 180 },

	"vertexes" : [
		/* 0 */ { "x" : 0, "y" : -180, "vis" : true, "color" : "C7E6BD" },
		/* 1 */ { "x" : 0, "y" : 180, "vis" : true, "color" : "C7E6BD" },
		/* 2 */ { "x" : -324, "y" : 0, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 3 */ { "x" : -359, "y" : 0, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 4 */ { "x" : -59, "y" : -17.5, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 5 */ { "x" : -59, "y" : 17.5, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 6 */ { "x" : -348, "y" : -10, "cMask" : [ ], "color" : "F7D1FF" },
		/* 7 */ { "x" : -337, "y" : -10, "cMask" : [ ], "color" : "F7D1FF" },
		/* 8 */ { "x" : -337, "y" : 10, "cMask" : [ ], "color" : "F7D1FF" },
		/* 9 */ { "x" : -348, "y" : 10, "cMask" : [ ], "color" : "F7D1FF" },
		/* 10 */ { "x" : -339.33332824706997, "y" : 0, "cMask" : [ ], "color" : "F7D1FF" },
		/* 11 */ { "x" : -346, "y" : 0, "cMask" : [ ], "color" : "F7D1FF" },
		/* 12 */ { "x" : -64, "y" : -11, "cMask" : [ ], "color" : "FFEBEB" },
		/* 13 */ { "x" : -54, "y" : -11, "cMask" : [ ], "color" : "FFEBEB" },
		/* 14 */ { "x" : -54, "y" : 0, "cMask" : [ ], "color" : "FFEBEB" },
		/* 15 */ { "x" : -64, "y" : 0, "cMask" : [ ], "color" : "FFEBEB" },
		/* 16 */ { "x" : -54, "y" : 11, "cMask" : [ ], "color" : "FFEBEB" },
		/* 17 */ { "x" : -64, "y" : 11, "cMask" : [ ], "color" : "FFEBEB" },
		/* 18 */ { "x" : -55, "y" : -17.5, "bCoef" : -30 },
		/* 19 */ { "x" : -63, "y" : -17.5, "bCoef" : -30 },
		/* 20 */ { "x" : -421, "y" : -10, "cMask" : [ ], "color" : "FFEAA6" },
		/* 21 */ { "x" : -421, "y" : 10, "cMask" : [ ], "color" : "FFEAA6" },
		/* 22 */ { "x" : -214, "y" : -61, "cMask" : [ ] },
		/* 23 */ { "x" : -202, "y" : -61, "cMask" : [ ] },
		/* 24 */ { "x" : -202, "y" : -45, "cMask" : [ ] },
		/* 25 */ { "x" : -214, "y" : -45, "cMask" : [ ] },
		/* 26 */ { "x" : -214, "y" : -53, "cMask" : [ ] },
		/* 27 */ { "x" : -202, "y" : -53, "cMask" : [ ] },
		/* 28 */ { "x" : -324, "y" : 4, "bCoef" : -30 },
		/* 29 */ { "x" : -324, "y" : -4, "bCoef" : -30 },
		/* 30 */ { "x" : -208, "y" : -35, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 31 */ { "x" : -208, "y" : -70, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 32 */ { "x" : -204, "y" : -35, "bCoef" : -30 },
		/* 33 */ { "x" : -212, "y" : -35, "bCoef" : -30 },
		/* 34 */ { "x" : -421, "y" : 17.5, "bCoef" : -0.5, "cMask" : ["red","blue" ], "color" : "D98A03" },
		/* 35 */ { "x" : -421, "y" : -17.5, "bCoef" : -0.5, "cMask" : ["red","blue" ], "color" : "D98A03" },
		/* 36 */ { "x" : -417, "y" : 17.5, "bCoef" : -30 },
		/* 37 */ { "x" : -425, "y" : 17.5, "bCoef" : -30 },
		/* 38 */ { "x" : -135, "y" : -9, "cMask" : [ ], "color" : "E6E7FF" },
		/* 39 */ { "x" : -135, "y" : 9, "cMask" : [ ], "color" : "E6E7FF" },
		/* 40 */ { "x" : -130, "y" : 17, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 41 */ { "x" : -130, "y" : -18, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 42 */ { "x" : -126, "y" : 17, "bCoef" : -30 },
		/* 43 */ { "x" : -134, "y" : 17, "bCoef" : -30 },
		/* 44 */ { "x" : 359, "y" : 0, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 45 */ { "x" : 324, "y" : 0, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 46 */ { "x" : 59, "y" : -17.5, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 47 */ { "x" : 59, "y" : 17.5, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 48 */ { "x" : 337, "y" : -10, "cMask" : [ ], "color" : "F7D1FF" },
		/* 49 */ { "x" : 348, "y" : -10, "cMask" : [ ], "color" : "F7D1FF" },
		/* 50 */ { "x" : 348, "y" : 10, "cMask" : [ ], "color" : "F7D1FF" },
		/* 51 */ { "x" : 337, "y" : 10, "cMask" : [ ], "color" : "F7D1FF" },
		/* 52 */ { "x" : 346, "y" : 0, "cMask" : [ ], "color" : "F7D1FF" },
		/* 53 */ { "x" : 339.33332824706997, "y" : 0, "cMask" : [ ], "color" : "F7D1FF" },
		/* 54 */ { "x" : 54, "y" : -11, "cMask" : [ ], "color" : "FFEBEB" },
		/* 55 */ { "x" : 64, "y" : -11, "cMask" : [ ], "color" : "FFEBEB" },
		/* 56 */ { "x" : 64, "y" : 0, "cMask" : [ ], "color" : "FFEBEB" },
		/* 57 */ { "x" : 54, "y" : 0, "cMask" : [ ], "color" : "FFEBEB" },
		/* 58 */ { "x" : 64, "y" : 11, "cMask" : [ ], "color" : "FFEBEB" },
		/* 59 */ { "x" : 54, "y" : 11, "cMask" : [ ], "color" : "FFEBEB" },
		/* 60 */ { "x" : 63, "y" : -17.5, "bCoef" : -30 },
		/* 61 */ { "x" : 55, "y" : -17.5, "bCoef" : -30 },
		/* 62 */ { "x" : 202, "y" : 60, "cMask" : [ ] },
		/* 63 */ { "x" : 214, "y" : 60, "cMask" : [ ] },
		/* 64 */ { "x" : 214, "y" : 44, "cMask" : [ ] },
		/* 65 */ { "x" : 202, "y" : 44, "cMask" : [ ] },
		/* 66 */ { "x" : 202, "y" : 52, "cMask" : [ ] },
		/* 67 */ { "x" : 214, "y" : 52, "cMask" : [ ] },
		/* 68 */ { "x" : 359, "y" : 4, "bCoef" : -30 },
		/* 69 */ { "x" : 359, "y" : -4, "bCoef" : -30 },
		/* 70 */ { "x" : 208, "y" : 70, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 71 */ { "x" : 208, "y" : 34, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 72 */ { "x" : 212, "y" : 70, "bCoef" : -30 },
		/* 73 */ { "x" : 204, "y" : 70, "bCoef" : -30 },
		/* 74 */ { "x" : 421, "y" : 17.5, "bCoef" : -0.5, "cMask" : ["red","blue" ], "color" : "D98A03" },
		/* 75 */ { "x" : 421, "y" : -17.5, "bCoef" : -0.5, "cMask" : ["red","blue" ], "color" : "D98A03" },
		/* 76 */ { "x" : 425, "y" : 17.5, "bCoef" : -30 },
		/* 77 */ { "x" : 417, "y" : 17.5, "bCoef" : -30 },
		/* 78 */ { "x" : 125, "y" : -10, "cMask" : [ ], "color" : "E6E7FF" },
		/* 79 */ { "x" : 125, "y" : 8, "cMask" : [ ], "color" : "E6E7FF" },
		/* 80 */ { "x" : 130, "y" : 17, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 81 */ { "x" : 130, "y" : -18, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 82 */ { "x" : 134, "y" : 17, "bCoef" : -30 },
		/* 83 */ { "x" : 126, "y" : 17, "bCoef" : -30 },
		/* 84 */ { "x" : -243, "y" : 44, "cMask" : [ ] },
		/* 85 */ { "x" : -257, "y" : 44, "cMask" : [ ] },
		/* 86 */ { "x" : -257, "y" : 60, "cMask" : [ ] },
		/* 87 */ { "x" : -244, "y" : 60, "cMask" : [ ] },
		/* 88 */ { "x" : -244, "y" : 52, "cMask" : [ ] },
		/* 89 */ { "x" : -257, "y" : 52, "cMask" : [ ] },
		/* 90 */ { "x" : -250, "y" : 70, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 91 */ { "x" : -250, "y" : 35, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 92 */ { "x" : -246, "y" : 70, "bCoef" : -30 },
		/* 93 */ { "x" : -254, "y" : 70, "bCoef" : -30 },
		/* 94 */ { "x" : 257, "y" : -60, "cMask" : [ ] },
		/* 95 */ { "x" : 244, "y" : -60, "cMask" : [ ] },
		/* 96 */ { "x" : 243, "y" : -44, "cMask" : [ ] },
		/* 97 */ { "x" : 257, "y" : -44, "cMask" : [ ] },
		/* 98 */ { "x" : 257, "y" : -52, "cMask" : [ ] },
		/* 99 */ { "x" : 244, "y" : -52, "cMask" : [ ] },
		/* 100 */ { "x" : 250, "y" : -35, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 101 */ { "x" : 250, "y" : -70, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 102 */ { "x" : 254, "y" : -35, "bCoef" : -30 },
		/* 103 */ { "x" : 246, "y" : -35, "bCoef" : -30 },
		/* 104 */ { "x" : -450, "y" : -180, "bCoef" : -1, "cMask" : [ ] },
		/* 105 */ { "x" : 450, "y" : -180, "bCoef" : -1, "cMask" : [ ] },
		/* 106 */ { "x" : 450, "y" : 180, "bCoef" : -1, "cMask" : [ ] },
		/* 107 */ { "x" : -450, "y" : 180, "bCoef" : -1, "cMask" : [ ] },
		/* 108 */ { "x" : 421, "y" : -10, "cMask" : [ ], "color" : "FFEAA6" },
		/* 109 */ { "x" : 421, "y" : 10, "cMask" : [ ], "color" : "FFEAA6" },
		/* 110 */ { "x" : 450, "y" : -50, "bCoef" : -1, "cMask" : [ ], "color" : "00E0E0" },
		/* 111 */ { "x" : 480, "y" : -50, "bCoef" : -1, "cMask" : [ ], "color" : "00E0E0" },
		/* 112 */ { "x" : 480, "y" : 50, "bCoef" : -1, "cMask" : [ ], "color" : "00E0E0" },
		/* 113 */ { "x" : 450, "y" : 50, "bCoef" : -1, "cMask" : [ ], "color" : "00E0E0" },
		/* 114 */ { "x" : -450, "y" : -50, "bCoef" : -1, "cMask" : [ ], "color" : "FF4242" },
		/* 115 */ { "x" : -480, "y" : -50, "bCoef" : -1, "cMask" : [ ], "color" : "FF4242" },
		/* 116 */ { "x" : -480, "y" : 50, "bCoef" : -1, "cMask" : [ ], "color" : "FF4242" },
		/* 117 */ { "x" : -450, "y" : 50, "bCoef" : -1, "cMask" : [ ], "color" : "FF4242" },
		/* 118 */ { "x" : 0, "y" : 230, "cMask" : ["red","blue" ], "vis" : false },
		/* 119 */ { "x" : -130, "y" : -15, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 120 */ { "x" : -130, "y" : 14, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 121 */ { "x" : -130, "y" : 14, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 122 */ { "x" : -130, "y" : -15, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 123 */ { "x" : 130, "y" : 14, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 124 */ { "x" : 130, "y" : -15, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 125 */ { "x" : 130, "y" : -15, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 126 */ { "x" : 130, "y" : 14, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 127 */ { "x" : -59, "y" : 14.5, "bCoef" : -0.5, "cMask" : ["red","blue" ], "color" : "FFEBEB" },
		/* 128 */ { "x" : -59, "y" : -14.5, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 129 */ { "x" : -59, "y" : -14.5, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 130 */ { "x" : -59, "y" : 14.5, "bCoef" : -0.5, "cMask" : ["red","blue" ], "color" : "FFEBEB" },
		/* 131 */ { "x" : 59, "y" : 14.5, "bCoef" : -0.5, "cMask" : ["red","blue" ], "color" : "FFEBEB" },
		/* 132 */ { "x" : 59, "y" : -14.5, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 133 */ { "x" : 59, "y" : -14.5, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 134 */ { "x" : 59, "y" : 14.5, "bCoef" : -0.5, "cMask" : ["red","blue" ], "color" : "FFEBEB" },
		/* 135 */ { "x" : -356, "y" : 0, "bCoef" : -0.5, "cMask" : ["red","blue" ], "color" : "5300BD" },
		/* 136 */ { "x" : -327, "y" : 0, "bCoef" : -0.5, "cMask" : ["red","blue" ], "color" : "5300BD" },
		/* 137 */ { "x" : -327, "y" : 0, "bCoef" : -0.5, "cMask" : ["red","blue" ], "color" : "5300BD" },
		/* 138 */ { "x" : -356, "y" : 0, "bCoef" : -0.5, "cMask" : ["red","blue" ], "color" : "5300BD" },
		/* 139 */ { "x" : 327, "y" : 0, "bCoef" : -0.5, "cMask" : ["red","blue" ], "color" : "5300BD" },
		/* 140 */ { "x" : 356, "y" : 0, "bCoef" : -0.5, "cMask" : ["red","blue" ], "color" : "5300BD" },
		/* 141 */ { "x" : 356, "y" : 0, "bCoef" : -0.5, "cMask" : ["red","blue" ], "color" : "5300BD" },
		/* 142 */ { "x" : 327, "y" : 0, "bCoef" : -0.5, "cMask" : ["red","blue" ], "color" : "5300BD" },
		/* 143 */ { "x" : -421, "y" : 14.5, "bCoef" : -0.5, "cMask" : ["red","blue" ], "curve" : 180 },
		/* 144 */ { "x" : -421, "y" : -14.5, "bCoef" : -0.5, "cMask" : ["red","blue" ], "curve" : 180 },
		/* 145 */ { "x" : -421, "y" : -14.5, "bCoef" : -0.5, "cMask" : ["red","blue" ], "curve" : 180 },
		/* 146 */ { "x" : -421, "y" : 14.5, "bCoef" : -0.5, "cMask" : ["red","blue" ], "curve" : 180 },
		/* 147 */ { "x" : 421, "y" : -14.5, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 148 */ { "x" : 421, "y" : 14.5, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 149 */ { "x" : 421, "y" : 14.5, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 150 */ { "x" : 421, "y" : -14.5, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 151 */ { "x" : -208, "y" : -67, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 152 */ { "x" : -208, "y" : -37, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 153 */ { "x" : -208, "y" : -37, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 154 */ { "x" : -208, "y" : -67, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 155 */ { "x" : 250, "y" : -37, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 156 */ { "x" : 250, "y" : -67, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 157 */ { "x" : 250, "y" : -67, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 158 */ { "x" : 250, "y" : -37, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 159 */ { "x" : -250, "y" : 67, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 160 */ { "x" : -250, "y" : 38, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 161 */ { "x" : -250, "y" : 38, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 162 */ { "x" : -250, "y" : 67, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 163 */ { "x" : 208, "y" : 67, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 164 */ { "x" : 208, "y" : 37, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 165 */ { "x" : 208, "y" : 37, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 166 */ { "x" : 208, "y" : 67, "bCoef" : -0.5, "cMask" : ["red","blue" ] },
		/* 167 */ { "cMask" : ["red","blue" ], "x" : -499.5, "y" : -230 },
		/* 168 */ { "cMask" : ["red","blue" ], "x" : 501.5, "y" : -230 },
		/* 169 */ { "x" : -130, "y" : -9, "cMask" : [ ], "color" : "E6E7FF" },
		/* 170 */ { "x" : -130, "y" : 9, "cMask" : [ ], "color" : "E6E7FF" },
		/* 171 */ { "x" : -125, "y" : -9, "cMask" : [ ], "color" : "E6E7FF" },
		/* 172 */ { "x" : -125, "y" : 9, "cMask" : [ ], "color" : "E6E7FF" },
		/* 173 */ { "x" : 130, "y" : -10, "cMask" : [ ], "color" : "E6E7FF" },
		/* 174 */ { "x" : 130, "y" : 8, "cMask" : [ ], "color" : "E6E7FF" },
		/* 175 */ { "x" : 135, "y" : -10, "cMask" : [ ], "color" : "E6E7FF" },
		/* 176 */ { "x" : 135, "y" : 8, "cMask" : [ ], "color" : "E6E7FF" }

	],

	"segments" : [
		{ "v0" : 0, "v1" : 1, "vis" : false, "color" : "33BF00" },
		{ "v0" : 2, "v1" : 3, "bCoef" : -0.5, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : ["red","blue" ], "color" : "420096" },
		{ "v0" : 3, "v1" : 2, "bCoef" : -0.5, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : ["red","blue" ], "color" : "420096" },
		{ "v0" : 4, "v1" : 5, "bCoef" : -0.5, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : ["red","blue" ], "color" : "9C0000" },
		{ "v0" : 5, "v1" : 4, "bCoef" : -0.5, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : ["red","blue" ], "color" : "9C0000" },
		{ "v0" : 6, "v1" : 7, "cMask" : [ ], "color" : "F7D1FF" },
		{ "v0" : 7, "v1" : 8, "cMask" : [ ], "color" : "F7D1FF" },
		{ "v0" : 8, "v1" : 9, "cMask" : [ ], "color" : "F7D1FF" },
		{ "v0" : 10, "v1" : 11, "cMask" : [ ], "color" : "F7D1FF" },
		{ "v0" : 12, "v1" : 13, "cMask" : [ ], "color" : "FFEBEB" },
		{ "v0" : 13, "v1" : 14, "cMask" : [ ], "color" : "FFEBEB" },
		{ "v0" : 14, "v1" : 15, "cMask" : [ ], "color" : "FFEBEB" },
		{ "v0" : 15, "v1" : 12, "cMask" : [ ], "color" : "FFEBEB" },
		{ "v0" : 14, "v1" : 16, "cMask" : [ ], "color" : "FFEBEB" },
		{ "v0" : 16, "v1" : 17, "cMask" : [ ], "color" : "FFEBEB" },
		{ "v0" : 19, "v1" : 18, "bCoef" : -30, "curve" : 14.999999999999998, "curveF" : 7.595754112725151, "color" : "C7E6BD" },
		{ "v0" : 20, "v1" : 21, "cMask" : [ ], "color" : "FFEAA6" },
		{ "v0" : 22, "v1" : 23, "cMask" : [ ], "color" : "C7E6BD" },
		{ "v0" : 23, "v1" : 24, "cMask" : [ ], "color" : "C7E6BD" },
		{ "v0" : 24, "v1" : 25, "cMask" : [ ], "color" : "C7E6BD" },
		{ "v0" : 25, "v1" : 22, "cMask" : [ ], "color" : "C7E6BD" },
		{ "v0" : 26, "v1" : 27, "cMask" : [ ], "color" : "C7E6BD" },
		{ "v0" : 29, "v1" : 28, "bCoef" : -30, "curve" : 29.999999999999996, "curveF" : 3.7320508075688776, "color" : "C7E6BD" },
		{ "v0" : 30, "v1" : 31, "bCoef" : -0.5, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : ["red","blue" ], "color" : "96B02" },
		{ "v0" : 31, "v1" : 30, "bCoef" : -0.5, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : ["red","blue" ], "color" : "96B02" },
		{ "v0" : 32, "v1" : 33, "bCoef" : -30, "curve" : 14.999999999999998, "curveF" : 7.595754112725151, "color" : "C7E6BD" },
		{ "v0" : 34, "v1" : 35, "bCoef" : -0.5, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : ["red","blue" ], "color" : "D98A03" },
		{ "v0" : 35, "v1" : 34, "bCoef" : -0.5, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : ["red","blue" ], "color" : "D98A03" },
		{ "v0" : 36, "v1" : 37, "bCoef" : -30, "curve" : 14.999999999999998, "curveF" : 7.595754112725151, "color" : "C7E6BD" },
		{ "v0" : 38, "v1" : 39, "cMask" : [ ], "color" : "E6E7FF" },
		{ "v0" : 40, "v1" : 41, "bCoef" : -0.5, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : ["red","blue" ], "color" : "2033" },
		{ "v0" : 41, "v1" : 40, "bCoef" : -0.5, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : ["red","blue" ], "color" : "2033" },
		{ "v0" : 42, "v1" : 43, "bCoef" : -30, "curve" : 14.999999999999998, "curveF" : 7.595754112725151, "color" : "C7E6BD" },
		{ "v0" : 44, "v1" : 45, "bCoef" : -0.5, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : ["red","blue" ], "color" : "420096" },
		{ "v0" : 45, "v1" : 44, "bCoef" : -0.5, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : ["red","blue" ], "color" : "420096" },
		{ "v0" : 46, "v1" : 47, "bCoef" : -0.5, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : ["red","blue" ], "color" : "9C0000" },
		{ "v0" : 47, "v1" : 46, "bCoef" : -0.5, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : ["red","blue" ], "color" : "9C0000" },
		{ "v0" : 48, "v1" : 49, "cMask" : [ ], "color" : "F7D1FF" },
		{ "v0" : 49, "v1" : 50, "cMask" : [ ], "color" : "F7D1FF" },
		{ "v0" : 50, "v1" : 51, "cMask" : [ ], "color" : "F7D1FF" },
		{ "v0" : 52, "v1" : 53, "cMask" : [ ], "color" : "F7D1FF" },
		{ "v0" : 54, "v1" : 55, "cMask" : [ ], "color" : "FFEBEB" },
		{ "v0" : 55, "v1" : 56, "cMask" : [ ], "color" : "FFEBEB" },
		{ "v0" : 56, "v1" : 57, "cMask" : [ ], "color" : "FFEBEB" },
		{ "v0" : 57, "v1" : 54, "cMask" : [ ], "color" : "FFEBEB" },
		{ "v0" : 56, "v1" : 58, "cMask" : [ ], "color" : "FFEBEB" },
		{ "v0" : 58, "v1" : 59, "cMask" : [ ], "color" : "FFEBEB" },
		{ "v0" : 61, "v1" : 60, "bCoef" : -30, "curve" : 14.999999999999998, "curveF" : 7.595754112725151, "color" : "C7E6BD" },
		{ "v0" : 62, "v1" : 63, "cMask" : [ ], "color" : "C7E6BD" },
		{ "v0" : 63, "v1" : 64, "cMask" : [ ], "color" : "C7E6BD" },
		{ "v0" : 64, "v1" : 65, "cMask" : [ ], "color" : "C7E6BD" },
		{ "v0" : 65, "v1" : 62, "cMask" : [ ], "color" : "C7E6BD" },
		{ "v0" : 66, "v1" : 67, "cMask" : [ ], "color" : "C7E6BD" },
		{ "v0" : 69, "v1" : 68, "bCoef" : -30, "curve" : 29.999999999999996, "curveF" : 3.7320508075688776, "color" : "C7E6BD" },
		{ "v0" : 70, "v1" : 71, "bCoef" : -0.5, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : ["red","blue" ], "color" : "96B02" },
		{ "v0" : 71, "v1" : 70, "bCoef" : -0.5, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : ["red","blue" ], "color" : "96B02" },
		{ "v0" : 72, "v1" : 73, "bCoef" : -30, "curve" : 14.999999999999998, "curveF" : 7.595754112725151, "color" : "C7E6BD" },
		{ "v0" : 74, "v1" : 75, "bCoef" : -0.5, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : ["red","blue" ], "color" : "D98A03" },
		{ "v0" : 75, "v1" : 74, "bCoef" : -0.5, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : ["red","blue" ], "color" : "D98A03" },
		{ "v0" : 76, "v1" : 77, "bCoef" : -30, "curve" : 14.999999999999998, "curveF" : 7.595754112725151, "color" : "C7E6BD" },
		{ "v0" : 78, "v1" : 79, "cMask" : [ ], "color" : "E6E7FF" },
		{ "v0" : 80, "v1" : 81, "bCoef" : -0.5, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : ["red","blue" ], "color" : "2033" },
		{ "v0" : 81, "v1" : 80, "bCoef" : -0.5, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : ["red","blue" ], "color" : "2033" },
		{ "v0" : 82, "v1" : 83, "bCoef" : -30, "curve" : 14.999999999999998, "curveF" : 7.595754112725151, "color" : "C7E6BD" },
		{ "v0" : 84, "v1" : 85, "cMask" : [ ], "color" : "C7E6BD" },
		{ "v0" : 85, "v1" : 86, "cMask" : [ ], "color" : "C7E6BD" },
		{ "v0" : 86, "v1" : 87, "cMask" : [ ], "color" : "C7E6BD" },
		{ "v0" : 87, "v1" : 88, "cMask" : [ ], "color" : "C7E6BD" },
		{ "v0" : 88, "v1" : 89, "cMask" : [ ], "color" : "C7E6BD" },
		{ "v0" : 90, "v1" : 91, "bCoef" : -0.5, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : ["red","blue" ], "color" : "96B02" },
		{ "v0" : 91, "v1" : 90, "bCoef" : -0.5, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : ["red","blue" ], "color" : "96B02" },
		{ "v0" : 92, "v1" : 93, "bCoef" : -30, "curve" : 14.999999999999998, "curveF" : 7.595754112725151, "color" : "C7E6BD" },
		{ "v0" : 94, "v1" : 95, "cMask" : [ ], "color" : "C7E6BD" },
		{ "v0" : 95, "v1" : 96, "cMask" : [ ], "color" : "C7E6BD" },
		{ "v0" : 96, "v1" : 97, "cMask" : [ ], "color" : "C7E6BD" },
		{ "v0" : 97, "v1" : 98, "cMask" : [ ], "color" : "C7E6BD" },
		{ "v0" : 98, "v1" : 99, "cMask" : [ ], "color" : "C7E6BD" },
		{ "v0" : 100, "v1" : 101, "bCoef" : -0.5, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : ["red","blue" ], "color" : "96B02" },
		{ "v0" : 101, "v1" : 100, "bCoef" : -0.5, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : ["red","blue" ], "color" : "96B02" },
		{ "v0" : 102, "v1" : 103, "bCoef" : -30, "curve" : 14.999999999999998, "curveF" : 7.595754112725151, "color" : "C7E6BD" },
		{ "v0" : 104, "v1" : 105, "bCoef" : -1, "cMask" : [ ], "color" : "C7E6BD" },
		{ "v0" : 105, "v1" : 106, "bCoef" : -1, "cMask" : [ ], "color" : "C7E6BD" },
		{ "v0" : 106, "v1" : 107, "bCoef" : -1, "cMask" : [ ], "color" : "C7E6BD" },
		{ "v0" : 107, "v1" : 104, "bCoef" : -1, "cMask" : [ ], "color" : "C7E6BD" },
		{ "v0" : 1, "v1" : 0, "bCoef" : -1, "cMask" : [ ], "color" : "C7E6BD", "vis" : true },
		{ "v0" : 108, "v1" : 109, "cMask" : [ ], "color" : "FFEAA6" },
		{ "v0" : 110, "v1" : 111, "bCoef" : -1, "cMask" : [ ], "color" : "00E0E0" },
		{ "v0" : 111, "v1" : 112, "bCoef" : -1, "cMask" : [ ], "color" : "00E0E0" },
		{ "v0" : 112, "v1" : 113, "bCoef" : -1, "cMask" : [ ], "color" : "00E0E0" },
		{ "v0" : 114, "v1" : 115, "bCoef" : -1, "cMask" : [ ], "color" : "FF4242" },
		{ "v0" : 115, "v1" : 116, "bCoef" : -1, "cMask" : [ ], "color" : "FF4242" },
		{ "v0" : 116, "v1" : 117, "bCoef" : -1, "cMask" : [ ], "color" : "FF4242" },
		{ "v0" : 120, "v1" : 119, "bCoef" : -0.5, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : ["red","blue" ], "color" : "2033" },
		{ "v0" : 122, "v1" : 121, "bCoef" : -0.5, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : ["red","blue" ], "color" : "2033" },
		{ "v0" : 124, "v1" : 123, "bCoef" : -0.5, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : ["red","blue" ], "color" : "2033" },
		{ "v0" : 126, "v1" : 125, "bCoef" : -0.5, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : ["red","blue" ], "color" : "2033" },
		{ "v0" : 128, "v1" : 127, "bCoef" : -0.5, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : ["red","blue" ], "color" : "9C0000" },
		{ "v0" : 130, "v1" : 129, "bCoef" : -0.5, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : ["red","blue" ], "color" : "9C0000" },
		{ "v0" : 132, "v1" : 131, "bCoef" : -0.5, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : ["red","blue" ], "color" : "9C0000" },
		{ "v0" : 134, "v1" : 133, "bCoef" : -0.5, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : ["red","blue" ], "color" : "9C0000" },
		{ "v0" : 136, "v1" : 135, "bCoef" : -0.5, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : ["red","blue" ], "color" : "5300BD" },
		{ "v0" : 138, "v1" : 137, "bCoef" : -0.5, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : ["red","blue" ], "color" : "5300BD" },
		{ "v0" : 140, "v1" : 139, "bCoef" : -0.5, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : ["red","blue" ], "color" : "5300BD" },
		{ "v0" : 142, "v1" : 141, "bCoef" : -0.5, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : ["red","blue" ], "color" : "5300BD" },
		{ "v0" : 144, "v1" : 143, "bCoef" : -0.5, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : ["red","blue" ], "color" : "FFA203" },
		{ "v0" : 146, "v1" : 145, "bCoef" : -0.5, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : ["red","blue" ], "color" : "FFA203" },
		{ "v0" : 148, "v1" : 147, "bCoef" : -0.5, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : ["red","blue" ], "color" : "FFA203" },
		{ "v0" : 150, "v1" : 149, "bCoef" : -0.5, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : ["red","blue" ], "color" : "FFA203" },
		{ "v0" : 152, "v1" : 151, "bCoef" : -0.5, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : ["red","blue" ], "color" : "96B02" },
		{ "v0" : 154, "v1" : 153, "bCoef" : -0.5, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : ["red","blue" ], "color" : "96B02" },
		{ "v0" : 156, "v1" : 155, "bCoef" : -0.5, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : ["red","blue" ], "color" : "96B02" },
		{ "v0" : 158, "v1" : 157, "bCoef" : -0.5, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : ["red","blue" ], "color" : "96B02" },
		{ "v0" : 160, "v1" : 159, "bCoef" : -0.5, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : ["red","blue" ], "color" : "96B02" },
		{ "v0" : 162, "v1" : 161, "bCoef" : -0.5, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : ["red","blue" ], "color" : "96B02" },
		{ "v0" : 164, "v1" : 163, "bCoef" : -0.5, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : ["red","blue" ], "color" : "96B02" },
		{ "v0" : 166, "v1" : 165, "bCoef" : -0.5, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : ["red","blue" ], "color" : "96B02" },
		{ "vis" : false, "color" : "FFFFFF", "cMask" : ["red","blue" ], "v0" : 167, "v1" : 168, "y" : -230 },
		{ "v0" : 169, "v1" : 170, "cMask" : [ ], "color" : "E6E7FF", "x" : -130 },
		{ "v0" : 171, "v1" : 172, "cMask" : [ ], "color" : "E6E7FF", "x" : -125 },
		{ "color" : "E6E7FF", "v0" : 171, "v1" : 169 },
		{ "color" : "E6E7FF", "v0" : 172, "v1" : 170 },
		{ "v0" : 173, "v1" : 174, "cMask" : [ ], "color" : "E6E7FF", "x" : 130 },
		{ "v0" : 175, "v1" : 176, "cMask" : [ ], "color" : "E6E7FF", "x" : 135 },
		{ "color" : "E6E7FF", "v0" : 175, "v1" : 173 },
		{ "color" : "E6E7FF", "v0" : 176, "v1" : 174 }

	],

	"planes" : [
		{ "normal" : [0,-1 ], "dist" : -230, "bCoef" : 0, "cMask" : ["red","blue","ball" ] },
		{ "normal" : [-1,0 ], "dist" : -500, "bCoef" : 0, "cMask" : ["red","blue","ball" ] },
		{ "normal" : [1,0 ], "dist" : -500, "bCoef" : 0, "cMask" : ["red","blue","ball" ] }

	],

	"goals" : [
		

	],

	"discs" : [
		{ "pos" : [447,-48 ], "radius" : 5, "color" : "0000ff", "cMask" : [ ] },
		{ "pos" : [449,48 ], "radius" : 5, "color" : "0000ff", "cMask" : [ ] },
		{ "pos" : [-448,49 ], "radius" : 5, "color" : "ff0000", "cMask" : [ ] },
		{ "pos" : [-449,-49 ], "radius" : 5, "color" : "ff0000", "cMask" : [ ] }

	],

	"playerPhysics" : {
		"bCoef" : 0.35,
		"invMass" : 1,
		"damping" : 0.95,
		"acceleration" : 0.12,
		"kickingDamping" : 0.95,
		"kickStrength" : 0

	},

	"ballPhysics" : {
		"radius" : 0.001,
		"bCoef" : 1.1,
		"invMass" : 0.999,
		"damping" : 0,
		"color" : "C9F364"

	},

	"spawnDistance" : 500,

	"traits" : {
		

	}
}`;
room.onGameStart = function(player) {
	playersNotInLine = [];
	playersNotInLineId = [];
	[redTeam, blueTeam] = whichTeam();
	ballCarrying = initBallCarrying(redTeam, blueTeam);
	timeOnHalves = [0, 0];
	lineCrossedPlayers = [{
		name: "temp",
		times: 0,
		id: "temp2"
	}];
	lastScores = room.getScores().red + room.getScores().blue;
	timeOutside = 0;
	isTimeAddedShown = false;
	lineBallPosition = 0;
	zaman = true;
	redPoss = 0;
	bluePoss = 0;
	avatarSettings();
}

function initBallCarrying(redTeam, blueTeam) {
	var ballCarrying = new Map();
	var playing = redTeam.concat(blueTeam);
	for (var i = 0; i < playing.length; i++) {
		ballCarrying.set(playing[i].name, [0, playing[i].team]); // secs, team, %
	}
	return ballCarrying;
}



function updateTeamPoss(value) {
	if (value[1] == 1) redPoss += value[0];
	if (value[1] == 2) bluePoss += value[0];
}

var boldedNumbers = '𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗';
var circledNumbers = '🄋⓵⓶⓷⓸⓹⓺⓻⓼⓽';

function boldedNumber(num) {
	var result = '';
	var reversedDigits = [];
	do {
		reversedDigits.push(num % 10);
		num = Math.floor(num / 10);
	} while (num > 0);
	for (var i = reversedDigits.length; i-- > 0;) {
		result += boldedNumbers.substr(reversedDigits[i] * 2, 2);
	}

	return result;
}

function circledNumber(num) {
	var result = '';
	var reversedDigits = [];
	do {
		reversedDigits.push(num % 10);
		num = Math.floor(num / 10);
	} while (num > 0);
	for (var i = reversedDigits.length; i-- > 0;) {
		if (reversedDigits[i] == 0) {
			result += circledNumbers.substr(reversedDigits[i], 2);
		} else {
			result += circledNumbers.substr(1 + reversedDigits[i], 1);
		}
	}

	return result;
}

var bluePoss;
var redPoss;
var timeOnHalves;

function teamPossFun() {
	if (room.getScores() == null) return false;
	bluePoss = 0;
	redPoss = 0
	ballCarrying.forEach(updateTeamPoss);
	var redPossPercent = Math.round((redPoss / (redPoss + bluePoss + 0.000001)) * 100);
	var bluePossPercent = Math.round((bluePoss / (redPoss + bluePoss + 0.000001)) * 100);
	room.sendChat("⛹ Possession of the ball:  Tᴇᴀᴍ Rᴇᴅ 🔴 " + boldedNumber(redPossPercent) + "% - " + boldedNumber(bluePossPercent) + "% Tᴇᴀᴍ Bʟᴜᴇ 🔵 ");

	var timeOnRedHalf = Math.round((timeOnHalves[0] / (timeOnHalves[0] + timeOnHalves[1] + 0.000001)) * 100);
	var timeOnBlueHalf = Math.round((timeOnHalves[1] / (timeOnHalves[0] + timeOnHalves[1] + 0.000001)) * 100);
	room.sendChat("◧ Ball in playing field: Tᴇᴀᴍ Rᴇᴅ 🔴 " + boldedNumber(timeOnRedHalf) + "% - " + boldedNumber(timeOnBlueHalf) + "% Tᴇᴀᴍ Bʟᴜᴇ 🔵 ");
}

updateTimeOnHalves = function() {
	if (room.getBallPosition().x < 0) {
		timeOnHalves[0] += 1 / 60;
	} else if (room.getBallPosition().x > 0) {
		timeOnHalves[1] += 1 / 60;
	}
}

function whichTeam() { // gives the players in the red or blue team
	var players = room.getPlayerList();
	var redTeam = players.filter(player => player.team == 1);
	var blueTeam = players.filter(player => player.team == 2);
	return [redTeam, blueTeam]
}

room.onPlayerBallKick = function(player) {
	var ballPosition = room.getBallPosition();
	if (player.name != lastPlayerTouched) {
		if (lastTeamTouched == player.team) {
			assistingTouch = lastPlayerTouched;
		} else assistingTouch = "";
	}
	previousPlayerTouched = lastPlayerTouched;
	lastPlayerTouched = player.name;
	lastTeamTouched = player.team;

	if (isBallOutsideStadium) {
		getPlayersNotWithinLine();
		checkPlayersLine();
	}
	if (isBallOutsideStadium && ballPosition.y < 0)
		if ((ballPosition.x - exitingPos > throwInLeeway) && backMSG == true && isOutsideStadium(ballPosition) && ((ballPosition.y - outLineY > 50) || (ballPosition.y - outLineY < -50)))
			if ((ballPosition.x - exitingPos < -throwInLeeway) && backMSG == true && isOutsideStadium(ballPosition) && ((ballPosition.y - outLineY > 50) || (ballPosition.y - outLineY < -50))) {
				isBallKickedOutside = true;
				room.setDiscProperties(0, {
					"x": exitingPos,
					"y": exitingPos2
				})
				room.setDiscProperties(0, {
					xspeed: 0,
					yspeed: 0
				});
			} else if (isBallOutsideStadium && ballPosition.y > 0)
		if ((ballPosition.x - exitingPos > throwInLeeway) && backMSG == true && isOutsideStadium(ballPosition) && ((ballPosition.y - outLineY > 50) || (ballPosition.y - outLineY < -50)))
			if ((ballPosition.x - exitingPos < -throwInLeeway) && backMSG == true && isOutsideStadium(ballPosition) && ((ballPosition.y - outLineY > 50) || (ballPosition.y - outLineY < -50))) {
				isBallKickedOutside = true;
				room.setDiscProperties(0, {
					"x": exitingPos,
					"y": exitingPos2
				})
				room.setDiscProperties(0, {
					xspeed: 0,
					yspeed: 0
				});
			} else isBallKickedOutside = false;
	if (player.team == 1) {
		redPoss++;
	}
	if (player.team == 2) {
		bluePoss++;
	}
}
/*
room.onPlayerBallKick = function(checkBallPosition) {
    var ballPosition = room.getBallPosition();
    if(realMap==true){
    if(isOutsideStadium(ballPosition)) {
      ballOut=true;
        if(!isBallOutsideStadium) {
            isBallOutsideStadium = true;
            exitingPos = ballPosition.x;
            exitingPos2 = ballPosition.y;
            var totalScores = room.getScores().red + room.getScores().blue;
            if(lastScores != totalScores) {
                lastScores = totalScores;
                return false;
            }
            if(ballPosition.x > stadiumWidth && lastTeamTouched == Team.RED || ballPosition.x < -stadiumWidth && lastTeamTouched == Team.BLUE) {
           
                lastCall = lastTeamTouched == Team.RED ? "2" : "1";            
               
                if(ballPosition.x<0 && ballPosition.y<0){BallPosition( -1457,-248,0,0)}
                if(ballPosition.x<0 && ballPosition.y>0){BallPosition( -1457, 248,0,0)}
                if(ballPosition.x>0 && ballPosition.y>0){BallPosition(  1457, 248,0,0)}
                if(ballPosition.x>0 && ballPosition.y<0){BallPosition(  1457,-248,0,0)}
                setBallColor(lastCall == 1 ? 0xFF0000:0x0000FF);
 
               
               
            }
            else if(ballPosition.x > stadiumWidth && lastTeamTouched == Team.BLUE || ballPosition.x < -stadiumWidth && lastTeamTouched == Team.RED) {
               
                lastCall = lastTeamTouched == Team.RED ? "2" : "1";            
               
                if(ballPosition.x<0 && ballPosition.y<0){BallPosition(-1457,-692,0,0)}
                if(ballPosition.x<0 && ballPosition.y>0){BallPosition(-1457, 692,0,0)}
                if(ballPosition.x>0 && ballPosition.y>0){BallPosition( 1457, 692,0,0)}
                if(ballPosition.x>0 && ballPosition.y<0){BallPosition( 1457,-692,0,0)}
                setBallColor(lastCall == 1 ? 0xFF0000:0x0000FF);
 
            }
            else {
           
                isBallKickedOutside = false;
               
                lastCall = lastTeamTouched == Team.RED ? "2" : "1";
                setBallColor(lastCall == 1 ? 0xFF0000:0x0000FF);
            if(exitingPos2>0){BallPosition(exitingPos,exitingPos2+15,0,0);}
            if(exitingPos2<0){BallPosition(exitingPos,exitingPos2-15,0,0);}
            //lastTeamTouched == Team.RED ? room.sendAnnouncement("▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇",null,0x0080ff,"bold",0): room.sendAnnouncement("▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇          ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇",null,0xCC5733,"bold",0)
               
            }
 
        }
    }
    else {
        if(ballOut==true){ setBallColor(0xFFFFFF);}
        isBallOutsideStadium = false;
        backMSG = true;
        ballOut=false;
       
    }
      return true;
    }
       
}
*/
function isBallGoingUp() {
	previousBallPosForGoingUp = currentBallPosForGoingUp;
	currentBallPosForGoingUp = room.getBallPosition().y;

	if (previousBallPosForGoingUp - currentBallPosForGoingUp > 0.01) {
		isBallUp = 2;
	} else if (previousBallPosForGoingUp - currentBallPosForGoingUp < -0.01) {
		isBallUp = 1;
	} else {
		isBallUp = 0;
	}
}

function addedTime() {
	var ballPosition = room.getBallPosition();
	if (isOutsideStadium(ballPosition)) {
		timeOutside++;
		return true;
	}
}

function GetTeam(id) {
	return room.getPlayerList().filter((player) => player.id != 0 && player.team == id);
}

function checkEnd() {
	var scores = room.getScores();
	if (scores.time > 360 && scores.time < 362 && !isTimeAddedShown) {
		actualTimeAdded = Math.round((timeOutside / 60));
		actualTimeAdded2 = actualTimeAdded * 1;
		if (actualTimeAdded > 0) {
			room.sendAnnouncement(" Uzatma ➕ " + actualTimeAdded2 + " Saniye ⏳ ", null, 0x00FF7F, "bold", 2);
			var totalSeconds = 360 + actualTimeAdded2;
			var hours = Math.floor(totalSeconds / 3600);
			var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
			var seconds = totalSeconds - (hours * 3600) - (minutes * 60);

			// round seconds
			seconds = Math.round(seconds * 100) / 100

			var result = "Maçın biteceği süre ⌛ "
			result += ": " + (minutes < 10 ? "0" + minutes : minutes);
			result += ":" + (seconds < 10 ? "0" + seconds : seconds);
			room.sendAnnouncement(result, null, 0xFFD700, "bold", 2);
		} else if (actualTimeAdded < 0) {
			room.sendChat("Uzatma Yok ");
		} else {
			room.sendChat("Uzatma: + 2 DK");
		}
		isTimeAddedShown = true;
	}
}


function uzatmalar() {
	var scores = room.getScores();
	if (scores.time > (360 + actualTimeAdded2) && scores.time < (360.03 + actualTimeAdded2)) {

		sustur = false;
		//Kırmızılar kazanırsa
		if (scores.red > scores.blue) {
			mavikazandi();
			redkazandi++;
			var spec = GetTeam(0);
			var red = GetTeam(1);
			var blue = GetTeam(2);
			var red_ = red.length;
			var blue_ = blue.length;
			var spec_ = spec.length;
			var tempRed = red_;
			var tempBlue = blue_;
			for (var i = 0; i < red.length; i++) {
				GetOyuncu(red[i].id).galibiyet++;
			}
			for (var i = 0; i < blue.length; i++) {
				GetOyuncu(blue[i].id).yenilgi++;
			}
			for (var i = 0; i < blue_; i++) {
				room.setPlayerTeam(blue[i].id, 0);
			}
			for (var i = 0; i < spec_; i++) {
				room.setPlayerTeam(spec[i].id, 2);
			}
			realMap = false;
			avatarTime = true;
			room.stopGame();
			room.setCustomStadium(dizilim);
			room.startGame();
			redTeam = [0, 0, 0, 0, 0, 0];
			blueTeam = [0, 0, 0, 0, 0, 0];
			room.sendAnnouncement("🔴 Kırmızılar " + redkazandi + " maçtır kazanıyor ! ", null, 0x91F8FF, "bold", 2);
		}
		if (scores.blue == 0) {
			var spec = GetTeam(0);
			var red = GetTeam(1);
			var blue = GetTeam(2);
			var red_ = red.length;
			var blue_ = blue.length;
			var spec_ = spec.length;
			var tempRed = red_;
			var tempBlue = blue_;
			for (var i = 0; i < red.length; i++) {
				GetOyuncu(red[0].id).cs += 1;
			}
			room.sendAnnouncement("🔴 Kırmızı takımın kalecisi bu maç cs kazandı ! ", null, 0x91F8FF, "bold", 2);
		}

		//Maviler Kazanırsa               
		if (scores.blue > scores.red) {
			kirmizikazandi();
			bluekazandi++;
			var spec = GetTeam(0);
			var red = GetTeam(1);
			var blue = GetTeam(2);
			var red_ = red.length;
			var blue_ = blue.length;
			var spec_ = spec.length;
			var tempRed = red_;
			var tempBlue = blue_;
			for (var i = 0; i < blue.length; i++) {
				GetOyuncu(blue[i].id).galibiyet++;
			}
			for (var i = 0; i < red.length; i++) {
				GetOyuncu(red[i].id).yenilgi++;
			}
			for (var i = 0; i < red_; i++) {
				room.setPlayerTeam(red[i].id, 0);
			}
			for (var i = 0; i < spec_; i++) {
				room.setPlayerTeam(spec[i].id, 1);
			}
			realMap = false;
			avatarTime = true;
			room.stopGame();
			room.setCustomStadium(dizilim);
			room.startGame();
			redTeam = [0, 0, 0, 0, 0, 0];
			blueTeam = [0, 0, 0, 0, 0, 0];
			room.sendAnnouncement("🔵 Maviler " + bluekazandi + " maçtır kazanıyor !", null, 0x91F8FF, "bold", 2);
		}
		if (scores.red == 0) {
			var spec = GetTeam(0);
			var red = GetTeam(1);
			var blue = GetTeam(2);
			var red_ = red.length;
			var blue_ = blue.length;
			var spec_ = spec.length;
			var tempRed = red_;
			var tempBlue = blue_;
			for (var i = 0; i < blue.length; i++) {
				GetOyuncu(blue[0].id).cs += 1;
			}
			room.sendAnnouncement("🔵 Mavi takımın kalecisi bu maç cs kazandı !", null, 0x91F8FF, "bold", 2);
		}
		//Maç Berabere Biterse
		kirmiziTakim = [];
		maviTakim = [];
		if (scores.blue == scores.red) {
			setTimeout(function() {
				room.sendAnnouncement("⭐ Penaltı komutları !redpen , !bluepen , !redwin , !bluewin  ", null, 0x91F8FF, "bold", 2);
			}, 500);
			var spec = GetTeam(0);
			var red = GetTeam(1);
			var blue = GetTeam(2);
			var red_ = red.length;
			var blue_ = blue.length;
			var spec_ = spec.length;
			var tempRed = red_;
			var tempBlue = blue_;
			for (var i = 0; i < red_; i++) {
				kirmiziTakim.push(red[i].id)
			}
			for (var i = 0; i < blue_; i++) {
				maviTakim.push(blue[i].id)
			}
			for (var i = 0; i < blue.length; i++) {
				GetOyuncu(blue[i].id).beraberlik++;
			}
			for (var i = 0; i < red.length; i++) {
				GetOyuncu(red[i].id).beraberlik++;
			}
			realMap = false;
			avatarTime = false;
			room.stopGame();
			room.setCustomStadium(penalti);
			room.startGame();
			room.stopGame();
		} else if (scores.red == 0 && scores.blue == 0) {
			var spec = GetTeam(0);
			var red = GetTeam(1);
			var blue = GetTeam(2);
			var red_ = red.length;
			var blue_ = blue.length;
			var spec_ = spec.length;
			var tempRed = red_;
			var tempBlue = blue_;
			for (var i = 0; i < red.length; i++) {
				GetOyuncu(red[0].id).cs += 1;
			}
			for (var i = 0; i < blue.length; i++) {
				GetOyuncu(blue[0].id).cs += 1;
			}
			room.sendAnnouncement("🔴🔵 İki takımın kalecisi de bu maç cs kazandı !", null, 0x91F8FF, "bold", 2);
		}
		//Topla Oynama Yüzdesi
		var redPossPercent = Math.round((redPoss / (redPoss + bluePoss + 0.000001)) * 100);
		var bluePossPercent = Math.round((bluePoss / (redPoss + bluePoss + 0.000001)) * 100);
		room.sendAnnouncement("⚖️ Topa Sahip Olma Yüz.  🔴 " + redPossPercent + "% ⚔️ " + bluePossPercent + "% 🔵", null, 0x91F8FF, "bold", 2);
		var timeOnRedHalf = Math.round((timeOnHalves[0] / (timeOnHalves[0] + timeOnHalves[1] + 0.000001)) * 100);
		var timeOnBlueHalf = Math.round((timeOnHalves[1] / (timeOnHalves[0] + timeOnHalves[1] + 0.000001)) * 100);
		room.sendAnnouncement("⛹◧ Oynanılan Saha   Tᴇᴀᴍ Rᴇᴅ 🔴 " + boldedNumber(timeOnRedHalf) + "% - " + boldedNumber(timeOnBlueHalf) + "% Tᴇᴀᴍ Bʟᴜᴇ 🔵 ", null, 0x91F8FF, "bold", 2);
	}
}
var tickCount = 0;
room.onGameTick = function() {
	isThrowInCorrect();
	getLastTouchTheBall();
	checkBallPosition();
	isBackRequired();
	hasBallLeftTheLine();
	addedTime();
	ustunlukTespitEdildi();
	updateTimeOnHalves();
	checkEnd();
	uzatmalar();
	tickCount++;


}

room.onPlayerJoin = function(player) {
	room.setPlayerAvatar(player.id, "0");
	console.log("👋👋👋 " + player.name + " # " + player.id + " Joined - " + player.auth);
	CreateOyuncu(player);
	room.sendAnnouncement("💬 Hoşgeldin " + player.name + " Maç süresi 6 dk. | Uzatmalar : Topun saha dışında kaldığı süre.", player.id, 0x00EEFF, "bold", 2);
	room.sendAnnouncement("🤖 Kullanabileceğin komutlar !komutlar !rank !best !votekick - !yaylı !yaysız", player.id, 0x00FF00, "bold", 2);
	room.sendAnnouncement("⚠️ Taç çizgisini kurallarını 3 kere ihlâl eden kırmızı kart yer ve spec atılır.", player.id, 0xF7FF00, "bold", 2);
	room.sendAnnouncement("İstemediğin oyuncuyu atmak için !votekick {oyuncu numarası} .Oyuncu numaralarını öğrenmek için !numaralar yazınız..", null, 0xFF7700, "bold", 2);
	room.sendAnnouncement("Discord sunucumuza bekleriz : https://discord.gg/kjpMWJp ", null, 0xEBEBEB, "bold", 2);
}


function isOutsideStadium(ballPosition) {
	if (ballPosition.y < -135 || ballPosition.y > 135) {
		return ballPosition.x > stadiumWidth || ballPosition.x < -stadiumWidth || ballPosition.y > stadiumHeight || ballPosition.y < -stadiumHeight;
	}
}



function getLastTouchTheBall() {
	var ballPosition = room.getBallPosition();
	var players = room.getPlayerList();
	for (var i = 0; i < players.length; i++) {
		if (players[i].position != null) {
			var distanceToBall = pointDistance(players[i].position, ballPosition);
			if (distanceToBall < triggerDistance) {
				if (lastPlayerTouched != players[i].name) {
					if (lastTeamTouched == players[i].team) {
						assistingTouch = lastPlayerTouched;
					} else assistingTouch = "";
				}
				lastTeamTouched = players[i].team;
				previousPlayerTouched == lastPlayerTouched;
				lastPlayerTouched = players[i].name;
			}
		}
	}
	return lastPlayerTouched;
}

function pointDistance(p1, p2) {
	var d1 = p1.x - p2.x;
	var d2 = p1.y - p2.y;
	return Math.sqrt(d1 * d1 + d2 * d2);
}
var playersNotInLine = new Array;

function getPlayersNotWithinLine() {
	playersNotInLine = new Array;
	var players = room.getPlayerList();
	for (var i = 0; i < players.length; i++) {
		if (players[i].position != null) {
			if (players[i].team != lastTeamTouched && players[i].team != lastCall && lastCall != "CK" && lastCall != "GK") {
				if ((players[i].position.y > greenLine || players[i].position.y < -greenLine) && pointDistance(room.getBallPosition(), players[i].position) < 500) {
					playersNotInLine.push(players[i].name);
					playersNotInLineId.push(players[i].id);
				}
			}

		}
	}
	playersNotInLineId = new Array;
	var players = room.getPlayerList();
	for (var i = 0; i < players.length; i++) {
		if (players[i].position != null) {
			if (players[i].team != lastTeamTouched && players[i].team != lastCall && lastCall != "CK" && lastCall != "GK") {
				if ((players[i].position.y > greenLine || players[i].position.y < -greenLine) && pointDistance(room.getBallPosition(), players[i].position) < 500) {

					playersNotInLineId.push(players[i].id);

				}
			}

		}
	}

}

function checkPlayersLine() {
	for (var i = 0; i < playersNotInLine.length; i++) {
		var found = false;
		for (var j = 0; j < lineCrossedPlayers.length; j++) {
			if (lineCrossedPlayers[j].name == playersNotInLine[i]) {
				lineCrossedPlayers[j].times = lineCrossedPlayers[j].times + 1;
				room.sendAnnouncement("Çizgi - " + lineCrossedPlayers[j].name + " {" + lineCrossedPlayers[j].times + " /3} ...", null, 0x00FF00, "bold", 1);
				found = true;
				//oyunucuyu spec at
				if (lineCrossedPlayers[j].times == 3) {
					room.setPlayerTeam(lineCrossedPlayers[j].id, 0);
					room.sendAnnouncement(lineCrossedPlayers[j].name + " 3 kere taç çizgisi kuralını ihlal ettiğin için kırmızı kart gördün ve spec atıldın ...", null, 0x00FF00, "bold", 2);
					room.sendAnnouncement(lineCrossedPlayers[j].name + " Takımın,oyunun geri kalan süresi boyunca sensiz devam etmek zorunda ): ", null, 0xD90000, "bold", 2);
				}
			}

		}
		if (!found) {
			lineCrossedPlayers.push({
				name: playersNotInLine[i],
				times: 1,
				id: playersNotInLineId[i],
				punished: false

			});

			room.sendAnnouncement("Çizgi - " + playersNotInLine[i] + " {1/3}", null, 0x00FF00, "bold", 1);
		}
	}

}
var trigger = false;
var wrongThrowPosition = false;

function isBackRequired() {
	var ballPosition = room.getBallPosition();
	if (!isBallKickedOutside) {
		if (lastCall == "1") {
			if ((ballPosition.x - exitingPos > throwInLeeway) && backMSG == true && isOutsideStadium(ballPosition) && ((ballPosition.y - outLineY > 50) || (ballPosition.y - outLineY < -50))) {
				backMSG = false;
				room.setDiscProperties(0, {
					"x": exitingPos,
					"y": exitingPos2
				})
				room.setDiscProperties(0, {
					xspeed: 0,
					yspeed: 0
				});
				//room.sendAnnouncement("Taç el değiştirdi",null,0xFF0000,"bold",2);
				setBallColor(lastCall == 1 ? 0x0000FF : 0xFF0000);
				trigger = true;
				wrongThrowPosition = true;


			}
			if ((ballPosition.x - exitingPos < -throwInLeeway) && backMSG == true && isOutsideStadium(ballPosition) && ((ballPosition.y - outLineY > 50) || (ballPosition.y - outLineY < -50))) {
				backMSG = false;
				room.setDiscProperties(0, {
					"x": exitingPos,
					"y": exitingPos2
				})
				room.setDiscProperties(0, {
					xspeed: 0,
					yspeed: 0
				});
				//room.sendAnnouncement("Taç el değiştirdi",null,0x00FF00,"bold",2);
				setBallColor(lastCall == 1 ? 0xFF0000 : 0x0000FF); //0xFF0000:0x0000FF
				trigger = true;
				wrongThrowPosition = true;


			}
		}
		if (lastCall == "2") {
			if ((ballPosition.x - exitingPos > throwInLeeway) && backMSG == true && isOutsideStadium(ballPosition) && ((ballPosition.y - outLineY > 50) || (ballPosition.y - outLineY < -50))) {
				backMSG = false;
				room.setDiscProperties(0, {
					"x": exitingPos,
					"y": exitingPos2
				})
				room.setDiscProperties(0, {
					xspeed: 0,
					yspeed: 0
				});
				//room.sendAnnouncement("Taç el değiştirdi",null,0x00FF00,"bold",2);
				setBallColor(lastCall == 1 ? 0xFF0000 : 0x0000FF);
				trigger = true;
				wrongThrowPosition = true;

			}
			if ((ballPosition.x - exitingPos < -throwInLeeway) && backMSG == true && isOutsideStadium(ballPosition) && ((ballPosition.y - outLineY > 50) || (ballPosition.y - outLineY < -50))) {
				backMSG = false;
				room.setDiscProperties(0, {
					"x": exitingPos,
					"y": exitingPos2
				})
				room.setDiscProperties(0, {
					xspeed: 0,
					yspeed: 0
				});
				//room.sendAnnouncement("Taç el değiştirdi",null,0xFF0000,"bold",2);
				setBallColor(lastCall == 1 ? 0x0000FF : 0xFF0000);
				trigger = true;
				wrongThrowPosition = true;

			}
		}
	}
	if (lastCall == "2" && trigger && isOutsideStadium && Math.abs(exitingPos - ballPosition.x) < throwInLeeway - 50) {
		room.setDiscProperties(0, {
			"x": exitingPos,
			"y": exitingPos2
		})
		room.setDiscProperties(0, {
			xspeed: 0,
			yspeed: 0
		});
		//room.sendAnnouncement("Taç el değiştirdi",null,0xF6FF73,"bold",2);
		//setBallColor(lastCall == 1 ? 0x0000FF:0xFF0000);
		trigger = false;
		wrongThrowPosition = false;
		backMSG = true;
	}
	if (lastCall == "1" && trigger && isOutsideStadium && Math.abs(exitingPos - ballPosition.x) < throwInLeeway - 50) {
		room.setDiscProperties(0, {
			"x": exitingPos,
			"y": exitingPos2
		})
		room.setDiscProperties(0, {
			xspeed: 0,
			yspeed: 0
		});
		//room.sendAnnouncement("Taç el değiştirdi",null,F6FF73,"bold",2);
		//setBallColor(lastCall == 1 ? 0x0000FF:0xFF0000);
		trigger = false;
		wrongThrowPosition = false;
		backMSG = true;
	}



}

function isThrowInCorrect() {
	var ballPosition = room.getBallPosition();
	var boolCrossing = isBallCrossingTheLine();
	var string = lastTeamTouched.toString();

	if (boolCrossing && !isBallKickedOutside && string == lastCall && (lastCall == "1" || lastCall == "2")) {

		//  if(lastCall=="2"){room.sendAnnouncement("Sürükleyerek kullanma",null,0xDDFF30,"bold",2);}
		//  if(lastCall=="1"){ room.sendAnnouncement("Sürükleyerek kullanma",null,0xDDFF30,"bold",2);}

		isBallKickedOutside == false;
	} else if (boolCrossing && string != lastCall && (lastCall == "1" || lastCall == "2")) {

		wrongThrowPosition = false;
		trigger = false;
	} else if (boolCrossing && wrongThrowPosition && string == lastCall && (lastCall == "1" || lastCall == "2")) {

		room.sendAnnouncement("️ Yanlış Yer,Lütfen yerinden kullanmaya dikkat edelim ", null, 0x00FF00, "bold", 2);
		wrongThrowPosition = false;
		trigger = false;
	} else if (boolCrossing) {
		checkPlayersLine();
	}

}

function isBallCrossingTheLine() {
	previousBallPos = lineBallPosition;
	lineBallPosition = room.getBallPosition().y;
	crossed = (lineBallPosition < stadiumHeight && previousBallPos > stadiumHeight) || (lineBallPosition > -stadiumHeight && previousBallPos < -stadiumHeight);
	return (lineBallPosition < stadiumHeight && previousBallPos > stadiumHeight) || (lineBallPosition > -stadiumHeight && previousBallPos < -stadiumHeight);
}

var previousBallPosForGoingUp;
var currentBallPosForGoingUp;

function hasBallLeftTheLine() {
	var ballPosition = room.getBallPosition();
	if (ballPosition.y < outLineY && isBallKickedOutside) {} else if (ballPosition.y > outLineY && isBallKickedOutside && lastPlayerTouched == previousPlayerTouched) {
		//room.sendChat("BAD THROW-IN");
	}

}
var mutedPlayers = [];

room.onStadiumChange = function(newStadiumName, byPlayer) {}

room.onTeamGoal = function(team) {
	if (team == 1) {
		redgolatti = true;
	}
	if (team == 2) {
		bluegolatti = true;
	}
	if (realMap == true) {
		BallPosition(0, -700, 0, 0);
	}
	var red = GetTeam(1);
	var blue = GetTeam(2);
	var red_ = red.length;
	var blue_ = blue.length;
	var time = room.getScores().time;
	var m = Math.trunc(time / 60);
	var s = Math.trunc(time % 60);
	if (s < 10) {
		time = "0" + m + ":0" + Math.floor(s);
	} else {
		time = "0" + m + ":" + Math.floor(s);
	}

	var r_text = new Array();
	//r_text[0] = " Yapma, Hayrettin yapma! Yapma be Hayrettin daha kadroları saymadım ";
	r_text[0] = " KİM ATTI KRAL ATTI ";
	//r_text[2] = " Rapaiç atıyor 3 oluyor ";
	r_text[1] = " Şapka çıkaracaksınız şapka!";
	r_text[2] = " SERGEN ATTI! SERGEN ATTI ŞAMPİYONLUK GELDİ ";
	r_text[3] = " ALEX YOK BÖYLE BİR GOL ";
	r_text[4] = " Allah’ım gole bak! ";
	//r_text[7] = " Ellerinden öpüyorum Rüştü! Her yerinden öpüyorum Rüştü! ";
	r_text[5] = " Eboue Goool Çivi Gibi Çaktı! ";
	r_text[6] = " Meireless vurdu Gooool, Koçum benim! ";


	var r_textLength = r_text.length;
	for (var i = 0; i < length; i++) {
		var i = Math.floor(Math.random() * r_textLength)
		room.sendAnnouncement(r_text[i]);
	}


	ballSpeed = (pointDistance(point[0], point[1]) * 60 * 60 * 60) / 15000;
	var ballPosition = room.getBallPosition();
	point[1] = point[0];
	point[0] = ballPosition;

	var players = room.getPlayerList();
	for (var i = 0; i < players.length; i++) {
		if (players[i].name == assistingTouch) {
			asistid = players[i].id;
		}
	}
	for (var i = 0; i < players.length; i++) {
		if (players[i].name == lastPlayerTouched) {
			if (players[i].name != assistingTouch && assistingTouch != "") {
				GetOyuncu2(assistingTouch).asist += 1;
			}
		}
	}
	for (var i = 0; i < players.length; i++) {
		if (players[i].name == lastPlayerTouched) {
			if (players[i].team == team) {
				if (players[i].name != assistingTouch && assistingTouch != "") {
					GetOyuncu2(players[i].name).gol += 1;
				} else {
					GetOyuncu2(players[i].name).gol += 1;
				}
			}
		}
	}
	for (var i = 0; i < players.length; i++) {
		if (players[i].name == lastPlayerTouched) {
			if (players[i].team == team) {
				if (players[i].name != assistingTouch && assistingTouch != "") {
					if (players[i].team == 1) {
						room.sendChat("🔴⚽ " + players[i].name + " (" + assistingTouch + " )" + "  ⌛" + time + " . Gol Hızı  : " + ballSpeed.toPrecision(4).toString() + " 💨 km/h ");
						room.sendChat(r_text[i]);
						assistingTouch = "";
						lastPlayerTouched = "";
					}
					if (players[i].team == 2) {
						room.sendChat("🔵 " + players[i].name + " ( " + assistingTouch + " )" + "  ⌛" + time);
						room.sendChat(r_text[i]);
						assistingTouch = "";
						lastPlayerTouched = "";
					}
				} else {
					if (players[i].team == 1) {
						room.sendChat("🔴⚽ " + players[i].name + "  ⌛" + time + " . Gol Hızı  : " + ballSpeed.toPrecision(4).toString() + " 💨 km/h ");
						assistingTouch = "";
						lastPlayerTouched = "";
					}
					if (players[i].team == 2) {
						room.sendChat("🔵 " + players[i].name + "  ⌛" + time);
						assistingTouch = "";
						lastPlayerTouched = "";
					}
				}
			} else {
				if (players[i].team == 1) {
					GetOyuncu2(players[i].name).kk += 1;
				} {
					room.sendChat("🔵  " + players[i].name + "(kk)" + " ⌛" + time);
				}
				if (players[i].team == 2) {
					GetOyuncu2(players[i].name).kk += 1;
				} {
					room.sendChat("🔴   " + players[i].name + " (kk) " + " ⌛" + time);
				}
			}
		}
	}
	asistid = "";

}


function oylama2(player) {
	if (zaman == false) {
		room.sendAnnouncement("🗳️👍🏽👎🏽 " + player.name + " oylamayı başlatmıştır. Komutlar !yaylı  !yaysız .Oylama Süresi 15 saniye.", null, 0x00FF00, "bold", 2);
		oylamazamani = true;
		setTimeout(function() {
			oylamazamani = false;
			if (yaysizlar.length > yaylilar.length) {
				realMap = true;
				avatarTime = false;
				room.stopGame();
				room.setCustomStadium(RSHLMap);
				room.startGame();
				res = false;
				room.sendAnnouncement("Oylama Sonucu: [Yaylı : " + yaylilar.length + " 🆚 Yaysız : " + yaysizlar.length + " ] Oylama sonucu yaysız harita çıkmıştır !", null, 0x00FF00, "bold", 2);
				setTimeout(function() {
					stadiumWidth = 1403;
					stadiumHeight = 667;
					radiusBall = 8;
					throwInLeeway = 500;
					greenLine = 565;
				}, 500);
			}
			if (yaysizlar.length < yaylilar.length) {
				realMap = true;
				avatarTime = false;
				room.stopGame();
				room.setCustomStadium(RSHLMap2);
				room.startGame();
				res = false;
				room.sendAnnouncement("Oylama Sonucu: [Yaylı : " + yaylilar.length + " 🆚 Yaysız : " + yaysizlar.length + " ] Oylama sonucu yaylı harita çıkmıştır !", null, 0x00FF00, "bold", 2);
				setTimeout(function() {
					stadiumWidth = 1403;
					stadiumHeight = 667;
					radiusBall = 8;
					throwInLeeway = 500;
					greenLine = 565;
				}, 500);
			}
			if (yaysizlar.length == yaylilar.length) {
				realMap = true;
				avatarTime = false;
				x = Math.floor(Math.random() * 2);
				if (x == 0) {
					room.stopGame();
					room.setCustomStadium(RSHLMap);
					room.startGame();
					setTimeout(function() {
						stadiumWidth = 1403;
						stadiumHeight = 667;
						radiusBall = 8;
						throwInLeeway = 500;
						greenLine = 565;
					}, 500);
				}
				if (x == 1) {
					room.stopGame();
					room.setCustomStadium(RSHLMap2);
					room.startGame();
					res = false;
					setTimeout(function() {
						stadiumWidth = 1403;
						stadiumHeight = 667;
						radiusBall = 8;
						throwInLeeway = 500;
						greenLine = 565;
					}, 500);
				}
				room.sendAnnouncement("Oylama Sonucu: [Yaylı : " + yaylilar.length + " 🆚 Yaysız : " + yaysizlar.length + " ] Oylama sonucu eşit çıktıgı için rastgele harita açılmıştır !", null, 0x00FF00, "bold", 2);

			}
			yaylilar = [];
			yaysizlar = [];
		}, 15000);
	}
	if (zaman == true) {
		room.sendAnnouncement("🛑 " + player.name + ", oylama başlatabilmek için oyunu durdurmak zorundasın !", null, 0x00FF00, "bold", 2);
	}

}


function yayli(player) {

	if (yaysizlar.includes(player.id) == false && yaylilar.includes(player.id) == false) {
		yaylilar.push(player.id);
		room.sendAnnouncement(player.name + " 🗺️📩 yaylı haritaya oy verdi !", null, 0x00FF00, "bold", 2);
	};

}

function yaysiz(player) {

	if (yaysizlar.includes(player.id) == false && yaylilar.includes(player.id) == false) {
		yaysizlar.push(player.id);
		room.sendAnnouncement(player.name + " 🗺️📩 yaysız haritaya oy verdi !", null, 0x00FF00, "bold", 2);
	};

}
room.onGameStop = function(player) {
	zaman = false;
}


function adminGorebilir(player, msg) {
	var players = room.getPlayerList();
	for (var i = 0; i < players.length; i++) {

		if (players[i].admin == true) {
			room.sendChat(player.name + " Diyor ki : " + msg, players[i].id);
		}
	}

}

function AnnounceTopOyuncu() {
	var enYuksekOyuncu = GetOyuncu(1);
	for (var i = 0; i < oyuncular.length; i++) {
		if (enYuksekOyuncu == null) {
			enYuksekOyuncu = oyuncular[i];
		} else if (oyuncular[i].galibiyet > enYuksekOyuncu.galibiyet) {
			enYuksekOyuncu = oyuncular[i];
		}
	}
	if (enYuksekOyuncu == null) {
		return;
	}
	room.sendChat("👑 " + enYuksekOyuncu.isim + " [Galibiyet: " + enYuksekOyuncu.galibiyet + "]  [Yenilgi: " + enYuksekOyuncu.yenilgi + "]   [Beraberlik: " + enYuksekOyuncu.beraberlik + "]  [Gol: " + enYuksekOyuncu.gol + "]     [Asist: " + enYuksekOyuncu.asist + "]");
}

function AnnounceOyuncuStatus(id) {
	var oyuncu = GetOyuncu(id);
	room.sendAnnouncement("📈" + oyuncu.isim + " ➤  [🅿️ : " + oyuncu.puan + "] [🔼G : " + oyuncu.galibiyet + "] [🔻Y : " + oyuncu.yenilgi + "] [G/Y %: " + oyuncu.winsRatio + "] [⚪️B : " + oyuncu.beraberlik + "] [⚽Gol :" + oyuncu.gol + "] [👟Ass :" + oyuncu.asist + "] [😢kk :" + oyuncu.kk + "] [🧤cs :" + oyuncu.cs + "]");
	/*room.sendAnnouncement("📈"+ oyuncu.isim+" ➤  [Pass isb %: "+oyuncu.passAcc+"]   [ELO:"+oyuncu.elo+"]"+ "[Gol ort:"+oyuncu.goalsPG+"]"+ "[Asist ort:"+oyuncu.assPG+"]"+ "[cs %:"+oyuncu.csPG+"]"+ "[Form:"+oyuncu.form+"]");*/
	/*room.sendAnnouncement("📈"+ oyuncu.isim+" ➤  [Online:   "+oyuncu.minsPlayed+"]  [HaxCoins %: "+oyuncu.money+"]   [MOTM:"+"[Yakında]"+"]"+ "[MOTM %:"+"[Yakında]"+"]"+ "[Kurtarış:"+oyuncu.saved+"]"+ "[Atak:"+oyuncu.attack+"]");*/
}


function GetOyuncu(id) {
	for (var i = 0; i < oyuncular.length; i++) {
		if (oyuncular[i].id == id) {
			return oyuncular[i];
		}
	}
}

function GetOyuncu2(name) {
	for (var i = 0; i < oyuncular.length; i++) {
		if (oyuncular[i].name == name) {
			return oyuncular[i];
		}
	}
}


function DeleteOyuncu(id) {
	for (var i = 0; i < oyuncular.length; i++) {
		if (oyuncular[i].id == id) {
			oyuncular.splice(i, 1);
		}
	};
	for (var i = 0; i < voteKickList.length; i++) {
		if (voteKickList[i].id == id) {
			voteKickList.splice(i, 1);
		}
	}
}

function CreateOyuncu(player) {
	oyuncular[oyuncular.length] = {
		name: player.name,
		isim: player.name,
		id: player.id,
		puan: 0,
		galibiyet: 0,
		yenilgi: 0,
		winsRatio: NaN,
		beraberlik: 0,
		gol: 0,
		asist: 0,
		kk: 0,
		cs: 0
	};
	voteKickList[voteKickList.length] = {
		isim: player.name,
		id: player.id,
		atilmaoyu: 0,
		attigikisiler: [0]
	};
}



room.onPlayerChat = function(player, msg) {
	console.log(player.name + " : " + msg);
	// "!adminol" yerine istediğin şifreyi yaz.Çift tırnakların arasına admin şifresi gelecek.

	if (msg == "!adminol") {
		room.setPlayerAdmin(player.id, true);
		return false;
	}
	if (sustur == true && player.admin == false) {
		adminGorebilir(player, msg);
		return false;
	}
	if (msg == "!redpen" && player.admin == true) {
		redPen();
	}
	if (msg == "!bluepen" && player.admin == true) {
		bluePen();
	}
	if (msg == "!değiş" || msg == "!çık") {
		if (avatarTime == true && player.team != Team.SPECTATORS) {
			var team = room.getPlayer(player.id).team;
			room.setPlayerTeam(player.id, 0);
			room.setPlayerTeam(player.id, team);
			room.sendAnnouncement(" " + player.name + " mevki degiştirmek için takımına tekrar alındı! ", null, 0xD100B5, "small-italic", 2);
		} else {
			room.sendAnnouncement("Şuanda mevki değişemezsin", player.id, 0xA80000, "small-italic", 2);
			return false;
		}
	}


	if (mutedPlayers.includes(player.id) == true) {
		return false;
	}
	//if (msg=="!komutlar" ||msg=="!yardım" ||msg=="!help"){room.sendChat("🔸!dc,🔸!rank,🔸!best,🔸!votekick 'oyuncu numarası' ,🔸!numaralar,🔸!yaylı,🔸!yaysız,🔸!bahisyardım");}
	if (msg == "!komutlar" || msg == "!yardım" || msg == "!help") {
		room.sendAnnouncement(" ⭐!dc,⭐!rank,⭐!best,⭐!votekick 'oyuncu numarası' ,⭐!numaralar,⭐!yaylı,⭐!yaysız,⭐!bahisyardım ", null, 0xFFFFFF, "small", 2);
	}
	if (msg == "!bahisyardım") {
		room.sendChat("💰💰 Bir takıma bahis yaparak HAXCOIN kazanabilirsin ! 💰💰", player.id);
		room.sendChat("💰💰 !bahis komutunu kullan.Ardından [takım ismi] [haxcoin miktarı], Örnek: !bahis r 20 veya !bahis b 20 💰💰", player.id);
		room.sendChat("💰💰 Sadece bir maç başladığında ve ilk 20 saniye içerisinde bahis oynanılabilir. 💰💰", player.id);
		room.sendChat("💰💰 Eğer kuponun tutarsa iyisin, yatırdığın miktarda HaxCoin kazanacaksın, aksi durumda kaybedeceksin 💰💰", player.id);
		return false;
	}

	if (msg == "!afk") {
		afkFun(player, msg);
	}
	if (msg == "!afks") {
		afksFun(player, msg);
	}
	//if(msg=="!adminkomutları" && player.admin==true){room.sendChat("🔸!susalım,🔸!konuşalım,🔸!oylama,🔸!rs (yaysız),🔸!rs1 (yaylı) ,🔸!dizilim,🔸!pen,🔸!bankaldır,🔸!1,🔸!2,🔸!uyarı");}
	if (msg == "!adminkomutları" && player.admin == true) {
		room.sendAnnouncement(" 🌟!susalım,🌟!konuşalım,🌟!oylama,🌟!rs (yaysız),🌟!rs1 (yaylı) ,🌟!dizilim,(🌟!redpen,🌟!bluepen,🌟!redwin,🌟!bluewin),(👈🏼penaltı komutları),🌟!bankaldır,🌟!1,🌟!2,🌟!uyarı ", null, 0xFFFFFF, "small", 2);
	}
	if (msg == "!dc" || msg == "!discord") {
		room.sendChat(" https://discord.gg/kjpMWJp ");
	}
	if (msg == "!1" && player.admin == true) {
		room.sendAnnouncement(" 🔴 Kırmızı Takım lütfen seçiminizi yapınız!", null, 0xFFFFFF, "bold", 1);
	}
	if (msg == "!2" && player.admin == true) {
		room.sendAnnouncement(" 🔵 Mavi Takım lütfen seçiminizi yapınız!", null, 0xFFFFFF, "bold", 1);
	}
	if (msg == "!UYARI" | msg == "!uyar" | msg == "!uyarı" && player.admin == true) {
		room.sendAnnouncement("Küfür, hakaret ve polemiğe girmek yasaktır 2.kez uyarı yapılmayacaktır.", null, 0xFF0000, "bold", 2);
		return false;
	}
	if (msg == "!konuşalım" && player.admin == true) {
		sustur = false;
		room.sendChat("🔊 Artık Herkes Konuşabilir !");
	}
	if (msg == "!rs" && player.admin == true) {
		realMap = true;
		clearInterval(myVar);
		avatarTime = false;
		room.stopGame();
		room.setCustomStadium(RSHLMap);
		room.startGame();
		setTimeout(function() {
			stadiumWidth = 1400;
			stadiumHeight = 667;
			radiusBall = 8;
			throwInLeeway = 500;
			greenLine = 565;
		}, 500);
	} //yaysız
	if (msg == "!rs1" && player.admin == true) {
		realMap = true;
		clearInterval(myVar);
		avatarTime = false;
		room.stopGame();
		room.setCustomStadium(RSHLMap2);
		room.startGame();
		setTimeout(function() {
			stadiumWidth = 1400;
			stadiumHeight = 667;
			radiusBall = 8;
			throwInLeeway = 500;
			greenLine = 565;
		}, 500);
	} //yaylı
	if (msg == "!pen" && player.admin == true) {
		realMap = false;
		clearInterval(myVar);
		avatarTime = false;
		room.stopGame();
		room.setCustomStadium(penalti);
		room.startGame();
	}
	if (msg == "!dizilim" && player.admin == true) {
		realMap = false;
		avatarTime = true;
		room.stopGame();
		room.setCustomStadium(dizilim);
		room.startGame();
		redTeam = [0, 0, 0, 0, 0, 0];
		blueTeam = [0, 0, 0, 0, 0, 0];
	}
	if (msg == "!redwin" && player.admin == true) {
		redWinFun();
	}
	if (msg == "!bluewin" && player.admin == true) {
		blueWinFun();
	}
	if (msg == "!bankaldır" && player.admin == true) {
		room.clearBans();
		room.sendChat("📣 Tüm Banlar Kaldırıldı ! ");
	}
	if (msg == "!susalım" && player.admin == true) {
		room.sendChat("🔇 Daha kaliteli bir oyun için Chat maç boyunca susturuldu. Konuşulanları yalnızca adminler görebilir !");
		sustur = true;
	}
	if (susturulanlar.includes(player.id) == true) {
		room.sendAnnouncement("🔇 Yavaşlatılmış chat modu devrede. Mesajını diğer kullanıcılar göremez.", player.id, 0x00FF00, "bold", 2);
		return false;
	}
	if (player.admin == false && susturulanlar.includes(player.id) == false) {
		susturulanlar.push(player.id);
		setTimeout(function() {
			susturulanlar.splice(susturulanlar.indexOf(player.id), 1);
		}, 5000);
	}
	if (msg == "!oylama" && player.admin == true) {
		oylama2(player);
		return false;
	}
	if (msg == "!yaysız" && player.team != 0 && oylamazamani == true) {
		yaysiz(player);
		return false;
	}
	if (msg == "!yaylı" && player.team != 0 && oylamazamani == true) {
		yayli(player);
		return false;
	}
	if (msg == "!rank") {
		AnnounceOyuncuStatus(player.id);
		return false;
	}
	if (msg == "!best") {
		AnnounceTopOyuncu();
		return;
	}
	if (msg.substring(0, 9) == "!votekick" && msg.length != 9) {
		adminList = [];
		idlist = [];
		voteKickPlayer(player, msg);
		return;
	}
	if (msg == "!vote" || msg == "!numaralar") {
		voteKickPlayer2(player, msg);
		numaralar = [];
		return;
	}
	if (player.admin == true) {
		room.sendAnnouncement(player.name + ": " + msg, null, 0xFFFFFF, "bold", 1);
		return false;
	}

};
var idlist = [];


function voteKickPlayer(player, msg) {
	x = msg.substring(10);
	x = parseInt(x);
	var players = room.getPlayerList();
	for (var i = 0; i < players.length; i++) {
		if (players[i].admin == true) {
			adminList.push(players[i].id);
		}
	}
	//oyuncu idleri sırala
	for (i = 0; i < voteKickList.length; i++) {
		idlist.push(voteKickList[i].id);
	}
	//oyuncunun bulundugu satırı bulma
	for (i = 0; i < voteKickList.length; i++) {
		if (voteKickList[i].id == player.id) {
			sira = i;
		}
	}
	//atılma oyunu arttır, atılan kişiyi ekle      
	if (
		idlist.includes(x) == true && voteKickList[sira].attigikisiler.includes(x) == false && adminList.includes(x) == false) {
		voteKickList[sira].attigikisiler.push(x);
		for (i = 0; i < voteKickList.length; i++) {
			if (voteKickList[i].id == x) {
				voteKickList[i].atilmaoyu += 1;
				room.sendAnnouncement("✔️ " + voteKickList[i].isim + " isimli oyuncuyu odadan atmak için oy kullandın !" + " [" + voteKickList[i].atilmaoyu + "/6] ", null, 0x5CFFEF, "small", 2);
				if (voteKickList[i].atilmaoyu == 6)
					room.kickPlayer(voteKickList[i].id, "Oylama sonucu odadan atıldınız...", true);
			}
		}

	} //atilan kisinin id'si ekle ki tekrar oy veremesin.
	else if (idlist.includes(x) == true && voteKickList[sira].attigikisiler.includes(x) == false && adminList.includes(x) == true) {
		room.sendAnnouncement("❌ Adminleri odadan atmak için oy kullanamazsın.", player.id, 0x5CFFEF, "bold", 2);
	} else if (idlist.includes(x) == true && voteKickList[sira].attigikisiler.includes(x) == true) {
		room.sendAnnouncement("🔁 Zaten daha önceden bu kişiyi atmak için oy kullandın.", player.id, 0x5CFFEF, "bold", 2);
	} else {
		room.sendAnnouncement("🚫 Geçersiz oyuncu numarası girdin, oylama listesini görmek için chat kısmına entera basmadan # yazıp veya !numaralar yazıp entera basabilirsin.", player.id, 0x5CFFEF, "bold", 2);
	}

}


function voteKickPlayer2(player, msg) {
	for (i = 0; i < voteKickList.length; i++) {
		numaralar.push("|" + voteKickList[i].isim + " 👕 " + voteKickList[i].id + "|");
	}
	k = numaralar.join();
	room.sendAnnouncement("🔢 Numaralar " + k, null, 0x5CFFEF, "small", 2);
}

var adminList = [];
var numaralar = [];

function kirmizikazandi() {
	return redkazandi = 0
}

function mavikazandi() {
	return bluekazandi = 0
}

room.setTeamColors(1, 60, 0xFFFFFF, [0xFF0731, 0xA1200C, 0x610000]);
room.setTeamColors(2, 60, 0xFFFFFF, [0x0B0696, 0x020263, 0x050338]);
var redkazandi = 0;
var bluekazandi = 0;
room.onStadiumChange = function(stadiumName, byPlayer) {
	if (byPlayer.name != "meister" && byPlayer.id != 0) {
		room.setCustomStadium(dizilim);
		redTeam = [0, 0, 0, 0, 0, 0];
		blueTeam = [0, 0, 0, 0, 0, 0];
		room.sendChat('🔒 Map Değişimi Yasaktır. Kullanabileceğin harita komutlar !rs,!rs1,!dizilim,!pen');
	}
}

function avatarSettings() {
	clearInterval(myVar);
	if (avatarTime == true) {

		myVar = setInterval(function(myTimer) {
			var players = room.getPlayerList();
			var red = GetTeam(1);
			var blue = GetTeam(2);
			var red_ = red.length;
			var blue_ = blue.length;
			for (var i = 1; i < players.length; i++) {
				if (players[i].team != 0 && zaman == true) {
					if (players[i].position.x <= -420 && players[i].position.x >= -421 || players[i].position.x <= 421 && players[i].position.x >= 420 && players[i].position.x != null) {
						room.setPlayerAvatar(players[i].id, "˥");
						players[i].team == 1 ? redTeam[0] = players[i].id : blueTeam[0] = players[i].id;
					}
					if (players[i].position.x <= -341 && players[i].position.x >= -342.5 || players[i].position.x <= 342.5 && players[i].position.x >= 341 && players[i].position.x != null) {
						room.setPlayerAvatar(players[i].id, "૩");
						players[i].team == 1 ? redTeam[1] = players[i].id : blueTeam[1] = players[i].id;
					}
					if (players[i].position.x <= -248.5 && players[i].position.x >= -250 || players[i].position.x <= 250 && players[i].position.x >= 248.5 && players[i].position.x != null) {
						room.setPlayerAvatar(players[i].id, "6");
						players[i].team == 1 ? redTeam[2] = players[i].id : blueTeam[2] = players[i].id;
					}
					if (players[i].position.x <= -208 && players[i].position.x >= -209 || players[i].position.x <= 209 && players[i].position.x >= 208 && players[i].position.x != null) {
						room.setPlayerAvatar(players[i].id, "৪");
						players[i].team == 1 ? redTeam[3] = players[i].id : blueTeam[3] = players[i].id;
					}
					if (players[i].position.x <= -58.5 && players[i].position.x >= -60 || players[i].position.x <= 60 && players[i].position.x >= 58.5 && players[i].position.x != null) {
						room.setPlayerAvatar(players[i].id, "୨");
						players[i].team == 1 ? redTeam[4] = players[i].id : blueTeam[4] = players[i].id;
					}
					if (players[i].position.x <= -130 && players[i].position.x >= -131.5 || players[i].position.x <= 131.5 && players[i].position.x >= 130 && players[i].position.x != null) {
						room.setPlayerAvatar(players[i].id, "ΙΌ");
						players[i].team == 1 ? redTeam[5] = players[i].id : blueTeam[5] = players[i].id;
					}
				}
			}
		}, 1000);

	}
	if (avatarTime == false) {
		var players = room.getPlayerList();
		for (var i = 1; i < players.length; i++) {
			if (players[i].team == 0) {
				room.setPlayerAvatar(players[i].id, null)
			}
		}
	}
}

myVar = setInterval(function(myTimer) {}, 1000);
clearInterval(myVar);

function zeroAvatar(changedPlayer, byPlayer) {
	if (realMap == true && byPlayer.id != 0) {
		for (var i = 0; i < redTeam.length; i++) {
			if (redTeam[i] == changedPlayer.id) {
				redTeam[i] = 0;
			}
		}
		for (var i = 0; i < blueTeam.length; i++) {
			if (blueTeam[i] == changedPlayer.id) {
				blueTeam[i] = 0;
			}
		}
	}


}

function changeNumber(changedPlayer, byPlayer) {
	if (realMap == true && changedPlayer.team == 1 && changedPlayer.id != 0 && byPlayer.id != 0) {
		for (var i = 0; i < redTeam.length; i++) {
			if (redTeam[i] == 0) {
				if (i == 0) {
					room.setPlayerAvatar(changedPlayer.id, "1");
					redTeam[i] = changedPlayer.id
				}
				if (i == 1) {
					room.setPlayerAvatar(changedPlayer.id, "3");
					redTeam[i] = changedPlayer.id
				}
				if (i == 2) {
					room.setPlayerAvatar(changedPlayer.id, "6");
					redTeam[i] = changedPlayer.id
				}
				if (i == 3) {
					room.setPlayerAvatar(changedPlayer.id, "8");
					redTeam[i] = changedPlayer.id
				}
				if (i == 4) {
					room.setPlayerAvatar(changedPlayer.id, "9");
					redTeam[i] = changedPlayer.id
				}
				if (i == 5) {
					room.setPlayerAvatar(changedPlayer.id, "10");
					redTeam[i] = changedPlayer.id
				}
				break;
			}

		}
	}
	if (realMap == true && changedPlayer.team == 2 && changedPlayer.id != 0 && byPlayer.id != 0) {
		for (var i = 0; i < blueTeam.length; i++) {
			if (blueTeam[i] == 0) {
				if (i == 0) {
					room.setPlayerAvatar(changedPlayer.id, "1");
					blueTeam[i] = changedPlayer.id
				}
				if (i == 1) {
					room.setPlayerAvatar(changedPlayer.id, "3");
					blueTeam[i] = changedPlayer.id
				}
				if (i == 2) {
					room.setPlayerAvatar(changedPlayer.id, "6");
					blueTeam[i] = changedPlayer.id
				}
				if (i == 3) {
					room.setPlayerAvatar(changedPlayer.id, "8");
					blueTeam[i] = changedPlayer.id
				}
				if (i == 4) {
					room.setPlayerAvatar(changedPlayer.id, "9");
					blueTeam[i] = changedPlayer.id
				}
				if (i == 5) {
					room.setPlayerAvatar(changedPlayer.id, "10");
					blueTeam[i] = changedPlayer.id
				}
				break;
			}

		}
	}

}

room.onPlayerTeamChange = function(changedPlayer, byPlayer) {
	redT = [];
	bluT = [];
	var players = room.getPlayerList();
	var spec = GetTeam(0);
	var spec_ = spec.length;
	var red = GetTeam(1);
	var blue = GetTeam(2);
	var red_ = red.length;
	var blue_ = blue.length;
	for (var i = 0; i < red_; i++) {
		redT.push(red[i].id)
	}
	for (var i = 0; i < blue_; i++) {
		blueT.push(blue[i].id)
	}
	zeroAvatar(changedPlayer, byPlayer);
	changeNumber(changedPlayer, byPlayer);

}




var isBallOutsideStadium = false;



function checkBallPosition() {
	var ballPosition = room.getBallPosition();
	point[1] = point[0];
	point[0] = ballPosition;
	ballSpeed = (pointDistance(point[0], point[1]) * 60 * 60 * 60) / 15000;
	if (realMap == true) {
		if (isOutsideStadium(ballPosition)) {
			ballOut = true;
			if (!isBallOutsideStadium) {
				isBallOutsideStadium = true;
				exitingPos = ballPosition.x;
				exitingPos2 = ballPosition.y;
				var totalScores = room.getScores().red + room.getScores().blue;
				if (lastScores != totalScores) {
					lastScores = totalScores;
					return false;
				}
				if (ballPosition.x > stadiumWidth && lastTeamTouched == Team.RED || ballPosition.x < -stadiumWidth && lastTeamTouched == Team.BLUE) {

					lastCall = lastTeamTouched == Team.RED ? "2" : "1";

					if (ballPosition.x < 0 && ballPosition.y < 0) {
						BallPosition(-1457, -248, 0, 0)
					}
					if (ballPosition.x < 0 && ballPosition.y > 0) {
						BallPosition(-1457, 248, 0, 0)
					}
					if (ballPosition.x > 0 && ballPosition.y > 0) {
						BallPosition(1457, 248, 0, 0)
					}
					if (ballPosition.x > 0 && ballPosition.y < 0) {
						BallPosition(1457, -248, 0, 0)
					}
					setBallColor(lastCall == 1 ? 0xFF0000 : 0x0000FF);



				} else if (ballPosition.x > stadiumWidth && lastTeamTouched == Team.BLUE || ballPosition.x < -stadiumWidth && lastTeamTouched == Team.RED) {

					lastCall = lastTeamTouched == Team.RED ? "2" : "1";

					if (ballPosition.x < 0 && ballPosition.y < 0) {
						BallPosition(-1457, -692, 0, 0)
					}
					if (ballPosition.x < 0 && ballPosition.y > 0) {
						BallPosition(-1457, 692, 0, 0)
					}
					if (ballPosition.x > 0 && ballPosition.y > 0) {
						BallPosition(1457, 692, 0, 0)
					}
					if (ballPosition.x > 0 && ballPosition.y < 0) {
						BallPosition(1457, -692, 0, 0)
					}
					setBallColor(lastCall == 1 ? 0xFF0000 : 0x0000FF);

				} else {

					isBallKickedOutside = false;

					lastCall = lastTeamTouched == Team.RED ? "2" : "1";
					setBallColor(lastCall == 1 ? 0xFF0000 : 0x0000FF);
					if (exitingPos2 > 0) {
						BallPosition(exitingPos, exitingPos2 + 15, 0, 0);
					}
					if (exitingPos2 < 0) {
						BallPosition(exitingPos, exitingPos2 - 15, 0, 0);
					}
					//lastTeamTouched == Team.RED ? room.sendAnnouncement("▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇",null,0x0080ff,"bold",0): room.sendAnnouncement("▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇ ▇",null,0xCC5733,"bold",0)

				}

			}
		} else {
			if (ballOut == true) {
				setBallColor(0xFFFFFF);
			}
			isBallOutsideStadium = false;
			backMSG = true;
			ballOut = false;

		}
		return true;
	}

}


function BallPosition(a, b, c, d) {
	for (let i = 0; i <= room.getDiscCount(); i++) {
		let disc = room.getDiscProperties(i);

		if (disc && disc.radius == 8) {
			room.setDiscProperties(i, {
				x: a,
				y: b
			});
			room.setDiscProperties(i, {
				xspeed: c,
				yspeed: d
			});
		}
	}
}

room.onPlayerAdminChange = function(changedPlayer, byPlayer) {
	var players = room.getPlayerList();
	var spec = GetTeam(0);
	var spec_ = spec.length;
	var red = GetTeam(1);
	var blue = GetTeam(2);
	var red_ = red.length;
	var blue_ = blue.length;

	for (var i = 0; i < players.length; i++) {

		if (players[i].admin == true) {
			geciciadminler.push(players[i].id);
		}
	}
	if (geciciadminler.length >= 5) {
		room.setPlayerAdmin(changedPlayer.id, false);
		room.sendChat("Odada yeteri kadar admin var");
	}
	geciciadminler = [];
}

function setBallColor(c) {
	for (let i = 0; i <= room.getDiscCount(); i++) {
		let disc = room.getDiscProperties(i);

		if (disc && disc.radius == 8) {
			room.setDiscProperties(i, {
				color: c
			});

		}
	}
}
realMap = false;
ballOut = true;
ballOut = true;
kirmiziTakim = [];
maviTakim = [];
redTeam = [0, 0, 0, 0, 0, 0];
blueTeam = [0, 0, 0, 0, 0, 0];
redT = [];
blueT = [];

//Penaltılar
function redPen() {
	room.stopGame();
	var players = room.getPlayerList();
	for (var i = 0; i < players.length; i++) {
		room.setPlayerTeam(players[i].id, 0)
	}
	for (var i = 0; i < kirmiziTakim.length; i++) {
		room.setPlayerTeam(kirmiziTakim[i], 1)
	}
	idKontrol = [];
	for (var i = 0; i < players.length; i++) {
		idKontrol.push(players[i].id)
	}
	if (blueTeam[0] != 0 && idKontrol.includes(blueTeam[0]) == true) {
		room.setPlayerTeam(blueTeam[0], 2);
		room.startGame();
		return;
	}

	for (var i = 0; i < maviTakim.length; i++) {
		if (idKontrol.includes(maviTakim[i]) == true && maviTakim[i] != 0) {
			room.setPlayerTeam(maviTakim[i], 2);
			room.startGame();
			break;
		}
	}
}

function bluePen() {
	room.stopGame();
	var players = room.getPlayerList();
	for (var i = 0; i < players.length; i++) {
		room.setPlayerTeam(players[i].id, 0)
	}
	for (var i = 0; i < maviTakim.length; i++) {
		room.setPlayerTeam(maviTakim[i], 1)
	}
	idKontrol = [];
	for (var i = 0; i < players.length; i++) {
		idKontrol.push(players[i].id)
	}
	if (redTeam[0] != 0 && idKontrol.includes(redTeam[0]) == true) {
		room.setPlayerTeam(redTeam[0], 2);
		room.startGame();
		return;
	}

	for (var i = 0; i < kirmiziTakim.length; i++) {
		if (idKontrol.includes(kirmiziTakim[i]) == true && kirmiziTakim[i] != 0) {
			room.setPlayerTeam(kirmiziTakim[i], 2);
			room.startGame();
			break;
		}
	}
}

realMap = false;
ballOut = true;
ballOut = true;
kirmiziTakim = [];
maviTakim = [];
redTeam = [0, 0, 0, 0, 0, 0];
blueTeam = [0, 0, 0, 0, 0, 0];
redT = [];
blueT = [];
//Penaltılar
function redWinFun(player, msg) {
	room.stopGame();
	var players = room.getPlayerList();
	var spec = GetTeam(0);
	var red = GetTeam(1);
	var blue = GetTeam(2);
	var red_ = red.length;
	var blue_ = blue.length;
	var spec_ = spec.length;
	var tempRed = red_;
	var tempBlue = blue_;
	for (var i = 0; i < players.length; i++) {
		room.setPlayerTeam(players[i].id, 0)
	}
	for (var i = 0; i < kirmiziTakim.length; i++) {
		room.setPlayerTeam(kirmiziTakim[i], 1)
	}
	idKontrol = [];
	for (var i = 0; i < players.length; i++) {
		idKontrol.push(players[i].id)
	}
	if (blueTeam[0] != 0 && idKontrol.includes(blueTeam[0]) == true) {
		room.setPlayerTeam(blueTeam[i], 0);
	}

	for (var i = 0; i < spec_; i++) {
		if (idKontrol.includes(maviTakim[i]) == true && maviTakim[i] != 0) {
			room.setPlayerTeam(spec[i].id, 2);
		}
		realMap = false;
		avatarTime = true;
		room.stopGame();
		room.setCustomStadium(dizilim);
		room.startGame();
		redTeam = [0, 0, 0, 0, 0, 0];
		blueTeam = [0, 0, 0, 0, 0, 0];
	}
}

function blueWinFun(player, msg) {
	room.stopGame();
	var players = room.getPlayerList();
	var spec = GetTeam(0);
	var red = GetTeam(1);
	var blue = GetTeam(2);
	var red_ = red.length;
	var blue_ = blue.length;
	var spec_ = spec.length;
	var tempRed = red_;
	var tempBlue = blue_;
	for (var i = 0; i < players.length; i++) {
		room.setPlayerTeam(players[i].id, 0)
	}
	for (var i = 0; i < maviTakim.length; i++) {
		room.setPlayerTeam(maviTakim[i], 2)
	}
	idKontrol = [];
	for (var i = 0; i < players.length; i++) {
		idKontrol.push(players[i].id)
	}
	if (redTeam[0] != 0 && idKontrol.includes(redTeam[0]) == true) {
		room.setPlayerTeam(redTeam[i], 0);
	}

	for (var i = 0; i < spec_; i++) {
		if (idKontrol.includes(kirmiziTakim[i]) == true && kirmiziTakim[i] != 0) {
			room.setPlayerTeam(spec[i].id, 1);
		}
		realMap = false;
		avatarTime = true;
		room.stopGame();
		room.setCustomStadium(dizilim);
		room.startGame();
		redTeam = [0, 0, 0, 0, 0, 0];
		blueTeam = [0, 0, 0, 0, 0, 0];
	}
}


// YUKARIDAKİ KOMUT TEST EDİLECEK
//TEST EDİLDİ ŞUANLIK DOĞRU ÇALIŞIYOR :)















//Oyundaki oyuncu maçtan ayrılırsa
function leftPlayer2(player) {
	formanumarasi = 0;
	switch (redTeam.indexOf(player.id)) {
		case 0:
			formanumarasi = "1";
			break;
		case 1:
			formanumarasi = "3";
			break;
		case 2:
			formanumarasi = "6";
			break;
		case 3:
			formanumarasi = "8";
			break;
		case 4:
			formanumarasi = "9";
			break;
		case 5:
			formanumarasi = "10";
			break;
	}
	switch (blueTeam.indexOf(player.id)) {
		case 0:
			formanumarasi = "1";
			break;
		case 1:
			formanumarasi = "3";
			break;
		case 2:
			formanumarasi = "6";
			break;
		case 3:
			formanumarasi = "8";
			break;
		case 4:
			formanumarasi = "9";
			break;
		case 5:
			formanumarasi = "10";
			break;

	}
	if (formanumarasi != 0 && realMap == true) {
		room.pauseGame(true);
		room.sendChat("⚠️" + formanumarasi + " Numaralı Oyuncu Oyundan Çıktı");
	}

}
formanumarasi = 0;


function zeroAvatar(changedPlayer, byPlayer) {
	if (realMap == true && byPlayer.id != 0) {
		for (var i = 0; i < redTeam.length; i++) {
			if (redTeam[i] == changedPlayer.id) {
				redTeam[i] = 0;
			}
		}
		for (var i = 0; i < blueTeam.length; i++) {
			if (blueTeam[i] == changedPlayer.id) {
				blueTeam[i] = 0;
			}
		}
	}


}

function changeNumber(changedPlayer, byPlayer) {
	if (realMap == true && changedPlayer.team == 1 && changedPlayer.id != 0 && byPlayer.id != 0) {
		for (var i = 0; i < redTeam.length; i++) {
			if (redTeam[i] == 0) {
				if (i == 0) {
					room.setPlayerAvatar(changedPlayer.id, "1");
					redTeam[i] = changedPlayer.id
				}
				if (i == 1) {
					room.setPlayerAvatar(changedPlayer.id, "3");
					redTeam[i] = changedPlayer.id
				}
				if (i == 2) {
					room.setPlayerAvatar(changedPlayer.id, "6");
					redTeam[i] = changedPlayer.id
				}
				if (i == 3) {
					room.setPlayerAvatar(changedPlayer.id, "8");
					redTeam[i] = changedPlayer.id
				}
				if (i == 4) {
					room.setPlayerAvatar(changedPlayer.id, "9");
					redTeam[i] = changedPlayer.id
				}
				if (i == 5) {
					room.setPlayerAvatar(changedPlayer.id, "10");
					redTeam[i] = changedPlayer.id
				}
				break;
			}

		}
	}
	if (realMap == true && changedPlayer.team == 2 && changedPlayer.id != 0 && byPlayer.id != 0) {
		for (var i = 0; i < blueTeam.length; i++) {
			if (blueTeam[i] == 0) {
				if (i == 0) {
					room.setPlayerAvatar(changedPlayer.id, "1");
					blueTeam[i] = changedPlayer.id
				}
				if (i == 1) {
					room.setPlayerAvatar(changedPlayer.id, "3");
					blueTeam[i] = changedPlayer.id
				}
				if (i == 2) {
					room.setPlayerAvatar(changedPlayer.id, "6");
					blueTeam[i] = changedPlayer.id
				}
				if (i == 3) {
					room.setPlayerAvatar(changedPlayer.id, "8");
					blueTeam[i] = changedPlayer.id
				}
				if (i == 4) {
					room.setPlayerAvatar(changedPlayer.id, "9");
					blueTeam[i] = changedPlayer.id
				}
				if (i == 5) {
					room.setPlayerAvatar(changedPlayer.id, "10");
					blueTeam[i] = changedPlayer.id
				}
				break;
			}

		}
	}

}

function leftPlayer3(player) {
	//çıkan oyuncunun numarasını sıfırla
	var spec = GetTeam(0);
	var red = GetTeam(1);
	var blue = GetTeam(2);
	var red_ = red.length;
	var blue_ = blue.length;
	var spec_ = spec.length;
	var tempRed = red_;
	var tempBlue = blue_;
	for (var i = 0; i < redTeam.length; i++) {
		if (redTeam[i] == player.id) {
			redTeam[i] = 0;
		}
	}
	for (var i = 0; i < blueTeam.length; i++) {
		if (blueTeam[i] == player.id) {
			blueTeam[i] = 0;
		}
	}
}

room.onPlayerLeave = function(player) {
	DeleteOyuncu(player.id);
	if (player.id == redTeam[0]) {
		redTeam[0] = 0;
	}
	if (player.id == blueTeam[0]) {
		blueTeam[0] = 0;
	}
	leftPlayer2(player);
	leftPlayer3(player);
}

/*
var accountSystem=(username, password, successCallback, errorCallback)=>{
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', 'https://localhost:1234/login?u='+username+'&p='+password);
    httpRequest.send();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            var data=JSON.parse(httpRequest.responseText);
            successCallback(data);
        }
    };
};

var tryLogin=(arr)=>{
  if (arr.length!=3)
    return;
    accountSystem(arr[1], arr[2], (data)=>{
        console.log("success:",data);
    }, (error)=>{
        console.log("error:",error);
    });
};

room.onPlayerChat = (player,msg) =>{
    if(!msg.startsWith('!'))
        return true;
    var arr=msg.split(/ /g);
    switch(arr[0]){
        case "!login": tryLogin(arr);
	room.sendAnnouncement(player.name + ", ✅👀 kimliğini başarıyla doğruladın, keyifli oyunlar.", null, 0xffc83d, "italic", 2);
	break;
    }
    return false;
}
*/

var mesajlar = [" 🚨 Bu odalar,şuan hali hazırda bulunan bu tarz benzeri odaların bir devamı veya türdeşi niteliğinde değildir.", " 🚨 Bu oda, gün geçtikçe geliştirilmekte olan bir bota sahip,klasik v6 Real odasıdır.", " 🚨 Bu bot sigma tarafından desteklenip,güçlendirilmektedir."],
	i = -1;
(function f() {
	i = (i + 1) % mesajlar.length;
	room.sendAnnouncement(mesajlar[i]);
	setTimeout(f, 120000);
})();




var res = false;

function ustunlukTespitEdildi() {
	if (res == false && realMap == true) {


		var scores = room.getScores();
		if (scores.time > 1 && scores.time < 359 && !isTimeAddedShown) {
			//Kırmızılar farkla kazanırsa
			if (scores.red - scores.blue == 3) {
				res = true;
				mavikazandi();
				redkazandi++;
				var spec = GetTeam(0);
				var red = GetTeam(1);
				var blue = GetTeam(2);
				var red_ = red.length;
				var blue_ = blue.length;
				var spec_ = spec.length;
				var tempRed = red_;
				var tempBlue = blue_;
				for (var i = 0; i < red.length; i++) {
					GetOyuncu(red[i].id).galibiyet++;
				}
				for (var i = 0; i < blue.length; i++) {
					GetOyuncu(blue[i].id).yenilgi++;
				}
				for (var i = 0; i < blue_; i++) {
					room.setPlayerTeam(blue[i].id, 0);
				}
				for (var i = 0; i < spec_; i++) {
					room.setPlayerTeam(spec[i].id, 2);
				}
				realMap = false;
				avatarTime = true;
				room.stopGame();
				room.setCustomStadium(dizilim);
				room.startGame();
				redTeam = [0, 0, 0, 0, 0, 0];
				blueTeam = [0, 0, 0, 0, 0, 0];
				room.sendAnnouncement("💥 Takımlar arasındaki ezici üstünlük sebebiyle maç sonlandırıldı 💥", null, 0x8CFFD5, "bold", 2);
				room.sendAnnouncement("🔴 Kırmızılar " + redkazandi + " maçtır kazanıyor ! ", null, 0x91F8FF, "bold", 2);

				//Topla Oynama Yüzdesi
				var redPossPercent = Math.round((redPoss / (redPoss + bluePoss + 0.000001)) * 100);
				var bluePossPercent = Math.round((bluePoss / (redPoss + bluePoss + 0.000001)) * 100);
				room.sendAnnouncement("⚖️ Topa Sahip Olma Yüz.  🔴 " + redPossPercent + "% ⚔️ " + bluePossPercent + "% 🔵", null, 0x91F8FF, "bold", 2);
				return;
			}

			//Maviler farkla kazanırsa

			if (scores.blue - scores.red == 3) {
				res = true;
				kirmizikazandi();
				bluekazandi++;
				var spec = GetTeam(0);
				var red = GetTeam(1);
				var blue = GetTeam(2);
				var red_ = red.length;
				var blue_ = blue.length;
				var spec_ = spec.length;
				var tempRed = red_;
				var tempBlue = blue_;
				for (var i = 0; i < blue.length; i++) {
					GetOyuncu(blue[i].id).galibiyet++;
				}
				for (var i = 0; i < red.length; i++) {
					GetOyuncu(red[i].id).yenilgi++;
				}
				for (var i = 0; i < red_; i++) {
					room.setPlayerTeam(red[i].id, 0);
				}
				for (var i = 0; i < spec_; i++) {
					room.setPlayerTeam(spec[i].id, 1);
				}
				realMap = false;
				avatarTime = true;
				room.stopGame();
				room.setCustomStadium(dizilim);
				room.startGame();
				redTeam = [0, 0, 0, 0, 0, 0];
				blueTeam = [0, 0, 0, 0, 0, 0];
				room.sendAnnouncement("🔵 Maviler " + bluekazandi + " maçtır kazanıyor !", null, 0x91F8FF, "bold", 2);
				room.sendAnnouncement("💥 Takımlar arasındaki ezici üstünlük sebebiyle maç sonlandırıldı 💥", null, 0x8CFFD5, "bold", 2);


				//Topla Oynama Yüzdesi
				var redPossPercent = Math.round((redPoss / (redPoss + bluePoss + 0.000001)) * 100);
				var bluePossPercent = Math.round((bluePoss / (redPoss + bluePoss + 0.000001)) * 100);
				room.sendAnnouncement("⚖️ Topa Sahip Olma Yüz.  🔴 " + redPossPercent + "% ⚔️ " + bluePossPercent + "% 🔵", null, 0x91F8FF, "bold", 2);
				return;
			} else {
				res = false;
			}

		}
	}
}


function afkFun(player, msg) { // !classic
	if (realMap == false)
		if (afkPlayerIDs.has(player.id)) {
			afkPlayerIDs.delete(player.id);
			room.sendChat(" 🔋 " + player.name + " geri döndü ve oynamak için hazır!");
		}
	else {
		afkPlayerIDs.add(player.id);
		room.setPlayerTeam(player.id, 0);
		room.sendChat("💤 " + player.name + " şimdi AFK oldu!");
	} else {
		realMap = true;
		room.sendChat("❗️ " + player.name + " şuan AFK olamazsın!");
	}
}
const afkPlayerIDs = new Set()

function afksFun(player, msg) { // !huge
	afkPlayers_list = room.getPlayerList().filter((x) => afkPlayerIDs.has(x.id));
	afkPlayers_list_string = afkPlayers_list.map(x => x.name).join(", ");
	if (afkPlayers_list == "") {
		room.sendChat("❌ Odada şuan AFK oyuncu yok!");
	} else {
		room.sendChat("💤 AFK oyuncular: " + afkPlayers_list_string);
	}
}
var commands = {
	"!afk": afkFun,
	"!afks": afksFun
}


room.onPlayerTeamChange = function(player) {
	if (room.getScores() != null) {
		var players = room.getPlayerList();
		var team = room.getPlayer(player.id).team;
		if (1 <= player.team <= 2);
	}
	if (player.team !== 0 && afkPlayerIDs.has(player.id)) {
		room.setPlayerTeam(player.id, 0)
		room.sendChat("💤" + player.name + " şuan AFK!")
	}
	if (player.id <= 0) {
		room.setPlayerTeam(player.id, 0)
	}
}
