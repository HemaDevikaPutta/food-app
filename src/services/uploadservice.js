import { toast } from 'react-toastify';
import AxiosService from '../axiosConfig';

export const uploadImage = async( event) => {
  let toastId = null;

  const image = await getImage(event);
  if (!image) return null;

  const formData = new FormData();
  formData.append('image', image, image.name);
  const response = await AxiosService.post('api/upload/', formData,{
    headers:{
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress: ({ progress }) => {
      console.log(progress);
      if (toastId) toast.update(toastId, { progress });
      else toastId = toast.success('Uploading...', { progress });
    },
  }, 
);
  toast.dismiss(toastId);
  console.log(response.data.data.imageUrl);
  return response.data.data.imageUrl;
  
};
export const imageUrl = async () => {
  const { data } = await AxiosService.get('/api/upload/');
  return data;
};

const getImage = async event => {
  const files = event.target.files;

  if (!files || files.length <= 0) {
    toast.warning('Upload file is nott selected!', 'File Upload');
    return null;
  }

  const file = files[0];

  if (file.type !== 'image/jpeg') {
    toast.error('Only JPG type is allowed', 'File Type Error');
    return null;
  }

  return file;
};
// import { toast } from 'react-toastify';
// import AxiosService from '../axiosConfig';

// export const uploadImage = async (event) => {
//   let toastId = null;

//   const image = await getImage(event);
//   if (!image) return null;

//   const formData = new FormData();
//   formData.append('image', image, image.name);

//   try {
//     const response = await AxiosService.post('api/upload/', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       },
//       onUploadProgress: ({ progress }) => {
//         if (toastId) toast.update(toastId, { progress });
//         else toastId = toast.success('Uploading...', { progress });
//       },
//     });

//     toast.dismiss(toastId);
//     return response.data.imageUrl; // Assuming the response contains the binary image data
//   } catch (error) {
//     console.error('Error uploading image:', error);
//     toast.error('Error uploading image', 'Upload Error');
//     return null;
//   }
// };

// const getImage = async (event) => {
//   const files = event.target.files;

//   if (!files || files.length <= 0) {
//     toast.warning('Upload file is not selected!', 'File Upload');
//     return null;
//   }

//   const file = files[0];

//   if (file.type !== 'image/jpeg') {
//     toast.error('Only JPG type is allowed', 'File Type Error');
//     return null;
//   }

//   return file;
// };
