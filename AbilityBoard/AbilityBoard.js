//=============================================================================
// RPG Maker MZ - AbilityBoard
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc アビリティボード機能を実装します。
 * @author Basu
 * @url https://raw.githubusercontent.com/basuka/RPGMZ/main/AbilityBoard/AbilityBoard.js
 *
 *
 * @help パラメータの設定項目
 *
 * 【パラメータ】
 *
 * ■アクターアビリティ
 * アクター毎にアビリティの設定をします。
 *
 * 　・アクター
 * 　アビリティの設定を行うアクターを設定します。
 *
 * 　・開始X軸
 * 　アビリティの開始位置(X軸)を設定します。
 *
 * 　・開始Y軸
 * 　アビリティの開始位置(Y軸)を設定します。
 *
 * 　・開始アイコン
 * 　開始アビリティのアイコンを設定します。
 * 　-1を設定するとアクターの顔画像が設定されます。
 * 　アイコンはテキストタグ変更後に右クリックから設定が可能です。
 * 　※右クリックから設定を行う場合、デフォルトの数値は消えないので注意してください
 *
 * 　　例：デフォルトで0が入力されている状況で右クリックから32番目のアイコンを設定すると「320」が設定されます。
 *
 * 　・アビリティ情報
 * 　アビリティ情報の設定を行います。
 * 　アビリティ情報については後述【アビリティ情報について】を参照してください。
 *
 * 　・移動先アビリティ
 * 　キー入力によるカーソルの移動先IDを設定します。
 *
 *
 * 【アビリティ情報について】
 *
 * 　・ID
 * 　アビリティIDを設定します。
 * 　IDはユニークな値を設定してください。
 *
 * 　・メモ
 * 　設定するアビリティについてのメモとして使用してください。
 * 　プラグイン上では使用されないので自由にお使いください。
 *
 * 　・アビリティ名
 * 　アビリティ名の設定を行います。
 *
 * 　・アイコン
 * 　アビリティに使用するアイコンを設定ます。
 *
 * 　・必要AP
 * 　取得に必要なアビリティポイントを設定ます。
 *
 * 　・説明
 * 　アビリティの説明を設定します。
 * 　スキル習得の場合はスキルの説明が自動で設定されます。
 *
 * 　・親アビリティID
 * 　親アビリティのIDを設定します。
 * 　設定した親アビリティを基準に表示位置や取得の可否などが設定されます。
 *
 * 　・表示位置X軸
 * 　アビリティの表示位置(X軸)を設定します。
 * 　親アビリティを基準(0,0)に設定されます。
 *
 * 　・表示位置Y軸
 * 　アビリティの表示位置(Y軸)を設定します。
 * 　親アビリティを基準(0,0)に設定されます。
 *
 * 　・紐づけ先ID
 * 　親アビリティとは別に紐づけを行いたいIDを設定します。
 * 　紐づけ先IDは複数設定することが可能です。
 *
 * 　・グループ化
 * 　親アビリティと紐づけしたアビリティのグループ化を設定します。
 * 　グループ化にした場合、親アビリティと紐づけしたアビリティを全て取得後にアビリティの取得が可能になります。
 *
 * 　・移動先アビリティ
 * 　キー入力によるカーソルの移動先IDを設定します。
 *
 * 　・アビリティタイプ
 * 　アビリティが「アビリティ獲得」か「スキル習得」かの設定を行います。
 *
 *
 * 　●アビリティ効果
 * 　アビリティによる効果を設定します。
 *
 * 　【耐性】
 *
 * 　・属性有効度
 * 　属性有効度を設定します。
 * 　詳細についてはツクールのヘルプを参照してください。
 *
 * 　・弱体有効度
 * 　弱体有効度を設定します。
 * 　詳細についてはツクールのヘルプを参照してください。
 *
 * 　・ステート有効度
 * 　ステート有効度を設定します。
 * 　詳細についてはツクールのヘルプを参照してください。
 *
 * 　・ステート無効
 * 　ステート無効を設定します。
 * 　詳細についてはツクールのヘルプを参照してください。
 *
 *
 *  【能力値】
 *
 * 　・通常能力値
 * 　通常能力値を設定します。
 * 　詳細についてはツクールのヘルプを参照してください。
 * 　※能力値を率(％)で設定した場合、ベースの能力(装備をしていない状態)で計算されます。
 *
 * 　・追加能力値
 * 　追加能力値を設定します。
 * 　詳細についてはツクールのヘルプを参照してください。
 *
 * 　・特殊能力値
 * 　特殊能力値を設定します。
 * 　詳細についてはツクールのヘルプを参照してください。
 *
 *
 *　【その他】
 *
 * 　・攻撃時ステート
 * 　攻撃時ステートを設定します。
 * 　詳細についてはツクールのヘルプを参照してください。
 *
 * 　・攻撃回数追加
 * 　攻撃回数追加を設定します。
 * 　詳細についてはツクールのヘルプを参照してください。
 *
 * 　・スキル習得
 * 　習得するスキルを設定します。
 *
 *
 * ■AP獲得アイテム
 * AP獲得アイテムを設定します。
 *
 * 　・AP獲得アイテム
 * 　AP獲得アイテムとするアイテムを設定します。
 *
 * 　・獲得値
 * 　アイテムによる獲得するAP値を設定します。
 *
 *
 * 【AP獲得】
 *
 * ■AP獲得方法
 * APの獲得方法を設定します。
 *
 * ■獲得AP(レベル)
 * レベルによる獲得APの設定をします。
 *
 * 　・設定範囲
 * 　獲得APを設定するアクターの範囲を設定します。
 *
 * 　・獲得値(全体)
 * 　全アクター共通の獲得APを設定します。
 *
 * 　・獲得値(アクター別)
 * 　アクター毎に獲得するAPを設定します。
 *
 * ■獲得AP(戦闘勝利)
 * 戦闘勝利による獲得APの設定をします。
 *
 * 　・獲得値
 * 　勝利時に獲得するAPを設定します。
 *
 * 　・敵グループ
 * 　獲得値を設定する敵グループを設定します。
 *
 *
 * 【初期メニュー】
 *
 * ■初期状態
 * 初期状態で機能を有効にするかを設定します。
 *
 * ■メニュー表示
 * 機能が無効の場合、メニューに表示するかを設定します。
 *
 * ■有効・無効判定
 * 機能の有効・無効を判定するためのスイッチを設定します。
 *
 * ■無効時AP取得
 * 機能が無効の間もAPを取得するかを設定します。
 *
 *
 * 【表示文字】
 *
 * ■メニュー表示
 * メニューに表示するコマンドを設定します。
 *
 * ■AP名
 * 表示するAP名を設定します。
 *
 * ■取得
 * アビリティ取得コマンドに表示するコマンド(取得)を設定します。
 *
 * ■取得キャンセル
 * アビリティ取得コマンドに表示するコマンド(キャンセル)を設定します。
 *
 * ■習得
 * スキル習得コマンドに表示するコマンド(習得)を設定します。
 *
 * ■習得キャンセル
 * スキル習得コマンドに表示するコマンド(キャンセル)を設定します。
 *
 *
 * 【メッセージ】
 *
 * ■アビリティ取得確認
 * アビリティ取得確認メッセージを設定します。
 * ※１行目にアビリティ名が表示されます
 *
 * ■スキル習得確認
 * スキル習得確認メッセージを設定します。
 * ※１行目にスキル名が表示されます
 *
 * ■勝利獲得メッセージ
 * 勝利時にAPを獲得するメッセージを設定します。
 * %1：獲得AP　%2：AP名
 *
 *
 * 【色】
 *
 * ■取得済みライン色
 * 取得済みアビリティのラインの色を設定します。
 *
 * ■未取得ライン色
 * 未取得アビリティのラインの色を設定します。
 *
 *
 *
 * ■戦闘非参加メンバー
 * 戦闘非参加メンバーを戦闘勝利時のAP獲得対象にするかを設定します。
 *
 * ■スクロール矢印
 * スクロール可能時の矢印を表示するかを設定します。
 *
 *
 *
 *=====================================================================================================================================================
 * @param actorAbilityList
 * @text アクターアビリティ
 * @type struct<actorAbility>[]
 * @desc 各アクターのアビリティを設定
 *
 * @param apItemInfoList
 * @text AP獲得アイテム
 * @type struct<apItemInfo>[]
 * @desc AP獲得アイテムを設定
 *
 * @param gainMethod
 * @text AP獲得
 * @type string
 * @default ==================================
 *
 * @param gainMethodType
 * @text AP獲得方法
 * @type select
 * @option レベル
 * @value 0
 * @option 戦闘勝利
 * @value 1
 * @option その他
 * @value 2
 * @default 0
 * @parent gainMethod
 * @desc APの獲得方法を設定
 *
 * @param levelGainAp
 * @text 獲得AP(レベル)
 * @type struct<levelGainAp>
 * @parent gainMethod
 * @desc レベルアップ時に獲得するAPを設定
 *
 * @param troopGainApList
 * @text 獲得AP(戦闘勝利)
 * @type struct<troopGainAp>[]
 * @parent gainMethod
 * @desc 戦闘勝利時に獲得するAPを設定
 *
 * @param option
 * @text オプション
 * @type string
 * @default ==================================
 *
 * @param initMenu
 * @text 初期メニュー
 * @type string
 * @default ==================================
 * @parent option
 *
 * @param initEnabled
 * @text 初期状態
 * @type boolean
 * @on 有効
 * @off 無効
 * @default true
 * @parent initMenu
 * @desc 初期状態を有効・無効で設定
 *
 * @param menuShow
 * @text メニュー表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default true
 * @parent initMenu
 * @desc 無効の場合メニューに表示するかを設定
 *
 * @param enabledSwitchId
 * @text 有効・無効判定
 * @type switch
 * @parent initMenu
 * @desc 無効の場合有効・無効の判定を行うスイッチを設定
 *
 * @param invalidGain
 * @text 無効時AP取得
 * @type boolean
 * @on 取得する
 * @off 取得しない
 * @default false
 * @parent initMenu
 * @desc 無効の場合もAPを取得するかを設定
 *
 * @param text
 * @text 表示文字
 * @type string
 * @default ==================================
 * @parent option
 *
 * @param menuText
 * @text メニュー表示
 * @type string
 * @default アビリティボード
 * @parent text
 * @desc メニューコマンドに表示する文字を設定
 *
 * @param apNameText
 * @text AP名
 * @type string
 * @default AP
 * @parent text
 * @desc 表示するアビリティポイント名を設定
 *
 * @param acquisitionYesText
 * @text 取得
 * @type string
 * @default 取得する
 * @parent text
 * @desc アビリティ取得コマンド(取得)を設定
 *
 * @param acquisitionNoText
 * @text 取得キャンセル
 * @type string
 * @default 取得しない
 * @parent text
 * @desc アビリティ取得コマンド(取得キャンセル)を設定
 *
 * @param learnSkillYesText
 * @text 習得
 * @type string
 * @default 習得する
 * @parent text
 * @desc スキル習得コマンド(習得)を設定
 *
 * @param learnSkillNoText
 * @text 習得キャンセル
 * @type string
 * @default 習得しない
 * @parent text
 * @desc スキル習得コマンド(習得キャンセル)を設定
 *
 * @param message
 * @text メッセージ
 * @type string
 * @default ==================================
 * @parent option
 *
 * @param acquisitionMsg
 * @text アビリティ取得確認
 * @type string
 * @default このアビリティを取得しますか？
 * @parent message
 * @desc アビリティ取得確認メッセージを設定
 *       ※１行目にアビリティ名が表示されます
 *
 * @param learnSkillMsg
 * @text スキル習得確認
 * @type string
 * @default このスキルを習得しますか？
 * @parent message
 * @desc スキル習得確認メッセージを設定
 *       ※１行目にスキル名が表示されます
 *
 * @param winGainApMsg
 * @text 勝利獲得メッセージ
 * @type string
 * @default %1%2を獲得！
 * @parent message
 * @desc 勝利時にAPを獲得する場合のメッセージを設定
 *       %1：獲得AP　%2：AP名
 *
 * @param color
 * @text 色
 * @type string
 * @default ==================================
 * @parent option
 *
 * @param acquisitionLineColor
 * @text 取得済みライン色
 * @type string
 * @default #f0f8ff
 * @parent color
 * @desc 取得済みアビリティのライン色を設定
 *
 * @param notAcquisitionLineColor
 * @text 未取得ライン色
 * @type string
 * @default #808080
 * @parent color
 * @desc 未取得アビリティのライン色を設定
 *
 * @param gainBenchMembers
 * @text 戦闘非参加メンバー
 * @type boolean
 * @on 取得する
 * @off 取得しない
 * @default false
 * @desc 戦闘非参加メンバーを戦闘勝利時の獲得対象にするかを設定
 * @parent option
 *
 * @param drawArrow
 * @text スクロール矢印
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default true
 * @desc スクロール可能時の矢印を表示するかを設定
 * @parent option
 *
 */

