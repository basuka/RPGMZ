//=============================================================================
// RPG Maker MZ - RandomBox
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc スロットマシーン機能を設定します。
 * @author Basu
 * @url https://raw.githubusercontent.com/basuka/RPGMZ/main/SlotMachine/SlotMachine.js
 *
 *
 * @help パラメータの設定項目
 *
 * 【パラメータ】
 *
 *-----------------------------------------------------------------------------
 * README
 *-----------------------------------------------------------------------------
 * https://github.com/basuka/RPGMZ/blob/main/SplitParty/README.md
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
 *
 *=====================================================================================================================================================
 * @param coinID
 * @text コインID
 * @type variable
 * @default 1
 * @desc 所持コインを保管する変数ID
 *
 * @param judgeType
 * @text 判定タイプ
 * @type select
 * @option 左から判定
 * @value 0
 * @option 左右から判定
 * @value 1
 * @default 0
 * @desc 判定のタイプを設定
 *
 * @param sevenMultiplier
 * @text 7の獲得倍率
 * @type struct<sevenMultiplier>
 * @default {"threeSlot":"300","fiveSlotThreeReel":"100","fiveSlotFourReel":"1000","fiveSlotFiveReel":"10000"}
 * @desc 7が揃った際の獲得倍率を設定
 *
 * @param iconInfo
 * @text アイコン情報
 * @desc スロットのアイコン情報を設定
 *
 * @param threeSlotIconInfos
 * @text 3スロットアイコン情報
 * @type struct<threeSlotIcon>
 * @default {"iconInfo1":"{\"iconCharaFile\":\"Nature\",\"iconCharaIndex\":\"4\",\"multiplier\":\"2\"}","iconInfo2":"{\"iconCharaFile\":\"People1\",\"iconCharaIndex\":\"6\",\"multiplier\":\"5\"}","iconInfo3":"{\"iconCharaFile\":\"Evil\",\"iconCharaIndex\":\"0\",\"multiplier\":\"10\"}","iconInfo4":"{\"iconCharaFile\":\"People3\",\"iconCharaIndex\":\"6\",\"multiplier\":\"20\"}","iconInfo5":"{\"iconCharaFile\":\"People3\",\"iconCharaIndex\":\"1\",\"multiplier\":\"50\"}","iconInfo6":"{\"iconCharaFile\":\"People3\",\"iconCharaIndex\":\"0\",\"multiplier\":\"100\"}"}
 * @desc 3スロットアイコン情報の設定
 * @parent iconInfo
 *
 * @param fiveSlotIconInfos
 * @text 5スロットアイコン情報
 * @type struct<fiveSlotIcon>
 * @default {"iconInfo1":"{\"iconCharaFile\":\"Nature\",\"iconCharaIndex\":\"4\",\"threeReelMultiplier\":\"3\",\"fourReelMultiplier\":\"6\",\"fiveReelMultiplier\":\"20\"}","iconInfo2":"{\"iconCharaFile\":\"Evil\",\"iconCharaIndex\":\"0\",\"threeReelMultiplier\":\"5\",\"fourReelMultiplier\":\"20\",\"fiveReelMultiplier\":\"100\"}","iconInfo3":"{\"iconCharaFile\":\"People3\",\"iconCharaIndex\":\"6\",\"threeReelMultiplier\":\"8\",\"fourReelMultiplier\":\"50\",\"fiveReelMultiplier\":\"200\"}","iconInfo4":"{\"iconCharaFile\":\"People3\",\"iconCharaIndex\":\"1\",\"threeReelMultiplier\":\"10\",\"fourReelMultiplier\":\"100\",\"fiveReelMultiplier\":\"1000\"}","iconInfo5":"{\"iconCharaFile\":\"People3\",\"iconCharaIndex\":\"0\",\"threeReelMultiplier\":\"20\",\"fourReelMultiplier\":\"200\",\"fiveReelMultiplier\":\"2000\"}"}
 * @desc 5スロットアイコン情報の設定
 * @parent iconInfo
 *
 * @param reelPos
 * @text リール位置
 * @desc リールの描画位置を設定
 *
 * @param threeSlotReelPos
 * @text リールの描画位置(3スロット)
 * @type struct<reelPos>
 * @default {"x":"315","y":"240"}
 * @desc リールの描画位置を設定(3スロット)
 * @parent reelPos
 *
 * @param fiveSlotReelPos
 * @text リールの描画位置(5スロット)
 * @type struct<reelPos>
 * @default {"x":"230","y":"280"}
 * @desc リールの描画位置を設定(5スロット)
 * @parent reelPos
 *
 * @param rotateSpeed
 * @text 回転速度
 * @desc リールの回転速度を設定
 *
 * @param threeSlotRotateSpeed
 * @text リールの回転速度(3スロット)
 * @type struct<threeSlotRotateSpeed>
 * @default {"reel1":"12.0","reel2":"14.5","reel3":"17.0"}
 * @desc リールの回転速度を設定(3スロット)
 * @parent rotateSpeed
 *
 * @param fiveSlotRotateSpeed
 * @text リールの回転速度(5スロット)
 * @type struct<fiveSlotRotateSpeed>
 * @default {"reel1":"12.0","reel2":"14.5","reel3":"17.0","reel4":"15.0","reel5":"16.5"}
 * @desc リールの回転速度を設定(5スロット)
 * @parent rotateSpeed
 *
 * @param buttonPos
 * @text ボタン位置
 * @desc 各ボタンの位置を設定
 *
 * @param threeSlotBetButtonPos
 * @text 3スロットベットボタンの描画位置
 * @type struct<betButtonPos>
 * @default {"x":"730","y":"240"}
 * @desc ベットボタンの描画位置を設定(3スロット)
 * @parent buttonPos
 *
 * @param fiveSlotBetButtonPos
 * @text 5スロットベットボタンの描画位置
 * @type struct<betButtonPos>
 * @default {"x":"730","y":"280"}
 * @desc ベットボタンの描画位置を設定(5スロット)
 * @parent buttonPos
 *
 * @param threeSlotStartStopButtonPos
 * @text 3スロットスタート/ストップボタンの描画位置
 * @type struct<startStopButtonPos>
 * @default {"x":"730","y":"300"}
 * @desc スタート/ストップボタンの描画位置を設定(3スロット)
 * @parent buttonPos
 *
 * @param fiveSlotStartStopButtonPos
 * @text 5スロットスタート/ストップボタンの描画位置
 * @type struct<startStopButtonPos>
 * @default {"x":"730","y":"340"}
 * @desc スタート/ストップボタンの描画位置を設定(5スロット)
 * @parent buttonPos
 *
 * @param threeSlotExitButtonPos
 * @text 3スロット退出ボタンの描画位置
 * @type struct<exitButtonPos>
 * @default {"x":"730","y":"400"}
 * @desc 退出ボタンの描画位置を設定(3スロット)
 * @parent buttonPos
 *
 * @param fiveSlotExitButtonPos
 * @text 5スロット退出ボタンの描画位置
 * @type struct<exitButtonPos>
 * @default {"x":"730","y":"440"}
 * @desc 退出ボタンの描画位置を設定(5スロット)
 * @parent buttonPos
 *
 * @param coinInfo
 * @text コイン情報
 * @desc コイン情報に関する情報を設定
 *
 * @param threeSlotCoinInfoType
 * @text 3スロットコイン情報描画タイプ
 * @type select
 * @option 横並び
 * @value 0
 * @option 縦並び
 * @value 1
 * @default 1
 * @desc 3スロットのラベルとコイン枚数の描画タイプを設定
 * @parent coinInfo
 *
 * @param fiveSlotCoinInfoType
 * @text 5スロットコイン情報描画タイプ
 * @type select
 * @option 横並び
 * @value 0
 * @option 縦並び
 * @value 1
 * @default 0
 * @desc 5スロットラベルとコイン枚数の描画タイプを設定
 * @parent coinInfo
 *
 * @param threeSlotCoinInfoWidth
 * @text 3スロットコイン情報長さ
 * @number
 * @default 240
 * @desc 3スロットのコイン情報の長さを設定
 * @parent coinInfo
 *
 * @param fiveSlotCoinInfoWidth
 * @text 5スロットコイン情報長さ
 * @number
 * @default 280
 * @desc 5スロットコイン情報の長さを設定
 * @parent coinInfo
 *
 * @param threeSlotCoinInfoPos
 * @text 3スロットコイン情報描画位置
 * @type struct<coinInfoPos>
 * @default {"x":"48","y":"250"}
 * @desc コイン情報の描画位置を設定(3スロット)
 * @parent coinInfo
 *
 * @param fiveSlotCoinInfoPos
 * @text 5スロットコイン情報描画位置
 * @type struct<coinInfoPos>
 * @default {"x":"260","y":"450"}
 * @desc コイン情報の描画位置を設定(5スロット)
 * @parent coinInfo
 *
 * @param threeSlotScaleCoinInfo
 * @text 3スロットコイン情報倍率
 * @number
 * @default 0.75
 * @decimals 2
 * @desc 3スロットのコイン情報の描画倍率を設定
 * @parent coinInfo
 *
 * @param fiveSlotScaleCoinInfo
 * @text 5スロットコイン情報倍率
 * @number
 * @default 0.75
 * @decimals 2
 * @desc 5スロットのコイン情報の描画倍率を設定
 * @parent coinInfo
 *
 * @param message
 * @text メッセージ
 * @desc メッセージを設定
 *
 * @param winMsg
 * @text 勝利メッセージ
 * @type string
 * @default おめでとうございます！\n%1%2のコインが当たりました！
 * @desc 勝利時のメッセージの設定
 *       "%1"は獲得したコイン"%2"はコインの単位に置換されます。
 * @parent message
 *
 * @param lostMsg
 * @text 敗北メッセージ
 * @type string
 * @default 残念でした。
 * @desc 負けた時のメッセージ
 * @parent message
 *
 * @param notEnoughMsg
 * @text コイン不足メッセージ
 * @type string
 * @default コインが足りません。
 * @desc コインが足りない時のメッセージ
 * @parent message
 *
 * @param coinUnit
 * @text コインの単位
 * @type string
 * @default 枚
 * @desc コインの単位を設定
 *
 * @param winMe
 * @text 勝利ME
 * @type struct<winMe>
 * @default {"name":"Victory2","volume":"90","pitch":"100","pan":"0"}
 * @desc 揃った際に流すME情報を設定
 *
 * @command open
 * @text スロットマシーン開始
 * @desc スロットマシーンを開始します。
 *
 * @arg slotType
 * @text スロットタイプ
 * @type select
 * @option 3スロット(3ライン)
 * @value 0
 * @option 3スロット(5ライン)
 * @value 1
 * @option 5スロット
 * @value 2
 * @default 2
 * @desc スロットのタイプを設定します
 *
 * @arg rate
 * @text 倍率
 * @type number
 * @min 1
 * @max 999
 * @default 1
 * @desc スロットの倍率を設定します
 *
 * @arg backgroundType
 * @text 背景タイプ
 * @type select
 * @option カラーコード
 * @value 0
 * @option RGB
 * @value 1
 * @option 画像
 * @value 2
 * @default 0
 * @desc 使用する背景タイプを設定します
 *
 * @arg backColorCodeList
 * @text 背景色(カラーコード)
 * @type struct<backColorCode>[]
 * @default ["{\"offset\":\"0.0\",\"colorCode\":\"#000080\"}","{\"offset\":\"0.5\",\"colorCode\":\"#6495ed\"}","{\"offset\":\"1.0\",\"colorCode\":\"#000080\"}"]
 * @desc 背景色をカラーコードで設定します
 *
 * @arg backColorRgbList
 * @text 背景色(RGB)
 * @type struct<backColorRgb>[]
 * @default ["{\"offset\":\"0.0\",\"rgb_R\":\"0\",\"rgb_G\":\"0\",\"rgb_B\":\"128\"}","{\"offset\":\"0.5\",\"rgb_R\":\"100\",\"rgb_G\":\"149\",\"rgb_B\":\"237\"}","{\"offset\":\"1.0\",\"rgb_R\":\"0\",\"rgb_G\":\"0\",\"rgb_B\":\"128\"}"]
 * @desc 背景色をRGBで設定します
 *
 * @arg backImage
 * @text 背景ファイル
 * @type file
 * @dir img/
 * @desc 背景色を画像で設定します
 *
 * @arg rateObject
 * @text レートオブジェクト
 * @type select
 * @option 全表示
 * @value 0
 * @option レートのみ表示
 * @value 1
 * @option 非表示
 * @value 2
 * @default 0
 * @desc レートオブジェクトの表示方法を設定
 *
 * @arg rateObjectPos
 * @text レートオブジェクト描画位置
 * @type struct<rateObjectPos>
 * @default {"x":"570","y":"280"}
 * @desc レートオブジェクトの描画位置を設定
 *
 * @arg threeSlotReel
 * @text リールの順番(3スロット)
 * @type struct<threeSlotReelList>
 * @default {"list1":"[\"-1\",\"0\",\"0\",\"1\",\"2\",\"1\",\"3\",\"0\",\"2\",\"-1\",\"0\",\"-1\",\"3\",\"4\",\"2\",\"1\",\"4\",\"2\",\"3\"]","list2":"[\"3\",\"0\",\"0\",\"4\",\"2\",\"0\",\"-1\",\"2\",\"1\",\"0\",\"4\",\"0\",\"3\",\"2\",\"-1\",\"4\",\"-1\",\"4\",\"0\",\"1\",\"1\",\"3\",\"-1\"]","list3":"[\"-1\",\"4\",\"1\",\"3\",\"0\",\"1\",\"-1\",\"3\",\"4\",\"2\",\"0\",\"0\",\"-1\",\"4\",\"2\",\"-1\",\"3\",\"-1\",\"0\",\"-1\",\"4\",\"1\",\"1\",\"3\",\"4\",\"-1\"]"}
 * @desc リールの順番を設定(3スロット)
 *
 * @arg fiveSlotReel
 * @text リールの順番(5スロット)
 * @type struct<fiveSlotReelList>
 * @default {"list1":"[\"-1\",\"0\",\"0\",\"1\",\"2\",\"1\",\"3\",\"0\",\"2\",\"-1\",\"0\",\"-1\",\"3\",\"4\",\"2\",\"1\",\"4\",\"2\",\"3\"]","list2":"[\"3\",\"0\",\"0\",\"4\",\"2\",\"0\",\"-1\",\"2\",\"1\",\"0\",\"4\",\"0\",\"3\",\"2\",\"-1\",\"4\",\"-1\",\"4\",\"0\",\"1\",\"1\",\"3\",\"-1\"]","list3":"[\"-1\",\"4\",\"1\",\"3\",\"0\",\"1\",\"-1\",\"3\",\"4\",\"2\",\"0\",\"0\",\"-1\",\"4\",\"2\",\"-1\",\"3\",\"-1\",\"0\",\"-1\",\"4\",\"1\",\"1\",\"3\",\"4\",\"-1\"]","list4":"[\"1\",\"3\",\"1\",\"1\",\"0\",\"4\",\"3\",\"2\",\"-1\",\"3\",\"4\",\"0\",\"-1\",\"1\",\"4\",\"-1\",\"2\",\"-1\",\"0\",\"3\",\"2\",\"4\",\"-1\",\"0\",\"4\"]","list5":"[\"4\",\"2\",\"1\",\"0\",\"3\",\"1\",\"0\",\"-1\",\"2\",\"2\",\"1\",\"0\",\"3\",\"1\",\"4\",\"-1\",\"0\",\"1\",\"4\",\"-1\",\"3\",\"0\",\"1\",\"4\",\"3\",\"0\",\"1\",\"3\",\"4\"]"}
 * @desc リールの順番を設定(5スロット)
 *
 */

