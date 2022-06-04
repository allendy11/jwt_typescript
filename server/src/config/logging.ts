const info = (namespace: string, message: string) => {
  // console.info(`[${getTimeStamp()}] [INFO] [${namespace}] [${message}]`);
  console.info(`INFO: [${namespace}] [${message}]`);
};
const error = (namespace: string, message: string) => {
  // console.info(`[${getTimeStamp()}] [ERROR] [${namespace}] [${message}]`);
  console.info(`ERROR: [${namespace}] [${message}]`);
};

const getTimeStamp = (): string => {
  return new Date().toLocaleString();
};

export default { info };
