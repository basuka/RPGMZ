//=============================================================================
// RPG Maker MZ - CoinExchangeShop
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc コイン交換ショップを設定します。
 * @author Basu
 * @url https://raw.githubusercontent.com/basuka/RPGMZ/main/CoinExchangeShop/CoinExchangeShop.js
 *
 * @help CoinExchangeShop.js
 *
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加してください
 *
 * 2.「プラグインコマンド」イベントから「コイン交換ショップ開始」コマンド
 *   を設定してください。
 *
 * 3.必要に応じてパラメータを設定してください。
 *
 * 4.「ショップの処理」イベントで交換アイテムを設定してください。
 *   ※ここで設定される価格が必要コインの枚数になります。
 *
 *-----------------------------------------------------------------------------
 * README
 *-----------------------------------------------------------------------------
 * https://github.com/basuka/RPGMZ/blob/main/CoinExchangeShop/README.md
 *
 *-----------------------------------------------------------------------------
 * 利用規約
 *-----------------------------------------------------------------------------
 * このプラグインはMITライセンスで配布しています
 *
 *=====================================================================================================================================================
 *
 * @param variableID
 * @text 保管ID
 * @type variable
 * @default 11
 * @desc 所持コインの数を保管する変数ID
 *
 * @param coinNumUnit
 * @text コイン枚数の単位
 * @type text
 * @default 枚
 * @desc コイン枚数の単位を設定
 *
 * @param exchangeCmd
 * @text 交換コマンド
 * @type text
 * @default 交換
 * @desc 交換コマンドの表示コマンド
 *
 *
 * @command open
 * @text コイン交換ショップ開始
 * @desc コイン交換ショップを開始します。
 */

