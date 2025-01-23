//ペット情報変更
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './pet_change.module.css';
import fontstyles from '../font/font.module.css';
import Left1Img from '../image/Left1.png'; //259:550
import Right1Img from '../image/Right1.png'; //259:750
import Cookies from 'js-cookie'; // ここでインポート
const PetChange = () => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [imageFile, setImageFile] = useState(null); // 画像ファイルを保存するためのstate
  const userId = Cookies.get('userid');
  const handleTop = () => {
    navigate('/top');
  };

  const handlepetcon = async () => {
    // バリデーションチェック
    // if (!imagePreview) {
    //   setErrorMessage('※画像は必須項目ニャン。');
    //   return;
    // }

    if (name.length > 8) {
      setErrorMessage('※名前は8文字以内で入力してワン。');
      return;
    }

    if (comment && comment.length > 100) {
      setErrorMessage('※フリーコメントは100字以内で入力してニャン。');
      return;
    }
    // エラーメッセージがなければデータを送信
    setErrorMessage('');

    // 送信するデータをまとめる
    const formData = {
      user_id: userId, // ユーザーIDを追加
      user_name: name,
      user_comment: comment,
      file: imageFile ? URL.createObjectURL(imageFile) : null, // ファイルをURLに変換
    };

    navigate('/pet_con',{state:{ formData } }); // 投稿消去画面に移動
    // try {
    //   // const senddata = JSON.stringify ({userId, name, comment});
    //   const response = await fetch('https://neozero.metifie.com/userinfo/info/change', {
    //     method: 'PUT',
    //     body: formData,
    //   });

    //   if (response.ok) {
    //     navigate('/pet_con'); // 成功したら遷移
    //   } else {
    //     const data = await response.json();
    //     setErrorMessage(data.error || 'データの送信に失敗しました。');
    //   }
    // } catch (error) {
    //   console.error('Error:', error);
    //   setErrorMessage('ネットワークエラーが発生しました。');
    //}
    // // エラーがなければ遷移
    // setErrorMessage('');
    // navigate('/pet_con');
  };
  const inputStyle = {
    fontFamily: 'CraftMincho, serif'
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
        setErrorMessage(''); // 画像が設定されたらエラーメッセージをクリア
      };
      reader.readAsDataURL(file);
      setImageFile(file); // 画像ファイルを保存
    }
  };

  const handlead1 = () => {
    //外部サイトへ飛ぶ(新しいタブで)
    window.open('https://www.info.kochi-tech.ac.jp/faculty_members/profile_takeda.shtml', '_blank', 'noopener noreferrer')
  };

  const handlead2 = () => {
    //外部サイトへ飛ぶ(新しいタブで)
    window.open('https://www.info.kochi-tech.ac.jp/faculty_members/profile_yokoyama.shtml', '_blank', 'noopener noreferrer')
  };

  return (
    <div className={fontstyles.fontFamily}>
      <div className={styles.body}>
        <div className={styles.left}>
          <button
            className={styles['main-btn']}
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
          <div className={styles.pet}>ペット情報変更</div>
          <div className={styles.white}>
            <div className={styles.photoContainer}>
              <div className={styles.photo}>
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="ペットの画像"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '50%'
                    }}
                  />
                ) : (
                  <div>🐾</div>
                )}
              </div>
              <button
                className={styles.imageButton}
                style={inputStyle}
                onClick={() => document.getElementById('imageInput').click()}
              >
                ※画像挿入
              </button>
              <input
                type="file"
                id="imageInput"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </div>

            <div className={styles.information}>
              <div className={styles.formGroup}>
                <label className={styles.label}>名前</label>
                <input
                  type="text"
                  placeholder="8文字以内"
                  className={styles.input}
                  style={inputStyle}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLedngth={8}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>フリーコメント</label>
                <textarea
                  placeholder="ペットの性別や年齢、コメントなど(100文字以内)"
                  className={styles.textarea}
                  style={inputStyle}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  maxLedngth={100}
                ></textarea>
              </div>
            </div>
          </div>

          {/* エラーメッセージ表示エリア */}
          {errorMessage && (
            <p className={styles.errorMessage} style={{ color: 'red', marginTop: '10px' }}>
              {errorMessage}
            </p>
          )}

          <button
            className={styles['ok-btn']}
            onClick={handlepetcon}
            style={inputStyle}
          >
            変更
          </button>
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
    </div>
  );
};

export default PetChange;