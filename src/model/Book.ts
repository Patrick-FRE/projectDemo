interface Book {
  id: string;
  title: string;
  authors?: string[];
  description: string;
  publisher: string;
  publishedDate: string;
  imageLinks?: {
    smallThumbnail: string;
    thumbnail: string;
  };
}

export default Book;
