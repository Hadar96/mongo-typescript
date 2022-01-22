import { MongoComponent } from "./mongo";

const world = 'world2112';
export function hello(word: string = world): string {
    return `Hello ${word}! `;
}

console.log(hello());

const mc = new MongoComponent();
mc.doAllActions();
mc.transact();

// try {
//     // mc.connect();
//     // mc.findAll();
//     // mc.addToAll();
//     // mc.addToLast();
//     // mc.setLastUpdateTime();
//     mc.doAllActions();
// } catch (ex) {
//     console.log(ex);
// } finally {
//     mc.disconnect();
// }