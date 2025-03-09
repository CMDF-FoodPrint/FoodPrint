import { get } from 'http';
import dotenv from 'dotenv';
dotenv.config();
import Groq from "groq-sdk";


const groq = new Groq({
    apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
    dangerouslyAllowBrowser: true,
  });


export async function getCarbonFootprint(ingredient) {
  try {
    
    const response = await groq.chat.completions.create({
      model: "llama3-70b-8192", // Use Llama 3 or Mixtral
      messages: [
        {
          role: "system",
          content:
            "You are an expert in food sustainability. Provide the estimated carbon footprint (in kg CO2 per kg) of an ingredient in numeric form only.",
        },
        {
          role: "user",
          content: `What is the carbon footprint of ${ingredient} per kg?`,
        },
      ],
      temperature: 0.2,
    });

    const carbonFootprint = parseFloat(response.choices[0].message.content.trim());
    return isNaN(carbonFootprint) ? null : carbonFootprint;
  } catch (error) {
    console.error(`Error getting carbon footprint for ${ingredient}:`, error);
    return null;
  }
}