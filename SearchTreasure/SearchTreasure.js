//=============================================================================
// RPG Maker MZ - SearchTreasure
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc 宝箱探索スキルを設定します。
 * @author Basu
 * @url https://raw.githubusercontent.com/basuka/RPGMZ/main/SearchTreasure/SearchTreasure.js
 *
 *
 * @help
 * 現在のマップに残っている宝の数を知らせる探索スキル及び、宝の位置を知らせる調査スキルを実装します。
 *
 * 【パラメータ】
 *
 * ■探索スキル
 * 探索スキルを設定します。
 * 現在のマップに残っている宝の数を知らせます。
 *
 * ■調査スキル
 * 調査スキルを設定します。
 * 残っている宝の位置を知らせます。
 *
 * ■残りアイテムメッセージ
 * 探索スキル使用時に残りの宝が存在する場合のメッセージを設定します。
 *
 * ■残りアイテム無しメッセージ
 * 探索スキル使用時に残りの宝が存在しない場合のメッセージを設定します。
 *
 * ■調査SE
 * 調査スキルのアニメーションに設定するSEを設定します。
 *
 * ■SE音量
 * 調査SEの音量を設定します。
 *
 * ■SEピッチ(%)
 * 調査SEのピッチを設定します。
 *
 * ■SE位相
 * 調査SEの位相を設定します。
 *
 *
 * 【宝イベント・コマンド】
 * 宝イベントに設定するプラグインコマンドです。
 * このプラグインコマンドが設定されいるイベントが探索スキル・調査スキルの対象となります。
 * 対象のイベントページ内ならどこでも設定は可能です。(設定する位置は決まっていません)
 *
 *
 *-----------------------------------------------------------------------------
 * README
 *-----------------------------------------------------------------------------
 * https://github.com/basuka/RPGMZ/blob/main/SearchTreasure/README.md
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
 * 2024/8/10 Ver.1.0.0　公開
 *
 *
 *=====================================================================================================================================================
 * @param searchSkillId
 * @text 探索スキル
 * @type skill
 * @desc 探索スキルの設定
 *       現在のマップに残っている宝の数を知らせます
 *
 * @param investigationSkillId
 * @text 調査スキル
 * @type skill
 * @desc 調査スキルの設定
 *       残っている宝の位置を知らせます
 *
 * @param restItemMsg
 * @text 残りアイテムメッセージ
 * @type string
 * @default このエリアにはあと%1個のお宝がありそうだ。
 * @desc 探索スキルメッセージの設定
 *       %1：宝箱の残り数
 *
 * @param notRestItemMsg
 * @text 残りアイテム無しメッセージ
 * @type string
 * @default このエリアにはお宝はなさそうだ。
 * @desc 探索スキルメッセージの設定(残り無し)
 *
 * @param se
 * @text 調査SE
 * @type file
 * @dir audio/se/
 * @default Saint5
 * @desc 調査スキルのSEを設定
 *
 * @param volume
 * @text SE音量
 * @type number
 * @min 0
 * @max 100
 * @default 90
 * @desc 調査SEの音量を設定
 *
 * @param pitch
 * @text SEピッチ(%)
 * @type number
 * @min 50
 * @max 150
 * @default 150
 * @desc 調査SEのピッチ(%)を設定
 *
 * @param pan
 * @text SE位相
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @desc 調査SEの位相を設定
 *
 * @command treasure
 * @text 宝イベント
 * @desc 宝イベントの設定
 *
 */

