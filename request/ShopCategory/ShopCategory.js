//=============================================================================
// RPG Maker MZ - ShopCategory
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc カテゴリー別ショップ機能を設定します。
 * @author Basu
 * @url https://raw.githubusercontent.com/basuka/RPGMZ/main/request/ShopCategory/ShopCategory.js
 *
 * @help ShopCategory.js
 *
 * このプラグインは、カテゴリー別ショップコマンドを提供します。
 *
 *
 *■各種設定項目
 *
 * 【商品種別順】
 *   アイコンを表示する商品種別の順番を設定します。
 *
 * 【全種類アイコン画像】
 *   全種類用にするアイコンファイルを設定します。
 *
 * 【全種類アイコン番号】
 *   全種類用にするアイコンファイルの番号を設定します。
 *   デフォルトでは89番目の★アイコンが全種類(ALL)アイコンになっています。
 *
 * 【選択カラー(赤)】
 *   アイコン選択時の色(赤)を設定します。
 *
 * 【選択カラー(緑)】
 *   アイコン選択時の色(緑)を設定します。
 *
 * 【選択カラー(青)】
 *   アイコン選択時の色(青)を設定します。
 *
 * 【選択カラー(透明度)】
 *   アイコン選択時の色(透明度)を設定します。
 *
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加してください
 *
 * 2.追加した本プラグインのパラメータから必要な情報を設定してください
 *   ※デフォルト値のままでも使用はできます
 *
 * 3.「プラグインコマンド【購入カテゴリー】」を設定してください
 *
 * 4.「ショップの処理」イベントを実行してください
 *
 *
 *-----------------------------------------------------------------------------
 * 利用規約
 *-----------------------------------------------------------------------------
 * このプラグインはMITライセンスで配布しています
 *
 *=====================================================================================================================================================
 *
 * @param oradrProductTypes
 * @text 商品種別順
 * @type select[]
 * @option アイテム
 * @value Item
 * @option 武器
 * @value Weapon
 * @option 防具
 * @value Armor
 * @default ["Weapon","Armor","Item"]
 * @desc アイコンを表示する商品種別の順番を設定
 *
 * @param allSelectFileName
 * @text 全種類アイコン画像
 * @type file
 * @dir img/system/
 * @default IconSet
 * @desc 全種類用にするアイコンファイルを設定
 *
 * @param allSelectIconIndex
 * @text 全種類アイコン番号
 * @type number
 * @default 89
 * @desc 全種類用にするアイコンファイルの番号を設定
 *
 * @param selecyCollorR
 * @text 選択カラー(赤)
 * @type number
 * @default 255
 * @desc アイコン選択時の色(赤)を設定
 *
 * @param selecyCollorG
 * @text 選択カラー(緑)
 * @type number
 * @default 119
 * @desc アイコン選択時の色(緑)を設定

 * @param selecyCollorB
 * @text 選択カラー(青)
 * @type number
 * @default 34
 * @desc アイコン選択時の色(青)を設定
 *
 * @param selecyCollorA
 * @text 透明度
 * @type number
 * @min 0.0
 * @max 1.0
 * @decimals 1
 * @default 0.4
 * @desc アイコン選択時の色(透明度)を設定
 *
 *
 * @command buyCategory
 * @text 購入カテゴリー
 * @desc 購入カテゴリーを開始します。
 *
 */

