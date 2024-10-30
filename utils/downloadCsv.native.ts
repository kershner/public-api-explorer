import { jsonToCsv, JsonObject } from '@/utils/utils';
import RNFS from 'react-native-fs';

export async function downloadCsv<T extends JsonObject>(json: T[], filename = 'data.csv') {
  const csvContent = jsonToCsv(json);
  const path = `${RNFS.DownloadDirectoryPath}/${filename}`;

  await RNFS.writeFile(path, csvContent, 'utf8')
    .then(() => console.log(`File saved to ${path}`))
    .catch(error => console.error('Error saving file:', error));
}
