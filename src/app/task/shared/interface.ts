
export interface ITask {
    id?:any,
    title: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
}
export interface NetworkResponse<Collection> {
  statusCode: number,
  message: string,
  data: Collection,
  extraData?: ExtraData
}
export interface ExtraData {
  perPage: number;
  page: number;
  total: number;
}
export interface Pagination{
  page: number,
  perPage: number,
  total?: number
}