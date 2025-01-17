from fastapi import APIRouter, FastAPI, Depends, Path, HTTPException, Query, Response
import api.models.models as models
from fastapi.middleware.cors import CORSMiddleware
import api.cruds.user_info as handle_db
import api.cruds.images as image_db
import datetime
import uuid
from pydantic import BaseModel

app = FastAPI()
router = APIRouter()
app.include_router(router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # フロントエンドのオリジン
    allow_credentials=True,                    # credentialsを許可
    allow_methods=["*"],                       # 全HTTPメソッドを許可
    allow_headers=["*"],                       # 全ヘッダーを許可
)

class UserLoginRequest(BaseModel):
    email: str
    password: str
    
class UserRegisterRequest(UserLoginRequest):
    name: str
    comment: str

## UserRegister
@router.post(path="/userinfo/account/register")
async def UserRegister(data: UserLoginRequest):
    ## GetCheckEmailDuplication
    result = await handle_db.GetCheckEmailDuplication(data.email)
    if result == 0:
        result = await handle_db.UserRegister(data.name, data.email, data.password, data.comment)
        if result == 0:
            return 0
        else:
            return -1

## UserLogin
@router.post(path="/userinfo/account/login")
async def UserLogin(data: UserLoginRequest):
    result = await handle_db.GetConfirmConbination(data.email, data.password)
    return result


## GetConfirmChangeUserEmail　関数内で呼び出されるだけなのでフロントでは使われない
@router.get(path="/userinfo/email/{user_id}")
async def GetConfirmChangeUserEmail(user_id: str, user_email: str, new_user_email: str, user_password: str):
    ## GetCheckConbination
    result = await handle_db.GetConfirmConbination(user_email, user_password) 
    if result == -1:
        return result
    ## GetCheckEmailDuplication
    result = await handle_db.GetCheckEmailDuplication(new_user_email)
    return result
    
## GetPetInfo
@router.get(path="/userinfo/info/{user_id}")
async def GetPetInfo(user_id: str):
    result = handle_db.GetPetInfo(user_id)
    ###########
    if result == -1:
        return -1
    else:
        return {
            "name": result[0],
            "comment": result[1],
    }
    ###########
    # 成功していればGetIconを呼び出す
    # if result == -1:
    #     return -1
    # else:
    #     data = result
    #     icon = image_db.GetIcon(user_id)
    #     if icon == -1:
    #         return -1
    #     else:
    #         return {
    #             "name": data[0],
    #             "comment": data[1],
    #             "icon": icon
    #         }
    
## ChangeUserEmail
@router.put(path="/userinfo/email/change")
async def ChangeUserEmail(user_id: str, user_email: str, new_user_email: str, user_password: str):
    ## GetConfirmChangeUserEmail
    result = await GetConfirmChangeUserEmail(user_id, user_email, new_user_email, user_password)
    if result == -1:
        return result
    # メールアドレス更新
    result = await handle_db.ChangeUserEmail(user_id, new_user_email)
    return result
    
## ChangeUserPass
@router.put(path="/userinfo/pass/change")
async def ChangeUserPass(user_id: str, user_email: str, user_password: str, new_user_password: str):
    ## GetConfirmConbination
    result = await handle_db.GetConfirmConbination(user_email, user_password)
    if result == -1:
        return result
    # パスワード更新
    result = await handle_db.ChangeUserPass(user_id, new_user_password)
    return result
            
## ChangePetInfo
@router.put(path="/userinfo/info/change/{user_id}")
async def ChangePetInfo(user_id: str, user_name: str = Query(None), user_comment: str = Query(None), user_icon: str = Query(None)):
    result = handle_db.ChangePetInfo(user_id, user_name, user_comment)
    #####
    return result
    #####
    # 成功したらChangeIconも
    # if result == -1:
    #     return result
    # icon = image_db.ChangeIcon(user_id, user_icon)
    # return result  

## DeleteUserAccount
@router.delete(path="/userinfo/account/delete/{user_id}")
async def DeleteUserAccount(user_id: str, user_email: str, user_password: str):
    ## GetConfirmConbination
    result = await handle_db.GetConfirmConbination(user_email, user_password)
    if result == -1:
        return result
    # DeleteIconを呼び出す
    result = await handle_db.DeleteIcon(user_id)
    if result == -1:
        return result
    result = await handle_db.DeleteUserAccount(user_id)
    return result
   

## 確認用select user list
# @router.get(path="/user_info/api/users")
# async def get_list_user():
#     result = handle_db.select_all_user()
#     return {
#         "status": "OK",
#         "data": result
#     }