/*~struct~threeSlotIcon:ja
 * @param iconInfo1
 * @text アイコン情報1
 * @type struct<threeSlotIconInfo>
 * @desc アイコン情報1の設定
 *
 * @param iconInfo2
 * @text アイコン情報2
 * @type struct<threeSlotIconInfo>
 * @desc アイコン情報2の設定
 *
 * @param iconInfo3
 * @text アイコン情報3
 * @type struct<threeSlotIconInfo>
 * @desc アイコン情報3の設定
 *
 * @param iconInfo4
 * @text アイコン情報4
 * @type struct<threeSlotIconInfo>
 * @desc アイコン情報4の設定
 *
 * @param iconInfo5
 * @text アイコン情報5
 * @type struct<threeSlotIconInfo>
 * @desc アイコン情報5の設定
 *
 * @param iconInfo6
 * @text アイコン情報6
 * @type struct<threeSlotIconInfo>
 * @desc アイコン情報6の設定
 */

/*~struct~fiveSlotIcon:ja
 * @param iconInfo1
 * @text アイコン情報1
 * @type struct<fiveSlotIconInfo>
 * @desc アイコン情報1の設定
 *
 * @param iconInfo2
 * @text アイコン情報2
 * @type struct<fiveSlotIconInfo>
 * @desc アイコン情報2の設定
 *
 * @param iconInfo3
 * @text アイコン情報3
 * @type struct<fiveSlotIconInfo>
 * @desc アイコン情報3の設定
 *
 * @param iconInfo4
 * @text アイコン情報4
 * @type struct<fiveSlotIconInfo>
 * @desc アイコン情報4の設定
 *
 * @param iconInfo5
 * @text アイコン情報5
 * @type struct<fiveSlotIconInfo>
 * @desc アイコン情報5の設定
 *
 */

/*~struct~threeSlotIconInfo:ja
 * @param iconCharaFile
 * @text キャラクターファイル
 * @type file
 * @dir img/characters
 * @desc スロットに使用するキャラクターファイル
 *
 * @param iconCharaIndex
 * @text キャラクター番号
 * @type number
 * @min 0
 * @max 7
 * @desc スロットに使用するキャラクター番号
 *
 * @param multiplier
 * @text 獲得倍率
 * @type number
 * @min 1
 * @max 999
 * @default 1
 * @desc 揃ったときに獲得するコインの倍率
 */

/*~struct~fiveSlotIconInfo:ja
 * @param iconCharaFile
 * @text キャラクターファイル
 * @type file
 * @dir img/characters
 * @desc スロットに使用するキャラクターファイル
 *
 * @param iconCharaIndex
 * @text キャラクター番号
 * @type number
 * @min 0
 * @max 7
 * @desc スロットに使用するキャラクター番号
 *
 * @param threeReelMultiplier
 * @text 3リール獲得倍率
 * @type number
 * @min 1
 * @max 99999
 * @default 1
 * @desc 3つ揃ったときに獲得するコインの倍率
 *
 * @param fourReelMultiplier
 * @text 4リール獲得倍率
 * @type number
 * @min 1
 * @max 99999
 * @default 1
 * @desc 4つ揃ったときに獲得するコインの倍率
 *
 * @param fiveReelMultiplier
 * @text 5リール獲得倍率
 * @type number
 * @min 1
 * @max 99999
 * @default 1
 * @desc 5つ揃ったときに獲得するコインの倍率
 */

/*~struct~sevenMultiplier:ja
 * @param threeSlot
 * @text セブン獲得倍率(3スロット)
 * @type number
 * @min 1
 * @max 999
 * @default 300
 * @desc 7が揃った際の獲得倍率(3スロット)
 *
 * @param fiveSlotThreeReel
 * @text セブン獲得倍率(5スロット三つ)
 * @type number
 * @min 1
 * @max 99999
 * @default 100
 * @desc 5スロットで7が三つ揃った際の獲得倍率
 *
 * @param fiveSlotFourReel
 * @text セブン獲得倍率(5スロット四つ)
 * @type number
 * @min 1
 * @max 99999
 * @default 1000
 * @desc 5スロットで7が四つ揃った際の獲得倍率
 *
 * @param fiveSlotFiveReel
 * @text セブン獲得倍率(5スロット五つ)
 * @type number
 * @min 1
 * @max 99999
 * @default 10000
 * @desc 5スロットで7が五つ揃った際の獲得倍率
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

/*~struct~rateObjectPos:ja
 * @param x
 * @text レートオブジェクトの描画位置(X軸)
 * @type number
 * @min 0
 * @desc レートオブジェクトの描画位置(X軸)を設定
 *
 * @param y
 * @text レートオブジェクトの描画位置(Y軸)
 * @type number
 * @min 0
 * @desc レートオブジェクトの描画位置(Y軸)を設定
 *
 */

/*~struct~betButtonPos:ja
 * @param x
 * @text ベットボタンの描画位置(X軸)
 * @type number
 * @min 0
 * @desc ベットボタンの描画位置(X軸)を設定
 *
 * @param y
 * @text ベットボタンの描画位置(Y軸)
 * @type number
 * @min 0
 * @desc ベットボタンの描画位置(Y軸)を設定
 *
 */

/*~struct~startStopButtonPos:ja
 * @param x
 * @text スタート/ストップボタンの描画位置(X軸)
 * @type number
 * @min 0
 * @desc スタート/ストップボタンの描画位置(X軸)を設定
 *
 * @param y
 * @text スタート/ストップボタンの描画位置(Y軸)
 * @type number
 * @min 0
 * @desc スタート/ストップボタンの描画位置(Y軸)を設定
 *
 */

/*~struct~exitButtonPos:ja
 * @param x
 * @text 退出ボタンの描画位置(X軸)
 * @type number
 * @min 0
 * @desc 退出ボタンの描画位置(X軸)を設定
 *
 * @param y
 * @text 退出ボタンの描画位置(Y軸)
 * @type number
 * @min 0
 * @desc 退出ボタンの描画位置(Y軸)を設定
 *
 */

/*~struct~reelPos:ja
 * @param x
 * @text リールの描画位置(X軸)
 * @type number
 * @min 0
 * @desc リールの描画位置(X軸)を設定
 *
 * @param y
 * @text リールの描画位置(Y軸)
 * @type number
 * @min 0
 * @desc リールの描画位置(Y軸)を設定
 *
 */

/*~struct~coinInfoPos:ja
 * @param x
 * @text コイン情報の描画位置(X軸)
 * @type number
 * @min 0
 * @desc コイン情報の描画位置(X軸)を設定
 *
 * @param y
 * @text コイン情報の描画位置(Y軸)
 * @type number
 * @min 0
 * @desc コイン情報の描画位置(Y軸)を設定
 *
 */

/*~struct~threeSlotReelList:ja
 * @param list1
 * @text リール配置1
 * @type select[]
 * @option アイコン1
 * @value 0
 * @option アイコン2
 * @value 1
 * @option アイコン3
 * @value 2
 * @option アイコン4
 * @value 3
 * @option アイコン5
 * @value 4
 * @option アイコン6
 * @value 5
 * @option セブン(7)アイコン
 * @value -1
 * @desc リールの配置を設定(左のリール)
 *       『3スロットアイコン』で設定したアイコンを設定
 *
 * @param list2
 * @text リール配置2
 * @type select[]
 * @option アイコン1
 * @value 0
 * @option アイコン2
 * @value 1
 * @option アイコン3
 * @value 2
 * @option アイコン4
 * @value 3
 * @option アイコン5
 * @value 4
 * @option アイコン6
 * @value 5
 * @option セブン(7)アイコン
 * @value -1
 * @desc リールの配置を設定(左から２番目のリール)
 *       『3スロットアイコン』で設定したアイコンを設定
 *
 * @param list3
 * @text リール配置3
 * @type select[]
 * @option アイコン1
 * @value 0
 * @option アイコン2
 * @value 1
 * @option アイコン3
 * @value 2
 * @option アイコン4
 * @value 3
 * @option アイコン5
 * @value 4
 * @option アイコン6
 * @value 5
 * @option セブン(7)アイコン
 * @value -1
 * @desc リールの配置を設定(左から３番目のリール)
 *       『3スロットアイコン』で設定したアイコンを設定
 *
 */

