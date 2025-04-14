import { NextResponse } from "next/server";
import connectToDatabase from "@/dbConfig/dbConfig";
import mongoose from "mongoose";

export async function GET(request) {
  try {
    // Connect to the database
    await connectToDatabase();
    
    const db = mongoose.connection.db;
    
    // Get all collections
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    
    // Get sample documents from the books collection
    const booksCollection = db.collection('books');
    const bookCount = await booksCollection.countDocuments();
    const books = await booksCollection.find().limit(5).toArray();
    
    // Get model names registered with Mongoose
    const modelNames = Object.keys(mongoose.models);
    
    return NextResponse.json({
      collections: collectionNames,
      bookCount,
      sampleBooks: books,
      models: modelNames,
      connectionState: mongoose.connection.readyState
    }, { status: 200 });
  } catch (error) {
    console.error("Debug endpoint error:", error);
    return NextResponse.json(
      { message: `Server error: ${error.message}` },
      { status: 500 }
    );
  }
} 