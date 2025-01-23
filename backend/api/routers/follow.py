from fastapi import APIRouter, FastAPI, Depends, Path, HTTPException
import models.models as models
from fastapi.middleware.cors import CORSMiddleware
import cruds.follow as handle_db
import cruds.images as image_db
import schemas.follow as schema
import datetime

app = FastAPI()
router = APIRouter()


## Follow & UnFollow
@router.post(path="/follow")
async def Follow(following: str, followed: str):
    check = await handle_db.GetConfirmConbination(following, followed)
    if check == "None":
        result = await handle_db.Follow(following, followed)
    elif check == -1:
        return -1
    else:
        result = await handle_db.ChangeFlag(following, followed)
    return result

## GetFollow フォローリストをとってくる
@router.get(path="/follow/{user_id}")
async def GetFollow(user_id: str):
    result = await handle_db.GetFollow(user_id)
    if result == -1:
        return -1
    # GetIconを呼び出す
    # result = await handle_db.GetIcon(user_id)
    return result
    
## FollowStatus
@router.get(path="/post/followstatus/{userid}/{postId}")
async def FollowStatus(userid: str, postId: str):
    followed = await handle_db.Followed(postId)
    result = await handle_db.FollowStatus(userid, followed)
    return result
