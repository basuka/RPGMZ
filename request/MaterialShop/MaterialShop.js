//=============================================================================
// RPG Maker MZ - MaterialShop
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc 素材付きショップ機能を設定します。
 * @author Basu
 *
 * @help MaterialShop.js
 *
 * このプラグインは、素材付きショップコマンドを提供します。
 *
 *■事前設定
 *
 * 1.データベースにショップに登録するアイテム及び素材に使うアイテムを設定します。
 *
 *■各種設定項目
 *
 *  ■アイテムリストの設定
 *
 *    【アイテム種別】
 *      ショップに登録するアイテム種別の設定をします。
 *
 *    【アイテム】
 *      ショップに登録するアイテムを設定します。
 *      この項目は【アイテム種別】で「アイテム」を設定した場合有効となります。
 *
 *    【武器】
 *      ショップに登録する武器を設定します。
 *      この項目は【アイテム種別】で「武器」を設定した場合有効となります。
 *
 *    【防具】
 *      ショップに登録する防具を設定します。
 *      この項目は【アイテム種別】で「武器」を設定した場合有効となります。
 *
 *     ■素材情報
 *
 *      【素材】
 *        アイテムの購入に必要な素材を設定します。
 *
 *      【個数】
 *        アイテムの購入に必要な素材の必要個数を設定します。
 *
 *    【価格の指定】
 *      価格を指定するか設定します。
 *
 *    【価格】
 *      アイテムの購入に必要な価格を設定します。
 *      この項目は【価格の指定】で「指定する」を設定した場合有効となります。
 *
 * 【購入のみ】
 *   購入限定(売却不可)にするか設定を行います。
 *=====================================================================================================================================================
 *
 * @command setShop
 * @text ショップの設定
 * @desc ショップ機能の設定を行います。
 *
 * @arg shopItemInfos
 * @type struct<shopItemInfo>[]
 * @text アイテムリストの設定
 * @desc ショップに登録するアイテムリストを設定します。
 *
 * @arg purchaseOnly
 * @type boolean
 * @text 購入のみ
 * @on 購入のみ
 * @off 売買共通
 * @default false
 * @desc 購入のみか設定
 */

/*~struct~shopItemInfo:ja
 *
 * @param itemType
 * @text アイテム種別
 * @type select
 * @option アイテム
 * @value 0
 * @option 武器
 * @value 1
 * @option 防具
 * @value 2
 * @desc ショップに登録するアイテムの種類
 *
 * @param itemId
 * @text アイテム
 * @type item
 * @desc ショップに登録するアイテム
 *       【アイテム種別】で「アイテム」を設定した場合有効
 *
 * @param weaponId
 * @text 武器
 * @type weapon
 * @desc ショップに登録する武器
 *       【アイテム種別】で「武器」を設定した場合有効
 *
 * @param armorId
 * @text 防具
 * @type armor
 * @desc ショップに登録する防具
 *       【アイテム種別】で「防具」を設定した場合有効
 *
 * @param materialItemInfos
 * @text 素材情報
 * @type struct<materialItemInfo>[]
 * @desc アイテム購入に必要な素材情報
 *
 * @param specifyPrice
 * @text 価格の指定
 * @type boolean
 * @on 指定する
 * @off 指定しない
 * @default false
 * @desc 価格を指定するか設定
 *
 * @param price
 * @text 価格
 * @type number
 * @default 0
 * @desc アイテム購入に必要な価格の指定
 *       【価格の指定】で「指定する」を設定した場合有効
 */

/*~struct~materialItemInfo:ja
 *
 * @param materialId
 * @text 素材
 * @type item
 * @desc アイテム購入に必要な素材
 *
 * @param quantity
 * @text 個数
 * @type number
 * @default 1
 * @min 1
 * @desc 必要な素材の個数
*/
$teleport = null;

