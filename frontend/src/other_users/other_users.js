//対象ユーザの投稿画面
import React, { useState, useEffect, useCallback } from 'react'; // React用
import { useNavigate, useParams } from 'react-router-dom'; // ページ遷移用
import styles from './other_users.module.css'; // CSSモジュール
import fontstyles from '../font/font.module.css';
import Left2Img from '../image/Left2.png'; //259:550
import Right2Img from '../image/Right2.png'; //259:750


const OtherUsers = () => {
  const navigate = useNavigate(); // ページ遷移用
  const { id } = useParams(); // パラメータ取得
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return '';
  };
  const userid = getCookie('userid');

  const handleTop = () => { // 「トップページに戻る」ボタン押下
    navigate('/top'); // トップページに移動
  };

  // const handleFollow = useCallback(async (followedid) => {
  //       if (!userid || !followedid) return;
  //       console.log(userid, followedid);
  //       try {
  //         const response = await fetch('http://localhost:8080/follow', {
  //           method: 'POST',
  //           headers: { 'Content-Type': 'application/json' },
  //           body: JSON.stringify({ userid, followedid }),
  //         });
      
  //         if (!response.ok) {
  //           throw new Error('フォローの更新に失敗しました');
  //         }
  //         const status = await response.json();
  //         console.log(status);
  //         window.location.reload();
  //       } catch (error) {
  //         console.error('フォロー処理エラー:', error);
  //       }
  //     }, [userid]);

  const handleReport = () => { // 「通報」ボタン押下
    navigate('/report_con'); 
  };

  const inputStyle = {
    fontFamily: 'CraftMincho, serif'
  };

  useEffect(() => {
      const fetchPosts = async () => {
        if (!id) {
          setIsLoading(false);
          return;
        }
  
        try {
          setIsLoading(true);
          const response = await fetch(`http://localhost:8080/post/get/${id}`);
          if (!response.ok) {
            throw new Error('投稿の取得に失敗しました');
          }
          const data = await response.json();
          setPosts(data.posts);
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      };

      fetchPosts();
    }, [id]);

  return (
    <div className={fontstyles.fontFamily}>
      <div className={styles.body}>

      <div className={styles.left}>
        <button // 「トップページへ戻る」ボタン
          className={styles.topButton}
          onClick={handleTop}
          style={inputStyle}
        >
          トップページへ戻る
        </button>

        <div className={styles.advertisement}>
          <img
            src={Left2Img} // 広告サンプル
            alt="Left2Img" // 代替テキスト
          />
        </div>
      </div>

      <div className={styles.center}>
      {isLoading ? (
            <div>読み込み中...</div> // ローディング中の表示
          ) : posts.length === 0 ? (
            <div>投稿がありません</div> // 投稿がない場合の表示
          ) : (
            <>
        <div className={styles.title}>{posts[0].name}のページ</div>
          <div className={styles.media}>
            {posts.map((post) => (
              <div key={post.id} className={styles.white}>           
                <div className={styles.post}>
                  <div className={styles.picture}>{post.image}</div>
                  
                  {/* <div className={styles.info}>
                    <button
                      className={styles.followButton}
                      onClick={() => handleFollow(id)}
                      style={inputStyle}
                    >
                      フォロー中
                    </button> */}
                    
                    <div className={styles.push}>
                      <div className={styles.good}>いいね</div>
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
         </>
       )}
     </div>

      <div className={styles.right}>
        <div className={styles.advertisement2}>
          <img
            src={Right2Img} // 広告サンプル
            alt="Right2Img" // 代替テキスト
          />
        </div>
      </div>
    </div>
    </div>
  );
}
export default OtherUsers;
