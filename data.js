
const 艦種 = ["装甲空母", "正規空母", "軽空母", "揚陸艦", "水上機母艦", "軽巡洋艦", "航空巡洋艦", "重巡洋艦", "航空戦艦", "戦艦", "潜水空母", "補給艦", "潜水母艦", "基地航空隊"];
const 艦種略称 = {
	"装甲空母": "装母",
	"正規空母": "航",
	"軽空母": "軽母",
	"揚陸艦": "揚陸",
	"水上機母艦": "水母",
	"軽巡洋艦": "軽巡",
	"航空巡洋艦": "航巡",
	"重巡洋艦": "重巡",
	"航空戦艦": "航戦",
	"戦艦": "戦",
	"潜水空母": "潜母",
	"補給艦": "補給",
	"潜水母艦": "潜母艦",
};
const 艦種その他枠 = ["揚陸艦", "軽巡洋艦", "重巡洋艦", "戦艦", "潜水空母", "補給艦", "潜水母艦"];
const 艦娘データ = {
	"翔鶴": {
		"読み": "ショウカク",
		"データ": {
			"無印": { "スロット": [21, 21, 21, 12], "艦種": "正規空母", "改造": 0, "素火力": 39, "id": 110 },
			"改": { "スロット": [24, 24, 24, 12], "艦種": "正規空母", "改造": 1, "素火力": 39, "id": 288 },
			"改二": { "スロット": [27, 27, 27, 12], "艦種": "正規空母", "改造": 2, "素火力": 63, "id": 461 },
			"改二甲": { "スロット": [34, 21, 12, 9], "艦種": "装甲空母", "改造": 3, "素火力": 70, "id": 466 }
		}
	},
	"瑞鶴": {
		"読み": "ズイカク",
		"データ": {
			"無印": { "スロット": [21, 21, 21, 12], "艦種": "正規空母", "改造": 0, "素火力": 39, "id": 111 },
			"改": { "スロット": [24, 24, 24, 12], "艦種": "正規空母", "改造": 1, "素火力": 39, "id": 112 },
			"改二": { "スロット": [28, 26, 26, 13], "艦種": "正規空母", "改造": 2, "素火力": 56, "id": 462 },
			"改二甲": { "スロット": [34, 24, 12, 6], "艦種": "装甲空母", "改造": 3, "素火力": 65, "id": 467 }
		}
	},
	"蒼龍": {
		"読み": "ソウリュウ",
		"データ": {
			"無印": { "スロット": [12, 27, 18, 7], "艦種": "正規空母", "改造": 0, "素火力": 29, "id": 90 },
			"改": { "スロット": [18, 27, 18, 10], "艦種": "正規空母", "改造": 1, "素火力": 39, "id": 279 },
			"改二": { "スロット": [18, 35, 21, 7], "艦種": "正規空母", "改造": 2, "素火力": 62, "id": 197 }
		}
	},
	"飛龍": {
		"読み": "ヒリュウ",
		"データ": {
			"無印": { "スロット": [12, 27, 18, 7], "艦種": "正規空母", "改造": 0, "素火力": 29, "id": 91 },
			"改": { "スロット": [18, 27, 18, 10], "艦種": "正規空母", "改造": 1, "素火力": 39, "id": 280 },
			"改二": { "スロット": [18, 36, 23, 4], "艦種": "正規空母", "改造": 2, "素火力": 65, "id": 196 }
		}
	},
	"大鳳": {
		"読み": "タイホウ",
		"データ": {
			"無印": { "スロット": [18, 18, 18, 7], "艦種": "装甲空母", "改造": 0, "素火力": 49, "id": 153 },
			"改": { "スロット": [30, 24, 24, 8], "艦種": "装甲空母", "改造": 1, "素火力": 59, "id": 156 }
		}
	},
	"赤城": {
		"読み": "アカギ",
		"データ": {
			"無印": { "スロット": [18, 18, 27, 10], "艦種": "正規空母", "改造": 0, "素火力": 39, "id": 83 },
			"改": { "スロット": [20, 20, 32, 10], "艦種": "正規空母", "改造": 1, "素火力": 55, "id": 277 },
			"改二": { "スロット": [21, 21, 32, 12, 4], "艦種": "正規空母", "改造": 2, "素火力": 60, "id": 594 },
			"改二戊": { "スロット": [16, 16, 40, 4, 2], "艦種": "正規空母", "改造": 3, "素火力": 67, "id": 599 }
		}
	},
	"加賀": {
		"読み": "カガ",
		"データ": {
			"無印": { "スロット": [18, 18, 45, 12], "艦種": "正規空母", "改造": 0, "素火力": 39, "id": 84 },
			"改": { "スロット": [20, 20, 46, 12], "艦種": "正規空母", "改造": 1, "素火力": 50, "id": 278 },
			"改二": { "スロット": [20, 20, 44, 12, 3], "艦種": "正規空母", "改造": 2, "素火力": 56, "id": 698 },
			"改二戊": { "スロット": [18, 18, 40, 8, 2], "艦種": "正規空母", "改造": 3, "素火力": 62, "id": 610 },
			"改二護": { "スロット": [16, 16, 18, 8, 6], "艦種": "正規空母", "改造": 4, "素火力": 60, "id": 646 }
		}
	},
	"雲龍": {
		"読み": "ウンリュウ",
		"データ": {
			"無印": { "スロット": [18, 24, 3, 6], "艦種": "正規空母", "改造": 0, "素火力": 27, "id": 404 },
			"改": { "スロット": [18, 21, 27, 3], "艦種": "正規空母", "改造": 1, "素火力": 48, "id": 406 }
		}
	},
	"天城": {
		"読み": "アマギ",
		"データ": {
			"無印": { "スロット": [18, 24, 3, 6], "艦種": "正規空母", "改造": 0, "素火力": 25, "id": 331 },
			"改": { "スロット": [18, 21, 27, 3], "艦種": "正規空母", "改造": 1, "素火力": 45, "id": 429 }
		}
	},
	"葛城": {
		"読み": "カツラギ",
		"データ": {
			"無印": { "スロット": [18, 24, 3, 6], "艦種": "正規空母", "改造": 0, "素火力": 25, "id": 332 },
			"改": { "スロット": [18, 21, 27, 3], "艦種": "正規空母", "改造": 1, "素火力": 45, "id": 430 }
		}
	},
	"Graf Zeppelin": {
		"読み": "グラーフ・ツェッペリン",
		"データ": {
			"無印": { "スロット": [20, 13, 10], "艦種": "正規空母", "改造": 0, "素火力": 40, "id": 432 },
			"改": { "スロット": [30, 13, 10, 3], "艦種": "正規空母", "改造": 1, "素火力": 52, "id": 353 }
		}
	},
	"龍驤": {
		"読み": "リュウジョウ",
		"検索ワード": "rj",
		"データ": {
			"無印": { "スロット": [9, 24, 5], "艦種": "軽空母", "改造": 0, "素火力": 19, "id": 76 },
			"改": { "スロット": [9, 24, 5, 5], "艦種": "軽空母", "改造": 1, "素火力": 29, "id": 281 },
			"改二": { "スロット": [18, 28, 6, 3], "艦種": "軽空母", "改造": 2, "素火力": 40, "id": 157 }
		}
	},
	"隼鷹": {
		"読み": "ジュンヨウ",
		"データ": {
			"無印": { "スロット": [12, 18, 18, 10], "艦種": "軽空母", "改造": 0, "素火力": 19, "id": 92 },
			"改": { "スロット": [18, 18, 18, 12], "艦種": "軽空母", "改造": 1, "素火力": 29, "id": 284 },
			"改二": { "スロット": [24, 18, 20, 4], "艦種": "軽空母", "改造": 2, "素火力": 40, "id": 408 }
		}
	},
	"鳳翔": {
		"読み": "ホウショウ",
		"データ": {
			"無印": { "スロット": [8, 11], "艦種": "軽空母", "改造": 0, "素火力": 19, "id": 89 },
			"改": { "スロット": [14, 16, 12], "艦種": "軽空母", "改造": 1, "素火力": 29, "id": 285 }
		}
	},
	"飛鷹": {
		"読み": "ヒヨウ",
		"データ": {
			"無印": { "スロット": [12, 18, 18, 10], "艦種": "軽空母", "改造": 0, "素火力": 19, "id": 75 },
			"改": { "スロット": [18, 18, 18, 12], "艦種": "軽空母", "改造": 1, "素火力": 29, "id": 283 }
		}
	},
	"祥鳳": {
		"読み": "ショウホウ",
		"データ": {
			"無印": { "スロット": [18, 9, 3], "艦種": "軽空母", "改造": 0, "素火力": 19, "id": 74 },
			"改": { "スロット": [18, 12, 12, 6], "艦種": "軽空母", "改造": 1, "素火力": 29, "id": 282 }
		}
	},
	"瑞鳳": {
		"読み": "ズイホウ",
		"データ": {
			"無印": { "スロット": [18, 9, 3], "艦種": "軽空母", "改造": 0, "素火力": 19, "id": 116 },
			"改": { "スロット": [18, 12, 12, 6], "艦種": "軽空母", "改造": 1, "素火力": 29, "id": 117 },
			"改二": { "スロット": [21, 18, 12, 6], "艦種": "軽空母", "改造": 1, "素火力": 46, "id": 555 },
			"改二乙": { "スロット": [18, 15, 15, 2], "艦種": "軽空母", "改造": 1, "素火力": 48, "id": 560 }
		}
	},
	"大鯨": {
		"読み": "タイゲイ",
		"検索ワード": "リュウホウ",
		"データ": {
			"大鯨": { "スロット": [2, 3, 3], "艦種": "潜水母艦", "改造": 0, "名前変更": "大鯨", "id": 184 },
			"龍鳳": { "スロット": [18, 7, 6], "艦種": "軽空母", "改造": 1, "名前変更": "龍鳳", "素火力": 20, "id": 185 },
			"龍鳳改": { "スロット": [21, 9, 9, 6], "艦種": "軽空母", "改造": 2, "名前変更": "龍鳳改", "素火力": 32, "id": 318 },
			"龍鳳改二戊": { "スロット": [21, 21, 12, 3], "艦種": "軽空母", "改造": 3, "名前変更": "龍鳳改二戊", "素火力": 45, "id": 883 },
			"龍鳳改二": { "スロット": [21, 21, 14, 6], "艦種": "軽空母", "改造": 4, "名前変更": "龍鳳改二", "素火力": 47, "id": 888 }
		}
	},
	"千歳": {
		"読み": "チトセ",
		"データ": {
			"無印": { "スロット": [12, 12], "艦種": "水上機母艦", "改造": 0, "素火力": 29, "id": 102 },
			"改": { "スロット": [12, 6, 6], "艦種": "水上機母艦", "改造": 1, "素火力": 29, "id": 104 },
			"甲": { "スロット": [12, 6, 6], "艦種": "水上機母艦", "改造": 2, "素火力": 31, "id": 106 },
			"航": { "スロット": [21, 9, 6], "艦種": "軽空母", "改造": 3, "素火力": 19, "id": 108 },
			"航改": { "スロット": [24, 16, 8, 8], "艦種": "軽空母", "改造": 4, "素火力": 34, "id": 291 },
			"航改二": { "スロット": [24, 16, 11, 8], "艦種": "軽空母", "改造": 5, "素火力": 34, "id": 296 }
		}
	},
	"千代田": {
		"読み": "チヨダ",
		"データ": {
			"無印": { "スロット": [12, 12], "艦種": "水上機母艦", "改造": 0, "素火力": 29, "id": 103 },
			"改": { "スロット": [12, 6, 6], "艦種": "水上機母艦", "改造": 1, "素火力": 29, "id": 105 },
			"甲": { "スロット": [12, 6, 6], "艦種": "水上機母艦", "改造": 2, "素火力": 31, "id": 107 },
			"航": { "スロット": [21, 9, 6], "艦種": "軽空母", "改造": 3, "素火力": 19, "id": 109 },
			"航改": { "スロット": [24, 16, 8, 8], "艦種": "軽空母", "改造": 4, "素火力": 34, "id": 292 },
			"航改二": { "スロット": [24, 16, 11, 8], "艦種": "軽空母", "改造": 5, "素火力": 34, "id": 297 }
		}
	},
	"あきつ丸": {
		"読み": "アキツマル",
		"データ": {
			"改": { "スロット": [8, 8, 8], "艦種": "揚陸艦", "改造": 1, "id": 166 }
		}
	},
	"最上": {
		"読み": "モガミ",
		"データ": {
			"改": { "スロット": [5, 6, 5, 11], "艦種": "航空巡洋艦", "改造": 1, "id": 73 },
			"改二": { "スロット": [2, 2, 6, 14], "艦種": "航空巡洋艦", "改造": 2, "id": 501 },
			"改二特": { "スロット": [2, 2, 7, 3], "艦種": "航空巡洋艦", "改造": 2, "id": 506 },
		}
	},
	"三隈": {
		"読み": "ミクマ",
		"データ": {
			"改": { "スロット": [5, 6, 6, 9], "艦種": "航空巡洋艦", "改造": 1, "id": 121 }
		}
	},
	"鈴谷": {
		"読み": "スズヤ",
		"データ": {
			"改": { "スロット": [5, 6, 5, 6], "艦種": "航空巡洋艦", "改造": 1, "id": 129 },
			"改二": { "スロット": [3, 3, 7, 11], "艦種": "航空巡洋艦", "改造": 2, "id": 503 },
			"航改二": { "スロット": [17, 12, 12, 9], "艦種": "軽空母", "改造": 3, "素火力": 56, "id": 508 }
		}
	},
	"熊野": {
		"読み": "クマノ",
		"データ": {
			"改": { "スロット": [5, 6, 5, 6], "艦種": "航空巡洋艦", "改造": 1, "id": 130 },
			"改二": { "スロット": [3, 3, 7, 11], "艦種": "航空巡洋艦", "改造": 2, "id": 504 },
			"航改二": { "スロット": [17, 12, 12, 9], "艦種": "軽空母", "改造": 3, "素火力": 55, "id": 509 }
		}
	},
	"利根": {
		"読み": "トネ",
		"データ": {
			"改二": { "スロット": [2, 2, 9, 5], "艦種": "航空巡洋艦", "改造": 2, "id": 188 }
		}
	},
	"筑摩": {
		"読み": "チクマ",
		"データ": {
			"改二": { "スロット": [2, 2, 9, 5], "艦種": "航空巡洋艦", "改造": 2, "id": 189 }
		}
	},
	"伊勢": {
		"読み": "イセ",
		"データ": {
			"改": { "スロット": [11, 11, 11, 14], "艦種": "航空戦艦", "改造": 1, "id": 82 },
			"改二": { "スロット": [2, 2, 22, 22, 9], "艦種": "航空戦艦", "改造": 2, "表示艦種": "改装航空戦艦", "id": 553 }
		}
	},
	"日向": {
		"読み": "ヒュウガ",
		"データ": {
			"改": { "スロット": [11, 11, 11, 14], "艦種": "航空戦艦", "改造": 1, "id": 88 },
			"改二": { "スロット": [2, 8, 24, 12, 11], "艦種": "航空戦艦", "改造": 2, "表示艦種": "改装航空戦艦", "id": 554 }
		}
	},
	"扶桑": {
		"読み": "フソウ",
		"データ": {
			"改": { "スロット": [10, 10, 10, 10], "艦種": "航空戦艦", "改造": 1, "id": 286 },
			"改二": { "スロット": [4, 4, 9, 23], "艦種": "航空戦艦", "改造": 2, "id": 411 }
		}
	},
	"山城": {
		"読み": "ヤマシロ",
		"データ": {
			"改": { "スロット": [10, 10, 10, 10], "艦種": "航空戦艦", "改造": 1, "id": 287 },
			"改二": { "スロット": [4, 4, 9, 23], "艦種": "航空戦艦", "改造": 2, "id": 412 }
		}
	},
	"瑞穂": {
		"読み": "ミズホ",
		"データ": {
			"無印": { "スロット": [12, 12], "艦種": "水上機母艦", "改造": 0, "id": 451 },
			"改": { "スロット": [12, 12, 8], "艦種": "水上機母艦", "改造": 1, "id": 348 }
		}
	},
	"秋津洲": {
		"読み": "アキツシマ",
		"データ": {
			"無印": { "スロット": [1, 1], "艦種": "水上機母艦", "改造": 0, "id": 445 },
			"改": { "スロット": [1, 1, 1], "艦種": "水上機母艦", "改造": 1, "id": 450 }
		}
	},
	"伊19": {
		"読み": "イ19",
		"データ": {
			"改": { "スロット": [1, 1], "艦種": "潜水空母", "改造": 1, "id": 401 }
		}
	},
	"伊58": {
		"読み": "イ58",
		"データ": {
			"改": { "スロット": [1, 1], "艦種": "潜水空母", "改造": 1, "id": 399 }
		}
	},
	"伊8": {
		"読み": "イ8",
		"データ": {
			"改": { "スロット": [1, 1], "艦種": "潜水空母", "改造": 1, "id": 400 }
		}
	},
	"伊401": {
		"読み": "イ401",
		"データ": {
			"無印": { "スロット": [3], "艦種": "潜水空母", "改造": 0, "id": 155 },
			"改": { "スロット": [3, 3], "艦種": "潜水空母", "改造": 1, "id": 403 }
		}
	},
	"伊26": {
		"読み": "イ26",
		"データ": {
			"改": { "スロット": [1, 1], "艦種": "潜水空母", "改造": 1, "id": 367 }
		}
	},
	"伊13": {
		"読み": "イ13",
		"データ": {
			"無印": { "スロット": [2, 0], "艦種": "潜水空母", "改造": 0, "id": 494 },
			"改": { "スロット": [2, 1, 0], "艦種": "潜水空母", "改造": 1, "id": 374 }
		}
	},
	"伊14": {
		"読み": "イ14",
		"データ": {
			"無印": { "スロット": [2, 0], "艦種": "潜水空母", "改造": 0, "id": 495 },
			"改": { "スロット": [2, 1, 0], "艦種": "潜水空母", "改造": 1, "id": 375 }
		}
	},
	"速吸": {
		"読み": "ハヤスイ",
		"データ": {
			"無印": { "スロット": [6, 1], "艦種": "補給艦", "改造": 0, "id": 460 },
			"改": { "スロット": [6, 3, 1], "艦種": "補給艦", "改造": 1, "素火力": 36, "id": 352 }
		}
	},
	"Zara": {
		"読み": "ザラ",
		"データ": {
			"改": { "スロット": [2, 2, 2, 2], "艦種": "重巡洋艦", "改造": 1, "id": 358 },
			"due": { "スロット": [6, 3, 3, 3], "艦種": "重巡洋艦", "改造": 2, "名前変更": "Zara due", "id": 496 }
		}
	},
	"Pola": {
		"読み": "ポーラ",
		"データ": {
			"改": { "スロット": [2, 2, 2, 2], "艦種": "重巡洋艦", "改造": 1, "id": 361 }
		}
	},
	"Littorio": {
		"読み": "リットリオ",
		"データ": {
			"Italia": { "スロット": [3, 3, 3, 3], "艦種": "戦艦", "改造": 1, "名前変更": "Italia", "id": 446 }
		}
	},
	"Roma": {
		"読み": "ローマ",
		"データ": {
			"改": { "スロット": [3, 3, 3, 3], "艦種": "戦艦", "改造": 1, "id": 447 }
		}
	},
	"大和": {
		"読み": "ヤマト",
		"データ": {
			"改": { "スロット": [7, 7, 7, 8], "艦種": "戦艦", "改造": 1, "id": 136 },
			"改二": { "スロット": [4, 4, 4, 8, 2], "艦種": "戦艦", "改造": 2, "id": 511 },
			"改二重": { "スロット": [2, 2, 8, 22, 2], "艦種": "航空戦艦", "改造": 3, "id": 516 },
		}
	},
	"武蔵": {
		"読み": "ムサシ",
		"データ": {
			"改": { "スロット": [7, 7, 7, 7], "艦種": "戦艦", "改造": 1, "id": 148 },
			"改二": { "スロット": [5, 5, 5, 8, 5], "艦種": "戦艦", "改造": 2, "id": 546 }
		}
	},
	"長門": {
		"読み": "ナガト",
		"データ": {
			"改": { "スロット": [3, 3, 3, 3], "艦種": "戦艦", "改造": 1, "id": 275 },
			"改二": { "スロット": [3, 3, 6, 3], "艦種": "戦艦", "改造": 2, "id": 541 }
		}
	},
	"陸奥": {
		"読み": "ムツ",
		"データ": {
			"改": { "スロット": [3, 3, 3, 3], "艦種": "戦艦", "改造": 1, "id": 276 },
			"改二": { "スロット": [2, 3, 3, 7], "艦種": "戦艦", "改造": 2, "id": 573 }
		}
	},
	"金剛": {
		"読み": "コンゴウ",
		"データ": {
			"改二丙": { "スロット": [2, 2, 3, 6], "艦種": "戦艦", "改造": 3, "id": 591 }
		}
	},
	"比叡": {
		"読み": "ヒエイ",
		"データ": {
			"改二丙": { "スロット": [2, 2, 2, 2], "艦種": "戦艦", "改造": 3, "id": 592 }
		}
	},
	"Richelieu": {
		"読み": "リシュリュー",
		"データ": {
			"改": { "スロット": [3, 3, 3, 3], "艦種": "戦艦", "改造": 1, "id": 392 }
		}
	},
	"基地航空隊": {
		"読み": "キチコウクウタイ",
		"データ": {
			"出撃": { "スロット": [18, 18, 18, 18], "艦種": "基地航空隊", "改造": 1, "名前変更": "基地航空隊" },
			"防空": { "スロット": [18, 18, 18, 18], "艦種": "基地航空隊", "改造": 1, "名前変更": "基地航空隊(防空)", "Wikiリンク": "基地航空隊" }
		}
	},
	"Aquila": {
		"読み": "アクィラ",
		"データ": {
			"無印": { "スロット": [10, 26, 15], "艦種": "正規空母", "改造": 0, "素火力": 14, "id": 444 },
			"改": { "スロット": [15, 26, 15, 10], "艦種": "正規空母", "改造": 1, "素火力": 31, "id": 365 }
		}
	},
	"Commandant Teste": {
		"読み": "コマンダン・テスト",
		"データ": {
			"無印": { "スロット": [12, 7, 7], "艦種": "水上機母艦", "改造": 0, "id": 491 },
			"改": { "スロット": [12, 12, 7, 7], "艦種": "水上機母艦", "改造": 1, "id": 372 }
		}
	},
	"Saratoga": {
		"読み": "サラトガ",
		"データ": {
			"無印": { "スロット": [27, 19, 19, 15], "艦種": "正規空母", "改造": 0, "素火力": 45, "id": 433 },
			"改": { "スロット": [36, 18, 18, 18], "艦種": "正規空母", "改造": 1, "素火力": 53, "id": 438 },
			"Mk.II": { "スロット": [32, 24, 18, 6], "艦種": "正規空母", "改造": 2, "名前変更": "Saratoga Mk.II", "素火力": 68, "id": 545 },
			"Mk.II Mod.2": { "スロット": [37, 24, 19, 13], "艦種": "装甲空母", "改造": 3, "名前変更": "Saratoga Mk.II Mod.2", "素火力": 58, "id": 550 }
		}
	},
	"春日丸": {
		"読み": "カスガマル",
		"検索ワード": "タイヨウ",
		"データ": {
			"無印": { "スロット": [14, 9], "艦種": "軽空母", "改造": 0, "素火力": 9, "id": 521 },
			"大鷹": { "スロット": [14, 11, 2], "艦種": "軽空母", "改造": 1, "名前変更": "大鷹", "素火力": 12, "id": 526 },
			"大鷹改": { "スロット": [14, 14, 5, 3], "艦種": "軽空母", "改造": 2, "名前変更": "大鷹改", "素火力": 23, "id": 380 },
			"大鷹改二": { "スロット": [14, 14, 8, 3], "艦種": "軽空母", "改造": 3, "名前変更": "大鷹改二", "素火力": 39, "id": 529 }
		}
	},
	"八幡丸": {
		"読み": "ヤワタマル",
		"検索ワード": "ウンヨウ",
		"データ": {
			"無印": { "スロット": [14, 9], "艦種": "軽空母", "改造": 0, "素火力": 10, "id": 522 },
			"雲鷹": { "スロット": [14, 11, 2], "艦種": "軽空母", "改造": 1, "名前変更": "雲鷹", "素火力": 13, "id": 884 },
			"雲鷹改": { "スロット": [14, 19, 2, 2], "艦種": "軽空母", "改造": 2, "名前変更": "雲鷹改", "素火力": 24, "id": 382 },
			"雲鷹改二": { "スロット": [14, 20, 5, 2], "艦種": "軽空母", "改造": 3, "名前変更": "雲鷹改二", "素火力": 39, "id": 889 }
		}
	},
	"神鷹": {
		"読み": "シンヨウ",
		"データ": {
			"無印": { "スロット": [9, 18, 6], "艦種": "軽空母", "改造": 0, "素火力": 14, "id": 534 },
			"改": { "スロット": [9, 18, 6, 3], "艦種": "軽空母", "改造": 1, "素火力": 24, "id": 381 },
			"改二": { "スロット": [9, 18, 18, 6], "艦種": "軽空母", "改造": 2, "素火力": 37, "id": 536 }
		}
	},
	"神威": {
		"読み": "カモイ",
		"データ": {
			"改": { "スロット": [11, 8, 3], "艦種": "水上機母艦", "改造": 1, "id": 499 },
			"改母": { "スロット": [1, 1, 1], "艦種": "補給艦", "改造": 2, "id": 500 }
		}
	},
	"由良": {
		"読み": "ユラ",
		"データ": {
			"改二": { "スロット": [1, 2, 1], "艦種": "軽巡洋艦", "改造": 2, "id": 488 }
		}
	},
	"球磨": {
		"読み": "クマ",
		"データ": {
			"改二": { "スロット": [1, 1, 1], "艦種": "軽巡洋艦", "改造": 2, "id": 652 }
		}
	},
	"多摩": {
		"読み": "タマ",
		"データ": {
			"改二": { "スロット": [1, 1, 1], "艦種": "軽巡洋艦", "改造": 2, "id": 547 }
		}
	},
	"阿賀野": {
		"読み": "アガノ",
		"データ": {
			"改": { "スロット": [2, 2, 2], "艦種": "軽巡洋艦", "改造": 1, "id": 305 }
		}
	},
	"能代": {
		"読み": "ノシロ",
		"データ": {
			"改": { "スロット": [2, 2, 2], "艦種": "軽巡洋艦", "改造": 1, "id": 306 },
			"改二": { "スロット": [1, 1, 4, 2], "艦種": "軽巡洋艦", "改造": 2, "id": 662 }
		}
	},
	"矢矧": {
		"読み": "ヤハギ",
		"データ": {
			"改": { "スロット": [2, 2, 2], "艦種": "軽巡洋艦", "改造": 1, "id": 307 },
			"改二": { "スロット": [1, 1, 4, 2], "艦種": "軽巡洋艦", "改造": 1, "id": 663 },
			"改二乙": { "スロット": [1, 1, 2, 2], "艦種": "軽巡洋艦", "改造": 1, "id": 668 }
		}
	},
	"酒匂": {
		"読み": "サカワ",
		"データ": {
			"改": { "スロット": [2, 2, 2], "艦種": "軽巡洋艦", "改造": 1, "id": 314 }
		}
	},
	"Ark Royal": {
		"読み": "アークロイヤル",
		"データ": {
			"無印": { "スロット": [18, 30, 12, 12], "艦種": "正規空母", "改造": 0, "素火力": 27, "id": 515 },
			"改": { "スロット": [24, 32, 12, 12], "艦種": "正規空母", "改造": 1, "素火力": 51, "id": 393 }
		}
	},
	"伊400": {
		"読み": "イ400",
		"データ": {
			"無印": { "スロット": [3], "艦種": "潜水空母", "改造": 0, "id": 493 },
			"改": { "スロット": [3, 3], "艦種": "潜水空母", "改造": 1, "id": 606 }
		}
	},
	"Gambier Bay": {
		"読み": "ガンビア・ベイ",
		"データ": {
			"無印": { "スロット": [16, 12], "艦種": "軽空母", "改造": 0, "素火力": 15, "id": 544 },
			"改": { "スロット": [16, 12, 6], "艦種": "軽空母", "改造": 1, "素火力": 32, "id": 396 },
			"Mk.II": { "スロット": [24, 20, 4, 1], "艦種": "軽空母", "改造": 2, "素火力": 55, "id": 707, "名前変更": "Gambier Bay Mk.II" },
		}
	},
	"Intrepid": {
		"読み": "イントレピッド",
		"データ": {
			"無印": { "スロット": [37, 36, 19, 4], "艦種": "正規空母", "改造": 0, "素火力": 55, "id": 549 },
			"改": { "スロット": [40, 36, 21, 15], "艦種": "正規空母", "改造": 1, "素火力": 58, "id": 397 }
		}
	},
	"Gotland": {
		"読み": "ゴトランド",
		"データ": {
			"無印": { "スロット": [2, 3, 6], "艦種": "軽巡洋艦", "改造": 0, "表示艦種": "軽(航空)巡洋艦", "id": 574 },
			"改": { "スロット": [1, 1, 1, 1], "艦種": "軽巡洋艦", "改造": 1, "id": 579 },
			"andra": { "スロット": [2, 2, 3, 7], "艦種": "軽巡洋艦", "改造": 2, "表示艦種": "軽(航空)巡洋艦", "名前変更": "Gotland andra", "id": 630 }
		}
	},
	"日進": {
		"読み": "ニッシン",
		"データ": {
			"無印": { "スロット": [8, 8, 12], "艦種": "水上機母艦", "改造": 0, "id": 581 },
			"改": { "スロット": [8, 8, 12], "艦種": "水上機母艦", "改造": 1, "id": 690 },
			"甲": { "スロット": [8, 8, 12, 4], "艦種": "水上機母艦", "改造": 2, "id": 586 }
		}
	},
	"神州丸": {
		"読み": "シンシュウマル",
		"データ": {
			"無印": { "スロット": [2, 2, 8], "艦種": "揚陸艦", "改造": 0, "id": 621 },
			"改": { "スロット": [2, 2, 4, 8], "艦種": "揚陸艦", "改造": 1, "id": 626 }
		}
	},
	"迅鯨": {
		"読み": "ジンゲイ",
		"データ": {
			"無印": { "スロット": [1, 1], "艦種": "潜水母艦", "改造": 0, "id": 634 },
			"改": { "スロット": [2, 2, 2], "艦種": "潜水母艦", "改造": 1, "id": 639 }
		}
	},
	"Hornet": {
		"読み": "ホーネット",
		"データ": {
			"無印": { "スロット": [36, 18, 18, 15], "艦種": "正規空母", "改造": 0, "素火力": 45, "id": 603 },
			"改": { "スロット": [36, 19, 19, 16], "艦種": "正規空母", "改造": 1, "素火力": 55, "id": 704 }
		}
	},
	"長鯨": {
		"読み": "チョウゲイ",
		"データ": {
			"無印": { "スロット": [1, 1], "艦種": "潜水母艦", "改造": 0, "id": 435 },
			"改": { "スロット": [2, 2, 2], "艦種": "潜水母艦", "改造": 1, "id": 440 },
		}
	},
	"Conte di Cavour": {
		"読み": "カブール",
		"データ": {
			"nuovo": { "スロット": [1, 1, 3, 4], "艦種": "戦艦", "改造": 2, "id": 479, "名前変更": "Conte di Cavour nuovo" },
		}
	},
	"Victorious": {
		"読み": "ヴィクトリアス",
		"データ": {
			"無印": { "スロット": [14, 14, 12, 9], "艦種": "装甲空母", "改造": 0, "id": 885, "素火力": 38 },
			"改": { "スロット": [18, 18, 19, 2], "艦種": "装甲空母", "改造": 1, "id": 713, "素火力": 55 },
		}
	},
	"山汐丸": {
		"読み": "ヤマシオマル",
		"データ": {
			"改": { "スロット": [8, 6, 2], "艦種": "補給艦", "改造": 1, "id": 717, "素火力": 23, "表示艦種": "特設護衛空母" },
		}
	}
}

