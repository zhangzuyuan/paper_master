from flask import Blueprint, request, jsonify, send_file
from flask_cors import cross_origin

from main.paper.service.Service import service

atricle_base_blue = Blueprint('ArticleBaseApi', __name__, url_prefix="/article_base")

print("atricle_base_blue")


@atricle_base_blue.route("/")
@cross_origin(supports_credentials=True)
def hello_word():
	return 'Hello Word!'


@atricle_base_blue.route("/article_information", methods=["POST"])
@cross_origin(supports_credentials=True)
def get_all_article_base_information():
	return service.article_base_service.get_all_article_base_information()


@atricle_base_blue.route("/article_information/<string:username>", methods=["POST"])
@cross_origin(supports_credentials=True)
def get_user_all_article_base_information(username):
	print("get_user_all_article_base_information")
	return service.article_base_service.get_user_all_article_base_information(username)


@atricle_base_blue.route("/add_article", methods=['POST'])
@cross_origin(supports_credentials=True)
def add_article():
	# 添加文章
	post = request.json
	return service.article_base_service.add_article_base(post)

@atricle_base_blue.route("/add_article_file", methods=['POST'])
@cross_origin(supports_credentials=True)
def add_article_file():
	post = request.files['file']
	service.article_base_service.add_article_file(post)
	return jsonify({"code": 2001, "msg": "用户名/doi/文章名称不能为空，请检查！！！"})

@atricle_base_blue.route("/article_file_show/<string:doi>", methods=['GET'])
@cross_origin(supports_credentials=True)
def show_paper(doi):
	file_name = service.article_base_service.show_paper(doi)
	return send_file(file_name)
