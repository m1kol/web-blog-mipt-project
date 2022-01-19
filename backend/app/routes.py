from flask import request, make_response
from flask_login import current_user, login_required, logout_user, login_user

from . import app, db
from .models import Article, User, ArticleSchema, UserSchema


article_schema = ArticleSchema()
articles_schema = ArticleSchema(many=True)
user_schema = UserSchema(many=True)


@app.route("/", methods=["GET"])
@app.route("/articles", methods=["GET"])
def get_articles():
    articles = Article.query.order_by(Article.date).limit(10)

    return articles_schema.jsonify(articles)


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
        return make_response("Error saving article.", 500)

    return make_response("Article added successfully!", 201)


@app.route("/articles/<int:id>", methods=["DELETE"])
def delete_article(id):
    article = Article.query.get_or_404(id, "Article not found!")
    try:
        db.session.delete(article)
        db.session.commit()
    except:
        return make_response("Error deleting article!", 500)

    return make_response("Article successfully deleted!", 200)


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
        return make_response("Error updating article!", 500)

    return make_response("Article successfully updated!", 201)


@app.route("/articles/<int:id>", methods=["GET"])
def get_article(id):
    article = Article.query.get_or_404(id, "Article not found!")

    return article_schema.jsonify(article)


@app.route("/register", methods=["GET", "POST"])
def register():
    if current_user.is_authenticated:
        return user_schema.jsonify(current_user)

    user = User(email=request.form["email"], username=request.form["username"])
    user.set_password(request.form["password"])

    try:
        db.session.add(user)
        db.session.commit()
    except:
        return make_response("Error creating a user!", 500)

    return make_response("User successfully created!", 200)


@app.route("/login", methods=["GET", "POST"])
def login():
    if current_user.is_authenticated:
        return current_user.username

    user = User.query.filter(User.username == request.form["username"]).firts()
    if user and user.check_password(request.form["password"]):
        login_user(user, remember=True)
        return user_schema.jsonify(user)

    return make_response("Invalid username or password!", 401)


@app.route("/logout")
@login_required
def logout():
    logout_user()

    return make_response("Logged out.", 200)


@app.route("/is_logged_in")
def check_user_login():
    if current_user.is_authenticated:
        return current_user.username

    return False


@app.route("/user/<int:id>")
def get_user_articles(id):
    user = User.query.get(id)

    return articles_schema.jsonify(user.articles)
