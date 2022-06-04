const info = (namespace: string, message: string) => {
  // console.info(`[${getTimeStamp()}] [INFO] [${namespace}] [${message}]`);
  console.info(`[${namespace}] [${message}]`);
};

const getTimeStamp = (): string => {
  return new Date().toLocaleString();
};

export default { info };
