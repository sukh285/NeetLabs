export const generatePrompt = ({
  problemTitle,
  problemDescription,
  userCode,
  question,
}) => {
  return [
    {
      role: "user",
      parts: [
        {
          text:
            `You are an AI assistant helping with competitive programming problems.\n\n` +
            `Problem Title: ${problemTitle}\n\n` +
            `Problem Description:\n${problemDescription}\n\n` +
            `User's Current Code:\n${userCode}\n\n` +
            `User's Question: ${question}\n\n` +
            `Provide only helpful hints without directly giving away the answer.`,
        },
      ],
    },
  ];
};
