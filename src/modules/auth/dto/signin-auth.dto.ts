import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Role } from "src/guards/role/role.guard";

export class SinginAuthDto {
    @ApiProperty({
        description: 'the username to login',
        example: 'Mohamed'
    })
    @IsString()
    @IsNotEmpty()
    username: string;
    @ApiProperty({
        description: 'password',
        example: 'password'
    })
    @IsString()
    @IsNotEmpty()
    password: string;
    @ApiProperty({
        description: 'role',
        example: 'Manager'
    })
    @IsEnum(["Administrator", "Manager"])
    role: "Administrator" | "Manager"

}
