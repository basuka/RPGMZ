//=============================================================================
// RPG Maker MZ - SkillPoint
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc スキルポイントを設定します。
 * @author Basu
 *
 * @help SkillPoint.js
 *
 * このプラグインは、スキルポイントコマンドを提供します。
 * スキルの習得をレベルだけではなく戦闘勝利後に獲得するスキルポイントでも習得できるようにします。
 *
 * ■各設定項目
 *
 *   ■獲得スキルポイントの設定
 *   
 *    【敵グループ】
 *     獲得スキルポイントを設定する敵グループの設定を行います。
 *
 *    【獲得スキルポイント】
 *     【敵グループ】で設定した敵グループから獲得するスキルポイントの設定を行います。
 *
 *
 *   ■アクタースキルポイントの設定
 *
 *    【アクター】
 *     スキルポイントでスキルを習得させるアクターの設定を行います。
 *
 *    【スキルレベル】
 *     習得可能のスキルレベルの設定を行います。
 *     別コマンド『習得可能スキルレベルの設定』で設定したスキルレベルが、この項目で設定したスキルレベルに達するまで
 *    【スキル】で設定したスキルの習得は出来ません。
 *
 *    【スキル】
 *    【アクター】で設定したアクターに習得させるスキルの設定を行います。
 *
 *    【必要スキルポイント】
 *    【スキル】で設定したスキルの習得に必要なスキルポイントの設定を行います。
 *
 *
 *   ■習得可能スキルレベルの設定
 *
 *    【スキルレベル】
 *     習得可能なスキルレベルの設定を行います。
 *     この項目で設定したスキルレベルまでのスキルの習得を可能にします。
 *     ※習得スキルと習得スキルのスキルレベルの設定は別コマンド『アクタースキルポイントの設定』で行います。
 *
 *    【スキルレベル設定対象アクター】
 *     スキルレベルを設定するアクターの設定を行います。
 *     全アクターを選択した場合、対象は加入したことのあるアクター全て(パーティーメンバー外も含め)に設定されます。
 *     ※未加入のアクターへの設定は行われません。
 *
 *    【スキルレベル設定対象アクター】
 *     スキルレベルを設定するアクターを個別に設定を行います。
 *     この項目は【スキルレベル設定対象アクター】で「指定アクター」を設定した場合有効(必須)になります。
 *
 *
 *   ■オプションの設定
 *
 *    【次のスキルを表示】
 *     メニュー画面で次に習得するスキルの情報を表示するかの設定を行います。
 *     「表示する」を設定した場合、メニュー画面のスキルから次に習得するスキルと
 *     習得に必要なスキルポイントの情報が表示されるようになります
 *
 *    【スキルポイントの繰り越し】
 *     現在のスキルレベルで次に習得スキルが存在しない場合、余剰分のスキルポイントを繰り越すか設定を行います。
 *     「繰り越す」を設定した場合、余剰分のスキルポイントは保持したまま次のスキルレベルに繰り越すことが出来ます。
 *     「繰り越さない」を設定した場合、余剰分のスキルポイントは切り捨てられスキルポイントは0になります。
 *
 *    【パーティーメンバー外の取得】
 *     パーティーメンバー外のアクターもスキルポイントの取得を行うかの設定を行います。
 *    「取得する」を設定した場合、加入したことのあるアクターはパーティーメンバー外でもスキルポイントを取得するようになります。
 *
 *    【スキルポイントの取得タイプ】
 *     スキルポイントの取得タイプの設定を行います。
 *     「習得スキル有り」を選択した場合、現在のスキルレベルで次に習得するスキルが存在しない場合はスキルポイントの取得はしなくなります。
 *     「習得スキル無し」を選択した場合、現在のスキルレベルで次に習得するスキルが存在しない場合でもスキルポイントの取得を行います。
 *
 *
 *=====================================================================================================================================================
 *
 * @command setGainSkillPoint
 * @text 獲得スキルポイントの設定
 * @desc 戦闘勝利時に獲得できるスキルポイントを設定します。
 *
 * @arg gainSkillPoints
 * @type struct<gainSkillPoints>[]
 * @text 獲得スキルポイント
 * @desc 獲得スキルポイントを設定します。
 *
 *
 * @command setActorSkillPoint
 * @text アクタースキルポイントの設定
 * @desc スキル習得に必要なスキルポイントなどアクタースキルポイントを設定します。
 *
 * @arg actorSkillPoints
 * @type struct<actorSkillPoints>[]
 * @text 獲得スキルポイントの設定
 * @desc 戦闘勝利時に獲得するスキルポイントを設定します。
 *
 *
 * @command setLearnedSkillLevel
 * @text 習得可能スキルレベルの設定
 * @desc 習得可能なスキルレベルを設定します。
 *       ここで設定したスキルレベルまでのスキルが習得可能となります。
 *
 * @arg skillLevel
 * @text スキルレベル
 * @type number
 * @default 0
 * @desc 習得可能にするスキルレベルを設定します。
 *
 * @arg setSkillLevelActorType
 * @text スキルレベル設定対象アクター
 * @type select
 * @option パーティーメンバー
 * @value 0
 * @option 全アクター
 * @value 1
 * @option 指定アクター
 * @value 2
 * @default 0
 * @desc スキルレベルを設定する対象を設定します。
 *
 * @arg actorIds
 * @text アクター
 * @type actor[]
 * @desc グループIDの設定を行うアクターを設定します。
 *       対象アクターを「指定アクター」に設定している場合有効です。
 *
 *
 * @command setOption
 * @text オプションの設定
 * @desc スキルポイントに関するオプションを設定します。
 *
 * @arg displayNextSkill
 * @text 次のスキルを表示
 * @type boolean
 * @on 表示する
 * @off 表示しない
 * @default true
 * @desc メニュー画面で次に習得するスキルの表示の有無を設定します。
 *
 * @arg carrySkillPoint
 * @text スキルポイントの繰り越し
 * @type boolean
 * @on 繰り越す
 * @off 繰り越さない
 * @default false
 * @desc 次に習得するスキルが無い場合、余剰分のスキルポイントを繰り越して保持するか設定します。
 *
 * @arg outMemberGain
 * @text パーティーメンバー外の取得
 * @type boolean
 * @on 取得する
 * @off 取得しない
 * @default false
 * @desc パーティーメンバー外のメンバーもスキルポイントを取得するか設定します。
 *
 * @arg gainSpType
 * @text スキルポイントの取得タイプ
 * @type select
 * @option 習得スキル有り
 * @value 0
 * @option 習得スキル無し
 * @value 1
 * @default 0
 * @desc 次に習得できるスキルの有無によりスキルポイントを取得するか設定します。(スキルポイントを繰り越す場合有効)
 */

