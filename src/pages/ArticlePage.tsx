import { useState } from 'react';
import { Share2, MessageSquare, Heart, ArrowLeft } from 'lucide-react';
import { navigate } from '../hooks/useLocation';

const ArticlePage = () => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Article Header */}
      <div className="bg-blue-800 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => navigate('/')}
            className="inline-flex items-center text-blue-100 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </button>
          
          <div className="max-w-3xl mx-auto">
            <div className="mb-4">
              <span className="inline-block bg-blue-900 text-blue-100 px-3 py-1 text-sm font-medium rounded-full">
                Christian Living
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Understanding God's Grace in Everyday Life
            </h1>
            <div className="flex items-center text-blue-100 text-sm">
              <img
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Author"
                className="w-10 h-10 rounded-full mr-3 object-cover"
              />
              <div>
                <p className="font-medium">David Mitchell</p>
                <p>May 15, 2025 · 8 min read</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <img
            src="https://images.pexels.com/photos/2258536/pexels-photo-2258536.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Featured image"
            className="w-full h-80 object-cover rounded-lg mb-8"
          />
          
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <p>
              Grace is one of the most beautiful concepts in Christian theology, yet it can often be 
              misunderstood or taken for granted. At its core, grace is God's unmerited favor—a gift 
              we don't deserve and cannot earn. In this article, we'll explore how this profound 
              theological concept manifests in our everyday lives.
            </p>
            
            <h2>What is Grace?</h2>
            <p>
              The Apostle Paul describes grace as God's riches at Christ's expense. It is the 
              free and unmerited favor of God, manifested in the salvation of sinners and the 
              bestowal of blessings. Ephesians 2:8-9 reminds us, "For it is by grace you have 
              been saved, through faith—and this is not from yourselves, it is the gift of God—not 
              by works, so that no one can boast."
            </p>
            <p>
              Grace is not just a theological concept confined to salvation; it's a living reality 
              that touches every aspect of our lives. When we truly understand grace, it transforms 
              how we see ourselves, others, and the world around us.
            </p>
            
            <h2>Grace in Our Daily Challenges</h2>
            <p>
              Life is filled with challenges—financial struggles, health issues, relationship conflicts, 
              and more. In these difficult moments, grace manifests as God's sustaining power that helps 
              us endure. As Paul records in 2 Corinthians 12:9, God told him, "My grace is sufficient 
              for you, for my power is made perfect in weakness."
            </p>
            <p>
              When we're facing overwhelming circumstances, God's grace provides not only comfort but 
              the strength to persevere. This doesn't mean our problems instantly disappear, but rather 
              that we receive what we need to face them with faith and courage.
            </p>
            
            <h2>Grace in Our Relationships</h2>
            <p>
              Perhaps one of the most practical applications of grace is in our relationships with others. 
              Having experienced God's undeserved favor, we're called to extend similar grace to those 
              around us. This includes forgiveness when wronged, patience with others' shortcomings, and 
              compassion for those who are struggling.
            </p>
            <p>
              Colossians 3:13 instructs us, "Bear with each other and forgive one another if any of you 
              has a grievance against someone. Forgive as the Lord forgave you." When we show grace to 
              others, we reflect God's character and participate in His redemptive work in the world.
            </p>
            
            <h2>Grace in Our Failures</h2>
            <p>
              We all fail. We make poor decisions, say things we regret, and fall short of both our own 
              standards and God's perfect standard. In these moments of failure and regret, grace reminds 
              us that our worth is not determined by our performance but by God's love for us.
            </p>
            <p>
              Romans 8:1 assures us, "Therefore, there is now no condemnation for those who are in Christ 
              Jesus." Grace frees us from the crippling power of guilt and shame, not so that we can continue 
              in sin, but so that we can move forward with humility and renewed commitment to growth.
            </p>
            
            <h2>Living as Recipients and Channels of Grace</h2>
            <p>
              Understanding grace changes everything. It humbles us as we recognize our dependence on God, 
              it comforts us in our struggles, it guides us in our relationships, and it empowers us in our 
              mission to share God's love with the world.
            </p>
            <p>
              As recipients of grace, we're called to be channels of that same grace to others. This happens 
              as we serve the needy, speak words of encouragement, extend forgiveness, and share the good 
              news of God's love in Christ.
            </p>
            
            <h2>Conclusion</h2>
            <p>
              Grace is not just a theological concept to be understood; it's a divine reality to be 
              experienced and shared. As we grow in our understanding of God's grace and learn to live 
              as both recipients and channels of that grace, our lives begin to reflect the beauty of 
              God's character to a world in desperate need of His love.
            </p>
            <p>
              Let us then approach God's throne of grace with confidence, so that we may receive mercy 
              and find grace to help us in our time of need (Hebrews 4:16), and let us freely give to 
              others what we have so freely received.
            </p>
          </div>
          
          {/* Article Actions */}
          <div className="flex items-center justify-between border-t border-b border-gray-200 dark:border-gray-700 py-4 mb-8">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setLiked(!liked)}
                className={`flex items-center space-x-1 ${liked ? 'text-red-500' : 'text-gray-600 dark:text-gray-400'}`}
              >
                <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
                <span>{liked ? 'Liked' : 'Like'}</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                <MessageSquare className="h-5 w-5" />
                <span>Comment</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </button>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">345 views</span>
            </div>
          </div>
          
          {/* Author Bio */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-12">
            <div className="flex items-start">
              <img
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Author"
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  David Mitchell
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  David is a theologian and author with a passion for making complex biblical concepts 
                  accessible to everyday Christians. He has written three books on the topic of grace 
                  and Christian living.
                </p>
                <a
                  href="#"
                  className="text-blue-800 dark:text-blue-400 font-medium hover:underline"
                >
                  View all articles by David
                </a>
              </div>
            </div>
          </div>
          
          {/* Related Articles */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Related Articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RelatedArticleCard
                title="Finding Peace in a Chaotic World"
                excerpt="Practical ways to experience God's peace amidst life's storms."
                image="https://images.pexels.com/photos/1261731/pexels-photo-1261731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              />
              <RelatedArticleCard
                title="The Power of Gratitude in Christian Life"
                excerpt="How cultivating thankfulness transforms our relationship with God and others."
                image="https://images.pexels.com/photos/1471895/pexels-photo-1471895.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              />
            </div>
          </div>
          
          {/* Comments Section */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Comments (3)
            </h3>
            <div className="space-y-6">
              <Comment
                name="Sarah Johnson"
                date="May 15, 2025"
                content="This article really touched me. I've been struggling with showing grace to those who have hurt me, and this reminded me of God's grace toward me. Thank you for this timely reminder!"
                image="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              />
              <Comment
                name="John Williams"
                date="May 16, 2025"
                content="I appreciate the practical examples of how grace works in everyday life. It's easy to think of grace as just a salvation concept, but seeing how it applies to daily challenges was eye-opening."
                image="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              />
              <Comment
                name="Lisa Chen"
                date="May 16, 2025"
                content="Could you expand more on how grace relates to discipline? I often struggle with understanding how God's grace works alongside His discipline in our lives."
                image="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              />
            </div>
            
            {/* Comment Form */}
            <div className="mt-8">
              <h4 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Leave a Comment
              </h4>
              <form>
                <div className="mb-4">
                  <textarea
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    rows={4}
                    placeholder="Share your thoughts..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded-md font-medium transition-colors"
                >
                  Post Comment
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface RelatedArticleCardProps {
  title: string;
  excerpt: string;
  image: string;
}

const RelatedArticleCard = ({ title, excerpt, image }: RelatedArticleCardProps) => (
  <div 
    className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md cursor-pointer group"
    onClick={() => navigate('/article')}
  >
    <div className="h-48 overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <div className="p-4">
      <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-blue-800 dark:group-hover:text-blue-400 transition-colors">
        {title}
      </h4>
      <p className="text-gray-600 dark:text-gray-400">
        {excerpt}
      </p>
    </div>
  </div>
);

interface CommentProps {
  name: string;
  date: string;
  content: string;
  image: string;
}

const Comment = ({ name, date, content, image }: CommentProps) => (
  <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
    <div className="flex items-start">
      <img
        src={image}
        alt={name}
        className="w-10 h-10 rounded-full object-cover mr-4"
      />
      <div>
        <div className="flex items-center mb-2">
          <h4 className="font-semibold text-gray-900 dark:text-white mr-2">{name}</h4>
          <span className="text-sm text-gray-500 dark:text-gray-400">{date}</span>
        </div>
        <p className="text-gray-700 dark:text-gray-300">
          {content}
        </p>
        <button className="mt-2 text-blue-800 dark:text-blue-400 text-sm font-medium hover:underline">
          Reply
        </button>
      </div>
    </div>
  </div>
);

export default ArticlePage;