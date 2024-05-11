from django.conf import settings
from rest_framework.routers import DefaultRouter
from rest_framework.routers import SimpleRouter
from django.urls import path

from consultant_matcher.users.api.views import UserViewSet
from consultant_matcher.consultants.api.views import ConsultantViewSet, ClientViewSet, TeamViewSet, SeniorityList, IndustryViewSet, TechStackViewSet

router = DefaultRouter() if settings.DEBUG else SimpleRouter()

router.register("users", UserViewSet)
router.register("consultants", ConsultantViewSet)
router.register("industries", IndustryViewSet)
router.register("stacks", TechStackViewSet)
router.register("clients", ClientViewSet)
router.register("teams", TeamViewSet)

routes = [
    path('seniorities', SeniorityList.as_view())
]

app_name = "api"
urlpatterns = router.urls + routes
