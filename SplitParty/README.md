分割パーティー機能を実装します。</br>
分割したパーティーを切り替えることが出来るようになります。</br>

【分割パーティー】</br>
https://raw.githubusercontent.com/basuka/RPGMZ/main/SplitParty/SplitParty.js</br>

</br>

![Image](/SplitParty/image/image7.png)</br>

</br>

<B>設定内容</B></br>

| 項目 | 内容 |
| :--- | :--- |
|キャンセル判定|分割パーティーの編成がキャンセルされたかどうかを判定するスイッチを設定します</br>キャンセルされた場合はON、キャンセルされなかった場合はOFFが設定されます|

</br>

<B>設定・コマンド</B></br>

分割パーティーの設定を行うコマンドです。</br>
設定を行うと分割パーティー機能が有効になります。</br>

| 項目 | 内容 |
| :--- | :--- |
|パーティー数|分割するパーティーの数を設定します|
|メンバー追加|メンバーに存在しないアクターを追加する場合設定します|
|メンバー追加(変数)|メンバーに存在しないアクターを変数で追加する場合設定します</br>変数に設定されている値が追加するアクターIDになります|
|開始位置(2パーティー)|第2パーティーの開始位置を設定します|
|開始位置(3パーティー)|第3パーティーの開始位置を設定します|
|開始位置(4パーティー)|第4パーティーの開始位置を設定します|

</br>
</br>

【設定・コマンド】を行うとパーティー編成画面が表示されます。</br>

</br>

![Image](/SplitParty/image/image1.png) ![Image](/SplitParty/image/image2.png)</br>
![Image](/SplitParty/image/image3.png)

</br>

編成するパーティーは「PageUp/PageDown」キーか左上の切り替えボタンで切り替えることができます。</br>
編成を終了する場合は「Esc」キーか右上のキャンセルボタンで終了することができます。</br>
全てのパーティーが設定されている場合は、設定完了コマンドが表示されます。</br>
設定されていないパーティーがある場合は、設定キャンセルコマンドが表示されます。</br>

</br>
</br>

編成終了後にマップ移動を行うと、第2パーティー以降は設定された開始位置にイベントとして先頭のグラフィックで表示されます。</br>

</br>

![Image](/SplitParty/image/image4.png)</br>
![Image](/SplitParty/image/image5.png)</br>

</br>

イベント内容は設定されないので調べても何も起こりません。</br>
パーティーは「PageUp/PageDown」キーか左上の切り替えボタンで切り替えることができます。</br>
他のマップに存在するパーティーの切り替えも可能です。</br>

</br>

![Image](/SplitParty/image/image9.png)</br>
![Image](/SplitParty/image/image13.png)</br>

<B>位置チェック・コマンド</B></br>

いずれかのパーティーがこの位置に存在するかチェックを行うコマンドです。</br>
主にスイッチなどに使用することを想定しています。</br>

| 項目 | 内容 |
| :--- | :--- |
|位置判定|位置判定を行うスイッチを設定します</br>このイベントの位置にメンバーが存在する場合ONになります</br>離れるとスイッチはOFFになります|

</br>

■【位置チェック・コマンド】使用例

</br>

地面が割れていて先に進むことができないマップ。</br>
右の通路に橋を架けるスイッチを用意する。</br>

</br>

![Image](/SplitParty/image/image6.png)</br>

</br>

別のパーティーがスイッチを踏んでいる間、割れた地面に橋が架かる。</br>

</br>

![Image](/SplitParty/image/image7.png)</br>

</br>

しかし、スイッチから離れると同時に橋も消える。</br>

</br>

![Image](/SplitParty/image/image8.png)</br>

</br>

【位置チェック・コマンド】を設定したイベント上にパーティーが存在しなくなったため、設定していたスイッチがOFFになり橋が消えたというイベントです。</br>

</br>

判定はスイッチで行うため、他のマップでもこのコマンドは有効となります。</br>

</br>

スイッチを押している間だけ開く扉。</br>

</br>

![Image](/SplitParty/image/image10.png)</br>

</br>

別マップにある扉を開くスイッチを他のパーティーが踏む。</br>

</br>

![Image](/SplitParty/image/image11.png)</br>

</br>

別マップのスイッチでも他のパーティーが踏んでいる間、扉が開く。</br>

</br>

![Image](/SplitParty/image/image12.png)</br>

</br>

位置チェックの設定はチェックを行いたい場所に、【位置チェック・コマンド】と判定で使用するスイッチ(パラメータ)を設定するだけです。</br>

</br>

![Image](/SplitParty/image/image14.png)</br>

</br>

<B>終了・コマンド</B></br>

分割パーティーを終了するコマンドです。</br>

| 項目 | 内容 |
| :--- | :--- |
|非戦闘メンバー|分割パーティー終了時のパーティー編成で非戦闘メンバーを加えるかの判定を行います</br>非戦闘メンバーを加える場合、全対象メンバーがパーティーに追加されます|

</br>

【終了・コマンド】を行うとパーティー編成画面が表示されます。</br>

</br>

![Image](/SplitParty/image/image15.png)</br>
![Image](/SplitParty/image/image16.png)</br>

</br>

パーティー編成が完了すると、分割パーティー機能が無効となりパーティーの切り替えはできなくなります。</br>
左上の切り替えボタンも表示されなくなります。</br>

</br>

![Image](/SplitParty/image/image17.png)</br>
![Image](/SplitParty/image/image18.png)</br>

</br>

<B>セーブ・ロード</B></br>

</br>

セーブ時に各パーティー情報も保存されます。</br>

</br>

パーティー分割中にセーブを行う。</br>

</br>

![Image](/SplitParty/image/image19.png) ![Image](/SplitParty/image/image20.png)</br>

</br>

パーティー分割中にセーブしたデータでロード行う。</br>

</br>

![Image](/SplitParty/image/image21.png)</br>

</br>

ロード後の開始位置及び別パーティーの位置はセーブ時の位置を保持します。

</br>

![Image](/SplitParty/image/image22.png) ![Image](/SplitParty/image/image23.png)</br>


</br>
</br>

<B>■利用規約</B></br>
このプラグインはMITライセンスで配布しています