import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'

import {getAllToDo} from '../../businessLogic/ToDo.ts'


export const handler: APIGatewayProxyEvent = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyHandler> => {
// TODO: Get all TODO items for a current user
    // Write your code here
    console.log("Processing Event ", event);
    const authorization = event.headers.Authorization;
    const split = authorization.split(' ');
    const jwtToken = split[1];

    const toDos = await getAllToDo(jwtToken);

    return {
      statusCode: 200,
      headers: {
        "Access-control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        "items": toDos,
      }),
    }
};