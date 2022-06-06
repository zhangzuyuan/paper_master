from main.db.session import DBSession


class TypeService:
	def __init__(self):
		pass

	def add_conference(self, post:dict):
		session = DBSession()
		username = post
