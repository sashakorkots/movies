import { model, Schema } from 'mongoose';
const schema = new Schema({
    name: String,
    genre: String,
    directorId: String,
});
export default model('Movie', schema);
//# sourceMappingURL=movie.js.map