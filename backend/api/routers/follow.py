from fastapi import APIRouter, FastAPI, Depends, Path, HTTPException
import api.models.models as models
from fastapi.middleware.cors import CORSMiddleware
import api.cruds.follow as handle_db
import api.cruds.images as image_db
import api.schemas.follow as schema
import datetime

app = FastAPI()
router = APIRouter()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

## Follow & UnFollow
@router.post(path="/follow")
async def Follow(data: schema.FollowStatusRequest):
    followed = await handle_db.Followed(data.postid)
    check = await handle_db.GetConfirmConbination(data.userid, followed)
    if check == "None":
        result = await handle_db.Follow(data.userid, followed)
    elif check == -1:
        return -1
    else:
        result = await handle_db.ChangeFlag(data.userid, followed)
    return result

## Nyakama内でUnFollow
@router.post(path="/unfollow")
async def Follow(data: schema.FollowRequest):
    followed = await handle_db.Followed(data.followid)
    check = await handle_db.GetConfirmConbination(data.userid, followed)
    if check == "None":
        result = await handle_db.Follow(data.userid, followed)
    elif check == -1:
        return -1
    else:
        result = await handle_db.ChangeFlag(data.userid, followed)
    return result

## GetFollow フォローリストをとってくる
@router.get(path="/followlist")
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
