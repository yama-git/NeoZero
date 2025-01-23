//ペット変更確認画面
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // ページ遷移用
import fontstyles from '../font/font.module.css';
import styles from './pet_con.module.css'; // CSSモジュール(cssファイルかく)
import Left1Img from '../image/Left1.png'; //259:550
import Right1Img from '../image/Right1.png'; //259:750


const PetCon = () => {
  //ここから下変える
  const navigate = useNavigate();
  const location = useLocation(); // useLocation を使って、state を取得
  const { formData } = location.state || {}; // state から formData を受け取る
  const [errorMessage, setErrorMessage] = useState('');

  const handleTop = () => {
    navigate('/top'); // トップページに移動
  };

  const handlepet = async () => { // 「OK」ボタン押下
        // ここで送信するデータをオブジェクトとして扱う
        const formDataToSend = new FormData();
        formDataToSend.append('user_id', formData.user_id);
        formDataToSend.append('user_name', formData.user_name);
        formDataToSend.append('user_comment', formData.user_comment);
        formDataToSend.append('file', fileInput.files[0]);
        
        if (formData.file) {
          const fileBlob = formData.file;  // `File` オブジェクトを直接使用
          const fileName = formData.file.name; // ファイル名を取得
           
          formDataToSend.append('file', fileBlob, fileName);
        }
    
        try {
          const response = await fetch('https://neozero.metifie.com/userinfo/info/change', {
            method: 'PUT',
            body: formDataToSend,
          });
    
          if (response.ok) {
            alert('変更が完了しました。');
            navigate('/top');
          } else {
            const data = await response.json();
            setErrorMessage(data.error || 'データの送信に失敗しました。');
          }
        } catch (error) {
          console.error('Error:', error);
          setErrorMessage('ネットワークエラーが発生しました。');
        }
      };
    
      const handleCancel = () => {
        navigate('/pet_change'); // 変更をキャンセルした場合、ペット変更画面に戻る
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
    window.open('https://www.info.kochi-tech.ac.jp/faculty_members/profile_takeda.shtml', '_blank', 'noopener noreferrer')
  };

  return (
    <div className={fontstyles.fontFamily}>
    <div className={styles.body}>
      <div className={styles.left}>
        <button
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
        <div className={styles.account}>ペット情報変更</div>
        <div className={styles.white}>
          KIMIの情報を<br />
          本当に変更<br />
          していいニャン？<br />
          <button
            className={styles.okbutton}
            onClick={handlepet}
            style={inputStyle}
          >
            変更を確定
          </button>
          <button
            className={styles.nobutton}
            onClick={handleCancel}
            style={inputStyle}
          >
            いいえ
          </button>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.advertisement2}>
          <button
            className={styles.adbutton2}
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
  );
};

export default PetCon;
