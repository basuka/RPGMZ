//=============================================================================
// RPG Maker MZ - FaceSelectPicture
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc 顔画像をピクチャとして表示・選択を出来るようにします。
 * @author Basu
 * @url https://raw.githubusercontent.com/basuka/RPGMZ/main/FacePicture/FacePicture.js
 *
 * @help FaceSelectPicture.js
 *
 * このプラグインは、顔画像をピクチャとして表示・選択するコマンドを提供します。
 *
 *
 * ■各設定項目
 *
 *  【顔画像ピクチャの設定】
 *   ピクチャとして表示する顔画像情報を設定します。
 *
 *     ●グループ画像
 *     グループにする顔画像情報を設定します。
 *     ここで設定した顔画像を選択できるようになります。
 *     また、顔画像の設定内容は「ピクチャの表示イベント」と同じになります。
 *     ※一部「ピクチャの表示イベント」と異なる項目が存在します
 *
 *       ・選択順
 *         顔画像を選択する順番を設定します。
 *         方向キーで顔画像を選択する際、ここで設定した順にカーソルが選択されます。
 *         画像をクリックした場合はクリックした画像が直接選択されます。
 *
 *       ・番号
 *         ピクチャ番号を設定します。
 *         ※「ピクチャの表示イベント」と同じ
 *
 *       ・画像
 *         ピクチャとして表示する顔画像ファイルを設定します。
 *
 *       ・顔画像番号
 *         何番目の顔画像を表示するかを設定します。
 *         番号は0番(左上)から数えて設定してください。
 *
 *       ・原点
 *         ピクチャの原点を設定します。
 *         ※「ピクチャの表示イベント」と同じ
 *
 *       ・表示位置のタイプ
 *         表示位置のタイプを設定します。
 *         ※「ピクチャの表示イベント」と同じ
 *
 *       ・表示位置直接指定(X)
 *         顔画像を表示するX座標を設定します。
 *         この項目は【表示位置のタイプ】で「直接指定」を設定した場合有効となります。
 *         ※「ピクチャの表示イベント」と同じ
 *
 *       ・表示位置直接指定(Y)
 *         顔画像を表示するY座標を設定します。
 *         この項目は【表示位置のタイプ】で「直接指定」を設定した場合有効となります。
 *         ※「ピクチャの表示イベント」と同じ
 *
 *       ・表示位置変数指定(X)
 *         顔画像を表示するX座標を変数で設定します。
 *         この項目は【表示位置のタイプ】で「変数で指定」を設定した場合有効となります。
 *         ※「ピクチャの表示イベント」と同じ
 *
 *       ・表示位置変数指定(Y)
 *         顔画像を表示するY座標を変数で設定します。
 *         この項目は【表示位置のタイプ】で「変数で指定」を設定した場合有効となります。
 *         ※「ピクチャの表示イベント」と同じ
 *
 *       ・幅の拡大率(%)
 *         幅の拡大率を設定します。
 *         ※「ピクチャの表示イベント」と同じ
 *
 *       ・高さの拡大率(%)
 *         高さの拡大率を設定します。
 *         ※「ピクチャの表示イベント」と同じ
 *
 *       ・不透明度
 *         不透明度を設定します。
 *         ※「ピクチャの表示イベント」と同じ
 *
 *       ・合成方法
 *         合成方法を設定します。
 *         ※「ピクチャの表示イベント」と同じ
 *
 *       ・選択イベントページ
 *         画像選択時に実行するイベントページを設定します。
 *         カーソルが画像を選択すると設定しているイベントページのイベントを実行します。
 *         不要の場合は省略してください。
 *         ※プラグインを設定している同じイベントのページを実行します。
 *
 *       ・決定イベントページ
 *         画像決定時に実行するイベントページを設定します。
 *         選択している画像を決定すると設定しているイベントページのイベントを実行します。
 *         不要の場合は省略してください。
 *         ※プラグインを設定している同じイベントのページを実行します。
 *
 *    ・表示のみ
 *      画像の表示のみかを設定します。
 *      「表示のみ」の場合、「ピクチャの表示イベント」と同じ動作になります。
 *      「選択可能」の場合、画像の選択と設定しているイベントの実行が出来るようになります。
 *
 *    ・キャンセル
 *      キャンセルキーで中断できるかを設定します。
 *      「可能」の場合、画像の選択中にキャンセルキーで中断することが出来るようになります。
 *
 *    ・カーソル音
 *      顔画像選択時にカーソル音を再生するかを設定します。
 *
 *  【顔画像ピクチャの消去】
 *   顔画像ピクチャを消去します。
 *   消去される画像はこのプラグインで表示した全画像が対象となります。
 *   「ピクチャの消去イベント」でも消去は出来ますが、画像が「選択可能」の場合は
 *   必ずこのプラグインコマンドでピクチャの消去を行ってください。
 *   ※このプラグインコマンドでピクチャの消去を行わない場合、動作不能となります。
 *
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加してください。
 *
 * 2.プラグインコマンド「顔画像ピクチャの設定」から表示する顔画像などの情報を設定してください。
 * ※「ピクチャの表示イベント」を設定しなくてもこのプラグインだけで画像が表示されます。
 *
 * 3.必要に応じてプラグインコマンド「顔画像ピクチャの消去」から画像を消去してください。
 *
 *=====================================================================================================================================================
 *
 * @command setPicture
 * @text 顔画像ピクチャの設定
 * @desc ピクチャとして表示する顔画像情報を設定します。
 *
 * @arg pictureGroups
 * @type struct<pictureGroup>[]
 * @text グループ画像
 * @desc グループにする顔画像情報を設定
 *
 * @arg dispOnly
 * @type boolean
 * @on 表示のみ
 * @off 選択可能
 * @default true
 * @text 表示のみ
 * @desc 画像の表示のみかを設定
 *
 * @arg cancel
 * @type boolean
 * @on 可能
 * @off 不可
 * @default true
 * @text キャンセル
 * @desc キャンセルキーで中断できるかを設定
 *
 * @arg cursorSe
 * @type boolean
 * @on 再生する
 * @off 再生しない
 * @default true
 * @text カーソル音
 * @desc 顔画像選択時にカーソル音を再生するかを設定
 *
 * @command endPicture
 * @text 顔画像ピクチャの消去
 * @desc 顔画像ピクチャを消去します。
 */

