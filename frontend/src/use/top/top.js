import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './top.module.css';
import fontstyles from '../font/font.module.css';
import pawloverslogoImg from './pawlovers.png';
import TopleftImg from '../image/Topleft.png';
import ToprightImg from '../image/Topright.png';

const TopPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handlePost = () => {
    navigate('/post');
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return '';
  };
  
  const userid = getCookie('userid');

  //以下いいね用
  const [isLiked, setIsLiked] = useState(false); // いいねボタンが押されたかどうかの状態

const handleGood = async (postId) => {
//いいねしたポストIDの送信
  try {
    // POSTリクエストを送信
    const response = await fetch('http://localhost:8080/post/good', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userid, postid: postId}),
    });


    if (!response.ok) {
      const errorData = await response.json();
      console.error('エラー:', response.status, errorData);
      return;
    }

    
    // レスポンスの処理
    const data = await response.json();
    if (data === 1) {
      // 成功した場合、ボタンを無効にする
      setIsLiked(true);
      console.log('送信成功:', data);
      // 追加の処理があれば書く
    } else {
      // エラーハンドリング
      console.error('エラー:', data);
    }
  } catch (error) {
    // 通信エラーなどのエラーハンドリング
    console.error('通信エラー:', error);
  }
};

    

  const handleMypage = () => {
    navigate('/mypage');
  };

  const handleFollow = () => {
    // フォロー機能用の空関数を維持
  };

  const handleReport = () => {
    navigate('/report_con');
  };

  const inputStyle = {
    fontFamily: 'CraftMincho, serif',
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:8080/post/new');
        if (!response.ok) {
          throw new Error('投稿の取得に失敗しました');
        }
        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return <div className={styles.loading}>読み込み中...</div>;
  }

  if (error) {
    return <div className={styles.error}>エラー: {error}</div>;
  }

  return (
    <div className={fontstyles.fontFamily}>
      <div className={styles.body}>
        <div className={styles.above}>
          <img
            src={pawloverslogoImg}
            alt="PawLovers"
            className={styles.pawloverslogoImg}
          />

          <button
            className={styles.postButton}
            onClick={handlePost}
            style={inputStyle}
          >
            投稿する
          </button>

          <button
            className={styles.mypageButton}
            onClick={handleMypage}
            style={inputStyle}
          >
            マイページ
          </button>
        </div>

        <div className={styles.bottom}>
          <div className={styles.advertisement}>
            <img
              src={TopleftImg}
              alt="広告"
            />
          </div>

          <div className={styles.media}>
            {posts.map((post) => (
              <div key={post.id} className={styles.white}>
                <div className={styles.post}>
                  <div className={styles.picture}>
                    <img
                      src={`http://localhost:8080/${post.image_url}`} // 修正された部分
                      alt={`投稿 ${post.id}`}
                      className={styles.postImage}
                      onError={(e) => {
                        e.target.src = '/placeholder.png';
                        console.error('画像の読み込みに失敗しました');
                      }}
                    />
                  </div>

                  <div className={styles.info}>
                    <button
                      className={styles.followButton}
                      onClick={handleFollow}
                      style={inputStyle}
                    >
                      フォロー
                    </button>

                    <div className={styles.push}>
                      <button
                        className={styles.good}
                        onClick={() => handleGood(post.id)} 
                        style={inputStyle}
                        disabled={isLiked === 1} // 0以外の場合にボタンが無効になる
                      >
                    {/* {post.good === 0 ? "いいね済み" : "いいね"}  */}
                    {isLiked === 0 ? 'いいね済み' : 'いいね'}
                      </button>
                      <div className={styles.money}>スパチャ</div>
                    </div>

                    <div className={styles.comment}>{post.comment}</div>
                    <button
                      className={styles.reportButton}
                      onClick={handleReport}
                      style={inputStyle}
                    >
                      通報
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.advertisement}>
            <img
              src={ToprightImg}
              alt="広告"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopPage;