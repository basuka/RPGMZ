//=============================================================================
// RPG Maker MZ - DisplayEnemyParameters
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc 戦闘画面にエネミーのパラメータを表示するプラグイン
 * @author Basu
 * @url https://raw.githubusercontent.com/basuka/RPGMZ/main/AlignmentSkill/AlignmentSkill.js
 *
 * @help AlignmentSkill.js
 *
 * このプラグインは、戦闘画面でエネミーのパラメータを表示させます。
 *
 * 戦闘画面で、エネミーの頭上に以下のパラメータを表示します。
 * ・名前
 * ・HP
 * ・MP
 * ・TP
 * 
 * これらのパラメータは、プラグインパラメータで表示のON/OFFを切り替えられます。
 * また、表示位置やサイズなども変更可能です。
 * 
 * 
 * 表示位置とサイズは、プラグインパラメータ【ステータスの表示位置とサイズの設定】で個別に設定可能です。
 * 
 * ・対象エネミー
 * ・X座標の調整
 * ・Y座標の調整
 * ・ステータスの表示幅
 * 
 * なお、これらのパラメータはエネミー画像の表示位置に合わせているため、
 * エネミーが動くと、それに合わせてパラメータの表示位置も変わります。
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
 *    ください。
 *
 *
 *　※本プラグインはMV用に作られたフトコロ氏のプラグインをMZ用に作成されたものです。
 *
 *  本家作成者：フトコロ氏
 *  URL : https://raw.githubusercontent.com/futokoro/RPGMaker/master/FTKR_DisplayEnemyParameters.js
 *=====================================================================================================================================================
 *
 * @param dispEnemyName
 * @type boolean
 * @on 有効
 * @off 無効
 * @default true
 * @text エネミー名表示
 * @desc エネミーの名前を表示する
 *
 * @param dispEnemyHp
 * @type struct<gauge>
 * @default {"label":"true","value":"true","gauge":"true"}
 * @text エネミーHP表示
 * @desc エネミーのHPを表示する
 *       空欄の場合は無効になります
 *
 * @param dispEnemyMp
 * @type struct<gauge>
 * @default {"label":"true","value":"true","gauge":"true"}
 * @text エネミーMP表示
 * @desc エネミーのMPを表示する
 *       空欄の場合は無効になります
 *
 * @param dispEnemyTp
 * @type struct<gauge>
 * @default {"label":"true","value":"true","gauge":"true"}
 * @text エネミーTP表示
 * @desc エネミーのTPを表示する
 *       空欄の場合は無効になります
 *
 * @param statusWidth
 * @type number
 * @default 144
 * @text ステータスの幅
 * @desc ステータスの表示幅を指定する
 *
 * @param statusLineHeight
 * @type number
 * @default 36
 * @text ステータスの高さ
 * @desc ステータスの１行の表示高さを指定する
 *
 * @param statusFontSize
 * @type number
 * @default 28
 * @text フォントサイズ
 * @desc ステータスのフォントサイズを指定する
 *
 * @param dispOffsetX
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * @text 表示位置(X座標)
 * @desc ステータスとエネミー画像の表示位置のX座標の差（負の値で左にずれる）
 *
 * @param dispOffsetY
 * @type number
 * @min -9999
 * @max 9999
 * @default -40
 * @text 表示位置(Y座標)
 * @desc ステータスとエネミー画像の表示位置のY座標の差（負の値で上にずれる）
 *
 * @param posStatusList
 * @type struct<posStatus>[]
 * @text 表示位置とサイズ設定
 * @desc ステータスの表示位置とサイズの設定
 */

/*~struct~gauge:ja
 *
 * @param label
 * @type boolean
 * @on 有効
 * @off 無効
 * @default true
 * @text パラメータ表示
 * @desc パラメータの数値を表示します。
 *
 * @param value
 * @type boolean
 * @on 有効
 * @off 無効
 * @default true
 * @text パラメータ表示
 * @desc パラメータの数値を表示します。
 *
 * @param gauge
 * @type boolean
 * @on 有効
 * @off 無効
 * @default true
 * @text パラメータゲージ表示
 * @desc パラメータのゲージを表示します。
 */

