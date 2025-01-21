// パスワード変更画面
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ページ遷移用
import styles from './change_pass.module.css'; // CSSモジュール(cssファイルかく)
import fontstyles from '../font/font.module.css';
import Left1Img from '../image/Left1.png'; //259:550
import Right1Img from '../image/Right1.png'; //259:750


const ChangePass = () => {
  //ここから下変える
  const navigate = useNavigate(); // ページ遷移用

  // useState フックを使用して状態を管理
  const [nowEmail, setNowEmail] = useState('');
  const [nowPassword, setNowPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordCon, setNewPasswordCon] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // パスワードバリデーション用の関数
  const validatePassword = (password) => {
    // 半角英数字のみを許可する正規表現
    const passwordRegex = /^[a-zA-Z0-9]{8,16}$/;
    return passwordRegex.test(password);
  };

  const handleTop = () => { // 「トップページへ戻る」ボタン押下
    navigate('/top'); // トップページに移動
  };

  const handleok = async () => { // 「OK」ボタン押下

    if (!nowEmail) {
      setErrorMessage('※現在のメールアドレスを入力してワン。');
      return;
    }

    // 現在のパスワードのチェック
    if (!nowPassword) {
      setErrorMessage('※現在のパスワードを入力してニャン。');
      return;
    }

    // パスワードの形式チェック（現在のパスワード）
    if (!validatePassword(nowPassword)) {
      setErrorMessage('※現在のパスワードは半角英数字8～16文字で入力してワン。');
      return;
    }


    // 新しいパスワードのチェック
    if (!newPassword) {
      setErrorMessage('※新しいパスワードを入力してニャン。');
      return;
    }

    // パスワードの形式チェック（新しいパスワード）
    if (!validatePassword(newPassword)) {
      setErrorMessage('※新しいパスワードは半角英数字8～16文字で入力してワン。');
      return;
    }

    // パスワードの一致確認
    if (newPassword !== newPasswordCon) {
      setErrorMessage('※パスワードが一致しませんニャン。');
      return;
    }

    // 同一パスワードチェック
    if (newPassword === nowPassword) {
      setErrorMessage('※新しいパスワードは現在のパスワードと異なるものを設定してワン。');
      return;
    }

    // 認証確認
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
      return '';
    };

    const userid = getCookie('userid');
    try {
      const response = await fetch('http://localhost:8080/userinfo/pass/change', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        //送信情報
        body: JSON.stringify({
          userid: userid,
          email: nowEmail,
          password: nowPassword,
          new_pass: newPassword
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data !== -1) {  // 認証成功
          setErrorMessage('');
          navigate('/change_info');
        } else {  // 認証失敗
          setErrorMessage('※入力情報が間違っているニャン。');
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

          <button   //トップページへ戻るボタン
            className={styles.topbutton}
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
          <div className={styles.password}>パスワード変更</div>

          {/* エラーメッセージ表示 */}
          {errorMessage && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}

          <label>今のメールアドレス</label>
          <div className={styles.inputContainer}>
            <input
              type="email"
              className={styles.input}
              value={nowEmail}
              style={inputStyle}
              onChange={(e) => setNowEmail(e.target.value)}
            />
          </div>

          <label>今のパスワード</label>
          <div className={styles.inputContainer}>
            <input
              type="password"
              className={styles.input}
              value={nowPassword}
              onChange={(e) => setNowPassword(e.target.value)}
            />
            <p className={styles.note}>※半角英数字8~16文字</p>
          </div>

          <label>新しいパスワード</label>
          <div className={styles.inputContainer}>
            <input
              type="email"
              className={styles.input}
              value={newPassword}
              style={inputStyle}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <p className={styles.note}>※半角英数字8~16文字</p>
          </div>

          <label>新しいパスワード（再確認）</label>
          <div className={styles.inputContainer}>
            <input
              type="password"
              className={styles.input}
              value={newPasswordCon}
              onChange={(e) => setNewPasswordCon(e.target.value)}
            />
          </div>

          <button     //「OK」ボタン
            className={styles.okbutton}
            onClick={handleok}
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

export default ChangePass;