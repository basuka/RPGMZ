//=============================================================================
// RPG Maker MZ - StateChangeEnemyImage
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc ステート付与時エネミー画像変更機能を追加します。
 * @author Basu
 * @url https://raw.githubusercontent.com/basuka/RPGMZ/main/request/StateChangeEnemyImage/StateChangeEnemyImage.js
 *
 *
 * @help StateChangeEnemyImage.js
 *
 *=====================================================================================================================================================
 * @param changeImageInfoList
 * @text 変更画像
 * @type struct<changeImageInfo>[]
 * @desc 変更画像情報の設定
 *
 */

/*~struct~changeImageInfo:ja
 * @param stateId
 * @text ステート
 * @type state
 * @desc ステートを設定
 *
 * @param imageType
 * @text 画像タイプ
 * @type select
 * @option エネミー画像
 * @value 0
 * @option SVエネミー画像
 * @value 1
 * @default 0
 * @desc 使用する画像タイプを設定
 *
 * @param imageName
 * @text エネミー画像
 * @type file
 * @dir img/enemies/
 * @desc 変更するエネミー画像を設定
 *
 * @param svImageName
 * @text SVエネミー画像
 * @type file
 * @dir img/sv_enemies/
 * @desc 変更するSVエネミー画像を設定
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

    const _Game_Enemy_BattlerName = Game_Enemy.prototype.battlerName;
    Game_Enemy.prototype.battlerName = function () {
        for (const changeImageInfo of params.changeImageInfoList) {
            if (this.isStateAffected(changeImageInfo.stateId)) {
                if (changeImageInfo.imageType === 0 && changeImageInfo.imageName) {
                    return changeImageInfo.imageName;
                } else if (changeImageInfo.imageType === 1 && changeImageInfo.svImageName) {
                    return changeImageInfo.svImageName;
                }
            }
        }

        return _Game_Enemy_BattlerName.apply(this, arguments);
    };
})();
