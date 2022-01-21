//=============================================================================
// RPG Maker MZ - FacePicture
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc 顔画像をピクチャとして表示します。
 * @author Basu
 * @url https://raw.githubusercontent.com/basuka/RPGMZ/main/FacePicture/FacePicture.js
 *
 * @help FacePicture.js
 *
 * このプラグインは、顔画像をピクチャとして表示するコマンドを提供します。
 *
 *
 * ■各設定項目
 *
 *  【ファイル】
 *   ピクチャとして表示する顔画像ファイルを設定します。
 *
 *  【顔画像番号】
 *   何番目の顔画像を表示するかを設定します。
 *
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加してください
 *
 * 2.プラグインコマンド「顔画像ピクチャの設定」から表示する顔画像を設定してください。
 *
 * 3.画像を設定しないまま「ピクチャの表示」イベントを設定してください。
 *
 * ※使用方法は付属プラグイン「テキストピクチャの設定(TextPicture)」と同じです。
 *=====================================================================================================================================================
 *
 * @command set
 * @text 顔画像ピクチャの設定
 * @desc ピクチャとして表示する顔画像を設定します。
 *
 * @arg fileName
 * @type file
 * @dir img/faces/
 * @text ファイル
 * @desc ピクチャとして表示する顔画像ファイルを設定します。
 *
 * @arg faceIndex
 * @type number
 * @text 顔画像番号
 * @desc 何番目の顔画像を表示するかを設定します。
 */

(() => {
    const pluginName = "FacePicture";
    let faceFileName = "";
    let faceIndex = 0;

    PluginManager.registerCommand(pluginName, "set", args => {
        setFaceFileName = String(args.fileName);
        faceIndex = Number(args.faceIndex)
    });

    const _Game_Picture_show = Game_Picture.prototype.show;
    Game_Picture.prototype.show = function() {
        _Game_Picture_show.apply(this, arguments);
        if (this._name === "" && setFaceFileName) {
            this.faceFileName = setFaceFileName;
            this.faceChanged = true;
            faceFileName = "";
        }
    };

    const _Sprite_Picture_destroy = Sprite_Picture.prototype.destroy;
    Sprite_Picture.prototype.destroy = function() {
        destroyFacePictureBitmap(this.bitmap);
        _Sprite_Picture_destroy.apply(this, arguments);
    };

    const _Sprite_Picture_updateBitmap = Sprite_Picture.prototype.updateBitmap;
    Sprite_Picture.prototype.updateBitmap = function() {
        _Sprite_Picture_updateBitmap.apply(this, arguments);
        if (this.visible && this._pictureName === "") {
            const picture = this.picture();
            const faceFileName = picture ? picture.faceFileName || "" : "";
            const faceChanged = picture && picture.faceChanged;
            if (this.faceFileName !== faceFileName || faceChanged) {
                this.faceFileName = faceFileName;
                destroyFacePictureBitmap(this.bitmap);
                this.bitmap = createFacePictureBitmap(faceFileName);
                picture.faceChanged = false;
            }
        } else {
            this.faceFileName = "";
        }
    };

    function createFacePictureBitmap(faceFileName) {
        const faceBitmap = ImageManager.loadFace(faceFileName);
        const tempWindow = new Window_Base(new Rectangle());
        tempWindow.padding = 0;
        tempWindow.move(0, 0, ImageManager.faceWidth, ImageManager.faceHeight);
        tempWindow.createContents();
        const bitmap = tempWindow.contents;
        bitmap._loadingState = "loading";
        faceBitmap.addLoadListener( () => tempWindow.drawFace(faceFileName, faceIndex, 0, 0, ImageManager.faceWidth, ImageManager.faceHeight),
                                          bitmap._loadingState = "loaded",
                                          bitmap._callLoadListeners())
        return bitmap;
    }

    function destroyFacePictureBitmap(bitmap) {
        if (bitmap && bitmap.isFacePicture) {
            bitmap.destroy();
        }
    }
})();
