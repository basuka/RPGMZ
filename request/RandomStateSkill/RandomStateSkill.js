//=============================================================================
// RPG Maker MZ - RandomStateSkill
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc ランダムステートスキル機能を追加します。
 * @author Basu
 * @url https://raw.githubusercontent.com/basuka/RPGMZ/main/request/RandomStateSkill/RandomStateSkill.js
 *
 *
 * @help パラメータの設定項目
 *
 * 【パラメータ】
 *
 * ■ステートスキル
 * ランダムステートにするスキルを設定します。
 * ステートは、データベースのスキルにある使用効果(ステート付加)で設定したステートの中からランダムで選ばれます。
 * ステート付加以外の設定については通常通りとなります。
 *
 *=====================================================================================================================================================
 * @param skillIdList
 * @text ステートスキル
 * @type skill[]
 * @desc ランダムステートにするスキルを設定
 *
 */

(() => {
    "use strict";

    let $randomStateSkill = null;

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
    // RandomStateSkill
    //-----------------------------------------------------------------------------
    function RandomStateSkill() {
        this.initialize(...arguments);
    }

    RandomStateSkill.prototype.initialize = function () {
        this._randomStateSkills = {};
        this._stateId = 0;
    };

    RandomStateSkill.prototype.setup = function () {
        if (params.skillIdList) {
            params.skillIdList.forEach((id) => {
                const skill = $dataSkills[id];
                this._randomStateSkills[id] = skill.effects.filter((effect) => effect.code === Game_Action.EFFECT_ADD_STATE);
            });
        }
    };

    RandomStateSkill.prototype.isRandomStateSkill = function (item) {
        return DataManager.isSkill(item) && item.id in this._randomStateSkills;
    };

    RandomStateSkill.prototype.setRandomState = function (item) {
        const effects = this._randomStateSkills[item.id];
        const index = Math.floor(Math.random() * Object.keys(effects).length);
        this._stateId = effects[index].dataId;
    };

    RandomStateSkill.prototype.isRandomState = function (stateId) {
        if (this._stateId === stateId) {
            this._stateId = 0;
            return true;
        } else {
            return false;
        }
    };

    //-----------------------------------------------------------------------------
    // Game_Action
    //-----------------------------------------------------------------------------
    const _Game_Action_Apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function (target) {
        if ($randomStateSkill.isRandomStateSkill(this.item())) {
            $randomStateSkill.setRandomState(this.item());
        }
        _Game_Action_Apply.apply(this, arguments);
    };

    const _Game_Action_ApplyItemEffect = Game_Action.prototype.applyItemEffect;
    Game_Action.prototype.applyItemEffect = function (target, effect) {
        if ($randomStateSkill.isRandomStateSkill(this.item()) && effect.code === Game_Action.EFFECT_ADD_STATE) {
            if (!$randomStateSkill.isRandomState(effect.dataId)) {
                return;
            }
        }
        _Game_Action_ApplyItemEffect.apply(this, arguments);
    };

    //-----------------------------------------------------------------------------
    // Scene_Boot
    //-----------------------------------------------------------------------------
    const _Scene_Boot_Create = Scene_Boot.prototype.create;
    Scene_Boot.prototype.create = function () {
        _Scene_Boot_Create.apply(this, arguments);
        $randomStateSkill = new RandomStateSkill();
    };

    const _Scene_Boot_OnDatabaseLoaded = Scene_Boot.prototype.onDatabaseLoaded;
    Scene_Boot.prototype.onDatabaseLoaded = function () {
        _Scene_Boot_OnDatabaseLoaded.apply(this, arguments);
        $randomStateSkill.setup();
    };
})();
