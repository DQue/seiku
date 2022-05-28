const io_制空権シミュURL = () => {
    const db = io_デッキビルダー形式(true);
    //    const base = "https://noro6.github.io/kcTools?predeck=";

    //制空シミュv2
    const base = "https://noro6.github.io/kc-web/?predeck=";

    const param = (JSON.stringify(db));
    return base + param;
}
const io_デッキビルダーURL = () => {
    const base = "http://kancolle-calc.net/deckbuilder.html?predeck=";
    const db = io_デッキビルダー形式(false);
    const param = encodeURIComponent(JSON.stringify(db));
    return base + param;
}
const io_作戦室URL = () => {
    const base = "https://kcjervis.github.io/jervis/?operation-json=";
    const db = io_作戦室形式(false);
    const param = db;
    return base + param;
}

const io_デッキビルダー形式 = (航空隊含む = true) => {
    let version;
    const outobj = {};
    let num_ship = [0, 0], num_ab = 0;

    if (航空隊含む) version = 4.2;
    else version = 4;
    outobj.version = version;
    outobj.hqlv = 120; //適当

    for (let i = 0; i < O.table.length; i++) {
        const dd = O.table[i];
        const d = dd.data;
        if (dd.deleted) continue;
        if (d.hidden) continue;

        const kanmusu = d.kanmusu, kaizou = d.kaizou;
        const id = 零_n2i(kanmusu, "艦娘", kaizou);
        if (kanmusu === "基地航空隊") {
            if (航空隊含む === false) continue;
            const temp = {};
            const slot = 零_艦娘スロット数("基地航空隊", kaizou);
            temp.mode = (kaizou === "出撃" ? 1 : 2);
            temp.items = {};
            for (let j = 0; j < slot; j++) {
                const sid = 零_n2i(d.soubi[j], "装備");
                const item = {}
                item.id = sid;
                item.rf = d.kaishu[j];
                item.mas = d.jukuren[j];

                temp.items["i" + (j + 1)] = item;
            }
            const aidx = "a" + (++num_ab);
            outobj[aidx] = temp;
        } else if (id !== 0) { //艦娘
            const temp = {};
            const slot = 零_艦娘スロット数(kanmusu, kaizou);

            temp.id = String(零_n2i(kanmusu, "艦娘", kaizou));
            temp.lv = 99; //適当
            temp.luck = -1;
            temp.items = {};
            for (let j = 0; j < slot; j++) {
                const sid = 零_n2i(d.soubi[j], "装備");
                const item = {};
                item.id = sid;
                item.rf = d.kaishu[j];
                item.mas = d.jukuren[j];
                temp.items["i" + (j + 1)] = item;
            }

            const fidx = (d.daini ? 2 : 1);
            const sidx = "s" + (++num_ship[fidx - 1]);
            if (outobj["f" + fidx] === undefined) outobj["f" + fidx] = {};
            outobj["f" + fidx][sidx] = temp;

        } else {
            throw `艦娘「${kanmusu} ${kaizou}」が見当たりません`;
        }
    }
    return outobj
}

const io_作戦室形式 = () => {
    const outobj = {};
    outobj.version = 1;
    outobj.hqLevel = 120; //適当
    outobj.side = "Player";
    outobj.fleets = [{ ships: [] }, { ships: [] }];
    outobj.landBase = [];

    outobj.name = "艦隊-" + 現在時刻().str;
    outobj.fleetType = "Single";
    let num_fleet = 0;

    for (let i = 0; i < O.table.length; i++) {
        const dd = O.table[i];
        const d = O.table[i].data;
        if (dd.deleted) continue;
        if (d.hidden) continue;

        const id = 零_n2i(d.kanmusu, "艦娘", d.kaizou);
        const kanmusu = d.kanmusu, kaizou = d.kaizou;
        if (kanmusu === "基地航空隊") {
            const temp = {};
            temp.slots = [];
            temp.equipments = [];
            const slot = 零_艦娘スロット数("基地航空隊", kaizou);
            for (let j = 0; j < slot; j++) {
                const id = 零_n2i(d.soubi[j], "装備");
                if (id === 0) continue;

                temp.slots[j] = d.tousai[j];
                temp.equipments[j] = {
                    masterId: id,
                    improvement: d.kaishu[j],
                    proficiency: ((j) => {
                        if (j === 7 && O.settings.calc_120) j = 8;
                        return [0, 10, 25, 40, 55, 70, 85, 100, 120][j];
                    })(d.jukuren[j]),
                };
            }
            outobj.landBase.push(temp);
        } else if (id !== 0) { //艦娘
            const id = 零_n2i(kanmusu, "艦娘", kaizou);
            if (id === 0) continue;

            const fidx = d.daini ? 1 : 0;
            const temp = {};
            temp.masterId = id;
            temp.level = 99; //適当
            temp.increased = { hp: 0, luck: 0, };
            temp.slots = [];
            temp.equipments = [];

            const slot = 零_艦娘スロット数(kanmusu, kaizou);
            for (let j = 0; j < slot; j++) {
                const sid = 零_n2i(d.soubi[j], "装備");

                temp.equipments[j] = {
                    masterId: sid,
                    improvement: d.kaishu[j],
                    proficiency: ((j) => {
                        if (j === 7 && O.settings.calc_120) j = 8;
                        return [0, 10, 25, 40, 55, 70, 85, 100, 120][j];
                    })(d.jukuren[j]),
                };

                temp.slots[j] = d.tousai[j];
            }
            outobj.fleets[fidx].ships.push(temp);
            num_fleet = num_fleet | (fidx + 1);
        } else {
            throw `艦娘「${kanmusu} ${kaizou}」が見当たりません`;
        }
    }

    outobj.fleetType = (num_fleet === 0b11 ? "CarrierTaskForce" : "Single"); //第1艦隊と第2艦隊どっちも存在するなら連合艦隊
    return JSON.stringify(outobj);
}
