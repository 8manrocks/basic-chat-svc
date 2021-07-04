const connect = () => {
    const mongoose = require('mongoose');
    const dbUrl = 'mongodb+srv://cluster0.jkdcb.mongodb.net/myFirstDatabase';
    const dbOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        user: 'asing53',
        pass: 'Iam@sing53'
    };

    mongoose.connect(dbUrl, dbOptions);

    return mongoose.connection;
};

exports.connect = connect;

