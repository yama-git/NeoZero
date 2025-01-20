from typing import Optional
from pydantic import BaseModel, Field


class PostRequest(BaseModel):
    userid: str
    image: str
    title: str
    caption: str
    
    