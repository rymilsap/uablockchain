import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import {
  Zap,
  Users,
  Target,
  Heart,
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
  ExternalLink,
  Star,
  Code,
  Rocket,
  Globe,
  Sparkles
} from 'lucide-react'

// Custom Logo Component with actual image
const Logo = ({ className = "", size = 32 }) => {
  return (
    <img
      src="/UABlockchainLOGONOBG.png"
      alt="UA Blockchain Logo"
      className={className}
      style={{
        width: size,
        height: size,
        filter: 'drop-shadow(0 4px 8px rgba(220, 38, 38, 0.3))'
      }}
    />
  )
}

// Floating Blockchain Logos Component
const FloatingBlockchainLogos = () => {
  const cryptoLogos = [
    { name: 'Bitcoin', src: '/Bitcoin.png' },
    { name: 'Ethereum', src: '/Ethereum.png' },
    { name: 'USDC', src: '/USDC.png' },
    { name: 'Solana', src: '/SOL.png' },
    { name: 'BNB', src: '/BNB.png' },
    { name: 'XRP', src: '/XRP.png' },
    { name: 'Tether', src: '/Tether.png' }
  ]

  return (
    <div className="floating-blockchain-logos">
      {cryptoLogos.map((crypto, index) => (
        <motion.div
          key={index}
          className="crypto-logo-box"
          initial={{
            x: Math.random() * (window.innerWidth - 100),
            y: Math.random() * (window.innerHeight - 100),
            opacity: 0,
            scale: 0
          }}
          animate={{
            x: Math.random() * (window.innerWidth - 100),
            y: Math.random() * (window.innerHeight - 100),
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 15 + 20,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5
          }}
        >
          <img
            src={crypto.src}
            alt={crypto.name}
            style={{
              width: '36px',
              height: '36px'
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}

// Floating Particles Component
const FloatingParticles = () => {
  return (
    <div className="floating-particles">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="particle"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  )
}

// Profile Card Component inspired by ReactBits
const ProfileCard = ({ name, role, bio, avatar, socials, stats }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="profile-card"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="profile-card-bg">
        <div className="profile-card-bg-gradient"></div>
        <div className="profile-card-bg-pattern"></div>
      </div>

      <div className="profile-card-content">
        <motion.div
          className="profile-avatar"
          animate={{ rotate: isHovered ? 360 : 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="avatar-ring"></div>
          <div className="avatar-image">
            {avatar}
          </div>
        </motion.div>

        <motion.h3
          className="profile-name"
          animate={{ color: isHovered ? "#dc2626" : "#ffffff" }}
        >
          {name}
        </motion.h3>

        <p className="profile-role">{role}</p>
        <p className="profile-bio">{bio}</p>

        <div className="profile-stats">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-item"
              whileHover={{ scale: 1.1 }}
            >
              <span className="stat-number">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        <div className="profile-socials">
          {socials.map((social, index) => (
            <motion.a
              key={index}
              href={social.url}
              className="social-link"
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <social.icon size={20} />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function App() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, -200])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 0.8])

  const springY = useSpring(y, { stiffness: 100, damping: 30 })
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 30 })
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 })

  return (
    <div className="app">
      {/* Animated Background */}
      <div className="background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <FloatingParticles />
        <FloatingBlockchainLogos />
      </div>

      {/* Header */}
      <motion.header
        className="header"
        style={{ y: springY, opacity: springOpacity, scale: springScale }}
      >
        <div className="logo">
          <Logo className="logo-icon" size={48} />
          <span>UA Blockchain</span>
        </div>
        <nav className="nav">
          <a href="#home" className="nav-link">Home</a>
          <a href="#founder" className="nav-link">Founder</a>
          <a href="#goals" className="nav-link">Goals</a>
          <a href="#interest" className="nav-link">Join Us</a>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Welcome to <span className="gradient-text">UA Blockchain</span>
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Building the future of decentralized technology at the University of Alabama
          </motion.p>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.div
              className="stat"
              whileHover={{ scale: 1.1, y: -5 }}
            >
              <span className="stat-number">50+</span>
              <span className="stat-label">Members</span>
            </motion.div>
            <motion.div
              className="stat"
              whileHover={{ scale: 1.1, y: -5 }}
            >
              <span className="stat-number">10+</span>
              <span className="stat-label">Projects</span>
            </motion.div>
            <motion.div
              className="stat"
              whileHover={{ scale: 1.1, y: -5 }}
            >
              <span className="stat-number">5+</span>
              <span className="stat-label">Partners</span>
            </motion.div>
          </motion.div>

          <motion.button
            className="cta-button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles size={20} />
            Join Our Community
            <ArrowRight size={20} />
          </motion.button>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="hero-logo-container">
            <motion.div
              className="hero-logo"
              animate={{
                y: [-10, 10, -10],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <img
                src="/UABlockchainLOGONOBG.png"
                alt="UA Blockchain Logo"
                style={{
                  width: '800px',
                  height: '800px'
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Founder Section */}
      <section id="founder" className="founder-section">
        <motion.div
          className="section-logo"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img
            src="/UABlockchainLOGONOBG.png"
            alt="UA Blockchain Logo"
            style={{
              width: '120px',
              height: '120px',
              filter: 'drop-shadow(0 4px 16px rgba(220, 38, 38, 0.3))'
            }}
          />
        </motion.div>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Meet Our <span className="gradient-text">Leadership</span>
        </motion.h2>

        <div className="founder-container">
          <ProfileCard
            name="Tyler Gazzam"
            role="Co-Founder & Treasurer"
            bio="Senior Computer Science student with 3+ years of software engineering experience in aerospace defense. Aspiring crypto law attorney passionate about regulatory compliance and blockchain innovation."
            avatar={<Users size={40} />}
            stats={[
              { value: "CS", label: "Major" },
              { value: "Law", label: "Career Focus" },
              { value: "100+", label: "Students Mentored" }
            ]}
            socials={[
              { icon: Linkedin, url: "#" },
              { icon: Mail, url: "#" }
            ]}
          />

          <ProfileCard
            name="Ryan Milsap"
            role="Founder & President"
            bio="Passionate about blockchain technology and building the next generation of decentralized applications. Leading the UA Blockchain community to explore, learn, and innovate in the Web3 space."
            avatar={<Users size={40} />}
            stats={[
              { value: "CS", label: "Major" },
              { value: "DeFi", label: "Career Focus" },
              { value: "100+", label: "Students Mentored" }
            ]}
            socials={[
              { icon: Linkedin, url: "#" },
              { icon: Mail, url: "#" }
            ]}
          />

          <ProfileCard
            name="James Hojel"
            role="Co-Founder & VP"
            bio="Management Information Systems and Finance student specializing in algorithmic trading strategies. Passionate about DeFi innovation and the intersection of traditional finance with blockchain technology."
            avatar={<Users size={40} />}
            stats={[
              { value: "MIS", label: "Major" },
              { value: "Algo", label: "Career Focus" },
              { value: "100+", label: "Students Mentored" }
            ]}
            socials={[
              { icon: Linkedin, url: "#" },
              { icon: Mail, url: "#" }
            ]}
          />
        </div>
      </section>

      {/* Goals Section */}
      <section id="goals" className="goals-section">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Our <span className="gradient-text">Mission</span>
        </motion.h2>

        <div className="goals-grid">
          {[
            {
              icon: Target,
              title: "Education",
              description: "Provide comprehensive blockchain education and hands-on learning opportunities for UA students",
              color: "#dc2626"
            },
            {
              icon: Zap,
              title: "Innovation",
              description: "Foster innovation through collaborative projects and cutting-edge blockchain research",
              color: "#ef4444"
            },
            {
              icon: Users,
              title: "Community",
              description: "Build a strong, inclusive community of blockchain enthusiasts and developers",
              color: "#fca5a5"
            },
            {
              icon: ExternalLink,
              title: "Partnerships",
              description: "Establish partnerships with industry leaders and other blockchain organizations",
              color: "#dc2626"
            }
          ].map((goal, index) => (
            <motion.div
              key={index}
              className="goal-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <motion.div
                className="goal-icon"
                style={{ background: goal.color }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <goal.icon size={32} />
              </motion.div>
              <h3>{goal.title}</h3>
              <p>{goal.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interest Section */}
      <section id="interest" className="interest-section">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Get <span className="gradient-text">Involved</span>
        </motion.h2>

        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Ready to dive into the world of blockchain? Here's how you can get started:
        </motion.p>

        <div className="interest-options">
          {[
            {
              title: "Join Our Discord",
              description: "Connect with fellow blockchain enthusiasts, ask questions, and stay updated on events",
              icon: Users,
              action: "Join Discord"
            },
            {
              title: "Attend Events",
              description: "Participate in workshops, hackathons, and networking events throughout the semester",
              icon: Star,
              action: "View Events"
            },
            {
              title: "Start Building",
              description: "Contribute to open-source projects or start your own blockchain application",
              icon: Code,
              action: "Browse Projects"
            }
          ].map((option, index) => (
            <motion.div
              key={index}
              className="interest-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <motion.div
                className="interest-icon"
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
              >
                <option.icon size={32} />
              </motion.div>
              <h3>{option.title}</h3>
              <p>{option.description}</p>
              <motion.button
                className="interest-button"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {option.action}
                <ArrowRight size={16} />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        className="footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="footer-content">
          <div className="footer-logo">
            <img
              src="/UABlockchainLOGONOBG.png"
              alt="UA Blockchain Logo"
              style={{
                width: '60px',
                height: '60px',
                filter: 'drop-shadow(0 2px 8px rgba(220, 38, 38, 0.3))'
              }}
            />
          </div>
          <p>&copy; 2024 UA Blockchain. Building the future, one block at a time. Roll Tide! 🐘</p>
        </div>
      </motion.footer>
    </div>
  )
}

export default App 