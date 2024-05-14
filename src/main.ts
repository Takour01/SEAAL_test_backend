import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ValidationFilter } from './filters/validation/validation.filter';
import { ValidationException } from './filters/validation/validation.exception';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalFilters(new ValidationFilter())
  app.setGlobalPrefix("api")
  app.useGlobalPipes(new ValidationPipe({
    // whitelist: true,
    exceptionFactory: (errors) => {
      const message = errors.map(error => ({
        [error.property]: Object.values(error.constraints)
      }))
      return new ValidationException(message)
    }
  }));

  // Create options for the Swagger document
  const config = new DocumentBuilder()
    .setTitle('Test api')
    .setDescription(`create a web platform for two types of users:
      managers,

      Administrators

      Managers have the option to click on the 'send' button. When they click on it, a check will take place in the database. If the occurrence is 1, a success message appears; otherwise, a message saying: "Sorry, you have to wait until 10:00 a.m. tomorrow for your next click or contact your administrator."

      The administrator can view the list of all managers and their occurrences, which automatically reset to value 1 at 10:00 a.m. every day. The administrator can also reset the occurrence if it is equal to 0 to 1 for each user by forcing the field in the database.`)
    .setVersion('1.0')
    .addTag('test')
    .build();

  // Create the document
  const document = SwaggerModule.createDocument(app, config);

  // Setup Swagger module
  SwaggerModule.setup('api', app, document);



  await app.listen(3000);
}
bootstrap();
