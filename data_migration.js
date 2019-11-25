function データ移行(O){
	var L=[];
	
	for(var i=0; i<移行用データ.hou.length; i++){ //方面
		if(移行用データ.kai[i].前==O.hou){
			L.push({"前":O.hou,"後":移行用データ.hou[i].後});
			O.kai=移行用データ.hou[i].後;
		}
	}
	for(var i=0; i<移行用データ.kai.length; i++){ //方面
		if(移行用データ.kai[i].前==O.kai){
			L.push({"前":O.kai,"後":移行用データ.kai[i].後});
			O.kai=移行用データ.kai[i].後;
		}
	}
	
	for(var I=0; I<O.table.length; I++){
		var t=O.table[I];
		if(t.deleted) continue;
		var d=t.data;
		
		
		for(var i=0; i<d.soubi.length; i++){ //装備
		
			for(var j=0; j<移行用データ.soubi.length; j++){
				if(d.soubi[i] === 移行用データ.soubi[j]["前"]){
					L.push({"前":d.soubi[i],"後":移行用データ.soubi[j]["後"]});
					d.soubi[i]=移行用データ.soubi[j]["後"];
				}
			}
		}
		
		for(var i=0; i<移行用データ.kanmusu.length; i++){ //艦娘
			if(d.kanmusu===移行用データ.kanmusu[i].前.名前 && (移行用データ.kanmusu[i].前.改造===undefined || 移行用データ.kanmusu[i].前.改造===d.kanmusu.kaizou)){
				d.kanmusu=移行用データ.kanmusu[i].後.名前;
				d.kaizou=移行用データ.kanmusu[i].後.改造;
			}
			
		}
	}
	for(var I=0; I<O.etable.length; I++){
		for(var i=0; i<移行用データ.teki.length; i++){
			if(O.etable[I]==移行用データ.teki[i]["前"]){
				O.etable[I]=移行用データ.teki[i]["後"];
				L.push(移行用データ.teki[i]);
			}
		}
	}
	if(L.length>0) データ移行通知を表示(L);
}

const データ移行通知を表示=(L)=>{
	if($("データ移行通知")){
		var n=$("データ移行通知");
	}else{
		var n=二_可動ポップアップを生成("データ移行通知");
		n.childNodes[2].appendChild(ct("更新によって利用できなくなったデータを自動で移行しました："))

	}
	n.id="データ移行通知";
	n.childNodes[2].appendChild(ce("hr"))
	var ul=n.childNodes[2].appendChild(ce("ul"));
	var f=false;
	for(var i=0; i<L.length; i++){
		f=true;
		var li=ul.appendChild(ce("li"));
		li.appendChild(ct("「"+L[i]["前"]+"」→「"+L[i]["後"]+"」"))
	}
	if(f){
		n.style.right="12px";
		n.style.bottom="12px";
		document.body.appendChild(n);
	}
}

const 編成記録データ移行=(K)=>{
	let do_save=false;
	if(K.autosave){
		do_save=記録艦隊データ移行(K.autosave);
	}
	if(K.kantai){
		for(let kantai of K.kantai){
			let tf=false;
			tf=記録艦隊データ移行(kantai);
			if(tf) do_save=true;
		}
	}
	if(do_save) 零_ローカルストレージ保存(K,"K");
}
const 記録艦隊データ移行=(kantai)=>{
	let L=[];
	const hensei=kantai.hensei;
	for(let kanmusu of hensei){
		for(let d of 移行用データ.soubi){
			for(let i=0; i<kanmusu.soubi.length; i++){
				if(kanmusu.soubi[i] === d.前){
					kanmusu.soubi[i]=d.後;
					L.push({"前":d.前,"後":d.後});
				}
			}
		}
		for(let d of 移行用データ.kanmusu){
			if(kanmusu.kanmusu === d.前.名前 && (d.前.改造===undefined || kanmusu.kaizou===d.前.改造)){
				kanmusu.kanmusu=d.後.名前;
				kanmusu.kaizou=d.後.改造;
				L.push({"前":`${d.前.名前} ${d.前.改造?d.前.改造:""}`, "後":`${d.後.名前} ${d.後.改造}`});
			}
		}
	}
	if(L.length>0){
		データ移行通知を表示(L);
		return true;
	}
	return false;
}







