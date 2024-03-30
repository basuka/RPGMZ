//=============================================================================
// RPG Maker MZ - SlotMachine
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc スロットマシーン機能を設定します。
 * @author Basu
 * @url https://raw.githubusercontent.com/basuka/RPGMZ/main/SlotMachine/SlotMachine.js
 *
 *
 * @help SlotMachine.js
 *
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
 *    ください。
 *
 * 2.「プラグインコマンド」イベントから「スロットマシーン開始」コマンド
 *   を設定してください。
 *
 * 3.必要に応じてパラメータ及びコマンドパラメータを設定してください。
 *
 *-----------------------------------------------------------------------------
 * README
 *-----------------------------------------------------------------------------
 * https://github.com/basuka/RPGMZ/blob/main/SlotMachine/README.md
 *
 *-----------------------------------------------------------------------------
 * 利用規約
 *-----------------------------------------------------------------------------
 * このプラグインはMITライセンスで配布しています
 *
 *=====================================================================================================================================================
 *
 * @param variableID
 * @text 保管ID
 * @type variable
 * @default 11
 * @desc 所持コインの数を保管する変数ID
 *
 * @param slotIcon1
 * @text スロットアイコン1
 * @type struct<slotIcon>
 * @desc スロットアイコン1
 * @default {"iconCharaFile":"Nature","iconCharaIndex":"4","fiveLineScale":"20","fourLineScale":"6","threeLineScale":"3"}
 *
 * @param slotIcon2
 * @text スロットアイコン2
 * @type struct<slotIcon>
 * @default {"iconCharaFile":"Evil","iconCharaIndex":"0","fiveLineScale":"100","fourLineScale":"20","threeLineScale":"5"}
 * @desc スロットアイコン2
 *
 * @param slotIcon3
 * @text スロットアイコン3
 * @type struct<slotIcon>
 * @default {"iconCharaFile":"People3","iconCharaIndex":"6","fiveLineScale":"200","fourLineScale":"50","threeLineScale":"8"}
 * @desc スロットアイコン3
 *
 * @param slotIcon4
 * @text スロットアイコン4
 * @type struct<slotIcon>
 * @default {"iconCharaFile":"People3","iconCharaIndex":"1","fiveLineScale":"1000","fourLineScale":"100","threeLineScale":"10"}
 * @desc スロットアイコン4
 *
 * @param slotIcon5
 * @text スロットアイコン5
 * @type struct<slotIcon>
 * @default {"iconCharaFile":"People3","iconCharaIndex":"0","fiveLineScale":"2000","fourLineScale":"200","threeLineScale":"20"}
 * @desc スロットアイコン5
 *
 * @param fiveLineSevenScale
 * @text セブン5ライン獲得倍率
 * @type number
 * @default 10000
 * @desc 7が5ライン揃ったときに獲得するコインの倍率
 *
 * @param fourLineSevenScale
 * @text セブン4ライン獲得倍率
 * @type number
 * @default 1000
 * @desc 7が4ライン揃ったときに獲得するコインの倍率
 *
 * @param threeLineSevenScale
 * @text セブン3ライン獲得倍率
 * @type number
 * @default 100
 * @desc 7が3ライン揃ったときに獲得するコインの倍率
 *
 * @param helpMsg
 * @text ヘルプメッセージ
 * @type string
 * @default カーソルキーの上：ベット\n決定キー：スタート/ストップ　　　　　　 キャンセルキー：終了
 * @desc ヘルプメッセージ
 *
 * @param coinNumUnit
 * @text コイン枚数の単位
 * @type string
 * @default 枚
 * @desc コイン枚数の単位を設定
 *
 * @param winMsg
 * @text 勝利メッセージ
 * @type string
 * @default おめでとうございます！\n%1%2のコインが当たりました！
 * @desc 勝利時のメッセージの設定
 *       "%1"は獲得したコイン数に置換されます。
 *
 * @param lostMsg
 * @text 敗北メッセージ
 * @type string
 * @default 残念でした。
 * @desc 負けた時のメッセージ
 *
 * @param notEnoughMsg
 * @text コイン不足メッセージ
 * @type string
 * @default コインが足りません。
 * @desc コインが足りない時のメッセージ
 *
 * @param judgeType
 * @text 判定タイプ
 * @type select
 * @option 完全一致
 * @value 0
 * @option 部分一致
 * @value 1
 * @default 0
 * @desc 完全一致：第一レーンから順に判定
 *       部分一致：部分一致を判定
 * 
 * @command open
 * @text スロットマシーン開始
 * @desc スロットマシーンを開きます。
 *
 * @arg reelsList
 * @text リールリスト
 * @type struct<reelList>[]
 * @default ["{\"reelList\":\"[\\\"1\\\",\\\"2\\\",\\\"3\\\",\\\"4\\\",\\\"5\\\",\\\"6\\\",\\\"1\\\",\\\"2\\\",\\\"3\\\",\\\"4\\\",\\\"5\\\",\\\"6\\\",\\\"1\\\",\\\"2\\\",\\\"3\\\",\\\"4\\\",\\\"5\\\",\\\"6\\\"]\"}","{\"reelList\":\"[\\\"6\\\",\\\"5\\\",\\\"4\\\",\\\"3\\\",\\\"2\\\",\\\"1\\\",\\\"6\\\",\\\"5\\\",\\\"4\\\",\\\"3\\\",\\\"2\\\",\\\"1\\\",\\\"6\\\",\\\"5\\\",\\\"4\\\",\\\"3\\\",\\\"2\\\",\\\"1\\\"]\"}","{\"reelList\":\"[\\\"1\\\",\\\"1\\\",\\\"2\\\",\\\"2\\\",\\\"3\\\",\\\"3\\\",\\\"4\\\",\\\"4\\\",\\\"5\\\",\\\"5\\\",\\\"6\\\",\\\"6\\\",\\\"1\\\",\\\"2\\\",\\\"3\\\",\\\"4\\\",\\\"5\\\",\\\"6\\\"]\"}","{\"reelList\":\"[\\\"1\\\",\\\"3\\\",\\\"5\\\",\\\"2\\\",\\\"4\\\",\\\"6\\\",\\\"1\\\",\\\"3\\\",\\\"5\\\",\\\"2\\\",\\\"4\\\",\\\"6\\\",\\\"1\\\",\\\"3\\\",\\\"5\\\",\\\"2\\\",\\\"4\\\",\\\"6\\\"]\"}","{\"reelList\":\"[\\\"1\\\",\\\"2\\\",\\\"3\\\",\\\"4\\\",\\\"5\\\",\\\"6\\\",\\\"1\\\",\\\"2\\\",\\\"3\\\",\\\"4\\\",\\\"5\\\",\\\"6\\\",\\\"1\\\",\\\"2\\\",\\\"3\\\",\\\"4\\\",\\\"5\\\",\\\"6\\\"]\"}"]
 * @desc 5ライン分のリールを設定します
 *       6ライン以上の設定は無視されます
 *
 * @arg scale
 * @text 倍率
 * @type number
 * @min 1
 * @max 999
 * @default 1
 * @desc 倍率を設定します
 *
 * @arg backColorType
 * @text 背景色タイプ
 * @type select
 * @option カラーコード
 * @value 0
 * @option RGB
 * @value 1
 * @default 0
 * @desc カラーコード：背景色を背景色(カラーコード)で設定
 *       RGB：背景色を背景色(RGB)で設定
 * 
 * @arg backColorCodeList
 * @text 背景色(カラーコード)
 * @type struct<backColorCode>[]
 * @default ["{\"offset\":\"0.0\",\"colorCode\":\"#000080\"}","{\"offset\":\"0.5\",\"colorCode\":\"#6495ed\"}","{\"offset\":\"1.0\",\"colorCode\":\"#000080\"}"]
 * 
 * @arg backColorRgbList
 * @text 背景色(RGB)
 * @type struct<backColorRgb>[]
 * @default ["{\"offset\":\"0.0\",\"rgb_R\":\"0\",\"rgb_G\":\"0\",\"rgb_B\":\"128\"}","{\"offset\":\"0.5\",\"rgb_R\":\"100\",\"rgb_G\":\"149\",\"rgb_B\":\"237\"}","{\"offset\":\"1.0\",\"rgb_R\":\"0\",\"rgb_G\":\"0\",\"rgb_B\":\"128\"}"]
 * 
 */

/*~struct~slotIcon:ja
 *
 * @param iconCharaFile
 * @text キャラクターファイル
 * @type file
 * @dir img/characters
 * @desc スロットのアイコンにするキャラクターファイル
 *
 * @param iconCharaIndex
 * @text キャラクター番号
 * @type number
 * @desc スロットのアイコンにするキャラクター番号
 *
 * @param fiveLineScale
 * @text 5ライン獲得倍率
 * @type number
 * @desc 5ライン揃ったときに獲得するコインの倍率
 *
 * @param fourLineScale
 * @text 4ライン獲得倍率
 * @type number
 * @desc 4ライン揃ったときに獲得するコインの倍率
 *
 * @param threeLineScale
 * @text 3ライン獲得倍率
 * @type number
 * @desc 3ライン揃ったときに獲得するコインの倍率
 */

/*~struct~reelList:ja
 *
 * @param reelList
 * @text リール配置
 * @type select[]
 * @option スロットアイコン1
 * @value 1
 * @option スロットアイコン2
 * @value 2
 * @option スロットアイコン3
 * @value 3
 * @option スロットアイコン4
 * @value 4
 * @option スロットアイコン5
 * @value 5
 * @option セブン(7)アイコン
 * @value 6
 * @desc リールの配置を設定
 */

