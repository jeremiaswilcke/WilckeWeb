import { ContentFormProvider } from "@/components/content-form/ContentFormContext";
import ContentFormWizard from "@/components/content-form/ContentFormWizard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website-Inhaltsplaner — WilckeWeb",
  description:
    "Geben Sie strukturiert alle Inhalte für Ihre neue Website ein. Texte, Bilder, Seitenstruktur — alles an einem Ort.",
};

export default function InhaltsformularPage() {
  return (
    <ContentFormProvider>
      <ContentFormWizard />
    </ContentFormProvider>
  );
}
