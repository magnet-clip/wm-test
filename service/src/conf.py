from pathlib import Path
import confuse

path = Path(__file__).parent.parent / 'service.yaml'
config = confuse.Configuration('service')
config.set_file(str(path))
