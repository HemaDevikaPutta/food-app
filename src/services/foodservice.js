// import {samplefoods, sampletags} from '../data';
// export const getAll = async()=> samplefoods;

// export const search = async searchTerm =>
// samplefoods.filter(item=>
//     item.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));

// export const getAllTags = async()=>sampletags;
// // console.log(getAllTags);

// export const getAllByTag = async tag =>{
//     if(tag === 'All') return getAll;
//     return samplefoods.filter(item =>item.tags?.includes(tag));

// }
// export const getById = async foodId =>
// samplefoods.find(item =>item.id === foodId);


import AxiosService from '../axiosConfig';

export const getAll = async () => {
    const { data } = await AxiosService.get('/api/foods');
    return data;
  };
  
  export const search = async searchTerm => {
    const { data } = await AxiosService.get('/api/foods/search/' + searchTerm);
    return data;
  };
  
  export const getAllTags = async () => {
    const { data } = await AxiosService.get('/api/foods/tags');
    return data;
  };
  
  export const getAllByTag = async tag => {
    if (tag === 'All') return getAll();
    const { data } = await AxiosService.get('/api/foods/tag/' + tag);
    return data;
  };
  
  export const getById = async foodId => {
    const { data } = await AxiosService.get('/api/foods/' + foodId);
    return data;
  };
  
  export async function deleteById(foodId) {
    await AxiosService.delete('/api/foods/' + foodId);
  }
  
  export async function update(food) {
    await AxiosService.put('/api/foods', food);
  }
  
  export async function add(food) {
    const { data } = await AxiosService.post('/api/foods', food);
    return data;
  }
  