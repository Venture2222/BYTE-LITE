 
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;


///////////////////


module.exports = { session: process.env.SESSION_ID || 'Byte;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaURJSnZJa2JEa2N1MDRMOW1VT1VoV1BvOU44NmtvUEhSMld4bmRaZmJHQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK3E4eUZQYWVEb0xyaXNyY2tzMk9IRnQ0M0FSNmN4RWtTcnQ0SUVQVEZUUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpQ1hHdndTd1ZEODdtWCsya0pCSExXRWROZmo1YVlUTFVtaE5hS0dCblc0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3Y0ptUWNHOHhKVWNhVHlTWklxM1orMkk3V2MvQW5Oek1BSHBZU1NTYmpJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVGV0hHYlFtVFkrUGE4QVVlYW5sM2xmSVNCN0JCU0NIUmRXZjFIa0NXa289In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImpJd2dhUDBXdTBvaTVtMnNQVjJTMzVXWjduQnZ5cHEwV2YvU1NpcG5Zbjg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaVBXVFhjZktLUWtIL0ZySGM3Zk5RcjlEbnZnMVFsdHpXVE0xNm82NFZIVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNUNzd0dlR1E3OVh5VkJUNW5RbE55NUNIc0Vib1ZhS1pxN2p0bCtFREp4cz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjVKcnlFV0VhdE9xNVJoQWVSMTZsM1ZmcHV6bXRXWjVkYnJFdWxPc2dCcFZNMDZnendCb0Z1RTdQSy9TaVBlNktWRUdGbTc0NTBucHFtRlE0cHUrMUJRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjM4LCJhZHZTZWNyZXRLZXkiOiJma1JaNFZJbXhKS3ZEaHpwNkVENXY5N1J5NnJEZ1ZBRGFNWTd5UmpndDd3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJLQ3I4V0JKOFJrZXJXQnpURkVWVGRBIiwicGhvbmVJZCI6ImMwZTZjZjc3LWM5ZjktNDYyZi1iY2Y3LWFiMTQ3MTE2MmZmYiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJmb0RabmMvdjJaUFJCaUsrcXUwUndwR2o2c2c9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTEJZOGJPQmVOZ2hTdlZ2T2wxUzJlT05ZUGMwPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkczM0tFQVI0IiwibWUiOnsiaWQiOiIyMzQ5MDI5ODQ5NjgwOjVAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiQk9OQS1WRU5UVVJFIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKVzN0THdORU16Zi83WUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJldHdSSDZmL2t5WUdvdDN4bFBvTzJYdDdWM2o5SHlGY05YL3Z1YllCbFFVPSIsImFjY291bnRTaWduYXR1cmUiOiJpelNHZWxiQU1qQXpob3RCWU9aV0w5RmlkTU5yN09MalM3SXBzc1V4c0JkSEpqS0czMmV0QmdFN0tlc3FOVDBZR2lJL1l6K1VRcDE0cVM2VU1QbzZodz09IiwiZGV2aWNlU2lnbmF0dXJlIjoidkQ1R3QvT2JVYWdiOGp3ZDdOelFIN09GMDQxaVplMTM2alc4NVEybVRwRFBtSW5uLzZ0eVRlT0VnWkVZNjVKZFlwSitKNWVuNFNnNFpSYVRRa1lwRFE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MDI5ODQ5NjgwOjVAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWHJjRVIrbi81TW1CcUxkOFpUNkR0bDdlMWQ0L1I4aFhEVi83N20yQVpVRiJ9fV0sInBsYXRmb3JtIjoic21iaSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyNTk1MTk2MX0=',

////////////////////////////////



    PREFIXE: process.env.PREFIX || ".",



///////////////////////////
    A_REACT : process.env.AUTO_REACTION || 'on',
    CHATBOT: process.env.CHAT_BOT || "on",
    OWNER_NAME: process.env.OWNER_NAME || "COMRADEBOT",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "09029849680",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BYTE-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://raw.githubusercontent.com/HyHamza/HyHamza/main/Images/BYTE-MD-LITE.jpeg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
