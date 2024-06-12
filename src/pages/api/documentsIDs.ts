import api from "./api";

const documentsIDs = async (formData: Record<string, unknown>, token: string) => {
  try {
    const response = await api.post('/api/v1/objectsearch', JSON.stringify(formData), {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

export default documentsIDs;
