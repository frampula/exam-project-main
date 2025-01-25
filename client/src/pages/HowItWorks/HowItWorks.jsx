import React, { useState } from 'react';
import { connect } from 'react-redux';
import styles from './HowItWorks.module.css';
import Header from '../../components/Header/Header.jsx';
import CONSTANTS from '../../constants.js';
import Footer from '../../components/Footer/Footer'

const HowItWorks = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const [search, setSearch] = useState('');

  const tags = [
    'Tech',
    'Clothing',
    'Finance',
    'Real Estate',
    'Crypto',
    'Short',
    'One Word',
  ];

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredTags = tags.filter(tag =>
    tag.toLowerCase().includes(search.toLowerCase())
  );

  const toggleQuestion = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  const categories = [
    {
      title: 'Launching A Contest',
      questions: [
        {
          question: 'How long does it take to start receiving submissions?',
          answer:
            'For Naming contests, you will start receiving your submissions within a few minutes of launching your contest. Since our creatives are located across the globe, you can expect to receive submissions 24 X 7 throughout the duration of the brainstorming phase.',
        },
        {
          question: 'How long do Naming Contests last?',
          answer:
            'You can choose a duration from 1 day to 7 days. We recommend a duration of 3 Days or 5 Days. This allows for sufficient time for entry submission as well as brainstorming with creatives. If you take advantage of our validation services such as Audience Testing and Trademark Research, both will be an additional 4-7 days (3-5 business days for Audience Testing and 1-2 business days for Trademark Research).',
        },
        {
          question: 'Where are the creatives located?',
          answer:
            'About 70% of our Creatives are located in the United States and other English speaking countries (i.e. United Kingdom, Canada, and Australia.). We utilize an advanced rating score algorithm to ensure that high quality creatives receive more opportunities to participate in our contests.',
        },
        {
          question: 'How much does it cost?',
          answer:
            'Our naming competitions start at $299, and our logo design competitions start at $299. Also, there are three additional contest level that each offer more features and benefits. See our Pricing Page for details',
        },
        {
          question: 'I need both a Name and a Logo. Do you offer any discount for multiple contests?',
          answer: 'Yes! We have many contest bundles - our most popular being our Name, Tagline, and Logo bundle. Bundles allow you to purchase multiple contests at one time and save as much as from $75 - $400. You can learn more about our bundle options on our Pricing Page.'
        },
        {
          question: 'What if I want to keep my business idea private?',
          answer: 'You can select a Non Disclosure Agreement (NDA) option at the time of launching your competition. This will ensure that only those contestants who agree to the NDA will be able to read your project brief and participate in the contest. The contest details will be kept private from other users, as well as search engines.'
        },
        {
          question: 'Can you serve customers outside the US?',
          answer: 'Absolutely. Atom services organizations across the globe. Our customer come from many countries, such as the United States, Australia, Canada, Europe, India, and MENA. We already helped more than 25,000 customer around the world.'
        },
        {
          question: 'Can I see any examples?',
          answer: 'Our creatives have submitted more than 6 Million names and thousands of logos on our platform. Here are some examples of Names, Taglines, and Logos that were submitted in recent contests.'
        }
      ],
    },
    {
      title: 'Buying From Marketplace',
      questions: [
        {
          question: "What's included with a Domain Purchase?",
          answer:
            'When you purchase a domain from our premium domain marketplace, you will receive the exact match .com URL, a complimentary logo design (along with all source files), as well as a complimentary Trademark report and Audience Testing if you are interested in validating your name.',
        },
        {
          question: 'How does the Domain transfer process work?',
          answer:
            'Once you purchase a Domain, our transfer specialists will reach out to you (typically on the same business day). In most cases we can transfer the domain to your preferred registrar (such as GoDaddy). Once we confirm the transfer details with you, the transfers are typically initiated to your account within 1 business day.',
        },
        {
          question:
            'If I purchase a Domain on installments, can I start using it to setup my website?',
          answer:
            'We offer payment plans for many domains in our Marketplace. If you purchase a domain on a payment plan, we hold the domain in an Escrow account until it is fully paid off. However our team can assist you with making any changes to the domains (such as Nameserver changes), so that you can start using the domain right away after making your first installment payment.',
        },
      ],
    },
    {
      title: 'Managed Contests',
      questions: [
        {
          question: 'What are Managed Contests?',
          answer:
            'The Managed option is a fully managed service by Atom Branding experts. It includes a formal brief preparation by Atom team and management of your contest. Managed Contests are a great fit for companies that are looking for an Agency like experience and they do not want to manage the contest directly. Our branding team has directly managed hundreds of branding projects and has learned several best practices that lead to successful project outcomes. Our team will apply all best practices towards the management of your branding project.',
        },
        {
          question: 'What is a typical timeline for a Managed Contest?',
          answer: 'The overall process takes 12-13 days.',
        },
        {
          question: 'How much do Managed Contests cost?',
          answer:
            'We offer two levels of Managed Contests. Standard ($1499) and Enterprise ($2999). The Enterprise managed contest includes: (1) a $500 award amount (instead of $300), which will attract our top Creatives and provide more options to choose from; (2) we will ensure a senior member of our branding team is assigned to your project and the branding team will invest about 3X more time in the day-to-day management of your project; (3) you will receive more high-end trademark report and 5X more responses for your audience test.',
        },
        {
          question: 'Where are the Branding Consultants located?',
          answer:
            'All our branding consultants are based in in our Headquarters (Hoffman Estates, IL). Our branding consultants have many years of experience in managing hundreds of branding projects for companies ranging from early stage startups to Fortune 500 corporations.',
        },
      ],
    },
    {
      title: 'For Creatives',
      questions: [
        {
          question: 'Can anyone join your platform?',
          answer: 'We are open to anyone to signup. However, we have an extensive Quality Scoring process which ensures that high quality creatives have the ability to continue to participate in the platform. On the other hand, we limit the participation from those creatives who do not consistently receive high ratings.',
        },
        {
          question: 'Can I start participating immediately upon signing up?',
          answer: 'When you initially signup, you are assigned few contests to assess your overall quality of submissions. Based upon the quality of your submissions, you will continue to be assigned additional contests. Once you have received enough high ratings on your submissions, your account will be upgraded to Full Access, so that you can begin participating in all open contests.',
        },
        {
          question: 'How do I get paid?',
          answer:
            'We handle creative payouts via Paypal or Payoneer. Depending upon your country of residence, we may require additional documentation to verify your identity as well as your Tax status.',
        },
      ],
    },
  ];

  return (
    <>
      <Header />
      <section className={styles.atomSection}>
        <div className={styles.atomContent}>
          <span className={styles.atomBadge}>World's #1 Naming Platform</span>
          <h1 className={styles.atomTitle}>How Does Atom Work?</h1>
          <p className={styles.atomDescription}>
            Atom helps you come up with a great name for your business by
            combining the power of crowdsourcing with sophisticated technology
            and Agency-level validation services.
          </p>
        </div>
        <div className={styles.atomVideo}>
          <iframe
            title="How Does Atom Work?"
            src="https://www.youtube.com/embed/xm3YgoEiEDc"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>
      <section className={styles.waysSection}>
        <div className={styles.waysHeader}>
          <span className={styles.waysBadge}>Our Services</span>
          <h2 className={styles.waysTitle}>3 Ways To Use Atom</h2>
          <p className={styles.waysDescription}>
            Atom offers 3 ways to get you a perfect name for your business.
          </p>
        </div>
        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.icon}>
              <span>
                <img src="https://www.atom.com/html/html/static_images/contests/g1.svg" />
              </span>
            </div>
            <h3 className={styles.cardTitle}>Launch a Contest</h3>
            <p className={styles.cardDescription}>
              Work with hundreds of creative experts to get custom name
              suggestions for your business or brand. All names are auto-checked
              for URL availability.
            </p>
            <a href="google.com" className={styles.cardButton}>
              Launch a Contest{' '}
              <img
                className={styles.arrow}
                src="https://www.atom.com/public/images/build_brand/icon-arrow-long-right.svg"
              />
            </a>
          </div>
          <div className={styles.card}>
            <div className={styles.icon}>
              <span>
                <img src="https://www.atom.com/html/html/static_images/contests/g2.svg" />
              </span>
            </div>
            <h3 className={styles.cardTitle}>Explore Names For Sale</h3>
            <p className={styles.cardDescription}>
              Our branding team has curated thousands of pre-made names that you
              can purchase instantly. All names include a matching URL and a
              complimentary Logo Design.
            </p>
            <a href="google.com" className={styles.cardButton}>
              Explore Names For Sale
              <img
                className={styles.arrow}
                src="https://www.atom.com/public/images/build_brand/icon-arrow-long-right.svg"
              />
            </a>
          </div>
          <div className={styles.card}>
            <div className={styles.icon}>
              <span>
                <img src="https://www.atom.com/html/html/static_images/contests/g3.svg" />
              </span>
            </div>
            <h3 className={styles.cardTitle}>Agency-level Managed Contests</h3>
            <p className={styles.cardDescription}>
              Our Managed contests combine the power of crowdsourcing with the
              rich experience of our branding consultants. Get a complete
              agency-level experience at a fraction of Agency costs.
            </p>
            <a href="google.com" className={styles.cardButton}>
              Learn More
              <img
                className={styles.arrow}
                src="https://www.atom.com/public/images/build_brand/icon-arrow-long-right.svg"
              />
            </a>
          </div>
        </div>
      </section>
      <div className={styles.stepsContainer}>
        <img
          className={styles.tropheyImg}
          src="https://www.atom.com/resources/assets/svg/icons/icon-27.svg"
        />
        <h2 className={styles.heading}>How Do Naming Contests Work?</h2>
        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>Step 1</div>
            <p>
              Fill out your Naming Brief and begin receiving name ideas in
              minutes
            </p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>Step 2</div>
            <p>
              Rate the submissions and provide feedback to creatives. Creatives
              submit even more names based on your feedback.
            </p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>Step 3</div>
            <p>
              Our team helps you test your favorite names with your target
              audience. We also assist with Trademark screening.
            </p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>Step 4</div>
            <p>Pick a Winner. The winner gets paid for their submission.</p>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <h2 className={styles.heading}>Frequently Asked Questions</h2>
        <div className={styles.tabs}>
          {categories.map((category, index) => (
            <button
              key={index}
              className={`${styles.tab} ${
                activeCategory === index ? styles.active : ''
              }`}
              onClick={() => {
                setActiveCategory(index);
                setActiveQuestion(null);
              }}
            >
              {category.title}
            </button>
          ))}
        </div>
        <h3 className={styles.subheading}>
          {categories[activeCategory].title}
        </h3>
        <div className={styles.questions}>
          {categories[activeCategory].questions.map((item, index) => (
            <div
              key={index}
              className={`${styles.question} ${
                activeQuestion === index ? styles.activeQuestion : ''
              }`}
            >
              <div
                className={styles.questionHeader}
                onClick={() => toggleQuestion(index)}
              >
                <span>{item.question}</span>
                <span
                  className={`${styles.toggleIcon} ${
                    activeQuestion === index ? styles.open : ''
                  }`}
                >
                  {activeQuestion === index ? '✖' : <img src='https://www.atom.com/html/html/html/static_images/icon-plus.svg' />}
                </span>
              </div>
              <div
                className={`${styles.answer} ${
                  activeQuestion === index ? styles.open : ''
                }`}
              >
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search Over 200,000+ Premium Names"
            value={search}
            onChange={handleSearchChange}
            className={styles.input}
          />
          <button className={styles.searchButton}>
            <img src='https://www.atom.com/public/images/bsg/search.svg' className={styles.searchIcon}></img>
          </button>
        </div>
        <div className={styles.tags}>
          {filteredTags.length > 0 ? (
            filteredTags.map((tag, index) => (
              <span key={index} className={styles.tag}>
                {tag}
              </span>
            ))
          ) : (
            <span className={styles.tag}>No tags found</span>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => {
  const { isFetching } = state.userStore;
  return { isFetching };
};

export default connect(mapStateToProps, null)(HowItWorks);
