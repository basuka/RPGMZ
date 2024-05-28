//=============================================================================
// RPG Maker MZ - Password
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc パスワード機能を実装します。
 * @author Basu
 * @url https://raw.githubusercontent.com/basuka/RPGMZ/main/Password/Password.js
 *
 *
 * @help パスワード機能の拡張を行います。
 *
 * 【パラメータ】
 *
 * ■ランダムパスワード
 * ランダムパスワード情報(数値)を設定します。
 *
 * 　・桁数
 * 　　ランダムに生成するパスワード(数値)の桁数を設定します。
 *
 * 　・パスワード保存変数
 * 　　生成したパスワード(数値)を保存する変数を設定します。
 *
 * ■パスワード判定
 * 入力したパスワードの判定結果を保存する変数を設定します。
 *
 *
 *
 * 【コマンド】
 *
 *  ■「パスワード入力」コマンド
 * 　パスワード入力を開始します。
 *
 * 　【パラメータ】
 *
 * 　●入力数
 * 　パスワードの入力数を設定します。
 *
 * 　　パスワードの文字数：入力数をパスワードの文字数に合わせる
 * 　　最大入力数：入力数を最大入力数に合わせる
 *
 * 　●タイプ
 * 　パスワードのタイプを設定します。
 *
 * 　　数値入力：パスワードを数値で設定します。
 * 　　数値入力(ランダム)：パスワードをランダム生成した数値で設定します。
 * 　　文字入力：パスワードを文字で設定します。
 *
 * 　●数値パスワード
 * 　パスワードを数値(最大8桁)で設定します。
 * 　パスワードのタイプを「数値入力」にした場合に設定する項目
 *
 * 　●ランダムパスワード
 * 　使用するランダムパスワードの変数を設定します。
 * 　パスワードのタイプを「数値入力(ランダム)」にした場合に設定する項目
 *
 * 　●文字パスワード
 * 　パスワードを文字(最大16文字)で設定します。
 * 　パスワードのタイプを「文字入力」にした場合に設定する項目
 *
 *
 *  ■「ランダムパスワード確認」コマンド
 * ランダムに生成されたパスワードの取得を行います。
 *
 * 　【パラメータ】
 *
 * 　●ランダムパスワード
 * 　取得(確認)するランダムパスワードの変数を設定します。
 *
 * 　●確認パスワード
 * 　確認用パスワード情報を設定します
 *
 * 　　・確認位置
 * 　　　ランダムパスワードを取得する位置(桁)を設定します。
 * 　　　全桁取得する場合は直接ランダムパスワードが保存されている変数を使用してください。
 *
 * 　　・確認パスワード保存変数
 * 　　　取得したランダムパスワードを保存する変数を設定します。
 *
 *=====================================================================================================================================================
 * @param randomPasswords
 * @text ランダムパスワード
 * @type struct<randomPassword>[]
 * @desc ランダムパスワードを設定
 *
 * @param answerId
 * @text パスワード判定
 * @type switch
 * @desc パスワードの判定を保存するスイッチを設定
 *
 * @command start
 * @text パスワード入力
 * @desc パスワード入力を開始します
 *
 * @arg inputLenType
 * @text 入力数
 * @type select
 * @option パスワードの文字数
 * @value 0
 * @option 最大入力数
 * @value 1
 * @default 0
 * @desc パスワードの入力数を最大数とパスワードの文字数のどちらに合わせるかを設定
 *
 * @arg typeId
 * @text タイプ
 * @type select
 * @option 数値入力
 * @value 0
 * @option 数値入力(ランダム)
 * @value 1
 * @option 文字入力
 * @value 2
 * @default 0
 * @desc パスワードのタイプを設定
 *
 * @arg numberPass
 * @text 数値パスワード
 * @type number
 * @min 1
 * @max 99999999
 * @desc 数値パスワードを設定
 *       ※数値入力選択時
 *
 * @arg randomPassId
 * @text ランダムパスワード
 * @type variable
 * @desc 使用するランダムパスワードを設定
 *       ※数値入力(ランダム)選択時
 *
 * @arg strPassword
 * @text 文字パスワード
 * @type string
 * @desc 文字パスワードを設定(最大16文字)
 *       ※文字入力選択時
 *
 * @command check
 * @text ランダムパスワード確認
 * @desc ランダムパスワードの確認
 *
 * @arg randomPassId
 * @text ランダムパスワード
 * @type variable
 * @desc ランダムパスワードが保存されている変数を設定
 *
 * @arg checkPasswords
 * @text 確認パスワード
 * @type struct<checkRandomPass>[]
 * @desc 確認するランダムパスワードを設定
 *
 */

