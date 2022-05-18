import logging
from typing import Dict
import aiohttp_jinja2
from aiohttp import web
from .conf import cities


log = logging.getLogger(__file__)


class SiteHandler:
    @aiohttp_jinja2.template('index.html')
    async def index(self, request: web.Request) -> Dict[str, str]:
        return dict()

    async def items(self, request: web.Request) -> web.Response:
        query = request.rel_url.query['q']
        return web.json_response(list(filter(lambda city: city.find(query) >= 0, cities)))
