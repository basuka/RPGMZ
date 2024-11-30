//=============================================================================
// RPG Maker MZ - SplitParty
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc 分割パーティー機能を追加します。
 * @author Basu
 * @url https://raw.githubusercontent.com/basuka/RPGMZ/main/SplitParty/SplitParty.js
 *
 *
 * @help パラメータ・コマンドの設定項目
 *
 * 【パラメータ】
 *
 * ■キャンセル判定
 * 分割パーティーの編成がキャンセルされたかどうかを判定するスイッチを設定します。
 * キャンセルされた場合はON、キャンセルされなかった場合はOFFが設定されます。
 *
 *
 * 【設定・コマンド】
 * 分割パーティーの設定を行います。
 *
 * ■パーティー数
 * 分割するパーティーの数を設定します。
 *
 * ■メンバー追加
 * メンバーに存在しないアクターを追加する場合設定します。
 *
 * 　・メンバー追加
 * 　追加するアクターを設定します。
 *
 * 　・終了メンバー追加
 * 　この項目を設定すると「メンバー追加」で設定したアクターからこの項目で設定したアクターまで一括で追加することができます。
 * 　既に追加されているアクターは除外されます。
 *
 * ■メンバー追加(変数)
 * メンバーに存在しないアクターを変数で追加する場合設定します。
 * 変数に設定されている値が追加するアクターIDになります。
 *
 * 　・メンバー追加(変数)
 * 　追加するアクターを変数で設定します。
 *
 * 　・終了メンバー追加(変数)
 * 　この項目を設定すると「メンバー追加(変数)」で設定した変数からこの項目で設定した変数まで一括で追加することができます。
 * 　既に追加されているアクターIDは除外されます。
 *
 * ■必須アクター
 * 強制メンバーにするアクターを設定します。
 * ここで設定されたアクターはメンバーから外せなくなります。
 *
 * 　・必須アクター
 * 　必須アクターを設定します。
 *
 * 　・パーティー固定
 * 　必須アクターを固定するパーティー番号を設定します。
 * 　ここで設定したパーティー番号のパーティーから編成画面で変更することができなくなります。
 * 　0を設定するとパーティーは固定されません。
 *
 * ■開始位置(2パーティー)
 * 第2パーティーの開始位置を設定します。
 *
 * ■開始位置(3パーティー)
 * 第3パーティーの開始位置を設定します。
 *
 * ■開始位置(4パーティー)
 * 第4パーティーの開始位置を設定します。
 *
 *
 * 【位置チェック・コマンド】
 * いずれかのパーティーがこの位置に存在するかチェックを行います。
 * 主にスイッチなどに使用することを想定しています。
 *
 * ■位置判定
 * 位置判定を行うスイッチを設定します。
 * このイベントの位置にメンバーが存在する場合ONになります。
 * 離れるとスイッチはOFFになります。
 *
 *
 * 【終了・コマンド】
 * 分割パーティーを終了します。
 *
 * ■非戦闘メンバー
 * 分割パーティー終了時のパーティー編成で非戦闘メンバーを加えるかの判定を行います。
 * 非戦闘メンバーを加える場合、全対象メンバーがパーティーに追加されます。
 *
 * ■除外アクター
 * メンバー編成から除外するアクターを設定します。
 * ここで設定されたアクターはメンバー編成で表示されなくなります。
 *
 * ■必須メンバー
 * 必須メンバーを設定します。
 * ここで設定されたアクターはメンバーから外せなくなります。
 *
 *
 * ※前提事項
 * このプラグインは各マップに1つ以上のイベントが設定されていることを前提としています。
 * 分割パーティー中にイベントが設定されていないマップに移動した場合エラーが発生します。
 * 必ず１つ以上のイベントを設定してください。
 *
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
 * 2024/6/18 Ver.1.0.0　公開
 * 2024/6/19 Ver.1.0.1　待機パーティーのキャラが変更前の先頭キャラになってしまう不具合を修正
 * 2024/6/22 Ver.2.0.0　サブパーティー(第2パーティー以降)の開始マップIDを設定できるよう機能を追加
 *                      分割パーティー編成時に必須アクターを設定できるよう機能を追加
 *                      必須アクターを指定パーティーに固定できるよう機能を追加
 *                      分割パーティー終了時のパーティー編成で編成から除外するアクターを設定できるよう機能を追加
 * 2024/11/29 Ver.2.0.1 初期画面でインポートした素材(歩行/顔グラフィック)が表示されない問題を修正
 *                      分割パーティー終了時のパーティー編成で必須アクターを設定できるよう機能を追加
 *
 *
 *=====================================================================================================================================================
 * @param cancelSwitchId
 * @text キャンセル判定
 * @type switch
 * @default 1
 * @desc キャンセルされたか判定をするスイッチを設定
 *
 * @command setup
 * @text 設定
 * @desc メンバーの設定
 *
 * @arg partySize
 * @text パーティー数
 * @type select
 * @option 2
 * @value 2
 * @option 3
 * @value 3
 * @option 4
 * @value 4
 * @default 4
 * @desc パーティー数を設定
 *
 * @arg addActorIdList
 * @text メンバー追加
 * @type struct<addActor>[]
 * @desc パーティー以外のメンバーを追加する場合設定
 *
 * @arg addMemberVariableList
 * @text メンバー追加(変数)
 * @type struct<addMemberVariable>[]
 * @desc パーティー以外のメンバーを変数で追加する場合設定
 *
 * @arg requiredActorList
 * @text 必須アクター
 * @type struct<requiredActor>[]
 * @desc 必須アクターを設定
 *       ここで設定されたアクターはメンバーから外せなくなります
 *
 * @arg partyPos2
 * @text 開始位置(2パーティー)
 * @type struct<pos>
 * @desc 2パーティー目の開始位置を設定
 *
 * @arg partyPos3
 * @text 開始位置(3パーティー)
 * @type struct<pos>
 * @desc 3パーティー目の開始位置を設定
 *
 * @arg partyPos4
 * @text 開始位置(4パーティー)
 * @type struct<pos>
 * @desc 4パーティー目の開始位置を設定
 *
 * @command checkPos
 * @text 位置チェック
 * @desc 位置チェックの設定
 *
 * @arg switchId
 * @text 位置判定
 * @type switch
 * @default 1
 * @desc 位置チェックを行った場所に存在するかの判定を設定するスイッチを設定
 *
 * @command end
 * @text 終了
 * @desc 分割パーティー終了
 *
 * @arg backMember
 * @text 非戦闘メンバー
 * @type boolean
 * @on 加える
 * @off 加えない
 * @default false
 * @desc 通常メンバーに非戦闘メンバーを加えるかを設定
 *
 * @arg exclusionActorIdList
 * @text 除外アクターID
 * @type actor[]
 * @desc 通常メンバー編成から除外するアクターを設定
 *
 * @arg requiredMemberList
 * @text 必須メンバー
 * @type actor[]
 * @desc 必須メンバーを設定
 *       ここで設定されたアクターはメンバーから外せなくなります
 *
 */

/*~struct~requiredActor:ja
 * @param actorId
 * @text 必須アクター
 * @type actor
 * @desc 必須アクターを設定
 *
 * @param fixedParty
 * @text パーティー固定
 * @type number
 * @min 0
 * @max 4
 * @default 0
 * @desc 固定するパーティー番号を設定
 *       0を設定するとパーティーは固定されません
 *
 */

/*~struct~addActor:ja
 * @param addActorId
 * @text メンバー追加
 * @type actor
 * @desc 追加するアクターを設定
 *
 * @param endAddActorId
 * @text 終了メンバー追加
 * @type actor
 * @desc この項目を設定するとこのアクターIDまでまとめて追加されます
 *
 */

/*~struct~addMemberVariable:ja
 * @param addMemberVariableId
 * @text メンバー追加(変数)
 * @type variable
 * @desc パーティー以外のメンバーを変数で追加する場合設定
 *
 * @param endAddMemberVariableId
 * @text 終了メンバー追加(変数)
 * @type variable
 * @desc この項目を設定するとこの変数IDまでの値でまとめて追加されます
 *
 */

