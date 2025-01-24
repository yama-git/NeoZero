import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './post.module.css';
import fontstyles from '../font/font.module.css';
import Cookies from 'js-cookie';


const Post = () => {
  const userId = Cookies.get('userid');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userid : userId,
    title: '',
    caption: '',
    file: null
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleTop = () => {
    navigate('/top');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setFormData(prev => ({
        ...prev,
        file: file
      }));

      // 画像プレビューの作成
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData(prev => ({
        ...prev,
        file: null
      }));
      setImagePreview(null);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.caption || !formData.file) {
      alert("タイトル、キャプション、画像のすべてを入力してください。");
      return;
    }

    // FormDataを作成
    const fd = new FormData();
    fd.append('user_id', formData.userid);
    fd.append('title', formData.title);
    fd.append('caption', formData.caption);
    fd.append('file', formData.file);
    
    // fd.forEach((value, key) => {
    //   console.log(key, value);
    // });
  // FormData を Map に変換
const formDataMap = new Map();
fd.forEach((value, key) => {
  formDataMap.set(key, value);
});

// Map の内容を表示
formDataMap.forEach((value, key) => {
  console.log(key, value);
});

    try {
      const response = await fetch('https://neozero.metifie.com/post', {
        method: 'POST',
        body: fd,
      });

      if (response.ok) {
        navigate('/top'); // 投稿成功時に遷移
      } else {
        console.error('投稿失敗');
      }
    } catch (error) {
      console.error('エラーが発生しました:', error);
    }
  };

  const inputStyle = {
    fontFamily: 'CraftMincho, serif'
  };

  return (
    <div className={fontstyles.fontFamily}>
      <div className={styles.body}>
        <div className={styles.white}>
          <div className={styles.post}>
            <div className={styles.file}>
              {imagePreview ? (
                <div className={styles.previewContainer}>
                  <img
                    src={imagePreview}
                    alt="プレビュー"
                    className={styles.imagePreview}
                  />
                  <input
                    id="file"
                    type="file"
                    className={styles.input}
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </div>
              ) : (
                <div className={styles.uploadContainer}>
                  <p>画像をアップロード</p>
                  <input
                    id="file"
                    type="file"
                    className={styles.input}
                    onChange={handleFileChange}
                    accept="image/*"
                    style={inputStyle}
                  />
                </div>
              )}
            </div>

            <div className={styles.form}>
              <div className={styles['form-group']}>
                <label htmlFor="title">タイトル</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className={styles.input}
                  placeholder="(11字以内)"
                  value={formData.title}
                  style={inputStyle}
                  onChange={handleInputChange}
                  maxLength={11}
                />
              </div>
              <div className={styles['form-group']}>
                <label htmlFor="caption">キャプション</label>
                <textarea
                  id="caption"
                  name="caption"
                  className={styles.textarea}
                  placeholder="(50字以内)"
                  style={inputStyle}
                  value={formData.caption}
                  onChange={handleInputChange}
                  maxLength={50}
                />
              </div>
            </div>
          </div>

          <div className={styles.buttons}>
            <button
              type="button"
              onClick={handleTop}
              style={inputStyle}
              className={`${styles.button} ${styles.return}`}
            >
              戻る
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              style={inputStyle}
              className={`${styles.button} ${styles.register}`}
            >
              投稿
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
