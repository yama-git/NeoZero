from typing import Optional
from pydantic import BaseModel, Field


class GoodRequest(BaseModel):
    userid: str
    postid: str
    