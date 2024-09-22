//=============================================================================
// RPG Maker MZ - LostItem
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc 紛失アイテムの機能を設定します
 * @author Basu
 * @url https://raw.githubusercontent.com/basuka/RPGMZ/main/LostItem/LostItem.js
 *
 *
 * @help コマンド・パラメータの設定項目
 *
 * 【コマンド・所持品紛失】
 *
 * 所持品の紛失を行うコマンドです。
 * このコマンドで紛失させた所持品は【アイテム復元】コマンドで復元することができます。
 *
 * 【コマンドパラメータ】
 *
 * ■アイテム
 * 所持品の紛失にアイテム(大事なもの)を含めるかの設定を行います。
 *
 * ■武器
 * 所持品の紛失に武器を含めるかの設定を行います。
 *
 * ■防具
 * 所持品の紛失に防具を含めるかの設定を行います。
 *
 * ■装備品
 * 所持品の紛失に装備中の装備品を含めるかの設定を行います。
 *
 * ■所持金
 * 所持品の紛失に所持金を含めるかの設定を行います。
 *
 *
 *【コマンド・アイテム復元】
 *
 * 紛失した所持品の復元を行うコマンドです。
 *
 * 【コマンドパラメータ】
 *
 * ■アイテム
 * 所持品の復元にアイテム(大事なもの)を含めるかの設定を行います。
 *
 * ■武器
 * 所持品の復元に武器を含めるかの設定を行います。
 *
 * ■防具
 * 所持品の復元に防具を含めるかの設定を行います。
 *
 * ■装備品
 * 所持品の復元に装備中の装備品を含めるかの設定を行います。
 *
 * ■所持金
 * 所持品の復元に所持金を含めるかの設定を行います。
 *
 *
 * 【全クリア】
 *
 * 紛失した所持品情報をクリア(消去)するコマンドです。
 * クリア(消去)すると紛失した所持品を復元することができなくなります。
 * アイテムの復元を行わずにストーリーを進行する場合など、紛失した所持品を復元することがない場合このコマンドを実行してください。
 *
 * ※アイテムの復元を行った場合、復元したアイテムの情報はクリアされます。
 *
 *-----------------------------------------------------------------------------
 * README
 *-----------------------------------------------------------------------------
 * https://github.com/basuka/RPGMZ/blob/main/LostItem/README.md
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
 * 2024/9/22 Ver.1.0.0　公開
 * 
 *=====================================================================================================================================================
 * @command lostItem
 * @text 所持品紛失
 * @desc 所持品を紛失させる
 *
 * @arg isItem
 * @text アイテム
 * @type boolean
 * @on 対象
 * @off 対象外
 * @default true
 * @desc アイテムを損失対象にするか設定
 *
 * @arg isWeapon
 * @text 武器
 * @type boolean
 * @on 対象
 * @off 対象外
 * @default true
 * @desc 武器を損失対象にするか設定
 *
 * @arg isArmor
 * @text 防具
 * @type boolean
 * @on 対象
 * @off 対象外
 * @default true
 * @desc 防具を損失対象にするか設定
 *
 * @arg isEquip
 * @text 装備品
 * @type boolean
 * @on 対象
 * @off 対象外
 * @default true
 * @desc 装備中の装備品を損失対象にするか設定
 *
 * @arg isGold
 * @text 所持金
 * @type boolean
 * @on 対象
 * @off 対象外
 * @default true
 * @desc 所持金を損失対象にするか設定
 *
 * @command recoveryItem
 * @text アイテム復元
 * @desc 紛失したアイテムを復元させる
 *
 * @arg isItem
 * @text アイテム
 * @type boolean
 * @on 対象
 * @off 対象外
 * @default true
 * @desc アイテムを復元対象にするか設定
 *
 * @arg isWeapon
 * @text 武器
 * @type boolean
 * @on 対象
 * @off 対象外
 * @default true
 * @desc 武器を復元対象にするか設定
 *
 * @arg isArmor
 * @text 防具
 * @type boolean
 * @on 対象
 * @off 対象外
 * @default true
 * @desc 防具を復元対象にするか設定
 *
 * @arg isEquip
 * @text 装備品
 * @type boolean
 * @on 対象
 * @off 対象外
 * @default true
 * @desc 装備品を復元対象にするか設定
 *
 * @arg isGold
 * @text 所持金
 * @type boolean
 * @on 対象
 * @off 対象外
 * @default true
 * @desc 所持金を復元対象にするか設定
 *
 * @command allClear
 * @text 全クリア
 * @desc 全紛失情報をクリアします
 *       クリアすると紛失した所持品は復元できなくなります
 */

