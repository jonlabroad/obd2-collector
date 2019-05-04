import json
import time

import poll
import jdlDate
import fileCache

#print(json.dumps(jdlDate.getCalendarDateTime()))

#fakeData = {}
#fakeData['param1'] = 'datavalue1'
#fakeData['param2'] = 'datavalue2'
#fileCache.writeData(fakeData)
#while(True):
#    try:
print("Starting poll...")
poll.poll()
print("Polling complete")
#    except:
#        print("Error")
#    time.sleep(5)

