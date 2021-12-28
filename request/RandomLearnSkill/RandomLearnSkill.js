//=============================================================================
// RPG Maker MZ - RandomLearnSkill
//=============================================================================

/*:ja
 * @target MZ
 * @plugindesc 対象の習得スキルの中からランダムで1つだけスキルを習得します。
 * @author Basu
 *
 * @help RandomLearnSkill.js
 *
 * このプラグインは、レベルアップ時にデータベースにある職業で設定した対象の習得スキルの中からランダムで1つだけ習得する機能を提供します。
 *
 *
 * プラグインコマンドはありません。
 */

(() => {

  //-----------------------------------------------------------------------------
  // Game_Actor.prototype.levelUp関数の再定義
  //------------------------------------------------------------------------------------
  Game_Actor.prototype.levelUp = function() {
    this._level++;

    // 取得対象スキル一覧
    const learnSkills = [];

    for (const learning of this.currentClass().learnings) {
        if (learning.level === this._level && !this.isLearnedSkill(learning.skillId)) {
            // 取得レベル且つ対象のスキルが未習得の場合、取得対象スキル一覧に習得スキル情報を追加
            learnSkills.push(learning);
        }
    }

    if (learnSkills.length) {
      // 取得対象スキル一覧の中からランダムで１つスキル情報を取得
      const learnSkill = learnSkills[Math.floor( Math.random() * learnSkills.length )];

      // 取得したスキルを習得
      this.learnSkill(learnSkill.skillId);
    }
  };

})();
