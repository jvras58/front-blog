"use client"

import { useEffect, useState } from "react";
import { mockPosts, Post } from '../../mockPosts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useSession } from "next-auth/react";

export default function BlogPosts () {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);

  async function fetchPosts() {
    if (!session) return;

    const token = session?.user?.accessToken;
    try {
      // TODO: Use env variable for API URL
      const resp = await fetch("http://localhost:4000/posts", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!resp.ok) {
        console.error("Erro:", await resp.text());
        return;
      }
      const data = await resp.json();
      setPosts(data);
    } catch (err) {
      console.error("Erro fetch:", err);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, [session]);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-foreground">Últimas Postagens</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <article 
            key={post.id} 
            className="bg-card text-card-foreground shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow border border-border"
            onClick={() => setSelectedPost(post)}
          >
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2 text-foreground">{post.title}</h2>
              <p className="text-muted-foreground mb-4">{post.content?.substring(0,80)}...</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-muted-foreground">ID: {post.id}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Categoria</Badge>
                <Badge variant="outline">Tag1</Badge>
              </div>
            </div>
          </article>
        ))}
      </div>

      <Dialog open={selectedPost !== null} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent className="bg-background text-foreground">
          <DialogHeader>
            <DialogTitle className="text-foreground">{selectedPost?.title}</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              ID: {selectedPost?.id}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <p className="text-foreground mb-4">{selectedPost?.content}</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// usando o mock:
// return (
//   <div className="max-w-4xl mx-auto py-8">
//     <h1 className="text-3xl font-bold mb-8 text-center text-foreground">Ultimas Postagens</h1>
//     <div className="space-y-8">
//       {mockPosts.map((post: Post) => (
//         <article 
//           key={post.id} 
//           className="bg-card text-card-foreground shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow border border-border"
//           onClick={() => setSelectedPost(post)}
//         >
//           <div className="p-6">
//             <h2 className="text-2xl font-semibold mb-2 text-foreground">{post.title}</h2>
//             <p className="text-muted-foreground mb-4">{post.description}</p>
//             <div className="flex justify-between items-center mb-4">
//               <span className="text-sm text-muted-foreground">Por: {post.author}</span>
//               <span className="text-sm text-muted-foreground">{new Date(post.date).toLocaleDateString()}</span>
//             </div>
//             <div className="flex flex-wrap gap-2">
//               <Badge variant="secondary">{post.category}</Badge>
//               {post.tags?.map(tag => (
//                 <Badge key={tag} variant="outline">{tag}</Badge>
//               ))}
//             </div>
//           </div>
//         </article>
//       ))}
//     </div>

//     <Dialog open={selectedPost !== null} onOpenChange={() => setSelectedPost(null)}>
//       <DialogContent className="bg-background text-foreground">
//         <DialogHeader>
//           <DialogTitle className="text-foreground">{selectedPost?.title}</DialogTitle>
//           <DialogDescription className="text-muted-foreground">
//             Por {selectedPost?.author} | {selectedPost?.category}
//           </DialogDescription>
//         </DialogHeader>
//         <div className="mt-4">
//           <p className="text-foreground mb-4">{selectedPost?.content}</p>
//           <div className="flex flex-wrap gap-2">
//             {selectedPost?.tags?.map(tag => (
//               <Badge key={tag} variant="outline">{tag}</Badge>
//             ))}
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   </div>
// );
// };
