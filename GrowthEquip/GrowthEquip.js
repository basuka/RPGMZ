//=============================================================================
// RPG Maker MZ - GrowthEquip
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc 成長装備機能を実装します。
 * @author Basu
 * @url https://raw.githubusercontent.com/basuka/RPGMZ/main/GrowthEquip/GrowthEquip.js
 *
 *
 * @help パラメータの設定項目
 *
 * 【パラメータ】
 *
 * ■成長武器
 * 成長武器情報の設定を行います。
 *
 * 　・武器
 * 　成長武器にする武器の設定を行います。
 *
 * 　・装備可能アクター
 * 　成長武器を装備できるアクターの設定を行います。
 * 　装備可能なアクターは複数設定することはできません(専用装備となります)
 *
 * 　・レベル情報
 * 　成長武器のレベル情報の設定を行います。
 *
 * 　　・レベル
 * 　　成長武器のレベルの設定を行います。
 * 　　設定できる範囲はレベル2～レベル99となります。
 * 　　レベル１はデータベースに設定した能力値が設定されます。
 *
 * 　　・必要経験値
 * 　　このレベルに必要な経験値の設定を行います。
 *
 * 　　・習得スキル
 * 　　レベルアップ時に習得するスキルの設定を行います。
 *
 * 　　・攻撃力
 * 　　レベルアップ時に上昇する攻撃力の設定を行います。
 *
 * 　　・防御力
 * 　　レベルアップ時に上昇する防御力の設定を行います。
 *
 * 　　・魔法力
 * 　　レベルアップ時に上昇する魔法力の設定を行います。
 *
 * 　　・魔法防御
 * 　　レベルアップ時に上昇する魔法防御の設定を行います。
 *
 * 　　・敏捷性
 * 　　レベルアップ時に上昇する敏捷性の設定を行います。
 *
 * 　　・運
 * 　　レベルアップ時に上昇する運の設定を行います。
 *
 * 　　・最大HP
 * 　　レベルアップ時に上昇する最大HPの設定を行います。
 *
 * 　　・最大MP
 * 　　レベルアップ時に上昇する最大MPの設定を行います。
 *
 *
 * ■成長防具
 * 成長防具情報の設定を行います。
 *
 * 　・防具
 * 　成長防具にする防具の設定を行います。
 *
 * 　・装備可能アクター
 * 　成長防具を装備できるアクターの設定を行います。
 * 　装備可能なアクターは複数設定することはできません(専用装備となります)
 *
 * 　・レベル情報
 * 　成長防具のレベル情報の設定を行います。
 * 　※成長武器のレベル情報を参照
 *
 *
 * ■経験値割合(%)
 * 獲得経験値から成長装備が得られる経験値の割合の設定を行います。
 * 経験値の割合は1～100(%)の範囲で設定することができます。
 *
 * 例：獲得経験値が200、経験値割合が50(%)の場合
 * 成長装備が得られる経験値は獲得経験値の50(%)で100となります
 *
 *
 * ■有効スイッチ
 * 成長装備画面を有効化するスイッチの設定を行います。
 * スイッチがONの場合、アクターのステータス画面で成長装備画面と切り替えることができます。
 * ステータス画面と成長装備画面の切り替えは決定キーで切り替えることができます。
 *
 *
 * ■成長スキル使用タイプ
 * 成長スキルの使用タイプの設定を行います。
 *
 * いつでも：成長スキルを無条件で使用することができます。
 * 成長装備着用時：成長装備を装備していない場合、スキルを使用することができなくなります。
 *
 *
 * ■レベル単位
 * 成長装備画面に表示する成長装備のレベル単位の設定を行います。
 *
 *
 * ■レベル単位(テキスト)
 * メッセージ(テキスト)に表示する成長装備のレベル単位の設定を行います。
 *
 *
 * ■レベルアップメッセージ
 * 成長装備がレベルアップ時に表示されるメッセージの設定を行います。
 *
 * %1：成長装備名(武具名)
 * %2：レベル単位(テキスト)
 * %3：成長装備のレベル
 *
 *
 * ■獲得装備経験値取得(スクリプト)
 * GrowthEquipManager.gainExp()関数から獲得装備経験値の取得を行うことができます。
 *
 *
 * ■レベルアップ情報取得(スクリプト)
 * GrowthEquipManager.increaseParam(actor)関数からレベルアップ情報の取得を行うことができます。
 * 取得できる情報は以下の情報となります。
 *
 * actorId：アクターID
 * w_levelInfos[id].name：武器名
 * w_levelInfos[id].level：武器レベルの上昇値
 * a_levelInfos[id].name：防具名
 * a_levelInfos[id].level：防具レベルの上昇値
 * atk:攻撃力の上昇値
 * def:防御力の上昇値
 * mat:魔法力の上昇値
 * mdf:魔法防御の上昇値
 * agi:敏捷性の上昇値
 * luk:運の上昇値
 * mhp:最大HPの上昇値
 * mmp:最大MPの上昇値
 *
 * ※1　w_levelInfos・a_levelInfosのidはデータベースのIDとなります。
 * ※2　レベルアップをしていない場合w_levelInfos・a_levelInfosは空となります。
 *
 * 【攻撃力の上昇値を取得する使用例】
 *
 * const increaseParam = GrowthEquipManager.increaseParam(actor);
 * const atk = increaseParam.atk;
 *
 *-----------------------------------------------------------------------------
 * README
 *-----------------------------------------------------------------------------
 * https://github.com/basuka/RPGMZ/blob/main/GrowthEquip/README.md
 *
 *-----------------------------------------------------------------------------
 * 利用規約
 *-----------------------------------------------------------------------------
 * このプラグインはMITライセンスで配布しています
 *
 *
 *-----------------------------------------------------------------------------
 * 更新履歴
 *-----------------------------------------------------------------------------
 * 2024/9/26 Ver.1.0.0　公開
 * 2024/9/27 Ver.1.0.1　必要経験値の上限を設定するよう修正
 *                      装備レベルが最大時に不要な経験値が加算されないよう修正
 * 2024/9/28 Ver.1.0.2  獲得装備経験値の小数点以下を丸めるよう修正
 * 2024/10/12 Ver.1.0.3　レベルアップ情報を取得する関数を実装
 *                     　獲得装備経験値を取得する関数を実装
 *
 *=====================================================================================================================================================
 * @param growthWeaponInfos
 * @text 成長武器
 * @type struct<growthWeapon>[]
 * @default []
 * @desc 成長武器情報を設定
 *
 * @param growthArmorInfos
 * @text 成長防具
 * @type struct<growthArmor>[]
 * @default []
 * @desc 成長武器情報を設定
 *
 * @param expRatio
 * @text 経験値割合(%)
 * @type number
 * @min 1
 * @max 100
 * @default 100
 * @desc 成長武器が得られる経験値の割合を設定
 *       割合は獲得経験値の1～100%で設定
 *
 * @param validSwitch
 * @text 有効スイッチ
 * @type switch
 * @default 1
 * @desc 成長装備画面を有効化するスイッチを設定
 *
 * @param growthSkillUseType
 * @text 成長スキル使用タイプ
 * @type select
 * @option いつでも
 * @value 0
 * @option 成長装備着用時
 * @value 1
 * @default 1
 * @desc 成長スキルの使用タイプを設定
 *
 * @param unitLevel
 * @text レベル単位
 * @type string
 * @default Lv
 * @desc 装備レベルの単位を設定
 *
 * @param unitTextLevel
 * @text レベル単位(テキスト)
 * @type string
 * @default レベル
 * @desc テキスト表示する装備レベルの単位を設定
 *
 * @param levelUpMsg
 * @text レベルアップメッセージ
 * @type string
 * @default %1の%2が%3に上がった
 * @desc レベルアップのメッセージを設定
 *       %1:武具名 %2:レベル単位(テキスト) %3:レベル
 *
 */

