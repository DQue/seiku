let DT = ""; //data transfer
const graph_col = ["#bbf2c8", "#cbf2bb", "#e8f2bb", "#f2debb", "#f2c5bb"];
const $ = (a) => document.getElementById(a);
const ce = (a) => document.createElement(a);
const ct = (a) => document.createTextNode(a);
const cl = (...a) => { console.log(a) };
const eq = (a, ar) => { for (let i = 0; i < ar.length; i++) { if (a == ar[i]) return true; } return false; } //aryの中にaが含まれればtrue
const eq2 = (a) => { for (let i = 0; i < a.length; i++) { if (a[i][0] != a[i][1]) return false; } return true; } //ary[i][0]とary[i][1]が全部等しければtrue
const amax = (a) => { let m = -Infinity; for (let i of a) { m = m > i ? m : i } return m; }
const 隠す = (a) => { if ($(a)) $(a).parentNode.removeChild($(a)); }
const 非表示 = (a) => { if ($(a)) $(a).style.display = "none" }
const 子要素全削除 = (el) => { if (typeof el === "string") { el = $(el); } while (el.firstChild) { el.removeChild(el.firstChild) } }
const R = new Map();
const sqrt = (a) => R[a] ? R[a] : R.set(a, Math.sqrt(a)).get(a);
const is0401 = () => { const o = 現在時刻(); if (o.mo === 4 && o.d === 1) return true; return false; };

const 二_全部隠すか = (e) => {
	let ispopup = false;
	let el = e.target;
	while (el.parentNode) {
		if (el.classList.contains("選択ポップアップ") || el.classList.contains("ポップアップ起動ボタン")) {
			ispopup = true;
			e.stopPropagation();
			break;
		}
		el = el.parentNode;
	}
	if (ispopup == false) {
		二_全部隠す();
	}
}
function 二_全部隠す() {
	var els = document.getElementsByClassName("選択ポップアップ");
	for (var i = els.length - 1; i >= 0; i--) {
		els[i].parentNode.removeChild(els[i]);
	}
}

const 二_文字ポップアップを表示 = (e) => {
	const el = ce("div");
	const str = e.currentTarget.dataset.help;
	el.style.left = getMousePos(e).x + "px"
	el.style.top = getMousePos(e).y + 20 + "px"
	el.style.zIndex = "99";

	el.classList.add("選択ポップアップ", "lo456ng", "breakLine");
	el.appendChild(ct(str));

	document.body.appendChild(el);
}
const deepcopy = (a) => {
	if (eq(typeof a, ["number", "string", "undefined", "boolean"])) {
		return a;
	} else if (Array.isArray(a)) { //Array
		const ary = [];
		for (let i = 0; i < a.length; i++) {
			ary[i] = deepcopy(a[i]);
		}
		return ary;
	} else if (Object.getPrototypeOf(a) === Map.prototype) { //Map
		const m = new Map();
		for (let [k, v] of a) {
			m.set(k, deepcopy(v));
		}
		return m;
	} else { //Object
		const o = {};
		for (let i in a) {
			o[i] = deepcopy(a[i]);
		}
		return o;
	}
}
function 現在時刻() {
	var z = function (a, n = 2) {
		if (a >= Math.pow(10, n - 1)) return String(a);
		var str = String(a);
		while (str.length < n) {
			str = "0" + str;
		}
		return str;
	}
	var d = new Date();
	var o = {};

	o.yr = d.getFullYear();
	o.mo = d.getMonth() + 1;
	o.d = d.getDate();
	o.hr = d.getHours();
	o.min = d.getMinutes();
	o.sec = d.getSeconds();
	o.str = `${o.yr}-${z(o.mo)}-${z(o.d)} ${z(o.hr)}:${z(o.min)}:${z(o.sec)}`;
	//=>"2018-01-02 03:44:56";
	return o;
}
function 数字をn桁で切り捨て(a, n) {
	var h = Math.pow(10, n);
	return parseInt(a * h) / h;
}
function 符号付き数字(a) {
	return "" + (a > 0 ? "+" : (a < 0 ? "" : "±")) + a;
}
let 文字数合わせ = (s, l) => {
	if (s.length >= l) return s;
	const sa = l - s.length;
	let str = "";
	for (let i = 0; i < sa; i++) {
		str += " ";
	}
	return str + s;
}
const 兄弟要素を取得 = (e自分, 取得対象) => {
	let e = e自分;
	if (取得対象 == "兄") {
		while ((e = e.previousSibling).nodeType != 1) {
		}
	} else {
		while ((e = e.nextSibling).nodeType != 1) {
		}
	}
	return e;
}
function getMousePos(e) { return { x: e.pageX, y: e.pageY, ox: e.offsetX } }
getElementPos = (e, m) => { const p = getMousePos(m); return { x: e.pageX - p.x, y: e.pageY - p.y } }
var K = {};
var O = {};
var M = {};
let C = {};
O.table = [];
O.etable = [];
O.route = [];
O.tmat = [];
O.eseikus = [];
/*
const KD = {};
window.addEventListener("keydown", (e) => {
	KD[e.code] = true;
}, false);
window.addEventListener("keyup", (e) => {
	KD[e.code] = false;
}, false)*/

window.addEventListener("DOMContentLoaded", function () {
	if (localStorage.kantaiData === undefined) {
		localStorage.kantaiData = JSON.stringify({ kantai: [] });
	}
	K = JSON.parse(localStorage.kantaiData);
	if (K) {
		編成記録データ移行(K);
	}

	if (localStorage.toggleData === undefined) {
		tgl_状況保存();
	}
	tgl_状況再現(JSON.parse(localStorage.toggleData));

	try {
		if (localStorage.seikuData !== undefined) {
			O = JSON.parse(localStorage.seikuData);
			データ移行(O);
			O.kouku_show_detail = undefined;

			if (O.filter !== undefined) {
				二_マップフィルタチェックボックス();
			}
		} else { //seikuDataがundefined
			var htu = document.getElementsByClassName("howtouse")[0];
			二_ナビゲーション("sec_使い方");
			htu.classList.add("beginner");
			htu.addEventListener("mouseover", function () {
				htu.classList.remove("beginner");
			});
		}

		if (O.settings === undefined) O.settings = {};
		O.kouku_calc = false, O.kouku_recalc = false;
		set_デフォルト値設定();
		set_HTML要素操作();
		二_自艦隊の表を更新();
		二_深海棲艦表を更新();
		二_結果テーブルを表示();
	} catch (e) {
		二_エラー処理(e);
	}


	if (K.autosave === undefined) 一_編成自動保存();

	二_海域方面選択を表示();
	$("深海棲艦追加親").insertBefore(二_深海棲艦追加を生成(), $("深海棲艦追加親").firstChild);


	二_マップフィルタ設定();

	$("編成記録ボタン").addEventListener("click", function () { 二_編成保存テーブルを表示("記録") });
	$("編成展開ボタン").addEventListener("click", function () { 二_編成保存テーブルを表示("展開") });
	$("IOボタン").addEventListener("click", function () { 二_外部サイトフォームを表示() });
	const b = document.getElementsByClassName("編成戻るボタン");
	$("制空権シミュURL生成").addEventListener("click", 二_制空権シミュURLを表示, false);
	$("デッキビルダー形式生成").addEventListener("click", 二_デッキビルダー形式を表示, false);
	$("デッキビルダーURL生成").addEventListener("click", 二_デッキビルダーURLを表示, false);
	$("作戦室URL生成").addEventListener("click", 二_作戦室URL生成, false);
	$("外部サイト出力削除").addEventListener("click", 二_外部サイト出力を削除, false);


	for (let i of b) { i.addEventListener("click", function () { 隠す("編成記録情報"); 二_編成保存テーブルを非表示() }) };
	$("search_equip").addEventListener("dragover", (e) => { e.preventDefault(); e.dataTransfer.dropEffect = "link"; if (DT !== "艦娘装備" && DT !== "装備リスト") e.dataTransfer.dropEffect = "none"; }, false);
	$("remove_kanmusu").addEventListener("dragover", (e) => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; if (DT !== "艦娘") { e.dataTransfer.dropEffect = "none"; } }, false);
	$("remove_equip").addEventListener("dragover", (e) => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; if (DT !== "艦娘装備") { e.dataTransfer.dropEffect = "none" } }, false);
	window.addEventListener("dragend", (e) => { DT = "" }, false);
	$("search_equip").addEventListener("drop", (e) => { //攻略wikiの装備ページを開く
		const from = e.dataTransfer.getData("text/x-from");
		let 装備名 = "";
		if (from === "艦娘装備") {
			const i = e.dataTransfer.getData("text/x-i");
			const idx = e.dataTransfer.getData("text/x-idx");
			装備名 = 一_表のセルデータ取得(idx, "soubi", i);
		} else if (from === "装備リスト") {
			装備名 = e.dataTransfer.getData("text/x-name");
		}
		if (装備名 !== "" && 装備名 !== "-" && 装備名 !== "艦攻" && 装備名 !== "艦爆") {
			const s = wiki_表記(装備名);
			window.open(wiki_url(s));
		}
	}, false);
	$("remove_equip").addEventListener("drop", (e) => {
		const from = e.dataTransfer.getData("text/x-from");
		if (from === "艦娘装備") {
			const i = e.dataTransfer.getData("text/x-i");
			const idx = e.dataTransfer.getData("text/x-idx");
			一_表のセルデータ変更(idx, "soubi", "-", i);
		}
		二_自艦隊の表を更新();
	}, false);
	$("remove_kanmusu").addEventListener("drop", (e) => {
		const from = e.dataTransfer.getData("text/x-from");
		if (from === "艦娘") {
			const idx = e.dataTransfer.getData("text/x-idx");
			if (一_表のセルデータ取得(idx, "kanmusu") === "") return;
			二_艦娘をはずす(idx);
		}
	}, false);
	const helps = document.getElementsByClassName("popup_help");
	for (let i = 0; i < helps.length; i++) {
		helps[i].addEventListener("click", 二_文字ポップアップを表示, true);
	}

	$("埋める").addEventListener("click", function (e) { 二_埋めるを表示(e) });
	//	$("対空値順に艦戦を交換").addEventListener("click",function(){二_対空値順に艦戦を交換()});
	$("全スロットの熟練度を最大にする").addEventListener("click", function () { 二_全スロットの熟練度をいじる(7); });
	$("全スロットの熟練度をリセットする").addEventListener("click", function () { 二_全スロットの熟練度をいじる(0); });
	$("全スロットの熟練度を調整する").addEventListener("click", function () { 二_全スロットの熟練度を調整する(); });
	$("全スロットの改修値を最大にする").addEventListener("click", function () { 二_全スロットの改修値をいじる(10); });
	$("全スロットの改修値をリセットする").addEventListener("click", function () { 二_全スロットの改修値をいじる(0); });
	$("艦娘全員はずす").addEventListener("click", function (e) { 二_艦娘全員はずす(e); });
	//	$("自艦隊ツール_DnDボタン").addEventListener("click", function (e) { 隠す("自艦隊ツール_DnD"); 二_ドラッグアンドドロップリストを表示(e); })
	$("open_equip_list").addEventListener("click", function (e) { 隠す("自艦隊ツール_DnD"); 二_ドラッグアンドドロップリストを表示(e); })
	$("add_kanmusu_in_a_row").addEventListener("click", (e) => { 二_艦娘を連続で追加(e); }, false);

	$("データ入出力_出ボタン").addEventListener("click", function () { $("データ入出力textarea").value = JSON.stringify(O.table); setTimeout(function () { alert("書き出しok") }, 100) });
	$("データ入出力_入ボタン").addEventListener("click", function () { const str = $("データ入出力textarea").value; const obj = JSON.parse(str); O.table = obj; 零_ローカルストレージ保存(O, "O"); 二_自艦隊の表を更新(); setTimeout(function () { alert("読み込みok") }, 100) });

	$("記録編成データ入出力_出ボタン").addEventListener("click", function () { $("記録編成データ入出力textarea").value = JSON.stringify(K); setTimeout(function () { alert("書き出しok") }, 100) });
	$("記録編成データ入出力_入ボタン").addEventListener("click", function () { const str = $("記録編成データ入出力textarea").value; const obj = JSON.parse(str); K = obj; 零_ローカルストレージ保存(K, "K"); alert("読み込みok") });

	document.addEventListener("click", function (e) { 二_全部隠すか(e) }, false);
	//	setTimeout(一_最新バージョンチェック, 1000);
	//	setInterval(一_最新バージョンチェック, 1000 * 60 * 15); //15分に1回更新確認する

	$("凡例親").appendChild(makeMapSVG("Hanrei", "凡例"));
	二_マップを初期化(true);

}, false);
const 二_艦娘を入れ替え = (from, to) => {
	let cnt = 0, from_i, to_i;
	for (let i = 0; i < O.table.length; i++) {
		if (from === cnt) from_i = i;
		if (to === cnt) to_i = i;
		cnt++;
	}
	const temp = deepcopy(O.table[from_i]);
	O.table[from_i] = deepcopy(O.table[to_i]);
	O.table[to_i] = deepcopy(temp);

	const k1 = O.table[from_i].data.kanmusu;
	const k2 = O.table[to_i].data.kanmusu;
	const z1 = O.table[from_i].data.kaizou;
	const z2 = O.table[to_i].data.kaizou;
	if ((z1 === "出撃" || z2 === "出撃") && (k1 === "基地航空隊" || k2 === "基地航空隊")) {
		二_航空隊出撃ポイント選択を表示();
		二_結果チャートをリセット();
		二_結果テーブルを表示();
	}
	二_自艦隊の表を更新();
}

const 二_編成を入れ替え = (from, to) => {
	const temp = deepcopy(K.kantai[from]);
	K.kantai[from] = deepcopy(K.kantai[to]);
	K.kantai[to] = deepcopy(temp);
}





function 二_艦種別艦娘リストを生成() {
	var 艦種別艦娘リスト = {};
	for (var i = 0; i < 艦種.length; i++) {
		艦種別艦娘リスト[艦種[i]] = [];
		for (var j in 艦娘データ) {
			if (艦娘データ[j]["データ"]) {
				for (var k in 艦娘データ[j]["データ"]) {
					if (艦娘データ[j]["データ"][k]["艦種"] == 艦種[i]) {
						if (艦種別艦娘リスト[艦種[i]].indexOf(j) == -1) {
							艦種別艦娘リスト[艦種[i]].push(j);
						}
					}
				}
			}
		}
	}
	return 艦種別艦娘リスト;
}
const 二_五十音順艦娘リストを生成 = (a) => {
	const 五十音 = ["ア", "カ", "サ", "タ", "ナ", "ハ", "マ", "ヤ", "ラ", "ワ", "ン"];
	const 五十音順リスト = {};
	const 艦娘リスト = 二_艦種別艦娘リストを生成()[a];
	for (let i = 0; i < 五十音.length - 1; i++) {
		五十音順リスト[五十音[i]] = [];
		for (let j = 0; j < 艦娘リスト.length; j++) {
			const yomi = 艦娘データ[艦娘リスト[j]]["読み"].replace(/ヴ/g, "ウ");
			if (五十音[i] < yomi && yomi < 五十音[i + 1]) {
				五十音順リスト[五十音[i]].push(艦娘リスト[j]);
			}
		}
		五十音順リスト[五十音[i]].sort(function (a, b) {
			if (艦娘データ[a].読み > 艦娘データ[b].読み) {
				return 1;
			} else {
				return -1;
			}
		});
	}
	return 五十音順リスト;
}
const 二_艦娘追加を生成 = (idx) => {
	if ($("艦娘追加")) $("艦娘追加").parentNode.removeChild($("艦娘追加"));

	const el = ce("ul");
	const add = 零_艦娘数() <= idx;

	if (!add) { //艦娘追加ではない==変更の場合は"はずす"選択肢を追加
		const ei = ce("li");
		ei.appendChild(ct("はずす"));
		ei.classList.add("clickable")
		ei.addEventListener("click", function (e) {
			二_艦娘をはずす(idx);
			二_艦娘選択ウィンドウを隠す();
		});
		el.appendChild(ei)
	}

	for (let i = 0; i < 艦種.length; i++) {
		const e1 = ce("li");
		const 種 = 艦種[i];
		e1.appendChild(ct(種));
		el.appendChild(e1);
		e1.addEventListener("click", function (e) { O.cl = true; 二_艦娘選択を表示(e, idx, add) });     //一度クリックするとmouseoverで変更しないようにする
		e1.addEventListener("mouseover", function (e) { if (!O.cl) 二_艦娘選択を表示(e, idx, add) });
		e1.classList.add("clickable");
	}
	if (add) {
		const e_input = el.appendChild(ce("li"));
		e_input.appendChild(ct("まとめて追加"));
		e_input.classList.add("clickable");
		e_input.addEventListener("click", (e) => {
			二_艦娘を連続で追加(e);
		}, false);
	}

	el.id = "艦娘追加"
	el.classList.add("選択ポップアップ");
	return el;
}
function 二_艦娘選択ウィンドウを隠す() {
	O.cl = false;
	非表示("艦娘選択");
	非表示("艦娘追加");
}
function 二_艦娘追加を表示(e, idx) {
	O.cl = false;
	var el = 二_艦娘追加を生成(idx)
	el.style.left = getMousePos(e).x + "px"
	el.style.top = getMousePos(e).y + "px"
	document.body.appendChild(el);
}
function 二_艦娘選択を生成(e, idx, add) {
	if ($("艦娘選択")) $("艦娘選択").parentNode.removeChild($("艦娘選択"));
	var t = e.target;
	var text = t.textContent;
	var e0 = ce("dl");
	e0.id = "艦娘選択"
	e0.classList.add("選択ポップアップ");
	var l = 二_五十音順艦娘リストを生成(text);
	for (var i in l) {
		if (l[i].length > 0) {
			var e1 = ce("dt");
			e1.appendChild(ct(i));
			e0.appendChild(e1);
			for (var j = 0; j < l[i].length; j++) {
				var e2 = ce("dd");
				var e22 = ce("span");
				e22.appendChild(ct(l[i][j]));
				e22.className = "艦娘改造艦娘名";
				e2.appendChild(e22)
				for (var k in 艦娘データ[l[i][j]]["データ"]) {
					var e3 = ce("span");
					e3.classList.add("艦娘改造度", "選択ボタン")
					e3.addEventListener("click", ((idx, 艦娘名, 改造度) => {
						return function (e) {
							if (add) {
								一_艦娘を追加(idx, 艦娘名, 改造度);
							} else {
								一_艦娘を変更(idx, 艦娘名, 改造度);
							}
							二_艦娘選択ウィンドウを隠す();
							if (艦娘名 === "基地航空隊" && 改造度 === "出撃") {
								O.kouku_recalc = true;
								if (O.settings.auto_bomb === true) {
									一_自動空襲適用(idx);
								}
								二_航空隊出撃ポイント選択を表示();
								二_結果チャートをリセット();
								二_結果テーブルを表示();
							}
							二_自艦隊の表を更新();
						}
					})(idx, l[i][j], k));
					e3.classList.add("clickable");
					e3.appendChild(ct(k));
					e2.appendChild(e3);
				}
				e0.appendChild(e2)
			}
		}
	}
	return e0;
}


function 二_艦娘選択を表示(e, idx, add) {
	var el = 二_艦娘選択を生成(e, idx, add);
	el.style.left = getMousePos(e).x + 80 - getMousePos(e).ox + "px"
	el.style.top = getMousePos(e).y - 20 + "px"
	document.body.appendChild(el);
}

const 二_空襲ダイアログを表示 = (e, idx) => {
	隠す("空襲ダイアログ");
	const m = getMousePos(e);
	const el = ce("div");
	el.id = "空襲ダイアログ";
	el.classList.add("選択ポップアップ");
	el.style.left = getMousePos(e).x + "px";
	el.style.top = getMousePos(e).y + "px";

	const b1 = el.appendChild(ce("span"));
	b1.classList.add("選択ボタン");
	b1.appendChild(ct("空襲する"));

	const b2 = el.appendChild(ce("span"));
	b2.classList.add("選択ボタン");
	b2.appendChild(ct("搭載数を戻す"));

	b1.addEventListener("click", ((idx) => {
		return () => {
			一_空襲を発生させる(idx);
			隠す("空襲ダイアログ");
			二_自艦隊の表を更新();
		}
	})(idx), false);
	b2.addEventListener("click", ((idx) => {
		return () => {
			const a = 一_表のセルデータ取得(idx, "kaizou");
			一_表の搭載数をデフォルトに変更(idx, a);
			隠す("空襲ダイアログ");
			二_自艦隊の表を更新();
		}
	})(idx), false);
	document.body.appendChild(el);
}
const 一_空襲を発生させる = (idx) => {
	let num = 4;
	const k = 一_表のセルデータ取得(idx, "kaizou");
	const r = 零_艦娘スロット数("基地航空隊", k);
	for (let i = 0; i < r; i++) {
		const s = 一_表のセルデータ取得(idx, "soubi", i);
		if (s === "-") continue; //装備がない場合はスキップ
		const t = 一_表のセルデータ取得(idx, "tousai", i);
		const c = Math.min(num, t - 1);
		一_表のセルデータ変更(idx, "tousai", t - c, i);
		num -= c;
		if (num <= 0) break;
	}
}
const 一_自動空襲適用 = (idx) => {
	const name = 一_表のセルデータ取得(idx, "kanmusu");
	if (name !== "基地航空隊") return;
	const a = 一_表のセルデータ取得(idx, "kaizou");
	一_表の搭載数をデフォルトに変更(idx, a);
	一_空襲を発生させる(idx);
}
const 一_自動空襲切り替え = (bomb_mode) => {
	const n = O.table.length;
	for (let idx = 0; idx < n; idx++) {
		const name = 一_表のセルデータ取得(idx, "kanmusu");
		if (name === "基地航空隊") {
			if (bomb_mode === true) {
				一_自動空襲適用(idx);
			} else {
				const a = 一_表のセルデータ取得(idx, "kaizou");
				一_表の搭載数をデフォルトに変更(idx, a);
			}
		}
	}
}




