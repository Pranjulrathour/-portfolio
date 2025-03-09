import AdminDashboard from "@/components/admin/AdminDashboard";
import BackgroundWrapper from "@/components/ui/background-wrapper";

export default function AdminPage() {
  return (
    <BackgroundWrapper>
      <div className="bg-background bg-opacity-70">
        <AdminDashboard />
      </div>
    </BackgroundWrapper>
  );
}
