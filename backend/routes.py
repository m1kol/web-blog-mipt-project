from flask import request, redirect
from flask_login import current_user, login_required, logout_user, login_user

from core import app, db
from models import Article, User, article_schema, articles_schema, user_schema


@app.route("/", methods=["GET"])
@app.route("/articles", methods=["GET"])
def get_all_articles():
    all_articles = Article.query.all()

    return articles_schema.jsonify(all_articles)


@app.route("/articles/add", methods=["POST"])
def add_article():
    author = request.json["author"]
    title = request.json["title"]
    content = request.json["content"]

    article = Article(author=author, title=title, content=content)
    db.session.add(article)
    db.session.commit()

    return article_schema.jsonify(article)


@app.route("/articles/<int:id>", methods=["DELETE"])
def delete_article(id):
    article = Article.query.get(id)
    db.session.delete(article)
    db.session.commit()

    return 200


@app.route("/articles/<int:id>", methods=["PUT"])
def update_article(id):
    article = Article.query.get(id)
    title = request.json["title"]
    content = request.json["content"]

    article.title = title
    article.content = content

    db.session.commit()

    return article_schema.jsonify(article)


@app.route("/articles/<int:id>", methods=["GET"])
def get_article(id):
    article = Article.query.get(id)

    return article_schema.jsonify(article)


@app.route("/login", methods=["GET", "POST"])
def login():
    if current_user.is_authenticatec:
        return user_schema.jsonify(current_user)

    user = User.query.filter(username=request.json["username"]).first()
    if user and user.check_password(request.json["password"]):
        login_user(user, remember=request.json["remember"])
        return user_schema.jsonify(user)

    return "Could not login user"


@app.route("/logout")
@login_required
def logout():
    logout_user()

    return redirect("/")


@app.route("/user/<int:id>")
def user_profile(id):
    user = User.query.get(id)

    return user_schema.jsonify(user)
