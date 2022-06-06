from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from main.config.ConfigMysql import MYSQL_HOST, MYSQL_PORT, MYSQL_DB, MYSQL_USER, MYSQL_PASSWD



host = MYSQL_HOST
port = MYSQL_PORT
database = MYSQL_DB
username = MYSQL_USER
password = MYSQL_PASSWD
uri = "mysql+pymysql://" + username +":" + password +"@" + host +":" +port +"/" +database


# 创建的数据库引擎
engine = create_engine(uri)

#启动会话
DBSession = sessionmaker(bind=engine)

# 数据类型基类
Base = declarative_base()

# session = DBSession()