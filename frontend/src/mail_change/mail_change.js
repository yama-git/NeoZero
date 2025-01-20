//メールアドレス変更
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './mail_change.module.css';
import fontstyles from '../font/font.module.css';
import Left1Img from '../image/Left1.png'; //259:550
import Right1Img from '../image/Right1.png'; //259:750


const MailChange = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    currentEmail: '',
    newEmail: '',
    currentPassword: ''
  });

  const validatePassword = (password) => {
    const passwordRegex = /^[a-zA-Z0-9]{8,16}$/;
    return passwordRegex.test(password);
  };

  const handleTop = () => {
    navigate('/top');
  };

  const handleOk =  async() => {
    const { currentEmail, newEmail, currentPassword } = formData;

    if (!currentEmail) {
      setErrorMessage('※現在のメールアドレスを入力してくださいニャン。');
      return;
    }

    if (!newEmail) {
      setErrorMessage('※新しいメールアドレスを入力してくださいワン。');
      return;
    }

    if (!currentPassword) {
      setErrorMessage('※パスワードを入力してくださいニャン。');
      return;
    }

    if (!validatePassword(currentPassword)) {
      setErrorMessage('※パスワードは半角英数字8～16文字で入力してくださいワン。');
      return;
    }

    //入力されてたら
    try {
      const response = await fetch('http://localhost:8000/mail_change/mail_change', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userid: document.cookie, 
          email: currentEmail, 
          new_email: newEmail, 
          password: currentPassword
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data !== -1) {  // 認証成功
          setErrorMessage('');
          navigate('/change_info');
        } else {  // 認証失敗
          setErrorMessage('※入力情報が間違っていますニャン。');
        }
      } else {
        setErrorMessage(data.error || '※メール変更に失敗しましたワン。');
      }
    } catch (error) {
      setErrorMessage('※サーバーとの通信に失敗しましたニャン。');
    };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const inputStyle = {
    fontFamily: 'CraftMincho, serif'
  };

  return (
    <div className={fontstyles.fontFamily}>
    <div className={styles.body}>
      <div className={styles.left}>
        <button
          className={styles['main-button']}
          style={inputStyle}
          onClick={handleTop}
        >
          トップページへ戻る
        </button>
        <div className={styles.advertisement}>
          <img
            src={Left1Img} // 広告サンプル
            alt="Left1Img" // 代替テキスト
          />
        </div>
      </div>

      <div className={styles.center}>
        <div className={styles.mail}>メールアドレス変更</div>
        <p className={styles.p}>{errorMessage}</p>
        <input
          type="email"
          name="currentEmail"
          className={styles.input}
          placeholder="今のメールアドレス"
          value={formData.currentEmail}
          onChange={handleInputChange}
          style={inputStyle}
        />
        <input
          type="email"
          name="newEmail"
          className={styles.input}
          placeholder="新しいメールアドレス"
          value={formData.newEmail}
          style={inputStyle}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="currentPassword"
          className={styles.input}
          placeholder="今のパスワード"
          value={formData.currentPassword}
          onChange={handleInputChange}
        />
         <span className={styles.passwordHint}>※半角英数字8～16文字</span>
        <button
          className={styles.ok}
          onClick={handleOk}
          style={inputStyle}
        >
          OK
        </button>
      </div>

      <div className={styles.right}>
        <div className={styles.advertisement2}>
          <img
            src={Right1Img} // 広告サンプル
            alt="Right1Img" // 代替テキスト
          />
        </div>
      </div>
      </div>
    </div>
  );
};

export default MailChange;