/*~struct~growthWeapon:ja
 * @param itemId
 * @text 武器
 * @type weapon
 * @desc 成長武器を設定
 *
 * @param actorId
 * @text 装備可能アクター
 * @type actor
 * @desc 装備可能なアクターを設定
 *
 * @param levelInfos
 * @text レベル情報
 * @type struct<levelInfo>[]
 * @desc 成長武器のレベル情報を設定
 *
 */

/*~struct~growthArmor:ja
 * @param itemId
 * @text 防具
 * @type armor
 * @desc 成長防具を設定
 *
 * @param actorId
 * @text 装備可能アクター
 * @type actor
 * @desc 装備可能なアクターを設定
 *
 * @param levelInfos
 * @text レベル情報
 * @type struct<levelInfo>[]
 * @default []
 * @desc 成長防具のレベル情報を設定
 *
 */

/*~struct~levelInfo:ja
 * @param level
 * @text レベル
 * @type number
 * @min 2
 * @max 99
 * @default 2
 * @desc 成長武器レベル
 *
 * @param exp
 * @text 必要経験値
 * @type number
 * @min 1
 * @max 99999999
 * @default 1
 * @desc 必要な経験値を設定
 *
 * @param skillId
 * @text 習得スキル
 * @type skill
 * @desc レベルアップ時に習得するスキルを設定
 *
 * @param atk
 * @text 攻撃力
 * @type number
 * @min 0
 * @max 9999
 * @default 0
 * @desc レベルアップ時に上昇する攻撃力を設定
 *
 * @param def
 * @text 防御力
 * @type number
 * @min 0
 * @max 9999
 * @default 0
 * @desc レベルアップ時に上昇する防御力を設定
 *
 * @param mat
 * @text 魔法力
 * @type number
 * @min 0
 * @max 9999
 * @default 0
 * @desc レベルアップ時に上昇する魔法力を設定
 *
 * @param mdf
 * @text 魔法防御
 * @type number
 * @min 0
 * @max 9999
 * @default 0
 * @desc レベルアップ時に上昇する魔法防御を設定
 *
 * @param agi
 * @text 敏捷性
 * @type number
 * @min 0
 * @max 9999
 * @default 0
 * @desc レベルアップ時に上昇する敏捷性を設定
 *
 * @param luk
 * @text 運
 * @type number
 * @min 0
 * @max 9999
 * @default 0
 * @desc レベルアップ時に上昇する運を設定
 *
 * @param mhp
 * @text 最大HP
 * @type number
 * @min 0
 * @max 9999
 * @default 0
 * @desc レベルアップ時に上昇する最大HPを設定
 *
 * @param mmp
 * @text 最大MP
 * @type number
 * @min 0
 * @max 9999
 * @default 0
 * @desc レベルアップ時に上昇する最大MPを設定
 *
 */