(() => {
    "use strict";

    let $searchTreasure = null;

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
    // SearchTreasure
    //-----------------------------------------------------------------------------
    function SearchTreasure() {
        this.initialize(...arguments);
    }

    SearchTreasure.PLUGIN_CODE = 357;
    SearchTreasure.KEY_TREASURE = "treasure";

    SearchTreasure.prototype.initialize = function () {
        this._searchSkillId = params.searchSkillId;
        this._investigationSkillId = params.investigationSkillId;
        this._restItemMsg = params.restItemMsg;
        this._notRestItemMsg = params.notRestItemMsg;
        this._se = params.se;
        this._volume = params.volume;
        this._pitch = params.pitch;
        this._pan = params.pan;
        this._searchCount = 0;
        this._eventId = 0;
        this._addEventLists = [];
        this._eventList = [];

        this._animationEvent = {
            id: this._eventId,
            name: "_animationEvent",
            note: "",
            pages: [
                {
                    conditions: { actorId: 1, actorValid: false, itemId: 1, itemValid: false, selfSwitchCh: "A", selfSwitchValid: true, switch1Id: 1, switch1Valid: false, switch2Id: 1, switch2Valid: false, variableId: 1, variableValid: false, variableValue: 0 },
                    directionFix: false,
                    image: { tileId: 0, characterName: "", direction: 2, pattern: 1, characterIndex: 4 },
                    list: this._eventList,
                    moveFrequency: 3,
                    moveRoute: {
                        list: [{ code: 0, parameters: [] }],
                        repeat: true,
                        skippable: false,
                        wait: false,
                    },
                    moveSpeed: 3,
                    moveType: 0,
                    priorityType: 1,
                    stepAnime: false,
                    through: false,
                    trigger: 3,
                    walkAnime: true,
                },
            ],
            x: -1,
            y: -1,
            meta: {},
        };
    };

    SearchTreasure.prototype.animationEvent = function () {
        return this._animationEvent;
    };

    SearchTreasure.prototype.setEventId = function (eventId) {
        this._eventId = eventId;
    };

    SearchTreasure.prototype.eventId = function () {
        return this._eventId;
    };

    SearchTreasure.prototype.addEvent = function (event) {
        this._addEventLists.push({
            x: event.x,
            y: event.y,
            list: [
                { code: 203, indent: 0, parameters: [0, 0, event.x, event.y, 0] },
                {
                    code: 205,
                    indent: 0,
                    parameters: [
                        0,
                        {
                            list: [{ code: 16, indent: null }, { code: 41, parameters: ["!Flame", 7], indent: null }, { code: 29, parameters: [6], indent: null }, { code: 30, parameters: [5], indent: null }, { code: 33, indent: null }, { code: 44, parameters: [{ name: this._se, volume: this._volume, pitch: this._pitch, pan: this._pan }], indent: null }, { code: 15, parameters: [30], indent: null }, { code: 41, parameters: ["", 0], indent: null }, { code: 0 }],
                            repeat: false,
                            skippable: false,
                            wait: true,
                        },
                    ],
                },
                { code: 505, indent: 0, parameters: [{ code: 16, indent: null }] },
                { code: 505, indent: 0, parameters: [{ code: 41, parameters: ["!Flame", 7], indent: null }] },
                { code: 505, indent: 0, parameters: [{ code: 29, parameters: [6], indent: null }] },
                { code: 505, indent: 0, parameters: [{ code: 30, parameters: [5], indent: null }] },
                { code: 505, indent: 0, parameters: [{ code: 33, indent: null }] },
                { code: 505, indent: 0, parameters: [{ code: 44, parameters: [{ name: this._se, volume: this._volume, pitch: this._pitch, pan: this._pan }], indent: null }] },
                { code: 505, indent: 0, parameters: [{ code: 15, parameters: [30], indent: null }] },
                { code: 505, indent: 0, parameters: [{ code: 41, parameters: ["", 0], indent: null }] },
            ],
        });
    };

    SearchTreasure.prototype.clearEvent = function () {
        this._addEventLists = [];
        this._eventList.splice(0);
    };

    SearchTreasure.prototype.setEvent = function () {
        this._addEventLists.sort((event1, event2) => {
            if (event1.y < event2.y) return -1;
            if (event1.y > event2.y) return 1;
            if (event1.x < event2.x) return -1;
            if (event1.x > event2.x) return 1;
            return 0;
        });

        this._eventList.push({ code: 230, indent: 0, parameters: [30] });

        this._addEventLists.forEach((addEvent) => {
            addEvent.list.forEach((eventCode) => {
                this._eventList.push(eventCode);
            });
        });

        this._eventList.push({ code: 123, indent: 0, parameters: ["A", 1] });
        this._eventList.push({ code: 203, indent: 0, parameters: [0, 0, -1, -1, 0] });
        this._eventList.push({ code: 0, indent: 0, parameters: [] });
    };

    SearchTreasure.prototype.startEvent = function () {
        this.setEvent();

        const switcheKey = [$gameMap.mapId(), this._eventId, "A"];
        $gameSelfSwitches.setValue(switcheKey, true);
    };

    SearchTreasure.prototype.isSearchSkill = function (item) {
        return DataManager.isSkill(item) && item.id === this._searchSkillId;
    };

    SearchTreasure.prototype.isInvestigationSkill = function (item) {
        return DataManager.isSkill(item) && item.id === this._investigationSkillId;
    };

    SearchTreasure.prototype.isViewScreen = function (event) {
        return event.x >= $gameMap.displayX() && event.x < $gameMap.displayX() + $gameMap.screenTileX() && event.y >= $gameMap.displayY() && event.y < $gameMap.displayY() + $gameMap.screenTileY();
    };

    SearchTreasure.prototype.isPluginCode = function (eventCode) {
        return eventCode.code === SearchTreasure.PLUGIN_CODE;
    };

    SearchTreasure.prototype.isSearchParam = function (eventCode) {
        return eventCode.parameters.includes(Plugin_Name) && eventCode.parameters.includes(SearchTreasure.KEY_TREASURE);
    };

    SearchTreasure.prototype.useSearchSkill = function () {
        this._searchCount = 0;
        $gameMap.events().forEach((event) => {
            if (event.page() && event.eventId() !== this._eventId) {
                event.list().forEach((eventCode) => {
                    if (this.isPluginCode(eventCode) && this.isSearchParam(eventCode)) {
                        this._searchCount++;
                    }
                });
            }
        });

        if (this._searchCount < 1) {
            $gameMessage.add(this._notRestItemMsg);
        } else {
            $gameMessage.add(this._restItemMsg.format(this._searchCount));
        }
        SceneManager.goto(Scene_Map);
    };

    SearchTreasure.prototype.useInvestigationSkill = function () {
        $searchTreasure.clearEvent();
        $gameMap.events().forEach((event) => {
            if (event.page() && $searchTreasure.isViewScreen(event) && event.eventId() !== this._eventId) {
                event.list().forEach((eventCode) => {
                    if (this.isPluginCode(eventCode) && this.isSearchParam(eventCode)) {
                        $searchTreasure.addEvent(event);
                    }
                });
            }
        });

        $searchTreasure.startEvent();
        SceneManager.goto(Scene_Map);
    };

    //-----------------------------------------------------------------------------
    // Scene_Boot
    //-----------------------------------------------------------------------------
    const _Scene_Boot_Create = Scene_Boot.prototype.create;
    Scene_Boot.prototype.create = function () {
        _Scene_Boot_Create.apply(this, arguments);
        $searchTreasure = new SearchTreasure();
    };

    //-----------------------------------------------------------------------------
    // Game_Battler
    //-----------------------------------------------------------------------------
    const _Game_Battler_UseItem = Game_Battler.prototype.useItem;
    Game_Battler.prototype.useItem = function (item) {
        _Game_Battler_UseItem.apply(this, arguments);
        if (!$gameParty.inBattle() && $searchTreasure.isSearchSkill(item)) {
            $searchTreasure.useSearchSkill();
        }

        if (!$gameParty.inBattle() && $searchTreasure.isInvestigationSkill(item)) {
            $searchTreasure.useInvestigationSkill();
        }
    };

    //-----------------------------------------------------------------------------
    // Game_Map
    //-----------------------------------------------------------------------------
    const _Game_Map_SetupEvents = Game_Map.prototype.setupEvents;
    Game_Map.prototype.setupEvents = function () {
        _Game_Map_SetupEvents.apply(this, arguments);

        $searchTreasure.setEventId(this._events.length + 1);
        this._events[$searchTreasure.eventId()] = new Game_Event(this._mapId, $searchTreasure.eventId());
    };

    //-----------------------------------------------------------------------------
    // Game_Event
    //-----------------------------------------------------------------------------
    const _Game_Event_Event = Game_Event.prototype.event;
    Game_Event.prototype.event = function () {
        if (this._eventId === $searchTreasure.eventId()) {
            return $searchTreasure.animationEvent();
        } else {
            return _Game_Event_Event.apply(this, arguments);
        }
    };
})();
