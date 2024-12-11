// logger.js
const logger = {
    log: (message) => {
      if (process.env.NODE_ENV !== "production") {
        console.log(`[LOG] ${new Date().toISOString()}: ${message}`);
      }
    },
  
    error: (message) => {
      if (process.env.NODE_ENV !== "production") {
        console.error(`[ERROR] ${new Date().toISOString()}: ${message}`);
      }
    },
  
    warn: (message) => {
      if (process.env.NODE_ENV !== "production") {
        console.warn(`[WARN] ${new Date().toISOString()}: ${message}`);
      }
    },
  };
  
  export default logger;
  