//=============================================================================
// RPG Maker MZ - InspirationSkill
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc 閃きスキル機能を設定します。
 * @author Basu
 * @url https://raw.githubusercontent.com/basuka/RPGMZ/main/AlignmentSkill/AlignmentSkill.js
 *
 * @help InspirationSkill.js
 *
 * このプラグインは、閃きスキル機能を提供します。
 *
 * ■各設定項目
 *
 *  【閃きスキル一覧】
 *   閃くスキルの一覧を設定します。
 *
 *    ・閃きスキル
 *      閃くスキルを設定します。
 *
 *    ・アクター
 *      スキルを閃くアクターを設定します。
 *
 *    ・閃き難易度
 *      スキルの閃き難易度を設定します。
 *      この項目はスキルを閃く確率の計算式に使用されます。
 *
 *    ・派生スキル
 *      スキルを閃くための派生スキルを設定します。
 *      この項目を設定した場合、設定したスキルを使用したときのみスキルを閃くようになります。
 *
 *  【閃きレベル】
 *   エネミーの閃きレベルを設定します。
 *
 *    ・エネミー
 *      閃きレベルを設定するエネミーを設定します。
 *
 *    ・閃きレベル
 *      エネミーの閃きレベルを設定します。
 *      この項目はスキルを閃く確率の計算式に使用されます。
 *
 *  【閃き効果音】
 *   スキルを閃いた際の効果音を設定します。
 *
 *    ・SEファイル名
 *      スキルを閃いた際に再生する効果音を設定します。
 *
 *    ・音量
 *      効果音の音量を設定します。
 *
 *    ・ピッチ
 *      効果音のピッチの高さを設定します。
 *
 *    ・位相
 *      効果音の位相を設定します。
 *
 *  【閃きメッセージ】
 *   スキルを閃いた際のメッセージを設定します。
 *   未設定の場合、閃きメッセージは表示されなくなります。
 *
 *  【閃き確率】
 *   スキルを閃く確率を設定します。
 *
 *    ・閃き難易度
 *      閃きの難易度を設定します。
 *
 *    ・確率
 *      閃き難易度の閃く確率を設定します。
 *
 *    ※ 閃き難易度は「閃きスキルの閃き難易度 - エネミーの閃きレベル」で算出されます。
 *
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加してください
 *
 * 2.追加した本プラグインのパラメータから閃きスキルに必要な情報を設定してください
 *=====================================================================================================================================================
 *
 * @param inspirationSkills
 * @type struct<inspirationSkill>[]
 * @text 閃きスキル一覧
 * @desc 閃くスキルの一覧を設定します
 *
 * @param inspirationLevels
 * @type struct<inspirationLevel>[]
 * @text 閃きレベル
 * @desc エネミーの閃きレベルを設定します
 *
 * @param inspirationSe
 * @type struct<inspirationSe>
 * @default {"name":"Decision5","volume":"200","pitch":"200","pan":"0"}
 * @text 閃き効果音
 * @desc スキルを閃いた際の効果音を設定します
 *
 * @param inspirationMessage
 * @type text
 * @text 閃きメッセージ
 * @default %1は%2を閃いた！
 * @desc スキルを閃いた際のメッセージを設定します
 *       未設定の場合、閃きメッセージは表示されなくなります
 *
 * @param inspirationDifficultys
 * @type struct<difficultyInfo>[]
 * @text 閃き確率
 * @default ["{\"difficulty\":\"10\",\"probability\":\"0\"}","{\"difficulty\":\"9\",\"probability\":\"286\"}","{\"difficulty\":\"8\",\"probability\":\"114\"}","{\"difficulty\":\"7\",\"probability\":\"73\"}","{\"difficulty\":\"6\",\"probability\":\"49\"}","{\"difficulty\":\"5\",\"probability\":\"38\"}","{\"difficulty\":\"4\",\"probability\":\"28\"}","{\"difficulty\":\"3\",\"probability\":\"20\"}","{\"difficulty\":\"2\",\"probability\":\"15\"}","{\"difficulty\":\"1\",\"probability\":\"12\"}","{\"difficulty\":\"0\",\"probability\":\"10\"}","{\"difficulty\":\"-1\",\"probability\":\"9\"}","{\"difficulty\":\"-2\",\"probability\":\"9\"}","{\"difficulty\":\"-3\",\"probability\":\"8\"}","{\"difficulty\":\"-4\",\"probability\":\"8\"}","{\"difficulty\":\"-5\",\"probability\":\"7\"}","{\"difficulty\":\"-6\",\"probability\":\"7\"}","{\"difficulty\":\"-7\",\"probability\":\"6\"}","{\"difficulty\":\"-8\",\"probability\":\"6\"}","{\"difficulty\":\"-9\",\"probability\":\"5\"}","{\"difficulty\":\"-10\",\"probability\":\"5\"}"]
 * @desc スキルを閃く確率を設定します
 */

