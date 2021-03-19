import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Image from "../models/Image";
import Orphanage from "../models/Orphanage";
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
    const orphanagesRepository = getRepository(Orphanage);

    let orphanages = await orphanagesRepository.find({
      relations: ["images"],
    });

    if (accepted) {
      orphanages = orphanages.filter((orphanage) => orphanage.is_accepted);
    }

    return response.json(orphanageView.renderMany(orphanages));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ["images"],
    });

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

    const orphanagesRepository = getRepository(Orphanage);

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

    const orphanage = orphanagesRepository.create(data);

    await orphanagesRepository.save(orphanage);

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

    const orphanagesRepository = getRepository(Orphanage);
    const imagesRepository = getRepository(Image);

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ["images"],
    });

    const imagesToDelete = orphanage.images.filter(
      ({ public_id: firstId }) =>
        !parsedSavedImages.some(
          ({ public_id: secondId }) => secondId === firstId
        )
    );

    imagesToDelete.map(async (image) => {
      await imagesRepository.delete(image.id);
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

    if (images.length > 0) {
      images = images.map((image) => {
        return {
          url: image.url,
          public_id: image.public_id,
          orphanage: {
            id,
          },
        };
      });

      const newImages = imagesRepository.create(images);
      await imagesRepository.save(newImages);
    }

    const newOrphanage = await orphanagesRepository.update(id, data);

    return response.status(201).json(newOrphanage);
  },

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ["images"],
    });

    if (orphanage) {
      orphanage.images.map((image) => {
        cloudinaryDelete(image.public_id);
      });

      const response = await orphanagesRepository.delete(id);
    }

    return response.status(200).json(orphanageView.render(orphanage));
  },
};
