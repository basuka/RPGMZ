//=============================================================================
// RPG Maker MZ - AddTextColor
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc テキストカラーを追加設定します。
 * @author Basu
 * @url https://raw.githubusercontent.com/basuka/RPGMZ/main/AddTextColor/AddTextColor.js
 *
 *
 * @help テキストカラーの追加設定
 *
 * 【パラメータ】
 *
 * ■コード
 * 追加カラーのコードを設定します。
 * デフォルト(\C[n]メッセージ)ではCの値になります。
 * コードは既に使用している他のコード(Cなど)と重複しないようにしてください。
 * ※使用不可コードについては後述
 *
 * ■RGBカラー情報
 * 追加するカラー情報をRGBで設定します。
 *
 * 　・ID
 *   追加カラーのIDを設定します。
 *   デフォルト(\C[n]メッセージ)では[n]の値になります。
 *   IDはカラーコード情報と共有されます。
 *   カラーコードのIDと重複しないようにしてください。
 *
 *   ・RGB(赤)
 *   RGB(赤)の値を設定します。
 *
 *   ・RGB(緑)
 *   RGB(緑)の値を設定します。
 *
 *   ・RGB(青)
 *   RGB(青)の値を設定します。
 *
 * 　・備考
 * 　備考を設定します。
 * 　プラグイン上では使用されない項目です。
 *
 * ■カラーコード情報
 * 追加するカラー情報をカラーコードで設定します。
 *
 * 　・ID
 *   追加カラーのIDを設定します。
 *   デフォルト(\C[n]メッセージ)では[n]の値になります。
 *   IDはRGBカラー情報と共有されます。
 *   RGBカラーのIDと重複しないようにしてください。
 *
 *   ・カラーコード
 * 　カラーコードの値を設定します。
 *
 * 　・備考
 * 　備考を設定します。
 * 　プラグイン上では使用されない項目です。
 *
 * ■使用不可コード
 * 　・C
 * 　・I
 * 　・PX
 * 　・PY
 * 　・FS
 * 　・{
 * 　・}
 *
 * 　・その他プラグインで使用しているコード
 * 　(Window_Base.prototype.processEscapeCharacter)
 *
 * ■その他注意点
 * 追加した色はゲーム上で有効となります。
 * そのため、メッセージのプレビューなどツクール上では有効にはならないので注意してください。
 *
 *=====================================================================================================================================================
 *
 * @param code
 * @text コード
 * @type string
 * @desc 追加カラーのコードを設定
 *       ※\〇[n]の〇に設定されるコード
 *
 * @param rgbColorInfoList
 * @text RGBカラー情報
 * @type struct<rgbColor>[]
 * @desc RGBカラー情報を設定
 *
 * @param colorCodeInfoList
 * @text カラーコード情報
 * @type struct<colorCode>[]
 * @desc カラーコード情報を設定
 *
 */

/*~struct~rgbColor:ja
 * @param id
 * @text ID
 * @type number
 * @min 0
 * @default 0
 * @desc 追加カラーのIDを設定
 *       ※\〇[n]のnに設定される値
 *
 * @param r
 * @text RGB(赤)
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * @desc RGB(赤)を設定
 *
 * @param g
 * @text RGB(緑)
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * @desc RGB(緑)を設定
 *
 * @param b
 * @text RGB(青)
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * @desc RGB(青)を設定
 *
 * @param remarks
 * @text 備考
 * @type string
 * @desc プラグイン上では使用されません
 *
 */

/*~struct~colorCode:ja
 * @param id
 * @text ID
 * @type number
 * @min 0
 * @default 0
 * @desc 追加カラーのIDを設定
 *       ※\〇[n]のnに設定される値
 *
 * @param colorCode
 * @text カラーコード
 * @type string
 * @default #
 * @desc カラーコードを設定
 *
 * @param remarks
 * @text 備考
 * @type string
 * @desc プラグイン上では使用されません
 *
 */

(() => {
    "use strict";

    let $addTextColor = null;

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
    // AddTextColor
    //-----------------------------------------------------------------------------
    function AddTextColor() {
        this.initialize(...arguments);
    }

    AddTextColor.DEFORUTO_CODE = ["C", "I", "PX", "PY", "FS", "{", "}"];

    AddTextColor.prototype.initialize = function () {
        this._code = "";
        this._colors = {};

        this.setup();
    };

    AddTextColor.prototype.setup = function () {
        if (!AddTextColor.DEFORUTO_CODE.includes(params.code)) {
            this._code = params.code;

            if (params.rgbColorInfoList) {
                params.rgbColorInfoList.forEach((rgbColorInfo) => {
                    this._colors[rgbColorInfo.id] = this.convertRgbToHex(rgbColorInfo.r, rgbColorInfo.g, rgbColorInfo.b);
                });
            }

            if (params.colorCodeInfoList) {
                params.colorCodeInfoList.forEach((colorCodeInfo) => {
                    this._colors[colorCodeInfo.id] = colorCodeInfo.colorCode;
                });
            }
        }
    };

    AddTextColor.prototype.code = function () {
        return this._code;
    };

    AddTextColor.prototype.color = function (id) {
        return this._colors[id];
    };

    AddTextColor.prototype.convertRgbToHex = function (r, g, b) {
        return "#" + this.rgbToHex(r) + this.rgbToHex(g) + this.rgbToHex(b);
    };

    AddTextColor.prototype.rgbToHex = function (rgb) {
        const hex = rgb.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    };

    //-----------------------------------------------------------------------------
    // Scene_Boot
    //-----------------------------------------------------------------------------
    const _Scene_Boot_Create = Scene_Boot.prototype.create;
    Scene_Boot.prototype.create = function () {
        _Scene_Boot_Create.apply(this, arguments);
        $addTextColor = new AddTextColor();
    };

    //-----------------------------------------------------------------------------
    // Window_Base
    //-----------------------------------------------------------------------------
    const _Window_Base_ProcessEscapeCharacter = Window_Base.prototype.processEscapeCharacter;
    Window_Base.prototype.processEscapeCharacter = function (code, textState) {
        switch (code) {
            case $addTextColor.code():
                this.addTextColorChange(this.obtainEscapeParam(textState));
                break;
            default:
                _Window_Base_ProcessEscapeCharacter.apply(this, arguments);
        }
    };

    Window_Base.prototype.addTextColorChange = function (colorId) {
        this.changeTextColor($addTextColor.color(colorId));
    };
})();
