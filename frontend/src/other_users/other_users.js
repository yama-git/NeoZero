//�Ώۃ��[�U�̓��e���
import React, { useState, useEffect } from 'react'; // React�p
import { useNavigate, useParams } from 'react-router-dom'; // �y�[�W�J�ڗp
import styles from './other_users.module.css'; // CSS���W���[��
import fontstyles from '../font/font.module.css';
import Left2Img from '../image/Left2.png'; //259:550
import Right2Img from '../image/Right2.png'; //259:750


const OtherUsers = () => {
  const navigate = useNavigate(); // �y�[�W�J�ڗp
  const { id } = useParams(); // �p�����[�^�擾
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [, setError] = useState(null);
  
  // const getCookie = (name) => {
  //   const value = `; ${document.cookie}`;
  //   const parts = value.split(`; ${name}=`);
  //   if (parts.length === 2) return parts.pop().split(';').shift();
  //   return '';
  // };
  // const userid = getCookie('userid');

  const handleTop = () => { // �u�g�b�v�y�[�W�ɖ߂�v�{�^������
    navigate('/top'); // �g�b�v�y�[�W�Ɉړ�
  };
  // const handleFollow = () => { // �u�t�H���[�v�{�^������
  // };

  // const handleReport = () => { // �u�ʕ�v�{�^������
  //   navigate('/report_con'); 
  // };


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
          const response = await fetch(`https://neozero.metifie.com/post/get/${id}`);
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
    
    const handlead1 = () => {
      //�O���T�C�g�֔��(�V�����^�u��)
      //window.open('https://www.info.kochi-tech.ac.jp/faculty_members/profile_yoshida.shtml', '_blank', 'noopener noreferrer')
      window.open('https://anisupo.jimdofree.com/', '_blank', 'noopener noreferrer')
    };
  
    const handlead2 = () => {
      //�O���T�C�g�֔��(�V�����^�u��)
      //window.open('https://www.info.kochi-tech.ac.jp/faculty_members/profile_takeuchi.shtml', '_blank', 'noopener noreferrer')
      window.open('https://anisupo.jimdofree.com/', '_blank', 'noopener noreferrer')
    };
  return (
    <div className={fontstyles.fontFamily}>
      <div className={styles.body}>

      <div className={styles.left}>
        <button // �u�g�b�v�y�[�W�֖߂�v�{�^��
          className={styles.topButton}
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
            src={Left2Img} // �L���T���v��
            alt="Left2Img" // ��փe�L�X�g
          />
          </button>
        </div>
      </div>

      <div className={styles.center}>
      {isLoading ? (
            <div>読み込み中...</div> // ���[�f�B���O���̕\��
          ) : posts.length === 0 ? (
            <div>投稿がありません</div> // ���e���Ȃ��ꍇ�̕\��
          ) : (
            <>
        <div className={styles.title}>{posts[0].name}のページ</div>
          <div className={styles.media}>
            {posts.map((post) => (
              <div key={post.id} className={styles.white}>           
                <div className={styles.post}>
                  <div className={styles.picture}>{post.image}</div>
                  
                  <div className={styles.info}>                 
                    <div className={styles.comment}>{post.comment}ワン</div>
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
        <button
            className={styles.adbutton2}
              onClick={handlead2}
            >
          <img
            src={Right2Img} // �L���T���v��
            alt="Right2Img" // ��փe�L�X�g
          />
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}
export default OtherUsers;