const 二_装備変更を表示 = (e, idx, di) => {
	const el = document.body.appendChild(ce("div"));
	const 艦娘 = 一_表のセルデータ取得(idx, "kanmusu");
	const 改造 = 一_表のセルデータ取得(idx, "kaizou");
	let mode = "", 艦種 = "";
	if (艦娘) {
		艦種 = 零_艦娘データ取得(艦娘)["データ"][改造]["艦種"];
		if (艦娘 === "基地航空隊" && 改造 === "出撃") mode = "出撃";
		if (艦娘 === "基地航空隊" && 改造 === "防空") mode = "防空";
	}
	let tbs = {};

	//装備種選択
	const e_selector = el.appendChild(ce("ul"));
	e_selector.classList.add("選択リスト", "種別");
	const e_table = el.appendChild(ce("table"));
	e_table.classList.add("選択リスト", "艦載機リスト", "項目");
	for (let i = 0; i < 装備種.length; i++) {
		if (零_装備できるものがあるか(艦種, 艦娘, 改造, 装備種[i]) === false) continue;
		const li1 = e_selector.appendChild(ce("li"));
		li1.classList.add(装備種[i], "clickable");
		if (雑データ.短縮.装備種[装備種[i]]) {
			li1.appendChild(ct(雑データ.短縮.装備種[装備種[i]]));
		} else {
			li1.appendChild(ct(装備種[i]));
		}
		const e_tbody = e_table.appendChild(ce("tbody"));
		e_tbody.classList.add(装備種[i]);
		tbs[装備種[i]] = e_tbody;

		li1.addEventListener("click", ((外, 中) => {
			return () => {
				外.scrollTop = 中.offsetTop - 外.offsetTop - 26;
				//26はヘッダ分
			}
		})(e_table, e_tbody))
	}

	//ヘッダ
	const e_thead = e_table.appendChild(ce("thead"));
	const e_tr = e_thead.appendChild(ce("tr"));
	const thlist = ["対空", "装備名"];
	if (艦娘 === "基地航空隊" && 改造 === "防空") thlist[0] = "防空";
	for (let i = 0; i < thlist.length; i++) {
		const e_th = e_tr.appendChild(ce("th"));
		e_th.appendChild(ct(thlist[i]));
		e_th.dataset.key = i;
		e_th.classList.add("装備リストヘッダセル", "clickable");
		e_th.addEventListener("click", ((num, tbs) => {
			return (ev) => {
				二_装備一覧をソート(ev, num, tbs);
			}
		})(i, tbs), false);
	}

	//装備一覧
	for (let i in 艦戦データ) {
		const 種類 = 艦戦データ[i].種類;
		if (零_装備できるか(艦種, 艦娘, 改造, 種類, i) === false) continue;

		const e_tr = tbs[種類].appendChild(ce("tr"));

		//対空値
		const e_td_taiku = e_tr.appendChild(ce("td"));
		e_td_taiku.classList.add("対空値表示", "num");
		e_td_taiku.dataset.value = i;
		e_td_taiku.appendChild(ct(零_実質対空値(i, mode)));

		//装備名
		const e_td_name = e_tr.appendChild(ce("td"));
		e_td_name.appendChild(ct(i));
		e_td_name.dataset.value = i;

		e_tr.addEventListener("click", (ev) => {
			非表示("装備変更");
			二_装備変更(ev, idx, di);
		});
		e_tr.classList.add("clickable");
		e_tr.classList.add(種類, "艦載機");
		if (零_種類(i) === "艦上爆撃機" && 艦戦データ[i].対空値 >= 4) e_tr.classList.add("対空値有");
		if (艦戦データ[i].夜間航空機 === true) e_tr.classList.add("夜間航空機");
	}

	el.id = "装備変更";
	el.classList.add("選択ポップアップ", "long");
	el.style.left = getMousePos(e).x + "px";
	el.style.top = getMousePos(e).y + "px";
}

const 二_装備一覧をソート = (ev, num, tbs) => {
	const e_target = ev.target;
	let mode;
	if (e_target.dataset.order) {
		mode = e_target.dataset.order === "↓" ? "↑" : "↓";
	} else {
		mode = "↓"; //最初は降順
	}
	const e_ths = document.getElementsByClassName("装備リストヘッダセル");
	for (let i = 0; i < e_ths.length; i++) {
		e_ths[i].dataset.order = "";
	}
	e_target.dataset.order = mode;


	for (let i in tbs) {
		const len = tbs[i].childNodes.length;
		const keys = new Array(len);
		const trs = new Array(len);
		const e_trs = tbs[i].getElementsByTagName("tr");

		for (let j = 0; j < len; j++) {
			const temp = e_trs[j].getElementsByTagName("td")[num].textContent;
			keys[j] = isNaN(Number(temp)) ? temp : Number(temp); //数字っぽいものは数字にして比較（2と10は10のほうが大きい）
			trs[j] = e_trs[j]
		}

		//ソート
		for (let left = 0; left < len - 1; left++) {
			for (let right = left + 1; right < len; right++) {
				if (mode === "↓" && keys[right] <= keys[left]) continue;
				if (mode === "↑" && keys[left] <= keys[right]) continue;
				[keys[left], keys[right]] = [keys[right], keys[left]];
				[trs[left], trs[right]] = [trs[right], trs[left]];
			}
		}
		//DOM書き換え
		子要素全削除(tbs[i]);
		for (let j = 0; j < len; j++) {
			tbs[i].appendChild(trs[j]);
		}
	}
}


function 二_全員の装備をいじる(a, aki) {
	for (var i = 0; i < O.table.length; i++) {
		var 艦娘 = 零_艦娘データ取得(一_表のセルデータ取得(i, "kanmusu"));
		var 改造 = 一_表のセルデータ取得(i, "kaizou");
		var 艦種 = 艦娘 ? 艦娘["データ"][改造]["艦種"] : "";
		var 種類 = 零_種類(a);
		var r = 零_艦娘スロット数(艦娘, 改造);
		if (零_装備できるか(艦種, 一_表のセルデータ取得(i, "kanmusu"), 改造, 種類, a)) {
			for (var j = 0; j < r; j++) {
				if (aki === true && 一_表のセルデータ取得(i, "soubi", j) !== "-") continue;
				一_表のセルデータ変更(i, "soubi", a, j);
			}
		}
	}
	二_自艦隊の表を更新();
}
function 二_全スロットの熟練度をいじる(a) {
	for (var i = 0; i < O.table.length; i++) {
		var n = O.table[i].data.kanmusu;
		var k = O.table[i].data.kaizou;
		var r = 零_艦娘スロット数(n, k);
		for (var j = 0; j < r; j++) {
			一_表のセルデータ変更(i, "jukuren", a, j);
		}
	}
	二_自艦隊の表を更新();
}
function 二_全スロットの熟練度を調整する() {
	for (var i = 0; i < O.table.length; i++) {
		var n = 一_表のセルデータ取得(i, "kanmusu");
		var k = 一_表のセルデータ取得(i, "kaizou");
		var r = 零_艦娘スロット数(n, k);
		for (var j = 0; j < r; j++) {
			var s = 一_表のセルデータ取得(i, "soubi", j);
			if (零_戦闘機か(s)) {
				一_表のセルデータ変更(i, "jukuren", 7, j);
			} else {
				一_表のセルデータ変更(i, "jukuren", 0, j);
			}
		}
	}
	二_自艦隊の表を更新();
}
function 二_全スロットの改修値をいじる(a) {
	for (var i = 0; i < O.table.length; i++) {
		var n = O.table[i].data.kanmusu;
		var k = O.table[i].data.kaizou;
		var r = 零_艦娘スロット数(n, k);

		for (var j = 0; j < r; j++) {
			一_表のセルデータ変更(i, "kaishu", a, j);
		}
	}
	二_自艦隊の表を更新();
}
const 二_装備変更 = (e, idx, di) => {
	var t = e.target.dataset.value;
	const kanmusu = 一_表のセルデータ取得(idx, "kanmusu");
	const kaizou = 一_表のセルデータ取得(idx, "kaizou");
	一_表のセルデータ変更(idx, "soubi", t, di);
	一_表の搭載数をデフォルトに変更(idx, 一_表のセルデータ取得(idx, "kaizou"), di);
	if (O.settings.auto_bomb === true) {
		一_自動空襲適用(idx);
	}
	二_自艦隊の表を更新();
}

const 二_自艦隊の空行を生成 = (idx) => {
	const tb = ce("tbody");
	const tr = tb.appendChild(ce("tr"));
	const td1 = tr.appendChild(ce("th"));
	const td2 = tr.appendChild(ce("td"));

	td1.colSpan = "2";
	td2.colSpan = "7";
	td2.classList.add("empty", "c");

	const btn = td1.appendChild(ce("span"));
	btn.appendChild(ct("艦娘/航空隊を追加"));
	btn.classList.add("ポップアップ起動ボタン", "選択ボタン", "single", "big");
	btn.addEventListener("click", function (e) { 二_艦娘追加を表示(e, idx) });


	return tb;
}
function 二_自艦隊の行を生成(tableData, idx) { //tableData:艦娘名 搭載数 装備 熟練度 等
	let lines_for_addbtn = 1;
	if (零_艦娘数() === 0) lines_for_addbtn = 4;
	let rows = 零_艦娘スロット数(tableData.kanmusu, tableData.kaizou, lines_for_addbtn);

	let isTop = false;//この艦娘が一番上に表示されている艦娘である
	let isBottom = false;
	for (let i = 0; i < O.table.length; i++) {
		if (O.table[i].data === tableData) isTop = true;
		break;
	}

	for (let i = O.table.length - 1; i >= 0; i--) {
		if (O.table[i].data.kanmusu === "") continue;
		if (O.table[i].data === tableData) isBottom = true;
		break;
	}

	var etb = ce("tbody");
	if (一_表のセルデータ取得(idx, "hidden")) etb.classList.add("一時非表示");

	var etrs = [];
	for (var i = 0; i < rows; i++) {
		etrs[i] = ce("tr");
	}

	for (var i = 0; i < rows; i++) {
		var 艦娘 = 零_艦娘データ取得(tableData.kanmusu);
		if (艦娘) {
			var 表示艦種 = "";
			var 艦種 = 艦娘["データ"][tableData.kaizou]["艦種"];
			if (艦娘["データ"][tableData.kaizou]["表示艦種"]) {
				表示艦種 = 艦娘["データ"][tableData.kaizou]["表示艦種"];
			}
		} else {
			var 艦種 = "", 表示艦種 = "";
		}
		if (i == 0) {
			//ボタン類
			var e = etrs[0].appendChild(ce("td"));
			e.rowSpan = rows;
			var b = e.appendChild(ce("span"));
			b.appendChild(ct("変更"));
			b.classList.add("選択ボタン", "ポップアップ起動ボタン", "single");
			b.addEventListener("click", function (e) { 二_艦娘追加を表示(e, idx) });

			//D&D設定
			if (tableData.kanmusu !== "") {
				e.draggable = true;
				e.classList.add("draggable");
				e.addEventListener("dragstart", (e) => {
					e.dataTransfer.setData("text/x-from", "艦娘");
					e.dataTransfer.setData("text/x-idx", idx);
					DT = "艦娘";
				}, false);
				e.addEventListener("dragover", (e) => {
					e.preventDefault();
					e.dataTransfer.dropEffect = "move";
					if (DT !== "艦娘") {
						e.dataTransfer.dropEffect = "none";
					}
				}, false);
				e.addEventListener("drop", (e) => {
					if (e.dataTransfer.getData("text/x-from") === "艦娘") {
						const from = Number(e.dataTransfer.getData("text/x-idx"));
						const to = idx;
						二_艦娘を入れ替え(from, to);
					}
				}, false);
			}

			if (tableData.kanmusu !== "") {

				if (tableData.kanmusu === "基地航空隊") {
					const div = e.appendChild(ce("div"));

					const b = div.appendChild(ce("span"));
					b.appendChild(ct("空襲"));
					b.classList.add("選択ボタン", "ポップアップ起動ボタン");
					b.addEventListener("click", function (e) { 二_空襲ダイアログを表示(e, idx) });
				}

				var div = e.appendChild(ce("div"));
				var lbl = div.appendChild(ce("label"));
				var chk = lbl.appendChild(ce("input"));
				lbl.appendChild(ct("隠す"));
				chk.type = "checkbox";
				chk.checked = (一_表のセルデータ取得(idx, "hidden") === true) ? "checked" : "";
				chk.addEventListener("click", function (e) {
					一_表のセルデータ変更(idx, "hidden", e.target.checked);
					if (tableData.kaizou === "出撃" && tableData.kanmusu === "基地航空隊") {
						二_航空隊出撃ポイント選択を表示();
						二_結果チャートをリセット();
						二_結果テーブルを表示();
					}
					二_自艦隊の表を更新();
				});


				if (tableData.kanmusu !== "基地航空隊") {
					var div = e.appendChild(ce("div"));
					var lbl = div.appendChild(ce("label"));
					var chk = lbl.appendChild(ce("input"));
					lbl.appendChild(ct("第2艦隊"));
					chk.type = "checkbox";
					chk.checked = (一_表のセルデータ取得(idx, "daini") === true) ? "checked" : "";
					chk.addEventListener("click", function (e) {
						一_表のセルデータ変更(idx, "daini", Boolean(e.target.checked));
						二_自艦隊の表を更新();
					});
				}
			} else {
				e.colSpan = "2";
				e.classList.add("艦娘を追加親");
			}


			if (tableData.kanmusu !== "") {
				//艦娘
				var e = etrs[0].appendChild(ce("td"));
				e.classList.add("艦娘セル")
				e.rowSpan = rows;

				//艦種
				var s = ce("a");
				if (tableData.kanmusu !== "基地航空隊") {
					var small = e.appendChild(ce("small"));
					small.classList.add("艦種");
					small.appendChild(ct(表示艦種 !== "" ? 表示艦種 : 艦種));
				}

				//艦娘名
				s.className = "艦娘名";
				s.target = "_blank";
				var kn = 一_艦娘改造含み名を生成(tableData.kanmusu, tableData.kaizou);
				if (零_艦娘データ取得(tableData.kanmusu)["データ"][tableData.kaizou]["Wikiリンク"]) {
					const kn2 = 零_艦娘データ取得(tableData.kanmusu)["データ"][tableData.kaizou]["Wikiリンク"];
					s.href = wiki_url(kn2);
				} else {
					s.href = wiki_url(kn);
				}
				s.appendChild(ct(kn));
				e.appendChild(s);

				//改造一覧
				var ul = ce("ul");
				ul.className = "艦娘改造リスト"
				var k = 零_艦娘データ取得(tableData.kanmusu);
				for (var j in k["データ"]) {
					var li = ce("li");
					li.classList.add("選択ボタン");
					if (一_表のセルデータ取得(idx, "kaizou") === j) li.classList.add("selected");
					li.addEventListener("click",
						(function (e, idx, j) {
							return function () {
								const kanmusu = 一_表のセルデータ取得(idx, "kanmusu");
								const kaizou_before = 一_表のセルデータ取得(idx, "kaizou");
								一_表のセルデータ変更(idx, "kaizou", j);
								if (kanmusu === "基地航空隊" && (j === "出撃" || kaizou_before === "出撃")) {
									二_結果チャートをリセット();
									二_航空隊出撃ポイント選択を表示();
								}
								二_自艦隊の表を更新();
							}
						})(e, idx, j)
					);
					li.appendChild(ct(j));
					ul.appendChild(li)
				}
				e.appendChild(ul);
			}
		}

		//搭載
		var etousai = 二_自艦隊のセルを生成("tousai", 零_テーブル搭載数(tableData.tousai, i), rows);
		etrs[i].appendChild(etousai);
		etousai.addEventListener("click",
			(function (ev, idx, i) {
				return function (ev) {
					隠す("搭載数変更")
					二_搭載数変更を表示(ev, idx, i);
				}
			})(e, idx, i)
		);
		etousai.classList.add("clickable", "ポップアップ起動ボタン", "separate")

		//装備
		var esoubi = 二_自艦隊のセルを生成("soubi", tableData.soubi[i], rows);
		if (tableData.soubi[i] === void 0) tableData.soubi[i] = "-";
		var 種類 = 零_種類(tableData.soubi[i]);
		const 装備名 = tableData.soubi[i];
		if (艦種 && 零_装備できるか(艦種, tableData.kanmusu, tableData.kaizou, 種類, 装備名) === false) esoubi.classList.add("装備できない");
		esoubi.classList.add(種類, "ポップアップ起動ボタン", "separate");
		if (種類 === "艦上爆撃機" && 艦戦データ[tableData.soubi[i]].対空値 >= 4) esoubi.classList.add("対空値有");
		if (艦戦データ[tableData.soubi[i]].夜間航空機 === true) esoubi.classList.add("夜間航空機");
		esoubi.addEventListener("click",
			(function (e, idx, i) {
				return (function (e) {
					隠す("装備変更");
					二_装備変更を表示(e, idx, i);
				})
			})(e, idx, i)
		);
		esoubi.draggable = true;
		esoubi.addEventListener("dragstart", (function (e, idx, i) {
			return function (e) {
				e.dataTransfer.effectAllowed = "all";
				e.dataTransfer.setData("text/x-idx", String(idx));
				e.dataTransfer.setData("text/x-i", String(i));
				e.dataTransfer.setData("text/x-from", "艦娘装備");
				DT = "艦娘装備";
			}
		})(e, idx, i));
		esoubi.addEventListener("dragover", function (e) {
			e.preventDefault();
			if (DT === "艦娘装備") {
				if (e.ctrlKey === true) {
					e.dataTransfer.dropEffect = "copy";
				} else {
					e.dataTransfer.dropEffect = "move";
				}
			} else if (DT === "装備リスト") {
				e.dataTransfer.dropEffect = "copy";
			} else {
				e.dataTransfer.dropEffect = "none";
			}
		});
		esoubi.addEventListener("drop", (function (e, idx, i) {
			return function (e) {
				e.preventDefault();
				二_装備にドロップされた(e, idx, i);
			}
		})(e, idx, i));
		esoubi.classList.add("clickable", "separate");
		etrs[i].appendChild(esoubi);


		//熟練
		if (tableData.jukuren[i] === void 0) tableData.jukuren[i] = 0;
		var ejukuren = 二_自艦隊のセルを生成("jukuren", tableData.jukuren[i], rows);
		ejukuren.addEventListener("click",
			(function (e, idx, i) {
				return function (e) {
					e.preventDefault();
					二_熟練度を一段階変更(idx, i, 1);
				}
			})(e, idx, i)
		);
		ejukuren.addEventListener("contextmenu",
			(function (e, idx, i) {
				return function (e) {
					e.preventDefault();
					二_熟練度を一段階変更(idx, i, -1);
				}
			})(e, idx, i)
		);
		ejukuren.classList.add("clickable", "separate");
		etrs[i].appendChild(ejukuren);

		//改修
		if (tableData.kaishu[i] === void 0) tableData.kaishu[i] = 0;
		var ekaishu = 二_自艦隊のセルを生成("kaishu", tableData.kaishu ? tableData.kaishu[i] : 0, rows);
		ekaishu.addEventListener("click",
			(function (e, idx, i) {
				return function (e) {
					e.preventDefault();
					二_改修を一段階変更(idx, i, 1);
				}
			})(e, idx, i)
		);
		ekaishu.addEventListener("contextmenu",
			(function (e, idx, i) {
				return function (e) {
					e.preventDefault();
					二_改修を一段階変更(idx, i, -1);
				}
			})(e, idx, i)
		);
		ekaishu.classList.add("clickable", "separate");
		etrs[i].appendChild(ekaishu);






		//制空
		const eseiku = 二_自艦隊のセルを生成("seiku", tableData.seiku[i]);
		//		eseiku.classList.add("separate");
		etrs[i].appendChild(eseiku);


		//小計
		if (i === 0) {
			var shoukei = 0;
			var teihoMax = 1;
			for (var j = 0; j < rows; j++) {
				shoukei += tableData.seiku[j];
			}
			if (tableData.kanmusu === "基地航空隊" && tableData.kaizou === "防空") {
				var ar = [];
				for (var j = 0; j < rows; j++) {
					if (eq(零_種類(tableData.soubi[j]), ["水上偵察機", "艦上偵察機", "大型飛行艇", "陸上偵察機"])) {
						ar.push(tableData.soubi[j]);
					}
				}
				for (var j = 0; j < ar.length; j++) {
					teihoMax = Math.max(teihoMax, 零_偵察機補正(ar[j], "防空"));
				}
				shoukei = 数字をn桁で切り捨て(shoukei * teihoMax, 0);

			}
			if (tableData.kanmusu === "基地航空隊" && tableData.kaizou === "出撃") {
				var ar = [];
				for (var j = 0; j < rows; j++) {
					if (eq(零_種類(tableData.soubi[j]), ["陸上偵察機"])) {
						ar.push(tableData.soubi[j]);
					}
				}
				for (var j = 0; j < ar.length; j++) {
					teihoMax = Math.max(teihoMax, 零_偵察機補正(ar[j], "出撃"));
				}
				shoukei = 数字をn桁で切り捨て(shoukei * teihoMax, 0);
			}
			一_表のセルデータ変更(idx, "shoukei", shoukei);
			etrs[i].appendChild(二_自艦隊のセルを生成("shoukei", shoukei, rows));
			一_表のセルデータ変更(idx, "teiho", teihoMax);
		}


		//その他欄
		if (i === 0) {
			var data = [];
			var kank = "";
			var kanb = "";
			var url = "";
			var isSoubi = false;
			if (tableData.kanmusu === "基地航空隊") {
				var cost = { 燃料: 0, 弾薬: 0, ボーキ: 0, 要検証: false, 不定: false };
				var radMin = 99; //戦闘行動半径のうち最短のもの
				var radTei = 0;  //偵察機の戦闘行動半径のうち最長のもの
				var radStr = "";
				for (var j = 0; j < rows; j++) {
					const 装備 = tableData.soubi[j];
					const 種類 = 零_種類(装備);
					const 搭載 = tableData.tousai[j];
					if (tableData.soubi[j] === "-") continue;
					if (種類 == "陸上攻撃機") {
						cost.燃料 += Math.ceil(1.5 * 搭載);
						cost.弾薬 += Math.floor(0.7 * 搭載);
					} else if (種類 === "大型陸上機") {
						cost.燃料 += Math.floor(2 * 搭載); //式は不明だけど9機で18なので2x搭載で仮置き
						cost.弾薬 += Math.floor(2 * 搭載); //同上
						cost.ボーキ += 9 * 零_配置コスト(装備);
						cost.要検証 = true;
					}
					else {
						cost.燃料 += Math.ceil(1 * 搭載);
						cost.弾薬 += Math.ceil(0.6 * 搭載);
					}

					if (種類 === "大型陸上機") {
					} else if (eq(種類, ["水上偵察機", "艦上偵察機", "大型飛行艇", "陸上偵察機"])) {
						cost.ボーキ += 4 * 零_配置コスト(装備);
					} else {
						cost.ボーキ += 18 * 零_配置コスト(装備);
					}

					if (零_配置コスト(装備) === 0) cost.不定 = true;

					isSoubi = true;
					if (tableData.soubi[j] === "艦攻") kank = "「艦攻」の半径・コストはこちら";
					if (tableData.soubi[j] === "艦爆") kanb = "「艦爆」の半径・コストはこちら";

					if (eq(種類, ["水上偵察機", "艦上偵察機", "大型飛行艇", "陸上偵察機"])) {
						radTei = Math.max(radTei, 零_行動半径(tableData.soubi[j]));
						radMin = Math.min(radMin, 零_行動半径(tableData.soubi[j]));
					} else {
						radMin = Math.min(radMin, 零_行動半径(tableData.soubi[j]));
					}
				}
				if (radTei > radMin) { //偵察機による延長
					radStr = `${radMin}+${Math.min(3, Math.round(sqrt(radTei - radMin)))}`
				} else {
					radStr = String(radMin)
				}
				if (isSoubi == false) radStr = "0";
				if (isSoubi) {
					if (tableData.kaizou !== "防空") {
						if (cost.要検証 === true) {
							data.push(`出撃コスト:燃${cost.燃料}?弾${cost.弾薬}?`);
						} else {
							data.push(`出撃コスト:燃${cost.燃料}弾${cost.弾薬}`);
						}
						data.push("戦闘行動半径:" + radStr);
					}

					if (cost.不定 === true) {
						data.push(`配置コスト:不明`);
					} else {
						data.push(`配置コスト:ボーキ${cost.ボーキ}`);
					}

				}
				if (kank) {
					var obj = {};
					obj.tag = "a";
					obj.str = kank;
					obj.url = wiki_url("基地航空隊") + "#performance_table";
					data.push(obj);
				}
				if (kanb) {
					var obj = {};
					obj.tag = "a";
					obj.str = kanb;
					obj.url = wiki_url("基地航空隊") + "#performance_table";
					data.push(obj);
				}
			}//航空隊終わり

			let 艦種 = "";
			const 艦娘データ = 零_艦娘データ取得(tableData.kanmusu);
			if (艦娘データ !== undefined) 艦種 = 艦娘データ["データ"][tableData.kaizou]["艦種"];
			if (eq(艦種, ["正規空母", "装甲空母", "軽空母"])) { //攻撃力表示
				let houg = 零_艦娘データ取得(tableData.kanmusu)["データ"][tableData.kaizou].素火力;
				let raig = 0;
				let baku = 0;
				for (let j = 0; j < rows; j++) {
					const s = tableData.soubi[j];
					houg += 零_装備火力値(s);
					raig += 零_装備雷装値(s);
					baku += 零_装備爆装値(s);
					if (零_種類(s) === "艦上攻撃機") raig += tableData.kaishu[j] * 0.2;
				}
				const atk = Math.floor((houg + raig + 5 + Math.floor(baku * 1.3)) * 1.5) + 55;
				data.push(`攻撃力:${atk}`);
			}

			etrs[i].appendChild(二_自艦隊のセルを生成("sonota", data, rows));
		}
		etb.appendChild(etrs[i]);
	}
	return etb;
}
function 二_自艦隊のセルを生成(shu, data, rows) {
	var td = ce("td");
	if (data === undefined) data = "";

	if (shu === "kanmusu") {
		td.rowSpan = rows;
		td.appendChild(ct(data));
	} else if (shu === "jukuren") {
		td.appendChild(ct(零_熟練度マーク(data)));
		td.classList.add("jukuren");
		td.dataset.juk_color = ["k", "b", "b", "b", "y", "y", "y", "y"][data];
	} else if (shu === "kaishu") {
		if (!data) data = 0;
		td.appendChild(ct(零_改修マーク(data)));
		td.classList.add("kaishu");
	} else if (shu === "shoukei") {
		td.rowSpan = rows;
		td.appendChild(ct(data));
	} else if (shu === "sonota") {
		td.rowSpan = rows;
		td.className = "艦娘備考";
		var ul = td.appendChild(ce("ul"));
		for (var i = 0; i < data.length; i++) {
			var li = ul.appendChild(ce("li"));
			if (data[i].tag) {
				if (data[i].tag === "a") {
					var a = li.appendChild(ce("a"));
					a.href = data[i].url;
					a.target = "_blank";
					a.appendChild(ct(data[i].str));
				}
			} else {
				li.appendChild(ct(data[i]));
			}
		}
	} else {
		td.appendChild(ct(data)); //データ入れる
	}


	if (shu === "tousai" || shu === "seiku" || shu === "shoukei") {
		td.className = "num";
	}
	return td
}
function 二_自艦隊に行を追加(tableData, idx) {
	$("自艦隊").appendChild(二_自艦隊の行を生成(tableData, idx));
}
const 二_自艦隊に空行を追加 = (idx) => {
	$("自艦隊").appendChild(二_自艦隊の空行を生成(idx));
}
function 二_搭載数変更を表示(e, idx, i) {
	var el = 二_搭載数変更を生成(一_表のセルデータ取得(idx, "tousai", i), idx, i);
	el.style.left = getMousePos(e).x + 10 + "px"
	el.style.top = getMousePos(e).y + "px"
	document.body.appendChild(el);
}
function 二_搭載数変更を生成(t, idx, i) {
	var el = ce("div");
	el.classList.add("選択ポップアップ");
	el.id = "搭載数変更";

	var fo = el.appendChild(ce("form"));
	fo.addEventListener("submit", function (e) {
		e.preventDefault();
		一_表のセルデータ変更(idx, "tousai", parseInt($("搭載数変更_input").value), i);
		const kanmusu = 一_表のセルデータ取得(idx, "kanmusu");
		const kaizou = 一_表のセルデータ取得(idx, "kaizou");
		if (kaizou === "出撃" && kanmusu === "基地航空隊") {
			O.kouku_recalc = true;
		}
		二_自艦隊の表を更新();
		非表示("搭載数変更");
	});


	var inp = ce("input");
	inp.id = "搭載数変更_input";
	fo.appendChild(ct("搭載数を"));
	fo.appendChild((function (idx, i) {
		var e = ce("input"); e.value = "標準"; e.type = "button"; e.addEventListener("click", function () {
			var kan = 一_表のセルデータ取得(idx, "kanmusu");
			var kai = 一_表のセルデータ取得(idx, "kaizou");
			var dt = (kan === "") ? 0 : 零_艦娘データ取得(kan)["データ"][kai]["スロット"][i];
			inp.value = dt;
			二_自艦隊の表を更新();
		}); return e;
	})(idx, i));
	fo.appendChild((function (t) { inp.value = t; inp.type = "number"; inp.min = 0; return inp })(t));
	fo.appendChild(
		(function (idx, i) {
			var e = ce("input");
			e.value = "に変更";
			e.type = "submit";
			return e;
		})(idx, i)
	);
	return el;
}


