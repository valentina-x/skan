import api from "./api";

const getDocuments = async (ids: Record<string, string[]>, token: string | null) => {
  try {
    const response = await api.post('/api/v1/documents', JSON.stringify(ids), {
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

export default getDocuments;
