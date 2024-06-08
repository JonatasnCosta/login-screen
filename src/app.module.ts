import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'; 
import { UserModule } from './user/user.module';
import { CheckIdMiddleware } from './middlewares/check-id.middleware';
import { AuthModule } from './auth/auth.module';
import { SecurityModule } from './security/security.module';
import { ConfigModule } from '@nestjs/config';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { MailerModule } from '@nestjs-modules/mailer';

@Module(
{imports: [UserModule, AuthModule, SecurityModule, ConfigModule.forRoot(), MailerModule.forRoot({
    transport: {
        host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'florida.kovacek55@ethereal.email',
        pass: 'ZEMzHpQVg34eN65dVj'
    }
    },
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
})], 
controllers: [], 
providers: [], 
}) 

export class AppModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(CheckIdMiddleware).forRoutes({
            path:"users/:id",
            method: RequestMethod.ALL
        })
    }
}
