// import s3 from "../config/Aws.ts";
// import ENV from "../config/ENV.ts";


// interface UploadResult {
//   Bucket: string;
//   Key: string;
//   Location: string;
// }

// const uploadImages = async (
//   files: any,
//   folderPath: string,
//   deleteKey?: string // optional old file to delete
// ): Promise<UploadResult[]> => {
//   try {
//     // Convert single file to array
//     const filesArray = Array.isArray(files) ? files : [files];

//     // Optionally delete old file from S3
//     if (deleteKey) {
//       try {
//         await s3
//           .deleteObject({
//             Bucket: ENV.AWS_S3_BUCKET_NAME,
//             Key: deleteKey,
//           })
//           .promise();
//         console.log(`🗑️ Deleted old file from S3: ${deleteKey}`);
//       } catch (err) {
//         console.warn(`⚠️ Could not delete old file: ${deleteKey}`, err);
//       }
//     }

//     // Upload new files
//     const uploadPromises = filesArray.map((file) => {
//       const filename = `${Date.now()}-${file.originalname}`;

//       const params = {
//         Bucket: ENV.AWS_S3_BUCKET_NAME,
//         Key: `${folderPath}/${filename}`,
//         Body: file.buffer,
//         ContentType: file.mimetype,
//         ACL: "public-read",
//       };

//       return s3.upload(params).promise();
//     });

//     const results = await Promise.all(uploadPromises);

//     return results.map((result) => ({
//       Bucket: result.Bucket,
//       Key: result.Key,
//       Location: result.Location,
//     }));
//   } catch (error) {
//     console.error("❌ S3 upload error:", error);
//     throw error;
//   }
// };

// export default uploadImages;
