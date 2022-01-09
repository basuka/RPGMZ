//=============================================================================
// RPG Maker MZ - Alignment Skill
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc 連携スキルを設定します。
 * @author Basu
 * @url https://raw.githubusercontent.com/basuka/RPGMZ/main/AlignmentSkill/AlignmentSkill.js
 *
 * @help AlignmentSkill.js
 *
 * このプラグインは、二人以上で使用する連携スキル機能を提供します。
 *
 * ■事前設定
 *
 *  1.データベースにあるシステム1から、戦闘システムを「タイムプログレス（アクティブ）」に設定します。
 *   ※「タイムプログレス（アクティブ）」に設定しないと動作しません。
 *
 *  2.データベースにあるタイプから、連携スキルに使用するスキルタイプを設定します。
 *    ※ここで設定したスキルタイプ名が連携スキルの項目名になります。
 *
 *  3.データベースにあるスキルから、連携スキルにするスキルを設定します。
 *    連携スキルを設定する際、スキルタイプには連携スキルで設定したスキルタイプを設定してください。
 *
 * ■各設定項目
 *
 *  【連携スキル】
 *   連携スキルにするスキルを設定します。
 *
 *  【連携スキル情報】
 *   連携スキルに必要な各情報を設定します。
 *
 *  【計算式】
 *   連携スキルの計算式を設定します。
 *   計算式には参照する対象のアクターを指定することが出来ます。
 *
 *
 * ■連携スキル情報
 *
 *  【アクター】
 *   連携スキルに必要なアクターを設定します。
 *
 *  【スキル】
 *  【アクター】で設定したアクターが必要なスキルを設定します。
 *
 *  【必要MP】
 *  【アクター】で設定したアクターの消費MPを設定します。
 *   この項目が未入力、又は「0」が設定されている場合は、【スキル】で設定したスキル(データベース)の消費MPが設定されます。
 *
 *  【必要TP】
 *  【アクター】で設定したアクターの消費TPを全て設定します。
 *   この項目が未入力、又は「0」が設定されている場合は、【スキル】で設定したスキル(データベース)の消費TPが設定されます。
 *
 *
 * ■計算式の設定方法
 * 
 * 通常：
 *    a.atk　使用者の攻撃力
 * 
 * 対象のアクター指定：
 *    a[0].atk + a[1].mat
 * 
 * 【連携スキル情報】で設定した１番目のアクターの攻撃力 + 2番目のアクターの魔法力
 *  ※0から数え始めるので１番目のアクターを指定する場合は[0]を設定します。
 * 
 * その他の計算式についてはスキル(データベース)の計算式と変わらないので、詳しくはツクールのヘルプを参照してください。
 * また、上記以外のスキル項目についてはスキル(データベース)から設定を行ってください。
 *
 *=====================================================================================================================================================
 *
 * @param alignmentSkills
 * @type struct<alignmentSkills>[]
 * @text 連携スキル一覧
 * @desc 連携スキルにするスキル一覧を設定します。
 *
 */

/*~struct~alignmentSkills:ja
 *
 * @param alignmentSkill
 * @type skill
 * @text 連携スキル
 * @desc 連携スキルにするスキルを設定します。
 *
 * @param alignmentParams
 * @type struct<alignmentParam>[]
 * @text 連携スキル情報
 * @desc 連携スキルに必要な情報を必要アクター分設定します。
 *
 * @param formula
 * @type text
 * @text 計算式
 * @desc 計算式の設定をします。
 */

/*~struct~alignmentParam:ja
 * @param actorId
 * @text アクター
 * @type actor
 * @desc 連携スキルに必要なアクターを設定します。
 * 
 * @param skillId
 * @text スキル
 * @type skill
 * @desc このアクターに必要なスキルを設定します。
 *
 * @param mpCost
 * @text 消費MP
 * @type number
 * @max 9999
 * @min 0
 * @desc 連携スキル使用時、このアクターが消費するMPを設定します。
 *       省略、又は「0」の場合はスキル元の消費MPを参照します。
 * 
 * @param tpCost
 * @text 消費TP
 * @type number
 * @max 999
 * @min 0
 * @desc 連携スキル使用時、このアクターが消費するTPを設定します。
 *       省略、又は「0」の場合はスキル元の消費TPを参照します。
 */

$alignmentSkill = null;

