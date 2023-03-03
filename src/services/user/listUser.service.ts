import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { User } from "../../entities"
import { IUsersReturnArray} from "../../interfaces/users.interfaces"
import { returnArrayUsers } from "../../schemas/user.schemas"

const listUsers = async ():Promise<IUsersReturnArray> => {

    const userRepo: Repository<User> = AppDataSource.getRepository(User)

    const findUsers:User[] = await userRepo.find()
    
    const Allusers = returnArrayUsers.parse(findUsers)

    return Allusers
}

export default listUsers