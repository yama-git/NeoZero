from typing import Optional
from pydantic import BaseModel, Field


class UserLoginRequest(BaseModel):
    email: str
    password: str
    
class UserRegisterRequest(UserLoginRequest):
    name: str
    comment: str

class EmailChangeRequest(UserLoginRequest):
    userid: str
    new_email: str
    
class PassChangeRequest(UserLoginRequest):
    userid: str
    new_pass: str