$gameGrowthEquip = null;

//-----------------------------------------------------------------------------
// GrowthEquipManager
//-----------------------------------------------------------------------------
function GrowthEquipManager() {
    throw new Error("This is a static class");
}

GrowthEquipManager.setup = function () {
    this._gainExp = 0;
    this._increaseParams = {};

    $gameParty.battleMembers().forEach((actor) => {
        const increaseParam = {};
        increaseParam.actorId = actor.actorId();
        increaseParam.w_levelInfos = {};
        increaseParam.a_levelInfos = {};
        increaseParam.atk = 0;
        increaseParam.def = 0;
        increaseParam.mat = 0;
        increaseParam.mdf = 0;
        increaseParam.agi = 0;
        increaseParam.luk = 0;
        increaseParam.mhp = 0;
        increaseParam.mmp = 0;

        this._increaseParams[actor.actorId()] = increaseParam;
    });
};

GrowthEquipManager.setGainExp = function (gainExp) {
    this._gainExp = gainExp;
};

GrowthEquipManager.gainExp = function () {
    return this._gainExp;
};

GrowthEquipManager.addLevel = function (growthEquipInfo) {
    const actorId = growthEquipInfo.actorId;
    const itemId = growthEquipInfo.id;

    const increaseParam = this._increaseParams[actorId];

    if (growthEquipInfo.type === Game_GrowthEquip.TYPE_WEAPON) {
        const weapon = $dataWeapons[itemId];

        if (itemId in increaseParam.w_levelInfos) {
            const levelInfo = increaseParam.w_levelInfos[itemId];
            levelInfo.level += 1;
        } else {
            const levelInfo = {};
            levelInfo.name = weapon.name;
            levelInfo.level = 1;

            increaseParam.w_levelInfos[itemId] = levelInfo;
        }
    } else {
        const armor = $dataArmors[itemId];

        if (itemId in increaseParam.a_levelInfos) {
            const levelInfo = increaseParam.a_levelInfos[itemId];
            levelInfo.level += 1;
        } else {
            const levelInfo = {};
            levelInfo.name = armor.name;
            levelInfo.level = 1;

            increaseParam.a_levelInfos[itemId] = levelInfo;
        }
    }
};

