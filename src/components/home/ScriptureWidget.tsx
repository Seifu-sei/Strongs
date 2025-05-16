import { useState } from 'react';
import { BookOpen, Copy } from 'lucide-react';

interface Scripture {
  verse: string;
  text: string;
  reference: string;
}

const scriptures: Scripture[] = [
  {
    verse: 'Isaiah 40:31',
    text: 'But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.',
    reference: 'KJV'
  },
  {
    verse: 'Proverbs 3:5-6',
    text: 'Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.',
    reference: 'KJV'
  },
  {
    verse: 'Philippians 4:13',
    text: 'I can do all things through Christ which strengtheneth me.',
    reference: 'KJV'
  },
  {
    verse: 'Romans 8:28',
    text: 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.',
    reference: 'KJV'
  },
  {
    verse: 'Jeremiah 29:11',
    text: 'For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.',
    reference: 'KJV'
  }
];

const ScriptureWidget = () => {
  const [currentIndex, setCurrentIndex] = useState(Math.floor(Math.random() * scriptures.length));
  const [copied, setCopied] = useState(false);

  const handleNextVerse = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % scriptures.length);
  };

  const handleCopy = () => {
    const { verse, text } = scriptures[currentIndex];
    navigator.clipboard.writeText(`${text} - ${verse}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center text-blue-800 dark:text-blue-400">
            <BookOpen className="h-5 w-5 mr-2" />
            <h3 className="font-semibold">Daily Scripture</h3>
          </div>
          <button
            onClick={handleCopy}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none"
            aria-label="Copy verse"
            title="Copy verse"
          >
            <Copy className="h-5 w-5" />
            {copied && (
              <span className="absolute right-10 -mt-8 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                Copied!
              </span>
            )}
          </button>
        </div>
        
        <blockquote className="italic text-gray-700 dark:text-gray-300 mb-4">
          "{scriptures[currentIndex].text}"
        </blockquote>
        
        <div className="flex justify-between items-center text-sm">
          <span className="font-semibold text-gray-900 dark:text-white">
            {scriptures[currentIndex].verse}
          </span>
          <span className="text-gray-500 dark:text-gray-400">
            {scriptures[currentIndex].reference}
          </span>
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800 px-6 py-3">
        <button
          onClick={handleNextVerse}
          className="w-full text-center text-blue-800 dark:text-blue-400 font-medium hover:underline"
        >
          Show Another Verse
        </button>
      </div>
    </div>
  );
};

export default ScriptureWidget;