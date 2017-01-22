const ApiBuilder = require('claudia-api-builder')
const AWS = require('aws-sdk')
const dynamoDB = new AWS.DynamoDB.DocumentClient()
const api = new ApiBuilder()
module.exports = api

api.post('/users', request => {
  const params = {
    TableName: 'users',
    Item: {
      id: request.body.id,
      name: request.body.name
    }
  }
  return dynamoDB.put(params).promise();
}, { success: 201 })

api.get('/users/{id}', request => {
  const id = parseInt(request.pathParams.id, 10)
  const params = {
    TableName: 'users',
    Key: { id: id },
  }
  return dynamoDB.get(params).promise().then(response => {
    return response.Item;
  })
})

api.delete('/users/{id}', function(request){
  const id = parseInt(request.pathParams.id, 10)
  const params = {
    TableName: 'users',
    Key: { id },
  }
  return dynamoDB.delete(params).promise().then(function(response){
    return response.Item
  })
})

// TODO: It doesn't work. Why?
api.get('/users', request => {
  return dynamoDB.scan({ TableName: 'users' }).promise().then(function(response){
    return response.Items;
  })
})
