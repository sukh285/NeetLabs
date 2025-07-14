import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Plus,
  Trash2,
  Code2,
  FileText,
  BookOpen,
  CheckCircle2,
  Download,
  Lightbulb,
  Save,
  Zap,
  Target,
  Trophy,
  Settings,
  TestTube,
  Puzzle,
} from "lucide-react";
import Editor from "@monaco-editor/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { axiosInstance } from "../lib/axios";

const problemSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  constraints: z.string().min(1, "Constraints are required"),
  hints: z.string().optional(),
  editorial: z.string().optional(),
  testcases: z
    .array(
      z.object({
        input: z.string().min(1, "Input is required"),
        output: z.string().min(1, "Output is required"),
      })
    )
    .min(1, "At least one test case is required"),
  examples: z.object({
    JAVASCRIPT: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
    PYTHON: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
    JAVA: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
  }),
  codeSnippet: z.object({
    JAVASCRIPT: z.string().min(1, "JavaScript code snippet is required"),
    PYTHON: z.string().min(1, "Python code snippet is required"),
    JAVA: z.string().min(1, "Java solution is required"),
  }),
  referenceSolution: z.object({
    JAVASCRIPT: z.string().min(1, "JavaScript solution is required"),
    PYTHON: z.string().min(1, "Python solution is required"),
    JAVA: z.string().min(1, "Java solution is required"),
  }),
});

const sampledpData = {
  title: "Climbing Stairs",
  category: "dp",
  description:
    "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
  difficulty: "EASY",
  tags: ["Dynamic Programming", "Math", "Memoization"],
  constraints: "1 <= n <= 45",
  hints:
    "To reach the nth step, you can either come from the (n-1)th step or the (n-2)th step.",
  editorial:
    "This is a classic dynamic programming problem. The number of ways to reach the nth step is the sum of the number of ways to reach the (n-1)th step and the (n-2)th step, forming a Fibonacci-like sequence.",
  testcases: [
    {
      input: "2",
      output: "2",
    },
    {
      input: "3",
      output: "3",
    },
    {
      input: "4",
      output: "5",
    },
  ],
  examples: {
    JAVASCRIPT: {
      input: "n = 2",
      output: "2",
      explanation:
        "There are two ways to climb to the top:\n1. 1 step + 1 step\n2. 2 steps",
    },
    PYTHON: {
      input: "n = 3",
      output: "3",
      explanation:
        "There are three ways to climb to the top:\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step",
    },
    JAVA: {
      input: "n = 4",
      output: "5",
      explanation:
        "There are five ways to climb to the top:\n1. 1 step + 1 step + 1 step + 1 step\n2. 1 step + 1 step + 2 steps\n3. 1 step + 2 steps + 1 step\n4. 2 steps + 1 step + 1 step\n5. 2 steps + 2 steps",
    },
  },
  codeSnippet: {
    JAVASCRIPT: `/**
  * @param {number} n
  * @return {number}
  */
  function climbStairs(n) {
  // Write your code here
  }
  
  // Parse input and execute
  const readline = require('readline');
  const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
  });
  
  rl.on('line', (line) => {
  const n = parseInt(line.trim());
  const result = climbStairs(n);
  
  console.log(result);
  rl.close();
  });`,
    PYTHON: `class Solution:
    def climbStairs(self, n: int) -> int:
        # Write your code here
        pass
  
  # Input parsing
  if __name__ == "__main__":
    import sys
    
    # Parse input
    n = int(sys.stdin.readline().strip())
    
    # Solve
    sol = Solution()
    result = sol.climbStairs(n)
    
    # Print result
    print(result)`,
    JAVA: `import java.util.Scanner;
  
  class Main {
    public int climbStairs(int n) {
        // Write your code here
        return 0;
    }
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int n = Integer.parseInt(scanner.nextLine().trim());
        
        // Use Main class instead of Solution
        Main main = new Main();
        int result = main.climbStairs(n);
        
        System.out.println(result);
        scanner.close();
    }
  }`,
  },
  referenceSolution: {
    JAVASCRIPT: `/**
  * @param {number} n
  * @return {number}
  */
  function climbStairs(n) {
  // Base cases
  if (n <= 2) {
    return n;
  }
  
  // Dynamic programming approach
  let dp = new Array(n + 1);
  dp[1] = 1;
  dp[2] = 2;
  
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  
  return dp[n];
  }
  
  // Parse input and execute
  const readline = require('readline');
  const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
  });
  
  rl.on('line', (line) => {
  const n = parseInt(line.trim());
  const result = climbStairs(n);
  
  console.log(result);
  rl.close();
  });`,
    PYTHON: `class Solution:
    def climbStairs(self, n: int) -> int:
        # Base cases
        if n <= 2:
            return n
        
        # Dynamic programming approach
        dp = [0] * (n + 1)
        dp[1] = 1
        dp[2] = 2
        
        for i in range(3, n + 1):
            dp[i] = dp[i - 1] + dp[i - 2]
        
        return dp[n]
  
  # Input parsing
  if __name__ == "__main__":
    import sys
    
    # Parse input
    n = int(sys.stdin.readline().strip())
    
    # Solve
    sol = Solution()
    result = sol.climbStairs(n)
    
    # Print result
    print(result)`,
    JAVA: `import java.util.Scanner;
  
  class Main {
    public int climbStairs(int n) {
        // Base cases
        if (n <= 2) {
            return n;
        }
        
        // Dynamic programming approach
        int[] dp = new int[n + 1];
        dp[1] = 1;
        dp[2] = 2;
        
        for (int i = 3; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        
        return dp[n];
    }
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int n = Integer.parseInt(scanner.nextLine().trim());
        
        // Use Main class instead of Solution
        Main main = new Main();
        int result = main.climbStairs(n);
        
        System.out.println(result);
        scanner.close();
    }
  }`,
  },
};

