テレポート機能を実装します。</br>
一度設定したテレポート情報はセーブ時に一緒に保存されます。</br>
セーブデータをロード時にセーブ時に保存されたテレポート情報も一緒にロード・設定されます。</br>
テレポート情報は一度設定すればその後の再設定は不要です。</br>

【テレポートプラグイン】</br>
https://raw.githubusercontent.com/basuka/RPGMZ/main/Teleport/Teleport.js</br>


<B>設定項目</B></br>
■パラメータ
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


■プラグインコマンド
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

<B>テレポートスキル</B></br>
テレポート機能を設定するスキルの設定を行います。

</br>
</br>
</br>

<B>テレポートアイテム</B></br>
テレポート機能を設定するスキルの設定を行います。

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
この項目は【転移先マップの種類】で「現在のマップ」を選択した場合、有効になります。</br>
ただし、【転移先名の種類】で「入力」を選択した場合は無効になります。</br>

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

![Image24](/Teleport/image/image24.jpg) ![Image25](/Teleport/image/image25.jpg)</br>

</br>
</br>
</br>

■【X軸の調整タイプ】</br>
テレポートで転移する転移先のX軸の調整設定を行います。</br>

・「なし」を選択した場合、調整は行わず基準座標(※1)に転移します。</br>
![Image26](/Teleport/image/image26.jpg) ![Image27](/Teleport/image/image27.jpg)</br>

</br>

![Image8](/Teleport/image/image8.jpg) ![Image9](/Teleport/image/image9.jpg)</br>

</br>
</br>

・「右に調整」を選択した場合、基準座標(※1)から右方向に転移場所を調整します。</br>
![Image28](/Teleport/image/image28.jpg) ![Image29](/Teleport/image/image29.jpg)</br>

</br>

![Image8](/Teleport/image/image8.jpg) ![Image30](/Teleport/image/image30.jpg)</br>

</br>

「左に調整」を選択した場合は、基準座標(※1)から左方向に転移場所を調整します。</br>
また、「直接指定」を選択した場合は、指定したX座標に転移するようになります。</br>

</br>
</br>
</br>

■【X軸の調整】</br>
転移先X座標の調整数を設定します。</br>
【X軸の調整タイプ】で「直接指定」を選択した場合は、ここで入力された値が転移先のX座標に設定されます。</br>
【転移先マップの種類】で「直接指定」を選択した場合も同様の設定になります。</br>

</br>

調整数を1で設定した場合、転移先のX座標を基準座標(※1)から１つずらします。</br>
![Image31](/Teleport/image/image31.jpg)</br>

</br>

![Image8](/Teleport/image/image8.jpg) ![Image30](/Teleport/image/image30.jpg)</br>

</br>
</br>
</br>

■【Y軸の調整タイプ】</br>
テレポートで転移する転移先のY軸の調整設定を行います。</br>

・「なし」を選択した場合、調整は行わず基準座標(※1)に転移します。</br>
![Image32](/Teleport/image/image32.jpg) ![Image33](/Teleport/image/image33.jpg)</br>

</br>

![Image8](/Teleport/image/image8.jpg) ![Image9](/Teleport/image/image9.jpg)</br>

</br>
</br>

・「上に調整」を選択した場合、基準座標(※1)から上方向に転移場所を調整します。</br>
![Image34](/Teleport/image/image34.jpg) ![Image35](/Teleport/image/image35.jpg)</br>

</br>

![Image8](/Teleport/image/image8.jpg) ![Image36](/Teleport/image/image36.jpg)</br>

</br>

「下に調整」を選択した場合は、基準座標(※1)から下方向に転移場所を調整します。</br>
また、「直接指定」を選択した場合は、指定したY座標に転移するようになります。</br>

</br>
</br>
</br>

■【Y軸の調整】</br>
転移先Y座標の調整数を設定します。</br>
【Y軸の調整タイプ】で「直接指定」を選択した場合は、ここで入力された値が転移先のY座標に設定されます。</br>
【転移先マップの種類】で「直接指定」を選択した場合も同様の設定になります。</br>

</br>

調整数を1で設定した場合、転移先のY座標を基準座標(※1)から１つずらします。</br>
![Image37](/Teleport/image/image37.jpg)</br>

</br>

![Image8](/Teleport/image/image8.jpg) ![Image36](/Teleport/image/image36.jpg)</br>

</br>

※1)基準座標</br>
基準座標は【転移先マップの種類】の選択により異なります。</br>
</br>
・【転移先マップの種類】が「現在のマップ」の場合</br>
　　テレポートの設定を行ったプレイヤーの座標が基準座標になります。</br>

</br>

・【転移先マップの種類】が「移動先のマップ」の場合</br>
　　場所移動イベントで設定している移動先の座標が基準座標になります。</br>

</br>

・【転移先マップの種類】が「直接指定」の場合</br>
　　転移先を直接指定するため「直接指定」の場合、基準座標はありません。</br>

</br>
</br>
</br>

<B>テレポートの使用可否設定</B></br>
テレポートスキル・アイテムの使用可否の設定を行います。</br>

</br>
</br>
</br>

<B>設定上の注意</B></br>
</br>
1.【転移先マップの種類】または【転移先マップ名の種類】で「移動先のマップ」を設定している場合</br>
【テレポートの設定】は必ず場所移動イベントを行うページと同じページ内に設定してください。</br>

</br>

2.【テレポートの設定】はイベント実行内容の一番上に設定してください。</br>

</br>

![Image38](/Teleport/image/image38.jpg)


</br>
</br>

<B>■利用規約</B></br>
このプラグインはMITライセンスで配布しています
