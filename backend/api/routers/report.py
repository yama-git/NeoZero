from fastapi import APIRouter, FastAPI, Depends, Path, HTTPException
import api.models.models as models
from fastapi.middleware.cors import CORSMiddleware
import api.cruds.report as handle_db
import api.cruds.images as image_db
import api.schemas.report as schema
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

## GetReport
@router.get(path="/report/get")
async def GetReport(user_id: str):
    result = await handle_db.GetReport(user_id)
    return result
    

## Insert&UpdateReport
@router.post(path="/report/count")
async def InsertUpdateReport(data: schema.ReportRequest):
    result = await GetReport(data.userid)
    if result == -1:
        return -1
    elif result == 0:
        result = await handle_db.InsertReport(data.userid)
    else:
        result = await handle_db.UpdateReport(data.userid)
    return result

## ExclusionViolationUser
@router.delete(path="/report/exclusive/{user_id}")
async def ExclusionViolationUser(user_id: str):
    result = handle_db.DeleteReport(user_id)
    return result

##　ReportPost
@router.get(path="/report/post")
async def ReportPost(postid: str):
    result = await handle_db.ReportPost(postid)
    return result