/*~struct~fiveSlotReelList:ja
 * @param list1
 * @text リール配置1
 * @type select[]
 * @option アイコン1
 * @value 0
 * @option アイコン2
 * @value 1
 * @option アイコン3
 * @value 2
 * @option アイコン4
 * @value 3
 * @option アイコン5
 * @value 4
 * @option セブン(7)アイコン
 * @value -1
 * @desc リールの配置を設定(左のリール)
 *       『5スロットアイコン』で設定したアイコンを設定
 *
 * @param list2
 * @text リール配置2
 * @type select[]
 * @option アイコン1
 * @value 0
 * @option アイコン2
 * @value 1
 * @option アイコン3
 * @value 2
 * @option アイコン4
 * @value 3
 * @option アイコン5
 * @value 4
 * @option セブン(7)アイコン
 * @value -1
 * @desc リールの配置を設定(左から２番目のリール)
 *       『5スロットアイコン』で設定したアイコンを設定
 *
 * @param list3
 * @text リール配置3
 * @type select[]
 * @option アイコン1
 * @value 0
 * @option アイコン2
 * @value 1
 * @option アイコン3
 * @value 2
 * @option アイコン4
 * @value 3
 * @option アイコン5
 * @value 4
 * @option セブン(7)アイコン
 * @value -1
 * @desc リールの配置を設定(左から３番目のリール)
 *       『5スロットアイコン』で設定したアイコンを設定
 *
 * @param list4
 * @text リール配置4
 * @type select[]
 * @option アイコン1
 * @value 0
 * @option アイコン2
 * @value 1
 * @option アイコン3
 * @value 2
 * @option アイコン4
 * @value 3
 * @option アイコン5
 * @value 4
 * @option セブン(7)アイコン
 * @value -1
 * @desc リールの配置を設定(左から４番目のリール)
 *       『5スロットアイコン』で設定したアイコンを設定
 *
 * @param list5
 * @text リール配置5
 * @type select[]
 * @option アイコン1
 * @value 0
 * @option アイコン2
 * @value 1
 * @option アイコン3
 * @value 2
 * @option アイコン4
 * @value 3
 * @option アイコン5
 * @value 4
 * @option セブン(7)アイコン
 * @value -1
 * @desc リールの配置を設定(左から５番目のリール)
 *       『5スロットアイコン』で設定したアイコンを設定
 *
 */

/*~struct~threeSlotRotateSpeed:ja
 * @param reel1
 * @text リール1回転速度
 * @type number
 * @min 0.0
 * @decimals 1
 * @desc リールの回転速度を設定(左のリール)
 *
 * @param reel2
 * @text リール2回転速度
 * @type number
 * @min 0.0
 * @decimals 1
 * @desc リールの回転速度を設定(左から２番目のリール)
 *
 * @param reel3
 * @text リール3回転速度
 * @type number
 * @min 0.0
 * @decimals 1
 * @desc リールの回転速度を設定(左から３番目のリール)
 *
 */

/*~struct~fiveSlotRotateSpeed:ja
 * @param reel1
 * @text リール1回転速度
 * @type number
 * @min 0.0
 * @decimals 1
 * @desc リールの回転速度を設定(左のリール)
 *
 * @param reel2
 * @text リール2回転速度
 * @type number
 * @min 0.0
 * @decimals 1
 * @desc リールの回転速度を設定(左から２番目のリール)
 *
 * @param reel3
 * @text リール3回転速度
 * @type number
 * @min 0.0
 * @decimals 1
 * @desc リールの回転速度を設定(左から３番目のリール)
 *
 * @param reel4
 * @text リール2回転速度
 * @type number
 * @min 0.0
 * @decimals 1
 * @desc リールの回転速度を設定(左から２番目のリール)
 *
 * @param reel5
 * @text リール3回転速度
 * @type number
 * @min 0.0
 * @decimals 1
 * @desc リールの回転速度を設定(左から３番目のリール)
 *
 */

/*~struct~winMe:ja
 * @param name
 * @text 勝利時SE
 * @type file
 * @dir audio/me
 * @desc 揃った時に流すMEを設定
 *
 * @param volume
 * @text 音量(％)
 * @type number
 * @min 0
 * @max 100
 * @desc SEの音量を設定
 *
 * @param pitch
 * @text ピッチ(％)
 * @type number
 * @min 50
 * @max 150
 * @desc SEのピッチを設定
 *
 * @param pan
 * @text 位相
 * @type number
 * @min -100
 * @max 100
 * @desc SEの位相を設定
 *
 */

