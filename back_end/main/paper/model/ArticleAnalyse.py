from sqlalchemy import Column, String, ForeignKey

from main.db.session import Base
from main.paper.model.ArticleBase import ArticleBase


class ArticleAnalyse(Base):
	# 表名
	__tablename__ = "article_analyse"

	# 表结构
	username = Column(String(), primary_key=True)
	doi = Column(String(),ForeignKey(ArticleBase.doi))
	# name = Column(String(255))
	field = Column(String(255))
	problem = Column(String(255))
	solution = Column(String(255))

	def to_dict(self):
		return {
			"username": self.username,
			"doi": self.doi,
			"field": self.field,
			"problem": self.problem,
			"solution": self.solution
		}
