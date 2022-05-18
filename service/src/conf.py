import json
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
path = Path(__file__).parent.parent
config_file = path / 'service.yaml'
cities_file = path / 'cities.json'
config = confuse.Configuration('service')
config.set_file(str(config_file))

with open(str(cities_file), 'r') as json_file:
    cities_data = json.load(json_file)
    cities = list(
        map(lambda city: city['name'] + ", " + city['country'], cities_data))

server_config = ServerConfig(config['server']['host'].get(
    str), config['server']['port'].get(str))
app_config = AppConfig(
    log_level=config['log_level'].get(str), server=server_config)
