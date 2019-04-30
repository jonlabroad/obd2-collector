from datetime import datetime
import pytz

def getCalendarDateTime():
    localTime = getLocalTime()
    data = {}
    data['calendarDate'] = getCalendarDate(localTime)
    data['hourMinSec'] = getHourMinSec(localTime)
    data['utcTimestamp'] = getUtc(localTime)
    return data

def getCalendarDate(localTime):
    return localTime.strftime("%Y%m%d")

def getHourMinSec(localTime):
    return localTime.strftime("%H%M%S")

def getLocalTime():
    tz = pytz.timezone('America/New_York')
    return datetime.now(tz)

def getUtc(localTime):
    return localTime.utcnow().timestamp()
