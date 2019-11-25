const tgl_登録=()=>{
	var els=document.getElementsByClassName("opener");
	for(let i=0; i<els.length; i++){
		const el=els[i];
		if(el.dataset.doToggle==="true") continue;
		el.dataset.doToggle="true";
		el.addEventListener("click",function(e){
			tgl_開閉(e.target);
			tgl_状況保存();
		});
	}
}

const tgl_開閉=(el,開閉)=>{
	const bro=兄弟要素を取得(el,"弟");
	if(開閉==="開"){
		 el.classList.remove("closed");
		bro.classList.remove("hide");
	}else if(開閉==="閉"){
		 el.classList.add("closed");
		bro.classList.add("hide");
	}else{ //無指定=開閉切り替え
		 el.classList.toggle("closed");
		bro.classList.toggle("hide");
	}
}

const tgl_開閉要素一覧=()=>{
	return document.querySelectorAll('[data-do-toggle="true"]');
}
const tgl_状況変数化=()=>{
	let T={};
	const els=tgl_開閉要素一覧();
	for(let el of els){
		if(el.classList.contains("closed")===false){
			T[el.id]="開";
		}else{
			T[el.id]="閉";
		}
	}
	return T;
}
const tgl_デフォルト開閉状況=()=>{
	const 開=["sec_艦隊","sec_マップ","sec_結果"];
	const 閉=["sec_使い方","できるできない","補足","tips","マップ凡例","自艦隊ツール","深海棲艦単体を追加","sec_更新履歴","sec_その他","実装予定","資料"];
	let T={};
	for(let i of 開){
		T[i]="開";
	}
	for(let i of 閉){
		T[i]="閉";
	}
	return T;
}
const tgl_状況保存=()=>{
	const type="tgl";
	const T=tgl_状況変数化();
	零_ローカルストレージ保存(T,type);
}
const tgl_状況再現=(T)=>{
	for(let i in T){
		const el=$(i);
		if(el===undefined || el===null) continue;
		tgl_開閉(el, T[i]);
	}
}




window.addEventListener("DOMContentLoaded",tgl_登録);
