const wiki_表記=(s)=>{
	const list=[
		{前:/ \+ /,後:"+"},
		{前:/\//g,後:"／"},
		{前:/&/g,後:"＆"},
		{前:/\+/g,後:"＋"},
		{前:/é/g,後:"e"},
		{前:/ä/g,後:"a"},
		{前:"天山一二型(村田隊)",後:"天山(村田隊)"},
	];
	for(let i of list){
		s=s.replace(i.前,i.後);
	}
	return s;
}

const wiki_url=(a)=>{
	return "http://wikiwiki.jp/kancolle/?"+EscapeEUCJP(a);
}
