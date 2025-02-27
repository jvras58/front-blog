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
import { PostForm } from "@/components/posts/_components/post-form";
import { ChatbotPostGeneratorModal } from "@/components/posts/ChatbotGenerator";


export const metadata: Metadata = {
    title: "Novo Post",  	
    description: "Pagina de Novo Post",
};

export default function NewPostPage() {
  return (
    <PainelLayout>
    <ContentLayout title="Nova postagem">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/posts">posts</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Novo</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Criar Novo Post</h1>
          <ChatbotPostGeneratorModal />
        </div>      
      <SidebarSettings />
      <PostForm />
    </ContentLayout>
    </PainelLayout>
  );
}