/*~struct~actorAbility:ja
 * @param actorId
 * @text アクター
 * @type actor
 * @desc アクターを設定
 *
 * @param startX
 * @text 開始X軸
 * @type number
 * @min 0
 * @default 0
 * @desc アビリティ開始座標(X軸)を設定
 *
 * @param startY
 * @text 開始Y軸
 * @type number
 * @min 0
 * @default 0
 * @desc アビリティ開始座標(Y軸)を設定
 *
 * @param startIconId
 * @text 開始アイコン
 * @type number
 * @min -1
 * @default -1
 * @desc 開始アビリティに表示するアイコンを設定
 *       テキストタグ変更後に右クリックから設定可能
 *
 * @param abilityInfoList
 * @text アビリティ情報
 * @type struct<abilityInfo>[]
 * @desc アビリティ情報を設定
 *
 * @param startNextAbility
 * @text 移動先アビリティ
 * @type struct<nextAbility>
 * @desc キー入力による移動先アビリティの設定
 *
 */

/*~struct~abilityInfo:ja
 * @param id
 * @text ID
 * @type number
 * @min 1
 * @default 1
 * @desc アビリティIDを設定
 *
 * @param memo
 * @text メモ
 * @type string
 * @desc メモとして使用してください
 *       プラグイン上では使用されません
 *
 * @param name
 * @text アビリティ名
 * @type text
 * @desc アビリティ名を設定
 *
 * @param iconId
 * @text アイコン
 * @type number
 * @min 0
 * @default 0
 * @desc アビリティに表示するアイコンを設定
 *       テキストタグ変更後に右クリックから設定可能
 *
 * @param costAp
 * @text 必要AP
 * @type number
 * @min 1
 * @default 1
 * @desc 必要APを設定
 *
 * @param description
 * @text 説明
 * @type multiline_string
 * @desc アビリティの説明を設定
 *       スキルの場合、スキルの説明が設定されます
 *
 * @param parentId
 * @text 親アビリティID
 * @type number
 * @min 0
 * @default 0
 * @desc 基準となる親アビリティIDを設定
 *       0を設定すると開始位置が基準となります
 *
 * @param posX
 * @text 表示位置X軸
 * @type number
 * @min -99999
 * @default 0
 * @desc アビリティボードに表示する位置(X軸)を設定
 *       親アビリティの位置が基準となります
 *
 * @param posY
 * @text 表示位置Y軸
 * @type number
 * @min -99999
 * @default 0
 * @desc アビリティボードに表示する位置(Y軸)を設定
 *       親アビリティの位置が基準となります
 *
 * @param linkIdList
 * @text 紐づけ先ID
 * @type number[]
 * @min 1
 * @desc 親アビリティとは別に紐づけを行うアビリティを設定
 *       紐づけ先アビリティにも情報が設定されます
 *
 * @param groupLink
 * @text グループ化
 * @type boolean
 * @on グループ化にする
 * @off グループ化にしない
 * @default false
 * @desc 親と紐づけを行うアビリティをグループ化にするかを設定
 *       グループ化にすると全てのアビリティを取得後に取得可能になります
 *
 * @param nextAbility
 * @text 移動先アビリティ
 * @type struct<nextAbility>
 * @desc キー入力による移動先アビリティの設定
 *
 * @param effectType
 * @text アビリティタイプ
 * @type select
 * @option アビリティ獲得
 * @value 0
 * @option スキル習得
 * @value 1
 * @default 0
 * @desc アビリティのタイプを設定
 *
 * @param effect
 * @text アビリティ効果
 * @type string
 * @default ==================================
 *
 * @param resistance
 * @text 耐性
 * @type string
 * @parent effect
 * @default ==================================
 *
 * @param elementRateList
 * @text 属性有効度
 * @type struct<elementRate>[]
 * @parent resistance
 * @desc 属性有効度を設定
 *       詳細についてはツクールのヘルプを参照
 *
 * @param weakRateList
 * @text 弱体有効度
 * @type struct<weakRate>[]
 * @parent resistance
 * @desc 弱体有効度を設定
 *       詳細についてはツクールのヘルプを参照
 *
 * @param stateRateList
 * @text ステート有効度
 * @type struct<stateRate>[]
 * @parent resistance
 * @desc ステート有効度を設定
 *       詳細についてはツクールのヘルプを参照
 *
 * @param stateResistIdList
 * @text ステート無効
 * @type state[]
 * @parent resistance
 * @desc 無効化するステートを設定
 *       詳細についてはツクールのヘルプを参照
 *
 * @param parameter
 * @text 能力値
 * @type string
 * @parent effect
 * @default ==================================
 *
 * @param normalParamList
 * @text 通常能力値
 * @type struct<normalParam>[]
 * @parent parameter
 * @desc 通常能力値を設定
 *
 * @param xparamInfoList
 * @text 追加能力値
 * @type struct<xparamInfo>[]
 * @parent parameter
 * @desc 追加能力値を設定
 *
 * @param sparamInfoList
 * @text 特殊能力値
 * @type struct<sparamInfo>[]
 * @parent parameter
 * @desc 特殊能力値を設定
 *
 * @param others
 * @text その他
 * @type string
 * @parent effect
 * @default ==================================
 *
 * @param atkStateList
 * @text 攻撃時ステート
 * @type struct<atkState>[]
 * @parent others
 * @desc 攻撃時ステートを設定
 *       詳細についてはツクールのヘルプを参照
 *
 * @param addAtackTimes
 * @text 攻撃回数追加
 * @type number
 * @min 0
 * @parent others
 * @desc 攻撃回数追加を設定
 *       詳細についてはツクールのヘルプを参照
 *
 * @param skillId
 * @text スキル習得
 * @type skill
 * @parent others
 * @desc 習得するスキルを設定
 *
 */

/*~struct~elementRate:ja
 * @param elementId
 * @text 属性ID
 * @type number
 * @min 1
 * @default 1
 * @desc 属性IDを設定
 *       属性IDはデータベースのタイプを参照
 *
 * @param operationType
 * @text 強化タイプ
 * @type select
 * @option 強化
 * @value 0
 * @option 弱体
 * @value 1
 * @default 0
 * @desc 属性有効度の強弱を設定
 *
 * @param value
 * @text 値(％)
 * @type number
 * @min 0
 * @max 1000
 * @default 0
 * @desc 属性有効度を％で設定
 *
 */

/*~struct~weakRate:ja
 * @param paramId
 * @text 能力
 * @type select
 * @option 最大HP
 * @value 0
 * @option 最大MP
 * @value 1
 * @option 攻撃力
 * @value 2
 * @option 防御力
 * @value 3
 * @option 魔法力
 * @value 4
 * @option 魔法防御
 * @value 5
 * @option 敏捷性
 * @value 6
 * @option 運
 * @value 7
 * @default 0
 * @desc 能力を設定
 *
 * @param operationType
 * @text 強化タイプ
 * @type select
 * @option 強化
 * @value 0
 * @option 弱体
 * @value 1
 * @default 0
 * @desc 弱体有効度の強弱を設定
 *
 * @param value
 * @text 値(％)
 * @type number
 * @min 0
 * @max 1000
 * @default 0
 * @desc 弱体有効度を％で設定
 *
 */

/*~struct~stateRate:ja
 * @param stateId
 * @text ステート
 * @type state
 * @default 1
 * @desc ステートを設定
 *
 * @param operationType
 * @text 強化タイプ
 * @type select
 * @option 強化
 * @value 0
 * @option 弱体
 * @value 1
 * @default 0
 * @desc ステート有効度の強弱を設定
 *
 * @param value
 * @text 値(％)
 * @type number
 * @min 0
 * @max 1000
 * @default 0
 * @desc ステート有効度を％で設定
 *
 */

/*~struct~normalParam:ja
 * @param paramId
 * @text 能力
 * @type select
 * @option 最大HP
 * @value 0
 * @option 最大MP
 * @value 1
 * @option 攻撃力
 * @value 2
 * @option 防御力
 * @value 3
 * @option 魔法力
 * @value 4
 * @option 魔法防御
 * @value 5
 * @option 敏捷性
 * @value 6
 * @option 運
 * @value 7
 * @default 0
 * @desc 設定する能力を設定
 *
 * @param operationType
 * @text 増減
 * @type select
 * @option 増やす
 * @value 0
 * @option 減らす
 * @value 1
 * @default 0
 * @desc 能力値の増減方法を設定
 *
 * @param valueType
 * @text 設定値タイプ
 * @type select
 * @option 固定値
 * @value 0
 * @option 増減率(％)
 * @value 1
 * @default 0
 * @desc 設定値タイプを設定
 *
 * @param value
 * @text 設定値
 * @type number
 * @min 0
 * @default 0
 * @desc 能力値の増減値を設定
 *
 */

