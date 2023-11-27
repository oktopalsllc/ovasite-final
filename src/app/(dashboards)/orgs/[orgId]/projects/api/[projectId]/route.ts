import { NextRequest } from "next/server";
import { Message as VercelChatMessage, StreamingTextResponse } from "ai";

import { OpenAI } from "langchain/llms/openai";
import { RetrievalQAChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

// Loaders
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { JSONLoader } from "langchain/document_loaders/fs/json";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { CSVLoader } from "langchain/document_loaders/fs/csv";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

import { config } from "dotenv";
import { Document } from "langchain/document";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";
import { FaissStore } from "langchain/vectorstores/faiss";
import { PromptTemplate } from "langchain/prompts";
import { HumanMessage } from "langchain/schema";
import { BytesOutputParser } from "langchain/schema/output_parser";
import { formatDocumentsAsString } from "@/utils/documentHelpers";
import fs from "fs";

config();

const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`;
};
const TEMPLATE = 
`Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer.
----------
CONTEXT: {context}
----------
CHAT HISTORY: {chat_history}
----------
User: {input}
----------
AI:`;

// 8. Define a function to normalize the content of the documents
function normalizeDocuments(docs: any) {
  return docs.map((doc: any) => {
    if (typeof doc.pageContent === "string") {
      return doc.pageContent;
    } else if (Array.isArray(doc.pageContent)) {
      return doc.pageContent.join("\n");
    }
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const messages = body.messages ?? [];
  const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
  const currentMessageContent = messages[messages.length - 1].content;
  console.log(
    "🚀 ~ file: route.ts:52 ~ POST ~ currentMessageContent:",
    currentMessageContent
  );

  const prompt = PromptTemplate.fromTemplate(TEMPLATE);

  
  const csvContent: string = body?.csvContent; 
  // console.log(`Page Content ---> ${csvContent}`);

  const textSplitter = new RecursiveCharacterTextSplitter({
    // To learn more about the parameters visit: https://dev.to/peterabel/what-chunk-size-and-chunk-overlap-should-you-use-4338
    chunkSize: 1000,
    chunkOverlap: 900,
  });
  console.log("Text Splitting......");
  console.log(`Chunk size  ----> ${textSplitter.chunkSize}`);
  console.log(`Chunk Overlap  ----> ${textSplitter.chunkOverlap}`);

  const VECTOR_STORE_PATH = "Documents.index";
  let vectorStore;

  // 13. Check if an existing vector store is available
  console.log("Checking for existing vector store...");
  if (fs.existsSync(VECTOR_STORE_PATH)) {
    // 14. Load the existing vector store
    console.log("Loading existing vector store...");
    vectorStore = await HNSWLib.load(
      VECTOR_STORE_PATH,
      new OpenAIEmbeddings()
    );
    console.log("Vector store loaded.");
  } else {
    // 15. Create a new vector store if one does not exist
    console.log("Creating new vector store...");
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
    });
    const normalizedDocs = normalizeDocuments(csvContent);
    const splitDocs = await textSplitter.createDocuments(normalizedDocs);

    // 16. Generate the vector store from the documents
    vectorStore = await HNSWLib.fromDocuments(
      splitDocs,
      new OpenAIEmbeddings()
    );
    // 17. Save the vector store to the specified path
    await vectorStore.save(VECTOR_STORE_PATH);

    console.log("Vector store created.");
  }

  await vectorStore.save("MyVectore.index");

  const model = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    streaming: true,
  });

  console.log("Querying...");
  
  const outputParser = new BytesOutputParser();
  const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());

  const stream = await chain.invoke({
    query: currentMessageContent,
  });
  console.log("🚀 ~ file: route.ts:102 ~ POST ~ stream:", stream.text)

  return new StreamingTextResponse(stream.text);
}
