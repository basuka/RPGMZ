成長装備機能を実装します。</br>
武器や防具にレベルを設定し、レベルに応じて武器・防具の能力値を変動させたりスキルを習得させることができるようになります。</br>
成長装備を装備できるアクターは各武器・防具に対して一人(専用装備)となります。</br>

【成長装備】</br>
https://raw.githubusercontent.com/basuka/RPGMZ/main/GrowthEquip/GrowthEquip.js</br>

</br>

成長武器レベル1</br>
![Image](/GrowthEquip/image/image1.png) ![Image](/GrowthEquip/image/image2.png)</br>

</br>

![Image](/GrowthEquip/image/image3.png)</br>

</br>

成長武器レベル2</br>
![Image](/GrowthEquip/image/image4.png) ![Image](/GrowthEquip/image/image5.png)</br>

<B>設定内容</B></br>

| 項目 | 内容 |
| :--- | :--- |
|成長武器|成長武器情報の設定を行います</br>※別項目【成長武器情報】を参照|
|成長防具|成長防具情報の設定を行います</br>※別項目【成長防具情報】を参照|
|経験値割合(%)|獲得経験値から成長装備が得られる経験値の割合の設定を行います</br>経験値の割合は1～100(%)の範囲で設定することができます。</br></br>例：獲得経験値が200、経験値割合が50(%)の場合</br>成長装備が得られる経験値は獲得経験値の50(%)で100となります|
|有効スイッチ|成長装備画面を有効化するスイッチの設定を行います</br>スイッチがONの場合、アクターのステータス画面で成長装備画面と切り替えることができます</br>ステータス画面と成長装備画面の切り替えは決定キーで切り替えることができます|
|成長スキル使用タイプ|成長スキルの使用タイプの設定を行います</br></br>いつでも：成長スキルを無条件で使用することができます</br>成長装備着用時：成長装備を装備していない場合、スキルを使用することができなくなります|
|レベル単位|成長装備画面に表示する成長装備のレベル単位の設定を行います|
|レベル単位(テキスト)|メッセージ(テキスト)に表示する成長装備のレベル単位の設定を行います|
|レベルアップメッセージ|成長装備がレベルアップ時に表示されるメッセージの設定を行います</br></br>%1：成長装備名(武具名)></br>%2：レベル単位(テキスト)</br>%3：成長装備のレベル|

</br>
</br>

■成長スキル使用タイプ</br>

</br>

・成長スキル使用タイプが「いつでも」の場合、成長装備以外の装備でもスキルの使用が可能</br>

</br>

![Image](/GrowthEquip/image/image6.png) ![Image](/GrowthEquip/image/image7.png)</br>

</br>

・成長スキル使用タイプが「成長装備着用時」の場合、成長装備以外の装備ではスキルの使用は不可</br>

</br>

![Image](/GrowthEquip/image/image6.png) ![Image](/GrowthEquip/image/image8.png)</br>

</br>
</br>

<B>成長武器情報</B></br>

| 項目 | 内容 |
| :--- | :--- |
|武器|成長武器にする武器の設定を行います|
|装備可能アクター|成長武器を装備できるアクターの設定を行います</br>装備可能なアクターは複数設定することはできません(専用装備となります)|
|レベル情報|成長武器のレベル情報の設定を行います</br>※別項目【レベル情報】を参照|

</br>
</br>

<B>成長防具情報</B></br>

| 項目 | 内容 |
| :--- | :--- |
|武器|成長防具にする防具の設定を行います|
|装備可能アクター|成長防具を装備できるアクターの設定を行います</br>装備可能なアクターは複数設定することはできません(専用装備となります)|
|レベル情報|成長防具のレベル情報の設定を行います</br>※別項目【レベル情報】を参照|

</br>
</br>

<B>レベル情報</B></br>

| 項目 | 内容 |
| :--- | :--- |
|レベル|成長武器のレベルの設定を行います</br>設定できる範囲はレベル2～レベル99となります</br>レベル１はデータベースに設定した能力値が設定されます|
|必要経験値|このレベルに必要な経験値の設定を行います|
|習得スキル|レベルアップ時に習得するスキルの設定を行います|
|攻撃力|レベルアップ時に上昇する攻撃力の設定を行います|
|防御力|レベルアップ時に上昇する防御力の設定を行います|
|魔法力|レベルアップ時に上昇する魔法力の設定を行います|
|魔法防御|レベルアップ時に上昇する魔法防御の設定を行います|
|敏捷性|レベルアップ時に上昇する敏捷性の設定を行います|
|運|レベルアップ時に上昇する運の設定を行います|
|最大HP|レベルアップ時に上昇する最大HPの設定を行います|
|最大MP|レベルアップ時に上昇する最大MPの設定を行います|

</br>
</br>

<B>獲得装備経験値取得(スクリプト)</B></br>

「GrowthEquipManager.gainExp()」関数から獲得装備経験値の取得を行うことができます。</br>

</br>
</br>

<B>レベルアップ情報取得(スクリプト)</B></br>

「GrowthEquipManager.increaseParam(actor)」関数から以下の情報の取得を行うことができます。</br>

| プロパティ | 取得項目 |
| :--- | :--- |
|actorId|アクターID|
|w_levelInfos[id].name|武器名|
|w_levelInfos[id].level|武器レベルの上昇値|
|a_levelInfos[id].name|防具名|
|a_levelInfos[id].level|防具レベルの上昇値|
|atk|攻撃力の上昇値|
|def|防御力の上昇値|
|mat|魔法力の上昇値|
|mdf|魔法防御の上昇値|
|agi|敏捷性の上昇値|
|luk|運の上昇値|
|mhp|最大HPの上昇値|
|mmp|最大MPの上昇値|

※1　w_levelInfos・a_levelInfosのidはデータベースのIDとなります。</br>
※2　レベルアップをしていない場合w_levelInfos・a_levelInfosは空となります。</br>

</br>

【攻撃力の上昇値を取得する使用例】</br>

const increaseParam = GrowthEquipManager.increaseParam(actor);</br>
const atk = increaseParam.atk;</br>

</br>
</br>

<B>■利用規約</B></br>
このプラグインはMITライセンスで配布しています