GrowthEquipManager.addParam = function (growthEquipInfo, levelInfo) {
    const increaseParam = this._increaseParams[growthEquipInfo.actorId];

    increaseParam.atk += levelInfo.atk;
    increaseParam.def += levelInfo.def;
    increaseParam.mat += levelInfo.mat;
    increaseParam.mdf += levelInfo.mdf;
    increaseParam.agi += levelInfo.agi;
    increaseParam.luk += levelInfo.luk;
    increaseParam.mhp += levelInfo.mhp;
    increaseParam.mmp += levelInfo.mmp;
};

GrowthEquipManager.increaseParam = function (actor) {
    return this._increaseParams[actor.actorId()];
};

//-----------------------------------------------------------------------------
// Game_GrowthEquip
//-----------------------------------------------------------------------------
function Game_GrowthEquip() {
    this.initialize(...arguments);
}

Game_GrowthEquip.TYPE_WEAPON = 0;
Game_GrowthEquip.TYPE_ARMOR = 1;
Game_GrowthEquip.USE_SKILL_ANYTIME = 0;
Game_GrowthEquip.USE_SKILL_EQUIP = 1;

Game_GrowthEquip.prototype.initialize = function (params) {
    this._growthEquipInfos = [];
    this._expRatio = 0;

    this.setup(params);
};

Game_GrowthEquip.prototype.setup = function (params) {
    params.growthWeaponInfos.forEach((growthWeaponInfo) => {
        const growthEquipInfo = {};
        growthEquipInfo.id = growthWeaponInfo.itemId;
        growthEquipInfo.actorId = growthWeaponInfo.actorId;
        growthEquipInfo.type = Game_GrowthEquip.TYPE_WEAPON;
        growthEquipInfo.levelInfos = growthWeaponInfo.levelInfos;
        growthEquipInfo.level = 1;
        growthEquipInfo.exp = 0;

        growthEquipInfo.atk = 0;
        growthEquipInfo.def = 0;
        growthEquipInfo.mat = 0;
        growthEquipInfo.mdf = 0;
        growthEquipInfo.agi = 0;
        growthEquipInfo.luk = 0;
        growthEquipInfo.mhp = 0;
        growthEquipInfo.mmp = 0;

        this._growthEquipInfos.push(growthEquipInfo);
    });

    params.growthArmorInfos.forEach((growthArmorInfo) => {
        const growthEquipInfo = {};
        growthEquipInfo.id = growthArmorInfo.itemId;
        growthEquipInfo.actorId = growthArmorInfo.actorId;
        growthEquipInfo.type = Game_GrowthEquip.TYPE_ARMOR;
        growthEquipInfo.levelInfos = growthArmorInfo.levelInfos;
        growthEquipInfo.level = 1;
        growthEquipInfo.exp = 0;

        growthEquipInfo.atk = 0;
        growthEquipInfo.def = 0;
        growthEquipInfo.mat = 0;
        growthEquipInfo.mdf = 0;
        growthEquipInfo.agi = 0;
        growthEquipInfo.luk = 0;
        growthEquipInfo.mhp = 0;
        growthEquipInfo.mmp = 0;

        this._growthEquipInfos.push(growthEquipInfo);
    });

    this._expRatio = params.expRatio;
    this._growthSkillUseType = params.growthSkillUseType;
    this._validSwitch = params.validSwitch;
    this._unitLevel = params.unitLevel;
    this._unitTextLevel = params.unitTextLevel;
    this._levelUpMsg = params.levelUpMsg;
};

Game_GrowthEquip.prototype.gainExp = function (exp) {
    const calcExp = this.calcExp(Math.max(exp, 0));

    GrowthEquipManager.setGainExp(calcExp);

    this._growthEquipInfos.forEach((growthEquipInfo) => {
        const nextLevelInfo = this.nextLevelInfo(growthEquipInfo);

        if (nextLevelInfo) {
            const item = this.typeEquip(growthEquipInfo);

            if (this.isEquipped(item)) {
                this.changeExp(calcExp, growthEquipInfo, item);
            }
        }
    });
};