(() => {

  const pluginName = "AlignmentSkill";

  const allAlignmentParams = {};
  const data = {};

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
  // Alignment_Skill
  //-----------------------------------------------------------------------------

  function Alignment_Skill() {
    this.initialize(...arguments);
  }

  Alignment_Skill.prototype.initialize = function () {
    if (BattleManager.isActiveTpb()) {
      const params = PluginManager_Parser.prototype.parse(PluginManager.parameters(pluginName));
      this._learnAlignmentSkill = [];
      for (const paramInfo of params["alignmentSkills"]) {
        this.setAlignmentSkillData(paramInfo);
      }
      this.setItemList();
    }
  }

  //-----------------------------------------------------------------------------
  // スキル用メッセージデータの作成
  //-----------------------------------------------------------------------------
  Alignment_Skill.prototype.makeItemListMsg = function (stypeId) {

     if (stypeId in data === false) {
       const itemListMsg = [];

       // メッセージ用のダミースキルを生成
       const msg = { iconIndex: 0, id: -1, name: "[" + $dataSystem.skillTypes[stypeId] + "]", stypeId: stypeId, mpCost: 0, tpCost: 0 };

       itemListMsg.push(this.getEmptyData(stypeId));
       itemListMsg.push(this.getEmptyData(stypeId));
       itemListMsg.push(msg);
       itemListMsg.push(this.getEmptyData(stypeId));

       data[stypeId] = itemListMsg;
     }
  }

  //-----------------------------------------------------------------------------
  // 入力された情報からスキルデータに各情報を設定
  //-----------------------------------------------------------------------------
  Alignment_Skill.prototype.setAlignmentSkillData = function (paramInfo) {

     // 入力情報の取得

     // 連携スキル
     const alignmentSkill = $dataSkills[paramInfo.alignmentSkill];
     if (!alignmentSkill) {
        return null;
     }

     const inputParams = []

     // 連携スキル情報の設定
     for (alignmentParam of paramInfo.alignmentParams) {
        // アクター情報
        const actor = $dataActors[alignmentParam.actorId];
        if (!actor) {
           return null;
        }

        // スキル情報
        const skill = $dataSkills[alignmentParam.skillId];
        if (!skill) {
           return null;
        }

        // 消費MP情報
        let mpCost = alignmentParam.mpCost;
        if (!mpCost || isNaN(mpCost) || mpCost === 0) {
           mpCost = skill.mpCost;
        }
        // 消費TP情報
        let tpCost = alignmentParam.tpCost;
        if (!tpCost || isNaN(tpCost) || tpCost === 0) {
           tpCost = skill.tpCost;
        }

        // 連携スキル情報を設定
        const inputParam = { actorId: alignmentParam.actorId, skillId: alignmentParam.skillId, mpCost: mpCost, tpCost: tpCost };
        inputParams.push(inputParam);
     }

     // 連携用パラメータを設定
     const allAlignmentParam = {params: inputParams, formula: paramInfo.formula, stypeId: alignmentSkill.stypeId}
     allAlignmentParams[alignmentSkill.id] = allAlignmentParam;
  }

  //-----------------------------------------------------------------------------
  // 連携スキルデータの設定
  //-----------------------------------------------------------------------------
  Alignment_Skill.prototype.setItemList = function () {

    for (const skillId in allAlignmentParams) {
      const allAlignmentParam = allAlignmentParams[skillId]
      const stypeId = allAlignmentParam.stypeId;

      let skill = $dataSkills[skillId];
      skill.alignmentParams = allAlignmentParam.params;
      if (allAlignmentParam.formula) {
        skill.damage.formula = allAlignmentParam.formula;
      }

      // スキル用メッセージデータの作成
      this.makeItemListMsg(stypeId);

      if (!data[stypeId].includes(skill)) {
        // 連携スキルフラグを設定
        skill.alignmentFlag = true;

        data[stypeId].push(skill);
        data[stypeId].sort((a, b) => a.id - b.id);
      }
    }
  }

  //-----------------------------------------------------------------------------
  // 連携スキルデータの読み込み
  //-----------------------------------------------------------------------------
  Alignment_Skill.prototype.loadAlignmentSkill = function () {
     for (const stypeId in data) {
        const loadSkills = data[stypeId];
        for (const loadSkill of loadSkills) {
           if (!this.isDummyData(loadSkill)) {
             $dataSkills[loadSkill.id] = loadSkill;
           }
        }
     }
  }

  //-----------------------------------------------------------------------------
  // 連携スキルデータの作成
  //-----------------------------------------------------------------------------
  Alignment_Skill.prototype.makeItemList = function (windowSkillList) {
    if ($gameParty.inBattle()) {
      this.makeBatlleItemList(windowSkillList);
    } else {
      this.makeMenuItemList(windowSkillList);
    }
  }

  //-----------------------------------------------------------------------------
  // 連携スキルデータの作成(メニュー)
  //-----------------------------------------------------------------------------
  Alignment_Skill.prototype.makeMenuItemList = function (windowSkillList) {
    const alignmentSkillList = [];
    for (stypeId in data) {
      const alignmentSkills = data[stypeId]
      for (alignmentSkill of alignmentSkills) {
        if (this.isData(alignmentSkill, windowSkillList._actor) && windowSkillList.includes(alignmentSkill)) {
          alignmentSkillList.push(alignmentSkill);
        }
      }
    }
    if (alignmentSkillList.length) {
      windowSkillList._data = alignmentSkillList;
    }
  }

  //-----------------------------------------------------------------------------
  // 連携スキルデータの作成(戦闘)
  //-----------------------------------------------------------------------------
  Alignment_Skill.prototype.makeBatlleItemList = function (windowSkillList) {
    if (windowSkillList._data.length && Object.keys(data).length) {
      this.adjustItemList(windowSkillList._data);
      for (stypeId in data) {
        let skillCheck = false;
        const skillData = []
        const alignmentSkills = data[stypeId]
        for (alignmentSkill of alignmentSkills) {
          if (this.isDummyData(alignmentSkill) || this.isData(alignmentSkill, windowSkillList._actor)) {
            skillData.push(alignmentSkill);
            if (!this.isDummyData(alignmentSkill)) {
              skillCheck = true;
            }
          }
        }
        if (skillCheck) {
          Array.prototype.push.apply(windowSkillList._data, skillData);
          this.adjustItemList(windowSkillList._data);
        }
      }
      while (this.isDummyData(windowSkillList._data.slice(-1)[0])) {
        windowSkillList._data.pop();
      }
    }
  }

  //-----------------------------------------------------------------------------
  // 連携スキルデータの描画用調整
  //-----------------------------------------------------------------------------
  Alignment_Skill.prototype.adjustItemList = function (skillList) {
    if (skillList.length % 2 === 1) {
      skillList.push(this.getEmptyData());
    }
  }

  //-----------------------------------------------------------------------------
  // 空白用のダミーデータの取得
  //-----------------------------------------------------------------------------
  Alignment_Skill.prototype.getEmptyData = function (stypeId) {
    return { iconIndex: 0, id: -1, name: "", stypeId: stypeId, mpCost: 0, tpCost: 0 };
  }

  //-----------------------------------------------------------------------------
  // 文字列から配列に変換する
  //-----------------------------------------------------------------------------
  Alignment_Skill.prototype.parse = function (value) {
    return value ? JSON.parse(value) : value;
  }

  //-----------------------------------------------------------------------------
  // 連携スキル使用条件を満たしているかの確認を行う
  //-----------------------------------------------------------------------------
  Alignment_Skill.prototype.isExec = function (skill, actor) {

    const actorIds = [];

    for (const alignmentParam of skill.alignmentParams) {
      // 連携技に必要なアクターが全員メンバーにいるか確認
      if ($gameParty.inBattle() && !$gameParty._actors.includes(alignmentParam.actorId)) {
        return false;
      }
      // 連携技に必要なスキルをアクター全員が取得しているか確認
      if ($gameParty.inBattle()) {
        const index = $gameParty._actors.indexOf(alignmentParam.actorId);
        if ($gameParty.members()[index] && !$gameParty.members()[index].isLearnedSkill(alignmentParam.skillId)) {
          return false;
        }
      } else {
        if (!$gameActors._data[alignmentParam.actorId].isLearnedSkill(alignmentParam.skillId)) {
          return false;
        }
      }
      actorIds.push(alignmentParam.actorId);
    }
    if (actor) {
      return actorIds.includes(actor._actorId);
    } else {
      return true;
    }
  }


  //-----------------------------------------------------------------------------
  // 連携スキルを習得しているかの確認を行う
  //-----------------------------------------------------------------------------
  Alignment_Skill.prototype.isLearnAlignmentSkill = function (skill) {
     return this._learnAlignmentSkill.includes(skill.id);
  }

  //-----------------------------------------------------------------------------
  // 連携スキルの習得を行う
  //-----------------------------------------------------------------------------
  Alignment_Skill.prototype.learnAlignmentSkill = function (skill) {
     return this._learnAlignmentSkill.push(skill.id);
  }

  //-----------------------------------------------------------------------------
  // ダミーデータかの確認を行う
  //-----------------------------------------------------------------------------
  Alignment_Skill.prototype.isDummyData = function (skill) {
    return skill && skill.id === -1;
  }

  //-----------------------------------------------------------------------------
  // 対象のスキルリストにスキルデータが存在するか確認を行う
  //-----------------------------------------------------------------------------
  Alignment_Skill.prototype.isData = function (skill, actor) {
    if (!this.isDummyData(skill) && this.isLearnAlignmentSkill(skill) && this.isExec(skill, actor)) {
      return true;
    }
    return false;
  }

  //-----------------------------------------------------------------------------
  // 連携スキルが有効か確認する確認を行う
  //-----------------------------------------------------------------------------
  Alignment_Skill.prototype.isEnabled = function (skill) {
    for (alignmentParam of skill.alignmentParams) {
      const index = $gameParty._actors.indexOf(alignmentParam.actorId);
      const actor = $gameParty.members()[index];
      // TPBが溜まっているか確認
      if (actor._tpbState !== "charged") {
        return false;
      }

      // 必要MPを満たしているか確認する
      if (actor._mp < alignmentParam.mpCost) {
        return false;
      }

      // 必要TPを満たしているか確認する
      if (actor._tp < alignmentParam.tpCost) {
        return false;
      }

      // 関連スキル使用状況を確認する
      if (!actor.meetsSkillConditions($dataSkills[alignmentParam.skillId])) {
        return false;
      }

      // 行動制約の確認
      for (statesId of actor._states) {
        if ($dataStates[statesId].restriction !== 0) {
          return false;
        }
      }
    }
    return true;
  }

  //-----------------------------------------------------------------------------
  // 対象のスキルタイプが連携スキルタイプか確認を行う
  //-----------------------------------------------------------------------------
  Alignment_Skill.prototype.isAlignmentSkillType = function (stypeId) {
    return data[stypeId] ? true : false;
  }


  //-----------------------------------------------------------------------------
  // Window_SkillList
  //-----------------------------------------------------------------------------

  //-----------------------------------------------------------------------------
  // Window_SkillList.prototype.initialize関数の再定義
  //-----------------------------------------------------------------------------
  const _Window_SkillList_Initialize = Window_SkillList.prototype.initialize
  Window_SkillList.prototype.initialize = function(rect) {
    _Window_SkillList_Initialize.apply(this, arguments);
    this._helpMode = true;
  };

  //-----------------------------------------------------------------------------
  // Window_SkillList.prototype.updateHelp関数の再定義
  //-----------------------------------------------------------------------------
  const _Window_SkillList_UpdateHelp =
      Window_SkillList.prototype.updateHelp;
  Window_SkillList.prototype.updateHelp = function () {
    if ($gameParty.inBattle()) {
      if (!this.item() || !$alignmentSkill.isDummyData(this.item())) {
        // 再定義前のWindow_SkillList.prototype.updateHelp関数を呼び出し
        _Window_SkillList_UpdateHelp.apply(this, arguments);
      }
    } else {
      if (this._helpMode) {
        _Window_SkillList_UpdateHelp.apply(this, arguments);
      } else {
        this._helpWindow.clear();
        this._helpWindow.refresh();
        const text = "必要キャラクター\n"
        const rect = this._helpWindow.baseTextRect();
        const textState = this._helpWindow.createTextState(text, rect.x, rect.y, rect.width)
        this._helpWindow.drawTextEx(textState.text, textState.startX, textState.startY, textState.width)

        const alignmentParams = this.item().alignmentParams;

        let addRectX = 40 * alignmentParams.length;
        for (alignmentParam of alignmentParams) {
          const actor = $dataActors[alignmentParam.actorId];
          const actorBitmap = ImageManager.loadCharacter(actor.characterName);
          const characterIndex = actor.characterIndex;
          actorBitmap.addLoadListener( () => this._helpWindow.drawCharacter(actor.characterName, characterIndex, textState.width - addRectX - 40, textState.height * 2));
          addRectX -= 40;
        }
      }
    }
  };

  //-----------------------------------------------------------------------------
  // Window_SkillList.prototype.makeItemList関数の再定義
  //-----------------------------------------------------------------------------
  const _Window_SkillList_MakeItemList =
      Window_SkillList.prototype.makeItemList;
  Window_SkillList.prototype.makeItemList = function() {
    // 再定義前のWindow_SkillList.prototype.makeItemList関数を呼び出し
    _Window_SkillList_MakeItemList.apply(this, arguments);
    $alignmentSkill.makeItemList(this);
  };

  //-----------------------------------------------------------------------------
  // Window_SkillList.prototype.isEnabled関数の再定義
  //-----------------------------------------------------------------------------
  const _Window_SkillList_IsEnabled =
      Window_SkillList.prototype.isEnabled;
  Window_SkillList.prototype.isEnabled = function(item) {
    if (item && item.alignmentFlag) {
      return $alignmentSkill.isEnabled(item);
    } else {
      // 再定義前のWindow_SkillList.prototype.isEnabled関数を呼び出し
      return $alignmentSkill.isDummyData(item) || _Window_SkillList_IsEnabled.apply(this, arguments);
    }
  };

  //-----------------------------------------------------------------------------
  // Window_SkillList.prototype.isCurrentItemEnabled関数の再定義
  //-----------------------------------------------------------------------------
  const _Window_SkillList_IsCurrentItemEnabled = Window_SkillList.prototype.isCurrentItemEnabled;
  Window_SkillList.prototype.isCurrentItemEnabled = function() {
    if (!$gameParty.inBattle() && $alignmentSkill.isAlignmentSkillType(this._stypeId)) {
      return true;
    } else {
      // 再定義前のWindow_SkillList.prototype.isCurrentItemEnabled関数を呼び出し
      return _Window_SkillList_IsCurrentItemEnabled.apply(this, arguments);
    }
  };

  //-----------------------------------------------------------------------------
  // Window_SkillList.prototype.drawSkillCost関数の再定義
  //-----------------------------------------------------------------------------
  const _Window_SkillList_drawSkillCost = Window_SkillList.prototype.drawSkillCost;
  Window_SkillList.prototype.drawSkillCost = function(skill, x, y, width) {
    if (!skill.alignmentFlag) {
      // 再定義前のWindow_SkillList.prototype.drawSkillCost関数を呼び出し
      _Window_SkillList_drawSkillCost.apply(this, arguments);
    }
  };

  //-----------------------------------------------------------------------------
  // 消費スキル画面の更新を行う
  //-----------------------------------------------------------------------------
  Window_SkillList.prototype.updateSkillCost = function () {
    if (this.item() && this.item().alignmentFlag) {
      this.showSkillCostWindow();
      this.setSkillCostWindowItem(this.item());
    } else {
      this.hideSkillCostWindow()
    }
  };

  //-----------------------------------------------------------------------------
  // ヘルプ/連携スキル必要アクターの表示の切り替えを行う
  //-----------------------------------------------------------------------------
  Window_SkillList.prototype.changeHelpMode = function() {
    if (this._helpMode) {
      this._helpMode = false;
    } else {
      this._helpMode = true;
    }
  }

  //-----------------------------------------------------------------------------
  // デフォルト値のヘルプ表示に戻す
  //-----------------------------------------------------------------------------
  Window_SkillList.prototype.clearHelpMode = function() {
    this._helpMode = true;
  }


  //-----------------------------------------------------------------------------
  // Window_SkillType
  //-----------------------------------------------------------------------------

  //-----------------------------------------------------------------------------
  // Window_SkillType.prototype.initialize関数の再定義
  //-----------------------------------------------------------------------------
  const _Window_SkillType_Initialize = Window_SkillType.prototype.initialize;
  Window_SkillType.prototype.initialize = function(rect) {

    // 再定義前のWindow_SkillType.prototype.initialize関数を呼び出し
    _Window_SkillType_Initialize.apply(this, arguments);
    this._skillTypeHelp = true;
  };

  //-----------------------------------------------------------------------------
  // Window_SkillType.prototype.makeCommandList関数の再定義
  //-----------------------------------------------------------------------------
  const _Window_SkillType_MakeCommandList = Window_SkillType.prototype.makeCommandList;
  Window_SkillType.prototype.makeCommandList = function() {
    // 再定義前のWindow_SkillType.prototype.makeCommandList関数を呼び出し
    _Window_SkillType_MakeCommandList.apply(this, arguments);

    if (this._actor) {
      for (const stypeId in data) {
        for (const skill of data[stypeId]) {
          if (skill.alignmentFlag && $alignmentSkill.isData(skill, this._actor)) {
            const name = $dataSystem.skillTypes[skill.stypeId];
            this.addCommand(name, "skill", true, skill.stypeId);
            break;
          }
        }
      }
    }
  };

  //-----------------------------------------------------------------------------
  // Window_SkillType.prototype.update関数の再定義
  //-----------------------------------------------------------------------------
  const _Window_SkillType_Update = Window_SkillType.prototype.update;
  Window_SkillType.prototype.update = function() {

    // 再定義前のWindow_SkillType.prototype.update関数を呼び出し
    _Window_SkillType_Update.apply(this, arguments);

    if (this._skillTypeHelp) {
      if ($alignmentSkill.isAlignmentSkillType(this.currentExt())) {
        this._helpWindow.setText("決定キーで必要なメンバー情報と切り替えることが出来ます");
      } else {
        this._helpWindow.setText("");
      }
    }
  };


  //-----------------------------------------------------------------------------
  // Window_Selectable
  //-----------------------------------------------------------------------------

  //-----------------------------------------------------------------------------
  // Window_Selectable.prototype.initialize関数の再定義
  //-----------------------------------------------------------------------------
  const _Window_Selectable_Initialize =
      Window_Selectable.prototype.initialize;
  Window_Selectable.prototype.initialize = function(rect) {
    
    // 再定義前のWindow_Selectable.prototype.initialize関数を呼び出し
    _Window_Selectable_Initialize.apply(this, arguments);

    this._skillCostWindow = null;
  };

  //-----------------------------------------------------------------------------
  // Window_Selectable.prototype.drawItemBackground関数の再定義
  //-----------------------------------------------------------------------------
  const _Window_Selectable_DrawItemBackground = Window_Selectable.prototype.drawItemBackground;
  Window_Selectable.prototype.drawItemBackground = function(index) {
    if (typeof this.itemAt === "function") {
      const item = this.itemAt(index);
      if (!$alignmentSkill.isDummyData(item)) {
        // 再定義前のWindow_Selectable.prototype.drawItemBackground関数を呼び出し
        _Window_Selectable_DrawItemBackground.apply(this, arguments);
      }
    }
  };

  //-----------------------------------------------------------------------------
  // Window_Selectable.prototype.cursorDown関数の再定義
  //-----------------------------------------------------------------------------
  const _Window_Selectable_CursorDown = Window_Selectable.prototype.cursorDown;
  Window_Selectable.prototype.cursorDown = function(wrap) {
    while (true) {
      const lastIndex = this.index();

      // 再定義前のWindow_Selectable.prototype.cursorDown関数を呼び出し
      _Window_Selectable_CursorDown.apply(this, arguments);

      if (typeof this.itemAt === "function") {
        if (lastIndex === this.index()) {
          this.cursorRight(Input.isTriggered("right"));
          break;
        } else {
          const item = this.item();
          if (!item || !$alignmentSkill.isDummyData(item)) {
            break;
          }
        }
      } else {
        break;
      }
    }
  };

  //-----------------------------------------------------------------------------
  // Window_Selectable.prototype.cursorUp関数の再定義
  //-----------------------------------------------------------------------------
  const _Window_Selectable_CursorUp = Window_Selectable.prototype.cursorUp;
  Window_Selectable.prototype.cursorUp = function (wrap) {
    while (true) {
      const lastIndex = this.index();

      // 再定義前のWindow_Selectable.prototype.cursorUp関数を呼び出し
      _Window_Selectable_CursorUp.apply(this, arguments);

      if (typeof this.itemAt === "function") {
        if (lastIndex === this.index()) {
          this.cursorLeft(Input.isTriggered("left"));
          break;
        } else {
          const item = this.item();
          if (!item || !$alignmentSkill.isDummyData(item)) {
            break;
          }
        }
      } else {
        break;
      }
    }
  };

  //-----------------------------------------------------------------------------
  // Window_Selectable.prototype.cursorRight関数の再定義
  //-----------------------------------------------------------------------------
  const _Window_Selectable_CursorRight = Window_Selectable.prototype.cursorRight;
  Window_Selectable.prototype.cursorRight = function (wrap) {
    while (true) {
      const lastIndex = this.index();

      // 再定義前のWindow_Selectable.prototype.cursorRight関数を呼び出し
      _Window_Selectable_CursorRight.apply(this, arguments);

      if (typeof this.itemAt === "function") {
        if (lastIndex === this.index()) {
          break;
        } else {
          const item = this.item();
          if (!item || !$alignmentSkill.isDummyData(item)) {
            break;
          }
        }
      } else {
        break;
      }
    }
  };

  //-----------------------------------------------------------------------------
  // Window_Selectable.prototype.cursorLeft関数の再定義
  //-----------------------------------------------------------------------------
  const _Window_Selectable_CursorLeft = Window_Selectable.prototype.cursorLeft;
  Window_Selectable.prototype.cursorLeft = function (wrap) {
    while (true) {
      const lastIndex = this.index();

      // 再定義前のWindow_Selectable.prototype.cursorLeft関数を呼び出し
      _Window_Selectable_CursorLeft.apply(this, arguments);

      if (typeof this.itemAt === "function") {
        if (lastIndex === this.index()) {
          break;
        } else {
          const item = this.item();
          if (!item || !$alignmentSkill.isDummyData(item)) {
            break;
          }
        }
      } else {
        break;
      }
    }
  };

  //-----------------------------------------------------------------------------
  // Window_Selectable.prototype.select関数の再定義
  //-----------------------------------------------------------------------------
  const _Window_Selectable_Select = Window_Selectable.prototype.select;
  Window_Selectable.prototype.select = function(index) {
    // 再定義前のWindow_Selectable.prototype.select関数を呼び出し
    _Window_Selectable_Select.apply(this, arguments);
    this.callUpdateSkillCost();
  };

  //-----------------------------------------------------------------------------
  // Window_Selectable.prototype.onTouchSelect関数の再定義
  //-----------------------------------------------------------------------------
  const _Window_Selectable_OnTouchSelect = Window_Selectable.prototype.onTouchSelect;
  Window_Selectable.prototype.onTouchSelect = function(trigger) {
    const hitIndex = this.hitIndex();
    if (hitIndex >= 0 && this._data && $alignmentSkill.isDummyData(this._data[hitIndex])) {
       return;
    }
    // 再定義前のWindow_Selectable.prototype.onTouchSelect関数を呼び出し
    _Window_Selectable_OnTouchSelect.apply(this, arguments);
  };

  //-----------------------------------------------------------------------------
  // スキル消費用ウィンドウの設定
  //-----------------------------------------------------------------------------
  Window_Selectable.prototype.setSkillCostWindow = function(skillCostWindow) {
    this._skillCostWindow = skillCostWindow;
    this.callUpdateSkillCost();
  };

//-----------------------------------------------------------------------------
  // スキル消費用ウィンドウを表示する
  //-----------------------------------------------------------------------------
  Window_Selectable.prototype.showSkillCostWindow = function() {
    if (this._skillCostWindow) {
        this._skillCostWindow.show();
    }
  };

  //-----------------------------------------------------------------------------
  // スキル消費用ウィンドウを消す
  //-----------------------------------------------------------------------------
  Window_Selectable.prototype.hideSkillCostWindow = function() {
    if (this._skillCostWindow) {
        this._skillCostWindow.hide();
    }
  };

  //-----------------------------------------------------------------------------
  // スキル消費用ウィンドウの更新
  //-----------------------------------------------------------------------------
  Window_Selectable.prototype.callUpdateSkillCost = function() {
    if (this.active && this._skillCostWindow) {
       this.updateSkillCost();
    }
  };

  //-----------------------------------------------------------------------------
  // スキル消費用ウィンドウをクリアする
  //-----------------------------------------------------------------------------
  Window_Selectable.prototype.updateSkillCost = function() {
    this._skillCostWindow.clear();
  };

  //-----------------------------------------------------------------------------
  // スキル消費情報の設定をする
  //-----------------------------------------------------------------------------
  Window_Selectable.prototype.setSkillCostWindowItem = function(item) {
    if (this._skillCostWindow) {
      var skillParams = [];
      if (item.alignmentFlag) {
        // 連携スキルの場合、連携スキル情報を設定
        skillParams = item.alignmentParams;
      } else {
        // 通常スキルの場合、連携スキル情報の雛型に生成して設定
        skillParams.push({actorId : this._actor._actorId, mpCost : item.mpCost, tpCost : item.tpCost})
      }
      this._skillCostWindow.setItem(skillParams);
    }
  };


  //-----------------------------------------------------------------------------
  // Window_BattleSkill
  //-----------------------------------------------------------------------------

  //-----------------------------------------------------------------------------
  // Window_BattleSkill.prototype.hide関数の再定義
  //-----------------------------------------------------------------------------
  const _Window_BattleSkill_Hide = Window_BattleSkill.prototype.hide;
  Window_BattleSkill.prototype.hide = function() {
    this.hideSkillCostWindow();
    _Window_BattleSkill_Hide.apply(this, arguments);
  };

  //-----------------------------------------------------------------------------
  // Window_Base
  //-----------------------------------------------------------------------------

  //-----------------------------------------------------------------------------
  // Window_Base.prototype.drawItemName関数の再定義
  //-----------------------------------------------------------------------------
  const _Window_Base_DrawItemName = Window_Base.prototype.drawItemName;
  Window_Base.prototype.drawItemName = function(item, x, y, width) {
    if (item && $alignmentSkill.isDummyData(item)) {
        x -= 50;
    }
    // 再定義前のWindow_Base.prototype.drawItemName関数を呼び出し
    _Window_Base_DrawItemName.apply(this, arguments);
  };

  //-----------------------------------------------------------------------------
  // Window_Base.prototype.processCharacter関数の再定義
  //-----------------------------------------------------------------------------
  const _Window_Base_ProcessCharacter = Window_Base.prototype.processCharacter;
  Window_Base.prototype.processCharacter = function(textState) {

    if (textState.text.substr(textState.index, 8) === "[key:se]") {

      textState.text = textState.text.replace("[key:se]", "");
      const seDataStr = textState.text.substr(textState.index, textState.text.indexOf("}") - textState.index + 1);
      textState.text = textState.text.replace(seDataStr, "");

      const seData = JSON.parse(seDataStr)
      const se = [seData]

      Game_Interpreter.prototype.command250(se);
    }

    // 再定義前のWindow_Base.prototype.processCharacter関数を呼び出し
    _Window_Base_ProcessCharacter.apply(this, arguments);

  };


  //-----------------------------------------------------------------------------
  // Window_SkillCost
  //-----------------------------------------------------------------------------

  function Window_SkillCost() {
    this.initialize(...arguments);
  }

  Window_SkillCost.prototype = Object.create(Window_Base.prototype);
  Window_SkillCost.prototype.constructor = Window_SkillCost;

  //-----------------------------------------------------------------------------
  // Window_SkillCostのinitialize
  //-----------------------------------------------------------------------------
  Window_SkillCost.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this, rect);
    this._skillParams = [];
  };

  //-----------------------------------------------------------------------------
  // スキル情報の設定
  //-----------------------------------------------------------------------------
  Window_SkillCost.prototype.setSkillParam = function(skillParams) {
    if (this._skillParams !== skillParams) {
        this._skillParams = skillParams;
        this.refresh();
    }
  };

  //-----------------------------------------------------------------------------
  // スキル情報のクリア
  //-----------------------------------------------------------------------------
  Window_SkillCost.prototype.clear = function() {
    this.setSkillParam([]);
  };

  //-----------------------------------------------------------------------------
  // スキル情報の設定
  //-----------------------------------------------------------------------------
  Window_SkillCost.prototype.setItem = function(item) {
    this.setSkillParam(item);
  };

  //-----------------------------------------------------------------------------
  // スキル消費情報の描画
  //-----------------------------------------------------------------------------
  Window_SkillCost.prototype.refresh = function() {
    const rect = this.baseTextRect();
    this.contents.clear();

    this.drawTextEx("MP", rect.x + 80, rect.y, rect.width);
    this.drawTextEx("TP", rect.x + 150, rect.y, rect.width);

    let addRectY = 50;

    // スキル情報とアクターの描画を繰り返す
    for (skillParam of this._skillParams) {
      const index = $gameParty._actors.indexOf(skillParam.actorId);
      const actor = $gameParty.members()[index];

      const actorBitmap = ImageManager.loadCharacter(actor.characterName());
      const characterIndex = actor.characterIndex();
      const drawCharacter_x = rect.x + 25;
      const drawCharacter_y = rect.y + addRectY + 40;
      actorBitmap.addLoadListener( () => this.drawCharacter(actor.characterName(), characterIndex, drawCharacter_x, drawCharacter_y));

      // 現在のアクターが対象のスキルの使用者の場合、消費MP・TPの描画を行う
      this.drawTextEx(skillParam.mpCost === 0 ? "-" : skillParam.mpCost.toString(), rect.x + 80, rect.y + addRectY, rect.width);
      this.drawTextEx(skillParam.tpCost === 0 ? "-" : skillParam.tpCost.toString(), rect.x + 150, rect.y + addRectY, rect.width);

      // 描画位置を1行下げる
      addRectY += 50
    }
  };


  //-----------------------------------------------------------------------------
  // Scene_Battle
  //-----------------------------------------------------------------------------

  //-----------------------------------------------------------------------------
  // Scene_Battle.prototype.onSkillOk関数の再定義
  //-----------------------------------------------------------------------------
  const _Scene_Battle_OnSkillOk = Scene_Battle.prototype.onSkillOk;
  Scene_Battle.prototype.onSkillOk = function() {
    const skill = this._skillWindow.item();
    if (skill.alignmentFlag) {
      $gameTemp.setLastAlignmentSubjectSkillId(skill.id);
    }

    // 再定義前のScene_Battle.prototype.onSkillOk関数を呼び出し
    _Scene_Battle_OnSkillOk.apply(this, arguments);
  };

  //-----------------------------------------------------------------------------
  // Scene_Battle.prototype.onEnemyCancel関数の再定義
  //-----------------------------------------------------------------------------
  const _Scene_Battle_OnEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
  Scene_Battle.prototype.onEnemyCancel = function() {
    if ($gameTemp.getLastAlignmentSubjectSkillId() > 0) {
       $gameTemp.setLastAlignmentSubjectSkillId(0);
    }

    // 再定義前のScene_Battle.prototype.onEnemyCancel関数を呼び出し
    _Scene_Battle_OnEnemyCancel.apply(this, arguments);
  };

  //-----------------------------------------------------------------------------
  // Scene_Battle.prototype.startActorCommandSelection関数の再定義
  //-----------------------------------------------------------------------------
  const _Scene_Battle_StartActorCommandSelection = Scene_Battle.prototype.startActorCommandSelection;
  Scene_Battle.prototype.startActorCommandSelection = function() {
    if ($gameTemp.getLastAlignmentSubjectSkillId() > 0) {
      const skillId = $gameTemp.getLastAlignmentSubjectSkillId();
      const skill = $dataSkills[skillId];
      for (const alignmentParam of skill.alignmentParams) {
        if (alignmentParam.actorId === BattleManager.actor()._actorId) {
          return;
        }
      }
    }

    // 再定義前のScene_Battle.prototype.onEnemyCancel関数を呼び出し
    _Scene_Battle_StartActorCommandSelection.apply(this, arguments);
  };


  //-----------------------------------------------------------------------------
  // Scene_Battle.prototype.createSkillWindow関数の再定義
  //-----------------------------------------------------------------------------
  const _Scene_Battle_CreateSkillWindow = Scene_Battle.prototype.createSkillWindow;
  Scene_Battle.prototype.createSkillWindow = function() {
    // 再定義前のScene_Battle.prototype.createSkillWindow関数を呼び出し
    _Scene_Battle_CreateSkillWindow.apply(this, arguments);
    this._skillWindow.setSkillCostWindow(this._skillCostWindow);
  };

  //-----------------------------------------------------------------------------
  // Scene_Battle.prototype.createAllWindows関数の再定義
  //-----------------------------------------------------------------------------
  const _Scene_Battle_CreateAllWindows = Scene_Battle.prototype.createAllWindows;
  Scene_Battle.prototype.createAllWindows = function() {
     this.createSkillCostWindow();
    _Scene_Battle_CreateAllWindows.apply(this, arguments);
  };

  //-----------------------------------------------------------------------------
  // スキル消費ウィンドウの作成を行う
  //-----------------------------------------------------------------------------
  Scene_Battle.prototype.createSkillCostWindow = function() {
    const rect = this.skillCostWindowRect();
    this._skillCostWindow = new Window_SkillCost(rect);
    this._skillCostWindow.hide();
    this.addWindow(this._skillCostWindow);
  };

  //-----------------------------------------------------------------------------
  // スキル消費ウィンドウのサイズと表示位置の設定を行う
  //-----------------------------------------------------------------------------
  Scene_Battle.prototype.skillCostWindowRect = function() {
    const ww = 220;
    const wh = this.windowAreaHeight() * 2.3;
    const wx = Graphics.boxWidth - ww;
    const wy = Graphics.boxHeight - wh;
    return new Rectangle(wx, wy, ww, wh);
  };


  //-----------------------------------------------------------------------------
  // Scene_Skill
  //-----------------------------------------------------------------------------

  //-----------------------------------------------------------------------------
  // Scene_Skill.prototype.commandSkill関数の再定義
  //-----------------------------------------------------------------------------
  const _Scene_Skill_CommandSkill = Scene_Skill.prototype.commandSkill;
  Scene_Skill.prototype.commandSkill = function() {

    // 再定義前のScene_Skill.prototype.commandSkill関数を呼び出し
    _Scene_Skill_CommandSkill.apply(this, arguments);
    this._skillTypeWindow._skillTypeHelp = false;
  };

  //-----------------------------------------------------------------------------
  // Scene_Skill.prototype.onItemCancel関数の再定義
  //-----------------------------------------------------------------------------
  const _Scene_Skill_OnItemCancel = Scene_Skill.prototype.onItemCancel;
  Scene_Skill.prototype.onItemCancel = function() {

    // 再定義前のScene_Skill.prototype.onItemCancel関数を呼び出し
    _Scene_Skill_OnItemCancel.apply(this, arguments);
    this._skillTypeWindow._skillTypeHelp = true;
    this._itemWindow.clearHelpMode();
  };

  //-----------------------------------------------------------------------------
  // Scene_Skill.prototype.useItem関数の再定義
  //-----------------------------------------------------------------------------
  const _Scene_Skill_UseItem = Scene_Skill.prototype.useItem;
  Scene_Skill.prototype.useItem = function() {
    if (!$gameParty.inBattle() && $alignmentSkill.isAlignmentSkillType(this.item().stypeId)) {
      this._itemWindow.changeHelpMode();
    } else {
      // 再定義前のScene_Skill.prototype.useItem関数を呼び出し
      _Scene_Skill_UseItem.apply(this, arguments);
    }
  };


  //-----------------------------------------------------------------------------
  // Sprite_Actor
  //-----------------------------------------------------------------------------

  //-----------------------------------------------------------------------------
  // Sprite_Actor.prototype.shouldStepForward関数の再定義
  //-----------------------------------------------------------------------------
  const _Sprite_Actor_ShouldStepForward = Sprite_Actor.prototype.shouldStepForward; 
  Sprite_Actor.prototype.shouldStepForward = function() {

    // 再定義前のSprite_Actor.prototype.shouldStepForward関数を呼び出し
    let isStepForward = _Sprite_Actor_ShouldStepForward.apply(this, arguments);

    if (!isStepForward) {
       const alignmentSkillId = $gameTemp.getLastAlignmentSubjectSkillId();
       const alignmentSkill = $dataSkills[alignmentSkillId];
       if (alignmentSkill) {
          for (const alignmentParam of alignmentSkill.alignmentParams) {
            if (this._actor._actorId === alignmentParam.actorId) {
              isStepForward = true;
            }
          }
       }
    }

    return isStepForward;

  };

  //-----------------------------------------------------------------------------
  // Sprite_Actor.prototype.updateMotion関数の再定義
  //-----------------------------------------------------------------------------
  const _Sprite_Actor_UpdateMotion = Sprite_Actor.prototype.updateMotion;
  Sprite_Actor.prototype.updateMotion = function() {
    if ($gameTemp.isAllMoving() && !this.isMoving()) {
      $gameTemp.endMove(this._actor._actorId)
      return;
    } else if ($gameTemp.isAllMoving()) {
      return;
    }

    // 再定義前のSprite_Actor.prototype.updateMotion関数を呼び出し
    _Sprite_Actor_UpdateMotion.apply(this, arguments);

    if ($gameTemp.getLastAlignmentUseActorId() === this._actor._actorId && $gameTemp.getLastAlignmentSubjectSkillId() > 0 && this._actor.isUndecided()) {
       const alignmentSkillId = $gameTemp.getLastAlignmentSubjectSkillId();
       const alignmentSkill = $dataSkills[alignmentSkillId];
       for (alignmentParam of alignmentSkill.alignmentParams) {
         const index = $gameParty._actors.indexOf(alignmentParam.actorId);
         const actor = $gameParty.members()[index];
         actor.clearMotion();
         actor.clearActions();
         actor.startTpbCasting();
       }
       $gameTemp.setLastAlignmentUseActorId(0);
       $gameTemp.setLastAlignmentSubjectSkillId(0);
    }
  };


  //-----------------------------------------------------------------------------
  // BattleManager
  //-----------------------------------------------------------------------------

  //-----------------------------------------------------------------------------
  // BattleManager.selectNextCommand関数の再定義
  //-----------------------------------------------------------------------------
  const  _BattleManager_SelectNextCommand = BattleManager.selectNextCommand; 
  BattleManager.selectNextCommand = function() {

    if ($gameTemp.getLastAlignmentSubjectSkillId() > 0) {
      const skillId = $gameTemp.getLastAlignmentSubjectSkillId();
      const skill = $dataSkills[skillId];
      if (skill.alignmentFlag) {
        for (const alignmentParam of skill.alignmentParams) {
          if (this._currentActor && this._currentActor._actorId !== alignmentParam.actorId) {
            const index = $gameParty._actors.indexOf(alignmentParam.actorId);
            const actor = $gameParty.members()[index];

            if (alignmentParam.actorId === actor._actorId) {
              let action = actor._actions[0];
              if (action) {
                action._item._dataClass = "skill"
                action._item._itemId = alignmentParam.skillId;
                actor.performAction(action);
                $gameTemp.setMove(actor._actorId);
              }
            }
          }
        }
      }
    } 

    // 再定義前のBattleManager.selectNextCommand関数を呼び出し
    _BattleManager_SelectNextCommand.apply(this, arguments);
  };


  //-----------------------------------------------------------------------------
  // Game_BattlerBase
  //-----------------------------------------------------------------------------

  //-----------------------------------------------------------------------------
  // Game_BattlerBase.prototype.paySkillCost関数の再定義
  //-----------------------------------------------------------------------------
  const _Game_BattlerBase_PaySkillCost = Game_BattlerBase.prototype.paySkillCost;
  Game_BattlerBase.prototype.paySkillCost = function (skill) {
    if (skill.alignmentFlag) {
      // 連携スキルの場合対象アクター全員分の必要MP・TPを消費する
      for (alignmentParam of skill.alignmentParams) {
        const index = $gameParty._actors.indexOf(alignmentParam.actorId);
        const actor = $gameParty.members()[index];
        actor._mp -= alignmentParam.mpCost;
        actor._tp -= alignmentParam.tpCost;
      }
    } else {
      // 通常スキルの場合は再定義前のGame_BattlerBase.prototype.paySkillCost関数を呼び出し
      _Game_BattlerBase_PaySkillCost.apply(this, arguments);
    }
  };


  //-----------------------------------------------------------------------------
  // Game_Action
  //-----------------------------------------------------------------------------

  //-----------------------------------------------------------------------------
  // Game_Action.prototype.updateLastSubject関数の再定義
  //-----------------------------------------------------------------------------
  const _Game_Action_UpdateLastSubject = Game_Action.prototype.updateLastSubject;
  Game_Action.prototype.updateLastSubject = function() {

    // 再定義前のBattleManager.updateLastSubject関数を呼び出し
    _Game_Action_UpdateLastSubject.apply(this, arguments);

    const subject = this.subject();
    const action = subject._actions[0];

    if (action && subject.isActor() && action._item._dataClass === "skill") {
      const skillId = action._item._itemId;
      const skill = $dataSkills[skillId];
      if (skill.alignmentFlag) {
        $gameTemp.setLastAlignmentUseActorId(subject.actorId());
      }
    }
  };

  //-----------------------------------------------------------------------------
  // Game_Action.prototype.evalDamageFormula関数の再定義
  //-----------------------------------------------------------------------------
  Game_Action.prototype.evalDamageFormula = function(target) {
    try {
        const item = this.item();
        const a = this.subjects(); // eslint-disable-line no-unused-vars
        const b = target; // eslint-disable-line no-unused-vars
        const v = $gameVariables._data; // eslint-disable-line no-unused-vars
        const sign = [3, 4].includes(item.damage.type) ? -1 : 1;
        const value = Math.max(eval(item.damage.formula), 0) * sign;
        return isNaN(value) ? 0 : value;
    } catch (e) {
        return 0;
    }
  };


  //-----------------------------------------------------------------------------
  // 連携スキルダメージ計算情報の取得
  //-----------------------------------------------------------------------------
  const _Game_Action_Subject = Game_Action.prototype.subject;
  Game_Action.prototype.subjects = function() {
    const item = this.item();
    if (item.damage.formula.includes("a[")) {
      if (this._subjectActorId > 0) {
        // ダメージ計算式で対象のアクターが指定されいる場合、対象のアクター情報をすべて取得
        const actors = [];
        for (alignmentParam of item.alignmentParams) {
          actors.push($gameActors.actor(alignmentParam.actorId));
        }
        return actors;
      } else {
         // 再定義前のBattleManager.updateLastSubject関数を呼び出し
         return _Game_Action_Subject.apply(this, arguments);
      }
    } else {
      // 再定義前のBattleManager.updateLastSubject関数を呼び出し
      return _Game_Action_Subject.apply(this, arguments);
    }
  };


  //-----------------------------------------------------------------------------
  // Game_Temp
  //-----------------------------------------------------------------------------

  //-----------------------------------------------------------------------------
  // Game_Temp.prototype.initialize関数の再定義
  //-----------------------------------------------------------------------------
  const _Game_Temp_Initialize = Game_Temp.prototype.initialize;
  Game_Temp.prototype.initialize = function() {

    // 再定義前のGame_Temp.prototype.initialize関数を呼び出し
    _Game_Temp_Initialize.apply(this, arguments);
    this._movingActorId = []
    this._lastAlignmentSkillId = 0;
    this._lastAlignmentUseActorId = 0;
  };

  //-----------------------------------------------------------------------------
  // 最後に使用した連携スキルIDの設定
  //-----------------------------------------------------------------------------
  Game_Temp.prototype.setLastAlignmentSubjectSkillId = function(skillId) {
    this._lastAlignmentSkillId = skillId;
  };

  //-----------------------------------------------------------------------------
  // 最後に使用した連携スキルIDの取得
  //-----------------------------------------------------------------------------
  Game_Temp.prototype.getLastAlignmentSubjectSkillId = function() {
    return this._lastAlignmentSkillId;
  };

  //-----------------------------------------------------------------------------
  // 最後に連携スキルを使用したアクターIDの設定
  //-----------------------------------------------------------------------------
  Game_Temp.prototype.setLastAlignmentUseActorId = function(actorId) {
    this._lastAlignmentUseActorId = actorId;
  };

  //-----------------------------------------------------------------------------
  // 最後に連携スキルを使用したアクターIDの取得
  //-----------------------------------------------------------------------------
  Game_Temp.prototype.getLastAlignmentUseActorId = function() {
    return this._lastAlignmentUseActorId;
  };

  //-----------------------------------------------------------------------------
  // 移動アクションを行うアクターIDの設定
  //-----------------------------------------------------------------------------
  Game_Temp.prototype.setMove = function(actorID) {
    this._movingActorId.push(actorID);
  };

  //-----------------------------------------------------------------------------
  // 移動アクションが終了したアクターIDの設定
  //-----------------------------------------------------------------------------
  Game_Temp.prototype.endMove = function(actorID) {
    this._movingActorId = this._movingActorId.filter(movingActorId => movingActorId != actorID);
  };

  //-----------------------------------------------------------------------------
  // 移動アクション中のアクターが存在するか確認
  //-----------------------------------------------------------------------------
  Game_Temp.prototype.isAllMoving = function() {
    return this._movingActorId.length > 0;
  };


  //-----------------------------------------------------------------------------
  // BattleManager
  //-----------------------------------------------------------------------------

  //-----------------------------------------------------------------------------
  // BattleManager.processVictory関数の再定義
  //-----------------------------------------------------------------------------
  const _BattleManager_ProcessVictory = BattleManager.processVictory;
  BattleManager.processVictory = function() {
    // 再定義前のBattleManager.prototype.processVictory関数を呼び出し
    _BattleManager_ProcessVictory.apply(this, arguments);
    this.learnAlignmentSkill();
  };

  //-----------------------------------------------------------------------------
  // 連携スキル習得メッセージの表示
  //-----------------------------------------------------------------------------
  BattleManager.displayLearnAlignmentSkill = function(skill) {
    const seKey = '[key:se]{"name":"Item1", "volume":90, "pitch":250, "pan":0}';
    const stypeName = "[" + $dataSystem.skillTypes[skill.stypeId] + "]";
    const createName = seKey + stypeName + skill.name;
    $gameMessage.newPage();
    $gameMessage.add(TextManager.obtainSkill.format(createName));
  };

  //-----------------------------------------------------------------------------
  // 連携スキルの習得
  //-----------------------------------------------------------------------------
  BattleManager.learnAlignmentSkill = function() {
    for (skillId in allAlignmentParams) {
      const skill = $dataSkills[skillId];
      if (skill && !$alignmentSkill.isLearnAlignmentSkill(skill)) {
        if ($alignmentSkill.isExec(skill)) {
          this.displayLearnAlignmentSkill(skill);
          $alignmentSkill.learnAlignmentSkill(skill);
        }
      }
    }
  };


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
    $alignmentSkill = new Alignment_Skill();
  };

  //-----------------------------------------------------------------------------
  // DataManager.makeSaveContents関数の再定義
  //-----------------------------------------------------------------------------
  const _DataManager_Make_Save_Contents = DataManager.makeSaveContents;
  DataManager.makeSaveContents = function() {

    // 再定義前のDataManager.makeSaveContents関数を呼び出し
    const contents = _DataManager_Make_Save_Contents.apply(this, arguments);
    contents.alignmentSkill = $alignmentSkill;
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
    $alignmentSkill = contents.alignmentSkill;
    $alignmentSkill.loadAlignmentSkill();
  };

})();
