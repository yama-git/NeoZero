//利用規約
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './use.module.css';
import fontstyles from '../font/font.module.css';

const Use = () => {
  const navigate = useNavigate();

  const handleterms = () => {
    navigate('/terms');
  };

  return (
    <div className={fontstyles.fontFamily}>
      <div className={styles.body}>
        <div className={styles.term}>利用規約</div>

        <button
          onClick={handleterms}
          className={`${styles.button} ${fontstyles.fontFamily}`}
        >
          同意画面に戻る
        </button>

        <div className={styles.context}>

          <p>
            第1条（総則）<br />
            <span className={styles.listItem}></span>
            1.本利用規約（以下「本規約」といいます）は,NeoZero Inc.（以下,「当社」といいます）が提供する動物特化型SNS「PawLovers」（以下,「本サービス」といいます）の利用条件を定めるものです。 <br />
            2.登録ユーザ（以下,「ユーザ」といいます）の皆様には,本規約に同意した上で,本サービスをご利用いただきます。 <br />
            <br />
            第2条（定義） <br />
            1.「ユーザ」とは,本サービスを利用するすべての個人または法人を指します。<br />
            2.「投稿」とは,ユーザが本サービス内にアップロードする写真,動画,コメント,その他のコンテンツを指します。<br />
            3.「スーパーチャット（以下,「スパチャ」といいます）とは,<br />
            <br />
            第3条（利用条件）<br />
            1.ユーザは,本サービスを利用するにあたり,インターネット接続環境を自己の責任で準備するものとします。<br />
            2.本サービスの利用は,未成年の場合,親権者の同意を得た上で利用してください。<br />
            <br />
            第4条（禁止事項）<br />
            ユーザは,本サービスの利用にあたり,以下の行為を行ってはなりません：<br />
            1.他のユーザ,第三者,または当社の権利を侵害する行為。<br />
            2.公序良俗に反する行為や法令に違反する行為。<br />
            3.虚偽または不正確な情報を投稿する行為。<br />
            4.システムに過度な負荷を与える行為や不正アクセス。<br />
            5.本サービスを商業目的で利用する行為（当社の事前承諾を得た場合除く）。<br />
            <br />
            第5条（投稿コンテンツの取り扱い）<br />
            1.ユーザが投稿したコンテンツの著作権は,ユーザに帰属します。ただし,当社は本サービスの運営・宣伝目的の範囲内で無償かつ非独占的に利用できるものとします。<br />
            2.当社は,投稿内容が本規約または法令に違反している場合,事前の通知なく削除することがあります。<br />
            <br />
            第6条（個人情報の取り扱い）<br />
            1.当社は,ユーザの個人情報を,当社の「プライバシーポリシー」に基づき適切に取り扱います。<br />
            2.ユーザは,必要な範囲で個人情報を提供することに同意します。<br />
            <br />
            第7条（免責事項）<br />
            1.	当社は,本サービスの内容や機能について,完全性,正確性,信頼性を保証しません。<br />
            2.本サービスの利用に起因する損害について、当社は一切の責任を負いません。ただし、当社に故意または重大な過失がある場合を除きます。<br />
            <br />
            第8条（利用料金）<br />
            1.	有料サービスの料金および支払い条件は、別途定める規定に従うものとします。<br />
            2.支払い後の料金は、原則として返金いたしません。<br />
            <br />
            第9条（規約の変更）<br />
            1.当社は、本規約を随時変更できるものとし、変更後の内容を本サービス上で告知します。<br />
            2.変更後の規約は、本サービス上で告知した時点から効力を有するものとします。<br />
            <br />
            第10条（準拠法および裁判管轄）<br />
            1.本規約は日本法に準拠し解釈されるものとします。<br />
            2.本サービスに関連して生じる紛争については、高知地方裁判所を専属的合意管轄裁判所とします。<br />
          </p>
          <p>NeoZero Inc.</p>
        </div>
      </div>
    </div>
  );
};

export default Use;