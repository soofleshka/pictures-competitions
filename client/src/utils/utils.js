export const corsProxyUrl = "https://cors-anywhere.herokuapp.com/";

export const fileTypes = ["image/jpeg", "image/jpg", "image/png"];

export function validFileType(file) {
  for (let i = 0; i < fileTypes.length; i++) {
    if (file.type === fileTypes[i]) {
      return true;
    }
  }
  return false;
}

export function createFileName(urlFileInput) {
  return urlFileInput.substring(
    urlFileInput.lastIndexOf("/") + 1,
    urlFileInput.length
  );
}
