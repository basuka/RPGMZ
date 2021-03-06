//=============================================================================
// RPG Maker MZ - RandomBattleItem
//=============================================================================
/*:ja
 * @target MZ
 * @base PluginCommonBase
 * @plugindesc ランダムバトルアイテムを設定します。
 * @author Basu
 * @url https://raw.githubusercontent.com/basuka/RPGMZ/main/request/RandomBattleItem/RandomBattleItem.js
 *
 * @help RandomBattleItem.js
 *
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、「MAT_artifactItem」プラグイン(まっつＵＰ氏作成)を追加してください
 * ※「MAT_artifactItem」プラグインがない場合はエラーが発生します。
 *   また、「MAT_artifactItem」プラグインより先に本プラグインを追加した場合はアイテム使用時のMP/TPが２重で消費されるなど正常に動作しなくなります。
 *
 * 2.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加してください
 *
 * 3.必要に応じてパラメータを設定してください。
 *
 * ※　本プラグインは単体で動かすことを前提とし、他プラグインとの掛け合わせは考慮されていません。
 *    その為、「MAT_artifactItem」プラグインとの掛け合わせをを強引に行っている関係上予期せぬ動きが発生する可能性があります。
 *    また、掛け合わせを強引に行っている関係上「MAT_artifactItem」プラグインの一部のパラメータ(includesfixなど)は無効となり
 *    設定を行っても反映されません。
 *
 *-----------------------------------------------------------------------------
 * 利用規約
 *-----------------------------------------------------------------------------
 * このプラグインはMITライセンスで配布しています
 *
 *=====================================================================================================================================================
 *
 * @param minBattleItem
 * @text バトルアイテム最小数
 * @type number
 * @default 10
 * @desc 設定するバトルアイテムの最小数
 *
 * @param initBattleItemIds
 * @text 初期バトルアイテム
 * @type item[]
 * @desc 初期に設定されるバトルアイテム
 *       バトルアイテム最小数以上のアイテムを設定してください
 *
 * @param maxBattleItem
 * @text バトルアイテム最大数
 * @type number
 * @default 40
 * @desc 設定できるバトルアイテムの最大数
 *
 * @param viewBattleItem
 * @text バトルアイテム表示数
 * @type number
 * @default 5
 * @desc 表示するバトルアイテムの数
 *
 * @param maxRegItems
 * @text 同一アイテム最大登録数
 * @type struct<maxRegItem>[]
 * @desc 同一アイテムの最大登録数
 *
 * @param maxGroupRegItems
 * @text グループアイテム最大登録数
 * @type struct<maxGroupRegItems>[]
 * @desc グループアイテムの最大登録数
 *
 * @param changeViewItems
 * @text 表示アイテム数変更
 * @type struct<changeView>[]
 * @desc 表示アイテム数を変更する装備・ステートの設定
 *
 * @param reloadItemId
 * @text リロードアイテム
 * @type item
 * @desc 強制リロードを行うアイテム
 *
 * @param reloadSkillId
 * @text リロードスキル
 * @type skill
 * @desc 強制リロードを行うスキル
 *
 * @param setItemCommand
 * @text バトルアイテム設定コマンド
 * @type text
 * @default バトルアイテム
 * @desc バトルアイテム設定コマンド表示文字
 *
 * @param notItemSetMsg
 * @text アイテム設定不可メッセージ
 * @type text
 * @default バトルアイテムの設定は%1個以上で設定してください。
 * @desc 登録数不足時のメッセージ
 *       "%1"はバトルアイテム最小数に置換されます
 *
 */

/*~struct~maxRegItem:ja
 *
 * @param itemId
 * @text アイテム
 * @type item
 * @desc アイテム
 *
 * @param maxReg
 * @text 最大登録数
 * @type number
 * @desc 登録できる最大数
 */

/*~struct~maxGroupRegItems:ja
 *
 * @param groupItemIds
 * @text アイテム
 * @type item[]
 * @desc グループにするアイテム
 *
 * @param maxGroupReg
 * @text 最大登録数
 * @type number
 * @desc グループで登録できる最大数
 */

/*~struct~changeView:ja
 * @param changeViewType
 * @text 変更タイプ
 * @type select
 * @option 武器
 * @value 0
 * @option 防具
 * @value 1
 * @option ステート
 * @value 2
 * @desc 表示アイテム数の変更タイプ
 *
 * @param weaponId
 * @text 武器
 * @type weapon
 * @desc 表示アイテム数を変更する武器
 *       変更タイプで武器を選択した場合有効
 *
 * @param armorId
 * @text 防具
 * @type armor
 * @desc 表示アイテム数を変更する防具
 *       変更タイプで防具を選択した場合有効
 *
 * @param stateId
 * @text ステート
 * @type state
 * @desc 表示アイテム数を変更するステート
 *       変更タイプでステートを選択した場合有効
 *
 * @param changeNum
 * @text 変更値
 * @type number
 * @min -9999
 * @max 9999
 * @desc 変更する表示アイテム数の増減値
 *
 */


(() => {

    const pluginName = "RandomBattleItem";

    //-----------------------------------------------------------------------------
    // PluginManager_Parser
    //-----------------------------------------------------------------------------
    function PluginManager_Parser() {
        this.initialize(...arguments);
    }

    PluginManager_Parser.prototype.parse = function(params) {
        if (this.isObject(params, "string")) {
            try {
                parseParams = JSON.parse(params)
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
    }

    PluginManager_Parser.prototype.convertNumber = function(param) {
        return Number(param) ? Number(param) : param;
    }

    PluginManager_Parser.prototype.isObject = function(param, type) {
        return Object.prototype.toString.call(param).slice(8, -1).toLowerCase() === type;
    }

    let gameRandomBattleItem = null;
    const params = PluginManager_Parser.prototype.parse(PluginManager.parameters(pluginName));


    //-----------------------------------------------------------------------------
    // SlotStatus
    //-----------------------------------------------------------------------------
    function ChangeViewType() {
        throw new Error("This is a static class");
    }

    Object.defineProperties(ChangeViewType, {
        weapon: {
            value: 0
        },
        armor: {
            value: 1
        },
        stateId: {
            value: 2
        }
    });

    //-----------------------------------------------------------------------------
    // RandomBattleItem
    //-----------------------------------------------------------------------------
    function RandomBattleItem() {
        throw new Error("This is a static class");
    }

    Object.defineProperties(RandomBattleItem, {
        minBattleItem: {
            value: params.minBattleItem
        },
        initBattleItemIds: {
            value: params.initBattleItemIds
        },
        maxBattleItem: {
            value: params.maxBattleItem
        },
        viewBattleItem: {
            value: params.viewBattleItem
        },
        maxRegItems: {
            value: params.maxRegItems
        },
        maxGroupRegItems: {
            value: params.maxGroupRegItems
        },
        changeViewItems: {
            value: params.changeViewItems
        },
        reloadItemId: {
            value: params.reloadItemId
        },
        reloadSkillId: {
            value: params.reloadSkillId
        },
        setItemCommand: {
            value: params.setItemCommand
        },
        notItemSetMsg: {
            value: params.notItemSetMsg
        }
    });

    Object.defineProperty(RandomBattleItem, "lastSelect", {
        get: function() {
            return this._lastSelect || 0;
        },
        set: function(value) {
            this._lastSelect = value;
        },
    });

    RandomBattleItem.isBattleOccasion = function(item) {
        return item.occasion === 0 || item.occasion === 1;
    }


    //-----------------------------------------------------------------------------
    // Game_RandomBattleItem
    //-----------------------------------------------------------------------------
    function Game_RandomBattleItem() {
        this.initialize(...arguments);
    }

    Game_RandomBattleItem.prototype = Object.create(Game_Unit.prototype);
    Game_RandomBattleItem.prototype.constructor = Game_RandomBattleItem;

    Game_RandomBattleItem.prototype.initialize = function() {
        Game_Unit.prototype.initialize.call(this);
        this._useItemLists = [];
        this._battleItems = [];
        this._viewBattleItems = [];
    };

    Game_RandomBattleItem.prototype.setBattleItems = function(battleItemdatas) {
        while (battleItemdatas.length) {
            const itemIndex = Math.floor(Math.random() * battleItemdatas.length);
            this._battleItems.push(battleItemdatas[itemIndex]);
            battleItemdatas.splice(itemIndex, 1);
        }
    }

    Game_RandomBattleItem.prototype.setViewBattleItems = function() {
        if (this._battleItems.length < RandomBattleItem.viewBattleItem) {
            this.setBattleItems(this._useItemLists);
        }

        const changeNum = this.changeNum();
        for (let index = this._viewBattleItems.length; index < RandomBattleItem.viewBattleItem + changeNum; ++index) {
            if (this._battleItems.length) {
                this._viewBattleItems.push(this._battleItems[0]);
                this._battleItems.shift();
            }
        }
    }

    Game_RandomBattleItem.prototype.reloadItem = function() {
        this._useItemLists = this._useItemLists.concat(this._viewBattleItems);
        this._viewBattleItems = [];
        this.setViewBattleItems();
    }

    Game_RandomBattleItem.prototype.changeNum = function() {
        let changeNum = 0;

        for (const changeViewItem of RandomBattleItem.changeViewItems) {
            if (changeViewItem.changeViewType === ChangeViewType.weapon) {
                changeNum += this.getWeaponTypeChangeNum(changeViewItem);
            } else if (changeViewItem.changeViewType === ChangeViewType.armor) {
                changeNum += this.getArmorTypeChangeNum(changeViewItem);
            } else {
                changeNum += this.getStateTypeChangeNum(changeViewItem);
            }
        }

        return changeNum;
    }

    Game_RandomBattleItem.prototype.getWeaponTypeChangeNum = function(changeViewItem) {
        let changeNum = 0;
        const weaponId = changeViewItem.weaponId;
        const weapon = $dataWeapons[weaponId];
        if (weapon) {
            for (const actor of $gameParty.members()) {
                if (actor && actor.hasWeapon(weapon)) {
                    changeNum += changeViewItem.changeNum;
                }
            }
        }
        return changeNum;
    }

    Game_RandomBattleItem.prototype.getArmorTypeChangeNum = function(changeViewItem) {
        let changeNum = 0;
        const armorId = changeViewItem.armorId;
        const armor = $dataArmors[armorId];
        if (armor) {
            for (const actor of $gameParty.members()) {
                if (actor.hasArmor(armor)) {
                    changeNum += changeViewItem.changeNum;
                }
            }
        }
        return changeNum;
    }

    Game_RandomBattleItem.prototype.getStateTypeChangeNum = function(changeViewItem) {
        let changeNum = 0;
        const stateId = changeViewItem.stateId;
        const state = $dataStates[stateId];
        if (state) {
            for (const actor of $gameParty.members()) {
                if (actor.isStateAffected(state.id)) {
                    changeNum += changeViewItem.changeNum;
                }
            }
        }
        return changeNum;
    }

    Game_RandomBattleItem.prototype.useBattleItem = function(itemIndex) {
        if (itemIndex >= 0) {
            this._useItemLists.push(this._viewBattleItems[itemIndex]);
            this._viewBattleItems.splice(itemIndex, 1);
        }
    }

    Game_RandomBattleItem.prototype.viewBattleItems = function() {
        return this._viewBattleItems;
    }

    Game_RandomBattleItem.prototype.isBattleItem = function(item) {
        return item && (this._viewBattleItems.includes(item) || RandomBattleItem.isBattleOccasion(item));
    }


    //-----------------------------------------------------------------------------
    // Game_Party
    //-----------------------------------------------------------------------------
    const _Game_Party_InitAllItems = Game_Party.prototype.initAllItems;
    Game_Party.prototype.initAllItems = function() {
        _Game_Party_InitAllItems.apply(this, arguments);
        this._battleItemIds = this.initBattleItemIds();
    };

    Game_Party.prototype.initBattleItemIds = function() {
        const battleItemIds = [];

        for (const battleItemId of RandomBattleItem.initBattleItemIds) {
            battleItemIds.push(battleItemId);
            if (battleItemIds.length === RandomBattleItem.maxBattleItem) {
                break;
            }
        }
        return battleItemIds;
    }

    Game_Party.prototype.setBattleItems = function(battleItems) {
        const battleItemIds = [];

        for (const battleItem of battleItems) {
            battleItemIds.push(battleItem.id);
        }
        this._battleItemIds = battleItemIds;
    };

    Game_Party.prototype.getBattleItems = function() {
        let battleItems = [];

        if (this._battleItemIds) {
            for (const battleItemId of this._battleItemIds) {
                const item = $dataItems[battleItemId];
                battleItems.push(item);
            }
        }
        return battleItems;
    };


    //-----------------------------------------------------------------------------
    // Scene_SetBattleItem
    //-----------------------------------------------------------------------------
    function Scene_SetBattleItem() {
        this.initialize(...arguments);
    }

    Scene_SetBattleItem.prototype = Object.create(Scene_ItemBase.prototype);
    Scene_SetBattleItem.prototype.constructor = Scene_SetBattleItem;

    Scene_SetBattleItem.prototype.initialize = function() {
        Scene_ItemBase.prototype.initialize.call(this);
    };

    Scene_SetBattleItem.prototype.create = function() {
        Scene_ItemBase.prototype.create.call(this);
        this.createHelpWindow();
        this.createSetItemWindow();
        this.createBattleItemWindow();
    };

    Scene_SetBattleItem.prototype.start = function() {
        Scene_ItemBase.prototype.start.call(this);
        this._setItemWindow.setBattleItemWindow(this._setBattleItemWindow);
        this._setBattleItemWindow.refresh();
        this._setItemWindow.refresh();
        this._setItemWindow.activate();
        this._setItemWindow.selectLast();
        this._setItemWindow.setCount(this._setBattleItemWindow.maxItems());
    }

    Scene_SetBattleItem.prototype.createSetItemWindow = function() {
        const rect = this.setItemWindowRect();
        this._setItemWindow = new Window_SetItemList(rect);
        this._setItemWindow.setHelpWindow(this._helpWindow);
        this._setItemWindow.setHandler("ok", this.setItemOk.bind(this));
        this._setItemWindow.setHandler("right", this.activeSetBattleItemWindow.bind(this));
        this._setItemWindow.setHandler("left", this.activeSetBattleItemWindow.bind(this));
        this._setItemWindow.setHandler("cancel", this.setItemCancel.bind(this));
        this.addWindow(this._setItemWindow);
    };

    Scene_SetBattleItem.prototype.setItemWindowRect = function() {
        const wx = 0;
        const wy = this.mainAreaTop();
        const ww = Graphics.boxWidth * 0.5;
        const wh = this.mainAreaBottom() - wy;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_SetBattleItem.prototype.createBattleItemWindow = function() {
        const rect = this.battleItemWindowRect();
        this._setBattleItemWindow = new Window_SetBattleItemList(rect);
        this._setBattleItemWindow.setHelpWindow(this._helpWindow);
        this._setBattleItemWindow.setHandler("ok", this.deleteSetItemOk.bind(this));
        this._setBattleItemWindow.setHandler("right", this.activeSetItemWindow.bind(this));
        this._setBattleItemWindow.setHandler("left", this.activeSetItemWindow.bind(this));
        this._setBattleItemWindow.setHandler("cancel", this.setItemCancel.bind(this));
        this.addWindow(this._setBattleItemWindow);
    };

    Scene_SetBattleItem.prototype.battleItemWindowRect = function() {
        const wx = this._setItemWindow.width;
        const wy = this.mainAreaTop();
        const ww = Graphics.boxWidth * 0.5;
        const wh = this.mainAreaBottom() - wy;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_SetBattleItem.prototype.item = function() {
        return this._setItemWindow.item();
    };

    Scene_SetBattleItem.prototype.deleteItem = function() {
        return this._setBattleItemWindow.item();
    };

    Scene_SetBattleItem.prototype.setItemOk = function() {
        const item = this.item();
        if (this._setBattleItemWindow.isSetPossible(item)) {
            this._setBattleItemWindow.setItem(item);
            this._setBattleItemWindow.refresh();
            this._setItemWindow.setCount(this._setBattleItemWindow.maxItems());
            this._setItemWindow.refresh();
        } else {
            SoundManager.playBuzzer();
        }
        this.activeSetItemWindow();
    };

    Scene_SetBattleItem.prototype.deleteSetItemOk = function() {
        const item = this.deleteItem();
        this._setBattleItemWindow.deleteSetItem(item);
        this._setBattleItemWindow.refresh();
        this._setItemWindow.setCount(this._setBattleItemWindow.maxItems());
        this._setItemWindow.refresh();
        this.activeSetBattleItemWindow();
    };

    Scene_SetBattleItem.prototype.activeSetBattleItemWindow = function() {
        if (this._setBattleItemWindow.index() < 0) {
            this._setBattleItemWindow.selectLast();
        }
        this._setBattleItemWindow.activate();
    }

    Scene_SetBattleItem.prototype.activeSetItemWindow = function() {
        this._setItemWindow.activate();
    }

    Scene_SetBattleItem.prototype.setItemCancel = function() {
        this._setBattleItemWindow.setItemOk();
        this.popScene();
    };

    Scene_SetBattleItem.prototype.isSetOk = function() {
        return this._setBattleItemWindow.maxItems() >= RandomBattleItem.minBattleItem;
    }


    //-----------------------------------------------------------------------------
    // Scene_Menu
    //-----------------------------------------------------------------------------
    const _Scene_Menu_CreateCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        _Scene_Menu_CreateCommandWindow.apply(this, arguments);
        this._commandWindow.setHandler("setItem", this.commandSetBattleItem.bind(this));
    };

    Scene_Menu.prototype.commandSetBattleItem = function() {
        SceneManager.push(Scene_SetBattleItem);
    };


    //-----------------------------------------------------------------------------
    // Window_SetItemList
    //-----------------------------------------------------------------------------
    function Window_SetItemList() {
        this.initialize(...arguments);
    }

    Window_SetItemList.prototype = Object.create(Window_ItemList.prototype);
    Window_SetItemList.prototype.constructor = Window_SetItemList;

    Window_SetItemList.prototype.initialize = function(rect) {
        Window_Selectable.prototype.initialize.call(this, rect);
        this._category = "item";
        this._data = [];
        this._setDataCount = 0;
        this.scrollTo(0, 0);
    };

    Window_SetItemList.prototype.drawItem = function(index) {
        const item = this.itemAt(index);
        if (item) {
            const numberWidth = this.numberWidth();
            const rect = this.itemLineRect(index);
            this.resetTextColor();
            this.drawItemName(item, rect.x, rect.y, rect.width - numberWidth);
            this.drawItemNumber(item, rect.x, rect.y, rect.width);
            this.changePaintOpacity(1);
        }
    };

    Window_SetItemList.prototype.updateHelp = function() {
        return;
    };

    Window_SetItemList.prototype.makeItemList = function() {
        this._data = $gameParty.allItems().filter(item => this.includes(item) && RandomBattleItem.isBattleOccasion(item));
        if (this.includes(null)) {
            this._data.push(null);
        }
    };

    Window_SetItemList.prototype.changePaintSetItem = function(item) {
        if (this._setBattleItemWindow) {
            if (!this.isSetPossible(item)) {
                this.changeTextColor(ColorManager.textColor(18));
            } else if (this.isSetItem(item)) {
                this.changeTextColor(ColorManager.textColor(21));
            }
        }
    };

    Window_SetItemList.prototype.drawItemName = function(item, x, y, width) {
        if (item) {
            const iconY = y + (this.lineHeight() - ImageManager.iconHeight) / 2;
            const textMargin = ImageManager.iconWidth + 4;
            const itemWidth = Math.max(0, width - textMargin);
            this.changePaintSetItem(item);
            this.drawIcon(item.iconIndex, x, iconY);
            this.drawText(item.name, x + textMargin, y, itemWidth);
        }
    };

    Window_SetItemList.prototype.isSetItem = function(item) {
        return this._setBattleItemWindow.isSetItem(item);
    };

    Window_SetItemList.prototype.isSetPossible = function(item) {
        return this._setBattleItemWindow.isSetPossible(item);
    };

    Window_SetItemList.prototype.setBattleItemWindow = function(setBattleItemWindow) {
        this._setBattleItemWindow = setBattleItemWindow;
    };

    Window_SetItemList.prototype.maxCols = function() {
        return 1;
    };

    Window_SetItemList.prototype.processHandling = function() {
        Window_Selectable.prototype.processHandling.call(this);
        if (this.isOpenAndActive()) {
            if (this.isHandled("right") && Input.isTriggered("right")) {
                return this.processRight();
            }
            if (this.isHandled("left") && Input.isTriggered("left")) {
                return this.processLeft();
            }
        }
    };

    Window_SetItemList.prototype.processRight = function() {
        SoundManager.playCursor();
        this.updateInputData();
        this.deactivate();
        this.callRightHandler();
    };

    Window_SetItemList.prototype.processLeft = function() {
        SoundManager.playCursor();
        this.updateInputData();
        this.deactivate();
        this.callLeftHandler();
    };

    Window_SetItemList.prototype.callRightHandler = function() {
        this.callHandler("right");
    };

    Window_SetItemList.prototype.callLeftHandler = function() {
        this.callHandler("left");
    };

    Window_SetItemList.prototype.updateHelp = function() {
        this.setHelpWindowItem(this.item());
    };

    Window_SetItemList.prototype.isEnabled = function(item) {
        return item ? true : false;
    };

    Window_SetItemList.prototype.processCancel = function() {
        if (this.isSetOk()) {
            Window_Selectable.prototype.processCancel.call(this);
        } else {
            SoundManager.playBuzzer();
            this._helpWindow.setText(RandomBattleItem.notItemSetMsg.format(RandomBattleItem.minBattleItem));
        }
    };

    Window_SetItemList.prototype.setCount = function(count) {
        this._setDataCount = count;
    }

    Window_SetItemList.prototype.isSetOk = function() {
        return this._setDataCount >= RandomBattleItem.minBattleItem;
    }


    //-----------------------------------------------------------------------------
    // Window_SetBattleItemList
    //-----------------------------------------------------------------------------
    function Window_SetBattleItemList() {
        this.initialize(...arguments);
    }

    Window_SetBattleItemList.prototype = Object.create(Window_ItemList.prototype);
    Window_SetBattleItemList.prototype.constructor = Window_SetBattleItemList;

    Window_SetBattleItemList.prototype.initialize = function(rect) {
        Window_Selectable.prototype.initialize.call(this, rect);
        this._data = $gameParty.getBattleItems();
        this._category = "item";
        this.scrollTo(0, 0);
        this.refresh();
    };

    Window_SetBattleItemList.prototype.drawItem = function(index) {
        const item = this.itemAt(index);
        if (item) {
            const numberWidth = this.numberWidth();
            const rect = this.itemLineRect(index);
            this.drawItemName(item, rect.x, rect.y, rect.width - numberWidth);
            this.changePaintOpacity(1);
        }
    };

    Window_SetBattleItemList.prototype.setItem = function(item) {
        $gameParty.loseItem(item, 1);
        this._data.push(item);
    };

    Window_SetBattleItemList.prototype.deleteSetItem = function(item) {
        $gameParty.gainItem(item, 1);
        this._data.splice(this.index(), 1);
    };

    Window_SetBattleItemList.prototype.setItemOk = function() {
        $gameParty.setBattleItems(this._data);
    };

    Window_SetBattleItemList.prototype.isSetItem = function(item) {
        return this._data.includes(item);
    };

    Window_SetBattleItemList.prototype.isSetPossible = function(item) {
        return this.checkMaxBattleItem() && this.checkMaxRegItem(item) && this.checkMaxGroupRegItem(item);
    };

    Window_SetBattleItemList.prototype.checkMaxBattleItem = function() {
        return this._data.length < RandomBattleItem.maxBattleItem;
    };

    Window_SetBattleItemList.prototype.checkMaxRegItem = function(item) {
        if (item && RandomBattleItem.maxRegItems) {
            const maxRegItem = RandomBattleItem.maxRegItems.filter(maxRegItem => maxRegItem.itemId === item.id)[0];
            if (maxRegItem) {
                const regItems = this._data.filter(regItem => regItem && regItem.id === item.id);
                return regItems.length < maxRegItem.maxReg;
            }
        }
        return true
    };

    Window_SetBattleItemList.prototype.checkMaxGroupRegItem = function(item) {
        if (item && RandomBattleItem.maxGroupRegItems) {
            for (const maxGroupRegItems of RandomBattleItem.maxGroupRegItems) {
                const groupItemIds = maxGroupRegItems.groupItemIds;
                if (groupItemIds.includes(item.id)) {
                    let reg = 0;
                    for (const groupItemId of groupItemIds) {
                        const regItems = this._data.filter(regItem => regItem && regItem.id === groupItemId);
                        reg += regItems.length;
                    }
                    if (reg >= maxGroupRegItems.maxGroupReg) {
                        return false;
                    }
                }
            }
        }
        return true
    };

    Window_SetBattleItemList.prototype.makeItemList = function() {
        return;
    };

    Window_SetBattleItemList.prototype.maxCols = function() {
        return 1;
    };

    Window_SetBattleItemList.prototype.processHandling = function() {
        Window_Selectable.prototype.processHandling.call(this);
        if (this.isOpenAndActive()) {
            if (this.isHandled("right") && Input.isTriggered("right")) {
                return this.processRight();
            }
            if (this.isHandled("left") && Input.isTriggered("left")) {
                return this.processLeft();
            }
        }
    };

    Window_SetBattleItemList.prototype.processRight = function() {
        SoundManager.playCursor();
        this.updateInputData();
        this.deactivate();
        this.callRightHandler();
    };

    Window_SetBattleItemList.prototype.processLeft = function() {
        SoundManager.playCursor();
        this.updateInputData();
        this.deactivate();
        this.callLeftHandler();
    };

    Window_SetBattleItemList.prototype.callRightHandler = function() {
        this.callHandler("right");
    };

    Window_SetBattleItemList.prototype.callLeftHandler = function() {
        this.callHandler("left");
    };

    Window_SetBattleItemList.prototype.updateHelp = function() {
        this.setHelpWindowItem(this.item());
    };

    Window_SetBattleItemList.prototype.isEnabled = function(item) {
        return item ? true : false;
    };

    Window_SetBattleItemList.prototype.processCancel = function() {
        if (this.isSetOk()) {
            Window_Selectable.prototype.processCancel.call(this);
        } else {
            SoundManager.playBuzzer();
            this._helpWindow.setText(RandomBattleItem.notItemSetMsg.format(RandomBattleItem.minBattleItem));
        }
    };

    Window_SetBattleItemList.prototype.isSetOk = function(count) {
        return this.maxItems() >= RandomBattleItem.minBattleItem;
    }


    //-----------------------------------------------------------------------------
    // Window_MenuCommand
    //-----------------------------------------------------------------------------
    Window_MenuCommand.prototype.addOriginalCommands = function() {
        this.addCommand(RandomBattleItem.setItemCommand, "setItem", this.isSetBattleItem());
    };

    Window_MenuCommand.prototype.isSetBattleItem = function() {

        let length = $gameParty.getBattleItems().length;
        const dataList = $gameParty.allItems().filter(item => DataManager.isItem(item) && item.itypeId === 1);

        if (length < RandomBattleItem.minBattleItem) {
            for (const data of dataList) {
                if (RandomBattleItem.isBattleOccasion(data)) {
                    length += $gameParty.numItems(data);
                    if (length >= RandomBattleItem.minBattleItem) {
                        return true;
                    }
                }
            }
            return false;
        } else {
            return true;
        }
    }


    //-----------------------------------------------------------------------------
    // BattleManager
    //-----------------------------------------------------------------------------
    const _BattleManager_UpdateAction = BattleManager.updateAction;
    BattleManager.updateAction = function() {
        _BattleManager_UpdateAction.apply(this, arguments);
        this._action.reloadItem();
    }


    //-----------------------------------------------------------------------------
    // Game_Action
    //-----------------------------------------------------------------------------
    const _Game_Action_Initialize = Game_Action.prototype.initialize;
    Game_Action.prototype.initialize = function(item) {
        _Game_Action_Initialize.apply(this, arguments);
        this._selectItemIndex = -1;
    };

    const _Game_Action_SetSkill = Game_Action.prototype.setSkill;
    Game_Action.prototype.setSkill = function(skillId) {
        _Game_Action_SetSkill.apply(this, arguments);
        this._selectItemIndex = -1;
    };

    Game_Action.prototype.setSelectItemIndex = function(index) {
        this._selectItemIndex = index;
    };

    Game_Action.prototype.selectItemIndex = function() {
        return this._selectItemIndex;
    };

    Game_Action.prototype.reloadItem = function() {
        if ((this.isItem() && RandomBattleItem.reloadItemId === this.item().id) ||
            (this.isSkill() && RandomBattleItem.reloadSkillId === this.item().id)) {
            gameRandomBattleItem.reloadItem();
        }
    };


    //-----------------------------------------------------------------------------
    // Game_BattlerBase
    //-----------------------------------------------------------------------------
    Game_BattlerBase.prototype.meetsItemConditions = function(item) {
        return this.meetsUsableItemConditions(item) && ($gameParty.hasItem(item) || gameRandomBattleItem.isBattleItem(item));
    };




    //-----------------------------------------------------------------------------
    // Game_Battler
    //-----------------------------------------------------------------------------
    Game_Battler.prototype.consumeItem = function(item) {
        if (DataManager.isItem(item)) {
            const action = this.currentAction();
            gameRandomBattleItem.useBattleItem(action.selectItemIndex());
            this.payitemCost(item);
        }
    };


    //-----------------------------------------------------------------------------
    // Scene_Battle
    //-----------------------------------------------------------------------------
    const _Scene_Battle_Initialize = Scene_Battle.prototype.initialize;
    Scene_Battle.prototype.initialize = function() {
        _Scene_Battle_Initialize.apply(this, arguments);
        gameRandomBattleItem = new Game_RandomBattleItem();
    };

    const _Scene_Battle_Start = Scene_Battle.prototype.start;
    Scene_Battle.prototype.start = function() {
        _Scene_Battle_Start.apply(this, arguments);
        const battleItems = $gameParty.getBattleItems();
        gameRandomBattleItem.setBattleItems(battleItems);
        gameRandomBattleItem.setViewBattleItems();
    };

    Scene_Battle.prototype.onItemOk = function() {
        const item = this._itemWindow.item();
        const action = BattleManager.inputtingAction();
        action.setItem(item.id);
        this.onSelectAction();
        const index = this._itemWindow.index();
        action.setSelectItemIndex(index);
        RandomBattleItem.lastSelect = index;
    };


    //-----------------------------------------------------------------------------
    // Window_BattleItem
    //-----------------------------------------------------------------------------
    Window_BattleItem.prototype.makeItemList = function() {
        const battleItems = $gameParty.getBattleItems();
        gameRandomBattleItem.setViewBattleItems();
        this._data = gameRandomBattleItem.viewBattleItems().filter(item => this.includes(item) && battleItems.length >= RandomBattleItem.minBattleItem);
        if (this.includes(null)) {
            this._data.push(null);
        }
    };

    Window_BattleItem.prototype.drawItem = function(index) {
        const item = this.itemAt(index);
        if (item) {
            const numberWidth = this.numberWidth();
            const rect = this.itemLineRect(index);
            this.changePaintOpacity(this.isEnabled(item));
            this.drawItemName(item, rect.x, rect.y, rect.width - numberWidth);
            this.drawItemCost(item, rect.x, rect.y, rect.width);
            this.changePaintOpacity(1);
        }
    };

    Window_BattleItem.prototype.drawItemCost = function(item, x, y, width) {
        const actor = this.usecostactor();
        if (!actor) return;
        const mpcost = actor.itemMpCost(item);
        const tpcost = actor.itemTpCost(item);
        const drawcost = (mpcost || tpcost || 0);
        if (mpcost > 0) {
            this.changeTextColor(ColorManager.mpCostColor());
        } else if (tpcost > 0) {
            this.changeTextColor(ColorManager.tpCostColor());
        }
        if (drawcost > 0) {
            this.drawText(String(drawcost), x, y, width, "right");
        }
        this.resetTextColor();
    };

    Window_BattleItem.prototype.selectLast = function() {
        const index = RandomBattleItem.lastSelect;
        this.forceSelect(index >= 0 ? index : 0);
    };

    const aliasmeetsItemConditions = Game_BattlerBase.prototype.meetsItemConditions;
    Game_BattlerBase.prototype.meetsItemConditions = function(item) {
        const def = aliasmeetsItemConditions.call(this, item);
        return def && this.canPayitemCost(item);
    };

    Window_BattleItem.prototype.includes = function(item) {
        return gameRandomBattleItem.isBattleItem(item) || this.artifactincludes(item);
    };

})();