/*~struct~xparamInfo:ja
 * @param paramId
 * @text 能力
 * @type select
 * @option 命中率
 * @value 0
 * @option 回避率
 * @value 1
 * @option 会心率
 * @value 2
 * @option 会心回避率
 * @value 3
 * @option 魔法回避率
 * @value 4
 * @option 魔法反射率
 * @value 5
 * @option 反撃率
 * @value 6
 * @option HP再生率
 * @value 7
 * @option MP再生率
 * @value 8
 * @option TP再生率
 * @value 9
 * @default 0
 * @desc 能力を設定
 *
 * @param operationType
 * @text 増減
 * @type select
 * @option 増やす
 * @value 0
 * @option 減らす
 * @value 1
 * @default 0
 * @desc 能力値の増減方法を設定
 *
 * @param value
 * @text 値(％)
 * @type number
 * @min 0
 * @max 1000
 * @default 0
 * @desc 能力値の増減値を設定
 *
 */

/*~struct~sparamInfo:ja
 * @param paramId
 * @text 能力
 * @type select
 * @option 狙われ率
 * @value 0
 * @option 防護効果率
 * @value 1
 * @option 回復効果率
 * @value 2
 * @option 薬の知識
 * @value 3
 * @option MP消費率
 * @value 4
 * @option TPチャージ率
 * @value 5
 * @option 物理ダメージ率
 * @value 6
 * @option 魔法ダメージ率
 * @value 7
 * @option 床ダメージ率
 * @value 8
 * @option 経験獲得率
 * @value 9
 * @default 0
 * @desc 能力を設定
 *
 * @param operationType
 * @text 増減
 * @type select
 * @option 増やす
 * @value 0
 * @option 減らす
 * @value 1
 * @default 0
 * @desc 能力値の増減方法を設定
 *
 * @param value
 * @text 値(％)
 * @type number
 * @min 0
 * @max 1000
 * @default 0
 * @desc 能力値を％で設定
 *
 */

/*~struct~atkState:ja
 * @param stateId
 * @text 付加ステート
 * @type state
 * @default 1
 * @desc 攻撃時に付加するステートを設定
 *
 * @param value
 * @text 値(％)
 * @type number
 * @min 0
 * @max 1000
 * @default 0
 * @desc 攻撃時にステートを付加する確率を設定
 *
 */

/*~struct~nextAbility:ja
 * @param keyUp
 * @text 移動先ID(上キー)
 * @type number
 * @min 0
 * @desc 上キー移動先アビリティIDを設定
 *       0の場合開始場所へ移動
 *
 * @param keyRight
 * @text 移動先ID(右キー)
 * @type number
 * @min 0
 * @desc 右キー移動先アビリティIDを設定
 *       0の場合開始場所へ移動
 *
 * @param keyDown
 * @text 移動先ID(下キー)
 * @type number
 * @min 0
 * @desc 下キー移動先アビリティIDを設定
 *       0の場合開始場所へ移動
 *
 * @param keyLeft
 * @text 移動先ID(左キー)
 * @type number
 * @min 0
 * @desc 左キー移動先アビリティIDを設定
 *       0の場合開始場所へ移動
 */

/*~struct~apItemInfo:ja
 * @param id
 * @text AP獲得アイテム
 * @type item
 * @desc APを獲得するアイテムを設定
 *
 * @param value
 * @text 獲得値
 * @type number
 * @min 1
 * @default 1
 * @desc AP獲得値を設定
 */

/*~struct~levelGainAp:ja
 * @param setRange
 * @text 設定範囲
 * @type select
 * @option 全体
 * @value 0
 * @option アクター別
 * @value 1
 * @default 0
 * @desc レベルアップ時に獲得するAPの設定範囲を設定
 *
 * @param value
 * @text 獲得値(全体)
 * @type number
 * @min 1
 * @default 1
 * @desc 全アクターのAP獲得値を設定
 *
 * @param actorLevelGainApList
 * @text 獲得値(アクター別)
 * @type struct<actorLevelGainAp>[]
 * @desc アクター毎にAP獲得値を設定
 *
 */

/*~struct~actorLevelGainAp:ja
 * @param actorId
 * @text アクター
 * @type actor
 * @desc 獲得するAPを設定するアクターを設定
 *
 * @param value
 * @text 獲得値
 * @type number
 * @min 1
 * @default 1
 * @desc アクターのAP獲得値を設定
 *
 */

/*~struct~troopGainAp:ja
 * @param value
 * @text 獲得値
 * @type number
 * @min 1
 * @default 1
 * @desc 勝利時のAP獲得値を設定
 *
 * @param troopList
 * @text 敵グループ
 * @type troop[]
 * @desc 獲得するAPを設定する敵グループを設定
 *
 */