(() => {

    const pluginName = "ShopCategory";
    let buyCategory = false;

    PluginManager.registerCommand(pluginName, "buyCategory", args => {
        buyCategory = true;
    });


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

    const params = PluginManager_Parser.prototype.parse(PluginManager.parameters(pluginName));


    //-----------------------------------------------------------------------------
    // Window_BuyCategory
    //-----------------------------------------------------------------------------

    function Window_BuyCategory() {
        this.initialize.apply(this, arguments);
    }

    Window_BuyCategory.prototype = Object.create(Window_Selectable.prototype);
    Window_BuyCategory.prototype.constructor = Window_BuyCategory;

    Window_BuyCategory.prototype.initialize = function(rect) {
        Window_Selectable.prototype.initialize.call(this, rect);
    };

    Window_BuyCategory.prototype.maxCols = function() {
        return this.maxItems();
    };

    Window_BuyCategory.prototype.colSpacing = function() {
        return 1;
    };

    Window_BuyCategory.prototype.lineWidth = function() {
        return ImageManager.iconWidth;
    };

    Window_BuyCategory.prototype.maxItems = function() {
        return this._data ? this._data.length : 1;
    };

    Window_BuyCategory.prototype.item = function() {
        return this.itemAt(this.index());
    };

    Window_BuyCategory.prototype.itemAt = function(index) {
        return this._data && index >= 0 ? this._data[index] : null;
    };

    Window_BuyCategory.prototype.col = function() {
        const col = this.index() % this.maxCols();
        return Math.floor(this.index() / this.maxCols()) * this.maxCols() + col;
    };

    Window_BuyCategory.prototype.itemWidth = function() {
        return this.lineWidth() + 7;
    };

    Window_BuyCategory.prototype.contentsWidth = function() {
        return this.innerWidth + this.itemWidth();
    };

    Window_BuyCategory.prototype.maxVisibleItems = function() {
        const visibleCols = Math.ceil(this.contentsWidth() / this.itemWidth());
        return visibleCols * this.maxCols();
    };

    Window_BuyCategory.prototype.maxScrollX = function() {
        return Math.max(0, this.overallWidth() - this.innerWidth);
    };

    Window_BuyCategory.prototype.maxScrollY = function() {
        return 0;
    };

    Window_BuyCategory.prototype.overallWidth = function() {
        return this.maxCols() * this.itemWidth();
    };

    Window_BuyCategory.prototype.smoothScrollRight = function(n) {
        this.smoothScrollBy(this.itemWidth() * n, 0);
    };

    Window_BuyCategory.prototype.smoothScrollLeft = function(n) {
        this.smoothScrollBy(-this.itemWidth() * n, 0);
    };

    Window_BuyCategory.prototype.smoothScrollDown = function(n) {
        //
    };

    Window_BuyCategory.prototype.smoothScrollUp = function(n) {
        //
    };

    Window_BuyCategory.prototype.cursorDown = function(wrap) {
        //
    };

    Window_BuyCategory.prototype.cursorUp = function(wrap) {
        //
    };

    Window_BuyCategory.prototype.cursorRight = function(wrap) {
        const index = this.index();
        const maxItems = this.maxItems();
        const maxCols = this.maxCols();
        const horizontal = this.isHorizontal();
        if (index < maxCols - 1 || (wrap && maxCols === 1)) {
            this.smoothSelect((index + 1) % maxItems);
        }
    };

    Window_BuyCategory.prototype.cursorLeft = function(wrap) {
        const index = Math.max(0, this.index());
        const maxItems = this.maxItems();
        const maxCols = this.maxCols();
        const horizontal = this.isHorizontal();
        if (index > 0 || (wrap && maxCols === 1)) {
            this.smoothSelect((index - 1 + maxItems) % maxItems);
        }
    };

    Window_BuyCategory.prototype.cursorPagedown = function() {
        //
    };

    Window_BuyCategory.prototype.cursorPageup = function() {
        //
    };


    Window_BuyCategory.prototype.processWheelScroll = function() {
        if (this.isWheelScrollEnabled() && this.isTouchedInsideFrame()) {
            const threshold = 20;
            if (TouchInput.wheelX >= threshold) {
                this.smoothScrollRight(1);
            }
            if (TouchInput.wheelX <= -threshold) {
                this.smoothScrollLeft(1);
            }
        }
    };

    Window_BuyCategory.prototype.ensureCursorVisible = function(smooth) {
        if (this._cursorAll) {
            this.scrollTo(0, 0);
        } else if (this.innerWidth > 0 && this.col() >= 0) {
            const scrollX = this.scrollX();
            const itemLeft = this.col() * this.itemWidth();
            const itemRight = itemLeft + this.itemWidth();
            const scrollMin = itemRight - this.innerWidth;

            if (scrollX > itemLeft) {
                if (smooth) {
                    this.smoothScrollTo(itemLeft, 0);
                } else {
                    this.scrollTo(itemLeft, 0);
                }
            } else if (scrollX < scrollMin) {
                if (smooth) {
                    this.smoothScrollTo(scrollMin, 0);
                } else {
                    this.scrollTo(scrollMin, 0);
                }
            }
        }
    };

    Window_BuyCategory.prototype._createArrowSprites = function() {
        this._rightArrowSprite = new Sprite();
        this.addChild(this._rightArrowSprite);
        this._leftArrowSprite = new Sprite();
        this.addChild(this._leftArrowSprite);
    };

    Window_BuyCategory.prototype._updateArrows = function() {
        this._rightArrowSprite.visible = this.isOpen() && this.rightArrowVisible;
        this._leftArrowSprite.visible = this.isOpen() && this.leftArrowVisible;
    };

    Window_BuyCategory.prototype.updateArrows = function() {
        this.rightArrowVisible = this._scrollX < this.maxScrollX();
        this.leftArrowVisible = this._scrollX > 0;
    };

    Window_BuyCategory.prototype._refreshArrows = function() {
        const w = this._width;
        const h = this._height;
        const p = 24;
        const q = p / 2;
        const sx = 96 + p;
        const sy = 0 + p;
        const d = -90;
        this._rightArrowSprite.bitmap = ImageManager.loadSystem("Window");
        this._rightArrowSprite.anchor.x = 0.5;
        this._rightArrowSprite.anchor.y = 0.5;
        this._rightArrowSprite.setFrame(sx + q, sy + q + p, p, q);
        this._rightArrowSprite.move(w - 6, h / 2);
        this._rightArrowSprite.angle = -90

        this._leftArrowSprite.bitmap = ImageManager.loadSystem("Window");
        this._leftArrowSprite.anchor.x = 0.5;
        this._leftArrowSprite.anchor.y = 0.5;
        this._leftArrowSprite.setFrame(sx + q, sy, p, q);
        this._leftArrowSprite.move(6, h / 2);
        this._leftArrowSprite.angle = -90
    };

    Window_BuyCategory.prototype.setupGoods = function(shopGoods) {
        this._selectIndex = 0;
        this._shopGoods = shopGoods;
        this.refresh();
        this.select(0);
    };


    Window_BuyCategory.prototype.refresh = function() {
        this.makeIconList();
        Window_Selectable.prototype.refresh.call(this);
    };

    Window_BuyCategory.prototype.makeIconList = function() {
        this._data = [params.allSelectIconIndex];

        const iconDatas = {};
        const setIconIndex = [];

        for (productType of params.oradrProductTypes) {
            iconDatas[productType] = [];
        };

        for (const goods of this._shopGoods) {
            const item = this._buyWindow.goodsToItem(goods)
            if (item && !setIconIndex.includes(item.iconIndex)) {
                const typeData = this.getTypeData(item);
                iconDatas[typeData[0]].push({
                    index: item.iconIndex,
                    typeId: typeData[1]
                })
                setIconIndex.push(item.iconIndex);
                iconDatas[typeData[0]].sort((a, b) => a.typeId - b.typeId);
            }

        }

        for (iconType in iconDatas) {
            for (iconData of iconDatas[iconType]) {
                this._data.push(iconData.index);
            }
        }
    };


    Window_BuyCategory.prototype.itemRect = function(index) {
        const maxCols = this.maxCols();
        const itemWidth = this.itemWidth();
        const itemHeight = this.itemHeight();
        const colSpacing = this.colSpacing();
        const rowSpacing = this.rowSpacing();
        const col = index % maxCols
        const addCol = Math.floor(index / maxCols) * maxCols + col;
        const row = 0;
        const x = addCol * itemWidth + colSpacing / 2 - this.scrollBaseX();
        const y = row * itemHeight + rowSpacing / 2 - this.scrollBaseY();
        const width = itemWidth - colSpacing + 5;
        const height = itemHeight - rowSpacing + 5;
        return new Rectangle(x, y + 2, width, height);
    };

    Window_BuyCategory.prototype.itemLineRect = function(index) {
        const rect = this.itemRectWithPadding(index);
        const padding = Math.floor((rect.width - this.lineWidth()) / 2);
        rect.x += padding;
        rect.width -= padding * 2;
        return rect;
    };

    Window_BuyCategory.prototype.drawItem = function(index) {
        const item = this.itemAt(index);
        const rect = this.itemLineRect(index);
        if (item) {
            const iconX = rect.x + (this.lineWidth() - ImageManager.iconWidth) / 2;
            this.drawCategoryIcon(item, rect.x, rect.y + 5);
        }
    };

    Window_BuyCategory.prototype.drawCategoryIcon = function(iconIndex, x, y) {
        const bitmap = ImageManager.loadSystem(params.allSelectFileName);
        const pw = ImageManager.iconWidth;
        const ph = ImageManager.iconHeight;
        const sx = (iconIndex % 16) * pw;
        const sy = Math.floor(iconIndex / 16) * ph;
        this.contents.blt(bitmap, sx, sy, pw, ph, x, y);

        if (iconIndex === this.item()) {
            const fillBitmap = this.fillAll(x, y, pw, ph);
            this.contents.blt(fillBitmap, 0, 0, pw, ph, x, y);
        }
    };

    Window_BuyCategory.prototype.fillAll = function(x, y, pw, ph) {
        const bitmap = new Bitmap(pw, ph)
        const context = bitmap._context;
        context.fillStyle = this.makeColor();
        bitmap.fillAll();
        return bitmap;
    }

    Window_BuyCategory.prototype.makeColor = function() {
        const rgbaParam = [params.selecyCollorR, params.selecyCollorG, params.selecyCollorB, params.selecyCollorA].toString();
        return "rgba(" + rgbaParam + ")";
    }

    Window_BuyCategory.prototype.drawItemBackground = function(index) {
        //
    };

    Window_BuyCategory.prototype.setBuyWindow = function(buyWindow) {
        this._buyWindow = buyWindow;
        this._buyWindow.deselect();
        this._buyWindow.callUpdateHelp();
    };

    Window_BuyCategory.prototype.update = function() {
        Window_Selectable.prototype.update.call(this);
        if (this._buyWindow) {
            if (this._selectIndex !== this.item()) {
                this.redrawItem(this._data.indexOf(this._selectIndex));
                this.redrawItem(this._data.indexOf(this.item()));
                this._buyWindow.setIconIndex(this.item());
                this._buyWindow.refresh();
                this._selectIndex = this.item();
            }
        }
    };

    Window_BuyCategory.prototype.getTypeData = function(item) {
        if (DataManager.isWeapon(item)) {
            return ["Weapon", item.wtypeId];
        } else if (DataManager.isArmor(item)) {
            return ["Armor", item.atypeId];
        } else {
            return ["Item", 0]
        }
    };


    //-----------------------------------------------------------------------------
    // Window_ShopBuy
    //-----------------------------------------------------------------------------

    const _Window_ShopBuy_MakeItemList = Window_ShopBuy.prototype.makeItemList;
    Window_ShopBuy.prototype.makeItemList = function() {
        if (buyCategory && this._iconIndex !== params.allSelectIconIndex) {
            this._data = [];
            this._price = [];
            for (const goods of this._shopGoods) {
                const item = this.goodsToItem(goods);
                if (item && item.iconIndex === this._iconIndex) {
                    this._data.push(item);
                    this._price.push(goods[2] === 0 ? item.price : goods[3]);
                }
            }
        } else {
            _Window_ShopBuy_MakeItemList.apply(this, arguments);
        }
    };

    Window_ShopBuy.prototype.setIconIndex = function(iconIndex) {
        this._iconIndex = iconIndex;
    };


    //-----------------------------------------------------------------------------
    // Scene_Shop
    //-----------------------------------------------------------------------------

    const _Scene_Shop_terminate = Scene_Shop.prototype.terminate;
    Scene_Shop.prototype.terminate = function() {
        _Scene_Shop_terminate.call(this);
        buyCategory = false;
    };

    const _Scene_Shop_Create = Scene_Shop.prototype.create;
    Scene_Shop.prototype.create = function() {
        _Scene_Shop_Create.apply(this, arguments);
        if (buyCategory) {
            this.createBuyCategoryWindow();
            this.createDummyStatusWindow();
        }
    };

    Scene_Shop.prototype.createBuyCategoryWindow = function() {
        const rect = this.buyCategoryWindowRect();
        this._buyCategoryWindow = new Window_BuyCategory(rect);
        this._buyCategoryWindow.setBuyWindow(this._buyWindow);
        this._buyCategoryWindow.setupGoods(this._goods);
        this._buyCategoryWindow.hide();
        this._buyCategoryWindow.setHandler("ok", this.onBuyCategoryOk.bind(this));
        this._buyCategoryWindow.setHandler("cancel", this.onBuyCategoryCancel.bind(this));
        this.addWindow(this._buyCategoryWindow);
    };

    Scene_Shop.prototype.onBuyCategoryOk = function() {
        this._buyCategoryWindow.deactivate();
        this.activateBuyWindow();
        this._buyWindow.select(0);
        this._statusDummyWindow.hide();
    };

    Scene_Shop.prototype.onBuyCategoryCancel = function() {
        this._commandWindow.activate();
        this._dummyWindow.show();
        this._buyCategoryWindow.hide();
        this._buyCategoryWindow.forceSelect(0);
        this._buyWindow.hide();
        this._statusDummyWindow.hide();
        this._statusWindow.setItem(null);
        this._helpWindow.clear();
    };

    Scene_Shop.prototype.buyCategoryWindowRect = function() {
        const wx = 0;
        const wy = this._dummyWindow.y;
        const ww = Graphics.boxWidth - this.statusWidth();
        const wh = this.calcWindowHeight(1, true);
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_Shop.prototype.createDummyStatusWindow = function() {
        const rect = this.statusWindowRect();
        this._statusDummyWindow = new Window_Base(rect);
        this._statusDummyWindow.hide();
        this.addWindow(this._statusDummyWindow);
    };

    const _Scene_Shop_CommandBuy = Scene_Shop.prototype.commandBuy;
    Scene_Shop.prototype.commandBuy = function() {
        _Scene_Shop_CommandBuy.apply(this, arguments);
        if (buyCategory) {
            this._buyWindow.deactivate();
            this._buyWindow.deselect();
            this._buyCategoryWindow.show();
            this._buyCategoryWindow.activate();
            this._statusWindow.hide();
            this._statusDummyWindow.show();
        }
    };

    const _Scene_Shop_BuyWindowRect = Scene_Shop.prototype.buyWindowRect;
    Scene_Shop.prototype.buyWindowRect = function() {
        if (buyCategory) {
            const wx = 0;
            const wy = this._dummyWindow.y + this.calcWindowHeight(1, true);
            const ww = Graphics.boxWidth - this.statusWidth();
            const wh = this._dummyWindow.height - this.calcWindowHeight(1, true);
            return new Rectangle(wx, wy, ww, wh);
        } else {
            return _Scene_Shop_BuyWindowRect.apply(this, arguments);
        }
    };

    const _Scene_Shop_OnBuyOk = Scene_Shop.prototype.onBuyOk;
    Scene_Shop.prototype.onBuyOk = function() {
        _Scene_Shop_OnBuyOk.apply(this, arguments);
        if (buyCategory) {
            this._buyCategoryWindow.hide();
        }
    };

    const _Scene_Shop_OnBuyCancel = Scene_Shop.prototype.onBuyCancel;
    Scene_Shop.prototype.onBuyCancel = function() {
        _Scene_Shop_OnBuyCancel.apply(this, arguments);
        if (buyCategory) {
            this._commandWindow.updateInputData();
            this._commandWindow.deactivate();
            this._commandWindow.callOkHandler();
            this._buyWindow.forceSelect(0);
            this._buyWindow.deselect();
            this._statusWindow.hide();
            this._statusDummyWindow.show();
            this._helpWindow.clear();
        }
    };

    const _Scene_Shop_EndNumberInput = Scene_Shop.prototype.endNumberInput;
    Scene_Shop.prototype.endNumberInput = function() {
        _Scene_Shop_EndNumberInput.apply(this, arguments);
        if (buyCategory && this._commandWindow.currentSymbol() === "buy") {
            this._buyCategoryWindow.show();
        }
    };

})();
