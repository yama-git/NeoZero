from sqlalchemy import create_engine
import sys
from sqlalchemy.orm import (sessionmaker, scoped_session)

sys.dont_write_bytecode = True

#setting db connection
url = "mysql+pymysql://root:password@db:3306/fastapi?charset=utf8"
engine = create_engine(
    url,
    pool_size=10,         # プールのサイズを増やす
    max_overflow=20,      # プールのオーバーフロー数を増やす
    pool_timeout=30,      # タイムアウト時間を設定
    pool_recycle=1800     # 接続の再利用時間を設定
)
#create session
def create_new_session():
    return  scoped_session(sessionmaker(autocommit=False, autoflush=True, expire_on_commit=False, bind=engine))
