//=============================================================================
// RPG Maker MZ - CoinShop
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc コインショップを設定します。
 * @author Basu
 * @url https://raw.githubusercontent.com/basuka/RPGMZ/main/CoinShop/CoinShop.js
 *
 * @help CoinShop.js
 *
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加してください
 *
 * 2.「プラグインコマンド」イベントから「コインショップ開始」コマンド
 *   を設定してください。
 *
 * 3.必要に応じてパラメータ及びコマンドパラメータを設定してください。
 *
 *-----------------------------------------------------------------------------
 * README
 *-----------------------------------------------------------------------------
 * https://github.com/basuka/RPGMZ/blob/main/CoinShop/README.md
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
 * @type number
 * @default 11
 * @desc 所持コインの数を保管する変数ID
 *
 * @param buyMsg
 * @text 購入メッセージ
 * @type text
 * @default コイン１枚%1%2になります。何枚購入しますか？
 * @desc 購入時のメッセージを設定
 *       "%1"は価格、"%2"は枚数の単位に置換されます。
 *
 * @param coinNumUnit
 * @text コイン枚数の単位
 * @type text
 * @default 枚
 * @desc コイン枚数の単位を設定
 *
 *
 * @command open
 * @text コインショップ開始
 * @desc コインショップを開きます。
 *
 * @arg price
 * @text 価格
 * @type number
 * @default 20
 * @desc コイン１枚の価格を設定
 */


