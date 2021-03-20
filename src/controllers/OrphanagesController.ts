import { Request, Response } from "express";
import Orphanage, { IOrphanage } from "../models/Orphanage";
import orphanageView from "../views/orphanages_view";
import {
  cloudinaryUpload,
  cloudinaryDelete,
} from "../utils/cloudinaryFunctions";
import imageToDataURI from "../utils/imageToDataURI";
import * as Yup from "yup";

export default {
  async index(request: Request, response: Response) {
    const { accepted } = request.query;

    let orphanages: IOrphanage[] | any = await Orphanage.find({});

    if (accepted) {
      orphanages = orphanages.filter(
        (orphanage: IOrphanage) => orphanage.is_accepted
      );
    }

    return response.json(orphanageView.renderMany(orphanages));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const orphanage: IOrphanage | any = await Orphanage.findById(id);

    return response.json(orphanageView.render(orphanage));
  },

  async create(request: Request, response: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      whatsapp,
    } = request.body;

    const requestImages = request.files as Express.Multer.File[];

    const images = await Promise.all(
      requestImages.map(async (image) => {
        const imageData = imageToDataURI(image);
        const response = cloudinaryUpload(imageData);
        return response;
      })
    );

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === "true",
      whatsapp,
      is_accepted: false,
      images,
    } as any;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      whatsapp: Yup.string().required().min(9).max(15),
      images: Yup.array(
        Yup.object().shape({
          public_id: Yup.string().required(),
          url: Yup.string().required(),
        })
      ),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const newOrphanage = new Orphanage(data);

    const orphanage = await newOrphanage.save();

    return response.status(201).json(orphanage);
  },

  async update(request: Request, response: Response) {
    const {
      id,
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      savedImages,
      is_accepted,
      whatsapp,
    } = request.body;

    const parsedSavedImages = JSON.parse(savedImages);

    const orphanage = await Orphanage.findById(id);
    console.log({ parsedSavedImages });
    console.log(orphanage.images);
    let imagesToDelete = orphanage.images.filter(
      ({ public_id: firstId }: any) =>
        parsedSavedImages.some(
          ({ public_id: secondId }: any) => secondId === firstId
        )
    );

    imagesToDelete.map(async (image: any) => {
      cloudinaryDelete(image.public_id);
    });

    const requestImages = request.files as Express.Multer.File[];

    let images = await Promise.all(
      requestImages.map(async (image) => {
        const imageData = imageToDataURI(image);
        const response = cloudinaryUpload(imageData);
        return response;
      })
    );

    imagesToDelete = imagesToDelete.map((image: any) => {
      delete image._id;
      return image;
    });

    console.log(imagesToDelete);

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === "true",
      whatsapp,
      is_accepted: is_accepted === "true",
      images: [...imagesToDelete, ...images],
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      whatsapp: Yup.string().required().min(9).max(15),
      images: Yup.array(
        Yup.object().shape({
          public_id: Yup.string().required(),
          url: Yup.string().required(),
        })
      ),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    // if (images.length > 0) {
    //   images = images.map((image: any) => {
    //     return {
    //       url: image.url,
    //       public_id: image.public_id,
    //       orphanage: {
    //         id,
    //       },
    //     };
    //   });

    //   const newImages = imagesRepository.create(images as any);
    //   await imagesRepository.save(newImages);
    // }

    const newOrphanage = await orphanage.update(data);
    return response.status(201).json(newOrphanage);
  },

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const orphanage = await Orphanage.findById(id);
    if (orphanage) {
      orphanage.images.map((image: any) => {
        cloudinaryDelete(image.public_id);
      });

      const response = await orphanage.delete();
    }
    return response.status(200).json(orphanageView.render(orphanage));
  },
};
