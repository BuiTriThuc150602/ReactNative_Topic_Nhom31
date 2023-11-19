// NewsData.js

export const articles = [
    {
      id: 1,
      title: "Tiêu đề bài báo 1",
      description: "Mô tả bài báo 1...",
      urlToImage: "URL_hinh_anh_1.jpg",
      source: {
        id: "source1",
        name: "Nguồn tin 1",
      },
      publishedAt: "2023-01-01T10:00:00Z",
      url: "URL_bai_bao_1",
    },
  ];
  
  export const getFormattedTime = (time) => {
    const date = new Date(time);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${day}/${month}/${year}`;
  };
  