/*~struct~posStatus:ja
 *
 * @param enemyId
 * @type enemy
 * @text 対象エネミー
 * @desc ステータス表示位置の調整を行うエネミー
 *
 * @param statusPosX
 * @type number
 * @min -9999
 * @max 9999
 * @text X座標の調整
 * @desc 表示位置のX座標の調整
 *
 * @param statusPosY
 * @type number
 * @min -9999
 * @max 9999
 * @text Y座標の調整
 * @desc 表示位置のY座標の調整
 *
 * @param statusWidth
 * @type number
 * @text ステータスの表示幅
 * @desc ステータスの表示幅を指定する
 */

(() => {

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

  const pluginName = "DisplayEnemyParameters";

  const params = PluginManager_Parser.prototype.parse(PluginManager.parameters(pluginName));


  //=============================================================================
  // Sprite_Enemy
  //=============================================================================

  const _Sprite_Enemy_InitMembers = Sprite_Enemy.prototype.initMembers;
  Sprite_Enemy.prototype.initMembers = function() {
    _Sprite_Enemy_InitMembers.apply(this, arguments);
    this.createBattleStatusSprite();
  };

  Sprite_Enemy.prototype.createBattleStatusSprite = function() {
    this._battleStatusSprite = new Sprite_BattleStatus();
    this.addChild(this._battleStatusSprite);
  };

  const _Sprite_Enemy_SetBattler = Sprite_Enemy.prototype.setBattler;
  Sprite_Enemy.prototype.setBattler = function(battler) {
    _Sprite_Enemy_SetBattler.apply(this, arguments);
    this.setupStatusSprite(battler);
  };

  Sprite_Enemy.prototype.setupStatusSprite = function(battler) {
    const posStatusList = this.getPosStatus(battler.enemy());
    var offsetX = posStatusList.length ? posStatusList[0] : false;
    var offsetY = posStatusList.length ? posStatusList[1] : false;
    var swidth  = posStatusList.length ? posStatusList[2] : false;

    this._battleStatusSpriteOffsetY = offsetY ? +offsetY : params.dispOffsetY;
    offsetX = offsetX ? +offsetX : params.dispOffsetX;
    swidth = swidth ? +swidth : params.statusWidth;
    this._battleStatusSprite.setup(battler, offsetX, swidth);
  };

  Sprite_Enemy.prototype.getPosStatus = function(enemy) {
    const posStatusList = [];
console.log(params)
console.log(params.dispEnemyHp.gauge)
    for (const posStatus of params.posStatusList) {
      if (enemy.id === posStatus.enemyId) {
        posStatusList.push(posStatus.statusPosX);
        posStatusList.push(posStatus.statusPosY);
        posStatusList.push(posStatus.statusWidth);
        break;
      }
    }
    return posStatusList;
  };

  const _Sprite_Enemy_Update = Sprite_Enemy.prototype.update;
  Sprite_Enemy.prototype.update = function() {
    _Sprite_Enemy_Update.apply(this, arguments);
    if (this._enemy) {
      this.updateStatusSprite();
    }
  };

  Sprite_Enemy.prototype.updateStatusSprite = function() {
    var y = this._battleStatusSpriteOffsetY;
    this._battleStatusSprite.y = -this.bitmap.height + y - this._battleStatusSprite.bitmap.height/2;
  };

  //=============================================================================
  // Sprite_BattleStatus
  //=============================================================================

  function Sprite_BattleStatus() {
    this.initialize.apply(this, arguments);
  }

  Sprite_BattleStatus.prototype = Object.create(Sprite.prototype);
  Sprite_BattleStatus.prototype.constructor = Sprite_BattleStatus;

  Sprite_BattleStatus.prototype.initialize = function() {
    this.loadWindowskin();
    Sprite.prototype.initialize.call(this);
    this.initMembers();
  };

  Sprite_BattleStatus.prototype.initMembers = function() {
    this._battler = null;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this._hp = 0;
    this._mp = 0;
    this._tp = 0;
  };

  Sprite_BattleStatus.prototype.setup = function(battler, x, width) {
    this._battler = battler;
    this.setupBitmap(x, width);
    this.update();
  };

  Sprite_BattleStatus.prototype.standardFontSize = function() {
    return params.statusFontSize;
  };

  Sprite_BattleStatus.prototype.lineHeight = function() {
    return params.statusLineHeight;
  };

  Sprite_BattleStatus.prototype.setupBitmap = function(x, width) {
    width = width ? +width : params.statusWidth;
    var line = 0;
    if (params.dispEnemyName) line++;
    if (params.dispEnemyHp) line++;
    if (params.dispEnemyMp) line++;
    if (params.dispEnemyTp) line++;
    var height = line * this.lineHeight();
    this.bitmap = new Bitmap(width, height);
    this.bitmap.fontSize = this.standardFontSize();
    this.x = x ? +x : params.dispOffsetX;
  };

  Sprite_BattleStatus.prototype.setupPosition = function(x, y) {
    this.x = x || this.x;
    this.y = y || this.y;
  };

  Sprite_BattleStatus.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.updateStatus();
  };

  Sprite_BattleStatus.prototype.updateStatus = function() {
    if (this._battler && this._battler.isAlive()) {
      if (this.isChangedStatus()) {
        this.bitmap.clear();
        var i = 0;
        var h = this.lineHeight();
        var w = this.bitmap.width;
        this._hp = this._battler.hp;
        this._mp = this._battler.mp;
        this._tp = this._battler.tp;
        if (params.dispEnemyName) {
          this.drawText(this._battler.name(), 0, h*i, w);
          i++;
        }
        if (params.dispEnemyHp) {
          this.drawBattlerHp(this._battler, 0, h*i, w);
          i++;
        }
        if (params.dispEnemyMp) {
          this.drawBattlerMp(this._battler, 0, h*i, w);
          i++;
        }
        if (params.dispEnemyTp) {
          this.drawBattlerTp(this._battler, 0, h*i, w);
        }
      }
    }
  };

  Sprite_BattleStatus.prototype.loadWindowskin = function() {
    this.windowskin = ImageManager.loadSystem('Window');
  };

  Sprite_BattleStatus.prototype.isChangedStatus = function() {
    return this._battler && 
      (this._hp !== this._battler.hp || this._mp !== this._battler.mp || this._tp !== this._battler.tp);
  };

  Sprite_BattleStatus.prototype.textColor = function(n) {
    var px = 96 + (n % 8) * 12 + 6;
    var py = 144 + Math.floor(n / 8) * 12 + 6;
    return this.windowskin.getPixel(px, py);
  };

  Sprite_BattleStatus.prototype.normalColor = function() {
    return this.textColor(0);
  };

  Sprite_BattleStatus.prototype.systemColor = function() {
    return this.textColor(16);
  };

  Sprite_BattleStatus.prototype.crisisColor = function() {
    return this.textColor(17);
  };

  Sprite_BattleStatus.prototype.deathColor = function() {
    return this.textColor(18);
  };

  Sprite_BattleStatus.prototype.gaugeBackColor = function() {
    return this.textColor(19);
  };

  Sprite_BattleStatus.prototype.hpGaugeColor1 = function() {
    return this.textColor(20);
  };

  Sprite_BattleStatus.prototype.hpGaugeColor2 = function() {
    return this.textColor(21);
  };

  Sprite_BattleStatus.prototype.mpGaugeColor1 = function() {
    return this.textColor(22);
  };

  Sprite_BattleStatus.prototype.mpGaugeColor2 = function() {
    return this.textColor(23);
  };

  Sprite_BattleStatus.prototype.tpGaugeColor1 = function() {
    return this.textColor(28);
  };

  Sprite_BattleStatus.prototype.tpGaugeColor2 = function() {
    return this.textColor(29);
  };

  Sprite_BattleStatus.prototype.changeTextColor = function(color) {
    this.bitmap.textColor = color;
  };

  Sprite_BattleStatus.prototype.drawText = function(text, x, y, maxWidth, align) {
    this.bitmap.drawText(text, x, y, maxWidth, this.lineHeight(), align);
  };

  Sprite_BattleStatus.prototype.textWidth = function(text) {
    return this.bitmap.measureTextWidth(text);
  };

  Sprite_BattleStatus.prototype.drawGauge = function(x, y, width, rate, color1, color2) {
    var fillW = Math.floor(width * rate);
    var gaugeY = y + this.lineHeight() - 8;
    this.bitmap.fillRect(x, gaugeY, width, 6, this.gaugeBackColor());
    this.bitmap.gradientFillRect(x, gaugeY, fillW, 6, color1, color2);
  };

  Sprite_BattleStatus.prototype.hpColor = function(actor) {
    if (actor.isDead()) {
      return this.deathColor();
    } else if (actor.isDying()) {
      return this.crisisColor();
    } else {
      return this.normalColor();
    }
  };

  Sprite_BattleStatus.prototype.mpColor = function(actor) {
    return this.normalColor();
  };

  Sprite_BattleStatus.prototype.tpColor = function(actor) {
    return this.normalColor();
  };

  Sprite_BattleStatus.prototype.drawCurrentAndMax = function(current, max, x, y,
                                                      width, color1, color2) {
    var labelWidth = this.textWidth('HP');
    var valueWidth = this.textWidth('0000');
    var slashWidth = this.textWidth('/');
    var x1 = x + width - valueWidth;
    var x2 = x1 - slashWidth;
    var x3 = x2 - valueWidth;
    if (x3 >= x + labelWidth) {
      this.changeTextColor(color1);
      this.drawText(current, x3, y, valueWidth, 'right');
      this.changeTextColor(color2);
      this.drawText('/', x2, y, slashWidth, 'right');
      this.drawText(max, x1, y, valueWidth, 'right');
    } else {
      this.changeTextColor(color1);
      this.drawText(current, x1, y, valueWidth, 'right');
    }
  };

  Sprite_BattleStatus.prototype.drawBattlerHp = function(battler, x, y, width) {
    width = width || 144;
    var color1 = this.hpGaugeColor1();
    var color2 = this.hpGaugeColor2();
    if(params.dispEnemyHp.gauge) this.drawGauge(x, y, width, battler.hpRate(), color1, color2);
      if(params.dispEnemyHp.label) {
        this.drawText(TextManager.hpA, x, y, 44);
        this.changeTextColor(this.systemColor());
      }
      if(params.dispEnemyHp.value) this.drawCurrentAndMax(battler.hp, battler.mhp, x, y, width,
                            this.hpColor(battler), this.normalColor());
  };

  Sprite_BattleStatus.prototype.drawBattlerMp = function(battler, x, y, width) {
    width = width || 144;
    var color1 = this.mpGaugeColor1();
    var color2 = this.mpGaugeColor2();
    if(params.dispEnemyMp.gauge) this.drawGauge(x, y, width, battler.mpRate(), color1, color2);
      if(params.dispEnemyMp.label) {
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.mpA, x, y, 44);
      }
      if(params.dispEnemyMp.value) this.drawCurrentAndMax(battler.mp, battler.mmp, x, y, width,
                              this.mpColor(battler), this.normalColor());
  };

  Sprite_BattleStatus.prototype.drawBattlerTp = function(battler, x, y, width) {
    width = width || 96;
    var color1 = this.tpGaugeColor1();
    var color2 = this.tpGaugeColor2();
    if(params.dispEnemyTp.gauge) this.drawGauge(x, y, width, battler.tpRate(), color1, color2);
      if(params.dispEnemyTp.label) {
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.tpA, x, y, 44);
      }
      if(params.dispEnemyTp.value) {
        this.changeTextColor(this.tpColor(battler));
        this.drawText(battler.tp, x + width - 64, y, 64, 'right');
      }
  };
})();
