import Link from "next/link";

import { ContentLayout } from "@/components/painel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import PainelLayout from "@/components/painel/painel-layout";
import { SidebarSettings } from "@/components/sidebar/SidebarSettings";
import { Metadata } from "next";
import TagContent from "@/components/tags/tags-content";

export const metadata: Metadata = {
  title: "Tags",  	
  description: "Pagina de Tags",
};

export default function TagsPage() {
  return (
    <PainelLayout>
    <ContentLayout title="Tags">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Tags</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <SidebarSettings />
      <TagContent />
    </ContentLayout>
    </PainelLayout>
  );
}
