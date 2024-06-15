//=============================================================================
// RPG Maker MZ - Escape
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc エスケープ機能を実装します。
 * @author Basu
 * @url https://raw.githubusercontent.com/basuka/RPGMZ/main/Escape/Escape.js
 *
 *
 * @help パラメータ・コマンドの設定項目
 *
 * 【パラメータ】
 *
 * ■スキル
 * エスケープ用のスキルを設定します。
 *
 * ■アイテム
 * エスケープ用のアイテムを設定します。
 *
 * ■フェード
 * エスケープによる場所移動時のフェードを設定します。
 *
 * ■コモンイベント
 * エスケープ用のコモンイベントを設定します。(SEや演出など)
 * イベントの内容は空でも問題ありませんが、必ず設定してください。
 * (場所移動のイベントはスクリプト側で設定されるので不要です)
 *
 *
 * 【設定・コマンド】
 * エスケープ情報の設定を行うコマンドです。
 * ダンジョンなどエスケープ使用箇所に移動する際に実行してください。
 *
 * ■移動先の調整
 * エスケープによる場所移動の位置調整を設定します。
 * 設定コマンドを実行したイベントの位置を基準に移動先の調整を行います。
 *
 *
 * 【リセット・コマンド】
 * エスケープ情報の初期化を行うコマンドです。
 * エスケープ情報の設定後(ダンジョン内など)、イベントなどによる場所移動を行う場合に実行してください。
 * (エスケープ情報の設定を行ったマップに移動する場合は自動でリセットされるので不要です)
 *
 *
 * 【エスケープ禁止/許可・コマンド】
 * エスケープの禁止/許可の設定を行うコマンドです。
 *
 * ■禁止/許可
 * エスケープの禁止/許可を設定します。
 *
 *
 *-----------------------------------------------------------------------------
 * README
 *-----------------------------------------------------------------------------
 * https://github.com/basuka/RPGMZ/blob/main/Escape/README.md
 *
 *-----------------------------------------------------------------------------
 * 利用規約
 *-----------------------------------------------------------------------------
 * このプラグインはMITライセンスで配布しています
 *
 *=====================================================================================================================================================
 * @param skillId
 * @text スキル
 * @type skill
 * @desc エスケープ用スキルの設定
 *
 * @param itemId
 * @text アイテム
 * @type item
 * @desc エスケープ用アイテムの設定
 *
 * @param fade
 * @text フェード
 * @type select
 * @option 黒
 * @value 0
 * @option 白
 * @value 1
 * @option なし
 * @value 2
 * @default 0
 * @desc エスケープ時のフェードを設定
 *
 * @param commonId
 * @text コモンイベント
 * @type common_event
 * @default 1
 * @desc エスケープ用コモンイベント
 *
 * @command setup
 * @text 設定
 * @desc エスケープ情報の設定
 *
 * @arg offset
 * @text 移動先の調整
 * @type select
 * @option なし(このイベントの上)
 * @value 0
 * @option 上
 * @value 1
 * @option 右
 * @value 2
 * @option 下
 * @value 3
 * @option 左
 * @value 4
 * @default 0
 * @desc エスケープ時の移動先の調整
 *
 * @command reset
 * @text リセット
 * @desc エスケープ情報をリセット
 *
 * @command enable
 * @text エスケープ禁止/許可
 * @desc エスケープの禁止/許可の設定
 *
 * @arg enable
 * @text 禁止/許可
 * @type boolean
 * @on 許可
 * @off 禁止
 * @default 0
 * @desc エスケープの禁止/許可を設定
 *
 */

