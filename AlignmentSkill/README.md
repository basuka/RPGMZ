二人以上で行う連携スキルを実装します。</br>
一度設定した連携スキルの情報はセーブ時に一緒に保存されます。</br>
セーブデータをロード時にセーブ時に保存された連携スキルの情報も一緒にロード・設定されます。</br>
連携スキルは一度設定すればその後の再設定は不要です。</br>

【連携スキルプラグイン】</br>
https://raw.githubusercontent.com/basuka/RPGMZ/main/AlignmentSkill/AlignmentSkill.js</br>


連携スキルの設定では、ダメージ計算時でアクターを指定することが出来ます。</br>

<B>計算式</B></br>
| 計算式 | 内容 |
| ------------- | ------------- |
| a.atk | 使用者の攻撃力 |
| a[0].atk + a[1].mat | １番目のアクターの攻撃力 + 2番目のアクターの魔法力 |


<B>設定項目</B></br>

- 連携スキル一覧
  - 連携スキル
  - 連携情報一覧
    - アクター
    - スキル
    - 消費MP
    - 消費TP
  - 計算式

<table>
  <tr>
    <th colspan=3>項目</th>
    <th>内容</th>
  </tr>
  <tr>
    <td width="150"><H4>連携スキル一覧</H4></td>
    <td width="130">-</td>
    <td width="100">-</td>
    <td>連携スキルの設定を行います(複数可)</td>
  </tr>
  <tr>
    <td>-</td>
    <td>連携スキル</td>
    <td>-</td>
    <td>連携スキルにするスキルの設定を行います</td>
  </tr>
  <tr>
    <td>-</td>
    <td><H4>連携情報一覧</H4></td>
    <td>-</td>
    <td>連携スキルにするスキルの設定を行います(複数可)</td>
  </tr>
  <tr>
    <td>-</td>
    <td>-</td>
    <td>アクター</td>
    <td>連携スキルに必要なアクターの設定を行います</td>
  </tr>
  <tr>
    <td>-</td>
    <td>-</td>
    <td>スキル</td>
    <td>【アクター】項目で設定したアクターに必要なスキルの設定を行います</td>
  </tr>
  <tr>
    <td>-</td>
    <td>-</td>
    <td>消費MP</td>
    <td>連携スキル使用時の消費MPの設定を行います</br>
        この項目が未入力、又は「0」が設定されている場合は、【スキル】項目で設定したスキル(データベース)の消費MPが設定されます</td>
  </tr>
  <tr>
    <td>-</td>
    <td>-</td>
    <td>消費TP</td>
    <td>連携スキル使用時の消費MPの設定を行います</br>
        この項目が未入力、又は「0」が設定されている場合は、【スキル】項目で設定したスキル(データベース)の消費TPが設定されます</td>
  </tr>
  <tr>
    <td>-</td>
    <td>計算式</td>
    <td>-</td>
    <td>連携スキルのダメージ計算式の設定を行います</br>
        アクターを指定する場合は【連携情報一覧】項目で設定した順番でアクターの指定を行います</td>
  </tr>
</table>

</br>
</br>
</br>

データベースのスキルタイプから連携スキルとするスキルタイプの設定を行います。</br>
ここで設定したスキルタイプ名がスキル項目名となります。</br>

![Image5](/AlignmentSkill/image/image5.jpg)</br>

</br>
</br>
</br>

データベースのスキルから連携スキルとするスキルの設定を行います。</br>
スキルを設定する際のスキルタイプは連携スキルとして設定したスキルタイプを設定します</br>

![Image6](/AlignmentSkill/image/image6.jpg)</br>

</br>
</br>
</br>

連携スキルは、「連携スキルプラグイン」で設定した必要なスキルを習得すると自動で習得します。</br>

![Image1](/AlignmentSkill/image/image1.jpg)</br>

</br>
</br>
</br>

戦闘中に表示される連携スキルの消費MP/TPに関しては別ウィンドウで表示します。</br>

![Image4](/AlignmentSkill/image/image4.jpg)</br>

</br>
</br>
</br>

メニューで表示する際は決定キーで説明文と必要アクターの切り替えが出来ます。</br>
また、連携スキルの項目は連携スキルを習得するまで非表示となります。</br>

![Image2](/AlignmentSkill/image/image2.jpg)　　　　　　![Image3](/AlignmentSkill/image/image3.jpg)
