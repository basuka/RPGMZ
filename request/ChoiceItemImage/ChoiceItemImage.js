//=============================================================================
// RPG Maker MZ - ChoiceItemImage
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc アイテム選択画像機能を実装します。
 * @author Basu
 * @url https://raw.githubusercontent.com/basuka/RPGMZ/main/request/ChoiceItemImage/ChoiceItemImage.js
 *
 *
 * @help パラメータ・コマンドの設定項目
 *
 * 【パラメータ】
 *
 * ■アイテム画像
 * アイテムとアイテムに対応する画像の設定を行います。
 *
 * 　・アイテム
 * 　画像を設定するアイテムの設定を行います。
 *
 * 　・画像情報
 * 　画像情報の設定を行います。
 *
 * 　　・画像ファイル
 * 　　使用するがぞファイルの設定を行います。
 *
 * 　　・原点
 * 　　画像を表示する原点の設定を行います。
 * 　　ウィンドウ内の左上から顔画像のサイズを基に計算されます。
 *
 * 　　・X座標
 * 　　画像を表示するX座標の設定を行います。
 *
 * 　　・Y座標
 * 　　画像を表示するY座標の設定を行います。
 *
 * 　　・倍率(幅)
 * 　　画像の倍率(幅)の設定を行います。
 *
 * 　　・倍率(高さ)
 * 　　画像の倍率(高さ)の設定を行います。
 *
 * 　　・不透明度
 * 　　画像の不透明度の設定を行います。
 *
 * ■デフォルト画像
 * デフォルトで表示する画像の設定を行います。
 * アイテム画像で設定されていないアイテムはデフォルトの画像で表示されます。
 *
 * 　・画像情報
 * 　画像情報の設定を行います。(アイテム画像の画像情報と同様)
 *
 * ■アイテム名色
 * 画像と表示されるアイテム名の文字色の設定を行います。
 *
 * ■画像間隔
 * 画像と文字の間隔幅の設定を行います。
 *
 *
 *=====================================================================================================================================================
 * @param itemImageList
 * @text アイテム画像
 * @type struct<itemImage>[]
 * @desc アイテムと画像を設定
 *
 * @param defaultImageInfo
 * @text デフォルト画像
 * @type struct<imageInfo>
 * @desc デフォルトのアイテムと画像を設定
 *       アイテム画像で設定されていないアイテムはデフォルトの画像で表示されます
 *
 * @param nameColor
 * @text アイテム名色
 * @type string
 * @default #87cefa
 * @desc 画像と表示されるアイテム名の文字色を設定
 *
 * @param textMargin
 * @text 画像間隔
 * @type number
 * @default 4
 * @desc 画像と文字の間隔幅を設定
 */

/*~struct~itemImage:ja
 * @param itemId
 * @text アイテム
 * @type item
 * @desc アイテムを設定
 *
 * @param imageInfo
 * @text 画像情報
 * @type struct<imageInfo>
 * @desc 画像情報を設定
 *
 */

