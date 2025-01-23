import React, { useEffect, useState } from 'react'; // React用
import { useNavigate } from 'react-router-dom'; // ページ遷移用
import styles from './mypage.module.css'; // CSSモジュール
import fontstyles from '../font/font.module.css';
import MypageImg from '../image/Mypage.png'; //(200:750) 横が入らん後で変更
import Cookies from 'js-cookie'; // ここでインポート

const MyPage = () => {
  const [posts, setPosts] = useState([]); // 投稿データを格納するためのstate
  const navigate = useNavigate(); // ページ遷移用

  // user_idは固定 →　クッキーから取得
  const userId = Cookies.get('userid'); 

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`https://neozero.metifie.com/post/get/${userId}`);
        const data = await response.json();
        if (data && data.posts) {
          setPosts(data.posts); // 取得した投稿データをstateに格納
        }
      } catch (error) {
        console.error("投稿データの取得に失敗しました", error);
      }
    };

    fetchPosts();
  }, [userId]); // userIdが変更されるたびに再実行

  const handleTop = () => { // 「トップページへ戻る」ボタン押下
    navigate('/top'); // トップページに移動
  };

  const handlePet = () => { // 「ペット情報変更」ボタン押下
    navigate('/pet_change'); // ペット情報変更画面に移動
  };

  const handleNyakama = () => { // 「Nyakama」ボタン押下
    navigate('/nyakama'); // Nyakama画面に移動
  };

  const handleMember = () => { // 「会員情報選択」ボタン押下
    navigate('/member'); // 会員情報選択画面に移動
  };

  const handleErase = (postId) => { // 「投稿消去」ボタン押下
    console.log('マイページからデリーとに送る',postId);
    navigate('/deletion',{state:{ postId } }); // 投稿消去画面に移動
  };

  const inputStyle = {
    fontFamily: 'CraftMincho, serif'
  };

  return (
    <div className={fontstyles.fontFamily}>
      <div className={styles.body}>
        <div className={styles.left}>
          <button className={styles.topButton} onClick={handleTop} style={inputStyle}>
            トップページへ戻る
          </button>
          <button className={styles.petButton} onClick={handlePet} style={inputStyle}>
            ペット情報変更
          </button>
          <button className={styles.nyakamaButton} onClick={handleNyakama} style={inputStyle}>
            Nyakama
          </button>
          <button className={styles.memberButton} onClick={handleMember} style={inputStyle}>
            会員情報選択
          </button>
          <div className={styles.inquiry}>
            問い合わせは<br />
            general@ml.kochi-tech.ac.jp<br />
            まで
          </div>
        </div>

        <div className={styles.center}>
          <div className={styles.title}>マイページ</div>
          <div className={styles.media}>
          {posts.map((post) => {
  // console.log(post); // 投稿の詳細を確認
  return (
    <div className={styles.white} key={post.id}>
      <div className={styles.post}>
        <div className={styles.picture}>
          <img src={post.postimage} alt="投稿画像" />
        </div>
        <div className={styles.info}>
          <button
            className={styles.eraseButton}
            onClick={() => handleErase(post.postId)}
            style={inputStyle}
          >
            投稿消去
          </button>
          <div className={styles.push}>
            <div className={styles.good}>いいね: {post.goodcount}</div>
            <div className={styles.money}>スパチャ</div>
          </div>
          <div className={styles.comment}>
            <p>{post.caption}</p>
          </div>
        </div>
      </div>
    </div>
  );
})}
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.advertisement}>
            <img
              src={MypageImg} // 広告サンプル
              alt="MypageImg" // 代替テキスト
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
