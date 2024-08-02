//=============================================================================
// RPG Maker MZ - ConditionSkill
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc 条件スキル機能を設定します。
 * @author Basu
 * @url https://raw.githubusercontent.com/basuka/RPGMZ/main/ConditionSkill/ConditionSkill.js
 *
 *
 * @help
 * 条件(スキルの使用順・スキルの使用回数)を満たした場合、条件に合った別のスキルを発動することができるようになります。
 * また、条件となるスキル(条件スキル)は習得していないスキルでも発動することができるため、奥義や隠しスキルのような使い方ができるようになります。
 *
 * 【パラメータ】
 *
 * ■条件スキル
 * 条件スキルを設定します。
 *
 * 　・条件スキル
 * 　条件スキルにするスキルを設定します。
 *
 * 　・使用スキル
 * 　条件スキルを発動するスキルの使用順を設定します。
 * 　途中で別の動作が行われるとリセットされます。
 *
 * 　・使用スキル回数
 * 　スキルの必要使用回数を設定します。
 * 　未設定の場合はスキルの使用回数は条件に含まれません。
 *
 * 　　・スキル
 * 　　使用回数を条件にするスキルを設定します。
 *
 * 　　・使用回数
 * 　　必要な使用回数を設定します。
 *
 * ■有効タイプ
 * 戦闘中に条件(スキル回数など)を満たした場合の有効にするタイプを設定します。
 *
 * この戦闘から有効：条件を満たした戦闘から条件スキルが有効になります。
 * 次の戦闘から有効：条件を満たした戦闘では条件スキルは有効になりません。(次の戦闘から有効になります)
 *
 *
 * ※その他
 * 条件スキルに必要なコスト(MP/TP)が不足している場合は、選択したスキルが発動します。
 *
 *
 * -----------------------------------------------------------------------------
 * README
 *-----------------------------------------------------------------------------
 * https://github.com/basuka/RPGMZ/blob/main/ConditionSkill/README.md
 *
 *-----------------------------------------------------------------------------
 * 利用規約
 *-----------------------------------------------------------------------------
 * このプラグインはMITライセンスで配布しています
 *
 *
 *-----------------------------------------------------------------------------
 * 更新履歴
 *-----------------------------------------------------------------------------
 * 2024/8/2 Ver.1.0.0　公開
 *
 *
 *=====================================================================================================================================================
 * @param conditionSkills
 * @text 条件スキル
 * @type struct<conditionSkill>[]
 * @desc 条件スキルを設定
 *
 * @param enabledType
 * @text 有効タイプ
 * @type select
 * @option この戦闘から有効
 * @value 0
 * @option 次の戦闘から有効
 * @value 1
 * @default 1
 * @desc 戦闘中に条件(スキル回数など)を満たした場合の有効にするタイプを設定
 */

/*~struct~conditionSkill:ja
 * @param skillId
 * @text 条件スキル
 * @type skill
 * @desc 条件スキルを設定
 *
 * @param useOrderSkills
 * @text 使用スキル
 * @type skill[]
 * @desc 条件スキルを発動させるスキルの使用順を設定
 *
 * @param skillCounts
 * @text 使用スキル回数
 * @type struct<skillCount>[]
 * @desc スキルの必要使用回数を設定
 *
 */

/*~struct~skillCount:ja
 * @param skillId
 * @text スキル
 * @type skill
 * @desc 使用回数を条件にするスキルを設定
 *
 * @param count
 * @text 使用回数
 * @type number
 * @min 1
 * @max 9999
 * @default 1
 * @desc 必要な使用回数を設定
 */

