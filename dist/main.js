"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const port = process.env.PROJECT_PORT || 5000;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true
    }));
    app.enableCors({
        origin: 'http://localhost:3000'
    });
    app.use(session({
        name: 'Todo_Api_Session',
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60000,
            secure: true,
            httpOnly: true,
        }
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(cookieParser());
    app.setGlobalPrefix('api/v1');
    await app.listen(port, () => console.log(`server is running on port: ${port}`));
}
bootstrap();
//# sourceMappingURL=main.js.map