Game_GrowthEquip.prototype.changeExp = function (exp, growthEquipInfo, item) {
    growthEquipInfo.exp += exp;
    const lastLevel = growthEquipInfo.level;

    const newSkills = [];

    while (true) {
        const nextLevelInfo = this.nextLevelInfo(growthEquipInfo);

        if (!nextLevelInfo || nextLevelInfo.exp > growthEquipInfo.exp) {
            break;
        }

        if (growthEquipInfo.exp >= nextLevelInfo.exp) {
            const newSkill = this.levelUp(growthEquipInfo, nextLevelInfo, item);

            if (newSkill) {
                newSkills.push(newSkill);
            }
        }
    }

    if (growthEquipInfo.level > lastLevel) {
        this.displayLevelUp(item, growthEquipInfo.level, newSkills);
    }
};

Game_GrowthEquip.prototype.levelUp = function (growthEquipInfo, nextLevelInfo, item) {
    let newSkill = null;
    growthEquipInfo.level++;

    this.addParams(item, growthEquipInfo, nextLevelInfo);

    GrowthEquipManager.addLevel(growthEquipInfo);
    GrowthEquipManager.addParam(growthEquipInfo, nextLevelInfo);

    if (nextLevelInfo.skillId && nextLevelInfo.skillId > 0) {
        const actor = this.equipActor(growthEquipInfo);
        actor.learnSkill(nextLevelInfo.skillId);
        newSkill = $dataSkills[nextLevelInfo.skillId];
    }

    return newSkill;
};

Game_GrowthEquip.prototype.displayLevelUp = function (item, level, newSkills) {
    const text = $gameGrowthEquip.levelUpMsg().format(item.name, $gameGrowthEquip.unitTextLevel(), level);
    $gameMessage.newPage();
    $gameMessage.add(text);
    for (const skill of newSkills) {
        $gameMessage.add(TextManager.obtainSkill.format(skill.name));
    }
};

Game_GrowthEquip.prototype.setAllItemParams = function () {
    this._growthEquipInfos.forEach((growthEquipInfo) => {
        this.setItemParams(growthEquipInfo);
    });
};

Game_GrowthEquip.prototype.setItemParams = function (growthEquipInfo) {
    const item = this.typeEquip(growthEquipInfo);
    item.params[0] = growthEquipInfo.mhp;
    item.params[1] = growthEquipInfo.mmp;
    item.params[2] = growthEquipInfo.atk;
    item.params[3] = growthEquipInfo.def;
    item.params[4] = growthEquipInfo.mat;
    item.params[5] = growthEquipInfo.mdf;
    item.params[6] = growthEquipInfo.agi;
    item.params[7] = growthEquipInfo.luk;
};

Game_GrowthEquip.prototype.addParams = function (item, growthEquipInfo, levelInfo) {
    growthEquipInfo.mhp = item.params[0] + levelInfo.mhp;
    growthEquipInfo.mmp = item.params[1] + levelInfo.mmp;
    growthEquipInfo.atk = item.params[2] + levelInfo.atk;
    growthEquipInfo.def = item.params[3] + levelInfo.def;
    growthEquipInfo.mat = item.params[4] + levelInfo.mat;
    growthEquipInfo.mdf = item.params[5] + levelInfo.mdf;
    growthEquipInfo.agi = item.params[6] + levelInfo.agi;
    growthEquipInfo.luk = item.params[7] + levelInfo.luk;

    this.setItemParams(growthEquipInfo);
};

Game_GrowthEquip.prototype.levelInfo = function (growthEquipInfo) {
    return growthEquipInfo.levelInfos.filter((levelInfo) => levelInfo.level === growthEquipInfo.level);
};

Game_GrowthEquip.prototype.isEquipped = function (item) {
    return $gameParty.members().some((actor) => actor.isEquipped(item));
};

