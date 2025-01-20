//Nyakama　(フォロー一覧)
import React from 'react'; // React用
import { useNavigate } from 'react-router-dom'; // ページ遷移用
import styles from './nyakama.module.css'; // CSSモジュール(cssファイルかく)
import fontstyles from '../font/font.module.css';
import samplePet1Img from '../image/samplePet1.png'; //259:550
import samplePet2Img from '../image/samplePet2.png'; //259:750

const Nyakama = () => {
  const navigate = useNavigate(); // ページ遷移用

  const handleTop = () => { // 「トップページに戻る」ボタン押下
    navigate('/top'); // トップページに移動
  };

  const handleRefollow = () => { // 「フォロー」ボタン押下
  };

  const handleUser = () => { // 「ユーザ名」ボタン押下
    navigate('/other_users'); // 他ユーザ投稿閲覧画面
  };

  const inputStyle = {
    fontFamily: 'CraftMincho, serif'
  };

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
              src={samplePet1Img} // 広告サンプル
              alt="samplePet1Img" // 代替テキスト
            />  
          </div>
        </div>

        <div className={styles.center}>
          <div className={styles.title}>Nyakama</div>
          <div className={styles.media}>


            <div className={styles.white}>
              <div className={styles.photo}>画像</div>
              <div className={styles.info}>
                <div className={styles.detail}>
                  <button // 「ユーザ名」ボタン
                    className={styles.name}
                    onClick={handleUser}
                    style={inputStyle}
                  >
                    はすざき
                  </button>
                  <button
                    className={styles.refollowButton}
                    onClick={handleRefollow}
                    style={inputStyle}
                  >
                    フォロー解除
                  </button>
                </div>
                <div className={styles.comment}>コメント</div>
              </div>
            </div>

            <div className={styles.white}>
              <div className={styles.photo}>画像</div>
              <div className={styles.info}>
                <div className={styles.detail}>
                <button // 「ユーザ名」ボタン
                    className={styles.name}
                    onClick={handleUser}
                    style={inputStyle}
                  >
                    こぎた
                  </button>
                  <button
                    className={styles.refollowButton}
                    onClick={handleRefollow}
                    style={inputStyle}
                  >
                    フォロー解除
                  </button>
                </div>
                <div className={styles.comment}>コメント</div>
              </div>
            </div>

            <div className={styles.white}>
              <div className={styles.photo}>画像</div>
              <div className={styles.info}>
                <div className={styles.detail}>
                <button // 「ユーザ名」ボタン
                    className={styles.name}
                    onClick={handleUser}
                    style={inputStyle}
                  >
                    といぷ
                  </button>
                  <button
                    className={styles.refollowButton}
                    onClick={handleRefollow}
                    style={inputStyle}
                  >
                    フォロー解除
                  </button>
                </div>
                <div className={styles.comment}>コメント</div>
              </div>
            </div>


          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.advertisement2}>
            <img
              src={samplePet2Img} // 広告サンプル
              alt="samplePet2Img" // 代替テキスト
            />  
          </div>
        </div>
      </div>
    </div>

  );
}
export default Nyakama;