(() => {

    const pluginName = "CoinShop";

    PluginManager.registerCommand(pluginName, "open", coinShopParams => {
        PluginManager_Parser.prototype.parse(coinShopParams);
        CoinShop.price = coinShopParams.price;
        SceneManager.push(Scene_CoinShop);
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
    // CoinShop
    //-----------------------------------------------------------------------------
    function CoinShop() {
        throw new Error("This is a static class");
    }

    Object.defineProperties(CoinShop, {
        buyMessage: {
            value: params.buyMsg
        },
        coinNumUnit: {
            value: params.coinNumUnit
        },
        coinVariable: {
            value: params.variableID
        }
    });

    Object.defineProperty(CoinShop, "price", {
        get: function() {
            return this._price;
        },
        set: function(value) {
            if (!this._price) {
                this._price = value;
            }
        }
    });

    Object.defineProperty(CoinShop, "coin", {
        get: function() {
            return $gameVariables.value(CoinShop.coinVariable);
        },
        set: function(value) {
            $gameVariables.setValue(CoinShop.coinVariable, value);
        }
    });


    //-----------------------------------------------------------------------------
    // Scene_CoinShop
    //-----------------------------------------------------------------------------
    function Scene_CoinShop() {
        this.initialize(...arguments);
    };

    Scene_CoinShop.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_CoinShop.prototype.constructor = Scene_CoinShop;

    Scene_CoinShop.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
    };

    Scene_CoinShop.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.createHelpWindow();
        this.createGoldWindow();
        this.createCoinWindow();
        this.createPriceWindow();
        this.createCoinBuyCommand();
    };

    Scene_CoinShop.prototype.createHelpWindow = function() {
        Scene_MenuBase.prototype.createHelpWindow.call(this);
        this._helpWindow.y = Graphics.boxHeight - this._helpWindow.height;
    };

    Scene_CoinShop.prototype.start = function() {
        Scene_Base.prototype.start.call(this);
        this._helpWindow.setText(CoinShop.buyMessage.format(CoinShop.price, TextManager.currencyUnit));
    };

    Scene_CoinShop.prototype.createGoldWindow = function() {
        const rect = this.goldWindowRect();
        this._goldWindow = new Window_Gold(rect);
        this.addWindow(this._goldWindow);
    };

    Scene_CoinShop.prototype.goldWindowRect = function() {
        const ww = this.mainCommandWidth();
        const wh = this.calcWindowHeight(1, true);
        const wx = Graphics.boxWidth - ww;
        const wy = this.mainAreaTop();
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_CoinShop.prototype.createCoinWindow = function() {
        const rect = this.coinWindowRect();
        this._coinWindow = new Window_Coin(rect);
        this.addWindow(this._coinWindow);
    };

    Scene_CoinShop.prototype.coinWindowRect = function() {
        const wx = this._goldWindow.x;
        const wy = this._goldWindow.y + this._goldWindow.height;
        const ww = this._goldWindow.width;
        const wh = this._goldWindow.height;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_CoinShop.prototype.createCoinBuyCommand = function() {
        const rect = this.coinBuyCommandWindowRect();
        this._coinBuyCommandWindow = new Window_CoinBuyCommand(rect);
        this._coinBuyCommandWindow.setHandler('buyCoin', this.buyCoin.bind(this));
        this._coinBuyCommandWindow.setHandler("cancel", this.popScene.bind(this));
        this._coinBuyCommandWindow.setPriceWindow(this._priceWindow);
        this.addWindow(this._coinBuyCommandWindow);
    };

    Scene_CoinShop.prototype.coinBuyCommandWindowRect = function() {
        const wx = Graphics.boxWidth * 0.25;
        const wy = Graphics.height * 0.5;
        const ww = 390;
        const wh = this.calcWindowHeight(1, true);
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_CoinShop.prototype.createPriceWindow = function() {
        const rect = this.priceWindowRect();
        this._priceWindow = new Window_Price(rect);
        this.addWindow(this._priceWindow);
        this._priceWindow.x = Graphics.boxWidth - this._priceWindow.width;
        this._priceWindow.y = this._helpWindow.y - this._priceWindow.height;
    };

    Scene_CoinShop.prototype.priceWindowRect = function() {
        const wx = 0;
        const wy = 0;
        const ww = this._goldWindow.width;
        const wh = this._goldWindow.height;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_CoinShop.prototype.buyCoin = function() {
        if (this.price() > Window_Gold.prototype.value()) {
            SoundManager.playBuzzer();
        } else if (this.price() > 0) {
            SoundManager.playShop();
            this.doBuy();
            this.initWindow();
            this.refresh();
        }
        this._coinBuyCommandWindow.activate();
    };

    Scene_CoinShop.prototype.initWindow = function() {
        this._coinBuyCommandWindow.initInfo();
        this._priceWindow.initInfo();
    };

    Scene_CoinShop.prototype.refresh = function() {
      this._goldWindow.refresh();
      this._coinWindow.refresh();
      this._priceWindow.refresh();
      this._coinBuyCommandWindow.refresh();
    };

    Scene_CoinShop.prototype.doBuy = function(number) {
        $gameParty.loseGold(this.price());
        CoinShop.coin += this.coin();
    };

    Scene_CoinShop.prototype.price = function() {
        return this._priceWindow.price();
    };

    Scene_CoinShop.prototype.coin = function() {
        return this._coinBuyCommandWindow.coin();
    };


    //-----------------------------------------------------------------------------
    // Window_CoinBuyCommand
    //-----------------------------------------------------------------------------
    function Window_CoinBuyCommand() {
        this.initialize(...arguments);
    }

    Window_CoinBuyCommand.prototype = Object.create(Window_HorzCommand.prototype);
    Window_CoinBuyCommand.prototype.constructor = Window_CoinBuyCommand;

    Window_CoinBuyCommand.prototype.initialize = function(rect) {
        this.initInfo();
        Window_HorzCommand.prototype.initialize.call(this, rect);
    };

    Window_CoinBuyCommand.prototype.initInfo = function() {
        this._coinNums = [0, 0, 0, 0, 0, 0, 0, 0];
        this._coin = 0;
    };

    Window_CoinBuyCommand.prototype.makeCommandList = function() {
        let index = 0;
        for (const numSheet of this._coinNums) {
            this.addCommand(numSheet, "buyCoin", true, index);
            ++index;
        }
    };

    Window_CoinBuyCommand.prototype.updateBuyCoin = function(value) {
        const scaleNo = this.currentExt();
        this._coinNums[scaleNo] += value;
        if (this._coinNums[scaleNo] > 9) {
            this._coinNums[scaleNo] = 0;
        } else if (this._coinNums[scaleNo] < 0) {
            this._coinNums[scaleNo] = 9;
        }
        SoundManager.playCursor();
        this.refresh();
        this.calcPrice();
    };

    Window_CoinBuyCommand.prototype.maxCols = function() {
        return 8;
    };

    Window_CoinBuyCommand.prototype.upBuyCoin = function() {
        this.updateBuyCoin(1);
    };

    Window_CoinBuyCommand.prototype.downBuyCoin = function() {
        this.updateBuyCoin(-1);
    };

    Window_CoinBuyCommand.prototype.update = function() {
        Window_Selectable.prototype.update.call(this);
        this.buyCoinChange();
    };

    Window_CoinBuyCommand.prototype.buyCoinChange = function() {
        if (this.isOpenAndActive()) {
            if (Input.isRepeated("up")) {
                this.upBuyCoin();
            }
            if (Input.isRepeated("down")) {
                this.downBuyCoin();
            }
        }
    };

    Window_CoinBuyCommand.prototype.calcPrice = function() {

        const coinNums = this._coinNums.reverse();

        let buyCoin = 0;
        let calcPrice = 0;
        let scale = 1;
        for (const coinNum of coinNums) {
            buyCoin += coinNum * scale;
            calcPrice += CoinShop.price * coinNum * scale;
            scale *= 10;
        }

        this._coinNums.reverse();

        this._coin = buyCoin;
        this._priceWindow.setPrice(calcPrice);
    };

    Window_CoinBuyCommand.prototype.setPriceWindow = function(priceWindow) {
        this._priceWindow = priceWindow;
    };

    Window_CoinBuyCommand.prototype.coin = function() {
        return this._coin;
    };


    //-----------------------------------------------------------------------------
    // Window_Coin
    //-----------------------------------------------------------------------------
    function Window_Coin() {
        this.initialize(...arguments);
    }

    Window_Coin.prototype = Object.create(Window_Selectable.prototype);
    Window_Coin.prototype.constructor = Window_Coin;

    Window_Coin.prototype.initialize = function(rect) {
        Window_Selectable.prototype.initialize.call(this, rect);
        this.refresh();
    };

    Window_Coin.prototype.colSpacing = function() {
        return 0;
    };

    Window_Coin.prototype.refresh = function() {
        const rect = this.itemLineRect(0);
        const x = rect.x;
        const y = rect.y;
        const width = rect.width;
        this.contents.clear();
        this.drawCurrencyValue(this.coin(), this.coinNumUnit(), x, y, width);
    };

    Window_Coin.prototype.coin = function() {
        return CoinShop.coin;
    };

    Window_Coin.prototype.coinNumUnit = function() {
        return CoinShop.coinNumUnit;
    };

    Window_Coin.prototype.open = function() {
        this.refresh();
        Window_Selectable.prototype.open.call(this);
    };


    //-----------------------------------------------------------------------------
    // Window_Price
    //-----------------------------------------------------------------------------
    function Window_Price() {
        this.initialize(...arguments);
    }

    Window_Price.prototype = Object.create(Window_Selectable.prototype);
    Window_Price.prototype.constructor = Window_Price;

    Window_Price.prototype.initialize = function(rect) {
        Window_Selectable.prototype.initialize.call(this, rect);
        this.initInfo();
        this.refresh();
    };

    Window_Price.prototype.initInfo = function() {
        this._price = 0;
    };

    Window_Price.prototype.colSpacing = function() {
        return 0;
    };

    Window_Price.prototype.refresh = function() {
        const rect = this.itemLineRect(0);
        const x = rect.x;
        const y = rect.y;
        const width = rect.width;
        this.contents.clear();
        this.drawCurrencyValue(this.price(), this.currencyUnit(), x, y, width);
    };

    Window_Price.prototype.drawCurrencyValue = function(value, unit, x, y, width) {
        const unitWidth = Math.min(80, this.textWidth(unit));
        this.resetTextColor();
        if (value > Window_Gold.prototype.value()) {
            this.contents.textColor = "#ff0000";
        }
        this.drawText(value, x, y, width - unitWidth - 6, "right");
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(unit, x + width - unitWidth, y, unitWidth, "right");
    };

    Window_Price.prototype.price = function() {
        return this._price;
    };

    Window_Price.prototype.currencyUnit = function() {
        return TextManager.currencyUnit;
    };

    Window_Price.prototype.open = function() {
        this.refresh();
        Window_Selectable.prototype.open.call(this);
    };

    Window_Price.prototype.setPrice = function(price) {
        this._price = price;
        this.refresh();
    };
})();
