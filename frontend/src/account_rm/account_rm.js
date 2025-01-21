//アカウント消去
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './account_rm.module.css';
import fontstyles from '../font/font.module.css';
import Left2Img from '../image/Left2.png'; //259:550
import Right2Img from '../image/Right2.png'; //259:750

const RmAccount = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validatePassword = (password) => {
    const passwordRegex = /^[a-zA-Z0-9]{8,16}$/;
    return passwordRegex.test(password);
  };

  const handleOkClick = () => {
    if (!email) {
      setErrorMessage('※メールアドレスを入力してワン。');
      return;
    }

    if (!password) {
      setErrorMessage('※パスワードを入力してニャン。');
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage('※パスワードは半角英数字8～16文字で入力してワン。');
      return;
    }
    navigate('/account_con');
  };


  const handleTopClick = () => {
    navigate('/top');
  };

  const inputStyle = {
    fontFamily: 'CraftMincho, serif'
  };

  const handlead1 = () => {
    //外部サイトへ飛ぶ(新しいタブで)
    window.open('https://www.info.kochi-tech.ac.jp/faculty_members/profile_shinomori.shtml', '_blank', 'noopener noreferrer')
  };

  const handlead2 = () => {
    //外部サイトへ飛ぶ(新しいタブで)
    window.open('https://www.info.kochi-tech.ac.jp/faculty_members/profile_iwata.shtml', '_blank', 'noopener noreferrer')
  };

  return (
    <div className={fontstyles.fontFamily}>
      <div className={styles.body}>
        <div className={styles.left}>
          <button
            type="button"
            onClick={handleTopClick}
            style={inputStyle}
            className={styles.mainBtn}
          >
            トップページに戻る
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
          <div className={styles.account}>アカウント消去</div>
          <p className={styles.errorMessage}>{errorMessage}</p>
          <label>メールアドレス</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          <label>パスワード</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />

          <p className={styles.passwordHint}>
            ※半角英数字8～16文字
          </p>

          <button
            type="button"
            onClick={handleOkClick}
            style={inputStyle}
            className={styles.okButton}
          >
            OK
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

export default RmAccount;