from sqlalchemy import Column, String

from main.db.session import Base


class Journal(Base):
	# 表名
	__tablename__ = "journal"

	# 表结构
	id = Column(String(), primary_key=True)
	name = Column(String())
	short_name = Column(String())
	level = Column(String())
	impact_factor = Column(String())
	# doi = Column(String())
	# name = Column(String(255))

	def to_dict(self):
		return {
			"id" : self.id,
			"name": self.name,
			"short_name": self.short_name,
			"level" : self.level,
			"impact_factor":self.impact_factor
		}