Game_GrowthEquip.prototype.typeEquip = function (growthEquipInfo) {
    if (growthEquipInfo.type === Game_GrowthEquip.TYPE_WEAPON) {
        return $dataWeapons[growthEquipInfo.id];
    } else {
        return $dataArmors[growthEquipInfo.id];
    }
};

Game_GrowthEquip.prototype.calcExp = function (exp) {
    return Math.floor(exp * (this._expRatio * 0.01));
};

Game_GrowthEquip.prototype.canUseSkill = function (skill) {
    if (this._growthSkillUseType === Game_GrowthEquip.USE_SKILL_EQUIP) {
        for (const growthEquipInfo of this._growthEquipInfos) {
            return !this.isGrowthSkill(skill, growthEquipInfo) || (this.isGrowthSkill(skill, growthEquipInfo) && this.isEquipped(this.typeEquip(growthEquipInfo)));
        }
    } else {
        return true;
    }
};

Game_GrowthEquip.prototype.nextLevelInfo = function (growthEquipInfo) {
    for (const levelInfo of growthEquipInfo.levelInfos) {
        const nextLevel = growthEquipInfo.level + 1;
        if (levelInfo.level === nextLevel) {
            return levelInfo;
        }
    }

    return null;
};

Game_GrowthEquip.prototype.isGrowthSkill = function (skill, growthEquipInfo) {
    return growthEquipInfo.levelInfos.some((levelInfo) => levelInfo.skillId === skill.id);
};

Game_GrowthEquip.prototype.isGrowthEquip = function (item) {
    return this._growthEquipInfos.some((growthEquipInfo) => growthEquipInfo.id === item.id);
};

Game_GrowthEquip.prototype.growthWeaponInfo = function (item) {
    const growthEquipInfos = this._growthEquipInfos.filter((growthEquipInfo) => growthEquipInfo.id === item.id && growthEquipInfo.type === Game_GrowthEquip.TYPE_WEAPON);
    return growthEquipInfos.length > 0 ? growthEquipInfos[0] : null;
};

Game_GrowthEquip.prototype.growthArmorInfo = function (item) {
    const growthEquipInfos = this._growthEquipInfos.filter((growthEquipInfo) => growthEquipInfo.id === item.id && growthEquipInfo.type === Game_GrowthEquip.TYPE_ARMOR);
    return growthEquipInfos.length > 0 ? growthEquipInfos[0] : null;
};

Game_GrowthEquip.prototype.equipActor = function (growthEquipInfo) {
    return $gameParty.members().filter((actor) => actor.actorId() === growthEquipInfo.actorId)[0];
};

Game_GrowthEquip.prototype.validSwitch = function () {
    return this._validSwitch;
};

Game_GrowthEquip.prototype.unitLevel = function () {
    return this._unitLevel;
};

Game_GrowthEquip.prototype.unitTextLevel = function () {
    return this._unitTextLevel;
};

Game_GrowthEquip.prototype.levelUpMsg = function () {
    return this._levelUpMsg;
};

