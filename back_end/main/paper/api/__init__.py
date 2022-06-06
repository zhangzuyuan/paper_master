from flask import Flask

from main.paper.api.ArticleAnalyseApi.Views import atricle_analyse_blue
from main.paper.api.ArticleBaseApi.Views import atricle_base_blue
from main.paper.api.UserApi.Views import user_blue


def create_app():
	app = Flask(__name__)
	# 蓝图 ,将蓝图对象绑定到app上
	app.register_blueprint(user_blue)
	app.register_blueprint(atricle_base_blue)
	app.register_blueprint(atricle_analyse_blue)
	print(app.url_map)
	return app
