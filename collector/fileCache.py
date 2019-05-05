import json
import os
from shutil import copyfile

import jdlDate

currentFile = None
lastFileOpen = None
fileIntervalSec = 60

cachePath = './cache'
currentFileName = cachePath + '/current.json'

def updateFile():
    global currentFile
    global lastFileOpen

    localTime = jdlDate.getLocalTime()
    time = jdlDate.getUtc(localTime)
    if currentFile is None or (time - lastFileOpen > fileIntervalSec):
        # It's time to open the current file or archive the current
        if currentFile is not None:
            # Archive the current file
            currentFile.close()

        calendarDateTime = jdlDate.getCalendarDateTime()
        # Archive existing cache file, if present
        archive(calendarDateTime)
        currentFile = openCurrentFile()
        lastFileOpen = time

    return currentFile

def writeData(data):
    t = jdlDate.getCalendarDateTime()
    dataToWrite = {}
    dataToWrite['timestamp'] = t

    dataObject = {}
    for attr, value in data.items():
        dataObject[attr] = {}
        if isinstance(value.value, str):
            dataObject[attr]['value'] = value.value
        else:
            dataObject[attr]['value'] = value.value.magnitude
            dataObject[attr]['units'] = str(value.value.units)

    dataToWrite['data'] = dataObject

    currentFile.write(json.dumps(dataToWrite) + '\n')

def openCurrentFile():
    f = open(currentFileName, 'w')
    return f

def archive(calendarDateTime):
    copyfile(currentFileName, getFilename(calendarDateTime))

def getFilename(calendarDateTime):
    return cachePath + "/OBD_" + calendarDateTime['calendarDate'] + "_" + calendarDateTime['hourMinSec'] + ".json"
