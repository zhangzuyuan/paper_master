from sqlalchemy import String, Column, Unicode, LargeBinary

from main.db.session import Base


class ArticleBase(Base):
	# 表名
	__tablename__ = "article_base"

	# 表结构
	doi = Column(String(), primary_key=True)
	name = Column(String(255))
	time = Column(String(255))
	first_author = Column(String(255))
	second_author = Column(String(255))
	third_author = Column(String(255))
	corresponding_author = Column(String(255))
	provenance = Column(String(255))
	type = Column(String(255))
	file = Column(String(255))

	def to_dict(self):
		return {
			"doi": self.doi,
			"name": self.name,
			"time": self.time,
			"first_author": self.first_author,
			"second_author": self.second_author,
			"third_author": self.third_author,
			"corresponding_author": self.corresponding_author,
		}
