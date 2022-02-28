//=============================================================================
// RPG Maker MZ - EnemyObject
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc エネミーをオブジェクトとして表示します。
 * @author Basu
 * @url https://raw.githubusercontent.com/basuka/RPGMZ/main/request/EnemyObject/EnemyObject.js
 *
 * @help EnemyObject.js
 *
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加してください
 *
 * 2.「プラグインコマンド」イベントから「コインショップ開始」コマンド
 *   を設定してください。
 *
 * 3.必要に応じてパラメータを設定してください。
 *
 *-----------------------------------------------------------------------------
 * README
 *-----------------------------------------------------------------------------
 * https://github.com/basuka/RPGMZ/blob/main/request/EnemyObject/README.md
 *
 *-----------------------------------------------------------------------------
 * 利用規約
 *-----------------------------------------------------------------------------
 * このプラグインはMITライセンスで配布しています
 *
 *=====================================================================================================================================================
 *
 * @param enemyObjects
 * @type struct<enemyObject>[]
 * @text オブジェクトエネミー設定
 * @desc オブジェクト表示にするエネミーの設定
 */

/*~struct~enemyObject:ja
 *
 * @param troopId
 * @type troop
 * @text 敵グループ
 * @desc オブジェクトエネミーを表示する敵グループ
 *
 * @param enemyObjectInfos
 * @type struct<enemyObjectInfo>[]
 * @text オブジェクトエネミー情報
 * @desc オブジェクトとして表示するエネミー情報
 */

/*~struct~enemyObjectInfo:ja
 *
 * @param objEnemyFile
 * @type file
 * @dir img\enemies
 * @text オブジェクトエネミーファイル
 * @desc オブジェクトにするエネミー画像ファイル
 *
 * @param drawX
 * @type number
 * @default 0
 * @text 描画位置X
 * @desc 描画するX座標
 *
 * @param drawY
 * @type number
 * @default 0
 * @text 描画位置Y
 * @desc 描画するY座標
 *
 * @param scaleX
 * @type number
 * @min -999
 * @max 999
 * @default 100
 * @text 拡大幅(%)
 * @desc 幅の拡大率
 *
 * @param scaleY
 * @type number
 * @min -999
 * @max 999
 * @default 100
 * @text 拡大高さ(%)
 * @desc 高さの拡大率
 */


(() => {

    const pluginName = "EnemyObject";

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

    PluginManager_Parser.prototype.convertNumber = function(param) {
        return Number(param) ? Number(param) : param;
    }

    PluginManager_Parser.prototype.isObject = function(param, type) {
        return Object.prototype.toString.call(param).slice(8, -1).toLowerCase() === type;
    }

    let params = PluginManager_Parser.prototype.parse(PluginManager.parameters(pluginName));


    //-----------------------------------------------------------------------------
    // Game_Troop
    //-----------------------------------------------------------------------------
    const _Game_Troop_Clear = Game_Troop.prototype.clear;
    Game_Troop.prototype.clear = function() {
        _Game_Troop_Clear.apply(this, arguments);
        this._objEnemyInfos = [];
    };

    const _Game_Troop_Setup = Game_Troop.prototype.setup;
    Game_Troop.prototype.setup = function(troopId) {
        _Game_Troop_Setup.apply(this, arguments);
        const enemyObject = params.enemyObjects.filter(paramEnemyObject => paramEnemyObject.troopId === troopId)[0];

        for (const enemyObjectInfo of enemyObject.enemyObjectInfos) {
            const bitmap = ImageManager.loadEnemy(enemyObjectInfo.objEnemyFile);
            const objEnemyInfo = {
                bitmap: bitmap,
                drawX: enemyObjectInfo.drawX,
                drawY: enemyObjectInfo.drawY,
                scaleX: enemyObjectInfo.scaleX,
                scaleY: enemyObjectInfo.scaleY
            };
            this._objEnemyInfos.push(objEnemyInfo);
        }
    };

    Game_Troop.prototype.objEnemyInfos = function() {
        return this._objEnemyInfos;
    };


    //-----------------------------------------------------------------------------
    // Spriteset_Battle
    //-----------------------------------------------------------------------------
    const _Spriteset_Battle_CreateBattleback = Spriteset_Battle.prototype.createBattleback;
    Spriteset_Battle.prototype.createBattleback = function() {
        _Spriteset_Battle_CreateBattleback.apply(this, arguments);
        this.createObjEnemy();
    };

    Spriteset_Battle.prototype.createObjEnemy = function() {
        const objEnemyInfos = $gameTroop.objEnemyInfos();

        for (const objEnemyInfo of objEnemyInfos) {
            const objEnemy = new Sprite(objEnemyInfo.bitmap);
            objEnemy.x = objEnemyInfo.drawX;
            objEnemy.y = objEnemyInfo.drawY;
            objEnemy.scale.x = objEnemyInfo.scaleX * 0.01;
            objEnemy.scale.y = objEnemyInfo.scaleY * 0.01;
            this._baseSprite.addChild(objEnemy);
        }
    }
})();
