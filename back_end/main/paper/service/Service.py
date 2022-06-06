from flask import jsonify, request

from main.paper.service.ArticleAnalyseService import ArticleAnalyseService
from main.paper.service.ArticleBaseService import ArticleBaseService
from main.paper.service.UserService import UserService


class Service:
	def __init__(self):
		self.user_service = UserService()

		self.article_base_service = ArticleBaseService()
		self.article_analyse_service = ArticleAnalyseService()
	# 	table_names = TABLE_NAMES
	# 	self.tables = {}
	# 	for name in table_names:
	# 		self.tables[name] = Table(name)
	#
	# 	# user
	# 	self.user_sign_up = user_sign_up()
	#
	# def select(self, post: dict):
	# 	table_name = post.get("table name")
	# 	columns = post.get("columns")
	# 	data = self.tables[table_name].select(columns)
	# 	print("获取信息 == >> {}".format(data))
	# 	return jsonify({"code": 0, "data": data, "msg": "查询成功"})
	#
	# def update(self):
	#
	# 	pass
	#
	# def insert(self):
	#
	# 	pass

	# def delete(self):
	# 	pass
	#
	# # user
	# def get_user_in()








service = Service()
