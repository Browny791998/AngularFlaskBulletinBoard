
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
         "address":fields.String(),
         "dob":fields.String(),
        #  "create_user_id":fields.Integer(required = True),
        #  "updated_user_id":fields.Integer(Required = True),
        #  "deleted_user_id":fields.Integer(),
        #  "created_at":fields.Date(required = True),
        #  "updated_at":fields.Date(required = True),
        #  "deleted_at":fields.Date()
           
          
        }
    )