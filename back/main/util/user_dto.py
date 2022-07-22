from attr import field
from flask_restx import Namespace,fields

class UserDto:
    
    user_namespace = Namespace(name = "user",path="/user")

    user = user_namespace.model(
        "Users",
        {
         "name":fields.String(required = True),
         "email":fields.String(required = True),
         "password":fields.String(required = True),
         "profile_photo": fields.String(required = True),
         "type": fields.String(required = True),
         "phone":fields.String(required=True),
         
        }
    )