const 装備種 = ["装備なし", "艦上戦闘機", "陸上攻撃機", "大型陸上機", "局地戦闘機", "陸軍戦闘機", "艦上偵察機", "陸上偵察機", "水上偵察機", "大型飛行艇", "噴式戦闘爆撃機", "艦上爆撃機", "艦上攻撃機", "水上爆撃機", "水上戦闘機"];
const 艦戦データ = {


	"-": { "対空値": 0, "種類": "装備なし" },

	//艦戦
	"九六式艦戦": { "対空値": 3, "種類": "艦上戦闘機", "半径": 3, "コスト": 3, "id": 19 },
	"九六式艦戦改": { "対空値": 4, "種類": "艦上戦闘機", "半径": 4, "コスト": 3, "id": 228 },
	"零式艦戦21型": { "対空値": 5, "種類": "艦上戦闘機", "半径": 7, "コスト": 4, "id": 20 },
	"零式艦戦21型(熟練)": { "対空値": 8, "種類": "艦上戦闘機", "半径": 7, "コスト": 4, "id": 96 },
	"零戦21型(付岩本小隊)": { "対空値": 9, "種類": "艦上戦闘機", "半径": 7, "コスト": 5, "id": 155 },
	"零式艦戦32型": { "対空値": 5, "種類": "艦上戦闘機", "半径": 5, "コスト": 4, "id": 181 },
	"零式艦戦32型(熟練)": { "対空値": 8, "種類": "艦上戦闘機", "半径": 5, "コスト": 4, "id": 182 },
	"零式艦戦52型": { "対空値": 6, "種類": "艦上戦闘機", "半径": 6, "コスト": 5, "id": 21 },
	"零式艦戦52型(熟練)": { "対空値": 9, "種類": "艦上戦闘機", "半径": 6, "コスト": 5, "id": 152 },
	"零戦52型丙(六〇一空)": { "対空値": 9, "種類": "艦上戦闘機", "半径": 6, "コスト": 5, "id": 109 },
	"零戦52型丙(付岩井小隊)": { "対空値": 10, "種類": "艦上戦闘機", "半径": 6, "コスト": 5, "id": 153 },
	"零戦52型甲(付岩本小隊)": { "対空値": 11, "種類": "艦上戦闘機", "半径": 6, "コスト": 5, "id": 156 },
	"零式艦戦53型(岩本隊)": { "対空値": 12, "種類": "艦上戦闘機", "半径": 6, "コスト": 6, "id": 157 },
	"紫電改二": { "対空値": 9, "種類": "艦上戦闘機", "半径": 3, "コスト": 6, "id": 55 },
	"紫電改四": { "対空値": 10, "種類": "艦上戦闘機", "半径": 4, "コスト": 7, "id": 271 },
	"試製烈風 後期型": { "対空値": 10, "種類": "艦上戦闘機", "半径": 5, "コスト": 7, "id": 22 },
	"烈風(六〇一空)": { "対空値": 11, "種類": "艦上戦闘機", "半径": 5, "コスト": 7, "id": 110 },
	"烈風 一一型": { "対空値": 12, "種類": "艦上戦闘機", "半径": 5, "コスト": 8, "id": 53 },
	"烈風改(試製艦載型)": { "対空値": 10, "種類": "艦上戦闘機", "火力": 3, "半径": 4, "コスト": 10, "id": 335 },
	"烈風改二": { "対空値": 13, "種類": "艦上戦闘機", "火力": 1, "半径": 5, "コスト": 10, "id": 336 },
	"烈風改二戊型": { "対空値": 11, "種類": "艦上戦闘機", "火力": 2, "半径": 5, "夜間航空機": true, "コスト": 11, "id": 338 },
	"烈風改二戊型(一航戦/熟練)": { "対空値": 12, "種類": "艦上戦闘機", "火力": 3, "半径": 6, "夜間航空機": true, "コスト": 11, "id": 339 },
	"震電改": { "対空値": 15, "種類": "艦上戦闘機", "半径": 2, "コスト": 9, "id": 56 },
	"Bf109T改": { "対空値": 8, "種類": "艦上戦闘機", "半径": 2, "コスト": 6, "id": 158 },
	"Fw190T改": { "対空値": 10, "火力": 2, "種類": "艦上戦闘機", "半径": 3, "コスト": 6, "id": 159 },
	"Fw190 A-5改(熟練)": { "対空値": 11, "火力": 2, "種類": "艦上戦闘機", "半径": 4, "コスト": 7, "id": 353 },
	"Re.2001 OR改": { "対空値": 6, "種類": "艦上戦闘機", "半径": 4, "火力": 3, "コスト": 6, "id": 184 },
	"Re.2005 改": { "対空値": 11, "種類": "艦上戦闘機", "半径": 3, "火力": 1, "コスト": 6, "id": 189 },
	"F4F-3": { "対空値": 4, "種類": "艦上戦闘機", "半径": 4, "コスト": 5, "id": 197 },
	"F4F-4": { "対空値": 5, "種類": "艦上戦闘機", "半径": 4, "コスト": 6, "id": 198 },
	"F6F-3": { "対空値": 8, "種類": "艦上戦闘機", "半径": 5, "コスト": 8, "id": 205 },
	"F6F-3N": { "対空値": 8, "種類": "艦上戦闘機", "半径": 5, "夜間航空機": true, "コスト": 9, "id": 254 },
	"F6F-5": { "対空値": 10, "種類": "艦上戦闘機", "半径": 5, "コスト": 8, "id": 206 },
	"F6F-5N": { "対空値": 10, "種類": "艦上戦闘機", "半径": 5, "夜間航空機": true, "コスト": 9, "id": 255 },
	"Fulmar": { "対空値": 3, "火力": 1, "種類": "艦上戦闘機", "半径": 4, "コスト": 5, "id": 249 },
	"Seafire Mk.III改": { "対空値": 9, "火力": 1, "種類": "艦上戦闘機", "半径": 4, "コスト": 6, "id": 252 },
	"XF5U": { "対空値": 12, "種類": "艦上戦闘機", "半径": 4, "コスト": 12, "id": 375 },
	"FR-1 Fireball": { "対空値": 11, "種類": "艦上戦闘機", "半径": 5, "id": 422 },
	"Corsair Mk.II": { "対空値": 10, "火力": 1, "種類": "艦上戦闘機", "半径": 6, "id": 434 },
	"Corsair Mk.II(Ace)": { "対空値": 11, "火力": 2, "種類": "艦上戦闘機", "半径": 6, "id": 435 },
	"試製 陣風": { "対空値": 13, "種類": "艦上戦闘機", "半径": 5, "id": 437 },

	//陸攻
	"九六式陸攻": { "対空値": 1, "種類": "陸上攻撃機", "半径": 8, "コスト": 10, "id": 168 },
	"一式陸攻": { "対空値": 2, "種類": "陸上攻撃機", "半径": 9, "コスト": 12, "id": 169 },
	"一式陸攻(野中隊)": { "対空値": 3, "種類": "陸上攻撃機", "半径": 9, "コスト": 12, "id": 170 },
	"一式陸攻 二二型甲": { "対空値": 3, "種類": "陸上攻撃機", "半径": 10, "コスト": 12, "id": 180 },
	"一式陸攻 三四型": { "対空値": 4, "種類": "陸上攻撃機", "半径": 8, "コスト": 12, "id": 186 },
	"銀河": { "対空値": 3, "種類": "陸上攻撃機", "半径": 9, "コスト": 13, "id": 187 },
	"銀河(江草隊)": { "対空値": 3, "種類": "陸上攻撃機", "半径": 7, "コスト": 13, "id": 388 },
	"爆装一式戦 隼III型改(65戦隊)": { "対空値": 6, "種類": "陸上攻撃機", "半径": 5, "コスト": 4, "id": 224 },
	"Do 17 Z-2": { "対空値": 2, "種類": "陸上攻撃機", "半径": 4, "コスト": 13, "id": 401 },
	"Do 217 E-5+Hs293初期型": { "対空値": 4, "種類": "陸上攻撃機", "半径": 4, "コスト": 15, "id": 405 },
	"Do 217 K-2+Fritz-X": { "対空値": 4, "種類": "陸上攻撃機", "半径": 4, "コスト": 17, "id": 406 },
	"四式重爆 飛龍": { "対空値": 5, "種類": "陸上攻撃機", "半径": 5, "コスト": 14, "id": 403 },
	"四式重爆 飛龍(熟練)": { "対空値": 5, "種類": "陸上攻撃機", "半径": 5, "コスト": 14, "id": 404 },
	"四式重爆 飛龍+イ号一型甲 誘導弾": { "対空値": 5, "種類": "陸上攻撃機", "半径": 5, "id": 444, "コスト": 15 },
	"SM.79": { "対空値": 2, "種類": "陸上攻撃機", "半径": 7, "id": 431, "コスト": 11 },
	"SM.79 bis": { "対空値": 3, "種類": "陸上攻撃機", "半径": 8, "id": 432, "コスト": 13 },
	"SM.79 bis(熟練)": { "対空値": 3, "種類": "陸上攻撃機", "半径": 8, "id": 433, "コスト": 14 },
	"キ102乙": { "対空値": 4, "種類": "陸上攻撃機", "半径": 4, "id": 453, "コスト": 9 },
	"キ102乙改+イ号一型乙 誘導弾": { "対空値": 3, "種類": "陸上攻撃機", "半径": 3, "id": 454, },
	"B-25": { "対空値": 4, "種類": "陸上攻撃機", "半径": 7, "id": 459 },

	//重爆
	"深山": { "対空値": 1, "種類": "大型陸上機", "半径": 10, "コスト": 20, "id": 395 },
	"深山改": { "対空値": 2, "種類": "大型陸上機", "半径": 11, "コスト": 21, "id": 396 },

	//局戦
	"雷電": { "対空値": 6, "種類": "局地戦闘機", "迎撃": 2, "対爆": 5, "半径": 2, "コスト": 6, "id": 175 },
	"紫電一一型": { "対空値": 8, "種類": "局地戦闘機", "迎撃": 1, "対爆": 1, "半径": 3, "コスト": 6, "id": 201 },
	"紫電二一型 紫電改": { "対空値": 9, "種類": "局地戦闘機", "迎撃": 3, "対爆": 1, "半径": 4, "コスト": 6, "id": 202 },
	"紫電改(三四三空) 戦闘301": { "対空値": 11, "種類": "局地戦闘機", "迎撃": 4, "対爆": 2, "半径": 4, "コスト": 6, "id": 263 },
	"烈風改": { "対空値": 10, "種類": "局地戦闘機", "迎撃": 2, "対爆": 6, "半径": 4, "コスト": 9, "id": 333 },
	"烈風改(三五二空/熟練)": { "対空値": 11, "種類": "局地戦闘機", "迎撃": 3, "対爆": 7, "半径": 4, "コスト": 9, "id": 334 },
	"Fw190 D-9": { "対空値": 12, "種類": "局地戦闘機", "迎撃": 3, "対爆": 3, "半径": 3, "コスト": 8, "id": 354 },

	"試製 秋水": { "対空値": 2, "種類": "局地戦闘機", "迎撃": 0, "対爆": 8, "半径": 1, "ロケット": true, "コスト": 4, "id": 351 },
	"秋水": { "対空値": 3, "種類": "局地戦闘機", "迎撃": 0, "対爆": 9, "半径": 1, "ロケット": true, "コスト": 4, "id": 352 },
	"Me163B": { "対空値": 2, "種類": "局地戦闘機", "迎撃": 0, "対爆": 9, "半径": 1, "ロケット": true, "コスト": 4, "id": 350 },

	"零式艦戦21型(台南空)": { "対空値": 11, "種類": "局地戦闘機", "迎撃": 3, "対爆": 1, "半径": 7, "id": 416 },
	"零式艦戦32型(台南空)": { "対空値": 12, "種類": "局地戦闘機", "迎撃": 4, "対爆": 1, "半径": 5, "id": 417 },
	"零式艦戦22型(251空)": { "対空値": 12, "種類": "局地戦闘機", "迎撃": 3, "対爆": 1, "半径": 7, "id": 418 },

	//陸戦
	"三式戦 飛燕": { "対空値": 8, "種類": "陸軍戦闘機", "迎撃": 3, "対爆": 1, "半径": 3, "コスト": 7, "id": 176 },
	"三式戦 飛燕一型丁": { "対空値": 9, "種類": "陸軍戦闘機", "迎撃": 3, "対爆": 2, "半径": 4, "コスト": 7, "id": 185 },
	"三式戦 飛燕(飛行第244戦隊)": { "対空値": 9, "種類": "陸軍戦闘機", "迎撃": 4, "対爆": 3, "半径": 4, "コスト": 7, "id": 177 },
	"一式戦 隼II型": { "対空値": 6, "種類": "陸軍戦闘機", "迎撃": 2, "半径": 6, "コスト": 4, "id": 221 },
	"一式戦 隼III型甲": { "対空値": 7, "種類": "陸軍戦闘機", "迎撃": 3, "対爆": 1, "半径": 6, "コスト": 4, "id": 222 },
	"一式戦 隼III型甲(54戦隊)": { "対空値": 8, "種類": "陸軍戦闘機", "迎撃": 3, "対爆": 1, "半径": 7, "コスト": 4, "id": 223 },
	"一式戦 隼II型(64戦隊)": { "対空値": 11, "種類": "陸軍戦闘機", "迎撃": 5, "対爆": 1, "半径": 7, "コスト": 4, "id": 225 },
	"四式戦 疾風": { "対空値": 10, "種類": "陸軍戦闘機", "迎撃": 1, "対爆": 1, "半径": 5, "コスト": 7, "id": 218 },
	"Spitfire Mk.I": { "対空値": 7, "種類": "陸軍戦闘機", "迎撃": 1, "対爆": 2, "半径": 4, "コスト": 5, "id": 250 },
	"Spitfire Mk.V": { "対空値": 9, "種類": "陸軍戦闘機", "迎撃": 2, "対爆": 3, "半径": 5, "コスト": 5, "id": 251 },
	"Spitfire Mk.IX(熟練)": { "対空値": 10, "種類": "陸軍戦闘機", "迎撃": 4, "対爆": 2, "半径": 4, "コスト": 6, "id": 253 },
	"二式複戦 屠龍": { "対空値": 3, "種類": "陸軍戦闘機", "迎撃": 1, "対爆": 4, "半径": 3, "id": 445, "コスト": 8 },
	"二式複戦 屠龍 丙型": { "対空値": 3, "種類": "陸軍戦闘機", "迎撃": 2, "対爆": 6, "半径": 3, "id": 446, "コスト": 9 },
	"キ96": { "対空値": 5, "種類": "陸軍戦闘機", "迎撃": 4, "対爆": 5, "半径": 3, "id": 452, "コスト": 10 },


	//艦偵
	"彩雲": { "対空値": 0, "種類": "艦上偵察機", "索敵値": 9, "半径": 8, "コスト": 9, "id": 54 },
	"彩雲(東カロリン空)": { "対空値": 0, "種類": "艦上偵察機", "索敵値": 10, "半径": 8, "コスト": 9, "id": 212 },
	"彩雲(偵四)": { "対空値": 2, "種類": "艦上偵察機", "索敵値": 10, "半径": 7, "コスト": 9, "id": 273 },
	"二式艦上偵察機": { "対空値": 1, "種類": "艦上偵察機", "索敵値": 7, "半径": 5, "コスト": 6, "id": 61 },
	"試製景雲(艦偵型)": { "対空値": 0, "種類": "艦上偵察機", "索敵値": 11, "半径": 8, "コスト": 12, "id": 151 },
	"Fulmar(戦闘偵察/熟練)": { "対空値": 4, "火力": 2, "種類": "艦上偵察機", "半径": 4, "id": 423 },

	//陸偵
	"二式陸上偵察機": { "対空値": 3, "種類": "陸上偵察機", "索敵値": 8, "半径": 8, "コスト": 7, "id": 311 },
	"二式陸上偵察機(熟練)": { "対空値": 3, "種類": "陸上偵察機", "索敵値": 9, "半径": 9, "コスト": 7, "id": 312 },

	//水偵
	"零式水上偵察機": { "対空値": 1, "種類": "水上偵察機", "索敵値": 5, "半径": 7, "コスト": 5, "id": 25 },
	"零式水上観測機": { "対空値": 2, "種類": "水上偵察機", "索敵値": 6, "半径": 3, "コスト": 6, "id": 59 },
	"零式水上偵察機11型乙": { "対空値": 1, "種類": "水上偵察機", "索敵値": 6, "半径": 7, "コスト": 5, "id": 238 },
	"零式水上偵察機11型乙(熟練)": { "対空値": 1, "種類": "水上偵察機", "索敵値": 8, "半径": 7, "コスト": 5, "id": 239 },
	"紫雲": { "対空値": 0, "種類": "水上偵察機", "索敵値": 8, "半径": 4, "コスト": 9, "id": 118 },
	"Ro.43水偵": { "対空値": 1, "種類": "水上偵察機", "索敵値": 4, "半径": 3, "コスト": 4, "id": 163 },
	"九八式水上偵察機(夜偵)": { "対空値": 0, "種類": "水上偵察機", "索敵値": 3, "半径": 6, "コスト": 8, "id": 102 },
	"Ar196改": { "対空値": 1, "種類": "水上偵察機", "索敵値": 5, "半径": 3, "コスト": 5, "id": 115 },
	"OS2U": { "対空値": 1, "種類": "水上偵察機", "索敵値": 6, "半径": 3, "コスト": 6, "id": 171 },
	"SOC Seagull": { "対空値": 0, "種類": "水上偵察機", "索敵値": 4, "半径": 3, "id": 414 },
	"SO3C Seamew改": { "対空値": 1, "種類": "水上偵察機", "索敵値": 7, "半径": 4, "id": 415 },

	//飛行艇
	"二式大艇": { "対空値": 0, "種類": "大型飛行艇", "索敵値": 12, "半径": 20, "コスト": 25, "id": 138 },
	"PBY-5A Catalina": { "対空値": 0, "種類": "大型飛行艇", "索敵値": 9, "半径": 10, "コスト": 13, "id": 178 },

	//噴式戦
	"噴式景雲改": { "対空値": 6, "爆装": 15, "種類": "噴式戦闘爆撃機", "半径": 3, "コスト": 14, "id": 199 },
	"橘花改": { "対空値": 12, "爆装": 11, "種類": "噴式戦闘爆撃機", "半径": 2, "コスト": 13, "id": 200 },

	//艦爆
	"艦爆": { "対空値": 0, "爆装": 10, "種類": "艦上爆撃機", "半径": 99 },
	"彗星(江草隊)": { "対空値": 1, "爆装": 13, "種類": "艦上爆撃機", "半径": 5, "コスト": 5, "id": 100 },
	"彗星二二型(六三四空)": { "対空値": 1, "爆装": 11, "種類": "艦上爆撃機", "半径": 5, "コスト": 5, "id": 291 },
	"彗星二二型(六三四空/熟練)": { "対空値": 2, "爆装": 12, "種類": "艦上爆撃機", "半径": 6, "コスト": 5, "id": 292 },
	"彗星一二型(六三四空/三号爆弾搭載機)": { "対空値": 3, "爆装": 12, "種類": "艦上爆撃機", "半径": 5, "コスト": 5, "id": 319 },
	"九九式艦爆(熟練)": { "対空値": 1, "爆装": 7, "種類": "艦上爆撃機", "半径": 4, "コスト": 4, "id": 97 },
	"九九式艦爆二二型(熟練)": { "対空値": 1, "爆装": 8, "種類": "艦上爆撃機", "半径": 3, "id": 392 },
	"試製南山": { "対空値": 1, "爆装": 11, "種類": "艦上爆撃機", "半径": 5, "コスト": 9, "id": 148 },
	"零式艦戦62型(爆戦)": { "対空値": 4, "爆装": 4, "種類": "艦上爆撃機", "半径": 4, "コスト": 5, "id": 60 },
	"零式艦戦63型(爆戦)": { "対空値": 5, "爆装": 5, "種類": "艦上爆撃機", "半径": 4, "コスト": 6, "id": 219 },
	"零戦62型(爆戦/岩井隊)": { "対空値": 7, "爆装": 4, "種類": "艦上爆撃機", "半径": 5, "コスト": 5, "id": 154 },
	"SBD": { "対空値": 2, "爆装": 6, "火力": 1, "種類": "艦上爆撃機", "半径": 4, "コスト": 5, "id": 195 },
	"F4U-1D": { "対空値": 7, "爆装": 7, "火力": 1, "種類": "艦上爆撃機", "半径": 6, "コスト": 9, "id": 233 },
	"Skua": { "対空値": 2, "爆装": 4, "種類": "艦上爆撃機", "半径": 4, "コスト": 4, "id": 248 },
	"FM-2": { "対空値": 6, "爆装": 2, "火力": 2, "種類": "艦上爆撃機", "半径": 4, "コスト": 6, "id": 277 },
	"Re.2001 CB改": { "対空値": 4, "爆装": 6, "火力": 3, "種類": "艦上爆撃機", "半径": 3, "コスト": 6, "id": 316 },

	"SBD-5": { "対空値": 2, "爆装": 7, "火力": 1, "種類": "艦上爆撃機", "半径": 4, "id": 419 },
	"SB2C-3": { "対空値": 2, "爆装": 11, "火力": 1, "種類": "艦上爆撃機", "半径": 5, "id": 420 },
	"SB2C-5": { "対空値": 2, "爆装": 12, "火力": 2, "種類": "艦上爆撃機", "半径": 6, "id": 421 },

	//艦攻
	"艦攻": { "対空値": 0, "雷装": 13, "種類": "艦上攻撃機", "半径": 99 },
	"流星": { "対空値": 1, "雷装": 10, "種類": "艦上攻撃機", "半径": 6, "コスト": 7, "id": 18 },
	"流星改": { "対空値": 1, "雷装": 13, "種類": "艦上攻撃機", "半径": 6, "コスト": 8, "id": 52 },
	"流星改(熟練)": { "対空値": 3, "雷装": 13, "種類": "艦上攻撃機", "半径": 6, "id": 466 },
	"九七式艦攻(友永隊)": { "対空値": 1, "雷装": 11, "種類": "艦上攻撃機", "半径": 4, "コスト": 5, "id": 93 },
	"天山一二型(友永隊)": { "対空値": 1, "雷装": 14, "種類": "艦上攻撃機", "半径": 5, "コスト": 6, "id": 94 },
	"九七式艦攻(村田隊)": { "対空値": 1, "雷装": 12, "種類": "艦上攻撃機", "半径": 4, "コスト": 5, "id": 143 },
	"天山一二型(村田隊)": { "対空値": 1, "雷装": 15, "種類": "艦上攻撃機", "半径": 5, "コスト": 6, "id": 144 },
	"流星改(一航戦)": { "対空値": 2, "雷装": 14, "種類": "艦上攻撃機", "半径": 6, "コスト": 9, "id": 342 },
	"流星改(一航戦/熟練)": { "対空値": 3, "雷装": 15, "種類": "艦上攻撃機", "半径": 6, "コスト": 9, "id": 343 },
	"Re.2001 G改": { "対空値": 4, "雷装": 4, "種類": "艦上攻撃機", "半径": 3, "コスト": 6, "id": 188 },
	"TBF": { "対空値": 1, "雷装": 9, "種類": "艦上攻撃機", "半径": 6, "コスト": 10, "id": 256 },
	"TBM-3D": { "対空値": 1, "雷装": 9, "種類": "艦上攻撃機", "半径": 6, "夜間航空機": true, "コスト": 11, "id": 257 },
	"天山一二型甲改(空六号電探改装備機)": { "対空値": 1, "雷装": 11, "種類": "艦上攻撃機", "半径": 5, "夜間航空機": true, "コスト": 8, "id": 373 },
	"天山一二型甲改(熟練/空六号電探改装備機)": { "対空値": 1, "雷装": 13, "種類": "艦上攻撃機", "半径": 6, "夜間航空機": true, "コスト": 8, "id": 374 },
	//	"Barracuda Mk.II": { "対空値": 0, "雷装": 7, "種類": "艦上攻撃機", "半径": 4, "id": 424 },
	//	"Barracuda Mk.III": { "対空値": 0, "雷装": 6, "種類": "艦上攻撃機", "半径": 5, "id": 425 },

	//水爆
	"試製晴嵐": { "対空値": 0, "爆装": 11, "種類": "水上爆撃機", "半径": 4, "コスト": 10, "id": 62 },
	"晴嵐(六三一空)": { "対空値": 0, "爆装": 12, "種類": "水上爆撃機", "半径": 4, "コスト": 10, "id": 208 },
	"瑞雲": { "対空値": 2, "爆装": 4, "種類": "水上爆撃機", "半径": 5, "コスト": 6, "id": 26 },
	"瑞雲(六三一空)": { "対空値": 1, "爆装": 7, "種類": "水上爆撃機", "半径": 5, "コスト": 6, "id": 207 },
	"瑞雲(六三四空)": { "対空値": 2, "爆装": 6, "種類": "水上爆撃機", "半径": 5, "コスト": 6, "id": 79 },
	"瑞雲12型": { "対空値": 3, "爆装": 7, "種類": "水上爆撃機", "半径": 5, "コスト": 7, "id": 80 },
	"瑞雲12型(六三四空)": { "対空値": 3, "爆装": 9, "種類": "水上爆撃機", "半径": 5, "コスト": 7, "id": 81 },
	"瑞雲(六三四空/熟練)": { "対空値": 4, "爆装": 9, "種類": "水上爆撃機", "半径": 5, "コスト": 6, "id": 237 },
	"瑞雲改二(六三四空)": { "対空値": 4, "爆装": 10, "種類": "水上爆撃機", "半径": 5, "コスト": 8, "id": 322 },
	"瑞雲改二(六三四空/熟練)": { "対空値": 5, "爆装": 11, "種類": "水上爆撃機", "半径": 5, "コスト": 8, "id": 323 },
	"Laté 298B": { "対空値": 1, "爆装": 5, "火力": 2, "種類": "水上爆撃機", "半径": 4, "コスト": 7, "id": 194 },
	"Swordfish(水上機型)": { "対空値": 0, "爆装": 5, "雷装": 5, "火力": 2, "種類": "水上爆撃機", "半径": 3, "コスト": 5, "id": 367 },
	"Swordfish Mk.III改(水上機型)": { "対空値": 0, "爆装": 7, "雷装": 6, "火力": 4, "種類": "水上爆撃機", "半径": 3, "コスト": 6, "id": 368 },
	"Swordfish Mk.III改(水上機型/熟練)": { "対空値": 0, "爆装": 8, "雷装": 7, "火力": 4, "種類": "水上爆撃機", "半径": 3, "コスト": 5, "id": 369 },

	//水戦
	"Ro.44水上戦闘機": { "対空値": 2, "種類": "水上戦闘機", "半径": 3, "コスト": 4, "id": 164 },
	"Ro.44水上戦闘機bis": { "対空値": 3, "種類": "水上戦闘機", "半径": 3, "コスト": 4, "id": 215 },
	"二式水戦改": { "対空値": 3, "種類": "水上戦闘機", "半径": 4, "コスト": 5, "id": 165 },
	"二式水戦改(熟練)": { "対空値": 5, "種類": "水上戦闘機", "半径": 4, "コスト": 5, "id": 216 },
	"強風改": { "対空値": 5, "種類": "水上戦闘機", "半径": 3, "コスト": 6, "id": 217 },

};


