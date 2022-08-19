import { IsNotEmpty, IsString } from 'class-validator';

// ids DTO
export class userId {
  @IsString()
  @IsNotEmpty()
  userId: string;
}

export class moderatorId {
  @IsString()
  @IsNotEmpty()
  moderatorId: string;
}

export class postId {
  @IsString()
  @IsNotEmpty()
  postId: string;
}
