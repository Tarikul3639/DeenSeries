export const uploadToCloudinary = async (
  file: File,
  signatureData: any
) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("api_key", signatureData.api_key);
  formData.append("timestamp", signatureData.timestamp);
  formData.append("signature", signatureData.signature);
  formData.append("folder", signatureData.folder);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${signatureData.cloud_name}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  return res.json();
};