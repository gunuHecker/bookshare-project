import fs from "fs";
import path from "path";

// Helper function to read users
export const getUsers = () => {
  try {
    const dataDir = path.join(process.cwd(), "data");
    const filePath = path.join(dataDir, "users.json");

    // Create directory if it doesn't exist
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Create file if it doesn't exist
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, "[]", "utf8");
      return [];
    }

    const usersData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(usersData);
  } catch (error) {
    console.error("Error reading users:", error);
    return [];
  }
};

// Helper function to save users
export const saveUsers = (users) => {
  const dataDir = path.join(process.cwd(), "data");
  const filePath = path.join(dataDir, "users.json");

  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), "utf8");
};

// Helper function to read books
export const getBooks = () => {
  try {
    const dataDir = path.join(process.cwd(), "data");
    const filePath = path.join(dataDir, "books.json");

    // Create directory if it doesn't exist
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Create file if it doesn't exist
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, "[]", "utf8");
      return [];
    }

    const booksData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(booksData);
  } catch (error) {
    console.error("Error reading books:", error);
    return [];
  }
};

// Helper function to save books
export const saveBooks = (books) => {
  const dataDir = path.join(process.cwd(), "data");
  const filePath = path.join(dataDir, "books.json");

  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  fs.writeFileSync(filePath, JSON.stringify(books, null, 2), "utf8");
};
