from flask import Blueprint, request
from flask_cors import cross_origin

from main.paper.service.Service import service

atricle_analyse_blue = Blueprint('ArticleAnalyseApi', __name__, url_prefix="/article_analyse")


@atricle_analyse_blue.route("/")
@cross_origin(supports_credentials=True)
def hello_word():
	return 'Hello Word!'


@atricle_analyse_blue.route("/upload_article", methods=['POST'])
@cross_origin(supports_credentials=True)
def upload_atricle():
	post = request.json
	return service.article_analyse_service.add_article_analyse(post)


@atricle_analyse_blue.route("/analyse_article/<string:username>", methods=['POST'])
@cross_origin(supports_credentials=True)
def get_all_article_analyse_information(username):
	post = request.json
	return service.article_analyse_service.get_all_article_analyse_information(username, post)