/*~struct~pictureGroup:ja
 *
 * @param index
 * @type number
 * @min 1
 * @default 1
 * @text 選択順
 * @desc 顔画像を選択する順番を設定
 *
 * @arg picture
 * @text ピクチャ
 *
 * @param pictureNo
 * @type number
 * @min 1
 * @max 100
 * @text 番号
 * @parent picture
 * @desc ピクチャ番号を設定
 *
 * @param fileName
 * @type file
 * @dir img/faces/
 * @text 画像
 * @parent picture
 * @desc 表示する顔画像ファイルを設定
 *
 * @param faceIndex
 * @type number
 * @text 顔画像番号
 * @parent picture
 * @desc 何番目の顔画像を表示するかを設定
 *
 * @param position
 * @text 位置
 *
 * @param origin
 * @type select
 * @option 左上
 * @value 0
 * @option 中央
 * @value 1
 * @default 0
 * @text 原点
 * @parent position
 * @desc ピクチャの原点を設定
 *
 * @param dispPositionType
 * @type select
 * @option 直接指定
 * @value 0
 * @option 変数で指定
 * @value 1
 * @default 0
 * @text 表示位置のタイプ
 * @parent position
 * @desc 表示位置のタイプを設定
 *
 * @param positionX
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * @text 表示位置直接指定(X)
 * @parent position
 * @desc 顔画像を表示するX座標を設定
 *
 * @param positionY
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * @text 表示位置直接指定(Y)
 * @parent position
 * @desc 顔画像を表示するY座標を設定
 *
 * @param variablePosX
 * @type variable
 * @text 表示位置変数指定(X)
 * @parent position
 * @desc 顔画像を表示するX座標を変数で設定
 *
 * @param variablePosY
 * @type variable
 * @text 表示位置変数指定(Y)
 * @parent position
 * @desc 顔画像を表示するY座標を変数で設定
 *
 * @param expansionRate
 * @text 拡大率
 *
 * @param widthRate
 * @type number
 * @min -2000
 * @max 2000
 * @default 100
 * @text 幅の拡大率(%)
 * @parent expansionRate
 * @desc 幅の拡大率を設定
 *
 * @param heightRate
 * @type number
 * @min -2000
 * @max 2000
 * @default 100
 * @text 高さの拡大率(%)
 * @parent expansionRate
 * @desc 高さの拡大率を設定
 *
 * @param synthetic
 * @text 合成
 *
 * @param opacity
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * @text 不透明度
 * @parent synthetic
 * @desc 不透明度を設定
 *
 * @param syntheticMethod
 * @type select
 * @option 通常
 * @value 0
 * @option 加算
 * @value 1
 * @option 乗算
 * @value 2
 * @option スクリーン
 * @value 3
 * @default 0
 * @text 合成方法
 * @parent position
 * @desc 合成方法を設定
 *
 * @param event
 * @text イベント
 *
 * @param selectEventPage
 * @type number
 * @text 選択イベントページ
 * @parent event
 * @desc 画像選択時に実行するイベントページを設定
 *
 * @param selectOkEventPage
 * @type number
 * @text 決定イベントページ
 * @parent event
 * @desc 画像決定時に実行するイベントページを設定
 *
 */
