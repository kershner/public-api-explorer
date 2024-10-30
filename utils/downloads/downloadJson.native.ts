import RNFS from 'react-native-fs';

export async function downloadJson(value: object, filename: string) {
  const path = `${RNFS.DownloadDirectoryPath}/${filename}`;
  const jsonContent = JSON.stringify(value, null, 2);

  try {
    await RNFS.writeFile(path, jsonContent, 'utf8');
    console.log(`File saved to ${path}`);
  } catch (error) {
    console.error('Error saving JSON file:', error);
  }
}
