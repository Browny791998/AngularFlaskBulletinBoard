
from enum import unique
from attr import field
from flask_sqlalchemy import SQLAlchemy
from marshmallow import Schema, fields, validate
from pkg_resources import require
from ..constant import common_constant

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(
        db.Integer, primary_key=True, unique=True, autoincrement=True
    )
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.String(100))
    profile_photo = db.Column(db.String(255), nullable=False)
    type = db.Column(db.String(1), nullable=False,default = "1")
    phone = db.Column(db.String(20),nullable=False)
    address = db.Column(db.String(255))
    dob = db.Column(db.Date())
    create_user_id = db.Column(db.Integer,nullable=False)
    updated_user_id = db.Column(db.Integer,nullable=False)
    deleted_user_id = db.Column(db.Integer)
    created_at = db.Column(db.Date(),nullable=False)
    updated_at = db.Column(db.Date(),nullable=False)
    deleted_at = db.Column(db.Date())


class UserSchema(Schema):
    id = fields.Integer()
    name  = fields.String(
        required=True,
        validate=validate.Length(min=1, error=common_constant.USER_NAME_ERR),
    )
    email = fields.String(
        required=True,
        validate=validate.Length(min=1, error=common_constant.USER_EMAIL_ERR),
    )
    password = fields.String(required=True)
    profile_photo = fields.String(
        required=True,
        validate=validate.Length(
            min=1, error=common_constant.USER_PROFILE_PHOTO_ERR
        ),
    )
    type = fields.String(
        required=True
    )
    phone = fields.String(required=True)
    address = fields.String()
    dob = fields.Date()
    # create_user_id = fields.Integer(
    #     required=True
    # )
    # updated_user_id =fields.Integer(
    #     required=True
    # )
    # deleted_user_id=fields.Integer()
    # created_at = fields.Date(
    #     required=True
    # )
    # updated_at = fields.Date(
    #     required=True
    # )
    # deleted_at = fields.Date()
    

    class Meta:
        fields=(
            "id",
            "name",
            "email",
            "password",
            "profile_photo",
            "type",
            "phone",
            "address",
            "dob",
            "create_user_id",
            "updated_user_id",
            "deleted_user_id",
            "created_at",
            "updated_at",
            "deleted_at"
        )

user_schema = UserSchema()
user_schema_list = UserSchema(many=True)


class Post(db.Model):
    id = db.Column(
        db.Integer,primary_key=True,unique=True,autoincrement = True
    )
    title = db.Column(db.String(255),nullable = False)
    description = db.Column(db.String(255),nullable = False)
    status = db.Column(db.Integer,nullable = False,default = 1)
    create_user_id = db.Column(db.Integer,nullable=False)
    updated_user_id = db.Column(db.Integer,nullable=False)
    deleted_user_id = db.Column(db.Integer)
    created_at = db.Column(db.Date(),nullable=False)
    updated_at = db.Column(db.Date(),nullable=False)
    deleted_at = db.Column(db.Date())

class PostSchema(Schema):

    id = fields.Integer()
    title = fields.String(
        required=True,
        validate=validate.Length(min=1, error=common_constant.POST_TITLE_ERR),
    )
    description = fields.String(
        required=True,
        validate=validate.Length(min=1, error=common_constant.POST_DESCRIPTION_ERR),
    )
    status = fields.Integer(required = True)
    
    class Meta:
        fields = (
            "id",
            "title",
            "description",
            "status",
            "create_user_id",
            "updated_user_id",
            "deleted_user_id",
            "created_at",
            "updated_at",
            "deleted_at"
        )

post_schema = PostSchema()
post_schema_list = PostSchema(many=True)










