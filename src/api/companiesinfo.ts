import api from "./api";

const companiesInfo = async (token: string) => {
  try {
    const response = await api.get('/api/v1/account/info', {
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

export default companiesInfo;
