条件スキル機能を実装します。</br>
条件(スキルの使用順・スキルの使用回数)を満たした場合、条件に合った別のスキルを発動することができるようになります。</br>
また、条件となるスキル(条件スキル)は習得していないスキルでも発動することができるため、奥義や隠しスキルのような使い方ができるようになります。</br>

【条件スキル】</br>
https://raw.githubusercontent.com/basuka/RPGMZ/main/ConditionSkill/ConditionSkill.js</br>

</br>

![Image](/ConditionSkill/image/image1.png) ![Image](/ConditionSkill/image/image5.png)</br>

</br>

<B>設定内容</B></br>

| 項目 | 内容 |
| :--- | :--- |
|条件スキル|条件スキルを設定します</br>※別項目「条件スキル情報」を参照|
|有効タイプ|戦闘中に条件(スキル回数など)を満たした場合の有効にするタイプを設定します。</br>この戦闘から有効：条件を満たした戦闘から条件スキルが有効になります。</br>次の戦闘から有効：条件を満たした戦闘では条件スキルは有効になりません。(次の戦闘から有効になります)|

</br>
</br>

<B>条件スキル情報</B></br>

| 項目 | 内容 |
| :--- | :--- |
|条件スキル|条件スキルにするスキルを設定します|
|使用スキル|条件スキルを発動するスキルの使用順を設定します</br>途中で別の動作が行われるとリセットされます|
|使用スキル回数|スキルの必要使用回数を設定します</br>未設定の場合はスキルの使用回数は条件に含まれません</br>※別項目「使用スキル回数情報」を参照|

</br>
</br>

<B>使用スキル回数情報</B></br>

| 項目 | 内容 |
| :--- | :--- |
|スキル|使用回数を条件にするスキルを設定します|
|使用回数|必要な使用回数を設定します|

</br>
</br>


【使用スキル】で設定した順番にスキルを使用すると条件に合った別のスキルが発動されます。</br>

</br>
</br>

通常の場合は選択したスキルが発動します。</br>
![Image](/ConditionSkill/image/image1.png) ![Image](/ConditionSkill/image/image2.png)</br>

</br>

![Image](/ConditionSkill/image/image3.png) ![Image](/ConditionSkill/image/image4.png)</br>

</br>
</br>

【使用スキル】の設定順にスキルを使用すると条件スキルが発動します。</br>

![Image](/ConditionSkill/image/image3.png)</br>
![Image](/ConditionSkill/image/image1.png)</br>
![Image](/ConditionSkill/image/image5.png)</br>

</br>
</br>

条件スキルに必要なコスト(MP/TP)が不足している場合は選択したスキルが発動します。</br>
また、【使用スキル回数】で設定したスキルの使用回数が足りない場合も選択したスキルが発動します。</br>

</br>
</br>


<B>■利用規約</B></br>
このプラグインはMITライセンスで配布しています