function 二_自艦隊の制空値を変更(idx, di) {
	var s = 一_自艦隊の制空値を計算(idx, di);
	一_表のセルデータ変更(idx, "seiku", s, di);
}

function 二_自艦隊の表を初期化() {
	var table = $("自艦隊");
	for (var i = table.tBodies.length - 1; i >= 0; i--) {
		table.removeChild(table.tBodies[i]);
	}
}
function 二_自艦隊の表を更新() {
	try {
		二_自艦隊の表を初期化();
		一_自艦隊の表を整理する();
		var table = O.table;
		for (var i = 0; i < table.length; i++) {
			var n = table[i].data.kanmusu;
			var k = table[i].data.kaizou;
			var r = 零_艦娘スロット数(n, k);
			for (var di = 0; di < r; di++) {
				二_自艦隊の制空値を変更(i, di);
			}
			二_自艦隊に行を追加(table[i].data, i);
		}
		二_自艦隊に空行を追加(table.length);

		二_合計制空値を表示();
	} catch (e) {
		二_エラー処理(e);
	}
	二_結果テーブルを表示();
}
function 二_合計制空値を表示() {
	var o = 零_自艦隊合計制空値();
	$("艦娘合計制空値").textContent = o.艦娘;
	$("基地航空隊合計制空値").textContent = o.航空隊;
	const t = o.対重爆制空値;
	if (t !== 0) {
		$("基地航空隊ロケット戦闘機込制空値").textContent = `対重爆: ${t}`;
	} else {
		$("基地航空隊ロケット戦闘機込制空値").textContent = ``;
	}
}
function 零_自艦隊合計制空値() {
	var table = O.table;
	var 艦娘制空 = 0;
	var 航空隊制空 = 0;
	let ロケット戦闘機数 = 0;
	for (var i = 0; i < table.length; i++) {
		if (一_表のセルデータ取得(i, "hidden")) continue;
		if (table[i].data.kanmusu !== "基地航空隊") {
			艦娘制空 += 一_表のセルデータ取得(i, "shoukei");
		} else if (table[i].data.kanmusu === "基地航空隊" && table[i].data.kaizou === "防空") {
			航空隊制空 += 一_表のセルデータ取得(i, "shoukei");
			const スロット数 = 零_艦娘スロット数("基地航空隊", "防空");
			for (let j = 0; j < スロット数; j++) {
				const 装備名 = 一_表のセルデータ取得(i, "soubi", j);
				const tf = 零_ロケット戦闘機か(装備名);
				if (tf) ロケット戦闘機数++;
			}
		}
	}
	const 対重爆倍率 = ((n) => { switch (n) { case 0: return 0.5; case 1: return 0.8; case 2: return 1.1; default: return 1.2 } })(ロケット戦闘機数);
	const 対重爆制空値 = Math.floor(航空隊制空 * 対重爆倍率); //切り捨てかどうか要検証
	return { "艦娘": 艦娘制空, "航空隊": 航空隊制空, "対重爆制空値": 対重爆制空値 };
}
function 二_熟練度を一段階変更(idx, di, pm) {
	var n = 一_表のセルデータ取得(idx, "jukuren", di);
	二_熟練度を変更(idx, di, (n + pm + 8) % 8);
}
function 二_熟練度を変更(idx, di, s) {
	一_表のセルデータ変更(idx, "jukuren", s, di);
	二_自艦隊の表を更新();
}
function 二_改修を一段階変更(idx, di, pm) {
	var n = 一_表のセルデータ取得(idx, "kaishu", di);
	二_改修を変更(idx, di, (n + pm + 11) % 11);
}
function 二_改修を変更(idx, di, s) {
	一_表のセルデータ変更(idx, "kaishu", s, di);
	二_自艦隊の表を更新();
}
function 二_艦娘をはずす(idx) {
	const kanmusu = 一_表のセルデータ取得(idx, "kanmusu");
	const kaizou = 一_表のセルデータ取得(idx, "kaizou");
	一_艦娘をはずす(idx);
	if (kaizou === "出撃" && kanmusu === "基地航空隊") {
		二_航空隊出撃ポイント選択を表示();
		二_結果チャートをリセット();
		O.kouku_calc = false;
		O.kouku_recalc = false;
	}
	二_自艦隊の表を更新();
}
function 二_装備にドロップされた(e, idx, i) {
	const from = e.dataTransfer.getData("text/x-from");
	const isCtrl = e.ctrlKey;
	const from_idx = Number(e.dataTransfer.getData("text/x-idx"));
	const from_i = Number(e.dataTransfer.getData("text/x-i"));
	const from_name = 一_表のセルデータ取得(from_idx, "kanmusu");
	const to_name = 一_表のセルデータ取得(idx, "kanmusu");
	if (from === "艦娘装備") {
		if (isCtrl === true) {
			二_装備を複製(from_idx, from_i, idx, i);
		} else {
			二_装備を交換(from_idx, from_i, idx, i);
		}
	} else if (from === "装備リスト") {
		一_表のセルデータ変更(idx, "soubi", e.dataTransfer.getData("text/x-name"), i);
	}
	if (O.settings.auto_bomb === true) {
		if (from_name === "基地航空隊") 一_自動空襲適用(from_idx);
		if (to_name === "基地航空隊") 一_自動空襲適用(idx);
	}
	二_自艦隊の表を更新();
}
/*function 二_対空値順に艦戦を交換(){
	for(var i=0; i<O.table.length; i++){
	}
}*/
const 二_装備を交換 = (idx, i, idx2, i2) => { //1:ドラッグ中のやつ 2:ドロップ先のやつ
	var s1 = 一_表の艦娘データ取得(idx).soubi[i];
	var s2 = 一_表の艦娘データ取得(idx2).soubi[i2];
	var j1 = 一_表の艦娘データ取得(idx).jukuren[i];
	var j2 = 一_表の艦娘データ取得(idx2).jukuren[i2];
	var k1 = 一_表の艦娘データ取得(idx).kaishu[i];
	var k2 = 一_表の艦娘データ取得(idx2).kaishu[i2];
	一_表のセルデータ変更(idx, "soubi", s2, i);
	一_表のセルデータ変更(idx2, "soubi", s1, i2);
	一_表のセルデータ変更(idx, "jukuren", j2, i);
	一_表のセルデータ変更(idx2, "jukuren", j1, i2);
	一_表のセルデータ変更(idx, "kaishu", k2, i);
	一_表のセルデータ変更(idx2, "kaishu", k1, i2);
}
const 二_装備を複製 = (fidx, fi, tidx, ti) => {
	const fs = 一_表の艦娘データ取得(fidx).soubi[fi];
	const fj = 一_表の艦娘データ取得(fidx).jukuren[fi];
	const fk = 一_表の艦娘データ取得(fidx).kaishu[fi];
	一_表のセルデータ変更(tidx, "soubi", fs, ti);
	一_表のセルデータ変更(tidx, "jukuren", fj, ti);
	一_表のセルデータ変更(tidx, "kaishu", fk, ti);
}
const 二_装備を挿入 = (name) => {
	const type = 零_種類(name);
	for (let idx = 0; idx < 零_艦娘数(); idx++) {
		if (O.table[idx].deleted || O.table[idx].data.hidden) continue;
		const kn = 一_表のセルデータ取得(idx, "kanmusu");
		const ki = 一_表のセルデータ取得(idx, "kaizou");
		const ks = 零_艦娘データ取得(kn)["データ"][ki]["艦種"];
		if (零_装備できるか(ks, kn, ki, type, name) === false) continue;

		const di = 零_艦娘スロット数(kn, ki);
		for (let i = 0; i < di; i++) {
			if (一_表のセルデータ取得(idx, "soubi", i) === "-") {
				一_表のセルデータ変更(idx, "soubi", name, i);

				if (O.settings.auto_bomb === true) {
					一_自動空襲適用(idx);
				}
				二_自艦隊の表を更新();
				return;
			}
		}
	}
}
function 一_艦娘をはずす(idx) {
	O.table.splice(idx, 1);
}
function 二_艦娘全員はずす(e) {
	隠す("艦娘全員外すポップアップ")
	var el = ce("div");
	el.classList.add("選択ポップアップ");
	el.id = "艦娘全員外すポップアップ"
	el.style.left = getMousePos(e).x + "px"
	el.style.top = getMousePos(e).y + "px"
	el.appendChild(ct("本当に全員はずしますか？"));
	el.appendChild(ce("br"));
	el.appendChild((function () {
		var el = ce("button");
		el.appendChild(ct("はずす"))
		el.addEventListener("click", function () {
			O.table = [];
			二_自艦隊の表を更新();
			隠す("艦娘全員外すポップアップ")
		})
		return el
	})());
	el.appendChild((function () {
		var el = ce("button");
		el.appendChild(ct("はずさない"))
		el.addEventListener("click", function () { 隠す("艦娘全員外すポップアップ") })
		return el
	})());

	document.body.appendChild(el);
}
const 二_艦娘を連続で追加 = (e) => {
	隠す("艦娘を連続で追加ポップアップ");
	二_艦娘選択ウィンドウを隠す();
	const div = 二_可動ポップアップを生成("艦娘名を指定して追加");
	const x = getMousePos(e).x;
	const y = getMousePos(e).y;
	div.style.left = x + 45 + "px";
	div.style.top = Math.max(y - 310, 100) + "px";
	document.body.appendChild(div);

	div.id = "艦娘を連続で追加ポップアップ";
	const outer = div.childNodes[2];
	const el = outer.appendChild(ce("form"));
	let kanmusus = [];
	let kaizous = [];
	let idxs = [];
	let recalc = false;
	let idx = O.table.length;

	const input = el.appendChild(ce("input"));
	const list = el.appendChild(ce("ul"));
	const btn = el.appendChild(ce("input"));
	const lbl = el.appendChild(ce("label"));
	const chk = lbl.appendChild(ce("input"));

	input.type = "text";
	btn.type = "submit";
	btn.value = "まとめて追加";
	lbl.appendChild(ct("追加後にウィンドウを閉じる"));
	chk.type = "checkbox";
	chk.id = "連続追加後閉じる";
	chk.checked = true;

	input.focus();

	input.addEventListener("input", () => {
		kanmusus = [];
		kaizous = [];
		idxs = [];
		recalc = false;
		idx = O.table.length;

		子要素全削除(list);
		const strs = input.value.split(/[\s,・、，]/);
		for (let i = 0; i < strs.length; i++) {
			if (strs[i] === "") continue;
			const [kanmusu, kaizou] = 零_艦娘を検索(strs[i]);
			if (kanmusu !== undefined) {
				kanmusus.push(kanmusu);
				kaizous.push(kaizou);
				idxs.push(idx);
				idx++;
			}
		}
		for (let i = 0; i < kanmusus.length; i++) {
			const li = list.appendChild(ce("li"));
			li.appendChild(ct(kanmusus[i]));
			if (i === kanmusus.length - 1) {
				隠す("連続追加備考");
				const e_txt = el.appendChild(ce("p"));
				e_txt.appendChild(ct("追加後に改造段階を変更してください"));
				e_txt.id = "連続追加備考";
			}
		}
	}, false);

	el.addEventListener("submit", (e) => {
		e.preventDefault();
		for (let i = 0; i < kanmusus.length; i++) {
			一_艦娘を追加(idxs[i], kanmusus[i], kaizous[i]);
			if ((kanmusus[i] === "基地航空隊" && kaizous[i] === "出撃")) {
				recalc = true;
				if (O.settings.auto_bomb === true) 一_自動空襲適用(idxs[i]);
			}
		}
		if (recalc) {
			O.kouku_recalc = true;
			二_航空隊出撃ポイント選択を表示();
			二_結果チャートをリセット();
			二_結果テーブルを表示();
		}
		二_自艦隊の表を更新();
		if ($("連続追加後閉じる").checked) {
			隠す("艦娘を連続で追加ポップアップ");
		} else {
			子要素全削除(list);
			input.value = "";
			input.focus();
		}
		kanmusus = [];
	}, false);
}
const 零_艦娘を検索 = (str) => {
	str = str.toLowerCase()
	let temp = str;
	temp = jaconv.toZenKana(temp);
	temp = romajiConv.toKatakana(temp);
	temp = jaconv.toHanAscii(temp);
	const kanaStr = temp;
	cl(kanaStr)
	for (let kanmusu in 艦娘データ) {
		const yomi = 艦娘データ[kanmusu].読み;
		const name = kanmusu.toLowerCase();
		const d = 艦娘データ[kanmusu].検索ワード ? 艦娘データ[kanmusu].検索ワード : undefined;
		if (name.includes(kanaStr) || yomi.includes(kanaStr) || name.includes(str) || (d && d.includes(kanaStr))) {
			let kaizou = "";
			for (let j in 艦娘データ[kanmusu].データ) {
				kaizou = j;
				if (kaizou === "出撃") break; //基地航空隊は出撃で追加する
			}
			return [kanmusu, kaizou];
		}
	}
	return [undefined, undefined];
}



function 一_自艦隊の制空値を計算(idx, di) {
	var soubi = 一_表のセルデータ取得(idx, "soubi", di);
	var tousai = 一_表のセルデータ取得(idx, "tousai", di);
	var jukuren = 一_表のセルデータ取得(idx, "jukuren", di);
	var kaishu = 一_表のセルデータ取得(idx, "kaishu", di);
	var kanmusu = 一_表のセルデータ取得(idx, "kanmusu");
	var kaizou = 一_表のセルデータ取得(idx, "kaizou");
	var seiku = 零_制空値を計算(soubi, tousai, jukuren, kaishu, kanmusu, kaizou);
	return seiku;
}
const 一_艦娘デフォルトデータ = () => {
	return {
		data: {
			kanmusu: "",
			kaizou: "",
			tousai: [0, 0, 0, 0, 0],
			soubi: ["-", "-", "-", "-", "-"],
			jukuren: [7, 7, 7, 7, 7],
			kaishu: [0, 0, 0, 0, 0],
			seiku: [0, 0, 0, 0, 0],
			shoukei: 0,
			teiho: 1,
			daini: false,
			hidden: false,
		},
	};
}
const 一_艦娘を変更 = (idx, 艦娘名, 改造度) => {
	const 搭載数 = 零_艦娘データ取得(艦娘名)["データ"][改造度]["スロット"];
	const rows = 零_艦娘スロット数(艦娘名, 改造度);
	一_表のセルデータ変更(idx, "kanmusu", 艦娘名);
	一_表のセルデータ変更(idx, "kaizou", 改造度);
	for (let i = 0; i < rows; i++) {
		const 旧装備 = 一_表のセルデータ取得(idx, "soubi", i);
		一_表のセルデータ変更(idx, "tousai", 搭載数[i], i);
		一_表のセルデータ変更(idx, "soubi", 旧装備, i);
	}
}
const 一_艦娘を追加 = (idx, 艦娘名, 改造度) => {
	O.table.push(一_艦娘デフォルトデータ());
	const 搭載数 = 零_艦娘データ取得(艦娘名)["データ"][改造度]["スロット"];
	const rows = 零_艦娘スロット数(艦娘名, 改造度);
	一_表のセルデータ変更(idx, "kanmusu", 艦娘名);
	一_表のセルデータ変更(idx, "kaizou", 改造度);
}
function 一_自艦隊の表を整理する() {
	var k = false;
	for (var i = O.table.length - 1; i >= 0; i--) {
		if (O.table[i].deleted) {
			一_艦娘をはずす(i);
			continue;
		};

		if (一_艦娘をはずせるか(i, true)) {
			if (k) {
				一_艦娘をはずす(i);
			} else {
				k = true;
			}
		}
	}
}
function 一_艦娘をはずせるか(idx, 装備を持っていてもはずす) {
	var n = 一_表のセルデータ取得(idx, "kanmusu");
	var k = 一_表のセルデータ取得(idx, "kaizou");
	var rows = 零_艦娘スロット数(n, k);
	if (装備を持っていてもはずす) {
		return n === "" ? true : false;
	}
	var t = true;
	for (var i = 0; i < rows; i++) {
		if (一_表のセルデータ取得(idx, "soubi", i) !== "-") t = false;
	}
	return t;
}
function 一_表の艦娘データ取得(idx) {
	return O.table[idx].data;
}
function 一_表のセルデータ取得(idx, shu, di) {
	var d = 一_表の艦娘データ取得(idx);
	if (eq(shu, ["kanmusu", "kaizou", "shoukei", "teiho", "daini", "hidden"])) {
		return d[shu];
	} else if (shu === "kanmusu+") {
		return d["kanmusu"] + (d["kaizou"] === "無印" ? "" : d["kaizou"]);
	} else if (shu === "soubi") {
		return (d && d[shu] && d[shu][di]) ? d[shu][di] : "-";
	} else {
		return (d && d[shu] && d[shu][di]) ? d[shu][di] : 0;
	}
}
function 一_表のセルデータ変更(idx, shu, data, di) {
	var d = 一_表の艦娘データ取得(idx);
	if (eq(shu, ["kanmusu", "kaizou", "shoukei", "teiho", "daini", "hidden"])) {
		d[shu] = data;
	} else {
		d[shu][di] = data;
	}

	if (shu === "kaizou") {
		一_表の搭載数をデフォルトに変更(idx, d["kaizou"]);
	}

	if (shu === "soubi") {
		if (eq(零_種類(data), ["水上偵察機", "艦上偵察機", "大型飛行艇", "陸上偵察機"]) && 一_表のセルデータ取得(idx, "kanmusu") === "基地航空隊") {
			一_表のセルデータ変更(idx, "tousai", 4, di); //変更した装備が偵察機なら4に変更
		} else if (eq(零_種類(data), ["大型陸上機"])) {
			一_表のセルデータ変更(idx, "tousai", 9, di); //変更した装備が大型陸上機なら9に変更
		} else {
			一_表の搭載数をデフォルトに変更(idx, 一_表のセルデータ取得(idx, "kaizou"), di)
		}
	}

	if (d.kaizou === "出撃" && d.kanmusu === "基地航空隊") {
		if (shu !== "seiku" && shu !== "teiho" && shu !== "shoukei") {
			O.kouku_recalc = true;
		}
	}
}
function 一_表の搭載数をデフォルトに変更(idx, kai, di) {
	var max_i, i;

	var kan = 一_表のセルデータ取得(idx, "kanmusu");
	var d = 零_艦娘データ取得(kan);

	//diが指定されている場合はそのスロットだけ変更　そうでない場合は1～全てを変更
	max_i = di ? di + 1 : 零_艦娘スロット数(kan, kai);
	i = di ? di : 0;

	for (; i < max_i; i++) {
		if (kan === "基地航空隊" && eq(零_種類(一_表のセルデータ取得(idx, "soubi", i)), ["艦上偵察機", "水上偵察機", "大型飛行艇", "陸上偵察機"])) {
			一_表のセルデータ変更(idx, "tousai", 4, i); //偵察機の場合デフォルト=4
		} else if (kan === "基地航空隊" && eq(零_種類(一_表のセルデータ取得(idx, "soubi", i)), ["大型陸上機"])) {
			一_表のセルデータ変更(idx, "tousai", 9, i); //重爆は9
		} else if (kan === "") {
			一_表のセルデータ変更(idx, "tousai", 0);
		} else {
			一_表のセルデータ変更(idx, "tousai", d["データ"][kai]["スロット"][i], i);
		}
	}
}

