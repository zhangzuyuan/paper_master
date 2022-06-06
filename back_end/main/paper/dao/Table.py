from main.sql.MysqlDb import db

class Table:
	def __init__(self,name):
		self.name = name
		pass
	def select(self,columns):
		columns = str(columns).strip('[]') if len(columns) != 0 else '*'
		sql = " SELECT " + columns + " FROM " + self.name
		print(sql)
		data = db.select_db(sql)
		return data

