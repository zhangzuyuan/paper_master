import re
import time

from flask import jsonify, request, Blueprint

from main.encryption.Md5Utils import get_md5
from main.paper.service.Service import service
from flask_cors import cross_origin

# from main.paper.api.UserApi import user_blue

user_blue = Blueprint('UserApi', __name__, url_prefix="/user")

print('blue')


@user_blue.route('/')
@cross_origin(supports_credentials=True)
def hello_world():
	return 'Hello World!'


@user_blue.route("/user_information", methods=["POST"])
@cross_origin(supports_credentials=True)
def get_all_user():
	# print(type(request.json))
	return service.user_service.get_all_user_information()


# 获取所有用户信息
# sql = "SELECT * FROM user"
# data = db.select_db(sql)
# print("获取所有用户信息 == >> {}".format(data))
# return jsonify({"code": 0, "data": data, "msg": "查询成功"})


@user_blue.route("/user_information/<string:username>", methods=["POST"])
@cross_origin(supports_credentials=True)
def get_user(username):
	return service.user_service.get_user(username)


@user_blue.route("/user_picture/<string:username>", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_user_picture(username):
	# 图片上传保存的路径
	if request.method == 'GET':
		if username is None:
			pass
		else:
			return service.user_service.get_user_picture(username)
	else:
		pass


@user_blue.route("/sign_up", methods=['POST'])
@cross_origin(supports_credentials=True)
def user_sign_up():
	# 注册用户
	print("yes")
	post = request.json
	return service.user_service.uer_sign_up(post)


@user_blue.route("/sign_up_picture", methods=['POST'])
@cross_origin(supports_credentials=True)
def user_sign_up_picture():
	post = request.files['avatar']
	print(post)
	service.user_service.uer_sign_up_picture(post)
	return jsonify({"code": 2001, "msg": "用户名/doi/文章名称不能为空，请检查！！！"})


@user_blue.route("/sign_in", methods=['POST'])
@cross_origin(supports_credentials=True)
def user_sign_in():
	"""登录用户"""
	post = request.json
	return service.user_service.user_sign_in(post)


@user_blue.route("/update/user/<int:id>", methods=['PUT'])
@cross_origin(supports_credentials=True)
def user_update(id):  # id为准备修改的用户ID
	"""修改用户信息"""
	return


@user_blue.route("/user_update_information", methods=['POST'])
@cross_origin(supports_credentials=True)
def user_update_information():
	# 用户修改自己信息
	post = request.json
	return service.user_service.user_update_information(post)

# # 获取某个用户信息
# sql = "SELECT * FROM user WHERE username = '{}'".format(username)
# data = db.select_db(sql)
# print("获取 {} 用户信息 == >> {}".format(username, data))
# if data:
# 	return jsonify({"code": 0, "data": data, "msg": "查询成功"})
# return jsonify({"code": "1004", "msg": "查不到相关用户的信息"})
#
#
# @user_blue.route("/sign_up", methods=['POST'])
# def user_register():
# 	# 注册用户
# 	username = request.json.get("username", "").strip()  # 用户名
# 	password = request.json.get("password", "").strip()  # 密码
# 	sex = request.json.get("sex", "0").strip()  # 性别，默认为0(男性)
# 	telephone = request.json.get("telephone", "").strip()  # 手机号
# 	address = request.json.get("address", "").strip()  # 地址，默认为空串
# 	if username and password and telephone:  # 注意if条件中 "" 也是空, 按False处理
# 		sql1 = "SELECT username FROM user WHERE username = '{}'".format(username)
# 		res1 = db.select_db(sql1)
# 		print("查询到用户名 ==>> {}".format(res1))
# 		sql2 = "SELECT telephone FROM user WHERE telephone = '{}'".format(telephone)
# 		res2 = db.select_db(sql2)
# 		print("查询到手机号 ==>> {}".format(res2))
# 		if res1:
# 			return jsonify({"code": 2002, "msg": "用户名已存在，注册失败！！！"})
# 		elif not (sex == "0" or sex == "1"):
# 			return jsonify({"code": 2003, "msg": "输入的性别只能是 0(男) 或 1(女)！！！"})
# 		elif not (len(telephone) == 11 and re.match("^1[3,5,7,8]\d{9}$", telephone)):
# 			return jsonify({"code": 2004, "msg": "手机号格式不正确！！！"})
# 		elif res2:
# 			return jsonify({"code": 2005, "msg": "手机号已被注册！！！"})
# 		else:
# 			password = get_md5(username, password)  # 把传入的明文密码通过MD5加密变为密文，然后再进行注册
# 			sql3 = "INSERT INTO user(username, password, role, sex, telephone, address) " \
# 			       "VALUES('{}', '{}', '1', '{}', '{}', '{}')".format(username, password, sex, telephone, address)
# 			db.execute_db(sql3)
# 			print("新增用户信息SQL ==>> {}".format(sql3))
# 			return jsonify({"code": 0, "msg": "恭喜，注册成功！"})
# 	else:
# 		return jsonify({"code": 2001, "msg": "用户名/密码/手机号不能为空，请检查！！！"})
#
#
# @user_blue.route("/sign_in", methods=['POST'])
# def user_login():
# 	"""登录用户"""
# 	username = request.values.get("username", "").strip()
# 	password = request.values.get("password", "").strip()
# 	if username and password:  # 注意if条件中空串 "" 也是空, 按False处理
# 		sql1 = "SELECT username FROM user WHERE username = '{}'".format(username)
# 		res1 = db.select_db(sql1)
# 		print("查询到用户名 ==>> {}".format(res1))
# 		if not res1:
# 			return jsonify({"code": 1003, "msg": "用户名不存在！！！"})
# 		md5_password = get_md5(username, password)  # 把传入的明文密码通过MD5加密变为密文
# 		sql2 = "SELECT * FROM user WHERE username = '{}' and password = '{}'".format(username, md5_password)
# 		res2 = db.select_db(sql2)
# 		print("获取 {} 用户信息 == >> {}".format(username, res2))
# 		if res2:
# 			timeStamp = int(time.time())  # 获取当前时间戳
# 			# token = "{}{}".format(username, timeStamp)
# 			token = get_md5(username, str(timeStamp))  # MD5加密后得到token
# 			# credis_db.handle_redis_token(username, token) # 把token放到redis中存储
# 			login_info = {  # 构造一个字段，将 id/username/token/login_time 返回
# 				"id": res2[0]["id"],
# 				"username": username,
# 				"token": token,
# 				"login_time": time.strftime("%Y/%m/%d %H:%M:%S")
# 			}
# 			return jsonify({"code": 0, "login_info": login_info, "msg": "恭喜，登录成功！"})
# 		return jsonify({"code": 1002, "msg": "用户名或密码错误！！！"})
# 	else:
# 		return jsonify({"code": 1001, "msg": "用户名或密码不能为空！！！"})
