import { Clock, User } from 'lucide-react';
import { navigate } from '../../hooks/useLocation';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: "The Biblical Concept of Joy vs. Happiness",
    excerpt: "Understanding the difference between temporary happiness and lasting joy as described in scripture.",
    author: "David Mitchell",
    date: "May 15, 2025",
    readTime: "5 min read",
    image: "https://images.pexels.com/photos/1261731/pexels-photo-1261731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: 2,
    title: "Prayer as Communion with God",
    excerpt: "Exploring the deeper purpose of prayer beyond simply asking for things.",
    author: "Sarah Johnson",
    date: "May 12, 2025",
    readTime: "7 min read",
    image: "https://images.pexels.com/photos/1471895/pexels-photo-1471895.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: 3,
    title: "Understanding the Context of Paul's Letters",
    excerpt: "Examining the historical and cultural context behind Paul's writings to the early church.",
    author: "Mark Williams",
    date: "May 8, 2025",
    readTime: "9 min read",
    image: "https://images.pexels.com/photos/733854/pexels-photo-733854.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
];

const LatestArticles = () => {
  return (
    <div className="space-y-8">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
      
      <div className="text-center mt-8">
        <button
          onClick={() => navigate('/article')}
          className="px-6 py-2 text-blue-800 dark:text-blue-400 border border-blue-800 dark:border-blue-400 rounded-md font-medium hover:bg-blue-800 hover:text-white dark:hover:bg-blue-800 transition-colors"
        >
          View All Articles
        </button>
      </div>
    </div>
  );
};

const ArticleCard = ({ article }: { article: Article }) => {
  return (
    <div 
      className="flex flex-col md:flex-row gap-6 pb-8 border-b border-gray-200 dark:border-gray-700 cursor-pointer group"
      onClick={() => navigate('/article')}
    >
      <div className="md:w-1/3 overflow-hidden rounded-lg">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="md:w-2/3">
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-800 dark:group-hover:text-blue-400 transition-colors">
          {article.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {article.excerpt}
        </p>
        <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-500">
          <div className="flex items-center mr-4">
            <User className="h-4 w-4 mr-1" />
            <span>{article.author}</span>
          </div>
          <div className="mr-4">{article.date}</div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{article.readTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestArticles;