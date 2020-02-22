var ns = "http://www.w3.org/2000/svg";
var hns = "http://www.w3.org/1999/xhtml";

function スペースで結合(ary, tf) {
	var s = "";
	for (var i = 0; i < ary.length; i++) {
		s += ary[i];
		s += " ";
	}
	if (tf) s += " ";
	return s;
}


function addSvg(mn) {
	$("n_マップ").appendChild(makeMapSVG(mn));
}
function マス目からマップを特定する(point) {
	if (point.parentNode.getElementsByTagNameNS(ns, "rect")) {
		return point.parentNode.getElementsByTagNameNS(ns, "rect")[0].getAttributeNS(hns, "data-mapname");
	}
	return undefined;
}
function マス目から文字を特定する(point) {
	return point.getAttributeNS(hns, "data-point");
}
function マス目を特定する(mn, pn) {
	if (document.getElementById("map" + mn)) {
		var ps = document.getElementById("map" + mn).getElementsByClassName("マス目");
		for (var i = 0; i < ps.length; i++) {
			if (ps[i].getAttributeNS(hns, "data-point") == pn) return ps[i];
		}
	}
	return undefined;
}

function ルートを列挙する(mn, routes) {
	//routes:2次元配列
	//routes[]:配列
	//routes[][]:String マス名
	//routes=[ ["1","A","C"], ["1","B","C"], ... ]
	//最初に呼ばれるときはroutes=[["C"]]とか
	var c = 0; //始点に到達したルートの総数
	var new_routes = [];
	for (var i = 0; i < routes.length; i++) {
		var b4 = ひとつ前のマスを特定する(マス目を特定する(mn, routes[i][0]));
		if (b4.length > 0) { //beforeが存在する
			del_route: for (var j of b4) {
				let cnt = {};
				for (let k of routes[i]) {
					const max = 2;
					if (j == k) cnt[k] == undefined ? cnt[k] = 2 : cnt[k]++;
					if (cnt[k] >= max) continue del_route; //1つのマスをmax回以上通るルートは破棄
				}
				new_routes.push([j].concat(routes[i])); //1つ前のマスに今までのルートを付け加えてnew_routesに格納
			}
		} else { //始点に到達した
			new_routes.push(routes[i]); //new_routesにそのまま格納
			c++;
			if (c >= routes.length) return routes; //全てのルートが始点に到達したらreturn
		}
	}
	return ルートを列挙する(mn, new_routes); //始点に到達しないルートがあったら再帰
}
function ひとつ前のマスを特定する(point) {
	var mn = マス目からマップを特定する(point);
	var pn = マス目から文字を特定する(point);
	var ary = [];
	if (!mn) return [];
	var md = mapData[mn];
	for (var i in md) {
		if (i === "data") continue;
		for (var j = 0; j < md[i]["next"].length; j++) {
			if (md[i]["next"][j] == pn) ary.push(i);
		}
	}
	return ary;
}

function ルートの強調表示オン(route) {
	for (var i = 0; i < route.length - 1; i++) {
		var s = "" + route[i] + route[i + 1];
		var p = ルートを特定する(s);
		p.classList.add("selected")

	}
}
function ルートの強調表示オフ() {
	var r = document.getElementsByClassName("route");
	for (var i = 0; i < r.length; i++)
		r[i].classList.remove("selected");
}

function ルートを特定する(p) {
	return document.getElementsByClassName("route" + p)[0]; //要改修　複数のマップが存在する場合に正しく動作しない
}

const 夜戦の塗りを描く = (md) => {
	const c = document.createElementNS(ns, "circle");
	const r = Math.floor(otherData["circle-r"] * 0.7);
	c.setAttribute("cx", md["x"]);
	c.setAttribute("cy", md["y"]);
	c.setAttribute("r", r);
	c.setAttribute("class", "夜戦の塗り");
	c.setAttribute("pointer-events", "none");
	return c;
}
const 払暁戦の塗りを描く = (md) => {
	const type = md.type;
	const ty = type === "ボス_夜to昼" ? -5 : 0;
	const sc = type === "ボス_夜to昼" ? 1.2 : 1;

	const c1 = document.createElementNS(ns, "path"); //下側
	const c2 = document.createElementNS(ns, "path"); //上側
	const r = Math.floor(otherData["circle-r"] * 0.7);
	const x = [0, -r / 5, -r, r, r / 5, 0];
	const y = [0, r / 5, 0, 0, -r / 5, 0];
	const rotate = -20;
	const transform = `translate(${md.x},${md.y + ty}) rotate(${rotate}) scale(${sc})`;

	const d1 = `M ${-r},0 A ${r},${r},0,1,1,${r},0 A ${r},${r},0,1,1,${-r},0`;
	const d2 = `M 0,0 L ${x[1]},${y[1]} L ${x[2]},${y[2]} A ${r},${r},0,1,0,${r},0 L ${x[4]},${y[4]} L 0,0`;


	c1.setAttribute("transform", transform);
	c1.setAttribute("d", d1);
	c1.setAttribute("class", "払暁戦の塗り下");
	c1.setAttribute("pointer-events", "none");

	c2.setAttribute("transform", transform);
	c2.setAttribute("d", d2);
	c2.setAttribute("class", "払暁戦の塗り上");
	c2.setAttribute("pointer-events", "none");
	return [c1, c2];
}
function 航空戦の飛行機を描く(md) { //現在未使用
	var c0 = document.createElementNS(ns, "path");
	var d = "M 0,0 ";
	d += "l 1,-1 v -4 h 0.2 v 5 h 1 v -1 h 4 c 0,0 0,-22 4,-22 c 6,0 5,22 5,21 l 12,1 c 0,0 1,-6 3,-6 c 3,0 3,14 0,14 c -2,0 -3,-6 -3,-6 l -12,1 c 0,0 1,21 -5,21 c -4,0 -4,-22 -4,-22 h -4 v -1 h -1 v 5 h -0.2 v -4 l -1,-1 z";

	c0.setAttribute("transform", `translate(${md.x - 11}, ${md.y + 5}) rotate(45,16,0) scale(0.7,0.7)`);
	c0.setAttribute("d", d);
	c0.setAttribute("class", "航空戦の飛行機");
	c0.setAttribute("pointer-events", "none");
	return c0;
}
function 航空戦の矢印を描く(md) {
	var c0 = document.createElementNS(ns, "path");
	var r = otherData["circle-r"];

	var d = "M 0,0 ";
	d += "l -3,3 l -3,-3 h 2 c 0,-5 -7,-2 -7,6 c 0,-5 9,-12 9,-6 z";

	c0.setAttribute("d", d);
	c0.setAttribute("transform", `translate(${md.x - r},${md.y - r}) scale(${2 / 11 * r},${2 / 11 * r}) translate(${10},${8 / 2})`);
	c0.setAttribute("class", "航空戦の矢印");
	c0.setAttribute("pointer-events", "none");

	return c0;
}
function 空襲戦の矢印を描く(md) {
	var c0 = document.createElementNS(ns, "path");
	var r = otherData["circle-r"];

	var d = "M 0,0 ";
	d += "h 2 c 0,-4 6,-7 9,-4 c -3,-1 -7,0 -7,4 h 2 l -3,3 z";

	c0.setAttribute("d", d);
	c0.setAttribute("transform", `translate(${md.x - r},${md.y - r}) scale(${1.8 / 11 * r},${1.8 / 11 * r}) translate(0,8)`);
	c0.setAttribute("class", "空襲戦の矢印");
	c0.setAttribute("pointer-events", "none");

	return c0;
}

function 出撃のマークを描く(md) {
	var c0 = document.createElementNS(ns, "path");
	var s = otherData["circle-r"] * 0.8;
	var r = otherData["circle-r"] * 1.2;
	var d = "M " + s + ",0 A " + s + "," + s + " 0 0 1 -" + s + ",0 A " + s + " " + s + " 0 0 1 " + s + " 0 ";
	for (var i = 0; i < 8; i++) {
		d += "M 0 0 L " + r * Math.cos(i * Math.PI / 4) + " " + r * Math.sin(i * Math.PI / 4);
	}
	c0.setAttribute("d", d);
	c0.setAttribute("transform", "translate(" + md.x + "," + md.y + ")");
	c0.setAttribute("class", "出撃のパス");
	c0.setAttribute("pointer-events", "none");

	return c0;
}
function 帰投のマークを描く(md) {
	var c0 = document.createElementNS(ns, "path");
	var d = "M 0,0 C -4,-2 ,-8,-3 -10,-9.5 L -11,-9 V -13 L -8,-10.5 L -9,-10 C -8,-6 -5,-4 0,-1 M 0,0 V -15 A 3 3 0 1 1 0,-21 A 3 3 0 1 1 0,-15 M 2.5,-17 C 2.5,-17 4,-16 4,-15 C 4,-14 -4,-12 -4,-11 C -4,-10 4,-4 4,-3 M 0,0 C 4,-2 ,8,-3 10,-9.5 L 11,-9 V -13 L 8,-10.5 L 9,-10 C 8,-6 5,-4 0,-1";

	c0.setAttribute("d", d);
	c0.setAttribute("transform", "translate(" + md.x + "," + (md.y + 10) + ")");
	c0.setAttribute("pointer-events", "none");
	c0.setAttribute("class", "帰投のパス");
	return c0;
}
function 旗を描く(md) {
	var c0 = document.createElementNS(ns, "path");
	var d = "M 0,0 V -20 L 10,-15 L 0,-10 L 0,0 z";
	c0.setAttribute("d", d);
	c0.setAttribute("transform", "translate(" + (md.x + 10) + "," + (md.y) + ")");
	c0.setAttribute("pointer-events", "none");
	c0.setAttribute("class", "旗のパス");
	return c0;
}
function 基地を描く(md) {
	var c0 = document.createElementNS(ns, "path");
	var d = "M -10,-5 l 20,15 M -10,5 l 20,-14 z";

	c0.setAttribute("d", d);
	c0.setAttribute("transform", "translate(" + (md.x) + "," + (md.y) + ")");
	c0.setAttribute("pointer-events", "none");
	c0.setAttribute("class", "基地のパス");

	return c0;
}
function 航路矢印を描く() {
	var marker = document.createElementNS(ns, "marker");
	var polygon = document.createElementNS(ns, "polygon");
	marker.setAttribute("id", "routeMarker");

	marker.setAttribute("viewBox", "0 -5 10 10");
	marker.setAttribute("refX", otherData["circle-r"] + 4);
	marker.setAttribute("refY", "0");
	marker.setAttribute("markerWidth", "14");
	marker.setAttribute("markerHeight", "14");
	marker.setAttribute("markerUnits", "userSpaceOnUse");
	marker.setAttribute("orient", "auto")

	polygon.setAttribute("points", "10,0,0,5,3,0,0,-5");

	marker.appendChild(polygon);
	return marker;
}
function 不明のクエッションマークを描く(md) {
	var t = document.createElementNS(ns, "text");
	var size = parseInt(otherData["circle-r"] * 2 * 0.8);

	t.appendChild(document.createTextNode("？"));
	t.setAttribute("x", md.x);
	t.setAttribute("y", md.y);
	t.setAttribute("class", "不明の文字");
	t.setAttribute("style", `font-size:${size}px;`);
	t.setAttribute("dx", -size / 2);
	t.setAttribute("dy", size / 2);
	t.setAttribute("pointer-events", "none");
	return t;
}
const レーダー射撃のマークを描く = (md) => {
	const p = document.createElementNS(ns, "path");
	const d = "M -5,0 L -3,0 L -2,-3 L -1,-2 L 0,-5 L 3,1 L 4,-1 L 5,0 L 6,0";
	const r = otherData["circle-r"] / 5.5;
	const tr = `translate(${md.x},${md.y + 5}) scale(${r},${r})`;
	p.setAttribute("d", d);
	p.setAttribute("transform", tr);
	p.setAttribute("pointer-events", "none");
	p.setAttribute("class", "レーダー射撃のパス");
	return p;
}




function makeMapSVG(mn, mapType, fes, x, y) {
	var svgw = x === undefined ? 400 : x, svgh = y === undefined ? 250 : y;
	var mapw = svgw, maph = svgh;
	//	if(fes=="sanma"){
	//		svgh=400;
	//	}

	var md = mapData[mn];
	var svg = document.createElementNS(ns, "svg");
	svg.setAttribute("id", "map" + mn);
	svg.setAttribute("width", svgw);
	svg.setAttribute("height", svgh);
	svg.setAttribute("class", "mapSVG");

	//グラデーション準備(110,90,200)
	var defs = document.createElementNS(ns, "defs");
	var gradobj = {
		//		"夜戦":{"rotate":"90","stops":{"0%":"#ff3300","40%":"#ff3300","100%":"#000099"}},
		"夜to昼": { "rotate": "90", "stops": { "0%": "#6e5ac8", "40%": "#6e5ac8", "100%": "#ff3300" } },
		"ボス_夜to昼": { "rotate": "90", "stops": { "0%": "#6e5ac8", "60%": "#6e5ac8", "100%": "rgb(182,10,5)" } },
	};
	for (var i in gradobj) {
		var grad = document.createElementNS(ns, "linearGradient");
		grad.setAttribute("id", i);
		//		grad.setAttribute("gradientTransform","rotate("+gradobj[i]["rotate"]+")");
		grad.setAttribute("x1", "0%");
		grad.setAttribute("x2", "30%");
		grad.setAttribute("y1", "0%");
		grad.setAttribute("y2", "100%");
		for (var j in gradobj[i]["stops"]) {
			var stop = document.createElementNS(ns, "stop");
			stop.setAttribute("offset", j);
			stop.setAttribute("stop-color", gradobj[i]["stops"][j]);
			grad.appendChild(stop);
		}
		defs.appendChild(grad);
	}
	svg.appendChild(defs);

	//矢印
	var marker = 航路矢印を描く();
	svg.appendChild(marker);

	// 枠線描画
	var base = document.createElementNS(ns, "rect");
	base.setAttribute("class", "base");
	base.setAttributeNS(hns, "data-mapname", mn);
	base.stroke = "0";
	base.setAttribute("width", mapw);
	base.setAttribute("height", maph);
	svg.appendChild(base);

	// ルート描画
	for (var point in md) {
		if (point === "data") continue;
		var appendArrow = true;
		var nexts = md[point]["next"];
		var now = md[point];
		for (var j = 0; j < nexts.length; j++) {
			var p = document.createElementNS(ns, "path");
			p.setAttribute("class", "route")
			var next = md[nexts[j]];
			if (!next) console.log(point);
			var dis = Math.sqrt(Math.pow(next.x - now.x, 2) + Math.pow(next.y - now.y, 2));
			var cmd = "M " + now.x + " " + now.y + " ";
			try {
				var nexcj = now["nexc"][j];
			} catch (e) { console.log(point) }
			if (nexcj > 9) {
				appendArrow = false;
				nexcj -= 10;
			}
			if (nexcj > 9) {
				p.setAttribute("class", "route_t");
				nexcj -= 10;
			}
			if (nexcj == 0) { //直線
				cmd += ("L " + next.x + " " + next.y);
			} else { //曲線
				cmd += ("A " + dis * otherData.xrx + " " + dis * otherData.xrx + " 0 0 " + (nexcj - 1) + " " + next.x + " " + next.y);
			}
			p.setAttribute("d", cmd);
			p.classList.add("route" + point + nexts[j]);

			if (appendArrow) p.setAttribute("marker-end", "url(#routeMarker)");

			svg.appendChild(p);
		}
	}


	// マス目描画
	for (var i in md) {
		if (i === "data") continue;
		var mtype = md[i]["type"];
		if (mtype == "コメント" || mtype == "ラベル") {
			var c = null;//何もしない
		} else if (mtype == "ボス" || mtype == "ボス_夜to昼") {
			var c = document.createElementNS(ns, "path");
			var d = "M 0,0 C -10,0 -11,-5 -12,-6 C -14,-10 -12,-10 -12,-12 C -12,-12 -10,-22 -10,-22 C -8,-19 -6.5,-17 -5,-17 C -3,-17 -2,-18 0,-18 C 2,-18 3,-17 5,-17 C 6.5,-17 8,-19 10,-22 C 10,-22 12,-12 12,-12 C 12,-10 14,-10 12,-6 C 11,-5 10,0 0,0";
			c.setAttribute("transform", "translate(" + (md[i]["x"]) + ", " + (md[i]["y"] + 10) + ")scale(1.3,1.7)");
			c.setAttribute("d", d);
			//払暁戦を2色勾玉にしたのでコメントアウト
			//			if(mtype=="ボス_夜to昼"){
			//				c.setAttribute("style","fill:url(#ボス_夜to昼)");
			//			}
		} else if (mtype === "接続点") { //mapNp用
			var c = document.createElementNS(ns, "circle");
			c.setAttribute("cx", md[i]["x"]);
			c.setAttribute("cy", md[i]["y"]);
			c.setAttribute("r", 3);
		} else {
			var c = document.createElementNS(ns, "circle");
			c.setAttribute("cx", md[i]["x"]);
			c.setAttribute("cy", md[i]["y"]);
			c.setAttribute("r", otherData["circle-r"]);
			/*			if(mtype=="夜戦"){
			//				c.setAttribute("style","fill:url(#夜戦)");
			//classとかで外部CSSからグラデーションを付けようとするとFirefoxで動かないのでJSで
			//艦これ公式の夜戦マスが単色になったためコメントアウト
						}
			*/

			//払暁戦を2色勾玉にしたのでコメントアウト
			//			if(mtype=="夜to昼"){
			//				c.setAttribute("style","fill:url(#夜to昼)");
			//			}
		}

		if (c) {
			c.setAttribute("class", "マス目" + (mtype ? (" " + mtype) : ""));
			c.setAttributeNS(hns, "data-point", i)
			let cr = md[i].cr;
			if (cr !== undefined) {
				c.setAttributeNS(hns, "data-cr", cr);
			}
			svg.appendChild(c);
		}

		if (mtype == "夜戦") {
			svg.appendChild(夜戦の塗りを描く(md[i]));
		}
		if (mtype === "夜to昼" || mtype === "ボス_夜to昼") {
			const c = 払暁戦の塗りを描く(md[i]);
			svg.appendChild(c[0]);
			svg.appendChild(c[1]);
		}
		if (mtype == "航空戦") {
			svg.appendChild(空襲戦の矢印を描く(md[i]));
			svg.appendChild(航空戦の矢印を描く(md[i]));
		}
		if (mtype == "空襲戦") {
			svg.appendChild(空襲戦の矢印を描く(md[i]));
		}
		if (mtype == "出撃") {
			svg.appendChild(出撃のマークを描く(md[i]));
		}
		if (mtype == "帰投") {
			svg.appendChild(帰投のマークを描く(md[i]));
		}
		if (mtype == "揚陸地点") {
			svg.appendChild(旗を描く(md[i]));
		}
		if (i == "基" || mtype == "基地") {
			svg.appendChild(基地を描く(md[i]));
		}
		if (mtype == "レーダー射撃") {
			svg.appendChild(レーダー射撃のマークを描く(md[i]));
		}

		if (mtype == "不明") {
			svg.appendChild(不明のクエッションマークを描く(md[i]));
		}

		if (c && mapType === "目的地選択") {
			c.addEventListener("click", ((i) => {
				return (e) => {
					$("マップ").classList.add("chked");
					$("マップ").querySelector("h3").dataset.selected = `目的地：${i}`;
					二_ルート選択を表示(e);
					二_敵艦隊選択を表示(マス目から文字を特定する(e.target));
					二_航空隊出撃ポイント選択を表示();
				}
			})(i), false);
			c.addEventListener("mouseover", ((i) => {
				return (e) => {
					let cr = i.cr;
					const t = e.target;
					if (cr) {
						const rect = t.getBoundingClientRect();
						const x = rect.left + window.scrollX + otherData["circle-r"];
						const y = rect.top + window.scrollY + otherData["circle-r"];
						二_戦闘行動半径表示(x, y, cr);
						$("マップ").querySelector("h3").dataset.cr = `戦闘行動半径：${cr}`;
					}
				}
			})(md[i]), false);
			c.addEventListener("mouseout", ((i) => {
				return (e) => {
					$("マップ").querySelector("h3").dataset.cr = ``;
					二_戦闘行動半径表示(); //隠す
				}
			})(md[i]), false);
		} else if (c && mapType === "ルート選択") {
			c.addEventListener("click", ((i) => {
				return () => {
					alert(i);
				}
			})(i), false)
		}
	}


	var dx = 5, dy = 10;
	if (mn == "Hanrei") { //凡例ではマス番号を大きめにずらす
		dx = 12;
		dy = 18;
	}
	for (var i in md) {
		if (i === "data") continue;
		if (md[i]["type"] !== "接続点" && md[i]["type"] !== "コメント") {
			//マス目の文字
			var r = document.createElementNS(ns, "rect");
			r.setAttribute("x", md[i]["x"] + dx - 1 - 5 * (i.length - 1));
			r.setAttribute("y", md[i]["y"] + dy - 12);
			r.setAttribute("width", 14 + 5 * (i.length - 1));
			r.setAttribute("height", 14);
			r.setAttribute("class", "マス目の文字背景")
			r.setAttribute("pointer-events", "none");
			svg.appendChild(r);


			var t = document.createElementNS(ns, "text");
			t.setAttribute("x", md[i]["x"] + dx - 5 * (i.length - 1));
			t.setAttribute("y", md[i]["y"] + dy);
			t.appendChild(document.createTextNode(i))
			t.setAttribute("class", "マス目の文字")
			t.setAttribute("pointer-events", "none");
			svg.appendChild(t);
		}
	}


	return svg;
}


