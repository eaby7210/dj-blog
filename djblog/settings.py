from datetime import timedelta
from pathlib import Path
import os


BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'hhe)7x2)&&+%hg4utol^(47%d^t&oa(72d^gpp@kf9u#gp4u2d'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["localhost",
                 "127.0.0.1", "dj-blog-pied.vercel.app",
                 "djblog-front.onrender.com"
                 ]
RENDER_EXTERNAL_HOSTNAME = os.environ.get('RENDER_EXTERNAL_HOSTNAME')
if RENDER_EXTERNAL_HOSTNAME:
    ALLOWED_HOSTS.append(RENDER_EXTERNAL_HOSTNAME)

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173", "https://dj-blog-pied.vercel.app",
    "https://djblog-front.onrender.com",
]
CSRF_TRUSTED_ORIGINS = [
    'http://localhost:5173',
    # ! Hoppscotch remove this
    'chrome-extension://amknoiejhlmhancpahfcfcfhllgkpbld'
    "https://dj-blog-pied.vercel.app",
    "https://djblog-front.onrender.com",
]
CORS_ALLOW_CREDENTIALS = True

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # installed apps
    'rest_framework.authtoken',
    'rest_framework',
    'django_filters',
    'dj_rest_auth',
    'dj_rest_auth.registration',
    'corsheaders',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',
    # apps
    'core',
    'blog',
]

MIDDLEWARE = [
    # intstalled middleware
    "corsheaders.middleware.CorsMiddleware",
    "allauth.account.middleware.AccountMiddleware",
    # dj
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',

]

ROOT_URLCONF = 'djblog.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                # extra templates
                'django.template.context_processors.request',
            ],
        },
    },
]

WSGI_APPLICATION = 'djblog.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [

    {
        'NAME':
            'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME':
            'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME':
            'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

AUTHENTICATION_BACKENDS = [

    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend',
]
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'dj_rest_auth.jwt_auth.JWTCookieAuthentication',
    )
}
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=5),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'AUTH_HEADER_TYPES': ('Bearer',),
    # 'AUTH_COOKIE': 'access_token',

    # 'AUTH_COOKIE_SECURE': True,  # !require https

    # 'AUTH_COOKIE_SAMESITE': 'None',
}

REST_AUTH = {
    'USE_JWT': True,
    'SESSION_LOGIN': False,
    # !Figure out use of csrf and set be
    'JWT_AUTH_COOKIE_USE_CSRF': False,
    # 'JWT_AUTH_COOKIE': 'access_token',
    # 'JWT_AUTH_REFRESH_COOKIE': 'refresh_token',
    'JWT_AUTH_SAMESITE': 'None',  # ! Require https
    'JWT_AUTH_SECURE': True,  # ! may be the working cookie secure setting

    'PASSWORD_CHANGE_SERIALIZER':
        'core.serializers.CustomPasswordChangeSeralizer',
    'USER_DETAILS_SERIALIZER': 'core.serializers.UserSerializer',
    'LOGOUT_ON_PASSWORD_CHANGE': True,
    'REGISTER_SERIALIZER': 'core.serializers.UserRegisterSerializer',
}

# CSRF_COOKIE_DOMAIN = '.onrender.com'
# SESSION_COOKIE_DOMAIN = '.onrender.com'

CSRF_COOKIE_NAME = "csrftoken"
CSRF_HEADER_NAME = "HTTP_X_CSRFTOKEN"


CSRF_COOKIE_HTTPONLY = False
ACCOUNT_EMAIL_VERIFICATION = "none"
ACCOUNT_EMAIL_REQUIRED = False


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


MEDIA_URL = "/media/"
STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'


DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CSRF_COOKIE_SECURE = True  # ! Require https
CSRF_COOKIE_SAMESITE = 'None'
# SESSION_COOKIE_SECURE = True  # ! Require https
# SESSION_COOKIE_SAMESITE = 'None'
# SECURE_SSL_REDIRECT = True  # ! Require https
