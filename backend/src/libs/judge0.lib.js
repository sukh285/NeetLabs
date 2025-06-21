import axios from "axios";

export const getJudge0LanguageId = (language) => {
  const languageMap = {
    PYTHON: 71,
    JAVA: 62,
    JAVASCRIPT: 63,
  };

  return languageMap[language.toUpperCase()];
};

export const submitBatch = async (submissions) => {
  const { data } = await axios.post(
    `${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,
    {
      submissions,
    }
  );

  //har endpoint 2 baar hit hoga - 1st returns tokens for identification and 2nd returns data

  console.log("Submission Results", data);

  return data; //[{token}, {token}, {token}]
};

const sleep = (ms) => {
  new Promise((resolve) => setTimeout(resolve, ms)); //calls endpoint after the specified timer in seconds
};

export const pollBatchResults = async (tokens) => {
  //polling = asking endpoint if the work is done repetitively
  while (true) {
    const { data } = await axios.get(
      `${process.env.JUDGE0_API_URL}/submissions/batch`,
      {
        params: {
          tokens: tokens.join(","),
          base64_encoded: false,
        },
      }
    );

    const results = data.submissions; //look for status id in this

    const isAllDone = results.every(
      (r) => r.status.id !== 1 && r.status.id !== 2 //to check for in queue and running
    );

    if (isAllDone) return results;

    await sleep(1000);
  }
};
