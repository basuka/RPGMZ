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
 * @param objEnemyIds
 * @type enemy[]
 * @text オブジェクトエネミー
 * @desc オブジェクトにするエネミー
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
    // Game_Enemy
    //-----------------------------------------------------------------------------
    Game_Enemy.prototype.isEnemy = function() {
        return !params.objEnemyIds.includes(this._enemyId);
    };


    //-----------------------------------------------------------------------------
    // Game_Troop
    //-----------------------------------------------------------------------------
    const _Game_Troop_Clear = Game_Troop.prototype.clear;
    Game_Troop.prototype.clear = function() {
        _Game_Troop_Clear.apply(this, arguments);
        this._allMemberFlg = true;
    };

    const _Game_Troop_prototype_members = Game_Troop.prototype.members;
    Game_Troop.prototype.members = function() {
        const allMembers = _Game_Troop_prototype_members.apply(this, arguments);
        if (this._allMemberFlg) {
            return allMembers;
        } else {
            return allMembers.filter(enemy => enemy.isEnemy());
        }
    };

    const _Game_Troop_EnemyNames = Game_Troop.prototype.enemyNames;
    Game_Troop.prototype.enemyNames = function() {
        this.setAllMemberFlg(false);
        const names = _Game_Troop_EnemyNames.apply(this, arguments);
        this.setAllMemberFlg(true);
        return names;
    };

    Game_Troop.prototype.aliveMembers = function() {
        const enemys = Game_Unit.prototype.aliveMembers.call(this);
        return enemys.filter(enemy => enemy.isEnemy());
    };

    Game_Troop.prototype.setAllMemberFlg = function(allMemberFlg) {
        this._allMemberFlg = allMemberFlg;
    }

})();
