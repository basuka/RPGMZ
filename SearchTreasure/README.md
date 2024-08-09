宝箱探索スキル機能を実装します。</br>
現在のマップに残っている宝の数を知らせる探索スキル及び、宝の位置を知らせる調査スキルを実装します。</br>

【宝箱探索スキル】</br>
https://raw.githubusercontent.com/basuka/RPGMZ/main/SearchTreasure/SearchTreasure.js</br>

</br>

![Image](/SearchTreasure/image/image1.png)</br>
![Image](/SearchTreasure/image/image2.png) ![Image](/SearchTreasure/image/image7.png)</br>

</br>

![Image](/SearchTreasure/image/image3.png)</br>
![Image](/SearchTreasure/image/image4.png) ![Image](/SearchTreasure/image/image5.png)</br>

</br>

<B>設定内容</B></br>

| 項目 | 内容 |
| :--- | :--- |
|探索スキル|探索スキルを設定します</br>現在のマップに残っている宝の数を知らせます|
|調査スキル|調査スキルを設定します</br>残っている宝の位置を知らせます|
|残りアイテムメッセージ|探索スキル使用時に残りの宝が存在する場合のメッセージを設定します|
|残りアイテム無しメッセージ|探索スキル使用時に残りの宝が存在しない場合のメッセージを設定します|
|調査SE|調査スキルのアニメーションのSEを設定します|
|SE音量|調査SEの音量を設定します|
|SEピッチ(%)|調査SEのピッチを設定します|
|SE位相|調査SEの位相を設定します|

</br>
</br>

<B>プラグインコマンド</B></br>

| 項目 | 内容 |
| :--- | :--- |
|宝イベント|宝イベントに設定するプラグインコマンドです</br>このプラグインコマンドが設定されいるイベントが探索スキル・調査スキルの対象となります</br>対象のイベントページ内ならどこでも設定は可能です(設定する位置は決まっていません)|

</br>
</br>

探索スキル・調査スキルは宝イベント(プラグインコマンド)を設定しているイベントが対象となります。</br>
宝イベント(プラグインコマンド)の設定はアイテム(お金)を取得するイベントと同じページに設定してください。</br>

![Image](/SearchTreasure/image/image6.png)</br>
※画像のイベントではツクールの「イベントの簡単作成」で設定した宝箱イベントの一番最後に設定しています

</br>
</br>

探索スキル・調査スキルの設定例</br>

探索スキル</br>
![Image](/SearchTreasure/image/image8.png)</br>

</br>
</br>

調査スキル</br>
![Image](/SearchTreasure/image/image9.png)</br>

</br>
</br>


<B>■利用規約</B></br>
このプラグインはMITライセンスで配布しています
