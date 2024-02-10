// import express from 'express';
// import { graphqlHTTP } from 'express-graphql';
// import schema from './schema/schema.js';
// import mongoose from 'mongoose';
// import cors from 'cors'
// const dbConnection = mongoose.connection;
// dbConnection.on('error', error => console.log(`Connection error ${error}`));
// dbConnection.once('open', () => console.log(`Connected to DB`));
// mongoose.connect('mongodb://userser:secret@localhost:27017/graphql');
// const app = express();
// const port = 5001;
// app.use('/graphql', graphqlHTTP({
// 	schema,
// 	graphiql: true
// }));
// app.use(cors())
// app.listen(port, err => {
// 	err ? console.log(err) : console.log('Server started!');
// });
import testing from './module.js';
testing();
console.log('test');
//# sourceMappingURL=app.js.map