const sampleStringProblem = {
  title: "Valid Palindrome",
  description:
    "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string s, return true if it is a palindrome, or false otherwise.",
  difficulty: "EASY",
  tags: ["String", "Two Pointers"],
  constraints:
    "1 <= s.length <= 2 * 10^5\ns consists only of printable ASCII characters.",
  hints:
    "Consider using two pointers, one from the start and one from the end, moving towards the center.",
  editorial:
    "We can use two pointers approach to check if the string is a palindrome. One pointer starts from the beginning and the other from the end, moving towards each other.",
  testcases: [
    {
      input: "A man, a plan, a canal: Panama",
      output: "true",
    },
    {
      input: "race a car",
      output: "false",
    },
    {
      input: " ",
      output: "true",
    },
  ],
  examples: {
    JAVASCRIPT: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.',
    },
    PYTHON: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.',
    },
    JAVA: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.',
    },
  },
  codeSnippet: {
    JAVASCRIPT: `/**
     * @param {string} s
     * @return {boolean}
     */
    function isPalindrome(s) {
      // Write your code here
    }
    
    // Add readline for dynamic input handling
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    });
    
    // Process input line
    rl.on('line', (line) => {
      // Call solution with the input string
      const result = isPalindrome(line);
      
      // Output the result
      console.log(result ? "true" : "false");
      rl.close();
    });`,
    PYTHON: `class Solution:
        def isPalindrome(self, s: str) -> bool:
            # Write your code here
            pass
    
    # Input parsing
    if __name__ == "__main__":
        import sys
        # Read the input string
        s = sys.stdin.readline().strip()
        
        # Call solution
        sol = Solution()
        result = sol.isPalindrome(s)
        
        # Output result
        print(str(result).lower())  # Convert True/False to lowercase true/false`,
    JAVA: `import java.util.Scanner;
  
  public class Main {
      public static String preprocess(String s) {
          return s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
      }
  
      public static boolean isPalindrome(String s) {
         
      }
  
      public static void main(String[] args) {
          Scanner sc = new Scanner(System.in);
          String input = sc.nextLine();
  
          boolean result = isPalindrome(input);
          System.out.println(result ? "true" : "false");
      }
  }
  `,
  },
  referenceSolution: {
    JAVASCRIPT: `/**
     * @param {string} s
     * @return {boolean}
     */
    function isPalindrome(s) {
      // Convert to lowercase and remove non-alphanumeric characters
      s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
      
      // Check if it's a palindrome
      let left = 0;
      let right = s.length - 1;
      
      while (left < right) {
        if (s[left] !== s[right]) {
          return false;
        }
        left++;
        right--;
      }
      
      return true;
    }
    
    // Add readline for dynamic input handling
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    });
    
    // Process input line
    rl.on('line', (line) => {
      // Call solution with the input string
      const result = isPalindrome(line);
      
      // Output the result
      console.log(result ? "true" : "false");
      rl.close();
    });`,
    PYTHON: `class Solution:
        def isPalindrome(self, s: str) -> bool:
            # Convert to lowercase and keep only alphanumeric characters
            filtered_chars = [c.lower() for c in s if c.isalnum()]
            
            # Check if it's a palindrome
            return filtered_chars == filtered_chars[::-1]
    
    # Input parsing
    if __name__ == "__main__":
        import sys
        # Read the input string
        s = sys.stdin.readline().strip()
        
        # Call solution
        sol = Solution()
        result = sol.isPalindrome(s)
        
        # Output result
        print(str(result).lower())  # Convert True/False to lowercase true/false`,
    JAVA: `import java.util.Scanner;
  
  public class Main {
      public static String preprocess(String s) {
          return s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
      }
  
      public static boolean isPalindrome(String s) {
          s = preprocess(s);
          int left = 0, right = s.length() - 1;
  
          while (left < right) {
              if (s.charAt(left) != s.charAt(right)) return false;
              left++;
              right--;
          }
  
          return true;
      }
  
      public static void main(String[] args) {
          Scanner sc = new Scanner(System.in);
          String input = sc.nextLine();
  
          boolean result = isPalindrome(input);
          System.out.println(result ? "true" : "false");
      }
  }
  `,
  },
};

