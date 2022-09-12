import S3, { PutObjectRequest } from 'aws-sdk/clients/s3';

export async function s3UploadStoreImage(files: Express.Multer.File[], fileName : string) {
    const s3 = new S3()
    const params: PutObjectRequest[] = files.map((file) => {
        return {
        Bucket: process.env.AWS_BUCKET_NAME as string,
        Key: `${fileName}'/'${file.originalname}`,
        Body: file.buffer
        };
    });
    return await Promise.all(params.map((param) => s3.upload(param).promise()));
};
