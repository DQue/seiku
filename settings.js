const 設定項目={
	"プロパティ名":{
		"type":"boolean", //"boolean","string","number"
		"default":true,
		"ID":"ID_of_HTML_Element",
	},
	"calc_ave":{
		"type":"boolean",
		"default":false,
		"ID":"平均で計算",
	},
	"calc_1":{
		"type":"boolean",
		"default":false,
		"ID":"搭載1で計算",
	},
	"calc_120":{
		"type":"boolean",
		"default":true,
		"ID":"熟練度120で計算",
	},
	"show_noeq":{
		"type":"boolean",
		"default":true,
		"ID":"装備無し搭載数を表示",
	},
	"show_border":{
		"type":"boolean",
		"default":false,
		"ID":"制空境界値を表示する",
	},
	"show_border_graph":{
		"type":"boolean",
		"default":true,
		"ID":"制空境界グラフを表示する",
	},
}

const set_HTML要素操作=()=>{
	for(const i in 設定項目){
		const _id=設定項目[i].ID;
		const type=設定項目[i].type;
		if(O.settings!==undefined && O.settings[i]!==undefined && $(_id)){ //保存済の値を元にHTML要素の状態を書き換え
			if(type==="boolean"){
				$(_id).checked=O.settings[i];
			}else if(type==="number"){
				//input[type="number"]
			}else if(type==="string"){
				//select-option
			}
		}
		
		if($(_id)){ //eventListenerを設定
			$(_id).addEventListener("click",(e)=>{return set_ev発生(e,type,i)},false);
		}
	}
}

const set_デフォルト値設定=()=>{
	for(const i in 設定項目){
		if(O.settings[i]===void 0){
			O.settings[i]=設定項目[i].default;
		}
	}
}

const set_ev発生=(e,type,name)=>{
	if(type==="boolean"){
		O.settings[name]=e.target.checked;
	}
	二_結果テーブルを表示();
}
