import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.KONFIGO_ALLOWED_ORIGINS,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
