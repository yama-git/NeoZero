from fastapi import APIRouter, FastAPI, Depends, Path, HTTPException
import api.models.models as models
from fastapi.middleware.cors import CORSMiddleware
import api.cruds.good as handle_db

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

## Good
@router.post(path="/post/good/")
async def Good(userid: str, postid: str):
    check = await handle_db.GetConfirmConbination(userid, postid)
    if check == "None":
        result = await handle_db.Good(userid, postid)
    elif check == -1:
        return -1
    else:
        result = await handle_db.ChangeFlag(userid, postid)
    return result