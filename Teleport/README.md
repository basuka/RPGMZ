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

・転移先マップが現在のマップの場合はテレポート情報を設定しているマップに転移します。</br>
![Image7](/Teleport/image/image7.jpg) ![Image6](/Teleport/image/image6.jpg)</br>

</br>

![Image8](/Teleport/image/image8.jpg)　　　　![Image9](/Teleport/image/image9.jpg)</br>

</br>

・転移先マップが移動先のマップの場合は場所移動で設定している移動先マップに転移します。</br>
![Image10](/Teleport/image/image10.jpg) ![Image11](/Teleport/image/image11.jpg)</br>

</br>

![Image8](/Teleport/image/image8.jpg)　　　　![Image12](/Teleport/image/image12.jpg)</br>

</br>

・転移先マップが直接指定の場合は指定したマップIDのマップに転移します。</br>
　マップIDは「data/MapInfos.json」ファイルで調べることが出来ます。</br>
 
 </br>
 
 ![Image16](/Teleport/image/image16.jpg)</br>
 ![Image17](/Teleport/image/image17.jpg)</br>
 
 ※MapInfos.jsonファイルが壊れると作成中のゲームに影響が出るので、読み取り専用で開くかバックアップを取ることをお勧めします。</br>
 
</br>
</br>
</br>

■【転移先マップID】</br>
転移先にするマップIDを設定します。</br>
この項目は【転移先マップの種類】で「直接指定」を選択した場合、有効になります(必須)。</br>

</br>
</br>
</br>

■【転移先名の種類】</br>
テレポート使用時に表示される転移先名の種類を設定します。</br>

</br>

・表示させる転移先名をマップデータの名前か表示名か設定します。</br>
　入力を選択した場合は転移先名を直接設定することが出来ます。</br>
![Image13](/Teleport/image/image13.jpg) ![Image14](/Teleport/image/image14.jpg)</br>
</br>
![Image15](/Teleport/image/image15.jpg) ![Image5](/Teleport/image/image5.jpg)</br>

</br>
</br>
</br>

■【転移先名】</br>
転移先名の設定を行います。</br>
ここで入力された転移先名が転移先名の一覧に表示されます。</br>
この項目は【転移先名の種類】で「入力」を選択した場合、有効になります(必須)。</br>

</br>
</br>
</br>

■【転移先マップ名の種類】</br>
表示させる転移先名を移動先のマップ名か現在のマップ名か設定します。</br>
この項目は【転移先名の種類】で「入力」を選択した場合、無効になります。</br>

</br>

・移動先のマップ名を選択した場合は、場所移動イベントで設定した移動先のマップ名が設定されます。</br>

</br>

<table>
  <tr>
    <td rowspan=2><img src="/Teleport/image/image18.jpg" alt="Image18"></td>
    <td><img src="/Teleport/image/image20.jpg" alt="Image20"></td>
  </tr>
   <tr>
    <td><img src="/Teleport/image/image19.jpg" alt="Image19"></td>
  </tr>
</table>

![Image15](/Teleport/image/image15.jpg) ![Image5](/Teleport/image/image5.jpg)</br>

</br>
</br>
</br>

・現在のマップ名を選択した場合は、テレポート情報の設定を行っている現在のマップ名が設定されます。</br>

</br>

<table>
  <tr>
    <td rowspan=2><img src="/Teleport/image/image21.jpg" alt="Image21"></td>
    <td><img src="/Teleport/image/image23.jpg" alt="Image23"></td>
  </tr>
   <tr>
    <td><img src="/Teleport/image/image22.jpg" alt="Image22"></td>
  </tr>
</table>


