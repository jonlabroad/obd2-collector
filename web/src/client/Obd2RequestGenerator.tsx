import Config from "../Config"
import { QueryInput } from "aws-sdk/clients/dynamodb";

export default class Obd2RequestGenerator {
    constructor() {
    }

    public static generateQuery(calendarDate : string) : any {
        var request : QueryInput = {
            TableName: `${Config.obd2TableName}`,
            ExpressionAttributeValues: {
                ":v1": {
                    N: `${parseInt(calendarDate)}`
                }
            },
            KeyConditionExpression: "calendarDate = :v1"
        }
        return request;
    }
}