import {NextFunction, Request, Response} from "express";
import {Model} from "mongoose";
import APIFeatures from "@/helpers/api_features";
import { Types } from "mongoose";


class BaseService{

    getAllData  = async (Model:Model<any>, req:Request, filter?:any)   => {

        // To allow for nested GET reviews on tour(hack)
        // let filter = {};
        // if (req.params.tourId) filter = { tour: req.params.tourId};

        //BUILD THE QUERY
        const features = new APIFeatures(Model.find(filter?filter:{}), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();

        //EXECUTE THE QUERY
        const docs = await features.query;


        return docs;
    };


}

export default BaseService;