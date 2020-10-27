import awsConfig from '../config/index'
import * as yup from 'yup'

const database = []

/*
    Database format: { messsageId: ?, person: { name: ?, age: ?, job: ? } }
*/

const producer = async ({ body }, res) => {
    const schema = yup.object().shape({
        name: yup.string().required(),
        age: yup.number().required(),
        job: yup.string().required()
    })

    if (!(await schema.isValid(body))) {
        throw Error('Validation fails')
    }

    const { sqs, queueUrl } = await awsConfig()
    const { MessageId } = await sqs
        .sendMessage({
            QueueUrl: queueUrl,
            MessageBody: JSON.stringify(body, null, 2)
        })
        .promise()
    database.push({ messageId: MessageId, person: body })
    return res.json({ MessageId })
}

const consumer = async (req, res) => {
    // const copyDb = [...database]
    // database.length = 0

    const objMessage = await getMessage()

    if (database[0].messsageId === objMessage.MessageId) {
        database.shift()
    } else {
    }

    return res.json({ Messages: copyDb })
}

const loopQueue = async (lista) => {
    const { sqs, queueUrl } = await awsConfig()

    lista.forEach(async (data) => {
        const { Messages } = await sqs
            .receiveMessage({
                QueueUrl: queueUrl
            })
            .promise()

        await sqs
            .deleteMessage({
                QueueUrl: queueUrl,
                ReceiptHandle: Messages[0].ReceiptHandle
            })
            .promise()
    })
}

const getMessage = async () => {
    const { sqs, queueUrl } = await awsConfig()

    const { Messages } = await sqs
        .receiveMessage({
            QueueUrl: queueUrl
        })
        .promise()

    await sqs
        .deleteMessage({
            QueueUrl: queueUrl,
            ReceiptHandle: Messages[0].ReceiptHandle
        })
        .promise()

    return Messages[0]
}

export default {
    producer,
    consumer
}
