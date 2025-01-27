//会員情報変更画面

import React from 'react'; // React用
import { useNavigate } from 'react-router-dom'; // ページ遷移用
import styles from './change_info.module.css'; // CSSモジュール(cssファイルかく)
import fontstyles from '../font/font.module.css';
import Left2Img from '../image/Left2.png'; //259:550
import Right2Img from '../image/Right2.png'; //259:750


const ChangeInfo = () => {
  //ここから下変える
  const navigate = useNavigate(); // ページ遷移用

  const handletop = () => { //「トップページ」ボタン押下 
    navigate('/top'); // トップページに移動
  };

  const handlemail_change = () => { //「メアド」ボタン押下 
    navigate('/mail_change'); // メアドに移動
  };

  const handlechange_pass = () => { //「パスワード」ボタン押下 
    navigate('/change_pass'); // パスワードに移動
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
    //window.open('https://www.info.kochi-tech.ac.jp/faculty_members/profile_harada.shtml', '_blank', 'noopener noreferrer')
    window.open('https://anisupo.jimdofree.com/', '_blank', 'noopener noreferrer')
  };

  return (
    <div className={fontstyles.fontFamily}>
    <div className={styles.body}>
      <div className={styles.left}>
        <button // 「トップページへ戻る」ボタン
          className={styles.button}
          onClick={handletop}
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
        <div className={styles.change}>会員情報変更</div>
        <button // 「メアド」ボタン
          className={styles.important}
          onClick={handlemail_change}
          style={inputStyle}
        >
          メールアドレス変更
        </button>

        <button // 「パスワード」ボタン
          className={styles.important}
          onClick={handlechange_pass}
          style={inputStyle}
        >
          パスワード変更
        </button>
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

export default ChangeInfo;