/*~struct~inspirationSkill:ja
 * @param inspirationSkillId
 * @type skill
 * @text 閃きスキル
 * @desc 閃くスキルを設定します
 *
 * @param actorIds
 * @type actor[]
 * @text アクター
 * @desc スキルを閃くアクターを設定します
 *
 * @param difficulty
 * @type number
 * @text 閃き難易度
 * @desc スキルの閃き難易度を設定します
 *       この項目はスキルを閃く確率の計算式に使用されます
 *
 * @param derivedSkillId
 * @type skill
 * @text 派生スキル
 * @desc スキルを開くための派生スキルを設定します
 */

/*~struct~inspirationLevel:ja
 * @param enemyId
 * @type enemy
 * @text エネミー
 * @desc 閃きレベルを設定するエネミーを設定します
 * 
 * @param inspirationLevel
 * @type number
 * @text 閃きレベル
 * @desc 閃きレベルを設定します
 *       この項目はスキルを閃く確率の計算式に使用されます
 *
 */

/*~struct~inspirationSe:ja
 * @param name
 * @type file
 * @dir audio/se/
 * @default Decision5
 * @text SEファイル名
 * @desc スキル閃いた際に再生する効果音を設定します
 * 
 * @param volume
 * @type number
 * @default 200
 * @text 音量
 * @desc 効果音の音量を設定します
 *
 * @param pitch
 * @type number
 * @default 200
 * @text ピッチ
 * @desc 効果音のピッチの高さを設定します
 *
 * @param pan
 * @type number
 * @default 0
 * @text 位相
 * @desc 効果音の位相を設定します
 *
 */

/*~struct~difficultyInfo:ja
 * @param difficulty
 * @type number
 * @decimals 0
 * @min -9999
 * @text 閃き難易度
 * @desc 閃きの難易度を設定します
 * 
 * @param probability
 * @type number
 * @min 0
 * @text 確率　　　　　　　　1/
 * @desc 閃き難易度の閃く確率を設定します
 *
 */

