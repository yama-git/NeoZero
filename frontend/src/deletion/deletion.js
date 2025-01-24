//投稿消去画面
import React from 'react'; // React用
import fontstyles from '../font/font.module.css';
import { useNavigate } from 'react-router-dom'; // ページ遷移用
import { useLocation } from 'react-router-dom';
import styles from './deletion.module.css'; // CSSモジュール(cssファイルかく)
import Left2Img from '../image/Left2.png'; //259:550
import Right2Img from '../image/Right2.png'; //259:750

const Deletion = () => {
  //ここから下変える
  const location = useLocation();
  const { postId } = location.state || {}; // 状態から投稿IDを取得
  console.log("デリーとで受け取った",postId);
  const navigate = useNavigate(); // ページ遷移用

  const handletop = () => { //「トップページ」ボタン押下 
    navigate('/top'); // トップページに移動
  };
  const handledeletion = async () => {
    try {
      const response = await fetch(`https://neozero.metifie.com/post/delete?post_id=${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({post_id: postId }), //postIdを送信
      });

      if (response.ok) {
        console.log('投稿が削除されました');
        navigate('/mypage'); // マイページに移動
      } else {
        console.error('削除に失敗しました');
      }
    } catch (error) {
      console.error('エラー:', error);
    }
  };
  
  // const handledeletion = () => { //「消去」ボタン押下 
  //   navigate('/mypage'); // マイページに移動
  // };

  const inputStyle = {
    fontFamily: 'CraftMincho, serif'
  };


  return (
     <div className={fontstyles.fontFamily}>
    <div className={styles.body}>
      <div className={styles.left}>
        <button // 「トップページへ戻る」ボタン
          className={styles.button}
          onClick={handletop}
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
        <div className={styles.delete}>投稿を消去して<br />
          いいワン？
        </div>
        <button // 「トップページへ戻る」ボタン
          className={styles.ok}
          onClick={handledeletion}
          style={inputStyle}
        >
          消去
        </button>
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
};

export default Deletion;
