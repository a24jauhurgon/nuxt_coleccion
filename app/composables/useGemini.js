import { ref } from "vue";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const useGemini = () => {
  // Obtenemos la API key desde las variables de entorno de Nuxt
  const config = useRuntimeConfig();
  const genAI = new GoogleGenerativeAI(config.public.geminiKey);

  const aiResponse = ref("");

  const isGenerating = ref(false);

  const error = ref(null);



  const generateCreativeText = async (itemName) => {

    isGenerating.value = true;

    error.value = null;

    aiResponse.value = "";



    try {

      // 1. Instanciamos el modelo CORRECTO que tienes en tu lista

      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });



      // 2. Definimos el prompt para Pokémon

      const prompt = `Proporciona de manera BREU (màxim 3-4 línies) on i com trobar a ${itemName} en els jocs principals de Pokémon per generació. Sigues concís i directe.`;



      // 3. Llamamos a generateContent (Esta librería permite pasar el string directo)

      const result = await model.generateContent(prompt);

   

      // 4. Obtenemos la respuesta

      const response = await result.response;



      // En la librería web estándar, text() ES una función

      aiResponse.value = response.text();

    } catch (e) {

      console.error("Error Gemini:", e);

      // Personalizamos el mensaje si el error es por permisos/modelo

      if (e.message?.includes("404")) {

        error.value = "Error de modelo: Verifica el nombre 'gemini-2.5-flash'.";

      } else {

        error.value = "La IA no està disponible ara mateix.";

      }

    } finally {

      isGenerating.value = false;

    }

  };



  return { aiResponse, isGenerating, error, generateCreativeText };

};