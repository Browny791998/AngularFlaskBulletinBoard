from flask_restx import Namespace,fields
from pkg_resources import require

class PostDto:

    post_namespace = Namespace(name="post",path="/post")

    post = post_namespace.model(
        "Posts",
        {
            "title":fields.String(required=True),
            "description":fields.String(required=True),
            "status":fields.Integer(required=True),
        }
    )