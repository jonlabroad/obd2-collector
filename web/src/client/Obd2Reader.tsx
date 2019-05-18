import AWS, { DynamoDB} from "aws-sdk";
import Dataset from "../data/Dataset";
import Obd2RequestGenerator from "./Obd2RequestGenerator";
import Config from "../Config";
import { DescribeTableOutput, TableDescription, AttributeDefinition, QueryOutput } from "aws-sdk/clients/dynamodb";
import * as Enumerable from 'linq';

export default class Obd2Reader {
    private dynamoDb : AWS.DynamoDB = new AWS.DynamoDB({region: Config.awsRegion});
    protected static tableDescription: any = undefined;

   
    public async query(calendarDate: string, handleFunc?: (err: AWS.AWSError, data: Dataset) => void): Promise<Dataset> {
        await this.getTableDescription();
        var request = Obd2RequestGenerator.generateQuery(calendarDate);
        var response = await this.dynamoDb.query(request).promise();
        var dataset = new Dataset(Obd2Reader.tableDescription, response.Items);
        return dataset;
    }

    public async getTableDescription(): Promise<any> {
        if (!Obd2Reader.tableDescription) {
            var tempTableDescription: any = {};
            var response = await this.dynamoDb.describeTable({ TableName: Config.obd2TableName }).promise();
            var table = response.Table as TableDescription;
            Enumerable.from(table.AttributeDefinitions).forEach((e: any) => {
                tempTableDescription[e.AttributeName] = e.AttributeType;
            });
            Obd2Reader.tableDescription = tempTableDescription;
        }

        return Promise.resolve();
    }
}