/*~struct~imageInfo:ja
 * @param imagePath
 * @text 画像ファイル
 * @type file
 * @dir /img/
 * @desc 画像ファイルを設定
 *
 * @param origin
 * @text 原点
 * @type select
 * @option 左上
 * @value 0
 * @option 中央
 * @value 1
 * @default 1
 * @desc 画像を表示する原点を設定
 *       ウィンドウ内の左上から顔画像のサイズを基に計算されます
 *
 * @param x
 * @text X座標
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * @desc 画像を表示するX座標を設定
 *
 * @param y
 * @text Y座標
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * @desc 画像を表示するY座標を設定
 *
 * @param scaleX
 * @text 倍率(幅)
 * @type number
 * @default 100
 * @desc 画像の倍率(幅)を設定
 *
 * @param scaleY
 * @text 倍率(高さ)
 * @type number
 * @default 100
 * @desc 画像の倍率(高さ)を設定
 *
 * @param opacity
 * @text 不透明度
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * @desc 画像の不透明度を設定
 *
 */

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

    const nameColor = params.nameColor;
    const textMargin = ImageManager.faceWidth + params.textMargin;
    const defaultImage = (() => {
        const defaultImageInfo = params.defaultImageInfo;

        if (defaultImageInfo) {
            const imagePath = defaultImageInfo.imagePath;
            const image = imagePath ? ImageManager.loadBitmap("img/", imagePath) : null;
            const paramDefaultImages = {};
            paramDefaultImages.image = image;
            paramDefaultImages.origin = defaultImageInfo.origin;
            paramDefaultImages.x = defaultImageInfo.x;
            paramDefaultImages.y = defaultImageInfo.y;
            paramDefaultImages.scaleX = defaultImageInfo.scaleX;
            paramDefaultImages.scaleY = defaultImageInfo.scaleY;
            paramDefaultImages.opacity = defaultImageInfo.opacity;

            return paramDefaultImages;
        } else {
            return null;
        }
    })();

    const itemImages = (() => {
        const paramItemImages = {};
        const itemImageList = params.itemImageList;

        if (itemImageList) {
            itemImageList.forEach((itemImage) => {
                const itemId = itemImage.itemId;
                const imageInfo = itemImage.imageInfo;
                if (imageInfo) {
                    const imagePath = imageInfo.imagePath ? imageInfo.imagePath : params.defaultImagePath;
                    const image = imagePath ? ImageManager.loadBitmap("img/", imagePath) : null;
                    paramItemImages[itemId] = {};
                    paramItemImages[itemId].image = image;
                    paramItemImages[itemId].origin = imageInfo.origin;
                    paramItemImages[itemId].x = imageInfo.x;
                    paramItemImages[itemId].y = imageInfo.y;
                    paramItemImages[itemId].scaleX = imageInfo.scaleX;
                    paramItemImages[itemId].scaleY = imageInfo.scaleY;
                    paramItemImages[itemId].opacity = imageInfo.opacity;
                }
            });
        }

        return paramItemImages;
    })();

    //-----------------------------------------------------------------------------
    // Window_ChoiceHelp
    //-----------------------------------------------------------------------------
    function Window_ChoiceHelp() {
        this.initialize(...arguments);
    }

    Window_ChoiceHelp.prototype = Object.create(Window_Base.prototype);
    Window_ChoiceHelp.prototype.constructor = Window_ChoiceHelp;

    Window_ChoiceHelp.prototype.initialize = function (rect) {
        Window_Base.prototype.initialize.call(this, rect);
        this._item = null;
        this.openness = 0;
        this.deactivate();
    };

    Window_ChoiceHelp.prototype.setItem = function (item) {
        if (this._item !== item) {
            this._item = item;
            this.refresh();
        }
    };

    Window_ChoiceHelp.prototype.clear = function () {
        this._item = null;
    };

    Window_ChoiceHelp.prototype.refresh = function () {
        if (this._item) {
            this.contents.clear();
            this.drawContent();
        }
    };

    Window_ChoiceHelp.prototype.drawContent = function () {
        this.drawItemImage();
        this.drawItemDescription();
    };

    Window_ChoiceHelp.prototype.drawItemImage = function () {
        const item = this._item;
        const itemImage = itemImages[item.id] ? itemImages[item.id] : defaultImage;
        if (itemImage && itemImage.image) {
            const image = itemImage.image;
            const width = this.imageWidth(itemImage.scaleX);
            const height = this.imageHeight(itemImage.scaleY);
            const dx = this.imageX(itemImage.x, width, itemImage.origin);
            const dy = this.imageY(itemImage.y, height, itemImage.origin);
            this.contents.paintOpacity = itemImage.opacity;
            this.contents.blt(image, 0, 0, image.width, image.height, dx, dy, width, height);
            this.changePaintOpacity(1);
        }
    };

    Window_ChoiceHelp.prototype.drawItemDescription = function () {
        const item = this._item;
        const name = item.name;
        const description = item.description;
        const width = this.innerWidth - ImageManager.faceWidth;
        this.changeTextColor(nameColor);
        this.drawText(name, textMargin, 0, width);
        this.changeTextColor(ColorManager.normalColor());
        this.drawTextEx(description, textMargin, this.fittingHeight(0) + this.padding, width);
    };

    Window_ChoiceHelp.prototype.imageX = function (x, width, origin) {
        if (origin === 0) {
            return 0;
        } else {
            return Math.floor(ImageManager.faceWidth / 2 - width / 2) + x;
        }
    };

    Window_ChoiceHelp.prototype.imageY = function (y, height, origin) {
        if (origin === 0) {
            return 0;
        } else {
            return Math.floor(ImageManager.faceHeight / 2 - height / 2) + y;
        }
    };

    Window_ChoiceHelp.prototype.imageWidth = function (scale) {
        return Math.floor(ImageManager.faceWidth * (scale * 0.01));
    };

    Window_ChoiceHelp.prototype.imageHeight = function (scale) {
        return Math.floor(ImageManager.faceHeight * (scale * 0.01));
    };

    //-----------------------------------------------------------------------------
    // Scene_Message
    //-----------------------------------------------------------------------------
    const _Scene_Message_CreateAllWindows = Scene_Message.prototype.createAllWindows;
    Scene_Message.prototype.createAllWindows = function () {
        _Scene_Message_CreateAllWindows.apply(this, arguments);
        this.createChoiceHelpWindow();
    };

    Scene_Message.prototype.createChoiceHelpWindow = function () {
        const rect = this.choiceHelpWindowRect();
        this._choiceHelpWindow = new Window_ChoiceHelp(rect);
        this._eventItemWindow.setHelpWindow(this._choiceHelpWindow);
        this.addWindow(this._choiceHelpWindow);
    };

    Scene_Message.prototype.choiceHelpWindowRect = function () {
        const wx = 0;
        const wy = 0;
        const ww = Graphics.boxWidth;
        const wh = this.calcWindowHeight(4, false);
        return new Rectangle(wx, wy, ww, wh);
    };

    //-----------------------------------------------------------------------------
    // Window_EventItem
    //-----------------------------------------------------------------------------
    Window_EventItem.prototype.setHelpWindow = function (helpWindow) {
        this._helpWindow = helpWindow;
    };

    const _Window_EventItem_Start = Window_EventItem.prototype.start;
    Window_EventItem.prototype.start = function () {
        _Window_EventItem_Start.apply(this, arguments);
        this._helpWindow.open();
        this._helpWindow.activate();
    };

    const _Window_EventItem_Update = Window_EventItem.prototype.update;
    Window_EventItem.prototype.update = function () {
        _Window_EventItem_Update.apply(this, arguments);
        this._helpWindow.setItem(this.item());
    };
    const _Window_EventItem_OnOk = Window_EventItem.prototype.onOk;
    Window_EventItem.prototype.onOk = function () {
        _Window_EventItem_OnOk.apply(this, arguments);
        this._helpWindow.close();
    };
    const _Window_EventItem_OnCancel = Window_EventItem.prototype.onCancel;
    Window_EventItem.prototype.onCancel = function () {
        _Window_EventItem_OnCancel.apply(this, arguments);
        this._helpWindow.close();
    };
})();