/*~struct~backColorCode:ja
 * @param offset
 * @text オフセット値
 * @type number
 * @min 0.0
 * @max 1.0
 * @decimals 1
 * @desc グラデーションのオフセット値を設定(0.0～1.0)
 * 
 * @param colorCode
 * @text カラーコード
 * @type string
 * @desc 背景色に設定するカラーコードを設定
 * 
 */

/*~struct~backColorRgb:ja
 * @param offset
 * @text オフセット値
 * @type number
 * @min 0.0
 * @max 1.0
 * @decimals 1
 * @desc グラデーションのオフセット値を設定(0.0～1.0)
 * 
 * @param rgb_R
 * @text rgb値(R)
 * @type number
 * @min 0
 * @max 255
 * @decimals 0
 * @desc 背景色に設定するrgb値(R)を設定
 * 
 * @param rgb_G
 * @text rgb値(G)
 * @type number
 * @min 0
 * @max 255
 * @decimals 0
 * @desc 背景色に設定するrgb値(G)を設定
 * 
 * @param rgb_B
 * @text rgb値(B)
 * @type number
 * @min 0
 * @max 255
 * @decimals 0
 * @desc 背景色に設定するrgb値(B)を設定
 */

(() => {

    const pluginName = "SlotMachine";

    PluginManager.registerCommand(pluginName, "open", slotParams => {
        PluginManager_Parser.prototype.parse(slotParams);
        SlotMachine.scale = slotParams.scale;
        SlotMachine.reelsList = slotParams.reelsList;
        SlotMachine.backColorType = slotParams.backColorType;
        SlotMachine.backColorCodeList = slotParams.backColorCodeList;
        SlotMachine.backColorRgbList = slotParams.backColorRgbList;
        SceneManager.push(Scene_SlotMachine);
    });

    //-----------------------------------------------------------------------------
    // PluginManager_Parser
    //-----------------------------------------------------------------------------
    function PluginManager_Parser() {
        this.initialize(...arguments);
    };

    PluginManager_Parser.prototype.parse = function(params) {
        if (this.isObject(params, "string")) {
            try {
                parseParams = JSON.parse(params)
                params = this.parse(parseParams);
            } catch (e) {
                params = this.convertNumber(params);
                const newLineParams = params.split("\\n");
                if (newLineParams.length > 1) {
                    params = newLineParams[0];
                    for (let index = 1; index < newLineParams.length; ++index) {
                        params = params + "\n" + newLineParams[index];
                    }
                }
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

    PluginManager_Parser.prototype.convertNumber = function(param) {
        return Number(param) ? Number(param) : param;
    };

    PluginManager_Parser.prototype.isObject = function(param, type) {
        return Object.prototype.toString.call(param).slice(8, -1).toLowerCase() === type;
    };

    const params = PluginManager_Parser.prototype.parse(PluginManager.parameters(pluginName));

    //-----------------------------------------------------------------------------
    // BackColorType
    //-----------------------------------------------------------------------------
    function BackColorType() {
        throw new Error("This is a static class");
    }

    Object.defineProperties(BackColorType, {
        colorCode: {
            value: 0
        },
        rgb: {
            value: 1
        }
    });

    //-----------------------------------------------------------------------------
    // JudgeType
    //-----------------------------------------------------------------------------
    function JudgeType() {
        throw new Error("This is a static class");
    }

    Object.defineProperties(JudgeType, {
        perfect: {
            value: 0
        },
        partial: {
            value: 1
        }
    });

    //-----------------------------------------------------------------------------
    // SlotStatus
    //-----------------------------------------------------------------------------
    function SlotStatus() {
        throw new Error("This is a static class");
    }

    Object.defineProperties(SlotStatus, {
        stop: {
            value: 0
        },
        stopStart: {
            value: 1
        },
        spin: {
            value: 2
        },
        judge: {
            value: 3
        }
    });


    //-----------------------------------------------------------------------------
    // SlotMachine
    //-----------------------------------------------------------------------------
    function SlotMachine() {
        throw new Error("This is a static class");
    }

    SlotMachine.standardSize = function() {
        return 48;
    };

    SlotMachine.boxMargin = function() {
        return 4;
    };

    SlotMachine.uiAreaWidth = function() {
        return $dataSystem.advanced.uiAreaWidth;
    };

    SlotMachine.stopFrame = function() {
        return 45;
    };

    SlotMachine.maxCoin = function() {
        return 99999999;
    };

    SlotMachine.uiAreaHeight = function() {
        return $dataSystem.advanced.uiAreaHeight;
    };

    Object.defineProperty(SlotMachine, "scale", {
        get: function() {
            return this._scale;
        },
        set: function(value) {
            this._scale = value;
        },
    });

    Object.defineProperty(SlotMachine, "reelsList", {
        get: function() {
            const reelsList = [];
            for (const reelsParam of this._reelsList) {
                reelsList.push(reelsParam.reelList);
            }

            const remakeReelsList = [];
            for (const reels of reelsList) {
                const remakeReels = [];
                const strat = Math.random() * 18 >> 0;
                for (let count = strat; count < reels.length; ++count) {
                    remakeReels.push(reels[count]);
                }
                for (let count = 0; count < strat; ++count) {
                    remakeReels.push(reels[count]);
                }
                remakeReelsList.push(remakeReels);
            }
            return remakeReelsList;
        },
        set: function(value) {
            if (!this._reelsList) {
                this._reelsList = value;
            }
        },
    });

    Object.defineProperty(SlotMachine, "coin", {
        get: function() {
            return $gameVariables.value(SlotMachine.coinVariable);
        },
        set: function(value) {
            $gameVariables.setValue(SlotMachine.coinVariable, value);
        },
    });

    Object.defineProperties(SlotMachine, {
        helpMessage: {
            value: params.helpMsg
        },
        winMessage: {
            value: params.winMsg
        },
        lostMessage: {
            value: params.lostMsg
        },
        notEnoughMessage: {
            value: params.notEnoughMsg
        },
        coinNumUnit: {
            value: params.coinNumUnit
        },
        coinVariable: {
            value: params.variableID
        }
    });

    SlotMachine.getSlotIconSprite = function(bitmap, characterIndex) {
        let slotIcon = null;
        if (characterIndex >= 0) {
            slotIcon = new Sprite(bitmap);
            bitmap.addLoadListener(() => {
                const pw = bitmap.width / 12;
                const ph = bitmap.height / 8;
                const sx = ((characterIndex % 4) * 3 + 1) * pw;
                const sy = Math.floor(characterIndex / 4) * 4 * ph;
                slotIcon.setFrame(sx, sy, pw, ph);
            });
        } else {
            slotIcon = new Sprite(bitmap);
        }
        return slotIcon;
    };


    //-----------------------------------------------------------------------------
    // Sprite_SlotMachine
    //-----------------------------------------------------------------------------
    function Sprite_SlotMachine() {
        this.initialize(...arguments);
    };

    Sprite_SlotMachine.prototype = Object.create(Sprite_Clickable.prototype);
    Sprite_SlotMachine.prototype.constructor = Sprite_SlotMachine;

    Sprite_SlotMachine.prototype.initialize = function(bitmap) {
        Sprite.prototype.initialize.call(this, bitmap);
        this.createSlotSpriteWindowFrame(bitmap);
        this.createScaleTable();
        this.createSlotSpriteWindow();
        this.createCoinSpriteWindow();
        this.createScaleObject();
        this.createBetButtonSprite();
        this.createStartButtonSprite();
        this.createStopButtonSprite();
        this.createEndButtonSprite();

        this._click = false;
        this._clickEnabled = false;
    };

    Sprite_SlotMachine.prototype.createSlotSpriteWindowFrame = function(bitmap) {
        const context = bitmap._context;
        const grad = this.getWindowFrameGradient(bitmap, 0, 0, bitmap.width, bitmap.height);
        context.strokeStyle = grad;
        context.lineWidth = 15;
        context.stroke();
    };

    Sprite_SlotMachine.prototype.createScaleTable = function() {
        const size = SlotMachine.standardSize();
        const width = size * 15;
        const height = size * 4;
        const slotMachineFrameWindowBitmap = this.createFrameSpriteWindow(0, 0, width, height);

        this._slotScaleTable = new Sprite_SlotScaleTable(slotMachineFrameWindowBitmap, this.createSpriteWindow);
        this._slotScaleTable.x = size;
        this._slotScaleTable.y = size * 0.5;
        this.addChild(this._slotScaleTable);
    };

    Sprite_SlotMachine.prototype.createSlotSpriteWindow = function() {
        const size = SlotMachine.standardSize();
        const width = size * 6;
        const height = size * 4;
        const slotFrameWindowBitmap = this.createFrameSpriteWindow(0, 0, width, height);

        this._slotFrameSpriteWindow = new Sprite_SlotWindow(slotFrameWindowBitmap, this.createSpriteWindow);
        this._slotFrameSpriteWindow.x = size * 5;
        this._slotFrameSpriteWindow.y = size * 6;
        this.addChild(this._slotFrameSpriteWindow);
    };

    Sprite_SlotMachine.prototype.createCoinSpriteWindow = function() {
        const size = SlotMachine.standardSize();
        const width = this._slotFrameSpriteWindow.width;
        const height = size * 0.85;
        const coinFrameWindowBitmap = this.createFrameSpriteWindow(0, 0, width, height);

        this._coinFrameSpriteWindow = new Sprite_CoinWindow(coinFrameWindowBitmap, this.createSpriteWindow);
        this._coinFrameSpriteWindow.x = this._slotFrameSpriteWindow.x;
        this._coinFrameSpriteWindow.y = this._slotFrameSpriteWindow.y + this._slotFrameSpriteWindow.height;
        this.addChild(this._coinFrameSpriteWindow);
    };

    Sprite_SlotMachine.prototype.createScaleObject = function() {
        const size = SlotMachine.standardSize();
        const width = size * 3;
        const height = size * 5;

        const scaleObjectBitmap = this.createFrameSpriteWindow(0, 0, width, height);

        this._scaleObject = new Sprite_ScaleObject(scaleObjectBitmap);
        this._scaleObject.x = size * 12;
        this._scaleObject.y = size * 5.5;
        this.addChild(this._scaleObject);
    };

    Sprite_SlotMachine.prototype.createBetButtonSprite = function() {
        const margin = SlotMachine.boxMargin();
        const size = SlotMachine.standardSize();
        const width = size * 1.5;
        const height = size;
        
        const betButtonBitmap = new Bitmap(width, height);
        const context = betButtonBitmap._context;
        context.beginPath();
        context.fillStyle = "#696969";
        context.rect(0, 0, width, height);
        context.fill();
        context.strokeStyle = "#897408";
        context.lineWidth = margin;
        context.stroke();

        betButtonBitmap.fontSize = size * 0.4;
        betButtonBitmap.drawText("BET", 0, 0, width, height, "center");

        this._betButton = new Sprite_SlotButton(betButtonBitmap)
        this._betButton.x = this._scaleObject.x + this._scaleObject.width + margin;
        this._betButton.y = this._slotFrameSpriteWindow.y + this._slotFrameSpriteWindow.height * 0.5;
        this.addChild(this._betButton);
    };

    Sprite_SlotMachine.prototype.createStartButtonSprite = function() {
        const margin = SlotMachine.boxMargin();
        const startButtonBitmap = this.createStartStopButton("START");
        this._startButton = new Sprite_SlotButton(startButtonBitmap)
        this._startButton.x = this._betButton.x;
        this._startButton.y = this._betButton.y + this._betButton.height + margin;
        this.addChild(this._startButton);
    }

    Sprite_SlotMachine.prototype.createStopButtonSprite = function() {
        const margin = SlotMachine.boxMargin();
        const stopButtonBitmap = this.createStartStopButton("STOP");
        this._stopButton = new Sprite_SlotButton(stopButtonBitmap)
        this._stopButton.x = this._betButton.x;
        this._stopButton.y = this._betButton.y + this._betButton.height + margin;
        this.addChild(this._stopButton);
        this._stopButton.hide();
    }

    Sprite_SlotMachine.prototype.createEndButtonSprite = function() {
        const margin = SlotMachine.boxMargin();
        const size = SlotMachine.standardSize();
        const width = size * 1.5;
        const height = size;
        
        const endButtonBitmap = new Bitmap(width, height);
        const context = endButtonBitmap._context;
        context.beginPath();
        context.fillStyle = "#696969";
        context.rect(0, 0, width, height);
        context.fill();
        context.strokeStyle = "#897408";
        context.lineWidth = margin;
        context.stroke();

        endButtonBitmap.fontSize = size * 0.4;
        endButtonBitmap.drawText("END", 0, 0, width, height, "center");

        this._endButton = new Sprite_SlotButton(endButtonBitmap)
        this._endButton.x = this._betButton.x;
        this._endButton.y = this._scaleObject.y;
        this.addChild(this._endButton);
    };

    Sprite_SlotMachine.prototype.createStartStopButton = function(text) {
        const margin = SlotMachine.boxMargin();
        const size = SlotMachine.standardSize();
        const width = size * 1.5;
        const height = size;
        
        const startStopButtonBitmap = new Bitmap(width, height);
        const context = startStopButtonBitmap._context;
        context.beginPath();
        context.fillStyle = "#696969";
        context.rect(0, 0, width, height);
        context.fill();
        context.strokeStyle = "#897408";
        context.lineWidth = margin;
        context.stroke();

        startStopButtonBitmap.fontSize = size * 0.4;
        startStopButtonBitmap.drawText(text, 0, 0, width, height, "center");
        
        return startStopButtonBitmap;
    };

    Sprite_SlotMachine.prototype.createFrameSpriteWindow = function(x, y, width, height) {
        const margin = SlotMachine.boxMargin();
        const windowFrameBitmap = new Bitmap(width, height);
        const context = windowFrameBitmap._context;
        context.beginPath();
        const grad = this.getWindowFrameGradient(windowFrameBitmap, x, y, width, height);
        context.fillStyle = grad;
        context.rect(x, y, width, height);
        context.fill();
        context.strokeStyle = "#897408";
        context.lineWidth = margin;
        context.stroke();
        return windowFrameBitmap;
    };

    Sprite_SlotMachine.prototype.createSpriteWindow = function(x, y, width, height) {
        const margin = SlotMachine.boxMargin();
        const windowBitmap = new Bitmap(width, height);
        const context = windowBitmap._context;
        context.beginPath();
        context.fillStyle = "#ffffff";
        context.rect(0, 0, width, height);
        context.fill();
        context.strokeStyle = "#494a41";
        context.lineWidth = margin;
        context.stroke();
        return windowBitmap;
    };

    Sprite_SlotMachine.prototype.getWindowFrameGradient = function(bitmap, x, y, width, height) {
        const context = bitmap._context;
        const grad = context.createLinearGradient(x, y, width, height);
        grad.addColorStop(0.0, "#ffffe0");
        grad.addColorStop(0.2, "#b8860b");
        grad.addColorStop(0.4, "#ffffe0");
        grad.addColorStop(0.6, "#b8860b");
        grad.addColorStop(0.8, "#ffffe0");
        grad.addColorStop(1.0, "#b8860b");
        return grad;
    };

    Sprite_SlotMachine.prototype.getSlotIconInfos = function() {
        return this._slotScaleTable.getSlotIconInfos();
    };

    Sprite_SlotMachine.prototype.getSlotSpriteFrameWindow = function() {
        return this._slotFrameSpriteWindow;
    };

    Sprite_SlotMachine.prototype.getCoinSpriteFrameWindow = function() {
        return this._coinFrameSpriteWindow;
    };

    Sprite_SlotMachine.prototype.isBetButtonClick = function() {
        return this._betButton.isClick();
    };

    Sprite_SlotMachine.prototype.isStartButtonClick = function() {
        return this._startButton.isClick();
    };

    Sprite_SlotMachine.prototype.isStopButtonClick = function() {
        return this._stopButton.isClick();
    };

    Sprite_SlotMachine.prototype.isEndButtonClick = function() {
        return this._endButton.isClick();
    };

    Sprite_SlotMachine.prototype.setBetClickEnabled = function(enabled) {
        this._betButton.setClickEnabled(enabled);
    };

    Sprite_SlotMachine.prototype.setStartClickEnabled = function(enabled) {
        this._startButton.setClickEnabled(enabled);
    };

    Sprite_SlotMachine.prototype.setStopClickEnabled = function(enabled) {
        this._stopButton.setClickEnabled(enabled);
    };

    Sprite_SlotMachine.prototype.setEndClickEnabled = function(enabled) {
        this._endButton.setClickEnabled(enabled);
    };

    Sprite_SlotMachine.prototype.setStartButton = function() {
        this._stopButton.hide();
        this._startButton.show();
    };

    Sprite_SlotMachine.prototype.setStopButton = function() {
        this._startButton.hide();
        this._stopButton.show();
    };

    Sprite_SlotMachine.prototype.setClickEnabled = function(enabled) {
        this._clickEnabled = enabled;
    };

    Sprite_SlotMachine.prototype.onClick = function() {
        if (this._clickEnabled) {
            this._click = true;
        }
    };

    Sprite_SlotMachine.prototype.isClick = function() {
        let click = this._click;

        if (this._click) {
            this._click = false;
        }
        return click;
    };


    //-----------------------------------------------------------------------------
    // Sprite_SlotScaleTable
    //-----------------------------------------------------------------------------
    function Sprite_SlotScaleTable() {
        this.initialize(...arguments);
    };

    Sprite_SlotScaleTable.prototype = Object.create(Sprite.prototype);
    Sprite_SlotScaleTable.prototype.constructor = Sprite_SlotScaleTable;

    Sprite_SlotScaleTable.prototype.initialize = function(bitmap, createSpriteWindow) {
        Sprite.prototype.initialize.call(this, bitmap);
        this.createSpriteWindow = createSpriteWindow;
        this._slotIconInfos = this.createIconInfos();
        this.createScaleTable();
        this.drawScaleIcon();
    };

    Sprite_SlotScaleTable.prototype.createScaleTable = function() {
        const leftScaleTable = this.createLeftScaleTable();
        const centerScaleTable = this.createCenterScaleTable();
        const rightScaleTable = this.createRightScaleTable();
        this.addChild(leftScaleTable);
        this.addChild(centerScaleTable);
        this.addChild(rightScaleTable);
    };

    Sprite_SlotScaleTable.prototype.createLeftScaleTable = function() {
        const size = SlotMachine.standardSize();
        const margin = SlotMachine.boxMargin() * 2;
        const width = size * 5 - margin * 2;
        const height = size * 4 - margin * 2;

        const scaleTableBitmap = this.createSpriteWindow(0, 0, width, height);

        const scaleTable = new Sprite(scaleTableBitmap);
        scaleTable.x = margin;
        scaleTable.y = margin;
        return scaleTable;
    };

    Sprite_SlotScaleTable.prototype.createCenterScaleTable = function() {
        const size = SlotMachine.standardSize();
        const margin = SlotMachine.boxMargin() * 2;
        const width = size * 5 - margin * 2;
        const height = size * 4 - margin * 2;

        const scaleTableBitmap = this.createSpriteWindow(0, 0, width, height);

        const scaleTable = new Sprite(scaleTableBitmap);
        scaleTable.x = size * 5 + margin;
        scaleTable.y = margin;
        return scaleTable;
    };

    Sprite_SlotScaleTable.prototype.createRightScaleTable = function() {
        const size = SlotMachine.standardSize();
        const margin = SlotMachine.boxMargin() * 2;
        const width = size * 5 - margin * 2;
        const height = size * 4 - margin * 2;

        const scaleTableBitmap = this.createSpriteWindow(0, 0, width, height);

        const scaleTable = new Sprite(scaleTableBitmap);
        scaleTable.x = size * 5 * 2 + margin;
        scaleTable.y = margin;
        return scaleTable;
    };

    Sprite_SlotScaleTable.prototype.createIconInfos = function() {
        const slotIconInfos = [];

        slotIconInfos.push(this.createSevenIcon());

        const slotIconParams = [];
        slotIconParams.push(params.slotIcon5);
        slotIconParams.push(params.slotIcon4);
        slotIconParams.push(params.slotIcon3);
        slotIconParams.push(params.slotIcon2);
        slotIconParams.push(params.slotIcon1);

        let iconNo = 5;

        for (const slotIconParam of slotIconParams) {
            slotIconInfos.push(this.createIcon(slotIconParam, iconNo));
            --iconNo;
        }

        return slotIconInfos;
    };

    Sprite_SlotScaleTable.prototype.createSevenIcon = function() {
        const size = SlotMachine.standardSize();
        const width = size;
        const height = size;
        const drawX = size * 0.25;
        const drawY = size * 0.08;
        const iconBitmap = new Bitmap(width, height);
        const context = iconBitmap._context;
        context.beginPath();

        iconBitmap.fontFace = "Yu Mincho";
        iconBitmap.fontSize = size;
        const grad = context.createLinearGradient(0, 0, 0, height);
        grad.addColorStop(0.0, "#ffaf60");
        grad.addColorStop(0.2, "#ffad5b");
        grad.addColorStop(0.4, "#ffaa56");
        grad.addColorStop(0.6, "#ff7f50");
        grad.addColorStop(0.8, "#ff6347");
        grad.addColorStop(1.0, "#ff4500");
        iconBitmap.textColor = grad;
        iconBitmap.drawText(7, drawX, drawY, width, height);

        return {
            iconNo: 6,
            icon: iconBitmap,
            iconCharaIndex: -1,
            fiveLineScale: params.fiveLineSevenScale,
            fourLineScale: params.fourLineSevenScale,
            threeLineScale: params.threeLineSevenScale
        };
    };

    Sprite_SlotScaleTable.prototype.createIcon = function(slotIconParam, iconNo) {
        const size = SlotMachine.standardSize();
        const width = size;
        const height = size;
        const iconCharaFile = slotIconParam.iconCharaFile;
        const iconCharaIndex = slotIconParam.iconCharaIndex;
        const iconBitmap = ImageManager.loadCharacter(iconCharaFile);

        return {
            iconNo: iconNo,
            icon: iconBitmap,
            iconCharaIndex: iconCharaIndex,
            fiveLineScale: slotIconParam.fiveLineScale,
            fourLineScale: slotIconParam.fourLineScale,
            threeLineScale: slotIconParam.threeLineScale
        };
    };

    Sprite_SlotScaleTable.prototype.drawScaleIcon = function() {
        const size = SlotMachine.standardSize();
        const margin = SlotMachine.boxMargin() * 2;

        let x = margin;
        let y = margin;

        for (const slotIconInfo of this._slotIconInfos) {
            const fiveLineScale = slotIconInfo.fiveLineScale;
            const fourLineScale = slotIconInfo.fourLineScale;
            const threeLineScale = slotIconInfo.threeLineScale;

            for (let i = 0; i < 6; ++i) {
                let scaleIconSprite = null;
                const spriteX = x + size * i * 0.6;
                const spriteY = y;
                if (i === 5) {
                    scaleIconSprite = this.createScaleText(fiveLineScale, 0);
                } else {
                    scaleIconSprite = this.createSlotIconSprite(slotIconInfo);
                }
                scaleIconSprite.scale.x = 0.55;
                scaleIconSprite.scale.y = 0.55;
                scaleIconSprite.x = spriteX + SlotMachine.boxMargin();
                scaleIconSprite.y = spriteY;
                this.addChild(scaleIconSprite);
            }

            x = size * 5 + margin;
            for (let i = 0; i < 5; ++i) {
                let scaleIconSprite = null;
                const spriteX = x + size * i * 0.6;
                const spriteY = y;
                if (i === 4) {
                    scaleIconSprite = this.createScaleText(fourLineScale, 1);
                } else {
                    scaleIconSprite = this.createSlotIconSprite(slotIconInfo);
                }
                scaleIconSprite.scale.x = 0.55;
                scaleIconSprite.scale.y = 0.55;
                scaleIconSprite.x = spriteX + SlotMachine.boxMargin();
                scaleIconSprite.y = spriteY;
                this.addChild(scaleIconSprite);
            }

            x = size * 5 * 2 + margin;
            for (let i = 0; i < 4; ++i) {
                let scaleIconSprite = null;
                const spriteX = x + size * i * 0.6;
                const spriteY = y;
                if (i === 3) {
                    scaleIconSprite = this.createScaleText(threeLineScale, 2);
                } else {
                    scaleIconSprite = this.createSlotIconSprite(slotIconInfo);
                }
                scaleIconSprite.scale.x = 0.55;
                scaleIconSprite.scale.y = 0.55;
                scaleIconSprite.x = spriteX + SlotMachine.boxMargin();
                scaleIconSprite.y = spriteY;
                this.addChild(scaleIconSprite);
            }

            x = margin;
            y = y + size * 0.6;
        }
    };

    Sprite_SlotScaleTable.prototype.createScaleText = function(scale, calcPosX) {
        const size = SlotMachine.standardSize();
        const margin = SlotMachine.boxMargin() * 2 + SlotMachine.boxMargin() * calcPosX;
        const width = size * 2.7;
        const height = size;
        const posX = calcPosX ? margin * calcPosX + size * calcPosX * 0.7 : 0;
        const scaleTextBitmap = new Bitmap(width + posX + margin, height);
        const context = scaleTextBitmap._context;
        context.beginPath();
        scaleTextBitmap.fontSize = size * 0.7;
        scaleTextBitmap.textColor = "#000000";
        scaleTextBitmap.drawText("×", 0, 8, width, height);
        scaleTextBitmap.drawText(scale, posX, 8, width + calcPosX, height, "right");
        return new Sprite(scaleTextBitmap);
    };

    Sprite_SlotScaleTable.prototype.createSlotIconSprite = function(slotIconInfo) {
        const bitmap = slotIconInfo.icon;
        const characterIndex = slotIconInfo.iconCharaIndex || null;
        const iconSprite = SlotMachine.getSlotIconSprite(bitmap, characterIndex);
        return iconSprite;
    };

    Sprite_SlotScaleTable.prototype.getSlotIconInfos = function() {
        return this._slotIconInfos;
    };


    //-----------------------------------------------------------------------------
    // Sprite_SlotWindow
    //-----------------------------------------------------------------------------
    function Sprite_SlotWindow() {
        this.initialize(...arguments);
    };

    Sprite_SlotWindow.prototype = Object.create(Sprite.prototype);
    Sprite_SlotWindow.prototype.constructor = Sprite_SlotWindow;

    Sprite_SlotWindow.prototype.initialize = function(bitmap, createSpriteWindow) {
        Sprite.prototype.initialize.call(this, bitmap);
        this.createSpriteWindow = createSpriteWindow
        this._line1 = this.createLine(0);
        this._line2 = this.createLine(1);
        this._line3 = this.createLine(2);
        this._line4 = this.createLine(3);
        this._line5 = this.createLine(4);
        this.addChild(this._line1);
        this.addChild(this._line2);
        this.addChild(this._line3);
        this.addChild(this._line4);
        this.addChild(this._line5);
    };

    Sprite_SlotWindow.prototype.createLine = function(lineNo) {
        const size = SlotMachine.standardSize();
        const margin = SlotMachine.boxMargin() * 2;
        const lineMargin = lineNo * margin;
        const width = size;
        const height = size * 3 + margin;

        const lienBitmap = this.createSpriteWindow(0, 0, width, height);
        const lien = new Sprite(lienBitmap);
        lien.x = size * lineNo + margin + lineMargin;
        lien.y = margin * 2;
        return lien;
    };

    Sprite_SlotWindow.prototype.getLinePos = function(lineNo) {
        const margin = SlotMachine.boxMargin() * 2;
        const linePos = {
            x: 0,
            y: 0
        };
        if (lineNo === 0) {
            linePos.x = this.x + this._line1.x;
            linePos.y = this.y + this._line1.y + margin;
        } else if (lineNo === 1) {
            linePos.x = this.x + this._line2.x;
            linePos.y = this.y + this._line2.y + margin;
        } else if (lineNo === 2) {
            linePos.x = this.x + this._line3.x;
            linePos.y = this.y + this._line3.y + margin;
        } else if (lineNo === 3) {
            linePos.x = this.x + this._line4.x;
            linePos.y = this.y + this._line4.y + margin;
        } else {
            linePos.x = this.x + this._line5.x;
            linePos.y = this.y + this._line5.y + margin;
        }
        return linePos;
    };


    //-----------------------------------------------------------------------------
    // Sprite_CoinWindow
    //-----------------------------------------------------------------------------
    function Sprite_CoinWindow() {
        this.initialize(...arguments);
    };

    Sprite_CoinWindow.prototype = Object.create(Sprite.prototype);
    Sprite_CoinWindow.prototype.constructor = Sprite_CoinWindow;

    Sprite_CoinWindow.prototype.initialize = function(bitmap, createSpriteWindow) {
        Sprite.prototype.initialize.call(this, bitmap);
        this.createSpriteWindow = createSpriteWindow
        this._coinSpriteWindow = this.createCoinSpriteWindow();
        this._coinTextSpriteWindow = this.createCoinTextSpriteWindow();
        const coinLabel = this.deawCoinLabel();
        this.addChild(this._coinSpriteWindow);
        this.addChild(this._coinTextSpriteWindow);
        this.addChild(coinLabel);

        this._coin = 0;
        this.refresh();
    };

    Sprite_CoinWindow.prototype.createCoinSpriteWindow = function() {
        const size = SlotMachine.standardSize();
        const margin = SlotMachine.boxMargin();
        const width = size * 4.5 - margin;
        const height = size * 0.7;

        const coinWindowBitmap = this.createSpriteWindow(0, 0, width, height);
        const coinWindow = new Sprite(coinWindowBitmap);
        coinWindow.x = size * 1.5;
        coinWindow.y = margin;
        return coinWindow;
    };

    Sprite_CoinWindow.prototype.createCoinTextSpriteWindow = function() {
        const size = SlotMachine.standardSize();
        const margin = SlotMachine.boxMargin();
        const width = this._coinSpriteWindow.width;
        const height = this._coinSpriteWindow.height;

        const coinTextWindowBitmap = new Bitmap(width, height);
        const context = coinTextWindowBitmap._context;
        context.beginPath();

        coinTextWindowBitmap.fontSize = size * 0.5;
        coinTextWindowBitmap.textColor = "#000000";

        const coinTextWindow = new Sprite(coinTextWindowBitmap);
        coinTextWindow.x = this._coinSpriteWindow.x - margin;
        coinTextWindow.y = this._coinSpriteWindow.y;
        return coinTextWindow;
    };

    Sprite_CoinWindow.prototype.deawCoinLabel = function() {
        const size = SlotMachine.standardSize();
        const margin = SlotMachine.boxMargin();
        const width = this._coinSpriteWindow.width;
        const height = this._coinSpriteWindow.height * 1.5;

        const coinLabelBitmap = new Bitmap(width, height);
        const context = coinLabelBitmap._context;
        context.beginPath();

        coinLabelBitmap.fontSize = size * 0.8;
        const grad = context.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0.0, "#b8860b");
        grad.addColorStop(1.0, "#330000");

        coinLabelBitmap.fontFace = 'fantasy';
        coinLabelBitmap.textColor = grad;
        coinLabelBitmap.drawText("COIN", 0, 0, width, height);

        const drawCoinLabel = new Sprite(coinLabelBitmap);
        drawCoinLabel.x = margin;
        drawCoinLabel.y = margin * 2;
        drawCoinLabel.scale.x = 0.8
        drawCoinLabel.scale.y = 0.7
        return drawCoinLabel;
    };

    Sprite_CoinWindow.prototype.refresh = function() {
        this.refreshCoin();
    };

    Sprite_CoinWindow.prototype.refreshCoin = function() {
        const coinTextBitmap = this._coinTextSpriteWindow._bitmap;
        const width = coinTextBitmap.width;
        const height = coinTextBitmap.height;
        coinTextBitmap.clear();
        coinTextBitmap.drawText(this._coin, 0, 0, width, height, "right");
    };

    Sprite_CoinWindow.prototype.updateCoin = function(coin) {
        if (this._coin !== coin) {
            this._coin = coin;
            this.refresh();
        }
    };


    //-----------------------------------------------------------------------------
    // Sprite_ScaleObject
    //-----------------------------------------------------------------------------
    function Sprite_ScaleObject() {
        this.initialize(...arguments);
    };

    Sprite_ScaleObject.prototype = Object.create(Sprite.prototype);
    Sprite_ScaleObject.prototype.constructor = Sprite_ScaleObject;

    Sprite_ScaleObject.prototype.initialize = function(mainBitmap) {
        Sprite.prototype.initialize.call(this, mainBitmap);
        const scaleObject = this.createScaleObject(mainBitmap);
        const drawScale = this.drawScale(mainBitmap);
        const subObject = this.createSubObject(mainBitmap);
        const arrow = this.createArrow(subObject);
        const inputCoin = this.createInputCoin(subObject);
        this.addChild(scaleObject);
        this.addChild(drawScale);
        this.addChild(subObject);
        this.addChild(arrow);
        this.addChild(inputCoin);
    };

    Sprite_ScaleObject.prototype.createScaleObject = function(mainBitmap) {
        const size = SlotMachine.standardSize();
        const margin = SlotMachine.boxMargin() * 2;
        const x = mainBitmap.width * 0.5;
        const y = size - margin * 1.5;
        const width = size * 4;
        const height = size * 4;
        const radius = size * 0.6;

        const scaleObjectBitmap = new Bitmap(width, height);
        const context = scaleObjectBitmap._context;
        context.beginPath();

        context.arc(x, y, radius, 0, Math.PI * 2);
        const fillGrad = context.createLinearGradient(0, 0, width, height);
        fillGrad.addColorStop(0.0, "#d7c447");
        fillGrad.addColorStop(0.5, "#664134");
        context.fillStyle = fillGrad;
        context.fill();
        const strokeGrad = context.createLinearGradient(0, 0, width, height);
        strokeGrad.addColorStop(0.0, "#ffffe0");
        strokeGrad.addColorStop(0.4, "#b8860b");
        context.strokeStyle = strokeGrad;
        context.lineWidth = 4;
        context.stroke();

        return new Sprite(scaleObjectBitmap);
    };

    Sprite_ScaleObject.prototype.drawScale = function(mainBitmap) {
        const size = SlotMachine.standardSize();
        const margin = SlotMachine.boxMargin() * 2;
        const width = size * 1.5;
        const height = size * 1.5;

        const scaleBitmap = new Bitmap(width, height);
        const context = scaleBitmap._context;
        context.beginPath();

        scaleBitmap.fontSize = size * 0.57;
        const grad = context.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0.0, "#ffffe0");
        grad.addColorStop(0.4, "#b8860b");
        scaleBitmap.textColor = grad;

        let drawX = mainBitmap.width * 0.5 - size * 0.17;
        if (SlotMachine.scale >= 100) {
            drawX -= size * 0.37;
        } else if (SlotMachine.scale >= 10) {
            drawX -= size * 0.17;
        }
        scaleBitmap.drawText(SlotMachine.scale, 0, 0, width, height);

        const drawScale = new Sprite(scaleBitmap);
        drawScale.x = drawX;
        drawScale.y = 0;
        return drawScale;
    };

    Sprite_ScaleObject.prototype.createSubObject = function(mainBitmap) {
        const size = SlotMachine.standardSize();
        const margin = SlotMachine.boxMargin() * 2;
        const x = margin;
        const y = size * 1.5;
        const width = mainBitmap.width - margin;
        const height = mainBitmap.height - margin;

        const subObjectBitmap = new Bitmap(width, height);
        const context = subObjectBitmap._context;
        context.beginPath();

        const grad = context.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0.0, "#664134");
        grad.addColorStop(0.6, "#d7c447");
        grad.addColorStop(1.0, "#664134");
        context.fillStyle = grad;
        context.rect(x, y, width, height);
        context.fill();
        context.stroke();

        return new Sprite(subObjectBitmap);
    };

    Sprite_ScaleObject.prototype.createArrow = function(subObjectSprite) {
        const size = SlotMachine.standardSize();
        const margin = SlotMachine.boxMargin() * 2;
        const moveX = subObjectSprite.width * 0.5 - size * 0.25;
        const moveY = margin;
        const width = subObjectSprite.width;
        const height = subObjectSprite.height * 0.5;
        const arrowBitmap = new Bitmap(width, height);

        const context = arrowBitmap._context;
        context.beginPath();
        context.moveTo(moveX, moveY);
        context.lineWidth = 3;

        const x1 = moveX
        const y1 = size * 0.5;
        context.lineTo(moveX, size * 0.5);

        const x2 = width * 0.25
        const y2 = y1;
        context.lineTo(x2, y2);

        const x3 = width * 0.5
        const y3 = y2 + size * 0.75;
        context.lineTo(x3, y3);

        const x4 = width * 0.75;
        const y4 = y2;
        context.lineTo(x4, y4);

        const x5 = subObjectSprite.width * 0.5 + size * 0.25;
        const y5 = y4;
        context.lineTo(x5, y5);

        const x6 = x5;
        const y6 = moveY;
        context.lineTo(x6, y6);

        const lineGrad = context.createLinearGradient(0, 0, width, height);
        lineGrad.addColorStop(0.0, "#b8860b");
        lineGrad.addColorStop(1.0, "#330000");

        context.strokeStyle = lineGrad;
        context.closePath();
        context.stroke();

        const fillGrad = context.createLinearGradient(0, 0, width, height);
        lineGrad.addColorStop(0.0, "#daa520");
        lineGrad.addColorStop(0.6, "#330000");

        context.fillStyle = lineGrad;
        context.fill();

        context.beginPath();

        const sx = x2 - SlotMachine.boxMargin();
        const sy = y2 - SlotMachine.boxMargin();
        context.moveTo(sx, sy);
        const sx1 = x1 - 2;
        const sy1 = sy;
        context.lineTo(sx1, sy1);

        const sx2 = sx1;
        const sy2 = moveY - 2;
        context.lineTo(sx2, sy2);

        const sx3 = x6;
        const sy3 = sy2
        context.lineTo(sx3, sy3);

        const sx4 = x6;
        const sy4 = y5 - 2
        context.moveTo(sx4, sy4);
        context.lineTo(x4 + 2, sy4);

        context.strokeStyle = "#ffffe0";
        context.lineWidth = 2;
        context.stroke();

        const arrow = new Sprite(arrowBitmap);
        arrow.x += SlotMachine.boxMargin();
        arrow.y += size * 1.5;
        return arrow;
    };

    Sprite_ScaleObject.prototype.createInputCoin = function(subObjectSprite) {
        const size = SlotMachine.standardSize();
        const margin = SlotMachine.boxMargin() * 2;
        const x = subObjectSprite.width * 0.3 - 3;
        const y = subObjectSprite.height * 0.6;
        const width = subObjectSprite.width * 0.5;
        const height = subObjectSprite.height * 0.3;

        const inputCoinBitmap = new Bitmap(width + margin, height);
        const context = inputCoinBitmap._context;
        context.beginPath();

        const grad = context.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0.0, "#ffffe0");
        grad.addColorStop(0.6, "#b8860b");
        context.fillStyle = grad;
        context.fillRect(0, 0, width, height);

        const sx = width;
        const sy = 0

        context.beginPath();
        context.moveTo(sx, sy);

        const sx1 = sx + 3
        const sy1 = sy + 3;
        context.lineTo(sx1, sy1);

        const sx2 = sx1
        const sy2 = height - 3;
        context.lineTo(sx2, sy2);

        const sx3 = width
        const sy3 = height;
        context.lineTo(sx3, sy3);

        context.strokeStyle = "#664134";
        context.fillStyle = "#664134";
        context.closePath();
        context.fill();

        context.beginPath();
        const inputGrad = context.createLinearGradient(0, 0, width, height);
        inputGrad.addColorStop(0.0, "#000000");
        inputGrad.addColorStop(0.4, "#664134");
        inputGrad.addColorStop(1.0, "#000000");
        context.fillStyle = inputGrad;
        context.rect(margin, height * 0.5 - margin, width - margin * 2, size * 0.25);
        context.fill();

        const outLineGrad = context.createLinearGradient(0, 0, width, height);
        outLineGrad.addColorStop(0.0, "#fffacd");
        outLineGrad.addColorStop(1.0, "#b8860b");
        context.strokeStyle = outLineGrad;
        context.lineWidth = 3;

        context.stroke();

        const inputCoin = new Sprite(inputCoinBitmap);
        inputCoin.x = x;
        inputCoin.y = y;
        return inputCoin;
    };


    //-----------------------------------------------------------------------------
    // Sprite_BetLine
    //-----------------------------------------------------------------------------
    function Sprite_BetLine() {
        this.initialize(...arguments);
    };

    Sprite_BetLine.prototype = Object.create(Sprite.prototype);
    Sprite_BetLine.prototype.constructor = Sprite_BetLine;

    Sprite_BetLine.prototype.initialize = function(bitmap, betLine) {
        Sprite.prototype.initialize.call(this, bitmap);
        this.createLine(bitmap, betLine);
        this.clear();
    };

    Sprite_BetLine.prototype.createLine = function(bitmap, lineNo) {
        const size = SlotMachine.standardSize();
        const standardPos = 10;

        const context = bitmap._context;
        context.beginPath();
        context.moveTo(standardPos, standardPos);
        context.lineWidth = 6

        const x1 = size * 0.75 + standardPos;
        const y1 = standardPos;
        context.lineTo(x1, y1);

        const x2 = x1 + size * 0.25;
        const y2 = y1 + size * 0.25;
        context.lineTo(x2, y2);

        const x3 = x1;
        const y3 = y2 + size * 0.25;
        context.lineTo(x3, y3);

        const x4 = standardPos;
        const y4 = y3;
        context.lineTo(x4, y4);

        const grad = context.createLinearGradient(0, 0, x2, y3);
        grad.addColorStop(0.0, "#ffffe0");
        grad.addColorStop(0.2, "#fffacd");
        grad.addColorStop(1.0, "#b8860b");

        context.strokeStyle = grad;
        context.closePath();
        context.stroke();

        this.fillDrawLineNo(bitmap, lineNo);

        return bitmap;
    };

    Sprite_BetLine.prototype.fillDrawLineNo = function(bitmap, lineNo) {
        const context = bitmap._context;
        if (lineNo === 1) {
            context.fillStyle = "#ff0000";
        } else if (lineNo === 2) {
            context.fillStyle = "#0000ff";
        } else {
            context.fillStyle = "#008000";
        }
        context.fill();
        context.font = "italic bold 25px sans-serif";
        context.fillStyle = "#ffffff";
        context.fillText(lineNo, 20, 32);
    };

    Sprite_BetLine.prototype.clear = function() {
        this.opacity = 100;
    };

    Sprite_BetLine.prototype.bet = function() {
        this.opacity = 255;
        AudioManager.playSe({
            "name": "Coin",
            "volume": 90,
            "pitch": 100,
            "pan": 0
        });
        SlotMachine.coin -= SlotMachine.scale;
    };


    //-----------------------------------------------------------------------------
    // Sprite_SlotReal
    //-----------------------------------------------------------------------------
    function Sprite_SlotReal() {
        this.initialize(...arguments);
    };

    Sprite_SlotReal.prototype = Object.create(Sprite.prototype);
    Sprite_SlotReal.prototype.constructor = Sprite_SlotReal;

    Sprite_SlotReal.prototype.initialize = function(bitmap) {
        Sprite.prototype.initialize.call(this, bitmap);
        this._reels = [];
        this._subjects = [];
        this._slotIconInfos = [];
        this._reelNo = 0;
        this.initInfo();
    };

    Sprite_SlotReal.prototype.initInfo = function() {
        this._nextReel = 0;
        this._moveY = 0;
        this._spinSpeed = 0;
        this._stopFrame = 0;
        this._startFlg = false;
        this._stopFlg = false;
    };

    Sprite_SlotReal.prototype.setSpinSpeed = function(speed) {
        this._spinSpeed = speed;
    };

    Sprite_SlotReal.prototype.downSpeed = function() {
        if (!this._stopFlg) {
            --this._spinSpeed;
            if (this._spinSpeed < 0) {
                this._spinSpeed = 1;
                this._stopFlg = true;
            }
        }
    };

    Sprite_SlotReal.prototype.setReels = function(reels) {
        this._reels = reels;
        this._subjects = this.initSubjects();
        this._nextReel = this.initNextReel();
    };

    Sprite_SlotReal.prototype.setSlotIconInfos = function(slotIconInfos) {
        this._slotIconInfos = slotIconInfos;
    };

    Sprite_SlotReal.prototype.setRealIcon = function() {
        let reelIndex = 0;
        for (const subject of this._subjects) {
            const slotIconInfo = this.getSlotIconInfo(this._reels[subject]);
            const bitmap = slotIconInfo.icon;
            const margin = SlotMachine.boxMargin();
            const characterIndex = slotIconInfo.iconCharaIndex;
            const size = SlotMachine.standardSize();
            const drawPosY = size * 2;
            let calcY = this.calcDrawPosY(drawPosY, reelIndex) + this._moveY;

            if (this._startFlg && this._stopFlg && reelIndex === 0 && !this.isRunning(calcY - 1, reelIndex)) {
                AudioManager.playSe({
                    "name": "Switch2",
                    "volume": 90,
                    "pitch": 130,
                    "pan": 0
                });
                this._startFlg = false;
            }

            if (this._stopFlg && !this._startFlg) {
                calcY = this.calcDrawPosY(drawPosY, reelIndex);
            }

            if (characterIndex >= 0) {
                bitmap.addLoadListener(() => {
                    const pw = bitmap.width / 12;
                    const ph = bitmap.height / 8;
                    const sx = ((characterIndex % 4) * 3 + 1) * pw;
                    const sy = Math.floor(characterIndex / 4) * 4 * ph;
                    this._bitmap.clearRect(0, calcY, pw, ph);
                    this._bitmap.blt(bitmap, sx, sy, pw, ph, 0, calcY)
                });
            } else {
                bitmap.addLoadListener(() => {
                    const pw = bitmap.width;
                    const ph = bitmap.height;
                    const sx = 0;
                    const sy = 0;
                    this._bitmap.clearRect(0, calcY, pw, ph);
                    this._bitmap.blt(bitmap, sx, sy, pw, ph, 0, calcY)
                });
            }

            if (reelIndex === 0 && this.isReset(calcY)) {
                this.reset();
            }
            ++reelIndex;
        }

        if (this._stopFlg && !this._startFlg) {
            this.initInfo();
        }
    };

    Sprite_SlotReal.prototype.getSlotIconInfo = function(iconNo) {
        for (const slotIconInfo of this._slotIconInfos) {
            if (slotIconInfo.iconNo === iconNo) {
                return slotIconInfo;
            }
        }
    };

    Sprite_SlotReal.prototype.calcDrawPosY = function(subjectY, reelIndex) {
        const size = SlotMachine.standardSize();
        const margin = SlotMachine.boxMargin();
        return subjectY - size * reelIndex - margin * 0.5;
    };

    Sprite_SlotReal.prototype.updateReal = function() {
        const size = SlotMachine.standardSize();
        this._moveY += this._spinSpeed;
        const moveRealY = this.setRealIcon();
    };

    Sprite_SlotReal.prototype.isReset = function(subjectY) {
        const size = SlotMachine.standardSize();
        const resetY = size * 3;
        const calcResetY = this.calcDrawPosY(resetY, 0);
        return subjectY >= calcResetY;
    };

    Sprite_SlotReal.prototype.isRunning = function(checkPosY, reelIndex) {
        let run = this._starFlg;
        if (this._stopFlg) {
            const size = SlotMachine.standardSize();
            const defaultPosY = size * 2;
            const calcY = this.calcDrawPosY(defaultPosY, reelIndex);
            run = Math.trunc(checkPosY) !== Math.trunc(calcY);
        }
        return run;
    };

    Sprite_SlotReal.prototype.reset = function() {
        this._moveY = 0;
        if (this._nextReel === this._reels.length) {
            this._nextReel = 0
        }
        this._subjects.shift();
        this._subjects.push(this._nextReel);
        ++this._nextReel;
    };

    Sprite_SlotReal.prototype.setReelNo = function(reelNo) {
        this._reelNo = reelNo;
    };

    Sprite_SlotReal.prototype.getReelNo = function() {
        return this._reelNo
    };

    Sprite_SlotReal.prototype.setStopFrame = function(stopFrame) {
        this._stopFrame = stopFrame;
    };

    Sprite_SlotReal.prototype.getStopFrame = function() {
        return this._stopFrame;
    };

    Sprite_SlotReal.prototype.start = function() {
        this._startFlg = true;
    };

    Sprite_SlotReal.prototype.isStart = function() {
        return this._startFlg;
    };

    Sprite_SlotReal.prototype.initSubjects = function() {
        return [0, 1, 2, 3, 4, 5];
    };

    Sprite_SlotReal.prototype.initNextReel = function() {
        return 6;
    };

    Sprite_SlotReal.prototype.getSubjectIconInfos = function() {
        const subjectIconInfos = [];
        const iconNo1 = this._reels[this._subjects[1]];
        const iconNo2 = this._reels[this._subjects[2]];
        const iconNo3 = this._reels[this._subjects[0]];
        const subjectIconInfos1 = this.getSlotIconInfo(iconNo1);
        const subjectIconInfos2 = this.getSlotIconInfo(iconNo2);
        const subjectIconInfos3 = this.getSlotIconInfo(iconNo3);

        subjectIconInfos.push(subjectIconInfos1);
        subjectIconInfos.push(subjectIconInfos2);
        subjectIconInfos.push(subjectIconInfos3);
        return subjectIconInfos;
    };



    //-----------------------------------------------------------------------------
    // Sprite_SlotButton
    //-----------------------------------------------------------------------------
    function Sprite_SlotButton() {
        this.initialize(...arguments);
    };

    Sprite_SlotButton.prototype = Object.create(Sprite_Clickable.prototype);
    Sprite_SlotButton.prototype.constructor = Sprite_SlotButton;

    Sprite_SlotButton.prototype.initialize = function(bitmap) {
        Sprite.prototype.initialize.call(this, bitmap);
        this._click = false;
        this._clickEnabled = false;
    };

    Sprite_SlotButton.prototype.onClick = function() {
        this._click = true;
    };

    Sprite_SlotButton.prototype.setClickEnabled = function(enabled) {
        this._clickEnabled = enabled;
    };

    Sprite_SlotButton.prototype.onClick = function() {
        if (this._clickEnabled) {
            this._click = true;
        }
    };

    Sprite_SlotButton.prototype.isClick = function() {
        let click = this._click;

        if (this._click) {
            this._click = false;
        }
        return click;
    };


    //-----------------------------------------------------------------------------
    // Scene_SlotMachine
    //-----------------------------------------------------------------------------
    function Scene_SlotMachine() {
        this.initialize(...arguments);
    };

    Scene_SlotMachine.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_SlotMachine.prototype.constructor = Scene_SlotMachine;

    Scene_SlotMachine.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
        this._slotRealSprites = [];
        this.initInfo();
        this._result = false;
    };

    Scene_SlotMachine.prototype.initInfo = function() {
        this._bet = 0;
        this._winCoin = 0;
        this._stopFrameCount = 0;
        this._stopLineNo = 0;
        this._slotStatus = SlotStatus.stop;
        if (this._slotMachine) {
            this._slotMachine.setBetClickEnabled(true);
            this._slotMachine.setEndClickEnabled(true);
        }
    };

    Scene_SlotMachine.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.createSlotSpriteWindow();
        this.createWindowLayer();
        this.createSlotLine();
        this.createReels();
        this.createHelpWindow();
        const slotMachine = this._slotMachine;
        this._coinSprite = this._slotMachine.getCoinSpriteFrameWindow();
    };

    Scene_SlotMachine.prototype.start = function() {
        Scene_Base.prototype.start.call(this);
        this._coinSprite.updateCoin(SlotMachine.coin);
        this._helpWindow.setText(SlotMachine.helpMessage);
        this._slotMachine.setBetClickEnabled(true);
        this._slotMachine.setEndClickEnabled(true);
    };

    Scene_SlotMachine.prototype.createReels = function() {
        let reelNo = 0;
        for (const reels of SlotMachine.reelsList) {
            const slotRealSprite = this.getSlotRealSprite(reelNo);
            slotRealSprite.setReels(reels);
            slotRealSprite.setSlotIconInfos(this.getSlotIconInfos());
            slotRealSprite.setRealIcon();
            slotRealSprite.setReelNo(reelNo);
            this.addChild(slotRealSprite);
            this._slotRealSprites.push(slotRealSprite);
            ++reelNo;
            if (reelNo > 4) {
                break;
            }
        }
        this.setSpinSpeed();
    };

    Scene_SlotMachine.prototype.createSlotSpriteWindow = function() {
        const size = SlotMachine.standardSize();
        const width = SlotMachine.uiAreaWidth();
        const height = SlotMachine.uiAreaHeight();
        const slotWindowBitmap = new Bitmap(width, height);
        const context = slotWindowBitmap._context;
        context.beginPath();

        const fillGrad = context.createLinearGradient(0, 0, width, height);

        if (BackColorType.colorCode === SlotMachine.backColorType) {
            for (const backColorCode of SlotMachine.backColorCodeList) {
                const offset = backColorCode.offset.toFixed(1);
                const colorCode = backColorCode.colorCode;

                fillGrad.addColorStop(offset, colorCode);
            }
        } else {
            for (const backColorRgb of SlotMachine.backColorRgbList) {
                const offset = backColorRgb.offset.toFixed(1);
                const rgb_R = backColorRgb.rgb_R;
                const rgb_G = backColorRgb.rgb_G;
                const rgb_B = backColorRgb.rgb_B;

                fillGrad.addColorStop(offset, `rgb(${rgb_R},${rgb_G},${rgb_B})`);
            }
        }
        context.fillStyle = fillGrad;

        context.rect(0, 0, width, height);
        context.fill();

        this._slotMachine = new Sprite_SlotMachine(slotWindowBitmap);
        this.addChild(this._slotMachine);
    };

    Scene_SlotMachine.prototype.getSlotRealSprite = function(reelNo) {

        const slotSpriteWindow = this._slotMachine.getSlotSpriteFrameWindow();
        const size = SlotMachine.standardSize();

        const margin = SlotMachine.boxMargin();
        const slotX = slotSpriteWindow.x;
        const slotY = slotSpriteWindow.y;
        let lineX = 0;
        let lineY = 0;
        let lineWidth = 0;
        let lineHeight = 0;

        if (reelNo === 0) {
            lineX = slotSpriteWindow._line1.x;
            lineY = slotSpriteWindow._line1.y;
            lineWidth = slotSpriteWindow._line1.width;
            lineHeight = slotSpriteWindow._line1.height;
        } else if (reelNo === 1) {
            lineX = slotSpriteWindow._line2.x;
            lineY = slotSpriteWindow._line2.y;
            lineWidth = slotSpriteWindow._line2.width;
            lineHeight = slotSpriteWindow._line2.height;
        } else if (reelNo === 2) {
            lineX = slotSpriteWindow._line3.x;
            lineY = slotSpriteWindow._line3.y;
            lineWidth = slotSpriteWindow._line3.width;
            lineHeight = slotSpriteWindow._line3.height;
        } else if (reelNo === 3) {
            lineX = slotSpriteWindow._line4.x;
            lineY = slotSpriteWindow._line4.y;
            lineWidth = slotSpriteWindow._line4.width;
            lineHeight = slotSpriteWindow._line4.height;
        } else if (reelNo === 4) {
            lineX = slotSpriteWindow._line5.x;
            lineY = slotSpriteWindow._line5.y;
            lineWidth = slotSpriteWindow._line5.width;
            lineHeight = slotSpriteWindow._line5.height;
        }

        const x = slotX + lineX;
        const y = slotY + lineY + margin;
        const bitmap = new Bitmap(lineWidth, lineHeight - margin * 2.5);
        const slotReal = new Sprite_SlotReal(bitmap);
        slotReal.x = x;
        slotReal.y = y;

        return slotReal;
    };

    Scene_SlotMachine.prototype.createSlotLine = function() {
        const size = SlotMachine.standardSize();
        const bitmap = new Bitmap(size * 2, size * 2);

        const context = bitmap._context;

        this._betLine1 = new Sprite_BetLine(new Bitmap(size * 2, size * 2), 1);
        this._betLine1.x = size * 3.9;
        this._betLine1.y = size * 7.5;
        this._betLine2 = new Sprite_BetLine(new Bitmap(size * 2, size * 2), 2);
        this._betLine2.x = size * 3.9;
        this._betLine2.y = size * 6.5;
        this._betLine3 = new Sprite_BetLine(new Bitmap(size * 2, size * 2), 3);
        this._betLine3.x = size * 3.9;
        this._betLine3.y = size * 8.5;
        this.addChild(this._betLine1);
        this.addChild(this._betLine2);
        this.addChild(this._betLine3);
    };

    Scene_SlotMachine.prototype.getSlotIconInfos = function() {
        return this._slotMachine.getSlotIconInfos();
    };

    Scene_SlotMachine.prototype.createHelpWindow = function() {
        Scene_MenuBase.prototype.createHelpWindow.call(this);
        this._helpWindow.y = Graphics.boxHeight - this._helpWindow.height;
    };

    Scene_SlotMachine.prototype.update = function() {
        Scene_MenuBase.prototype.update.call(this);

        if (this._slotStatus === SlotStatus.stop) {
            if (this._bet === 0 && !this.isEnoughCoin()) {
                this._helpWindow.setText(SlotMachine.notEnoughMessage);
                this._slotMachine.setEndClickEnabled(true);
                if (Input.isRepeated("ok") || Input.isRepeated("cancel") || this._slotMachine.isEndButtonClick()) {
                    SceneManager.pop();
                }
                return;
            }

            if (Input.isRepeated("up") || this._slotMachine.isBetButtonClick()) {
                this.bet();
                this._slotMachine.setStartClickEnabled(true);
                this._slotMachine.setEndClickEnabled(false);
            }

            if ((Input.isRepeated("ok") || this._slotMachine.isStartButtonClick()) && this._bet > 0) {
                SoundManager.playOk();
                this.spinReel();
            }

            if ((Input.isRepeated("cancel") || this._slotMachine.isEndButtonClick()) && this._bet === 0) {
                SceneManager.pop();
            }
        } else if (this._slotStatus === SlotStatus.spin || this._slotStatus === SlotStatus.stopStart) {
            this.slotAction();
        } else if (this._slotStatus === SlotStatus.judge) {
            this.result();
        }
        this._coinSprite.updateCoin(SlotMachine.coin);
    };

    Scene_SlotMachine.prototype.slotAction = function() {
        if ((Input.isRepeated("ok") || this._slotMachine.isStopButtonClick()) && this._slotStatus === SlotStatus.spin) {
            SoundManager.playOk();
            this._slotStatus = SlotStatus.stopStart;
            this.setStopFrame();
            this._slotMachine.setStopClickEnabled(false);
        }

        for (const slotRealSprite of this._slotRealSprites) {
            if (this._slotStatus === SlotStatus.stopStart) {
                const stopFrame = slotRealSprite.getStopFrame();
                if (this._stopFrameCount > stopFrame) {
                    slotRealSprite.downSpeed();
                }
                ++this._stopFrameCount;
            }
            slotRealSprite.updateReal();
        }

        if (this._slotStatus === SlotStatus.stopStart) {
            let allSpinStop = false;
            for (const slotRealSprite of this._slotRealSprites) {
                allSpinStop = !slotRealSprite.isStart();
                if (!allSpinStop) {
                    break;
                }
            }
            if (allSpinStop) {
                this._winCoin = this.judge();
                this._slotStatus = SlotStatus.judge;
                this._result = true;
            }
        }
    };

    Scene_SlotMachine.prototype.result = function() {
        this._helpWindow.open();
        if (this._winCoin === 0) {
            if (this._result) {
                this._helpWindow.setText(SlotMachine.lostMessage);
                this._result = false;
            }
        } else {
            if (this._result) {
                AudioManager.playMe({
                    "name": "Victory1",
                    "volume": 90,
                    "pitch": 100,
                    "pan": 0
                });
                this._helpWindow.setText(SlotMachine.winMessage.format(this._winCoin, this.coinNumUnit()));
                this._result = false;
            }
        }

        if (!this._result) {
            this._slotMachine.setClickEnabled(true);
            if (Input.isRepeated("ok") || Input.isRepeated("cancel") || this._slotMachine.isClick()) {
                this._helpWindow.setText(SlotMachine.helpMessage);
                this.setSpinSpeed();
                this.initInfo();
                this._betLine1.clear();
                this._betLine2.clear();
                this._betLine3.clear();
                this._slotMachine.setStartButton();
                this._slotMachine.setClickEnabled(false);
                AudioManager.stopMe();
            }
        }
    };

    Scene_SlotMachine.prototype.bet = function() {
        ++this._bet;
        if (this._bet === 1) {
            this._betLine1.bet();
        } else if (this._bet === 2) {
            if (this.isEnoughCoin()) {
                this._betLine2.bet();
            } else {
                this.spinReel();
            }
        } else if (this._bet === 3) {
            if (this.isEnoughCoin()) {
                this._betLine3.bet();
            } else {
                this.spinReel();
            }
        } else if (this._bet === 4) {
            this.spinReel();
        }
    };

    Scene_SlotMachine.prototype.spinReel = function() {
        this._slotStatus = SlotStatus.spin;
        this._helpWindow.close();
        this._slotMachine.setStopButton();
        this._slotMachine.setBetClickEnabled(false);
        this._slotMachine.setStartClickEnabled(false);
        this._slotMachine.setStopClickEnabled(true);
        AudioManager.playSe({
            "name": "Switch3",
            "volume": 90,
            "pitch": 200,
            "pan": 0
        });
        for (const slotRealSprite of this._slotRealSprites) {
            slotRealSprite.start();
        }
    };

    Scene_SlotMachine.prototype.setSpinSpeed = function() {
        const size = SlotMachine.standardSize();

        for (const slotRealSprite of this._slotRealSprites) {
            const reelNo = slotRealSprite.getReelNo();
            const speed = size * 0.3 + reelNo * 1.5;
            slotRealSprite.setSpinSpeed(speed);
        }
    };

    Scene_SlotMachine.prototype.setStopFrame = function() {
        let stopFrame = SlotMachine.stopFrame();
        for (const slotRealSprite of this._slotRealSprites) {
            const index = slotRealSprite.getReelNo() + 1;
            const stopRandFrame = Math.round(Math.random() * SlotMachine.stopFrame()) + 1;
            stopFrame = SlotMachine.stopFrame() * index + stopRandFrame + stopFrame;
            slotRealSprite.setStopFrame(stopFrame);
        }
    };

    Scene_SlotMachine.prototype.judge = function() {
        const mainSlotRealSprite = this._slotRealSprites[0];
        const mainSubjectIconInfos = mainSlotRealSprite.getSubjectIconInfos()
        let mainSubjectIconInfo1 = mainSubjectIconInfos[0];
        let mainSubjectIconInfo2 = mainSubjectIconInfos[1];
        let mainSubjectIconInfo3 = mainSubjectIconInfos[2];

        let mainSubjectIcon1 = mainSubjectIconInfo1.iconNo;
        let mainSubjectIcon2 = mainSubjectIconInfo2.iconNo;
        let mainSubjectIcon3 = mainSubjectIconInfo3.iconNo;

        if (this._bet < 2) {
            mainSubjectIcon2 = -1;
        }

        if (this._bet < 3) {
            mainSubjectIcon3 = -1;
        }

        let judgeCount1 = 0;
        let judgeCount2 = 0;
        let judgeCount3 = 0;

        for (const slotRealSprite of this._slotRealSprites) {
            const subjectIconInfos = slotRealSprite.getSubjectIconInfos();
            const subjectIconInfo1 = subjectIconInfos[0];
            const subjectIconInfo2 = subjectIconInfos[1];
            const subjectIconInfo3 = subjectIconInfos[2];
            
            if (params.judgeType === JudgeType.perfect) {
                if (mainSubjectIcon1 === subjectIconInfo1.iconNo) {
                    ++judgeCount1;
                } else {
                    mainSubjectIcon1 = -1;
                }
    
                if (mainSubjectIcon2 === subjectIconInfo2.iconNo) {
                    ++judgeCount2;
                } else {
                    mainSubjectIcon2 = -1;
                }
    
                if (mainSubjectIcon3 === subjectIconInfo3.iconNo) {
                    ++judgeCount3;
                } else {
                    mainSubjectIcon3 = -1;
                }
            } else {
                if (mainSubjectIcon1 === subjectIconInfo1.iconNo) {
                    ++judgeCount1;
                } else {
                    if (judgeCount1 < 3) {
                        judgeCount1 = 1;
                        mainSubjectIcon1 = subjectIconInfo1.iconNo;
                        mainSubjectIconInfo1 = subjectIconInfo1;
                    }
                }
    
                if (mainSubjectIcon2 === subjectIconInfo2.iconNo) {
                    ++judgeCount2;
                } else {
                    if (judgeCount2 < 3) {
                        judgeCount2 = 1;
                        mainSubjectIcon2 = subjectIconInfo2.iconNo;
                        mainSubjectIconInfo2 = subjectIconInfo2;
                    }
                }
    
                if (mainSubjectIcon3 === subjectIconInfo3.iconNo) {
                    ++judgeCount3;
                } else {
                    if (judgeCount3 < 3) {
                        judgeCount3 = 1;
                        mainSubjectIcon3 = subjectIconInfo3.iconNo;
                        mainSubjectIconInfo3 = subjectIconInfo3;
                    }
                }
            }
        }

        if (judgeCount1 < 3) {
            this._betLine1.clear();
        }

        if (judgeCount2 < 3) {
            this._betLine2.clear();
        }

        if (judgeCount3 < 3) {
            this._betLine3.clear();
        }

        let winCoin = 0;
        winCoin += this.getWinCoin(mainSubjectIconInfo1, judgeCount1);
        winCoin += this.getWinCoin(mainSubjectIconInfo2, judgeCount2);
        winCoin += this.getWinCoin(mainSubjectIconInfo3, judgeCount3);

        if (winCoin > 0) {
            SlotMachine.coin += winCoin
            if (SlotMachine.coin >= SlotMachine.maxCoin()) {
                SlotMachine.coin = SlotMachine.maxCoin();
            }
        }
        return winCoin;
    };

    Scene_SlotMachine.prototype.getWinCoin = function(slotIconInfo, judgeCount) {
        let winCoin = 0;
        if (judgeCount === 3) {
            winCoin = slotIconInfo.threeLineScale * SlotMachine.scale;
        } else if (judgeCount === 4) {
            winCoin = slotIconInfo.fourLineScale * SlotMachine.scale;
        } else if (judgeCount === 5) {
            winCoin = slotIconInfo.fiveLineScale * SlotMachine.scale;
        }

        return winCoin;
    };

    Scene_SlotMachine.prototype.coinNumUnit = function() {
        return SlotMachine.coinNumUnit;
    };

    Scene_SlotMachine.prototype.isEnoughCoin = function() {
        return SlotMachine.coin >= SlotMachine.scale;
    };
})();
