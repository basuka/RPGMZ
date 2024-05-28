テキストカラーを追加します。</br>
追加する色はRGBとカラーコードで設定することができます。</br>

【テキストカラー追加】</br>
https://raw.githubusercontent.com/basuka/RPGMZ/main/AddTextColor/AddTextColor.js</br>

</br>

<B>設定内容</B></br>

| 項目 | 内容 |
| :--- | :--- |
|コード|追加カラーのコードを設定します。</br>デフォルト(\C[n]メッセージ)ではCの値になります。</br>コードは既に使用している他のコード(Cなど)と重複しないようにしてください。|
|RGBカラー情報|追加するカラー情報をRGBで設定します。</br>※別項目「RGBカラー情報」を参照|
|カラーコード情報|追加するカラー情報をカラーコードで設定します。</br>※別項目「カラーコード情報」を参照|
|||
|<B>RGBカラー情報</B>||
|ID|追加カラーのIDを設定します。<br>デフォルト(\C[n]メッセージ)では[n]の値になります。</br>IDはカラーコード情報と共有されます。(カラーコード情報のIDと重複不可)|
|RGB(赤)|RGB(赤)の値を設定します。|
|RGB(緑)|RGB(緑)の値を設定します。|
|RGB(青)|RGB(青)の値を設定します。|
|備考|プラグイン上では使用されない項目です。|
|||
|<B>カラーコード情報</B>||
|ID|追加カラーのIDを設定します。<br>デフォルト(\C[n]メッセージ)では[n]の値になります。<br>IDはRGBカラー情報と共有されます。(RGBカラー情報のIDと重複不可)|
|カラーコード|カラーコードの値を設定します。|
|備考|プラグイン上では使用されない項目です。|
|||
|使用不可コード|・C</br>・I</br>・PX</br>・PY</br>・FS</br>・{</br>・}</br>・その他プラグインで使用しているコード</br>(Window_Base.prototype.processEscapeCharacter)|

</br>

![Image](/AddTextColor/image/image1.png)</br>

</br>

![Image](/AddTextColor/image/image2.png)　![Image](/AddTextColor/image/image3.png)</br>
※IDは「RGBカラー情報」と「カラーコード情報」で共有となるため重複できません。

</br>

![Image](/AddTextColor/image/image6.png)　![Image](/AddTextColor/image/image5.png)</br>

</br>

![Image](/AddTextColor/image/image4.png)</br>
※追加した色はゲーム上で有効となります。</br>
　ツクール上(プレビューなど)では有効にはなりません。