function 零_艦娘数() {
	var table = O.table;
	var c = 0;
	for (var i = 0; i < table.length; i++) {
		if (table[i].data.kanmusu !== "") c++;
	}
	return c;
}
const 零_航空隊出撃部隊数 = () => {
	const t = O.table;
	let c = 0;
	for (let i of t) {
		if (i.data.kanmusu === "基地航空隊" && i.data.kaizou === "出撃" && i.data.hidden === false) c++;
	}
	return c;
}

function 零_艦娘データ取得(n) {
	return 艦娘データ[n] ? 艦娘データ[n] : undefined;
}
function 零_艦娘スロット数(n, k, def = 4) {
	var a;
	if (a = 零_艦娘データ取得(n)) return a["データ"][k]["スロット"].length;
	return def;
}
function 零_艦娘改造度の文字(a) {
	if (a === "無印") return "";
	return a;
}
function 零_制空値を計算(soubi, tousai, jukuren, kaishu, kanmusu, kaizou) {
	if (soubi === "-" || tousai === 0) return 0;
	var taiku = 零_対空値(soubi);
	if (零_種類(soubi) === "艦上戦闘機") {
		taiku += 0.2 * kaishu;
	} else if (零_種類(soubi) === "艦上爆撃機" && taiku >= 4) {
		taiku += 0.25 * kaishu;
	} else if (零_種類(soubi) === "水上戦闘機") {
		taiku += 0.2 * kaishu;
	} else if (eq(零_種類(soubi), ["局地戦闘機", "陸軍戦闘機"])) {
		taiku += 0.2 * kaishu;
	} else if (零_種類(soubi) === "陸上攻撃機") {
		taiku += 0.5 * sqrt(kaishu);
	}
	var geigeki = 零_迎撃値(soubi);
	var taibaku = 零_対爆値(soubi);
	if (kanmusu === "基地航空隊" && kaizou === "防空") {
		var s1 = (taiku + geigeki + taibaku * 2) * sqrt(tousai);
	} else {
		var s1 = (taiku + geigeki * 1.5) * sqrt(tousai);
	}
	var s2 = 零_熟練ボーナス(jukuren, soubi);

	return Math.floor(s1 + s2);
}
const 零_搭載数制空値 = (搭載数, 装備id, 偵察flag) => { //艦隊まとめて計算
	let s = 0;
	for (let i = 0; i < 搭載数.length; i++) {
		for (let j = 0; j < 搭載数[i].length; j++) {
			const f1 = 零_航空機または偵察機か(零_敵装備カテゴリ(装備id[i][j]));
			const f2 = 零_航空機か(零_敵装備カテゴリ(装備id[i][j]));
			if (偵察flag === true && f1 === false) continue;
			if (偵察flag === false && f2 === false) continue;
			const 装備対空 = 零_敵対空値(装備id[i][j]);
			const 機数 = 搭載数[i][j];
			s += Math.floor(装備対空 * sqrt(機数));
		}
	}
	return s;
}

const 零_対空値 = (s) => {
	if (艦戦データ[s] === undefined) throw new Error("不明な装備(" + s + ")");
	const t = 艦戦データ[s].対空値;
	return t ? t : 0;
}
function 零_実質対空値(s, mode) {
	let 実質対空 = 0;
	if (mode === "出撃") {
		//対空+1.5迎撃;
		実質対空 = 零_対空値(s) + 1.5 * 零_迎撃値(s);
	} else if (mode === "防空") {
		//対空+迎撃+2対爆;
		実質対空 = 零_対空値(s) + 零_迎撃値(s) + 2 * 零_対爆値(s);
	} else {
		//対空;
		実質対空 = 零_対空値(s);
	}
	return 実質対空;
}
function 零_迎撃値(s) {
	if (艦戦データ[s].迎撃 != undefined) {
		return 艦戦データ[s].迎撃;
	} else {
		return 0;
	}
}
function 零_対爆値(s) {
	if (艦戦データ[s].対爆 != undefined) {
		return 艦戦データ[s].対爆;
	} else {
		return 0;
	}
}
function 零_索敵値(s) {
	if (艦戦データ[s].索敵値 != undefined) {
		return 艦戦データ[s].索敵値;
	} else {
		return 0;
	}
}
function 零_行動半径(s) {
	if (艦戦データ[s].半径 !== undefined) {
		return 艦戦データ[s].半径;
	} else {
		return 0;
	}
}
const 零_配置コスト = (s) => {
	if (艦戦データ[s] === undefined || 艦戦データ[s].コスト === undefined) return 0;
	return 艦戦データ[s].コスト;
}
function 零_種類(s) {
	if (艦戦データ[s] === undefined) throw new Error("不明な装備(" + s + ")");
	return 艦戦データ[s].種類;
}
const 零_装備火力値 = (s) => {
	if (艦戦データ[s] === undefined) throw new Error(`不明な装備(${s})`);
	const a = 艦戦データ[s].火力;
	return a ? a : 0;
}
const 零_装備雷装値 = (s) => {
	if (艦戦データ[s] === undefined) throw new Error(`不明な装備(${s})`);
	const a = 艦戦データ[s].雷装;
	return a ? a : 0;
}
const 零_装備爆装値 = (s) => {
	if (艦戦データ[s] === undefined) throw new Error(`不明な装備(${s})`);
	const a = 艦戦データ[s].爆装;
	return a ? a : 0;
}
function 零_熟練ボーナス(j, s) {

	//熟練ボーナス=√(a/10)+b
	//a:内部熟練度 b:熟練度段階による加算値
	//熟練度：0-9,-24,-39,-54,-69,-84,-99,-120

	var sh = 零_種類(s);
	var a = 0, b = 0;
	if (sh == "装備無し") return 0;

	if (零_戦闘機か(s)) {
		b = [0, 0, 2, 5, 9, 14, 14, 22][j];
	} else if (sh == "水上爆撃機") {
		b = [0, 0, 1, 1, 1, 3, 3, 6][j];
	}

	if (O.settings.calc_120 === true && j == 7 && 零_戦闘機か(s)) {
		j = 8; //内部熟練度MAX
	}

	a = [0, 10, 25, 40, 55, 70, 85, 100, 120][j];
	return sqrt(a / 10) + b;
}



function 零_熟練度マーク(a) {
	return 雑データ["熟練度マーク"][a];
}

function 零_改修マーク(a) {
	return 雑データ["改修マーク"][a];
}
function 零_偵察機補正(装備, mode) { //防空時の偵察機による制空値上昇倍率　または出撃時の陸上偵察機による〃
	var 種類 = 零_種類(装備);
	var 索敵値 = 零_索敵値(装備);

	if (mode === "防空") {
		if (種類 == "水上偵察機" || 種類 == "大型飛行艇") {
			if (索敵値 <= 7) return 1.1;
			if (索敵値 == 8) return 1.13;
			if (索敵値 >= 9) return 1.16;
		} else if (種類 == "艦上偵察機") {
			if (索敵値 <= 7) return 1.2;
			if (索敵値 == 8) return 1.25; //該当装備無しのため数値は暫定
			if (索敵値 >= 9) return 1.3;
		} else if (種類 === "陸上偵察機") {
			//			if(索敵値<=7) return 1.x; //該当機なし
			if (索敵値 == 8) return 1.18;
			if (索敵値 >= 9) return 1.24; //要検証：二式陸上偵察機(熟練)
		}
	} else if (mode === "出撃") {
		if (種類 === "陸上偵察機") {
			//			if(索敵値<=7) return 1.x; //該当機なし
			if (索敵値 == 8) return 1.15;
			if (索敵値 >= 9) return 1.18;
		}
	}
	return 1;
}

const 零_敵対空値 = (i) => {
	const d = 深海棲艦装備idデータ[i];
	if (d === undefined) return 0;
	return d.aa;
}
const 零_航空機または偵察機か = (cat) => {
	const 航空機 = [6, 7, 8, 11, 45, 56, 57, 58];
	const 航空機偵察機 = [9, 10, 41, 47, 48, 49, 94].concat(航空機);
	return 航空機偵察機.includes(cat);
}
const 零_航空機か = (cat) => {
	const 航空機 = [6, 7, 8, 11, 45, 56, 57, 58];
	return 航空機.includes(cat);
}
const 零_敵装備カテゴリ = (id) => {
	const d = 深海棲艦装備idデータ[id];
	if (d === undefined) return 0;
	return d.cat;
}
const 零_敵装備 = (i) => {
	const id = 零_n2i(i, "深海棲艦");
	const d = 深海棲艦idデータ[id];
	if (!d) return [];
	if (!d.eq) return [];
	return d.eq;
}






function 二_方面選択クラスを解除() {
	var el = $("広域海域リスト").childNodes;
	for (var i = 0; i < el.length; i++) {
		el[i].classList.remove("selected");
	}
}
function 二_海域選択クラスを解除() {
	var el = $("海域選択リスト").childNodes;
	for (var i = 0; i < el.length; i++) {
		el[i].classList.remove("selected");
	}
}

function 二_海域方面選択を表示() {
	var el = 二_海域方面選択を生成();
	el.id = "広域海域リスト";
	$("方面選択").appendChild(el);
}
function 二_海域方面選択を生成() {
	var el = ce("ul");
	for (var i in 海域データ) {
		if (i === "【4月1日限定】南方レーモン海域") {
			if (is0401() === false) continue;
		}
		var li = ce("li");
		if (海域データ[i]["属性"]) {
			var ez = ce("span");
			ez.className = "属性";
			ez.dataset.hou = i;
			for (var j = 0; j < 海域データ[i]["属性"].length; j++) {
				li.classList.add(海域データ[i]["属性"][j]);
				li.classList.add("選択ボタン");
				if (eq(海域データ[i]["属性"][j], ["通常海域", "難易度なし", "第二期"])) continue;
				var eez = ce("span");
				eez.textContent = 海域データ[i]["属性"][j];
				eez.dataset.hou = i;
				ez.appendChild(eez);
			}
			li.appendChild(ez);
		}

		li.appendChild(ct(i));
		li.dataset.hou = i;

		var a = 二_海域wikiリンクを生成(i);
		li.appendChild(a);

		li.addEventListener("click", function (e) {
			var li = e.target.tagName == "LI" ? e.target : e.target.parentNode.parentNode;
			二_方面選択クラスを解除();
			li.classList.add("selected");
			一_海域方面を選択(e);
			二_海域選択を表示(e);
		});
		if (i.match("《甲》")) li.classList.add("甲");
		if (i.match("《乙》")) li.classList.add("乙");
		if (i.match("《丙》")) li.classList.add("丙");
		if (i.match("《丁》")) li.classList.add("丁");
		el.appendChild(li);

		if (i === O.hou) {
			setTimeout((function (li) {
				return function () {
					li.click();
				}
			})(li), 100);
		}
	}
	return el;
}
const 二_海域wikiリンクを生成 = (hou) => {
	const z = 海域データ[hou]["属性"];
	const span = ce("span");
	const a1 = ce("a");
	const a2 = ce("a");
	let isDai1ki = false, isEvent = false, isKakuchou = false;
	const wikiLink = 海域データ[hou]["Wikiリンク"];
	let href = hou;

	for (let i = 0; i < z.length; i++) {
		if (z[i] === "第一期") {
			isDai1ki = true;
		} else if (z[i] === "期間限定海域") {
			isEvent = true;
		}
	}

	if (海域データ[hou]["拡張作戦"]) {
		const a1 = span.appendChild(ce("a"));
		const a2 = span.appendChild(ce("a"));

		a1.href = wiki_url(hou.replace(/《.+》/g, ""));
		a2.href = wiki_url(hou.replace(/《.+》/g, "") + "/拡張作戦");
		a1.appendChild(ct("wiki"));
		a2.appendChild(ct("拡張"));

		a1.target = a2.target = "_blank";
		a1.dataset.hou = a2.dataset.hou = hou;

	} else {
		href = hou;
		if (hou === "【4月1日限定】南方レーモン海域") href = "戦艦レ級";
		if (wikiLink) href = wikiLink;

		const a = span.appendChild(ce("a"));
		if (isDai1ki && !isEvent) {
			a.href = wiki_url("第一期/" + href.replace(/《.+》|\(旧\)/g, ""));
		} else {
			a.href = wiki_url(href.replace(/《.+》/g, ""));
		}
		a.appendChild(ct("wiki"));
		a.target = "_blank";
		a.dataset.hou = hou;
	}

	return span;
}
function 二_海域選択を表示(e) {
	隠す("海域選択リスト");
	二_マップを初期化(true);
	隠す("ルート選択");
	隠す("ルート抽出");
	$("ルート選択親").classList.remove("chked");
	隠す("敵艦隊選択");
	$("敵艦隊選択親").classList.remove("chked");
	隠す("航空隊選択");
	$("航空隊選択親").classList.remove("chked");
	O.kouku = [];
	O.kouku_set = false;
	O.kouku_calc = false;
	if (C && C.c1) {
		C.c1.unload();
		C.c2.unload();
	}

	$("マップ").classList.remove("chked");

	var el = 二_海域選択を生成(e);
	el.id = "海域選択リスト";
	$("方面選択").appendChild(el);
}
function 二_海域選択を生成(e) {
	var t = e.target.dataset.hou;
	var m = 海域データ[t]["データ"];
	var el = ce("ul");
	for (var i in m) {
		var li = ce("li");
		li.addEventListener("click", function (e) {
			O.route = [];
			二_海域選択クラスを解除();
			e.target.classList.add("selected");
			一_海域を選択(e);
			二_海域確定(e);
			二_結果テーブルを表示();
		});
		li.classList.add("選択ボタン");
		if (document.body.dataset.fes == "sanma") { //秋刀魚祭り開催中、ドロップポイントにマークを付ける
			var fes海域 = fes_point.sanma;
			for (var f in fes海域) {
				for (var fj = 0; fj < fes海域[f].length; fj++) {
					if (i == fes海域[f][fj] && t == f) {
						li.classList.add("sanmaPoint");
					}
				}
			}
		}
		if (document.body.dataset.fes.indexOf("iwashi") >= 0) { //鰯祭り開催中、ドロップポイントにマークを付ける
			const 鰯p = fes_point.iwashi;
			const 秋刀魚p = fes_point.sanma;
			for (var f in 鰯p) {
				for (var fj = 0; fj < 鰯p[f].length; fj++) {
					if (i == 鰯p[f][fj] && t == f) {
						li.classList.add("iwashiPoint");
					}
				}
			}
			for (var f in 秋刀魚p) {
				for (var fj = 0; fj < 秋刀魚p[f].length; fj++) {
					if (i == 秋刀魚p[f][fj] && t == f) {
						li.classList.add("sanmaPoint");
					}
				}
			}
		}
		li.appendChild(ct(i))
		el.appendChild(li)

		if (i === O.kai) {
			setTimeout((function (li) {
				return function () {
					li.click();
				}
			})(li), 100);
		}
	}
	return el;
}
function 二_海域確定(e) {
	二_マップを初期化(false);
	隠す("ルート選択");
	$("マップ").classList.remove("chked");
	隠す("ルート抽出");
	$("ルート選択親").classList.remove("chked");
	隠す("敵艦隊選択");
	$("敵艦隊選択親").classList.remove("chked");
	O.kouku_calc = false;
	二_結果チャートをリセット();
	二_航空隊出撃ポイント選択を表示();

	const mapName = マス配置データ対応表[O.hou][O.kai];
	const data = mapData[mapName].data;
	let x, y;
	if (data) x = data.x;
	if (data) y = data.y;
	$("マップ").appendChild(makeMapSVG(mapName, "目的地選択", document.body.dataset.fes, x, y)); //map.jsへ投げる
}
function 二_マップを初期化(appendBlank) {
	var m = $("マップ");
	while (m.querySelector("svg") !== null) {
		m.removeChild(m.querySelector("svg"));
	}
	if (appendBlank) {
		const d = $("空のマップ") ? $("空のマップ") : ce("svg");
		d.id = "空のマップ";
		m.appendChild(d);
	}
}
function 二_ルート確定(r) {
	O.eseikus = [];
	O.route = r;
	$("ルート選択親").classList.add("chked");
	$("ルート選択親").querySelector("h3").dataset.selected = `ルート：${O.route.join("")}`;
	二_結果テーブルを表示();
}
function 二_ルート選択を表示(t) {
	ルートの強調表示オフ();
	隠す("ルート選択");
	隠す("ルート抽出");
	O.route = [];
	t.preventDefault();
	$("ルート選択親").classList.remove("chked");

	var target = t.target;
	var mn = マス目からマップを特定する(target);

	var o = target.parentNode;
	var texts = ルートを列挙する(mn, [[マス目から文字を特定する(target)]])

	if (texts.length > 10) {
		const sp = $("ルート選択親").appendChild(ce("span"));
		sp.id = "ルート抽出";
		sp.appendChild(ct("ルートを抽出: "));
		const input = sp.appendChild(ce("input"));
		input.id = "ルート抽出_input"
		input.addEventListener("input", ((texts) => {
			return () => {
				let v = $("ルート抽出_input").value;
				v = v.toUpperCase();
				let matchs = [];
				for (let i of texts) {
					const str = i.join("").toUpperCase();
					const idx = str.indexOf(v);
					if (idx > -1) matchs.push(i);
				}
				let result = texts;
				if (matchs.length >= 1) result = matchs;
				隠す("ルート選択");
				二_ルート一覧を表示(result);
				$("ルート抽出_件数").textContent = `${matchs.length}件`;
			}
		})(texts), false);
		const res = sp.appendChild(ce("span"));
		res.id = "ルート抽出_件数";
		res.textContent = `${texts.length}件`;
	}


	二_ルート一覧を表示(texts);
}
const 二_ルート一覧を表示 = (texts) => {
	var el = document.createElement("div");
	el.id = "ルート選択";
	var len = texts.length;
	var sorted = texts.sort();
	var route_row = ((len) => {
		for (let i = 9; i >= 6; i--) {
			if (len % i > 5) return i;
		}
		return len > 10 ? 9 : 10;
	})(len);

	for (var i = 0; i < len / route_row; i++) {
		var div = el.appendChild(ce("div"));
		for (var j = 0; j < route_row; j++) {
			if (len <= i * route_row + j) break;
			var route = sorted[i * route_row + j];
			var el0 = div.appendChild(ce("div"));
			el0.appendChild(document.createTextNode(route.join("")));
			el0.addEventListener("mouseover", (function (e, route) {
				return function (e) {
					if (O.route.length !== 0) return;
					ルートの強調表示オフ();
					ルートの強調表示オン(route);
				}
			})("", route));
			el0.addEventListener("click", (function (e, route) {
				return function (e) {
					ルートの強調表示オフ();
					ルートの強調表示オン(route);
					二_ルート確定(route);
				}
			})("", route));
		}
	}
	el.addEventListener("mouseout", function () {
		if (O.route.length !== 0) return;
		ルートの強調表示オフ();
	});
	$("ルート選択親").appendChild(el);
}


function 二_敵艦隊選択を表示(p) {
	$("敵艦隊選択親").classList.remove("chked");
	隠す("敵艦隊選択");

	var el = 二_敵艦隊選択を生成(p);
	if (typeof el === "object") {
		el.id = "敵艦隊選択";
		$("敵艦隊選択親").appendChild(el);
	}
}
const 二_敵艦隊選択を生成 = (masu) => {
	const hou = O.hou;
	const kai = O.kai;
	const data = 海域データ[hou]["データ"][kai];
	const el = ce("ul");
	if (data[masu] === undefined) { //敵編成がいない場合は選択画面を出さずに「航空戦力なし」を設定
		二_深海棲艦を全員はずす();
		二_深海棲艦を追加(2);
		O.eseikus[O.eseikus.length - 1] = 零_敵制空初期値(); //選択マスに航空戦力なしを設定
		$("敵艦隊選択親").classList.add("chked");
		$("敵艦隊選択親").querySelector("h3").dataset.selected = `敵編成：${零_敵艦隊一行()}`;
		二_結果テーブルを表示();
		return 0;
	} else {
		for (let i = 0; i < data[masu].length; i++) {
			const li = ce("li");
			const hs = data[masu][i];
			const sp = ce("span");
			const so = 零_敵合計制空値(hs, false);
			sp.appendChild(ct(`制空値${so}|`))
			li.appendChild(sp);
			for (let j = 0; j < hs.length; j++) {
				const ss = 零_i2n(hs[j], "深海棲艦");
				if (ss === "-") continue;
				const en = ce("span");
				en.className = "深海棲艦名";
				en.appendChild(ct(ss));
				li.appendChild(en);
			}
			li.addEventListener("click", ((hs) => {
				return () => {
					二_深海棲艦を全員はずす();
					hs.forEach(a => { 二_深海棲艦を追加(零_n2i(a, "深海棲艦")) });
					O.eseikus[O.eseikus.length - 1] = 零_敵制空初期値();
					$("敵艦隊選択親").classList.add("chked");
					$("敵艦隊選択親").querySelector("h3").dataset.selected = `敵編成：${零_敵艦隊一行()}`;
					O.kouku_recalc = true;
					二_結果テーブルを表示();
				}
			})(hs));
			el.appendChild(li);
			if (data[masu].length === 1) li.click();
		}
		return el;
	}
}
const 二_結果チャートをリセット = () => {
	if (C && C.c1) {
		C.c1.unload();
		C.c2.unload();
	}
}
const 二_航空隊出撃ポイント選択を表示 = () => {
	隠す("航空隊選択");
	O.kouku_set = false;
	$("航空隊選択親").classList.remove("chked");
	if (零_航空隊出撃部隊数() === 0) {
		$("航空隊選択親").hidden = true;
	} else {
		$("航空隊選択親").hidden = false;
		const el = 二_航空隊出撃ポイント選択を生成();
		el.id = "航空隊選択";
		$("航空隊選択親").appendChild(el);
	}
}
const 二_航空隊出撃ポイント選択を生成 = () => {
	O.kouku = [];
	const wave = [];
	for (let i = 0; i < O.table.length; i++) {
		const d = O.table[i];
		if (d.data.kanmusu === "基地航空隊" && d.data.kaizou === "出撃" && d.data.hidden === false) {
			wave.push(i);
		}
	}

	const table = ce("table");
	for (let i = 0; i < wave.length; i++) {
		const tr1 = table.appendChild(ce("tr"));
		const th1 = tr1.appendChild(ce("td"));
		const td1 = tr1.appendChild(ce("td"));

		th1.appendChild(ct(`${i + 1}-1`));
		td1.appendChild(二_航空隊出撃マスを生成(i * 2, wave.length * 2));


		const tr2 = table.appendChild(ce("tr"));
		const th2 = tr2.appendChild(ce("td"));
		const td2 = tr2.appendChild(ce("td"));

		th2.appendChild(ct(`${i + 1}-2`));
		td2.appendChild(二_航空隊出撃マスを生成(i * 2 + 1, wave.length * 2));
	}
	return table;
}
const 二_航空隊出撃マスを生成 = (idx, num_w) => {
	$("航空隊選択親").classList.remove("chked");
	const div = ce("div");
	div.id = `航空隊出撃マス候補群_${idx}`;
	if (O.hou === undefined || O.kai === undefined) return div;
	const mas = 零_マップの戦闘マスを列挙(O.hou, O.kai);
	for (let i of mas) {
		const btn = div.appendChild(ce("span"));
		btn.classList.add("航空隊出撃マス", "選択ボタン");
		//戦闘行動半径不足ならここでclass追加（あとでやる）（CSSもあとでやる）
		//		if()
		btn.appendChild(ct(i));
		btn.addEventListener("click", ((idx, i, num_w) => {
			return (e) => {
				document.querySelectorAll(`#航空隊出撃マス候補群_${idx} .航空隊出撃マス`).forEach(a => a.classList.remove("selected"));
				O.kouku[idx] = i;
				if (O.kouku.length === num_w && O.kouku.filter(a => a !== undefined).length === num_w) {
					$("航空隊選択親").classList.add("chked");
					O.kouku_calc = true
					O.kouku_set = true;
					O.kouku_recalc = true;
					二_結果テーブルを表示();
				}
				e.target.classList.add("selected");
			}
		})(idx, i, num_w), false);
	}
	return div;
}