(() => {
  const pluginName = "FaceSelectPicture";
  let selectIndex = 0;
  let indexs = [];
  let facePictures = {};
  let dispOnly = true;
  let cancel = true;
  let endPicture = false;
  let cursorSe = true;
  let active = true;
  let interpreter = null;
  let facePictureEvent = null;

  PluginManager.registerCommand(pluginName, "setPicture", function(facePictureParams) {

    PluginManager_Parser.prototype.parse(facePictureParams);
    interpreter = this;

    const facePicture = new FacePicture();
    const pictureGroup = facePictureParams.pictureGroups[0];

    selectIndex = pictureGroup.index;
    dispOnly = facePictureParams.dispOnly;
    cancel = facePictureParams.cancel;
    cursorSe = facePictureParams.cursorSe;
    facePicture.view(facePictureParams);

  });

  PluginManager.registerCommand(pluginName, "endPicture", args => {
    if (dispOnly) {
      for (const pictureNo in facePictures) {
        $gameScreen.erasePicture(pictureNo);
      }
    } else {
      endPicture = true;
    }
  });


  //-----------------------------------------------------------------------------
  // PluginManager_Parser
  //-----------------------------------------------------------------------------
  function PluginManager_Parser() {
    this.initialize(...arguments);
  };

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
  };

  PluginManager_Parser.prototype.convertNumber = function (param) {
      return Number(param) ? Number(param) : param;
  };

  PluginManager_Parser.prototype.isObject = function (param, type) {
      return Object.prototype.toString.call(param).slice(8, -1).toLowerCase() === type;
  };


  //-----------------------------------------------------------------------------
  // FacePicture
  //-----------------------------------------------------------------------------

  function FacePicture() {
    this.initialize(...arguments);
  };

  FacePicture.prototype.initialize = function () {
    selectIndex = 0;
    indexs = [];
    facePictures = {};
    dispOnly = true;
    cancel = true;
    cursorSe = true;
    endPicture = false;
    isEventRun = false;
    active = true;
    facePictureEvent = new Game_FacePictureEvent();
  };

  FacePicture.prototype.view = function(facePictureParams) {

    for (const pictureGroup of facePictureParams.pictureGroups) {
      const groupParams = this.makeParams(pictureGroup);

      facePictures[groupParams[0]] = {
        index:pictureGroup.index, faceFileName:pictureGroup.fileName, faceIndex:pictureGroup.faceIndex,
        selectEventPage:pictureGroup.selectEventPage, selectOkEventPage:pictureGroup.selectOkEventPage
      };
      indexs.push(pictureGroup.index);

      $gameScreen.showPicture(
        groupParams[0], groupParams[1], groupParams[2], groupParams[3], groupParams[4],
        groupParams[5], groupParams[6], groupParams[7], groupParams[8]
      );
    }

    if (!dispOnly) {
      interpreter.setWaitMode("selectFace");
    }
  };

  FacePicture.prototype.makeParams = function(facePictureParams) {
    const faceParams = [];
    let posX = 0;
    let posY = 0;

    if (facePictureParams.dispPositionType === 0) {
      posX = facePictureParams.positionX;
      posY = facePictureParams.positionY;
    } else {
      posX = $gameVariables.value(facePictureParams.variablePosX);
      posY = $gameVariables.value(facePictureParams.variablePosY);
    }

    faceParams.push(facePictureParams.pictureNo);
    faceParams.push("");
    faceParams.push(facePictureParams.origin);
    faceParams.push(posX);
    faceParams.push(posY);
    faceParams.push(facePictureParams.widthRate);
    faceParams.push(facePictureParams.heightRate);
    faceParams.push(facePictureParams.opacity);
    faceParams.push(facePictureParams.syntheticMethod);

    return faceParams;
  };


  //-----------------------------------------------------------------------------
  // Game_FacePictureEvent
  //-----------------------------------------------------------------------------

  function Game_FacePictureEvent() {
    this.initialize(...arguments);
  };

  Game_FacePictureEvent.prototype.initialize = function() {
    this._interpreter = new Game_Interpreter();
    this._page = 0;
  };

  Game_FacePictureEvent.prototype.setupEvent = function(page, roop) {

    if (this._page !== page) {
      let eventPage = null;
      const eventId = interpreter.eventId();

      if (page) {
        const event = $gameMap.event(eventId).event();
        eventPage = event.pages[page - 1];
      }

      if (eventPage) {
        this._interpreter.setup(eventPage.list, eventId);
        if (!roop) {
          this._page = page;
        }
      } else {
        this._page = 0;
      }
    }
  };

  Game_FacePictureEvent.prototype.update = function() {
     this._interpreter.update();
  };

  Game_FacePictureEvent.prototype.clear = function() {
    return this._interpreter.clear();
  };

  Game_FacePictureEvent.prototype.isRunning = function() {
    return this._interpreter.isRunning();
  };


  //-----------------------------------------------------------------------------
  // Sprite_FacePicture
  //-----------------------------------------------------------------------------

  function Sprite_FacePicture() {
    this.initialize(...arguments);
  };

  Sprite_FacePicture.prototype = Object.create(Sprite_Picture.prototype);
  Sprite_FacePicture.prototype.constructor = Sprite_FacePicture;

  Sprite_FacePicture.prototype.clear = function () {
    selectIndex = 0;
    indexs = [];
    facePictures = {};
    facePictureEvent.clear();
  };

  Sprite_FacePicture.prototype.destroy = function() {
    this.destroyFacePictureBitmap(this.bitmap);
    Sprite_Clickable.prototype.initialize.call(this);
  };

  Sprite_FacePicture.prototype.updateBitmap = function() {

    if (this.visible) {
      if (endPicture) {
        this.end();
      }
    }

    Sprite_Picture.prototype.updateBitmap.call(this);
    if (this.visible && !this.bitmap) {
      this.destroyFacePictureBitmap(this.bitmap);
      this.bitmap = this.createFacePictureBitmap();
    }

    if (!dispOnly) {
      this.updateSelectFace();
      this.updateAction();
    }
  };

  Sprite_FacePicture.prototype.updateAction = function() {
    if (this._bitmap && this._bitmap._selectFace) {
      this.checkActive();
    }

    if (this.visible && active) {
      if (!facePictureEvent.isRunning()) {
        this.selectCursor();
        this.updateSelectFace();
        this.onKey();
      }
      if (this._bitmap._selectFace) {
        facePictureEvent.update();
      }
    }
  }

  Sprite_FacePicture.prototype.checkActive = function() {
    if (active) {
      if (SceneManager.isSceneChanging()) {
        active = false;
      }
    } else {
      if (SceneManager.isSceneActive(Scene_Map)) {
        active = true;
      }
    }
  }

  Sprite_FacePicture.prototype.updateSelectFace = function() {
    if (this._bitmap) {
      if (this._bitmap._selectIndex !== selectIndex && this._bitmap._selectFace) {
        const nonSelectColor = [-68,-68,-68,0]
        $gameScreen.tintPicture(this._pictureId, nonSelectColor, 0);
        this._bitmap._selectFace = false;
      } else if (this._bitmap._selectIndex === selectIndex && !this._bitmap._selectFace) {
        const nonSelectColor = [0,0,0,0]
        $gameScreen.tintPicture(this._pictureId, nonSelectColor, 0);
        this._bitmap._selectFace = true;
      }

      if (this._bitmap._selectFace) {
        facePictureEvent.setupEvent(this._bitmap._selectEventPage, false);
      }
    }
  };

  Sprite_FacePicture.prototype.selectCursor = function() {

    if (this._bitmap._selectFace) {
      if (Input.isRepeated("down")) {
        this.nextSelect();
      }
      if (Input.isRepeated("up")) {
        this.previSelect();
      }
      if (Input.isRepeated("right")) {
        this.nextSelect();
      }
      if (Input.isRepeated("left")) {
        this.previSelect();
      }
    }
  };

  Sprite_FacePicture.prototype.nextSelect = function() {
    let setSelectIndex = selectIndex;
    indexs.sort((a, b) => a - b);
    for (const index of indexs) {
      if (setSelectIndex < index) {
        setSelectIndex = index;
        break;
      }
    }

    if (setSelectIndex === selectIndex) {
      setSelectIndex = indexs[0];
    }

    selectIndex = setSelectIndex;

    if (cursorSe) {
      SoundManager.playCursor();
    }
  };

  Sprite_FacePicture.prototype.previSelect = function() {
    let setSelectIndex = selectIndex;
    indexs.sort((a, b) => b - a);
    for (const index of indexs) {
      if (setSelectIndex > index) {
        setSelectIndex = index;
        break;
      }
    }

    if (setSelectIndex === selectIndex) {
      setSelectIndex = indexs[0];
    }

    selectIndex = setSelectIndex;

    if (cursorSe) {
      SoundManager.playCursor();
    }
  };

  Sprite_FacePicture.prototype.onClick = function() {
    if (!facePictureEvent.isRunning()) {
      if (this._bitmap._selectIndex !== selectIndex) {
        selectIndex = this._bitmap._selectIndex;
        if (cursorSe) {
          SoundManager.playCursor();
        }
      } else {
        SoundManager.playOk();
        facePictureEvent.setupEvent(this._bitmap._selectOkEventPage, true);
      }
    }
  };

  Sprite_FacePicture.prototype.onKey = function() {
    if (this._bitmap._selectFace) {
      if (Input.isRepeated("ok")) {
        SoundManager.playOk();
        facePictureEvent.setupEvent(this._bitmap._selectOkEventPage, true);
      }
      if (Input.isRepeated("cancel")) {
        if (cancel) {
          SoundManager.playCancel();
          endPicture = true;
          interpreter.wait(Input.keyRepeatWait);
        }
      }
    }
  };

  Sprite_FacePicture.prototype.createFacePictureBitmap = function() {

    const faceFile = facePictures[this._pictureId];
    const faceFileName = faceFile.faceFileName;
    const faceIndex = faceFile.faceIndex;
    const selectIndex = faceFile.index;
    const selectEventPage = faceFile.selectEventPage;
    const selectOkEventPage = faceFile.selectOkEventPage;

    const faceBitmap = ImageManager.loadFace(faceFileName);
    const tempWindow = new Window_Base(new Rectangle());
    tempWindow.padding = 0;
    tempWindow.move(0, 0, ImageManager.faceWidth, ImageManager.faceHeight);
    tempWindow.createContents();
    const bitmap = tempWindow.contents;
    bitmap._loadingState = "loading";
    bitmap._selectIndex = selectIndex;
    bitmap._selectEventPage = selectEventPage;
    bitmap._selectOkEventPage = selectOkEventPage;
    bitmap._selectFace = true;
    faceBitmap.addLoadListener( () => tempWindow.drawFace(faceFileName, faceIndex, 0, 0, ImageManager.faceWidth, ImageManager.faceHeight),
                                          bitmap._loadingState = "loaded",
                                          bitmap._callLoadListeners())
    return bitmap;
  };

  Sprite_FacePicture.prototype.destroyFacePictureBitmap = function(bitmap) {
    if (bitmap && bitmap.isFacePicture) {
      bitmap.destroy();
    }
  };

  Sprite_FacePicture.prototype.end = function() {
    if (this._bitmap._selectFace) {
      this.clear();
      interpreter.setWaitMode("");
    }
    $gameScreen.erasePicture(this._pictureId);
  };


  const _Spriteset_Base_CreatePictures = Spriteset_Base.prototype.createPictures;
  Spriteset_Base.prototype.createPictures = function() {
    _Spriteset_Base_CreatePictures.apply(this, arguments);
    for (let i = 1; i <= $gameScreen.maxPictures(); i++) {
      this._pictureContainer.addChild(new Sprite_FacePicture(i));
    }
  };


  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //-----------------------------------------------------------------------------

  const _Game_Interpreter_UpdateWaitMode = Game_Interpreter.prototype.updateWaitMode;
  Game_Interpreter.prototype.updateWaitMode = function() {
    let waiting = false;
    if (this._waitMode === "selectFace") {
      waiting = !dispOnly;
    } else {
      waiting = _Game_Interpreter_UpdateWaitMode.apply(this, arguments);
    }
    return waiting;
  };


  //-----------------------------------------------------------------------------
  // SceneManager
  //-----------------------------------------------------------------------------

  SceneManager.isSceneActive = function(sceneClass) {
    return this._scene && this._scene.constructor === sceneClass && this._scene._active;
  };

})();
