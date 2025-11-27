import { useState } from "react";

const AboutPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "What if I want more than the recommended copies of a card?",
      answer: "I absolutely support this. I've provided the framework, what you do with it next is up to you. I sometimes prefer different arts or rarities of cards, i.e., I have 9 cyber dragons in mine, 3 of them being the duelist pack Zane alts."
    },
    {
      question: "How does the master list save my progress?",
      answer: "We use local browser storage to store your progress. I didn't want to have people make accounts to use any of the features, so I figured this was a better solution. If you want to have the freedom of checking your progress in multiple places then I have provided the CSV download as well to hopefully please as many people as possible!"
    },
    {
      question: "Are you planning to add more formats?",
      answer: "Yes! I just finished collecting decklists up to 2014. I also would like to go back and incorporate the previous years WCQ's and pre-SJC events. So I do have larger plans for this, but it all depends on reception if they are made public. I've had an incredible time building this, but I will build in quiet if this is met with silence."
    },
    {
      question: "What if I want the individual years of the SJC formats?",
      answer: "This project started as combining all of the available years of the SJC run as possible. Some of the early years until about mid 2007 kind of blend together. I could see making a delta list of 2008 if a person wanted to build that timeline as that individual year held the most SJC's out of any other year. The same could be said about 2005 to 2007. 2009 and 2010 had a major drop off in SJC's with 2010 being the final year they were held until the replacement of YCS's. I have given this some thought, but I really enjoy the idea that the totality of the SJC run is a great place to start when building such a project as this. Each subsequent year after should really only add the archetypal cards introduced in that years releases making this an incredible foundation."
    },
    {
      question: "I hate you and this is a stupid idea, why would you build this and think you have accomplished something?",
      answer: "Yeah I get that, sorry for wasting your time. My hope was that someone would get enjoyment out of this even if you are spending time in the corners of this project, like going through the statistics and quizzing your friends on the top most used cards. I was motivated by the idea to give back, so if this isn't doing it for you then I hope to do something down the road that you might enjoy better! For now, thank you for stopping by and at least donating your time to listen to me."
    },
    {
      question: "2306 individual cards? Are you mad? No one in there right mind will build this!",
      answer: "I genuinely like to believe the people who love this game are a bit crazy. At least using me as a barometer assembling this massive repository (much smaller irl than you think!) has been an incredibly fun journey. Even more maddening, when I started this I drew a line in the sand. I would not use any cards I already had and would only allow myself to order cards. I wanted to see what it would take for someone who had nothing to build this. It was rather stupid of me and I do wish I would've just like played locals, got store credit, then used that to go through bulk for the cards I needed; or even better use the cards I already have! Nevertheless, I learned a lot from this process and even though the dopamine hits of getting cards in the mail was nice, I would have preferred leveraging my locals or friends to do this. The reprint waves have been hitting harder and harder making it feel like there was never a better time to be building this. You also don't have to follow the list to a 'T'. I'm not buying a handful of cards because their prices are actually just outrageous. Just proxy them!"
    },
    {
      question: "Why isn't the fusion/extra deck added to the 2 player master list?",
      answer: "I didn't feel the need to add the fusion/extra deck to the master two player list because in early yugioh the fusion deck was not really utilized outside of a small handful of cards, plus the most important thing is the main deck. If I am missing an extra deck card, I'll usually just grab my phone and pull it up on there and place it onto the field or grab a token or use the backside of a yugioh card to symbolize that monster. For my 2012 cube I would just print out the extra deck list and have that by any of the monsters listed on it, while also serving as the divider for each deck. I was not going to buy 10 zenmaines, I absolutely refused. I still produced a master list of the extra deck, but I only did it in terms of quantity for 1 person. This is just the template, you are free to double all totals for the complete two player list or double certain cards like goyo guardian as when it was released you would be able to OTK by making 3 in one turn."
    },
    {
      question: "Why would I want to play old decklists? I want to innovate!",
      answer: "I get that! I leave my deck innovation for current formats and treat this project as studying history. It's more fun to me to step into these decklists as if I'm stepping into an old car. I get to not only see, but feel the logic of the past. I also feel current innovations in older formats are boring and over optimized. There is a level of enjoyment to just having random 1 of's in decks, while consistency is thrown to the wind. It feels more like a reprieve from current formats, instead of trying to make an older format into an over optimized pale reflection of our current logic and understandings."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Story */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-fuchsia-400 via-purple-400 to-amber-400 bg-clip-text text-transparent mb-4">
            About This Project
          </h1>
          <p className="text-lg text-gray-400">The Story Behind YGOLegacyEngine</p>
        </div>

        {/* Story Card */}
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-2xl border border-fuchsia-500/30 shadow-2xl shadow-fuchsia-500/10 p-8 sm:p-12">
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                Yugioh means a lot to me, and I know it means a lot to other people. Yugioh helped motivate me to learn to read as a child, made me realize that I still wanted to be alive as a teen, and has helped with my communication as an adult. For the last couple of months I've been working on a project. I've always been interested in the history of Yugioh, the decks people have chosen to play, and their specific card choices. I really enjoy playing with someone's deck from 20+ years ago with just the most random addition of cards. So I took it upon myself to compile a master list of every single card needed to play every SJC event/format.
              </p>
              <p>
                It has the maximum amount of copies needed for 2 people to play every single deck in SJC's 2005 - 2010 run, even making sure both players can play the same deck at the same time. In doing so I have embarked on something potentially larger than I could've imagined. This may be the most fun I have ever had playing Yugioh. On a dime I can switch between any format me, my girlfriend, or friends want to play. I can be playing earth beatdown in 2005, then switch to full power Lightsworn mirrors🤮in the matter of minutes. I can even explore custom formats inside of these events.
              </p>
              <p>
                That being said I want to share this experience with everyone because, there may be something larger here than just keeping this to my circle of people. I have now taken it a step further and created a website to house this project. Inside there is a complete searchable database of every card used with their respective decklists attached. Furthermore, I have also included the complete 2 player master list, as well as a head to head deck builder for 2 people to square off in any SJC format.
              </p>
              <p>
                Moving forward I would like to consolidate all of my collection down into this. This for one will make it easier for me to track everything I have while also helping me get rid of anything else that I do not need. I have been working on expanding this into the YCS scene, even though the first year they start is probably one of the worst formats I have ever seen. If this does well then I will absolutely continue to expand this for the player base instead of keeping this to myself.
              </p>
              <p className="text-fuchsia-400 font-semibold">
                In the spirit of sharing, I'd also like to share this experience live. Join us on any Saturday night starting at 7 pm EST to partake in the fun! Thank you for reading this far!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-fuchsia-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400">Click on a question to see the answer</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-xl border border-fuchsia-500/30 shadow-lg shadow-fuchsia-500/10 overflow-hidden transition-all duration-300 hover:border-fuchsia-500/50"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left transition-all duration-300 hover:bg-fuchsia-500/5"
              >
                <span className="text-lg font-semibold text-gray-200 pr-4">
                  {faq.question}
                </span>
                <svg
                  className={`w-6 h-6 text-fuchsia-400 transform transition-transform duration-300 flex-shrink-0 ${
                    openFaq === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openFaq === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-5 text-gray-300 leading-relaxed border-t border-fuchsia-500/20 pt-4">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Supplies Section Placeholder */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-fuchsia-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Supplies Recommendation Guide
          </h2>
          <p className="text-gray-400">Coming soon...</p>
        </div>

        <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-2xl border border-fuchsia-500/30 shadow-2xl shadow-fuchsia-500/10 p-12 text-center">
          <svg className="w-20 h-20 mx-auto text-fuchsia-400/50 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <p className="text-gray-400 text-lg">
            This section will feature recommended supplies and products for building your own collection
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
