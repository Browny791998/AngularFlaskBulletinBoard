from flask import Flask, redirect,render_template, request
from flask_restx import Api
from main.model.db_model import User,db
from sqlalchemy import event
from flask import current_app

from main.controller.user_controller import user_namespace
from main.controller.post_controller import post_namespace
from flask import Blueprint
from flask_cors import CORS
from decouple import config



app = Flask(__name__)

CORS(app)


# Data Base
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = f"mysql://{config('DB_USER_NAME')}:{config('DB_PASSWORD')}@{config('DB_HOST')}/{config('DB_DATABASE_NAME')}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = config("SECRET_KEY")
db.init_app(app)

app.config["MAIL_SENDGRID_API_KEY"] = config("MAIL_SENDGRID_API_KEY")
app.config["MAIL_SENDER"] = config("MAIL_SENDER")

# Api
authorizations = {
    "api_key": {"type": "apiKey", "in": "header", "name": "x-access-token"}
}
blueprint = Blueprint("api", __name__)
api = Api(blueprint, authorizations=authorizations)

api.add_namespace(user_namespace)
api.add_namespace(post_namespace)




# # initilize data after table is created
@event.listens_for(User.__table__, "after_create")
def receive_after_create(target, connection, **kw):

    with app.app_context():
        # Recreate database each time for demo
        db.session.add(
            User(
                name="Ye Htet Aung",
                email="scm.yehtetaung@gmail.com",
                password="1234",
                profile_photo="",
                type="0",
                phone="123123",
                address="Yangon",
                dob="2022-01-17",
                create_user_id=1,
                updated_user_id=1,
                deleted_user_id=1,
                created_at="2016-03-13 02:32:21",
                updated_at="2016-03-13 02:32:21",
                deleted_at="2016-03-13 02:32:21"
            )
        )
        db.session.commit()