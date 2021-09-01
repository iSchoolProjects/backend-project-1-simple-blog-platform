import { EntityRepository, Repository } from 'typeorm';
import { UserPhoto } from '../../entity/user-photo/user-photo.entity';

@EntityRepository(UserPhoto)
export class UserPhotoRepository extends Repository<UserPhoto> {}
