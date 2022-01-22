import { MongoClient } from 'mongodb';

export class MongoComponent {
    private readonly connectionStr =
        "mongodb+srv://dev-user:A123456@cluster0.lvddy.mongodb.net/Cluster0?retryWrites=true&w=majority";
    private dbClient: MongoClient;

    constructor() {
        this.dbClient = new MongoClient(this.connectionStr);
    }

    async connect() { await this.dbClient.connect(); }

    async disconnect() { await this.dbClient.close(); }

    //#region UNUSED

    findAll() {
        this.dbClient.connect(err => {
            const collection = this.dbClient.db("Breakfasts").collection("all");

            // perform actions on the collection object
            const cursor = collection.find({});
            cursor.toArray()
                .then(console.log)
                .finally(() => this.dbClient.close());
        });
    }

    addToAll() {
        this.dbClient.connect(() => {
            const collection = this.dbClient.db("Breakfasts").collection("all");
            collection.insertOne({ fromCode: true, temp: "ttrhefbd" })
                .then(res => console.log("after insert ALL", res))
                .finally(this.disconnect.bind(this));
        });
    }

    addToLast() {
        this.dbClient.connect(() => {
            const collection = this.dbClient.db("Breakfasts").collection("last");
            collection.insertOne({ fromCode: true, meta: "111223dd" })
                .then(res => console.log("after insert LAST", res))
                .finally(this.disconnect.bind(this));
        });
    }

    setLastUpdateTime() {
        this.dbClient.connect(() => {
            const collection = this.dbClient.db("Breakfasts").collection("meta");
            collection.updateOne({}, { $set: { last_update: new Date() } }, { upsert: true })
                .then(res => console.log("update TIME", res))
                .finally(this.disconnect.bind(this));
        });
    }

    //#endregion

    async doAllActions() {
        let collection, res;

        await this.dbClient.connect();

        // update last_time
        collection = this.dbClient.db("Breakfasts").collection("meta");
        // res = await collection.updateOne({}, { $set: { last_update: new Date() } }, { upsert: true });
        res = await collection.updateOne({}, { $set: { stam: new Date().getMinutes() } }, { upsert: true });
        console.log("update TIME", res);

        // // find * in all
        // collection = this.dbClient.db("Breakfasts").collection("all");
        // res = await collection.find({}).toArray();
        // console.log(res);

        // // add to all
        // res = await collection.insertOne({ fromCode: true, temp: "ttrhefbd" });
        // console.log("after insert ALL", res);

        // // add to last
        // collection = this.dbClient.db("Breakfasts").collection("last");
        // res = await collection.insertOne({ myID: 'code', fromCode: true, meta: "111223dd" });
        // console.log("after insert LAST", res);

        // update in last
        collection = this.dbClient.db("Breakfasts").collection("last");
        res = await collection.updateOne({ myID: 'code' }, { $set: { time: new Date() } }, { upsert: true });
        console.log("after update LAST", res);

        // // create collection
        // collection = this.dbClient.db("Breakfasts").collection("newCollection");
        // res = await collection.insertOne({ ahlan: 23 });
        // console.log("new collection", res);

        await this.dbClient.close();
    }

    async transact() {
        await this.dbClient.connect();
        const session = this.dbClient.startSession();

        try {
            await session.withTransaction(async () => {
                const col1 = this.dbClient.db("Breakfasts").collection("newCollection");
                const meta = this.dbClient.db("Breakfasts").collection("meta");

                const res1 = await col1.updateMany({ vv: 4 }, { $set: { vv: new Date().getMilliseconds() } }, { session });
                console.log(res1);
                // throw "my error";
                // await this.disconnect();
                const res2 = await meta.updateOne({}, { $set: { last_update: new Date() } }, { session });
                console.log(res2);
            });
        } catch (ex) {
            console.log(ex);
        } finally {
            await session.endSession();
            await this.disconnect();
        }
    }

}