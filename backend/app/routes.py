from flask import request, make_response
from flask_login import current_user, login_required, logout_user, login_user
from sqlalchemy import desc

from . import app, db
from .models import Article, User, ArticleSchema, UserSchema


article_schema = ArticleSchema()
articles_schema = ArticleSchema(many=True)
user_schema = UserSchema()


@app.route("/", methods=["GET"])
@app.route("/articles", methods=["GET"])
def get_articles():
    articles = Article.query.order_by(desc(Article.date)).limit(10)
    response = articles_schema.jsonify(articles)
    response.headers["Access-Control-Allow-Origin"] = "*"

    return response


@app.route("/articles/add", methods=["POST"])
def add_article():
    author_name = request.form["user"]
    title = request.form["title"]
    text = request.form["text"]

    author = User.query.filter(User.username == author_name).first_or_404(f"No such user: {author_name}.")
    article = Article(author=author, title=title, text=text)
    try:
        db.session.add(article)
        db.session.commit()
    except:
        response = make_response("Error saving article.", 500)
        response.headers["Access-Control-Allow-Origin"] = "*"

        return response

    response = make_response("Article added successfully!", 201)
    response.headers["Access-Control-Allow-Origin"] = "*"

    return response


@app.route("/articles/<int:id>", methods=["DELETE"])
def delete_article(id):
    article = Article.query.get_or_404(id, "Article not found!")
    try:
        db.session.delete(article)
        db.session.commit()
    except:
        response = make_response("Error deleting article.", 500)
        response.headers["Access-Control-Allow-Origin"] = "*"

        return response

    response = make_response("Article successfully deleted!", 201)
    response.headers["Access-Control-Allow-Origin"] = "*"

    return response


@app.route("/articles/<int:id>", methods=["PUT"])
def update_article(id):
    article = Article.query.get_or_404(id)
    title = request.form["title"]
    content = request.form["content"]

    article.title = title
    article.content = content

    try:
        db.session.commit()
    except:
        response = make_response("Error updating article.", 500)
        response.headers["Access-Control-Allow-Origin"] = "*"

        return response

    response = make_response("Article successfully updated!", 201)
    response.headers["Access-Control-Allow-Origin"] = "*"

    return response


@app.route("/articles/<int:id>", methods=["GET"])
def get_article(id):
    article = Article.query.get_or_404(id, "Article not found!")
    response = make_response(article_schema.jsonify(article), 200)
    response.headers["Access-Control-Allow-Origin"] = "*"

    return response


@app.route("/register", methods=["GET", "POST"])
def register():
    if current_user.is_authenticated:
        return user_schema.jsonify(current_user)

    email = request.form["email"]
    username = request.form["username"]
    password = request.form["password"]

    user = User.query.filter(User.username == username).first()
    if user is not None:
        response = make_response("User already exists.", 409)
        response.headers["Access-Control-Allow-Origin"] = "*"

        return response

    user = User(email=email, username=username)
    user.set_password(password)

    try:
        db.session.add(user)
        db.session.commit()
    except:
        response = make_response("Error creating a user.", 500)
        response.headers["Access-Control-Allow-Origin"] = "*"

        return response

    response = make_response("User successfully created!", 200)
    response.headers["Access-Control-Allow-Origin"] = "*"

    return response


@app.route("/login", methods=["POST"])
def login():
    if current_user.is_authenticated:
        return current_user.username

    user = User.query.filter(User.username == request.form["username"]).first()
    if user and user.check_password(request.form["password"]):
        login_user(user, remember=True)
        response = make_response(user_schema.jsonify(user), 200)
        response.headers["Access-Control-Allow-Origin"] = "*"

        return response

    response = make_response("Invalid username or password!", 401)
    response.headers["Access-Control-Allow-Origin"] = "*"

    return response


@app.route("/logout")
@login_required
def logout():
    logout_user()
    response = make_response("Logged out.", 200)
    response.headers["Access-Control-Allow-Origin"] = "*"

    return response


@app.route("/is_logged_in")
def check_user_login():
    response = {
        "is_logged_in": current_user.is_authenticated,
        "username": current_user.username if current_user.is_authenticated else ""
    }
    response = make_response(response, 200)
    response.headers["Access-Control-Allow-Origin"] = "*"

    return response


@app.route("/user/<string:username>")
def get_user_articles(username):
    user = User.query.filter(User.username == username).first_or_404("User not found!")
    response = make_response(articles_schema.jsonify(user.articles), 200)
    response.headers["Access-Control-Allow-Origin"] = "*"

    return response
