//  アカウント登録
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // ページ遷移用
import styles from "./account_reg.module.css"; // CSSモジュールを使用
import fontstyles from '../font/font.module.css';

const AccountReg = () => {
  const navigate = useNavigate(); // ページ遷移用

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleOk =async () => {
    const passwordRegex = /^[a-zA-Z0-9]{8,16}$/; // パスワードの形式チェック
    const emailregex = /^[a-zA-Z0-9]{4,10}@gmail\.com$/;
    

    if (!email || !name || !password || !passwordConfirm) {
      setErrorMessage("※必須項目が入力されてないニャン。");
      return;
    }
    
    if(!emailregex.test(email)){
      setErrorMessage("※メールアドレスは<任意の半角英数字4-10文字>@gmail.comで登録するワン。");
      return;
    }

    if (!passwordRegex.test(password)) {
      setErrorMessage("※パスワードは半角英数字8~16文字で入力してワン。");
      return;
    }

    if (password !== passwordConfirm) {
      setErrorMessage("※パスワードが一致しないニャン。");
      return;
    }

    if (comment.length > 100) {
      setErrorMessage("※フリーコメントは100文字以内で入力してニャン。");
      return;
    }

    //入力されてたら
    try {
      const response = await fetch('https://neozero.metifie.com/userinfo/account/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, email, password, comment}),
      });
      
      const data = await response.json();

      if (response.ok) {
        if (data !== -1) {  // 認証成功
          setErrorMessage('');
          navigate('/');
        } else {  // 認証失敗
          setErrorMessage('※そのメールアドレスはすでに登録されているワン。');
        }
      } else {
        setErrorMessage(data.error || '※ログインに失敗したワン。');
      }
    } catch (error) {
      setErrorMessage('※サーバーとの通信に失敗したニャン。');
    }
  };



  const inputStyle = {
    fontFamily: 'CraftMincho, serif'
  };

  return (
    <div className={fontstyles.fontFamily}>
      <div className={styles.body}>
        <div className={styles.title}>会員情報登録</div>

        <form className={styles.form}>
          {/* メールアドレス */}
          <div className={styles.item}>
            <label htmlFor="email">
              メールアドレス<span>※</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
          </div>

          {/* ニックネーム */}
          <div className={styles.item}>
            <label htmlFor="name">
              ニックネーム<span>※</span>
              <br />
              (ペットの名前)
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={inputStyle}
            />
          </div>

          {/* パスワード */}
          <div className={styles.item}>
            <label htmlFor="password">
              パスワード<span>※</span>
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* パスワード確認 */}
          <p className={styles.note}>※半角英数字8~16文字</p>
          <div className={styles.item}>
            <label htmlFor="passwordConfirm">
              パスワード<span>※</span>
              <br />
              (再確認)
            </label>
            <input
              type="password"
              id="passwordConfirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
          </div>

          {/* フリーコメント */}
          <div className={styles.item}>
            <label htmlFor="comment">フリーコメント</label>
            <textarea
              className={styles.comment}
              style={inputStyle}
              placeholder="ペットの性別や年齢、コメントなど(100文字以内)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        </form>

        {/* エラーメッセージ */}
        <p className={styles.errorMessage}>{errorMessage}</p>

        {/* OKボタン */}
        <button
          type="button"
          className={styles.okButton}
          onClick={handleOk}
          style={inputStyle}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default AccountReg;
