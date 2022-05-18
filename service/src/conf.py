from pathlib import Path
from attr import define
import confuse

@define
class ServerConfig:
    host: str
    port: str

@define
class AppConfig:
    log_level: str
    server: ServerConfig

print("Hi config")
path = Path(__file__).parent.parent / 'service.yaml'
config = confuse.Configuration('service')
config.set_file(str(path))

server_config = ServerConfig(config['server']['host'].get(str), config['server']['port'].get(str))
app_config = AppConfig(log_level=config['log_level'].get(str), server=server_config)