(() => {
    "use strict";

    let $abilityBoard = null;

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
    // AbilityBoard
    //-----------------------------------------------------------------------------
    function AbilityBoard() {
        this.initialize(...arguments);
    }

    AbilityBoard.KEY = "ability_board";
    AbilityBoard.ICON_SIZE = 48;

    AbilityBoard.EFFECT_TYPE_Skill = 1;
    AbilityBoard.OPERATION_TYPE_INCREASE = 0;
    AbilityBoard.MSG_TYPE_ABILITY = 0;
    AbilityBoard.MSG_TYPE_Skill = 1;
    AbilityBoard.VALUE_TYPE_FIXED = 0;
    AbilityBoard.GAIN_METHOD_LEVEL = 0;
    AbilityBoard.GAIN_METHOD_TROOP = 1;
    AbilityBoard.SET_GAIN_RANGE_ACTOR = 1;

    AbilityBoard.prototype.initialize = function () {
        this._actorAbilities = {};
        this._apItemInfoList = [];
        this._initEnabled = false;
        this._menuShow = false;
        this._enabledSwitchId = 0;
        this._invalidGain = false;
        this._gainMethodType = 0;
        this._levelGainAp = null;
        this._troopGainApList = [];
        this._gainBenchMembers = false;
        this._drawArrow = false;
        this._menuText = null;
        this._apNameText = null;
        this._acquisitionMsg = null;
        this._learnSkillMsg = null;
        this._winGainApMsg = null;
        this._acquisitionYesText = null;
        this._acquisitionNoText = null;
        this._learnSkillYesText = null;
        this._learnSkillNoText = null;
        this._acquisitionLineColor = null;
        this._notAcquisitionLineColor = null;

        this._actor = null;

        this.setup();
    };

    AbilityBoard.prototype.setup = function () {
        this._apItemInfoList = params.apItemInfoList;
        this._initEnabled = params.initEnabled;
        this._menuShow = params.menuShow;
        this._enabledSwitchId = params.enabledSwitchId;
        this._invalidGain = params.invalidGain;
        this._gainMethodType = params.gainMethodType;
        this._levelGainAp = params.levelGainAp;
        this._troopGainApList = params.troopGainApList;
        this._gainBenchMembers = params.gainBenchMembers;
        this._drawArrow = params.drawArrow;
        this._menuText = params.menuText;
        this._apNameText = params.apNameText;
        this._acquisitionMsg = params.acquisitionMsg;
        this._learnSkillMsg = params.learnSkillMsg;
        this._winGainApMsg = params.winGainApMsg;
        this._acquisitionYesText = params.acquisitionYesText;
        this._acquisitionNoText = params.acquisitionNoText;
        this._learnSkillYesText = params.learnSkillYesText;
        this._learnSkillNoText = params.learnSkillNoText;
        this._acquisitionLineColor = params.acquisitionLineColor;
        this._notAcquisitionLineColor = params.notAcquisitionLineColor;

        this.setActorAbility();
    };

    AbilityBoard.prototype.setActorAbility = function () {
        if (params.actorAbilityList) {
            params.actorAbilityList.forEach((actorAbility) => {
                const ability = {};
                ability.actorId = actorAbility.actorId;
                ability.startX = actorAbility.startX;
                ability.startY = actorAbility.startY;
                ability.startIconId = actorAbility.startIconId;
                ability.startNextAbility = actorAbility.startNextAbility;
                ability.abilityInfoList = actorAbility.abilityInfoList;

                this._actorAbilities[actorAbility.actorId] = ability;
            });
        }
    };

    AbilityBoard.prototype.setActor = function (actor) {
        this._actor = actor;
    };

    AbilityBoard.prototype.acquisition = function (item) {
        if (item.effectType === AbilityBoard.EFFECT_TYPE_Skill) {
            this.learnSkill(item);
        } else {
            this.acquisitionElementRate(item);
            this.acquisitionWeakRate(item);
            this.acquisitionStateRate(item);
            this.acquisitionStateResist(item);
            this.acquisitionNormalParam(item);
            this.acquisitionXparam(item);
            this.acquisitionSparam(item);
            this.acquisitionAtkState(item);
            this.acquisitionAddAtkTimes(item);
        }

        this.addAbility(item);
    };

    AbilityBoard.prototype.acquisitionElementRate = function (item) {
        if (item.elementRateList) {
            for (const elementRate of item.elementRateList) {
                const elementId = elementRate.elementId;
                const value = this.calcOperation(elementRate);
                this._actor.addElementRateAbility(elementId, value);
            }
        }
    };

    AbilityBoard.prototype.acquisitionWeakRate = function (item) {
        if (item.weakRateList) {
            for (const weakRate of item.weakRateList) {
                const paramId = weakRate.paramId;
                const value = this.calcOperation(weakRate);
                this._actor.addWeakRateAbility(paramId, value);
            }
        }
    };

    AbilityBoard.prototype.acquisitionStateRate = function (item) {
        if (item.stateRateList) {
            for (const stateRate of item.stateRateList) {
                const stateId = stateRate.stateId;
                const value = this.calcOperation(stateRate);
                this._actor.addStateRateAbility(stateId, value);
            }
        }
    };

    AbilityBoard.prototype.acquisitionStateResist = function (item) {
        if (item.stateResistIdList) {
            for (const stateResistId of item.stateResistIdList) {
                this._actor.addStateResistAbility(stateResistId);
            }
        }
    };

    AbilityBoard.prototype.acquisitionNormalParam = function (item) {
        if (item.normalParamList) {
            for (const normalParam of item.normalParamList) {
                const paramId = normalParam.paramId;
                const value = this.calcOperation(normalParam);
                console.log(value);

                if (normalParam.valueType === AbilityBoard.VALUE_TYPE_FIXED) {
                    this._actor.addParam(paramId, value);
                } else {
                    this._actor.addParamRateAbility(paramId, value);
                }
            }

            this._actor.refresh();
        }
    };

    AbilityBoard.prototype.acquisitionXparam = function (item) {
        if (item.xparamInfoList) {
            for (const xparamInfo of item.xparamInfoList) {
                const paramId = xparamInfo.paramId;
                const value = this.calcOperation(xparamInfo);
                this._actor.addXparamAbility(paramId, value);
            }
        }
    };

    AbilityBoard.prototype.acquisitionSparam = function (item) {
        if (item.sparamInfoList) {
            for (const sparamInfo of item.sparamInfoList) {
                const paramId = sparamInfo.paramId;
                const value = this.calcOperation(sparamInfo);
                this._actor.addSparamAbility(paramId, value);
            }
        }
    };

    AbilityBoard.prototype.acquisitionAtkState = function (item) {
        if (item.atkStateList) {
            for (const atkState of item.atkStateList) {
                const stateId = atkState.stateId;
                const value = atkState.value;
                this._actor.addAtkStateAbility(stateId, value);
            }
        }
    };

    AbilityBoard.prototype.acquisitionAddAtkTimes = function (item) {
        if (item.addAtackTimes) {
            this._actor.addAtackTimesAbility(item.addAtackTimes);
        }
    };

    AbilityBoard.prototype.learnSkill = function (item) {
        if (item.skillId && item.costAp) {
            this.addAbility(item);
            this._actor.learnSkill(item.skillId);
        }
    };

    AbilityBoard.prototype.addAbility = function (item) {
        if (item.costAp) {
            this._actor.payAp(item.costAp);
            this._actor.addAbility(item.id);
        }
    };

    AbilityBoard.prototype.ability = function () {
        return this._actorAbilities[this._actor.actorId()];
    };

    AbilityBoard.prototype.isActorAbility = function (actor) {
        return actor.actorId() in this._actorAbilities;
    };

    AbilityBoard.prototype.isApItem = function (item) {
        return DataManager.isItem(item) && this._apItemInfoList && this._apItemInfoList.some((apItemInfo) => apItemInfo.id === item.id);
    };

    AbilityBoard.prototype.apItem = function (item) {
        return this._apItemInfoList.find((apItemInfo) => apItemInfo.id === item.id);
    };

    AbilityBoard.prototype.isEnabled = function () {
        return this._initEnabled || $gameSwitches.value(this._enabledSwitchId);
    };

    AbilityBoard.prototype.isMenuShow = function () {
        return this._menuShow;
    };

    AbilityBoard.prototype.isGainAp = function () {
        return this.isEnabled() || this._invalidGain;
    };

    AbilityBoard.prototype.gainMethodType = function () {
        return this._gainMethodType;
    };

    AbilityBoard.prototype.gainActorRange = function () {
        return this._levelGainAp ? this._levelGainAp.setRange : -1;
    };

    AbilityBoard.prototype.levelGainAp = function () {
        let gainAp = 0;
        if (this._levelGainAp) {
            gainAp = this._levelGainAp.value;
        }
        return gainAp ? gainAp : 0;
    };

    AbilityBoard.prototype.actorLevelGainAp = function (actor) {
        let gainAp = 0;
        if (this._levelGainAp && this._levelGainAp.actorLevelGainApList) {
            const actorAp = this._levelGainAp.actorLevelGainApList.find((actorLevelGainAp) => actorLevelGainAp.actorId === actor.actorId());
            gainAp = actorAp ? actorAp.value : 0;
        }
        return gainAp;
    };

    AbilityBoard.prototype.troopGainAp = function (troop) {
        let gainAp = 0;
        if (this._troopGainApList) {
            const troopAp = this._troopGainApList.find((troopGainAp) => troopGainAp.troopList && troopGainAp.troopList.includes(troop.id));
            if (troopAp) {
                gainAp = troopAp.value;
            }
        }
        return gainAp;
    };

    AbilityBoard.prototype.calcOperation = function (item) {
        if (item.operationType) {
            return item.operationType === AbilityBoard.OPERATION_TYPE_INCREASE ? item.value : item.value * -1;
        } else {
            return item.value;
        }
    };

    AbilityBoard.prototype.isGainBenchMembers = function () {
        return this._gainBenchMembers;
    };

    AbilityBoard.prototype.isDrawArrow = function () {
        return this._drawArrow;
    };

    AbilityBoard.prototype.menuText = function () {
        return this._menuText;
    };

    AbilityBoard.prototype.apNameText = function () {
        return this._apNameText;
    };

    AbilityBoard.prototype.acquisitionMsg = function () {
        return this._acquisitionMsg;
    };

    AbilityBoard.prototype.learnSkillMsg = function () {
        return this._learnSkillMsg;
    };

    AbilityBoard.prototype.winGainApMsg = function () {
        return this._winGainApMsg;
    };

    AbilityBoard.prototype.acquisitionYesText = function () {
        return this._acquisitionYesText;
    };

    AbilityBoard.prototype.acquisitionNoText = function () {
        return this._acquisitionNoText;
    };

    AbilityBoard.prototype.learnSkillYesText = function () {
        return this._learnSkillYesText;
    };

    AbilityBoard.prototype.learnSkillNoText = function () {
        return this._learnSkillNoText;
    };

    AbilityBoard.prototype.acquisitionLineColor = function () {
        return this._acquisitionLineColor;
    };

    AbilityBoard.prototype.notAcquisitionLineColor = function () {
        return this._notAcquisitionLineColor;
    };

    //-----------------------------------------------------------------------------
    // Scene_AbilityBoard
    //-----------------------------------------------------------------------------
    function Scene_AbilityBoard() {
        this.initialize(...arguments);
    }

    Scene_AbilityBoard.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_AbilityBoard.prototype.constructor = Scene_AbilityBoard;

    Scene_AbilityBoard.prototype.initialize = function () {
        Scene_MenuBase.prototype.initialize.call(this);
    };

    Scene_AbilityBoard.prototype.create = function () {
        Scene_MenuBase.prototype.create.call(this);

        this.createAbilityActorInfoWindow();
        this.createAbilityContentWindow();
        this.createAbilityBoardWindow();
        this.createHelpWindow();
        this.createAcquisitionCommandWindow();
        this.refreshActor();
    };

    Scene_AbilityBoard.prototype.start = function () {
        Scene_MenuBase.prototype.start.call(this);
        this._helpWindow.hide();
        this._acquisitionCommandWindow.hide();
        this._acquisitionCommandWindow.deactivate();
    };

    Scene_AbilityBoard.prototype.createAbilityActorInfoWindow = function () {
        const rect = this.actorInfoWindowRect();
        this._actorInfoWindow = new Window_AbilityActorInfo(rect);
        this.addWindow(this._actorInfoWindow);
    };

    Scene_AbilityBoard.prototype.actorInfoWindowRect = function () {
        const wx = 0;
        const wy = this.mainAreaTop();
        const ww = Math.floor(Graphics.boxWidth / 2);
        const wh = this.calcWindowHeight(1, true);
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_AbilityBoard.prototype.createAbilityContentWindow = function () {
        const rect = this.contentWindowRect();
        this._contentWindow = new Window_AbilityContent(rect);
        this.addWindow(this._contentWindow);
    };

    Scene_AbilityBoard.prototype.contentWindowRect = function () {
        const wx = this._actorInfoWindow.width;
        const wy = this.mainAreaTop();
        const ww = Math.floor(Graphics.boxWidth / 2);
        const wh = this.calcWindowHeight(1, true);
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_AbilityBoard.prototype.createAbilityBoardWindow = function () {
        const rect = this.abilityBoardWindowRect();
        this._abilityBoardWindow = new Window_AbilityBoard(rect);
        this._abilityBoardWindow.setContentWindow(this._contentWindow);
        this._abilityBoardWindow.setHandler("ok", this.onSelectAbility.bind(this));
        this._abilityBoardWindow.setHandler("cancel", this.popScene.bind(this));
        this._abilityBoardWindow.setHandler("pagedown", this.nextActor.bind(this));
        this._abilityBoardWindow.setHandler("pageup", this.previousActor.bind(this));
        this.addWindow(this._abilityBoardWindow);
    };

    Scene_AbilityBoard.prototype.abilityBoardWindowRect = function () {
        const wx = 0;
        const wy = this._actorInfoWindow.y + this._actorInfoWindow.height;
        const ww = Graphics.boxWidth;
        const wh = Graphics.boxHeight - wy;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_AbilityBoard.prototype.onSelectAbility = function () {
        const item = this._abilityBoardWindow.item();
        if (this._abilityBoardWindow.isAbility(item.id)) {
            this._abilityBoardWindow.activate();
        } else {
            if (this._abilityBoardWindow.isEnabled(item)) {
                this._abilityBoardWindow.deactivate();
                this._helpWindow.show();
                this._acquisitionCommandWindow.show();
                this._acquisitionCommandWindow.activate();
                this._acquisitionCommandWindow.setItem(item);
                this._acquisitionCommandWindow.select(0);
            } else {
                SoundManager.playBuzzer();
                this._abilityBoardWindow.activate();
            }
        }
    };

    Scene_AbilityBoard.prototype.nextActor = function () {
        if (this._abilityBoardWindow.isOpenAndActive()) {
            while (true) {
                $gameParty.makeMenuActorNext();
                this.updateActor();
                if ($abilityBoard.isActorAbility(this.actor())) {
                    this.onActorChange();
                    break;
                }
            }
        }
    };

    Scene_AbilityBoard.prototype.previousActor = function () {
        if (this._abilityBoardWindow.isOpenAndActive()) {
            while (true) {
                $gameParty.makeMenuActorPrevious();
                this.updateActor();
                if ($abilityBoard.isActorAbility(this.actor())) {
                    this.onActorChange();
                    break;
                }
            }
        }
    };

    Scene_AbilityBoard.prototype.onActorChange = function () {
        Scene_MenuBase.prototype.onActorChange.call(this);
        this.refreshActor();
    };

    Scene_AbilityBoard.prototype.createAcquisitionCommandWindow = function () {
        const rect = this.acquisitionCommandWindowRect();
        this._acquisitionCommandWindow = new Window_AcquisitionCommand(rect);
        this._acquisitionCommandWindow.setHelpWindow(this._helpWindow);
        this._acquisitionCommandWindow.setHandler("yes", this.onOkAcquisition.bind(this));
        this._acquisitionCommandWindow.setHandler("no", this.onCancelAcquisition.bind(this));
        this._acquisitionCommandWindow.setHandler("cancel", this.onCancelAcquisition.bind(this));
        this.addWindow(this._acquisitionCommandWindow);
    };

    Scene_AbilityBoard.prototype.acquisitionCommandWindowRect = function () {
        const ww = Math.floor(Graphics.boxWidth / 2) + Math.floor(Graphics.boxWidth / 4);
        const wh = this.calcWindowHeight(5, false);
        const wx = Math.floor(Graphics.boxWidth / 2) - Math.floor(ww / 2);
        const wy = Math.floor(Graphics.boxHeight / 3);
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_AbilityBoard.prototype.onOkAcquisition = function () {
        const item = this._abilityBoardWindow.item();
        $abilityBoard.acquisition(item);
        this._abilityBoardWindow.activate();
        this._abilityBoardWindow.refresh();
        this._actorInfoWindow.refresh();
        this._helpWindow.hide();
        this._acquisitionCommandWindow.deactivate();
        this._acquisitionCommandWindow.hide();
        SoundManager.playUseItem();
    };

    Scene_AbilityBoard.prototype.onCancelAcquisition = function () {
        this._helpWindow.hide();
        this._acquisitionCommandWindow.hide();
        this._acquisitionCommandWindow.deactivate();
        this._abilityBoardWindow.activate();
    };

    Scene_AbilityBoard.prototype.refreshActor = function () {
        const actor = this.actor();
        $abilityBoard.setActor(actor);
        this._actorInfoWindow.setActor(actor);
        this._contentWindow.refresh();
        this._abilityBoardWindow.setActor(actor);
    };

    Scene_AbilityBoard.prototype.item = function () {
        return this._abilityBoardWindow.item();
    };

    Scene_AbilityBoard.prototype.needsPageButtons = function () {
        return true;
    };

    //-----------------------------------------------------------------------------
    // Window_AbilityActorInfo
    //-----------------------------------------------------------------------------
    function Window_AbilityActorInfo() {
        this.initialize.apply(this, arguments);
    }

    Window_AbilityActorInfo.prototype = Object.create(Window_StatusBase.prototype);
    Window_AbilityActorInfo.prototype.constructor = Window_AbilityActorInfo;

    Window_AbilityActorInfo.prototype.initialize = function (rect) {
        Window_Base.prototype.initialize.call(this, rect);
    };

    Window_AbilityActorInfo.prototype.initialize = function (rect) {
        Window_StatusBase.prototype.initialize.call(this, rect);
        this._actor = null;
        this.activate();
    };

    Window_AbilityActorInfo.prototype.setActor = function (actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            this.refresh();
        }
    };

    Window_AbilityActorInfo.prototype.refresh = function () {
        Window_StatusBase.prototype.refresh.call(this);
        if (this._actor) {
            this.drawActorInfo();
        }
    };

    Window_AbilityActorInfo.prototype.drawActorInfo = function () {
        this.drawActorName(this._actor, 6, 0, 168);

        const rect = this.itemLineRect(0);
        this.drawAp(rect.x, rect.y, rect.width);
    };

    Window_AbilityActorInfo.prototype.drawAp = function (x, y, width) {
        this.drawText($abilityBoard.apNameText() + ":" + String(this._actor.ap()), x, y, width, "right");
    };

    //-----------------------------------------------------------------------------
    // Window_AbilityContent
    //-----------------------------------------------------------------------------
    function Window_AbilityContent() {
        this.initialize.apply(this, arguments);
    }

    Window_AbilityContent.prototype = Object.create(Window_StatusBase.prototype);
    Window_AbilityContent.prototype.constructor = Window_AbilityContent;

    Window_AbilityContent.prototype.initialize = function (rect) {
        Window_StatusBase.prototype.initialize.call(this, rect);
        this._item = null;
        this.activate();
    };

    Window_AbilityContent.prototype.setItem = function (item) {
        if (this._item !== item) {
            this._item = item;
            this.refresh();
        }
    };

    Window_AbilityContent.prototype.refresh = function () {
        Window_StatusBase.prototype.refresh.call(this);
        if (this._item) {
            this.drawContent();
        }
    };

    Window_AbilityContent.prototype.drawContent = function () {
        const rect = this.itemLineRect(0);

        if (this._item) {
            const name = this._item.effectType === AbilityBoard.EFFECT_TYPE_Skill ? $dataSkills[this._item.skillId].name : this._item.name;
            this.drawText(name ? name : "", rect.x, rect.y, rect.width);
            this.drawText(this._item.costAp ? $abilityBoard.apNameText() + String(this._item.costAp) : "", rect.x, rect.y, rect.width, "right");
        }
    };

    //-----------------------------------------------------------------------------
    // Window_AbilityBoard
    //-----------------------------------------------------------------------------
    function Window_AbilityBoard() {
        this.initialize.apply(this, arguments);
    }

    Window_AbilityBoard.prototype = Object.create(Window_Selectable.prototype);
    Window_AbilityBoard.prototype.constructor = Window_AbilityBoard;

    Window_AbilityBoard.prototype.initialize = function (rect) {
        this._leftArrowSprite = null;
        this._rightArrowSprite = null;
        this.leftArrowVisible = false;
        this.rightArrowVisible = false;

        Window_Selectable.prototype.initialize.call(this, rect);
        this._actor = null;
        this._startX = 0;
        this._startY = 0;
        this._startIconId = 0;
        this._abilityInfoList = [];
        this._startNextAbility = {};
        this._data = {};
        this._selectId = 0;
        this._maxScrollX = 0;
        this._maxScrollY = 0;
        this.activate();
    };

    Window_AbilityBoard.prototype.isScrollEnabled = function () {
        return this.active;
    };

    Window_AbilityBoard.prototype.setActor = function (actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            this._selectId = 0;
            this.setAbility();
            this.setAbilityInfo();
            this.refresh();
            this.scrollToStartPos();
        }
    };

    Window_AbilityBoard.prototype.setAbility = function () {
        const actorAbility = $abilityBoard.ability();
        this._startX = actorAbility.startX;
        this._startY = actorAbility.startY;
        this._startIconId = actorAbility.startIconId;
        this._abilityInfoList = actorAbility.abilityInfoList;
        this._startNextAbility = actorAbility.startNextAbility;
    };

    Window_AbilityBoard.prototype.setAbilityInfo = function () {
        const data = {};
        data[0] = { baseX: this._startX, baseY: this._startY };

        const size = AbilityBoard.ICON_SIZE;

        for (const abilityInfo of this._abilityInfoList) {
            if (!abilityInfo.description) {
                abilityInfo.description = "";
            }
            this.setBasePos(abilityInfo, data);
            this.setNeedId(abilityInfo);
        }

        this._maxScrollX -= this.innerWidth - size * 2;
        this._maxScrollY -= this.innerHeight - size * 2;
    };

    Window_AbilityBoard.prototype.setBasePos = function (abilityInfo, data) {
        const size = AbilityBoard.ICON_SIZE;

        const parent = data[abilityInfo.parentId];

        const parentX = parent.baseX;
        const parentY = parent.baseY;

        if (abilityInfo.posX < 0) {
            abilityInfo.baseX = parentX + abilityInfo.posX - size;
        } else if (abilityInfo.posX > 0) {
            abilityInfo.baseX = parentX + abilityInfo.posX + size;
        } else {
            abilityInfo.baseX = parentX + abilityInfo.posX;
        }

        if (abilityInfo.posY < 0) {
            abilityInfo.baseY = parentY + abilityInfo.posY - size;
        } else if (abilityInfo.posY > 0) {
            abilityInfo.baseY = parentY + abilityInfo.posY + size;
        } else {
            abilityInfo.baseY = parentY + abilityInfo.posY;
        }

        abilityInfo.parentX = parentX;
        abilityInfo.parentY = parentY;

        if (abilityInfo.baseX > this._maxScrollX) {
            this._maxScrollX = Math.max(this.innerWidth, abilityInfo.baseX);
        }

        if (abilityInfo.baseY > this._maxScrollY) {
            this._maxScrollY = Math.max(this.innerHeight, abilityInfo.baseY);
        }

        data[abilityInfo.id] = abilityInfo;
    };

    Window_AbilityBoard.prototype.setNeedId = function (abilityInfo) {
        abilityInfo.needIdList = abilityInfo.linkIdList ? abilityInfo.linkIdList : [];

        if (abilityInfo.parentId > 0 && !abilityInfo.needIdList.includes(abilityInfo.parentId)) {
            abilityInfo.needIdList.push(abilityInfo.parentId);
        }

        this._abilityInfoList.forEach((linkInfo) => {
            if (abilityInfo.id !== linkInfo.id) {
                if (linkInfo.parentId === abilityInfo.id && !abilityInfo.needIdList.includes(linkInfo.id)) {
                    abilityInfo.needIdList.push(linkInfo.id);
                }

                if (linkInfo.linkIdList && linkInfo.linkIdList.includes(abilityInfo.id)) {
                    abilityInfo.needIdList.push(linkInfo.id);
                }
            }
        });
    };

    Window_AbilityBoard.prototype.setContentWindow = function (contentWindow) {
        this._contentWindow = contentWindow;
    };

    Window_AbilityBoard.prototype.makeItemList = function () {
        this._data = {};
        if (this._abilityInfoList) {
            this.makeStartItem();
            for (const item of this._abilityInfoList) {
                this.makeItem(item);
            }
        }
    };

    Window_AbilityBoard.prototype.makeStartItem = function () {
        const item = {};
        item.id = 0;
        item.iconId = this._startIconId;
        item.baseX = this._startX;
        item.baseY = this._startY;
        item.parentX = -1;
        item.parentY = -1;
        item.nextAbility = this._startNextAbility;

        this.makeItem(item);
    };

    Window_AbilityBoard.prototype.makeItem = function (item) {
        const data = {};
        data.id = item.id;
        data.x1 = item.baseX;
        data.x2 = item.baseX + AbilityBoard.ICON_SIZE;
        data.y1 = item.baseY;
        data.y2 = item.baseY + AbilityBoard.ICON_SIZE;

        data.parentX1 = item.parentX;
        data.parentX2 = item.parentX + AbilityBoard.ICON_SIZE;
        data.parentY1 = item.parentY;
        data.parentY2 = item.parentY + AbilityBoard.ICON_SIZE;

        data.linkPosList = [];

        if (item.linkIdList) {
            item.linkIdList.forEach((linkId) => {
                const linkData = this._abilityInfoList.find((linkInfo) => linkInfo.id === linkId);
                if (linkData) {
                    const linkPos = {};
                    linkPos.id = linkData.id;
                    linkPos.x1 = linkData.baseX;
                    linkPos.x2 = linkData.baseX + AbilityBoard.ICON_SIZE;
                    linkPos.y1 = linkData.baseY;
                    linkPos.y2 = linkData.baseY + AbilityBoard.ICON_SIZE;

                    data.linkPosList.push(linkPos);
                }
            });
        }

        data.item = item;

        this._data[item.id] = data;
    };

    Window_AbilityBoard.prototype.scrollToStartPos = function () {
        const size = AbilityBoard.ICON_SIZE;
        const x = this._startX - (Math.floor(this.innerWidth / 2) - Math.floor(size / 2));
        const y = this._startY - (Math.floor(this.innerHeight / 2) - Math.floor(size / 2));

        this.scrollTo(x, y);
    };

    Window_AbilityBoard.prototype.drawAllItems = function () {
        if (this._data) {
            for (const id in this._data) {
                const data = this._data[id];

                let isDraw = false;

                if (!this.isOverItem(data.x1, data.x2, data.y1, data.y2)) {
                    isDraw = true;
                }

                if (!isDraw && !this.isOverItem(data.parentX1, data.parentX2, data.parentY1, data.parentY2)) {
                    isDraw = true;
                }

                if (!isDraw && data.linkPosList) {
                    for (const linkPos of data.linkPosList) {
                        if (!this.isOverItem(linkPos.x1, linkPos.x2, linkPos.y1, linkPos.y2)) {
                            isDraw = true;
                            break;
                        }
                    }
                }

                if (isDraw) {
                    const baseData = this.calcScrollBaseData(data);
                    this.drawItem(baseData);

                    if (baseData.item.id > 0) {
                        const linePosList = this.calcLinePosList(baseData);
                        linePosList.forEach((linePos) => {
                            this.drawLine(linePos);
                        });
                    }
                }
            }
        }
    };

    Window_AbilityBoard.prototype.isOverItem = function (x1, x2, y1, y2) {
        const size = AbilityBoard.ICON_SIZE;
        x1 -= this.scrollBaseX();
        x2 -= this.scrollBaseX();
        y1 -= this.scrollBaseY();
        y2 -= this.scrollBaseY();
        return x1 < size * -1 || x2 > this.width + size * 2 || y1 < size * -1 || y2 > this.height + size * 2;
    };

    Window_AbilityBoard.prototype.calcScrollBaseData = function (data) {
        const basedata = {};
        basedata.x1 = data.x1 - this.scrollBaseX();
        basedata.x2 = data.x2 - this.scrollBaseX();
        basedata.y1 = data.y1 - this.scrollBaseY();
        basedata.y2 = data.y2 - this.scrollBaseY();

        basedata.parentX1 = data.parentX1 - this.scrollBaseX();
        basedata.parentX2 = data.parentX2 - this.scrollBaseX();
        basedata.parentY1 = data.parentY1 - this.scrollBaseY();
        basedata.parentY2 = data.parentY2 - this.scrollBaseY();

        const linkPosList = [];

        data.linkPosList.forEach((dataLinkPos) => {
            const linkPos = {};
            linkPos.id = dataLinkPos.id;
            linkPos.x1 = dataLinkPos.x1 - this.scrollBaseX();
            linkPos.x2 = dataLinkPos.x2 - this.scrollBaseX();
            linkPos.y1 = dataLinkPos.y1 - this.scrollBaseY();
            linkPos.y2 = dataLinkPos.y2 - this.scrollBaseY();
            linkPosList.push(linkPos);
        });

        basedata.linkPosList = linkPosList;

        basedata.item = data.item;

        return basedata;
    };

    Window_AbilityBoard.prototype.drawItem = function (data) {
        const item = data.item;
        const iconId = item.iconId;

        this.changePaintOpacity(this.isEnabled(item));
        if (iconId < 0) {
            this.drawFace(data.x1, data.y1);
        } else {
            this.drawIcon(iconId, data.x1, data.y1);
        }

        this.changePaintOpacity(1);
    };

    Window_AbilityBoard.prototype.calcLinePosList = function (data) {
        const linePosList = [];

        const basePos = {};
        basePos.x1 = data.x1;
        basePos.x2 = data.x2;
        basePos.y1 = data.y1;
        basePos.y2 = data.y2;

        const acquisition = this.isAbility(data.item.id);

        const parentPos = {};
        parentPos.x1 = data.parentX1;
        parentPos.x2 = data.parentX2;
        parentPos.y1 = data.parentY1;
        parentPos.y2 = data.parentY2;

        const parentLine = this.calcLine(basePos, parentPos);
        parentLine.acquisition = acquisition && this.isAbility(data.item.parentId);

        linePosList.push(parentLine);

        if (data.linkPosList) {
            data.linkPosList.forEach((linkPos) => {
                const linkLine = this.calcLine(basePos, linkPos);
                linkLine.acquisition = acquisition && this.isAbility(linkPos.id);
                linePosList.push(linkLine);
            });
        }

        return linePosList;
    };

    Window_AbilityBoard.prototype.calcLine = function (startPos, endPos) {
        let x1 = 0;
        let x2 = 0;
        let y1 = 0;
        let y2 = 0;

        if (startPos.x1 === endPos.x1) {
            x1 = this.iconCenter(startPos.x1);
            x2 = this.iconCenter(endPos.x1);
        } else if (startPos.x1 < endPos.x1) {
            x1 = startPos.x2;
            x2 = endPos.x1;
        } else {
            x1 = startPos.x1;
            x2 = endPos.x2;
        }

        if (startPos.y1 === endPos.y1) {
            y1 = this.iconCenter(startPos.y1);
            y2 = this.iconCenter(endPos.y1);
        } else if (startPos.y1 < endPos.y1) {
            y1 = startPos.y2;
            y2 = endPos.y1;
        } else {
            y1 = startPos.y1;
            y2 = endPos.y2;
        }

        const pos = {};

        pos.x1 = x1;
        pos.x2 = x2;
        pos.y1 = y1;
        pos.y2 = y2;

        return pos;
    };

    Window_AbilityBoard.prototype.refresh = function () {
        this.makeItemList();
        this.refreshCursor();
        Window_Selectable.prototype.refresh.call(this);
    };

    Window_AbilityBoard.prototype.iconCenter = function (pos) {
        return Math.floor(pos + AbilityBoard.ICON_SIZE / 2);
    };

    Window_AbilityBoard.prototype.drawIcon = function (iconIndex, x, y) {
        const bitmap = ImageManager.loadSystem("IconSet");
        const pw = ImageManager.iconWidth;
        const ph = ImageManager.iconHeight;
        const sx = (iconIndex % 16) * pw;
        const sy = Math.floor(iconIndex / 16) * ph;
        const size = AbilityBoard.ICON_SIZE;
        this.contents.blt(bitmap, sx, sy, pw, ph, x, y, size, size);
    };

    Window_AbilityBoard.prototype.drawFace = function (x, y) {
        const size = AbilityBoard.ICON_SIZE;
        const width = ImageManager.faceWidth;
        const height = ImageManager.faceHeight;
        const faceName = this._actor.faceName();
        const faceIndex = this._actor.faceIndex();
        const bitmap = ImageManager.loadFace(faceName);
        const pw = ImageManager.faceWidth;
        const ph = ImageManager.faceHeight;
        const sw = Math.min(width, pw);
        const sh = Math.min(height, ph);
        const dx = Math.floor(x + Math.max(width - pw, 0) / 2);
        const dy = Math.floor(y + Math.max(height - ph, 0) / 2);
        const sx = Math.floor((faceIndex % 4) * pw + (pw - sw) / 2);
        const sy = Math.floor(Math.floor(faceIndex / 4) * ph + (ph - sh) / 2);
        this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, size, size);
    };

    Window_AbilityBoard.prototype.drawLine = function (pos) {
        const context = this.contents.context;
        context.beginPath();
        context.moveTo(pos.x1, pos.y1);
        context.lineTo(pos.x2, pos.y2);
        context.lineWidth = 3;
        context.strokeStyle = pos.acquisition ? $abilityBoard.acquisitionLineColor() : $abilityBoard.notAcquisitionLineColor();
        context.closePath();
        context.stroke();
    };

    Window_AbilityBoard.prototype.refreshCursor = function () {
        const rect = this.cursorRect();
        rect.x -= this.scrollBaseX();
        rect.y -= this.scrollBaseY();
        this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
    };

    Window_AbilityBoard.prototype.cursorRect = function () {
        const data = this.data();
        if (data) {
            const wx = data.x1 - this.itemPadding();
            const wy = data.y1 - this.itemPadding();
            const ww = AbilityBoard.ICON_SIZE + this.itemPadding() * 2;
            const wh = AbilityBoard.ICON_SIZE + this.itemPadding() * 2;
            return new Rectangle(wx, wy, ww, wh);
        } else {
            return new Rectangle(0, 0, 0, 0);
        }
    };

    Window_AbilityBoard.prototype.select = function (id) {
        if (this._contentWindow && id !== this._selectId) {
            this._selectId = id;
            this._contentWindow.setItem(this.item());
            this.playCursorSound();
        }
        this.refreshCursor();
    };

    Window_AbilityBoard.prototype.reselect = function () {
        this.select(this._selectId);
        this.ensureCursorVisible(true);
        this.cursorVisible = true;
    };

    Window_AbilityBoard.prototype.cursorDown = function (wrap) {
        const item = this.item();
        const nextId = this.nextAbilityId(item.nextAbility.keyDown);

        if ((nextId > 0 || nextId === 0) && wrap) {
            this.select(nextId);
            this.ensureCursorVisible();
        }
    };

    Window_AbilityBoard.prototype.cursorUp = function (wrap) {
        const item = this.item();
        const nextId = this.nextAbilityId(item.nextAbility.keyUp);

        if ((nextId > 0 || nextId === 0) && wrap) {
            this.select(nextId);
            this.ensureCursorVisible();
        }
    };

    Window_AbilityBoard.prototype.cursorRight = function (wrap) {
        const item = this.item();
        const nextId = this.nextAbilityId(item.nextAbility.keyRight);

        if ((nextId > 0 || nextId === 0) && wrap) {
            this.select(nextId);
            this.ensureCursorVisible();
        }
    };

    Window_AbilityBoard.prototype.cursorLeft = function (wrap) {
        const item = this.item();
        const nextId = this.nextAbilityId(item.nextAbility.keyLeft);

        if ((nextId > 0 || nextId === 0) && wrap) {
            this.select(nextId);
            this.ensureCursorVisible();
        }
    };

    Window_AbilityBoard.prototype.ensureCursorVisible = function () {
        const data = this.data();
        if (data) {
            const px = data.x1 - this.scrollBaseX();
            const py = data.y1 - this.scrollBaseY();
            let scrollX = 0;
            let scrollY = 0;

            if (px + AbilityBoard.ICON_SIZE > this.innerWidth) {
                scrollX = data.x1 + AbilityBoard.ICON_SIZE - this.innerHeight;
            } else if (px < 0) {
                scrollX = data.x1;
            }

            if (py + AbilityBoard.ICON_SIZE > this.innerHeight) {
                scrollY = data.y1 + AbilityBoard.ICON_SIZE - this.innerHeight;
            } else if (py < 0) {
                scrollY = data.y1;
            }

            if (scrollX !== 0 || scrollY !== 0) {
                this.smoothScrollTo(scrollX ? scrollX : this.scrollX(), scrollY ? scrollY : this.scrollY());
            }
        }
    };

    Window_AbilityBoard.prototype.nextAbilityId = function (nextId) {
        return nextId || nextId === 0 ? nextId : -1;
    };

    Window_AbilityBoard.prototype.onTouchOk = function () {
        if (this.isTouchOkEnabled()) {
            const hitId = this.hitId();
            if (hitId === this._selectId) {
                this.processOk();
            }
        }
    };

    Window_AbilityBoard.prototype.isTouchOkEnabled = function () {
        return this.isOkEnabled();
    };

    Window_AbilityBoard.prototype.hitId = function () {
        const touchPos = new Point(TouchInput.x, TouchInput.y);
        const localPos = this.worldTransform.applyInverse(touchPos);
        return this.hitTest(localPos.x, localPos.y);
    };

    Window_AbilityBoard.prototype.hitTest = function (x, y) {
        if (this.innerRect.contains(x, y)) {
            const cx = x - this.padding;
            const cy = y - this.padding;

            for (const id in this._data) {
                const data = this._data[id];
                const px = data.x1 - this.scrollX();
                const py = data.y1 - this.scrollY();

                if (px <= cx && px + AbilityBoard.ICON_SIZE > cx) {
                    if (py <= cy && py + AbilityBoard.ICON_SIZE > cy) {
                        return id;
                    }
                }
            }
        }
        return -1;
    };

    Window_AbilityBoard.prototype.isEnabled = function (item) {
        if (this._actor && item) {
            if (this.isAbility(item.id)) {
                return true;
            }

            if (item.parentId === 0) {
                return item.costAp <= this._actor.ap();
            }

            if (item.groupLink) {
                for (const id of item.needIdList) {
                    if (!this._actor.isAbility(id)) {
                        return false;
                    }
                }
                return true;
            } else {
                for (const id of item.needIdList) {
                    if (this._actor.isAbility(id)) {
                        return item.costAp <= this._actor.ap();
                    }
                }
            }
        }

        return false;
    };

    Window_AbilityBoard.prototype.isAbility = function (id) {
        return this._actor ? id === 0 || this._actor.isAbility(id) : false;
    };

    Window_AbilityBoard.prototype.item = function () {
        return this.itemAt(this._selectId);
    };

    Window_AbilityBoard.prototype.data = function () {
        return this.dataAt(this._selectId);
    };

    Window_AbilityBoard.prototype.itemAt = function (id) {
        const data = this.dataAt(id);
        return data ? data.item : null;
    };

    Window_AbilityBoard.prototype.dataAt = function (id) {
        return this._data && id >= 0 ? this._data[id] : null;
    };

    Window_AbilityBoard.prototype.maxItems = function () {
        return Object.keys(this._data).length;
    };

    Window_AbilityBoard.prototype.maxScrollX = function () {
        return this._maxScrollX;
    };

    Window_AbilityBoard.prototype.maxScrollY = function () {
        return this._maxScrollY;
    };

    Window_AbilityBoard.prototype.itemWidth = function () {
        return Math.floor(this.innerWidth / this._maxScrollX);
    };

    Window_AbilityBoard.prototype._createArrowSprites = function () {
        Window_Selectable.prototype._createArrowSprites.call(this);
        this._rightArrowSprite = new Sprite();
        this.addChild(this._rightArrowSprite);
        this._leftArrowSprite = new Sprite();
        this.addChild(this._leftArrowSprite);
    };

    Window_AbilityBoard.prototype._refreshArrows = function () {
        Window_Selectable.prototype._refreshArrows.call(this);

        const w = this._width;
        const h = this._height;
        const p = 24;
        const q = p / 2;
        const sx = 96 + p;
        const sy = 0 + p;

        this._rightArrowSprite.bitmap = this._windowskin;
        this._rightArrowSprite.anchor.x = 0.5;
        this._rightArrowSprite.anchor.y = 0.5;
        this._rightArrowSprite.setFrame(sx + q + p, sy + q, q, p);
        this._rightArrowSprite.move(w - q, h / 2);
        this._leftArrowSprite.bitmap = this._windowskin;
        this._leftArrowSprite.anchor.x = 0.5;
        this._leftArrowSprite.anchor.y = 0.5;
        this._leftArrowSprite.setFrame(sx, sy + q, q, p);
        this._leftArrowSprite.move(q, h / 2);
    };

    Window_AbilityBoard.prototype._updateArrows = function () {
        Window_Selectable.prototype._updateArrows.call(this);
        this._rightArrowSprite.visible = this.isOpen() && this.rightArrowVisible;
        this._leftArrowSprite.visible = this.isOpen() && this.leftArrowVisible;
    };

    Window_AbilityBoard.prototype.updateArrows = function () {
        if ($abilityBoard.isDrawArrow()) {
            Window_Selectable.prototype.updateArrows.call(this);
            this.rightArrowVisible = this._scrollX < this.maxScrollX();
            this.leftArrowVisible = this._scrollX > 0;
        }
    };

    //-----------------------------------------------------------------------------
    // Window_AcquisitionCommand
    //-----------------------------------------------------------------------------
    function Window_AcquisitionCommand() {
        this.initialize.apply(this, arguments);
    }

    Window_AcquisitionCommand.prototype = Object.create(Window_Command.prototype);
    Window_AcquisitionCommand.prototype.constructor = Window_AcquisitionCommand;

    Window_AcquisitionCommand.prototype.initialize = function (rect) {
        Window_Command.prototype.initialize.call(this, rect);
        this._item = null;
        this._message = "";
        this._yesCommandText = "";
        this._noCommandText = "";
    };

    Window_AcquisitionCommand.prototype.item = function () {
        return this._item;
    };

    Window_AcquisitionCommand.prototype.setItem = function (item) {
        if (this._item !== item) {
            this._item = item;
            this.setCommand();
            this.refresh();
        }
    };

    Window_AcquisitionCommand.prototype.refresh = function () {
        Window_Command.prototype.refresh.call(this);
        this.drawMessage();
    };

    Window_AcquisitionCommand.prototype.updateHelp = function () {
        if (this._item) {
            this.setHelpWindowItem(this._item);
        }
    };

    Window_AcquisitionCommand.prototype.setCommand = function () {
        if (this._item) {
            if (this._item.effectType === AbilityBoard.EFFECT_TYPE_Skill) {
                this._message = $abilityBoard.learnSkillMsg();
                this._yesCommandText = $abilityBoard.learnSkillYesText();
                this._noCommandText = $abilityBoard.learnSkillNoText();
                const skill = $dataSkills[this._item.skillId];
                if (skill) {
                    this._item.description = skill.description;
                }
            } else {
                this._message = $abilityBoard.acquisitionMsg();
                this._yesCommandText = $abilityBoard.acquisitionYesText();
                this._noCommandText = $abilityBoard.acquisitionNoText();
            }
        }
    };

    Window_AcquisitionCommand.prototype.makeCommandList = function () {
        this.addCommand(this._yesCommandText, "yes");
        this.addCommand(this._noCommandText, "no");
    };

    Window_AcquisitionCommand.prototype.itemRect = function (index) {
        const rect = Window_Command.prototype.itemRect.call(this, index);
        rect.y = this.innerHeight - 48;
        return rect;
    };

    Window_AcquisitionCommand.prototype.maxCols = function () {
        return 2;
    };

    Window_AcquisitionCommand.prototype.drawMessage = function () {
        if (this._item) {
            const name = this._item.effectType === AbilityBoard.EFFECT_TYPE_Skill ? $dataSkills[this._item.skillId].name : this._item.name;

            const apNameText = $abilityBoard.apNameText();
            const costAp = this._item.costAp;
            const ability = "%1(%2%3)";
            this.drawText(ability.format(name ? name : "", apNameText, costAp), 0, 0, this.innerWidth, "center");
            this.drawText(this._message, 0, this.fittingHeight(1), this.innerWidth, "center");
        }
    };

    //-----------------------------------------------------------------------------
    // BattleManager
    //-----------------------------------------------------------------------------
    const _BattleManager_displayRewards = BattleManager.displayRewards;
    BattleManager.displayRewards = function () {
        switch ($abilityBoard.gainMethodType()) {
            case AbilityBoard.GAIN_METHOD_TROOP:
                this.displayExp();
                this.displayGold();
                this.displayAp();
                this.displayDropItems();
                break;

            default:
                _BattleManager_displayRewards.apply(this, arguments);
                break;
        }
    };

    BattleManager.displayAp = function () {
        if ($abilityBoard.isGainAp()) {
            const ap = $abilityBoard.troopGainAp($gameTroop.troop());
            const message = $abilityBoard.winGainApMsg();
            if (message && ap > 0) {
                const apName = $abilityBoard.apNameText();
                $gameMessage.newPage();
                $gameMessage.add("\\." + message.format(ap, apName));
            }
        }
    };

    const _BattleManager_gainRewards = BattleManager.gainRewards;
    BattleManager.gainRewards = function () {
        _BattleManager_gainRewards.apply(this, arguments);
        this.gainAp();
    };

    BattleManager.gainAp = function () {
        if ($abilityBoard.isGainAp() && $abilityBoard.gainMethodType() === AbilityBoard.GAIN_METHOD_TROOP) {
            const ap = $abilityBoard.troopGainAp($gameTroop.troop());
            if ($abilityBoard.isGainBenchMembers()) {
                for (const actor of $gameParty.allMembers()) {
                    actor.gainAp(ap);
                }
            } else {
                for (const actor of $gameParty.battleMembers()) {
                    actor.gainAp(ap);
                }
            }
        }
    };

    //-----------------------------------------------------------------------------
    // Scene_Boot
    //-----------------------------------------------------------------------------
    const _Scene_Boot_Create = Scene_Boot.prototype.create;
    Scene_Boot.prototype.create = function () {
        _Scene_Boot_Create.apply(this, arguments);
        $abilityBoard = new AbilityBoard();
    };

    //-----------------------------------------------------------------------------
    // Scene_Menu
    //-----------------------------------------------------------------------------
    const _Scene_Menu_CreateCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function () {
        _Scene_Menu_CreateCommandWindow.apply(this, arguments);
        this._commandWindow.setHandler(AbilityBoard.KEY, this.commandPersonal.bind(this));
    };

    const _Scene_Menu_OnPersonalOk = Scene_Menu.prototype.onPersonalOk;
    Scene_Menu.prototype.onPersonalOk = function () {
        switch (this._commandWindow.currentSymbol()) {
            case AbilityBoard.KEY:
                const index = this._statusWindow.index();
                const actor = this._statusWindow.actor(index);
                if ($abilityBoard.isActorAbility(actor)) {
                    SceneManager.push(Scene_AbilityBoard);
                } else {
                    SoundManager.playBuzzer();
                    this._statusWindow.activate();
                }
                break;

            default:
                _Scene_Menu_OnPersonalOk.apply(this, arguments);
        }
    };

    //-----------------------------------------------------------------------------
    // Scene_ItemBase
    //-----------------------------------------------------------------------------
    const _Scene_ItemBase_CanUse = Scene_ItemBase.prototype.canUse;
    Scene_ItemBase.prototype.canUse = function () {
        return _Scene_ItemBase_CanUse.apply(this, arguments) || $abilityBoard.isApItem(this.item());
    };

    const _Scene_ItemBase_ApplyItem = Scene_ItemBase.prototype.applyItem;
    Scene_ItemBase.prototype.applyItem = function () {
        if ($abilityBoard.isApItem(this.item())) {
            const apItem = $abilityBoard.apItem(this.item());
            for (const target of this.itemTargetActors()) {
                target.gainAp(apItem.value);
            }
        } else {
            _Scene_ItemBase_ApplyItem.apply(this, arguments);
        }
    };

    //-----------------------------------------------------------------------------
    // Window_MenuCommand
    //-----------------------------------------------------------------------------
    const _Window_MenuCommand_AddOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function () {
        _Window_MenuCommand_AddOriginalCommands.apply(this, arguments);
        const enabled = $abilityBoard.isEnabled();
        const show = enabled ? enabled : $abilityBoard.isMenuShow();
        if (show) {
            this.addCommand($abilityBoard.menuText(), AbilityBoard.KEY, enabled);
        }
    };

    //-----------------------------------------------------------------------------
    // Game_BattlerBase
    //-----------------------------------------------------------------------------
    const _Game_BattlerBase_InitMembers = Game_BattlerBase.prototype.initMembers;
    Game_BattlerBase.prototype.initMembers = function () {
        _Game_BattlerBase_InitMembers.apply(this, arguments);
        this._plusAbilityParamLists = {};
    };

    Game_BattlerBase.prototype.setAbilityParamLists = function (abilityParamLists) {
        this._plusAbilityParamLists = abilityParamLists;
    };

    Game_BattlerBase.prototype.calcAbilityRate = function (code, id) {
        const codeParamsList = this._plusAbilityParamLists[code];

        if (!codeParamsList) {
            return 0;
        }

        let value = 0;

        const paramsList = codeParamsList.filter((codeParams) => codeParams.id === id);

        paramsList.forEach((params) => {
            value += params.value;
        });

        return value * 0.01;
    };

    Game_BattlerBase.prototype.calcAbilityParamRateValue = function (id) {
        const codeParamsList = this._plusAbilityParamLists[Game_BattlerBase.TRAIT_PARAM];

        if (!codeParamsList) {
            return 0;
        }

        let value = 0;

        const paramsList = codeParamsList.filter((codeParams) => codeParams.id === id);

        paramsList.forEach((params) => {
            const paramBase = this.paramBase(id);
            let rateValue = params.value * 0.01;
            if (rateValue < 0) {
                rateValue *= -1;
                value -= Math.floor(paramBase * rateValue);
            } else {
                value += Math.floor(paramBase * rateValue);
            }
        });

        return value;
    };

    const _Game_BattlerBase_ElementRate = Game_BattlerBase.prototype.elementRate;
    Game_BattlerBase.prototype.elementRate = function (elementId) {
        return _Game_BattlerBase_ElementRate.apply(this, arguments) + this.calcAbilityRate(Game_BattlerBase.TRAIT_ELEMENT_RATE, elementId);
    };

    const _Game_BattlerBase_DebuffRate = Game_BattlerBase.prototype.debuffRate;
    Game_BattlerBase.prototype.debuffRate = function (paramId) {
        return _Game_BattlerBase_DebuffRate.apply(this, arguments) + this.calcAbilityRate(Game_BattlerBase.TRAIT_DEBUFF_RATE, paramId);
    };

    const _Game_BattlerBase_StateRate = Game_BattlerBase.prototype.stateRate;
    Game_BattlerBase.prototype.stateRate = function (stateId) {
        return _Game_BattlerBase_StateRate.apply(this, arguments) + this.calcAbilityRate(Game_BattlerBase.TRAIT_STATE_RATE, stateId);
    };

    const _Game_BattlerBase_IsStateResist = Game_BattlerBase.prototype.isStateResist;
    Game_BattlerBase.prototype.isStateResist = function (stateId) {
        const codeParamsList = this._plusAbilityParamLists[Game_BattlerBase.TRAIT_STATE_RESIST];
        return _Game_BattlerBase_IsStateResist.apply(this, arguments) || (codeParamsList && codeParamsList.includes(stateId) ? true : false);
    };

    const _Game_BattlerBase_ParamPlus = Game_BattlerBase.prototype.paramPlus;
    Game_BattlerBase.prototype.paramPlus = function (paramId) {
        return _Game_BattlerBase_ParamPlus.apply(this, arguments) + this.calcAbilityParamRateValue(paramId);
    };

    const _Game_BattlerBase_Xparam = Game_BattlerBase.prototype.xparam;
    Game_BattlerBase.prototype.xparam = function (xparamId) {
        return _Game_BattlerBase_Xparam.apply(this, arguments) + this.calcAbilityRate(Game_BattlerBase.TRAIT_XPARAM, xparamId);
    };

    const _Game_BattlerBase_Sparam = Game_BattlerBase.prototype.sparam;
    Game_BattlerBase.prototype.sparam = function (sparamId) {
        return _Game_BattlerBase_Sparam.apply(this, arguments) + this.calcAbilityRate(Game_BattlerBase.TRAIT_SPARAM, sparamId);
    };

    const _Game_BattlerBase_AttackStates = Game_BattlerBase.prototype.attackStates;
    Game_BattlerBase.prototype.attackStates = function () {
        const stateIdList = _Game_BattlerBase_AttackStates.apply(this, arguments);

        const codeStateIdList = this._plusAbilityParamLists[Game_BattlerBase.TRAIT_ATTACK_STATE];
        if (codeStateIdList) {
            for (const codeStateId of codeStateIdList) {
                if (!stateIdList.includes(codeStateId.id)) {
                    stateIdList.push(codeStateId.id);
                }
            }
        }
        return stateIdList;
    };

    const _Game_BattlerBase_AttackStatesRate = Game_BattlerBase.prototype.attackStatesRate;
    Game_BattlerBase.prototype.attackStatesRate = function (stateId) {
        return Math.max(_Game_BattlerBase_AttackStatesRate.apply(this, arguments), this.calcAbilityRate(Game_BattlerBase.TRAIT_ATTACK_STATE, stateId));
    };

    const _Game_BattlerBase_AttackTimesAdd = Game_BattlerBase.prototype.attackTimesAdd;
    Game_BattlerBase.prototype.attackTimesAdd = function () {
        const addAtackTumes = this._plusAbilityParamLists[Game_BattlerBase.TRAIT_ATTACK_TIMES];

        if (addAtackTumes) {
            const value = addAtackTumes[0].value;
            return _Game_BattlerBase_AttackTimesAdd.apply(this, arguments) + value;
        } else {
            return _Game_BattlerBase_AttackTimesAdd.apply(this, arguments);
        }
    };

    //-----------------------------------------------------------------------------
    // Game_Actor
    //-----------------------------------------------------------------------------
    const _Game_Actor_InitMembers = Game_Actor.prototype.initMembers;
    Game_Actor.prototype.initMembers = function () {
        _Game_Actor_InitMembers.apply(this, arguments);
        this._ap = 0;
        this._abilityList = [];
        this._abilityParamLists = {};
    };

    const _Game_Actor_SetUp = Game_Actor.prototype.setup;
    Game_Actor.prototype.setup = function (actorId) {
        _Game_Actor_SetUp.apply(this, arguments);
        this.setAbilityParamLists(this._abilityParamLists);
    };

    const _Game_Actor_LevelUp = Game_Actor.prototype.levelUp;
    Game_Actor.prototype.levelUp = function () {
        _Game_Actor_LevelUp.apply(this, arguments);

        if ($abilityBoard.isGainAp() && $abilityBoard.gainMethodType() === AbilityBoard.GAIN_METHOD_LEVEL) {
            if ($abilityBoard.gainActorRange() === AbilityBoard.SET_GAIN_RANGE_ACTOR) {
                const ap = $abilityBoard.actorLevelGainAp(this);
                this.gainAp(ap);
            } else {
                const ap = $abilityBoard.levelGainAp();
                this.gainAp(ap);
            }
        }
    };

    Game_Actor.prototype.ap = function () {
        return this._ap;
    };

    Game_Actor.prototype.gainAp = function (value) {
        this._ap += value;
    };

    Game_Actor.prototype.payAp = function (value) {
        this._ap -= value;
    };

    Game_Actor.prototype.addAbility = function (id) {
        this._abilityList.push(id);
    };

    Game_Actor.prototype.isAbility = function (id) {
        return this._abilityList.includes(id);
    };

    Game_Actor.prototype.addElementRateAbility = function (elementId, value) {
        if (Game_BattlerBase.TRAIT_ELEMENT_RATE in this._abilityParamLists) {
            this._abilityParamLists[Game_BattlerBase.TRAIT_ELEMENT_RATE].push({ id: elementId, value: value * -1 });
        } else {
            this._abilityParamLists[Game_BattlerBase.TRAIT_ELEMENT_RATE] = [{ id: elementId, value: value * -1 }];
        }
    };

    Game_Actor.prototype.addWeakRateAbility = function (paramId, value) {
        if (Game_BattlerBase.TRAIT_DEBUFF_RATE in this._abilityParamLists) {
            this._abilityParamLists[Game_BattlerBase.TRAIT_DEBUFF_RATE].push({ id: paramId, value: value });
        } else {
            this._abilityParamLists[Game_BattlerBase.TRAIT_DEBUFF_RATE] = [{ id: paramId, value: value }];
        }
    };

    Game_Actor.prototype.addStateRateAbility = function (stateId, value) {
        if (Game_BattlerBase.TRAIT_STATE_RATE in this._abilityParamLists) {
            this._abilityParamLists[Game_BattlerBase.TRAIT_STATE_RATE].push({ id: stateId, value: value });
        } else {
            this._abilityParamLists[Game_BattlerBase.TRAIT_STATE_RATE] = [{ id: stateId, value: value }];
        }
    };

    Game_Actor.prototype.addStateResistAbility = function (stateId) {
        if (Game_BattlerBase.TRAIT_STATE_RESIST in this._abilityParamLists) {
            this._abilityParamLists[Game_BattlerBase.TRAIT_STATE_RESIST].push(stateId);
        } else {
            this._abilityParamLists[Game_BattlerBase.TRAIT_STATE_RESIST] = [stateId];
        }
    };

    Game_Actor.prototype.addParamRateAbility = function (paramId, value) {
        if (Game_BattlerBase.TRAIT_PARAM in this._abilityParamLists) {
            this._abilityParamLists[Game_BattlerBase.TRAIT_PARAM].push({ id: paramId, value: value });
        } else {
            this._abilityParamLists[Game_BattlerBase.TRAIT_PARAM] = [{ id: paramId, value: value }];
        }
    };

    Game_Actor.prototype.addXparamAbility = function (paramId, value) {
        if (Game_BattlerBase.TRAIT_XPARAM in this._abilityParamLists) {
            this._abilityParamLists[Game_BattlerBase.TRAIT_XPARAM].push({ id: paramId, value: value });
        } else {
            this._abilityParamLists[Game_BattlerBase.TRAIT_XPARAM] = [{ id: paramId, value: value }];
        }
    };

    Game_Actor.prototype.addSparamAbility = function (paramId, value) {
        if (Game_BattlerBase.TRAIT_SPARAM in this._abilityParamLists) {
            this._abilityParamLists[Game_BattlerBase.TRAIT_SPARAM].push({ id: paramId, value: value });
        } else {
            this._abilityParamLists[Game_BattlerBase.TRAIT_SPARAM] = [{ id: paramId, value: value }];
        }
    };

    Game_Actor.prototype.addAtkStateAbility = function (stateId, value) {
        if (Game_BattlerBase.TRAIT_ATTACK_STATE in this._abilityParamLists) {
            this._abilityParamLists[Game_BattlerBase.TRAIT_ATTACK_STATE].push({ id: stateId, value: value });
        } else {
            this._abilityParamLists[Game_BattlerBase.TRAIT_ATTACK_STATE] = [{ id: stateId, value: value }];
        }
    };

    Game_Actor.prototype.addAtackTimesAbility = function (value) {
        this._abilityParamLists[Game_BattlerBase.TRAIT_ATTACK_TIMES] = [{ value: value }];
    };
})();