var 移行用データ={
	hou:[],
	kai:[
		{"前":"南西諸島防衛戦","後":"南西諸島防衛線"},
	],
	soubi:[
		{"前":"ネームド艦攻","後":"九七式艦攻(友永隊)"},
		{"前":"天山(友永隊)","後":"天山一二型(友永隊)"},
		{"前":"天山(村田隊)","後":"天山一二型(村田隊)"},
		{"前":"天山一ニ型(友永隊)","後":"天山一二型(友永隊)"},
		{"前":"天山一ニ型(村田隊)","後":"天山一二型(村田隊)"},
		{"前":"ネームド艦爆","後":"彗星(江草隊)"},
		{"前":"爆装一式戦 隼III型改(55戦隊)","後":"爆装一式戦 隼III型改(65戦隊)"},
		{"前":"烈風","後":"試製烈風 後期型"},
//		{"前":"烈風改","後":"烈風 一一型"},
		{"前":"烈風改二(一航戦/熟練)","後":"烈風改二"},
	],
	kanmusu:[
		{"前":{"名前":"Italia"},"後":{"名前":"Littorio","改造":"Italia"}},
		{"前":{"名前":"龍鳳"},"後":{"名前":"大鯨","改造":"龍鳳"}},
		{"前":{"名前":"あきつ丸","改造":"無印"},"後":{"名前":"あきつ丸","改造":"改"}},
	],
	teki:[
		{"前":"軽母ヌ級","後":"ヌ"},
		{"前":"軽母ヌ級elite","後":"ヌe"},
		{"前":"軽母ヌ級flagship","後":"ヌf"},
		{"前":"軽母ヌ級改elite","後":"ヌ改e"},
		{"前":"軽母ヌ級改flagship","後":"ヌ改f"},
		{"前":"軽母ヌ級elite(強)","後":"ヌe(白猫)"},
		{"前":"軽母ヌ級flagship(強)","後":"ヌf(赤猫)"},
		{"前":"軽母ヌ級flagship(強B)","後":"ヌf(白猫)"},
		{"前":"軽母ヌ級改elite(強)","後":"ヌ改e(鷹+白猫)"},
		{"前":"軽母ヌ級改flagship(強)","後":"ヌ改f(鷹+赤猫)"},
		{"前":"軽母ヌ級elite(黒)","後":"ヌe(黒猫)"},
		{"前":"軽母ヌ級elite(黒B)","後":"ヌe(1777)"},
		{"前":"軽母ヌ級flagship(黒)","後":"ヌf()"},
		{"前":"空母ヲ級","後":"ヲ"},
		{"前":"空母ヲ級elite","後":"ヲe"},
		{"前":"空母ヲ級flagship","後":"ヲf"},
		{"前":"空母ヲ級flagship(強)","後":"ヲf(白猫)"},
		{"前":"空母ヲ級flagship(強B)","後":"ヲef(赤猫+白猫)"},
		{"前":"空母ヲ級flagship(強C)","後":"ヲf(赤猫)"},
		{"前":"空母ヲ級改flagship","後":"ヲ改f"},
		{"前":"空母ヲ級改flagship(強)","後":"ヲ改f(赤猫)"},
		{"前":"空母ヲ級改flagship(強B)","後":"ヲ改f(赤猫+白猫)"},
		{"前":"空母ヲ級改flagship(強C)","後":"ヲ改f(白猫)"},
		{"前":"空母ヲ級改flagship(陸爆強)","後":"ヲ改f(陸爆上)"},
		{"前":"空母ヲ級改flagship(陸爆弱)","後":"ヲ改f(陸爆下)"},
		{"前":"空母棲姫(黒)","後":"空母棲姫(黒猫)"},
		{"前":"空母の出現なし","後":"航空戦力なし"},
	]
};
