from .conf import config

def main():
    print(config)
    # app_conf = config.get_app_config()
    # init_logging(app_conf)

    # loop = asyncio.get_event_loop()
    # app = loop.run_until_complete(init_app())
    # app.cleanup_ctx.append(watcher_engine)

    # web.run_app(app, print=log.info, host=app_conf.host, port=app_conf.port)