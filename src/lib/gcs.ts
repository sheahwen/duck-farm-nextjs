import { Storage } from '@google-cloud/storage';

const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  credentials: {
    client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
});

const bucketName = process.env.GOOGLE_CLOUD_BUCKET_NAME || '';

if (!bucketName) {
  throw new Error('GOOGLE_CLOUD_BUCKET_NAME environment variable is not set');
}

const bucket = storage.bucket(bucketName);

export async function uploadFile(
  fileBuffer: Buffer,
  fileName: string,
  contentType: string
): Promise<string> {
  const blob = bucket.file(fileName);

  await blob.save(fileBuffer, {
    contentType,
    metadata: {
      cacheControl: 'public, max-age=31536000',
    },
  });

  await blob.makePublic();

  return `https://storage.googleapis.com/${bucketName}/${fileName}`;
}

export async function getSignedUrl(fileName: string): Promise<string> {
  const [url] = await bucket.file(fileName).getSignedUrl({
    version: 'v4',
    action: 'read',
    expires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  });

  return url;
}

export async function deleteFile(fileName: string): Promise<void> {
  await bucket.file(fileName).delete();
}
