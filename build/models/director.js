import { model, Schema } from 'mongoose';
const schema = new Schema({
    name: String,
    age: Number,
});
export default model('Director', schema);
//# sourceMappingURL=director.js.map