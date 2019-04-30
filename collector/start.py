import json

import poll
import jdlDate
import fileCache

print(json.dumps(jdlDate.getCalendarDateTime()))

fakeData = {}
fakeData['param1'] = 'datavalue1'
fakeData['param2'] = 'datavalue2'
fileCache.writeData(fakeData)

print("Starting poll...")
#poll.poll()
print("Polling complete")

