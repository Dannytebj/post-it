export interface GroupResponse {
  _id: string;
  message?: string;
  group: {
    messages: Array<String>,
    users: Array<Object>,
    _id: string,
    name: string,
    createdBy: Array<Object>
  };
}
