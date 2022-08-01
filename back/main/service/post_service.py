from asyncio.windows_events import NULL
from turtle import update
from xml.dom import NotFoundErr
from ..model.db_model import db,Post,post_schema,post_schema_list
from sqlalchemy import exc
from flask import jsonify
from ..constant import common_constant
import datetime


def validateGetValueWithSchema(getPostData):
    post_schema.load(
        {
            "title":getPostData["title"],
            "description":getPostData["description"],
            "status":getPostData["status"]
        }
    )

def savePost(potentialNewPost):

    validateGetValueWithSchema(potentialNewPost)

    savePost = Post(
        title = potentialNewPost["title"],
        description = potentialNewPost["description"],
        status = potentialNewPost["status"],
        create_user_id = 1,
        updated_user_id=1,
        deleted_user_id=1,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
        deleted_at=datetime.datetime.now(),
    )

    try:
        db.session.add(savePost)
        db.session.commit()
    except exc.IntegrityError:
        db.session.rollback()
    finally:
        db.session.close()


def getPostById(postId):
    post = post_schema.dump(
        Post.query.filter_by(id = postId).first()
    )
    return post


def getAllPost():
    postList = post_schema_list.dump(Post.query.all())
    return jsonify(postList)

def deleteById(deleteId):
    post = Post.query.get(deleteId)
    if not post:
        raise NotFoundErr(common_constant.POST_NOT_FOUND_ERR)
    db.session.delete(post)
    db.session.commit()

def modifyPost(updateId,updatePost):
    validateGetValueWithSchema(updatePost)

    post =Post.query.get(updateId)
    if not post:
        raise NotFoundErr(common_constant.POST_NOT_FOUND_ERR)
    post.title = (updatePost["title"],)
    post.description=(updatePost["description"],)
    post.status = (updatePost["status"],)
    updated_at=datetime.datetime.now(),

    try:
        db.session.commit()
    except exc.IntegrityError:
        db.session.rollback()
    finally:
        db.session.close()