const 雑データ = {
	"熟練度マーク": ["", "|", "||", "|||", "/", "//", "///", ">>"],
	"改修マーク": ["", "★1", "★2", "★3", "★4", "★5", "★6", "★7", "★8", "★9", "★max"],
	"短縮": {
		"装備種": { "装備なし": "なし", "艦上戦闘機": "艦戦", "陸上攻撃機": "陸攻", "大型陸上機": "重爆", "局地戦闘機": "局戦", "陸軍戦闘機": "陸戦", "艦上偵察機": "艦偵", "陸上偵察機": "陸偵", "水上偵察機": "水偵", "大型飛行艇": "飛行艇", "噴式戦闘爆撃機": "噴戦", "艦上爆撃機": "艦爆", "艦上攻撃機": "艦攻", "水上爆撃機": "水爆", "水上戦闘機": "水戦", },
	},
	"海域略称": {/*
		"進撃！第二次作戦「南方作戦」《甲》": {
			"マカッサル沖/バリ島沖": "E-1甲",
			"ジャワ沖/ダーウィン沖": "E-2甲",
			"ジャワ海/スラバヤ沖": "E-3甲",
			"バタビア沖海戦": "E-4甲",
			"ダバオ沖/太平洋南西部": "E-5甲",
			"ソロモン諸島沖": "E-6甲",
		},
		"進撃！第二次作戦「南方作戦」《乙》": {
			"マカッサル沖/バリ島沖": "E-1乙",
			"ジャワ沖/ダーウィン沖": "E-2乙",
			"ジャワ海/スラバヤ沖": "E-3乙",
			"バタビア沖海戦": "E-4乙",
			"ダバオ沖/太平洋南西部": "E-5乙",
			"ソロモン諸島沖": "E-6乙",
		},
		"進撃！第二次作戦「南方作戦」《丙》": {
			"マカッサル沖/バリ島沖": "E-1丙",
			"ジャワ沖/ダーウィン沖": "E-2丙",
			"ジャワ海/スラバヤ沖": "E-3丙",
			"バタビア沖海戦": "E-4丙",
			"ダバオ沖/太平洋南西部": "E-5丙",
			"ソロモン諸島沖": "E-6丙",
		},
		"進撃！第二次作戦「南方作戦」《丁》": {
			"マカッサル沖/バリ島沖": "E-1丁",
			"ジャワ沖/ダーウィン沖": "E-2丁",
			"ジャワ海/スラバヤ沖": "E-3丁",
			"バタビア沖海戦": "E-4丁",
			"ダバオ沖/太平洋南西部": "E-5丁",
			"ソロモン諸島沖": "E-6丁",
		},*/
		"鎮守府海域": {
			"鎮守府正面海域": "1-1",
			"南西諸島沖": "1-2",
			"製油所地帯沿岸": "1-3",
			"南西諸島防衛線": "1-4",
			"鎮守府近海": "1-5",
			"鎮守府近海航路": "1-6",
		},
		"南西諸島海域": {
			"南西諸島近海": "2-1",
			"バシー海峡": "2-2",
			"東部オリョール海": "2-3",
			"沖ノ島海域": "2-4",
			"沖ノ島沖": "2-5",

			"カムラン半島": "2-1",
			"バシー島沖": "2-2",
		},
		"北方海域": {
			"モーレイ海": "3-1",
			"キス島沖": "3-2",
			"アルフォンシーノ方面": "3-3",
			"北方海域全域": "3-4",
			"北方AL海域": "3-5",
		},
		"南西海域": {
			"ブルネイ泊地沖": "7-1",
		},
		"西方海域": {
			"ジャム島沖": "4-1",
			"カレー洋海域": "4-2",
			"リランカ島": "4-3",
			"カスガダマ島": "4-4",
			"カレー洋リランカ島沖": "4-5",

			"ジャム島攻略作戦": "4-1",
			"カレー洋制圧戦": "4-2",
			"リランカ島空襲": "4-3",
			"カスガダマ島海戦": "4-4"
		},
		"南方海域": {
			"南方海域前面": "5-1",
			"珊瑚諸島沖": "5-2",
			"サブ島沖海域": "5-3",
			"サーモン海域": "5-4",
			"サーモン海域北方": "5-5",
		},
		"中部海域": {
			"中部海域哨戒線": "6-1",
			"MS諸島沖": "6-2",
			"グアノ環礁沖海域": "6-3",
			"中部北海域ピーコック島沖": "6-4",
			"KW環礁沖海域": "6-5",
		},
	}
}

