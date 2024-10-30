import { jsonToCsv, JsonObject } from '@/utils/utils';

export async function downloadCsv<T extends JsonObject>(json: T[], filename = 'data.csv') {
  const csvContent = jsonToCsv(json);
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
