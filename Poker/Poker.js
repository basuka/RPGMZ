//=============================================================================
// RPG Maker MZ - Poker
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc ポーカー機能を設定します。
 * @author Basu
 * @url https://raw.githubusercontent.com/basuka/RPGMZ/main/Poker/Poker.js
 *
 *
 * @help Poker.js
 *
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
 *    ください。
 *
 * 2.「プラグインコマンド」イベントから「ポーカー開始」コマンド
 *   を設定してください。
 *
 * 3.必要に応じてパラメータ及びコマンドパラメータを設定してください。
 *
 *-----------------------------------------------------------------------------
 * README
 *-----------------------------------------------------------------------------
 * https://github.com/basuka/RPGMZ/blob/main/Poker/README.md
 *
 *-----------------------------------------------------------------------------
 * 利用規約
 *-----------------------------------------------------------------------------
 * このプラグインはMITライセンスで配布しています
 *
 *==============================================================================
 *
 * @param variableID
 * @text 保管ID
 * @type variable
 * @default 11
 * @desc 所持コインの数を保管する変数ID
 *
 * @param royalStraight
 * @text ロイヤルストレート
 * @type number
 * @min 1
 * @max 9999
 * @default 500
 * @desc ロイヤルストレートフラッシュの獲得枚数
 *       枚数は掛け金で倍になっていきます
 *
 * @param fiveCard
 * @text 5カード
 * @type number
 * @min 1
 * @max 9999
 * @default 100
 * @desc 5カードの獲得枚数
 *       枚数は掛け金で倍になっていきます
 *
 * @param straightFlush
 * @text ストレートフラッシュ
 * @type number
 * @min 1
 * @max 9999
 * @default 50
 * @desc ストレートフラッシュの獲得枚数
 *       枚数は掛け金で倍になっていきます
 *
 * @param fourCard
 * @text 4カード
 * @type number
 * @min 1
 * @max 9999
 * @default 20
 * @desc 4カードの獲得枚数
 *       枚数は掛け金で倍になっていきます
 *
 * @param fullHouse
 * @text フルハウス
 * @type number
 * @min 1
 * @max 9999
 * @default 10
 * @desc フルハウスの獲得枚数
 *       枚数は掛け金で倍になっていきます
 *
 * @param flush
 * @text フラッシュ
 * @type number
 * @min 1
 * @max 9999
 * @default 5
 * @desc フラッシュの獲得枚数
 *       枚数は掛け金で倍になっていきます
 *
 * @param straight
 * @text ストレート
 * @type number
 * @min 1
 * @max 9999
 * @default 4
 * @desc ストレートの獲得枚数
 *       枚数は掛け金で倍になっていきます
 *
 * @param threeCard
 * @text 3カード
 * @type number
 * @min 1
 * @max 9999
 * @default 2
 * @desc 3カードの獲得枚数
 *       枚数は掛け金で倍になっていきます
 *
 * @param twoPair
 * @text 2ペア
 * @type number
 * @min 1
 * @max 9999
 * @default 1
 * @desc 2ペアの獲得枚数
 *       枚数は掛け金で倍になっていきます
 *
 * @param joker
 * @text ジョーカー
 * @type number
 * @min 1
 * @max 9999
 * @default 1
 * @desc ジョーカーのみの獲得枚数
 *       枚数は掛け金で倍になっていきます
 *
 * @param cardInfo1
 * @text カード情報1
 * @type struct<cardInfo>
 * @default {"cardPictureFile":"Actor1_1","colorType":"0","colorNo":"10","colorCode":"#ffffff","rgbR":"255","rgbG":"255","rgbB":"255"}
 * @desc カード情報1
 *
 * @param cardInfo2
 * @text カード情報2
 * @type struct<cardInfo>
 * @default {"cardPictureFile":"Actor1_3","colorType":"1","colorNo":"0","colorCode":"#0000ff","rgbR":"255","rgbG":"255","rgbB":"255"}
 * @desc カード情報2
 *
 * @param cardInfo3
 * @text カード情報3
 * @type struct<cardInfo>
 * @default {"cardPictureFile":"Actor1_6","colorType":"2","colorNo":"0","colorCode":"#ffffff","rgbR":"0","rgbG":"255","rgbB":"0"}
 * @desc カード情報3
 *
 * @param cardInfo4
 * @text カード情報4
 * @type struct<cardInfo>
 * @default {"cardPictureFile":"Actor1_7","colorType":"0","colorNo":"14","colorCode":"#ffffff","rgbR":"255","rgbG":"255","rgbB":"255"}
 * @desc カード情報4
 *
 * @param jokerCardInfo
 * @text ジョーカーカード情報
 * @type struct<cardInfo>
 * @default {"cardPictureFile":"Monster_7","colorType":"0","colorNo":"15","colorCode":"#ffffff","rgbR":"255","rgbG":"255","rgbB":"255"}
 * @desc ジョーカーカード情報
 *
 * @param backCardPictureFile
 * @text カード裏画像
 * @type file
 * @dir img/parallaxes
 * @default Mountains3
 * @desc カードの裏に描画する画像ファイル
 *
 * @param backCardPictureX
 * @text カード裏画像開始位置X
 * @type number
 * @default 0
 * @desc カードの裏に描画する画像の開始位置X
 *
 * @param backCardPictureY
 * @text カード裏画像開始位置Y
 * @type number
 * @default 0
 * @desc カードの裏に描画する画像の開始位置Y
 *
 * @param helpMsg1
 * @text ヘルプメッセージ1
 * @type text
 * @default カーソルキーの上：ベット\n決定キー：スタート　　　　　　　　　　　キャンセルキー：終了
 * @desc ヘルプメッセージ1
 *
 * @param helpMsg2
 * @text ヘルプメッセージ2
 * @type text
 * @default 残すカードを選択してください。\n選択をしたらくばるを押してください。
 * @desc ヘルプメッセージ2
 *
 * @param coinNumUnit
 * @text コインの単位
 * @type text
 * @default 枚
 * @desc コイン枚数の単位を設定
 *
 * @param winMsg
 * @text 勝利メッセージ
 * @type text
 * @default おめでとうございます！%1です！\n%2%3のコインが当たりました！
 * @desc 勝利時のメッセージの設定
 *       "%1"は役名、"%2"は獲得枚数、"%3"はコインの単位に置換されます
 *
 * @param doubleUpMsg
 * @text ダブルアップメッセージ
 * @type text
 * @default ダブルアップチャンスに挑戦しますか？\n成功すると獲得枚数は%1%2になります。
 * @desc ダブルアップ確認メッセージの設定
 *       "%1"は成功時の獲得枚数、"%2"はコインの単位に置換されます
 *
 * @param doubleUpSelectMsg
 * @text ダブルアップ選択メッセージ
 * @type text
 * @default このカードよりも大きいか小さいか選択してください。
 * @desc ダブルアップ選択メッセージの設定
 *
 * @param winDoubleUpMsg
 * @text ダブルアップ勝利メッセージ
 * @type text
 * @default おめでとうございます！\n%1%2のコインが当たりました！
 * @desc 勝利時のメッセージの設定
 *       "%1"は獲得枚数、"%2"はコインの単位に置換されます
 *
 * @param acquiredMsg
 * @text 獲得メッセージ
 * @type text
 * @default %1%2のコインを獲得しました。
 * @desc 獲得メッセージの設定
 *       "%1"は獲得枚数、"%2"はコインの単位に置換されます
 *
 * @param lostMsg
 * @text 敗北メッセージ
 * @type text
 * @default 残念でした。
 * @desc 負けた時のメッセージ
 *
 * @param drawMsg
 * @text ドローメッセージ
 * @type text
 * @default ドローです。もう一度行います。
 * @desc ドロー時のメッセージ
 *
 * @param replayMsg
 * @text リプレイメッセージ
 * @type text
 * @default もう一度やりますか？
 * @desc リプレイ時の確認メッセージ
 *
 * @param notEnoughMsg
 * @text コイン不足メッセージ
 * @default コインが足りません。
 * @desc コインが足りない時のメッセージ
 *
 *
 * @command open
 * @text ポーカー開始
 * @desc ポーカーを開きます。
 *
 */

/*~struct~cardInfo:ja
 * @param cardPictureFile
 * @text カード画像
 * @type file
 * @dir img/pictures
 * @desc カードの表に描画する画像ファイル
 *
 * @param colorType
 * @text カラータイプ
 * @type select
 * @option システムカラー
 * @value 0
 * @option カラーコード
 * @value 1
 * @option RGB
 * @value 2
 * @default 0
 * @desc 文字色のカラータイプ
 *
 * @param colorNo
 * @text カラー番号
 * @type number
 * @default 0
 * @desc システムのカラー番号
 *       カラータイプがシステムカラーの場合有効
 *
 * @param colorCode
 * @text カラーコード
 * @type text
 * @default #ffffff
 * @desc カラーコード
 *       カラータイプがカラーコードの場合有効
 *
 * @param rgbR
 * @text rgb(赤)
 * @type number
 * @default 255
 * @desc rgb(赤)
 *       カラータイプがRGBの場合有効
 *
 * @param rgbG
 * @text rgb(緑)
 * @type number
 * @default 255
 * @desc rgb(緑)
 *       カラータイプがRGBの場合有効
 *
 * @param rgbB
 * @text rgb(青)
 * @type number
 * @default 255
 * @desc rgb(青)
 *       カラータイプがRGBの場合有効
 */

