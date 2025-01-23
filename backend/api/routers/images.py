from fastapi import APIRouter, FastAPI, Depends, Path, HTTPException, Query, UploadFile,File
import models.models as models
from fastapi.middleware.cors import CORSMiddleware
import cruds.images as image_db
import cruds.user_post as handle_db
import datetime

# aws s3　これもグローバルにしたい
import boto3
from botocore.exceptions import BotoCoreError, ClientError

# boto3の変数定義　これグローバル変数にしたい
BUCKET_NAME = "neozero"
REGION_NAME = "us-east-1"
s3_client = boto3.client(
    "s3", 
    region_name=REGION_NAME)


app = FastAPI()
router = APIRouter()

## ユーザーアイコンを返す
@router.get(path="/geticonimg/{user_id}")
async def GetUserIcon(user_id: str):
    user_icon = await image_db.GetIcon(user_id)
    # ユーザーアイコンが存在しない場合は処理が行われない
    if not user_icon is None:
        if user_icon.startswith('https://s3.amazonaws.com/'):
            # S3から画像を取得
            bucket_name = BUCKET_NAME  # 実際のバケット名
            file_key = user_icon.split('/')[-1]  # URLからファイル名を取得
            # # S3オブジェクトの取得
            try:
                s3_response = s3_client.get_object(Bucket=bucket_name, Key=file_key)
                image_data = s3_response['Body'].read()
                # バイナリから変換する　画像のデータをそのままフロントに返す
                base64_image_data = base64.b64encode(image_data).decode('utf-8')
            except ClientError as e:
                s3_response = -1
    # ユーザーアイコンが存在しない場合はNULLを返す
    return user_icon
