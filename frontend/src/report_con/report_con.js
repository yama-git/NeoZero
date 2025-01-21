import React, { useState, useEffect } from 'react';
import fontstyles from '../font/font.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './report_con.module.css';
import Left1Img from '../image/Left1.png';
import Right1Img from '../image/Right1.png';

const ReportCon = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const postId = location?.state?.postId; // 改善箇所

  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return '';
  };

  const userid = getCookie('userid');

  const handletop = () => {
    navigate('/top');
  };

  const handleok = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:8080/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userid, postid: postId }),
      });

      if (!response.ok) {
        throw new Error('通報の送信に失敗しました');
      }

      navigate('/top');
    } catch (error) {
      console.error('通報エラー:', error);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleno = () => {
    navigate('/top');
  };

  const inputStyle = {
    fontFamily: 'CraftMincho, serif'
  };

  useEffect(() => {

    if (!postId) {
      setError('投稿IDが見つかりません');
      setIsLoading(false);
      return;
    }

    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:8080/report/post?postid=${postId}`);

        if (!response.ok) {
          throw new Error('投稿の取得に失敗しました');
        }

        const data = await response.json();
        if (!data.posts || data.posts.length === 0) {
          throw new Error('投稿が見つかりません');
        }

        setPost(data.posts[0]);
      } catch (error) {
        console.error('Error fetching post:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [userid, postId, navigate]);

  if (!userid) {
    return null;
  }



  return (
    <div className={fontstyles.fontFamily}>
      <div className={styles.body}>
        <div className={styles.left}>
          <button
            className={styles.button}
            onClick={handletop}
            style={inputStyle}
          >
            トップページへ戻る
          </button>
          <div className={styles.advertisement}>
            <img
              src={Left1Img}
              alt="広告"
            />
          </div>
        </div>

        <div className={styles.center}>
          <div className={styles.title}>通報するニャン？</div>
          {isLoading ? (
            <div className={styles.loading}>読み込み中...</div>
          ) : error ? (
            <div className={styles.error}>{error}</div>
          ) : post ? (
            <div>
              <div className={styles.user}>ユーザ名:{post.name}</div>
              <div className={styles.white}>
                <div className={styles.post}>
                  <div className={styles.picture}>
                    <img
                      src={`http://localhost:8000/${post.image}`}
                      alt="投稿画像"
                      className={styles.postImage}
                      onError={(e) => {
                        e.target.src = '/placeholder.png';
                        console.error('画像の読み込みに失敗しました');
                      }}
                    />
                  </div>
                  <div className={styles.info}>
                    <div className={styles.comment}>{post.comment}</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.error}>投稿が見つかりません</div>
          )}

          <div className={styles.buttons}>
            <button
              className={styles.okButton}
              onClick={handleok}
              disabled={isSubmitting || isLoading || !post}
              style={inputStyle}
            >
              {isSubmitting ? '送信中...' : 'はい'}
            </button>
            <button
              className={styles.noButton}
              onClick={handleno}
              disabled={isSubmitting}
              style={inputStyle}
            >
              いいえ
            </button>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.advertisement2}>
            <img
              src={Right1Img}
              alt="広告"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCon;
