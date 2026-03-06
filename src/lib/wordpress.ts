// ไฟล์นี้ใช้สำหรับจัดการการดึงข้อมูลจากหลังบ้าน WordPress (ผ่าน GraphQL)
// คุณต้องติดตั้งปลั๊กอิน WPGraphQL (https://www.wpgraphql.com/) ใน WordPress ของคุณก่อน

const WP_GRAPHQL_URL = "https://backend.thebelievehouse.com/graphql";

// ฟังก์ชันสำหรับดึงบทความ (Posts) ทั้งหมด
export async function getAllPosts() {
  const query = `
    query SelectAllPosts {
      posts(first: 10, where: { orderby: { field: DATE, order: DESC } }) {
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
      cache: "no-store",
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
        content
        date
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
      cache: "no-store",
    });

    const { data } = await res.json();
    return data?.post;
  } catch (error) {
    console.error("Error fetching post data:", error);
    return null;
  }
}
