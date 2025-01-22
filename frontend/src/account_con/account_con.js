// アカウント消去確認画面
import React from 'react'; // React用
import { useNavigate } from 'react-router-dom'; // ページ遷移用
import styles from './account_con.module.css'; // CSSモジュール
import fontstyles from '../font/font.module.css';
import Left2Img from '../image/Left2.png'; //259:550
import Right2Img from '../image/Right2.png'; //259:750

const AccountCon = () => {
  const navigate = useNavigate(); // ページ遷移用

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return '';
  };

  const userid = getCookie('userid');

  const handleTop = () => { // 「トップページへ戻る」ボタン押下
    navigate('/top'); // トップページに移動
  };

  const handleOk =  async() => { // 「同意してアカウント消去」ボタン押下
    try {
      const response = await fetch(`http://localhost:8080/post/followstatus/${userid}`);

      if (!response.ok) {
        throw new Error('※アカウント消去に失敗したニャン。');
      }

      const status = await response.json();
      navigate('/login'); // ログインページに移動
    } catch (error) {
      console.error('※エラー:', error);
      return 1;
    }
  };

  const handleNo = () => { // 「いいえ」ボタン押下
    navigate('/member'); // 会員情報選択画面に移動
  };

  const inputStyle = {
    fontFamily: 'CraftMincho, serif'
  };

  

  const handlead1 = () => {
    //外部サイトへ飛ぶ(新しいタブで)
    window.open('https://www.info.kochi-tech.ac.jp/faculty_members/profile_wei.shtml', '_blank', 'noopener noreferrer')
  };

  const handlead2 = () => {
    //外部サイトへ飛ぶ(新しいタブで)
    window.open('https://www.info.kochi-tech.ac.jp/faculty_members/profile_kurihara.shtml', '_blank', 'noopener noreferrer')
  };

  return (
    <div className={fontstyles.fontFamily}>
      <div className={styles.body}>

        <div className={styles.left}>

          <button // 「トップページへ戻る」ボタン
            className={styles.topButton}
            onClick={handleTop}
            style={inputStyle}
          >
            トップページへ戻る
          </button>

          <div className={styles.advertisement}>
          <button
            className={styles.adbutton}
              onClick={handlead1}
            >
            <img
              src={Left2Img} // 広告サンプル
              alt="Left2Img" // 代替テキスト
            />
            </button>
          </div>
        </div>


        <div className={styles.center}>

          <div className={styles.title}>アカウント消去</div>
          <div className={styles.white}>
            <p className={styles.con}>
              一度消去したアカウントは<br />
              <span className={styles.red}>元には戻せません</span><br />
              ほんとにいいニャン？<br />
            </p>

            <button // 「同意してアカウント消去」ボタン
              className={styles.okButton}
              onClick={handleOk}
              style={inputStyle}
            >
              同意してアカウント消去
            </button>

            <button // 「いいえ」ボタン
              className={styles.noButton}
              onClick={handleNo}
              style={inputStyle}
            >
              いいえ
            </button>

          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.advertisement2}>
          <button
            className={styles.adbutton}
              onClick={handlead2}
            >
            <img
              src={Right2Img} // 広告サンプル
              alt="Right2Img" // 代替テキスト
            />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountCon;
