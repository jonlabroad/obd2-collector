import json

def readCommandInfo():
    with open("commands.json") as commandsFile:
        cmds = json.load(commandsFile)
        print(cmds)
        return cmds