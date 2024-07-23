//=============================================================================
// RPG Maker MZ - MoveRestriction
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc 先頭メンバーのステートに応じて移動制限を設定します。
 * @author Basu
 * @url https://raw.githubusercontent.com/basuka/RPGMZ/main/request/MoveRestriction/MoveRestriction.js
 *
 *
 * @help パラメータの設定項目
 *
 * 【パラメータ】
 *
 * ■移動制限
 * 先頭メンバーのステートに対する移動制限の設定を行います。
 *
 * 　・ステート
 * 　移動制限用のステートの設定を行います。
 *
 * 　・移動制限タイプ
 * 　ステート付加時の移動制限タイプの設定を行います。
 *
 * 　・解除カウント
 * 　移動制限(ステート)の解除までのカウントの設定を行います。
 * 　カウントは移動キー(クリック)の回数でカウントされます。
 *
 * 　・メッセージ
 * 　移動制限中に移動(移動不可も含む)を行った場合に表示するメッセージの設定を行います。
 * 　未設定の場合、メッセージは表示されません。
 *
 * ■優先度
 * 移動制限の優先度の設定を行います。
 * 複数ステート(移動制限)が付与されている場合、優先度順に移動制限が発生します。
 *
 *
 *-----------------------------------------------------------------------------
 * 利用規約
 *-----------------------------------------------------------------------------
 * このプラグインはMITライセンスで配布しています
 *
 *=====================================================================================================================================================
 * @param moveRestrictions
 * @text 移動制限
 * @type struct<moveRestriction>[]
 * @desc 先頭メンバーのステートに対する移動制限を設定
 *
 * @param prioritys
 * @text 優先度
 * @type select[]
 * @option 移動不可
 * @value 0
 * @option ランダム
 * @value 1
 * @option 下
 * @value 2
 * @option 左
 * @value 3
 * @option 右
 * @value 4
 * @option 上
 * @value 5
 * @default ["0","1","2","3","4","5"]
 * @desc 移動制限の優先度を設定
 *       複数ステートが付与されている場合、優先度順に移動制限が発生します
 */

/*~struct~moveRestriction:ja
 * @param stateId
 * @text ステート
 * @type state
 * @desc 移動制限用のステートを設定
 *
 * @param moveRestrictionType
 * @text 移動制限タイプ
 * @type select
 * @option 移動不可
 * @value 0
 * @option ランダム
 * @value 1
 * @option 下
 * @value 2
 * @option 左
 * @value 3
 * @option 右
 * @value 4
 * @option 上
 * @value 5
 * @default 0
 * @desc 移動制限のタイプを設定
 *
 * @param restrictionCount
 * @text 解除カウント
 * @type number
 * @min 1
 * @default 1
 * @desc 移動制限が解除されるまでのカウント(キー入力)を設定
 *       解除されるとステートも同時に解除されます
 *
 * @param message
 * @text メッセージ
 * @type string
 * @desc 移動制限時に移動(移動不可も含む)を行った場合に表示するメッセージを設定
 *       未設定の場合、メッセージは表示されません
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

    const prioritys = params.prioritys;
    const moveRestrictions = (() => {
        const setParams = {};

        params.moveRestrictions.forEach((moveRestriction) => {
            const restrictionInfo = {};
            restrictionInfo.stateId = moveRestriction.stateId;
            restrictionInfo.moveRestrictionType = moveRestriction.moveRestrictionType;
            restrictionInfo.restrictionCount = moveRestriction.restrictionCount;
            restrictionInfo.message = moveRestriction.message;
            setParams[moveRestriction.stateId] = restrictionInfo;
        });

        return setParams;
    })();

    const _Game_Player_ExecuteMove = Game_Player.prototype.executeMove;
    Game_Player.prototype.executeMove = function (direction) {
        const states = $gameParty.members()[0].states();
        if (states && !$gameTemp.isMoveRestriction()) {
            for (const priority of prioritys) {
                for (const state of states) {
                    const moveRestriction = moveRestrictions[state.id];
                    if (moveRestriction && moveRestriction.moveRestrictionType === priority) {
                        $gameTemp.setMoveRestriction(moveRestriction);
                        break;
                    }
                }

                if ($gameTemp.isMoveRestriction()) {
                    break;
                }
            }
        }

        if ($gameTemp.isMoveRestriction()) {
            const moveRestriction = $gameTemp.moveRestriction();
            switch (moveRestriction.moveRestrictionType) {
                case 1:
                    const directions = [2, 4, 6, 8];
                    direction = directions[Math.floor(Math.random() * directions.length)];
                    break;

                case 2:
                    direction = 2;
                    break;

                case 3:
                    direction = 4;
                    break;

                case 4:
                    direction = 6;
                    break;

                case 5:
                    direction = 8;
                    break;

                case 0:
                    direction = 0;
                    break;
            }

            if (direction > 0) {
                this.moveStraight(direction);
            }

            if (moveRestriction.message) {
                $gameMessage.add(moveRestriction.message);
            }

            $gameTemp.updateMoveRestrictionCount();

            if (!$gameTemp.isMoveRestriction()) {
                $gameParty.members()[0].removeState(moveRestriction.stateId);
            }
        } else {
            _Game_Player_ExecuteMove.apply(this, arguments);
        }
    };

    const _Game_Temp_Initialize = Game_Temp.prototype.initialize;
    Game_Temp.prototype.initialize = function () {
        _Game_Temp_Initialize.apply(this, arguments);
        this._moveRestriction = null;
        this._restrictionCount = 0;
    };

    Game_Temp.prototype.setMoveRestriction = function (moveRestriction) {
        this._moveRestriction = moveRestriction;
        this._restrictionCount = moveRestriction.restrictionCount;
    };

    Game_Temp.prototype.isMoveRestriction = function () {
        return this._moveRestriction !== null;
    };

    Game_Temp.prototype.moveRestriction = function () {
        return this._moveRestriction;
    };

    Game_Temp.prototype.updateMoveRestrictionCount = function () {
        this._restrictionCount -= 1;

        if (this._restrictionCount === 0) {
            this._moveRestriction = null;
        }
    };
})();
