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

  const emailregex = /^[a-zA-Z0-9]{4,10}@gmail\.com$/;
  
  

  const handleTop = () => {
    navigate('/top');
  };

  const handleOk =  async() => {
    const { currentEmail, newEmail, currentPassword } = formData;

    if (!currentEmail) {
      setErrorMessage('※現在のメールアドレスを入力してニャン。');
      return;
    }

    if (!newEmail) {
      setErrorMessage('※新しいメールアドレスを入力してワン。');
      return;
    }

    if (!currentPassword) {
      setErrorMessage('※パスワードを入力してニャン。');
      return;
    }

    if(!emailregex.test(newEmail)){
      setErrorMessage("※メールアドレスは<任意の半角英数字4-10文字>@gmail.comで入力するワン。");
      return;
    }

    if (!validatePassword(currentPassword)) {
      setErrorMessage('※パスワードは半角英数字8～16文字で入力してワン。');
      return;
    }

    //入力されてたら
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
      return '';
    };
    
    const userid = getCookie('userid');
    try {
      const response = await fetch('http://localhost:8080/userinfo/email/change', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userid: userid,
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
          setErrorMessage('※入力情報が間違ってるニャン。');
        }
      } else {
        setErrorMessage(data.error || '※メール変更に失敗したワン。');
      }
    } catch (error) {
      setErrorMessage('※サーバーとの通信に失敗したニャン。');
    };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlead1 = () => {
    //外部サイトへ飛ぶ(新しいタブで)
    window.open('https://www.info.kochi-tech.ac.jp/faculty_members/profile_shinomori.shtml', '_blank', 'noopener noreferrer')
  };

  const handlead2 = () => {
    //外部サイトへ飛ぶ(新しいタブで)
    window.open('https://www.info.kochi-tech.ac.jp/faculty_members/profile_iwata.shtml', '_blank', 'noopener noreferrer')
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
        <div className={styles.mail}>メールアドレス変更</div>
        <p className={styles.p}>{errorMessage}</p>
        <label>今のメールアドレス</label>
        <input
          type="email"
          name="currentEmail"
          className={styles.input}
          value={formData.currentEmail}
          onChange={handleInputChange}
          style={inputStyle}
        />
        <label>新しいメールアドレス</label>
        <input
          type="email"
          name="newEmail"
          className={styles.input}
          value={formData.newEmail}
          style={inputStyle}
          onChange={handleInputChange}
        />
        <label>今のパスワード</label>
        <input
          type="password"
          name="currentPassword"
          className={styles.input}
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

export default MailChange;