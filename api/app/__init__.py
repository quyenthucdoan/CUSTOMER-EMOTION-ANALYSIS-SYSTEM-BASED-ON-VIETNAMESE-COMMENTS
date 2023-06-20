from flask import Flask, render_template, request, g
from flask import jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_user import current_user, login_required, roles_required, UserManager, UserMixin


# database_uri = 'postgresql://{dbuser}:{dbpass}@{dbhost}/{dbname}'.format(
#     dbuser='csm',
#     dbpass='csm2@21',
#     dbhost='51.15.59.131',
#     dbname= 'CSM'
# )

database_uri = 'postgresql://{dbuser}:{dbpass}@{dbhost}/{dbname}'.format(
    dbuser='postgres',
    dbpass='111',
    dbhost='localhost',
    dbname='analysis'
)

# Class-based application configuration

UPLOAD_FOLDER = "./static/avatar/"
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif','json'}


class ConfigClass(object):
    """ Flask application config """

    # Flask settings
    SECRET_KEY = 'This is an INSECURE secret!! DO NOT use this in production!!'

    # Flask-SQLAlchemy settings
    # 'sqlite:///basic_app.sqlite'    # File-based SQL database
    SQLALCHEMY_DATABASE_URI = database_uri
    SQLALCHEMY_TRACK_MODIFICATIONS = True    # Avoids SQLAlchemy warning

    # Shown in and email templates and page footers
    USER_APP_NAME = "Flask-User QuickStart App"
    USER_ENABLE_EMAIL = False      # Disable email authentication
    USER_ENABLE_USERNAME = True    # Enable username authentication
    USER_REQUIRE_RETYPE_PASSWORD = True    # Simplify register form

    UPLOAD_FOLDER = UPLOAD_FOLDER
    JSON_AS_ASCII = False


app = Flask(__name__,static_folder="../static")
# app.config.update(
#     SQLALCHEMY_DATABASE_URI=database_uri,
#     SQLALCHEMY_TRACK_MODIFICATIONS=False,
#     PRODUCTION=False,
#     SQLALCHEMY_POOL_SIZE=30,
# )

app.config.from_object(__name__+'.ConfigClass')


# app.config['JSON_AS_ASCII'] = False
# app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

### QUEUE POOL ERROR POSSIBLE SOLUTIONS ###
app.config['SQLALCHEMY_POOL_SIZE'] = 200
app.config['PRESERVE_CONTEXT_ON_EXCEPTION'] = False
### QUEUE POOL ERROR POSSIBLE SOLUTIONS ###

db = SQLAlchemy(app)

@app.teardown_appcontext
def shutdown_session(exception=None):
    db.session.close()

# from app import models
# user_manager = UserManager(app, db, models.User)
# # models.db.create_all()
