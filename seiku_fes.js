window.addEventListener("DOMContentLoaded", function () {
	//	二_フェス管理(年,月,日,時,"fes_name");

	//	二_フェス管理(2019,2,8,11,"セッツブーン");
	二_フェス管理(2020, 3, 27, 11, "hishimochi");
}, false);


const fes_point = {
	sanma: {
		"鎮守府海域": ["鎮守府正面海域", "南西諸島沖", "製油所地帯沿岸", "南西諸島防衛線", "鎮守府近海", "鎮守府近海航路"],
		"北方海域": ["モーレイ海", "キス島沖", "アルフォンシーノ方面", "北方海域全域", "北方AL海域"],
		"中部海域": ["中部海域哨戒線", "KW環礁沖海域"],
	},
	iwashi: {
		"鎮守府海域": ["鎮守府正面海域", "南西諸島沖", "製油所地帯沿岸", "南西諸島防衛線", "鎮守府近海", "鎮守府近海航路"],
		"南西諸島海域": ["南西諸島近海", "バシー海峡", "東部オリョール海"],
		"北方海域": ["モーレイ海", "キス島沖", "アルフォンシーノ方面", "北方海域全域", "北方AL海域"],
		"中部海域": ["中部海域哨戒線", "KW環礁沖海域"],
	},
};


const 二_フェス管理 = (年, 月, 日, 時, fes) => { //祭りの期限を過ぎたら自動で終了する
	const 現在 = new Date();
	const 期限 = new Date(年, 月 - 1, 日, 時, 0, 0);
	if (期限 <= 現在) { //現在時刻が設定時刻よりあと
		if (document.body.dataset.fes === fes) {
			document.body.dataset.fes = "";
		}
	}
}

