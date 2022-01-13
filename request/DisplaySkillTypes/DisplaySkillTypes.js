//=============================================================================
// DisplaySkillTypes
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc 複数のスキルタイプのスキルを1つのウィンドウで表示します。
 * @author Basu
 * @url https://raw.githubusercontent.com/basuka/RPGMZ/main/request/DisplaySkillTypes/DisplaySkillTypes.js
 *
 * @help DisplaySkillTypes.js
 *
 * 複数のスキルタイプのスキルを1つのウィンドウで表示する機能を提供します。
 *
 * ■連携スキル情報
 *
 *   ■スキルタイプ情報
 *   習得させるスキルタイプ情報を設定します。
 *
 *  　【アクター】
 *  　　習得スキルタイプの設定を行うアクターを設定します。
 *
 *  　【スキルタイプID】
 *     　習得スキルタイプを設定します。
 *
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加してください
 *
 * 2.追加した本プラグインのパラメータから必要な情報を設定してください
 *=====================================================================================================================================================
 *
 * @param skillTypeInfos
 * @type struct<skillTypeInfos>[]
 * @text スキルタイプ情報
 * @parent setGainSkillPoint
 * @desc 習得するスキルタイプ情報の設定
 *
 */
/*~struct~skillTypeInfos:ja
 *
 * @param actorId
 * @type actor
 * @text アクター
 * @desc スキルタイプを設定するアクターの設定
 *
 * @param skillTypes
 * @type number[]
 * @text スキルタイプID
 * @desc アクターが習得するスキルタイプIDの設定
 *
 */

(() => {

  const pluginName = "DisplaySkillTypes";

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
  // Window_SkillList
  //-----------------------------------------------------------------------------

  const _Window_SkillList_Includes = Window_SkillList.prototype.includes;
  Window_SkillList.prototype.includes = function(item) {
    let includes = _Window_SkillList_Includes.apply(this, arguments);
    if (!includes) {
      for (const skillTypeInfo of params.skillTypeInfos) {
        if (skillTypeInfo.actorId === this._actor._actorId) {
          includes = item && skillTypeInfo.skillTypes.includes(item.stypeId);
        }
      }
    }
    return includes;
  };
})();
