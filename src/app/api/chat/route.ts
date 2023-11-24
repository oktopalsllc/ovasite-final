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

  // Read data useing directory loader
  const loader = new DirectoryLoader("./docs", {
    // ".json": (path) => new JSONLoader(path),
    // ".txt": (path) => new TextLoader(path),
    // ".pdf": (path) => new PDFLoader(path),
    ".csv": (path) => new CSVLoader(path, { separator: "," }),
  });

  // See contents of docs that are being being loaded
  const docs = await loader.load();
  // console.log(docs);
  const csvContent = docs.map((doc: Document) => doc.pageContent);
  // console.log(`Page Content ---> ${csvContent}`);

  const textSplitter = new RecursiveCharacterTextSplitter({
    // To learn more about the parameters visit: https://dev.to/peterabel/what-chunk-size-and-chunk-overlap-should-you-use-4338
    chunkSize: 1000,
    chunkOverlap: 900,
  });
  console.log("Text Splitting......");
  console.log(`Chunk size  ----> ${textSplitter.chunkSize}`);
  console.log(`Chunk Overlap  ----> ${textSplitter.chunkOverlap}`);

  const splitDocs = await textSplitter.createDocuments(csvContent);

  const vectorStore = await HNSWLib.fromDocuments(
    splitDocs,
    new OpenAIEmbeddings()
  );
  const retriever = vectorStore.asRetriever();

  await vectorStore.save("MyVectore.index");
  console.log(`Vector store created`);

  const model = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    streaming: true,
  });

  console.log("Querying...");
  
  const outputParser = new BytesOutputParser();
  const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());

  const stream = await chain.stream({
    query: currentMessageContent,
  });

  return new StreamingTextResponse(stream);
}
