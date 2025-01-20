//ログアウト画面
import React from 'react'; // React用
import { useNavigate } from 'react-router-dom'; // ページ遷移用
import styles from './logout.module.css'; // CSSモジュール(cssファイルかく)
import fontstyles from '../font/font.module.css';
import Left2Img from '../image/Left2.png'; //259:550
import Right2Img from '../image/Right2.png'; //259:750

const Logout = () => {
  const navigate = useNavigate(); // ページ遷移用

  const handleTop = () => { //「トップページ」ボタン押下 
    navigate('/top'); // トップページ
  };

  const handleok = () => { //「 はい」ボタン押下 
    navigate('/'); // はいのページ
  };

  const handleno = () => { //「いいえ」ボタン押下 
    navigate('/member'); // いいえ
  };

  const inputStyle = {
    fontFamily: 'CraftMincho, serif'
  };


  return (
  <div className={fontstyles.fontFamily}>
      <div className={styles.body}>
        <div className={styles.left}>
          <button className={styles.topButton} onClick={handleTop} style={inputStyle}>トップページへ戻る</button>
          <div className={styles.advertisement}>
            <img
              src={Left2Img} // 広告サンプル
              alt="Left2Img" // 代替テキスト
            />
          </div>
        </div>

        <div className={styles.center}>
          <div className={styles.logout}>ログアウト</div>
          <div className={styles.white}>
            <p className={styles.message}>ログアウトするワン？</p>
            <button className={styles.okButton} onClick={handleok} style={inputStyle}>はい</button>
            <button className={styles.noButton} onClick={handleno} style={inputStyle}>いいえ</button>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.advertisement2}>
            <img
              src={Right2Img} // 広告サンプル
              alt="Right2Img" // 代替テキスト
            />
          </div>
        </div>
      </div>
      </div>
  );
};

export default Logout;
