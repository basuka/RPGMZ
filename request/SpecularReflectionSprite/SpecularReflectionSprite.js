//=============================================================================
// RPG Maker MZ - SpecularReflectionSprite
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc 鏡面反射スプライトを設定します。
 * @author Basu
 * @url https://raw.githubusercontent.com/basuka/RPGMZ/main/request/SpecularReflectionSprite/SpecularReflectionSprite.js
 *
 *
 * @help パラメータの設定項目
 *
 * 【パラメータ】
 *
 * ■鏡像地形タグ
 * 鏡像を表示する地形タグを設定します。
 * 地形タグは複数設定することが可能です。
 *
 * ■補正値(Y座標)
 * Y座標の補正値を保持する変数を設定します。(プレイヤー/乗り物)
 *
 *
 * ※当プラグインについて
 *
 * このプラグインはMV用に作られたやな氏のプラグインをMZ用に作成されたものです。
 *
 * 本家作成者：やな氏
 * URL : https://raw.githubusercontent.com/munokura/Yana-MV-plugins/master/Map_Message/SpecularReflectionSprite.js
 *
 *
 * 使用方法は本家と同様の方法となります。
 * 透明または半透明のタイルを下層レイヤーに設定してください。
 * タイルに透明度がない場合、鏡像がタイルで塗りつぶされてしまうので表示することができなくなります。
 * 詳細については本家の説明を参照してください。
 *
 *
 *=====================================================================================================================================================
 * @param terrainIds
 * @text 鏡像地形タグ
 * @type number[]
 * @min 1
 * @default [1]
 * @desc 鏡像を表示する地形タグを設定
 *
 * @param offsetYVariableID
 * @text 補正値(Y座標)
 * @type variable
 * @desc Y座標の補正値を保持する変数を設定(プレイヤー/乗り物)
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

    const terrainIds = params.terrainIds;
    const offsetYVariableId = params.offsetYVariableID || 0;

    //-----------------------------------------------------------------------------
    // Game_CharacterBase
    //-----------------------------------------------------------------------------
    Game_CharacterBase.prototype.isReflect = function () {
        return true;
    };

    Game_CharacterBase.prototype.isEvent = function () {
        return false;
    };

    //-----------------------------------------------------------------------------
    // Game_Event
    //-----------------------------------------------------------------------------
    Game_Event.prototype.isReflect = function () {
        return !(this.event().meta["鏡像表示なし"] || this.event().meta["NoReflection"]);
    };

    Game_Event.prototype.isEvent = function () {
        return true;
    };

    Game_Event.prototype.specularOffsetY = function () {
        if (this.event().meta["鏡像表示補正Y"]) {
            return Number(this.event().meta["鏡像表示補正Y"]) || 0;
        }
        if (this.event().meta["SpecularOffsetY"]) {
            return Number(this.event().meta["SpecularOffsetY"]) || 0;
        }
        return 0;
    };

    //-----------------------------------------------------------------------------
    // Sprite_Specular
    //-----------------------------------------------------------------------------
    function Sprite_Specular() {
        this.initialize.apply(this, arguments);
    }

    Sprite_Specular.prototype = Object.create(Sprite_Character.prototype);
    Sprite_Specular.prototype.constructor = Sprite_Specular;

    Sprite_Specular.prototype.initialize = function (character) {
        Sprite_Character.prototype.initialize.call(this, character);
    };

    Sprite_Specular.prototype.initMembers = function () {
        this.anchor.x = 0.5;
        this.anchor.y = 1;
        this._character = null;
        this._tilesetId = 0;
        this._upperBody = null;
        this._lowerBody = null;
        this.scale = new Point(1.0, -1.0);
    };

    Sprite_Specular.prototype.updatePosition = function () {
        Sprite_Character.prototype.updatePosition.call(this);
        const jh = this._character.jumpHeight();
        this.y += jh * 2;
        if (this.offsetY() > 0) {
            const sy = this._character.shiftY();
            this.y += Math.ceil((this.y / this._character.y) * this.offsetY()) - sy;
        }
    };

    Sprite_Specular.prototype.updateVisibility = function () {
        Sprite_Character.prototype.updateVisibility.call(this);
        if (this._startBattle || this._character.isTransparent() || !this._character.isReflect()) {
            this.visible = false;
        }

        if (this.visible) {
            var x = this._character.x;
            var y = this._character.y + Math.ceil(this.offsetY() / $gameMap.tileWidth()) + 1;
            var dir = this._character._direction;
            var terrainTag = $gameMap.terrainTag(x, y);
            this.visible = terrainIds.includes(terrainTag);

            if (!this.visible) {
                switch (dir) {
                    case 2:
                        y -= 1;
                        break;
                    case 4:
                        x += 1;
                        break;
                    case 6:
                        x -= 1;
                        break;
                    case 8:
                        y += 1;
                        break;
                }

                terrainTag = $gameMap.terrainTag(x, y);
                this.visible = terrainIds.includes(terrainTag);
            }
        }
    };

    Sprite_Specular.prototype.offsetY = function () {
        var offsetY = offsetYVariableId ? $gameVariables.value(offsetYVariableId) : 0;
        offsetY = this._character.isEvent() ? this._character.specularOffsetY() : offsetY;
        return offsetY;
    };

    //-----------------------------------------------------------------------------
    // Spriteset_Map
    //-----------------------------------------------------------------------------
    const _Spriteset_Map_CreateParallax = Spriteset_Map.prototype.createParallax;
    Spriteset_Map.prototype.createParallax = function () {
        _Spriteset_Map_CreateParallax.apply(this, arguments);
        this.createSpecular();
    };

    Spriteset_Map.prototype.createSpecular = function () {
        this._specularSprites = [];
        for (const event of $gameMap.events()) {
            this._specularSprites.push(new Sprite_Specular(event));
        }
        for (const vehicle of $gameMap.vehicles()) {
            this._specularSprites.push(new Sprite_Specular(vehicle));
        }
        for (const follower of $gamePlayer.followers().reverseData()) {
            this._specularSprites.push(new Sprite_Specular(follower));
        }
        this._specularSprites.push(new Sprite_Specular($gamePlayer));
        for (const sprite of this._specularSprites) {
            this._baseSprite.addChild(sprite);
        }
    };
})();
