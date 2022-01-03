//=============================================================================
// RPG Maker MZ - Teleport
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc テレポート機能を設定します。
 * @author Basu
 *
 * @help Teleport.js
 *
 * このプラグインは、テレポートコマンドを提供します。
 *
 * ■事前設定
 *  1.データベースにあるスキルまたはアイテムから、テレポートにするスキル・アイテムを設定します。
 *
 * ■各設定項目
 *
 *   ■テレポート機能の初期設定
 *
 *    【テレポートスキル】
 *     テレポートに使用するスキルの設定を行います(未使用時は省略可)
 *
 *    【テレポートアイテム】
 *     テレポートに使用するアイテムの設定を行います(未使用時は省略可)
 *
 *
 *   ■テレポートの設定
 *
 *    【表示順番号】
 *     テレポート使用時に表示される転移先名一覧の表示順の設定を行います。
 *     この項目を省略、または0を入力した際は転移先名の登録順に表示を行います。
 *
 *    【転移先マップの種類】
 *     テレポート使用時に転移する転移先マップの設定を行います。
 * 
 *      ・現在のマップ
 *        テレポート使用時にテレポートの設定を行っているイベントのマップ(フィールドなど)に転移します。
 *
 *      ・移動先のマップ
 *        テレポート使用時に場所移動イベントによる移動先のマップ(街の中など)に転移します。
 *
 *      ・直接指定
 *        テレポート使用時の転移先のマップIDを直接指定します。
 *        
 *   【転移先マップID】
 *    テレポート使用時の転移先のマップIDを直接設定します。
 *    この項目は【転移先マップの種類】で「直接指定」を選択した場合有効(必須)となります。
 *    マップIDはdata/MapInfos.jsonファイルで調べることが出来ます。
 *    ※MapInfos.jsonファイルが壊れると作成中のゲームに影響が出るので
 *      読み取り専用で開くかバックアップを取ることをお勧めします。
 *
 *   【転移先名の種類】
 *    テレポート使用時に表示される転移先名の種類を設定します。
 *
 *      ・名前
 *        マップデータに設定されている「名前」を設定します。
 *
 *      ・表示名
 *        マップデータに設定されている「表示名」を設定します。
 *
 *      ・入力
 *        移転先名を直接設定します。
 *
 *   【転移先名】
 *    テレポート使用時に表示される転移先名を直接設定します。
 *    この項目は【転移先名の種類】で「入力」を選択した場合有効(必須)となります。
 *
 *   【転移先マップ名の種類】
 *    テレポート使用時に表示される転移先名に設定するマップを設定します。
 *    この項目は【転移先マップの種類】で「現在のマップ」を選択した場合、有効になります。
 *    ただし、【転移先名の種類】で「入力」を選択した場合は無効になります。
 *
 *      ・移動先のマップ
 *        転移先名に場所移動イベントによる移動先のマップに設定されている「名前」「表示名」を設定します。
 *
 *      ・現在のマップ
 *        テレポートの設定を行っているイベントのマップに設定されている「名前」「表示名」を設定します。
 *
 *    【X軸の調整タイプ】
 *     テレポート使用時に転移する転移先のX軸の調整設定を行います。
 *
 *      ・なし
 *        転移先の調整はせずに基準座標(※1)に転移します。
 *
 *      ・右に調整
 *        基準座標(※1)から右方向に転移先を調整します。
 *
 *      ・左に調整
 *        基準座標(※1)から左方向に転移先を調整します。
 *
 *      ・直接指定
 *        転移先のX座標を直接設定します。
 *
 *    【X軸の調整】
 *     この項目は【X軸の調整タイプ】で「なし」を選択した場合無効となります。
 *     それ以外の場合は、有効(必須)となります。
 *     転移先X座標の調整数を設定します。
 *    【X軸の調整タイプ】で直接指定を選択した場合は、ここで入力された値が転移先のX座標に設定されます。
 *     また、【転移先マップの種類】で直接指定を選択した場合も同様の設定になります。
 *
 *    【Y軸の調整タイプ】
 *     テレポート使用時に転移する転移先のY軸の調整設定を行います。
 *
 *      ・なし
 *        転移先の調整はせずに基準座標(※1)に転移します。
 *
 *      ・上に調整
 *        基準座標(※1)から上方向に転移先を調整します。
 *
 *      ・下に調整
 *        基準座標(※1)から下方向に転移先を調整します。
 *
 *      ・直接指定
 *        転移先のY座標を直接設定します。
 *
 *    【Y軸の調整】
 *     この項目は【Y軸の調整タイプ】で「なし」を選択した場合無効となります。
 *     それ以外の場合は、有効(必須)となります。
 *     転移先Y座標の調整数を設定します。
 *    【Y軸の調整タイプ】で「直接指定」を選択した場合は、ここで入力された値が転移先のY座標に設定されます。
 *     また、【転移先マップの種類】で「直接指定」を選択した場合も同様の設定になります。
 *
 *     (※1)基準座標
 *
 *       ・【転移先マップの種類】で「現在のマップ」を選択した場合
 *          テレポートの設定を行っているイベントの座標
 *
 *       ・【転移先マップの種類】で「移動先のマップ」を選択した場合
 *          場所移動イベントで設定されている移動先の座標
 *
 *
 * 　■テレポートの使用可否設定
 *
 *    【テレポート使用可否】
 *     テレポートスキル・アイテムの使用可否の設定を行います。
 *
 *       ・使用可
 *         テレポートスキル・アイテムの使用を可能に設定します。
 *
 *       ・使用不可
 *         テレポートスキル・アイテムの使用を不可に設定します。
 *
 *
 * ■設定上の注意
 *
 *   1.【転移先マップの種類】または【転移先マップ名の種類】で「移動先のマップ」を設定している場合
 *     【テレポートの設定】は必ず場所移動イベントを行うページと同じページ内に設定してください。
 *     (場所移動イベントで設定している移動先などの情報を取得しているため)
 *
 *   2.【テレポートの設定】はイベント実行内容の一番上に設定してください。
 *     (【テレポートの設定】を行う前にスイッチ操作などでイベントページが変わる場合、変更後のページ内容を参照してしまうため)
 *
 *   3.【転移先マップの種類】または【転移先マップ名の種類】で「移動先のマップ」を設定している場合
 *     【テレポートの設定】を行うイベントとプレイヤーが重なった場合、イベントを実行するようにしてください。
 *     (プレイヤーの位置にあるイベント情報を取得しているため)
 *
 *    ※イベントがキャラクターなどイベントとプレイヤーの座標が異なる場合(プレイヤーと重ならない場合)は
 *      転移先を直接指定してください。
 *
 *=====================================================================================================================================================
 *
 * @command setTeleportItem
 * @text テレポート機能の初期設定
 * @desc テレポート機能の初期設定を行います。
 *
 * @arg teleportSkill
 * @type skill
 * @text テレポートスキル
 * @desc テレポートに使用するスキルの設定(未使用時は省略可)
 *
 * @arg teleportItem
 * @type item
 * @text テレポートアイテム
 * @desc テレポートに使用するアイテムの設定(未使用時は省略可)
 *
 *
 * @command setTeleport
 * @text テレポートの設定
 * @desc テレポートの設定を行います。
 *
 * @arg no
 * @type number
 * @text 表示順番号
 * @desc テレポート使用時の転移先名の表示順を決める番号を設定します。
 *       省略または0を入力した場合は連番で登録されます。
 *
 * @arg moveMapType
 * @type select
 * @option 現在のマップ
 * @value 0
 * @option 移動先のマップ
 * @value 1
 * @option 直接指定
 * @value 2
 * @default 0 
 * @text 転移先マップの種類
 * @desc テレポートによる転移先のマップの種類を設定します。
 *
 * @arg moveMapId
 * @type number
 * @text 転移先マップID
 * @desc 転移先にするマップIDを設定します。
 *       この項目は直接指定を選択した場合、有効になります(必須)。
 *
 * @arg setNameType
 * @type select
 * @option 名前
 * @value 0
 * @option 表示名
 * @value 1
 * @option 入力
 * @value 2
 * @default 0 
 * @text 転移先名の種類
 * @desc 設定する転移先名の種類の設定を行います。
 *       名前・表示名はマップデータの名前・表示名が設定されます。
 *
 * @arg name
 * @type string
 * @text 転移先名
 * @desc 転移先名の設定を行います。(町や村などの名前)
 *       転移先名の種類で入力を選択していない場合は無効となります。
 *
 * @arg nameDataType
 * @type select
 * @option 移動先のマップ
 * @value 0
 * @option 現在のマップ
 * @value 1
 * @default 0
 * @text 転移先マップ名の種類
 * @desc 登録する転移先名を移動先のマップ名か現在のマップ名か設定します。
 *       転移先名の種類で入力を選択している場合は無効となります。
 *
 * @arg offsetTypeX
 * @type select
 * @option なし
 * @value 0
 * @option 右に調整
 * @value 1
 * @option 左に調整
 * @value 2
 * @option 直接指定
 * @value 3
 * @default 0 
 * @text X軸の調整タイプ
 * @desc 転移先のX軸の調整タイプを設定します。
 *
 * @arg offsetX
 * @type number
 * @text X軸の調整
 * @desc X軸の調整を行います。
 *
 * @arg offsetTypeY
 * @type select
 * @option なし
 * @value 0
 * @option 上に調整
 * @value 1
 * @option 下に調整
 * @value 2
 * @option 直接指定
 * @value 3
 * @default 0 
 * @text Y軸の調整タイプ
 * @desc 転移先のY軸の調整タイプを設定します。
 *
 * @arg offsetY
 * @type number
 * @text Y軸の調整
 * @desc Y軸の調整を行います。
 *       Y軸の調整をなしに選択した場合は無効となります。
 *
 *
 * @command setUsePermission
 * @text テレポートの使用可否設定
 * @desc テレポートの使用可否の設定を行います。
 *
 * @arg usePermission
 * @type select
 * @option 使用可
 * @value 0
 * @option 使用不可
 * @value 1
 * @default 0 
 * @text テレポート使用可否
 * @desc テレポートスキル・アイテムの使用可否の設定を行います。
 */

