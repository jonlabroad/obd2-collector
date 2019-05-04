import json
import logging

def readCommandInfo():
    with open("commands.json") as commandsFile:
        cmds = json.load(commandsFile)
        logging.info(cmds)
        return cmds