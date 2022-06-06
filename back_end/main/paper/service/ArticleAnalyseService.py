from flask import jsonify
from sqlalchemy import and_

from main.db.session import DBSession
from main.paper.model.ArticleAnalyse import ArticleAnalyse
from main.paper.model.ArticleBase import ArticleBase
from main.paper.model.Conference import Conference
from main.paper.model.Journal import Journal
from main.paper.model.UserToArticleBase import UserToArticleBase
from main.paper.service.statistical.StatisticalSurveyPaper import StatisticalSurveyPaper, Solution


class ArticleAnalyseService:
	def __init__(self):
		pass

	def add_article_analyse(self, post: dict):
		session = DBSession()
		username = post.get("username", "").strip()  # 用户名
		doi = post.get("doi", "").strip()  # 文章doi
		name = post.get("name", "").strip()  # 文章名称
		field = post.get("field", "").strip()  # 领域
		problem = post.get("problem", "").strip()  # 问题
		solution = post.get("solution", "").strip()  # 解决方法
		if username and doi and name:
			tmp_base = session.query(UserToArticleBase).filter(UserToArticleBase.username == username,
			                                                   UserToArticleBase.doi == doi).all()
			tmp_analyse = session.query(ArticleAnalyse).filter(ArticleAnalyse.username == username,
			                                                   ArticleAnalyse.doi == doi).all()
			flag = 0

			if len(tmp_base) == 0:
				session.add(UserToArticleBase(username=username, doi=doi))
				session.commit()
			# session.close()
			# return jsonify({"code": 2002, "msg": "文章已经存在，添加失败！！！"})
			else:
				flag = 1
			if len(tmp_analyse) == 0:
				session.add(
					ArticleAnalyse(username=username, doi=doi, field=field, problem=problem,
					               solution=solution))
				session.commit()
				session.close()
				return jsonify({"code": 0, "msg": "恭喜，添加成功！"})
			else:
				return jsonify({"code": 0, "msg": "添加失败"})
		else:
			session.close()
			return jsonify({"code": 2001, "msg": "用户名/doi/文章名称不能为空，请检查！！！"})

	def get_all_article_analyse_information(self, username, post: dict):
		session = DBSession()
		field = post.get("field", "").strip()  # 领域
		print(username)
		# articles = session.query(ArticleAnalyse, ArticleBase).join(ArticleAnalyse,
		#                                                            ArticleAnalyse.doi == ArticleBase.doi).filter(
		# 	and_(ArticleAnalyse.username == username, ArticleAnalyse.field == field)).all()
		articles = session.query(ArticleBase.doi, ArticleBase.time, ArticleBase.type, ArticleBase.provenance,
		                         ArticleAnalyse.field, ArticleAnalyse.problem, ArticleAnalyse.solution).join(
			ArticleAnalyse,
			ArticleAnalyse.doi == ArticleBase.doi).filter(
			and_(ArticleAnalyse.username == username, ArticleAnalyse.field == field)).all()
		print(str(session.query(ArticleAnalyse, ArticleBase).join(ArticleBase,
		                                                           ArticleAnalyse.doi == ArticleBase.doi).filter(
			and_(ArticleAnalyse.username == username, ArticleAnalyse.field == field))))
		# articles = session.query(ArticleAnalyse, ArticleBase).filter(ArticleAnalyse.username == username).filter(
		#                                                              ArticleAnalyse.field == field).filter(
		#                                                              ArticleAnalyse.doi == ArticleBase.doi).all()

		# articles = session.query(UserToArticleBase).join(ArticleBase, UserToArticleBase.doi == ArticleBase.doi).join(
		# 	ArticleAnalyse, ArticleAnalyse.username == UserToArticleBase.username,
		# 	                ArticleAnalyse.doi == ArticleBase.doi).filter(
		# 	ArticleAnalyse.field == field
		# ).all()

		data = {
			"field": field,
			"num": 0,
			"problem": {},
			"level": {
				"A": 0,
				"B": 0,
				"C": 0
			},
			"time": []
		}
		problems = {}
		times = {}
		print(articles)
		for article in articles:
			print(article.doi)
			if article.type == "conference":
				tmp = session.query(Conference).filter(article.provenance == Conference.short_name).first()
			elif article.type == "journal":
				# print(article.ArticleBase.provenance)
				tmp = session.query(Journal).filter(article.provenance == Journal.short_name).first()

			# field
			if article.time not in times.keys():
				times[article.time] = 0
			times[article.time] += 1
			# problem
			print(article.problem)
			if article.problem not in problems.keys():
				problems[article.problem] = StatisticalSurveyPaper()
				data["num"] += 1

			problems[article.problem].level[tmp.level] += 1

			if article.time not in problems[article.problem].times.keys():
				problems[article.problem].times[article.time] = 0
			problems[article.problem].times[article.time] += 1

			# solution
			if article.solution not in problems[article.problem].solutions.keys():
				problems[article.problem].solutions[article.solution] = Solution()
			problems[article.problem].solutions[article.solution].level[tmp.level] += 1

			if article.time not in problems[article.problem].solutions[
				article.solution].times.keys():
				problems[article.problem].solutions[article.solution].times[
					article.time] = 0
			problems[article.problem].solutions[article.solution].times[
				article.time] += 1

		for key, time in times.items():
			data["time"].append({"value": [key, time]})

		print(problems)
		for key, problem in problems.items():
			if key not in data["problem"].keys():
				data["problem"][key] = {
					"level": {
						"A": 0,
						"B": 0,
						"C": 0
					},
					"time": [],
					"solution": {},
				}
			for key_level, level in problem.level.items():
				data["level"][key_level] += level
				data["problem"][key]["level"][key_level] = level
			for key_time, time in problem.times.items():
				data["problem"][key]["time"].append({"value": [key_time, time]})

			for key_solution, solution in problem.solutions.items():
				print(key_solution)
				if key_solution not in data["problem"][key]["solution"].keys():
					data["problem"][key]["solution"][key_solution] = {
						"level": {
							"A": 0,
							"B": 0,
							"C": 0
						},
						"time": [],
					}

				for key_level, level in solution.level.items():
					data["problem"][key]["solution"][key_solution]["level"][key_level] = level
				for key_time, time in solution.times.items():
					data["problem"][key]["solution"][key_solution]["time"].append({"value": [key_time, time]})

		print("文章信息 == >> {}".format(data))
		session.close()
		return jsonify({"code": 0, "data": data, "msg": "查询成功"})
