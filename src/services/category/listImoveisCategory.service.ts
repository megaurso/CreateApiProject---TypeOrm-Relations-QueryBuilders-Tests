import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Category } from "../../entities"
import { AppError } from "../../errors"
import { returnResultAllEstateAndCategory } from "../../schemas/category.schemas"

const listCategoryImoveis = async (UserId:number) => {    
    const categoryRepo: Repository<Category>= AppDataSource.getRepository(Category)
    const findCategory = await categoryRepo.findOne({
        where: {
            id: UserId
        },
        relations:{
            realEstate: true
        }
    })
    
    if(!findCategory?.id){
        throw new AppError("Category not found",404)
    }

    const newResult = returnResultAllEstateAndCategory.parse(findCategory)

    return newResult
}   

export {
    listCategoryImoveis
}