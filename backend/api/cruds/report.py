import sys
import api.models.models as models
import api.db as databases

import datetime

sys.dont_write_bytecode = True


## GetReport
async def GetReport(user_id):
    session = databases.create_new_session()
    user_exists = session.query(models.User).\
                    filter(models.User.id == user_id).\
                    first()
    if user_exists == None:
        return -1
    report = session.query(models.Report).\
                filter(models.Report.user_id == user_id).\
                first()         
    if report == None:
        return 0
    return report.times, report.update_date_time


## InsertReport
async def InsertReport(user_id):
    session = databases.create_new_session()
    report = models.Report()
    report.times = 1
    report.update_date_time = datetime.datetime.now()
    report.user_id = user_id
    session.add(report)
    session.commit()
    return 0
    
    
## UpdateReport
async def UpdateReport(user_id):
    session = databases.create_new_session()
    report = session.query(models.Report).\
                filter(models.Report.user_id == user_id).\
                first()
    if report == None:
        return -1
    report.times += 1
    report.update_date_time = datetime.datetime.now()
    session.commit()
    return 0

    
## DeleteReport
def DeleteReport(user_id):
    session = databases.create_new_session()
    report = session.query(models.Report).\
                filter(models.Report.user_id == user_id).\
                first()
    if report == None:
        return -1
    session.delete(report)
    session.commit()
    return 0
    
## ReportPost
async def ReportPost(postid):
    session = databases.create_new_session()
    post = session.query(models.Post).\
                    filter(models.Post.id == postid).\
                    first()   
    user = session.query(models.User).\
                    filter(models.User.id == post.user_id).\
                    first()               
    if post == None:
        return -1
    else:
        return {
            "name": user.name,
            "comment": post.caption,
            "image": post.image
    }