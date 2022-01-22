import { MongoComponent } from "./mongo";

const world = 'world2112';
export function hello(word: string = world): string {
    return `Hello ${word}! `;
}

console.log(hello());

const mc = new MongoComponent();
try {
    // mc.doAllActions();
    mc.transact();
} catch (ex) {
    console.log(ex);
} finally {
    mc.disconnect();
}