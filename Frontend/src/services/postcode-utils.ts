import { Postcode } from "../schema/postcode.tsx";
import instance from "./axios";
export class postcodeUtils {
  public static async get(): Promise<Postcode[]> {
    const data = await instance.get("/");
    return data.data;
  }
  public static async getById(id: number | undefined): Promise<Postcode> {
    const data = await instance.get(`/${id}`);
    return data.data;
  }

  public static async createPostcode(data: any): Promise<Postcode> {
    const response = await instance.post(`/`, data);
    return response.data;
  }

  public static async deletePostcodeById(id: number): Promise<Postcode> {
    const response = await instance.delete(`/${id}`);
    return response.data;
  }

  public static async updatePostcodeById(
    id: number | undefined,
    data: any
  ): Promise<Postcode> {
    const response = await instance.patch(`/${id}`, data);
    return response.data;
  }
}