(() => {

  const pluginName = "InspirationSkill";

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
  // BattleManager
  //-----------------------------------------------------------------------------

  const _BattleManager_InitMembers = BattleManager.initMembers;
  BattleManager.initMembers = function() {
    _BattleManager_InitMembers.apply(this, arguments);
    this._inspirationInfos = {};
  };

  const _BattleManager_Setup = BattleManager.setup;
  BattleManager.setup = function(troopId, canEscape, canLose) {
    _BattleManager_Setup.apply(this, arguments);
    this.setInspirationInfos();
  };

  BattleManager.setInspirationInfos = function() {

    this._inspirationInfos.skills = {};
    this._inspirationInfos.enemys = {};

    this.setInspirationSkillInfos();
    this.setInspirationEnemyInfos();
  };

  BattleManager.setInspirationSkillInfos = function() {

    const skillInfos = this._inspirationInfos.skills;

    for (const inspirationSkill of params.inspirationSkills) {
      const skillId = inspirationSkill.inspirationSkillId;
      const actorIds = inspirationSkill.actorIds;
      const difficulty = inspirationSkill.difficulty;
      const derivedSkillId = inspirationSkill.derivedSkillId;
      skillInfos[skillId] = {actorIds:actorIds, difficulty:difficulty, derivedSkillId:derivedSkillId};
    }
  }

  BattleManager.setInspirationEnemyInfos = function() {

    const enemyInfos = this._inspirationInfos.enemys;

    for (const enemy of $gameTroop._enemies) {
      for (const inspirationLevel of params.inspirationLevels) {
        if (enemy._enemyId === inspirationLevel.enemyId) {
          enemyInfos[enemy._enemyId] = {inspirationLevel:inspirationLevel.inspirationLevel};
        }
      }
    }
  }

  const _BattleManager_StartAction = BattleManager.startAction;
　BattleManager.startAction = function() {
    this.setInspiration();
    _BattleManager_StartAction.apply(this, arguments);
  };

  BattleManager.setInspiration = function() {
    const subject = this._subject;
    const action = subject.currentAction();
    const targets = action.makeTargets();

    const skillInfos = this._inspirationInfos.skills;
    const enemyInfos = this._inspirationInfos.enemys;

    let targetEnemyInfo = null;

    if (action.isForOpponent()) {
      if (action.isForAll()) {
        for (const target of targets) {
          const setTargetEnemyInfo = enemyInfos[target._enemyId];
          if (!targetEnemyInfo || targetEnemyInfo.inspirationLevel < setTargetEnemyInfo.inspirationLevel) {
            targetEnemyInfo = setTargetEnemyInfo;
          }
        }
      } else {
        const target = targets[0];
        targetEnemyInfo = enemyInfos[target._enemyId];
      }
    }

    const inspirationSkills = [];

    if (targetEnemyInfo) {
      for (const skillId in skillInfos) {
        const skillInfo = skillInfos[skillId];
        const actorIds = skillInfo.actorIds;
        if (actorIds.includes(subject._actorId) && !subject.hasSkill(skillId)) {
          if (!skillInfo.derivedSkillId || skillInfo.derivedSkillId === 0 || skillInfo.derivedSkillId === action._item._itemId) {
            const probability = this.getProbability(skillInfo, targetEnemyInfo);
            if (probability > 0 && skillId !== 0 && Math.random() * probability < 1) {
              inspirationSkills.push(skillId);
            }
          }
        }
      }

      if (inspirationSkills.length) {
        inspirationSkill = inspirationSkills[Math.floor( Math.random() * inspirationSkills.length )];
        subject.currentAction()._item._itemId = inspirationSkill;
        subject.currentAction()._inspirationFlag = true;
        subject.learnSkill(inspirationSkill);
        this.setInspirationFlag(subject);
      }
    }
  };

  BattleManager.setInspirationFlag = function(subject) {
    for (const actorSprite of this._spriteset._actorSprites) {
      if (actorSprite._actor && subject._actorId === actorSprite._actor._actorId) {
        for (const sprite of actorSprite.children) {
          if (typeof sprite.setInspirationFlag === 'function') {
            sprite.setInspirationFlag();
          }
        }
      }
    }
  }

  BattleManager.getProbability = function(skillInfo, targetEnemyInfo) {
    let maxDifficulty = null;
    let minDifficulty = null;
    let maxProbability = null;
    let minProbability = null;
    let probability = null;

    const difficulty = skillInfo.difficulty - targetEnemyInfo.inspirationLevel;

    for (const inspirationDifficulty of params.inspirationDifficultys) {
      if (difficulty === inspirationDifficulty.difficulty) {
        probability = inspirationDifficulty.probability;
        break;
      } else {
        if (!maxDifficulty || maxDifficulty < inspirationDifficulty.difficulty) {
          maxDifficulty = inspirationDifficulty.difficulty;
          maxProbability = inspirationDifficulty.probability;
        }
        if (!minDifficulty || minDifficulty > inspirationDifficulty.difficulty) {
          minDifficulty = inspirationDifficulty.difficulty;
          minProbability = inspirationDifficulty.probability;
        }
      }
    }

    if (!probability) {
      if (difficulty > maxDifficulty) {
        probability = maxProbability;
      } else {
        probability = minProbability;
      }
    }
    return probability;
  };


  //-----------------------------------------------------------------------------
  // Game_BattlerBase
  //-----------------------------------------------------------------------------

  const _Game_BattlerBase_PaySkillCost = Game_BattlerBase.prototype.paySkillCost
  Game_BattlerBase.prototype.paySkillCost = function(skill) {
    if (!this.currentAction()._inspirationFlag) {
      _Game_BattlerBase_PaySkillCost.apply(this, arguments);
    }
  };


  //-----------------------------------------------------------------------------
  // Window_BattleLog
  //-----------------------------------------------------------------------------

  const _Window_BattleLog_DisplayAction = Window_BattleLog.prototype.displayAction;
  Window_BattleLog.prototype.displayAction = function(subject, item) {
    if (subject.currentAction()._inspirationFlag) {
      AudioManager.playStaticSe(params.inspirationSe)
      this._waitCount = 30;
      if (params.inspirationMessage) {
        this.displayItemMessage(params.inspirationMessage, subject, item);
      }
    }
    _Window_BattleLog_DisplayAction.apply(this, arguments);
  };


  //-----------------------------------------------------------------------------
  // Sprite_Actor
  //-----------------------------------------------------------------------------

  const _Sprite_Actor_InitMembers = Sprite_Actor.prototype.initMembers;
  Sprite_Actor.prototype.initMembers = function() {
    _Sprite_Actor_InitMembers.apply(this, arguments);
    this.createInspirationSprite();
  };

  Sprite_Actor.prototype.createInspirationSprite = function() {
    this._inspirationSprite = new Sprite_Inspiration();
    this.addChild(this._inspirationSprite);
  };


  //-----------------------------------------------------------------------------
  // Sprite_Inspiration
  //-----------------------------------------------------------------------------

  function Sprite_Inspiration() {
    this.initialize(...arguments);
  }

  Sprite_Inspiration.prototype = Object.create(Sprite.prototype);
  Sprite_Inspiration.prototype.constructor = Sprite_Inspiration;

  Sprite_Inspiration.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this.initMembers();
    this.loadBitmap();
    this._inspirationFlag = false;
  };

  Sprite_Inspiration.prototype.initMembers = function() {
    this._inspirationIndex = 0;
    this._animationCount = 0;
    this._pattern = 0;
    this.anchor.x = 0.5;
    this.anchor.y = 2.2;
  };

  Sprite_Inspiration.prototype.setInspirationFlag = function() {
    this._inspirationFlag = true;
  }

  Sprite_Inspiration.prototype.loadBitmap = function() {
    this.bitmap = ImageManager.loadSystem("Balloon");
    this.setFrame(0, 0, 0, 0);
  };

  Sprite_Inspiration.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this._animationCount++;
    if (this._animationCount >= this.animationWait()) {
        this.updatePattern();
        this.updateFrame();
        this._animationCount = 0;
    }
  };

  Sprite_Inspiration.prototype.animationWait = function() {
    return 4;
  };

  Sprite_Inspiration.prototype.updatePattern = function() {

    if (this._inspirationFlag) {
      this._pattern++;
      this._pattern %= 8;
      this._inspirationIndex = 9;
    } else {
      this._pattern = 0;
      this._inspirationIndex = 0;
    }
  };

  Sprite_Inspiration.prototype.updateFrame = function() {
    if (this._inspirationIndex > 0) {
        const w = 48;
        const h = 48;
        const sx = this._pattern * w;
        const sy = (this._inspirationIndex - 1) * h;
        this.setFrame(sx, sy, w, h);
        if (this._pattern === 7) {
          this._inspirationFlag = false;
        }
    } else {
        this.setFrame(0, 0, 0, 0);
    }
  };
})();