$teleport = null;

(() => {

  const pluginName = "Teleport";

  PluginManager.registerCommand(pluginName, "setTeleportItem", inputTeleportData => {
     PluginManager_Parser.prototype.parse(inputTeleportData)
     $teleport.setTeleportItem(inputTeleportData);
  });

  PluginManager.registerCommand(pluginName, "setTeleport", inputTeleportData => {
     PluginManager_Parser.prototype.parse(inputTeleportData)
     $teleport.setTeleport(inputTeleportData);
  });

  PluginManager.registerCommand(pluginName, "setUsePermission", inputTeleportData => {
     PluginManager_Parser.prototype.parse(inputTeleportData)
     $teleport.setUsePermission(inputTeleportData);
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
  // Teleport
  //-----------------------------------------------------------------------------

  function Teleport() {
    this.initialize(...arguments);
  }

  Teleport.prototype = Object.create(Object.prototype);
  Teleport.prototype.constructor = Teleport;

  Teleport.prototype.initialize = function () {
     this._teleportSkillId = 0;
     this._teleportItemId = 0;
     this._data = [];
     this._teleportInfo = null;
     this._permission = true;
  }

  //-----------------------------------------------------------------------------
  // 入力された情報からテレポート機能を設定するスキルとアイテムの設定を行います
  //-----------------------------------------------------------------------------
  Teleport.prototype.setTeleportItem = function (inputTeleportData) {

    // 入力情報からテレポートスキルの設定
    this._teleportSkillId = inputTeleportData.teleportSkill;

    // 入力情報からテレポートアイテムの設定
    this._teleportItemId = inputTeleportData.teleportItem;
  }

  //-----------------------------------------------------------------------------
  // 入力された情報からテレポートの設定を行います
  //-----------------------------------------------------------------------------
  Teleport.prototype.setTeleport = function (inputTeleportData) {
    if (inputTeleportData.moveMapType === 0) {
      this.setCurrentMoveMapTypeData(inputTeleportData);
    } else if (inputTeleportData.moveMapType === 1) {
      this.setNextMoveMapTypeData(inputTeleportData);
    } else {
      this.setInputTypeData(inputTeleportData);
    }
  }

  //-----------------------------------------------------------------------------
  // 入力された情報からテレポート使用可否の設定を行います
  //-----------------------------------------------------------------------------
  Teleport.prototype.setUsePermission = function (inputTeleportData) {
    const usePermission = inputTeleportData.usePermission;
    if (usePermission === 0) {
      this._permission = true;
    } else {
      this._permission = false;
    }
  }

  //-----------------------------------------------------------------------------
  // テレポートによる転移先が現在のマップの場合の設定を行います
  //-----------------------------------------------------------------------------
  Teleport.prototype.setCurrentMoveMapTypeData = function (inputTeleportData) {
    // テレポート先のマップIDを現在のマップIDで設定
    const teleportMapId = $gameMap.mapId();

    let registMapId = 0;
    let registMapName = null;
    let teleportX = 0;
    let teleportY = 0;

    if (inputTeleportData.nameDataType === 0) {
      // テレポートに登録するマップ名が転移先のマップ名の場合

      // 転移先のマップ情報の取得
      const nextMoveMapData = this.getNextMoveMapData();
      if (!nextMoveMapData) {
        return;
      }

      // 転移先のマップIDを設定
      registMapId = nextMoveMapData.mapId;

      // 登録データの重複チェック
      if (this.isData(registMapId)) {
        return;
      }

      // テレポートに登録するマップ名の設定
      registMapName = this.getMapName(inputTeleportData, registMapId);
      if (!registMapName) {
        return;
      }

      // テレポートに登録するX座標の設定
      teleportX = this.getTeleport_X(inputTeleportData, nextMoveMapData);

      // テレポートに登録するY座標の設定
      teleportY = this.getTeleport_Y(inputTeleportData, nextMoveMapData);

    } else if (inputTeleportData.nameDataType === 1) {
      // テレポートに登録するマップ名が現在のマップ名の場合

      registMapId = $gameMap.mapId();

      // テレポートに登録するマップ名の設定
      registMapName = this.getMapName(inputTeleportData, registMapId);
      if (!registMapName) {
        return;
      }

      // テレポートに登録するX座標の設定
      teleportX = this.calcOffsetX(inputTeleportData, $gamePlayer.x);

      // テレポートに登録するY座標の設定
      teleportY = this.calcOffsetY(inputTeleportData, $gamePlayer.y);
    }

    const teleportData = {no:this.getNo(inputTeleportData), teleportMapId:teleportMapId, registMapId:registMapId, registMapName:registMapName, teleportX:teleportX, teleportY:teleportY};

    this._data.push(teleportData);
    this._data.sort((a, b) => a.no - b.no);
  }

  //-----------------------------------------------------------------------------
  // テレポートによる転移先が移動先のマップの場合の設定を行います
  //-----------------------------------------------------------------------------
  Teleport.prototype.setNextMoveMapTypeData = function (inputTeleportData) {

    // 転移先のマップ情報の取得
    const nextMoveMapData = this.getNextMoveMapData();
    if (!nextMoveMapData) {
      return;
    }

    // テレポート先のマップIDを転移先のマップIDで設定
    const teleportMapId = nextMoveMapData.mapId;

    // 転移先のマップIDを設定
    const registMapId = nextMoveMapData.mapId;

    // 登録データの重複チェック
    if (this.isData(registMapId)) {
      return;
    }

    const registMapName = this.getMapName(inputTeleportData, registMapId);
    if (!registMapName) {
      return;
    }

    // テレポートに登録するX座標の設定
    const teleportX = this.calcOffsetX(inputTeleportData,  nextMoveMapData.x);

      // テレポートに登録するY座標の設定
    const teleportY = this.calcOffsetY(inputTeleportData, nextMoveMapData.y);

    const teleportData = {no:this.getNo(inputTeleportData), teleportMapId:teleportMapId, registMapId:registMapId, registMapName:registMapName, teleportX:teleportX, teleportY:teleportY};

    this._data.push(teleportData);
    this._data.sort((a, b) => a.no - b.no);

  }

  //-----------------------------------------------------------------------------
  // テレポートによる転移先が直接指定の場合の設定を行います
  //-----------------------------------------------------------------------------
  Teleport.prototype.setInputTypeData = function (inputTeleportData) {

    // テレポート先のマップIDを転移先のマップIDで設定
    const teleportMapId = inputTeleportData.moveMapId;
    if (!teleportMapId) {
      return;
    }

    // テレポートに登録するマップIDを設定
    const registMapId = inputTeleportData.moveMapId;
    if (!registMapId) {
      return;
    }

    // 登録データの重複チェック
    if (this.isData(registMapId)) {
      return;
    }

    const registMapName = this.getMapName(inputTeleportData, registMapId);
    if (!registMapName) {
      return;
    }

    // テレポートに登録するX座標の設定
    const teleportX = inputTeleportData.offsetX;

      // テレポートに登録するY座標の設定
    const teleportY = inputTeleportData.offsetY;

    const teleportData = {no:this.getNo(inputTeleportData), teleportMapId:teleportMapId, registMapId:registMapId, registMapName:registMapName, teleportX:teleportX, teleportY:teleportY};

    this._data.push(teleportData);
    this._data.sort((a, b) => a.no - b.no);

  }

  //-----------------------------------------------------------------------------
  // 転移先マップデータの取得を行います
  //-----------------------------------------------------------------------------
  Teleport.prototype.getNo = function (inputTeleportData) {
    let no = inputTeleportData.no;
    if (!no || no === 0) {
      if (this._data.length) {
        no = this._data.slice(-1)[0].no + 1;
      } else {
        no = 1;
      }
    } else {
      for (const data of this._data) {
        if (data.no === no) {
          ++no;
        }
      }
    }
    return no;
  }

  //-----------------------------------------------------------------------------
  // 転移先マップデータの取得を行います
  //-----------------------------------------------------------------------------
  Teleport.prototype.getNextMoveMapData = function () {
    const eventId = $gameMap.eventIdXy($gamePlayer.x, $gamePlayer.y);
    const event = $gameMap.event(eventId).page();

    let nextMoveMapData = null;

    if (event) {
      for (const key in event.list) {
        const contents = event.list[key];
        if (contents.code === 201) {
          nextMoveMapData = {};
          nextMoveMapData.mapId = contents.parameters[1];
          nextMoveMapData.x = contents.parameters[2];
          nextMoveMapData.y = contents.parameters[3];
        }
      }
    }
    return nextMoveMapData;
  }

  //-----------------------------------------------------------------------------
  // テレポート先X座標の取得
  //-----------------------------------------------------------------------------
  Teleport.prototype.getTeleport_X = function (inputTeleportData, moveMapData) {

    let teleport_X = 0;

    if (inputTeleportData.moveMapType === 0) {
      teleport_X = $gamePlayer.x
    } else if (inputTeleportData.moveMapType === 1) {
      teleport_X = moveMapData.x
    }

    teleport_X = this.calcOffsetX(inputTeleportData, teleport_X);

    return teleport_X;
  }

  //-----------------------------------------------------------------------------
  // テレポート先Y座標の取得
  //-----------------------------------------------------------------------------
  Teleport.prototype.getTeleport_Y = function (inputTeleportData, moveMapData) {

    let teleport_Y = 0;

    if (inputTeleportData.moveMapType === 0) {
      teleport_Y = $gamePlayer.y
    } else if (inputTeleportData.moveMapType === 1) {
      teleport_Y = moveMapData.y
    }

    teleport_Y = this.calcOffsetY(inputTeleportData, teleport_Y);

    return teleport_Y;
  }

  //-----------------------------------------------------------------------------
  // マップ名の取得を行います
  //-----------------------------------------------------------------------------
  Teleport.prototype.getMapName = function (inputTeleportData, mapId) {
    // テレポート先名の設定
    let name = null;
    if (inputTeleportData.setNameType === 0) {
      const nextMapInfo = this.getMapInfo(mapId);

      if (nextMapInfo) {
        name = nextMapInfo.name;
      }
    } else if (inputTeleportData.setNameType === 1) {
      const nextMap = this.getMapData(mapId);
      if (nextMap) {
        name = nextMap.displayName;
      }
    } else {
      name = inputTeleportData.name;
    }
    return name;
  }

  //-----------------------------------------------------------------------------
  // マップデータの取得を行います
  //-----------------------------------------------------------------------------
  Teleport.prototype.getMapData = function (mapId) {
    if (mapId > 0) {
      const filename = "Map%1.json".format(mapId.padZero(3));
      const url = "data/" + filename;
      return require(url);
    }
    return null;
  }

  //-----------------------------------------------------------------------------
  // マップ情報の取得を行います
  //-----------------------------------------------------------------------------
  Teleport.prototype.getMapInfo = function (mapId) {
    if (mapId > 0) {
      for (key in $dataMapInfos) {
        if ($dataMapInfos[key] && $dataMapInfos[key].id === mapId) {
          return $dataMapInfos[key]
        }
      }
    }
    return null;
  }

  //-----------------------------------------------------------------------------
  // X座標の調整を行います
  //-----------------------------------------------------------------------------
  Teleport.prototype.calcOffsetX = function (inputTeleportData, x) {
    if (inputTeleportData.offsetTypeX === 0) {
      return x
    } else if (inputTeleportData.offsetTypeX === 1) {
      return x + inputTeleportData.offsetX;
    } else if (inputTeleportData.offsetTypeX === 2) {
      return x - inputTeleportData.offsetX;
    } else {
      return inputTeleportData.offsetX;
    }
  }

  //-----------------------------------------------------------------------------
  // Y座標の調整を行います
  //-----------------------------------------------------------------------------
  Teleport.prototype.calcOffsetY = function (inputTeleportData, y) {
    if (inputTeleportData.offsetTypeY === 0) {
      return y
    } else if (inputTeleportData.offsetTypeY === 1) {
      return y - inputTeleportData.offsetY;
    } else if (inputTeleportData.offsetTypeY === 2) {
      return y + inputTeleportData.offsetY;
    } else {
      return inputTeleportData.offsetY;
    }
  }

  //-----------------------------------------------------------------------------
  // 既に登録済みのマップIDか確認を行います
  //-----------------------------------------------------------------------------
  Teleport.prototype.isData = function (registMapId) {
    let setData = false;
    for (teleportData of this._data) {
      if (teleportData.registMapId === registMapId) {
        setData = true;
        break;
      }
    }
    return setData;
  }

  //-----------------------------------------------------------------------------
  // 使用したスキル、アイテムがテレポート用か確認する
  //-----------------------------------------------------------------------------
  Teleport.prototype.isTeleport = function (item) {
    return this._teleportSkillId === item.id || this._teleportItemId === item.id;
  }

  //-----------------------------------------------------------------------------
  // テレポート情報の設定
  //-----------------------------------------------------------------------------
  Teleport.prototype.setTeleportInfo = function (teleportInfo) {
    this._teleportInfo = teleportInfo;
  }

  //-----------------------------------------------------------------------------
  // テレポート動作のデータをイベントリストに合わせて生成
  //-----------------------------------------------------------------------------
  Teleport.prototype.createTeleportAction = function () {
    const teleportActionData = [];
    teleportActionData.push({code: 250, indent: 0, parameters: [{name: "Teleport", volume: 90, pitch: 100, pan: 0}]});
    teleportActionData.push({code: 223, indent: 0, parameters: [[-255, -255, -255, 0], 30, true]});
    teleportActionData.push({code: 201, indent: 0, parameters: [0, this._teleportInfo.teleportMapId, this._teleportInfo.teleportX, this._teleportInfo.teleportY, 2, 0]});
    teleportActionData.push({code: 223, indent: 0, parameters: [[0, 0, 0, 0], 30, true]});
    return teleportActionData;
  }


  //-----------------------------------------------------------------------------
  // Scene_Item
  //-----------------------------------------------------------------------------

  //-----------------------------------------------------------------------------
  // Scene_ItemBase.prototype.start関数の再定義
  //-----------------------------------------------------------------------------
  Scene_Item.prototype.start = function() {
    Scene_ItemBase.prototype.start.call(this);
    
    if (this._cancelTeleport) {
      // テレポートがキャンセルの場合、カーソルが最後に選択したスキル位置になるよう設定
      this._categoryWindow.callHandler("ok");
      this._categoryWindow.deactivate();
      $gameParty.setLastItem(this._teleportItem);
      this._itemWindow.setCategory(this._category);
      this._itemWindow.makeItemList();
      this._itemWindow.selectLast();
      this._cancelTeleport = false;
      this._teleportItem = null;
    }
  };

  //-----------------------------------------------------------------------------
  // Scene_Item.prototype.onItemOk関数の再定義
  //-----------------------------------------------------------------------------
  const _Scene_Item_OnItemOk = Scene_Item.prototype.onItemOk;
  Scene_Item.prototype.onItemOk = function() {
    if ($teleport.isTeleport(this.item())) {
      SoundManager.playOk();
      SceneManager.push(Scene_Teleport);
      const sceneTeleport = SceneManager._nextScene;
      sceneTeleport.setTeleportItem(this.item(), this._itemWindow._category);
    } else {
      // 再定義前のScene_Item.prototype.onItemOk関数を呼び出し
      _Scene_Item_OnItemOk.apply(this, arguments);
    }
  };


  //-----------------------------------------------------------------------------
  // Scene_Item.prototype.useItem関数の再定義
  //-----------------------------------------------------------------------------
  const _Scene_Item_UseItem = Scene_Item.prototype.useItem;
  Scene_Item.prototype.useItem = function() {
    if ($teleport.isTeleport(this.item())) {
      SoundManager.playOk();
      SceneManager.push(Scene_Teleport);
    } else {
      // 再定義前のScene_Item.prototype.useItem関数を呼び出し
      _Scene_Item_UseItem.apply(this, arguments);
    }
  };

  //-----------------------------------------------------------------------------
  // テレポートのキャンセル
  //-----------------------------------------------------------------------------
  Scene_Item.prototype.teleportCancel = function(item, category) {
    this._cancelTeleport = true;
    this._teleportItem = item;
    this._category = category;
  };


  //-----------------------------------------------------------------------------
  // Scene_Skill
  //-----------------------------------------------------------------------------

  //-----------------------------------------------------------------------------
  // Scene_Skill.prototype.start関数の再定義
  //-----------------------------------------------------------------------------
  const _Scene_Skill_Start = Scene_Skill.prototype.start;
  Scene_Skill.prototype.start = function() {

    // 再定義前のScene_Skill.prototype.start関数を呼び出し
    _Scene_Skill_Start.apply(this, arguments);

    if (this._cancelTeleport) {
      // テレポートがキャンセルの場合、カーソルが最後に選択したスキル位置になるよう設定
      this._skillTypeWindow.update();
      this._skillTypeWindow.callHandler("skill");
      this._skillTypeWindow.deactivate();
      this._itemWindow._actor.setLastMenuSkill(this._teleportItem);
      this._itemWindow.makeItemList();
      this._cancelTeleport = false;
      this._teleportItem = null;
    }
  };

  //-----------------------------------------------------------------------------
  // Scene_Skill.prototype.useItem関数の再定義
  //-----------------------------------------------------------------------------
  const _Scene_Skill_UseItem = Scene_Skill.prototype.useItem;
  Scene_Skill.prototype.useItem = function() {
    if ($teleport.isTeleport(this.item())) {
      SoundManager.playOk();
      SceneManager.push(Scene_Teleport);
      const sceneTeleport = SceneManager._nextScene;
      sceneTeleport.setTeleportSkill(this.item());
    } else {
      // 再定義前のScene_Skill.prototype.useItem関数を呼び出し
      _Scene_Skill_UseItem.apply(this, arguments);
    }
  };

  //-----------------------------------------------------------------------------
  // テレポートのキャンセル
  //-----------------------------------------------------------------------------
  Scene_Skill.prototype.teleportCancel = function(item) {
    this._cancelTeleport = true;
    this._teleportItem = item;
  };


  //-----------------------------------------------------------------------------
  // Scene_Teleport
  //-----------------------------------------------------------------------------

  function Scene_Teleport() {
    this.initialize(...arguments);
  }

  Scene_Teleport.prototype = Object.create(Scene_ItemBase.prototype);
  Scene_Teleport.prototype.constructor = Scene_Teleport;

  Scene_Teleport.prototype.initialize = function() {
    Scene_ItemBase.prototype.initialize.call(this);
  };

  //-----------------------------------------------------------------------------
  // ウィンドウの作成
  //-----------------------------------------------------------------------------
  Scene_Teleport.prototype.create = function() {
    Scene_ItemBase.prototype.create.call(this);
    this.createTeleportWindow();
    this._teleportWindow.activate();
  };

  //-----------------------------------------------------------------------------
  // シーンの開始
  //-----------------------------------------------------------------------------
  Scene_Teleport.prototype.start = function() {
    Scene_ItemBase.prototype.start.call(this);
  };

  //-----------------------------------------------------------------------------
  // テレポートウィンドウの作成
  //-----------------------------------------------------------------------------
  Scene_Teleport.prototype.createTeleportWindow = function() {
    const rect = this.teleportWindowRect();
    this._teleportWindow = new Window_TeleportList(rect);
    this._teleportWindow.setHandler("ok", this.onTeleportOk.bind(this));
    this._teleportWindow.setHandler("cancel", this.onTeleportCancel.bind(this));
    this.addWindow(this._teleportWindow);
  };

  //-----------------------------------------------------------------------------
  // テレポートウィンドウのサイズを設定
  //-----------------------------------------------------------------------------
  Scene_Teleport.prototype.teleportWindowRect = function() {
    const wx = 0;
    const wy = Math.min(this.mainAreaTop(), this.helpAreaTop());
    const ww = Graphics.boxWidth;
    const wh = this.mainAreaHeight() + this.helpAreaHeight();
    return new Rectangle(wx, wy, ww, wh);
  };

  //-----------------------------------------------------------------------------
  // アクター変更ボタン(次へ)の表示設定
  //-----------------------------------------------------------------------------
  Scene_Teleport.prototype.needsPageButtons = function() {
    return false;
  };

  //-----------------------------------------------------------------------------
  // アクター変更ボタン(前へ)の表示設定
  //-----------------------------------------------------------------------------
  Scene_Teleport.prototype.arePageButtonsEnabled = function() {
    return false;
  };

  //-----------------------------------------------------------------------------
  // テレポートスキルの使用
  //-----------------------------------------------------------------------------
  Scene_Teleport.prototype.onTeleportOk = function() {
    SoundManager.playOk();

    this.useItem();

    $teleport.setTeleportInfo(this.info());
    while (!SceneManager._nextScene || SceneManager._nextScene.constructor !== new Scene_Map().constructor) {
      this.popScene();
    }
    this.exec();
  };

  //-----------------------------------------------------------------------------
  // テレポートスキル・アイテムの使用
  //-----------------------------------------------------------------------------
  Scene_Teleport.prototype.useItem = function() {
    let item = null;

    if (this._teleportSkill) {
      item = this._teleportSkill;
    } else {
      item = this._teleportItem;
    }

    const action = new Game_Action(this.actor());
    action.setItemObject(item);
    this.actor().useItem(item);
  };

  //-----------------------------------------------------------------------------
  // テレポートの実行
  //-----------------------------------------------------------------------------
  Scene_Teleport.prototype.exec = function() {
    const sceneMap = SceneManager._nextScene;
    sceneMap.teleportAction();
  };

  //-----------------------------------------------------------------------------
  // テレポートスキル・アイテムの取り消し
  //-----------------------------------------------------------------------------
  Scene_Teleport.prototype.onTeleportCancel = function() {
    this.popScene();
    const sceneSkillItem = SceneManager._nextScene;
    if (this._teleportSkill) {
      sceneSkillItem.teleportCancel(this._teleportSkill);
    } else {
      sceneSkillItem.teleportCancel(this._teleportItem, this._category);
    }
  };

  //-----------------------------------------------------------------------------
  // テレポートアイテムの設定
  //-----------------------------------------------------------------------------
  Scene_Teleport.prototype.setTeleportItem = function(item, category) {
    this._teleportItem = item;
    this._category = category;
  };

  //-----------------------------------------------------------------------------
  // テレポートスキルの設定
  //-----------------------------------------------------------------------------
  Scene_Teleport.prototype.setTeleportSkill = function(skill) {
    this._teleportSkill = skill;
  };

  //-----------------------------------------------------------------------------
  // プラグインコマンドから設定したテレポート情報の設定
  //-----------------------------------------------------------------------------
  Scene_Teleport.prototype.setTeleportInfo = function(teleportInfo) {
    this._teleportInfo = teleportInfo;
  };

  //-----------------------------------------------------------------------------
  // プラグインコマンドから設定したテレポート情報の取得
  //-----------------------------------------------------------------------------
  Scene_Teleport.prototype.info = function() {
    return this._teleportWindow.item();
  };


  //-----------------------------------------------------------------------------
  // Scene_Map
  //-----------------------------------------------------------------------------

  //-----------------------------------------------------------------------------
  // テレポートスキルの動作
  //-----------------------------------------------------------------------------
  Scene_Map.prototype.teleportAction = function() {
    const interpreter = $gameMap._interpreter;
    interpreter.setup($teleport.createTeleportAction(), -1);
    interpreter.executeCommand();
  };


  //-----------------------------------------------------------------------------
  // Window_TeleportList
  //-----------------------------------------------------------------------------

  function Window_TeleportList() {
    this.initialize(...arguments);
  }

  Window_TeleportList.prototype = Object.create(Window_Selectable.prototype);
  Window_TeleportList.prototype.constructor = Window_TeleportList;

  Window_TeleportList.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this._data = [];
    this.refresh();
    this.selectLast();
  };

  //-----------------------------------------------------------------------------
  // テレポートウィンドウの最大表示列数
  //-----------------------------------------------------------------------------
  Window_TeleportList.prototype.maxCols = function() {
    return 2;
  };

  //-----------------------------------------------------------------------------
  // テレポートウィンドウの列幅の設定
  //-----------------------------------------------------------------------------
  Window_TeleportList.prototype.colSpacing = function() {
    return 16;
  };

  //-----------------------------------------------------------------------------
  // テレポートデータの最大数
  //-----------------------------------------------------------------------------
  Window_TeleportList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
  };

  //-----------------------------------------------------------------------------
  // テレポートデータの取得
  //-----------------------------------------------------------------------------
  Window_TeleportList.prototype.item = function() {
    return this.itemAt(this.index());
  };

  //-----------------------------------------------------------------------------
  // 選択されているテレポートデータの取得
  //-----------------------------------------------------------------------------
  Window_TeleportList.prototype.itemAt = function(index) {
    return this._data && index >= 0 ? this._data[index] : null;
  };

  //-----------------------------------------------------------------------------
  // 選択されているテレポートデータが使用できるかの判定
  //-----------------------------------------------------------------------------
  Window_TeleportList.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this._data[this.index()]);
  };

  Window_TeleportList.prototype.needsNumber = function() {
    return true;
  }

  //-----------------------------------------------------------------------------
  // テレポートデータの作成
  //-----------------------------------------------------------------------------
  Window_TeleportList.prototype.makeItemList = function() {
    this._data = $teleport._data;
  };

  //-----------------------------------------------------------------------------
  // テレポートデータが使用できるかの判定
  //-----------------------------------------------------------------------------
  Window_TeleportList.prototype.isEnabled = function(item) {
    return item ? true : false;
  };

  //-----------------------------------------------------------------------------
  // 最後に選択したカーソル位置
  //-----------------------------------------------------------------------------
  Window_TeleportList.prototype.selectLast = function() {
    this.forceSelect(0);
  };

  //-----------------------------------------------------------------------------
  // テレポートデータの描画
  //-----------------------------------------------------------------------------
  Window_TeleportList.prototype.drawItem = function(index) {
    const item = this.itemAt(index);
    if (item) {
        const numberWidth = this.numberWidth();
        const rect = this.itemLineRect(index);
        this.changePaintOpacity(true);
        this.drawItemName(item, rect.x, rect.y, rect.width - numberWidth);
        this.changePaintOpacity(1);
    }
  };

  //-----------------------------------------------------------------------------
  // テレポート先名の描画
  //-----------------------------------------------------------------------------
  Window_TeleportList.prototype.drawItemName = function(item, x, y, width) {
    if (item) {
        const iconY = y + (this.lineHeight() - ImageManager.iconHeight) / 2;
        const textMargin = ImageManager.iconWidth + 4;
        const itemWidth = Math.max(0, width - textMargin);
        this.resetTextColor();
        this.drawText(item.registMapName, x, y, itemWidth);
    }
  };

  Window_TeleportList.prototype.numberWidth = function() {
    return this.textWidth("000");
  };

  Window_TeleportList.prototype.refresh = function() {
    this.makeItemList();
    Window_Selectable.prototype.refresh.call(this);
  };


  //-----------------------------------------------------------------------------
  // Window_ItemList
  //-----------------------------------------------------------------------------

  //-----------------------------------------------------------------------------
  // Window_ItemList.prototype.isEnabled関数の再定義
  //-----------------------------------------------------------------------------
  const _Window_ItemList_IsEnabled = Window_ItemList.prototype.isEnabled;
  Window_ItemList.prototype.isEnabled = function(item) {
    return $teleport._permission && _Window_ItemList_IsEnabled.apply(this, arguments);
  };

  //-----------------------------------------------------------------------------
  // Window_ItemList.prototype.isEnabled関数の再定義
  //-----------------------------------------------------------------------------
  const _Window_SkillList_IsEnabled = Window_SkillList.prototype.isEnabled;
  Window_SkillList.prototype.isEnabled = function(item) {
    return $teleport._permission && _Window_SkillList_IsEnabled.apply(this, arguments);
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
    $teleport = new Teleport();
  };

  //-----------------------------------------------------------------------------
  // DataManager.makeSaveContents関数の再定義
  //-----------------------------------------------------------------------------
  const _DataManager_Make_Save_Contents = DataManager.makeSaveContents;
  DataManager.makeSaveContents = function() {

    // 再定義前のDataManager.makeSaveContents関数を呼び出し
    const contents = _DataManager_Make_Save_Contents.apply(this, arguments);
    contents.teleport = $teleport;
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
    $teleport = contents.teleport;
  };

})();
