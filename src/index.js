const express = require("express");
const fs = require("fs");
const https = require("https");
const app = express();
const { config } = require("./config/index");
const bodyParser = require("body-parser");
const UserApi = require("./routes/users");
const ParameterApi = require("./routes/parameter");
const FilmsApi = require("./routes/Films");
const FilmsListsApi = require("./routes/filmsLists");

app.use(express.json());
app.set("key", config.secret);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

UserApi(app);
ParameterApi(app);
FilmsApi(app);
FilmsListsApi(app);

if (config.dev) {
    app.listen(config.port, function () {
        console.log(`Listening http://localhost:${config.port}`);
    });
} else {
    const privateKey = fs.readFileSync(
        `${config.urlCertificado}privkey.pem`,
        "utf8"
    );
    const certificate = fs.readFileSync(
        `${config.urlCertificado}cert.pem`,
        "utf8"
    );

    const credentials = {
        key: privateKey,
        cert: certificate,
    };
    const httpsServer = https.createServer(credentials, app);

    httpsServer.listen(config.port, () => {
        console.log(`HTTPS Server running on port ${config.port}`);
    });
}