/*~struct~randomPassword:ja
 * @param length
 * @text 桁数
 * @type number
 * @min 1
 * @max 8
 * @default 8
 * @desc パスワードの桁数を設定
 *
 * @param variableId
 * @text パスワード保存変数
 * @type variable
 * @desc ランダムパスワードを保存する変数の設定
 *
 */

/*~struct~checkRandomPass:ja
 * @param checkIndex
 * @text 確認位置
 * @type number
 * @min 1
 * @max 8
 * @default 1
 * @desc 何桁目のパスワードを確認するかを設定
 *       空白の場合1桁目を取得します
 *
 * @param checkPassId
 * @text 確認パスワード保存変数
 * @type variable
 * @desc 確認用ランダムパスワードを保存する変数を設定
 *
 */

(() => {
    "use strict";

    let $password = null;

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
    // Password
    //-----------------------------------------------------------------------------
    function Password() {
        this.initialize(...arguments);
    }

    Password.TYPE_NUMBER = 0;
    Password.TYPE_RANDOM_NUMBER = 1;
    Password.TYPE_STR = 2;
    Password.INPUT_PASSWORD_LEN = 0;
    Password.INPUT_MAX_LEN = 1;

    Password.prototype.initialize = function () {
        this._answerId = params.answerId;
        this._inputLenType = 0;
        this._typeId = 0;
        this._numberPass = 0;
        this._randomPassId = 0;
        this._strPassword = null;
    };

    Password.prototype.setRandomPass = function () {
        const randomPasswords = params.randomPasswords;
        for (const randomPassword of randomPasswords) {
            const length = randomPassword.length ? randomPassword.length : 8;
            const variableId = randomPassword.variableId;

            let max = 1;
            while (length >= String(max).length) {
                max *= 10;
            }
            const password = Math.floor(Math.random() * max);
            $gameVariables.setValue(variableId, password);
        }
    };

    Password.prototype.inputPassword = function () {
        if (this._typeId === Password.TYPE_STR) {
            const length = this.passLength();
            SceneManager.push(Scene_StrPass);
            SceneManager.prepareNextScene(length);
        } else {
            SceneManager.push(Scene_NumberPass);
        }
    };

    Password.prototype.checkAnswer = function (value) {
        const password = this.getPassword();
        if (password === value) {
            $gameSwitches.setValue(this._answerId, true);
        } else {
            $gameSwitches.setValue(this._answerId, false);
        }
    };

    Password.prototype.replaceStrPass = function (value) {
        return value.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
            return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
        });
    };

    Password.prototype.checkRandomPass = function (params) {
        const randomPassId = params[0];
        const checkIndex = params[1];
        const checkPassId = params[2];

        let randomPass = $gameVariables.value(randomPassId);

        if (!randomPass) {
            randomPass = 0;
        }

        const s_Index = checkIndex ? checkIndex - 1 : 1;
        const e_Index = s_Index + 1;

        const checkPassword = parseInt(String(randomPass).substring(s_Index, e_Index));
        $gameVariables.setValue(checkPassId, checkPassword);
    };

    Password.prototype.setInputLenType = function (inputLenType) {
        this._inputLenType = inputLenType;
    };

    Password.prototype.setTypeId = function (typeId) {
        this._typeId = typeId;
    };

    Password.prototype.setNumberPass = function (numberPass) {
        this._numberPass = numberPass;
    };

    Password.prototype.setRandomPassId = function (randomPassId) {
        this._randomPassId = randomPassId;
    };

    Password.prototype.setStrPassword = function (strPassword) {
        this._strPassword = strPassword;
    };

    Password.prototype.getPassword = function () {
        switch (this._typeId) {
            case Password.TYPE_NUMBER:
                return this._numberPass;
            case Password.TYPE_RANDOM_NUMBER:
                return $gameVariables.value(this._randomPassId);
            case Password.TYPE_STR:
                return this._strPassword;
            default:
                return "";
        }
    };

    Password.prototype.passLength = function () {
        if (this._inputLenType === Password.INPUT_MAX_LEN) {
            return this._typeId === Password.TYPE_STR ? this.maxStrLen() : this.maxNumberLen();
        } else {
            const password = this.getPassword();
            if (this._typeId === Password.TYPE_STR) {
                return password.length > this.maxStrLen() ? this.maxStrLen() : password.length;
            } else {
                return String(password).length;
            }
        }
    };

    Password.prototype.maxNumberLen = function () {
        return 8;
    };

    Password.prototype.maxStrLen = function () {
        return 16;
    };

    //-----------------------------------------------------------------------------
    // DataManager
    //-----------------------------------------------------------------------------
    const _DataManager_CreateGameObjects = DataManager.createGameObjects;
    DataManager.createGameObjects = function () {
        _DataManager_CreateGameObjects.apply(this, arguments);
        $password = new Password();
    };

    //-----------------------------------------------------------------------------
    // Scene_Title
    //-----------------------------------------------------------------------------
    const _Scene_Title_CommandNewGame = Scene_Title.prototype.commandNewGame;
    Scene_Title.prototype.commandNewGame = function () {
        _Scene_Title_CommandNewGame.apply(this, arguments);
        $password.setRandomPass();
    };

    //-----------------------------------------------------------------------------
    // Scene_NumberPass
    //-----------------------------------------------------------------------------
    function Scene_NumberPass() {
        this.initialize(...arguments);
    }

    Scene_NumberPass.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_NumberPass.prototype.constructor = Scene_NumberPass;

    Scene_NumberPass.prototype.initialize = function () {
        Scene_MenuBase.prototype.initialize.call(this);
        this._numbaerPassWindow = null;
        this._strPassWindow = null;
    };

    Scene_NumberPass.prototype.create = function () {
        Scene_MenuBase.prototype.create.call(this);
        this.createNumberPassWindow();
    };

    Scene_NumberPass.prototype.createNumberPassWindow = function () {
        const rect = this.messageWindowRect();
        this._numbaerPassWindow = new Window_NumberPassInput();
        this._numbaerPassWindow.setHandler("ok", this.popScene.bind(this));
        this._numbaerPassWindow.setMessageWindow(new Window_Message(rect));
        this.addWindow(this._numbaerPassWindow);
    };

    Scene_NumberPass.prototype.messageWindowRect = function () {
        const ww = Graphics.boxWidth;
        const wh = this.calcWindowHeight(4, false) + 8;
        const wx = (Graphics.boxWidth - ww) / 2;
        const wy = 0;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_NumberPass.prototype.start = function () {
        Scene_MenuBase.prototype.start.call(this);
        this._numbaerPassWindow.start();
    };

    //-----------------------------------------------------------------------------
    // Window_NumberPassInput
    //-----------------------------------------------------------------------------
    function Window_NumberPassInput() {
        this.initialize(...arguments);
    }

    Window_NumberPassInput.prototype = Object.create(Window_NumberInput.prototype);
    Window_NumberPassInput.prototype.constructor = Window_NumberPassInput;

    Window_NumberPassInput.prototype.start = function () {
        this._maxDigits = $password.passLength();
        this.updatePlacement();
        this.placeButtons();
        this.createContents();
        this.refresh();
        this.open();
        this.activate();
        this.select(0);
    };

    Window_NumberPassInput.prototype.processOk = function () {
        this.playOkSound();
        this._messageWindow.close();
        $gameMessage.clear();
        this.updateInputData();
        this.deactivate();
        this.close();
        this.callOkHandler();

        $password.checkAnswer(this._number);
    };

    //-----------------------------------------------------------------------------
    // Scene_StrPass
    //-----------------------------------------------------------------------------
    function Scene_StrPass() {
        this.initialize(...arguments);
    }

    Scene_StrPass.prototype = Object.create(Scene_Name.prototype);
    Scene_StrPass.prototype.constructor = Scene_StrPass;

    Scene_StrPass.prototype.initialize = function () {
        Scene_Name.prototype.initialize.call(this);
    };

    Scene_StrPass.prototype.prepare = function (maxLength) {
        this._maxLength = maxLength;
    };

    Scene_StrPass.prototype.create = function () {
        Scene_MenuBase.prototype.create.call(this);
        this.createEditWindow();
        this.createInputWindow();
    };

    Scene_Name.prototype.createEditWindow = function () {
        const rect = this.editWindowRect();
        this._editWindow = new Window_PassEdit(rect);
        this._editWindow.setup(this._maxLength);
        this.addWindow(this._editWindow);
    };

    Scene_Name.prototype.onInputOk = function () {
        const value = $password.replaceStrPass(this._editWindow.name());
        $password.checkAnswer(value);
        this.popScene();
    };

    //-----------------------------------------------------------------------------
    // Window_PassEdit
    //-----------------------------------------------------------------------------
    function Window_PassEdit() {
        this.initialize(...arguments);
    }

    Window_PassEdit.prototype = Object.create(Window_NameEdit.prototype);
    Window_PassEdit.prototype.constructor = Window_PassEdit;

    Window_PassEdit.prototype.initialize = function (rect) {
        Window_StatusBase.prototype.initialize.call(this, rect);
        this._maxLength = 0;
        this._name = "";
        this._index = 0;
        this._defaultName = "";
        this.deactivate();
    };

    Window_PassEdit.prototype.setup = function (maxLength) {
        this._maxLength = maxLength;
    };

    Window_PassEdit.prototype.faceWidth = function () {
        return 0;
    };

    Window_PassEdit.prototype.refresh = function () {
        this.contents.clear();
        for (let i = 0; i < this._maxLength; i++) {
            this.drawUnderline(i);
        }
        for (let j = 0; j < this._name.length; j++) {
            this.drawChar(j);
        }
        const rect = this.itemRect(this._index);
        this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
    };

    PluginManager.registerCommand(Plugin_Name, "start", (pluginParams) => {
        SceneManager.push(Scene_NumberPass);

        PluginParams.prototype.parse(pluginParams);
        $password.setInputLenType(pluginParams.inputLenType);
        $password.setTypeId(pluginParams.typeId);
        $password.setNumberPass(pluginParams.numberPass);
        $password.setRandomPassId(pluginParams.randomPassId);
        $password.setStrPassword(pluginParams.strPassword);

        $password.inputPassword();
    });

    PluginManager.registerCommand(Plugin_Name, "check", (pluginParams) => {
        PluginParams.prototype.parse(pluginParams);
        const randomPassId = pluginParams.randomPassId;
        const checkPasswords = pluginParams.checkPasswords;

        checkPasswords.forEach((checkPassword) => {
            const checkIndex = checkPassword.checkIndex;
            const checkPassId = checkPassword.checkPassId;

            const params = [randomPassId, checkIndex, checkPassId];

            $password.checkRandomPass(params);
        });
    });
})();
