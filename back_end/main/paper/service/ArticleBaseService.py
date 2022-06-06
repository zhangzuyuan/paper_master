import os

from flask import jsonify
from werkzeug.utils import secure_filename

from main.db.session import DBSession
from main.paper.model.ArticleBase import ArticleBase
from main.paper.model.UserToArticleBase import UserToArticleBase


class ArticleBaseService:
	def __init__(self):
		self.article_file_flag = 0
		pass

	def get_all_article_base_information(self):
		# 获取所有信息
		session = DBSession()
		articles = session.query(ArticleBase).all()
		data = []
		for i in range(len(articles)):
			data.append(articles[i].to_dict())
		print("获取信息 == >> {}".format(data))
		session.close()
		return jsonify({"code": 0, "data": data, "msg": "查询成功"})

	def get_user_all_article_base_information(self, username):
		# 获取某个用户的读的文章信息
		session = DBSession()
		articles = session.query(UserToArticleBase, ArticleBase).join(UserToArticleBase,
		                                                              UserToArticleBase.doi == ArticleBase.doi).filter(
			UserToArticleBase.username == username).all()
		data = []
		print(articles[0].keys())
		# print(articles[0],articles[1])
		for article in articles:
			tmp_data = {
				"doi": article.UserToArticleBase.doi,
				"name": article.ArticleBase.name,
				"time": article.ArticleBase.time,
				"first_author": article.ArticleBase.first_author,
				"second_author": article.ArticleBase.second_author,
				"third_author": article.ArticleBase.third_author,
				"corresponding_author": article.ArticleBase.corresponding_author
			}
			data.append(tmp_data)
		print("获取信息 == >> {}".format(data))
		session.close()
		return jsonify({"code": 0, "data": data, "msg": "查询成功"})

	def add_article_base(self, post: dict):
		session = DBSession()
		username = post.get("username", "").strip()  # 用户名
		doi = post.get("doi", "").strip()  # 文章doi
		name = post.get("name", "").strip()  # 文章名称
		time = post.get("time", "").strip()  # 文章发表时间
		first_author = post.get("first_author", "").strip()
		second_author = post.get("second_author", "").strip()
		third_author = post.get("third_author", "").strip()
		corresponding_author = post.get("corresponding_author", "").strip()
		provenance = post.get("provenance", "").strip()
		type = post.get("type", "").strip()
		# file = post.get("file","").strip()
		# print(file)
		if username and doi and name:
			tmp = session.query(UserToArticleBase).filter(UserToArticleBase.doi == doi).all()
			if len(tmp) != 0:
				session.close()
				return jsonify({"code": 2002, "msg": "文章已经存在，添加失败！！！"})
			elif self.article_file_flag == 0:
				session.add(UserToArticleBase(username=username, doi=doi))
				session.add(
					ArticleBase(doi=doi, name=name, time=time, first_author=first_author, second_author=second_author,
					            third_author=third_author, corresponding_author=corresponding_author,
					            provenance=provenance, type=type))
				session.commit()
				session.close()
				return jsonify({"code": 0, "msg": "恭喜，添加成功！"})
			elif self.article_file_flag:
				session.add(UserToArticleBase(username=username, doi=doi))
				session.add(
					ArticleBase(doi=doi, name=name, time=time, first_author=first_author, second_author=second_author,
					            third_author=third_author, corresponding_author=corresponding_author,
					            provenance=provenance, type=type, file=self.file_path))
				session.commit()
				session.close()
				self.article_file_flag = 0
				return jsonify({"code": 0, "msg": "恭喜，添加成功！"})
		else:
			session.close()
			return jsonify({"code": 2001, "msg": "用户名/doi/文章名称不能为空，请检查！！！"})

	def add_article_file(self, post):
		self.article_file_flag = 1
		self.file = post
		# basepath = os.path.dirname(__file__)  # 当前文件所在路径
		basepath = os.getcwd()
		path = os.path.join(basepath, 'file/paper',
		                           secure_filename(self.file.filename))  # 注意：没有的文件夹一定要先创建，不然会提示没有该路径
		self.file_path = path
		self.file.save(path)
		pass

	def show_paper(self,doi):
		session = DBSession()
		article = session.query(ArticleBase).filter(ArticleBase.doi == doi).all()
		return article[0].file