(() => {

    const pluginName = "CoinExchangeShop";

    PluginManager.registerCommand(pluginName, "open", args => {
        CoinExchangeShop.exchangeShop = true;
    });


    //-----------------------------------------------------------------------------
    // PluginManager_Parser
    //-----------------------------------------------------------------------------
    function PluginManager_Parser() {
        this.initialize(...arguments);
    };

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
    };

    PluginManager_Parser.prototype.convertNumber = function(param) {
        return Number(param) ? Number(param) : param;
    };

    PluginManager_Parser.prototype.isObject = function(param, type) {
        return Object.prototype.toString.call(param).slice(8, -1).toLowerCase() === type;
    };

    let params = PluginManager_Parser.prototype.parse(PluginManager.parameters(pluginName));


    //-----------------------------------------------------------------------------
    // CoinExchangeShop
    //-----------------------------------------------------------------------------
    function CoinExchangeShop() {
        throw new Error("This is a static class");
    }

    Object.defineProperties(CoinExchangeShop, {
        exchangeCmd: {
            value: params.exchangeCmd
        },
        coinNumUnit: {
            value: params.coinNumUnit
        },
        coinVariable: {
            value: params.variableID
        }
    });

    Object.defineProperty(CoinExchangeShop, "exchangeShop", {
        get: function() {
            return this._coinExchangeShop;
        },
        set: function(value) {
            this._coinExchangeShop = value;
        }
    });

    Object.defineProperty(CoinExchangeShop, "coin", {
        get: function() {
            return $gameVariables.value(CoinExchangeShop.coinVariable);
        },
        set: function(value) {
            $gameVariables.setValue(CoinExchangeShop.coinVariable, value);
        }
    });


    //-----------------------------------------------------------------------------
    // Scene_CoinExchangeShop
    //-----------------------------------------------------------------------------
    function Scene_CoinExchangeShop() {
        this.initialize(...arguments);
    }

    Scene_CoinExchangeShop.prototype = Object.create(Scene_Shop.prototype);
    Scene_CoinExchangeShop.prototype.constructor = Scene_CoinExchangeShop;

    Scene_CoinExchangeShop.prototype.initialize = function() {
        Scene_Shop.prototype.initialize.call(this);
    };

    Scene_CoinExchangeShop.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.createHelpWindow();
        this.createCoinWindow();
        this.createCommandWindow();
        this.createDummyWindow();
        this.createNumberWindow();
        this.createStatusWindow();
        this.createBuyWindow();
        this.createCategoryWindow();

        this._commandWindow.deactivate();
        this._commandWindow.callHandler("buy");
    };

    Scene_CoinExchangeShop.prototype.createCommandWindow = function() {
        const rect = this.commandWindowRect();
        this._commandWindow = new Window_CoinExchangeShopCmd(rect);
        this._commandWindow.setPurchaseOnly(this._purchaseOnly);
        this._commandWindow.y = this.mainAreaTop();
        this._commandWindow.setHandler("buy", this.commandBuy.bind(this));
        this.addWindow(this._commandWindow);
    };

    Scene_CoinExchangeShop.prototype.activateBuyWindow = function() {
        this._buyWindow.setMoney(CoinExchangeShop.coin);
        this._buyWindow.show();
        this._buyWindow.activate();
        this._statusWindow.show();
    };

    Scene_CoinExchangeShop.prototype.doBuy = function(number) {
        CoinExchangeShop.coin -= number * this.buyingPrice();
        $gameParty.gainItem(this._item, number);
    };

    Scene_CoinExchangeShop.prototype.createCoinWindow = function() {
        const rect = this.goldWindowRect();
        this._goldWindow = new Window_Coin(rect);
        this.addWindow(this._goldWindow);
    }

    Scene_CoinExchangeShop.prototype.coinNumUnit = function() {
        return CoinExchangeShop.coinNumUnit;
    };

    Scene_CoinExchangeShop.prototype.onBuyOk = function() {
        this._item = this._buyWindow.item();
        this._buyWindow.hide();
        this._numberWindow.setup(this._item, this.maxBuy(), this.buyingPrice());
        this._numberWindow.setCurrencyUnit(this.coinNumUnit());
        this._numberWindow.show();
        this._numberWindow.activate();
    };

    Scene_CoinExchangeShop.prototype.onBuyCancel = function() {
        CoinExchangeShop.exchangeShop = false;
        this.popScene();
    };


    //-----------------------------------------------------------------------------
    // Window_CoinExchangeShopCmd
    //-----------------------------------------------------------------------------
    function Window_CoinExchangeShopCmd() {
        this.initialize(...arguments);
    }

    Window_CoinExchangeShopCmd.prototype = Object.create(Window_ShopCommand.prototype);
    Window_CoinExchangeShopCmd.prototype.constructor = Window_CoinExchangeShopCmd;

    Window_CoinExchangeShopCmd.prototype.initialize = function(rect) {
        Window_ShopCommand.prototype.initialize.call(this, rect);
    };

    Window_CoinExchangeShopCmd.prototype.makeCommandList = function() {
        this.addCommand(CoinExchangeShop.exchangeCmd, "buy");
    };


    //-----------------------------------------------------------------------------
    // Window_Coin
    //-----------------------------------------------------------------------------
    function Window_Coin() {
        this.initialize(...arguments);
    }

    Window_Coin.prototype = Object.create(Window_Gold.prototype);
    Window_Coin.prototype.constructor = Window_Coin;

    Window_Coin.prototype.initialize = function(rect) {
        Window_Gold.prototype.initialize.call(this, rect);
        this.refresh();
    };

    Window_Coin.prototype.refresh = function() {
        const rect = this.itemLineRect(0);
        const x = rect.x;
        const y = rect.y;
        const width = rect.width;
        this.contents.clear();
        this.drawCurrencyValue(this.value(), this.coinNumUnit(), x, y, width);
    };

    Window_Coin.prototype.value = function() {
        return CoinExchangeShop.coin;
    };

    Window_Coin.prototype.coinNumUnit = function() {
        return CoinExchangeShop.coinNumUnit;
    };


    //-----------------------------------------------------------------------------
    // Game_Interpreter
    //-----------------------------------------------------------------------------
    const _Game_Interpreter_Command302 = Game_Interpreter.prototype.command302;
    Game_Interpreter.prototype.command302 = function(params) {
        if (CoinExchangeShop.exchangeShop) {
            if (!$gameParty.inBattle()) {
                const goods = [params];
                while (this.nextEventCode() === 605) {
                    this._index++;
                    goods.push(this.currentCommand().parameters);
                }
                SceneManager.push(Scene_CoinExchangeShop);
                SceneManager.prepareNextScene(goods, params[4]);
            }
        } else {
            _Game_Interpreter_Command302.apply(this, arguments);
        }
        return true;
    };
})();
