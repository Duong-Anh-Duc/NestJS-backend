import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import ms from 'ms';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtStrategy } from './passport/jwt.strategy';
import { LocalStrategy } from './passport/local.strategy';
@Module({
  imports : [UsersModule, PassportModule
    ,JwtModule.registerAsync({
      imports : [ConfigModule],
      useFactory : async (configService : ConfigService) => ({
        secretOrPrivateKey : configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
        signOptions : {
          expiresIn : ms(configService.get<string>('JWT_ACCESS_EXPIRE')) / 1000
        }
      }),
      inject : [ConfigService]
    })
  ],
  providers: [AuthService, LocalStrategy, LocalAuthGuard, JwtStrategy, UsersModule],
  exports : [AuthService],
  controllers : [AuthController]
})
export class AuthModule {}