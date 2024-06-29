//=============================================================================
// RPG Maker MZ - ActorCommandKey
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc アクターコマンドキー機能を追加します。
 * @author Basu
 * @url https://raw.githubusercontent.com/basuka/RPGMZ/main/request/ActorCommandKey/ActorCommandKey.js
 *
 *
 * @help パラメータの設定項目
 *
 * 【パラメータ】
 *
 * ■コマンドキー
 * アクターコマンドで特定のコマンドを選択するキーを設定します。
 * キーはコマンド順に全コマンド分設定してください。
 *
 * 　・コマンド
 *     コマンドの設定
 *     何のコマンドかわかるようにする項目のため、プラグインでは使用されません。
 *
 * 　・キー
 * 　　ここで設定されたキーを押下するとこのコマンドが選択されるようになります。
 *
 *=====================================================================================================================================================
 * @param commandKeyList
 * @text コマンドキー
 * @type struct<commandKey>[]
 * @default ["{\"commandText\":\"攻撃\",\"key\":\"0\"}","{\"commandText\":\"スキル\",\"key\":\"0\"}","{\"commandText\":\"防御\",\"key\":\"0\"}","{\"commandText\":\"アイテム\",\"key\":\"0\"}"]
 * @desc コマンドキーを設定
 *       コマンドキーはコマンド順に全コマンド分設定してください
 *
 */

/*~struct~commandKey:ja
 * @param commandText
 * @text コマンド
 * @type string
 * @desc コマンドを設定
 *       何のコマンドかわかるようにする項目のため、プラグインでは未使用
 *
 * @param key
 * @text キー
 * @type select
 * @option なし
 * @value 0
 * @option 右キー
 * @value 1
 * @option 左キー
 * @value 2
 * @option PageUp
 * @value 3
 * @option PageDown
 * @value 4
 * @desc 選択キーを設定
 *       設定したキーを押下するとこのコマンドが選択されます
 *
 */

(() => {
    "use strict";

    let $actorCommandKey = null;

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
    // ActorCommandKey
    //-----------------------------------------------------------------------------
    function ActorCommandKey() {
        this.initialize(...arguments);
    }

    ActorCommandKey.KEY_RIGHT = 1;
    ActorCommandKey.KEY_LEFT = 2;
    ActorCommandKey.KEY_PAGE_UP = 3;
    ActorCommandKey.KEY_PAGE_DOWN = 4;

    ActorCommandKey.prototype.initialize = function () {
        this._commandKey = {};
        this.setup();
    };

    ActorCommandKey.prototype.setup = function () {
        if (params.commandKeyList) {
            params.commandKeyList.forEach((commandKey, index) => {
                this._commandKey[commandKey.key] = index;
            });
        }
    };

    ActorCommandKey.prototype.selectIndex = function (commandKey) {
        return commandKey in this._commandKey ? this._commandKey[commandKey] : -1;
    };

    //-----------------------------------------------------------------------------
    // Scene_Boot
    //-----------------------------------------------------------------------------
    const _Scene_Boot_Create = Scene_Boot.prototype.create;
    Scene_Boot.prototype.create = function () {
        _Scene_Boot_Create.apply(this, arguments);
        $actorCommandKey = new ActorCommandKey();
    };

    //-----------------------------------------------------------------------------
    // Window_ActorCommand
    //-----------------------------------------------------------------------------
    Window_ActorCommand.prototype.cursorRight = function (wrap) {
        const index = $actorCommandKey.selectIndex(ActorCommandKey.KEY_RIGHT);
        if (index !== -1) {
            this.select(index);
        } else {
            Window_Command.prototype.cursorRight.call(this, wrap);
        }
    };

    Window_ActorCommand.prototype.cursorLeft = function (wrap) {
        const index = $actorCommandKey.selectIndex(ActorCommandKey.KEY_LEFT);
        if (index !== -1) {
            this.select(index);
        } else {
            Window_Command.prototype.cursorLeft.call(this, wrap);
        }
    };

    Window_ActorCommand.prototype.cursorPagedown = function (wrap) {
        const index = $actorCommandKey.selectIndex(ActorCommandKey.KEY_PAGE_DOWN);
        if (index !== -1) {
            this.select(index);
        } else {
            Window_Command.prototype.cursorPagedown.call(this, wrap);
        }
    };

    Window_ActorCommand.prototype.cursorPageup = function (wrap) {
        const index = $actorCommandKey.selectIndex(ActorCommandKey.KEY_PAGE_UP);
        if (index !== -1) {
            this.select(index);
        } else {
            Window_Command.prototype.cursorPageup.call(this, wrap);
        }
    };
})();
