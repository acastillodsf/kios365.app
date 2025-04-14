const getConfig = async()=>  {
    return new Promise(async(resolve,reject) => {
        try {
            const response = await fetch('/config/token.json');
            const config = await response.json();
            resolve(config);
          } catch (error) {
            reject(error);
          }
    })
  }

  export default  getConfig;