function 二_深海棲艦を追加(a) {
	if (typeof a === "object") { //array
		for (var i = 0; i < a.length; i++) {
			二_深海棲艦を追加(a[i]);
		}
	} else {
		O.eseikus[O.eseikus.length - 1] = 零_敵制空初期値(); //結果テーブル最終列をリセット
		const i = 零_n2i(a, "深海棲艦");
		一_深海棲艦を追加(i);
		二_深海棲艦表に行を追加(i, O.etable.length);
		二_深海棲艦表を更新();
	}
}
const 二_深海棲艦表に行を追加 = (a, idx) => {
	if (a === "") return;
	const tb = ce("tbody");
	const tr = ce("tr");
	const c0 = ce("td");
	const c1 = ce("td");
	const c2 = ce("td");
	const c3 = ce("td");

	const b = ce("button");
	b.appendChild(ct("はずす"));
	b.addEventListener("click", function () {
		二_深海棲艦をはずす(idx);
	});
	c0.appendChild(b);
	tr.appendChild(c0);

	c1.appendChild(ct(零_i2n(a, "深海棲艦")));
	tr.appendChild(c1);
	c2.appendChild(ct(零_敵制空値(a)));

	c3.appendChild(ct(零_敵制空値(a, true)));

	c2.className = "num"
	c3.className = "num"
	tr.appendChild(c2);
	tr.appendChild(c3);
	tb.appendChild(tr);
	$("深海棲艦一覧").appendChild(tb);
}
function 二_深海棲艦を全員はずす() {
	for (var i = O.etable.length - 1; i >= 0; i--) {
		二_深海棲艦をはずす(i);
	}
}
function 二_深海棲艦をはずす(idx) {
	O.eseikus[O.eseikus.length - 1] = 零_敵制空初期値(); //結果テーブル最終列をリセット
	一_深海棲艦をはずす(idx);
	二_深海棲艦表を更新();
	二_結果テーブルを表示();
}

function 二_深海棲艦追加を生成() {
	var el = ce("ul");
	el.classList.add("深海棲艦追加");
	for (let i in 深海棲艦idデータ) {
		const li = ce("li");
		const sp = ce("span");
		const str = `　(制空値: ${零_敵制空値(i)})`;
		sp.appendChild(ct(str));

		li.addEventListener("click", ((eid) => {
			return () => {
				二_深海棲艦を追加(eid);
				二_結果テーブルを表示();
			}
		})(i), false);
		li.classList.add("clickable");
		li.appendChild(ct(零_i2n(i, "深海棲艦")));
		li.appendChild(sp);
		el.appendChild(li);
	}
	return el;
}

function 二_深海棲艦表を更新() {
	二_深海棲艦表を初期化();
	var d = O.etable;
	for (var i = 0; i < d.length; i++) {
		二_深海棲艦表に行を追加(d[i], i);
	}
	O.eseiku = 零_敵合計制空値(d, false);

	二_深海棲艦表のフッタを更新();
}
function 二_深海棲艦表のフッタを更新() {
	const s1 = 零_敵合計制空値(O.etable, false);
	const s2 = 零_敵合計制空値(O.etable, true);
	const o1 = 零_制空状況境界値を計算(s1);
	const o2 = 零_制空状況境界値を計算(s2);

	$("敵艦隊合計制空値").textContent = o1.制空値;
	$("敵艦隊_制空権確保").textContent = o1.確保
	$("敵艦隊_航空優勢").textContent = o1.優勢
	$("敵艦隊_航空拮抗").textContent = o1.拮抗
	$("敵艦隊_航空劣勢").textContent = o1.劣勢

	$("敵艦隊合計航空隊制空値").textContent = o2.制空値;
	$("敵艦隊_航空隊_制空権確保").textContent = o2.確保
	$("敵艦隊_航空隊_航空優勢").textContent = o2.優勢
	$("敵艦隊_航空隊_航空拮抗").textContent = o2.拮抗
	$("敵艦隊_航空隊_航空劣勢").textContent = o2.劣勢
}
function 二_深海棲艦表を初期化() {
	var table = $("深海棲艦一覧");
	var tbs = table.tBodies;
	for (var i = tbs.length - 1; i >= 0; i--) {
		table.removeChild(tbs[i]);
	}
}
function 一_深海棲艦をはずす(idx) {
	O.etable.splice(idx, 1);
}





function 一_深海棲艦を追加(a) {
	O.etable.push(a);
}
function 一_海域方面を選択(e) {
	O.hou = e.target.dataset.hou;
}
function 一_海域を選択(e) {
	O.kai = e.target.textContent;
}

function 零_制空状況境界値を計算(制空値) { //下限を算出
	let 劣勢, 拮抗, 優勢, 確保;
	if (制空値 === 0) {
		劣勢 = 拮抗 = 優勢 = 確保 = 0;
	} else {
		劣勢 = Math.floor(1 + 制空値 / 3);
		拮抗 = Math.floor(1 + 制空値 * 2 / 3);
		優勢 = Math.ceil(制空値 * 3 / 2);
		確保 = Math.ceil(制空値 * 3);
	}
	return {
		制空値: 制空値,
		劣勢: 劣勢,
		拮抗: 拮抗,
		優勢: 優勢,
		確保: 確保
	};
}
function 零_敵合計制空値(ary, land = false) {
	var s = 0;
	for (var i = 0; i < ary.length; i++) {
		if (ary[i] == "") continue;
		s += 零_敵制空値(ary[i], land);
	}
	if (i == 0) f = true;
	return s;
}
const 零_敵制空値 = (a, land = false) => {
	const i = 零_n2i(a, "深海棲艦"); //aが名前かidか分からないのでidに統一
	const s = 深海棲艦idデータ[i];
	if (s === undefined) return 0;
	if (land && s.apl) return s.apl;
	return s.ap;
}
const 零_敵搭載数 = (i) => {
	const id = 零_n2i(i, "深海棲艦");
	const a = 深海棲艦idデータ[id];
	if (!a) return [];
	if (!a.ac) return [];
	return deepcopy(a.ac);
}

const 零_i2n = (id, s) => {
	if ("" + id !== "" + Number(id)) return id; //idではない場合そのまま返す
	switch (s) {
		case "深海棲艦":
			if (深海棲艦idデータ[id]) return 深海棲艦idデータ[id].name;
			break;
		case "艦娘":
			for (let i in 艦娘データ) {
				for (let j in 艦娘データ[i].データ) {
					const d = 艦娘データ[i].データ[j];
					if (d.id === id) return j;
				}
			}
			break;
		case "装備":
			for (let i in 艦戦データ) {
				if (艦戦データ[i] && 艦戦データ[i].id === id) return i;
			}
			break;
	}
	return "-";
}
const 零_n2i = (name, s, kaizou) => {
	if ("" + name === "" + Number(name)) return name; //nがidの場合そのまま返す
	switch (s) {
		case "深海棲艦":
			for (let i in 深海棲艦idデータ) {
				if (name === 深海棲艦idデータ[i].name) return i;
			}
			break;
		case "艦娘":
			if (艦娘データ[name] && 艦娘データ[name].データ[kaizou]) {
				const d = 艦娘データ[name].データ[kaizou]
				if (d.id) return d.id;
			}
			break;
		case "装備":
			if (艦戦データ[name] && 艦戦データ[name].id) return 艦戦データ[name].id;
			break;
	}
	return 0;
}

const 零_制空判定 = (f, e) => {
	if (e === 0) {
		if (f > 0) {
			return "確保";
		} else {
			return "拮抗";
		}
	} else {
		var p = f / e;
		if (p <= 1 / 3) {
			return "喪失";
		} else if (p <= 2 / 3) {
			return "劣勢";
		} else if (p < 3 / 2) {
			return "拮抗";
		} else if (p < 3) {
			return "優勢";
		} else {
			return "確保"
		}
	}
}


const 零_喪失数計算 = (機数, 制空状況, 形式) => {
	const 制空定数表 = { 確保: 1, 優勢: 3, 拮抗: 5, 劣勢: 7, 喪失: 10, };
	const 制空定数 = 制空定数表[制空状況];
	const m = Math.floor(制空定数 * 100 / 3)
	switch (形式) {
		case "最小":
			return Math.floor(機数 * (制空定数 / 4) / 10);
		case "最大":
			return Math.floor(機数 * (m / 100 + 制空定数 / 4) / 10);
		case "平均":
			let s = 0;
			for (let i = 0; i <= m; i++) {
				s += Math.floor(機数 * (i / 100 + 制空定数 / 4) / 10);
			}
			return s / (m + 1);
	}
	/*	旧式
		const o = {
			確保: [7, 15],
			優勢: [20, 45],
			拮抗: [30, 75],
			劣勢: [45, 105],
			喪失: [65, 150],
		};
		switch (形式) {
			case "最小":
				return parseInt(機数 * o[制空状況][0] / 256);
			case "最大":
				return parseInt(機数 * o[制空状況][1] / 256);
			case "平均":
				let c = 0;
				for (let i = o[制空状況][0]; i <= o[制空状況][1]; i++) {
					c += parseInt(機数 * i / 256);
				}
				return c / (o[制空状況][1] - o[制空状況][0] + 1);
		}
	*/
}
const 零_敵喪失数計算 = (機数, 制空状況, 形式) => {
	const m = {
		確保: 10,
		優勢: 8,
		拮抗: 6,
		劣勢: 4,
		喪失: 1,
	}; //※制空状況は自艦隊から見て
	const r = m[制空状況];
	switch (形式) {
		case "最小":
			return 0;
		case "最大":
			return Math.floor(r * 機数 / 10);
		case "乱数":
			const r1 = Math.floor(Math.random() * (r + 1));
			const r2 = Math.floor(Math.random() * (r + 1));
			return Math.floor(機数 * (35 * r1 + 65 * r2) / 1000);
	}
}

function 二_結果テーブルを表示() {
	零_ローカルストレージ保存(O, "O");
	隠す("結果一行");
	隠す("結果");
	隠す("防空結果");

	if (O.idx <= 0 || O.kai === undefined || O.route.length === 0) { //簡易結果
		var el = 二_簡易結果テーブルを生成();
		el.id = "結果";
		$("結果親").appendChild(el);
	} else {													//詳細結果
		二_結果一行を表示();
		var el = 二_結果テーブルを生成();
		el.id = "結果";
		$("結果親").appendChild(el);
	}

	if (O.settings.show_kushu && 零_基地空襲があるか(O.hou, O.kai)) { //防空結果
		var el = 二_防空結果テーブルを生成();
		el.id = "防空結果";
		$("結果親").appendChild(el);
	}
}
function 二_防空結果テーブルを生成() {
	var table = ce("table");
	var caption = table.appendChild(ce("caption"));
	caption.appendChild(ct("空襲に対する防空結果"));
	var 敵艦隊s = 海域データ[O.hou].データ[O.kai]["基"];
	var 敵艦隊の種類数 = 敵艦隊s.length;
	const 対通常防空値 = 零_自艦隊合計制空値().航空隊
	const 対重爆防空値 = 零_自艦隊合計制空値().対重爆制空値;
	var th_str = ["航空隊(防空)制空値", "(対重爆)", "敵編成", "劣勢", "拮抗", "優勢", "確保", "敵制空値", "制空争い結果"];
	const 重爆空襲か = [];
	for (let j = 0; j < 敵艦隊の種類数; j++) {
		重爆空襲か[j] = 零_重爆込み空襲か(敵艦隊s[j]);
		let jf = false;
		if (O.hou === "進撃！第二次作戦「南方作戦」《乙》" && O.kai === "ソロモン諸島沖") { //南方作戦E-6乙の空襲はロケット戦闘機補正がかかるらしい
			jf = true;
		}
		if (O.kai === "四国沖/九州西方五島列島沖") jf = true;
		if (O.kai === "小笠原諸島沖") jf = true;
		if (O.kai === "ノルウェー北岬沖/北極海") jf = true;
		if (O.hou === "護衛せよ！船団輸送作戦《甲》" && O.kai === "ルソン島沖/オルモック沖") jf = true;
		if (O.kai === "ラバウル沖/ビスマルク諸島沖/ソロモン諸島沖") jf = true;
		if (jf) {
			重爆空襲か[j] = true;
		}
	}

	for (var i = 0; i < 9; i++) {
		var tr = table.appendChild(ce("tr"));
		if (i == 0 || i === 1) { //防空制空値・対重爆防空制空値
			var th = tr.appendChild(ce("td"));
			th.appendChild(ct(th_str[i]));
			th.classList.add("左見出し");
			for (j = 0; j < 敵艦隊の種類数; j++) {
				var td = tr.appendChild(ce("td"));
				let 表示内容 = "-";
				if (i === 0) {
					if (重爆空襲か[j] === false) 表示内容 = 対通常防空値;
				} else {
					if (重爆空襲か[j] === true) 表示内容 = 対重爆防空値;
				}
				td.appendChild(ct(表示内容));
				td.classList.add("num", "center");
			}
		} else {
			//			if(O.settings.show_border===false && 2<=i && i<=5) continue; //本隊結果と共通の設定のつもりだったけどグラフにしたので一旦コメントアウト
			for (var j = 0; j <= 敵艦隊の種類数; j++) {
				if (j == 0) {
					var th = tr.appendChild(ce("td"));
					th.appendChild(ct(th_str[i]));
					th.classList.add("左見出し");
				} else {
					var td = tr.appendChild(ce("td"));
					var o = 零_敵合計制空値(敵艦隊s[j - 1], true);
					const 防空値 = 重爆空襲か[j - 1] ? 対重爆防空値 : 対通常防空値;
					var 制空争い結果 = 零_制空判定(防空値, o);
					switch (i) {
						case 2: //敵編成
							var 敵艦隊 = 敵艦隊s[j - 1];
							var ul = td.appendChild(ce("ul"));
							for (var k = 0; k < 敵艦隊.length; k++) {
								var li = ul.appendChild(ce("li"))
								li.appendChild(ct(零_i2n(敵艦隊[k], "深海棲艦")));
							}
							break;
						case 7: //敵制空値
							td.appendChild(ct(o));
							td.classList.add("num");
							break;
						case 8: //結果
							td.appendChild(ct(制空争い結果));
							break;
						default: //i==3～6 劣勢～確保
							var o2 = 零_制空状況境界値を計算(o);
							var 制空状況 = ["劣勢", "拮抗", "優勢", "確保"][i - 3];
							var 必要制空値 = o2[制空状況];
							if (制空状況 == 制空争い結果) td.classList.add("現在の制空状況");

							td.appendChild(零_敵制空値と差分(防空値, 必要制空値));
							td.classList.add("num");

							break;
					}
				}
			}
		}
	}
	return table;
}
function 二_簡易結果テーブルを生成() {
	var seiku = 零_自艦隊合計制空値().艦娘;

	var div = ce("div")
	var table = ce("table");
	var tr = table.appendChild(ce("tr"))
	tr.appendChild(ce("td")).appendChild(ct("自艦隊制空値"));
	var td = tr.appendChild(ce("td"))
	td.appendChild(ct(seiku));
	td.classList.add("num");

	var tr = table.appendChild(ce("tr"))
	tr.appendChild(ce("td")).appendChild(ct("敵艦隊制空値"));
	var td = tr.appendChild(ce("td"));
	td.appendChild(ct(O.eseiku));
	td.classList.add("num");

	var tr = table.appendChild(ce("tr"))
	tr.appendChild(ce("td")).appendChild(ct("制空権"));
	tr.appendChild(ct(零_制空判定(seiku, O.eseiku)));

	var p = div.appendChild(ce("p"));
	p.appendChild(ct("▲マップ で (1)出撃海域 (2)目的地 (3)目的地までのルート (4)敵艦隊 を順番に選ぶと詳細な結果が表示されます"));
	var p2 = div.appendChild(ce("p"));
	var a = p2.appendChild(ce("span"));
	a.classList.add("navi", "clickable");
	a.appendChild(ct("このツールの使い方を確認"));
	a.addEventListener("click", function () { 二_ナビゲーション("sec_使い方") });

	div.appendChild(table);

	return div;
}
function 二_結果テーブルを生成() {
	var ss = 一_戦闘数を取得();
	O.tmat = [];
	var table = ce("table");

	table.appendChild(二_結果ヘッダを生成(ss));
	一_敵制空テーブルを生成();
	var tableData = 一_結果ボディを生成(ss);

	for (var i = 0; i < O.table.length; i++) {
		if (O.table[i].data.kanmusu === "") continue;
		if (O.table[i].data.kanmusu === "基地航空隊") continue;
		if (一_表のセルデータ取得(i, "hidden") === true) continue;
		table.appendChild(二_結果ボディを生成(tableData, i, ss));
	}
	table.appendChild(二_結果フッタを生成(tableData, ss));
	return table;
}
function 二_結果ヘッダを生成(ss) {
	var th = ce("thead");
	var tr = ce("tr");
	var td0 = ce("th");
	td0.appendChild(ct("艦娘"));
	var td1 = ce("th");
	td1.appendChild(ct("装備"));

	th.appendChild(tr);
	tr.appendChild(td0);
	tr.appendChild(td1);

	for (var i = 0; i < ss; i++) {
		var td = ce("th");
		td.appendChild(ct(i + 1 + "戦目"));
		tr.appendChild(td);
	}
	var td3 = ce("th");
	td3.appendChild(ct((i) + "戦終了時"));
	tr.appendChild(td3);

	var tr2 = th.appendChild(ce("tr"));
	var td = tr2.appendChild(ce("td"));
	td.appendChild(ct("マス→"));
	td.colSpan = "2";
	td.className = "左見出し";
	var ps = 零_ルート上の戦闘マスを列挙();
	for (var i = 0; i < ss; i++) {
		var td = tr2.appendChild(ce("td"));
		td.classList.add("masu");
		td.appendChild(ct(ps[i]));
	}
	tr2.appendChild(ce("td")); //戦闘終了後


	var tr3 = ce("tr");
	var td = tr3.appendChild(ce("td"));
	td.appendChild(ct("敵艦隊→"));
	td.colSpan = "2";
	td.className = "左見出し";
	var 敵艦隊種別を表示 = false;
	for (var i = 0; i < ss; i++) {
		var td = tr3.appendChild(ce("td"));
		td.classList.add("masu");
		if (零_連合艦隊戦か(i)) {
			var span = td.appendChild(ce("b"));
			span.appendChild(ct("連合"));
			敵艦隊種別を表示 = true;
		}
		else {
			td.appendChild(ct("通常"));
		}
	}
	tr3.appendChild(ce("td")); //戦闘終了後

	if (敵艦隊種別を表示 || 零_第2艦隊所属艦数() > 0) {
		th.appendChild(tr3);
	}


	return th;
}
const 二_結果グラフを生成 = () => {
	const ss = 一_戦闘数を取得();
	const td = 一_結果ボディを生成(ss);
	const canvas = ce("canvas");
	if (!canvas || !canvas.getContext) return;
	const ctx = canvas.getContext("2d");

	const gw = 32;	//グラフ1本の横幅(px)
	const gml = 4;	//グラフ左の空欄領域
	const gmr = 28;	//　　　右
	const gh = 160;	//グラフの縦幅
	const ch = gh + 5;	//描画領域全体の縦幅
	const cw = ss * (gw + gml + gmr);	//描画領域の横幅
	const fontSize = 12;
	const dotSize = 2.5; //折れ線グラフの点の半径
	const boxPaddingX = 3; //制空値の点の背景のパディング
	const boxPaddingY = 5;

	canvas.width = cw;
	canvas.height = ch;
	ctx.fillStyle = "#fff";
	ctx.fillRect(0, 0, cw, ch);

	ctx.strokeStyle = "#333";
	ctx.beginPath();
	ctx.moveTo(0, gh);
	ctx.lineTo(cw, gh);
	ctx.stroke();


	let max_es = 0;
	let max_fs = 零_自艦隊合計制空値().艦娘;
	for (let i = 0; i < ss; i++) {
		const s = 零_使用制空値(O.eseikus[i]);
		max_es = s > max_es ? s : max_es;
	}
	if (max_es === 0) max_es = max_fs; //ルートの敵が全く制空値を持っていないときは適当に
	if (max_es * 3 <= max_fs) max_es = Math.floor(max_fs / 3);
	const pa = 0.3 * gh / max_es; //制空値を座標に直すときの倍率

	//描画
	//棒・点　→　値・線
	const lefts = [], rights = [], clefts = [], ys = [[], [], [], []], tops = [];
	for (let i = 0; i < ss; i++) { //棒・点
		const fs = [];
		fs[0] = td.制空値[i], fs[1] = td.最大制空値[i], fs[2] = td.平均制空値[i], fs[3] = td.最小制空値[i];

		//棒グラフ
		const left = i * (gw + gml + gmr) + gml;
		const right = left + gw;
		lefts.push(left);
		rights.push(right);
		let top, height;
		const as = 零_制空状況境界値を計算(零_使用制空値(O.eseikus[i]));
		let top_a = [];
		for (let j = 0; j < 5; j++) {
			//棒
			ctx.fillStyle = graph_col[j];
			top = (j == 0) ? 0 : gh - Math.floor(pa * as[["", "確保", "優勢", "拮抗", "劣勢"][j]]);
			top_a.push(top);
			height = gh - top;
			ctx.fillRect(left, top, gw, height);
		}
		tops.push(top_a);


		//折れ線グラフ用座標
		const cleft = Math.floor(left + gw / 2);
		for (let j = 0; j < 4; j++) {
			const temp = gh - Math.floor(fs[j] * pa);
			ys[j].push(temp);
		}
		clefts.push(cleft);


		//線
		if (i >= 1) {
			ctx.strokeStyle = "rgba(0,0,0,0.5)";
			ctx.lineWidth = 0.5;
			ctx.beginPath();
			for (let j = 1; j < 4; j++) {
				ctx.moveTo(clefts[i - 1], ys[j][i - 1]);
				ctx.lineTo(clefts[i], ys[j][i]);
			}
			ctx.stroke();
		}
	}

	for (let i = 0; i < ss; i++) {
		const fs = td.制空値[i];

		//折れ線グラフの点
		ctx.fillStyle = "#000";
		ctx.beginPath();
		ctx.arc(clefts[i], ys[0][i], dotSize, 0, Math.PI * 2, true);
		ctx.fill();


		/*
		//自艦隊制空値(非表示)
		const tb=ctx.measureText(String(fs));
		const tl=Math.floor(clefts[i]-tb.width/2);
		const ty=ys[i]-r;
		ctx.font=` ${fontSize}px monospace`;
		ctx.textBaseline="bottom"
		ctx.lineWidth=1;
		
		ctx.fillStyle="#ddd";
		ctx.fillText(String(fs), tl+1, ty+1);
		ctx.fillText(String(fs), tl-1, ty-1);
		ctx.fillStyle="#222";
		ctx.fillText(String(fs), tl, ty);
		*/


		//境界制空値
		for (let j = 4; j >= 1; j--) {
			ctx.font = `normal ${fontSize}px monospace`;
			ctx.textBaseline = "bottom";
			ctx.lineWidth = 1;
			ctx.setLineDash([]);

			const as = 零_制空状況境界値を計算(零_使用制空値(O.eseikus[i]));
			const es = as[["", "確保", "優勢", "拮抗", "劣勢"][j]];
			let str = 文字数合わせ(String(es), 4);
			str += " ";
			str += 符号付き数字(fs - es);

			const x = clefts[i] - Math.floor(gw / 2), y = Math.floor(tops[i][j] + fontSize / 2);
			ctx.strokeStyle = "#fff";
			ctx.strokeText(str, x, y);
			ctx.fillStyle = "#000";
			ctx.fillText(str, x, y);
		}
	}
	return canvas;
}
let 二_結果グラフ凡例を生成 = () => {
	const canvas = ce("canvas");
	if (!canvas || !canvas.getContext) return;
	const ch = 165, cw = 120;
	canvas.height = ch;
	canvas.width = cw;

	const ctx = canvas.getContext("2d");

	ctx.fillStyle = "rgba(255,255,255,0)";
	ctx.fillRect(0, 0, cw, ch);

	const th = 20;
	const fontSize = 14;
	const margin = 4;

	for (let i = 0; i < 5; i++) {
		const y = (th + margin) * i + margin;
		const x = margin;

		ctx.fillStyle = graph_col[i];
		ctx.fillRect(x, y, th, th);
		ctx.fillStyle = "#000";
		ctx.font = `${fontSize}px sans-serif`;
		ctx.textBaseline = "middle";
		ctx.fillText(["確保", "優勢", "拮抗", "劣勢", "喪失"][i], x + th + margin, y + th / 2);
	}

	ctx.fillStyle = "#000";
	ctx.beginPath()
	ctx.arc(th / 2 + margin, th * 5.5 + margin * 5, 3.5, 0, 2 * Math.PI, true);
	ctx.fill();
	ctx.fillText("自艦隊制空値", th + margin * 2, th * 5.5 + margin * 5);

	return canvas;
}

