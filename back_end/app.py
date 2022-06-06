import os
import sys

from flask import Flask
# 项目根路径
from main.paper.api import create_app

app = create_app()

if __name__ == '__main__':  # 直接执行
	app.run()
