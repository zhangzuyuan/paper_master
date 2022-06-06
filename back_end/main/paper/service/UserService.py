import os
import re
import time

from flask import jsonify, Response, make_response
from werkzeug.utils import secure_filename

from main.db.session import DBSession
from main.paper.model.User import User
from main.paper.model.UserToArticleBase import UserToArticleBase


class UserService:
	def __init__(self):
		self.path = None
		self.picture_path = None
		self.user_picture_flag = 0
		self.picture = None

	def get_all_user_information(self):
		session = DBSession()
		print("hello")
		users = session.query(User).all()
		data = []
		for i in range(len(users)):
			data.append(users[i].to_dict())
		print("获取信息 == >> {}".format(data))
		session.close()
		return jsonify({"code": 0, "data": data, "msg": "查询成功"})

	def get_user(self, username):
		# 获取某个用户信息
		session = DBSession()
		users = session.query(User).filter(User.username == username).all()
		session.close()
		data = []
		for i in range(len(users)):
			data.append(users[i].to_dict())
		print("获取 {} 用户信息 == >> {}".format(username, data))
		if data:
			return jsonify({"code": 0, "data": data, "msg": "查询成功"})
		return jsonify({"code": "1004", "msg": "查不到相关用户的信息"})

	def get_user_picture(self, username):

		session = DBSession()
		users = session.query(User).filter(User.username == username).all()
		session.close()
		image_data = open(users[0].picture_path,"rb").read()
		response = make_response(image_data)
		response.headers['Content-Type'] = 'image/png'
		return response

	# try:
	# 	with open(r'{}'.format(users[0].picture_path), 'rb') as f:
	# 		image = f.read()
	# 		result = Response(image, mimetype="image/jpg")
	# 		return result
	# except BaseException as e:
	# 	return {"code": '503', "data": str(e), "message": "图片不存在"}

	def uer_sign_up(self, post: dict):
		session = DBSession()
		username = post.get("username", "").strip()  # 用户名
		password = post.get("password", "").strip()  # 密码
		sex = post.get("sex", "0").strip()  # 性别，默认为0(男性)
		telephone = post.get("telephone", "").strip()  # 手机号
		address = post.get("address", "").strip()  # 地址，默认为空串
		if username and password and telephone:  # 注意if条件中 "" 也是空, 按False处理
			users1 = session.query(User).filter(User.username == username).all()
			print("查询到用户名 ==>> {}".format(users1))
			users2 = session.query(User).filter(User.telephone == telephone).all()
			print("查询到手机号 ==>> {}".format(users2))
			if len(users1) != 0:
				session.close()
				return jsonify({"code": 2002, "msg": "用户名已存在，注册失败！！！"})
			elif not (sex == "0" or sex == "1"):
				session.close()
				return jsonify({"code": 2003, "msg": "输入的性别只能是 0(男) 或 1(女)！！！"})
			elif not (len(telephone) == 11 and re.match("^1[3,5,7,8]\d{9}$", telephone)):
				session.close()
				return jsonify({"code": 2004, "msg": "手机号格式不正确！！！"})
			elif len(users2) != 0:
				session.close()
				return jsonify({"code": 2005, "msg": "手机号已被注册！！！"})
			elif self.user_picture_flag == 0:
				session.add(User(username=username, password=password, role='1', sex=sex, telephone=telephone,
				                 address=address))
				session.commit()
				# print("新增用户信息SQL ==>> {}".format())
				session.close()
				return jsonify({"code": 0, "msg": "恭喜，注册成功！"})
			elif self.user_picture_flag:
				# f = os.open(self.picture_path)
				new_name = os.path.join(self.path, username + "." + self.type)
				print(new_name)
				os.rename(self.picture_path, new_name)
				session.add(User(username=username, password=password, role='1', sex=sex, telephone=telephone,
				                 address=address, picture_path=new_name))
				session.commit()
				# print("新增用户信息SQL ==>> {}".format())
				session.close()
				self.user_picture_flag = 0
				return jsonify({"code": 0, "msg": "恭喜，注册成功！"})
		else:
			session.close()
			return jsonify({"code": 2001, "msg": "用户名/密码/手机号不能为空，请检查！！！"})

	def uer_sign_up_picture(self, post):
		self.user_picture_flag = 1
		self.file = post
		basepath = os.getcwd()
		self.path = os.path.join(basepath, 'file/picture')
		picture_path = os.path.join(basepath, 'file/picture',
		                            secure_filename(self.file.filename))  # 注意：没有的文件夹一定要先创建，不然会提示没有该路径
		self.picture_path = picture_path
		print(self.picture_path)
		print(str(self.picture_path).split("."))
		self.type = self.picture_path.split(".")[1]
		print(self.type)
		self.file.save(picture_path)

	def user_sign_in(self, post: dict):
		session = DBSession()
		username = post.get("username", "").strip()  # 用户名
		password = post.get("password", "").strip()  # 密码
		if username and password:  # 注意if条件中空串 "" 也是空, 按False处理
			users1 = session.query(User).filter(User.username == username).all()
			print("查询到用户名 ==>> {}".format(users1))
			if not users1:
				return jsonify({"code": 1003, "msg": "用户名不存在！！！"})
			users2 = session.query(User).filter(User.username == username, User.password == password)
			print("获取 {} 用户信息 == >> {}".format(username, users2))
			if users2:
				timeStamp = int(time.time())  # 获取当前时间戳
				sign_in_info = {
					"id": users2[0].id,
					"username": username,
					"sign_in_time": time.strftime("%Y/%m/%d %H:%M:%S")
				}
				print(sign_in_info)
				return jsonify({"code": 0, "sign_in_info": sign_in_info, "msg": "恭喜，登录成功！"})
			return jsonify({"code": 1002, "msg": "用户名或密码错误！！！"})
		else:
			return jsonify({"code": 1001, "msg": "用户名或密码不能为空！！！"})

	def user_update_information(self, post):
		session = DBSession()
		username = post.get("username", "").strip()  # 用户名
		new_username = post.get("new_username", "").strip()
		password = post.get("password", "").strip()  # 密码
		sex = post.get("sex", "0").strip()  # 性别，默认为0(男性)
		telephone = post.get("telephone", "").strip()  # 手机号
		address = post.get("address", "").strip()  # 地址，默认为空串
		if username and password and telephone:  # 注意if条件中 "" 也是空, 按False处理
			users1 = session.query(User).filter(User.username == username).all()
			print("查询到用户名 ==>> {}".format(users1))
			users2 = session.query(User).filter(User.telephone == telephone).all()
			print("查询到手机号 ==>> {}".format(users2))
			if len(users1) == 0:
				session.close()
				return jsonify({"code": 2002, "msg": "找不到该用户！！！"})
			# if len(users1) != 0:
			# 	session.close()
			# 	return jsonify({"code": 2002, "msg": "用户名已存在，注册失败！！！"})
			if not (sex == "0" or sex == "1"):
				session.close()
				return jsonify({"code": 2003, "msg": "输入的性别只能是 0(男) 或 1(女)！！！"})
			elif not (len(telephone) == 11 and re.match("^1[3,5,7,8]\d{9}$", telephone)):
				session.close()
				return jsonify({"code": 2004, "msg": "手机号格式不正确！！！"})
			else:
				session.query(User).filter(User.username == username).update(
					{User.username: new_username, User.password: password, User.sex: sex, User.telephone: telephone,
					 User.address: address})
				session.query(UserToArticleBase).filter(UserToArticleBase.username == username).update(
					{UserToArticleBase.username: new_username})
				session.commit()
				session.close()
				return jsonify({"code": 0, "msg": "恭喜，修改成功！"})
		else:
			session.close()
			return jsonify({"code": 2001, "msg": "用户名/密码/手机号不能为空，请检查！！！"})

	def user_update(self):
		return

	def user_delete(self):
		return
