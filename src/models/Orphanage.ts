import mongoose from "mongoose";

export interface IImage {
  public_id: string;
  url: string;
}

export interface IOrphanage {
  _id: string;
  name: string;
  latitude: string;
  longitude: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  is_accepted: boolean;
  whatsapp: string;
  images: IImage[];
}

const OrphanageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  about: { type: String, required: true },
  instructions: { type: String, required: true },
  opening_hours: { type: String, required: true },
  open_on_weekends: { type: Boolean, required: true },
  is_accepted: { type: Boolean, required: true },
  whatsapp: { type: String, required: true },
  images: [
    {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
});

export default mongoose.model("Orphanage", OrphanageSchema);
