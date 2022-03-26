# from app import db
# from sqlalchemy import Date
# from dataclasses import dataclass, field
# from datetime import datetime
# from flask_user import UserMixin

# @dataclass
# class Tweet(db.Model):
#     __tabel__name = 'tweet'
#     id: int
#     comment: str
#     tweet_date: str
#     tweet_id: str
#     vader_sentiment: int

#     id = db.Column(db.Integer, primary_key=True)
#     comment = db.Column(db.Text)
#     tweet_date = db.Column(db.Text)
#     tweet_id = db.Column(db.Text, unique=True)
#     vader_sentiment = db.Column(db.Integer)

# @dataclass
# class Ratemds(db.Model):
#     __tabel__name = 'ratemds'
#     id: int
#     doctor_name: str
#     review_text: str
#     review_date: str
#     sentiment: int

#     id = db.Column(db.Integer, primary_key=True)
#     doctor_name = db.Column(db.Text)
#     review_text = db.Column(db.Text)
#     review_date = db.Column(db.Text)
#     sentiment = db.Column(db.Integer)

# @dataclass
# class User(db.Model, UserMixin):
#     __tablename__ = 'users'
#     id : int
#     active : bool
#     email : str
#     username : str 
#     password: str

#     id = db.Column(db.Integer, primary_key=True)
#     active = db.Column('is_active', db.Boolean(), nullable=False, server_default='1')
#     email = db.Column(db.String(255), unique=True)
#     username = db.Column(db.String(50), unique=True)
#     password = db.Column(db.String(255), nullable=False, server_default='')