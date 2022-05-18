import asyncio
from pathlib import Path

from .handler import SiteHandler
from .conf import app_config
import logging
from aiohttp import web
import jinja2
from aiohttp_jinja2 import setup as setup_jinja


path = Path(__file__).parent.parent
log = logging.getLogger(__file__)

def init_logging(level):
    if level == 'debug':
        log_level = logging.DEBUG
    elif level == 'info':
        log_level = logging.INFO
    elif level == 'warn':
        log_level = logging.WARN
    else:
        log_level = logging.ERROR

    logging.addLevelName(
        logging.DEBUG, "\033[1;37m%s\033[1;0m" % logging.getLevelName(logging.DEBUG))
    logging.addLevelName(
        logging.INFO, "\033[1;32m%s\033[1;0m" % logging.getLevelName(logging.INFO))
    logging.addLevelName(
        logging.WARNING, "\033[1;31m%s\033[1;0m" % logging.getLevelName(logging.WARNING))
    logging.addLevelName(
        logging.ERROR, "\033[1;41m%s\033[1;0m" % logging.getLevelName(logging.ERROR))

    logging.basicConfig(
        format='[%(asctime)s][%(filename)s][%(levelname)s] - %(message)s',
        level=log_level,
        force=True)

async def init_app() -> web.Application:
    app = web.Application()

    setup_jinja(app, loader=jinja2.FileSystemLoader(str(path / 'templates')))

    handler = SiteHandler()
    app.router.add_route('GET', '/', handler.index, name='index')
    app.router.add_static(
        '/static/', path=(path / 'static'), name='static'
    )
    app['handler'] = handler
    return app


def main():
    print(app_config)
    init_logging(app_config.log_level)
    log.debug("Starting app")

    loop = asyncio.get_event_loop()
    app = loop.run_until_complete(init_app())
    # app.cleanup_ctx.append(watcher_engine)

    web.run_app(app, print=log.info, host=app_config.server.host, port=app_config.server.port)