(() => {

    const pluginName = "Poker";

    PluginManager.registerCommand(pluginName, "open", pokerParams => {
        SceneManager.push(Scene_Poker);
    });

    //-----------------------------------------------------------------------------
    // PluginManager_Parser
    //-----------------------------------------------------------------------------
    function PluginManager_Parser() {
        this.initialize(...arguments);
    }

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
    // PokerMsgType
    //-----------------------------------------------------------------------------
    function PokerMsgType() {
        throw new Error("This is a static class");
    }

    Object.defineProperties(PokerMsgType, {
        none: {
            value: -1
        },
        winMsg: {
            value: 0
        },
        lostMsg: {
            value: 1
        },
        drawMsg: {
            value: 2
        },
        exit: {
            value: 3
        }
    });


    //-----------------------------------------------------------------------------
    // DoubleUpType
    //-----------------------------------------------------------------------------
    function DoubleUpType() {
        throw new Error("This is a static class");
    }

    Object.defineProperties(DoubleUpType, {
        none: {
            value: -1
        },
        big: {
            value: 0
        },
        small: {
            value: 1
        }
    });


    //-----------------------------------------------------------------------------
    // PokerStatus
    //-----------------------------------------------------------------------------
    function PokerStatus() {
        throw new Error("This is a static class");
    }

    Object.defineProperties(PokerStatus, {
        none: {
            value: -1
        },
        initSet: {
            value: 0
        },
        viewCard: {
            viewCard: 1
        },
        bet: {
            value: 2
        },
        openStart: {
            value: 3
        },
        opening: {
            value: 4
        },
        open: {
            value: 5
        },
        openCheck: {
            value: 6
        },
        cardSelect: {
            value: 7
        },
        judge: {
            value: 8
        },
        victoryMeWait: {
            value: 9
        },
        msgWait: {
            value: 10
        },
        doubleUp: {
            value: 11
        },
        doubleUpJudge: {
            value: 12
        },
        doubleUpCancel: {
            value: 13
        }
    });


    //-----------------------------------------------------------------------------
    // Poker
    //-----------------------------------------------------------------------------
    function Poker() {
        throw new Error("This is a static class");
    }

    Poker.standardSize = function() {
        return 48;
    };

    Poker.boxMargin = function() {
        return 4;
    };

    Poker.frame = function() {
        return 5;
    };

    Poker.openCardFrame = function() {
        return 3;
    };

    Poker.maxBet = function() {
        return 10;
    };

    Poker.textHeight = function() {
        return 24;
    };

    Poker.jokerNumber = function() {
        return 15;
    };

    Poker.jokerCardNo = function() {
        return 9;
    };

    Poker.maxCardNumber = function() {
        return 14;
    };

    Poker.maxCoin = function() {
        return 99999999;
    };

    Poker.uiAreaWidth = function() {
        return $dataSystem.advanced.uiAreaWidth;
    };

    Poker.uiAreaHeight = function() {
        return $dataSystem.advanced.uiAreaHeight;
    };

    Object.defineProperties(Poker, {
        royalStraight: {
            value: params.royalStraight
        },
        fiveCard: {
            value: params.fiveCard
        },
        straightFlush: {
            value: params.straightFlush
        },
        fourCard: {
            value: params.fourCard
        },
        fullHouse: {
            value: params.fullHouse
        },
        flush: {
            value: params.flush
        },
        straight: {
            value: params.straight
        },
        threeCard: {
            value: params.threeCard
        },
        twoPair: {
            value: params.twoPair
        },
        joker: {
            value: params.joker
        },
        cardInfo1: {
            value: params.cardInfo1
        },
        cardInfo2: {
            value: params.cardInfo2
        },
        cardInfo3: {
            value: params.cardInfo3
        },
        cardInfo4: {
            value: params.cardInfo4
        },
        jokerCardInfo: {
            value: params.jokerCardInfo
        },
        backCardPictureFile: {
            value: params.backCardPictureFile
        },
        backCardPictureX: {
            value: params.backCardPictureX
        },
        backCardPictureY: {
            value: params.backCardPictureY
        },
        helpMsg1: {
            value: params.helpMsg1
        },
        helpMsg2: {
            value: params.helpMsg2
        },
        coinNumUnit: {
            value: params.coinNumUnit
        },
        winMsg: {
            value: params.winMsg
        },
        doubleUpMsg: {
            value: params.doubleUpMsg
        },
        lostMsg: {
            value: params.lostMsg
        },
        drawMsg: {
            value: params.drawMsg
        },
        replayMsg: {
            value: params.replayMsg
        },
        doubleUpSelectMsg: {
            value: params.doubleUpSelectMsg
        },
        winDoubleUpMsg: {
            value: params.winDoubleUpMsg
        },
        notEnoughMsg: {
            value: params.notEnoughMsg
        },
        acquiredMsg: {
            value: params.acquiredMsg
        },
        coinVariable: {
            value: params.variableID
        }
    });

    Object.defineProperty(Poker, "coin", {
        get: function() {
            return $gameVariables.value(Poker.coinVariable);
        },
        set: function(value) {
            $gameVariables.setValue(Poker.coinVariable, value);
        }
    });


    //-----------------------------------------------------------------------------
    // Sprite_Poker
    //-----------------------------------------------------------------------------
    function Sprite_Poker() {
        this.initialize(...arguments);
    }

    Sprite_Poker.prototype = Object.create(Sprite.prototype);
    Sprite_Poker.prototype.constructor = Sprite_Poker;

    Sprite_Poker.prototype.initialize = function(bitmap) {
        Sprite.prototype.initialize.call(this, bitmap);
        this._bet = 0;
        this.createAcquiredTable();
    };

    Sprite_Poker.prototype.createAcquiredTable = function() {
        const size = Poker.standardSize();
        const width = size * 15;
        const height = size * 4;
        const pokerFrameWindowBitmap = this.createFrameSpriteWindow(0, 0, width, height);

        this._pokerAcquiredTable = new Sprite_PokerAcquiredTable(pokerFrameWindowBitmap, this.createSpriteWindow, this.getWindowGradient);
        this._pokerAcquiredTable.x = size;
        this._pokerAcquiredTable.y = size * 0.5;
        this.addChild(this._pokerAcquiredTable);
    };

    Sprite_Poker.prototype.createFrameSpriteWindow = function(x, y, width, height) {
        const margin = Poker.boxMargin();
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

    Sprite_Poker.prototype.createSpriteWindow = function(x, y, width, height, color) {
        const margin = Poker.boxMargin();
        const windowBitmap = new Bitmap(width, height);
        const context = windowBitmap._context;
        const grad = this.getWindowGradient(windowBitmap, x, y, width, height);
        context.beginPath();
        context.fillStyle = grad;
        context.rect(x, y, width, height);
        context.fill();
        context.strokeStyle = "#752100";
        context.lineWidth = margin;
        context.stroke();
        return windowBitmap;
    };

    Sprite_Poker.prototype.getWindowFrameGradient = function(bitmap, x, y, width, height) {
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

    Sprite_Poker.prototype.getWindowGradient = function(bitmap, x, y, width, height) {
        const context = bitmap._context;
        const grad = context.createLinearGradient(x, y, width, height);
        grad.addColorStop(0.0, "#783c1d");
        grad.addColorStop(0.5, "#752100");
        grad.addColorStop(1.0, "#783c1d");
        return grad;
    };

    Sprite_Poker.prototype.createCoinSpriteWindow = function(helpWindow) {
        const size = Poker.standardSize();
        const width = this._pokerAcquiredTable.width * 0.3;
        const height = size * 0.55;
        const coinFrameWindowBitmap = this.createSpriteWindow(0, 0, width, height);

        this._coinFrameSpriteWindow = new Sprite_CoinWindow(coinFrameWindowBitmap, this.createSpriteWindow, this.getWindowGradient);
        this._coinFrameSpriteWindow.drawLabel("COIN");
        this._coinFrameSpriteWindow.setCoin(Poker.coin);
        this._coinFrameSpriteWindow.x = helpWindow.x + size * 2.5;
        this._coinFrameSpriteWindow.y = helpWindow.y - size * 0.7;

        this._winCoinFrameSpriteWindow = new Sprite_CoinWindow(coinFrameWindowBitmap, this.createSpriteWindow, this.getWindowGradient);
        this._winCoinFrameSpriteWindow.drawLabel("WIN");
        this._winCoinFrameSpriteWindow.x = this._coinFrameSpriteWindow.x + this._coinFrameSpriteWindow.width + size;
        this._winCoinFrameSpriteWindow.y = helpWindow.y - size * 0.7;

        this._betCoinFrameSpriteWindow = new Sprite_CoinWindow(this.createSpriteWindow(0, 0, width * 0.6, height), this.createSpriteWindow, this.getWindowGradient);
        this._betCoinFrameSpriteWindow.drawLabel("BET");
        this._betCoinFrameSpriteWindow.x = this._winCoinFrameSpriteWindow.x + this._winCoinFrameSpriteWindow.width + size;
        this._betCoinFrameSpriteWindow.y = helpWindow.y - size * 0.7;

        this.addChild(this._coinFrameSpriteWindow);
        this.addChild(this._winCoinFrameSpriteWindow);
        this.addChild(this._betCoinFrameSpriteWindow);
    };

    Sprite_Poker.prototype.bet = function() {
        AudioManager.playSe({
            "name": "Coin",
            "volume": 90,
            "pitch": 100,
            "pan": 0
        });
        ++this._bet;
        --Poker.coin;
        this._betCoinFrameSpriteWindow.setCoin(this._bet);
        this._coinFrameSpriteWindow.setCoin(Poker.coin);
        this._pokerAcquiredTable.setBetCoin(this._bet);
        this._pokerAcquiredTable.updateTable();
    };

    Sprite_Poker.prototype.isBet = function() {
        return this._bet > 0;
    };

    Sprite_Poker.prototype.isMaxBet = function() {
        return Poker.maxBet() === this._bet;
    };

    Sprite_Poker.prototype.betCoin = function() {
        return this._bet;
    };

    Sprite_Poker.prototype.setWinCoin = function(winCoin) {
        this._winCoinFrameSpriteWindow.setCoin(winCoin);
    };

    Sprite_Poker.prototype.getWinCoin = function() {
        return this._winCoinFrameSpriteWindow.getCoin();
    };

    Sprite_Poker.prototype.setWinIndex = function(index) {
        this._pokerAcquiredTable.setWinIndex(index);
        this._pokerAcquiredTable.updateTable();
    };

    Sprite_Poker.prototype.getWinType = function() {
        return this._pokerAcquiredTable.getWinType();
    };

    Sprite_Poker.prototype.clear = function() {
        this._bet = 0;
        this._betCoinFrameSpriteWindow.setCoin(0);
        this._pokerAcquiredTable.setBetCoin(0);
        this._winCoinFrameSpriteWindow.setCoin(0);
        this.setWinIndex(0);
    };

    Sprite_Poker.prototype.refreshCoin = function() {
        this._coinFrameSpriteWindow.setCoin(Poker.coin);
    };


    //-----------------------------------------------------------------------------
    // Sprite_PokerAcquiredTable
    //-----------------------------------------------------------------------------
    function Sprite_PokerAcquiredTable() {
        this.initialize(...arguments);
    }

    Sprite_PokerAcquiredTable.prototype = Object.create(Sprite.prototype);
    Sprite_PokerAcquiredTable.prototype.constructor = Sprite_PokerAcquiredTable;

    Sprite_PokerAcquiredTable.prototype.initialize = function(bitmap, createSpriteWindow, getWindowGradient) {
        Sprite.prototype.initialize.call(this, bitmap);
        this.createSpriteWindow = createSpriteWindow;
        this.getWindowGradient = getWindowGradient
        const acquiredTable = this.createAcquiredTable();
        const acquiredText = this.drawAcquired();
        this.addChild(acquiredTable);
        this.addChild(acquiredText);

        this._winIndex = 0;
        this._betCoin = 0;
    };

    Sprite_PokerAcquiredTable.prototype.createAcquiredTable = function() {
        const size = Poker.standardSize();
        const margin = Poker.boxMargin() * 2;
        const width = size * 15 - margin * 2;
        const height = size * 4 - margin * 2;

        this._acquiredTableBitmap = this.createSpriteWindow(0, 0, width, height);
        const acquiredTable = new Sprite(this._acquiredTableBitmap);
        acquiredTable.x = margin;
        acquiredTable.y = margin;
        return acquiredTable;
    };

    Sprite_PokerAcquiredTable.prototype.drawAcquired = function() {
        const size = Poker.standardSize();
        const margin = Poker.boxMargin() * 2;

        const width = this._acquiredTableBitmap.width;
        const height = this._acquiredTableBitmap.height;

        this._acquiredTextBitmap = new Bitmap(width, height);
        const context = this._acquiredTextBitmap._context;
        context.beginPath();
        this._acquiredTextBitmap.fontSize = size * 0.4;

        this.drawAcquiredText();

        const acquiredText = new Sprite(this._acquiredTextBitmap);
        acquiredText.x = margin;
        acquiredText.y = margin;
        return acquiredText;
    };

    Sprite_PokerAcquiredTable.prototype.drawAcquiredText = function() {
        const size = Poker.standardSize();
        const margin = Poker.boxMargin() * 2;

        let index = 0;
        let drawCol = 1;

        let drawX = margin;
        let deawY = margin;

        const acquiredInfoLists = this.acquiredInfoLists();
        for (const acquiredInfoList of acquiredInfoLists) {
            let maxTextWidth = 0;

            for (const acquiredInfo of acquiredInfoList) {
                const textWidth = this._acquiredTextBitmap.measureTextWidth(acquiredInfo * this._betCoin || acquiredInfo);
                if (maxTextWidth < textWidth) {
                    maxTextWidth = textWidth;
                }
            }

            for (const acquiredInfo of acquiredInfoList) {
                ++index;
                this.setTextColor(this._acquiredTextBitmap, index);

                if (drawCol % 2 === 1) {
                    this._acquiredTextBitmap.drawText(acquiredInfo, drawX, deawY, maxTextWidth, Poker.textHeight());
                } else {
                    this._acquiredTextBitmap.drawText(acquiredInfo * this._betCoin || acquiredInfo, drawX, deawY, this.acquiredWidth(), Poker.textHeight(), "right");
                }

                deawY += size * 0.7;
            }

            if (drawCol === 1) {
                drawX += maxTextWidth + size;
            } else if (drawCol === 2) {
                drawX = this._acquiredTableBitmap.width * 0.65;
            } else {
                drawX += maxTextWidth + size * 1.5;
            }
            deawY = margin;

            ++drawCol;
        }
    };

    Sprite_PokerAcquiredTable.prototype.setTextColor = function(bitmap, index) {
        bitmap.textColor = "#ffffff";

        if (this._winIndex > 0) {
            const winIndex = this._winIndex >= 6 ? this._winIndex + 5 : this._winIndex;
            if (winIndex === index || winIndex + 5 === index) {
                bitmap.textColor = "#f39800";
            }
        }
    };

    Sprite_PokerAcquiredTable.prototype.setBetCoin = function(betCoin) {
        this._betCoin = betCoin;
    };

    Sprite_PokerAcquiredTable.prototype.setWinIndex = function(index) {
        this._winIndex = index;
    };

    Sprite_PokerAcquiredTable.prototype.updateTable = function() {
        this._acquiredTextBitmap.clear();
        this.drawAcquiredText();
        this.update();
    };

    Sprite_PokerAcquiredTable.prototype.acquiredWidth = function() {
        return this._acquiredTextBitmap.measureTextWidth("000000");
    };

    Sprite_PokerAcquiredTable.prototype.acquiredInfoLists = function() {
        return [
            this.acquiredType1(),
            [Poker.royalStraight, Poker.fiveCard, Poker.straightFlush, Poker.fourCard, Poker.fullHouse],
            this.acquiredType2(),
            [Poker.flush, Poker.straight, Poker.threeCard, Poker.twoPair, Poker.joker]
        ];
    };

    Sprite_PokerAcquiredTable.prototype.acquiredType1 = function() {
        return ["ロイヤルストレートフラッシュ", "5カード", "ストレートフラッシュ", "4カード", "フルハウス"];
    };

    Sprite_PokerAcquiredTable.prototype.acquiredType2 = function() {
        return ["フラッシュ", "ストレート", "3カード", "2ペア", "ジョーカー"];
    };

    Sprite_PokerAcquiredTable.prototype.getWinType = function() {
        switch (this._winIndex) {
            case 1:
                return this.acquiredType1()[0];
            case 2:
                return this.acquiredType1()[1];
            case 3:
                return this.acquiredType1()[2];
            case 4:
                return this.acquiredType1()[3];
            case 5:
                return this.acquiredType1()[4];
            case 6:
                return this.acquiredType2()[0];
            case 7:
                return this.acquiredType2()[1];
            case 8:
                return this.acquiredType2()[2];
            case 9:
                return this.acquiredType2()[3];
            case 10:
                return this.acquiredType2()[4];
            default:
                return "";
        }
    };


    //-----------------------------------------------------------------------------
    // Sprite_PokerCard
    //-----------------------------------------------------------------------------
    function Sprite_PokerCard() {
        this.initialize(...arguments);
    };

    Sprite_PokerCard.prototype = Object.create(Sprite.prototype);
    Sprite_PokerCard.prototype.constructor = Sprite_PokerCard;

    Sprite_PokerCard.prototype.initialize = function(bitmap) {
        Sprite.prototype.initialize.call(this, bitmap);
        this._bitmap = bitmap;
    };

    Sprite_PokerCard.prototype.fill = function() {
        const context = this._bitmap._context;
        context.fillStyle = "#ffffff";
        context.fill();
    };

    Sprite_PokerCard.prototype.createBackCardPicture = function() {
        const margin = Poker.boxMargin() * 2;
        const backCardPictureFile = Poker.backCardPictureFile;
        const bitmap = ImageManager.loadParallax(backCardPictureFile);
        bitmap.addLoadListener(() => {
            this._bitmap.blt(bitmap, Poker.backCardPictureX, Poker.backCardPictureY, this._bitmap.width - margin, this._bitmap.height - margin, Poker.boxMargin(), Poker.boxMargin());
            this.drawBackCardLine();
        });
    };

    Sprite_PokerCard.prototype.drawBackCardLine = function() {
        const margin = Poker.boxMargin();
        const x = margin;
        const y = margin;
        const width = this._bitmap.width - margin * 2;
        const height = this._bitmap.height - margin * 2;

        const context = this._bitmap._context;
        context.rect(x, y, width, height);
        context.strokeStyle = "#752100";
        context.lineWidth = margin * 0.5;
        context.stroke();
    };

    Sprite_PokerCard.prototype.createFrontCardPicture = function(cardInfo) {
        const margin = Poker.boxMargin() * 2;

        const bitmap = cardInfo.bitmap;
        const sx = 60;
        const sy = 30;
        const sw = bitmap.width - 100;
        const sh = bitmap.height - 130;
        const dx = margin * 3;
        const dy = margin * 4;
        const dw = this._bitmap.width - margin * 6;
        const dh = this._bitmap.height - margin * 7.5;

        bitmap.addLoadListener(() => {
            this._bitmap.blt(bitmap, sx, sy, sw, sh, dx, dy, dw, dh);
            this.drawNumber(cardInfo);
        });

        this._cardInfo = cardInfo;
    };

    Sprite_PokerCard.prototype.drawNumber = function(cardInfo) {
        const number = cardInfo.drawNumber;
        const margin = Poker.boxMargin() * 2;

        this._numberBitmap = new Bitmap(this._bitmap.width, this._bitmap.height);
        this._numberBitmap.fontSize = 18;
        this._numberBitmap.textColor = cardInfo.textColor;

        if (number.length > 2) {
            let drawY = 0;
            for (let index = 0; index < number.length; ++index) {
                const drawChar = number.charAt(index);
                this._numberBitmap.drawText(drawChar, margin, margin * 0.75 + drawY, this._bitmap.measureTextWidth("A"), Poker.textHeight());
                this._numberBitmap.drawText(drawChar, this._bitmap.width - margin * 1.5 - margin, this._bitmap.height - 18 * (number.length - 1) - margin * 3 + drawY, this._bitmap.measureTextWidth("A"), 18, "right");
                drawY += 18;
            }
        } else {
            this._numberBitmap.drawText(number, margin, margin * 0.75, this._bitmap.measureTextWidth("00"), Poker.textHeight());
            this._numberBitmap.drawText(number, this._bitmap.width - margin * 2.5 - margin, this._bitmap.height - margin * 3, this._bitmap.measureTextWidth("00"), Poker.textHeight(), "right");
        }

        const numberSprite = new Sprite(this._numberBitmap);
        this.addChild(numberSprite);
    };

    Sprite_PokerCard.prototype.cardInfo = function() {
        return this._cardInfo;
    };

    Sprite_PokerCard.prototype.clear = function() {
        this._bitmap.clear();
        if (this._numberBitmap) {
            this._numberBitmap.clear();
        }
        this.fill();
        this.createBackCardPicture();
        this.update();
    };


    //-----------------------------------------------------------------------------
    // Sprite_CoinWindow
    //-----------------------------------------------------------------------------
    function Sprite_CoinWindow() {
        this.initialize(...arguments);
    };

    Sprite_CoinWindow.prototype = Object.create(Sprite.prototype);
    Sprite_CoinWindow.prototype.constructor = Sprite_CoinWindow;

    Sprite_CoinWindow.prototype.initialize = function(bitmap, createSpriteWindow, getWindowGradient) {
        Sprite.prototype.initialize.call(this, bitmap);
        this.createSpriteWindow = createSpriteWindow;
        this.getWindowGradient = getWindowGradient;
        this._coinSpriteWindow = this.createCoinSpriteWindow();
        this._coinLabelSpriteWindow = this.createCoinLabelSpriteWindow();
        this.addChild(this._coinSpriteWindow);
        this.addChild(this._coinLabelSpriteWindow);

        this._coin = 0;
        this.refresh();
    };

    Sprite_CoinWindow.prototype.createCoinSpriteWindow = function() {
        const size = Poker.standardSize();
        const margin = Poker.boxMargin();
        const width = this._bitmap.width - size * 1.5 - margin;
        const height = size * 0.4;

        const coinWindowBitmap = this.createCoinBitmapWindow(width, height);
        const coinWindow = new Sprite(coinWindowBitmap);
        coinWindow.x = size * 1.5;
        coinWindow.y = margin;
        return coinWindow;
    };

    Sprite_CoinWindow.prototype.createCoinBitmapWindow = function(width, height) {
        const size = Poker.standardSize();
        const margin = Poker.boxMargin();

        const coinWindowBitmap = this.createSpriteWindow(0, 0, width, height);
        const context = coinWindowBitmap._context;
        context.fillStyle = "#ffffff";
        context.fill();

        return coinWindowBitmap;
    };

    Sprite_CoinWindow.prototype.createCoinLabelSpriteWindow = function() {
        const size = Poker.standardSize();
        const margin = Poker.boxMargin();
        const width = this._coinSpriteWindow.width;
        const height = this._coinSpriteWindow.height;

        const coinLabelWindowBitmap = this.createCoinLabelBitmapWindow(width, height);
        const coinLabelWindow = new Sprite(coinLabelWindowBitmap);
        coinLabelWindow.x = this._coinSpriteWindow.x - margin;
        coinLabelWindow.y = this._coinSpriteWindow.y;
        return coinLabelWindow;
    };

    Sprite_CoinWindow.prototype.createCoinLabelBitmapWindow = function(width, height) {
        const size = Poker.standardSize();
        const coinLabelWindowBitmap = new Bitmap(width, height);
        const context = coinLabelWindowBitmap._context;
        context.beginPath();

        coinLabelWindowBitmap.fontSize = size * 0.35;
        coinLabelWindowBitmap.textColor = "#000000";
        coinLabelWindowBitmap.outlineWidth = 1;

        return coinLabelWindowBitmap;
    };

    Sprite_CoinWindow.prototype.createLabelBitmap = function(label, width, height) {
        const size = Poker.standardSize();
        const coinLabelBitmap = new Bitmap(width, height);
        const context = coinLabelBitmap._context;
        context.beginPath();

        coinLabelBitmap.fontSize = size * 0.5;
        coinLabelBitmap.drawText(label, 0, 0, width, height);
        return coinLabelBitmap;
    };

    Sprite_CoinWindow.prototype.refresh = function() {
        this.refreshCoin();
    };

    Sprite_CoinWindow.prototype.refreshCoin = function() {
        const coinTextBitmap = this._coinLabelSpriteWindow._bitmap;
        const width = coinTextBitmap.width;
        const height = coinTextBitmap.height;
        coinTextBitmap.clear();
        coinTextBitmap.drawText(this._coin, 0, 0, width, height, "right");
    };

    Sprite_CoinWindow.prototype.setCoin = function(coin) {
        this._coin = coin;
        this.refresh();
    };

    Sprite_CoinWindow.prototype.drawLabel = function(label) {
        const size = Poker.standardSize();
        const margin = Poker.boxMargin();
        const width = size * 5;
        const height = this._coinSpriteWindow.height * 1.5;

        const coinLabelBitmap = this.createLabelBitmap(label, width, height);
        const coinLabel = new Sprite(coinLabelBitmap);
        coinLabel.x = margin;
        coinLabel.y = margin * 1.5;
        coinLabel.scale.x = 0.8
        coinLabel.scale.y = 0.7
        this.addChild(coinLabel);
    };

    Sprite_CoinWindow.prototype.getCoin = function() {
        return this._coin;
    };


    //-----------------------------------------------------------------------------
    // Scene_Poker
    //-----------------------------------------------------------------------------
    function Scene_Poker() {
        this.initialize(...arguments);
    }

    Scene_Poker.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_Poker.prototype.constructor = Scene_Poker;

    Scene_Poker.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
        this._pokerStatus = PokerStatus.initSet;
    };

    Scene_Poker.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.createPokerSpriteWindow();
        this.createWindowLayer();
        this.createPokerCard();
        this.createHelpWindow();
        this._poker.createCoinSpriteWindow(this._helpWindow);
        this.createCardChangeCommand(1);
        this.createCardChangeCommand(2);
        this.createCardChangeCommand(3);
        this.createCardChangeCommand(4);
        this.createCardChangeCommand(5);
        this.createDistributeCommand();
        this.createReplayCommand();
        this.createDoubleUpCommand();
        this.createBigSmallCommand();
    };

    Scene_Poker.prototype.start = function() {
        Scene_Base.prototype.start.call(this);
        this._cardChangeCommand1.hide();
        this._cardChangeCommand2.hide();
        this._cardChangeCommand3.hide();
        this._cardChangeCommand4.hide();
        this._cardChangeCommand5.hide();
        this._distributeCommand.hide();
        this._doubleUpCommandWindow.hide();
        this._replayCommandWindow.hide();
        this._bigSmallCommandWindow.hide();

        this._cardChangeCommand1.deactivate();
        this._cardChangeCommand2.deactivate();
        this._cardChangeCommand3.deactivate();
        this._cardChangeCommand4.deactivate();
        this._cardChangeCommand5.deactivate();
        this._distributeCommand.deactivate();
        this._doubleUpCommandWindow.deactivate();
        this._replayCommandWindow.deactivate();
        this._bigSmallCommandWindow.deactivate();
    };

    Scene_Poker.prototype.initSetCard = function() {
        this._cardInfos = [];
        this._backCard = [1, 2, 3, 4, 5];
        this._pokerStatus = PokerStatus.viewCard;
        this._judge = false;
        this._doubleUp = false;
        this._doubleUpType = DoubleUpType.none;

        this.setCardInfo();
    };

    Scene_Poker.prototype.setCardInfo = function() {
        const cardInfos = [
            Poker.cardInfo1,
            Poker.cardInfo2,
            Poker.cardInfo3,
            Poker.cardInfo4
        ];

        let cardNo = 0;
        const numbers = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"];

        for (cardInfo of cardInfos) {
            const bitmap = ImageManager.loadPicture(cardInfo.cardPictureFile);
            ++cardNo;

            for (number of numbers) {
                const bitmapCardInfo = {
                    number: Number(number),
                    cardNo: cardNo,
                    drawNumber: this.drawNumberConvert(number),
                    bitmap: bitmap,
                    textColor: this.textColor(cardInfo)
                };
                this._cardInfos.push(bitmapCardInfo);
            }
        }

        const jokerBitmapCardInfo = {
            number: Poker.jokerNumber(),
            cardNo: Poker.jokerCardNo(),
            drawNumber: "JOKER",
            bitmap: ImageManager.loadPicture(Poker.jokerCardInfo.cardPictureFile),
            textColor: this.textColor(Poker.jokerCardInfo)
        };

        this._cardInfos.push(jokerBitmapCardInfo);
        this._cardInfos.push(jokerBitmapCardInfo);

        this.shuffle();
    };

    Scene_Poker.prototype.drawNumberConvert = function(number) {
        switch (number) {
            case "11":
                return "J";
            case "12":
                return "Q";
            case "13":
                return "K";
            case "14":
                return "A";
            default:
                return number;
        }
    };

    Scene_Poker.prototype.shuffle = function() {
        let shuffleCard = [];
        const shuffleMaxCount = 5;

        for (let count = 0; count < shuffleMaxCount; ++count) {
            while (this._cardInfos.length) {
                const index = Math.random() * this._cardInfos.length >> 0;
                const cardInfo = this._cardInfos.splice(index, 1)[0];
                shuffleCard.push(cardInfo);
            }
            this._cardInfos = shuffleCard;
            shuffleCard = [];
        }
    };

    Scene_Poker.prototype.createCardChangeCommand = function(cardNo) {
        const rect = this.cardChangeCommandRect(cardNo);

        switch (cardNo) {
            case 1:
                this._cardChangeCommand1 = new Window_CardChangeCommand(rect);
                this._cardChangeCommand1.setHandler('selectChange', this.selectChange.bind(this));
                this._cardChangeCommand1.setHandler("right", this.selectRightCommand.bind(this));
                this._cardChangeCommand1.setHandler("left", this.selectLeftCommand.bind(this));
                this.addWindow(this._cardChangeCommand1);
                break;
            case 2:
                this._cardChangeCommand2 = new Window_CardChangeCommand(rect);
                this._cardChangeCommand2.setHandler('selectChange', this.selectChange.bind(this));
                this._cardChangeCommand2.setHandler("right", this.selectRightCommand.bind(this));
                this._cardChangeCommand2.setHandler("left", this.selectLeftCommand.bind(this));
                this.addWindow(this._cardChangeCommand2);
                break;
            case 3:
                this._cardChangeCommand3 = new Window_CardChangeCommand(rect);
                this._cardChangeCommand3.setHandler('selectChange', this.selectChange.bind(this));
                this._cardChangeCommand3.setHandler("right", this.selectRightCommand.bind(this));
                this._cardChangeCommand3.setHandler("left", this.selectLeftCommand.bind(this));
                this.addWindow(this._cardChangeCommand3);
                break;
            case 4:
                this._cardChangeCommand4 = new Window_CardChangeCommand(rect);
                this._cardChangeCommand4.setHandler('selectChange', this.selectChange.bind(this));
                this._cardChangeCommand4.setHandler("right", this.selectRightCommand.bind(this));
                this._cardChangeCommand4.setHandler("left", this.selectLeftCommand.bind(this));
                this.addWindow(this._cardChangeCommand4);
                break;
            case 5:
                this._cardChangeCommand5 = new Window_CardChangeCommand(rect);
                this._cardChangeCommand5.setHandler('selectChange', this.selectChange.bind(this));
                this._cardChangeCommand5.setHandler("right", this.selectRightCommand.bind(this));
                this._cardChangeCommand5.setHandler("left", this.selectLeftCommand.bind(this));
                this.addWindow(this._cardChangeCommand5);
                break;
        }
    };

    Scene_Poker.prototype.cardChangeCommandRect = function(cardNo) {
        const margin = Poker.boxMargin() * 2;
        let wx = 0;
        let wy = 0;
        let ww = 0;
        const wh = this.calcWindowHeight(1, true);

        switch (cardNo) {
            case 1:
                wx = this._pokerCard1.x + margin;
                wy = this._pokerCard1.y + this._pokerCard1.height;
                ww = this._pokerCard1.width - margin * 2 - Poker.boxMargin();
                break;
            case 2:
                wx = this._pokerCard2.x + margin;
                wy = this._pokerCard2.y + this._pokerCard2.height;
                ww = this._pokerCard2.width - margin * 2 - Poker.boxMargin();
                break;
            case 3:
                wx = this._pokerCard3.x + margin;
                wy = this._pokerCard3.y + this._pokerCard3.height;
                ww = this._pokerCard3.width - margin * 2 - Poker.boxMargin();
                break;
            case 4:
                wx = this._pokerCard4.x + margin;
                wy = this._pokerCard4.y + this._pokerCard4.height;
                ww = this._pokerCard4.width - margin * 2 - Poker.boxMargin();
                break;
            case 5:
                wx = this._pokerCard5.x + margin;
                wy = this._pokerCard5.y + this._pokerCard5.height;
                ww = this._pokerCard5.width - margin * 2 - Poker.boxMargin();
                break;
        }
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_Poker.prototype.createDistributeCommand = function() {
        const rect = this.distributeCommandRect();

        this._distributeCommand = new Window_DistributeCommand(rect);
        this._distributeCommand.setHandler('distribute', this.distribute.bind(this));
        this._distributeCommand.setHandler("right", this.selectRightCommand.bind(this));
        this._distributeCommand.setHandler("left", this.selectLeftCommand.bind(this));
        this.addWindow(this._distributeCommand);
    };

    Scene_Poker.prototype.distributeCommandRect = function() {
        const margin = Poker.boxMargin() * 2;
        const wx = this._cardChangeCommand5.x + this._cardChangeCommand5.width + margin * 4;
        const wy = this._cardChangeCommand5.y;
        const ww = this._cardChangeCommand5.width;
        const wh = this.calcWindowHeight(1, true);

        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_Poker.prototype.createDoubleUpCommand = function() {
        const rect = this.selectCommandWindowRect();
        this._doubleUpCommandWindow = new Window_SelectCommand(rect);
        this._doubleUpCommandWindow.setHandler('yes', this.doubleUpCommand.bind(this));
        this._doubleUpCommandWindow.setHandler('no', this.doubleUpCancelCommand.bind(this));
        this._doubleUpCommandWindow.setHandler('cancel', this.doubleUpCancelCommand.bind(this));
        this.addWindow(this._doubleUpCommandWindow);
        this._doubleUpCommandWindow.x = Graphics.boxWidth - this._doubleUpCommandWindow.width;
        this._doubleUpCommandWindow.y = this._helpWindow.y - this._doubleUpCommandWindow.height;
    };

    Scene_Poker.prototype.createReplayCommand = function() {
        const rect = this.selectCommandWindowRect();
        this._replayCommandWindow = new Window_SelectCommand(rect);
        this._replayCommandWindow.setHandler('yes', this.replayCommand.bind(this));
        this._replayCommandWindow.setHandler('no', this.popScene.bind(this));
        this._replayCommandWindow.setHandler('cancel', this.popScene.bind(this));
        this.addWindow(this._replayCommandWindow);
        this._replayCommandWindow.x = Graphics.boxWidth - this._replayCommandWindow.width;
        this._replayCommandWindow.y = this._helpWindow.y - this._replayCommandWindow.height;
    };

    Scene_Poker.prototype.createBigSmallCommand = function() {
        const rect = this.selectCommandWindowRect();
        this._bigSmallCommandWindow = new Window_BigSmallCommand(rect);
        this._bigSmallCommandWindow.setHandler('big', this.bigCommand.bind(this));
        this._bigSmallCommandWindow.setHandler('small', this.smallCommand.bind(this));
        this.addWindow(this._bigSmallCommandWindow);
        this._bigSmallCommandWindow.x = Graphics.boxWidth - this._bigSmallCommandWindow.width;
        this._bigSmallCommandWindow.y = this._helpWindow.y - this._bigSmallCommandWindow.height;
    };

    Scene_Poker.prototype.selectCommandWindowRect = function() {
        const wx = 0;
        const wy = 0;
        const ww = 200;
        const wh = this.calcWindowHeight(2, true);
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_Poker.prototype.selectChange = function() {
        switch (this._commandIndex) {
            case 1:
                this._cardChangeCommand1.selectChange();
                this._cardChangeCommand1.activate();
                break;
            case 2:
                this._cardChangeCommand2.selectChange();
                this._cardChangeCommand2.activate();
                break;
            case 3:
                this._cardChangeCommand3.selectChange();
                this._cardChangeCommand3.activate();
                break;
            case 4:
                this._cardChangeCommand4.selectChange();
                this._cardChangeCommand4.activate();
                break;
            case 5:
                this._cardChangeCommand5.selectChange();
                this._cardChangeCommand5.activate();
                break;
        }
    };

    Scene_Poker.prototype.selectRightCommand = function() {
        switch (this._commandIndex) {
            case 1:
                this._cardChangeCommand2.activate();
                this._commandIndex = 2;
                break;
            case 2:
                this._cardChangeCommand3.activate();
                this._commandIndex = 3;
                break;
            case 3:
                this._cardChangeCommand4.activate();
                this._commandIndex = 4;
                break;
            case 4:
                this._cardChangeCommand5.activate();
                this._commandIndex = 5;
                break;
            case 5:
                this._distributeCommand.activate();
                this._commandIndex = 6;
                break;
            case 6:
                this._cardChangeCommand1.activate();
                this._commandIndex = 1;
                break;
        }
    };

    Scene_Poker.prototype.selectLeftCommand = function() {
        switch (this._commandIndex) {
            case 1:
                this._distributeCommand.activate();
                this._commandIndex = 6;
                break;
            case 2:
                this._cardChangeCommand1.activate();
                this._commandIndex = 1;
                break;
            case 3:
                this._cardChangeCommand2.activate();
                this._commandIndex = 2;
                break;
            case 4:
                this._cardChangeCommand3.activate();
                this._commandIndex = 3;
                break;
            case 5:
                this._cardChangeCommand4.activate();
                this._commandIndex = 4;
                break;
            case 6:
                this._cardChangeCommand5.activate();
                this._commandIndex = 5;
                break;
        }
    };

    Scene_Poker.prototype.distribute = function() {
        this._judge = true;
        this._backCard = [];

        if (this._cardChangeCommand1.isChange()) {
            this._backCard.push(1);
            this._pokerCard1.clear();
        }

        if (this._cardChangeCommand2.isChange()) {
            this._backCard.push(2);
            this._pokerCard2.clear();
        }

        if (this._cardChangeCommand3.isChange()) {
            this._backCard.push(3);
            this._pokerCard3.clear();
        }

        if (this._cardChangeCommand4.isChange()) {
            this._backCard.push(4);
            this._pokerCard4.clear();
        }

        if (this._cardChangeCommand5.isChange()) {
            this._backCard.push(5);
            this._pokerCard5.clear();
        }

        this._cardChangeCommand1.hide();
        this._cardChangeCommand2.hide();
        this._cardChangeCommand3.hide();
        this._cardChangeCommand4.hide();
        this._cardChangeCommand5.hide();
        this._distributeCommand.hide();
        this._cardChangeCommand1.deactivate();
        this._cardChangeCommand2.deactivate();
        this._cardChangeCommand3.deactivate();
        this._cardChangeCommand4.deactivate();
        this._cardChangeCommand5.deactivate();
        this._distributeCommand.deactivate();

        this._pokerStatus = PokerStatus.openStart;
    };

    Scene_Poker.prototype.doubleUpSetCard = function(main) {
        this._doubleUp = true;
        this._judge = false;
        this._backCard = [];

        if (main) {
            this._backCard.push(1);
            this.setCardInfo();

            this._pokerCard1.clear();
            this._pokerCard2.clear();

            this._doubleUpType = DoubleUpType.none;
        } else {
            this._backCard.push(2);
        }

        this._pokerCard3.hide();
        this._pokerCard4.hide();
        this._pokerCard5.hide();

        this._doubleUpCommandWindow.hide();
        this._doubleUpCommandWindow.deactivate();

        this._pokerStatus = PokerStatus.openStart;
    };

    Scene_Poker.prototype.doubleUp = function() {
        this._helpWindow.setText(Poker.doubleUpSelectMsg);

        this._bigSmallCommandWindow.show();
        this._bigSmallCommandWindow.activate();
        this._bigSmallCommandWindow.forceSelect(0);

    };

    Scene_Poker.prototype.textColor = function(cardInfo) {
        let color = "";
        switch (cardInfo.colorType) {
            case 0:
                color = ColorManager.textColor(cardInfo.colorNo);
                break;
            case 1:
                color = cardInfo.colorCode;
                break;
            case 2:
                color = "rgb(%1,%2,%3)";
                color = color.format(cardInfo.rgbR, cardInfo.rgbG, cardInfo.rgbB);
                break;
        }
        return color;
    };

    Scene_Poker.prototype.createPokerSpriteWindow = function() {
        const size = Poker.standardSize();
        const width = Poker.uiAreaWidth();
        const height = Poker.uiAreaHeight();
        const pokerWindowBitmap = new Bitmap(width, height);
        const context = pokerWindowBitmap._context;
        context.beginPath();

        const fillGrad = context.createLinearGradient(0, 0, width, height);
        fillGrad.addColorStop(0.0, "#006400");
        fillGrad.addColorStop(0.5, "#98fb98");
        fillGrad.addColorStop(1.0, "#006400");
        context.fillStyle = fillGrad;

        context.rect(0, 0, width, height);
        context.fill();

        this._poker = new Sprite_Poker(pokerWindowBitmap);
        this.addChild(this._poker);
    };

    Scene_Poker.prototype.createPokerCard = function() {
        const size = Poker.standardSize();
        const margin = Poker.boxMargin() * 2;

        const cardBitmap1 = this.createCardBitmap();
        this._pokerCard1 = new Sprite_PokerCard(cardBitmap1);
        this.cardPos(1);

        const cardBitmap2 = this.createCardBitmap();
        this._pokerCard2 = new Sprite_PokerCard(cardBitmap2);
        this.cardPos(2);

        const cardBitmap3 = this.createCardBitmap();
        this._pokerCard3 = new Sprite_PokerCard(cardBitmap3);
        this.cardPos(3);

        const cardBitmap4 = this.createCardBitmap();
        this._pokerCard4 = new Sprite_PokerCard(cardBitmap4);
        this.cardPos(4);

        const cardBitmap5 = this.createCardBitmap();
        this._pokerCard5 = new Sprite_PokerCard(cardBitmap5);
        this.cardPos(5);

        this.addChild(this._pokerCard1);
        this.addChild(this._pokerCard2);
        this.addChild(this._pokerCard3);
        this.addChild(this._pokerCard4);
        this.addChild(this._pokerCard5);
    };

    Scene_Poker.prototype.createCardBitmap = function() {
        const size = Poker.standardSize();
        const margin = Poker.boxMargin() * 2;
        const width = size * 2.5 - margin * 2;
        const height = size * 3;

        const cardBitmap = new Bitmap(width, height);
        this.createCardPicture(cardBitmap);

        return cardBitmap;
    };

    Scene_Poker.prototype.createCardPicture = function(bitmap) {
        const width = bitmap.width;
        const height = bitmap.height;
        const radius = 10;

        const context = bitmap._context;
        context.beginPath();
        context.lineWidth = 1;

        context.moveTo(0, radius);
        context.arc(radius, height - radius, radius, Math.PI, Math.PI * 0.5, true);
        context.arc(width - radius, height - radius, radius, Math.PI * 0.5, 0, 1);
        context.arc(width - radius, radius, radius, 0, Math.PI * 1.5, 1);
        context.arc(radius, radius, radius, Math.PI * 1.5, Math.PI, 1);
        context.closePath();

        context.fillStyle = "#ffffff";
        context.strokeStyle = "#ffffff";

        context.stroke();
        context.fill();
    };

    Scene_Poker.prototype.createHelpWindow = function() {
        Scene_MenuBase.prototype.createHelpWindow.call(this);
        this._helpWindow.y = Graphics.boxHeight - this._helpWindow.height;
    };

    Scene_Poker.prototype.update = function() {
        Scene_MenuBase.prototype.update.call(this);

        if (this._pokerStatus === PokerStatus.initSet) {
            if (Poker.coin > 0) {
                this.initSet();
            } else {
                this.notEnoughCoin();
            }

        } else if (this._pokerStatus === PokerStatus.viewCard) {
            this.viewCard();
        } else if (this._pokerStatus === PokerStatus.bet) {
            if (Input.isRepeated("up")) {
                if (this._poker.isMaxBet() || Poker.coin === 0) {
                    this._pokerStatus = PokerStatus.openStart;
                } else {
                    this._poker.bet();
                }
            }

            if (Input.isRepeated("ok")) {
                if (this._poker.isBet()) {
                    this._pokerStatus = PokerStatus.openStart;
                }
            }

            if (Input.isRepeated("cancel") && !this._poker.isBet()) {
                this.popScene();
            }
        } else if (this._pokerStatus === PokerStatus.openStart) {
            this.openCardStart();
        } else if (this._pokerStatus === PokerStatus.opening) {
            this.openingCard();
            AudioManager.stopSe();
            AudioManager.playSe({
                "name": "Book1",
                "volume": 90,
                "pitch": 200,
                "pan": 0
            });
        } else if (this._pokerStatus === PokerStatus.open) {
            this.openCard();
        } else if (this._pokerStatus === PokerStatus.openCheck) {
            this.judge();
            if (this._pokerStatus === PokerStatus.openCheck) {
                this._pokerStatus = PokerStatus.cardSelect;
            }
        } else if (this._pokerStatus === PokerStatus.cardSelect) {
            this.cardSelect();
            this._helpWindow.setText(Poker.helpMsg2);
        } else if (this._pokerStatus === PokerStatus.victoryMeWait) {
            if (Input.isRepeated("ok")) {
                AudioManager.stopMe();
                if (this._judge || this._doubleUp) {
                    this._pokerStatus = PokerStatus.msgWait;
                } else {
                    this._pokerStatus = PokerStatus.cardSelect;
                }
            }
        } else if (this._pokerStatus === PokerStatus.judge) {
            const winCoin = this.judge();
            this._poker.setWinCoin(winCoin);
            const winResult = this.result();

            if (!winResult) {
                this._pokerStatus = PokerStatus.msgWait;
            }
        } else if (this._pokerStatus === PokerStatus.msgWait) {
            if (this._msgType === PokerMsgType.winMsg) {
                this.nextCommandMsg();
            } else if (this._msgType === PokerMsgType.lostMsg) {
                if (Input.isRepeated("ok")) {
                    this.nextCommandMsg();
                }
            } else if (this._msgType === PokerMsgType.drawMsg) {
                if (Input.isRepeated("ok")) {
                    this.doubleUpCommand();
                }
            } else if (this._msgType === PokerMsgType.exit) {
                if (Input.isRepeated("ok")) {
                    this.popScene();
                }
            }
        } else if (this._pokerStatus === PokerStatus.doubleUp) {
            this.doubleUp();
            this._pokerStatus = PokerStatus.none;
        } else if (this._pokerStatus === PokerStatus.doubleUpJudge) {
            const winCoin = this.doubleUpJudge();

            if (winCoin < 0) {
                this._helpWindow.setText(Poker.drawMsg);
                this._pokerStatus = PokerStatus.msgWait;
                this._msgType = PokerMsgType.drawMsg;
            } else {
                this._poker.setWinCoin(winCoin);
                const winResult = this.result();

                if (!winResult) {
                    this._pokerStatus = PokerStatus.msgWait;
                }
            }
        } else if (this._pokerStatus === PokerStatus.doubleUpCancel) {
            if (Input.isRepeated("ok")) {
                AudioManager.stopMe();
                this._poker.clear();
                this._replayCommandWindow.show();
                this._replayCommandWindow.activate();
                this._helpWindow.setText(Poker.replayMsg);
                this._pokerStatus = PokerStatus.none;
            }
        }
    };

    Scene_Poker.prototype.initSet = function() {
        this._cardIndex = 0;
        this._frameCount = 0;
        this._commandIndex = 1;

        this._pokerCard1.clear();
        this._pokerCard2.clear();
        this._pokerCard3.clear();
        this._pokerCard4.clear();
        this._pokerCard5.clear();

        this._cardChangeCommand1.clear();
        this._cardChangeCommand2.clear();
        this._cardChangeCommand3.clear();
        this._cardChangeCommand4.clear();
        this._cardChangeCommand5.clear();

        this._pokerCard1.hide();
        this._pokerCard2.hide();
        this._pokerCard3.hide();
        this._pokerCard4.hide();
        this._pokerCard5.hide();

        this.initSetCard();
        this._msgType = PokerMsgType.none;

        this._helpWindow.setText(Poker.helpMsg1);
        this._helpWindow.hide();
    };

    Scene_Poker.prototype.viewCard = function() {
        if (this._frameCount > Poker.frame()) {
            ++this._cardIndex;
            switch (this._cardIndex) {
                case 1:
                    this._pokerCard1.show();
                    break;
                case 2:
                    this._pokerCard2.show();
                    break;
                case 3:
                    this._pokerCard3.show();
                    break;
                case 4:
                    this._pokerCard4.show();
                    break;
                case 5:
                    this._pokerCard5.show();
                    this._pokerStatus = PokerStatus.bet;
                    this._helpWindow.show();
                    this.clearCardIndex();
                    this.resetFrameCount();
                    return;
            }
            this.resetFrameCount();
        }
        ++this._frameCount;
    };

    Scene_Poker.prototype.openCardStart = function() {
        if (this._frameCount > Poker.openCardFrame()) {
            ++this._cardIndex;
            if (this._backCard.includes(this._cardIndex)) {

                const size = Poker.standardSize();

                switch (this._cardIndex) {
                    case 1:
                        this._pokerCard1.scale.x = 0.5;
                        this._pokerCard1.x += size * 0.25;
                        this._pokerStatus = PokerStatus.opening;
                        break;
                    case 2:
                        this._pokerCard2.scale.x = 0.5;
                        this._pokerCard2.x += size * 0.25;
                        this._pokerStatus = PokerStatus.opening;
                        break;
                    case 3:
                        this._pokerCard3.scale.x = 0.5;
                        this._pokerCard3.x += size * 0.25;
                        this._pokerStatus = PokerStatus.opening;
                        break;
                    case 4:
                        this._pokerCard4.scale.x = 0.5;
                        this._pokerCard4.x += size * 0.25;
                        this._pokerStatus = PokerStatus.opening;
                        break;
                    case 5:
                        this._pokerCard5.scale.x = 0.5;
                        this._pokerCard5.x += size * 0.25;
                        this._pokerStatus = PokerStatus.opening;
                        this.resetFrameCount();
                        return;
                }
                this.resetFrameCount();
            } else {
                if (this._cardIndex === 5) {
                    if (this._judge) {
                        this._pokerStatus = PokerStatus.judge;
                    } else if (this._doubleUp) {
                        if (this._doubleUpType === DoubleUpType.none) {
                            this._pokerStatus = PokerStatus.doubleUp;
                        } else {
                            this._pokerStatus = PokerStatus.doubleUpJudge;
                        }
                    }

                    this.clearCardIndex();
                    this.resetFrameCount();
                    return;
                }
            }
        }
        ++this._frameCount;
    };

    Scene_Poker.prototype.openingCard = function() {
        if (this._frameCount > Poker.openCardFrame()) {
            switch (this._cardIndex) {
                case 1:
                    this._pokerCard1.clear();
                    this.createCardPicture(this._pokerCard1._bitmap);
                    this._pokerCard1.createFrontCardPicture(this.getDrawFrontCardInfo());
                    this._pokerStatus = PokerStatus.open;
                    break;
                case 2:
                    this._pokerCard2.clear();
                    this.createCardPicture(this._pokerCard2._bitmap);
                    this._pokerCard2.createFrontCardPicture(this.getDrawFrontCardInfo());
                    this._pokerStatus = PokerStatus.open;
                    break;
                case 3:
                    this._pokerCard3.clear();
                    this.createCardPicture(this._pokerCard3._bitmap);
                    this._pokerCard3.createFrontCardPicture(this.getDrawFrontCardInfo());
                    this._pokerStatus = PokerStatus.open;
                    break;
                case 4:
                    this._pokerCard4.clear();
                    this.createCardPicture(this._pokerCard4._bitmap);
                    this._pokerCard4.createFrontCardPicture(this.getDrawFrontCardInfo());
                    this._pokerStatus = PokerStatus.open;
                    break;
                case 5:
                    this._pokerCard5.clear();
                    this.createCardPicture(this._pokerCard5._bitmap);
                    this._pokerCard5.createFrontCardPicture(this.getDrawFrontCardInfo());
                    this._pokerStatus = PokerStatus.open;
                    this.resetFrameCount();
                    return;
            }
            this.resetFrameCount();
        }
        ++this._frameCount;
    };

    Scene_Poker.prototype.openCard = function() {
        if (this._frameCount > Poker.openCardFrame()) {
            switch (this._cardIndex) {
                case 1:
                    this._pokerCard1.scale.x = 1;
                    this.cardPos(this._cardIndex)
                    this._pokerStatus = PokerStatus.openStart;
                    break;
                case 2:
                    this._pokerCard2.scale.x = 1;
                    this.cardPos(this._cardIndex)
                    this._pokerStatus = PokerStatus.openStart;
                    break;
                case 3:
                    this._pokerCard3.scale.x = 1;
                    this.cardPos(this._cardIndex)
                    this._pokerStatus = PokerStatus.openStart;
                    break;
                case 4:
                    this._pokerCard4.scale.x = 1;
                    this.cardPos(this._cardIndex)
                    this._pokerStatus = PokerStatus.openStart;
                    break;
                case 5:
                    this._pokerCard5.scale.x = 1;
                    this.cardPos(this._cardIndex)
                    if (this._judge) {
                        this._pokerStatus = PokerStatus.judge;
                    } else {
                        this._pokerStatus = PokerStatus.openCheck;
                    }
                    this.clearCardIndex();
                    this.resetFrameCount();
                    return;
            }
            this.resetFrameCount();
        }
        ++this._frameCount;
    };

    Scene_Poker.prototype.judge = function() {
        const cardInfos = [];
        const cardInfo1 = this._pokerCard1.cardInfo();
        const cardInfo2 = this._pokerCard2.cardInfo();
        const cardInfo3 = this._pokerCard3.cardInfo();
        const cardInfo4 = this._pokerCard4.cardInfo();
        const cardInfo5 = this._pokerCard5.cardInfo();

        cardInfos.push(cardInfo1);
        cardInfos.push(cardInfo2);
        cardInfos.push(cardInfo3);
        cardInfos.push(cardInfo4);
        cardInfos.push(cardInfo5);

        cardInfos.sort((a, b) => a.number - b.number);

        let coin = 0;
        if (this.judgeRoyalStraight(cardInfos)) {
            this.playVictory();
            this._poker.setWinIndex(1);
            coin = Poker.royalStraight;
        } else if (this.judgeFiveCard(cardInfos)) {
            this.playVictory();
            this._poker.setWinIndex(2);
            coin = Poker.fiveCard;
        } else if (this.judgeStraightFlush(cardInfos)) {
            this.playVictory();
            this._poker.setWinIndex(3);
            coin = Poker.straightFlush;
        } else if (this.judgeFourCard(cardInfos)) {
            this.playVictory();
            this._poker.setWinIndex(4);
            coin = Poker.fourCard;
        } else if (this.judgeFullHouse(cardInfos)) {
            this.playVictory();
            this._poker.setWinIndex(5);
            coin = Poker.fullHouse;
        } else if (this.judgeFlush(cardInfos)) {
            this.playVictory();
            this._poker.setWinIndex(6);
            coin = Poker.flush;
        } else if (this.judgeStraight(cardInfos)) {
            this.playVictory();
            this._poker.setWinIndex(7);
            coin = Poker.straight;
        } else if (this.judgeThreeCard(cardInfos)) {
            this.playVictory();
            this._poker.setWinIndex(8);
            coin = Poker.threeCard;
        } else if (this.judgeTwoPair(cardInfos)) {
            this.playVictory();
            this._poker.setWinIndex(9);
            coin = Poker.twoPair;
        } else if (this.judgeJoker(cardInfos)) {
            this.playVictory();
            this._poker.setWinIndex(10);
            coin = Poker.joker;
        }

        return coin * this._poker.betCoin();
    };

    Scene_Poker.prototype.judgeRoyalStraight = function(cardInfos) {
        let gudgeFlg = false;
        let jokerNum = this.checkJoker(cardInfos);
        const targetInfos = this.filterJoker(cardInfos);

        let index = 0;
        let checkNumber = 10;
        while (index < targetInfos.length) {
            const targetInfo = targetInfos[index];
            gudgeFlg = this.checkNumber(targetInfo, checkNumber);

            if (gudgeFlg) {
                ++index;
            } else {
                if (jokerNum > 0) {
                    --jokerNum;
                    gudgeFlg = true;
                } else {
                    break;
                }
            }
            ++checkNumber;
        }

        if (gudgeFlg) {
            gudgeFlg = this.checkCardNo(cardInfos);
        }

        return gudgeFlg;
    };

    Scene_Poker.prototype.judgeFiveCard = function(cardInfos) {
        let gudgeFlg = false;
        let jokerNum = this.checkJoker(cardInfos);
        const targetInfos = this.filterJoker(cardInfos);

        const targetInfo = targetInfos[0];
        let index = 0;
        let checkNumber = targetInfo.number;
        while (index < targetInfos.length) {
            const targetInfo = targetInfos[index];
            gudgeFlg = this.checkNumber(targetInfo, checkNumber);

            if (gudgeFlg) {
                ++index;
            } else {
                if (jokerNum > 0) {
                    --jokerNum;
                    gudgeFlg = true;
                } else {
                    break;
                }
            }
        }
        return gudgeFlg;
    };

    Scene_Poker.prototype.judgeStraightFlush = function(cardInfos) {
        let gudgeFlg = false;
        let jokerNum = this.checkJoker(cardInfos);
        const targetInfos = this.filterJoker(cardInfos);

        let index = 0;
        let checkNumber = targetInfos[0].number;
        while (index < targetInfos.length) {
            const targetInfo = targetInfos[index];
            gudgeFlg = this.checkNumber(targetInfo, checkNumber);

            if (!gudgeFlg) {
                gudgeFlg = this.checkNumber(targetInfo, checkNumber + 8);
            }

            if (gudgeFlg) {
                ++index;
            } else {
                if (jokerNum > 0) {
                    --jokerNum;
                    gudgeFlg = true;
                } else {
                    break;
                }
            }
            ++checkNumber;
        }

        if (gudgeFlg) {
            gudgeFlg = this.checkCardNo(cardInfos);
        }

        return gudgeFlg;
    };

    Scene_Poker.prototype.judgeFourCard = function(cardInfos) {
        let gudgeFlg = false;
        let jokerNum = this.checkJoker(cardInfos);
        const targetInfos = this.filterJoker(cardInfos);

        let index = 0;
        let checkNumber = 0;
        let count = 0;

        while (index < targetInfos.length) {
            const targetInfo = targetInfos[index];

            if (checkNumber === 0) {
                checkNumber = targetInfo.number;
            }

            gudgeFlg = this.checkNumber(targetInfo, checkNumber);

            if (gudgeFlg) {
                ++count;
                if (count === 4) {
                    break;
                }
            } else if (count === 1) {
                count = 1;
                checkNumber = targetInfo.number;
            }
            ++index;
        }

        count += jokerNum;

        if (count === 4) {
            gudgeFlg = true;
        } else {
            gudgeFlg = false;
        }

        return gudgeFlg;
    };

    Scene_Poker.prototype.judgeFullHouse = function(cardInfos) {
        let gudgeFlg = false;
        let jokerNum = this.checkJoker(cardInfos);
        const targetInfos = this.filterJoker(cardInfos);

        let checkNumber1 = 0;
        let checkNumber2 = 0;
        let count1 = 0;
        let count2 = 0;

        for (const targetInfo of targetInfos) {
            if (checkNumber1 === 0) {
                checkNumber1 = targetInfo.number;
                ++count1;
            } else if (checkNumber1 === targetInfo.number) {
                ++count1;
            } else if (checkNumber2 === 0) {
                checkNumber2 = targetInfo.number;
                ++count2;
            } else if (checkNumber2 === targetInfo.number) {
                ++count2;
            }
        }

        const calcCount = count1 + count2 + jokerNum;

        if (calcCount === 5) {
            gudgeFlg = true;
        }

        return gudgeFlg;
    };

    Scene_Poker.prototype.judgeFlush = function(cardInfos) {
        const gudgeFlg = this.checkCardNo(cardInfos);

        return gudgeFlg;
    };

    Scene_Poker.prototype.judgeStraight = function(cardInfos) {
        let gudgeFlg = false;
        let jokerNum = this.checkJoker(cardInfos);
        const targetInfos = this.filterJoker(cardInfos);

        let index = 0;
        let checkNumber = targetInfos[0].number;
        while (index < targetInfos.length) {
            const targetInfo = targetInfos[index];
            gudgeFlg = this.checkNumber(targetInfo, checkNumber);

            if (!gudgeFlg) {
                gudgeFlg = this.checkNumber(targetInfo, checkNumber + 8);
            }

            if (gudgeFlg) {
                ++index;
            } else {
                if (jokerNum > 0) {
                    --jokerNum;
                    gudgeFlg = true;
                } else {
                    break;
                }
            }
            ++checkNumber;
        }

        return gudgeFlg;
    };

    Scene_Poker.prototype.judgeThreeCard = function(cardInfos) {
        let gudgeFlg = false;
        let jokerNum = this.checkJoker(cardInfos);
        const targetInfos = this.filterJoker(cardInfos);

        let index = 0;
        let checkNumber = 0;
        let count = 0;

        while (index < targetInfos.length) {
            const targetInfo = targetInfos[index];

            if (checkNumber === 0) {
                checkNumber = targetInfo.number;
            }

            gudgeFlg = this.checkNumber(targetInfo, checkNumber);

            if (gudgeFlg) {
                ++count;
                if (count === 3) {
                    break;
                }
            } else if (count === 1) {
                count = 1;
                checkNumber = targetInfo.number;
            }
            ++index;
        }

        count += jokerNum;

        if (count === 3) {
            gudgeFlg = true;
        } else {
            gudgeFlg = false;
        }

        return gudgeFlg;
    };

    Scene_Poker.prototype.judgeTwoPair = function(cardInfos) {
        let gudgeFlg = false;
        let targetInfos = this.filterJoker(cardInfos);

        let check1 = false;
        let check2 = false;

        for (const targetInfo of targetInfos) {
            infoLen = targetInfos.filter(info => info.number === targetInfo.number).length;
            targetInfos = targetInfos.filter(info => info.number !== targetInfo.number);
            if (!check1) {
                if (infoLen === 2) {
                    check1 = true;
                }
            } else if (!check2) {
                if (infoLen === 2) {
                    check2 = true;
                }
            }
        }

        if (check1 && check2) {
            gudgeFlg = true;
        }

        return gudgeFlg;
    };

    Scene_Poker.prototype.judgeJoker = function(cardInfos) {
        return this.checkJoker(cardInfos) > 0;
    };

    Scene_Poker.prototype.checkJoker = function(targetInfos) {
        const jokerCards = targetInfos.filter(cardInfo => cardInfo.number === Poker.jokerNumber());
        return jokerCards.length;
    };

    Scene_Poker.prototype.filterJoker = function(targetInfos) {
        return targetInfos.filter(cardInfo => cardInfo.number !== Poker.jokerNumber());
    };

    Scene_Poker.prototype.checkNumber = function(targetInfo, checkNumber) {
        let checkFlg = false;

        const number = targetInfo.number;

        if (number === checkNumber) {
            checkFlg = true;
        }

        return checkFlg;
    };

    Scene_Poker.prototype.checkCardNo = function(cardInfos) {
        let cardNo = 0;
        let checkFlg = true;

        for (const cardInfo of cardInfos) {
            if (cardNo === 0) {
                cardNo = cardInfo.cardNo;
            }

            if (cardNo !== cardInfo.cardNo && cardInfo.cardNo !== Poker.jokerCardNo()) {
                checkFlg = false;
                break;
            }
        }

        return checkFlg;
    };

    Scene_Poker.prototype.result = function() {
        const winCoin = this._poker.getWinCoin();
        const isWin = winCoin > 0;

        if (isWin) {
            if (this._judge) {
                this._helpWindow.setText(Poker.winMsg.format(this._poker.getWinType(), winCoin, Poker.coinNumUnit));
            } else if (this._doubleUp) {
                this._helpWindow.setText(Poker.winDoubleUpMsg.format(winCoin, Poker.coinNumUnit));
            }
            this._msgType = PokerMsgType.winMsg;
        } else {
            this._helpWindow.setText(Poker.lostMsg);
            this._msgType = PokerMsgType.lostMsg;
            this._poker.clear();
        }
        return isWin;
    };

    Scene_Poker.prototype.doubleUpJudge = function() {
        const cardInfo1 = this._pokerCard1.cardInfo();
        const cardInfo2 = this._pokerCard2.cardInfo();

        let doubleUpResult = false;

        if (this._doubleUpType === DoubleUpType.big) {
            doubleUpResult = cardInfo1.number < cardInfo2.number
        } else {
            doubleUpResult = cardInfo1.number > cardInfo2.number
        }

        let coin = 0;
        if (doubleUpResult) {
            this.playVictory();
            coin = this._poker.getWinCoin() * 2;
        }

        if (cardInfo1.number === cardInfo2.number) {
            coin = -1;
        }

        return coin;
    };

    Scene_Poker.prototype.nextCommandMsg = function() {
        switch (this._msgType) {
            case PokerMsgType.winMsg:
                this._doubleUpCommandWindow.show();
                this._doubleUpCommandWindow.activate();
                this._helpWindow.setText(Poker.doubleUpMsg.format(this._poker.getWinCoin() * 2, Poker.coinNumUnit));
                break;
            case PokerMsgType.lostMsg:
                this._replayCommandWindow.show();
                this._replayCommandWindow.activate();
                this._helpWindow.setText(Poker.replayMsg);
        }
        this._bigSmallCommandWindow.hide();
        this._bigSmallCommandWindow.deactivate();
        this._msgType = PokerMsgType.none;
    };

    Scene_Poker.prototype.cardPos = function(index) {
        const size = Poker.standardSize();
        const margin = Poker.boxMargin() * 2;

        switch (index) {
            case 1:
                this._pokerCard1.x = size * 2.5;
                this._pokerCard1.y = Poker.uiAreaHeight() * 0.5 - size;
                break;
            case 2:
                this._pokerCard2.x = this._pokerCard1.x + this._pokerCard1.width + margin;
                this._pokerCard2.y = this._pokerCard1.y;
                break;
            case 3:
                this._pokerCard3.x = this._pokerCard2.x + this._pokerCard2.width + margin;
                this._pokerCard3.y = this._pokerCard2.y;
                break;
            case 4:
                this._pokerCard4.x = this._pokerCard3.x + this._pokerCard3.width + margin;
                this._pokerCard4.y = this._pokerCard3.y;
                break;
            case 5:
                this._pokerCard5.x = this._pokerCard4.x + this._pokerCard4.width + margin;
                this._pokerCard5.y = this._pokerCard4.y;
                break;
        }
    };

    Scene_Poker.prototype.cardSelect = function() {
        this._cardChangeCommand1.show();
        this._cardChangeCommand2.show();
        this._cardChangeCommand3.show();
        this._cardChangeCommand4.show();
        this._cardChangeCommand5.show();
        this._distributeCommand.show();
        this._cardChangeCommand1.activate();
        this._pokerStatus = PokerStatus.none;
    };

    Scene_Poker.prototype.loadPicture = function() {
        this._pictures = [];
        const pictureNames = [Poker.cardInfo1.cardPictureFile,
            Poker.cardInfo2.cardPictureFile,
            Poker.cardInfo3.cardPictureFile,
            Poker.cardInfo4.cardPictureFile,
            Poker.jokerCardInfo.cardPictureFile
        ];

        for (const pictureName of pictureNames) {
            const bitmap = ImageManager.loadPicture(pictureName);
            this._pictures.push(bitmap);
        }
    };

    Scene_Poker.prototype.getDrawFrontCardInfo = function() {
        const index = Math.random() * this._cardInfos.length >> 0;
        const cardInfo = this._cardInfos[index];
        this._cardInfos = this._cardInfos.filter(item => item !== cardInfo);
        return cardInfo;
    };

    Scene_Poker.prototype.resetFrameCount = function() {
        this._frameCount = 0;
    };

    Scene_Poker.prototype.clearCardIndex = function() {
        this._cardIndex = 0;
    };

    Scene_Poker.prototype.playVictory = function() {
        this._pokerStatus = PokerStatus.victoryMeWait;
        AudioManager.playMe({
            "name": "Victory2",
            "volume": 90,
            "pitch": 100,
            "pan": 0
        });
    };

    Scene_Poker.prototype.doubleUpCommand = function() {
        this.doubleUpSetCard(true);
    };

    Scene_Poker.prototype.doubleUpCancelCommand = function() {
        AudioManager.playMe({
            "name": "Victory1",
            "volume": 90,
            "pitch": 100,
            "pan": 0
        });
        const winCoin = this._poker.getWinCoin();
        Poker.coin += winCoin;
        if (Poker.coin >= Poker.maxCoin()) {
            Poker.coin = Poker.maxCoin();
        }
        this._poker.refreshCoin();
        this._helpWindow.setText(Poker.acquiredMsg.format(winCoin, Poker.coinNumUnit));
        this._pokerStatus = PokerStatus.doubleUpCancel;

        this._doubleUpCommandWindow.hide();
        this._doubleUpCommandWindow.deactivate();
    };

    Scene_Poker.prototype.replayCommand = function() {
        this._pokerStatus = PokerStatus.initSet;
        this._replayCommandWindow.hide();
        this._replayCommandWindow.deactivate();
    };

    Scene_Poker.prototype.bigCommand = function() {
        this._doubleUpType = DoubleUpType.big;
        this.doubleUpSetCard(false);
    };

    Scene_Poker.prototype.smallCommand = function() {
        this._doubleUpType = DoubleUpType.small;
        this.doubleUpSetCard(false);
    };

    Scene_Poker.prototype.notEnoughCoin = function() {
        this._pokerCard1.clear();
        this._pokerCard2.clear();
        this._pokerCard3.clear();
        this._pokerCard4.clear();
        this._pokerCard5.clear();
        this._helpWindow.setText(Poker.notEnoughMsg);
        this._pokerStatus = PokerStatus.msgWait;
        this._msgType = PokerMsgType.exit;
    };


    //-----------------------------------------------------------------------------
    // Window_CardChangeCommand
    //-----------------------------------------------------------------------------
    function Window_CardChangeCommand() {
        this.initialize(...arguments);
    }

    Window_CardChangeCommand.prototype = Object.create(Window_HorzCommand.prototype);
    Window_CardChangeCommand.prototype.constructor = Window_CardChangeCommand;

    Window_CardChangeCommand.prototype.initialize = function(rect) {
        this._change = true;
        Window_HorzCommand.prototype.initialize.call(this, rect);
    };

    Window_CardChangeCommand.prototype.makeCommandList = function() {
        this.addCommand(this.command(), "selectChange", true);
    };

    Window_CardChangeCommand.prototype.command = function() {
        return this._change ? "かえる" : "のこす"
    };

    Window_CardChangeCommand.prototype.selectChange = function() {
        this._change = this._change ? false : true;
        this.refresh();
    };

    Window_CardChangeCommand.prototype.isChange = function() {
        return this._change;
    };

    Window_CardChangeCommand.prototype.processHandling = function() {
        Window_HorzCommand.prototype.processHandling.call(this);
        if (this.isOpenAndActive()) {
            if (this.isHandled("right") && Input.isTriggered("right")) {
                return this.processRight();
            }
            if (this.isHandled("left") && Input.isTriggered("left")) {
                return this.processLeft();
            }
        }
    };

    Window_CardChangeCommand.prototype.processRight = function() {
        SoundManager.playCursor();
        this.updateInputData();
        this.deactivate();
        this.callRightHandler();
    };

    Window_CardChangeCommand.prototype.processLeft = function() {
        SoundManager.playCursor();
        this.updateInputData();
        this.deactivate();
        this.callLeftHandler();
    };

    Window_CardChangeCommand.prototype.callRightHandler = function() {
        this.callHandler("right");
    };

    Window_CardChangeCommand.prototype.callLeftHandler = function() {
        this.callHandler("left");
    };

    Window_CardChangeCommand.prototype.maxCols = function() {
        return 1;
    };

    Window_CardChangeCommand.prototype._refreshBack = function() {
        //
    };

    Window_CardChangeCommand.prototype._refreshFrame = function() {
        //
    };

    Window_CardChangeCommand.prototype.clear = function() {
        this._change = true;
        this.refresh();
    }


    //-----------------------------------------------------------------------------
    // Window_DistributeCommand
    //-----------------------------------------------------------------------------
    function Window_DistributeCommand() {
        this.initialize(...arguments);
    }

    Window_DistributeCommand.prototype = Object.create(Window_HorzCommand.prototype);
    Window_DistributeCommand.prototype.constructor = Window_DistributeCommand;

    Window_DistributeCommand.prototype.initialize = function(rect) {
        Window_HorzCommand.prototype.initialize.call(this, rect);
    };

    Window_DistributeCommand.prototype.makeCommandList = function() {
        this.addCommand("くばる", "distribute", true);
    };

    Window_DistributeCommand.prototype.processHandling = function() {
        Window_HorzCommand.prototype.processHandling.call(this);
        if (this.isOpenAndActive()) {
            if (this.isHandled("right") && Input.isTriggered("right")) {
                return this.processRight();
            }
            if (this.isHandled("left") && Input.isTriggered("left")) {
                return this.processLeft();
            }
        }
    };

    Window_DistributeCommand.prototype.processRight = function() {
        SoundManager.playCursor();
        this.updateInputData();
        this.deactivate();
        this.callRightHandler();
    };

    Window_DistributeCommand.prototype.processLeft = function() {
        SoundManager.playCursor();
        this.updateInputData();
        this.deactivate();
        this.callLeftHandler();
    };

    Window_DistributeCommand.prototype.callRightHandler = function() {
        this.callHandler("right");
    };

    Window_DistributeCommand.prototype.callLeftHandler = function() {
        this.callHandler("left");
    };

    Window_DistributeCommand.prototype.maxCols = function() {
        return 1;
    };

    Window_DistributeCommand.prototype._refreshBack = function() {
        //
    };

    Window_DistributeCommand.prototype._refreshFrame = function() {
        //
    };


    //-----------------------------------------------------------------------------
    // Window_SelectCommand
    //-----------------------------------------------------------------------------
    function Window_SelectCommand() {
        this.initialize(...arguments);
    }

    Window_SelectCommand.prototype = Object.create(Window_Command.prototype);
    Window_SelectCommand.prototype.constructor = Window_SelectCommand;

    Window_SelectCommand.prototype.initialize = function(rect) {
        Window_HorzCommand.prototype.initialize.call(this, rect);
    };

    Window_SelectCommand.prototype.makeCommandList = function() {
        this.addCommand("はい", "yes");
        this.addCommand("いいえ", "no");
    };


    //-----------------------------------------------------------------------------
    // Window_BigSmallCommand
    //-----------------------------------------------------------------------------
    function Window_BigSmallCommand() {
        this.initialize(...arguments);
    }

    Window_BigSmallCommand.prototype = Object.create(Window_Command.prototype);
    Window_BigSmallCommand.prototype.constructor = Window_BigSmallCommand;

    Window_BigSmallCommand.prototype.initialize = function(rect) {
        Window_HorzCommand.prototype.initialize.call(this, rect);
    };

    Window_BigSmallCommand.prototype.makeCommandList = function() {
        this.addCommand("大きい", "big");
        this.addCommand("小さい", "small");
    };

})();
