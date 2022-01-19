import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://hadar96:messi10@Cluster0.bobbd.mongodb.net/Cluster0?retryWrites=true&w=majority";
const client = new MongoClient(uri);
client.connect(err => {
    const collection = client.db("sample_training").collection("grades");

    // perform actions on the collection object
    const cursor = collection.find({ student_id: 0, class_id: 350 });
    cursor.toArray().then(arr => {
        console.log(arr);
    }).catch(err => {
        console.log("AN ERROR!!!", err);
    }).finally(() => {
        client.close();
    });
});


const world = 'world2112';

export function hello(word: string = world): string {
    return `Hello ${word}! `;
}

console.log(hello());
