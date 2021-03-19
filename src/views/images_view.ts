import Image from "../models/Image";

export default {
  render(image: Image) {
    return {
      id: image.id,
      public_id: image.public_id,
      url: image.url,
    };
  },

  renderMany(images: Image[]) {
    return images.map((image) => this.render(image));
  },
};
