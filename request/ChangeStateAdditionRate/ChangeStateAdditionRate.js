//=============================================================================
// ChangeStateAdditionRate
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc 特定の装備を装備時にステート付与率を変更します。
 * @author Basu
 * @url https://github.com/basuka/RPGMZ/blob/main/request/ChangeStateAdditionRate/ChangeStateAdditionRate.js
 *
 * @help ChangeStateAdditionRate.js
 *
 * 特定の装備を装備時にステート付与率を変更する機能を提供します。
 *
 * ■連携スキル情報
 *
 *   ■ステート付加率変更情報
 *   ステート付加率変更情報を設定します。
 *
 *      【ステート】
 *         付加率を変えるステートを設定します。
 *
 *      【付加率の変更値(%)】
 *         ステート付加率の変更値を設定します(-100～100)。
 *         また、変更値は%の設定となります。
 *
 *  　  【付加率変更武器】
 *         付加率を変更する武器を設定します。
 *         ここで設定された武器を装備した際に変更が有効となります。
 *
 *  　  【付加率変更防具】
 *         付加率を変更する防具を設定します。
 *         ここで設定された防具を装備した際に変更が有効となります。
 *
 *      ■セット装備効果
 *      付加率を変更するセット装備を設定します。
 *      ここで設定された武器・防具の全てを装備した際に変更が有効となります。
 *
 *  　    【セット武器】
 *           セット効果にする武器を設定します。
 *
 *  　    【セット防具】
 *           セット効果にする防具を設定します。
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加してください
 *
 * 2.追加した本プラグインのパラメータから必要な情報を設定してください
 *=====================================================================================================================================================
 *
 * @param changeStateRateInfos
 * @type struct<changeStateRateInfos>[]
 * @text ステート付加率変更情報
 * @desc ステート付加率変更情報の設定
 *
 */

/*~struct~changeStateRateInfos:ja
 *
 * @param stateId
 * @type state
 * @text ステート
 * @desc 付加率を変えるステートの設定
 *
 * @param changeRate
 * @type number
 * @max 100
 * @min -100
 * @text 付加率の変更値(%)
 * @desc ステート付加率の変更値の設定(-100～100)
 *
 * @param changeRateWeaponIds
 * @type weapon[]
 * @text 付加率変更武器
 * @desc 付加率を変更する武器の設定
 *
 * @param changeRateArmorIds
 * @type armor[]
 * @text 付加率変更防具
 * @desc 付加率を変更する防具の設定
 *
 * @param setEquipChangeRates
 * @type struct<setEquipChangeRate>[]
 * @text セット装備効果
 * @desc 付加率を変更するセット装備の設定
 */

/*~struct~setEquipChangeRate:ja
 *
 * @param setEquipWeaponId
 * @type weapon
 * @text セット武器
 * @desc セット効果にする武器の設定
 *
 * @param setEquipArmorIds
 * @type armor[]
 * @text セット防具
 * @desc セット効果にする防具の設定
 */
(() => {

  const pluginName = "ChangeStateAdditionRate";

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

  const params = PluginManager_Parser.prototype.parse(PluginManager.parameters(pluginName));


  //-----------------------------------------------------------------------------
  // Game_Action
  //-----------------------------------------------------------------------------

  const _Game_Action_ItemEffectAddNormalState = Game_Action.prototype.itemEffectAddNormalState;
  Game_Action.prototype.itemEffectAddNormalState = function(target, effect) {
    const tempValue1 = effect.value1;
    this.changeStateRate(effect);
    _Game_Action_ItemEffectAddNormalState.apply(this, arguments);
    effect.value1 = tempValue1;
  };

  const _Game_Action_ItemEffectAddAttackState = Game_Action.prototype.itemEffectAddAttackState;
  Game_Action.prototype.itemEffectAddAttackState = function(target, effect) {
    const tempValue1 = effect.value1;
    this.changeStateRate(effect);
    _Game_Action_ItemEffectAddAttackState.apply(this, arguments);
    effect.value1 = tempValue1;
  };

  const _Game_Action_ItemEffectRemoveState = Game_Action.prototype.itemEffectRemoveState;
  Game_Action.prototype.itemEffectRemoveState = function(target, effect) {
    const tempValue1 = effect.value1;
    this.changeStateRate(effect);
    _Game_Action_ItemEffectRemoveState.apply(this, arguments);
    effect.value1 = tempValue1;
  };

  Game_Action.prototype.changeStateRate = function(effect) {
    for (const changeStateRateInfo of params.changeStateRateInfos) {
      if (changeStateRateInfo.stateId === effect.dataId && this.isChangeStateRate(changeStateRateInfo)) {
        const changeValue = changeStateRateInfo.changeRate * 0.01;
        effect.value1 += changeValue;
        if (effect.value1 > 1) {
          effect.value1 = 1;
        } else if (effect.value1 < 0) {
          effect.value1 = 0;
        }
        break;
      }
    }
  };

  Game_Action.prototype.isChangeStateRate = function(changeStateRateInfo) {

    let isChange = this.isSetEquipChangeRate(changeStateRateInfo.setEquipChangeRates);

    const actor = $gameActors.actor(this._subjectActorId);

    if (!isChange) {
      for (const changeRateWeaponId of changeStateRateInfo.changeRateWeaponIds) {
        if (actor.hasWeapon($dataWeapons[changeRateWeaponId])) {
          isChange = true;
          break;
        }
      }

      for (const changeRateArmorId of changeStateRateInfo.changeRateArmorIds) {
        if (actor.hasArmor($dataArmors[changeRateArmorId])) {
          isChange = true;
          break;
        }
      }
    }
    return isChange;
  };

  Game_Action.prototype.isSetEquipChangeRate = function(setEquipChangeRates) {

    let isChange = false;

    const actor = $gameActors.actor(this._subjectActorId);

    if (setEquipChangeRates.length) {
      for (setEquipChangeRate of setEquipChangeRates) {
        if (setEquipChangeRate.setEquipWeaponId) {
          if (actor.hasWeapon($dataWeapons[setEquipChangeRate.setEquipWeaponId])) {
            isChange = true;
          } else {
            continue;
          }
        }
        for (const setEquipArmorId of setEquipChangeRate.setEquipArmorIds) {
          if (actor.hasArmor($dataArmors[setEquipArmorId])) {
            isChange = true;
          } else {
            isChange = false;
            break;
          }
        }

        if (isChange) {
          break;
        }
      }
    }
    return isChange;
  }

})();
