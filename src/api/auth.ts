import api from "./api";

export interface AuthProps {
  login: string;
  password: string;
}

const auth = async (data: AuthProps) => {
  try {
    const response = await api.post('/api/v1/account/login', JSON.stringify(data), {
      headers: {
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

export default auth;
