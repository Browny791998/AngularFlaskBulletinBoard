from flask import Flask, redirect,render_template, request
from flask_restx import Api
from main.model.db_model import User,db
from sqlalchemy import event
from flask import current_app

from main.controller.user_controller import user_namespace
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




