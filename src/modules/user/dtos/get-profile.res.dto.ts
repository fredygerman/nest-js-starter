import { ApiProperty } from '@nestjs/swagger';

export class GetProfileResDto {
  @ApiProperty({
    description: 'Message to the user',
    example: 'Login successful',
  })
  message: string;

  @ApiProperty({
    description: 'User details',
    // type: 'object', fix type to the actual type later 
  })
  user: any;
}