function 一_艦娘改造含み名を生成(kanmusu, kaizou) {
	if (零_艦娘データ取得(kanmusu) == undefined) {
		//		throw  new Error("不明な艦娘("+kanmusu+")");
		return kanmusu + "?";
	}
	var d = 零_艦娘データ取得(kanmusu)["データ"][kaizou];
	if (d["名前変更"]) return d["名前変更"];
	if (kaizou == "無印") return kanmusu;
	return kanmusu + kaizou;
}
function 二_結果ボディを生成(tableData, idx, ss) { //tbodyを1つ==1人分生成
	var 搭載数 = tableData.艦娘[idx].搭載数;
	var 艦娘名 = 一_表のセルデータ取得(idx, "kanmusu");
	var 改造度 = 一_表のセルデータ取得(idx, "kaizou");
	var 艦娘名p = 一_艦娘改造含み名を生成(艦娘名, 改造度);
	var rows = tableData.艦娘[idx].スロット数;
	var 航空戦に参加 = false;


	var tb = ce("tbody");
	for (var i = 0; i < rows; i++) {
		var tr = tb.appendChild(ce("tr"));
		if (i === 0) { //艦娘名
			var td = ce("td"); //艦娘名
			td.appendChild(ct(艦娘名p));
			td.rowSpan = rows;

			var div = td.appendChild(ce("div"));
			var small = div.appendChild(ce("small"));
			small.appendChild(ct(一_表のセルデータ取得(idx, "daini") === true ? "第2艦隊所属" : ""));
			tr.appendChild(td);
		}

		//装備
		var td = ce("td");
		var sb = 一_表のセルデータ取得(idx, "soubi", i);
		td.appendChild(ct(sb));
		td.classList.add(零_種類(sb));
		if (零_種類(sb) === "艦上爆撃機" && 艦戦データ[sb].対空値 >= 4) td.classList.add("対空値有");
		if (艦戦データ[sb].夜間航空機 === true) td.classList.add("夜間航空機")
		if (sb !== "-") {// 装備>熟練度, 装備>改修
			var m = td.appendChild(ce("span"));
			var jk = 一_表のセルデータ取得(idx, "jukuren", i);
			m.appendChild(ct(零_熟練度マーク(jk)));
			m.classList.add("jukuren");
			m.dataset.juk_color = ["k", "b", "b", "b", "y", "y", "y", "y"][jk];

			var m = td.appendChild(ce("span"));
			var ks = 一_表のセルデータ取得(idx, "kaishu", i);
			m.appendChild(ct(零_改修マーク(ks)));
			m.classList.add("kaishu");
		}
		tr.appendChild(td);

		//残搭載数
		for (var j = 0; j < ss + 1; j++) {
			if (j !== ss && (一_表のセルデータ取得(idx, "daini") !== true || 零_連合艦隊戦か(j) === true)) {
				航空戦に参加 = true;
			} else {
				航空戦に参加 = false;
			}
			var td = ce("td");
			td.classList.add("num");
			if (O.settings.show_noeq === true || 航空戦に参加) { //航空戦に参加しなくても表示する or 航空戦に参加する
				if (O.settings.show_noeq === true || sb !== "-") { //装備なしでも表示する or 装備がある
					td.appendChild(ct(数字をn桁で切り捨て(搭載数[i][j], 2)));
					td.classList.add("num");
					if (sb === "-") {
						td.classList.add("装備無し"); //非表示にするオプション用
					}
				}
			}
			tr.appendChild(td);
		}
	}
	return tb;
}
const 一_結果ボディを生成 = (ss) => {
	const 艦娘 = [];
	const tableData = {};
	tableData.ボーキ消費量 = 0;
	tableData.制空値 = [];
	tableData.最大制空値 = [];
	tableData.平均制空値 = [];
	tableData.最小制空値 = [];
	tableData.制空状況 = [];
	tableData.最大制空状況 = [];
	tableData.平均制空状況 = [];
	tableData.最小制空状況 = [];


	let cnt = 0;
	let rows, 艦娘名, 改造度;

	for (let i = 0; i < O.table.length; i++) {
		if (O.table[i].data.kanmusu === "") continue;
		if (O.table[i].data.kanmusu === "基地航空隊") continue;
		if (一_表のセルデータ取得(i, "hidden") === true) continue;

		艦娘[i] = {};
		艦娘名 = 一_表のセルデータ取得(i, "kanmusu");
		改造度 = 一_表のセルデータ取得(i, "kaizou");
		艦娘[i].スロット数 = 零_艦娘スロット数(艦娘名, 改造度);
		艦娘[i].搭載数 = [];
		艦娘[i].最大搭載数 = [];
		艦娘[i].平均搭載数 = [];
		艦娘[i].最小搭載数 = [];
		艦娘[i].航空戦に参加 = [];
		for (let di = 0; di < 艦娘[i].スロット数; di++) {
			艦娘[i].搭載数[di] = [];
			艦娘[i].最大搭載数[di] = [];
			艦娘[i].平均搭載数[di] = [];
			艦娘[i].最小搭載数[di] = [];
		}
	}

	for (let j = 0; j < ss + 1; j++) {	//j: 戦闘数側（横）　ssが戦闘数　戦闘終了後に1マス分なのでss+1
		tableData.制空値[j] = tableData.最大制空値[j] = tableData.平均制空値[j] = tableData.最小制空値[j] = 0;
		const 撃墜モード = (O.settings.calc_ave === true) ? "平均" : "最大";
		for (let i = 0; i < O.table.length; i++) { //艦娘を並べる　縦方向
			if (O.table[i].data.kanmusu === "") continue;
			if (O.table[i].data.kanmusu === "基地航空隊") continue;
			if (一_表のセルデータ取得(i, "hidden") === true) continue;

			if (j !== ss && (一_表のセルデータ取得(i, "daini") !== true || 零_連合艦隊戦か(j) === true)) {
				艦娘[i].航空戦に参加[j] = true;
			} else {
				艦娘[i].航空戦に参加[j] = false;
			}

			//基地航空隊以外の艦娘が存在する場合
			for (let di = 0; di < 艦娘[i].スロット数; di++) {
				if (j == 0) { //横方向0番目==1戦目
					const t = 一_表のセルデータ取得(i, "tousai", di);
					艦娘[i].搭載数[di][j] = 艦娘[i].最大搭載数[di][j] = 艦娘[i].平均搭載数[di][j] = 艦娘[i].最小搭載数[di][j] = t;
					if (艦娘[i].航空戦に参加[j]) {
						const 制空値 = 一_表のセルデータ取得(i, "seiku", di);
						tableData.制空値[j] += 制空値;
						tableData.最大制空値[j] += 制空値;
						tableData.平均制空値[j] += 制空値;
						tableData.最小制空値[j] += 制空値;
					}
				} else { //1番目以降
					let 喪失数 = 零_喪失数計算(艦娘[i].搭載数[di][j - 1], tableData.制空状況[j - 1], 撃墜モード); //前回の搭載数と制空状況から喪失数を計算
					const 最大喪失数 = 零_喪失数計算(艦娘[i].最大搭載数[di][j - 1], tableData.最大制空状況[j - 1], "最小"); //搭載数・制空値が最大のときの最小喪失数=最良の場合
					const 平均喪失数 = 零_喪失数計算(艦娘[i].平均搭載数[di][j - 1], tableData.平均制空状況[j - 1], "平均");
					const 最小喪失数 = 零_喪失数計算(艦娘[i].最小搭載数[di][j - 1], tableData.最小制空状況[j - 1], "最大");//搭載数・制空値が最小のときの最大喪失数=最悪の場合

					if (艦娘[i].航空戦に参加[j - 1] === false) 喪失数 = 0;
					if (一_表のセルデータ取得(i, "soubi", di) !== "-") {
						tableData.ボーキ消費量 += 喪失数 * 5;
					}
					艦娘[i].搭載数[di][j] = 艦娘[i].搭載数[di][j - 1] - 喪失数;
					艦娘[i].最大搭載数[di][j] = 艦娘[i].最大搭載数[di][j - 1] - 最大喪失数;
					艦娘[i].平均搭載数[di][j] = 艦娘[i].平均搭載数[di][j - 1] - 平均喪失数;
					艦娘[i].最小搭載数[di][j] = 艦娘[i].最小搭載数[di][j - 1] - 最小喪失数;
					if (O.settings.calc_1 === true) { //搭載数1で計算
						if (false === 零_戦闘機か(一_表のセルデータ取得(i, "soubi", di))) {
							艦娘[i].搭載数[di][j] = 艦娘[i].最大搭載数[di][j] = 艦娘[i].平均搭載数[di][j] = 艦娘[i].最小搭載数[di][j] = 1;
						}
					}
					if (艦娘[i].航空戦に参加[j]) {
						const p = [一_表のセルデータ取得(i, "soubi", di), 一_表のセルデータ取得(i, "jukuren", di), 一_表のセルデータ取得(i, "kaishu", di), 一_表のセルデータ取得(i, "kanmusu"), 一_表のセルデータ取得(i, "kaizou")];
						tableData.制空値[j] += 零_制空値を計算(p[0], 艦娘[i].搭載数[di][j], p[1], p[2], p[3], p[4]);
						tableData.最大制空値[j] += 零_制空値を計算(p[0], 艦娘[i].最大搭載数[di][j], p[1], p[2], p[3], p[4]);
						tableData.平均制空値[j] += 零_制空値を計算(p[0], 艦娘[i].平均搭載数[di][j], p[1], p[2], p[3], p[4]);
						tableData.最小制空値[j] += 零_制空値を計算(p[0], 艦娘[i].最小搭載数[di][j], p[1], p[2], p[3], p[4]);
					}
				}
			}
		}
		let temp = 0;
		if (j < ss) {
			temp = 零_使用制空値(O.eseikus[j]);
			tableData.制空状況[j] = 零_制空判定(tableData.制空値[j], temp);
			tableData.最大制空状況[j] = 零_制空判定(tableData.最大制空値[j], temp);
			tableData.平均制空状況[j] = 零_制空判定(tableData.平均制空値[j], temp);
			tableData.最小制空状況[j] = 零_制空判定(tableData.最小制空値[j], temp);
		}
	}
	tableData.艦娘 = 艦娘;
	return tableData;
}
const 一_敵制空テーブルを生成 = () => {
	const r = 零_ルート上の戦闘マスを列挙();
	const k = O.kouku;
	const ss = r.length;
	const list = new Array(ss);
	let apl = false;
	for (let i = 0; i < ss; i++) {
		list[i] = [];
		for (let j = 0; j < k.length; j++) {
			if (r[i] === k[j]) list[i].push(j); //i戦目にj番目の航空隊が来る
		}

		if (O.eseikus[i] === undefined) O.eseikus[i] = {};
		if (i === ss - 1) { //目的地
			O.eseikus[i].制空値 = O.eseiku;
			O.eseikus[i].敵編成 = deepcopy(O.etable);
		} else { //道中
			O.eseikus[i].制空値 = 零_敵最大制空値(r[i]);
			O.eseikus[i].敵編成 = 零_敵最大制空値編成(r[i]);
		}
		if (O.kouku_set && O.kouku_calc && O.kouku_recalc && list[i].length > 0) {
			apl = true;
			const o = 一_航空隊シミュ(list[i], O.eseikus[i].敵編成);
			O.eseikus[i].上位制空値 = o.top;
			O.eseikus[i].制空値分布 = o.count;
			O.eseikus[i].確率分布 = o.dist;
			O.eseikus[i].累積確率 = o.cumu;
			O.eseikus[i].ボーダー制空値 = o.set;
			O.eseikus[i].制空状況 = o.status;
			O.eseikus[i].航空隊用制空値 = o.apl;
		}
	}
	if (apl) {
		O.kouku_recalc = false;
		if (O.kouku_show_detail >= 0) {
			if (O.eseikus[O.kouku_show_detail].制空状況 === undefined) {
				隠す("航空隊詳細親");
			} else {
				二_航空隊詳細を表示(null, O.kouku_show_detail, true);
			}
		}
	}
}



function 二_結果フッタを生成(tableData, ss) {
	var 制空状況 = tableData.制空状況;
	var 制空値 = tableData.制空値;
	var ps = 零_ルート上の戦闘マスを列挙();


	var tf = ce("tfoot");

	var tr = ce("tr");
	var td = tr.appendChild(ce("td"));
	td.appendChild(ct("制空争い結果→"));
	td.colSpan = 2;
	td.className = "左見出し";

	var tr2 = ce("tr");
	var td2 = tr2.appendChild(ce("td"));
	td2.appendChild(ct("自艦隊制空値→"));
	td2.colSpan = 2;
	td2.className = "左見出し";

	var tr3 = ce("tr");
	var td3 = tr3.appendChild(ce("td"));
	td3.appendChild(ct("敵艦隊制空値→"));
	td3.colSpan = 2;
	td3.className = "左見出し";

	const tr4 = ce("tr");
	const td4 = tr4.appendChild(ce("td"));
	td4.appendChild(ct("航空隊詳細→"));
	td4.colSpan = 2;
	td4.className = "左見出し";
	let show_kouku = false;
	for (let i of ps) {
		if (O.kouku.includes(i)) {
			show_kouku = true;
			break;
		}
	}

	if (O.settings.show_border === true) { //劣勢・拮抗・優勢・確保の表示がON
		var tr_b1 = ce("tr");
		var td_b1 = tr_b1.appendChild(ce("td"));
		td_b1.appendChild(ct("劣勢→"));
		td_b1.colSpan = 2;
		td_b1.className = "左見出し";

		var tr_b2 = ce("tr");
		var td_b2 = tr_b2.appendChild(ce("td"));
		td_b2.appendChild(ct("拮抗→"));
		td_b2.colSpan = 2;
		td_b2.className = "左見出し";

		var tr_b3 = ce("tr");
		var td_b3 = tr_b3.appendChild(ce("td"));
		td_b3.appendChild(ct("優勢→"));
		td_b3.colSpan = 2;
		td_b3.className = "左見出し";

		var tr_b4 = ce("tr");
		var td_b4 = tr_b4.appendChild(ce("td"));
		td_b4.appendChild(ct("確保→"));
		td_b4.colSpan = 2;
		td_b4.className = "左見出し";
	}

	for (var i = 0; i < ss + 1; i++) {
		//自艦隊制空値 ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- 
		var td2 = tr2.appendChild(ce("td"));
		td2.appendChild(ct(制空値[i]));
		td2.classList.add("num");

		//敵艦隊制空値 ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- 
		var td3 = tr3.appendChild(ce("td"));
		td3.classList.add("num")
		td3.classList.add("clickable", "ポップアップ起動ボタン", "num");
		td3.addEventListener("click", (function (ev, i) { return function (ev) { 二_敵制空値変更を表示(ev, i); } })(0, i));

		if (i <= ss - 1) { //道中・目的地
			td3.appendChild(二_航空隊後敵制空値を生成(O.eseikus[i]));
		} else { //帰投時
			td3.appendChild(ct("-"));
			td3.classList.remove("clickable");
		}

		//航空隊詳細
		const td42 = tr4.appendChild(ce("td"));
		if (show_kouku && O.kouku.includes(ps[i])) {
			const btn = td42.appendChild(ce("div"));
			btn.classList.add("選択ボタン", "single");
			btn.appendChild(ct("見る"));
			btn.addEventListener("click", ((i) => {
				return (e) => {
					二_航空隊詳細を表示(e, i, false);
					O.kouku_show_detail = i;
				}
			})(i), false);
		}

		if (O.settings.show_border === true) {
			var td_b1 = tr_b1.appendChild(ce("td")); td_b1.classList.add("num");
			var td_b2 = tr_b2.appendChild(ce("td")); td_b2.classList.add("num");
			var td_b3 = tr_b3.appendChild(ce("td")); td_b3.classList.add("num");
			var td_b4 = tr_b4.appendChild(ce("td")); td_b4.classList.add("num");
			if (i !== ss) {
				var o = 零_制空状況境界値を計算(零_使用制空値(O.eseikus[i]));
				td_b1.appendChild(零_敵制空値と差分(制空値[i], o.劣勢)); if (制空状況[i] == "劣勢") td_b1.classList.add("現在の制空状況");
				td_b2.appendChild(零_敵制空値と差分(制空値[i], o.拮抗)); if (制空状況[i] == "拮抗") td_b2.classList.add("現在の制空状況");
				td_b3.appendChild(零_敵制空値と差分(制空値[i], o.優勢)); if (制空状況[i] == "優勢") td_b3.classList.add("現在の制空状況");
				td_b4.appendChild(零_敵制空値と差分(制空値[i], o.確保)); if (制空状況[i] == "確保") td_b4.classList.add("現在の制空状況");
			} else {
				td_b1.appendChild(ct("-"));
				td_b2.appendChild(ct("-"));
				td_b3.appendChild(ct("-"));
				td_b4.appendChild(ct("-"));
			}
		}
		if (i == ss) break;



		//制空争い結果 ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- 
		var td = tr.appendChild(ce("td"));
		td.appendChild(ct(制空状況[i]));
		if (i === ss - 1 && 零_航空戦があるか(O.hou, O.kai, 目的マス文字())) {
			td.classList.add("目的地結果");
		}
	}

	//ボーキ消費量(in 制空争い結果右端)
	var td = tr.appendChild(ce("td"));
	//	td.appendChild(ct("("+ss+"戦目開始時制空値:"+tableData.制空値[ss-1]+")"))
	//	td.appendChild(ce("br"));
	td.appendChild(ct(`ボーキ消費:${数字をn桁で切り捨て(tableData.ボーキ消費量, 2)}`))



	const tr_g = ce("tr");
	//グラフ(eseikus設定後でないと動かない)
	if (O.settings.show_border_graph === true) {
		const td_g = tr_g.appendChild(ce("td"));
		td_g.colSpan = 2;
		td_g.appendChild(ct("")); //左の空欄　何か書きたい

		const td_g2 = tr_g.appendChild(ce("td"));
		td_g2.colSpan = ss;
		td_g2.appendChild(二_結果グラフを生成());

		const td_g3 = tr_g.appendChild(ce("td")); //凡例
		td_g3.appendChild(二_結果グラフ凡例を生成());
	}


	tf.appendChild(tr2); //自艦隊制空値

	if (O.settings.show_border_graph === true) {
		tf.appendChild(tr_g); //グラフ
	}

	if (O.settings.show_border === true) {
		tf.appendChild(tr_b4);
		tf.appendChild(tr_b3);
		tf.appendChild(tr_b2);
		tf.appendChild(tr_b1);
	}

	tf.appendChild(tr3); //敵艦隊制空値
	if (show_kouku) tf.appendChild(tr4); //航空隊詳細
	tf.appendChild(tr);  //制空争い結果

	return tf;
}
function 零_敵制空値と差分(自艦隊制空値, 敵艦隊制空値) {
	var span = ce("span");
	span.appendChild(ct(敵艦隊制空値 + " "));

	var small = span.appendChild(ce("small"));
	small.appendChild(ct(符号付き数字(自艦隊制空値 - 敵艦隊制空値)));
	return span;
}
function 二_敵制空値変更を表示(e, i) {
	隠す("敵制空値変更");
	var el = 二_敵制空値変更を生成(i);
	el.style.left = getMousePos(e).x + 10 + "px";
	el.style.top = getMousePos(e).y + "px"
	document.body.appendChild(el);
}
function 二_敵制空値変更を生成(i) {
	var s = 零_使用制空値(O.eseikus[i]);
	var el = ce("div");
	el.classList.add("選択ポップアップ");
	el.id = "敵制空値変更";

	var fo = el.appendChild(ce("form"));
	fo.addEventListener("submit", function (e) {
		e.preventDefault();
		O.eseikus[i].ユーザ設定値 = Math.max(0, parseInt($("敵制空値変更_input").value));
		if (O.eseikus[i].制空値 === O.eseikus[i].ユーザ設定値) O.eseikus[i].ユーザ設定値 = undefined;

		非表示("敵制空値変更");
		二_結果テーブルを表示();
	})

	fo.appendChild(ct("敵制空値を"));
	fo.appendChild((function (s) {
		var el = ce("input");
		el.type = "number";
		el.value = s;
		el.min = 0;
		el.id = "敵制空値変更_input";
		return el;
	})(s));
	fo.appendChild((function () {
		var el = ce("input");
		el.type = "submit";
		el.value = "に変更";
		return el;
	})());
	return el;
}
const 二_航空隊詳細を表示 = (e, i, reflesh) => {
	let el, el2;
	if (reflesh === false || document.getElementById("航空隊詳細親") === null) {
		隠す("航空隊詳細親");
		const ps = 零_ルート上の戦闘マスを列挙();
		const title = `${ps[i]}マス航空隊詳細 敵:${零_敵艦隊一行()}`;
		el = document.body.appendChild(二_可動ポップアップを生成(title, () => { O.kouku_show_detail = undefined; }));
		el.id = "航空隊詳細親";
		el.classList.add("loong");
		x = getMousePos(e).x;
		y = getMousePos(e).y;
		el.style.left = x + 45 + "px";
		el.style.top = y - 310 + "px";
		el2 = el.childNodes[2];
		el2.id = "航空隊詳細";
		el2.appendChild(二_航空隊詳細の中身を生成(i, reflesh));
	} else {
		el = $("航空隊詳細親");
		el2 = el.childNodes[2];
		二_航空隊詳細の中身を生成(i, reflesh);
	}
}

