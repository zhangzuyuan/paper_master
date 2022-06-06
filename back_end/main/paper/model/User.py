from sqlalchemy import Column, Integer, String

from main.db.session import Base

class User(Base):
	# 表名
	__tablename__ = "user"

	# 表结构
	id = Column(Integer(), autoincrement=True)
	username = Column(String(20))
	password = Column(String(25))
	role = Column(Integer())
	sex = Column(Integer())
	telephone = Column(String(255), primary_key=True)
	address = Column(String(255))

	picture_path = Column(String(255))

	def to_dict(self):
		return {
			"id": self.id,
			"username": self.username,
			"password": self.password,
			"role": self.role,
			"sex": self.sex,
			"telephone": self.telephone,
			"address": self.address
		}
