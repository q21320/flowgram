import { getUrlData } from '../utils';
export const http = (ual: string | URL | Request, headers: RequestInit | undefined) => fetch(ual, headers).then(response => response.json())

const Get = async (url: string) => {
  return http(url, {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  })
};

const Post = async (url: string, data: Record<string, any>) => {
  return http(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "user-token": getUrlData('token') || "",
    },
    body: JSON.stringify(data)
  });
};


export const getFlowDetail = async () => {
  return Post('/shares/api/v1/flow.get_flow', { flowId: getUrlData('flowId') })
}