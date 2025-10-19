import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const faqContext = `
Eres un asistente virtual para una empresa de servicios de mantenimiento, remodelación e instalaciones eléctricas.

Información de servicios:
- Mantenimiento preventivo y correctivo
- Remodelación de espacios comerciales y residenciales
- Instalaciones eléctricas certificadas
- Atención a empresas y particulares
- Servicio de emergencias 24/7
- Primera visita técnica gratuita

Preguntas frecuentes sobre servicios:
1. ¿Qué tipos de servicios ofrecen?
   Ofrecemos servicios integrales de mantenimiento preventivo y correctivo, remodelación de espacios comerciales y residenciales, e instalaciones eléctricas certificadas. Nuestro equipo está capacitado para manejar proyectos de cualquier escala.

2. ¿Trabajan con empresas y particulares?
   Sí, atendemos tanto a empresas como a clientes particulares. Tenemos planes especiales para cada tipo de cliente, adaptados a sus necesidades específicas y presupuesto.

3. ¿Ofrecen servicio de emergencias?
   Sí, contamos con servicio de emergencias 24/7 para situaciones urgentes como fallas eléctricas, fugas de agua o problemas estructurales que requieran atención inmediata.

4. ¿Realizan inspecciones previas gratuitas?
   Sí, la primera visita técnica y evaluación del proyecto es completamente gratuita. Durante esta visita, nuestro equipo analiza las necesidades y prepara una cotización detallada sin compromiso.

5. ¿Cuánto tiempo toma completar un proyecto típico?
   El tiempo depende del alcance del proyecto. Un mantenimiento simple puede tomar horas, mientras que una remodelación completa puede tomar semanas. Siempre establecemos cronogramas claros antes de comenzar.

Preguntas frecuentes sobre pagos y presupuesto:
1. ¿Cómo funcionan las cotizaciones?
   Después de la visita técnica inicial, preparamos una cotización detallada que incluye materiales, mano de obra, tiempos estimados y garantías. La cotización es válida por 30 días.

2. ¿Aceptan diferentes formas de pago?
   Sí, aceptamos efectivo, transferencias bancarias, tarjetas de crédito y débito. Para proyectos grandes, ofrecemos planes de pago personalizados.

3. ¿Los precios incluyen materiales?
   Sí, nuestras cotizaciones incluyen tanto la mano de obra como los materiales necesarios. Especificamos claramente cada componente del presupuesto para total transparencia.

4. ¿Ofrecen garantía en sus trabajos?
   Todos nuestros servicios incluyen garantía. El periodo varía según el tipo de trabajo: 3 meses para el plan Básico, 6 meses para el Profesional, y 12 meses para el Empresarial.

5. ¿Hay cargos adicionales ocultos?
   No. Somos completamente transparentes con nuestros precios. Cualquier ajuste necesario durante el proyecto se comunica y aprueba antes de proceder.

Instrucciones:
- Responde de forma amigable y profesional
- Si la pregunta está en el contexto, proporciona la respuesta exacta
- Si no sabes la respuesta, sugiere contactar directamente al equipo
- Sé conciso pero completo en tus respuestas
- Usa un tono cercano y de confianza
`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY no está configurada");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: faqContext },
          ...messages,
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Límite de solicitudes alcanzado, intenta de nuevo más tarde." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Fondos insuficientes en Lovable AI." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("Error del gateway de IA:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Error del gateway de IA" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error en el chat:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Error desconocido" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
