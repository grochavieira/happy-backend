import Orphanage, { IOrphanage } from "../models/Orphanage";
export default {
  render(orphanage: IOrphanage) {
    return {
      id: orphanage._id,
      name: orphanage.name,
      latitude: Number(orphanage.latitude),
      longitude: Number(orphanage.longitude),
      about: orphanage.about,
      instructions: orphanage.instructions,
      opening_hours: orphanage.opening_hours,
      open_on_weekends: orphanage.open_on_weekends,
      whatsapp: orphanage.whatsapp,
      is_accepted: orphanage.is_accepted,
      images: orphanage.images,
    };
  },

  renderMany(orphanages: IOrphanage[]) {
    return orphanages.map((orphanage) => this.render(orphanage));
  },
};