(() => {
    "use strict";

    let $conditionSkill = null;

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
    // ConditionSkill
    //-----------------------------------------------------------------------------
    function ConditionSkill() {
        this.initialize(...arguments);
    }

    ConditionSkill.prototype.initialize = function () {
        this._conditionSkills = params.conditionSkills;
        this._enabledType = params.enabledType;
    };

    ConditionSkill.prototype.init = function () {
        this._actorSkills = {};
        this._notCountSkills = [];
        this._actor = null;
        this._skill = null;
    };

    ConditionSkill.prototype.setActor = function (actor) {
        this._actor = actor;
    };

    ConditionSkill.prototype.setSkill = function (skill) {
        this._skill = skill;
    };

    ConditionSkill.prototype.reset = function () {
        this._actorSkills[this._actor.actorId()].index = 0;
        this._actorSkills[this._actor.actorId()].ptnSkills = [];
    };

    ConditionSkill.prototype.setConditionSkill = function (action) {
        const subject = action.subject();
        const item = action.item();
        if (subject.isActor()) {
            this.setActor(subject);
            if (DataManager.isSkill(item)) {
                this.setSkill(item);
                this.setActorSkill();
                const actorSkill = this._actorSkills[subject.actorId()];
                if (actorSkill) {
                    for (const ptnSkill of actorSkill.ptnSkills) {
                        if (ptnSkill.useOrderSkills[actorSkill.index] === -1) {
                            const skill = $dataSkills[ptnSkill.skillId];
                            if (subject.canPaySkillCost(skill)) {
                                action.setSkill(ptnSkill.skillId);
                                this.reset();
                            } else {
                                this.reset();
                                this.setActorSkill();
                            }
                        }
                    }
                }
            } else {
                this.reset();
            }
        }
    };

    ConditionSkill.prototype.setActorSkill = function () {
        const actor = this._actor;
        const skill = this._skill;

        let actorSkill = this._actorSkills[actor.actorId()];

        if (!actorSkill) {
            actorSkill = {};
            this._actorSkills[actor.actorId()] = actorSkill;
            this.reset();
        } else {
            const index = actorSkill.index;
            const ptnSkills = actorSkill.ptnSkills.filter((ptnSkill) => ptnSkill.useOrderSkills[index] === skill.id);

            if (ptnSkills.length < 1) {
                this.reset();
            } else {
                actorSkill.ptnSkills = ptnSkills;
            }
        }

        if (actorSkill.ptnSkills.length < 1) {
            this._conditionSkills.forEach((conditionSkill) => {
                if (!this._notCountSkills.includes(conditionSkill.skillId) && conditionSkill.useOrderSkills[0] === skill.id) {
                    if (this.checkSkillCount(conditionSkill)) {
                        const ptnSkill = {};
                        ptnSkill.skillId = conditionSkill.skillId;
                        ptnSkill.useOrderSkills = conditionSkill.useOrderSkills.concat(-1);
                        actorSkill.ptnSkills.push(ptnSkill);
                    }
                }
            });
        }

        if (actorSkill.ptnSkills.length > 0) {
            actorSkill.index++;
        } else {
            this.reset();
        }
    };

    ConditionSkill.prototype.checkSkillCount = function (conditionSkill) {
        const skillCounts = conditionSkill.skillCounts;

        let setPtnSkillFlg = true;

        if (skillCounts) {
            const actor = this._actor;
            for (const skillCount of skillCounts) {
                const count = actor.skillCount(skillCount.skillId);
                if (skillCount.count > count) {
                    setPtnSkillFlg = false;
                    if (this._enabledType === 1) {
                        this._notCountSkills.push(conditionSkill.skillId);
                    }
                    break;
                }
            }
        }

        return setPtnSkillFlg;
    };

    //-----------------------------------------------------------------------------
    // Scene_Boot
    //-----------------------------------------------------------------------------
    const _Scene_Boot_Create = Scene_Boot.prototype.create;
    Scene_Boot.prototype.create = function () {
        _Scene_Boot_Create.apply(this, arguments);
        $conditionSkill = new ConditionSkill();
    };

    //-----------------------------------------------------------------------------
    // BattleManager
    //-----------------------------------------------------------------------------
    const _BattleManager_Setup = BattleManager.setup;
    BattleManager.setup = function (troopId, canEscape, canLose) {
        _BattleManager_Setup.apply(this, arguments);
        $conditionSkill.init();
    };

    const _BattleManager_StartAction = BattleManager.startAction;
    BattleManager.startAction = function () {
        const subject = this._subject;
        const action = subject.currentAction();
        $conditionSkill.setConditionSkill(action);
        _BattleManager_StartAction.apply(this, arguments);
    };

    //-----------------------------------------------------------------------------
    // Game_Battler
    //-----------------------------------------------------------------------------
    const _Game_Battler_UseItem = Game_Battler.prototype.useItem;
    Game_Battler.prototype.useItem = function (item) {
        _Game_Battler_UseItem.apply(this, arguments);
        if (DataManager.isSkill(item)) {
            this.addSkillCount(item);
        }
    };

    Game_Battler.prototype.addSkillCount = function (skill) {
        //
    };

    //-----------------------------------------------------------------------------
    // Game_Actor
    //-----------------------------------------------------------------------------
    const _Game_Actor_InitMembers = Game_Actor.prototype.initMembers;
    Game_Actor.prototype.initMembers = function () {
        _Game_Actor_InitMembers.apply(this, arguments);
        this._skillCounts = {};
    };

    Game_Actor.prototype.addSkillCount = function (skill) {
        if (skill.id in this._skillCounts) {
            if (this.skillCount(skill.id) < 10000) {
                this._skillCounts[skill.id] += 1;
            }
        } else {
            this._skillCounts[skill.id] = 1;
        }
    };

    Game_Actor.prototype.skillCount = function (skillId) {
        if (skillId in this._skillCounts) {
            return this._skillCounts[skillId];
        } else {
            return 0;
        }
    };
})();
