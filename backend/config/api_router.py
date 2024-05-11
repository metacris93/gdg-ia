from django.conf import settings
from rest_framework.routers import DefaultRouter
from rest_framework.routers import SimpleRouter

from consultant_matcher.users.api.views import UserViewSet
from consultant_matcher.consultants.api.views import ConsultantViewSet, ClientViewSet, TeamViewSet

router = DefaultRouter() if settings.DEBUG else SimpleRouter()

router.register("users", UserViewSet)
router.register("consultants", ConsultantViewSet)
router.register("clients", ClientViewSet)
router.register("teams", TeamViewSet)


app_name = "api"
urlpatterns = router.urls
