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

  // 以下いいね用の関数
  const fetchGoodStatus = useCallback(async (postId) => {
    if (!userid || !postId) return 1;

    try {
      const response = await fetch(`http://localhost:8080/post/goodstatus?userid=${userid}&postid=${postId}`);

      if (!response.ok) {
        throw new Error('いいね状態の取得に失敗しました');
      }

      const status = await response.json();
      return status;
    } catch (error) {
      console.error('いいね状態取得エラー:', error);
      return 1;
    }
  }, [userid]);
  const handleGood = async (postId) => {
    if (!userid || !postId) return;

    try {
      const response = await fetch('http://localhost:8080/post/good', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userid, postid: postId }),
      });

      if (!response.ok) {
        throw new Error('いいねの更新に失敗しました');
      }

      // 現在の投稿のいいね状態を反転させる（0 → 1 または 1 → 0）
      setPosts(prevPosts => {
        return prevPosts.map(post => {
          if (post.id === postId) {
            if (post.isLiked === 1) {
              return { ...post, isLiked: 0 };  // いいねしていれば、いいねを解除
            } else {
              return { ...post, isLiked: 1 };  // いいねしていなければ、いいねする
            }
          }
          return post;
        });
      });


    } catch (error) {
      console.error('いいね処理エラー:', error);
    }
  };

  // 以下フォロー用の関数
  const fetchFollowStatus = useCallback(async (postId) => {
      if (!userid || !postId) return 1;
  
      try {
        const response = await fetch(`http://localhost:8080/post/goodstatus?userid=${userid}&postid=${postId}`);
  
        if (!response.ok) {
          throw new Error('いいね状態の取得に失敗しました');
        }
  
        const status = await response.json();
        return status;
      } catch (error) {
        console.error('いいね状態取得エラー:', error);
        return 1;
      }
    }, [userid]);
  
  const handleFollow = async (postId) => {
    if (!userid || !postId) return;
      try {
        // POSTリクエストを送信
        const response = await fetch('http://localhost:8080/follow', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({userid, postid: postId}),
        });
        
        if (!response.ok) {
          throw new Error('いいねの更新に失敗しました');
        }
  
        // 現在の投稿のいいね状態を反転させる（0 → 1 または 1 → 0）
        setPosts(prevPosts => {
          return prevPosts.map(post => {
            if (post.id === postId) {
              if (post.isFollowed === 1) {
                return { ...post, isFollowed: 0 };  // いいねしていれば、いいねを解除
              } else {
                return { ...post, isFollowed: 1 };  // いいねしていなければ、いいねする
              }
            }
            return post;
          });
        });
  
  
      } catch (error) {
        console.error('いいね処理エラー:', error);
      }
    };

  const handleMypage = () => {
    navigate('/mypage');
  };

  const handleReport = () => {
    navigate('/report_con');
  };

  const handlesuperchat = () => {
    //外部サイトへ飛ぶ(新しいタブで)
    window.open('https://www.kochi-tech.ac.jp/', '_blank', 'noopener noreferrer')
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
                    onClick={() => handleFollow(post.id)}
                    style={inputStyle} 
                  >
                {(() => {
                          if (post.isFollowed === 0) {
                            return 'フォロー中';
                          } else {
                            return 'フォロー';
                          }
                        })()}
                  </button>

                  <div className={styles.push}>
                    <button
                      className={styles.good}
                      onClick={() => handleGood(post.id)} //post.idを取得
                      style={inputStyle}
                    >
                  {(() => {
                          if (post.isLiked === 0) {
                            return 'いいね済み';
                          } else {
                            return 'いいね';
                          }
                        })()}
                    </button>

                    <button
                    className={styles.good}
                    onClick={handlesuperchat}
                    style={inputStyle}
                  >
                    スパチャ
                  </button>
              
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