/*~struct~pos:ja
 * @param mapId
 * @text マップID
 * @type number
 * @min 0
 * @default 0
 * @desc パーティーの開始マップIDを設定
 *       0の場合は場所移動イベントで移動したマップIDになります
 *
 * @param x
 * @text 開始座標X
 * @type number
 * @min 0
 * @default 0
 * @desc パーティーの開始位置(X座標)を設定
 *
 * @param y
 * @text 開始座標Y
 * @type number
 * @min 0
 * @default 0
 * @desc パーティーの開始位置(Y座標)を設定
 *
 */

$gameSplitParty = null;

//-----------------------------------------------------------------------------
// Game_SplitParty
//-----------------------------------------------------------------------------
function Game_SplitParty() {
    this.initialize(...arguments);
}

Game_SplitParty.prototype.initialize = function () {
    this.init();
};

Game_SplitParty.prototype.init = function () {
    this._selectPartyId = 0;
    this._baseDumyId = 0;
    this._splitParties = {};
    this._dumyPartyEvents = {};
    this._needsMapPageButtons = false;
    this._allActorIdList = [];
    this._exclusionActorIdList = [];
    this._defaultMapId = 0;
    this._changeFlg = false;
};

Game_SplitParty.prototype.setParty = function (id, actorList) {
    this._splitParties[id] = {};
    this._splitParties[id].id = id;
    this._splitParties[id].actorList = actorList;
    this._splitParties[id].switchId = 0;
    this._splitParties[id].isCheckPos = false;
};

Game_SplitParty.prototype.setPartyPos = function (id, pos) {
    this._splitParties[id].mapId = pos.mapId;
    this._splitParties[id].x = pos.x;
    this._splitParties[id].y = pos.y;
};

Game_SplitParty.prototype.createDumyPartyEvent = function (id) {
    const party = this._splitParties[id];
    const actor = party.actorList[0];

    const dumyEvent = {
        id: id,
        name: "dumyEvent",
        note: "",
        pages: [
            {
                conditions: { actorId: 1, actorValid: false, itemId: 1, itemValid: false, selfSwitchCh: "A", selfSwitchValid: false, switch1Id: 1, switch1Valid: false, switch2Id: 1, switch2Valid: false, variableId: 1, variableValid: false, variableValue: 0 },
                directionFix: false,
                image: { tileId: 0, characterName: actor.characterName(), direction: 2, pattern: 1, characterIndex: actor.characterIndex() },
                list: [{ code: 0, indent: 0, parameters: [] }],
                moveFrequency: 3,
                moveRoute: { list: [{ code: 0, parameters: [] }], repeat: true, skippable: false, wait: false },
                moveSpeed: 3,
                moveType: 0,
                priorityType: 1,
                stepAnime: false,
                through: false,
                trigger: 0,
                walkAnime: true,
            },
        ],
        x: party.x,
        y: party.y,
        meta: {},
    };

    this._dumyPartyEvents[id] = dumyEvent;
};

Game_SplitParty.prototype.setInterpreter = function (interpreter) {
    this._interpreter = interpreter;
};

Game_SplitParty.prototype.select = function (id) {
    this._selectPartyId = id;
    this._changeFlg = true;
};

Game_SplitParty.prototype.nextParty = function () {
    let nextId = this._selectPartyId + 1;

    if (this.partySize() < nextId) {
        nextId = 1;
    }

    this.update(nextId);
};

Game_SplitParty.prototype.previousParty = function () {
    let previousId = this._selectPartyId - 1;

    if (previousId < 1) {
        previousId = this.partySize();
    }

    this.update(previousId);
};

Game_SplitParty.prototype.update = function (id) {
    const party = this.party();
    this.select(id);
    this.updateParty(party);
    this.updatePos(party);
    this.updateDumyEvent(party);
    this.changeNextParty(id);
};

Game_SplitParty.prototype.updateParty = function (party) {
    const actor = $gameParty.members()[0];
    const partyActor = party.actorList[0];

    if (actor.actorId() !== partyActor.actorId()) {
        party.actorList = $gameParty.members();

        const dumyEvent = this._dumyPartyEvents[party.id];

        const image = dumyEvent.pages[0].image;
        image.characterName = actor.characterName();
        image.characterIndex = actor.characterIndex();

        $gameMap.event(dumyEvent.id).setImage(image.characterName, image.characterIndex);
    }
};

Game_SplitParty.prototype.updatePos = function (party) {
    party.mapId = $gameMap.mapId();
    party.x = $gamePlayer.x;
    party.y = $gamePlayer.y;
};

Game_SplitParty.prototype.updateDumyEvent = function (party) {
    const dumyEvent = this._dumyPartyEvents[party.id];

    const image = dumyEvent.pages[0].image;
    image.direction = $gamePlayer.direction();

    dumyEvent.x = $gamePlayer.x;
    dumyEvent.y = $gamePlayer.y;

    $gameMap.event(dumyEvent.id).setDirection($gamePlayer.direction());
    $gameMap.event(dumyEvent.id).locate($gamePlayer.x, $gamePlayer.y);
};

Game_SplitParty.prototype.changeNextParty = function (id) {
    const dumyId = this._dumyPartyEvents[id].id;
    const nextParty = this._splitParties[id];
    let mapId = nextParty.mapId;

    if (mapId === 0) {
        mapId = this._defaultMapId;
        nextParty.mapId = mapId;
    }

    this._changeFlg = true;

    const direction = $gameMap.event(dumyId).direction();

    const cmdParams = [];
    cmdParams.push(0);
    cmdParams.push(mapId);
    cmdParams.push(nextParty.x);
    cmdParams.push(nextParty.y);
    cmdParams.push(direction);
    cmdParams.push(0);

    this._interpreter.command201(cmdParams);
};

Game_SplitParty.prototype.openMapPageButtons = function () {
    this._needsMapPageButtons = true;
};

Game_SplitParty.prototype.party = function () {
    return this._splitParties[this._selectPartyId];
};

Game_SplitParty.prototype.needsMapPageButtons = function () {
    return this._needsMapPageButtons;
};

Game_SplitParty.prototype.setGameParty = function () {
    const party = this._splitParties[this._selectPartyId];
    $gameParty.members().forEach((actor) => {
        $gameParty.removeActor(actor.actorId());
    });

    party.actorList.forEach((actor) => {
        $gameParty.addActor(actor.actorId());
    });

    const dumyPartyEvent = this._dumyPartyEvents[this._selectPartyId];

    $gameMap.event(dumyPartyEvent.id).locate(-1, -1);

    this._changeFlg = false;
};

Game_SplitParty.prototype.partySize = function () {
    return Object.keys(this._splitParties).length;
};

Game_SplitParty.prototype.isSplitParty = function () {
    return this._selectPartyId > 0;
};

Game_SplitParty.prototype.isSelectPartyId = function (id) {
    return this._selectPartyId === id;
};

Game_SplitParty.prototype.setEventId = function (id) {
    this._baseDumyId = id;

    let index = 1;

    for (const id in this._dumyPartyEvents) {
        this._dumyPartyEvents[id].id = this._baseDumyId + index;
        index++;
    }
};

Game_SplitParty.prototype.baseDumyId = function () {
    return this._baseDumyId;
};

Game_SplitParty.prototype.dumyPartyEvents = function () {
    return this._dumyPartyEvents;
};

Game_SplitParty.prototype.setCheckPos = function (params) {
    const party = this.party();
    this.updatePos(party);
    party.switchId = params.switchId;
    party.isCheckPos = true;

    $gameSwitches.setValue(params.switchId, true);
};

Game_SplitParty.prototype.setExclusionActorIdList = function (params) {
    this._exclusionActorIdList = params.exclusionActorIdList;
};

Game_SplitParty.prototype.addActorId = function (actorId) {
    if (!this._allActorIdList.includes(actorId)) {
        this._allActorIdList.push(actorId);
    }
};

Game_SplitParty.prototype.allActorIdList = function () {
    if (this._exclusionActorIdList) {
        return this._allActorIdList.filter((actorId) => !this._exclusionActorIdList.includes(actorId));
    } else {
        return this._allActorIdList;
    }
};

Game_SplitParty.prototype.partyMapId = function (id) {
    const party = this._splitParties[id];
    return party.mapId > 0 ? party.mapId : this._defaultMapId;
};

Game_SplitParty.prototype.setDefaultMapId = function (mapId) {
    if (this._defaultMapId === 0) {
        this._defaultMapId = mapId;
    }
};

Game_SplitParty.prototype.isChange = function () {
    return this._changeFlg;
};

Game_SplitParty.prototype.clear = function () {
    for (const id in this._dumyPartyEvents) {
        const dumyEvent = this._dumyPartyEvents[id];
        $gameMap.eraseEvent(dumyEvent.id);
    }
    this.init();
};

(() => {
    "use strict";

    let $splitParty = null;

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

    PluginManager.registerCommand(Plugin_Name, "setup", function (splitPartyParams) {
        PluginParams.prototype.parse(splitPartyParams);
        $splitParty.init();
        $gameSplitParty.init();
        $gameSplitParty.setInterpreter(this);
        $splitParty.setParams(splitPartyParams);
        SceneManager.push(Scene_SplitParty);
    });

    PluginManager.registerCommand(Plugin_Name, "checkPos", function (splitPartyParams) {
        if ($gameSplitParty.isSplitParty()) {
            PluginParams.prototype.parse(splitPartyParams);
            $gameSplitParty.setCheckPos(splitPartyParams);
        }
    });

    PluginManager.registerCommand(Plugin_Name, "end", function (splitPartyParams) {
        if ($gameSplitParty.isSplitParty()) {
            PluginParams.prototype.parse(splitPartyParams);
            $splitParty.setEndParams(splitPartyParams);
            $gameSplitParty.setExclusionActorIdList(splitPartyParams);
            SceneManager.push(Scene_EndSplitParty);
        }
    });

    //-----------------------------------------------------------------------------
    // SplitParty
    //-----------------------------------------------------------------------------
    function SplitParty() {
        this.initialize(...arguments);
    }

    SplitParty.prototype.initialize = function () {
        this._cancelSwitchId = 0;

        this.init();
        this.setup();
    };

    SplitParty.prototype.init = function () {
        this._partySize = 0;
        this._setupMapId = 0;
        this._addActorIdList = [];
        this._addMemberVariableList = [];
        this._requiredActorList = [];
        this._fixedActorIdList = [];
        this._partyPos1 = {};
        this._partyPos2 = {};
        this._partyPos3 = {};
        this._partyPos4 = {};

        this._backMember = false;
        this._requiredMemberList = [];
    };

    SplitParty.prototype.setup = function () {
        this._cancelSwitchId = params.cancelSwitchId;
    };

    SplitParty.prototype.setParams = function (splitPartyParams) {
        this._partySize = splitPartyParams.partySize;
        this._addActorIdList = splitPartyParams.addActorIdList;
        this._addMemberVariableList = splitPartyParams.addMemberVariableList;
        this._requiredActorList = splitPartyParams.requiredActorList;
        this._partyPos2 = splitPartyParams.partyPos2;
        this._partyPos3 = splitPartyParams.partyPos3;
        this._partyPos4 = splitPartyParams.partyPos4;
    };

    SplitParty.prototype.setEndParams = function (splitPartyParams) {
        this._backMember = splitPartyParams.backMember;
        this._requiredMemberList = splitPartyParams.requiredMemberList;
    };

    SplitParty.prototype.cancelSwitchId = function () {
        return this._cancelSwitchId;
    };

    SplitParty.prototype.requiredActorList = function () {
        return this._requiredActorList ? this._requiredActorList.filter((requiredActor) => requiredActor.fixedParty === 0) : [];
    };

    SplitParty.prototype.fixedActorList = function () {
        return this._requiredActorList ? this._requiredActorList.filter((requiredActor) => requiredActor.fixedParty !== 0) : [];
    };

    SplitParty.prototype.isRequiredActor = function (actor) {
        return this._requiredActorList && this._requiredActorList.some((requiredActor) => requiredActor.actorId === actor.actorId());
    };

    SplitParty.prototype.addFixedActorId = function (actorId) {
        return this._fixedActorIdList.push(actorId);
    };

    SplitParty.prototype.isFixedActor = function (actor) {
        return this._fixedActorIdList.includes(actor.actorId());
    };

    SplitParty.prototype.partySize = function () {
        return this._partySize;
    };

    SplitParty.prototype.partyPos2 = function () {
        return this._partyPos2;
    };

    SplitParty.prototype.partyPos3 = function () {
        return this._partyPos3;
    };

    SplitParty.prototype.partyPos4 = function () {
        return this._partyPos4;
    };

    SplitParty.prototype.isBackMember = function () {
        return this._backMember;
    };

    SplitParty.prototype.requiredMemberList = function () {
        return this._requiredMemberList;
    };

    SplitParty.prototype.memberList = function () {
        let actorList = [];
        const allActorIdList = $gameSplitParty.allActorIdList();
        if (allActorIdList.length > 0) {
            allActorIdList.forEach((actorId) => {
                const actor = $gameActors.actor(actorId);
                actorList.push(actor);
            });

            if (this._requiredMemberList.length > 0) {
                this._requiredMemberList.forEach((actorId) => {
                    if (!actorList.some((actor) => actor.actorId() === actorId)) {
                        const actor = $gameActors.actor(actorId);
                        actorList.push(actor);
                    }
                });
            }
        } else {
            actorList = this.setMemberList();
        }

        return actorList;
    };

    SplitParty.prototype.setMemberList = function () {
        const actorIdList = [];

        $gameParty.allMembers().forEach((actor) => {
            actorIdList.push(actor.actorId());
        });

        if (this._addActorIdList) {
            this._addActorIdList.forEach((addActor) => {
                const startId = addActor.addActorId;
                const endId = addActor.endAddActorId && addActor.endAddActorId > 0 ? addActor.endAddActorId : addActor.addActorId;
                for (let id = startId; id <= endId; id++) {
                    if (!actorIdList.includes(id)) {
                        actorIdList.push(id);
                    }
                }
            });
        }

        if (this._addMemberVariableList) {
            this._addMemberVariableList.forEach((addMemberVariable) => {
                const startId = addMemberVariable.addMemberVariableId;
                const endId = addMemberVariable.endAddMemberVariableId && addMemberVariable.endAddMemberVariableId > 0 ? addMemberVariable.endAddMemberVariableId : addMemberVariable.endAddMemberVariableId;
                for (let id = startId; id <= endId; id++) {
                    const actorId = $gameVariables.value(id);
                    if (actorId && actorId > 0 && !actorIdList.includes(actorId)) {
                        actorIdList.push(actorId);
                    }
                }
            });
        }

        actorIdList.sort(function (first, second) {
            if (first > second) {
                return 1;
            } else if (first < second) {
                return -1;
            } else {
                return 0;
            }
        });

        const actorList = [];

        actorIdList.forEach((actorId) => {
            const actor = $gameActors.actor(actorId);
            actorList.push(actor);
            $gameSplitParty.addActorId(actorId);
        });

        return actorList;
    };

    SplitParty.prototype.openMapPageButtons = function () {
        $gameSplitParty.openMapPageButtons();
        this._setupMapId = $gameMap.mapId();
    };

    SplitParty.prototype.setupMapId = function () {
        return this._setupMapId;
    };

    SplitParty.prototype.checkPos = function () {
        const party = $gameSplitParty.party();
        if (party.isCheckPos) {
            if (party.x !== $gamePlayer.x || party.y !== $gamePlayer.y) {
                $gameSwitches.setValue(party.switchId, false);

                party.switchId = 0;
                party.isCheckPos = false;
            }
        }
    };

    //-----------------------------------------------------------------------------
    // Scene_EndSplitParty
    //-----------------------------------------------------------------------------
    function Scene_EndSplitParty() {
        this.initialize(...arguments);
    }

    Scene_EndSplitParty.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_EndSplitParty.prototype.constructor = Scene_EndSplitParty;

    Scene_EndSplitParty.prototype.initialize = function () {
        Scene_MenuBase.prototype.initialize.call(this);
    };

    Scene_EndSplitParty.prototype.create = function () {
        Scene_MenuBase.prototype.create.call(this);
        this.createSelectPartyWindow();
        this.createMemberStatusWindow();
        this.createSelectMemberWindow();
        this.createSetMemberEndCommandWindow();
    };

    Scene_EndSplitParty.prototype.start = function () {
        Scene_MenuBase.prototype.start.call(this);
        this._selectMemberWindow.activate();
        this._selectMemberWindow.select(0);
        this._selectMemberWindow.refresh();
        this._selectPartyWindow.deactivate();
        this._selectPartyWindow.selectWindow();
        this._setMemberEndCommandWindow.hide();
        this._setMemberEndCommandWindow.deactivate();
        this._selectMemberStatusWindow.setActor(this._selectMemberWindow.item());

        this.setRequiredMember();
    };

    Scene_EndSplitParty.prototype.createSelectPartyWindow = function () {
        const rect = this.selectPartyWindowRect();
        this._selectPartyWindow = new Window_SelectParty(rect);
        this.addWindow(this._selectPartyWindow);
    };

    Scene_EndSplitParty.prototype.selectPartyWindowRect = function () {
        const ww = ($gameMap.tileWidth() + 16 * 2) * 2;
        const wh = ($gameMap.tileHeight() + $gameSystem.windowPadding() * 2) * 2;
        const wx = ww + $gameSystem.windowPadding() - ww / 2;
        const wy = this.mainAreaTop();
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_EndSplitParty.prototype.createMemberStatusWindow = function () {
        const rect = this.memberStatusWindowRect();
        this._selectMemberStatusWindow = new Window_SelectMemberStatus(rect);
        this.addWindow(this._selectMemberStatusWindow);
    };

    Scene_EndSplitParty.prototype.memberStatusWindowRect = function () {
        const selectPartyRect = this.selectPartyWindowRect();
        const wx = 0;
        const wy = selectPartyRect.y + selectPartyRect.height + 16;
        const ww = Math.floor(Graphics.boxWidth / 2);
        const wh = this.selectMemberWindowRect().y - wy - 16;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_EndSplitParty.prototype.createSelectMemberWindow = function () {
        const rect = this.selectMemberWindowRect();
        this._selectMemberWindow = new Window_SelectMember(rect);
        this._selectMemberWindow.setHandler("ok", this.onSelectActor.bind(this));
        this._selectMemberWindow.setHandler("cancel", this.onSetEnd.bind(this));
        this._selectMemberWindow.setStatusWindow(this._selectMemberStatusWindow);
        this.addWindow(this._selectMemberWindow);
    };

    Scene_EndSplitParty.prototype.selectMemberWindowRect = function () {
        const ww = Graphics.boxWidth;
        const wh = ($gameMap.tileHeight() + $gameSystem.windowPadding() * 2) * 3;
        const wx = 0;
        const wy = Graphics.boxHeight - wh;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_EndSplitParty.prototype.onSelectActor = function () {
        this.setSelectActor();
        this._selectMemberWindow.activate();
    };

    Scene_EndSplitParty.prototype.setSelectActor = function () {
        const item = this._selectMemberWindow.item();
        const requiredMemberList = $splitParty.requiredMemberList();
        if (requiredMemberList.includes(item.actorId())) {
            SoundManager.playBuzzer();
        } else {
            if (this._selectPartyWindow.isAddItem(item)) {
                this._selectPartyWindow.removeItem(item);
                this._selectMemberWindow.removeActor(item);
            } else {
                if (this._selectPartyWindow.isMaxMember()) {
                    SoundManager.playBuzzer();
                } else {
                    this._selectPartyWindow.addItem(item);
                    this._selectMemberWindow.addActor(item);
                }
            }

            this._selectPartyWindow.refresh();
            this._selectMemberWindow.refresh();
        }
    };

    Scene_EndSplitParty.prototype.setRequiredMember = function () {
        const requiredMemberList = $splitParty.requiredMemberList();

        if (requiredMemberList) {
            requiredMemberList.forEach((actorId) => {
                const actor = $gameActors.actor(actorId);
                this._selectPartyWindow.addItem(actor);
                this._selectMemberWindow.addActor(actor);
            });

            this._selectPartyWindow.refresh();
            this._selectMemberWindow.refresh();
        }
    };

    Scene_EndSplitParty.prototype.onSetEnd = function () {
        if (this._selectPartyWindow.isSetData()) {
            this._selectMemberWindow.deactivate();
            this._setMemberEndCommandWindow.select(0);
            this._setMemberEndCommandWindow.show();
            this._setMemberEndCommandWindow.activate();
        } else {
            this._selectMemberWindow.activate();
        }
    };

    Scene_EndSplitParty.prototype.createSetMemberEndCommandWindow = function () {
        const rect = this.setMemberCommandRect();
        this._setMemberEndCommandWindow = new Window_SetMemberEndCommand(rect);
        this._setMemberEndCommandWindow.setHandler("yes", this.onSetParty.bind(this));
        this._setMemberEndCommandWindow.setHandler("no", this.onSetEndCancel.bind(this));
        this._setMemberEndCommandWindow.setHandler("cancel", this.onSetEndCancel.bind(this));
        this.addWindow(this._setMemberEndCommandWindow);
    };

    Scene_EndSplitParty.prototype.setMemberCommandRect = function () {
        const ww = Math.floor(Graphics.boxWidth / 2) + Math.floor(Graphics.boxWidth / 4);
        const wh = this.calcWindowHeight(4, true);
        const wx = Math.floor(Graphics.boxWidth / 2) - Math.floor(ww / 2);
        const wy = Math.floor(Graphics.boxHeight / 3);
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_EndSplitParty.prototype.onSetParty = function () {
        this.setSelectParty();
        $gameSplitParty.clear();
        this.popScene();
    };

    Scene_EndSplitParty.prototype.setSelectParty = function () {
        const actorList = this._selectPartyWindow.data();

        $gameParty.members().forEach((actor) => {
            $gameParty.removeActor(actor.actorId());
        });

        actorList.forEach((actor) => {
            $gameParty.addActor(actor.actorId());
        });

        if ($splitParty.isBackMember()) {
            $gameSplitParty.allActorIdList().forEach((actorId) => {
                $gameParty.addActor(actorId);
            });
        }
    };

    Scene_EndSplitParty.prototype.onSetEndCancel = function () {
        this._setMemberEndCommandWindow.deactivate();
        this._setMemberEndCommandWindow.hide();
        this._selectMemberWindow.activate();
    };

    Scene_EndSplitParty.prototype.createBackground = function () {
        this.addChild(new Sprite());
    };

    //-----------------------------------------------------------------------------
    // Scene_SplitParty
    //-----------------------------------------------------------------------------
    function Scene_SplitParty() {
        this.initialize(...arguments);
    }

    Scene_SplitParty.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_SplitParty.prototype.constructor = Scene_SplitParty;

    Scene_SplitParty.prototype.initialize = function () {
        Scene_MenuBase.prototype.initialize.call(this);
    };

    Scene_SplitParty.prototype.create = function () {
        Scene_MenuBase.prototype.create.call(this);
        this.createSelectPartyWindow();
        this.createMemberStatusWindow();
        this.createSelectMemberWindow();
        this.createSetMemberEndCommandWindow();
        this.createSetMemberCancelCommandWindow();
    };

    Scene_SplitParty.prototype.start = function () {
        Scene_MenuBase.prototype.start.call(this);
        this._selectMemberWindow.activate();
        this._selectMemberWindow.select(0);
        this._selectMemberWindow.refresh();
        this._selectPartyWindow1.deactivate();
        this._selectPartyWindow1.selectWindow();
        this._setMemberEndCommandWindow.hide();
        this._setMemberEndCommandWindow.deactivate();
        this._setMemberCancelCommandWindow.hide();
        this._setMemberCancelCommandWindow.deactivate();
        this._selectMemberStatusWindow.setActor(this._selectMemberWindow.item());

        this.setRequiredActor();
    };

    Scene_SplitParty.prototype.setRequiredActor = function () {
        const fixedActorList = $splitParty.fixedActorList();
        const requiredActorList = $splitParty.requiredActorList();

        fixedActorList.forEach((fixedActor) => {
            const actor = $gameActors.actor(fixedActor.actorId);

            $splitParty.addFixedActorId(fixedActor.actorId);

            if (!this._selectPartyWindow1.isMaxMember() && fixedActor.fixedParty === 1) {
                this._selectPartyWindow1.addItem(actor);
                this._selectMemberWindow.addActor(actor);
            } else if (this._selectPartyWindow2 && !this._selectPartyWindow2.isMaxMember() && fixedActor.fixedParty === 2) {
                this._selectPartyWindow2.addItem(actor);
                this._selectMemberWindow.addActor(actor);
            } else if (this._selectPartyWindow3 && !this._selectPartyWindow3.isMaxMember() && fixedActor.fixedParty === 3) {
                this._selectPartyWindow3.addItem(actor);
                this._selectMemberWindow.addActor(actor);
            } else if (this._selectPartyWindow4 && !this._selectPartyWindow4.isMaxMember() && fixedActor.fixedParty === 4) {
                this._selectPartyWindow4.addItem(actor);
                this._selectMemberWindow.addActor(actor);
            }
        });

        requiredActorList.forEach((requiredActor) => {
            const actor = $gameActors.actor(requiredActor.actorId);

            if (!this._selectPartyWindow1.isMaxMember()) {
                this._selectPartyWindow1.addItem(actor);
                this._selectMemberWindow.addActor(actor);
            } else if (this._selectPartyWindow2 && !this._selectPartyWindow2.isMaxMember()) {
                this._selectPartyWindow2.addItem(actor);
                this._selectMemberWindow.addActor(actor);
            } else if (this._selectPartyWindow3 && !this._selectPartyWindow3.isMaxMember()) {
                this._selectPartyWindow3.addItem(actor);
                this._selectMemberWindow.addActor(actor);
            } else if (this._selectPartyWindow4 && !this._selectPartyWindow4.isMaxMember()) {
                this._selectPartyWindow4.addItem(actor);
                this._selectMemberWindow.addActor(actor);
            }
        });

        if (fixedActorList.length > 0 || requiredActorList.length > 0) {
            this._selectPartyWindow1.select(0);
            this._selectPartyWindow2.deSelectWindow();
            this._selectPartyWindow3.deSelectWindow();
            this._selectPartyWindow4.deSelectWindow();

            this._selectPartyWindow1.refresh();
            this._selectPartyWindow2.refresh();
            this._selectPartyWindow3.refresh();
            this._selectPartyWindow4.refresh();
            this._selectMemberWindow.refresh();
        }
    };

    Scene_SplitParty.prototype.createSelectPartyWindow = function () {
        const rect1 = this.selectPartyWindowRect(1);
        this._selectPartyWindow1 = new Window_SelectParty(rect1);
        this.addWindow(this._selectPartyWindow1);

        const rect2 = this.selectPartyWindowRect(2);
        this._selectPartyWindow2 = new Window_SelectParty(rect2);
        this.addWindow(this._selectPartyWindow2);

        if ($splitParty.partySize() > 2) {
            const rect3 = this.selectPartyWindowRect(3);
            this._selectPartyWindow3 = new Window_SelectParty(rect3);
            this.addWindow(this._selectPartyWindow3);
        }

        if ($splitParty.partySize() > 3) {
            const rect4 = this.selectPartyWindowRect(4);
            this._selectPartyWindow4 = new Window_SelectParty(rect4);
            this.addWindow(this._selectPartyWindow4);
        }
    };

    Scene_SplitParty.prototype.selectPartyWindowRect = function (index) {
        const ww = ($gameMap.tileWidth() + 16 * 2) * 2;
        const wh = ($gameMap.tileHeight() + $gameSystem.windowPadding() * 2) * 2;
        const wx = ww * index + $gameSystem.windowPadding() - ww / 2;
        const wy = this.mainAreaTop();
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_SplitParty.prototype.createMemberStatusWindow = function () {
        const rect = this.memberStatusWindowRect();
        this._selectMemberStatusWindow = new Window_SelectMemberStatus(rect);
        this._selectMemberStatusWindow.setHandler("pagedown", this.nextActor.bind(this));
        this._selectMemberStatusWindow.setHandler("pageup", this.previousActor.bind(this));
        this.addWindow(this._selectMemberStatusWindow);
    };

    Scene_SplitParty.prototype.memberStatusWindowRect = function () {
        const selectPartyRect = this.selectPartyWindowRect();
        const wx = 0;
        const wy = selectPartyRect.y + selectPartyRect.height + 16;
        const ww = Math.floor(Graphics.boxWidth / 2);
        const wh = this.selectMemberWindowRect().y - wy - 16;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_SplitParty.prototype.createSelectMemberWindow = function () {
        const rect = this.selectMemberWindowRect();
        this._selectMemberWindow = new Window_SelectMember(rect);
        this._selectMemberWindow.setHandler("ok", this.onSelectActor.bind(this));
        this._selectMemberWindow.setHandler("cancel", this.onSetEnd.bind(this));
        this._selectMemberWindow.setStatusWindow(this._selectMemberStatusWindow);
        this.addWindow(this._selectMemberWindow);
    };

    Scene_SplitParty.prototype.selectMemberWindowRect = function () {
        const ww = Graphics.boxWidth;
        const wh = ($gameMap.tileHeight() + $gameSystem.windowPadding() * 2) * 3;
        const wx = 0;
        const wy = Graphics.boxHeight - wh;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_SplitParty.prototype.onSelectActor = function () {
        this.setSelectActor();
        this._selectMemberWindow.activate();
    };

    Scene_SplitParty.prototype.onSetEnd = function () {
        this._selectMemberStatusWindow.deactivate();
        this._selectMemberWindow.deactivate();
        if (this.isAllMemberSet()) {
            this._setMemberEndCommandWindow.select(0);
            this._setMemberEndCommandWindow.show();
            this._setMemberEndCommandWindow.activate();
        } else {
            this._setMemberCancelCommandWindow.select(0);
            this._setMemberCancelCommandWindow.show();
            this._setMemberCancelCommandWindow.activate();
        }
    };

    Scene_SplitParty.prototype.isAllMemberSet = function () {
        if (!this._selectPartyWindow1.isSetData()) {
            return false;
        } else if (!this._selectPartyWindow2.isSetData()) {
            return false;
        } else if (this._selectPartyWindow3 && !this._selectPartyWindow3.isSetData()) {
            return false;
        } else if (this._selectPartyWindow4 && !this._selectPartyWindow4.isSetData()) {
            return false;
        }

        return true;
    };

    Scene_SplitParty.prototype.setSelectActor = function () {
        const item = this._selectMemberWindow.item();

        let selectPartyWindow = null;
        let nextPartyWindow = null;

        if ($splitParty.isFixedActor(item)) {
            SoundManager.playBuzzer();
        } else {
            if (this._selectPartyWindow1.isSelectWindow()) {
                selectPartyWindow = this._selectPartyWindow1;
                nextPartyWindow = this._selectPartyWindow2;
            } else if (this._selectPartyWindow2.isSelectWindow()) {
                selectPartyWindow = this._selectPartyWindow2;
                if (this._selectPartyWindow3) {
                    nextPartyWindow = this._selectPartyWindow3;
                }
            } else if (this._selectPartyWindow3 && this._selectPartyWindow3.isSelectWindow()) {
                selectPartyWindow = this._selectPartyWindow3;
                if (this._selectPartyWindow4) {
                    nextPartyWindow = this._selectPartyWindow4;
                }
            } else if (this._selectPartyWindow4 && this._selectPartyWindow4.isSelectWindow()) {
                selectPartyWindow = this._selectPartyWindow4;
            }

            if (selectPartyWindow) {
                if (selectPartyWindow.isAddItem(item)) {
                    if ($splitParty.isRequiredActor(item)) {
                        SoundManager.playBuzzer();
                    } else {
                        selectPartyWindow.removeItem(item);
                        this._selectMemberWindow.removeActor(item);
                    }
                } else {
                    if ($splitParty.isRequiredActor(item) && selectPartyWindow.isMaxMember()) {
                        SoundManager.playBuzzer();
                    } else {
                        if (this._selectMemberWindow.isSetActor(item)) {
                            this.removeSetItem(this._selectPartyWindow1, item);
                            this.removeSetItem(this._selectPartyWindow2, item);
                            this.removeSetItem(this._selectPartyWindow3, item);
                            this.removeSetItem(this._selectPartyWindow4, item);

                            if ($splitParty.isRequiredActor(item)) {
                                selectPartyWindow.addItem(item);
                                this._selectMemberWindow.addActor(item);
                            }
                        } else {
                            if (selectPartyWindow.isMaxMember()) {
                                SoundManager.playBuzzer();
                            } else {
                                selectPartyWindow.addItem(item);
                                this._selectMemberWindow.addActor(item);

                                if (selectPartyWindow.isMaxMember() && nextPartyWindow) {
                                    selectPartyWindow.deSelectWindow();
                                    nextPartyWindow.selectWindow();
                                    nextPartyWindow.refresh();
                                }
                            }
                        }
                    }
                }
                selectPartyWindow.refresh();
                this._selectMemberWindow.refresh();
            }
        }
    };

    Scene_SplitParty.prototype.removeSetItem = function (selectPartyWindow, item) {
        if (selectPartyWindow && !selectPartyWindow.isSelectWindow() && selectPartyWindow.isAddItem(item)) {
            selectPartyWindow.removeItem(item);
            selectPartyWindow.refresh();
            this._selectMemberWindow.removeActor(item);
        }
    };

    Scene_SplitParty.prototype.nextActor = function () {
        if (this._selectPartyWindow1.isSelectWindow()) {
            this._selectPartyWindow1.deSelectWindow();
            this._selectPartyWindow2.selectWindow();
        } else if (this._selectPartyWindow2.isSelectWindow()) {
            this._selectPartyWindow2.deSelectWindow();
            if (this._selectPartyWindow3) {
                this._selectPartyWindow3.selectWindow();
            } else {
                this._selectPartyWindow1.selectWindow();
            }
        } else if (this._selectPartyWindow3.isSelectWindow()) {
            this._selectPartyWindow3.deSelectWindow();
            if (this._selectPartyWindow4) {
                this._selectPartyWindow4.selectWindow();
            } else {
                this._selectPartyWindow1.selectWindow();
            }
        } else if (this._selectPartyWindow4.isSelectWindow()) {
            this._selectPartyWindow4.deSelectWindow();
            this._selectPartyWindow1.selectWindow();
        }

        this._selectMemberStatusWindow.activate();
    };

    Scene_SplitParty.prototype.previousActor = function () {
        if (this._selectPartyWindow1.isSelectWindow()) {
            this._selectPartyWindow1.deSelectWindow();
            if (this._selectPartyWindow4) {
                this._selectPartyWindow4.selectWindow();
                this._selectPartyWindow4.refresh();
            } else if (this._selectPartyWindow3) {
                this._selectPartyWindow3.selectWindow();
                this._selectPartyWindow3.refresh();
            } else {
                this._selectPartyWindow2.selectWindow();
                this._selectPartyWindow2.refresh();
            }
        } else if (this._selectPartyWindow2.isSelectWindow()) {
            this._selectPartyWindow2.deSelectWindow();
            this._selectPartyWindow1.selectWindow();
            this._selectPartyWindow1.refresh();
        } else if (this._selectPartyWindow3.isSelectWindow()) {
            this._selectPartyWindow3.deSelectWindow();
            this._selectPartyWindow2.selectWindow();
            this._selectPartyWindow2.refresh();
        } else if (this._selectPartyWindow4.isSelectWindow()) {
            this._selectPartyWindow4.deSelectWindow();
            this._selectPartyWindow3.selectWindow();
            this._selectPartyWindow3.refresh();
        }

        this._selectMemberStatusWindow.activate();
    };

    Scene_SplitParty.prototype.createSetMemberEndCommandWindow = function () {
        const rect = this.setMemberCommandRect();
        this._setMemberEndCommandWindow = new Window_SetMemberEndCommand(rect);
        this._setMemberEndCommandWindow.setHandler("yes", this.onSetParty.bind(this));
        this._setMemberEndCommandWindow.setHandler("no", this.onSetEndCancel.bind(this));
        this._setMemberEndCommandWindow.setHandler("cancel", this.onSetEndCancel.bind(this));
        this.addWindow(this._setMemberEndCommandWindow);
    };

    Scene_SplitParty.prototype.onSetParty = function () {
        $gameSplitParty.select(1);
        this.setSelectParty();
        $splitParty.openMapPageButtons();
        this.popScene();
    };

    Scene_SplitParty.prototype.setSelectParty = function () {
        this.setParty(1, this._selectPartyWindow1);
        this.setParty(2, this._selectPartyWindow2);
        this.setParty(3, this._selectPartyWindow3);
        this.setParty(4, this._selectPartyWindow4);
    };

    Scene_SplitParty.prototype.setParty = function (id, selectPartyWindow) {
        if (selectPartyWindow) {
            $gameSplitParty.setParty(id, selectPartyWindow.data());
            this.setPartyPos(id);
            $gameSplitParty.createDumyPartyEvent(id);
            $gameSwitches.setValue($splitParty.cancelSwitchId(), false);
        }
    };

    Scene_SplitParty.prototype.setPartyPos = function (id) {
        switch (id) {
            case 1:
                $gameSplitParty.setPartyPos(id, { mapId: 0, x: -1, y: -1 });
                break;

            case 2:
                $gameSplitParty.setPartyPos(id, $splitParty.partyPos2());
                break;

            case 3:
                $gameSplitParty.setPartyPos(id, $splitParty.partyPos3());
                break;

            case 4:
                $gameSplitParty.setPartyPos(id, $splitParty.partyPos4());
                break;
        }
    };

    Scene_SplitParty.prototype.onSetEndCancel = function () {
        this._selectMemberStatusWindow.activate();
        this._selectMemberWindow.activate();
        this._setMemberEndCommandWindow.deactivate();
        this._setMemberEndCommandWindow.hide();
    };

    Scene_SplitParty.prototype.createSetMemberCancelCommandWindow = function () {
        const rect = this.setMemberCommandRect();
        this._setMemberCancelCommandWindow = new Window_SetMemberCancelCommand(rect);
        this._setMemberCancelCommandWindow.setHandler("yes", this.onSetCancel.bind(this));
        this._setMemberCancelCommandWindow.setHandler("no", this.onCancelSetCancel.bind(this));
        this._setMemberCancelCommandWindow.setHandler("cancel", this.onCancelSetCancel.bind(this));
        this.addWindow(this._setMemberCancelCommandWindow);
    };

    Scene_SplitParty.prototype.setMemberCommandRect = function () {
        const ww = Math.floor(Graphics.boxWidth / 2) + Math.floor(Graphics.boxWidth / 4);
        const wh = this.calcWindowHeight(4, true);
        const wx = Math.floor(Graphics.boxWidth / 2) - Math.floor(ww / 2);
        const wy = Math.floor(Graphics.boxHeight / 3);
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_SplitParty.prototype.onSetCancel = function () {
        $gameSwitches.setValue($splitParty.cancelSwitchId(), true);
        this.popScene();
    };

    Scene_SplitParty.prototype.onCancelSetCancel = function () {
        this._selectMemberStatusWindow.activate();
        this._selectMemberWindow.activate();
        this._setMemberCancelCommandWindow.deactivate();
        this._setMemberCancelCommandWindow.hide();
    };

    Scene_SplitParty.prototype.createBackground = function () {
        this.addChild(new Sprite());
    };

    Scene_SplitParty.prototype.needsPageButtons = function () {
        return true;
    };

    //-----------------------------------------------------------------------------
    // Window_SelectParty
    //-----------------------------------------------------------------------------
    function Window_SelectParty() {
        this.initialize.apply(this, arguments);
    }

    Window_SelectParty.prototype = Object.create(Window_Selectable.prototype);
    Window_SelectParty.prototype.constructor = Window_SelectParty;

    Window_SelectParty.prototype.initialize = function (rect) {
        Window_Selectable.prototype.initialize.call(this, rect);
        this._data = [];
        this._selectWindow = false;
    };

    Window_SelectParty.prototype.selectWindow = function () {
        this._selectWindow = true;
        if (this.isMaxMember()) {
            this.select(0);
        } else {
            if (this.index() !== 0) {
                this.select(this._data.length);
            }
        }
    };

    Window_SelectParty.prototype.deSelectWindow = function () {
        this._selectWindow = false;
        this.select(-1);
    };

    Window_SelectParty.prototype.isSelectWindow = function () {
        return this._selectWindow;
    };

    Window_SelectParty.prototype.addItem = function (item) {
        this._data.push(item);
        if (!this.isMaxMember()) {
            this.select(this.index() + 1);
        }
    };

    Window_SelectParty.prototype.removeItem = function (item) {
        const maxMember = this.isMaxMember();
        const newData = this._data.filter((data) => data.actorId() !== item.actorId());
        this._data = newData;
        if (!maxMember) {
            this.select(this.index() - 1);
        }
    };

    Window_SelectParty.prototype.isSetData = function () {
        return this._data.length > 0;
    };

    Window_SelectParty.prototype.isAddItem = function (item) {
        return this._data.some((data) => data.actorId() === item.actorId());
    };

    Window_SelectParty.prototype.isMaxMember = function () {
        return this._data.length === this.maxMember();
    };

    Window_SelectParty.prototype.drawItem = function (index) {
        const item = this.itemAt(index);
        if (item) {
            const rect = this.itemRectWithPadding(index);
            const actor = $dataActors[item.actorId()];
            const characterName = actor.characterName;
            const characterIndex = actor.characterIndex;
            const bottom = rect.y + rect.height;
            this.drawCharacter(characterName, characterIndex, rect.x + rect.width / 2, bottom - 4);
        }
    };

    Window_SelectParty.prototype.maxItems = function () {
        return this._data ? this._data.length : 1;
    };

    Window_SelectParty.prototype.data = function () {
        return this._data;
    };

    Window_SelectParty.prototype.item = function () {
        return this.itemAt(this.index());
    };

    Window_SelectParty.prototype.itemAt = function (index) {
        return this._data && index >= 0 ? this._data[index] : null;
    };

    Window_SelectParty.prototype.itemHeight = function () {
        return Math.floor(this.innerHeight / 2);
    };

    Window_SelectParty.prototype.maxMember = function () {
        return 4;
    };

    Window_SelectParty.prototype.maxCols = function () {
        return 2;
    };

    Window_SelectParty.prototype.colSpacing = function () {
        return 16;
    };

    Window_SelectParty.prototype.refresh = function () {
        Window_Selectable.prototype.refresh.call(this);
    };

    //-----------------------------------------------------------------------------
    // Window_SelectMemberStatus
    //-----------------------------------------------------------------------------
    function Window_SelectMemberStatus() {
        this.initialize.apply(this, arguments);
    }

    Window_SelectMemberStatus.prototype = Object.create(Window_StatusBase.prototype);
    Window_SelectMemberStatus.prototype.constructor = Window_SelectMemberStatus;

    Window_SelectMemberStatus.prototype.initialize = function (rect) {
        Window_StatusBase.prototype.initialize.call(this, rect);
        this._actor = null;
        this.activate();
    };

    Window_SelectMemberStatus.prototype.loadFaceImages = function () {
        for (const actor of $splitParty.memberList()) {
            ImageManager.loadFace(actor.faceName());
        }
    };

    Window_SelectMemberStatus.prototype.setActor = function (actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            this.refresh();
        }
    };

    Window_SelectMemberStatus.prototype.refresh = function () {
        Window_StatusBase.prototype.refresh.call(this);
        if (this._actor) {
            this.drawBlock1();
            this.drawBlock2();
        }
    };

    Window_SelectMemberStatus.prototype.drawBlock1 = function () {
        const y = this.block1Y();
        this.drawActorName(this._actor, 6, y, 168);
        this.drawActorClass(this._actor, 192, y, 168);
    };

    Window_SelectMemberStatus.prototype.block1Y = function () {
        return 0;
    };

    Window_SelectMemberStatus.prototype.drawBlock2 = function () {
        const y = this.block2Y();
        const width = Math.floor(ImageManager.faceWidth * 0.8);
        const height = Math.floor(ImageManager.faceHeight * 0.8);
        this.drawActorFace(this._actor, 12, y, width, height);
        this.drawBasicInfo(204, y);
    };

    Window_SelectMemberStatus.prototype.block2Y = function () {
        return this.lineHeight();
    };

    Window_SelectMemberStatus.prototype.drawBasicInfo = function (x, y) {
        const lineHeight = this.lineHeight();
        this.drawActorLevel(this._actor, x, y + lineHeight * 0);
        this.placeBasicGauges(this._actor, x, y + lineHeight * 1);
    };

    //-----------------------------------------------------------------------------
    // Window_SelectMember
    //-----------------------------------------------------------------------------
    function Window_SelectMember() {
        this.initialize.apply(this, arguments);
    }

    Window_SelectMember.prototype = Object.create(Window_Selectable.prototype);
    Window_SelectMember.prototype.constructor = Window_SelectMember;

    Window_SelectMember.prototype.initialize = function (rect) {
        Window_Selectable.prototype.initialize.call(this, rect);
        this._data = [];
        this._setActorList = [];
        this.refresh();
    };

    Window_SelectMember.prototype.setStatusWindow = function (selectMemberStatusWindow) {
        this._selectMemberStatusWindow = selectMemberStatusWindow;
    };

    Window_SelectMember.prototype.addActor = function (actor) {
        this._setActorList.push(actor);
    };

    Window_SelectMember.prototype.removeActor = function (actor) {
        this._setActorList = this._setActorList.filter((setActor) => setActor.actorId() !== actor.actorId());
    };

    Window_SelectMember.prototype.makeItemList = function () {
        this._data = $splitParty.memberList();
    };

    Window_SelectMember.prototype.drawItem = function (index) {
        const item = this.itemAt(index);
        if (item) {
            const rect = this.itemRectWithPadding(index);
            this.changePaintOpacity(!this.isSetActor(item));
            const actor = $dataActors[item.actorId()];
            const characterName = actor.characterName;
            const characterIndex = actor.characterIndex;
            const bottom = rect.y + rect.height;
            this.drawCharacter(characterName, characterIndex, rect.x + rect.width / 2, bottom - 8);
            this.changePaintOpacity(1);
        }
    };

    Window_SelectMember.prototype.isSetActor = function (item) {
        return this._setActorList.some((actor) => actor.actorId() === item.actorId());
    };

    Window_SelectMember.prototype.select = function (index) {
        Window_Selectable.prototype.select.call(this, index);
        if (this._selectMemberStatusWindow) {
            this._selectMemberStatusWindow.setActor(this.item());
        }
    };

    Window_SelectMember.prototype.maxItems = function () {
        return this._data ? this._data.length : 1;
    };

    Window_SelectMember.prototype.item = function () {
        return this.itemAt(this.index());
    };

    Window_SelectMember.prototype.itemAt = function (index) {
        return this._data && index >= 0 ? this._data[index] : null;
    };

    Window_SelectMember.prototype.itemHeight = function () {
        return Math.floor(this.innerHeight / 3);
    };

    Window_SelectMember.prototype.maxCols = function () {
        return 11;
    };

    Window_SelectMember.prototype.colSpacing = function () {
        return 16;
    };

    Window_SelectMember.prototype.refresh = function () {
        this.makeItemList();
        Window_Selectable.prototype.refresh.call(this);
    };

    //-----------------------------------------------------------------------------
    // Window_SetMemberEndCommand
    //-----------------------------------------------------------------------------
    function Window_SetMemberEndCommand() {
        this.initialize.apply(this, arguments);
    }

    Window_SetMemberEndCommand.prototype = Object.create(Window_Command.prototype);
    Window_SetMemberEndCommand.prototype.constructor = Window_SetMemberEndCommand;

    Window_SetMemberEndCommand.prototype.initialize = function (rect) {
        Window_Command.prototype.initialize.call(this, rect);
        this._message = "";
    };

    Window_SetMemberEndCommand.prototype.refresh = function () {
        Window_Command.prototype.refresh.call(this);
        this.drawMessage();
    };

    Window_SetMemberEndCommand.prototype.makeCommandList = function () {
        this.addCommand("はい", "yes");
        this.addCommand("いいえ", "no");
    };

    Window_SetMemberEndCommand.prototype.itemRect = function (index) {
        const rect = Window_Command.prototype.itemRect.call(this, index);
        rect.y += 70;
        return rect;
    };

    Window_SetMemberEndCommand.prototype.maxCols = function () {
        return 1;
    };

    Window_SetMemberEndCommand.prototype.drawMessage = function () {
        this.drawText("メンバー編成を完了しますか？", 0, 0, this.innerWidth, "center");
    };

    //-----------------------------------------------------------------------------
    // Window_SetMemberCancelCommand
    //-----------------------------------------------------------------------------
    function Window_SetMemberCancelCommand() {
        this.initialize.apply(this, arguments);
    }

    Window_SetMemberCancelCommand.prototype = Object.create(Window_Command.prototype);
    Window_SetMemberCancelCommand.prototype.constructor = Window_SetMemberCancelCommand;

    Window_SetMemberCancelCommand.prototype.initialize = function (rect) {
        Window_Command.prototype.initialize.call(this, rect);
        this._message = "";
    };

    Window_SetMemberCancelCommand.prototype.refresh = function () {
        Window_Command.prototype.refresh.call(this);
        this.drawMessage();
    };

    Window_SetMemberCancelCommand.prototype.makeCommandList = function () {
        this.addCommand("はい", "yes");
        this.addCommand("いいえ", "no");
    };

    Window_SetMemberCancelCommand.prototype.itemRect = function (index) {
        const rect = Window_Command.prototype.itemRect.call(this, index);
        rect.y += 70;
        return rect;
    };

    Window_SetMemberCancelCommand.prototype.maxCols = function () {
        return 1;
    };

    Window_SetMemberCancelCommand.prototype.drawMessage = function () {
        this.drawText("メンバー編成が完了していません。編集をキャンセルしますか？", 0, 0, this.innerWidth, "center");
    };

    //-----------------------------------------------------------------------------
    // Scene_Boot
    //-----------------------------------------------------------------------------
    const _Scene_Boot_Create = Scene_Boot.prototype.create;
    Scene_Boot.prototype.create = function () {
        _Scene_Boot_Create.apply(this, arguments);
        $splitParty = new SplitParty();
    };

    const _DataManager_CreateGameObjects = DataManager.createGameObjects;
    DataManager.createGameObjects = function () {
        _DataManager_CreateGameObjects.apply(this, arguments);
        $gameSplitParty = new Game_SplitParty();
    };

    const _DataManager_MakeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function () {
        const contents = _DataManager_MakeSaveContents.apply(this, arguments);
        contents.gameSplitParty = $gameSplitParty;
        return contents;
    };

    const _DataManager_ExtractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function (contents) {
        _DataManager_ExtractSaveContents.apply(this, arguments);
        $gameSplitParty = contents.gameSplitParty;
    };

    const _Scene_Map_OnTransferEnd = Scene_Map.prototype.onTransferEnd;
    Scene_Map.prototype.onTransferEnd = function () {
        _Scene_Map_OnTransferEnd.apply(this, arguments);
        if ($gameSplitParty.isSplitParty() && $gameSplitParty.isChange()) {
            $gameSplitParty.setGameParty();
        }
    };

    const _Scene_Map_IsAnyButtonPressed = Scene_Map.prototype.isAnyButtonPressed;
    Scene_Map.prototype.isAnyButtonPressed = function () {
        return _Scene_Map_IsAnyButtonPressed.apply(this, arguments) || (this._pageupButton && this._pageupButton.isPressed()) || (this._pagedownButton && this._pagedownButton.isPressed());
    };

    const _Scene_Map_CreateButtons = Scene_Map.prototype.createButtons;
    Scene_Map.prototype.createButtons = function () {
        _Scene_Map_CreateButtons.apply(this, arguments);

        if (ConfigManager.touchUI) {
            if ($gameSplitParty.needsMapPageButtons() && $splitParty.setupMapId() !== $gameMap.mapId()) {
                this.createPageButtons();
            }
        }
    };

    const _Game_Map_RefreshTileEvents = Game_Map.prototype.refreshTileEvents;
    Game_Map.prototype.refreshTileEvents = function () {
        if ($gameSplitParty.isSplitParty() && $splitParty.setupMapId() !== this._mapId) {
            let id = 0;

            $dataMap.events.forEach((event) => {
                if (event) {
                    id = event.id;
                }
            });

            $gameSplitParty.setEventId(id);
            this.addDumyEvent();
        }
        _Game_Map_RefreshTileEvents.apply(this, arguments);
    };

    Game_Map.prototype.addDumyEvent = function () {
        const dumyPartyEvents = $gameSplitParty.dumyPartyEvents();
        for (const id in dumyPartyEvents) {
            const dumyPartyEvent = dumyPartyEvents[id];
            this._events[dumyPartyEvent.id] = new Game_Event(this._mapId, dumyPartyEvent.id);
            if ($gameSplitParty.partyMapId(id) !== this._mapId) {
                this.event(dumyPartyEvent.id).locate(-1, -1);
            }
        }
    };

    const _Game_Event_Event = Game_Event.prototype.event;
    Game_Event.prototype.event = function () {
        if ($gameSplitParty.isSplitParty() && $gameSplitParty.baseDumyId() > 0 && this._eventId > $gameSplitParty.baseDumyId()) {
            const id = this._eventId - $gameSplitParty.baseDumyId();
            const dumyEvent = $gameSplitParty.dumyPartyEvents()[id];

            if ($gameSplitParty.isSelectPartyId(id)) {
                dumyEvent.x = -1;
                dumyEvent.y = -1;
            }
            return dumyEvent;
        } else {
            return _Game_Event_Event.apply(this, arguments);
        }
    };

    const _Game_Player_ReserveTransfer = Game_Player.prototype.reserveTransfer;
    Game_Player.prototype.reserveTransfer = function (mapId, x, y, d, fadeType) {
        _Game_Player_ReserveTransfer.apply(this, arguments);
        if ($gameSplitParty.isSplitParty()) {
            $gameSplitParty.setDefaultMapId(mapId);
        }
    };

    const _Game_Player_IncreaseSteps = Game_Player.prototype.increaseSteps;
    Game_Player.prototype.increaseSteps = function () {
        _Game_Player_IncreaseSteps.apply(this, arguments);
        if ($gameSplitParty.isSplitParty() && this.isNormal()) {
            $splitParty.checkPos();
        }
    };

    const _Scene_Map_Start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function () {
        _Scene_Map_Start.apply(this, arguments);
        this.previousPartyCalling = false;
        this.nextPartyCalling = false;
    };

    const _Scene_Map_UpdateScene = Scene_Map.prototype.updateScene;
    Scene_Map.prototype.updateScene = function () {
        _Scene_Map_UpdateScene.apply(this, arguments);
        if (!SceneManager.isSceneChanging()) {
            this.updateCallChangeParty();
        }
    };

    const _Scene_Map_IsReady = Scene_Map.prototype.isReady;
    Scene_Map.prototype.isReady = function () {
        if (DataManager.isMapLoaded() && $gameSplitParty.baseDumyId() > 0) {
            let id = 0;

            $dataMap.events.forEach((event) => {
                if (event) {
                    id = event.id;
                }
            });

            if ($gameSplitParty.baseDumyId() !== id) {
                $gameSplitParty.setEventId(id);
            }
        }
        return _Scene_Map_IsReady.apply(this, arguments);
    };

    Scene_Map.prototype.isChangePartyEnabled = function () {
        return $gameSplitParty.isSplitParty() && $gameSplitParty.baseDumyId() > 0 && !$gameMap.isEventRunning();
    };

    Scene_Map.prototype.createPageButtons = function () {
        this._pageupButton = new Sprite_Button("pageup");
        this._pageupButton.x = 4;
        this._pageupButton.y = this.buttonY();
        const pageupRight = this._pageupButton.x + this._pageupButton.width;
        this._pagedownButton = new Sprite_Button("pagedown");
        this._pagedownButton.x = pageupRight + 4;
        this._pagedownButton.y = this.buttonY();
        this.addWindow(this._pageupButton);
        this.addWindow(this._pagedownButton);

        this._pageupButton.setClickHandler(this.previousActor.bind(this));
        this._pagedownButton.setClickHandler(this.nextActor.bind(this));
    };

    Scene_Map.prototype.previousActor = function () {
        $gameSplitParty.previousParty();
    };

    Scene_Map.prototype.nextActor = function () {
        $gameSplitParty.nextParty();
    };

    Scene_Map.prototype.updateCallChangeParty = function () {
        if (this.isChangePartyEnabled()) {
            if (this.isPreviousPartyCalled()) {
                this.previousPartyCalling = true;
            }
            if (this.isNextPartyCalled()) {
                this.nextPartyCalling = true;
            }
            if (this.previousPartyCalling && !$gamePlayer.isMoving()) {
                this.callPreviousParty();
            }
            if (this.nextPartyCalling && !$gamePlayer.isMoving()) {
                this.callNextParty();
            }
        } else {
            this.previousPartyCalling = false;
            this.nextPartyCalling = false;
        }
    };

    Scene_Map.prototype.isPreviousPartyCalled = function () {
        return Input.isTriggered("pageup");
    };

    Scene_Map.prototype.isNextPartyCalled = function () {
        return Input.isTriggered("pagedown");
    };

    Scene_Map.prototype.callPreviousParty = function () {
        this.previousActor();
    };

    Scene_Map.prototype.callNextParty = function () {
        this.nextActor();
    };
})();
