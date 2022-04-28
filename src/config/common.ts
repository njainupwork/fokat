export const getUrls = () => ({
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL,
  RPC_URL_1: process.env.REACT_APP_NODE_1,
  RPC_URL_4: process.env.REACT_APP_NODE_2,
})

export default { getUrls }
