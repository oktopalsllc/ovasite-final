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
import { pinecone } from "@/utils/pinecone-client";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";
import { FaissStore } from "langchain/vectorstores/faiss";
import { PromptTemplate } from "langchain/prompts";
import { HumanMessage } from "langchain/schema";

config();

const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`;
};
const TEMPLATE = `You have a CSV file containing user event registration data with the following columns: UserID, EventID, EventName, RegistrationDate, and additional relevant fields. Design a query to extract specific information from this dataset.

Consider the following scenarios and tailor your query accordingly:

Retrieve a list of all users who registered for a particular event.
Find the total number of registrations for each event.
Identify users who registered for multiple events and list the events they attended.
Obtain a timeline of registrations, showing the number of registrations per day.
Your response should include the necessary code or query language syntax to perform these operations efficiently on a CSV file..
 
Current conversation:
{chat_history}
 
User: {input}
AI:`;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const messages = body.messages ?? [];
  const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
  const currentMessageContent = messages[messages.length - 1].content;
  console.log("🚀 ~ file: route.ts:52 ~ POST ~ currentMessageContent:", currentMessageContent)

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

  await vectorStore.save("MyVectore.index");
  console.log(`Vector store created`);

  const model = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    streaming: true,
  });
  const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());
  console.log("Querying...");
  const stream = await chain.call(
    { query: currentMessageContent },
    {
      callbacks: [
        {
          handleLLMNewToken(token: string) {
            console.log({ token });
          },
        },
      ],
    }
  );
  console.log(stream);

  // const stream = await chain.stream({
  //   chat_history: formattedPreviousMessages.join('\n'),
  //   input: currentMessageContent,
  // });

  return new StreamingTextResponse(stream);
}