const CreateProblemForm = () => {
  const [sampleType, setSampleType] = useState("DP");
  const navigation = useNavigate();
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      testcases: [{ input: "", output: "" }],
      tags: [""],
      examples: {
        JAVASCRIPT: { input: "", output: "", explanation: "" },
        PYTHON: { input: "", output: "", explanation: "" },
        JAVA: { input: "", output: "", explanation: "" },
      },
      codeSnippet: {
        JAVASCRIPT: "function solution() {\n  // Write your code here\n}",
        PYTHON: "def solution():\n    # Write your code here\n    pass",
        JAVA: "public class Solution {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}",
      },
      referenceSolution: {
        JAVASCRIPT: "// Add your reference solution here",
        PYTHON: "# Add your reference solution here",
        JAVA: "// Add your reference solution here",
      },
    },
  });

  const {
    fields: testCaseFields,
    append: appendTestCase,
    remove: removeTestCase,
    replace: replacetestcases,
  } = useFieldArray({
    control,
    name: "testcases",
  });

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
    replace: replaceTags,
  } = useFieldArray({
    control,
    name: "tags",
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (value) => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.post("/problem/create-problem", value);
      toast.success(res.data.message || "Problem created successfully");
      navigation("/problems");
    } catch (error) {
      toast.error("Error creating problem");
    } finally {
      setIsLoading(false);
    }
  };

  const loadSampleData = () => {
    const sampleData = sampleType === "DP" ? sampledpData : sampleStringProblem;
    replaceTags(sampleData.tags.map((tag) => tag));
    replacetestcases(sampleData.testcases.map((tc) => tc));
    reset(sampleData);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "EASY":
        return "text-neet-success";
      case "MEDIUM":
        return "text-neet-warning";
      case "HARD":
        return "text-neet-error";
      default:
        return "text-neet-accent";
    }
  };

  return (
    <div className="min-h-screen font-inter bg-gradient-to-br from-neet-neutral via-neet-neutral-focus to-neet-neutral">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative pt-16 pb-8 text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-neet-primary/5 via-neet-secondary/5 to-neet-accent/5 rounded-3xl blur-3xl"></div>
          <div className="relative">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-neet-neutral/40 backdrop-blur-xl rounded-full border border-neet-accent/20 mb-6">
              <Puzzle className="w-5 h-5 text-neet-primary" />
              <span className="text-neet-accent/80 font-medium">
                Create Problem
              </span>
            </div>
          </div>
        </div>

        {/* Sample Data Controls */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
          <div className="flex items-center gap-2 bg-neet-neutral/40 backdrop-blur-xl rounded-full p-2 border border-neet-accent/20">
            <button
              type="button"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                sampleType === "DP"
                  ? "bg-neet-primary text-neet-neutral shadow-lg"
                  : "text-neet-accent/70 hover:text-neet-accent"
              }`}
              onClick={() => setSampleType("DP")}
            >
              DP Problem
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                sampleType === "string"
                  ? "bg-neet-primary text-neet-neutral shadow-lg"
                  : "text-neet-accent/70 hover:text-neet-accent"
              }`}
              onClick={() => setSampleType("string")}
            >
              String Problem
            </button>
          </div>
          <button
            type="button"
            className="px-6 py-3 bg-neet-secondary/20 hover:bg-neet-secondary/30 text-neet-accent border border-neet-accent/20 rounded-full font-medium transition-all duration-200 flex items-center gap-2 backdrop-blur-xl"
            onClick={loadSampleData}
          >
            <Download className="w-4 h-4" />
            Load Sample Data
          </button>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-16">
          {/* Basic Information Card */}
          <div className="bg-neet-neutral/40 backdrop-blur-xl rounded-2xl border border-neet-accent/10 p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-neet-primary to-neet-secondary rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-neet-neutral" />
              </div>
              <h3 className="text-xl font-semibold text-neet-base-100">
                Basic Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-neet-accent/80 mb-2">
                  Problem Title
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-neet-neutral/30 border border-neet-accent/20 rounded-xl text-neet-base-100 placeholder-neet-accent/40 focus:border-neet-primary focus:outline-none focus:ring-2 focus:ring-neet-primary/20 transition-all duration-200"
                  {...register("title")}
                  placeholder="Enter a descriptive problem title"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-neet-error">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-neet-accent/80 mb-2">
                  Problem Description
                </label>
                <textarea
                  className="w-full px-4 py-3 bg-neet-neutral/30 border border-neet-accent/20 rounded-xl text-neet-base-100 placeholder-neet-accent/40 focus:border-neet-primary focus:outline-none focus:ring-2 focus:ring-neet-primary/20 transition-all duration-200 min-h-32 resize-y"
                  {...register("description")}
                  placeholder="Describe the problem clearly and concisely..."
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-neet-error">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Difficulty */}
              <div>
                <label className="block text-sm font-medium text-neet-accent/80 mb-2">
                  Difficulty Level
                </label>
                <select
                  className="w-full px-4 py-3 bg-neet-neutral/30 border border-neet-accent/20 rounded-xl text-neet-base-100 focus:border-neet-primary focus:outline-none focus:ring-2 focus:ring-neet-primary/20 transition-all duration-200"
                  {...register("difficulty")}
                >
                  <option value="EASY">🟢 Easy</option>
                  <option value="MEDIUM">🟡 Medium</option>
                  <option value="HARD">🔴 Hard</option>
                </select>
                {errors.difficulty && (
                  <p className="mt-1 text-sm text-neet-error">
                    {errors.difficulty.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Tags Section */}
          <div className="bg-neet-neutral/40 backdrop-blur-xl rounded-2xl border border-neet-accent/10 p-8 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-neet-secondary to-neet-accent rounded-xl flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-neet-neutral" />
                </div>
                <h3 className="text-xl font-semibold text-neet-base-100">
                  Tags
                </h3>
              </div>
              <button
                type="button"
                className="px-4 py-2 bg-neet-primary/20 hover:bg-neet-primary/30 text-neet-primary border border-neet-primary/20 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
                onClick={() => appendTag("")}
              >
                <Plus className="w-4 h-4" />
                Add Tag
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tagFields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <input
                    type="text"
                    className="flex-1 px-4 py-3 bg-neet-neutral/30 border border-neet-accent/20 rounded-xl text-neet-base-100 placeholder-neet-accent/40 focus:border-neet-primary focus:outline-none focus:ring-2 focus:ring-neet-primary/20 transition-all duration-200"
                    {...register(`tags.${index}`)}
                    placeholder="Tag name"
                  />
                  <button
                    type="button"
                    className="w-10 h-10 bg-neet-error/20 hover:bg-neet-error/30 text-neet-error rounded-lg transition-all duration-200 flex items-center justify-center"
                    onClick={() => removeTag(index)}
                    disabled={tagFields.length === 1}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            {errors.tags && (
              <p className="mt-4 text-sm text-neet-error">
                {errors.tags.message}
              </p>
            )}
          </div>

          {/* Test Cases Section */}
          <div className="bg-neet-neutral/40 backdrop-blur-xl rounded-2xl border border-neet-accent/10 p-8 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-neet-info to-neet-success rounded-xl flex items-center justify-center">
                  <TestTube className="w-5 h-5 text-neet-neutral" />
                </div>
                <h3 className="text-xl font-semibold text-neet-base-100">
                  Test Cases
                </h3>
              </div>
              <button
                type="button"
                className="px-4 py-2 bg-neet-success/20 hover:bg-neet-success/30 text-neet-success border border-neet-success/20 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
                onClick={() => appendTestCase({ input: "", output: "" })}
              >
                <Plus className="w-4 h-4" />
                Add Test Case
              </button>
            </div>

            <div className="space-y-6">
              {testCaseFields.map((field, index) => (
                <div
                  key={field.id}
                  className="bg-neet-neutral/20 rounded-xl p-6 border border-neet-accent/10"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold text-neet-base-100">
                      Test Case #{index + 1}
                    </h4>
                    <button
                      type="button"
                      className="px-3 py-1 bg-neet-error/20 hover:bg-neet-error/30 text-neet-error rounded-lg transition-all duration-200 flex items-center gap-2 text-sm"
                      onClick={() => removeTestCase(index)}
                      disabled={testCaseFields.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neet-accent/80 mb-2">
                        Input
                      </label>
                      <textarea
                        className="w-full px-4 py-3 bg-neet-neutral/30 border border-neet-accent/20 rounded-xl text-neet-base-100 placeholder-neet-accent/40 focus:border-neet-primary focus:outline-none focus:ring-2 focus:ring-neet-primary/20 transition-all duration-200 min-h-20 resize-y"
                        {...register(`testcases.${index}.input`)}
                        placeholder="Test case input"
                      />
                      {errors.testcases?.[index]?.input && (
                        <p className="mt-1 text-sm text-neet-error">
                          {errors.testcases[index].input.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neet-accent/80 mb-2">
                        Expected Output
                      </label>
                      <textarea
                        className="w-full px-4 py-3 bg-neet-neutral/30 border border-neet-accent/20 rounded-xl text-neet-base-100 placeholder-neet-accent/40 focus:border-neet-primary focus:outline-none focus:ring-2 focus:ring-neet-primary/20 transition-all duration-200 min-h-20 resize-y"
                        {...register(`testcases.${index}.output`)}
                        placeholder="Expected output"
                      />
                      {errors.testcases?.[index]?.output && (
                        <p className="mt-1 text-sm text-neet-error">
                          {errors.testcases[index].output.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {errors.testcases && !Array.isArray(errors.testcases) && (
              <p className="mt-4 text-sm text-neet-error">
                {errors.testcases.message}
              </p>
            )}
          </div>

          {/* Code Editor Sections */}
          <div className="space-y-8">
            {["JAVASCRIPT", "PYTHON", "JAVA"].map((language) => (
              <div
                key={language}
                className="bg-neet-neutral/40 backdrop-blur-xl rounded-2xl border border-neet-accent/10 p-8 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-neet-primary to-neet-accent rounded-xl flex items-center justify-center">
                    <Code2 className="w-5 h-5 text-neet-neutral" />
                  </div>
                  <h3 className="text-xl font-semibold text-neet-base-100">
                    {language}
                  </h3>
                </div>

                <div className="space-y-6">
                  {/* Starter Code */}
                  <div>
                    <h4 className="font-semibold text-base md:text-lg mb-2 text-neet-accent/80">
                      Starter Code Template
                    </h4>
                    <div className="border border-neet-accent/10 rounded-xl overflow-hidden">
                      <Controller
                        name={`codeSnippet.${language}`}
                        control={control}
                        render={({ field }) => (
                          <Editor
                            height="300px"
                            language={language.toLowerCase()}
                            theme="vs-dark"
                            value={field.value}
                            onChange={field.onChange}
                            options={{
                              minimap: { enabled: false },
                              fontSize: 14,
                              lineNumbers: "on",
                              roundedSelection: false,
                              scrollBeyondLastLine: false,
                              automaticLayout: true,
                            }}
                          />
                        )}
                      />
                    </div>
                    {errors.codeSnippet?.[language] && (
                      <p className="mt-2 text-sm text-neet-error">
                        {errors.codeSnippet[language].message}
                      </p>
                    )}
                  </div>

                  {/* Reference Solution */}
                  <div>
                    <h4 className="font-semibold text-base md:text-lg mb-2 text-neet-success flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      Reference Solution
                    </h4>
                    <div className="border border-neet-success/10 rounded-xl overflow-hidden">
                      <Controller
                        name={`referenceSolution.${language}`}
                        control={control}
                        render={({ field }) => (
                          <Editor
                            height="300px"
                            language={language.toLowerCase()}
                            theme="vs-dark"
                            value={field.value}
                            onChange={field.onChange}
                            options={{
                              minimap: { enabled: false },
                              fontSize: 14,
                              lineNumbers: "on",
                              roundedSelection: false,
                              scrollBeyondLastLine: false,
                              automaticLayout: true,
                            }}
                          />
                        )}
                      />
                    </div>
                    {errors.referenceSolution?.[language] && (
                      <p className="mt-2 text-sm text-neet-error">
                        {errors.referenceSolution[language].message}
                      </p>
                    )}
                  </div>

                  {/* Examples */}
                  <div>
                    <h4 className="font-semibold text-base md:text-lg mb-2 text-neet-accent/80">
                      Example
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neet-accent/80 mb-2">
                          Input
                        </label>
                        <textarea
                          className="w-full px-4 py-3 bg-neet-neutral/30 border border-neet-accent/20 rounded-xl text-neet-base-100 placeholder-neet-accent/40 focus:border-neet-primary focus:outline-none focus:ring-2 focus:ring-neet-primary/20 transition-all duration-200 min-h-16 resize-y"
                          {...register(`examples.${language}.input`)}
                          placeholder="Example input"
                        />
                        {errors.examples?.[language]?.input && (
                          <p className="mt-1 text-sm text-neet-error">
                            {errors.examples[language].input.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neet-accent/80 mb-2">
                          Output
                        </label>
                        <textarea
                          className="w-full px-4 py-3 bg-neet-neutral/30 border border-neet-accent/20 rounded-xl text-neet-base-100 placeholder-neet-accent/40 focus:border-neet-primary focus:outline-none focus:ring-2 focus:ring-neet-primary/20 transition-all duration-200 min-h-16 resize-y"
                          {...register(`examples.${language}.output`)}
                          placeholder="Example output"
                        />
                        {errors.examples?.[language]?.output && (
                          <p className="mt-1 text-sm text-neet-error">
                            {errors.examples[language].output.message}
                          </p>
                        )}
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-neet-accent/80 mb-2">
                          Explanation
                        </label>
                        <textarea
                          className="w-full px-4 py-3 bg-neet-neutral/30 border border-neet-accent/20 rounded-xl text-neet-base-100 placeholder-neet-accent/40 focus:border-neet-primary focus:outline-none focus:ring-2 focus:ring-neet-primary/20 transition-all duration-200 min-h-20 resize-y"
                          {...register(`examples.${language}.explanation`)}
                          placeholder="Explain the example"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Information */}
          <div className="bg-neet-neutral/40 backdrop-blur-xl rounded-2xl border border-neet-accent/10 p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-neet-warning to-neet-accent rounded-xl flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-neet-neutral" />
              </div>
              <h3 className="text-xl font-semibold text-neet-base-100">
                Additional Information
              </h3>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neet-accent/80 mb-2">
                  Constraints
                </label>
                <textarea
                  className="w-full px-4 py-3 bg-neet-neutral/30 border border-neet-accent/20 rounded-xl text-neet-base-100 placeholder-neet-accent/40 focus:border-neet-primary focus:outline-none focus:ring-2 focus:ring-neet-primary/20 transition-all duration-200 min-h-20 resize-y"
                  {...register("constraints")}
                  placeholder="Enter problem constraints"
                />
                {errors.constraints && (
                  <p className="mt-1 text-sm text-neet-error">
                    {errors.constraints.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-neet-accent/80 mb-2">
                  Hints (Optional)
                </label>
                <textarea
                  className="w-full px-4 py-3 bg-neet-neutral/30 border border-neet-accent/20 rounded-xl text-neet-base-100 placeholder-neet-accent/40 focus:border-neet-primary focus:outline-none focus:ring-2 focus:ring-neet-primary/20 transition-all duration-200 min-h-20 resize-y"
                  {...register("hints")}
                  placeholder="Enter hints for solving the problem"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neet-accent/80 mb-2">
                  Editorial (Optional)
                </label>
                <textarea
                  className="w-full px-4 py-3 bg-neet-neutral/30 border border-neet-accent/20 rounded-xl text-neet-base-100 placeholder-neet-accent/40 focus:border-neet-primary focus:outline-none focus:ring-2 focus:ring-neet-primary/20 transition-all duration-200 min-h-24 resize-y"
                  {...register("editorial")}
                  placeholder="Enter problem editorial/solution explanation"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-8 py-3 bg-neet-primary hover:bg-neet-secondary text-neet-neutral font-bold rounded-full text-lg flex items-center gap-3 shadow-lg transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-spinner text-white"></span>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Create Problem
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProblemForm;
