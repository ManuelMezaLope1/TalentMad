import dotenv from "dotenv";
import "dotenv/config";
import path from "path";
dotenv.config({
  path: path.resolve(process.cwd(), ".env")
});
import express from "express";
import cors from "cors";
import axios from "axios";
import type { Request, Response } from "express";

const app = express();

app.use(cors());
app.use(express.json());

// ⚠️ Mejor usar variables de entorno
const API_KEY: string = process.env["API_KEY"] || "";

interface RequestBody {
  texto: string;
}

app.post("/api", async (req: Request<{}, {}, RequestBody>, res: Response) => {
  const { texto } = req.body;

  if (!texto) {
    return res.status(400).json({ error: "Texto vacío" });
  }

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: "Eres un orientador vocacional experto" },
          { role: "user", content: texto }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const respuesta: string =
      response.data.choices[0].message.content;

    res.json({ respuesta });

  } catch (error: any) {
    console.error(error.response?.data || error.message);
    res.json({ respuesta: "Error con Groq" });
  }
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});