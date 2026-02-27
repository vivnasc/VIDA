import { createServerClient } from "@vida/auth/server";
import DashboardPage from "@/components/dashboard";
import { LandingPage } from "@/components/landing";

export default async function RootPage() {
  let user = null;

  try {
    const supabase = await createServerClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch {
    // Supabase not configured or error - show landing
  }

  if (user) {
    return <DashboardPage />;
  }

  return <LandingPage />;
}
