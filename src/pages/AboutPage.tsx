import { Book, Heart, Globe, Users } from "lucide-react";

const AboutPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Strongs
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Equipping believers with biblical knowledge and understanding to
              strengthen their faith and deepen their relationship with God.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              At Strongs, we are committed to providing Christians with the
              tools, resources, and knowledge they need to understand the Bible
              more deeply and apply its teachings to their lives. We believe
              that a strong foundation in Biblical understanding leads to a
              transformed life and a deeper relationship with God.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Our name, "Strongs," reflects our commitment to Strong's
              Concordance, a valuable tool that has helped countless believers
              study the original Hebrew and Greek words of Scripture. Like this
              tool, we aim to be a trusted resource that helps you go deeper in
              your understanding of God's Word.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Our Core Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard
              icon={<Book className="h-10 w-10" />}
              title="Biblical Truth"
              description="We are committed to the accuracy and authority of Scripture as God's inspired Word."
            />
            <ValueCard
              icon={<Heart className="h-10 w-10" />}
              title="Spiritual Growth"
              description="We believe in fostering continuous spiritual development through biblical understanding."
            />
            <ValueCard
              icon={<Globe className="h-10 w-10" />}
              title="Global Impact"
              description="We aim to make biblical resources accessible to believers worldwide regardless of location."
            />
            <ValueCard
              icon={<Users className="h-10 w-10" />}
              title="Community"
              description="We foster a community of believers who learn, grow, and support one another."
            />
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              Our Story
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
              <p>
                Strongs began with a simple vision: to make deep biblical
                knowledge accessible to everyone. Founded by a group of seminary
                professors and passionate Bible students in 2020, we recognized
                the need for trustworthy biblical resources that bridge the gap
                between academic scholarship and everyday application.
              </p>
              <p>
                We started by creating in-depth articles that explained complex
                theological concepts in accessible language. As our readership
                grew, so did our vision. We expanded to include Bible study
                guides, video teachings, and interactive tools that help
                believers engage with Scripture more deeply.
              </p>
              <p>
                Today, Strongs reaches thousands of believers around the world,
                providing them with the resources they need to grow in their
                faith and understanding of God's Word. We continue to be guided
                by our founding vision, always striving to make biblical truth
                accessible, practical, and transformative.
              </p>
              <p>
                As we look to the future, we are excited about the new ways we
                can serve the global Christian community and help believers
                deepen their relationship with God through His Word.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Our Team
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <TeamMember
              name="Joshua Mofiyinfoluwa, ABOKEDE."
              role="General Coordinator."
              bio="Joshua Mofiyinfoluwa, ABOKEDE, is a bible expositor. He lead different bible study group and committed to preaching and leading secondary school students."
              image="https://media.discordapp.net/attachments/1121602193271820330/1379243568375533688/FB_IMG_1748370449207.jpg?ex=6848c2ab&is=6847712b&hm=abc94d53d64447d52a6a63f86e5f13c653c6fd13a0979ce816e19efc095e27ef&=&format=webp&width=569&height=569"
            />
            <TeamMember
              name="Ev. Godwin Ayorinde, OLAEWE."
              role="Crusade & Conference Director"
              bio="Dn. Godwin Ayorinde is a bible teacher,, an evangelist, a chanter and a drama evangelist."
              image="https://media.discordapp.net/attachments/1121602193271820330/1379243342457737308/FB_IMG_1748369849020.jpg?ex=6848c275&is=684770f5&hm=a6beb5909575ca44a938c06f3a7a1870a1d84a43d8f6aa5ae81c96c8619f6abc&=&format=webp&width=569&height=569"
            />
            <TeamMember
              name="Ev. Enoch Oluwatobi, OLADOSU"
              role="Head of Mission"
              bio="Ev. Enoch is an evangelist. He is committed to preaching and raising young ones."
              image="https://media.discordapp.net/attachments/1121602193271820330/1381939939503247411/image.png?ex=6849575c&is=684805dc&hm=5369631d9f9dd29f293d2730881f84c595c16cb7d64a05e6e787bbe7150a2531&=&format=webp&quality=lossless"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              Have questions or feedback? We'd love to hear from you. Reach out
              to us through any of the channels below.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  Email Us
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  strongambassadorabok@gmail.com
                </p>
              </div>
              <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  Call Us
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  +234 813 789 0055
                </p>
              </div>
              <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  Follow Us
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  @Strongs on facebook
                </p>
              </div>
            </div>

            <a
              href="#"
              className="inline-block bg-blue-800 hover:bg-blue-900 text-white px-6 py-3 rounded-md font-medium transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ValueCard = ({ icon, title, description }: ValueCardProps) => (
  <div className="bg-white dark:bg-gray-900 rounded-lg p-6 text-center shadow-md">
    <div className="text-blue-800 dark:text-blue-400 flex justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  image: string;
}

const TeamMember = ({ name, role, bio, image }: TeamMemberProps) => (
  <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md">
    <img src={image} alt={name} className="w-full h-64 object-cover" />
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">
        {name}
      </h3>
      <p className="text-blue-800 dark:text-blue-400 font-medium mb-3">
        {role}
      </p>
      <p className="text-gray-600 dark:text-gray-400">{bio}</p>
    </div>
  </div>
);

export default AboutPage;
