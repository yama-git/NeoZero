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

  // const getCookie = (name) => {
  //   const value = `; ${document.cookie}`;
  //   const parts = value.split(`; ${name}=`);
  //   if (parts.length === 2) return parts.pop().split(';').shift();
  //   return '';
  // };

  // const userid = getCookie('userid');


  const handleOkClick = async () => {
    if (!email) {
      setErrorMessage('※メールアドレスを入力してくださいワン。');
      return;
    }

    if (!password) {
      setErrorMessage('※パスワードを入力してくださいニャン。');
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage('※パスワードは半角英数字8～16文字で入力してくださいワン。');
      return;
    }
    try {
      const response = await fetch('http://neozero.metifie.com/userinfo/account/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (data !== -1) {  // 認証失敗
        setErrorMessage('');
        navigate('/account_con');
      } else {  // 認証成功
        setErrorMessage('※入力情報が間違ってるニャン。');
        return;
      }
    } catch (error) {
      setErrorMessage('※サーバーとの通信に失敗したワン。');
    }
   
  };


  const handleTopClick = () => {
    navigate('/top');
  };

  const inputStyle = {
    fontFamily: 'CraftMincho, serif'
  };
 const handlead1 = () => {
    //外部サイトへ飛ぶ(新しいタブで)
    window.open('https://www.info.kochi-tech.ac.jp/faculty_members/profile_harada.shtml', '_blank', 'noopener noreferrer')
  };

  const handlead2 = () => {
    //外部サイトへ飛ぶ(新しいタブで)
    window.open('https://www.info.kochi-tech.ac.jp/faculty_members/profile_onishi.shtml', '_blank', 'noopener noreferrer')
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
            placeholder="メールアドレス"
          />
          <label>パスワード</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            placeholder="パスワード"
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