$gameLostItem = null;

//-----------------------------------------------------------------------------
// Game_LostItem
//-----------------------------------------------------------------------------
function Game_LostItem() {
    this.initialize(...arguments);
}

Game_LostItem.prototype.initialize = function () {
    this._lostItemInfos = [];
    this._lostWeaponInfos = [];
    this._lostArmorInfos = [];
    this._lostEquipInfos = [];
    this._lostGold = 0;
};

Game_LostItem.prototype.setLostItem = function (item) {
    if (DataManager.isItem(item) && !this.isSetLostItem(item)) {
        const itemInfo = {};
        const num = $gameParty.numItems(item);

        itemInfo.id = item.id;
        itemInfo.num = num;

        this._lostItemInfos.push(itemInfo);
        $gameParty.loseItem(item, num);
    }
};

Game_LostItem.prototype.isSetLostItem = function (item) {
    return this._lostItemInfos.some((lostItemInfo) => lostItemInfo.id === item.id);
};

Game_LostItem.prototype.setLostWeapon = function (item) {
    if (DataManager.isWeapon(item) && !this.isSetLostWeapon(item)) {
        const itemInfo = {};
        const num = $gameParty.numItems(item);

        itemInfo.id = item.id;
        itemInfo.num = num;

        this._lostWeaponInfos.push(itemInfo);
        $gameParty.loseItem(item, num);
    }
};

Game_LostItem.prototype.isSetLostWeapon = function (item) {
    return this._lostWeaponInfos.some((lostWeaponInfo) => lostWeaponInfo.id === item.id);
};

Game_LostItem.prototype.setLostArmor = function (item) {
    if (DataManager.isArmor(item) && !this.isSetLostArmor(item)) {
        const itemInfo = {};
        const num = $gameParty.numItems(item);

        itemInfo.id = item.id;
        itemInfo.num = num;

        this._lostArmorInfos.push(itemInfo);
        $gameParty.loseItem(item, num);
    }
};

Game_LostItem.prototype.isSetLostArmor = function (item) {
    return this._lostArmorInfos.some((lostArmorInfo) => lostArmorInfo.id === item.id);
};

Game_LostItem.prototype.setLostEquip = function (actor) {
    if (!this.isSetLostEquip(actor)) {
        const equips = {};
        const equipInfos = [];

        const actorId = actor.actorId();

        equips.actorId = actorId;
        equips.equipInfos = equipInfos;

        actor.equips().forEach((equip) => {
            if (equip) {
                const equipInfo = {};

                equipInfo.id = equip.id;
                equipInfo.etypeId = equip.etypeId;

                equipInfos.push(equipInfo);

                const slotId = equip.etypeId - 1;

                actor.forceChangeEquip(slotId, null);
            }
        });

        this._lostEquipInfos.push(equips);
    }
};

Game_LostItem.prototype.isSetLostEquip = function (actor) {
    return this._lostEquipInfos.some((lostEquipInfo) => lostEquipInfo.actorId === actor.actorId());
};

Game_LostItem.prototype.setLostGold = function () {
    this._lostGold += $gameParty.gold();
    $gameParty.loseGold($gameParty.maxGold());
};

Game_LostItem.prototype.lostItemInfos = function () {
    return this._lostItemInfos;
};

Game_LostItem.prototype.lostWeaponInfos = function () {
    return this._lostWeaponInfos;
};

Game_LostItem.prototype.lostArmorInfos = function () {
    return this._lostArmorInfos;
};

Game_LostItem.prototype.lostEquipInfos = function () {
    return this._lostEquipInfos;
};

Game_LostItem.prototype.lostGold = function () {
    return this._lostGold;
};

Game_LostItem.prototype.clearLostItemInfos = function () {
    this._lostItemInfos = [];
};

Game_LostItem.prototype.clearLostWeaponInfos = function () {
    this._lostWeaponInfos = [];
};

Game_LostItem.prototype.clearLostArmorInfos = function () {
    this._lostArmorInfos = [];
};

Game_LostItem.prototype.clearLostEquipInfos = function () {
    this._lostEquipInfos = [];
};

