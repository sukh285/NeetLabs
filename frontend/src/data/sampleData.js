export const sampledpData = {
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

export const sampleStringProblem = {
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

export const sampleJson = {
  title: "Longest Substring Without Repeating Characters",
  description:
    "Given a string s, find the length of the longest substring without repeating characters. A substring is a contiguous non-empty sequence of characters within a string.",
  difficulty: "MEDIUM",
  tags: ["Hash Table", "String", "Sliding Window"],
  companyTags: ["Facebook", "Amazon"],
  constraints:
    "0 <= s.length <= 5 * 10^4\ns consists of English letters, digits, symbols and spaces.",
  hints:
    "Use the sliding window technique with two pointers. Keep track of characters in the current window using a hash set or hash map. When you encounter a duplicate character, move the left pointer until the duplicate is removed.",
  editorial:
    "We can solve this using the sliding window technique. We maintain a window with two pointers (left and right) and use a hash set to track characters in the current window. When we find a duplicate, we shrink the window from the left until the duplicate is removed, then continue expanding from the right.",
  testcases: [
    {
      input: "abcabcbb",
      output: "3",
    },
    {
      input: "bbbbb",
      output: "1",
    },
    {
      input: "pwwkew",
      output: "3",
    },
    {
      input: "",
      output: "0",
    },
  ],
  examples: {
    JAVASCRIPT: {
      input: 's = "abcabcbb"',
      output: "3",
      explanation: 'The answer is "abc", with the length of 3.',
    },
    PYTHON: {
      input: 's = "abcabcbb"',
      output: "3",
      explanation: 'The answer is "abc", with the length of 3.',
    },
    JAVA: {
      input: 's = "abcabcbb"',
      output: "3",
      explanation: 'The answer is "abc", with the length of 3.',
    },
  },
  codeSnippet: {
    JAVASCRIPT:
      "/**\n * @param {string} s\n * @return {number}\n */\nfunction lengthOfLongestSubstring(s) {\n    // Write your code here\n}\n\n// Add readline for dynamic input handling\nconst readline = require('readline');\nconst rl = readline.createInterface({\n  input: process.stdin,\n  output: process.stdout,\n  terminal: false\n});\n\n// Process input line\nrl.on('line', (line) => {\n  const result = lengthOfLongestSubstring(line.trim());\n  console.log(result);\n  rl.close();\n});",
    PYTHON:
      'class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        # Write your code here\n        pass\n\n# Input parsing\nif __name__ == "__main__":\n    import sys\n    \n    # Read input string\n    s = sys.stdin.readline().strip()\n    \n    # Call solution\n    sol = Solution()\n    result = sol.lengthOfLongestSubstring(s)\n    \n    # Output result\n    print(result)',
    JAVA: "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static int lengthOfLongestSubstring(String s) {\n        // Write your code here\n        return 0;\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String input = br.readLine().trim();\n        \n        int result = lengthOfLongestSubstring(input);\n        System.out.println(result);\n    }\n}",
  },
  referenceSolution: {
    JAVASCRIPT:
      "/**\n * @param {string} s\n * @return {number}\n */\nfunction lengthOfLongestSubstring(s) {\n    if (s.length === 0) return 0;\n    \n    const charSet = new Set();\n    let left = 0;\n    let maxLength = 0;\n    \n    for (let right = 0; right < s.length; right++) {\n        // If character is already in set, remove characters from left\n        while (charSet.has(s[right])) {\n            charSet.delete(s[left]);\n            left++;\n        }\n        \n        // Add current character to set\n        charSet.add(s[right]);\n        \n        // Update max length\n        maxLength = Math.max(maxLength, right - left + 1);\n    }\n    \n    return maxLength;\n}\n\n// Add readline for dynamic input handling\nconst readline = require('readline');\nconst rl = readline.createInterface({\n  input: process.stdin,\n  output: process.stdout,\n  terminal: false\n});\n\n// Process input line\nrl.on('line', (line) => {\n  const result = lengthOfLongestSubstring(line.trim());\n  console.log(result);\n  rl.close();\n});",
    PYTHON:
      'class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        if not s:\n            return 0\n        \n        char_set = set()\n        left = 0\n        max_length = 0\n        \n        for right in range(len(s)):\n            # If character is already in set, remove characters from left\n            while s[right] in char_set:\n                char_set.remove(s[left])\n                left += 1\n            \n            # Add current character to set\n            char_set.add(s[right])\n            \n            # Update max length\n            max_length = max(max_length, right - left + 1)\n        \n        return max_length\n\n# Input parsing\nif __name__ == "__main__":\n    import sys\n    \n    # Read input string\n    s = sys.stdin.readline().strip()\n    \n    # Call solution\n    sol = Solution()\n    result = sol.lengthOfLongestSubstring(s)\n    \n    # Output result\n    print(result)',
    JAVA: "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static int lengthOfLongestSubstring(String s) {\n        if (s.length() == 0) return 0;\n        \n        Set<Character> charSet = new HashSet<>();\n        int left = 0;\n        int maxLength = 0;\n        \n        for (int right = 0; right < s.length(); right++) {\n            // If character is already in set, remove characters from left\n            while (charSet.contains(s.charAt(right))) {\n                charSet.remove(s.charAt(left));\n                left++;\n            }\n            \n            // Add current character to set\n            charSet.add(s.charAt(right));\n            \n            // Update max length\n            maxLength = Math.max(maxLength, right - left + 1);\n        }\n        \n        return maxLength;\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String input = br.readLine().trim();\n        \n        int result = lengthOfLongestSubstring(input);\n        System.out.println(result);\n    }\n}",
  },
};
