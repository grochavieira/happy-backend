import cloudinary from "./cloudinary";

export const cloudinaryUpload = async (imageData: string) => {
  try {
    const uploadedResponse = await cloudinary.uploader.upload(imageData, {
      upload_preset: "happy",
      timeout: 1200000,
    });
    return {
      public_id: uploadedResponse.public_id,
      url: uploadedResponse.secure_url,
    };
  } catch (error) {
    console.log(error);
  }
};

export const cloudinaryDelete = async (public_id: string) => {
  try {
    console.log("começou");
    await cloudinary.uploader.destroy(public_id, function (
      err: any,
      result: any
    ) {});
  } catch (error) {
    console.log(error);
  }
};
