スロットマシーン機能を実装します。</br>
コインを使用してスロットマシーンをすることが出来るようになります。</br>

【スロットマシーン】</br>
https://raw.githubusercontent.com/basuka/RPGMZ/main/SlotMachine/SlotMachine.js</br>

</br>

![Image](/SlotMachine/image/image.png)</br>

</br>

<B>設定内容</B></br>

| 項目 | 内容 |
| :--- | :--- |
|保管ID|所持コインを保管する変数のIDを設定します|
|スロットアイコン1|スロットアイコン1を設定します</br>※別項目「スロットアイコン情報」を参照|
|スロットアイコン2|スロットアイコン2を設定します</br>※別項目「スロットアイコン情報」を参照|
|スロットアイコン3|スロットアイコン3を設定します</br>※別項目「スロットアイコン情報」を参照|
|スロットアイコン4|スロットアイコン4を設定します</br>※別項目「スロットアイコン情報」を参照|
|スロットアイコン5|スロットアイコン5を設定します</br>※別項目「スロットアイコン情報」を参照|
|セブン5ライン獲得倍率|7が5ライン揃ったときに獲得するコインの倍率を設定します|
|セブン4ライン獲得倍率|7が4ライン揃ったときに獲得するコインの倍率を設定します|
|セブン3ライン獲得倍率|7が3ライン揃ったときに獲得するコインの倍率を設定します|
|ヘルプメッセージ|ヘルプメッセージの倍率を設定します|
|コイン枚数の単位|コイン枚数の単位を設定します|
|勝利メッセージ|勝利時のメッセージを設定します</br>"%1"は獲得枚数、"%2"は枚数の単位に置換されます|
|敗北メッセージ|敗北メッセージを設定します|
|コイン不足メッセージ|コインが足りない時のメッセージを設定します|
|||
|<B>スロットアイコン情報</B>|スロットアイコン1～スロットアイコン5の情報を設定します|
|キャラクターファイル|スロットのアイコンにするキャラクターファイルを設定します|
|キャラクター番号|スロットのアイコンにするキャラクター番号を設定します|
|5ライン獲得倍率|5ライン揃ったときに獲得するコインの倍率を設定します|
|4ライン獲得倍率|4ライン揃ったときに獲得するコインの倍率を設定します|
|3ライン獲得倍率|3ライン揃ったときに獲得するコインの倍率を設定します|
|||
|<B>コマンドパラメータ</B>||
|リールリスト|各ラインのリール情報を設定します</br>※別項目「リール情報」を参照|
|倍率|スロットの倍率を設定します|
|||
|<B>リール情報</B>|ライン分のリール情報を設定します</br>※6ライン目からの設定は無効となります|
|リール配置|リールに配置するスロットアイコンを設定します</br>配列個数などに制限はないので好きな配列に設定することが出来ます</br>※必ず5ライン分設定してください|



</br>
</br>

<B>■利用規約</B></br>
このプラグインはMITライセンスで配布しています
