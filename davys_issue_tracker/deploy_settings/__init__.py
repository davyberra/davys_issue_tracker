import dj_database_url
from davys_issue_tracker.settings import *


DEBUG = False
TEMPLATE_DEBUG = DEBUG

ALLOWED_HOSTS = [
    'localhost',
    '.herokuapp.com',
]

SECRET_KEY = get_env_variable("SECRET_KEY")

db_from_env = dj_database_url.config()
DATABASES['default'].update(db_from_env)