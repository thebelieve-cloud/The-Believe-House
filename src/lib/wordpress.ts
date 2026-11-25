// ไฟล์นี้ใช้สำหรับจัดการการดึงข้อมูลจากหลังบ้าน WordPress (ผ่าน GraphQL)
// คุณต้องติดตั้งปลั๊กอิน WPGraphQL (https://www.wpgraphql.com/) ใน WordPress ของคุณก่อน

const WP_GRAPHQL_URL = "https://backend.thebelievehouse.com/graphql";

// ฟังก์ชันสำหรับดึงบทความ (Posts) ทั้งหมด
export async function getAllPosts() {
  const query = `
    query SelectAllPosts {
      posts(first: 50, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          id
          title
          slug
          date
          excerpt
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch(WP_GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
      next: { revalidate: 600 }, // เก็บแคช 10 นาที (บทความใหม่ขึ้นเองภายใน 10 นาที)
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch API: ${res.statusText}`);
    }

    const { data } = await res.json();
    return data?.posts?.nodes || [];
  } catch (error) {
    console.error("Error fetching posts from WordPress Dashboard:", error);
    return [];
  }
}

// ฟังก์ชันสำหรับดึงเนื้อหาบทความ (Single Post) ตาม Slug
export async function getPostBySlug(slug: string) {
  const query = `
    query SelectPostBySlug($id: ID!) {
      post(id: $id, idType: SLUG) {
        title
        slug
        content
        excerpt
        date
        modified
        seo {
          title
          metaDesc
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  `;

  try {
    const decodedSlug = decodeURIComponent(slug);
    const res = await fetch(WP_GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables: { id: decodedSlug } }),
      next: { revalidate: 600 }, // เก็บแคช 10 นาที (บทความใหม่ขึ้นเองภายใน 10 นาที)
    });

    const { data } = await res.json();
    return data?.post;
  } catch (error) {
    console.error("Error fetching post data:", error);
    return null;
  }
}

// ฟังก์ชันสำหรับ sitemap: ดึง slug และวันแก้ไขล่าสุดของบทความทั้งหมด
export async function getAllPostSlugs(): Promise<{ slug: string; modified: string }[]> {
  const query = `
    query AllPostSlugs {
      posts(first: 500, where: { status: PUBLISH }) {
        nodes {
          slug
          modified
        }
      }
    }
  `;

  try {
    const res = await fetch(WP_GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
      next: { revalidate: 600 },
    });
    if (!res.ok) throw new Error(`Failed to fetch API: ${res.statusText}`);
    const { data } = await res.json();
    return data?.posts?.nodes || [];
  } catch (error) {
    console.error("Error fetching post slugs for sitemap:", error);
    return [];
  }
}