/*~struct~gainSkillPoints:ja
 *
 * @param troopId
 * @type troop
 * @text 敵グループ
 * @desc 獲得スキルポイントを設定する敵グループを設定します。
 *
 * @param skillPoint
 * @text 獲得スキルポイント
 * @type number
 * @desc 対象の敵グループから獲得できるスキルポイントを設定します。
 *
 */

/*~struct~actorSkillPoints:ja
 * @param actorId
 * @text アクター
 * @type actor
 * @desc スキルポイントの設定をするアクターを設定します。
 * 
 * @param skillLevel
 * @text スキルレベル
 * @type number
 * @default 0
 * @desc 対象スキルの習得可能スキルレベルを設定します。
 * 
 * @param skillId
 * @text スキル
 * @type skill
 * @desc 対象アクターが習得するスキルを設定します。
 *
 * @param needSp
 * @text 必要スキルポイント
 * @type number
 * @default 0
 * @desc 対象スキルの習得に必要なスキルポイントの設定をします。
 */

$skillPoint = null;

(() => {

  const pluginName = "SkillPoint";

  PluginManager.registerCommand(pluginName, "setGainSkillPoint", inputGainSkillPoint => {
    PluginManager_Parser.prototype.parse(inputGainSkillPoint);
    $skillPoint.setGainSkillPoint(inputGainSkillPoint);
  });

  PluginManager.registerCommand(pluginName, "setActorSkillPoint", inputActorSkillPoint => {
    PluginManager_Parser.prototype.parse(inputActorSkillPoint);
    $skillPoint.setActorSkillPoint(inputActorSkillPoint);
  });

  PluginManager.registerCommand(pluginName, "setLearnedSkillLevel", inputLearnedSkillLevel => {
    PluginManager_Parser.prototype.parse(inputLearnedSkillLevel);
    $skillPoint.setLearnedSkillLevel(inputLearnedSkillLevel);
  });

  PluginManager.registerCommand(pluginName, "setOption", inputOption => {
    PluginManager_Parser.prototype.parse(inputOption);
    $skillPoint.setOption(inputOption);
  });

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


  //-----------------------------------------------------------------------------
  // Skill_Point
  //-----------------------------------------------------------------------------
  function Skill_Point() {
    this.initialize(...arguments);
  }

  Skill_Point.prototype = Object.create(Object.prototype);
  Skill_Point.prototype.constructor = Skill_Point;

  Skill_Point.prototype.initialize = function () {
     this._gainSkillPoints = {};
     this._actorSkillPoints = {};
     this._skillLevels = this.initSkillLevel();
     this._displayNextSkill = true;
     this._carrySkillPoint = false;
     this._outMemberGain = false;
     this._gainSpType = 0;
  }

  //-----------------------------------------------------------------------------
  // スキルレベルの初期設定を行います
  //-----------------------------------------------------------------------------
  Skill_Point.prototype.initSkillLevel = function () {

    const skillLevels = {};

    for (const actor of $dataActors) {
      if (actor) {
        skillLevels[actor.id] = 0;
      }
    }

    return skillLevels;
  }

  //-----------------------------------------------------------------------------
  // 獲得スキルポイントの設定を行います
  //-----------------------------------------------------------------------------
  Skill_Point.prototype.setGainSkillPoint = function (inputGainSkillPoint) {
    for (const gainSkillPoint of inputGainSkillPoint.gainSkillPoints) {
      const troopId = gainSkillPoint.troopId;
      const gainSp = gainSkillPoint.skillPoint;
      this._gainSkillPoints[troopId] = gainSp;
    }
  }

  //-----------------------------------------------------------------------------
  // 習得スキルポイントの設定を行います
  //-----------------------------------------------------------------------------
  Skill_Point.prototype.setActorSkillPoint = function (inputActorSkillPoint) {
    for (const actorSkillPoint of inputActorSkillPoint.actorSkillPoints) {
      const actorId = actorSkillPoint.actorId;
      const skillLevel = actorSkillPoint.skillLevel;
      const skillId = actorSkillPoint.skillId;
      const needSp = actorSkillPoint.needSp;

      let setSkill = true;

      if (actorId in this._actorSkillPoints === false) {
        this._actorSkillPoints[actorId] = [];
      } else {
        for (const regActorSkillPoint of this._actorSkillPoints[actorId]) {
          if (regActorSkillPoint.skillId === skillId) {
            setSkill = false;
            break;
          }
        }
      }

      if (setSkill) {
        const skillData = {skillLevel:skillLevel, skillId:skillId, needSp:needSp};
        this._actorSkillPoints[actorId].push(skillData);
      }
    }

    for (const actorId in this._actorSkillPoints) {
      this._actorSkillPoints[actorId].sort(function(a, b){
	if (a.skillLevel > b.skillLevel) return 1;
	if (a.skillLevel < b.skillLevel) return -1;
	if (a.needSp > b.needSp) return 1;
	if (a.needSp < b.needSp) return -1;
	return 0;
      });
    }
  }

  //-----------------------------------------------------------------------------
  // 習得可能スキルレベルの設定を行います
  //-----------------------------------------------------------------------------
  Skill_Point.prototype.setLearnedSkillLevel = function (inputLearnedSkillLevel) {

    const skillLevel = inputLearnedSkillLevel.skillLevel;
    const setSkillLevelActorType = inputLearnedSkillLevel.setSkillLevelActorType;

    if (setSkillLevelActorType === 0) {
      for (const actor of $gameParty.members()) {
        this._skillLevels[actor.actorId()] = skillLevel;
      }
    } else if (setSkillLevelActorType === 1) {
      for (actorId in this._skillLevels) {
        this._skillLevels[actorId] = skillLevel;
      }
    } else {
      const actorIds = inputLearnedSkillLevel.actorIds;

      for (actorId of actorIds) {
        this._skillLevels[actorId] = skillLevel;
      }
    }
  }

  //-----------------------------------------------------------------------------
  // オプションの設定を行います
  //-----------------------------------------------------------------------------
  Skill_Point.prototype.setOption = function (inputOption) {
    this._displayNextSkill = inputOption.displayNextSkill;
    this._carrySkillPoint = inputOption.carrySkillPoint;
    this._outMemberGain = inputOption.outMemberGain;
    this._gainSpType = inputOption.gainSpType;
  }

  //-----------------------------------------------------------------------------
  // 次に習得可能なスキルがあるか確認を行います
  //-----------------------------------------------------------------------------
  Skill_Point.prototype.isNextSkill = function (actor) {
    return this.getNextSkill(actor) ? true : false;
  }

  //-----------------------------------------------------------------------------
  // 次に習得可能なスキルの取得を行います
  //-----------------------------------------------------------------------------
  Skill_Point.prototype.getNextSkill = function (actor) {

    const skillLevel = this._skillLevels[actor._actorId];
    const actorSkillPoints = this._actorSkillPoints[actor._actorId];
    const sp = actor._sp;

    let nextSkill = null

    if (actorSkillPoints) {
      for (const actorSkillPoint of actorSkillPoints) {

        const actorSkillLevel = actorSkillPoint.skillLevel;
        const needSp = actorSkillPoint.needSp;
        const skillId = actorSkillPoint.skillId;

        if (!actor.isLearnedSkill(skillId) && actorSkillLevel <= skillLevel) {
          nextSkill = {skillId:skillId, needSp:needSp};
          break;
        }
      }
    }
    return nextSkill;
  }

  //-----------------------------------------------------------------------------
  // 獲得スキルポイントの取得を行います
  //-----------------------------------------------------------------------------
  Skill_Point.prototype.getGainSkillPoint = function () {
    return this._gainSkillPoints[$gameTroop.troop().id];
  }

  //-----------------------------------------------------------------------------
  // 習得スキルの取得を行います
  //-----------------------------------------------------------------------------
  Skill_Point.prototype.getLearnSkill = function (actor) {

    const skillLevel = this._skillLevels[actor._actorId];
    const actorSkillPoints = this._actorSkillPoints[actor._actorId];
    const sp = actor._sp;

    let learnSkill = null;

    if (actorSkillPoints) {
      for (const actorSkillPoint of actorSkillPoints) {

        const actorSkillLevel = actorSkillPoint.skillLevel;
        const needSp = actorSkillPoint.needSp;
        const skillId = actorSkillPoint.skillId;

        if (!actor.isLearnedSkill(skillId) && actorSkillLevel <= skillLevel) {
          if (needSp <= sp) {
            learnSkill = {skillId:skillId, needSp:needSp};
            break;
          } else if (sp < needSp) {
            break;
          }
        }
      }
    }
    return learnSkill;
  }


  //-----------------------------------------------------------------------------
  // Scene_Boot
  //-----------------------------------------------------------------------------

  //-----------------------------------------------------------------------------
  // Scene_Boot.prototype.onDatabaseLoaded関数の再定義
  //-----------------------------------------------------------------------------
  const _Scene_Boot_OnDatabaseLoaded = Scene_Boot.prototype.onDatabaseLoaded;
  Scene_Boot.prototype.onDatabaseLoaded = function() {
    _Scene_Boot_OnDatabaseLoaded.apply(this, arguments);
    this.createTextManager();
  };

  //-----------------------------------------------------------------------------
  // TextManagerオブジェクトにスキルポイント用のプロパティを追加
  //-----------------------------------------------------------------------------
  Scene_Boot.prototype.createTextManager = function() {
     Object.defineProperties(TextManager, {
        sp: TextManager.getter("skillPoint", 0),
        spA: TextManager.getter("skillPoint", 1),
        obtainSpSkill: TextManager.getter("skillPoint", "obtainSpSkill"),
        spPointMsg: TextManager.getter("skillPoint", "spPointMsg"),
        nextSkillMsg: TextManager.getter("skillPoint", "nextSkillMsg"),
        obtainSP: TextManager.getter("message", "obtainExp")
     });
  }


  //-----------------------------------------------------------------------------
  // TextManager
  //-----------------------------------------------------------------------------

  //-----------------------------------------------------------------------------
  // スキルポイント用に作成したメッセージの取得
  //-----------------------------------------------------------------------------
  TextManager.skillPoint = function(createId) {
    return TextManager.skillPointDataSysytem()[createId] || "";
  };

  //-----------------------------------------------------------------------------
  // スキルポイント用に作成したメッセージ
  //-----------------------------------------------------------------------------
  TextManager.skillPointDataSysytem = function() {
     return {0:"スキルポイント",
             1:"SP",
             "obtainSpSkill":"%1は%2を覚えた！",
             "spPointMsg":"スキルポイント",
             "nextSkillMsg":"あと　%1"
     };
  }


  //-----------------------------------------------------------------------------
  // BattleManager
  //-----------------------------------------------------------------------------

  //-----------------------------------------------------------------------------
  // BattleManager.displayGold関数の再定義
  //-----------------------------------------------------------------------------
  const _BattleManager_DisplayGold = BattleManager.displayGold;
  BattleManager.displayGold = function() {
    _BattleManager_DisplayGold.apply(this, arguments);
    BattleManager.displaySp();
};

  //-----------------------------------------------------------------------------
  // 獲得スキルポイントメッセージの設定
  //-----------------------------------------------------------------------------
  BattleManager.displaySp = function() {
    const skillPoint = $skillPoint.getGainSkillPoint();
    if (skillPoint > 0) {
        $gameMessage.newPage();
        const text = TextManager.obtainExp.format(skillPoint, TextManager.sp);
        $gameMessage.add("\\." + text);
    }
  };

  //-----------------------------------------------------------------------------
  // BattleManager.gainRewards関数の再定義
  //-----------------------------------------------------------------------------
  const _BattleManager_GainRewards = BattleManager.gainRewards;
  BattleManager.gainRewards = function() {
    _BattleManager_GainRewards.apply(this, arguments);
    this.gainSp();
  };

  //-----------------------------------------------------------------------------
  // 各アクターへ獲得スキルポイントの反映を行います。
  //-----------------------------------------------------------------------------
  BattleManager.gainSp = function() {

    let actors = [];

    if ($skillPoint._outMemberGain) {
      actors = $gameActors._data;
    } else {
      actors = $gameParty.members();
    }

    for (const actor of actors) {
      if (actor) {
        if ($skillPoint.isNextSkill(actor) || $skillPoint._carrySkillPoint) {
          actor.gainSp();
        }
      }
    }
  };


  //-----------------------------------------------------------------------------
  // Game_Actor
  //-----------------------------------------------------------------------------

  //-----------------------------------------------------------------------------
  // Game_Actor.prototype.initMembers関数の再定義
  //-----------------------------------------------------------------------------
  const _Game_Actor_InitMembers = Game_Actor.prototype.initMembers;
  Game_Actor.prototype.initMembers = function() {
    _Game_Actor_InitMembers.apply(this, arguments);
    this._sp = 0;
  };

  //-----------------------------------------------------------------------------
  // 獲得スキルポイントの反映を行います。
  //-----------------------------------------------------------------------------
  Game_Actor.prototype.gainSp = function() {

    if ($skillPoint.isNextSkill(this) || $skillPoint._gainSpType === 1) {
      const skillPoint = $skillPoint.getGainSkillPoint();
      this._sp += skillPoint;
    }

    while (true) {
      const learnSkill = $skillPoint.getLearnSkill(this)

      if (learnSkill) {
        const skillId = learnSkill.skillId;
        const needSp = learnSkill.needSp;

        this.learnSkill(skillId);
        this._sp -= needSp;
        const skill = $dataSkills[skillId];
        $gameMessage.newPage();
        $gameMessage.add(TextManager.obtainSpSkill.format(this._name, skill.name));
      } else {
        break;
      }
    }

    if (!$skillPoint.isNextSkill(this) && !$skillPoint._carrySkillPoint) {
      this._sp = 0;
    }

  };


  //-----------------------------------------------------------------------------
  // Window_SkillList.prototype.makeItemList関数の再定義
  //-----------------------------------------------------------------------------
  const _Window_SkillList_MakeItemList =Window_SkillList.prototype.makeItemList;
  Window_SkillList.prototype.makeItemList = function() {
    // 再定義前のWindow_SkillList.prototype.makeItemList関数を呼び出し
    _Window_SkillList_MakeItemList.apply(this, arguments);
    if (this._actor && $skillPoint._displayNextSkill && !$gameParty.inBattle()) {
      const nextSkill = this.createNextSkill();
      if (nextSkill) {
        this._data.push(nextSkill);
      }
    }
  };

  //-----------------------------------------------------------------------------
  // 次に習得するスキル情報の作成を行います。
  //-----------------------------------------------------------------------------
  Window_SkillList.prototype.createNextSkill = function() {
    const nextSkillInfo = $skillPoint.getNextSkill(this._actor);
    if (nextSkillInfo) {
      const skill = $dataSkills[nextSkillInfo.skillId];
      const nextSp = nextSkillInfo.needSp - this._actor._sp;

      let spPointMsg = TextManager.spPointMsg;
      spPointMsg += "\n";

      let nextSkillMsg = TextManager.nextSkillMsg.format(nextSp);
      while (nextSkillMsg.length !== 30) {
        nextSkillMsg = "　" + nextSkillMsg;
      }

      if (nextSp.toString().length % 2 === 0) {
        nextSkillMsg = " " + nextSkillMsg;
      }

      return {iconIndex: skill.iconIndex,
              id: skill.id,
              name: skill.name,
              stypeId: skill.stypeId,
              mpCost: skill.mpCost,
              tpCost: skill.tpCost,
              occasion: 3,
              description: spPointMsg + nextSkillMsg};
    }
    return null;
  }


  //-----------------------------------------------------------------------------
  // DataManager
  //-----------------------------------------------------------------------------

  //-----------------------------------------------------------------------------
  // DataManager.createGameObjects関数の再定義
  //-----------------------------------------------------------------------------
  const _DataManager_Create_Game_Objects = DataManager.createGameObjects;
  DataManager.createGameObjects = function() {

    // 再定義前のDataManager.createGameObjects関数を呼び出し
    _DataManager_Create_Game_Objects.apply(this, arguments);
    $skillPoint = new Skill_Point();
  };

  //-----------------------------------------------------------------------------
  // DataManager.makeSaveContents関数の再定義
  //-----------------------------------------------------------------------------
  const _DataManager_Make_Save_Contents = DataManager.makeSaveContents;
  DataManager.makeSaveContents = function() {

    // 再定義前のDataManager.makeSaveContents関数を呼び出し
    const contents = _DataManager_Make_Save_Contents.apply(this, arguments);
    contents.skillPoint = $skillPoint;
    return contents;
  };

  //-----------------------------------------------------------------------------
  // DataManager.extractSaveContents関数の再定義
  //-----------------------------------------------------------------------------
  const _DataManager_Extract_Save_Contents = DataManager.extractSaveContents;
  DataManager.extractSaveContents = function(contents) {

    for(const name in contents) {
      if (contents[name].constructor.name === "Object" && contents[name]["@"]) {
        try {
          const obj = eval(contents[name]["@"]);
          Object.setPrototypeOf(contents[name], obj.prototype);
        } catch(e) {
          //
        }
      }
    } 

    // 再定義前のDataManager.extractSaveContents関数を呼び出し
    _DataManager_Extract_Save_Contents.apply(this, arguments);
    $skillPoint = contents.skillPoint;
  };

})();