const 二_航空隊詳細の中身を生成 = (i, reflesh) => {
	let ds = [["確保", "優勢", "拮抗", "劣勢", "喪失"]];
	const s = O.eseikus[i].制空状況;
	for (let i = 0; i < s.length; i++) {
		const ary = [];
		for (let [k, v] of s[i]) {
			ary.push(v);
		}
		ds.push(ary);
	}

	const d1 = ["x"];
	const d2 = ["確率分布"];
	const d3 = ["累積確率"];
	for (let [k, v] of O.eseikus[i].確率分布) {
		d1.push(k);
		d2.push(数字をn桁で切り捨て(v, 4));
		d3.push(数字をn桁で切り捨て(O.eseikus[i].累積確率.get(k), 4));
	}

	if (reflesh) {
		C.c1.load({
			rows: ds,
		});
		C.c2.load({
			columns: [d1, d2, d3],
		});
	} else {
		const div = ce("div");
		const elinfo = div.appendChild(ce("div"));
		elinfo.classList.add("航空隊関連情報");
		elinfo.appendChild(二_航空隊関連情報を生成(i));
		const el3 = div.appendChild(ce("div"));
		div.appendChild(ce("hr"));
		const el4 = div.appendChild(ce("div"));
		C.c1 = c3.generate({
			bindto: el3,
			data: {
				rows: ds,
				type: "bar",
				groups: [["確保", "優勢", "拮抗", "劣勢", "喪失"]],
				colors: { "確保": graph_col[0], "優勢": graph_col[1], "拮抗": graph_col[2], "劣勢": graph_col[3], "喪失": graph_col[4] },
			},
			size: { width: 390, height: 130 },
			axis: {
				y: { tick: { format: function (a) { return 数字をn桁で切り捨て(a * 100, 2) + "%" } }, show: false },
				x: { tick: { format: function (a) { return a + 1 + "波目" } } }
			},
		});

		C.c2 = c3.generate({
			bindto: el4,
			size: { width: 390, height: 290 },
			data: {
				x: "x",
				columns: [d1, d2, d3],
				axes: {
					"累積確率": "y2",
					"確率分布": "y",
				},
				hide: ["確率分布"],
			},
			axis: {
				y2: { show: true, tick: { format: function (a) { return 数字をn桁で切り捨て(a * 100, 1) + "%" } } },
				y: { tick: { format: function (a) { return 数字をn桁で切り捨て(a * 100, 2) + "%" } } },
				x: { label: "制空値" },
			},
			tooltip: { format: { title: function (a) { return `制空値:${a}` } } },
			grid: {
				y: {
					lines: [
						{ value: 0.9, text: "90%", axis: "y2", position: "start" },
						{ value: 0.95, text: "95%", axis: "y2", position: "start" },
						{ value: 0.5, text: "50%", axis: "y2" },
					]
				}
			},
			point: { show: false },
		});
		return div;
	}
}
const 二_航空隊関連情報を生成 = (i) => {
	const div = ce("div");
	const el1 = div.appendChild(ce("div"));
	const o = 零_制空状況境界値を計算(O.eseikus[i].航空隊用制空値);
	const str = `1波目必要制空値:劣勢${o.劣勢} 拮抗${o.拮抗} 優勢${o.優勢} 確保${o.確保}`;
	el1.appendChild(ct(str));

	//	const el2 = div.appendChild(ce("div"));
	//	el2.appendChild(ct("敵：" + 零_敵艦隊一行()));

	return div;
}





function 二_ローカルストレージデータをリセットする() {
	if (confirm("データを初期化しても良いですか？")) {
		localStorage.removeItem('seikuData');
		localStorage.removeItem("toggleData");
		location.reload();
	}
}
function 零_ローカルストレージ保存(a, type) {
	if (type === "O") {
		localStorage.seikuData = JSON.stringify(a);
	} else if (type === "K") {
		localStorage.kantaiData = JSON.stringify(a);
	} else if (type === "tgl") {
		localStorage.toggleData = JSON.stringify(a)
	}
}

function 二_エラー処理(e) {
	window.scrollTo(0, 0);
	$("エラー").className = "";
	$("エラー文").textContent = String(e + "\n@" + e.lineNumber);
	//	throw  new Error(e);
	console.log("error:", e);
	console.log("stack:", e.stack);
}
function 二_結果一行を表示() {
	var el = $("結果一行親").appendChild(ce("p"));
	var route = O.route.join("");
	el.id = "結果一行";

	//	var str=`マップ：${零_マップ文字簡略化(O.hou)} ${O.kai}　ルート：${route}`;
	var str = `マップ：${零_マップ略称(O.hou, O.kai)}　ルート：${route}`;
	if (零_航空戦があるか(O.hou, O.kai, 目的マス文字())) {
		str += `　${目的マス文字()}マス敵編成：${零_敵艦隊一行()}`;
	}
	el.appendChild(ct(str));
}

const 一_航空隊シミュ = (航空隊番号, 敵艦隊) => {
	const シミュ回数 = Number(O.settings.num_simulate);
	console.time(`航空隊シミュ(${シミュ回数}回)`)
	const 確率ボーダー = [0.5, 0.9, 0.95, 0.99];
	const 設定確率ボーダー = 数字をn桁で切り捨て(Number(O.settings.cumulative_threshold) / 100, 2);
	const 波数 = 航空隊番号.length;
	const 航空隊制空値 = 航空隊番号.map(a => 零_航空隊制空値(a));

	let s = [];
	let ss = [];
	for (let i = 0; i < 波数; i++) ss[i] = new Map([["確保", 0], ["優勢", 0], ["拮抗", 0], ["劣勢", 0], ["喪失", 0]]);
	let 敵装備 = [];
	let 初回敵搭載数 = [];
	for (let i of 敵艦隊) {
		初回敵搭載数.push(零_敵搭載数(i));
		敵装備.push(零_敵装備(i));
	}
	const 初回敵制空値 = 零_搭載数制空値(初回敵搭載数, 敵装備, true);
	const 初回制空状況 = 零_制空判定(航空隊制空値[0], 初回敵制空値);
	let 制空状況固定フラグ = new Array(波数);
	let 最悪制空状況, 最小制空値, 最良制空状況 = new Array(波数);

	for (let N = 0; N < シミュ回数; N++) {
		let 敵搭載数 = deepcopy(初回敵搭載数);
		let 最小搭載数 = deepcopy(敵搭載数);
		let 制空状況;
		for (let i = 0; i < 波数; i++) {
			//-----前回の機数から制空値を計算して制空状況を求める----
			if (i === 0) {
				制空状況 = 初回制空状況;
			} else if (制空状況固定フラグ[i] !== undefined) { //2波目以降　それまでのぶつけ方によって制空状況が変わらない場合
				制空状況 = 制空状況固定フラグ[i];
			} else { //2波目以降・ぶつけ方によって制空状況が変わる場合
				const 敵制空値 = 零_搭載数制空値(敵搭載数, 敵装備, true);
				制空状況 = 零_制空判定(航空隊制空値[i], 敵制空値);
			}

			//-----上で制空状況を得たので敵機を減らす-----
			for (let j = 0; j < 敵搭載数.length; j++) {
				for (let k = 0; k < 敵搭載数[j].length; k++) {
					const t = 敵搭載数[j][k]
					敵搭載数[j][k] = t - 零_敵喪失数計算(t, 制空状況, "乱数");
				}
			}

			//-----i波目の制空状況が固定かどうか調べる-----
			if (N === 0 && i < 波数) {
				最小制空値 = 零_搭載数制空値(最小搭載数, 敵装備, true);
				最悪制空状況 = 零_制空判定(航空隊制空値[i], 初回敵制空値);
				最良制空状況[i] = 零_制空判定(航空隊制空値[i], 最小制空値);
				if (最良制空状況[i] === 最悪制空状況) {
					制空状況固定フラグ[i] = 最悪制空状況;
				}
				for (let j = 0; j < 敵搭載数.length; j++) {
					for (let k = 0; k < 敵搭載数[j].length; k++) {
						const t = 最小搭載数[j][k]
						最小搭載数[j][k] = t - 零_敵喪失数計算(t, 最良制空状況[i], "最大");
					}
				}
			}
			ss[i].set(制空状況, ss[i].get(制空状況) + 1);
		}
		const 全波終了後敵制空値 = 零_搭載数制空値(敵搭載数, 敵装備, false);
		s.push(全波終了後敵制空値);
	}

	let max = 0;
	let min = Infinity;
	for (let i = 0; i < s.length; i++) {
		max = Math.max(max, s[i]);
		min = Math.min(min, s[i]);
	}
	const 発生回数 = new Map();
	const 確率分布 = new Map();
	const 累積確率 = new Map();
	let 累積 = 0;
	let 上位制空値 = {};
	let ボーダー制空値;
	for (let i = min; i <= max; i++) 発生回数.set(i, 0);
	for (let i of s) 発生回数.set(i, 発生回数.get(i) + 1);
	for (let [k, v] of 発生回数) 確率分布.set(k, 数字をn桁で切り捨て(v / シミュ回数, 4));
	for (let [k, v] of 確率分布) {
		累積 += v;
		if (累積 >= 設定確率ボーダー && ボーダー制空値 === undefined) ボーダー制空値 = k;
		for (let i of 確率ボーダー) {
			if (累積 >= i && 上位制空値[i] === undefined) {
				上位制空値[i] = k;
			}
		}
		累積確率.set(k, 数字をn桁で切り捨て(累積, 4));
	}
	for (let i of ss) {
		for (let [k, v] of i) {
			i.set(k, v / シミュ回数);
		}
	}
	console.timeEnd(`航空隊シミュ(${シミュ回数}回)`)
	return {
		max: max,
		min: min,
		set: ボーダー制空値,
		top: 上位制空値,
		n: シミュ回数,
		dist: 確率分布,
		cumu: 累積確率,
		count: 発生回数,
		status: ss,
		apl: 初回敵制空値,
		test1: 航空隊制空値,
	};
}

const 零_使用制空値 = (o) => {
	if (o.ユーザ設定値) return o.ユーザ設定値;
	if (O.kouku_set && o.ボーダー制空値) return o.ボーダー制空値;
	return o.制空値;
}
const 零_航空隊制空値 = (番号) => {
	const 番目 = Math.floor(番号 / 2);
	let cnt = 0;
	for (let i of O.table) {
		const d = i.data;
		if (d.hidden) continue;
		if (d.kanmusu !== "基地航空隊") continue;
		if (d.kaizou !== "出撃") continue;
		if (cnt === 番目) return d.shoukei;
		cnt++;
	}
}
const 零_敵艦隊一行 = () => {
	const a = O.etable.map(a => 零_i2n(a, "深海棲艦")).filter(a => a !== "-"); //名前が"-"でないものだけ抽出
	if (a.length > 0) return a.reduce((a, b) => { return a + "," + b });
	return "未設定";
}
function 零_マップ文字簡略化(a) {
	return a.replace(/【.*】/g, "");
}
function 零_マップ略称(hou, kai) {
	var str = "";
	var d = 雑データ.海域略称;
	var dai1ki = false;
	if (hou.indexOf("(旧)") >= 0) {
		dai1ki = true;
		hou = hou.replace("(旧)", "")
	}
	if (d[hou] && d[hou][kai]) {
		str += d[hou][kai];
		if (dai1ki) str += "(第一期)";
	} else {
		str = `${零_マップ文字簡略化(O.hou)} ${O.kai}`
	}
	return str;
}

function 一_結果搭載マトリックスを変更(idx, di, x, data) {
	if (O.tmat[idx][di] === undefined) O.tmat[idx][di] = [];
	O.tmat[idx][di][x] = data;
}
function 一_結果制空マトリックスを取得(idx, di, x) {
	var t = 一_結果搭載マトリックスを取得(idx, di, x);
	var s = 一_表のセルデータ取得(idx, "soubi", di);
	var j = 一_表のセルデータ取得(idx, "jukuren", di);
	var k = 一_表のセルデータ取得(idx, "kaishu", di);
	var km = 一_表のセルデータ取得(idx, "kanmusu");
	var ka = 一_表のセルデータ取得(idx, "kaizou");
	return 零_制空値を計算(s, t, j, k, km, ka);
}
function 一_結果搭載マトリックスを取得(idx, di, x) {
	return O.tmat[idx][di][x];
}
function 一_戦闘数を取得() {
	return 零_ルート上の戦闘マスを列挙().length;
}
const 二_航空隊後敵制空値を生成 = (o) => {
	const el = ce("ul");
	el.classList.add("航空隊後敵制空値")
	if (o.ユーザ設定値 !== undefined) {
		const li = el.appendChild(ce("li"));
		li.appendChild(ct(`${o.ユーザ設定値}(設定値)`));
		li.classList.add("採用制空値");
	} else {
		if (O.kouku_set && o.ボーダー制空値) {
			const li = el.appendChild(ce("li"));
			li.appendChild(ct(`${o.ボーダー制空値}(${O.settings.cumulative_threshold}%)`));
			li.classList.add("採用制空値");
		}
	}


	if (O.kouku_set && o.上位制空値) {
		for (let i in o.上位制空値) {
			if (i * 100 === parseInt(O.settings.cumulative_threshold)) continue;
			const li = el.appendChild(ce("li"));
			li.appendChild(ct(`${o.上位制空値[i]}(${i * 100}%)`));
			li.classList.add("非採用制空値");
		}
		const li = el.appendChild(ce("li"));
		li.appendChild(ct(`${o.制空値}(元)`));
		li.classList.add("非採用制空値");
	} else {
		let str = "";
		if (o.ユーザ設定値 !== undefined) str = "(元)";
		const li = el.appendChild(ce("li"));
		li.appendChild(ct(o.制空値 + str));
		li.classList.add("採用制空値");
	}
	return el;
}


function 二_マップフィルタ設定() {
	var els = document.getElementsByClassName("マップフィルタ選択");
	for (var i = 0; i < els.length; i++) {
		els[i].addEventListener("change", 二_マップフィルタ適用);
	}
	二_マップフィルタ適用();
}
function 二_マップフィルタチェックボックス() {
	var els = document.getElementsByClassName("マップフィルタ選択");
	var filter = O.filter;
	for (var i = 0; i < els.length; i++) {
		var flg = false;
		for (var j in filter) {
			for (var k = 0; k < filter[j].length; k++) {
				if (els[i].dataset.filter == filter[j][k]) flg = true;
			}
		}

		if (flg) {
			els[i].checked = true;
		} else {
			els[i].checked = false;
		}
	}
}
function 二_マップフィルタ適用() {
	var filter = {};
	var group = [];
	var show_flg = {};
	var hide = false;
	var isAllHide = true;
	var els = document.getElementsByClassName("マップフィルタ選択");
	var kai = $("広域海域リスト").getElementsByTagName("li");

	for (var i = 0; i < els.length; i++) {
		var g = els[i].dataset.group;
		if (eq(g, group)) continue;
		group.push(g);
		filter[g] = [];
	}
	for (var i = 0; i < els.length; i++) {
		if (els[i].checked) {
			var g = els[i].dataset.group;
			filter[g].push(els[i].dataset.filter);
		}
	}

	for (var i = 0; i < kai.length; i++) {
		for (var j = 0; j < group.length; j++) {
			show_flg[group[j]] = false;
		}

		var e = kai[i];
		for (var j = 0; j < group.length; j++) {
			var g = group[j];
			for (var k = 0; k < filter[g].length; k++) {
				if (e.classList.contains(filter[g][k])) show_flg[g] = true;
			}
		}
		hide = false;
		for (var j in show_flg) {
			if (show_flg[j] == false) hide = true;
		}



		if (hide) {
			e.classList.add("hide");
		} else {
			e.classList.remove("hide");
			isAllHide = false;
		}
	}
	if (isAllHide) {
		$("方面選択").classList.add("該当海域なし");
	} else {
		$("方面選択").classList.remove("該当海域なし");
	}
	O.filter = filter;
	零_ローカルストレージ保存(O, "O")
}
const 零_ルート上の戦闘マスを列挙 = () => {
	const r = O.route;
	const n = [];
	const md = mapData[マス配置データ対応表[O.hou][O.kai]];
	for (let i of r) {
		if (零_航空戦があるか(O.hou, O.kai, i)) {
			n.push(i);
		}
		if (md[i].type == "航空戦") { //相互に殴る航空戦はstage1が2回なのでもう1回pushする
			n.push(i);
		}
	}
	return n;
}
function 目的マス文字() {
	return O.route[O.route.length - 1];
}
function 零_航空戦があるか(hou, kai, mas) {
	var t = mapData[マス配置データ対応表[hou][kai]][mas].type;
	var ary = ["戦闘", "ボス", "航空戦", "空襲戦", "夜to昼", "ボス_夜to昼", "基地"];//航空戦があるリスト
	return eq(t, ary)
}
function 零_基地空襲があるか(hou, kai) {
	if (hou && kai &&
		マス配置データ対応表[hou][kai] &&
		mapData[マス配置データ対応表[hou][kai]]["基"] &&
		海域データ[O.hou].データ[O.kai]["基"] &&
		海域データ[O.hou].データ[O.kai]["基"].length > 0
	) {
		return true;
	} else {
		return false;
	}
}
const 零_敵最大制空値 = (p) => {
	const m = 海域データ[O.hou]["データ"][O.kai][p];
	if (m === undefined) return 0;
	let s = 0;
	for (let i = 0; i < m.length; i++) {
		s = Math.max(s, 零_敵合計制空値(m[i], false));
	}
	return s;
}
const 零_敵最大制空値編成 = (p) => {
	const m = 海域データ[O.hou]["データ"][O.kai][p];
	let s = 0, n = 0;
	if (m === undefined) return [];
	for (let i = 0; i < m.length; i++) {
		if (s < 零_敵合計制空値(m[i], false)) {
			n = i;
		}
	}
	return m[n];
}

function 零_戦闘機か(装備) {
	return eq(零_種類(装備), ["艦上戦闘機", "水上戦闘機", "局地戦闘機", "陸軍戦闘機"]);
}
function 零_連合艦隊戦か(j) {
	var md = mapData[マス配置データ対応表[O.hou][O.kai]];
	var point = 零_ルート上の戦闘マスを列挙()[j];
	if (md[point].union === true) return true;
	return false;
}
function 零_第2艦隊所属艦数() {
	var cnt = 0;
	for (var i = 0; i < O.table.length; i++) {
		if (O.table[i].data.daini === true) cnt++;
	}
	return cnt;
}
const 零_装備できるか = (艦種, 艦名, 改造, 種類, 装備名) => {
	if (種類 === "装備なし") return true;
	if (艦種 === "") return true;
	if (艦種 === "基地航空隊") return true;

	switch (種類) {
		case "艦上戦闘機":
			if (eq(艦種, ["正規空母", "軽空母", "装甲空母"])) return true;
			if (艦名 === "伊勢" && 改造 === "改二") return true;
			if (艦名 === "日向" && 改造 === "改二") return true;
			if (艦名 === "あきつ丸") return true;
			if (艦名 === "山汐丸" && 改造 === "改") return true;
			break;
		case "艦上爆撃機":
			if (eq(艦種, ["正規空母", "軽空母", "装甲空母"])) return true;
			if (艦名 === "伊勢" && 改造 === "改二") return true;
			if (艦名 === "日向" && 改造 === "改二") return true;
			if (艦名 === "山汐丸" && 改造 === "改") return true;
			break;
		case "艦上攻撃機":
			if (艦名 === "春日丸" && 改造 === "無印") return false;
			if (艦名 === "鳳翔" && 改造 === "改二戦") return false;
			if (eq(艦種, ["正規空母", "軽空母", "装甲空母"])) return true;
			if (艦名 === "速吸" && 改造 === "改") return true;
			break;
		case "水上爆撃機":
			if (艦名 === "山汐丸" && 改造 === "改") return false;
			if (eq(艦種, ["水上機母艦", "航空巡洋艦", "航空戦艦", "補給艦", "潜水空母", "軽巡洋艦", "重巡洋艦"])) return true;
			if (eq(艦名, ["Littorio", "Roma", "金剛", "Conte di Cavour"])) return true;
			if (艦名 === "Richelieu" && 装備名 === "Laté 298B") return true;
			if (艦名 === "迅鯨" && 改造 === "改") return true;
			if (艦名 === "長鯨" && 改造 === "改") return true;
			if (艦名 === "大和" && 改造 === "改二") return true;
			break;
		case "水上戦闘機":
			if (艦名 === "山汐丸" && 改造 === "改") return false;
			if (eq(艦種, ["水上機母艦", "航空巡洋艦", "航空戦艦", "潜水空母", "潜水母艦", "補給艦"])) return true;
			if (艦種 === "戦艦" && 艦名 !== "金剛" && 艦名 !== "Richelieu") return true;
			if (艦種 === "重巡洋艦") return true;
			if (eq(艦名, ["由良", "多摩", "球磨"])) return true;
			if (艦名 === "矢矧" && 改造 === "改二乙") return true;
			if (艦名 === "神州丸") return true;
			break;
		case "噴式戦闘爆撃機":
			if (艦名 === "翔鶴" && 改造 === "改二甲") return true;
			if (艦名 === "瑞鶴" && 改造 === "改二甲") return true;
			if (艦名 === "加賀" && 改造 === "改二護") return true;
			if (艦名 === "Victorious" && 改造 === "改") return true;
			break;
	}
	return false;
}
const 零_装備できるものがあるか = (艦種, 艦名, 改造, 種類) => {
	for (i in 艦戦データ) {
		if (艦戦データ[i].種類 !== 種類) continue;
		if (零_装備できるか(艦種, 艦名, 改造, 種類, i)) return true;
	}
	return false;
}
const 零_ロケット戦闘機か = (装備名) => {
	if (艦戦データ[装備名] && 艦戦データ[装備名].ロケット) return true;
	return false;
}
const 零_重爆込み空襲か = (敵編成) => {
	for (let i of 敵編成) {
		if (零_重爆持ちか(i)) return true;
	}

	return false;
}
const 零_重爆持ちか = (敵id) => {
	if (深海棲艦idデータ[敵id] && 深海棲艦idデータ[敵id].jubaku) return true;
	return false;
}
const 零_マップの戦闘マスを列挙 = (h, k) => {
	let ary = [];
	let o = mapData[マス配置データ対応表[h][k]];
	for (let i in o) {
		const type = o[i].type;
		if (eq(i, ["-", "=", "1", "2", "3", "基", "data"])) continue;
		if (eq(type, ["出撃", "基地", "うずしお", "気のせい", "能動分岐", "泊地修理", "夜戦", "敵レーダー射撃", "帰投地点", "資源", "航空偵察", "揚陸地点"])) continue;

		ary.push(i);
	}
	ary.sort();
	return ary;
}


