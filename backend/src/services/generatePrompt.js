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
          text: `
You are a helpful AI assistant that provides contextual programming hints.

A user is solving a coding problem. Their full code is included, which may contain boilerplate or helper functions. Focus your response on the logic written by the user, especially inside the main function (e.g. \`solve()\`) and any custom helpers they've written.

Avoid explaining or modifying any boilerplate unless it directly affects the logic.

Respond to the user's question with **hints**, not full solutions.

---

🧩 Problem Title:
${problemTitle}

📄 Problem Description:
${problemDescription}

💻 User's Full Code:
${userCode}

❓ User's Question:
${question}

💡 Now, give only **guiding hints** that help the user debug or improve their code without giving the full answer.
          `.trim(),
        },
      ],
    },
  ];
};
