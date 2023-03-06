import { z } from "zod";
import { realEstateSchema, returnArrayRealEstate, returnEstateSchemaComplet, returnRealEstateSchemaComplet } from "../schemas/realEstate.schemas";

type IRealEstate = z.infer<typeof realEstateSchema>;

type IReturnRealEstate = z.infer<typeof returnEstateSchemaComplet>

type IReturnResult = z.infer<typeof returnRealEstateSchemaComplet>

type IReturnArray = z.infer<typeof returnArrayRealEstate>

export { IRealEstate,IReturnRealEstate,IReturnResult,IReturnArray };
