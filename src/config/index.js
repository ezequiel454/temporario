import AWS from 'aws-sdk'

const awsConfig = async () => {
    const sqsEndpoint = new AWS.Endpoint(`http://localhost:4566`)
    const sqsConfig = {
        endpoint: sqsEndpoint,
        region: 'us-east-1'
    }

    const sqs = new AWS.SQS(sqsConfig)
    const { QueueUrl: queueUrl } = await sqs
        .getQueueUrl({ QueueName: 'wonder' })
        .promise()

    return {
        sqs,
        queueUrl
    }
}

export default awsConfig
