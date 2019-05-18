import * as Enumerable from 'linq';
import { AttributeMap, AttributeValue } from 'aws-sdk/clients/dynamodb';
import Datapoint from './Datapoint';

export default class Dataset {
    data: {[key: string] : Array<Datapoint>} = {};

    constructor(tableDescription: any, awsData: AttributeMap[] | undefined) {
        if (awsData) {
            this.createFromAwsData(awsData);
        }
    }

    createFromAwsData(awsData: AttributeMap[]) {
        Enumerable.from(awsData).forEach((attr: AttributeMap) => {
            Enumerable.from(Object.keys(attr)).forEach((attrName) => {
                if (!this.data[attrName]) {
                    this.data[attrName] = new Array<Datapoint>();
                }
                var utc = attr["utc"].N;
                this.data[attrName].push({
                    timestamp: parseFloat(utc ? utc : "INVALID"),
                    value: this.parseVal(attr[attrName])
                });
            });
        });
    }

    parseVal(value: AttributeValue): string | number | undefined {
        return value.S ? value.S : parseFloat(value.N ? value.N : "INVALID");
    }
}