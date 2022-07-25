from asyncio.windows_events import NULL
from collections import UserList
import email
from msilib.schema import Error
from multiprocessing.sharedctypes import Value
from xml.dom import NotFoundErr
from ..model.db_model import db,User,user_schema,user_schema_list
from sqlalchemy import exc
from flask import jsonify
from ..constant import common_constant
import datetime


def validateGetValueWithSchema(getUserData):

    user_schema.load(
        {
            "name":getUserData["name"],
            "email":getUserData["email"],
            "password": getUserData["password"],
            "profile_photo": getUserData["profile_photo"],
            "type":getUserData["type"],
            "phone":getUserData["phone"],
            "address": getUserData["address"],
            "dob": getUserData["dob"],
            # "create_user_id": getUserData["create_user_id"],
            # "updated_user_id": getUserData["updated_user_id"],
            # "deleted_user_id": getUserData["deleted_user_id"],
            # "created_at": getUserData["created_at"],
            # "updated_at": getUserData["updated_at"],
            # "deleted_at": getUserData["deleted_at"],
        }
    )

def saveUser(potentialNewUser):
    validateGetValueWithSchema(potentialNewUser)

    saveUser = User(
        name = potentialNewUser["name"],
        email = potentialNewUser["email"],
        password = potentialNewUser["password"],
        profile_photo=potentialNewUser["profile_photo"],
        type = potentialNewUser["type"],
        phone = potentialNewUser["phone"],
        address = potentialNewUser["address"],
        dob = potentialNewUser["dob"],
        create_user_id = 1,
        updated_user_id=1,
        deleted_user_id=1,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
        deleted_at=datetime.datetime.now(),
    )

    try:
        db.session.add(saveUser)
        db.session.commit()
    except exc.IntegrityError:
        db.session.rollback()
        raise ValueError(common_constant.EMAIL_TAKEN_ERR)
    finally:
        db.session.close()



def getAllUser():
    userList = user_schema_list.dump(User.query.all())
    for user in userList:
        del user["password"]
    return jsonify(userList)

def getUserById(userId):
    user = user_schema.dump(
        User.query.filter_by(id = userId).first()
    )
    return user


def deleteById(deleteId):
    user = User.query.get(deleteId)
    if not user:
        raise NotFoundErr(common_constant.USER_NOT_FOUND_ERR)
    db.session.delete(user)
    db.session.commit()

def modifyUser(updateId,updateUser):
    validateGetValueWithSchema(updateUser)

    user = User.query.get(updateId)
    if not user:
        raise NotFoundErr(common_constant.USER_NOT_FOUND_ERR)
    user.name = (updateUser["name"],)
    user.email = (updateUser["email"],)
    user.password = (updateUser["password"],)
    user.profile_photo=(updateUser["profile_photo"],)
    user.type = (updateUser["type"],)
    user.phone = (updateUser["phone"],)
    user.address = (updateUser["address"],)
    user.dob = (updateUser["dob"],)
    updated_at=datetime.datetime.now(),

    try:
        db.session.commit()
    except exc.IntegrityError:
        db.session.rollback()
        raise ValueError(common_constant.EMAIL_TAKEN_ERR)
    finally:
        db.session.close()
