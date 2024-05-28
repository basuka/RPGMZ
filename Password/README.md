パスワード機能を実装します。</br>
合言葉やキー解除といったパスワード機能を実装することができます。</br>

【パスワード】</br>
https://raw.githubusercontent.com/basuka/RPGMZ/main/Password/Password.js</br>

</br>

<B>設定内容</B></br>

| 項目 | 内容 |
| :--- | :--- |
|ランダムパスワード|ランダムパスワード情報(数値)を設定します。</br>※別項目「ランダムパスワード情報」を参照|
|パスワード判定|入力したパスワードの判定結果を保存する変数を設定します。|
|||
|<B>ランダムパスワード情報</B>|ランダムパスワードの情報を設定します|
|桁数|ランダムに生成するパスワード(数値)の桁数を設定します。<br>ランダムパスワードはニューゲーム選択時に生成されます。|
|パスワード保存変数|生成したパスワード(数値)を保存する変数を設定します。|
|||
|<B>コマンドパラメータ[パスワード入力]</B>||
|入力数|パスワードの入力数を設定します。</br>パスワードの文字数：入力数をパスワードの文字数に合わせる</br>最大入力数：入力数を最大入力数に合わせる|
|タイプ|パスワードのタイプを設定します。</br>数値入力：パスワードを数値で設定します。</br>数値入力(ランダム)：パスワードをランダム生成した数値で設定します。</br>文字入力：パスワードを文字で設定します。|
|数値パスワード|パスワードを数値(最大8桁)で設定します。</br>パスワードのタイプを「数値入力」にした場合に設定する項目|
|ランダムパスワード|使用するランダムパスワードの変数を設定します。</br>パスワードのタイプを「数値入力(ランダム)」にした場合に設定する項目|
|文字パスワード|パスワードを文字(最大16文字)で設定します。</br>パスワードのタイプを「文字入力」にした場合に設定する項目|
|||
|<B>コマンドパラメータ[ランダムパスワード確認]</B>|ランダムに生成されたパスワードの取得を行います。|
|ランダムパスワード|取得(確認)するランダムパスワードの変数を設定します。|
|確認パスワード|確認用パスワード情報を設定します。</br>※別項目「確認パスワード情報」を参照|
|||
|<B>確認パスワード情報</B>|確認用パスワード情報を設定します。|
|確認位置|ランダムパスワードを取得する位置(桁)を設定します。</br>全桁取得する場合は直接ランダムパスワードが保存されている変数を使用してください。|
|確認パスワード保存変数|取得したランダムパスワードを保存する変数を設定します。|

</br>

■文字入力パスワード</br>

</br>

![Image](/Password/image/image1.png)</br>
![Image](/Password/image/image2.png)　　
![Image](/Password/image/image3.png)</br>

</br>

![Image](/Password/image/image4.png)　　
![Image](/Password/image/image5.png)</br>

</br>

![Image](/Password/image/image6.png)　　
![Image](/Password/image/image7.png)</br>

■数字入力パスワード</br>

</br>

![Image](/Password/image/image8.png)</br>
![Image](/Password/image/image9.png)　　
![Image](/Password/image/image10.png)</br>

</br>

![Image](/Password/image/image16.png)　　
![Image](/Password/image/image17.png)</br>

</br>

![Image](/Password/image/image18.png)　　
![Image](/Password/image/image19.png)</br>
※ランダムパスワードの１桁目を変数11に設定する例

</br>

![Image](/Password/image/image11.png)</br>
![Image](/Password/image/image12.png)　　
![Image](/Password/image/image13.png)</br>

</br>

![Image](/Password/image/image14.png)　　
![Image](/Password/image/image15.png)</br>

</br>

ランダムパスワードの取得桁は複数設定することもできます。

</br>

![Image](/Password/image/image20.png)　　
![Image](/Password/image/image21.png)</br>

</br>
</br>

<B>■利用規約</B></br>
このプラグインはMITライセンスで配布しています
