import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
 
    
    const existingUser = await this.userModel.findOne({
      username: registerDto.username,
    });
    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }

   
    
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

  
    
    const newUser = await this.userModel.create({
      ...registerDto,
      password: hashedPassword,
    });

    
    
    let userObject = newUser.toObject();

 
    
    delete userObject.password;

    return {
      status_code: HttpStatus.CREATED,
      message: 'User successfully created',
      data: userObject,
    };
  }

  async login(loginDto: LoginDto) {
  
    
    const user = await this.userModel.findOne({ username: loginDto.username });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException(
        `Invalid password for user${loginDto.username}`,
      );
    }

    
    const token = this.generateToken(user);

    return {
      status_code: HttpStatus.OK,
      message: 'OK',
      data: token,
    };
  }

  private generateToken(user: User) {

    const payload = {
      sub: user._id,
      username: user.username,
    };


    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    });

    return {
      accessToken: accessToken,
      access_token_expire_in: process.env.ACCESS_TOKEN_EXPIRES_IN,
      refreshToken: refreshToken,
      refresh_token_expire_in: process.env.REFRESH_TOKEN_EXPIRES_IN,
    };
  }
}
