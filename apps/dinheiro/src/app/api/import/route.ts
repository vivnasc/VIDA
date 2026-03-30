import { NextResponse } from "next/server";
import { createServerClient } from "@vida/auth/server";
import { parseMobillsCSV, getCategoryConsolidationPreview } from "@/lib/mobills-import";

/**
 * POST /api/import
 *
 * Parse a Mobills CSV export file and return structured data
 * with category mapping preview. Does NOT save to database yet.
 *
 * Body: { csvContent: string }
 */
export async function POST(request: Request) {
  try {
    const supabase = await createServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const body = await request.json();
    const { csvContent } = body;

    if (!csvContent || typeof csvContent !== "string") {
      return NextResponse.json(
        { error: "Conteúdo CSV é obrigatório" },
        { status: 400 }
      );
    }

    const result = parseMobillsCSV(csvContent);

    if (!result.success) {
      return NextResponse.json(
        { error: result.errors[0] || "Erro ao processar ficheiro", result },
        { status: 200 }
      );
    }

    const consolidation = getCategoryConsolidationPreview(result);

    return NextResponse.json({
      ...result,
      categoryConsolidation: consolidation,
    });
  } catch {
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
