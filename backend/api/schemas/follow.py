from typing import Optional
from pydantic import BaseModel, Field


class FollowRequest(BaseModel):
    userid: str
    postid: str
    