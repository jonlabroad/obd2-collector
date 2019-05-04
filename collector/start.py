import json
import time
import logging

import poll
import jdlDate
import fileCache

logging.basicConfig(filename='log.txt', level=logging.INFO)
logging.info("Starting poll...")
poll.poll()
logging.info("Polling complete")

