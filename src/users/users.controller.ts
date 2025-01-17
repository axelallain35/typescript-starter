import { Controller, Get, Body, Post, Delete, Param, Put, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { ApiCreatedResponse, ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

export class UserInput {
    @ApiProperty({
        description: 'The firstname of the user',
        example: "John",
        type: String,
    })
    public firstname: string;

    @ApiProperty({
        description: 'The lastname of the user',
        example: "Doe",
        type: String,
    })
    public lastname: string;

    @ApiProperty({
        description: 'The age of the user',
        minimum: 18,
        default: 18,
        type: Number,
    })
    public age: number;

    @ApiProperty({
        description: 'The password of the user',
        example: "1234badpassword",
        type: String
    })
    public password: string;
}



@ApiTags('users')
@Controller('users')
export class UsersController {

    constructor(
        private service: UsersService
    ) {}

    //@UseGuards(AuthGuard('jwt'))
    @Get()
    public async getAll(){
       return await this.service.getAll();
    }


    @Get('/:id')
    @ApiParam({name: 'id', required: true, description: 'An integer for the user id ', schema: {type: 'integer'}})
        public async getById(@Param('id') parameter:number): Promise<User> {
            const user = await this.service.getById(parameter);
            if(user == undefined) throw new HttpException(`Could not find a user with the id ${parameter}`, HttpStatus.NOT_FOUND);
            return user;
        }

    @ApiCreatedResponse({
        description: 'The user has been successfully created.'
    })
    @Post()
        public async create(@Body() input: UserInput): Promise<User> {
            const user = await this.service.create(input.lastname, input.firstname, input.age, input.password);
            return user;
        }

    @Put(':id')
        public async modifyUser(@Param() parameter, @Body() input: any): Promise<User> {
            const user = await this.service.modifyUser(parameter.id, input.lastname, input.firstname, input.age, input.password);
            if(user == undefined) throw new HttpException(`Could not find a user with the id ${parameter.id}`, HttpStatus.NOT_FOUND);
            return user;
        }

    @Delete(':id')
        public async deleteUser(@Param() parameter): Promise<boolean>{
            const success = await this.service.deleteUser(parameter.id);
            if(!success) throw new HttpException(`Could not find a user with the id ${parameter.id}`, HttpStatus.NOT_FOUND);
            return success;
        }
        
}
