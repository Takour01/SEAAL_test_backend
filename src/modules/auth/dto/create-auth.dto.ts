import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Role } from "src/guards/role/role.guard";



export class CreateAuthDto {
    @ApiProperty({
        description: 'the username to login',
        example: 'Mohamed'
    })
    @IsString()
    @IsNotEmpty()
    username: string;
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'password',
        example: 'password'
    })
    password: string;
    @ApiProperty({
        description: 'role',
        example: 'Manager'
    })
    @IsEnum(["Administrator", "Manager"])
    role: "Administrator" | "Manager"
}
