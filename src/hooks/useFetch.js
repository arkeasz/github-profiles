import { ref } from 'vue';


export const useFetch = async(url = "", options = {}) =>   {
    const response = ref([]);

    const res = await fetch(url, options);
    const data = await res.json();
    response.value = data;

    return response;
}
