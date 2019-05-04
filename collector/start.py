import json
import time
import logging

import poll
import jdlDate
import fileCache

try:
    t = jdlDate.getCalendarDateTime()
    logging.basicConfig(filename='log_' + t['calendarDate'] + t['hourMinSec'] + '.txt', level=logging.INFO)
    logging.info("Starting poll...")
    poll.poll()
    logging.info("Polling complete")
except Exception:
    logging.exception("Polling failed")

