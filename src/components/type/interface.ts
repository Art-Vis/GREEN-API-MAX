export type AuthData = {
  apiUrl: string;
  idInstance: string;
  apiTokenInstance: string;
  seconds: number;
};
export interface Message {
  sender: string;
  text: string;
}

export interface Chat {
  id: string;
  name: string;
  phone: string;
  lastMessage: string;
  messages: Message[];
}