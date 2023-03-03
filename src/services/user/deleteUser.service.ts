import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { User } from "../../entities"

const deleteUserService = async (idUser:number):Promise<void>=>{
    const userRepo:Repository<User> = AppDataSource.getRepository(User)

    const user = await userRepo.findOne({
        where:{
            id:idUser
        }
    })

    await userRepo.softRemove(user!)
}

export default deleteUserService