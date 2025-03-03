import { Response } from "express"

import { IPaginationQuery, IReqUser } from "../utils/interfaces"
import CategoryModel, {categoryDAO} from "../models/category.model"
import response from "../utils/response"


export default {
  async create(req: IReqUser, res: Response) {
    try {
      await categoryDAO.validate(req.body);
      const result = await CategoryModel.create(req.body);
      response.success(res, result, "success create category")
    } catch (error) {
      response.error(res, error, "failed create category")
    }
  },
  async findAll(req: IReqUser, res: Response) {
    const {page = 1, limit = 10, search} = req.query as unknown as IPaginationQuery
    try {

      const query = {}

      if (search) {
        Object.assign(query,{
          $or: [
            {
              name: {
                $regex: search,
                $options: "i"
              }
            },
            {
              description: {
                $regex: search,
                $options: "i"
              }
            },
          ]
        })
      }


      const result = await CategoryModel
      .find(query)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({createdAt: -1})
      .exec();

      const count = await CategoryModel.countDocuments(query);

      response.pagination(res, result, {
        total: count,
        totalPages:Math.ceil(count / limit),
        current: page,
      }, "success findAll Category")


    } catch (error) {
      response.error(res, error, "failed findAll Category")
    }
  },
  async findOne(req: IReqUser, res: Response) {
    try {
      const {id} = req.params;
      const result = await CategoryModel.findById(id);
      response.success(res, result, "success findOne category")
    } catch (error) {
      response.error(res, error, "failed findOne category")
    }
  },
  async update(req: IReqUser, res: Response) {
    try {
      const {id} = req.params;
      const result = await CategoryModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      response.success(res, result, "success Update category")
    } catch (error) {
      response.error(res, error, "failed Update category")
    }
  },
  async remove(req: IReqUser, res: Response) {
    try {
      const {id} = req.params;
      const result = await CategoryModel.findByIdAndDelete(id);
      response.success(res, result, "success Remove category")
    } catch (error) {
      response.error(res, error, "failed Remove category")
    }
  },
}