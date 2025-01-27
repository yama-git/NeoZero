//会員情報選択画面
import React from 'react'; // React用
import { useNavigate } from 'react-router-dom'; // ページ遷移用
import styles from './member.module.css'; // CSSモジュール
import fontstyles from '../font/font.module.css';
import Left1Img from '../image/Left1.png'; //259:550
import Right1Img from '../image/Right1.png'; //259:750

const Member = () => {
  const navigate = useNavigate(); // ページ遷移用

  const handleTop = () => { // 「トップページに戻る」ボタン押下
    navigate('/top'); // トップページに移動
  };

  const handleChange = () => { // 「会員情報変更」ボタン押下
    navigate('/change_info'); // 会員情報変更画面に移動
  };

  const handleLogout = () => { // 「ログアウト」ボタン押下
    navigate('/logout'); // ログアウト画面に移動
  };

  const handleAccount = () => { // 「アカウント消去」ボタン押下
    navigate('/account_rm'); // アカウント消去画面に移動
  };

  const inputStyle = {
    fontFamily: 'CraftMincho, serif'
  };
  const handlead1 = () => {
    //外部サイトへ飛ぶ(新しいタブで)
    //window.open('https://www.info.kochi-tech.ac.jp/faculty_members/profile_shinomori.shtml', '_blank', 'noopener noreferrer')
    window.open('https://anisupo.jimdofree.com/', '_blank', 'noopener noreferrer')
  };

  const handlead2 = () => {
    //外部サイトへ飛ぶ(新しいタブで)
    //window.open('https://www.info.kochi-tech.ac.jp/faculty_members/profile_iwata.shtml', '_blank', 'noopener noreferrer')
    window.open('https://anisupo.jimdofree.com/', '_blank', 'noopener noreferrer')
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
            src={Left1Img} // 広告サンプル
            alt="Left1Img" // 代替テキスト
          />  
          </button>
        </div>

      </div>

      <div className={styles.center}>

        <div className={styles.title}>会員情報選択</div>

        <button // 「会員情報変更」ボタン
          className={styles.changeButton}
          onClick={handleChange}
          style={inputStyle}
        >
          会員情報変更
        </button>

        <button // 「ログアウト」ボタン
          className={styles.logoutButton}
          onClick={handleLogout}
          style={inputStyle}
        >
          ログアウト
        </button>

        <button // 「アカウント消去」ボタン
          className={styles.accountButton}
          onClick={handleAccount}
          style={inputStyle}
        >
          アカウント消去
        </button>

      </div>

      <div className={styles.right}>
        <div className={styles.advertisement2}>
        <button
            className={styles.adbutton}
              onClick={handlead2}
            >
          <img
            src={Right1Img} // 広告サンプル
            alt="Right1Img" // 代替テキスト
          /> 
          </button> 
        </div>
      </div>
    </div>
    </div>
  );
};

export default Member;
