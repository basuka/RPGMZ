テレポート機能を実装します。</br>
一度設定したテレポート情報はセーブ時に一緒に保存されます。</br>
セーブデータをロード時にセーブ時に保存されたテレポート情報も一緒にロード・設定されます。</br>
テレポート情報は一度設定すればその後の再設定は不要です。</br>

【テレポートプラグイン】</br>
https://raw.githubusercontent.com/basuka/RPGMZ/main/Teleport/Teleport.js</br>


<B>設定項目</B></br>

- テレポート機能の初期設定
  - テレポートスキル
  - テレポートアイテム
- テレポートの設定
  - 表示順番号
  - 転移先マップの種類
  - 転移先マップID
  - 転移先名の種類
  - 転移先名
  - 転移先マップ名の種類
  - X軸の調整タイプ
  - X軸の調整
  - Y軸の調整タイプ
  - Y軸の調整
- テレポートの使用可否設定
  - テレポート使用可否

</br>
</br>

<B>必須項目パターン</B></br>
対象の【選択項目】を選択した場合【必須項目】の項目は必須となります。
<table>
  <tr>
    <th>項目</th>
    <th>選択項目</th>
    <th>必須項目</th>
  </tr>
  <tr>
    <td rowspan=3 valign="top"><B>転移先マップの種類</B></td>
    <td rowspan=3 valign="top">直接指定</td>
    <td>転移先マップID</td>
  </tr>
  <tr>
    <td>X軸の調整</td>
  </tr>
  <tr>
    <td>Y軸の調整</td>
  </tr>
  <tr>
    <td><B>転移先名の種類</B></td>
    <td>入力</td>
    <td>転移先名</td>
  </tr>
  <tr>
    <td rowspan=3 valign="top"><B>X軸の調整タイプ</B></td>
    <td>右に調整</td>
    <td>X軸の調整</td>
  </tr>
  <tr>
    <td>左に調整</td>
    <td>X軸の調整</td>
  </tr>
  <tr>
    <td>直接指定</td>
    <td>X軸の調整</td>
  </tr>
  <tr>
    <td rowspan=3 valign="top"><B>Y軸の調整タイプ</B></td>
    <td>上に調整</td>
    <td>Y軸の調整</td>
  </tr>
  <tr>
    <td>下に調整</td>
    <td>Y軸の調整</td>
  </tr>
  <tr>
    <td>直接指定</td>
    <td>Y軸の調整</td>
  </tr>
</table>

</br>
</br>
</br>

<B>テレポート機能の初期設定</B></br>
テレポートスキル及びアイテムの設定を行います。

</br>
</br>
</br>

<B>テレポートの設定</B></br>
■【表示順番号】</br>
テレポート使用時に表示される転移先名一覧の表示順の設定を行います。</br>
この項目を省略、または0を入力した際は転移先名の登録順に表示を行います。</br>

</br>

・表示順番号を省略した場合は登録順に表示</br>
![Image1](/Teleport/image/image1.jpg)</br>

</br>

![Image2](/Teleport/image/image2.jpg)　　　　![Image3](/Teleport/image/image3.jpg)</br>

</br>
</br>

・表示順番号を指定した場合は指定した番号順に表示</br>
![Image4](/Teleport/image/image4.jpg)</br>

</br>

![Image2](/Teleport/image/image2.jpg)　　　　![Image5](/Teleport/image/image5.jpg)</br>

</br>
</br>
</br>

■【転移先マップの種類】</br>
テレポート使用時に転移する転移先マップの設定を行います。</br>

</br>

・転移先マップが現在のマップの場合はテレポートを設定しているマップに転移</br>
![Image7](/Teleport/image/image7.jpg) ![Image6](/Teleport/image/image6.jpg)</br>

</br>

![Image8](/Teleport/image/image8.jpg)　　　　![Image9](/Teleport/image/image9.jpg)</br>

</br>

・転移先マップが移動先のマップの場合は場所移動で設定している移動先マップに転移</br>
![Image10](/Teleport/image/image10.jpg) ![Image11](/Teleport/image/image11.jpg)</br>

</br>

![Image8](/Teleport/image/image8.jpg)　　　　![Image12](/Teleport/image/image12.jpg)</br>