(() => {
    "use strict";

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
    // PluginManager
    //-----------------------------------------------------------------------------
    PluginManager.registerCommand(Plugin_Name, "open", (args) => {
        const parseParams = PluginParams.prototype.parse(args);
        SlotMachine.set(args);
        SceneManager.push(Scene_SlotMachine);
    });

    //-----------------------------------------------------------------------------
    // SlotMachine
    //-----------------------------------------------------------------------------
    function SlotMachine() {
        throw new Error("This is a static class");
    }

    SlotMachine.SIZE = 48;
    SlotMachine.STATUS_STOPPED = 0;
    SlotMachine.STATUS_START = 1;
    SlotMachine.STATUS_STOP = 2;
    SlotMachine.STATUS_JUDGE = 3;
    SlotMachine.JUDGE_TYPE_FORWARD = 0;
    SlotMachine.JUDGE_TYPE_BACKFORWARD = 1;
    SlotMachine.MAX_COIN = 99999999;

    SlotMachine.set = function (args) {
        SlotMachine.args = args;
        SlotMachine._iconInfoList = [];

        if (SlotMachine.isFiveSlot()) {
            SlotMachine.setFiveIconInfo();
        } else {
            SlotMachine.setThreeIconInfo();
        }
    };

    SlotMachine.setThreeIconInfo = function () {
        let index = 0;

        for (let key in params.threeSlotIconInfos) {
            const threeIconInfo = params.threeSlotIconInfos[key];

            const iconInfo = {};
            iconInfo.id = index;
            iconInfo.iconCharaIndex = threeIconInfo.iconCharaIndex;
            iconInfo.image = ImageManager.loadCharacter(threeIconInfo.iconCharaFile);
            iconInfo.multiplier = threeIconInfo.multiplier;

            SlotMachine._iconInfoList.push(iconInfo);

            ++index;
        }

        const iconInfo = {};
        iconInfo.id = -1;
        iconInfo.image = SlotMachine.createSevenIcon();
        iconInfo.multiplier = params.sevenMultiplier.threeSlot;
        SlotMachine._iconInfoList.push(iconInfo);
    };

    SlotMachine.setFiveIconInfo = function () {
        let index = 0;

        for (let key in params.fiveSlotIconInfos) {
            const fiveIconInfo = params.fiveSlotIconInfos[key];

            const iconInfo = {};
            iconInfo.id = index;
            iconInfo.iconCharaIndex = fiveIconInfo.iconCharaIndex;
            iconInfo.image = ImageManager.loadCharacter(fiveIconInfo.iconCharaFile);
            iconInfo.threeReelMultiplier = fiveIconInfo.threeReelMultiplier;
            iconInfo.fourReelMultiplier = fiveIconInfo.fourReelMultiplier;
            iconInfo.fiveReelMultiplier = fiveIconInfo.fiveReelMultiplier;

            SlotMachine._iconInfoList.push(iconInfo);

            ++index;
        }

        const iconInfo = {};
        iconInfo.id = -1;
        iconInfo.image = SlotMachine.createSevenIcon();
        iconInfo.threeReelMultiplier = params.sevenMultiplier.fiveSlotThreeReel;
        iconInfo.fourReelMultiplier = params.sevenMultiplier.fiveSlotFourReel;
        iconInfo.fiveReelMultiplier = params.sevenMultiplier.fiveSlotFiveReel;
        SlotMachine._iconInfoList.push(iconInfo);
    };

    SlotMachine.isBackgroundColorType = function () {
        return SlotMachine.args.backgroundType === 0;
    };

    SlotMachine.isBackgroundRgbType = function () {
        return SlotMachine.args.backgroundType === 1;
    };

    SlotMachine.isBackgroundImageType = function () {
        return SlotMachine.args.backgroundType === 2;
    };

    SlotMachine.isThreeSlotThreeLine = function () {
        return SlotMachine.args.slotType === 0;
    };

    SlotMachine.isThreeSlotFiveLine = function () {
        return SlotMachine.args.slotType === 1;
    };

    SlotMachine.isFiveSlot = function () {
        return SlotMachine.args.slotType === 2;
    };

    SlotMachine.isRateObjShow = function () {
        return SlotMachine.args.rateObject === 0;
    };

    SlotMachine.isRateObjRateShow = function () {
        return SlotMachine.args.rateObject === 1;
    };

    SlotMachine.isRateObjHide = function () {
        return SlotMachine.args.rateObject === 2;
    };

    SlotMachine.rate = function () {
        return SlotMachine.args.rate;
    };

    SlotMachine.rateObjectPos = function () {
        return SlotMachine.args.rateObjectPos;
    };

    SlotMachine.backColorCodeList = function () {
        return SlotMachine.args.backColorCodeList;
    };

    SlotMachine.backColorRgbList = function () {
        return SlotMachine.args.backColorRgbList;
    };

    SlotMachine.backImage = function () {
        return SlotMachine.args.backImage;
    };

    SlotMachine.threeSlotReel = function () {
        return SlotMachine.args.threeSlotReel;
    };

    SlotMachine.fiveSlotReel = function () {
        return SlotMachine.args.fiveSlotReel;
    };

    SlotMachine.iconInfoList = function () {
        return SlotMachine._iconInfoList;
    };

    SlotMachine.iconInfo = function (id) {
        return SlotMachine._iconInfoList.find((iconInfo) => iconInfo.id === id);
    };

    SlotMachine.createSevenIcon = function () {
        const size = SlotMachine.SIZE;

        const iconBitmap = new Bitmap(size, size);
        const context = iconBitmap.context;
        context.beginPath();

        iconBitmap.fontFace = "Yu Mincho";
        iconBitmap.fontSize = size;
        const grad = context.createLinearGradient(0, 0, 0, size);
        grad.addColorStop(0.0, "#ffaf60");
        grad.addColorStop(0.2, "#ffad5b");
        grad.addColorStop(0.4, "#ffaa56");
        grad.addColorStop(0.6, "#ff7f50");
        grad.addColorStop(0.8, "#ff6347");
        grad.addColorStop(1.0, "#ff4500");
        iconBitmap.textColor = grad;
        iconBitmap.drawText(7, 0, 0, size, size);

        return iconBitmap;
    };

    //-----------------------------------------------------------------------------
    // Scene_SlotMachine
    //-----------------------------------------------------------------------------

    function Scene_SlotMachine() {
        this.initialize(...arguments);
    }

    Scene_SlotMachine.prototype = Object.create(Scene_Base.prototype);
    Scene_SlotMachine.prototype.constructor = Scene_SlotMachine;

    Scene_SlotMachine.prototype.initialize = function () {
        Scene_Base.prototype.initialize.call(this);
        this._spriteReelList = [];
        this._spriteBetLineList = [];
        this._slotStatus = SlotMachine.STATUS_STOPPED;
        this._bet = 0;
        this._isJudge = false;
    };

    Scene_SlotMachine.prototype.create = function () {
        Scene_Base.prototype.create.call(this);
        this.createBackground();
        this.createBackFrame();
        this.createMultiplier();
        this.createReelBoard();
        this.createReel();
        this.createBetLine();
        this.createCoinInfo();
        this.createRateObject();
        this.createWindowLayer();
        this.createHelpWindow();

        if (ConfigManager.touchUI) {
            this.createBetButton();
            this.createStartButton();
            this.createStopButton();
            this.createExitButton();
            this.createAllClickWindow();
        }
    };

    Scene_SlotMachine.prototype.clear = function () {
        this._slotStatus = SlotMachine.STATUS_STOPPED;
        this._bet = 0;
        this._isJudge = false;

        if (ConfigManager.touchUI) {
            this._exitButtonSprite.setClickEnabled(true);
            this._betButtonSprite.setClickEnabled(true);
            this._betButtonSprite.reset();
            this._stopButtonSprite.setClickEnabled(false);
            this._stopButtonSprite.reset();
            this._stopButtonSprite.hide();
            this._allClickWindowSprite.setClickEnabled(false);
            this._allClickWindowSprite.reset();
            this._allClickWindowSprite.hide();
        }

        this._spriteBetLineList.forEach((spriteBetLine) => {
            spriteBetLine.clear();
        });

        AudioManager.stopMe();
    };

    Scene_SlotMachine.prototype.createBackground = function () {
        if (SlotMachine.isBackgroundImageType()) {
            const imageFile = SlotMachine.backImage();
            const lastIndex = imageFile.lastIndexOf("/");
            const dir = "img/" + imageFile.substring(0, lastIndex + 1);
            const fileName = imageFile.substring(lastIndex + 1);

            this._backgroundSprite = new Sprite(ImageManager.loadBitmap(dir, fileName));

            this.addChild(this._backgroundSprite);
        } else {
            const width = this.uiAreaWidth();
            const height = this.uiAreaHeight();

            const backgroundBitmap = new Bitmap(width, height);

            const context = backgroundBitmap.context;
            context.beginPath();

            const fillGrad = context.createLinearGradient(0, 0, width, height);

            if (SlotMachine.isBackgroundColorType()) {
                for (const backColorCode of SlotMachine.backColorCodeList()) {
                    const offset = backColorCode.offset.toFixed(1);
                    const colorCode = backColorCode.colorCode;

                    fillGrad.addColorStop(offset, colorCode);
                }
            } else {
                for (const backColorRgb of SlotMachine.backColorRgbList()) {
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

            this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap = backgroundBitmap;

            this.addChild(this._backgroundSprite);
        }
    };

    Scene_SlotMachine.prototype.createBackFrame = function () {
        const width = this.uiAreaWidth();
        const height = this.uiAreaHeight();

        const backFrameBitmap = new Bitmap(width, height);

        const context = backFrameBitmap.context;
        context.lineWidth = this.frameWidth();

        context.beginPath();
        context.lineTo(0, 0);
        context.lineTo(0, height);
        context.lineTo(width, height);
        context.lineTo(width, 0);
        context.closePath();

        const lineGrad = context.createLinearGradient(0, 0, width, height);
        lineGrad.addColorStop(0.0, "#ffffe0");
        lineGrad.addColorStop(0.2, "#b8860b");
        lineGrad.addColorStop(0.4, "#ffffe0");
        lineGrad.addColorStop(0.6, "#b8860b");
        lineGrad.addColorStop(0.8, "#ffffe0");
        lineGrad.addColorStop(1.0, "#b8860b");

        context.strokeStyle = lineGrad;
        context.stroke();

        this._backFrameSprite = new Sprite();
        this._backFrameSprite.bitmap = backFrameBitmap;

        this.addChild(this._backFrameSprite);
    };

    Scene_SlotMachine.prototype.createMultiplier = function () {
        if (SlotMachine.isFiveSlot()) {
            this.createFiveSlotMultiplierBoard();
            this.setFiveSlotMultiplier();
        } else {
            this.createThreeSlotMultiplierBoard();
            this.setThreeSlotMultiplier();
        }
    };

    Scene_SlotMachine.prototype.createFiveSlotMultiplierBoard = function () {
        const size = 35;
        const frameLineWidth = 16;
        const lineWidth = 8;
        const width = this.width - frameLineWidth * 2;
        const height = size * 6.5 + lineWidth * 2;

        const boardBitmap = new Bitmap(width, height);

        this.setBackGrad(boardBitmap);

        const boardSprite = new Sprite(boardBitmap);
        boardSprite.x = frameLineWidth;
        boardSprite.y = frameLineWidth;
        this._backgroundSprite.addChild(boardSprite);

        this._fiveSlotboardSprite = new Sprite(this.createTableBoard(boardSprite.width - lineWidth * 4, size * 6.5));
        this._fiveSlotboardSprite.x = lineWidth * 2;
        this._fiveSlotboardSprite.y = lineWidth;
        boardSprite.addChild(this._fiveSlotboardSprite);
    };

    Scene_SlotMachine.prototype.createThreeSlotMultiplierBoard = function () {
        const size = SlotMachine.SIZE;
        const frameLineWidth = 16;
        const lineWidth = 8;
        const width = this.width - frameLineWidth * 4;
        const height = size * 3 + lineWidth * 2;

        const boardBitmap = new Bitmap(width, height);

        this.setBackGrad(boardBitmap);

        const rateTableSprite = new Sprite(boardBitmap);
        rateTableSprite.x = frameLineWidth * 2;
        rateTableSprite.y = frameLineWidth;
        this._backgroundSprite.addChild(rateTableSprite);

        this._leftBoardSprite = new Sprite(this.createTableBoard(rateTableSprite.width * 0.35 - lineWidth * 2, size * 3));
        this._leftBoardSprite.x = lineWidth * 2;
        this._leftBoardSprite.y = lineWidth;
        rateTableSprite.addChild(this._leftBoardSprite);

        this._rightBoardSprite = new Sprite(this.createTableBoard(rateTableSprite.width * 0.35 - lineWidth * 2, size * 3));
        this._rightBoardSprite.x = rateTableSprite.width - this._rightBoardSprite.width - lineWidth * 2;
        this._rightBoardSprite.y = lineWidth;
        rateTableSprite.addChild(this._rightBoardSprite);

        const centerBoardWidth = rateTableSprite.width - this._leftBoardSprite.width - this._rightBoardSprite.width - lineWidth * 4;
        this._centerBoardSprite = new Sprite(this.createTableBoard(centerBoardWidth - lineWidth * 4, size * 3));
        this._centerBoardSprite.x = rateTableSprite.width * 0.35 + lineWidth * 2;
        this._centerBoardSprite.y = lineWidth;
        rateTableSprite.addChild(this._centerBoardSprite);
    };

    Scene_SlotMachine.prototype.createTableBoard = function (width, height) {
        const tableBoardBitmap = new Bitmap(width, height);
        const context = tableBoardBitmap.context;
        context.lineWidth = 8;

        context.fillStyle = "#ffffff";
        context.strokeStyle = "#494a41";
        context.lineWidth = this.frameWidth();
        context.fillRect(0, 0, width, height);
        context.strokeRect(0, 0, width, height);

        return tableBoardBitmap;
    };

    Scene_SlotMachine.prototype.createBetButton = function () {
        const buttonBitmap = this.createButton("BET");

        this._betButtonSprite = new Sprite_SlotButton(buttonBitmap);
        this._betButtonSprite.x = SlotMachine.isFiveSlot() ? params.fiveSlotBetButtonPos.x : params.threeSlotBetButtonPos.x;
        this._betButtonSprite.y = SlotMachine.isFiveSlot() ? params.fiveSlotBetButtonPos.y : params.threeSlotBetButtonPos.y;
        this._betButtonSprite.setClickEnabled(true);
        this.addChild(this._betButtonSprite);
    };

    Scene_SlotMachine.prototype.createStartButton = function () {
        const buttonBitmap = this.createButton("START");

        this._startButtonSprite = new Sprite_SlotButton(buttonBitmap);
        this._startButtonSprite.x = SlotMachine.isFiveSlot() ? params.fiveSlotStartStopButtonPos.x : params.threeSlotStartStopButtonPos.x;
        this._startButtonSprite.y = SlotMachine.isFiveSlot() ? params.fiveSlotStartStopButtonPos.y : params.threeSlotStartStopButtonPos.y;
        this._startButtonSprite.setClickEnabled(false);
        this._startButtonSprite.hide();
        this.addChild(this._startButtonSprite);
    };

    Scene_SlotMachine.prototype.createStopButton = function () {
        const buttonBitmap = this.createButton("STOP");

        this._stopButtonSprite = new Sprite_SlotButton(buttonBitmap);
        this._stopButtonSprite.x = SlotMachine.isFiveSlot() ? params.fiveSlotStartStopButtonPos.x : params.threeSlotStartStopButtonPos.x;
        this._stopButtonSprite.y = SlotMachine.isFiveSlot() ? params.fiveSlotStartStopButtonPos.y : params.threeSlotStartStopButtonPos.y;
        this._stopButtonSprite.setClickEnabled(false);
        this._stopButtonSprite.hide();
        this.addChild(this._stopButtonSprite);
    };

    Scene_SlotMachine.prototype.createExitButton = function () {
        const buttonBitmap = this.createButton("EXIT");

        this._exitButtonSprite = new Sprite_SlotButton(buttonBitmap);
        this._exitButtonSprite.x = SlotMachine.isFiveSlot() ? params.fiveSlotExitButtonPos.x : params.threeSlotExitButtonPos.x;
        this._exitButtonSprite.y = SlotMachine.isFiveSlot() ? params.fiveSlotExitButtonPos.y : params.threeSlotExitButtonPos.y;
        this._exitButtonSprite.setClickEnabled(true);
        this.addChild(this._exitButtonSprite);
    };

    Scene_SlotMachine.prototype.createAllClickWindow = function () {
        const allClickWindowBitmap = new Bitmap(this.width, this.height);

        this._allClickWindowSprite = new Sprite_SlotButton(allClickWindowBitmap);
        this._allClickWindowSprite.hide();
        this._allClickWindowSprite.setClickEnabled(false);
        this.addChild(this._allClickWindowSprite);
    };

    Scene_SlotMachine.prototype.createButton = function (label) {
        const size = 48;

        const width = size * 1.5;
        const height = size;

        const buttonBitmap = new Bitmap(width, height);
        const context = buttonBitmap._context;
        context.beginPath();
        context.fillStyle = "#696969";
        context.rect(0, 0, width, height);
        context.fill();
        context.strokeStyle = "#897408";
        context.lineWidth = this.frameWidth();
        context.stroke();

        buttonBitmap.fontSize = size * 0.4;
        buttonBitmap.drawText(label, 0, 0, width, height, "center");

        return buttonBitmap;
    };

    Scene_SlotMachine.prototype.setThreeSlotMultiplier = function () {
        const size = SlotMachine.SIZE;
        const width = 40;
        const height = 40;
        const boardWidth = 8;

        let drawX = 0;
        let drawY = 0;

        const iconInfoList = SlotMachine.iconInfoList();

        iconInfoList.forEach((iconInfo, index, array) => {
            const image = iconInfo.image;

            if (index !== array.length - 1) {
                image.addLoadListener(() => {
                    const iconCharaIndex = iconInfo.iconCharaIndex;

                    const pw = image.width / 12;
                    const ph = image.height / 8;
                    const sx = ((iconCharaIndex % 4) * 3 + 1) * pw;
                    const sy = Math.floor(iconCharaIndex / 4) * 4 * ph;

                    for (let count = 0; count < 3; ++count) {
                        const bitmap = new Bitmap(width, height);
                        bitmap.blt(image, sx, sy, pw, ph, 0, 0, width, height);

                        const iconSprite = new Sprite(bitmap);

                        if (index < 3) {
                            drawX = boardWidth + width * count;
                            drawY = this._rightBoardSprite.height - size * (index + 1) + this.frameWidth();

                            iconSprite.x = drawX;
                            iconSprite.y = drawY;

                            this._rightBoardSprite.addChild(iconSprite);

                            if (count === 2) {
                                const textBitmap = new Bitmap(this._rightBoardSprite.width, this._rightBoardSprite.height);
                                textBitmap.textColor = "black";
                                textBitmap.fontSize = 24;

                                textBitmap.drawText("×", drawX + size, drawY + 10, width, height);
                                textBitmap.drawText(iconInfo.multiplier, 0, drawY, this._rightBoardSprite.width - this.frameWidth(), size, "right");

                                this._rightBoardSprite.addChild(new Sprite(textBitmap));
                            }
                        } else {
                            drawX = boardWidth + size * count;
                            drawY = this._leftBoardSprite.height - size * ((index % 3) + 1) + this.frameWidth();

                            iconSprite.x = drawX;
                            iconSprite.y = drawY;

                            this._leftBoardSprite.addChild(iconSprite);

                            if (count === 2) {
                                const textBitmap = new Bitmap(this._leftBoardSprite.width, this._leftBoardSprite.height);
                                textBitmap.textColor = "black";
                                textBitmap.fontSize = 24;

                                textBitmap.drawText("×", drawX + size, drawY + 10, width, height);
                                textBitmap.drawText(iconInfo.multiplier, 0, drawY, this._leftBoardSprite.width - this.frameWidth(), size, "right");

                                this._leftBoardSprite.addChild(new Sprite(textBitmap));
                            }
                        }
                    }
                });
            } else {
                for (let count = 0; count < 3; ++count) {
                    const bitmap = new Bitmap(size * 1.75, size * 1.75);
                    bitmap.blt(image, 0, 0, image.width, image.height, 0, 0, bitmap.width, bitmap.height);

                    const iconSprite = new Sprite(bitmap);
                    iconSprite.x = this._centerBoardSprite.width * 0.25 - bitmap.width * 0.25 + size * count;
                    this._centerBoardSprite.addChild(iconSprite);
                }
            }
        });

        const iconInfo = SlotMachine.iconInfo(-1);
        const sevenMultiplier = iconInfo.multiplier;
        const sevennMultiplierBitmap = new Bitmap(this.width, this._centerBoardSprite.height);

        const context = sevennMultiplierBitmap.context;
        context.beginPath();

        sevennMultiplierBitmap.fontFace = "Yu Mincho";
        sevennMultiplierBitmap.fontSize = 38;
        const grad = context.createLinearGradient(0, 0, 0, size);
        grad.addColorStop(0.0, "#ffaf60");
        grad.addColorStop(0.5, "#ffaa56");
        grad.addColorStop(1.0, "#ffa047");
        sevennMultiplierBitmap.textColor = grad;

        sevennMultiplierBitmap.drawText("×" + sevenMultiplier, 0, this._centerBoardSprite.height / 2 - 12, this._centerBoardSprite.width, 100, "center");

        const sevenMultiplierSprite = new Sprite();
        sevenMultiplierSprite.bitmap = sevennMultiplierBitmap;
        this._centerBoardSprite.addChild(sevenMultiplierSprite);
    };

    Scene_SlotMachine.prototype.setFiveSlotMultiplier = function () {
        const width = 35;
        const height = 35;
        const boardWidth = 8;

        const leftBitmap = new Bitmap(Math.floor(this._fiveSlotboardSprite.width / 3), this._fiveSlotboardSprite.height);
        leftBitmap.textColor = "black";
        leftBitmap.fontSize = 17;
        const leftSprite = new Sprite();
        leftSprite.bitmap = leftBitmap;
        this._fiveSlotboardSprite.addChild(leftSprite);

        const centerBitmap = new Bitmap(Math.floor(this._fiveSlotboardSprite.width / 3), this._fiveSlotboardSprite.height);
        centerBitmap.textColor = "black";
        centerBitmap.fontSize = 17;
        const centerSprite = new Sprite();
        centerSprite.x = leftSprite.width;
        centerSprite.bitmap = centerBitmap;
        this._fiveSlotboardSprite.addChild(centerSprite);

        const rightBitmap = new Bitmap(Math.floor(this._fiveSlotboardSprite.width / 3), this._fiveSlotboardSprite.height);
        rightBitmap.textColor = "black";
        rightBitmap.fontSize = 17;
        const rightSprite = new Sprite();
        rightSprite.x = leftSprite.width + centerSprite.width;
        rightSprite.bitmap = rightBitmap;
        this._fiveSlotboardSprite.addChild(rightSprite);

        const context = rightBitmap.context;

        let drawX = 0;
        let drawY = 0;

        const iconInfoList = SlotMachine.iconInfoList();

        iconInfoList.forEach((iconInfo, index, array) => {
            const image = iconInfo.image;

            if (index !== array.length - 1) {
                image.addLoadListener(() => {
                    const iconCharaIndex = iconInfo.iconCharaIndex;

                    const pw = image.width / 12;
                    const ph = image.height / 8;
                    const sx = ((iconCharaIndex % 4) * 3 + 1) * pw;
                    const sy = Math.floor(iconCharaIndex / 4) * 4 * ph;

                    for (let count = 0; count < 3; ++count) {
                        drawX = count * width;
                        drawY = rightBitmap.height - height * (index + 1) - this.frameWidth() * 2;

                        rightBitmap.blt(image, sx, sy, pw, ph, drawX, drawY, width, height);

                        if (count === 2) {
                            rightBitmap.drawText("×", drawX + width, drawY + 10, width, height);
                            rightBitmap.drawText(iconInfo.threeReelMultiplier, 0, drawY + 5, rightBitmap.width - this.frameWidth(), height, "right");
                        }
                    }

                    for (let count = 0; count < 4; ++count) {
                        drawX = count * width;
                        drawY = centerBitmap.height - height * (index + 1) - this.frameWidth() * 2;

                        centerBitmap.blt(image, sx, sy, pw, ph, drawX, drawY, width, height);

                        if (count === 3) {
                            centerBitmap.drawText("×", drawX + width, drawY + 10, width, height);
                            centerBitmap.drawText(iconInfo.fourReelMultiplier, 0, drawY + 5, rightBitmap.width - this.frameWidth(), height, "right");
                        }
                    }

                    for (let count = 0; count < 5; ++count) {
                        drawX = count * width;
                        drawY = leftBitmap.height - height * (index + 1) - this.frameWidth() * 2;

                        leftBitmap.blt(image, sx, sy, pw, ph, drawX, drawY, width, height);

                        if (count === 4) {
                            leftBitmap.drawText("×", drawX + width, drawY + 10, width, height);
                            leftBitmap.drawText(iconInfo.fiveReelMultiplier, 0, drawY + 5, leftBitmap.width - this.frameWidth(), height, "right");
                        }
                    }
                });
            } else {
                for (let count = 0; count < 3; ++count) {
                    drawX = count * width;
                    drawY = rightBitmap.height - height * (index + 1) - this.frameWidth() * 2;

                    rightBitmap.blt(image, 0, 0, image.width, image.height, drawX + width * 0.25, drawY, width, height);

                    if (count === 2) {
                        rightBitmap.drawText("×", drawX + width, drawY + 10, width, height);
                        rightBitmap.drawText(iconInfo.threeReelMultiplier, 0, drawY + 5, rightBitmap.width - this.frameWidth(), height, "right");
                    }
                }

                for (let count = 0; count < 4; ++count) {
                    drawX = count * width;
                    drawY = centerBitmap.height - height * (index + 1) - this.frameWidth() * 2;

                    centerBitmap.blt(image, 0, 0, image.width, image.height, drawX + width * 0.25, drawY, width, height);

                    if (count === 3) {
                        centerBitmap.drawText("×", drawX + width, drawY + 10, width, height);
                        centerBitmap.drawText(iconInfo.fourReelMultiplier, 0, drawY + 5, centerBitmap.width - this.frameWidth(), height, "right");
                    }
                }

                for (let count = 0; count < 5; ++count) {
                    drawX = count * width;
                    drawY = leftBitmap.height - height * (index + 1) - this.frameWidth() * 2;

                    leftBitmap.blt(image, 0, 0, image.width, image.height, drawX + width * 0.25, drawY, width, height);

                    if (count === 4) {
                        leftBitmap.drawText("×", drawX + width, drawY + 10, width, height);
                        leftBitmap.drawText(iconInfo.fiveReelMultiplier, 0, drawY + 5, leftBitmap.width - this.frameWidth(), height, "right");
                    }
                }
            }
        });
    };

    Scene_SlotMachine.prototype.createReelBoard = function () {
        const margin = 10;
        const size = SlotMachine.SIZE;

        let width = 0;
        let height = 0;
        let x = 0;
        let y = 0;

        if (SlotMachine.isFiveSlot()) {
            width = size * 5 + margin * 3.5;
            height = size * 3 + margin * 2;
            x = params.fiveSlotReelPos.x;
            y = params.fiveSlotReelPos.y;
        } else {
            width = size * 3 + margin * 5;
            height = size * 3 + margin * 2;
            x = params.threeSlotReelPos.x;
            y = params.threeSlotReelPos.y;
        }

        const reelBoardBitmap = new Bitmap(width, height);

        this.setBackGrad(reelBoardBitmap);

        this._reelBoardSprite = new Sprite(reelBoardBitmap);
        this._reelBoardSprite.x = x;
        this._reelBoardSprite.y = y;

        this._backgroundSprite.addChild(this._reelBoardSprite);
    };

    Scene_SlotMachine.prototype.setBackGrad = function (bitmap) {
        const width = bitmap.width;
        const height = bitmap.height;

        const context = bitmap.context;

        context.beginPath();

        const grad = context.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0.0, "#ffffe0");
        grad.addColorStop(0.2, "#b8860b");
        grad.addColorStop(0.4, "#ffffe0");
        grad.addColorStop(0.6, "#b8860b");
        grad.addColorStop(0.8, "#ffffe0");
        grad.addColorStop(1.0, "#b8860b");

        context.fillStyle = grad;
        context.fillRect(0, 0, width, height);

        context.strokeStyle = "#897408";
        context.lineWidth = this.frameWidth();
        context.strokeRect(0, 0, width, height);
    };

    Scene_SlotMachine.prototype.createReel = function () {
        if (SlotMachine.isFiveSlot()) {
            this.createFiveSlotReel();
        } else {
            this.createThreeSlotReel();
        }
    };

    Scene_SlotMachine.prototype.createThreeSlotReel = function () {
        const space = 30;
        const margin = 10;

        const reel = SlotMachine.threeSlotReel();
        const rotateSpeed = params.threeSlotRotateSpeed;

        const spriteReel1 = new Sprite_Reel(reel.list1, rotateSpeed.reel1);
        spriteReel1.x = margin + 3;
        spriteReel1.y = margin;
        this._spriteReelList.push(spriteReel1);
        this._reelBoardSprite.addChild(spriteReel1);

        const spriteReel2 = new Sprite_Reel(reel.list2, rotateSpeed.reel2);
        spriteReel2.x = spriteReel1.x + space + margin * 3;
        spriteReel2.y = margin;
        this._spriteReelList.push(spriteReel2);
        this._reelBoardSprite.addChild(spriteReel2);

        const spriteReel3 = new Sprite_Reel(reel.list3, rotateSpeed.reel3);
        spriteReel3.x = spriteReel2.x + space + margin * 3;
        spriteReel3.y = margin;
        this._spriteReelList.push(spriteReel3);
        this._reelBoardSprite.addChild(spriteReel3);
    };

    Scene_SlotMachine.prototype.createFiveSlotReel = function () {
        const space = 30;
        const margin = 10;

        const reel = SlotMachine.fiveSlotReel();
        const rotateSpeed = params.fiveSlotRotateSpeed;

        const spriteReel1 = new Sprite_Reel(reel.list1, rotateSpeed.reel1);
        spriteReel1.x = margin + 3;
        spriteReel1.y = margin;
        this._spriteReelList.push(spriteReel1);
        this._reelBoardSprite.addChild(spriteReel1);

        const spriteReel2 = new Sprite_Reel(reel.list2, rotateSpeed.reel2);
        spriteReel2.x = spriteReel1.x + space + margin * 2;
        spriteReel2.y = margin;
        this._spriteReelList.push(spriteReel2);
        this._reelBoardSprite.addChild(spriteReel2);

        const spriteReel3 = new Sprite_Reel(reel.list3, rotateSpeed.reel3);
        spriteReel3.x = spriteReel2.x + space + margin * 2;
        spriteReel3.y = margin;
        this._spriteReelList.push(spriteReel3);
        this._reelBoardSprite.addChild(spriteReel3);

        const spriteReel4 = new Sprite_Reel(reel.list4, rotateSpeed.reel4);
        spriteReel4.x = spriteReel3.x + space + margin * 2;
        spriteReel4.y = margin;
        this._spriteReelList.push(spriteReel4);
        this._reelBoardSprite.addChild(spriteReel4);

        const spriteReel5 = new Sprite_Reel(reel.list5, rotateSpeed.reel5);
        spriteReel5.x = spriteReel4.x + space + margin * 2;
        spriteReel5.y = margin;
        this._spriteReelList.push(spriteReel5);
        this._reelBoardSprite.addChild(spriteReel5);
    };

    Scene_SlotMachine.prototype.createBetLine = function () {
        const size = SlotMachine.SIZE;
        const margin = 10;
        const betLineSprite1 = new Sprite_BetLine(new Bitmap(size * 1.5, size * 1.5), 1);
        betLineSprite1.x = this._reelBoardSprite.x - betLineSprite1.width;
        betLineSprite1.y = this._reelBoardSprite.y + size + margin;
        this._spriteBetLineList.push(betLineSprite1);
        this.addChild(betLineSprite1);

        const betLineSprite2 = new Sprite_BetLine(new Bitmap(size * 1.5, size * 1.5), 2);
        betLineSprite2.x = this._reelBoardSprite.x - betLineSprite2.width;
        betLineSprite2.y = this._reelBoardSprite.y + margin;
        this._spriteBetLineList.push(betLineSprite2);
        this.addChild(betLineSprite2);

        const betLineSprite3 = new Sprite_BetLine(new Bitmap(size * 1.5, size * 1.5), 3);
        betLineSprite3.x = this._reelBoardSprite.x - betLineSprite3.width;
        betLineSprite3.y = this._reelBoardSprite.y + size * 2 + margin;
        this._spriteBetLineList.push(betLineSprite3);
        this.addChild(betLineSprite3);

        if (SlotMachine.isThreeSlotFiveLine()) {
            const betLineSprite4 = new Sprite_BetLine(new Bitmap(size * 1.5, size * 1.5), 4);
            betLineSprite4.x = this._reelBoardSprite.x - betLineSprite4.width;
            betLineSprite4.y = this._reelBoardSprite.y - size - margin;
            this._spriteBetLineList.push(betLineSprite4);
            this.addChild(betLineSprite4);

            const betLineSprite5 = new Sprite_BetLine(new Bitmap(size * 1.5, size * 1.5), 5);
            betLineSprite5.x = this._reelBoardSprite.x - betLineSprite5.width;
            betLineSprite5.y = this._reelBoardSprite.y + size * 3 + margin * 2;
            this._spriteBetLineList.push(betLineSprite5);
            this.addChild(betLineSprite5);
        }
    };

    Scene_SlotMachine.prototype.createCoinInfo = function () {
        const type = this.coinInfoType();
        const x = SlotMachine.isFiveSlot() ? params.fiveSlotCoinInfoPos.x : params.threeSlotCoinInfoPos.x;
        const y = SlotMachine.isFiveSlot() ? params.fiveSlotCoinInfoPos.y : params.threeSlotCoinInfoPos.y;
        const width = this.coinInfoWidth();
        const height = type === 0 ? 48 : 48 * 2;

        console.log(width);

        const coinInfoBitmap = new Bitmap(width, height);

        this.setBackGrad(coinInfoBitmap);

        const coinLabel = this.createCoinLabel();
        const coinTextSprite = this.createCoinText();

        const coinInfoSprite = new Sprite(coinInfoBitmap);
        coinInfoSprite.x = x;
        coinInfoSprite.y = y;

        if (type === 0) {
            coinInfoBitmap.blt(coinLabel, 0, 0, coinLabel.width, coinLabel.height, 10, 0, coinInfoBitmap.width, coinInfoBitmap.height);
            coinTextSprite.x = 75;
            coinTextSprite.y = this.frameWidth();
        } else {
            coinInfoBitmap.blt(coinLabel, 0, 0, coinLabel.width, coinLabel.height, 10, 0, coinInfoBitmap.width, coinInfoBitmap.height - coinTextSprite.height);
            coinTextSprite.y = coinInfoBitmap.height - coinTextSprite.height - this.frameWidth();
        }

        coinInfoSprite.addChild(coinTextSprite);

        coinInfoSprite.scale.x = this.scaleCoinInfo();
        coinInfoSprite.scale.y = this.scaleCoinInfo();

        this.addChild(coinInfoSprite);
    };

    Scene_SlotMachine.prototype.createCoinLabel = function () {
        const width = this.coinInfoWidth();
        const height = 48 - this.frameWidth() * 2;

        const coinLabelBitmap = new Bitmap(width, height);
        const context = coinLabelBitmap._context;

        coinLabelBitmap.fontFace = "fantasy";
        coinLabelBitmap.textColor = "#b8860b";

        const type = this.coinInfoType();

        if (type === 0) {
            coinLabelBitmap.fontSize = 28;
            coinLabelBitmap.drawText("COIN", 0, 0, width, height);
        } else {
            coinLabelBitmap.fontSize = 32;
            coinLabelBitmap.drawText("C　O　I　N", 0, 0, width, height, "center");
        }

        return coinLabelBitmap;
    };

    Scene_SlotMachine.prototype.createCoinText = function () {
        const type = this.coinInfoType();
        const width = type === 0 ? this.coinInfoWidth() - 80 : this.coinInfoWidth();
        const height = 48 - this.frameWidth() * 2;
        const coinBitmap = new Bitmap(width, height);
        const context = coinBitmap.context;

        context.lineWidth = this.frameWidth();

        context.fillStyle = "#ffffff";
        context.strokeStyle = "#897408";
        context.lineWidth = this.frameWidth();
        context.fillRect(0, 0, width, height);
        context.strokeRect(0, 0, width, height);

        const sprite = new Sprite(coinBitmap);

        this._coinTextBitmap = new Bitmap(width, height);
        this._coinTextBitmap.fontSize = 30;
        this._coinTextBitmap.textColor = "black";
        this._coinTextBitmap.drawText(this.coin(), 0, 0, width, height, "right");

        const textSprite = new Sprite(this._coinTextBitmap);
        textSprite.x = -this.frameWidth();
        sprite.addChild(textSprite);

        return sprite;
    };

    Scene_SlotMachine.prototype.createRateObject = function () {
        if (!SlotMachine.isRateObjHide()) {
            const size = 48;
            const width = size * 3;
            const height = size * 5;

            const rateObjectBitmap = new Bitmap(width, height);
            this.setBackGrad(rateObjectBitmap);

            const rateObjectPos = SlotMachine.rateObjectPos();

            this._rateObject = new Sprite_RateObject(rateObjectBitmap);
            this._rateObject.x = rateObjectPos.x;
            this._rateObject.y = rateObjectPos.y;
            this.addChild(this._rateObject);
        }
    };

    Scene_SlotMachine.prototype.createRateCircleObject = function (rateObjectBitmap) {
        const size = 48;
        const margin = this.frameWidth() * 2;
        const x = rateObjectBitmap.width * 0.5;
        const y = size - margin * 1.5;
        const width = size * 4;
        const height = size * 4;
        const radius = size * 0.6;

        const rateBitmap = new Bitmap(width, height);
        const context = rateBitmap.context;
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

        rateObjectBitmap.blt(rateBitmap, 0, 0, rateBitmap.width, rateBitmap.height);
    };

    Scene_SlotMachine.prototype.update = function () {
        Scene_Base.prototype.update.call(this);

        if (this.isEnoughCoin() || this.isBet()) {
            if (this.isSlotStopped()) {
                this.setHelpMsg();
                this.startUpdate();

                if (!this.isBet()) {
                    if (this.isInputCancel() || this.isExitButtonClick()) {
                        SceneManager.pop();
                    }
                }
            } else if (this.isSlotStart()) {
                this.stopUpdate();
            } else if (this.isSlotStop()) {
                this.slotStop();
            } else if (this.isJudgement()) {
                if (!this._isJudge) {
                    const winCoin = this.judgement();

                    if (winCoin === 0) {
                        this.setLostMsg();
                    } else {
                        this.setWinMsg(winCoin);
                        this.updateCoin(this.coin() + winCoin);
                        AudioManager.playMe(params.winMe);
                    }

                    if (ConfigManager.touchUI) {
                        this._allClickWindowSprite.setClickEnabled(true);
                        this._allClickWindowSprite.show();
                    }
                }

                if (this.isInputOk() || this.isInputCancel() || this.isWindowClick()) {
                    this.clear();
                }
            }
        } else {
            this.setNotEnoughMsg();

            if (ConfigManager.touchUI) {
                this._allClickWindowSprite.setClickEnabled(true);
                this._allClickWindowSprite.show();
            }

            if (this.isInputOk() || this.isInputCancel() || this.isWindowClick()) {
                SceneManager.pop();
            }
        }
    };

    Scene_SlotMachine.prototype.startUpdate = function () {
        if (this.isInputUp() || this.isBetButtonClick()) {
            if (this.isMaxBet() || !this.isEnoughCoin()) {
                this.slotStart();
            } else {
                this.bet();
            }
        } else if (this.isBet()) {
            if (this.isInputOk() || this.isStartButtonClick()) {
                this.slotStart();
            }
        }
    };

    Scene_SlotMachine.prototype.stopUpdate = function () {
        if (this.isInputOk() || this.isStopButtonClick()) {
            this.slotStop();
            SoundManager.playOk();
        }
    };

    Scene_SlotMachine.prototype.bet = function () {
        const betLineSprite = this.betLineSprite(this._bet);
        betLineSprite.bet();

        ++this._bet;

        if (ConfigManager.touchUI) {
            this._exitButtonSprite.setClickEnabled(false);
            this._startButtonSprite.show();
            this._startButtonSprite.setClickEnabled(true);
        }

        const calcCoin = this.coin() - SlotMachine.rate();

        this.updateCoin(calcCoin);
    };

    Scene_SlotMachine.prototype.updateCoin = function (coin) {
        if (coin > SlotMachine.MAX_COIN) {
            coin = SlotMachine.MAX_COIN;
        }
        this.setCoin(coin);
        this._coinTextBitmap.clear();
        this._coinTextBitmap.drawText(this.coin(), 0, 0, this._coinTextBitmap.width, this._coinTextBitmap.height, "right");
    };

    Scene_SlotMachine.prototype.judgement = function () {
        const line1 = [];
        const line2 = [];
        const line3 = [];
        const line4 = [];
        const line5 = [];

        const judgeType = params.judgeType;

        this._spriteReelList.forEach((spriteReel, index) => {
            const reelIdList = spriteReel.stopReelIdList();
            line2.push(reelIdList[0]);
            line1.push(reelIdList[1]);
            line3.push(reelIdList[2]);

            if (SlotMachine.isThreeSlotFiveLine()) {
                if (index === 0) {
                    line4.push(reelIdList[0]);
                    line5.push(reelIdList[2]);
                } else if (index === 1) {
                    line4.push(reelIdList[1]);
                    line5.push(reelIdList[1]);
                } else if (index === 2) {
                    line4.push(reelIdList[2]);
                    line5.push(reelIdList[0]);
                }
            }
        });

        let coin = 0;

        coin += this.getCoin(this.lineJudge(line1, 0));

        if (this._bet > 1) {
            coin += this.getCoin(this.lineJudge(line2, 1));
        }

        if (this._bet > 2) {
            coin += this.getCoin(this.lineJudge(line3, 2));
        }

        if (this._bet > 3) {
            coin += this.getCoin(this.lineJudge(line4, 3));
        }

        if (this._bet > 4) {
            coin += this.getCoin(this.lineJudge(line5, 4));
        }

        this._isJudge = true;

        return coin;
    };

    Scene_SlotMachine.prototype.lineJudge = function (line, lineIndex) {
        let judgeReelId = 0;
        let count = 0;

        let index = 0;
        let result = false;

        this._spriteBetLineList[lineIndex].clear();

        for (const reelId of line) {
            if (index > 0) {
                if (judgeReelId === reelId) {
                    count++;

                    if (count === 3) {
                        result = true;
                    }
                } else {
                    if (SlotMachine.isFiveSlot() && SlotMachine.JUDGE_TYPE_BACKFORWARD === params.judgeType) {
                        if (count < 3) {
                            count = 1;
                            judgeReelId = reelId;
                        }
                    } else {
                        break;
                    }
                }
            } else {
                count = 1;
                judgeReelId = reelId;
            }

            index++;
        }

        if (result) {
            this._spriteBetLineList[lineIndex].win();
        }

        const judgeResult = {};
        judgeResult.id = judgeReelId;
        judgeResult.result = result;
        judgeResult.count = count;

        return judgeResult;
    };

    Scene_SlotMachine.prototype.getCoin = function (judgeResult) {
        const rate = SlotMachine.rate();

        let coin = 0;

        if (judgeResult.result) {
            const iconInfo = SlotMachine.iconInfo(judgeResult.id);
            if (SlotMachine.isFiveSlot()) {
                const count = judgeResult.count;

                if (count === 3) {
                    coin = iconInfo.threeReelMultiplier * rate;
                } else if (count === 4) {
                    coin = iconInfo.fourReelMultiplier * rate;
                } else {
                    coin = iconInfo.fiveReelMultiplier * rate;
                }
            } else {
                coin = iconInfo.multiplier * rate;
            }
        }

        return coin;
    };

    Scene_SlotMachine.prototype.isMaxBet = function () {
        return SlotMachine.isThreeSlotFiveLine() ? this._bet === 5 : this._bet === 3;
    };

    Scene_SlotMachine.prototype.betLineSprite = function (index) {
        return this._spriteBetLineList[index];
    };

    Scene_SlotMachine.prototype.helpAreaTop = function () {
        if (this.isBottomHelpMode()) {
            return this.mainAreaBottom();
        } else if (this.isBottomButtonMode()) {
            return 0;
        } else {
            return this.buttonAreaBottom();
        }
    };

    Scene_SlotMachine.prototype.mainAreaBottom = function () {
        return this.mainAreaTop() + this.mainAreaHeight();
    };

    Scene_SlotMachine.prototype.mainAreaTop = function () {
        if (!this.isBottomHelpMode()) {
            return this.helpAreaBottom();
        } else if (this.isBottomButtonMode()) {
            return 0;
        } else {
            return this.buttonAreaBottom();
        }
    };

    Scene_SlotMachine.prototype.helpAreaBottom = function () {
        return this.helpAreaTop() + this.helpAreaHeight();
    };

    Scene_SlotMachine.prototype.mainAreaHeight = function () {
        return Graphics.boxHeight - this.buttonAreaHeight() - this.helpAreaHeight();
    };

    Scene_SlotMachine.prototype.helpAreaHeight = function () {
        return this.calcWindowHeight(2, false);
    };

    Scene_SlotMachine.prototype.createHelpWindow = function () {
        const rect = this.helpWindowRect();
        this._helpWindow = new Window_Help(rect);
        this.addWindow(this._helpWindow);
    };

    Scene_SlotMachine.prototype.helpWindowRect = function () {
        const wx = 0;
        const wy = this.helpAreaTop();
        const ww = Graphics.boxWidth;
        const wh = this.helpAreaHeight();
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_SlotMachine.prototype.setHelpMsg = function () {
        const helpMsg1 = "上：BET";
        const helpMsg2 = "\n決定：スタート/ストップ";
        const helpMsg3 = "キャンセル：終了";
        const adjustment = "　　　　　　　　　　";

        this._helpWindow.setText(helpMsg1 + helpMsg2 + adjustment + helpMsg3);
        this._helpWindow.open();
    };

    Scene_SlotMachine.prototype.setNotEnoughMsg = function () {
        const enoughMsg = this.newLineMsg(params.notEnoughMsg);

        this._helpWindow.setText(enoughMsg);
        this._helpWindow.open();
    };

    Scene_SlotMachine.prototype.setWinMsg = function (coin) {
        const winMsg = this.newLineMsg(params.winMsg);

        this._helpWindow.setText(winMsg.format(coin, params.coinUnit));
        this._helpWindow.open();
    };

    Scene_SlotMachine.prototype.setLostMsg = function () {
        const lostMsg = this.newLineMsg(params.lostMsg);

        this._helpWindow.setText(lostMsg);
        this._helpWindow.open();
    };

    Scene_SlotMachine.prototype.newLineMsg = function (msg) {
        return msg.replace("\\n", "\n");
    };

    Scene_SlotMachine.prototype.isInputUp = function () {
        return Input.isRepeated("up");
    };

    Scene_SlotMachine.prototype.isInputOk = function () {
        return Input.isRepeated("ok");
    };

    Scene_SlotMachine.prototype.isInputCancel = function () {
        return Input.isRepeated("cancel");
    };

    Scene_SlotMachine.prototype.isBet = function () {
        return this._bet > 0;
    };

    Scene_SlotMachine.prototype.isSlotStopped = function () {
        return this._slotStatus === SlotMachine.STATUS_STOPPED;
    };

    Scene_SlotMachine.prototype.isSlotStop = function () {
        return this._slotStatus === SlotMachine.STATUS_STOP;
    };

    Scene_SlotMachine.prototype.slotStart = function () {
        this._slotStatus = SlotMachine.STATUS_START;

        this._spriteReelList.forEach((spliteReel) => {
            spliteReel.start();
        });

        this._helpWindow.close();

        AudioManager.playSe({
            name: "Switch3",
            volume: 90,
            pitch: 200,
            pan: 0,
        });

        if (ConfigManager.touchUI) {
            this._startButtonSprite.hide();
            this._startButtonSprite.setClickEnabled(false);
            this._stopButtonSprite.show();
            this._stopButtonSprite.setClickEnabled(true);
            this._betButtonSprite.setClickEnabled(false);
        }
    };

    Scene_SlotMachine.prototype.isSlotStart = function () {
        return this._slotStatus === SlotMachine.STATUS_START;
    };

    Scene_SlotMachine.prototype.slotStop = function () {
        this._slotStatus = SlotMachine.STATUS_STOP;

        let stopped = false;

        for (const spriteReel of this._spriteReelList) {
            if (spriteReel.isStart()) {
                spriteReel.stop();
            }

            stopped = spriteReel.isStopped();

            if (!stopped) {
                break;
            }
        }

        if (stopped) {
            this._slotStatus = SlotMachine.STATUS_JUDGE;
        }
    };

    Scene_SlotMachine.prototype.isBetButtonClick = function () {
        return this._betButtonSprite ? this._betButtonSprite.isClick() : false;
    };

    Scene_SlotMachine.prototype.isStartButtonClick = function () {
        return this._startButtonSprite ? this._startButtonSprite.isClick() : false;
    };

    Scene_SlotMachine.prototype.isStopButtonClick = function () {
        return this._stopButtonSprite ? this._stopButtonSprite.isClick() : false;
    };

    Scene_SlotMachine.prototype.isExitButtonClick = function () {
        return this._exitButtonSprite ? this._exitButtonSprite.isClick() : false;
    };

    Scene_SlotMachine.prototype.isWindowClick = function () {
        return this._allClickWindowSprite ? this._allClickWindowSprite.isClick() : false;
    };

    Scene_SlotMachine.prototype.isJudgement = function () {
        return this._slotStatus === SlotMachine.STATUS_JUDGE;
    };

    Scene_SlotMachine.prototype.uiAreaWidth = function () {
        return $dataSystem.advanced.uiAreaWidth;
    };

    Scene_SlotMachine.prototype.uiAreaHeight = function () {
        return $dataSystem.advanced.uiAreaHeight;
    };

    Scene_SlotMachine.prototype.coin = function () {
        return $gameVariables.value(params.coinID);
    };

    Scene_SlotMachine.prototype.setCoin = function (coin) {
        return $gameVariables.setValue(params.coinID, coin);
    };

    Scene_SlotMachine.prototype.isMaxCoin = function () {
        return SlotMachine.MAX_COIN <= this.coin();
    };

    Scene_SlotMachine.prototype.isEnoughCoin = function () {
        return $gameVariables.value(params.coinID) >= SlotMachine.rate();
    };

    Scene_SlotMachine.prototype.coinInfoType = function () {
        return SlotMachine.isFiveSlot() ? params.fiveSlotCoinInfoType : params.threeSlotCoinInfoType;
    };

    Scene_SlotMachine.prototype.coinInfoWidth = function () {
        return SlotMachine.isFiveSlot() ? params.fiveSlotCoinInfoWidth : params.threeSlotCoinInfoWidth;
    };

    Scene_SlotMachine.prototype.scaleCoinInfo = function () {
        return SlotMachine.isFiveSlot() ? params.fiveSlotScaleCoinInfo : params.threeSlotScaleCoinInfo;
    };

    Scene_SlotMachine.prototype.frameWidth = function () {
        return 4;
    };

    //-----------------------------------------------------------------------------
    // Sprite_BetLine
    //-----------------------------------------------------------------------------
    function Sprite_BetLine() {
        this.initialize(...arguments);
    }

    Sprite_BetLine.prototype = Object.create(Sprite.prototype);
    Sprite_BetLine.prototype.constructor = Sprite_BetLine;

    Sprite_BetLine.prototype.initialize = function (bitmap, line) {
        Sprite.prototype.initialize.call(this, bitmap);
        this.createLine(bitmap, line);
        this.clear();
    };

    Sprite_BetLine.prototype.createLine = function (bitmap, line) {
        const size = SlotMachine.SIZE;
        const standardPos = 10;

        const context = bitmap.context;
        if (line === 4) {
            context.translate(size / 2, 0);
            context.rotate((35 * Math.PI) / 180);
        } else if (line === 5) {
            context.translate(0, size / 2);
            context.rotate((-35 * Math.PI) / 180);
        }

        context.beginPath();
        context.moveTo(standardPos, standardPos);
        context.lineWidth = 6;

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
        grad.addColorStop(1.0, "#b8860b");

        context.strokeStyle = grad;
        context.closePath();
        context.stroke();

        this.fillDrawLineNo(bitmap, line);
    };

    Sprite_BetLine.prototype.fillDrawLineNo = function (bitmap, lineNo) {
        const context = bitmap.context;
        if (lineNo === 1) {
            context.fillStyle = "#ff0000";
        } else if (lineNo === 2) {
            context.fillStyle = "#0000ff";
        } else if (lineNo === 3) {
            context.fillStyle = "#008000";
        } else if (lineNo === 4) {
            context.fillStyle = "#8A2BE2";
        } else {
            context.fillStyle = "#FFFF00";
        }
        context.fill();
        context.font = "italic bold 25px sans-serif";
        context.fillStyle = "#ffffff";
        context.fillText(lineNo, 20, 32);
    };

    Sprite_BetLine.prototype.clear = function () {
        this.opacity = 100;
    };

    Sprite_BetLine.prototype.win = function () {
        this.opacity = 255;
    };

    Sprite_BetLine.prototype.bet = function () {
        this.opacity = 255;

        AudioManager.playSe({
            name: "Coin",
            volume: 90,
            pitch: 100,
            pan: 0,
        });
    };

    //-----------------------------------------------------------------------------
    // Sprite_Reel
    //-----------------------------------------------------------------------------
    function Sprite_Reel() {
        this.initialize(...arguments);
    }

    Sprite_Reel.prototype = Object.create(Sprite.prototype);
    Sprite_Reel.prototype.constructor = Sprite_Reel;

    Sprite_Reel.prototype.initialize = function (reelList, rotateSpeed) {
        Sprite.prototype.initialize.call(this, this.createReel());
        this._slotStatus = 0;
        this._nextReel = 0;
        this._offsetY = 0;
        this._rotatingSpeed = 0;

        this._subjectList = [];

        this._reelList = reelList;
        this._rotateSpeed = rotateSpeed;

        this.createReelIcon();
        this.setSubject();
        this.drawIcon();
    };

    Sprite_Reel.prototype.createReel = function () {
        const size = SlotMachine.SIZE;

        const reelBitmap = new Bitmap(size, size * 3);
        const context = reelBitmap._context;
        context.beginPath();
        context.fillStyle = "#ffffff";
        context.strokeStyle = "#494a41";
        context.lineWidth = this.frameWidth();
        context.fillRect(0, 0, reelBitmap.width, reelBitmap.height);
        context.strokeRect(0, 0, reelBitmap.width, reelBitmap.height);
        return reelBitmap;
    };

    Sprite_Reel.prototype.createReelIcon = function () {
        this._iconBitmap = new Bitmap(this.bitmap.width, this.bitmap.height);

        const sprite = new Sprite();
        sprite.bitmap = this._iconBitmap;

        this.addChild(sprite);
    };

    Sprite_Reel.prototype.setSubject = function () {
        const max = 3;
        const maxIndex = this._reelList.length;
        const startIndex = Math.floor(Math.random() * maxIndex);

        for (let index = 0; index < this._reelList.length; index++) {
            if (startIndex <= index) {
                this._subjectList.push(this._reelList[index]);
            }

            if (this._subjectList.length === max) {
                break;
            }
        }

        if (this._subjectList.length !== max) {
            for (let index = 0; index < this._reelList.length; index++) {
                if (startIndex > index) {
                    this._subjectList.push(this._reelList[index]);
                } else {
                    break;
                }

                if (this._subjectList.length === max) {
                    break;
                }
            }
        }

        if (startIndex === this._reelList.length - 1) {
            this._nextReel = 0;
        } else if (startIndex === 0) {
            this._nextReel = this._reelList.length - 1;
        } else {
            this._nextReel = startIndex - 1;
        }

        this._subjectList.unshift(this.nextReel());
    };

    Sprite_Reel.prototype.drawIcon = function () {
        const width = SlotMachine.SIZE;
        const height = SlotMachine.SIZE;

        this._subjectList.forEach((id, index) => {
            const iconInfo = SlotMachine.iconInfo(id);
            const image = iconInfo.image;

            const drawY = this.calcDrawY(index);

            if (id === -1) {
                this._iconBitmap.blt(image, 0, 0, image.width, image.height, this.frameWidth() + 8, drawY);
            } else {
                image.addLoadListener(() => {
                    const iconCharaIndex = iconInfo.iconCharaIndex;

                    const pw = image.width / 12;
                    const ph = image.height / 8;
                    const sx = ((iconCharaIndex % 4) * 3 + 1) * pw;
                    const sy = Math.floor(iconCharaIndex / 4) * 4 * ph;

                    const bitmap = new Bitmap(width, height);
                    this._iconBitmap.blt(image, sx, sy, pw, ph, 0, drawY, 46, 46);
                });
            }
        });
    };

    Sprite_Reel.prototype.calcDrawY = function (index) {
        const height = SlotMachine.SIZE;
        const offsetY = this.offsetY();
        const frameWidth = this.frameWidth();
        return (index - 1) * height + offsetY;
    };

    Sprite_Reel.prototype.update = function () {
        if (this.isStart() || this.isStop()) {
            if (this.isStop()) {
                this.updateDeceleration();
            }
            this.updateOffset();
            this.updateSubject();
            this.clear();
            this.drawIcon();
        }
    };

    Sprite_Reel.prototype.clear = function () {
        this._iconBitmap.clearRect(0, 0, this._iconBitmap.width, this._iconBitmap.height);
    };

    Sprite_Reel.prototype.updateSubject = function () {
        const offsetY = this.offsetY();
        if (offsetY === 0) {
            this._nextReel -= 1;

            if (this._nextReel < 0) {
                this._nextReel = this._reelList.length - 1;
            }

            this._subjectList.pop();
            this._subjectList.unshift(this.nextReel());
        }
    };

    Sprite_Reel.prototype.updateOffset = function () {
        const size = SlotMachine.SIZE;

        this._offsetY += this._rotatingSpeed;

        if (this._offsetY > size) {
            this._offsetY = 0;

            if (this.isStop() && this._rotatingSpeed === 1) {
                this.stopped();
            }
        }
    };

    Sprite_Reel.prototype.updateDeceleration = function () {
        this._rotatingSpeed -= 0.2;

        if (this._rotatingSpeed < 1) {
            this._rotatingSpeed = 1;
        }
    };

    Sprite_Reel.prototype.stopped = function () {
        this._rotatingSpeed = 0;
        this._slotStatus = SlotMachine.STATUS_STOPPED;
        AudioManager.playSe({
            name: "Switch2",
            volume: 90,
            pitch: 130,
            pan: 0,
        });
    };

    Sprite_Reel.prototype.isStopped = function () {
        return this._slotStatus === SlotMachine.STATUS_STOPPED;
    };

    Sprite_Reel.prototype.start = function () {
        this._rotatingSpeed = this._rotateSpeed;
        this._slotStatus = SlotMachine.STATUS_START;
    };

    Sprite_Reel.prototype.isStart = function () {
        return this._slotStatus === SlotMachine.STATUS_START;
    };

    Sprite_Reel.prototype.stop = function () {
        this._slotStatus = SlotMachine.STATUS_STOP;
    };

    Sprite_Reel.prototype.isStop = function () {
        return this._slotStatus === SlotMachine.STATUS_STOP;
    };

    Sprite_Reel.prototype.frameWidth = function () {
        return 4;
    };

    Sprite_Reel.prototype.nextReel = function () {
        return this._reelList[this._nextReel];
    };

    Sprite_Reel.prototype.stopReelIdList = function () {
        const reelIdList = [];
        reelIdList.push(this._subjectList[1]);
        reelIdList.push(this._subjectList[2]);
        reelIdList.push(this._subjectList[3]);

        return reelIdList;
    };

    Sprite_Reel.prototype.offsetY = function () {
        return this._offsetY;
    };

    //-----------------------------------------------------------------------------
    // Sprite_SlotButton
    //-----------------------------------------------------------------------------
    function Sprite_SlotButton() {
        this.initialize(...arguments);
    }

    Sprite_SlotButton.prototype = Object.create(Sprite_Clickable.prototype);
    Sprite_SlotButton.prototype.constructor = Sprite_SlotButton;

    Sprite_SlotButton.prototype.initialize = function (bitmap) {
        Sprite_Clickable.prototype.initialize.call(this);
        this.bitmap = bitmap;
        this._click = false;
        this._clickEnabled = false;
    };

    Sprite_SlotButton.prototype.setClickEnabled = function (enabled) {
        this._clickEnabled = enabled;
    };

    Sprite_SlotButton.prototype.update = function () {
        Sprite_Clickable.prototype.update.call(this);
        this.processTouch();
    };

    Sprite_SlotButton.prototype.onClick = function () {
        if (this._clickEnabled) {
            this._click = true;
        }
    };

    Sprite_SlotButton.prototype.isClick = function () {
        let click = this._click;

        if (this._click) {
            this._click = false;
        }
        return click;
    };

    Sprite_SlotButton.prototype.reset = function () {
        this._click = false;
    };

    //-----------------------------------------------------------------------------
    // Sprite_RateObject
    //-----------------------------------------------------------------------------
    function Sprite_RateObject() {
        this.initialize(...arguments);
    }

    Sprite_RateObject.prototype = Object.create(Sprite.prototype);
    Sprite_RateObject.prototype.constructor = Sprite_RateObject;

    Sprite_RateObject.prototype.initialize = function (bitmap) {
        Sprite.prototype.initialize.call(this, bitmap);
        this.createRateObject();
        this.drawRate();

        if (SlotMachine.isRateObjShow()) {
            this.createSubObject();
            this.createArrow();
            this.createInputCoin();
        }
    };

    Sprite_RateObject.prototype.createRateObject = function () {
        const size = 48;
        const width = size * 1.5;
        const height = size * 1.5;
        const radius = size * 0.6;
        const x = width * 0.5;
        const y = height * 0.5;

        if (SlotMachine.isRateObjRateShow()) {
            this.bitmap = new Bitmap(width, height);
        }

        this._rateObjectBitmap = new Bitmap(width, height);
        const context = this._rateObjectBitmap.context;
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

        const sprite = new Sprite(this._rateObjectBitmap);
        if (SlotMachine.isRateObjShow()) {
            sprite.x = Math.floor(this.bitmap.width / 2) - Math.floor(sprite.width / 2);
        }

        this.addChild(sprite);
    };

    Sprite_RateObject.prototype.drawRate = function () {
        const size = 48;
        const margin = this.frameWidth() * 2;
        const width = size * 1.5;
        const height = size * 1.5;

        const context = this._rateObjectBitmap.context;

        this._rateObjectBitmap.fontSize = size * 0.57;
        const grad = context.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0.0, "#ffffe0");
        grad.addColorStop(0.4, "#b8860b");
        this._rateObjectBitmap.textColor = grad;

        const rate = SlotMachine.rate();

        this._rateObjectBitmap.drawText(rate, 0, 0, width, height, "center");
    };

    Sprite_RateObject.prototype.createSubObject = function () {
        const size = 48;
        const margin = this.frameWidth() * 2;
        const x = margin;
        const y = size * 1.5;
        const width = this.bitmap.width - margin;
        const height = this.bitmap.height - margin;

        this._subObjectBitmap = new Bitmap(width, height);
        const context = this._subObjectBitmap.context;

        const grad = context.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0.0, "#664134");
        grad.addColorStop(0.6, "#d7c447");
        grad.addColorStop(1.0, "#664134");
        context.fillStyle = grad;
        context.rect(x, y, width, height);
        context.fill();
        context.stroke();

        const sprite = new Sprite(this._subObjectBitmap);

        this.addChild(sprite);
    };

    Sprite_RateObject.prototype.createArrow = function () {
        const size = 48;
        const margin = this.frameWidth() * 2;
        const moveX = this._subObjectBitmap.width * 0.5 - size * 0.25;
        const moveY = margin;
        const width = this._subObjectBitmap.width;
        const height = this._subObjectBitmap.height * 0.5;
        const arrowBitmap = new Bitmap(width, height);

        const context = arrowBitmap.context;
        context.beginPath();
        context.moveTo(moveX, moveY);
        context.lineWidth = 3;

        const x1 = moveX;
        const y1 = size * 0.5;
        context.lineTo(moveX, size * 0.5);

        const x2 = width * 0.25;
        const y2 = y1;
        context.lineTo(x2, y2);

        const x3 = width * 0.5;
        const y3 = y2 + size * 0.75;
        context.lineTo(x3, y3);

        const x4 = width * 0.75;
        const y4 = y2;
        context.lineTo(x4, y4);

        const x5 = this._subObjectBitmap.width * 0.5 + size * 0.25;
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

        const sx = x2 - this.frameWidth();
        const sy = y2 - this.frameWidth();
        context.moveTo(sx, sy);
        const sx1 = x1 - 2;
        const sy1 = sy;
        context.lineTo(sx1, sy1);

        const sx2 = sx1;
        const sy2 = moveY - 2;
        context.lineTo(sx2, sy2);

        const sx3 = x6;
        const sy3 = sy2;
        context.lineTo(sx3, sy3);

        const sx4 = x6;
        const sy4 = y5 - 2;
        context.moveTo(sx4, sy4);
        context.lineTo(x4 + 2, sy4);

        context.strokeStyle = "#ffffe0";
        context.lineWidth = 2;
        context.stroke();

        const sprite = new Sprite(arrowBitmap);
        sprite.x += this.frameWidth();
        sprite.y += size * 1.5;
        this.addChild(sprite);
    };

    Sprite_RateObject.prototype.createInputCoin = function () {
        const size = 48;
        const margin = this.frameWidth() * 2;
        const x = this._subObjectBitmap.width * 0.3 - 3;
        const y = this._subObjectBitmap.height * 0.6;
        const width = this._subObjectBitmap.width * 0.5;
        const height = this._subObjectBitmap.height * 0.3;

        const inputCoinBitmap = new Bitmap(width + margin, height);
        const context = inputCoinBitmap.context;
        context.beginPath();

        const grad = context.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0.0, "#ffffe0");
        grad.addColorStop(0.6, "#b8860b");
        context.fillStyle = grad;
        context.fillRect(0, 0, width, height);

        const sx = width;
        const sy = 0;

        context.beginPath();
        context.moveTo(sx, sy);

        const sx1 = sx + 3;
        const sy1 = sy + 3;
        context.lineTo(sx1, sy1);

        const sx2 = sx1;
        const sy2 = height - 3;
        context.lineTo(sx2, sy2);

        const sx3 = width;
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

        const sprite = new Sprite(inputCoinBitmap);
        sprite.x = x;
        sprite.y = y;

        this.addChild(sprite);
    };

    Sprite_RateObject.prototype.frameWidth = function () {
        return 4;
    };
})();