(() => {

  const pluginName = "MaterialShop";

  let shopGoods = [];
  let materials = {};
  let purchaseOnly = false;
  let drawMaterialItem = true;

  PluginManager.registerCommand(pluginName, "setShop", inputMaterialShopParam => {
    PluginManager_Parser.prototype.parse(inputMaterialShopParam);
    const materialShop = new MaterialShop();
    materialShop.setParams(inputMaterialShopParam);
  });


  //-----------------------------------------------------------------------------
  // PluginManager_Parser
  //-----------------------------------------------------------------------------
  function PluginManager_Parser() {
    this.initialize(...arguments);
  }

  PluginManager_Parser.prototype.parse = function (params) {
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

  PluginManager_Parser.prototype.convertNumber = function (param) {
      return Number(param) ? Number(param) : param;
  }

  PluginManager_Parser.prototype.isObject = function (param, type) {
      return Object.prototype.toString.call(param).slice(8, -1).toLowerCase() === type;
  }


  //-----------------------------------------------------------------------------
  // MaterialShop
  //-----------------------------------------------------------------------------

  function MaterialShop() {
    this.initialize(...arguments);
  }

  MaterialShop.prototype.initialize = function() {
    shopGoods = [];
    materials = {};
  }

  MaterialShop.prototype.setParams = function(inputMaterialShopParam) {
    for (const shopItem of inputMaterialShopParam.shopItemInfos) {
      const materialItemInfos = shopItem.materialItemInfos;
      
      let itemId = 0;
      if (shopItem.itemType === 0) {
        itemId = shopItem.itemId;
      } else if (shopItem.itemType === 1) {
        itemId = shopItem.weaponId;
      } else {
        itemId = shopItem.armorId;
      }

      let specifyPrice = 0;
      if (shopItem.specifyPrice) {
        specifyPrice = 1;
      }

      let price = $dataItems[itemId].price;

      if (shopItem.specifyPrice) {
        price = shopItem.price;
      }

      if (!shopGoods.length) {
        purchaseOnly = inputMaterialShopParam.purchaseOnly;
        shopGoods.push([shopItem.itemType, itemId, specifyPrice, price, inputMaterialShopParam.purchaseOnly]);
      } else {
        shopGoods.push([shopItem.itemType, itemId, specifyPrice, price])
      }
      materials[itemId] = {itemType : shopItem.itemType, materialItemInfos : shopItem.materialItemInfos};
    }

    SceneManager.push(Scene_MaterialShop);

  };


  //-----------------------------------------------------------------------------
  // Window_MaterialShopCommand
  //-----------------------------------------------------------------------------

  function Window_MaterialShopCommand() {
    this.initialize(...arguments);
  }

  Window_MaterialShopCommand.prototype = Object.create(Window_ShopCommand.prototype);
  Window_MaterialShopCommand.prototype.constructor = Window_MaterialShopCommand;

  Window_MaterialShopCommand.prototype.initialize = function(rect) {
    Window_HorzCommand.prototype.initialize.call(this, rect);
  };

  Window_MaterialShopCommand.prototype.setPurchaseOnly = function(purchaseOnly) {
    this._purchaseOnly = purchaseOnly;
    this.refresh();
  };

  Window_MaterialShopCommand.prototype.makeCommandList = function() {
    this.addCommand(TextManager.buy, "buy");
    this.addCommand(TextManager.sell, "sell", !purchaseOnly);
    this.addCommand(TextManager.cancel, "cancel");
  };


  //-----------------------------------------------------------------------------
  // Window_MaterialShopBuy
  //-----------------------------------------------------------------------------

  function Window_MaterialShopBuy() {
    this.initialize(...arguments);
  }

  Window_MaterialShopBuy.prototype = Object.create(Window_ShopBuy.prototype);
  Window_MaterialShopBuy.prototype.constructor = Window_MaterialShopBuy;

  Window_MaterialShopBuy.prototype.isEnabled = function(item) {
    let enabled = item && this.price(item) <= this._money && !$gameParty.hasMaxItems(item)
    if (enabled) {
      for (const material of materials[item.id].materialItemInfos) {
        const materialItem = $dataItems[material.materialId];
        enabled = this.isMaterialQuantity(materialItem, material.quantity);
        if (!enabled) {
          break;
        }
      }
    }
    return enabled;
  };

  Window_MaterialShopBuy.prototype.isMaterialQuantity = function(item, quantity) {
    return item && quantity <= $gameParty.numItems(item);
  };

  Window_MaterialShopBuy.prototype.makeItemList = function() {
    this._data = [];
    this._price = [];
    for (const goods of shopGoods) {
        const item = this.goodsToItem(goods);
        if (item) {
            this._data.push(item);
            this._price.push(goods[2] === 0 ? item.price : goods[3]);
        }
    }
  };

  Window_MaterialShopBuy.prototype.setMaterialItemWindow = function(materialItemWindow) {
    this._materialItemWindow = materialItemWindow;
    this.callUpdateHelp();
  };

  Window_MaterialShopBuy.prototype.updateHelp = function() {
    Window_ShopBuy.prototype.updateHelp.call(this);
    if (this._materialItemWindow) {
        this._materialItemWindow.setItem(this.item());
    }
  };

  Window_MaterialShopBuy.prototype.processCursorMove = function() {
    Window_ShopBuy.prototype.processCursorMove.call(this);
    if (this.isCursorMovable()) {
        if (Input.isRepeated("right")) {
            if (drawMaterialItem) {
                drawMaterialItem = false;
            } else {
                drawMaterialItem = true;
            }
            this._materialItemWindow.refresh();
            this.playCursorSound();
        }
        if (Input.isRepeated("left")) {
            if (drawMaterialItem) {
                drawMaterialItem = false;
            } else {
                drawMaterialItem = true;
            }
            this._materialItemWindow.refresh();
            this.playCursorSound();
        }
        
    }
  };


  //-----------------------------------------------------------------------------
  // Window_MaterialItem
  //-----------------------------------------------------------------------------

  function Window_MaterialItem() {
    this.initialize(...arguments);
  }

  Window_MaterialItem.prototype = Object.create(Window_ShopStatus.prototype);
  Window_MaterialItem.prototype.constructor = Window_MaterialItem;

  Window_MaterialItem.prototype.initialize = function(rect) {
    Window_StatusBase.prototype.initialize.call(this, rect);
    this._item = null;
    this._pageIndex = 0;
    this._number = 1;
    this.refresh();
  };

  Window_MaterialItem.prototype.refresh = function() {
    this.contents.clear();
    if (this._item) {
        const x = this.itemPadding();
        this.drawPossession(x, 0);

        const y = Math.floor(this.lineHeight() * 1.5)

        if (drawMaterialItem || !this.isEquipItem()) {
           this.drawMaterial(x, y);
        } else {
           this.drawEquipInfo(x, y);
        }
    }
  };

  Window_MaterialItem.prototype.setItem = function(item) {
    this._item = item;
    this.refresh();
  };

  Window_MaterialItem.prototype.drawMaterial = function(x, y) {
    const width = this.innerWidth - this.itemPadding() - x;
    const possessionWidth = this.textWidth("0000");

    y += Math.floor(this.lineHeight() * 0.5);
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(TextManager.materialMsg, x, y, width - possessionWidth);

    for (const material of materials[this._item.id].materialItemInfos) {
      const width = this.innerWidth - x - this.itemPadding();
      y += Math.floor(this.lineHeight() * 1.5);

      const materialItem = $dataItems[material.materialId];
      const enabled = Window_MaterialShopBuy.prototype.isMaterialQuantity(materialItem, material.quantity);

      this.changePaintOpacity(enabled);
      this.resetTextColor();
      this.drawMaterialQuantity(x, y, materialItem, material.quantity * this._number);
      this.drawItemName(materialItem, x, y, width);
      this.changePaintOpacity(true);
    }
  };

  Window_MaterialItem.prototype.drawMaterialQuantity = function(
    x, y, item, quantity
) {
    const width = this.innerWidth - this.itemPadding() - x;
    const paramId = this.paramId();
    const possQuantity = $gameParty.numItems(item);
    const drawQuantity = TextManager.quantity.format(possQuantity, quantity);
    this.drawText(drawQuantity, x, y, width, "right");
  };

  Window_MaterialItem.prototype.setNumber = function(number) {
    this._number = number;
  }


  //-----------------------------------------------------------------------------
  // Window_MaterialShopNumber
  //-----------------------------------------------------------------------------

  function Window_MaterialShopNumber() {
    this.initialize(...arguments);
  }

  Window_MaterialShopNumber.prototype = Object.create(Window_ShopNumber.prototype);
  Window_MaterialShopNumber.prototype.constructor = Window_ShopNumber;

  Window_MaterialShopNumber.prototype.refresh = function() {
    Window_Selectable.prototype.refresh.call(this);
    this.drawItemBackground(0);
    this.drawCurrentItemName();
    this.drawMultiplicationSign();
    this.drawNumber();
    this.drawHorzLine();
    this.drawTotalPrice();

    this._materialItemWindow.setNumber(this._number);
    this._materialItemWindow.refresh();
  };

  Window_MaterialShopNumber.prototype.setMaterialItemWindow = function(materialItemWindow) {
    this._materialItemWindow = materialItemWindow;
  };


  //-----------------------------------------------------------------------------
  // Scene_MaterialShop
  //-----------------------------------------------------------------------------

  function Scene_MaterialShop() {
    this.initialize(...arguments);
  }

  Scene_MaterialShop.prototype = Object.create(Scene_Shop.prototype);
  Scene_MaterialShop.prototype.constructor = Scene_MaterialShop;

  Scene_MaterialShop.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
  };

  Scene_MaterialShop.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createHelpWindow();
    this.createGoldWindow();
    this.createCommandWindow();
    this.createDummyWindow();
    this.createMaterialWindow();
    this.createNumberWindow();
    this.createBuyWindow();
    this.createCategoryWindow();
    this.createSellWindow();
  };

  Scene_MaterialShop.prototype.createMaterialWindow = function() {
    const rect = this.statusWindowRect();
    this._materialItemWindow = new Window_MaterialItem(rect);
    this._materialItemWindow.hide();
    this.addWindow(this._materialItemWindow);
  };

  Scene_MaterialShop.prototype.createBuyWindow = function() {
    const rect = this.buyWindowRect();
    this._buyWindow = new Window_MaterialShopBuy(rect);
    this._buyWindow.setupGoods(this._goods);
    this._buyWindow.setHelpWindow(this._helpWindow);
    this._buyWindow.setMaterialItemWindow(this._materialItemWindow);
    this._buyWindow.hide();
    this._buyWindow.setHandler("ok", this.onBuyOk.bind(this));
    this._buyWindow.setHandler("cancel", this.onBuyCancel.bind(this));
    this.addWindow(this._buyWindow);
  };

  Scene_MaterialShop.prototype.createCommandWindow = function() {
    const rect = this.commandWindowRect();
    this._commandWindow = new Window_MaterialShopCommand(rect);
    this._commandWindow.setPurchaseOnly(this._purchaseOnly);
    this._commandWindow.y = this.mainAreaTop();
    this._commandWindow.setHandler("buy", this.commandBuy.bind(this));
    this._commandWindow.setHandler("sell", this.commandSell.bind(this));
    this._commandWindow.setHandler("cancel", this.popScene.bind(this));
    this.addWindow(this._commandWindow);
  };

  Scene_MaterialShop.prototype.createNumberWindow = function() {
    const rect = this.numberWindowRect();
    this._numberWindow = new Window_MaterialShopNumber(rect);
    this._numberWindow.setMaterialItemWindow(this._materialItemWindow);
    this._numberWindow.hide();
    this._numberWindow.setHandler("ok", this.onNumberOk.bind(this));
    this._numberWindow.setHandler("cancel", this.onNumberCancel.bind(this));
    this.addWindow(this._numberWindow);
  };

  Scene_MaterialShop.prototype.activateBuyWindow = function() {
    this._buyWindow.setMoney(this.money());
    this._buyWindow.show();
    this._buyWindow.activate();
    this._materialItemWindow.show();
  };

  Scene_MaterialShop.prototype.activateSellWindow = function() {
    if (this._categoryWindow.needsSelection()) {
        this._categoryWindow.show();
    }
    this._sellWindow.refresh();
    this._sellWindow.show();
    this._sellWindow.activate();
    this._materialItemWindow.hide();
  };

  Scene_MaterialShop.prototype.onBuyOk = function() {
    this._item = this._buyWindow.item();
    this._buyWindow.hide();
    this._numberWindow.setup(this._item, this.maxBuy(), this.buyingPrice());
    this._numberWindow.setCurrencyUnit(this.currencyUnit());
    this._numberWindow.show();
    this._numberWindow.activate();
    drawMaterialItem = true;
    this._materialItemWindow.refresh();
  };

  Scene_MaterialShop.prototype.onBuyCancel = function() {
    this._commandWindow.activate();
    this._dummyWindow.show();
    this._buyWindow.hide();
    this._materialItemWindow.hide();
    this._helpWindow.clear();
  };

  Scene_MaterialShop.prototype.doBuy = function(number) {
    $gameParty.loseGold(number * this.buyingPrice());
    $gameParty.gainItem(this._item, number);
    for (const material of materials[this._item.id].materialItemInfos) {
      const materialItem = $dataItems[material.materialId];
      $gameParty.loseItem(materialItem, number * material.quantity);
    }
  };

  Scene_MaterialShop.prototype.maxBuy = function() {
    const num = $gameParty.numItems(this._item);
    const max = $gameParty.maxItems(this._item) - num;
    const price = this.buyingPrice();
    if (price > 0) {
        return Math.min(max, this.maxMaterial(Math.floor(this.money() / price)));
    } else {
        return max;
    }
  };

  Scene_MaterialShop.prototype.onSellOk = function() {
    this._item = this._sellWindow.item();
    this._categoryWindow.hide();
    this._sellWindow.hide();
    this._numberWindow.setup(this._item, this.maxSell(), this.sellingPrice());
    this._numberWindow.setCurrencyUnit(this.currencyUnit());
    this._numberWindow.show();
    this._numberWindow.activate();
    drawMaterialItem = false;
    this._materialItemWindow.setItem(this._item);
    this._materialItemWindow.show();
  };

  Scene_MaterialShop.prototype.onSellCancel = function() {
    this._sellWindow.deselect();
    this._materialItemWindow.setItem(null);
    this._helpWindow.clear();
    if (this._categoryWindow.needsSelection()) {
        this._categoryWindow.activate();
    } else {
        this.onCategoryCancel();
    }
  };

  Scene_MaterialShop.prototype.maxMaterial = function(max) {
    for (const material of materials[this._item.id].materialItemInfos) {
      const materialItem = $dataItems[material.materialId];
      const numMaterialItem = $gameParty.numItems(materialItem);
      max = Math.min(max, Math.floor(numMaterialItem / material.quantity));
    }
    return max;
  }

  Scene_MaterialShop.prototype.onNumberOk = function() {
    SoundManager.playShop();
    switch (this._commandWindow.currentSymbol()) {
        case "buy":
            this.doBuy(this._numberWindow.number());
            break;
        case "sell":
            this.doSell(this._numberWindow.number());
            break;
    }
    this.endNumberInput();
    this._goldWindow.refresh();
    this._materialItemWindow.refresh();
  };

  Scene_MaterialShop.prototype.commandBuy = function() {
    drawMaterialItem = true;
    Scene_Shop.prototype.commandBuy.call(this);
  };

  Scene_MaterialShop.prototype.commandSell = function() {
    drawMaterialItem = false;
    Scene_Shop.prototype.commandSell.call(this);
  };


  //-----------------------------------------------------------------------------
  // TextManagerオブジェクトにス素材ショップ用のプロパティを追加
  //-----------------------------------------------------------------------------
  Scene_Boot.prototype.createTextManager = function() {
     Object.defineProperties(TextManager, {
        quantity: TextManager.getter("material", "quantity"),
        materialMsg: TextManager.getter("material", "materialMsg")
     });
  }


  //-----------------------------------------------------------------------------
  // TextManager
  //-----------------------------------------------------------------------------

  //-----------------------------------------------------------------------------
  // 素材ショップ用に作成したメッセージの取得
  //-----------------------------------------------------------------------------
  TextManager.material = function(createId) {
    return TextManager.materialShopDataSysytem()[createId] || "";
  };

  //-----------------------------------------------------------------------------
  // 素材ショップ用に作成したメッセージ
  //-----------------------------------------------------------------------------
  TextManager.materialShopDataSysytem = function() {
     return {"quantity":"%1/%2",
             "materialMsg":"必要素材"
            };
  }

})();