Game_LostItem.prototype.clearLostGold = function () {
    this._lostGold = 0;
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

    PluginManager.registerCommand(Plugin_Name, "lostItem", function (lostItemParams) {
        PluginParams.prototype.parse(lostItemParams);

        const isItem = lostItemParams.isItem;
        const isWeapon = lostItemParams.isWeapon;
        const isArmor = lostItemParams.isArmor;
        const isEquip = lostItemParams.isEquip;
        const isGold = lostItemParams.isGold;

        if (isItem || isWeapon || isArmor) {
            $gameParty.allItems().forEach((item) => {
                if (isItem) {
                    $gameLostItem.setLostItem(item);
                }

                if (isWeapon) {
                    $gameLostItem.setLostWeapon(item);
                }

                if (isArmor) {
                    $gameLostItem.setLostArmor(item);
                }
            });
        }

        if (isEquip) {
            $gameParty.members().forEach((actor) => {
                $gameLostItem.setLostEquip(actor);
            });
        }

        if (isGold) {
            $gameLostItem.setLostGold();
        }
    });

    PluginManager.registerCommand(Plugin_Name, "recoveryItem", function (lostItemParams) {
        PluginParams.prototype.parse(lostItemParams);

        const isItem = lostItemParams.isItem;
        const isWeapon = lostItemParams.isWeapon;
        const isArmor = lostItemParams.isArmor;
        const isEquip = lostItemParams.isEquip;
        const isGold = lostItemParams.isGold;

        if (isItem) {
            const lostItemInfos = $gameLostItem.lostItemInfos();
            lostItemInfos.forEach((lostItemInfo) => {
                $gameParty.gainItem($dataItems[lostItemInfo.id], lostItemInfo.num);
            });

            $gameLostItem.clearLostItemInfos();
        }

        if (isWeapon) {
            const lostWeaponInfos = $gameLostItem.lostWeaponInfos();
            lostWeaponInfos.forEach((lostWeaponInfo) => {
                $gameParty.gainItem($dataWeapons[lostWeaponInfo.id], lostWeaponInfo.num);
            });

            $gameLostItem.clearLostWeaponInfos();
        }

        if (isArmor) {
            const lostArmorInfos = $gameLostItem.lostArmorInfos();
            lostArmorInfos.forEach((lostArmorInfo) => {
                $gameParty.gainItem($dataArmors[lostArmorInfo.id], lostArmorInfo.num);
            });

            $gameLostItem.clearLostArmorInfos();
        }

        if (isEquip) {
            const lostEquipInfos = $gameLostItem.lostEquipInfos();

            lostEquipInfos.forEach((lostEquipInfo) => {
                const actorId = lostEquipInfo.actorId;
                const equipInfos = lostEquipInfo.equipInfos;

                const actor = $gameActors.actor(actorId);

                equipInfos.forEach((equipInfo) => {
                    const slotId = equipInfo.etypeId - 1;
                    if (actor.equipSlots()[slotId] === 1) {
                        actor.forceChangeEquip(slotId, $dataWeapons[equipInfo.id]);
                    } else {
                        actor.forceChangeEquip(slotId, $dataArmors[equipInfo.id]);
                    }
                });
            });

            $gameLostItem.clearLostEquipInfos();
        }

        if (isGold) {
            const lostGold = $gameLostItem.lostGold();
            $gameParty.gainGold(lostGold);

            $gameLostItem.clearLostGold();
        }
    });

    PluginManager.registerCommand(Plugin_Name, "allClear", function (lostItemParams) {
        $gameLostItem.clearLostItemInfos();
        $gameLostItem.clearLostWeaponInfos();
        $gameLostItem.clearLostArmorInfos();
        $gameLostItem.clearLostEquipInfos();
        $gameLostItem.clearLostGold();
    });

    const _DataManager_CreateGameObjects = DataManager.createGameObjects;
    DataManager.createGameObjects = function () {
        _DataManager_CreateGameObjects.apply(this, arguments);
        $gameLostItem = new Game_LostItem();
    };

    const _DataManager_MakeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function () {
        const contents = _DataManager_MakeSaveContents.apply(this, arguments);
        contents.gameLostItem = $gameLostItem;
        return contents;
    };

    const _DataManager_ExtractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function (contents) {
        _DataManager_ExtractSaveContents.apply(this, arguments);
        $gameLostItem = contents.gameLostItem;
    };
})();