function 二_編成保存テーブルを表示(tenki) {
	$("自艦隊親").style.display = "none";
	$("編成展開親").style.display = "block";
	$("外部サイトフォーム").style.display = "none";
	隠す("編成記録情報");
	O.cl = false;
	$("編成展開展記").textContent = tenki;
	if ($("編成展開テーブル").tBodies) {
		$("編成展開テーブル").removeChild($("編成展開テーブル").tBodies[0]);
	}

	var tb = $("編成展開テーブル").appendChild(ce("tbody"));
	for (var i = 0; i < K.kantai.length; i++) {
		tb.appendChild(一_編成展開行を生成(K.kantai[i], tenki, i))
	}

	if (tenki == "展開") { //autosave欄
		tb.appendChild(一_編成展開行を生成(K.autosave, tenki, "autosave"))
	} else { //新規記録欄
		tb.appendChild(一_編成展開行を生成({ name: "", hensei: [], newslot: true }, tenki, i))
	}
	零_ローカルストレージ保存(K, "K");
}
function 一_編成展開行を生成(kantai, tenki, idx) {
	var tr = ce("tr");
	var td = tr.appendChild(ce("td"));
	td.appendChild(ct(idx == "autosave" ? "-" : "#" + (idx + 1)));
	if (idx !== "autosave" && !kantai.newslot) {
		td.draggable = true;
		td.classList.add("draggable");
		td.addEventListener("dragstart", (e) => {
			e.dataTransfer.setData("text/x-from", "記録編成");
			e.dataTransfer.setData("text/x-idx", idx);
			DT = "記録編成";
		}, false);
		td.addEventListener("dragover", (e) => {
			e.preventDefault();
			e.dataTransfer.dropEffect = "move";
			if (DT !== "記録編成") {
				e.dataTransfer.dropEffect = "none";
			}
		}, false);
		td.addEventListener("drop", (e) => {
			if (e.dataTransfer.getData("text/x-from") === "記録編成") {
				const from = Number(e.dataTransfer.getData("text/x-idx"));
				const to = idx;
				二_編成を入れ替え(from, to);
				二_編成保存テーブルを表示(tenki);
			}
		}, false);
	}


	var td = tr.appendChild(ce("td"));
	var sp = td.appendChild(ce("span"));
	if (!kantai.newslot) {
		sp.className = "艦隊名";
		sp.textContent = kantai.name;
		var sp = td.appendChild(ce("span"));
		sp.className = "編成艦娘数";
		sp.textContent = kantai.hensei.length + "隻編成";
	}

	var td = tr.appendChild(ce("td"));
	for (var j = 0; j < kantai.hensei.length; j++) {
		var kanmei = 一_艦娘改造含み名を生成(kantai.hensei[j].kanmusu, kantai.hensei[j].kaizou);
		var str = kantai.hensei[j].hidden == true ? `(${kanmei}) ` : kanmei + " ";
		td.appendChild(ct(str))
	}

	var td = tr.appendChild(ce("td"));
	var sp = td.appendChild(ce("span"));
	sp.textContent = tenki;
	sp.classList.add("編成展開ボタン", "編成展開展記", "clickable", "ポップアップ起動ボタン", tenki);
	sp.addEventListener("click", (function (idx, tenki) {
		return function (e) {
			二_編成展開展記(e, idx, tenki);
		}
	})(idx, tenki))

	var td = tr.appendChild(ce("td"));
	if (!(kantai.autosave || kantai.newslot)) {
		var sp = td.appendChild(ce("span"));
		sp.textContent = "削除"
		sp.classList.add("編成展開ボタン", "編成展開削除", "clickable", "ポップアップ起動ボタン");
		sp.addEventListener("click", (function (idx, tenki) {
			return function (e) {
				//			二_編成展開削除(idx,tenki);
				二_編成展開削除を表示(e, idx, tenki);
			}
		})(idx, tenki))
	}

	return tr;
}



function 二_編成展開展記(e, idx, tenki) {
	if (tenki === "展開") {
		if (idx === "autosave") {
			var temp = deepcopy(K.autosave);
			一_編成自動保存();
			O.table = [];
			for (var i = 0; i < temp.hensei.length; i++) {
				O.table[i] = {};
				O.table[i].data = deepcopy(temp.hensei[i]);
			}
		} else {
			一_編成自動保存();
			O.table = [];
			for (var i = 0; i < K.kantai[idx].hensei.length; i++) {
				O.table[i] = {};
				O.table[i].data = deepcopy(K.kantai[idx].hensei[i]);
			}
		}
		データ移行(O);
		二_自艦隊の表を更新();
		二_編成保存テーブルを非表示();
	} else if (tenki === "記録") {
		隠す("編成記録情報");
		var el = 二_編成記録情報を生成(idx);
		el.id = "編成記録情報";
		el.classList.add("選択ポップアップ", "long");
		el.style.left = getMousePos(e).x + "px"
		el.style.top = getMousePos(e).y + "px"
		document.body.appendChild(el);
	}
}
function 二_編成記録情報を生成(idx) {
	var el = ce("div");
	var fo = el.appendChild(ce("form"));
	fo.addEventListener("submit", (function (idx) {
		return function (e) {
			e.preventDefault();
			一_編成記録(idx, $("編成記録情報_input").value);
			二_編成保存テーブルを表示("記録");
		}
	})(idx));
	fo.appendChild(ct("艦隊名："))
	var input = fo.appendChild(ce("input"));
	if (idx >= K.kantai.length) {
		input.value = "艦隊-" + 現在時刻().str;
	} else {
		input.value = K.kantai[idx].name;
	}
	input.id = "編成記録情報_input";
	input.addEventListener("click", function () { this.select() })
	var btn = fo.appendChild(ce("input"));
	btn.type = "submit"
	btn.value = "記録";
	return el;
}
function 二_編成展開削除(idx, tenki) {
	一_編成展開削除(idx);
	二_編成保存テーブルを表示(tenki)
}
function 二_編成展開削除を表示(e, idx, tenki) {
	var el = 二_編成展開削除を生成(idx, tenki);
	el.classList.add("選択ポップアップ", "long");
	el.id = "編成展開削除";
	el.style.left = getMousePos(e).x + "px";
	el.style.top = getMousePos(e).y + "px";
	document.body.appendChild(el);
}
function 二_編成展開削除を生成(idx, tenki) {
	隠す("編成展開削除");
	var el = ce("div");
	el.appendChild(ct("本当に削除しますか？"));
	el.appendChild((function (idx, tenki) {
		var el = ce("button");
		el.textContent = "削除する";
		el.addEventListener("click", (function () { return function () { 隠す("編成展開削除"); 二_編成展開削除(idx, tenki) } })(idx, tenki));
		return el;
	})(idx, tenki))
	el.appendChild((function (idx, tenki) {
		var el = ce("button");
		el.textContent = "削除しない";
		el.addEventListener("click", function () { 隠す("編成展開削除") });
		return el;
	})(idx, tenki))
	return el;
}
function 二_編成保存テーブルを非表示() {
	$("自艦隊親").style.display = "block";
	$("編成展開親").style.display = "none";
	$("外部サイトフォーム").style.display = "none";
}
function 一_編成自動保存() { //autosave生成
	一_編成記録("autosave");
}
function 一_編成展開削除(idx) {
	K.kantai.splice(idx, 1);
}
function 一_編成記録(idx, name) {
	if (idx !== "autosave") {
		if (!K.kantai[idx]) K.kantai[idx] = {};
		K.kantai[idx].name = name;
	}

	var hensei = [];
	for (var i = 0; i < O.table.length; i++) {
		if (O.table[i].data.kanmusu === "") continue;
		var kan = deepcopy(O.table[i].data);
		hensei.push(kan);
	}
	if (idx === "autosave") {
		K.autosave = {};
		K.autosave.hensei = hensei;
		K.autosave.name = "_autosave";
		K.autosave.autosave = true;
	} else {
		K.kantai[idx].hensei = hensei;
	}
}

const 二_外部サイトフォームを表示 = () => {
	$("自艦隊親").style.display = "none";
	$("編成展開親").style.display = "none";
	$("外部サイトフォーム").style.display = "block";
}

const 二_制空権シミュURLを表示 = () => {
	const el = $("外部サイト出力");
	const str = io_制空権シミュURL();
	el.value = str;

	子要素全削除("外部サイトを開く");
	const a = $("外部サイトを開く").appendChild(ce("a"));
	a.appendChild(ct("制空権シミュレータで開く"));
	a.href = str;
	a.target = "_blank";
}
const 二_デッキビルダー形式を表示 = () => {
	子要素全削除("外部サイトを開く");
	const el = $("外部サイト出力");
	const str = io_デッキビルダー形式(true);
	el.value = JSON.stringify(str, null, "    ");
}
const 二_デッキビルダーURLを表示 = () => {
	const el = $("外部サイト出力");
	const str = io_デッキビルダーURL();
	el.value = str;

	子要素全削除("外部サイトを開く");
	const a = $("外部サイトを開く").appendChild(ce("a"));
	a.appendChild(ct("艦隊シミュレーター＆デッキビルダーで開く"));
	a.href = str;
	a.target = "_blank";
}
const 二_作戦室URL生成 = () => {
	const el = $("外部サイト出力");
	const str = io_作戦室URL();
	el.value = str;

	子要素全削除("外部サイトを開く");
	const a = $("外部サイトを開く").appendChild(ce("a"));
	a.appendChild(ct("作戦室 Jervis ORで開く"));
	a.href = str;
	a.target = "_blank";
}
const 二_外部サイト出力を削除 = () => {
	子要素全削除("外部サイトを開く");
	$("外部サイト出力").value = "";
}





const 二_ドラッグアンドドロップリストを表示 = (ev) => {
	const di = 二_可動ポップアップを生成("ドラッグ＆ドロップで装備をセット");
	di.id = "自艦隊ツール_DnD";
	di.classList.add("loong");
	const e_inner = di.childNodes[2];

	const tbs = {};
	const e_selector = e_inner.appendChild(ce("ul"));
	e_selector.classList.add("選択リスト", "種別");

	const e_list = e_inner.appendChild(ce("div"));
	e_list.classList.add("選択リスト", "項目", "艦載機リスト");

	const e_table = e_list.appendChild(ce("table"));
	const e_thead = e_table.appendChild(ce("thead"));

	//右カラムヘッダ
	const e_thead_tr = e_thead.appendChild(ce("tr"));
	e_thead_tr.classList.add("DnDヘッダ")
	const thlist = ["対空", "防空", "装備名", "半径"];
	for (let i = 0; i < thlist.length; i++) {
		const e_th = e_thead_tr.appendChild(ce("th"));
		e_th.appendChild(ct(thlist[i]));
		e_th.dataset.key = i;
		e_th.classList.add("DnDヘッダセル", "clickable");
		e_th.addEventListener("click", ((num, tbs) => {
			return (ev) => {
				二_ドラッグアンドドロップリストをソート(ev, num, tbs);
			}
		})(i, tbs), false);
	}

	//右カラム装備コンテナ
	for (let i = 0; i < 装備種.length; i++) {
		const e_tbody = e_table.appendChild(ce("tbody"));
		e_tbody.classList.add("項目", 装備種[i]);
		tbs[装備種[i]] = e_tbody;
	}

	//右カラム装備一覧
	for (let i in 艦戦データ) {
		const 種類 = 零_種類(i);
		const is夜間機 = 艦戦データ[i].夜間航空機 === true ? true : false;
		const e_tr = tbs[種類].appendChild(ce("tr"));

		//行設定
		e_tr.dataset.value = i;
		e_tr.classList.add(艦戦データ[i].種類, "艦載機", "装備選択テーブル");
		if (種類 === "艦上爆撃機" && 艦戦データ[i].対空値 >= 4) e_tr.classList.add("対空値有");
		if (is夜間機) e_tr.classList.add("夜間航空機");
		e_tr.draggable = true;
		e_tr.addEventListener("dragstart", ((i) => {
			return (ev) => {
				ev.dataTransfer.setData("text/x-name", i);
				ev.dataTransfer.setData("text/x-from", "装備リスト");
				DT = "装備リスト";
			}
		})(i), false);
		e_tr.addEventListener("dblclick", () => { 二_装備を挿入(i) }, false);

		//セル設定
		const e_td_taiku = e_tr.appendChild(ce("td"));
		const e_td_bouku = e_tr.appendChild(ce("td"));
		const e_td_name = e_tr.appendChild(ce("td"));
		const e_td_radius = e_tr.appendChild(ce("td"));

		e_td_taiku.classList.add("num");
		e_td_bouku.classList.add("num");
		e_td_radius.classList.add("num");


		e_td_taiku.appendChild(ct(零_実質対空値(i, "出撃")));
		const bouku = eq(種類, ["局地戦闘機", "陸軍戦闘機"]) ? 零_実質対空値(i, "防空") : " "; //局戦陸戦以外は空欄に
		e_td_bouku.appendChild(ct(bouku));
		e_td_name.appendChild(ct(i));
		const radius = (eq(i, ["艦攻", "艦爆"])) ? "?" : 零_行動半径(i);
		e_td_radius.appendChild(ct(radius));
	}

	//左カラム
	for (let i = 0; i < 装備種.length; i++) {
		const e_li = e_selector.appendChild(ce("li"));
		e_li.classList.add(装備種[i], "clickable");
		const eqname = 雑データ.短縮.装備種[装備種[i]] ? 雑データ.短縮.装備種[装備種[i]] : 装備種[i];
		e_li.appendChild(ct(eqname));
		e_li.addEventListener("click", ((外, 中) => {
			return () => {
				外.scrollTop = 中.offsetTop - 外.offsetTop + 24 - 26;
				//24は可動ポップアップのタイトルバーの高さ　あとでなおす
				//26はヘッダ分
			}
		})(e_list, tbs[装備種[i]]));
	}

	//ポップアップする
	let left, top;
	if (($("自艦隊").getBoundingClientRect().left + $("自艦隊").offsetWidth + 410) < document.body.offsetWidth) {
		left = $("自艦隊").getBoundingClientRect().left + $("自艦隊").offsetWidth + 10;
		top = Math.max(10, $("自艦隊").getBoundingClientRect().top + window.pageYOffset - 100);
	} else {
		left = getMousePos(ev).x;
		top = getMousePos(ev).y;
	}
	di.style.left = left + "px";
	di.style.top = top + "px";
	document.body.appendChild(di);
}
const 二_ドラッグアンドドロップリストをソート = (ev, num, tbs) => {
	const e_target = ev.target;
	let mode;
	if (e_target.dataset.order) {
		mode = e_target.dataset.order === "↓" ? "↑" : "↓";
	} else {
		mode = "↓"; //最初は降順
	}
	const e_ths = document.getElementsByClassName("DnDヘッダセル");
	for (let i = 0; i < e_ths.length; i++) {
		e_ths[i].dataset.order = "";
	}
	e_target.dataset.order = mode;


	for (let i in tbs) {
		const len = tbs[i].childNodes.length;
		const keys = new Array(len);
		const trs = new Array(len);
		const e_trs = tbs[i].getElementsByTagName("tr");

		for (let j = 0; j < len; j++) {
			const temp = e_trs[j].getElementsByTagName("td")[num].textContent;
			keys[j] = isNaN(Number(temp)) ? temp : Number(temp); //数字っぽいものは数字にして比較（2と10は10のほうが大きい）
			trs[j] = e_trs[j]
		}

		//ソート
		for (let left = 0; left < len - 1; left++) {
			for (let right = left + 1; right < len; right++) {
				if (mode === "↓" && keys[right] <= keys[left]) continue;
				if (mode === "↑" && keys[left] <= keys[right]) continue;
				[keys[left], keys[right]] = [keys[right], keys[left]];
				[trs[left], trs[right]] = [trs[right], trs[left]];
			}
		}
		//DOM書き換え
		子要素全削除(tbs[i]);
		for (let j = 0; j < len; j++) {
			tbs[i].appendChild(trs[j]);
		}
	}
}


function 二_可動ポップアップを生成(title, onclose) {
	M[title] = {};
	var el = ce("div");
	var ti = el.appendChild(ce("div"));
	var cs = el.appendChild(ce("div"));
	var na = el.appendChild(ce("div"));

	ti.appendChild(ct(title));

	el.classList.add("可動ポップアップ");
	ti.classList.add("タイトルバー");
	cs.classList.add("閉じるボタン");
	na.classList.add("中身");

	cs.appendChild(ct("▲"));
	cs.addEventListener("click", function () { el.parentNode.removeChild(el); if (onclose) onclose(); });
	ti.addEventListener("mousedown", function (e) { M[title].c = true; M[title].X = e.layerX; M[title].Y = e.layerY; });
	ti.addEventListener("mouseup", function () { M[title].c = false; });
	document.addEventListener("mousemove", function (e) {
		if (M[title].c != true) return;
		el.style.left = e.pageX - M[title].X + "px";
		el.style.top = e.pageY - M[title].Y + "px";
		var els = document.getElementsByClassName("可動ポップアップ");
		for (var i = 0; i < els.length; i++) {
			els[i].style.zIndex = 200;
		}
		el.style.zIndex = 300;
	});

	return el;
}
function 二_埋めるを表示(e) {
	var el = 二_埋めるを生成();
	el.classList.add("選択ポップアップ", "long");
	el.id = "埋めるポップアップ";
	el.style.left = getMousePos(e).x + "px";
	el.style.top = getMousePos(e).y + "px";
	document.body.appendChild(el);
};
function 二_埋めるを生成() {
	隠す("埋めるポップアップ");
	var el = ce("div");

	el.appendChild(ct("全員の"));
	el.appendChild(ce("br"));

	el.appendChild((function () {
		var el = ce("select");
		var o = el.appendChild(ce("option"));
		o.appendChild(ct("空きスロット"));
		var o = el.appendChild(ce("option"));
		o.appendChild(ct("スロット"));
		el.id = "埋めるスロット";
		return el;
	})());

	el.appendChild(ct("を"));
	el.appendChild(ce("br"));

	el.appendChild((function () {
		var el = ce("select");
		for (var i in 艦戦データ) {
			var o = el.appendChild(ce("option"));
			o.appendChild(ct(i));
			o.value = i;
			//			o.classList.add(零_種類(i));
			//			if(艦戦データ[i].対空値>0){
			//				o.classList.add("対空値有");
			//			}
			//select{appearance: none;}しないとダメ？っぽい
		}
		el.id = "埋めるセレクト";
		return el;
	})());
	el.appendChild(ce("br"));

	el.appendChild((function () {
		var el = ce("button");
		el.appendChild(ct("に変更"));
		el.addEventListener("click", function () {
			二_全員の装備をいじる($("埋めるセレクト").value, $("埋めるスロット").value == "空きスロット" ? true : false);
			隠す("埋めるポップアップ");
		})
		return el;
	})());

	el.appendChild((function () {
		var el = ce("button");
		el.appendChild(ct("キャンセル"));
		el.addEventListener("click", function () { 隠す("埋めるポップアップ") });
		return el;
	})());
	return el;
};
const 二_戦闘行動半径表示 = (x, y, cr, name) => {
	隠す("戦闘行動半径表示");
	if (!x) return;
	const el = document.body.appendChild(ce("div"));
	el.id = "戦闘行動半径表示";
	el.appendChild(ct(`【${name}】戦闘行動半径：${cr} `));
	el.style.left = `${x}px`;
	el.style.top = `${y}px`;
}
function 二_ナビゲーション(a) {
	var h = $(a);
	var d = 兄弟要素を取得(h, "弟");

	window.scrollTo(0, Math.max(0, h.getBoundingClientRect().top + window.pageYOffset - 10)); //スクロールする
	setTimeout(function () {
		if (h.classList.contains("closed")) {
			h.click(); //開く
		}
		setTimeout(function () {
			d.classList.add("ジャンプ先"); //強調する
			setTimeout(function () { d.classList.remove("ジャンプ先") }, 1800); //強調をやめる
		}, 300);
	}, 300);
}

const 零_敵制空初期値 = () => {
	const o = {
		制空値: 0,
		航空隊用制空値: 0,
		上位制空値: 0,
		制空値分布: new Map(),
		艦隊: [],
		暫定: true,
		ユーザ設定値: undefined,
	};
	return o;
}
function 零_テーブル搭載数(td, i) {
	return td[i] ? td[i] : 0;
}
/*
function 一_最新バージョンチェック() {
	if (location.href.match(/dque.github.io/) === null) return;
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				var d = xhr.responseText;
				var s = d.match(/data_version="(.*?)"/);
				if (s && s[1]) {
					一_バージョンチェック(s[1]);
				}
			}
		}
	}
	xhr.open("GET", "https://dque.github.io/seiku/data_version.js", true);
	xhr.setRequestHeader("Pragma", "no-cache");
	xhr.setRequestHeader("Cache-Control", "no-cache");
	xhr.send();
};
function 一_バージョンチェック(s) {
	if (s !== data_version) {
		var a = s.match(/(\d+)-(\d+)/)
		var b = String(data_version).match(/(\d+)-(\d+)/);
		if (a[1] > b[1] || (a[1] === b[1] && a[2] > b[2])) {
			//新しいバージョンがある
			$("version_check").classList.add("old");
		}
	}
}
*/