(() => {
    "use strict";

    let $escape = null;

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

    PluginManager.registerCommand(Plugin_Name, "setup", (escapeParams) => {
        PluginParams.prototype.parse(escapeParams);

        const mapId = $gameMap.mapId();
        const moveX = $gamePlayer.x;
        const moveY = $gamePlayer.y;
        const offset = escapeParams.offset;

        $escape.setup(mapId, moveX, moveY, offset);
        $escape.update();
    });

    PluginManager.registerCommand(Plugin_Name, "reset", (escapeParams) => {
        $escape.init();
    });

    PluginManager.registerCommand(Plugin_Name, "enable", (escapeParams) => {
        PluginParams.prototype.parse(escapeParams);
        $escape.setValid(escapeParams.enable);
    });

    //-----------------------------------------------------------------------------
    // Escape
    //-----------------------------------------------------------------------------
    function Escape() {
        this.initialize(...arguments);
    }

    Escape.prototype.initialize = function () {
        this.init();
        this.setParams();
    };

    Escape.prototype.init = function () {
        this._mapId = 0;
        this._moveX = 0;
        this._moveY = 0;
        this._offset = 0;
        this._valid = false;
    };

    Escape.prototype.setParams = function () {
        this._skillId = params.skillId;
        this._itemId = params.itemId;
        this._commonId = params.commonId;
        this._fade = params.fade;
    };

    Escape.prototype.setMoveEvent = function () {
        this._moveEvent = { code: 201, indent: 0, parameters: [] };
    };

    Escape.prototype.loadEscapeEvent = function () {
        this.setMoveEvent();
        const escapeEvent = $dataCommonEvents[this._commonId];

        escapeEvent.list.splice(-1, 0, this._moveEvent);
    };

    Escape.prototype.update = function () {
        this.setOffset();
        this._moveEvent.parameters = [0, this._mapId, this._moveX, this._moveY, 2, this._fade];
    };

    Escape.prototype.setup = function (mapId, x, y, offset) {
        this._mapId = mapId;
        this._moveX = x;
        this._moveY = y;
        this._offset = offset;
        this._valid = true;
    };

    Escape.prototype.setEscapeEvent = function () {
        $gameTemp.reserveCommonEvent(this._commonId);
    };

    Escape.prototype.setValid = function (valid) {
        if (this._mapId > 0) {
            this._valid = valid;
        }
    };

    Escape.prototype.isValid = function () {
        return this._valid && !$gameParty.inBattle();
    };

    Escape.prototype.isReturnMap = function (mapId) {
        return this._mapId === mapId;
    };

    Escape.prototype.isEscapeItem = function (item) {
        return (DataManager.isSkill(item) && item.id === this._skillId) || (DataManager.isItem(item) && item.id === this._itemId);
    };

    Escape.prototype.isEscapeEvent = function (event) {
        return event.id === this._commonId;
    };

    Escape.prototype.setOffset = function () {
        switch (this._offset) {
            case 1:
                this._moveY -= 1;
                break;

            case 2:
                this._moveX += 1;
                break;

            case 3:
                this._moveY += 1;
                break;

            case 4:
                this._moveX -= 1;
                break;
        }
    };

    //-----------------------------------------------------------------------------
    // Scene_Boot
    //-----------------------------------------------------------------------------
    const _Scene_Boot_Create = Scene_Boot.prototype.create;
    Scene_Boot.prototype.create = function () {
        _Scene_Boot_Create.apply(this, arguments);
        $escape = new Escape();
    };

    const _Scene_Boot_OnDatabaseLoaded = Scene_Boot.prototype.onDatabaseLoaded;
    Scene_Boot.prototype.onDatabaseLoaded = function () {
        _Scene_Boot_OnDatabaseLoaded.apply(this, arguments);
        $escape.loadEscapeEvent();
    };

    //-----------------------------------------------------------------------------
    // Scene_ItemBase
    //-----------------------------------------------------------------------------
    const _Scene_ItemBase_ApplyItem = Scene_ItemBase.prototype.applyItem;
    Scene_ItemBase.prototype.applyItem = function () {
        if ($escape.isEscapeItem(this.item())) {
            $escape.setEscapeEvent();
            SceneManager.goto(Scene_Map);
        } else {
            _Scene_ItemBase_ApplyItem.apply(this, arguments);
        }
    };

    //-----------------------------------------------------------------------------
    // Game_Temp
    //-----------------------------------------------------------------------------
    const _Game_Temp_RetrieveCommonEvent = Game_Temp.prototype.retrieveCommonEvent;
    Game_Temp.prototype.retrieveCommonEvent = function () {
        const commonEvent = _Game_Temp_RetrieveCommonEvent.apply(this, arguments);
        if (commonEvent && $escape.isEscapeEvent(commonEvent)) {
            $escape.setOffset();
        }
        return commonEvent;
    };

    const _Game_Map_Setup = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function (mapId) {
        _Game_Map_Setup.apply(this, arguments);
        if ($escape.isReturnMap(mapId)) {
            $escape.init();
        }
    };

    const _Game_BattlerBase_CanUse = Game_BattlerBase.prototype.canUse;
    Game_BattlerBase.prototype.canUse = function (item) {
        if ($escape.isEscapeItem(item)) {
            return $escape.isValid() && _Game_BattlerBase_CanUse.apply(this, arguments);
        } else {
            return _Game_BattlerBase_CanUse.apply(this, arguments);
        }
    };

    const _Game_Action_CheckItemScope = Game_Action.prototype.checkItemScope;
    Game_Action.prototype.checkItemScope = function (list) {
        return _Game_Action_CheckItemScope.apply(this, arguments) && !$escape.isEscapeItem(this.item());
    };
})();
