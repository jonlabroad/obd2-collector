import json
import time
import logging

import poll
import jdlDate
import fileCache

try:
    logging.basicConfig(filename='log_' + jdlDate.getCalendarDateTime() + '.txt', level=logging.INFO)
    logging.info("Starting poll...")
    poll.poll()
    logging.info("Polling complete")
except Exception:
    logging.exception("Polling failed")

