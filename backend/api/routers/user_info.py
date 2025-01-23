from fastapi import APIRouter, FastAPI, Depends, Path, HTTPException, Query, Response
import api.models.models as models
from fastapi.middleware.cors import CORSMiddleware
import api.cruds.user_info as handle_db
import api.schemas.user_info as schema
import datetime
import uuid

app = FastAPI()
router = APIRouter()
app.include_router(router)



## UserRegister
@router.post(path="/userinfo/account/register")
async def UserRegister(data: schema.UserRegisterRequest):
    ## GetCheckEmailDuplication
    result = await handle_db.GetCheckEmailDuplication(data.email)
    if result == 0:
        result = await handle_db.UserRegister(data.name, data.email, data.password, data.comment)
        if result == 0:
            return 0
    return -1

## UserLogin
@router.post(path="/userinfo/account/login")
async def UserLogin(data: schema.UserLoginRequest):
    result = await handle_db.GetConfirmConbination(data.email, data.password)
    return result
    
## GetPetInfo
@router.get(path="/userinfo/info/pet")
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
async def ChangeUserEmail(request: schema.EmailChangeRequest):
    result = await handle_db.GetConfirmConbination(request.email, request.password) 
    if result == -1:
        return result
    result = await handle_db.GetCheckEmailDuplication(request.new_email)
    if result == -1:
        return result
    # メールアドレス更新
    result = await handle_db.ChangeUserEmail(request.userid, request.new_email)
    return result
    
## ChangeUserPass
@router.put(path="/userinfo/pass/change")
async def ChangeUserPass(request: schema.PassChangeRequest):
    ## GetConfirmConbination
    result = await handle_db.GetConfirmConbination(request.email, request.password)
    if result == -1:
        return result
    # パスワード更新
    result = await handle_db.ChangeUserPass(request.userid, request.new_pass)
    return result
            
## ChangePetInfo
@router.put(path="/userinfo/info/change}")
async def ChangePetInfo(user_id: str, user_name: str = Query(None), user_comment: str = Query(None)):
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