(() => {
    "use strict";

    const Plugin_Name = document.currentScript.src.match(/^.*\/(.*).js$/)[1];

    //-----------------------------------------------------------------------------
    // PluginParams
    //-----------------------------------------------------------------------------
    function PluginParams() {
        this.initialize(...arguments);
    }

    PluginParams.prototype.parse = function (params) {
        if (this.isObject(params, "string")) {
            try {
                const parseParams = JSON.parse(params);
                params = this.parse(parseParams);
            } catch (e) {
                params = this.convertNumber(params);
            }
        } else if (this.isObject(params, "array")) {
            let count = 0;
            for (let param of params) {
                params[count] = this.parse(param);
                ++count;
            }
        } else if (this.isObject(params, "object")) {
            for (key in params) {
                params[key] = this.parse(params[key]);
            }
        }
        return params;
    };

    PluginParams.prototype.convertNumber = function (param) {
        return Number(param) ? Number(param) : param;
    };

    PluginParams.prototype.isObject = function (param, type) {
        return Object.prototype.toString.call(param).slice(8, -1).toLowerCase() === type;
    };

    const params = PluginParams.prototype.parse(PluginManager.parameters(Plugin_Name));

    //-----------------------------------------------------------------------------
    // Game_BattlerBase
    //-----------------------------------------------------------------------------
    const _Game_BattlerBase_CanEquipWeapon = Game_BattlerBase.prototype.canEquipWeapon;
    Game_BattlerBase.prototype.canEquipWeapon = function (item) {
        const growthWeaponInfo = $gameGrowthEquip.growthWeaponInfo(item);
        if (growthWeaponInfo) {
            return growthWeaponInfo.actorId === this.actorId();
        } else {
            return _Game_BattlerBase_CanEquipWeapon.apply(this, arguments);
        }
    };

    const _Game_BattlerBase_CanEquipArmor = Game_BattlerBase.prototype.canEquipArmor;
    Game_BattlerBase.prototype.canEquipArmor = function (item) {
        const growthArmorInfo = $gameGrowthEquip.growthArmorInfo(item);
        if (growthArmorInfo) {
            return growthArmorInfo.actorId === this.actorId();
        } else {
            return _Game_BattlerBase_CanEquipArmor.apply(this, arguments);
        }
    };

    const _Game_BattlerBase_MeetsSkillConditions = Game_BattlerBase.prototype.meetsSkillConditions;
    Game_BattlerBase.prototype.meetsSkillConditions = function (skill) {
        return $gameGrowthEquip.canUseSkill(skill) && _Game_BattlerBase_MeetsSkillConditions.apply(this, arguments);
    };

    //-----------------------------------------------------------------------------
    // Scene_Status
    //-----------------------------------------------------------------------------
    const _Scene_Status_Create = Scene_Status.prototype.create;
    Scene_Status.prototype.create = function () {
        _Scene_Status_Create.apply(this, arguments);
        if ($gameSwitches.value($gameGrowthEquip.validSwitch())) {
            this.createStatusGrowthEquipWindow();
        }
    };

    const _Scene_Status_CreateStatusWindow = Scene_Status.prototype.createStatusWindow;
    Scene_Status.prototype.createStatusWindow = function () {
        _Scene_Status_CreateStatusWindow.apply(this, arguments);
    };

    Scene_Status.prototype.createStatusGrowthEquipWindow = function () {
        const rect = this.statusGrowthEquipWindowRect();
        this._statusGrowthEquipWindow = new Window_StatusGrowthEquip(rect);
        this._statusGrowthEquipWindow.setHandler("ok", this.hideStatusGrowthEquipWindow.bind(this));
        this._statusGrowthEquipWindow.setHandler("cancel", this.popScene.bind(this));
        this._statusGrowthEquipWindow.setHandler("pagedown", this.nextActor.bind(this));
        this._statusGrowthEquipWindow.setHandler("pageup", this.previousActor.bind(this));
        this._statusWindow.setHandler("ok", this.showStatusGrowthEquipWindow.bind(this));
        this._statusGrowthEquipWindow.deactivate();
        this._statusGrowthEquipWindow.hide();
        this.addWindow(this._statusGrowthEquipWindow);
    };

    Scene_Status.prototype.statusGrowthEquipWindowRect = function () {
        const ww = Graphics.boxWidth;
        const wh = this.statusParamsHeight();
        const wx = 0;
        const wy = this.mainAreaBottom() - this.profileHeight() - wh;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_Status.prototype.showStatusGrowthEquipWindow = function () {
        this._statusWindow.deactivate();
        this._statusGrowthEquipWindow.activate();
        this._statusGrowthEquipWindow.show();
    };

    Scene_Status.prototype.hideStatusGrowthEquipWindow = function () {
        this._statusWindow.activate();
        this._statusGrowthEquipWindow.deactivate();
        this._statusGrowthEquipWindow.hide();
    };

    const _Scene_Status_RefreshActor = Scene_Status.prototype.refreshActor;
    Scene_Status.prototype.refreshActor = function () {
        _Scene_Status_RefreshActor.apply(this, arguments);

        if (this._statusGrowthEquipWindow) {
            const actor = this.actor();
            this._statusGrowthEquipWindow.setActor(actor);
        }
    };

    const _Scene_Status_OnActorChange = Scene_Status.prototype.onActorChange;
    Scene_Status.prototype.onActorChange = function () {
        _Scene_Status_OnActorChange.apply(this, arguments);
        if (this._statusGrowthEquipWindow && this._statusGrowthEquipWindow.isShow()) {
            this._statusWindow.deactivate();
            this._statusGrowthEquipWindow.activate();
        }
    };

    //-----------------------------------------------------------------------------
    // Window_StatusGrowthEquip
    //-----------------------------------------------------------------------------
    function Window_StatusGrowthEquip() {
        this.initialize(...arguments);
    }

    Window_StatusGrowthEquip.prototype = Object.create(Window_StatusEquip.prototype);
    Window_StatusGrowthEquip.prototype.constructor = Window_StatusGrowthEquip;

    Window_StatusGrowthEquip.prototype.initialize = function (rect) {
        Window_StatusEquip.prototype.initialize.call(this, rect);
    };

    Window_StatusGrowthEquip.prototype.growthEquipInfo = function (item) {
        if (DataManager.isWeapon(item)) {
            return $gameGrowthEquip.growthWeaponInfo(item);
        } else if (DataManager.isArmor(item)) {
            return $gameGrowthEquip.growthArmorInfo(item);
        } else {
            return null;
        }
    };

    Window_StatusGrowthEquip.prototype.drawItem = function (index) {
        const rect = this.itemLineRect(index);
        const equips = this._actor.equips();
        const item = equips[index];
        const sw = 250;
        const growthEquipInfo = this.growthEquipInfo(item);

        let level = "-";
        let exp = "--------";
        let nextExp = "--------";

        if (growthEquipInfo) {
            const nextLevelInfo = $gameGrowthEquip.nextLevelInfo(growthEquipInfo);

            if (nextLevelInfo) {
                level = growthEquipInfo.level;
                exp = growthEquipInfo.exp;
                nextExp = nextLevelInfo.exp;
            } else {
                level = "MAX";
            }
        } else {
            this.changePaintOpacity(false);
        }

        const drawLevel = "%1:%2";
        const drawExp = "%1 / %2";

        this.drawItemName(item, rect.x, rect.y, rect.width / 2, rect.height);
        this.drawText(drawLevel.format($gameGrowthEquip.unitLevel(), level), rect.width / 2, rect.y, rect.width - sw);
        this.drawText(drawExp.format(exp, nextExp), rect.x, rect.y, rect.width, "right");
        this.changePaintOpacity(1);
    };

    Window_StatusGrowthEquip.prototype.isShow = function () {
        return this.visible;
    };

    Window_StatusGrowthEquip.prototype.isCursorMovable = function () {
        return false;
    };

    Window_StatusGrowthEquip.prototype.isScrollEnabled = function () {
        return false;
    };

    Window_StatusGrowthEquip.prototype.isHoverEnabled = function () {
        return false;
    };

    //-----------------------------------------------------------------------------
    // BattleManager
    //-----------------------------------------------------------------------------
    const _BattleManager_Setup = BattleManager.setup;
    BattleManager.setup = function (troopId, canEscape, canLose) {
        _BattleManager_Setup.apply(this, arguments);
        GrowthEquipManager.setup();
    };

    const _BattleManager_GainRewards = BattleManager.gainRewards;
    BattleManager.gainRewards = function () {
        _BattleManager_GainRewards.apply(this, arguments);
        this.gainGrowthExp();
    };

    BattleManager.gainGrowthExp = function () {
        const exp = this._rewards.exp;
        $gameGrowthEquip.gainExp(exp);
    };

    //-----------------------------------------------------------------------------
    // DataManager
    //-----------------------------------------------------------------------------
    const _DataManager_CreateGameObjects = DataManager.createGameObjects;
    DataManager.createGameObjects = function () {
        _DataManager_CreateGameObjects.apply(this, arguments);
        $gameGrowthEquip = new Game_GrowthEquip(params);
    };

    const _DataManager_MakeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function () {
        const contents = _DataManager_MakeSaveContents.apply(this, arguments);
        contents.gameGrowthEquip = $gameGrowthEquip;
        return contents;
    };

    const _DataManager_ExtractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function (contents) {
        _DataManager_ExtractSaveContents.apply(this, arguments);
        $gameGrowthEquip = contents.gameGrowthEquip;
        $gameGrowthEquip.setAllItemParams();
    };
})();
