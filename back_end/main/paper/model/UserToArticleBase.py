from sqlalchemy import Column, String

from main.db.session import Base


class UserToArticleBase(Base):
	# 表名
	__tablename__ = "user_to_article_base"

	# 表结构
	username = Column(String(20))
	doi = Column(String(255), primary_key=True)

	def to_dict(self):
		return {
			"username": self.username,
			"doi": self.doi
		}
